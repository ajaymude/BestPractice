
// ⚡ PERFORMANCE OPTIMIZATION
// 113 - Avoiding synchronous fs calls in production: blocking vs non-blocking behavior
// 114 - Clustering: using cluster module to spawn multiple worker processes
// 115 - Worker threads: offloading CPU-intensive tasks to separate threads
// 116 - Load balancing between cluster workers and external load balancers
// 117 - Minimizing serialization overhead for inter-process communication
// 118 - Keeping HTTP keep-alive connections for performance
// 119 - Using HTTP/2 and SPDY with Node.js: built-in http2 module
// 120 - Profiling slow endpoints and optimizing database queries
// 121 - Caching strategies: in-memory caches (Node-cache), Redis, LRU caches
// 122 - Using CDN for static assets served by Node.js (S3, CloudFront, Cloudflare)

// 🔐 SECURITY BEST PRACTICES
// 123 - Using Helmet for setting HTTP headers: XSS protection, HSTS, CSP, X-Frame-Options
// 124 - Sanitizing user input to prevent injection attacks: MongoDB injection, SQL injection
// 125 - Preventing cross-site scripting (XSS) in server-rendered HTML
// 126 - Securing cookies: HttpOnly, Secure, SameSite attributes
// 127 - Implementing rate limiting and request throttling to prevent DDoS
// 128 - Validating and sanitizing request payloads: avoiding prototype pollution
// 129 - Storing secrets and API keys securely: environment variables, Vault, key management
// 130 - Using HTTPS in production: generating TLS certificates, automatic renewal (Let's Encrypt, Certbot)
// 131 - Protecting against vulnerability scanners: hiding server headers, disabling x-powered-by

// 🧪 TESTING & QUALITY ASSURANCE
// 132 - Writing unit tests with Jest: mocking modules, testing functions, code coverage
// 133 - Testing Express endpoints with Supertest: integration testing routes, status codes, responses
// 134 - Using Mocha and Chai for TDD: writing descriptive tests, assertions
// 135 - Sinon for spies, stubs, and mocks in Node.js tests
// 136 - End-to-End testing with Playwright or Cypress against local server
// 137 - Continuous testing in CI: running tests on GitHub Actions, GitLab CI, or Jenkins
// 138 - Linting with ESLint: customizing rules for Node environment (eslint-plugin-node, eslint-config-airbnb-base)
// 139 - Formatting with Prettier and integrating with ESLint via eslint-plugin-prettier

// 🗄 DATABASE DESIGN & OPTIMIZATION
// 140 - Database schema design principles: normalization vs denormalization
// 141 - Indexing strategies for relational and NoSQL databases
// 142 - Connection pooling and managing database connections efficiently
// 143 - Handling database transactions with Sequelize or TypeORM
// 144 - Using Mongoose middleware (pre, post hooks) for data validation and sanitization
// 145 - Implementing soft deletes and audit trails in MongoDB or SQL
// 146 - Sharding and replication in MongoDB: scaling horizontally
// 147 - Read replicas and clustering in PostgreSQL for high availability
// 148 - Using Redis as a session store or cache: configuring TTL, eviction policies


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 113 – Avoiding synchronous fs calls in production: blocking vs non-blocking behavior
// Synchronous fs calls block the event loop, delaying all other I/O. Use async/non-blocking APIs or streams instead.

const fs = require('fs');
const path = require('path');

// ——————————————————————————————————————————————————————————————
// Example 1: Blocking synchronous read (avoid in production)
// Blocks the event loop until file is fully read
try {
  const data = fs.readFileSync(path.join(__dirname, 'large.json'), 'utf8');
  console.log('Sync read complete, length:', data.length);
} catch (err) {
  console.error('Sync read error:', err);
}

// ——————————————————————————————————————————————————————————————
// Example 2: Non-blocking async read (preferred)
// Schedules I/O and invokes callback when done
fs.readFile(path.join(__dirname, 'large.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Async read error:', err);
    return;
  }
  console.log('Async read complete, length:', data.length);
});

// ——————————————————————————————————————————————————————————————
// Example 3: Streaming file data to avoid buffering whole file
// Reads file in chunks, allowing other tasks between reads
const readStream = fs.createReadStream(path.join(__dirname, 'large.json'), { encoding: 'utf8' });
let total = 0;
readStream.on('data', chunk => {
  total += chunk.length;
});
readStream.on('end', () => {
  console.log('Stream read complete, total length:', total);
});
readStream.on('error', err => console.error('Stream error:', err));

// ——————————————————————————————————————————————————————————————
// Example 4: Writing files without blocking
// Async write (non-blocking)
const outputPath = path.join(__dirname, 'out.json');
fs.writeFile(outputPath, JSON.stringify({ foo: 'bar' }), err => {
  if (err) console.error('Async write error:', err);
  else console.log('Async write complete');
});

// Avoid writeFileSync in hot paths
// const outData = fs.writeFileSync(outputPath, JSON.stringify({ foo: 'bar' }));

// ——————————————————————————————————————————————————————————————
// Notes:
// • Sync methods (fs.readFileSync, fs.writeFileSync, fs.existsSync, etc.) block the main thread until completion.
// • Blocking operations should be reserved for startup scripts or small administrative tasks.
// • Use async callbacks, Promises (fs.promises), or streams for I/O in request handlers.
// • Promisified fs: const { readFile, writeFile } = fs.promises; and use async/await.
// • Streams handle large files gracefully, minimizing memory footprint and enabling pipelining.
// • For CPU-bound file processing, consider offloading to worker threads to avoid blocking the event loop.


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 114 – Clustering: using cluster module to spawn multiple worker processes
// The cluster module allows you to take advantage of multi-core systems by forking worker processes.

const cluster = require('cluster');
const http = require('http');
const os = require('os');

// Master process: fork workers
if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers for each CPU
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Listen for dying workers and replace
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}), spawning a new one.`);
    cluster.fork();
  });

} else {
  // Worker process: set up HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker ${process.pid}\n`);
  }).listen(8000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}

// ——————————————————————————————————————————————————————————————
// Notes:
// • cluster.isMaster / cluster.isWorker: detect master or worker context.
// • cluster.fork(): spawn a new worker process running the same script.
// • Use os.cpus().length to determine optimal worker count.
// • Workers share the same server port via IPC; Node distributes connections.
// • Monitor 'exit' event to respawn workers for resilience.
// • Avoid sharing state between workers; use external stores (Redis, database) if needed.
// • Graceful shutdown: listen for signals in workers and disconnect via cluster.disconnect().
// • For advanced use, utilize worker.send() / process.on('message') for master-worker messaging.
// • Production-grade clustering: consider PM2 or Docker orchestration for process management.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 115 – Worker threads: offloading CPU-intensive tasks to separate threads
// The worker_threads module allows running JavaScript in parallel threads, preventing CPU-bound tasks from blocking the event loop.

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Main thread: spawn worker for a heavy computation
  console.log(`Main ${process.pid} is running`);

  // Example: compute Fibonacci of a large number
  function runFibonacci(n) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: n });
      worker.on('message', result => resolve(result));
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

  async function main() {
    console.log('Starting heavy computation...');
    const result = await runFibonacci(45);
    console.log(`Fibonacci result: ${result}`);
    console.log('Main thread continues without blocking');
  }

  main();

} else {
  // Worker thread: perform CPU-intensive task
  const n = workerData;

  // Naive recursive Fibonacci (for demonstration only)
  function fib(x) {
    return x < 2 ? x : fib(x - 1) + fib(x - 2);
  }

  const result = fib(n);
  // Send result back to main thread
  parentPort.postMessage(result);
}

