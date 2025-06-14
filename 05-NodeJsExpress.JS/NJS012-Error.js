// 🚧 ERROR HANDLING & RESILIENCE
// 184 - Centralized error-handling middleware for Express
// 185 - Logging unhandled exceptions and rejections: process.on('uncaughtException'), process.on('unhandledRejection')
// 186 - Graceful shutdown: closing HTTP server, database connections on SIGTERM/SIGINT
// 187 - Implementing retries with exponential backoff for transient errors (e.g., database reconnection)
// 188 - Fallback strategies: serving cached data or maintenance pages
// 189 - Circuit breaker pattern with opossum: preventing cascading failures in microservices

// 🧩 TASK QUEUES & BACKGROUND JOBS
// 190 - Using Bull or BullMQ for Redis-backed job queues: defining jobs, workers, and repeatable jobs
// 191 - Agenda: MongoDB-backed job scheduling, cron-like syntax
// 192 - Bee-Queue for simple Redis job queues: performance characteristics
// 193 - Using RabbitMQ with amqplib for task queues: message acknowledgment, durable queues
// 194 - Handling long-running tasks asynchronously: progress updates via WebSockets or polling
// 195 - Scheduling tasks with node-cron or cron directly on the server

// 🌱 MICROSERVICES PATTERNS & BEST PRACTICES
// 196 - Domain-driven design (DDD) principles for Node.js services
// 197 - Bounded contexts and ensuring loose coupling between services
// 198 - Event-driven architecture: using Kafka or RabbitMQ for event sourcing
// 199 - Saga pattern for distributed transactions: orchestration vs choreography
// 200 - API versioning and backward compatibility in microservices
// 201 - Documentation standards for microservices: AsyncAPI for message-driven APIs
// 202 - Service mesh basics: using Istio or Linkerd for observability, traffic management


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 184 – Centralized error-handling middleware for Express
// -----------------------------------------------------------------------------
// NOTES:
// 1. Define an error handler with signature (err, req, res, next).
// 2. Place it after all routes and other middleware.
// 3. Forward errors from sync code with next(err) and from async code inside catch blocks.
// 4. Assign err.status to control HTTP status; default to 500 if missing.
// 5. Log errors on the server, but don’t expose stack traces in production.
// 6. Consider using a wrapper to auto-catch async errors (e.g., asyncHandler).
// -----------------------------------------------------------------------------

const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Synchronous route example—validate and forward error
app.get('/items/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    const err = new Error('Invalid item ID');
    err.status = 400;
    return next(err);
  }
  res.json({ id, name: `Item ${id}` });
});

// Asynchronous route example—validate and forward error in catch
app.post('/items', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const err = new Error('Name is required');
      err.status = 400;
      throw err;
    }
    // Simulate async save
    const newItem = await Promise.resolve({ id: Date.now(), name });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 185 – Logging unhandled exceptions and rejections
// -----------------------------------------------------------------------------
// NOTES:
// 1. Register handlers at the very start of your application (e.g., in index.js).
// 2. process.on('uncaughtException', ...) catches sync errors not handled by try/catch.
// 3. process.on('unhandledRejection', ...) catches Promise rejections without .catch().
// 4. Log message and stack for debugging.
// 5. After an uncaughtException, exit process to avoid undefined state.
// 6. Optionally perform cleanup (DB connections, file handles) before exiting.
// -----------------------------------------------------------------------------

// 1. Catch unhandled exceptions
process.on('uncaughtException', (err) => {
  console.error('🔴 Uncaught Exception:', err.message);
  console.error(err.stack);
  // Cleanup if needed...
  process.exit(1);
});

// 2. Catch unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  // Optionally exit: process.exit(1);
});

// Example triggers:

// Trigger an unhandled Promise rejection
Promise.reject(new Error('Example unhandled rejection'));

// Trigger an uncaught exception after 1 second
setTimeout(() => {
  throw new Error('Example uncaught exception');
}, 1000);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 186 – Graceful shutdown: closing HTTP server, database connections on SIGTERM/SIGINT
// -----------------------------------------------------------------------------
// NOTES:
// 1. Listen for SIGTERM and SIGINT to initiate shutdown.
// 2. Stop accepting new connections with server.close().
// 3. Drain existing requests before closing.
// 4. Close DB connections (e.g., mongoose.disconnect(), pool.end()).
// 5. Use a fallback timeout to force exit if cleanup hangs.
// 6. Exit process with code 0 on success or 1 on failure.
// -----------------------------------------------------------------------------

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const app = express();

// Example route
app.get('/', (req, res) => res.send('Hello, world!'));

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB (example)
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

server.listen(3000, () => console.log('🚀 Server listening on port 3000'));

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  // Stop accepting new connections
  server.close(() => {
    console.log('✅ HTTP server closed');
    // Close DB connection
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB disconnected');
      process.exit(0);
    });
  });
  // Force shutdown after 10s
  setTimeout(() => {
    console.error('❌ Cleanup timed out. Forcing shutdown.');
    process.exit(1);
  }, 10000);
};

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 187 – Implementing retries with exponential backoff for transient errors
// -----------------------------------------------------------------------------
// NOTES:
// 1. Exponential backoff increases wait time between retries: delay = base * 2^(attempt−1).
// 2. Add jitter (randomness) to avoid thundering herd problems.
// 3. Configure a maxRetries to prevent endless loops.
// 4. Ideal for transient failures (network glitches, DB reconnects).
// 5. You can vary strategies: full jitter, equal jitter, etc.
// -----------------------------------------------------------------------------