// ——————————————————————————————————————————————————————————————
// Notes:
// • Use Worker to run a separate Node.js instance in a thread. Communicate via message passing.
// • Avoid heavy sync operations on the main thread to keep event loop responsive.
// • Pass initial data via workerData and receive results via parentPort.postMessage().
// • Handle worker errors and exit events to detect failures.
// • For multiple tasks, reuse a WorkerPool to reduce overhead of spawning threads.
// • Use SharedArrayBuffer and Atomics for shared memory scenarios (advanced use-cases).
// • Worker threads can import modules and use require; they run in separate contexts.
// • Remember to terminate workers when no longer needed: worker.terminate().
// • Evaluate whether child_process (fork) or cluster may be simpler for isolation without shared memory.
// • Worker threads require Node.js ≥ 12.17.0; check compatibility for older versions.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 116 – Load balancing between cluster workers and external load balancers
// Distribute incoming connections evenly across Node.js cluster workers and integrate with external L4/L7 balancers (e.g., Nginx).

const cluster = require('cluster');
const http = require('http');
const os = require('os');

// Master process: fork workers and enable round-robin scheduling (Node ≥ 16)
if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Configure scheduler (round-robin) for fair distribution
  cluster.setupMaster({
    silent: false 
  });
  cluster.SCHED_NONE = 'none';
  cluster.SCHED_RR = 'rr';
  // Default on most platforms; can enforce:
  cluster.schedulingPolicy = cluster.SCHED_RR;

  // Fork one worker per CPU
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} died, respawning...`);
    cluster.fork();
  });

} else {
  // Worker: simple HTTP server
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Handled by worker ${process.pid}\n`);
  });

  // Workers listen on the same port; master distributes sockets
  server.listen(8000, () => {
    console.log(`Worker ${process.pid} listening on port 8000`);
  });
}

// ——————————————————————————————————————————————————————————————
// Example 2: External load balancing with Nginx (HTTP Layer)
// Nginx config snippet (nginx.conf):
/*
http {
  upstream my_node_app {
    least_conn;             # distribute based on least connections
    server 127.0.0.1:8000;
    server 127.0.0.1:8000 backup; # if first server fails
    # Add multiple Node.js instances on different ports or hosts
  }

  server {
    listen 80;
    location / {
      proxy_pass http://my_node_app;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}
*/

// ——————————————————————————————————————————————————————————————
// Example 3: Sticky sessions with ip_hash
/*
upstream my_node_app {
  ip_hash;                # route based on client IP hash
  server 127.0.0.1:8000;
  server 127.0.0.1:8001;
}
*/

// ——————————————————————————————————————————————————————————————
// Notes:
// • Node.js cluster schedulingPolicy = SCHED_RR enables round-robin on incoming sockets.
// • External L4 balancers (AWS ELB/GCP LB) distribute TCP connections; ensure all workers listen on same port.
// • Nginx (L7) load balances HTTP requests; upstream blocks define backend pool and algorithm (round-robin, least_conn, ip_hash).
// • Sticky sessions can be achieved with ip_hash or cookies for session affinity.
// • Monitor worker health and restart on failures for resilience.
// • If behind a proxy, trust X-Forwarded-* headers in Express: app.set('trust proxy', true).
// • Balance between process-level (cluster) and network-level (Nginx) load balancing for scaling flexibility.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 117 – Minimizing serialization overhead for inter-process communication
// IPC between Node.js processes or threads often involves serializing data (JSON.stringify), which can be expensive.
// Strategies: use transferable objects, zero-copy buffers, binary formats, or structured cloning for efficiency.

const { Worker, isMainThread, parentPort } = require('worker_threads');
const cluster = require('cluster');
const os = require('os');

// ——————————————————————————————————————————————————————————————
// Example 1: Transferring ArrayBuffer/TypedArray to Worker Threads (zero-copy)
if (isMainThread) {
  const buffer = new SharedArrayBuffer(1024 * 4);
  const view = new Uint8Array(buffer);
  // Fill with data
  for (let i = 0; i < view.length; i++) view[i] = i % 256;

  const worker = new Worker(__filename);
  // Transfer ownership of buffer instead of copying
  worker.postMessage({ buffer }, [buffer]);
  worker.on('message', msg => console.log('Worker replied:', msg));
} else {
  parentPort.once('message', ({ buffer }) => {
    const view = new Uint8Array(buffer);
    // Process data in-place without copy
    const sum = view.reduce((a, b) => a + b, 0);
    parentPort.postMessage({ sum });
  });
}

// ——————————————————————————————————————————————————————————————
// Example 2: Sending Buffer objects via cluster IPC (zero-copy)
if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) cluster.fork();
  for (const id in cluster.workers) {
    const buf = Buffer.alloc(1024 * 10, 'a');
    cluster.workers[id].send({ buf }, buf.buffer); // transfer underlying ArrayBuffer
  }
} else {
  process.on('message', ({ buf }) => {
    console.log(`Worker ${process.pid} received buffer length:`, buf.length);
  });
}

// ——————————————————————————————————————————————————————————————
// Example 3: Protocol Buffers for structured binary serialization
// Define message schema (.proto) and compile to JS; use protobufjs for runtime
// npm install protobufjs

/*
// user.proto
syntax = "proto3";
message User {
  uint32 id = 1;
  string name = 2;
  repeated float scores = 3;
}
*/
const protobuf = require('protobufjs');
protobuf.load('user.proto').then(root => {
  const User = root.lookupType('User');
  const payload = { id: 1, name: 'Alice', scores: [10.5, 9.2] };
  const errMsg = User.verify(payload);
  if (errMsg) throw Error(errMsg);
  const message = User.create(payload);
  const buffer = User.encode(message).finish(); // efficient buffer
  const decoded = User.decode(buffer);
  console.log('Decoded via Protobuf:', decoded);
});

// ——————————————————————————————————————————————————————————————
// Example 4: MessagePack for compact binary encoding
// npm install @msgpack/msgpack
const { encode, decode } = require('@msgpack/msgpack');
const obj = { a: 1, b: 'text', c: [1,2,3] };
const packed = encode(obj); // Uint8Array
const unpacked = decode(packed);
console.log('Decoded via MessagePack:', unpacked);

// ——————————————————————————————————————————————————————————————
// Notes:
// • TransferList in postMessage avoids deep copy: transferable objects include ArrayBuffer, MessagePort, and more.
// • SharedArrayBuffer enables true shared memory without serialization overhead.
// • Buffers in cluster.send can share underlying memory via buf.buffer transfer.
// • Binary protocols (Protocol Buffers, MessagePack) serialize faster and more compactly than JSON.
// • Avoid JSON.stringify/parse in hot IPC paths; use binary formats or structured cloning.
// • Consider keeping data in memory-shared buffers and passing only control messages.
// • Profile and benchmark serialization methods under real workloads to choose optimal strategy.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 118 – Keeping HTTP keep-alive connections for performance
// HTTP keep-alive (persistent connections) reuses TCP connections for multiple HTTP requests, reducing latency and CPU/memory overhead.

const http = require('http');
const express = require('express');

// ——————————————————————————————————————————————————————————————
// Example 1: Native HTTP server with keep-alive
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Connection': 'keep-alive' // instruct client to keep connection open
  });
  res.end('Hello with keep-alive!');
});

// Set server timeout for idle connections (e.g., 2 minutes)
server.keepAliveTimeout = 2 * 60 * 1000;
server.headersTimeout = 2 * 60 * 1000 + 1000; // must be > keepAliveTimeout

server.listen(3000, () => console.log('HTTP server with keep-alive on port 3000'));

// ——————————————————————————————————————————————————————————————
// Example 2: Using HTTP.Agent on the client side
// Reuse TCP sockets for multiple outbound requests
const keepAliveAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 10,        // maximum concurrent sockets
  keepAliveMsecs: 1000   // keep sockets alive for 1 second
});

function fetchData(path) {
  return new Promise((resolve, reject) => {
    const options = { host: 'localhost', port: 3000, path, agent: keepAliveAgent };
    http.get(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  // Multiple requests reuse the same socket
  console.log(await fetchData('/'));
  console.log(await fetchData('/'));
})();

// ——————————————————————————————————————————————————————————————
// Example 3: Express server default keep-alive
const app = express();
app.get('/json', (req, res) => res.json({ time: Date.now() }));

const expressServer = app.listen(3001, () => console.log('Express with keep-alive on port 3001'));
// Express inherits Node's default Agent and keepAlive settings

// ——————————————————————————————————————————————————————————————
// Example 4: Tuning maxConnections and socketTimeout on server
// Limit max simultaneous connections to protect resources
expressServer.maxConnections = 1000;
expressServer.timeout = 120 * 1000; // socket timeout (ms)

// ——————————————————————————————————————————————————————————————
// Notes:
// • Set 'Connection: keep-alive' header on responses to maintain the TCP connection.
// • Configure server.keepAliveTimeout and headersTimeout to control idle socket lifetime.
// • Use a persistent HTTP.Agent on the client to reuse sockets (node http/https modules).
// • Tune Agent options: keepAlive, maxSockets, keepAliveMsecs based on workload.
// • On Express, default keep-alive is enabled; adjust server.timeout and maxConnections.
// • Monitor socket pool metrics (free vs active sockets) to detect exhaustion.
// • Beware of resource leaks: always destroy sockets on errors or application shutdown.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 119 – Using HTTP/2 and SPDY with Node.js: built-in http2 module
// HTTP/2 (and SPDY predecessor) enables multiplexed streams, header compression (HPACK), and server push.

const http2 = require('http2');
const fs = require('fs');

// ——————————————————————————————————————————————————————————————
// Example 1: HTTP/2 secure (TLS) server
const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
});

server.on('stream', (stream, headers) => {
  // Request headers available in `headers`
  const path = headers[':path'];

  // Server push: preemptively send /style.css when requesting /
  if (path === '/') {
    stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
      if (!err) {
        pushStream.respond({
          'content-type': 'text/css',
          ':status': 200
        });
        pushStream.end('body { background: #eef; }');
      }
    });
  }

  // Main response
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200
  });
  stream.end(`<html><head><link rel="stylesheet" href="/style.css"></head><body><h1>HTTP/2 Server</h1></body></html>`);
});

server.listen(8443, () => console.log('HTTP/2 TLS server listening on port 8443'));

// ——————————————————————————————————————————————————————————————
// Example 2: HTTP/2 plaintext (h2c) server
const plain = http2.createServer();
plain.on('stream', (stream, headers) => {
  stream.respond({ ':status': 200, 'content-type': 'text/plain' });
  stream.end('Hello over h2c');
});
plain.listen(8080, () => console.log('HTTP/2 cleartext server on port 8080'));

// ——————————————————————————————————————————————————————————————
// Example 3: HTTP/2 client request
(async () => {
  const client = http2.connect('https://localhost:8443', {
    ca: fs.readFileSync('server.crt') // trust self-signed cert
  });

  // Simple GET
  const req = client.request({ ':path': '/' });
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    console.log('Response:', data);
    client.close();
  });
  req.end();
})();

// ——————————————————————————————————————————————————————————————
// Example 4: Using SPDY module (fallback/backwards compatibility)
// npm install spdy
const spdy = require('spdy');

spdy.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, (req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hello via SPDY');
}).listen(8444, () => console.log('SPDY server on port 8444'));

// ——————————————————————————————————————————————————————————————
// Notes:
// • HTTP/2 multiplexes multiple streams over one TCP connection, reducing latency.
// • Use HPACK header compression for smaller header frames.
// • Server push (`pushStream`) sends resources proactively.
// • For plaintext HTTP/2 (h2c), use cleartext server but many clients require TLS.
// • Always handle TLS certificates; browsers need valid certs or configure `NODE_TLS_REJECT_UNAUTHORIZED=0` for testing.
// • The spdy module supports HTTP/2 and SPDY for older clients.
// • Monitor active sessions and stream counts with `session.remoteSettings` and `session.socket` events.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 120 – Profiling slow endpoints and optimizing database queries
// Identifying and fixing bottlenecks in HTTP handlers and database operations for improved performance.

const express = require('express');
const { performance } = require('perf_hooks');
const mongoose = require('mongoose'); // or any DB client

const app = express();

// ——————————————————————————————————————————————————————————————
// Example 1: Measuring endpoint latency with middleware
app.use((req, res, next) => {
  const start = performance.now();
  res.on('finish', () => {
    const duration = (performance.now() - start).toFixed(2);
    console.log(`${req.method} ${req.originalUrl} – ${res.statusCode} – ${duration} ms`);
  });
  next();
});

app.get('/api/items', async (req, res, next) => {
  try {
    const items = await mongoose.model('Item').find({});
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Example 2: Logging and alerting on slow requests
const THRESHOLD_MS = 200;
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > THRESHOLD_MS) {
      console.warn(`Slow request: ${req.method} ${req.originalUrl} took ${duration} ms`);
      // send alert to monitoring system here
    }
  });
  next();
});

// ——————————————————————————————————————————————————————————————
// Example 3: Profiling MongoDB query execution
async function fetchWithExplain() {
  const collection = mongoose.connection.collection('items');
  const explain = await collection.find({ category: 'tools' })
    .limit(100)
    .sort({ createdAt: -1 })
    .explain('executionStats');
  console.log('Query execution stats:', explain.executionStats);
  return collection.find({ category: 'tools' }).limit(100).sort({ createdAt: -1 }).toArray();
}