// Generic retry helper with exponential backoff and optional jitter
async function retry(fn, options = {}) {
  const {
    retries    = 5,
    minTimeout = 100,    // initial delay in ms
    maxTimeout = 10000,  // maximum delay in ms
    factor     = 2,      // backoff multiplier
    jitter     = true,   // apply random jitter
  } = options;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;
      // calculate exponential backoff delay
      let delay = Math.min(minTimeout * Math.pow(factor, attempt - 1), maxTimeout);
      if (jitter) delay = Math.random() * delay;
      console.warn(`Retry #${attempt} failed: ${err.message}. Retrying in ${Math.round(delay)}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

// Example 1: Retrying a Mongoose connection
const mongoose = require('mongoose');
async function connectWithRetry() {
  await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('✅ MongoDB connected');
}
retry(connectWithRetry, { retries: 5, minTimeout: 500, maxTimeout: 5000 })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB after retries:', err);
    process.exit(1);
  });

// Example 2: Retrying a flaky operation
async function unstableOperation() {
  // Simulate a 70% failure rate
  if (Math.random() < 0.7) throw new Error('Transient error');
  return '🎉 Success!';
}
retry(unstableOperation, { retries: 3, minTimeout: 200, maxTimeout: 2000 })
  .then(result => console.log('Operation result:', result))
  .catch(err => console.error('Operation ultimately failed:', err));

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 188 – Fallback strategies: serving cached data or maintenance pages
// -----------------------------------------------------------------------------
// NOTES:
// 1. Use middleware to check maintenance mode and serve a static maintenance page.
// 2. For data endpoints, attempt primary service, then fallback to Redis cache if it fails.
// 3. Serve stale cache with HTTP 200 when available, otherwise return 502.
// 4. Toggle maintenance mode via the MAINTENANCE_MODE environment variable.
// 5. Cache successful responses with a short TTL to keep data fresh.
// 6. Log all fallback events for monitoring and alerting.
// -----------------------------------------------------------------------------

const express = require('express');
const { createClient } = require('redis');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const redis = createClient({ url: 'redis://localhost:6379' });
redis.connect().catch(console.error);

// 1. Maintenance-mode middleware
app.use((req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true' && req.path !== '/maintenance.html') {
    return res.status(503).sendFile(path.join(__dirname, 'public', 'maintenance.html'));
  }
  next();
});

// 2. Serve static files (including maintenance.html)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Data endpoint with cache fallback
app.get('/api/data', async (req, res) => {
  const cacheKey = 'api:data';
  try {
    // Primary service call
    const { data } = await axios.get('https://backend-service/data');
    // Cache response for 60 seconds
    await redis.setEx(cacheKey, 60, JSON.stringify(data));
    return res.json(data);
  } catch (err) {
    console.error('⚠️  Primary service error:', err.message);
    // Fallback to Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.warn('ℹ️  Serving stale cached data');
      return res.json(JSON.parse(cached));
    }
    // Final fallback: service unavailable
    return res.status(502).json({ error: 'Service unavailable, please try again later.' });
  }
});

// 4. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 189 – Circuit breaker pattern with opossum: preventing cascading failures in microservices
// -----------------------------------------------------------------------------
// NOTES:
// 1. Circuit breaker isolates failing downstream services to avoid systemic failure.
// 2. Configure timeout, errorThresholdPercentage, and resetTimeout to tune sensitivity.
// 3. Provide a fallback to return cached or default data when the circuit is open.
// 4. Listen to events (open, halfOpen, close, failure, timeout, fallback) for logging/alerts.
// 5. Wrap each remote call with breaker.fire() to enforce the pattern.
// -----------------------------------------------------------------------------

const CircuitBreaker = require('opossum');
const axios = require('axios');

// 1. Define the action: call an external microservice
async function fetchUserProfile(userId) {
  const { data } = await axios.get(`https://user-service/api/users/${userId}`);
  return data;
}

// 2. Circuit breaker configuration
const options = {
  timeout: 5000,                // max time in ms before a call is considered failed
  errorThresholdPercentage: 50, // % of failures before opening the circuit
  resetTimeout: 10000,          // time in ms to wait before trying again
  rollingCountTimeout: 10000,   // window duration for metrics
  rollingCountBuckets: 10       // number of buckets in the metrics window
};

// 3. Create the breaker
const breaker = new CircuitBreaker(fetchUserProfile, options);

// 4. Fallback when circuit is open
breaker.fallback((userId) => ({
  id: userId,
  name: 'Unknown User',
  fallback: true
}));

// 5. Event listeners for observability
breaker.on('open',    () => console.warn('⚠️  Circuit opened: failing fast'));
breaker.on('halfOpen',() => console.info('🔄 Circuit half-open: testing service'));
breaker.on('close',   () => console.info('✅ Circuit closed: service restored'));
breaker.on('failure', (err) => console.error('🚨 Service call failure:', err.message));
breaker.on('timeout', () => console.error('⏱️  Service call timed out'));
breaker.on('fallback', (data) => console.info('🔁 Fallback response:', data));

// 6. Example Express handler using the breaker
async function getUserHandler(req, res, next) {
  const { userId } = req.params;
  try {
    const profile = await breaker.fire(userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserHandler };

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 190 – Using BullMQ for Redis-backed job queues: defining jobs, workers, and repeatable jobs
// -----------------------------------------------------------------------------
// NOTES:
// 1. Use a QueueScheduler to handle delayed and stalled jobs.
// 2. Create a Queue to enqueue jobs with data and options (delay, attempts, repeat).
// 3. Use a Worker to process jobs—they run in separate processes or threads.
// 4. Configure retries (attempts, backoff) for transient failures.
// 5. Define repeatable jobs with a cron or every interval.
// 6. Monitor queue events (completed, failed, stalled) for observability.
// -----------------------------------------------------------------------------

const { Queue, Worker, QueueScheduler, JobsOptions } = require('bullmq');
const IORedis = require('ioredis');

// 1. Redis connection
const connection = new IORedis({ host: '127.0.0.1', port: 6379 });

// 2. Queue scheduler to manage delayed & stalled jobs
new QueueScheduler('emailQueue', { connection });

// 3. Define the Queue (producer)
const emailQueue = new Queue('emailQueue', { connection });

// 4. Enqueue a one-off job with retries and backoff
const emailJobOptions = {
  attempts: 5,
  backoff: { type: 'exponential', delay: 1000 },  // retry delays: 1s, 2s, 4s...
  removeOnComplete: true,
  removeOnFail: false
};
emailQueue.add('sendWelcomeEmail', { userId: 123, email: 'alice@example.com' }, emailJobOptions);

// 5. Define a repeatable job (e.g., daily cleanup)
const repeatOptions = {
  repeat: { cron: '0 3 * * *' }, // every day at 03:00
  removeOnComplete: true
};
emailQueue.add('dailyReport', { reportType: 'summary' }, repeatOptions);

// 6. Worker to process jobs
const emailWorker = new Worker('emailQueue', async job => {
  switch (job.name) {
    case 'sendWelcomeEmail':
      // call your email service
      await sendEmail(job.data.email, 'Welcome!', `<p>Hello user ${job.data.userId}</p>`);
      break;
    case 'dailyReport':
      // generate and send report
      await generateReport(job.data.reportType);
      break;
    default:
      throw new Error(`Unknown job ${job.name}`);
  }
}, { connection, concurrency: 5 });

// 7. Listen to events
emailWorker.on('completed', job => {
  console.log(`✅ Job ${job.id} (${job.name}) completed`);
});
emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} (${job?.name}) failed:`, err.message);
});

// -----------------------------------------------------------------------------

// Example helper functions (placeholders)
async function sendEmail(to, subject, html) {
  // integrate with an email provider (e.g., SendGrid, SES)
  console.log(`Sending email to ${to}: ${subject}`);
}
async function generateReport(type) {
  // generate report logic
  console.log(`Generating ${type} report`);
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 191 – Agenda: MongoDB-backed job scheduling, cron-like syntax
// -----------------------------------------------------------------------------
// NOTES:
// • Agenda persists job definitions in MongoDB and polls at a configurable interval.
// • Use .define() to register a job processor, .schedule()/.now() for one-offs, and .every() with cron syntax for recurring jobs.
// • Configure concurrency, priority, and lockLifetime per job.
// • Always start with agenda.start() and handle graceful shutdown via agenda.stop().
// -----------------------------------------------------------------------------

const Agenda = require('agenda');

// 1. Initialize Agenda with MongoDB connection
const agenda = new Agenda({
  db: {
    address: 'mongodb://localhost:27017/agendaDb',
    collection: 'agendaJobs',
    options: { useUnifiedTopology: true }
  },
  processEvery: '30 seconds',   // how often to check for jobs
  defaultConcurrency: 5,        // max jobs running at once
});

// 2. Define a job processor
agenda.define('send email', { priority: 'high', concurrency: 10 }, async (job) => {
  const { to, subject, body } = job.attrs.data;
  // Your email sending logic here
  console.log(`✉️  Sending email to ${to}: ${subject}`);
});

// 3. Schedule jobs and start agenda
(async function() {
  await agenda.start();

  // One-off job: run 2 minutes from now
  await agenda.schedule('in 2 minutes', 'send email', {
    to: 'user@example.com',
    subject: 'Welcome!',
    body: 'Thanks for signing up.'
  });

  // Recurring job: every day at 09:00 (cron syntax)
  await agenda.every('0 9 * * *', 'send email', {
    to: 'admin@example.com',
    subject: 'Daily Report',
    body: 'Here is your daily report.'
  });
})();

// 4. Graceful shutdown
function gracefulShutdown() {
  agenda.stop(() => {
    console.log('🛑 Agenda stopped, exiting process');
    process.exit(0);
  });
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 192 – Bee-Queue for simple Redis job queues: performance characteristics
// -----------------------------------------------------------------------------
// NOTES:
// • Bee-Queue is optimized for ultra-fast, low-latency job processing using Redis lists.
// • Minimal overhead yields high throughput (thousands of jobs/sec) and <1ms round-trip latency.
// • Uses blocking list ops (BRPOPLPUSH) for reliability, and heartbeats to detect stalled jobs.
// • Supports per-job retries, timeouts, and concurrency tuning.
// • Concurrency: number of simultaneous jobs per worker (default 1; higher for CPU-light tasks).
// • Compare: Bull has more features; Bee-Queue is lighter weight for simple, high-performance queues.
// -----------------------------------------------------------------------------

const BeeQueue = require('bee-queue');
const IORedis  = require('ioredis');

// 1. Shared Redis connection
const redisClient = new IORedis();

// 2. Initialize queue with options
const emailQueue = new BeeQueue('email', {
  redis: redisClient,
  isWorker: true,          // this process will consume jobs
  getEvents: true,         // enable event streaming
  sendEvents: false,       // reduce Redis traffic if you don't need remote events
  stallInterval: 5000,     // check for stalled jobs every 5s
  nearTermWindow: 5000,    // bypass delay sorting for jobs due in <5s
  retryLimit: 3,           // default max retries
  removeOnSuccess: true,   // auto-remove succeeded jobs
  removeOnFailure: false   // keep failed jobs for inspection
});

// 3. Producer: enqueue a job
async function enqueueEmail(to, subject, body) {
  const job = await emailQueue.createJob({ to, subject, body })
    .retries(3)           // override retry limit for this job
    .timeout(60000)       // fail if not processed in 60s
    .save();
  console.log(`Enqueued job ${job.id}`);
}
enqueueEmail('alice@example.com', 'Welcome!', '<p>Hello Alice!</p>');

// 4. Worker: process up to 5 jobs concurrently
emailQueue.process(5, async (job) => {
  const { to, subject, body } = job.data;
  await sendEmail(to, subject, body);  // your email-sending logic
  return { success: true };
});

// 5. Monitor job events
emailQueue.on('ready', () => console.log('🚀 Queue is ready'));
emailQueue.on('job succeeded', (job, result) =>
  console.log(`✅ Job ${job.id} succeeded in ${job.workTime}ms`)
);
emailQueue.on('job failed', (job, err) =>
  console.error(`❌ Job ${job.id} failed: ${err.message}`)
);
emailQueue.on('error', (err) =>
  console.error('Queue error:', err)
);

// 6. Helper: simulate email send
async function sendEmail(to, subject, body) {
  // integrate with an email provider...
  console.log(`📧 Sending email to ${to}: "${subject}"`);
}

// 7. Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Shutting down queue...');
  await emailQueue.close(1000);  // wait up to 1s for jobs to finish
  redisClient.disconnect();
  process.exit(0);
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 193 – Using RabbitMQ with amqplib for task queues: message acknowledgment, durable queues
// -----------------------------------------------------------------------------
// NOTES:
// 1. Assert queues with { durable: true } so they survive broker restarts.
// 2. Publish messages with { persistent: true } to have them written to disk.
// 3. Use manual acknowledgments (noAck: false) and channel.ack()/channel.nack() to manage message flow.
// 4. Apply channel.prefetch(1) for fair dispatch—one unacked message at a time per consumer.
// 5. On processing errors, use channel.nack(msg, false, true) to requeue or false to dead-letter.
// 6. Handle graceful shutdown: close channel and connection to avoid message loss.
// -----------------------------------------------------------------------------

const amqp = require('amqplib');

(async () => {
  // 1. Connect and create channel
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // 2. Declare a durable queue
  const queue = 'task_queue';
  await channel.assertQueue(queue, { durable: true });

  // 3. Fair dispatch
  channel.prefetch(1);

  // 4. Consumer: manual acknowledgment
  channel.consume(queue, async (msg) => {
    if (msg) {
      const content = msg.content.toString();
      console.log(" [x] Received '%s'", content);
      try {
        // Simulate work based on message
        await doWork(content);
        // Acknowledge successful processing
        channel.ack(msg);
        console.log(" [x] Done processing");
      } catch (err) {
        console.error(" [!] Processing error:", err);
        // Requeue message on error
        channel.nack(msg, false, true);
      }
    }
  }, { noAck: false });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  // 5. Producer example: send persistent tasks
  const sendTask = (task) => {
    channel.sendToQueue(queue, Buffer.from(task), { persistent: true });
    console.log(" [>] Sent '%s'", task);
  };

  ['Task 1...', 'Task 2..', 'Task 3.'].forEach(sendTask);

  // Helper: simulate async work (1s per dot)
  async function doWork(msg) {
    const seconds = msg.split('.').length - 1;
    return new Promise(res => setTimeout(res, seconds * 1000));
  }

  // 6. Graceful shutdown
  process.on('SIGINT', async () => {
    console.log("\n🛑 Shutting down gracefully...");
    await channel.close();
    await connection.close();
    process.exit(0);
  });
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 194 – Handling long-running tasks asynchronously: progress updates via WebSockets or polling
// -----------------------------------------------------------------------------
// NOTES:
// 1. Offload long tasks to background workers (here simulated with setInterval).
// 2. Track progress in a shared store (in-memory Map or Redis) keyed by jobId.
// 3. WebSocket (socket.io) pushes real-time updates to subscribed clients.
// 4. Polling endpoint (/jobs/:id/status) lets clients fetch progress if WebSockets aren’t available.
// 5. Clients subscribe to a job room via socket.emit('subscribe', jobId).
// 6. Clean up completed job entries after a TTL to free resources.
// -----------------------------------------------------------------------------

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// In-memory job progress store
const jobProgress = new Map();

// Simulate a long-running task with periodic progress updates
function runLongTask(jobId) {
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + 10, 100);
    const status = progress === 100 ? 'done' : 'in-progress';
    jobProgress.set(jobId, { progress, status });
    // Push update to clients subscribed to this job room
    io.to(jobId).emit('progress', { jobId, progress, status });
    if (progress === 100) {
      clearInterval(interval);
      // Remove job after 1 minute
      setTimeout(() => jobProgress.delete(jobId), 60_000);
    }
  }, 1000);
}

// Start a new job
app.post('/jobs', (req, res) => {
  const jobId = uuidv4();
  jobProgress.set(jobId, { progress: 0, status: 'queued' });
  runLongTask(jobId);
  res.status(202).json({ jobId });
});

// Polling endpoint for job status
app.get('/jobs/:id/status', (req, res) => {
  const job = jobProgress.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// WebSocket connection handling
io.on('connection', socket => {
  console.log('Client connected:', socket.id);
  // Client subscribes to a job to receive progress events
  socket.on('subscribe', jobId => {
    socket.join(jobId);
  });
  socket.on('unsubscribe', jobId => {
    socket.leave(jobId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 195 – Scheduling tasks with node-cron or cron directly on the server
// -----------------------------------------------------------------------------
// NOTES:
// 1. node-cron lets you schedule tasks inside your Node.js process using standard cron syntax.
// 2. System cron (crontab) runs scripts at the OS level—survives Node restarts and is more reliable for critical jobs.
// 3. Use node-cron for dynamic or in-app scheduling; use system cron for simple, external scheduling.
// 4. Always redirect output and errors to log files for monitoring.
// -----------------------------------------------------------------------------

const cron = require('node-cron');

// Example: run every day at 2:30 AM
cron.schedule('30 2 * * *', () => {
  // Put your maintenance or reporting logic here
  console.log('🔄 Daily maintenance task running at', new Date().toISOString());
});

// Example: run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('🕔 Five-minute check at', new Date().toISOString());
});

console.log('✅ node-cron scheduler started');


// -----------------------------------------------------------------------------
# System cron entries (edit with `crontab -e`):
# Run a Node.js script hourly, logging output and errors
0 * * * * /usr/bin/node /path/to/task-script.js >> /var/log/task-script.log 2>&1

# Run a shell script every midnight
0 0 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 196 – Domain-driven design (DDD) principles for Node.js services
// -----------------------------------------------------------------------------
// NOTES:
// 1. Bounded Context: logical boundary around a subdomain, with its own model & language.
// 2. Entities: domain objects with unique identity (e.g., Order, OrderItem).
// 3. Value Objects: immutable, compare by value (e.g., Money).
// 4. Aggregates: group of entities & value objects with one Aggregate Root enforcing invariants.
// 5. Repositories: interfaces for loading/persisting aggregates (e.g., OrderRepository).
// 6. Domain Services: stateless operations not belonging to a single entity (e.g., payment processing).
// 7. Application Services: orchestrate use cases, coordinate repositories & domain services.
// 8. Factories: encapsulate complex aggregate creation logic.
// 9. Ubiquitous Language: code and conversations share the same terms.
// -----------------------------------------------------------------------------


// domain/valueObjects/Money.js
export class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Amount must be non-negative');
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this);
  }
  add(other) {
    if (this.currency !== other.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
  equals(other) {
    return other instanceof Money
      && this.amount === other.amount
      && this.currency === other.currency;
  }
}


// domain/entities/OrderItem.js
import { Money } from '../valueObjects/Money.js';
export class OrderItem {
  constructor(id, productId, price /* Money */, quantity) {
    this.id = id;
    this.productId = productId;
    this.price = price;
    this.quantity = quantity;
  }
  get subtotal() {
    return this.price.add(new Money(0, this.price.currency))
                     .add(new Money(0, this.price.currency)) // adjust if needed
                     .add(new Money(0, this.price.currency)); // placeholder
    // or simply: return new Money(this.price.amount * this.quantity, this.price.currency);
  }
}


// domain/entities/Order.js
import { Money } from '../valueObjects/Money.js';
export class Order {
  constructor(id, items = []) {
    this.id = id;
    this.items = items;             // array of OrderItem
  }
  addItem(item) {
    this.items.push(item);
  }
  get total() {
    return this.items.reduce(
      (sum, item) => sum.add(new Money(item.price.amount * item.quantity, item.price.currency)),
      new Money(0, this.items[0]?.price.currency || 'USD')
    );
  }
}


// domain/repositories/OrderRepository.js
export class OrderRepository {
  async save(order) { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
}


// infrastructure/repositories/MongoOrderRepository.js
import { OrderRepository } from '../../domain/repositories/OrderRepository.js';
export class MongoOrderRepository extends OrderRepository {
  constructor(db) { super(); this.collection = db.collection('orders'); }
  async save(order) {
    await this.collection.updateOne(
      { _id: order.id },
      { $set: { items: order.items, total: order.total.amount } },
      { upsert: true }
    );
  }
  async findById(id) {
    const doc = await this.collection.findOne({ _id: id });
    if (!doc) return null;
    const items = doc.items.map(i =>
      new OrderItem(i.id, i.productId, new Money(i.price, doc.currency), i.quantity)
    );
    return new Order(doc._id, items);
  }
}


// application/services/CreateOrderService.js
import { Order } from '../../domain/entities/Order.js';
import { OrderItem } from '../../domain/entities/OrderItem.js';
export class CreateOrderService {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }
  async execute({ orderId, items }) {
    const order = new Order(orderId);
    for (const { id, productId, price, quantity } of items) {
      order.addItem(new OrderItem(id, productId, price, quantity));
    }
    await this.orderRepo.save(order);
    return order.id;
  }
}


// composition root (e.g., app.js)
import express from 'express';
import { MongoClient } from 'mongodb';
import { MongoOrderRepository } from './infrastructure/repositories/MongoOrderRepository.js';
import { CreateOrderService } from './application/services/CreateOrderService.js';

(async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('shop');
  const repo = new MongoOrderRepository(db);
  const createOrder = new CreateOrderService(repo);

  const app = express();
  app.use(express.json());

  app.post('/orders', async (req, res, next) => {
    try {
      const orderId = await createOrder.execute(req.body);
      res.status(201).json({ orderId });
    } catch (err) {
      next(err);
    }
  });

  app.listen(3000, () => console.log('🚀 Server running on port 3000'));
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 197 – Bounded contexts and ensuring loose coupling between services
// -----------------------------------------------------------------------------
// NOTES:
// 1. Bounded Context: isolate each domain’s model and logic into its own service (e.g., OrderService, InventoryService).
// 2. Each service has its own datastore/schema; never share raw databases.
// 3. Services communicate only via well-defined contracts: HTTP APIs or asynchronous events.
// 4. Use a message bus or broker (RabbitMQ, Kafka, Redis Pub/Sub) for events to decouple services.
// 5. Loose coupling means a service depends only on the event or API contract, not on another service’s internals.
// 6. Version your contracts to evolve services independently.
// -----------------------------------------------------------------------------

// === OrderService (order-service/index.js) ===
const express = require('express');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const eventBus = new EventEmitter(); // placeholder for a real message broker

const orderApp = express();
orderApp.use(bodyParser.json());

// In-memory store for demo
const orders = new Map();

orderApp.post('/orders', (req, res) => {
  const orderId = Date.now().toString();
  orders.set(orderId, { orderId, items: req.body.items, status: 'CREATED' });
  // Publish an event instead of calling InventoryService directly
  eventBus.emit('OrderCreated', { orderId, items: req.body.items });
  res.status(201).json({ orderId });
});

orderApp.get('/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

orderApp.listen(4000, () => console.log('✅ OrderService listening on port 4000'));


// === InventoryService (inventory-service/index.js) ===
const inventoryApp = express();
inventoryApp.use(bodyParser.json());

// In-memory inventory for demo
const inventory = { 'product-1': 100, 'product-2': 50 };

// Subscribe to the OrderCreated event
eventBus.on('OrderCreated', ({ orderId, items }) => {
  console.log(`🔔 InventoryService received OrderCreated for ${orderId}`);
  items.forEach(({ productId, quantity }) => {
    inventory[productId] = (inventory[productId] || 0) - quantity;
  });
  // Could emit an InventoryUpdated event here...
});

inventoryApp.get('/inventory/:productId', (req, res) => {
  const available = inventory[req.params.productId] ?? 0;
  res.json({ productId: req.params.productId, available });
});

inventoryApp.listen(5000, () => console.log('✅ InventoryService listening on port 5000'));

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 198 – Event-driven architecture: using Kafka or RabbitMQ for event sourcing
// -----------------------------------------------------------------------------
// NOTES:
// 1. Event Sourcing stores state changes as an immutable log of events.
// 2. Each event represents a fact (e.g., Order.Created, Order.Updated).
// 3. Services publish events to a broker; event handlers consume and update their own projections.
// 4. Kafka: durable, partitioned log with offset management; ideal for high-throughput, replayable event logs.
// 5. RabbitMQ: flexible routing with exchanges/queues; good for smaller systems and complex routing.
// 6. Build projections (read models) by replaying events from the event log.
// -----------------------------------------------------------------------------

// === A) RabbitMQ Event Sourcing (amqplib) ===
const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchange = 'events';
  await channel.assertExchange(exchange, 'topic', { durable: true });

  // Publish an event
  function publishEvent(type, payload) {
    const event = { type, payload, timestamp: new Date().toISOString() };
    channel.publish(exchange, type, Buffer.from(JSON.stringify(event)), { persistent: true });
    console.log('Published event', event);
  }

  // Consume events and update projection
  const q = await channel.assertQueue('order-service');
  await channel.bindQueue(q.queue, exchange, 'Order.*');
  channel.consume(q.queue, msg => {
    const event = JSON.parse(msg.content.toString());
    handleEvent(event);
    channel.ack(msg);
  }, { noAck: false });

  function handleEvent(event) {
    switch (event.type) {
      case 'Order.Created':
        // e.g., insert into orders projection store
        console.log('Handle Order.Created', event.payload);
        break;
      case 'Order.Updated':
        console.log('Handle Order.Updated', event.payload);
        break;
      // add more cases as needed
    }
  }

  // Example usage
  publishEvent('Order.Created', { id: '123', items: [{ productId: 'p1', qty: 2 }] });
})();


// === B) Kafka Event Sourcing (kafkajs) ===
const { Kafka } = require('kafkajs');

(async () => {
  const kafka = new Kafka({ clientId: 'order-service', brokers: ['localhost:9092'] });
  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: 'order-service-group' });

  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  // Publish an event
  async function publishEvent(type, payload) {
    const event = { type, payload, timestamp: new Date().toISOString() };
    await producer.send({
      topic: 'order-events',
      messages: [{ key: event.type, value: JSON.stringify(event) }],
    });
    console.log('Published event', event);
  }

  // Consume events and update projection
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      handleEvent(event);
    }
  });

  function handleEvent(event) {
    switch (event.type) {
      case 'Order.Created':
        console.log('Handle Order.Created', event.payload);
        break;
      case 'Order.Updated':
        console.log('Handle Order.Updated', event.payload);
        break;
      // add more cases as needed
    }
  }

  // Example usage
  await publishEvent('Order.Created', { id: '456', items: [{ productId: 'p2', qty: 1 }] });
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 199 – Saga pattern for distributed transactions: orchestration vs choreography
// -----------------------------------------------------------------------------
// NOTES:
// 1. A Saga breaks a distributed transaction into a series of local transactions with compensating actions.
// 2. On failure, compensating transactions rollback prior steps to maintain consistency.
// 3. Orchestration: a central coordinator invokes each step and triggers compensations on error.
// 4. Choreography: each service reacts to events, emits next-step or compensation events—no central coordinator.
// 5. Orchestration gives explicit control; choreography is decentralized and event-driven.
// -----------------------------------------------------------------------------

const EventEmitter = require('events');

// ---------------------
// ORCHESTRATION EXAMPLE
// ---------------------
class SagaOrchestrator {
  constructor() {
    this.compensations = [];
  }

  async execute() {
    try {
      // Step 1: Create Order
      await this.step(createOrder, cancelOrder);
      // Step 2: Reserve Inventory
      await this.step(reserveInventory, releaseInventory);
      // Step 3: Charge Payment
      await this.step(chargePayment, refundPayment);
      console.log('✅ Saga completed successfully');
    } catch (err) {
      console.error('❌ Saga failed:', err.message);
      // Run compensations in reverse order
      for (const compensate of this.compensations.reverse()) {
        try {
          await compensate();
        } catch (e) {
          console.error('⚠️ Compensation failed:', e.message);
        }
      }
    }
  }

  // Helper to execute a step and register its compensation
  async step(actionFn, compensationFn) {
    await actionFn();                  // perform local transaction
    this.compensations.push(compensationFn); // register compensate on failure
  }
}

// Local transaction implementations and compensations
async function createOrder()       { console.log('🔨 createOrder'); }
async function cancelOrder()       { console.log('↩️ cancelOrder'); }
async function reserveInventory()  { console.log('🔨 reserveInventory'); }
async function releaseInventory()  { console.log('↩️ releaseInventory'); }
async function chargePayment()     { console.log('🔨 chargePayment'); }
async function refundPayment()     { console.log('↩️ refundPayment'); }

// Run orchestration saga
new SagaOrchestrator().execute();


// -----------------------
// CHOREOGRAPHY EXAMPLE
// -----------------------
const bus = new EventEmitter();

// Service A: Order Service
bus.on('OrderCreated', async ({ orderId }) => {
  console.log('🛎 OrderService: OrderCreated');
  bus.emit('ReserveInventory', { orderId, items: [] });
});
bus.on('OrderCancelled', ({ orderId }) => {
  console.log('🛑 OrderService: OrderCancelled');
});

// Service B: Inventory Service
bus.on('ReserveInventory', async ({ orderId }) => {
  console.log('🛎 InventoryService: ReserveInventory');
  const success = true; // simulate
  if (success) bus.emit('InventoryReserved', { orderId });
  else      bus.emit('InventoryFailed',   { orderId });
});
bus.on('InventoryFailed',   ({ orderId }) => {
  console.log('❌ InventoryService: InventoryFailed');
  bus.emit('OrderCancelled', { orderId });
});

// Service C: Payment Service
bus.on('InventoryReserved', async ({ orderId }) => {
  console.log('🛎 PaymentService: InventoryReserved');
  const success = true; // simulate
  if (success) bus.emit('PaymentCharged', { orderId });
  else      bus.emit('PaymentFailed',   { orderId });
});
bus.on('PaymentFailed',     ({ orderId }) => {
  console.log('❌ PaymentService: PaymentFailed');
  bus.emit('ReleaseInventory', { orderId });
});

// Compensation: Release inventory on payment failure
bus.on('ReleaseInventory', ({ orderId }) => {
  console.log('↩️ InventoryService: ReleaseInventory');
  bus.emit('OrderCancelled', { orderId });
});

// Final handler
bus.on('PaymentCharged',    ({ orderId }) => {
  console.log('✅ Choreography Saga completed for', orderId);
});

// Kick off a saga in choreography style
const newOrderId = 'order-123';
bus.emit('OrderCreated', { orderId: newOrderId });

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 200 – API versioning and backward compatibility in microservices
// -----------------------------------------------------------------------------
// NOTES:
// 1. URI versioning: include version in path (e.g., /api/v1/users). Clear but hard to reuse.
// 2. Header versioning: use custom Accept or API-Version header. Flexible but hidden from URL.
// 3. Query versioning: ?version=1. Easy to test but less RESTful.
// 4. Semantic versioning of your API docs helps clients understand breaking vs non-breaking changes.
// 5. Deprecation strategy: support old versions for a grace period, return warnings in headers.
// 6. Backward compatibility: additive changes (new fields/endpoints) are safe; avoid removing fields or changing response types.
// ----------------------------------------------------------------------------- 

const express = require('express');
const app     = express();

// Example data store
const usersV1 = [{ id: 1, name: 'Alice' }];
const usersV2 = [{ id: 1, firstName: 'Alice', lastName: 'Smith' }];

// Middleware to read version from header or default to v1
app.use('/api', (req, res, next) => {
  req.apiVersion = req.header('API-Version') || '1';  // header versioning
  next();
});

// --- URI Versioning ---
// v1: returns { id, name }
app.get('/api/v1/users', (req, res) => {
  res.json(usersV1);
});
// v2: returns { id, firstName, lastName }
app.get('/api/v2/users', (req, res) => {
  res.json(usersV2);
});

// --- Header Versioning on same route ---
// Clients send header: API-Version: 2
app.get('/api/users', (req, res) => {
  if (req.apiVersion === '2') {
    // include new fields, ensure backward-compatible shape
    res.set('Deprecation-Warning', 'v1 will be removed in 90 days');
    return res.json(usersV2);
  }
  res.json(usersV1);
});

// --- Query Versioning example ---
// GET /api/query/users?version=2
app.get('/api/query/users', (req, res) => {
  const v = req.query.version || '1';
  return v === '2' ? res.json(usersV2) : res.json(usersV1);
});

// --- Deprecation endpoint ---
// Inform clients of supported versions
app.get('/api/versions', (req, res) => {
  res.json({
    supported: ['v1', 'v2'],
    deprecated: ['v1'],
    sunsetDate: { v1: '2025-12-31' }
  });
});

// Start server
app.listen(3000, () => {
  console.log('API server listening on port 3000 (versions 1 & 2)');
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



# 201 – Documentation standards for microservices: AsyncAPI for message-driven APIs
# -----------------------------------------------------------------------------
# NOTES:
# 1. AsyncAPI is a specification for defining asynchronous, message-driven APIs (events/streams).
# 2. An AsyncAPI document describes servers (brokers), channels (topics/queues), operations (publish/subscribe), and message schemas.
# 3. Use JSON Schema (or Avro) to define payloads under components.schemas for strong typing.
# 4. Operation IDs and channel bindings help generate code and docs via asyncapi-generator.
# 5. Version your AsyncAPI spec (info.version) and bump with breaking/non-breaking changes.
# 6. Integrate with CI to validate spec (e.g., @asyncapi/cli lint) and publish generated docs.
# -----------------------------------------------------------------------------

asyncapi: '2.6.0'
info:
  title: Order Service Events
  version: '1.0.0'
  description: |
    AsyncAPI specification for the Order Service, defining event channels 
    for created and updated orders.

servers:
  production:
    url: broker.example.com:5672
    protocol: amqp
    description: Production RabbitMQ broker

channels:
  order/created:
    description: Channel for order creation events
    subscribe:
      operationId: onOrderCreated
      summary: Receive notification when a new order is created
      message:
        $ref: '#/components/messages/OrderCreated'
  order/updated:
    description: Channel for order update events
    subscribe:
      operationId: onOrderUpdated
      summary: Receive notification when an existing order is updated
      message:
        $ref: '#/components/messages/OrderUpdated'

components:
  messages:
    OrderCreated:
      summary: Event emitted when an order is created
      payload:
        $ref: '#/components/schemas/OrderCreatedPayload'
    OrderUpdated:
      summary: Event emitted when an order is updated
      payload:
        $ref: '#/components/schemas/OrderUpdatedPayload'

  schemas:
    OrderCreatedPayload:
      type: object
      required:
        - orderId
        - userId
        - items
      properties:
        orderId:
          type: string
        userId:
          type: string
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'

    OrderUpdatedPayload:
      type: object
      required:
        - orderId
        - status
      properties:
        orderId:
          type: string
        status:
          type: string
          enum: [PENDING, CONFIRMED, CANCELLED]

    OrderItem:
      type: object
      required:
        - productId
        - quantity
      properties:
        productId:
          type: string
        quantity:
          type: integer
          minimum: 1

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////




# 202 – Service mesh basics: using Istio or Linkerd for observability, traffic management
# -----------------------------------------------------------------------------
# NOTES:
# 1. Service mesh injects sidecar proxies alongside each service for mTLS, retries, circuit breaking, and metrics.
# 2. Istio uses custom resources (Gateway, VirtualService, DestinationRule) for HTTP/TCP routing, canary releases, and policy.
# 3. Linkerd focuses on simplicity: automatic proxy injection and lightweight telemetry with `linkerd viz`.
# 4. Both mesh control planes integrate with Prometheus/Grafana and provide dashboards (Kiali for Istio, Linkerd-Web).
# -----------------------------------------------------------------------------

# --- Istio setup: enable sidecar injection and define traffic splitting ---
apiVersion: v1
kind: Namespace
metadata:
  name: bookinfo
  labels:
    istio-injection: enabled         # auto-inject Envoy sidecar

---
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: bookinfo-gateway
  namespace: bookinfo
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts:
        - "bookinfo.example.com"

---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews
  namespace: bookinfo
spec:
  hosts:
    - "bookinfo.example.com"
  gateways:
    - bookinfo-gateway
  http:
    - route:
        - destination:
            host: reviews.bookinfo.svc.cluster.local
            subset: v1
          weight: 90
        - destination:
            host: reviews.bookinfo.svc.cluster.local
            subset: v2
          weight: 10             # 10% traffic to v2 for canary
      retries:
        attempts: 3
        perTryTimeout: 2s

---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: reviews
  namespace: bookinfo
spec:
  host: reviews.bookinfo.svc.cluster.local
  subsets:
    - name: v1
      labels: { version: v1 }
    - name: v2
      labels: { version: v2 }
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL         # mTLS enabled
    outlierDetection:
      consecutiveErrors: 5
      interval: 10s
      baseEjectionTime: 30s

# --- Linkerd setup: enable injection and use viz for live telemetry ---
apiVersion: v1
kind: Namespace
metadata:
  name: webapp
  labels:
    linkerd.io/inject: enabled     # auto-inject Linkerd proxy

# After deploying services into 'webapp', you can inspect live traffic with:
#   linkerd viz install | kubectl apply -f -
#   linkerd viz tap deploy/webapp --namespace webapp



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////