app.get('/api/tools', async (req, res, next) => {
  try {
    const tools = await fetchWithExplain();
    res.json(tools);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Example 4: Using SQL prepared statements and indexing (PostgreSQL)
// const { Pool } = require('pg');
// const pool = new Pool({ /* connection config */ });
//
// app.get('/api/users/:id', async (req, res, next) => {
//   try {
//     const start = Date.now();
//     const result = await pool.query(
//       'SELECT * FROM users WHERE id = $1',
//       [req.params.id]
//     );
//     console.log('SQL query time:', Date.now() - start, 'ms');
//     res.json(result.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// });
//
// -- In PostgreSQL: CREATE INDEX idx_users_id ON users(id);

// ——————————————————————————————————————————————————————————————
// Example 5: Caching frequent DB queries in Redis
const Redis = require('ioredis');
const redis = new Redis();

async function cachedQuery(key, ttl, fn) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const result = await fn();
  await redis.set(key, JSON.stringify(result), 'EX', ttl);
  return result;
}

app.get('/api/featured', async (req, res, next) => {
  try {
    const data = await cachedQuery('featured_items', 60, () =>
      mongoose.model('Item').find({ featured: true }).lean()
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • Use middleware to log request durations and identify slow endpoints.
// • Set thresholds and integrate with monitoring/alerting (e.g., Prometheus, Grafana).
// • For MongoDB, use .explain('executionStats') to see index usage and execution time.
// • In SQL, leverage prepared statements and ensure proper indexing on filter/sort fields.
// • Cache infrequently changing or heavy queries in Redis to reduce DB load.
// • Profile full request lifecycle (application code + DB) for end-to-end visibility.
// • Consider APM tools (New Relic, Datadog) for transaction tracing and deeper insights.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 121 – Caching strategies: in-memory caches (Node-cache), Redis, LRU caches
// Effective caching reduces latency, database load, and improves throughput. Choose strategy by data size, TTL requirements, and application scale.

// ——————————————————————————————————————————————————————————————
// Example 1: In-memory caching with Node-cache
// npm install node-cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL 60s, cleanup every 120s

async function getDataWithInMemoryCache(key, fetchFn) {
  const cached = cache.get(key);
  if (cached) {
    console.log('Node-cache HIT for', key);
    return cached;
  }
  console.log('Node-cache MISS for', key);
  const data = await fetchFn();
  cache.set(key, data);
  return data;
}

// Usage in an endpoint
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await getDataWithInMemoryCache('usersList', () => fetchUsersFromDb());
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Example 2: Distributed caching with Redis (ioredis)
// npm install ioredis
const Redis = require('ioredis');
const redis = new Redis({ host: 'localhost', port: 6379 });

async function getDataWithRedisCache(key, ttl, fetchFn) {
  const cached = await redis.get(key);
  if (cached) {
    console.log('Redis HIT for', key);
    return JSON.parse(cached);
  }
  console.log('Redis MISS for', key);
  const data = await fetchFn();
  await redis.set(key, JSON.stringify(data), 'EX', ttl);
  return data;
}

// Usage example
app.get('/api/products', async (req, res, next) => {
  try {
    const products = await getDataWithRedisCache('productsList', 300, () => fetchProductsFromDb());
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Example 3: LRU caching with lru-cache
// npm install lru-cache
const LRU = require('lru-cache');
const lru = new LRU({ max: 500, ttl: 1000 * 60 * 5 }); // max 500 items, 5m TTL

function getDataWithLruCache(key, fetchFn) {
  if (lru.has(key)) {
    console.log('LRU-cache HIT for', key);
    return Promise.resolve(lru.get(key));
  }
  console.log('LRU-cache MISS for', key);
  return fetchFn().then(data => {
    lru.set(key, data);
    return data;
  });
}

// Usage example
app.get('/api/orders/:id', async (req, res, next) => {
  try {
    const order = await getDataWithLruCache(`order:${req.params.id}`, () => fetchOrderFromDb(req.params.id));
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • Node-cache is quick to set up for simple per-instance caches; data lost on process restart.
// • Redis provides distributed cache across processes/servers; supports TTL, persistence, eviction policies.
// • LRU caches evict least-recently-used entries automatically; ideal for size-limited caches.
// • Use in-memory caches for small data sets and low concurrency; Redis for shared or large-scale caching.
// • Combine strategies: LRU in front of Redis to reduce network hops and control memory footprint.
// • Always handle cache stampede: use locking or request coalescing to prevent thundering herd.
// • Monitor cache metrics: hit rate, memory usage, eviction count, TTL expirations.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 122 – Using CDN for static assets served by Node.js (S3, CloudFront, Cloudflare)
// Offload static asset delivery to a CDN for reduced latency, bandwidth savings, and global distribution.

const express = require('express');
const AWS = require('aws-sdk');

// ——————————————————————————————————————————————————————————————
// Example 1: Uploading assets to S3 and serving via CloudFront URL
const s3 = new AWS.S3({ region: 'us-east-1' });
const bucketName = 'my-app-assets';

async function uploadToS3(key, body) {
  return s3.putObject({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ACL: 'public-read',
    ContentType: 'application/octet-stream'
  }).promise();
}

// After uploading, assets are available at:
// https://<CLOUDFRONT_DOMAIN>/{key}

// ——————————————————————————————————————————————————————————————
// Example 2: Express middleware to rewrite static URLs to CDN
const app = express();
const cdnDomain = 'https://d1234.cloudfront.net';

app.use((req, res, next) => {
  // Rewrite asset requests to CDN
  if (req.path.startsWith('/assets/')) {
    const cdnUrl = `${cdnDomain}${req.path}`;
    return res.redirect(301, cdnUrl);
  }
  next();
});

// Fallback: serve from origin
app.use('/assets', express.static('public/assets'));

// ——————————————————————————————————————————————————————————————
// Example 3: Signed CDN URLs for private content
function getSignedUrl(key, expiresSeconds=300) {
  const cloudfront = new AWS.CloudFront.Signer(
    process.env.CF_KEY_PAIR_ID,
    process.env.CF_PRIVATE_KEY.replace(/\\n/g, '\n')
  );
  return cloudfront.getSignedUrl({
    url: `${cdnDomain}/${key}`,
    expires: Math.floor(Date.now()/1000) + expiresSeconds
  });
}

app.get('/download/:file', (req, res) => {
  const signedUrl = getSignedUrl(`protected/${req.params.file}`);
  res.json({ url: signedUrl });
});

// ——————————————————————————————————————————————————————————————
// Example 4: Cloudflare integration via DNS and caching headers
// Point your DNS CNAME (cdn.example.com) to your origin or Cloudflare distribution.

app.get('/images/:img', (req, res) => {
  // Use origin to pass through or let Cloudflare cache
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=31536000');
  res.sendFile(path.join(__dirname, 'public/images', req.params.img));
});

// In Cloudflare dashboard:
// • Enable "Cache Everything" page rule for /images/*
// • Set Edge Cache TTL according to s-maxage header
// • Use Origin Pull to fetch from your server only when needed

// ——————————————————————————————————————————————————————————————
// Notes:
// • Host static files in S3 and front with CloudFront for global edge caching.
// • Use origin failover and regional edge caches to reduce latency.
// • Rewrite or proxy asset URLs in your app to point to the CDN domain.
// • For private assets, generate signed URLs with limited TTL via CloudFront Signer.
// • On Cloudflare, configure cache rules and use cache headers to control TTL.
// • Monitor CDN cache hit rates and origin traffic to optimize cache policies.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 123 – Using Helmet for setting HTTP headers: XSS protection, HSTS, CSP, X-Frame-Options
// Helmet is an Express middleware that helps secure apps by setting various HTTP headers.

const express = require('express');
const helmet = require('helmet');
const app = express();

// ——————————————————————————————————————————————————————————————
// Apply Helmet with default protections
app.use(helmet());

// ——————————————————————————————————————————————————————————————
// Example 1: XSS Protection and MIME-sniffing prevention
// helmet.xssFilter() sets X-XSS-Protection header; deprecated in modern browsers
// helmet.noSniff() sets X-Content-Type-Options: 'nosniff'
app.use(helmet.noSniff());

// ——————————————————————————————————————————————————————————————
// Example 2: HTTP Strict Transport Security (HSTS)
// Enforce HTTPS; max-age in seconds, includeSubDomains, preload
app.use(helmet.hsts({
  maxAge: 90 * 24 * 60 * 60, // 90 days in seconds
  includeSubDomains: true,
  preload: true
}));

// ——————————————————————————————————————————————————————————————
// Example 3: Content Security Policy (CSP)
// Defines approved sources for scripts, styles, images, etc.
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'cdnjs.cloudflare.com'],
    styleSrc: ["'self'", 'fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: []
  }
}));

// ——————————————————————————————————————————————————————————————
// Example 4: X-Frame-Options to prevent clickjacking
// DENY: disallow all framing; or SAMEORIGIN to allow from same site
app.use(helmet.frameguard({
  action: 'deny'
}));

// ——————————————————————————————————————————————————————————————
// Example 5: Referrer-Policy and Cross-Origin Resource Policy
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'same-site' }));

// ——————————————————————————————————————————————————————————————
// Example 6: Customizing Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if using a separate config
    frameguard: { action: 'sameorigin' } // override frameguard action
  })
);

// ——————————————————————————————————————————————————————————————
// Notes:
// • helmet() enables a default set of security headers; review Helmet docs for details.
// • CSP is critical to mitigate XSS; tailor directives to your application’s needs.
// • HSTS forces browsers to use HTTPS; ensure valid TLS before enabling.
// • Frameguard (X-Frame-Options) protects against clickjacking.
// • Other Helmet modules: dnsPrefetchControl, expectCt, hidePoweredBy, ieNoOpen, xssFilter.
// • Test headers with tools like curl or security scanners (e.g., Mozilla Observatory).
// • Keep Helmet and its dependencies up-to-date to cover new browser security features.

app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

const server = app.listen(3000, () => console.log('Server running on port 3000'));

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 124 – Sanitizing user input to prevent injection attacks: MongoDB injection, SQL injection
// Always validate and sanitize user-supplied data before using in database queries to avoid injection vulnerabilities.

const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(express.json());
// Remove prohibited characters from req.body, req.query, req.params
app.use(mongoSanitize());

// ——————————————————————————————————————————————————————————————
// Example 1: Preventing MongoDB injection with express-mongo-sanitize
// This strips out any keys containing '$' or '.' in req data.
app.post('/users', [
  body('username').isAlphanumeric().trim().escape(),
  body('email').isEmail().normalizeEmail()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // Safe to insert sanitized input
  const User = mongoose.model('User');
  const user = new User({ username: req.body.username, email: req.body.email });
  await user.save();
  res.status(201).json(user);
});

// ——————————————————————————————————————————————————————————————
// Example 2: Protecting against query selector injection
// Avoid directly using user input in filter objects
app.get('/search', [
  query('q').isString().trim().escape()
], async (req, res, next) => {
  const q = req.query.q;
  // Use regex safely, no untrusted operators
  const items = await mongoose.model('Item')
    .find({ name: new RegExp(q, 'i') })
    .lean();
  res.json(items);
});

// ——————————————————————————————————————————————————————————————
// Example 3: SQL injection prevention with parameterized queries
const pool = new Pool({ /* connection config */ });
app.get('/products/:id', [
  param('id').isInt()
], async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  // Use parameterized placeholder $1 to avoid injection
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  res.json(rows[0] || {});
});

// ——————————————————————————————————————————————————————————————
// Example 4: Avoiding dynamic SQL concatenation
// Bad: `... WHERE name = '${req.body.name}'`
// Good: use placeholders
app.post('/products', [
  body('name').isString().trim().escape(),
  body('price').isFloat({ gt: 0 })
], async (req, res, next) => {
  const { name, price } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  res.status(201).json(rows[0]);
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • Use express-validator to validate, sanitize, and escape input fields.
// • express-mongo-sanitize removes MongoDB operators from req data, preventing injection via $ operators.
// • Always use parameterized queries (prepared statements) in SQL libraries to separate code and data.
// • Avoid building query strings by concatenating user input.
// • For complex SQL, use ORM/Query Builders (e.g., Sequelize, Knex) that handle sanitization.
// • Regularly audit dependencies and keep libraries up-to-date to patch vulnerabilities.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 125 – Preventing cross-site scripting (XSS) in server-rendered HTML
// When generating HTML on the server, ensure user-supplied content is properly escaped or sanitized to prevent XSS attacks.

const express = require('express');
const helmet = require('helmet');
const xss = require('xss'); // or any trusted sanitizer
const app = express();

// Use Helmet to set secure headers (CSP, XSS protection)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  }
}));

// Example 1: Manual HTML escaping
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/manual-escape', (req, res) => {
  const userInput = req.query.comment || '';
  // Escape before embedding in HTML
  const safeComment = escapeHtml(userInput);
  res.send(`<p>User says: ${safeComment}</p>`);
});

// ——————————————————————————————————————————————————————————————
// Example 2: Using a templating engine with built-in escaping (e.g., Pug)
app.set('view engine', 'pug');
app.get('/pug-template', (req, res) => {
  const username = req.query.name || 'Guest';
  // Pug automatically escapes variables in templates
  res.render('profile', { username });
});
// In profile.pug:
//   html
//     head
//       title Profile
//     body
//       h1 Hello #{username}

// ——————————————————————————————————————————————————————————————
// Example 3: Sanitizing rich HTML input
// Allow only a safe subset of tags/attributes
const sanitizerOptions = {
  whiteList: {
    a: ['href', 'title', 'target'],
    b: [],
    i: [],
    u: [],
    p: [],
    br: []
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script']
};
app.post('/rich-comment', express.urlencoded({ extended: false }), (req, res) => {
  const rawHtml = req.body.comment || '';
  // Sanitize using xss module
  const cleanHtml = xss(rawHtml, sanitizerOptions);
  res.send(`<div>${cleanHtml}</div>`);
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • Always escape user input before inserting into HTML to prevent script injection.
// • Prefer templating engines (Pug, EJS, Handlebars) that auto-escape variables by default.
// • For rich text, use a whitelist-based sanitizer (e.g., xss, DOMPurify) to allow safe HTML.
// • Implement a strict Content Security Policy (CSP) to limit script sources and mitigate XSS.
// • Avoid using user input directly in inline event handlers or <script> blocks.
// • Regularly review and update sanitizer configurations to cover new HTML features and attack vectors.

const server = app.listen(3000, () => console.log('App listening on port 3000'));

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 126 – Securing cookies: HttpOnly, Secure, SameSite attributes
// Proper cookie attributes help mitigate XSS, CSRF, and man-in-the-middle attacks.

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// ——————————————————————————————————————————————————————————————
// Example 1: Setting a basic secure cookie
app.get('/set-basic-cookie', (req, res) => {
  res.cookie('sessionId', 'abc123', {
    httpOnly: true,    // inaccessible to JavaScript (prevents XSS theft)
    secure: true,      // send only over HTTPS (avoids MITM on HTTP)
    sameSite: 'lax',   // protect against CSRF on unsafe methods
    maxAge: 3600000    // 1 hour in milliseconds
  });
  res.send('Basic secure cookie set');
});

// ——————————————————————————————————————————————————————————————
// Example 2: Strict SameSite setting for CSRF protection
app.get('/set-strict-cookie', (req, res) => {
  res.cookie('csrfToken', 'token-value', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',  // cookie only sent for same-site requests
  });
  res.send('Strict SameSite cookie set');
});

// ——————————————————————————————————————————————————————————————
// Example 3: None SameSite for cross-site usage (e.g., SSO)
app.get('/set-none-cookie', (req, res) => {
  res.cookie('externalAuth', 'xyz789', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',    // allow cross-site send
    domain: '.example.com',
    path: '/'
  });
  res.send('None SameSite cookie set');
});

// ——————————————————————————————————————————————————————————————
// Example 4: Clearing cookies securely
app.get('/logout', (req, res) => {
  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });
  res.send('Logged out and cookie cleared');
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • httpOnly: prevents JavaScript access (e.g., document.cookie), mitigating XSS risk.
// • secure: ensures cookies sent only over HTTPS; never set on HTTP-only domains.
// • sameSite: 'lax' allows top-level GET navigations, 'strict' for same-site only, 'none' for cross-site (requires secure).
// • Domain and Path: narrow scope to specific hostnames and URL prefixes.
// • Consider setting Cookie as "Signed" using express-session or cookie-signature to detect tampering.
// • Use short TTLs or session cookies to limit exposure.
// • Monitor cookie flags in browser devtools or security scanners.

const server = app.listen(3000, () => console.log('Server listening on port 3000'));

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 127 – Implementing rate limiting and request throttling to prevent DDoS
// Rate limiting controls the number of requests a client can make in a given time window.
// Prevents abuse, reduces load, and mitigates brute-force or denial-of-service attacks.

// ——————————————————————————————————————————————————————————————
// Example 1: Simple in-memory rate limiter with express-rate-limit
// npm install express-rate-limit
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests
  standardHeaders: true,    // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,     // Disable the deprecated X-RateLimit-* headers
  message: 'Too many requests, please try again later.'
});

// Apply rate limiter to all requests
app.use(limiter);

// ——————————————————————————————————————————————————————————————
// Example 2: Token Bucket algorithm (custom middleware)
function tokenBucket({ tokensPerInterval, interval }) {
  const buckets = new Map();
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    let bucket = buckets.get(key) || { tokens: tokensPerInterval, last: now };

    // Refill tokens based on elapsed time
    const elapsed = now - bucket.last;
    const refill = Math.floor(elapsed / interval) * tokensPerInterval;
    bucket.tokens = Math.min(bucket.tokens + refill, tokensPerInterval);
    bucket.last = now;

    if (bucket.tokens > 0) {
      bucket.tokens--;
      buckets.set(key, bucket);
      next();
    } else {
      res.status(429).send('Rate limit exceeded');
    }
  };
}

// Use: 10 requests per second
app.get('/api/', tokenBucket({ tokensPerInterval: 10, interval: 1000 }), (req, res) => {
  res.send('Success');
});

// ——————————————————————————————————————————————————————————————
// Example 3: Distributed rate limiting with Redis and rate-limiter-flexible
// npm install ioredis rate-limiter-flexible
const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = new Redis();
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rlflx',
  points: 50,            // 50 requests
  duration: 60,          // per 60 seconds by IP
  blockDuration: 300     // block for 5 minutes if consumed
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.set('Retry-After', String(Math.ceil(rejRes.msBeforeNext / 1000)));
    res.status(429).send('Too Many Requests');
  }
});

// ——————————————————————————————————————————————————————————————
// Example 4: Endpoint-specific limits
// Apply stricter limits on login endpoint to prevent brute force
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: 'Too many login attempts, please try again after 10 minutes.'
});
app.post('/login', loginLimiter, (req, res) => {
  // login logic here
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • In-memory limiters (express-rate-limit) are simple but not suitable for multi-instance deployments.
// • Token Bucket algorithm offers precise control over refill and burst capacity.
// • Redis-based limiters (rate-limiter-flexible) support clustering and persistence.
// • Always set appropriate Retry-After or RateLimit headers for client guidance.
// • Combine rate limiting with IP blacklists, CAPTCHAs, and request validation for layered defense.
// • Monitor rate limit metrics (blocked requests, remaining tokens) to adjust thresholds.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 128 – Validating and sanitizing request payloads: avoiding prototype pollution
// Prototype pollution occurs when attacker-supplied keys like __proto__ or constructor are injected into objects, altering application behavior.

const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(express.json());
// Strip out any keys beginning with '$' or containing '.' (for MongoDB) and neutralize prototype keys
app.use(mongoSanitize({
  replaceWith: '_'
}));

// Custom middleware to remove proto pollution keys from body and query
function preventProtoPollution(obj) {
  for (const key in obj) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      preventProtoPollution(obj[key]);
    }
  }
}

app.use((req, res, next) => {
  preventProtoPollution(req.body);
  preventProtoPollution(req.query);
  next();
});

// ——————————————————————————————————————————————————————————————
// Example: Validating and sanitizing user profile payload
app.post('/profile', [
  body('username')
    .isAlphanumeric().withMessage('Username must be alphanumeric')
    .trim().escape(),
  body('email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),
  body('age')
    .optional().isInt({ min: 0, max: 120 }).toInt()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Safe to use req.body without risk of prototype pollution or invalid data
  const user = {
    username: req.body.username,
    email: req.body.email,
    age: req.body.age || null
  };
  // ... perform create/update operations
  res.json({ message: 'Profile saved', user });
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • express-mongo-sanitize removes MongoDB operators ($) and can be configured to replace keys.
// • Custom recursion strips __proto__, constructor, and prototype keys from nested payloads.
// • Use express-validator to validate and sanitize fields (escape, trim, normalize).
// • Always whitelist expected properties rather than merging entire req.body into application objects.
// • For deep sanitization, consider libraries like lodash.clonedeep with __proto__ filtering.
// • Regularly audit dependencies for prototype pollution vulnerabilities and keep them updated.

const server = app.listen(3000, () => console.log('Server listening on port 3000'));

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 129 – Storing secrets and API keys securely: environment variables, Vault, key management
// Secure secret storage is vital to protect credentials, API keys, and other sensitive configuration data.

require('dotenv').config(); // load .env into process.env
const express = require('express');
const app = express();

// Example 1: Environment Variables with dotenv
// .env file should be gitignored
// DB_PASSWORD=supersecret
// API_KEY=abcd1234
app.get('/env-info', (req, res) => {
  res.json({ dbPasswordLength: process.env.DB_PASSWORD.length, hasApiKey: !!process.env.API_KEY });
});

// Example 2: AWS Secrets Manager (AWS SDK v3)
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
async function getAwsSecret(secretName) {
  const client = new SecretsManagerClient({ region: 'us-east-1' });
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return JSON.parse(response.SecretString);
}

// Example 3: HashiCorp Vault (node-vault)
const vault = require('node-vault')({ endpoint: 'https://vault.example.com', token: process.env.VAULT_TOKEN });
async function getVaultSecret(path) {
  const result = await vault.read(path);
  return result.data;
}

// Example 4: Google Cloud KMS decryption
const { KeyManagementServiceClient } = require('@google-cloud/kms');
async function decryptWithGcp(cipherText) {
  const client = new KeyManagementServiceClient();
  const [response] = await client.decrypt({
    name: 'projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key',
    ciphertext: Buffer.from(cipherText, 'base64'),
  });
  return response.plaintext.toString('utf8');
}

// Notes:
// • Never commit secrets in source; use environment variables or managed secret stores.
// • Vault, AWS Secrets Manager, and GCP KMS provide rotation, auditing, and fine-grained access.
// • For containerized apps, integrate with Kubernetes Secrets or cloud IAM roles.

const server = app.listen(3000, () => console.log('Secret service running on port 3000'));
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


# 130 – Using HTTPS in production: generating TLS certificates, automatic renewal
# -----------------------------------------------------------------------------
# 1. Install Certbot & obtain certificates
sudo apt update && sudo apt install certbot
sudo certbot certonly --standalone \
     --agree-tos -m you@example.com \
     -d example.com -d www.example.com

# 2. Create your HTTPS-enabled Express server (server.js)
cat << 'EOF' > server.js
const fs      = require('fs');
const https   = require('https');
const http    = require('http');
const express = require('express');
const app     = express();

// Simple test endpoint
app.get('/', (_req, res) => {
  res.send('🔒 HTTPS is working!');
});

// Load TLS credentials
const creds = {
  key : fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/fullchain.pem')
};

// Start HTTPS server
https.createServer(creds, app).listen(443, () => {
  console.log('✅ HTTPS server listening on port 443');
});

// Redirect all HTTP → HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80);
EOF

# 3. Run your server
node server.js

# 4. Verify & automate renewal
sudo systemctl status certbot.timer         # ensure auto-renew timer is active
sudo certbot renew --dry-run                # test renewal process
# On successful renewal, reload services automatically:
sudo certbot renew --deploy-hook "systemctl reload nginx"
sudo certbot renew --deploy-hook "pm2 reload all"

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 131 – Protecting against vulnerability scanners: hiding server headers, disabling X-Powered-By
// -----------------------------------------------------------------------------
// • Remove the default “X-Powered-By: Express” header
// • Override or strip the “Server” header sent by Node.js/your proxy
// • Use Helmet’s hidePoweredBy middleware for extra safety
// -----------------------------------------------------------------------------

const express = require('express');
const helmet  = require('helmet');
const http    = require('http');

const app = express();

// 1. Disable Express’s X-Powered-By header
app.disable('x-powered-by');

// 2. Use Helmet to hide or override X-Powered-By
app.use(helmet.hidePoweredBy());

// 3. Custom middleware to remove or override the Server header
app.use((req, res, next) => {
  res.removeHeader('Server');             // strip existing Server header
  res.setHeader('Server', '');            // optionally override with empty or custom value
  next();
});

// 4. Example endpoint
app.get('/', (req, res) => {
  res.send('👍 Headers cleaned!');
});

// 5. Start HTTP server (if behind a proxy like nginx, ensure proxy doesn’t re-add headers)
const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Express server running on port 3000 (headers protected)');
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 132 – Writing unit tests with Jest: mocking modules, testing functions, code coverage
// -----------------------------------------------------------------------------
// THEORY: Unit testing verifies individual “units” of code (functions/modules) in isolation.
//         Jest is a zero-configuration test runner & assertion library for JavaScript.
// -----------------------------------------------------------------------------

// 1. Install & configure Jest
//    • `npm install --save-dev jest` — adds Jest as a dev dependency.
//    • In package.json, add: "test": "jest --coverage"
//      → `--coverage` tells Jest to instrument code and report coverage metrics.
// -----------------------------------------------------------------------------

// 2. Sample module to test (math.js)
// -----------------------------------------------------------------------------
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
// THEORY: Keep modules small and focused so they’re easy to test. Pure functions (no side-effects)
//         are ideal because inputs always map to predictable outputs.

// 3. Sample dependent module (userService.js) — shows mocking external calls
// -----------------------------------------------------------------------------
import axios from 'axios';

export async function fetchUser(id) {
  // THEORY: In real code you often call external services.
//         In unit tests, you don’t want real HTTP requests—so you’ll mock axios.
  const response = await axios.get(`https://api.example.com/users/${id}`);
  return response.data;
}

// 4. Jest configuration file (jest.config.js)
// -----------------------------------------------------------------------------
module.exports = {
  testEnvironment: 'node',           // runs tests in a Node.js–like environment
  collectCoverage: true,             // enable coverage collection
  coverageDirectory: 'coverage',     // output folder for reports
  coverageReporters: ['text', 'lcov'], // human-readable + machine-readable reports
  moduleFileExtensions: ['js', 'json']  // file types Jest will process
};

// THEORY: A config file lets you tweak behavior (e.g. transform, globals, coverage thresholds).

// 5. Writing tests for pure functions (math.test.js)
// -----------------------------------------------------------------------------
import { add, multiply } from './math';

describe('math utils', () => {
  test('add should return sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
    // THEORY: expect(value).toBe(expected) — strict equality assertion.
  });

  test('multiply should return product of two numbers', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});
// THEORY: `describe` groups related tests; `test` (alias `it`) defines individual test cases.

// 6. Testing with mocks for external dependencies (userService.test.js)
// -----------------------------------------------------------------------------
import { fetchUser } from './userService';
import axios from 'axios';

jest.mock('axios');
// THEORY: jest.mock('module') replaces the real module with mock functions you control.

describe('userService', () => {
  test('fetchUser returns user data when axios resolves', async () => {
    const mockData = { id: 1, name: 'Alice' };
    axios.get.mockResolvedValue({ data: mockData });
    // THEORY: mockResolvedValue makes axios.get() return a resolved Promise with given value.

    const result = await fetchUser(1);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
    // THEORY: toEqual does deep equality; toHaveBeenCalledWith verifies the mock was invoked correctly.
  });

  test('fetchUser throws error when axios rejects', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    // THEORY: mockRejectedValue makes the mock return a rejected Promise.

    await expect(fetchUser(2)).rejects.toThrow('Network Error');
    // THEORY: `await expect(promise).rejects.toThrow()` asserts the promise rejects with that error.
  });
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 133 - Testing Express endpoints with Supertest: integration testing routes, status codes, responses
// -----------------------------------------------------------------------------
// THEORY:
// Integration testing checks how different parts (like routes, middleware, and handlers) work together.
// Supertest is a Node.js library for testing HTTP APIs. It simulates HTTP requests directly to your Express app
// without actually starting a server, making it fast and reliable for automated tests.
// Key goals: Verify endpoints, status codes, and JSON responses end-to-end.
//
// STEPS:
// 1. Install dependencies:
//      npm install --save-dev supertest jest
// 2. Export your Express app instance (not .listen()) from your server.js file.
// 3. Write test files using Jest (or Mocha), import your app and supertest, then simulate API requests.
//
// -----------------------------------------------------------------------------
//
// --- server.js --- (app code for demonstration)
const express = require('express');
const app = express();
app.use(express.json());

// Example GET endpoint
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id === 1) {
    return res.json({ id: 1, name: 'Alice' });
  }
  res.status(404).json({ error: 'User not found' });
});

// Example POST endpoint
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ id: 2, name });
});

module.exports = app; // <-- IMPORTANT: Export app for testing

// -----------------------------------------------------------------------------
// --- server.test.js --- (Supertest integration tests)
const request = require('supertest');
const app = require('./server'); // Import the Express app

describe('Express API integration (Supertest)', () => {
  test('GET /users/1 returns 200 and user data', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'Alice' });
  });

  test('GET /users/999 returns 404 and error message', async () => {
    const res = await request(app).get('/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  test('POST /users with name returns 201 and new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Bob' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 2, name: 'Bob' });
  });

  test('POST /users without name returns 400 and validation error', async () => {
    const res = await request(app)
      .post('/users')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Name is required');
  });
});

// -----------------------------------------------------------------------------
// EXPLANATION:
//
// • Supertest's request(app) lets you simulate HTTP requests directly to your app's routes.
// • You can chain methods like .get(), .post(), .send(), and .expect() for flexible tests.
// • Tests verify status codes (res.status) and response bodies (res.body).
// • By testing without spinning up a real server, you get fast, isolated integration tests.
// -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 134 - Using Mocha and Chai for TDD: writing descriptive tests, assertions
// -----------------------------------------------------------------------------
// THEORY:
// • Mocha is a flexible JavaScript test runner—great for both BDD and TDD.
// • Chai is an assertion library, offering 'expect', 'should', and 'assert' styles.
// • TDD (Test-Driven Development) involves writing tests before actual code, focusing on requirements and correctness.
// • Mocha + Chai combo enables you to write clear, human-readable test cases and strong assertions.
//
// STEPS:
// 1. Install dependencies:
//      npm install --save-dev mocha chai
// 2. Add to package.json scripts:
//      "test": "mocha"
// 3. Write test files using .js extension, usually in a /test directory.
//
// -----------------------------------------------------------------------------
//
// --- math.js --- (code under test)
function add(a, b) {
  return a + b;
}

function isEven(n) {
  return n % 2 === 0;
}

module.exports = { add, isEven };

//
// --- math.test.js --- (Mocha & Chai test code)
const { expect } = require('chai');
const { add, isEven } = require('./math');

describe('Math Utilities', () => {
  describe('add()', () => {
    it('should return the sum of two numbers', () => {
      expect(add(2, 3)).to.equal(5);
      expect(add(-1, 1)).to.equal(0);
    });
  });

  describe('isEven()', () => {
    it('should return true for even numbers', () => {
      expect(isEven(4)).to.be.true;
      expect(isEven(0)).to.be.true;
    });

    it('should return false for odd numbers', () => {
      expect(isEven(5)).to.be.false;
      expect(isEven(-3)).to.be.false;
    });
  });
});

// -----------------------------------------------------------------------------
// EXPLANATION:
// • Mocha's `describe()` blocks group related tests for clarity.
// • Each `it()` block specifies a behavior or requirement as a readable sentence.
// • Chai's `expect()` allows expressive assertions (e.g., .to.equal, .to.be.true).
// • With TDD, you’d write these tests first, then implement (or fix) the code to pass them.
// -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 135 - Sinon for spies, stubs, and mocks in Node.js tests
// -----------------------------------------------------------------------------
// THEORY:
// • Sinon is a library for test spies, stubs, and mocks—used for tracking, controlling, and asserting function behavior.
// • Spies: Observe function calls (arguments, call count, etc).
// • Stubs: Replace a function's implementation, control its behavior (returns, errors, etc).
// • Mocks: Like stubs but also verify expectations (e.g., must be called once).
// • Used with Mocha, Chai, or Jest for full-featured test suites.
//
// STEPS:
// 1. Install dependencies:
//      npm install --save-dev sinon mocha chai
// 2. Use in your test files to observe, control, or mock dependencies.
//
// -----------------------------------------------------------------------------
//
// --- math.js --- (example code under test)
function add(a, b) {
  return a + b;
}
module.exports = { add };

//
// --- logger.js --- (another dependency)
function log(msg) {
  console.log(msg);
}
module.exports = { log };

//
// --- mathService.js --- (uses both)
const { add } = require('./math');
const { log } = require('./logger');

function addAndLog(a, b) {
  const result = add(a, b);
  log(`Result: ${result}`);
  return result;
}
module.exports = { addAndLog };

//
// --- mathService.test.js --- (Mocha + Chai + Sinon demo)
const { expect } = require('chai');
const sinon = require('sinon');
const math = require('./math');
const logger = require('./logger');
const { addAndLog } = require('./mathService');

describe('addAndLog', () => {
  afterEach(() => sinon.restore());

  it('should call add and log the result', () => {
    // Spy on math.add and logger.log
    const addSpy = sinon.spy(math, 'add');
    const logSpy = sinon.spy(logger, 'log');

    const result = addAndLog(2, 3);

    expect(result).to.equal(5);
    expect(addSpy.calledOnceWith(2, 3)).to.be.true;
    expect(logSpy.calledOnceWith('Result: 5')).to.be.true;
  });

  it('should stub logger.log to prevent real console output', () => {
    const logStub = sinon.stub(logger, 'log');
    addAndLog(1, 1);
    expect(logStub.calledOnceWith('Result: 2')).to.be.true;
  });
});

// -----------------------------------------------------------------------------
// EXPLANATION:
// • sinon.spy(): Monitors actual function calls—did it run, with which args?
// • sinon.stub(): Replaces the function’s behavior; you control return values, block side-effects.
// • sinon.restore(): Cleans up all spies/stubs/mocks after each test.
// • Used together with Mocha (test runner) and Chai (assertions) for complete test coverage.
// -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 136 - End-to-End testing with Playwright or Cypress against local server
// -----------------------------------------------------------------------------
// THEORY:
// • End-to-End (E2E) tests check the whole application stack—front end, backend, DB, browser, and network.
// • Tools like Playwright and Cypress simulate real user actions (click, fill, navigate) in actual browsers.
// • E2E tests catch integration issues that unit or integration tests can’t (e.g., routing, rendering, API, cookies).
//
// STEPS FOR PLAYWRIGHT EXAMPLE:
// 1. Install Playwright (or Cypress):
//      npm install --save-dev playwright
// 2. Add a script in package.json:
//      "scripts": { "test:e2e": "playwright test" }
// 3. Create a test file: e.g., tests/e2e.spec.js
// 4. Ensure your app server is running (e.g., on http://localhost:3000)
//
// -----------------------------------------------------------------------------
//
// --- tests/e2e.spec.js --- (Playwright E2E example)
const { test, expect } = require('@playwright/test');

test.describe('User flows', () => {
  test('Homepage loads and shows main text', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/My App|Home/i);
    await expect(page.locator('h1')).toHaveText(/welcome/i);
  });

  test('User can sign up', async ({ page }) => {
    await page.goto('http://localhost:3000/signup');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Secret123!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.toast-success')).toHaveText(/welcome|signed up|success/i);
  });
});
//
// -----------------------------------------------------------------------------
// THEORY (Cypress alternative):
// • Cypress tests live in cypress/e2e/ (or cypress/integration/ for older versions)
// • Use cy.visit(), cy.get(), cy.type(), cy.click(), cy.contains(), and cy.should().
//
// Example (Cypress, cypress/e2e/home.cy.js):
// -----------------------------------------------------------------------------
//
// describe('Homepage', () => {
//   it('loads and shows main heading', () => {
//     cy.visit('http://localhost:3000');
//     cy.contains('h1', /welcome/i);
//   });
//
//   it('user can sign up', () => {
//     cy.visit('http://localhost:3000/signup');
//     cy.get('input[name="email"]').type('test@example.com');
//     cy.get('input[name="password"]').type('Secret123!');
//     cy.get('button[type="submit"]').click();
//     cy.get('.toast-success').should('contain', /welcome|signed up|success/i);
//   });
// });
//
// -----------------------------------------------------------------------------
// EXPLANATION:
// • E2E tests simulate real users and verify flows from browser through server & DB.
// • Playwright and Cypress provide powerful APIs for UI automation, screenshots, debugging.
// • Best practice: run E2E tests against a local/dev server with test DB and data seeded/reset.
// -----------------------------------------------------------------------------


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



# 137 - Continuous testing in CI: running tests on GitHub Actions, GitLab CI, or Jenkins
# -----------------------------------------------------------------------------
# THEORY:
# • Continuous Integration (CI) automatically runs your test suite on every push, PR, or merge.
# • CI ensures code stays reliable, preventing bugs before reaching production.
# • Popular CI tools: GitHub Actions (YAML workflow), GitLab CI (YAML pipeline), Jenkins (scripted jobs).
# • Most JS/Node projects run tests using `npm test` or `yarn test` as the main command.
#
# -----------------------------------------------------------------------------
# Example 1: GitHub Actions workflow (in .github/workflows/test.yml)
name: Run Node.js Tests

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm test

# -----------------------------------------------------------------------------
# Example 2: GitLab CI (in .gitlab-ci.yml)
stages:
  - test

test:
  stage: test
  image: node:20
  script:
    - npm install
    - npm test

# -----------------------------------------------------------------------------
# Example 3: Jenkins pipeline (Jenkinsfile)
pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
# -----------------------------------------------------------------------------
# EXPLANATION:
# • These CI pipelines automatically install dependencies and run your tests on every code change.
# • They help detect failures before code is merged or deployed.
# • Artifacts (like coverage reports) can be collected or published in later steps.
# -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 138 - Linting with ESLint: customizing rules for Node environment (eslint-plugin-node, eslint-config-airbnb-base)
// -----------------------------------------------------------------------------
// THEORY:
// • ESLint statically analyzes your JS code to find problems and enforce code style.
// • For Node.js, use node-specific plugins and configs for best practices.
// • eslint-plugin-node: adds Node.js-specific linting rules (e.g., callback errors, no-process-exit).
// • eslint-config-airbnb-base: enforces the Airbnb JavaScript style guide (no React).
// • Custom rules override or extend defaults to fit your team/project.
//
// SETUP STEPS:
// 1. Install ESLint and recommended configs/plugins:
//      npm install --save-dev eslint eslint-plugin-node eslint-config-airbnb-base
//      npm install --save-dev eslint-plugin-import
// 2. Create .eslintrc.js or .eslintrc.json for configuration.
//
// -----------------------------------------------------------------------------
//
// --- .eslintrc.js --- (recommended Node.js + Airbnb base config)
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',         // Airbnb base style guide
    'plugin:node/recommended', // Node.js best practices
  ],
  plugins: [
    'node',
  ],
  rules: {
    'no-console': 'off',           // Allow console.log (useful for Node CLI/tools)
    'node/no-unsupported-features/es-syntax': 'off', // Allow ES modules if using Babel/ESM
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused args if they start with _
    'node/no-unpublished-require': 'off', // For dev dependencies in scripts/tests
    // Add or override any rule as needed
  },
};

// -----------------------------------------------------------------------------
// EXPLANATION:
// • "env.node": true enables Node global variables (require, module, process, etc.).
// • "extends" applies Airbnb's base rules and node/recommended rules.
// • "no-console": 'off' lets you use console.log in Node apps (otherwise Airbnb disables it).
// • Customize "rules" to relax or strengthen any lint check for your team.
// • Run ESLint via CLI: npx eslint .    (lints all files in the project)
// -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 139 - Formatting with Prettier and integrating with ESLint via eslint-plugin-prettier
// -----------------------------------------------------------------------------
// THEORY:
// • Prettier is an opinionated code formatter: auto-formats your JS, CSS, JSON, etc. for consistency.
// • ESLint focuses on code quality and anti-patterns, but can also handle some style rules.
// • Integrate Prettier with ESLint so you get code-quality AND formatting feedback in one step.
// • eslint-plugin-prettier exposes Prettier formatting errors as ESLint errors.
// • eslint-config-prettier disables ESLint rules that conflict with Prettier.
//
// SETUP STEPS:
// 1. Install dependencies:
//      npm install --save-dev prettier eslint eslint-plugin-prettier eslint-config-prettier
// 2. Add .prettierrc (Prettier config) and update your ESLint config.
//
// -----------------------------------------------------------------------------
//
// --- .prettierrc --- (example Prettier settings)
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
//
// --- .eslintrc.js --- (integrating Prettier with ESLint)
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended', // Adds eslint-plugin-prettier & displays Prettier errors as ESLint errors
    'prettier',                    // Disables conflicting ESLint rules
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error', // Fail ESLint on Prettier formatting issues
    // Your custom rules here...
  },
};
//
// -----------------------------------------------------------------------------
// EXPLANATION:
// • "plugin:prettier/recommended" enables Prettier integration and recommended settings.
// • "prettier/prettier": "error" makes code formatting violations block your commit/build.
// • Use Prettier in editors (with plugins) or from CLI: npx prettier --write .
// • Use ESLint from CLI: npx eslint .
// • For best results, enable "Format on Save" in your code editor.
// -----------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
