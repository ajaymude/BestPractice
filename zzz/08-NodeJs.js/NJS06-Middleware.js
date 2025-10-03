// 🔄 MIDDLEWARE & PIPELINE ARCHITECTURES
// 91 - Custom middleware creation: logging, authentication, error handling
// 92 - Third-party middleware: body-parser, cors, helmet for security headers
// 93 - Compression middleware: gzip/deflate via compression package
// 94 - Proxy middleware: http-proxy-middleware for forwarding requests
// 95 - Rate limiting and brute-force protection middleware
// 96 - Caching middleware: cache-control headers, Redis caching in middleware
// 97 - Request/response logging with morgan, Winston, or Bunyan
// 98 - Performance metrics middleware:B measuring request durations, response sizes


// 🔋 STREAMS & BUFFER MANAGEMENT
// 99 - Stream fundamentals: Readable, Writable, Duplex, Transform streams
// 100 - Creating custom streams by extending stream.Writable or stream.Readable
// 101 - Piping streams: piping file streams to HTTP responses, chaining streams
// 102 - Handling backpressure: .pause(), .resume(), highWaterMark settings
// 103 - Transform streams: gzip compression, data transformation, parsing CSV
// 104 - Working with Buffer for binary data: concatenation, slicing, encoding, decoding
// 105 - Stream utilities: pipeline, finished for error handling in stream chains

// 🔍 DEBUGGING & PROFILING
// 106 - Using console methods: log, warn, error, dir, trace
// 107 - Debugging with built-in inspector: node --inspect, chrome://inspect, breakpoints
// 108 - Debugging in VSCode: launch.json configuration, attaching to a running process
// 109 - Exception handling: uncaughtException, unhandledRejection, process.on events
// 110 - Profiling CPU and memory: node --prof, clinic.js (Clinic.js Doctor, Flame), 0x
// 111 - Heap snapshots: Chrome DevTools heap profiler, identifying memory leaks
// 112 - Monitoring event loop latency: using packages like clinic or node-event-loop-lag


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 91 – Custom middleware creation: logging, authentication, error handling
//
// Middleware are functions that intercept requests and responses.
// • Logging middleware records details of each request.
// • Authentication middleware verifies credentials before allowing access.
// • Error-handling middleware catches errors and sends consistent responses.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Request Logging Middleware
const express = require('express');
const app = express();

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
}

app.use(requestLogger);

// ——————————————————————————————————————————————————————————————
// Example 2: Authentication Middleware
// Checks for a Bearer token in Authorization header and validates it.
function authenticate(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/, '');
  if (!token || token !== 'secrettoken123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Optionally attach user info to req.user
  req.user = { id: 1, name: 'Alice' };
  next();
}

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.name}` });
});

// ——————————————————————————————————————————————————————————————
// Example 3: Error-Handling Middleware
// Catches errors passed via next(err) or thrown in async handlers.
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      code: err.code || 'INTERNAL_SERVER_ERROR'
    }
  });
}

app.get('/error-sync', (req, res) => {
  throw new Error('Synchronous failure');
});

app.get('/error-async', async (req, res, next) => {
  try {
    await Promise.reject(Object.assign(new Error('Async failure'), { status: 400, code: 'ASYNC_FAIL' }));
  } catch (err) {
    next(err);
  }
});

// Mount the error handler after all routes
app.use(errorHandler);

// ——————————————————————————————————————————————————————————————
// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 92 – Third-party middleware: body-parser, cors, helmet for security headers
//
// Use battle-tested middleware to handle common concerns:
// • body-parser parses incoming request bodies (JSON, URL-encoded).
// • cors enables Cross-Origin Resource Sharing with fine-grained options.
// • helmet sets secure HTTP headers (HSTS, CSP, XSS protection, etc.).
//
// These middleware should be mounted early in your middleware chain.
//
// ——————————————————————————————————————————————————————————————

// Import express and middleware packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// body-parser middleware examples
// Parse JSON bodies and limit size to prevent DOS via large payloads
app.use(bodyParser.json({ limit: '100kb' }));
// Parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true, limit: '50kb' }));

// cors middleware examples
// Allow all origins (good for public APIs)
app.use(cors());
// Restrict to specific origins and methods
app.use(cors({
  origin: ['https://example.com', 'https://app.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,               // allow cookies/auth headers
  maxAge: 600                      // cache preflight response 10 minutes
}));

// helmet middleware examples
// Set a variety of security headers with sensible defaults
app.use(helmet());
// Customize individual helmet protections
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
    styleSrc: ["'self'", 'fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:']
  }
}));
app.use(helmet.frameguard({ action: 'deny' }));  // prevent clickjacking
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true })); // force HTTPS

// Example routes to demonstrate middleware in action
app.post('/submit', (req, res) => {
  // req.body is already parsed JSON or URL-encoded data
  res.json({ received: req.body });
});

app.get('/secure-data', (req, res) => {
  res.send('This response includes secure headers set by Helmet.');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000 with body-parser, cors, and helmet configured');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 93 – Compression middleware: gzip/deflate via compression package
//
// Use the compression middleware to automatically compress HTTP responses,
// reducing payload size and improving client performance.
// It supports gzip and deflate, negotiates with the client’s Accept-Encoding header,
// and skips compression for specific responses (e.g., small bodies).
// You can configure options like threshold, filter function, and compression level.
//
// Example steps:
// 1. Install: npm install compression
// 2. Require and register middleware early in your Express app.
// 3. Customize options: only compress responses over a certain size,
//    or apply custom logic based on request/response.
//
// Code:

const express = require('express');
const compression = require('compression');

const app = express();

// Default compression (gzip/deflate) for all responses
app.use(compression());

app.get('/large', (req, res) => {
  // This large payload will be compressed
  res.send('A'.repeat(1000));
});

// Only compress responses over 1 KB, and skip compression for requests with ?nocompress
app.use(compression({
  threshold: 1024,                                 // compress bodies larger than 1 KB
  filter: (req, res) => {
    if (req.query.nocompress) return false;        // skip if ?nocompress
    return compression.filter(req, res);           // default filter (checks content-type)
  }
}));

app.get('/conditional', (req, res) => {
  res.send('Conditional compression example');
});

app.listen(3000, () => {
  console.log('Server running on port 3000 with compression enabled');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 94 – Proxy middleware: http-proxy-middleware for forwarding requests
//
// Use http-proxy-middleware to forward certain paths to target servers (e.g., API backends, microservices).
// • Install: npm install http-proxy-middleware
// • Create proxies by mounting middleware on route prefixes.
// • Supports path rewriting, logging, changeOrigin, ws (WebSocket proxying), and more.
// • Useful in development for CORS avoidance or in production behind a gateway.

// Import express and proxy middleware
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Example 1: Simple API proxy
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.example.com',
    changeOrigin: true,            // rewrite Host header to match target
    pathRewrite: { '^/api': '' },  // strip /api prefix before forwarding
    logLevel: 'debug'              // verbose logging
  })
);

// Example 2: WebSocket proxy
app.use(
  '/socket',
  createProxyMiddleware({
    target: 'ws://localhost:4000',
    ws: true,                      // enable websocket proxying
    changeOrigin: true
  })
);

// Example 3: Proxy with multiple routes and custom filter
const apiProxy = createProxyMiddleware({
  target: 'http://backend.internal',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Forwarded-User', req.user?.id || 'guest');
  }
});
app.use('/service1', apiProxy);
app.use('/service2', apiProxy);

// Example 4: Conditional proxy using filter function
app.use(
  createProxyMiddleware((pathname, req) => pathname.startsWith('/dynamic/'), {
    target: 'https://dynamic.example.com',
    changeOrigin: true
  })
);

// Start the server
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
  console.log('Proxying /api → https://api.example.com');
  console.log('Proxying /socket → ws://localhost:4000');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 95 – Rate limiting and brute-force protection middleware
//
// Protect your endpoints from excessive requests and credential guessing attacks.
// • express-rate-limit: throttle requests per IP.
// • Brute-force login protection: specialized middleware (e.g., express-brute).
// • Configure limits, window durations, custom handlers, and persistent stores (Redis).
//
// Installation:
//   npm install express-rate-limit express-brute express-session redis connect-redis

const express       = require('express');
const rateLimit     = require('express-rate-limit');
const ExpressBrute  = require('express-brute');
const RedisStore    = require('express-brute-redis');
const session       = require('express-session');
const Redis         = require('ioredis');

const app = express();
app.use(express.json());

// Global rate limiter: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Login brute-force protection using express-brute + Redis store
const redisClient = new Redis();
const store       = new RedisStore({ client: redisClient });

const bruteForce = new ExpressBrute(store, {
  freeRetries:        5,                  // number of failed attempts allowed
  minWait:            5 * 60 * 1000,      // wait 5 minutes after exhausting retries
  maxWait:            60 * 60 * 1000,     // max wait 1 hour
  failCallback:       (req, res, next, nextValidRequestDate) => {
    res.status(429).json({
      error: 'Too many failed login attempts',
      nextTry: nextValidRequestDate
    });
  }
});

// Session middleware required by express-brute
app.use(session({
  store: new (require('connect-redis')(session))({ client: redisClient }),
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false
}));

// Apply brute-force only to login route
app.post('/login', bruteForce.prevent, (req, res) => {
  const { username, password } = req.body;
  // authenticate user...
  const authenticated = (username === 'admin' && password === 'secret');
  if (!authenticated) {
    // increment failure count
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // reset brute-force counter on successful login
  req.brute.reset(() => {
    res.json({ message: 'Login successful' });
  });
});

// Apply more aggressive limiter to sensitive routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
app.post('/reset-password', authLimiter, (req, res) => {
  // handle password reset
  res.send('Reset link sent if email exists');
});

app.listen(3000, () => {
  console.log('Server running on port 3000 with rate-limit & brute-force protection');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 96 – Caching middleware: cache-control headers, Redis caching in middleware
//
// Use Cache-Control headers to instruct browsers and proxies how long to cache responses.
// Example directives: public, private, max-age, s-maxage, no-cache, no-store.
// For server-side caching, use Redis to store and retrieve full response bodies or JSON data.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Setting Cache-Control headers per route
const express = require('express');
const app = express();

// Cache responses for 60 seconds (public)
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ time: Date.now() });
});

// Prevent caching
app.get('/api/private', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.send('Sensitive data, do not cache');
});

// ——————————————————————————————————————————————————————————————
// Example 2: Global middleware for static assets
app.use('/static', express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
  }
}));

// ——————————————————————————————————————————————————————————————
// Example 3: Redis-backed response caching middleware
const Redis = require('ioredis');
const redis = new Redis();

async function cache(keyPrefix, ttlSeconds) {
  return async (req, res, next) => {
    const key = keyPrefix + req.originalUrl;
    const cached = await redis.get(key);
    if (cached) {
      res.set('X-Cache', 'HIT');
      return res.json(JSON.parse(cached));
    }
    // hijack res.json to cache output
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      res.set('X-Cache', 'MISS');
      redis.set(key, JSON.stringify(body), 'EX', ttlSeconds);
      return originalJson(body);
    };
    next();
  };
}

// Apply caching middleware to an expensive endpoint
app.get('/api/expensive', cache('exp:', 120), async (req, res) => {
  const data = await doExpensiveComputation();
  res.json(data);
});

// ——————————————————————————————————————————————————————————————
// Example 4: Cache invalidation on data update
app.post('/api/update', async (req, res) => {
  await updateData(req.body);
  await redis.del('exp:/api/expensive');  // invalidate cache
  res.sendStatus(204);
});

// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Use Cache-Control with ETag or Last-Modified for conditional GETs.
// • Employ Redis hashes or sorted sets for more granular cache structures.
// • Balance cache TTLs against data staleness and memory usage.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 97 – Request/response logging with morgan, Winston, or Bunyan
//
// • morgan: HTTP request logger middleware for Express (predefined formats, custom tokens).
// • Winston: versatile logging library with transports (console, file, HTTP), log levels, and formats.
// • Bunyan: JSON logging with Streams, serializers, and CLI tools.
// • Use morgan for simple per-request logs; integrate with Winston/Bunyan for full application logging.
// • Capture request method, URL, status code, response time, and contextual metadata (user, requestId).

const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const { createLogger, format, transports } = winston;

const app = express();

// Morgan HTTP request logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Winston application logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

app.use((req, res, next) => {
  req.logger = logger.child({ requestId: req.headers['x-request-id'] || '' });
  next();
});

app.get('/', (req, res) => {
  req.logger.info('Handling root route', { path: req.path });
  res.send('Hello, world!');
});

// Example error logging
app.get('/error', (req, res) => {
  const err = new Error('Something went wrong');
  req.logger.error('Error encountered', { error: err.message });
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  logger.info('Server started on port 3000');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 98 – Performance metrics middleware: measuring request durations, response sizes
//
// • Capture request start time in middleware.
// • Listen for response “finish” event to compute duration.
// • Track bytes sent by monkey-patching res.write and res.end or reading Content-Length.
// • Expose metrics via logs, headers, or integrate with monitoring systems.
//
// Example middleware for Express:

const express = require('express');
const app = express();

// Performance metrics middleware
function metricsMiddleware(req, res, next) {
  const startHrTime = process.hrtime();
  let bytesSent = 0;

  // Monkey-patch write and end to track response size
  const originalWrite = res.write;
  const originalEnd   = res.end;

  res.write = function (chunk, encoding, callback) {
    if (chunk) {
      bytesSent += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
    }
    return originalWrite.call(res, chunk, encoding, callback);
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk) {
      bytesSent += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
    }
    return originalEnd.call(res, chunk, encoding, callback);
  };

  // After response finishes, compute duration and log metrics
  res.on('finish', () => {
    const [sec, nanosec] = process.hrtime(startHrTime);
    const durationMs = sec * 1000 + nanosec / 1e6;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} | ${durationMs.toFixed(2)} ms | ${bytesSent} bytes`);
    // Optionally set headers:
    // res.setHeader('X-Response-Time', `${durationMs.toFixed(2)}ms`);
    // res.setHeader('X-Response-Size', bytesSent);
  });

  next();
}

app.use(metricsMiddleware);

// Example routes
app.get('/', (req, res) => {
  res.send('Hello, performance metrics!');
});

app.get('/large', (req, res) => {
  const data = 'A'.repeat(10 * 1024); // 10 KB
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 99 - Stream Fundamentals: Readable, Writable, Duplex, Transform Streams
// ===================================================================
// This section outlines the four fundamental stream types in Node.js:
// Readable, Writable, Duplex, and Transform. Use these for handling data
// in a memory-efficient, incremental fashion.

const { Readable, Writable, Duplex, Transform } = require('stream');

// -----------------------------
// A. Readable Stream
// -----------------------------
// - Emits data from a source.
// - You consume it via events or piping.

const simpleReadable = new Readable({
  read(size) {
    this.push('Hello');
    this.push('World');
    this.push(null); // End-of-stream
  }
});
simpleReadable.on('data', chunk => console.log('Readable:', chunk.toString()));

// -----------------------------
// B. Writable Stream
// -----------------------------
// - Accepts data to be written to a destination.

const simpleWritable = new Writable({
  write(chunk, encoding, callback) {
    console.log('Writable:', chunk.toString());
    callback();
  }
});
simpleReadable.pipe(simpleWritable); // Pipe demonstrates backpressure handling

// -----------------------------
// C. Duplex Stream
// -----------------------------
// - Can be both Readable and Writable (e.g., sockets).
// - Implement _read() and _write().

class EchoDuplex extends Duplex {
  _write(chunk, encoding, callback) {
    this.push(chunk); // Echo back received data
    callback();
  }
  _read(size) {
    // No-op: data is pushed in _write
  }
}

const echo = new EchoDuplex();
echo.on('data', chunk => console.log('Duplex echoed:', chunk.toString()));
echo.write('Ping');
echo.write('Pong');
echo.end();

// -----------------------------
// D. Transform Stream
// -----------------------------
// - A Duplex that modifies data as it passes through.
// - Implement _transform(chunk, encoding, callback).

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    this.push(upper);
    callback();
  }
}

const upper = new UppercaseTransform();
simpleReadable.pipe(upper).pipe(simpleWritable);

// ============================================================================
// 100 - Creating Custom Streams by Extending stream.Readable or stream.Writable
// ============================================================================
// (Refer to Section 100 for full custom stream implementations.)
const { Readable: CR, Writable: CW } = require('stream');

class CustomReadable extends CR {
  constructor(options) {
    super(options);
    this._data = ['apple', 'banana', 'cherry'];
    this._index = 0;
  }
  _read(size) {
    if (this._index < this._data.length) this.push(Buffer.from(this._data[this._index++]));
    else this.push(null);
  }
}
class CustomWritable extends CW {
  _write(chunk, encoding, callback) {
    console.log('Writing chunk:', chunk.toString());
    callback();
  }
}

module.exports = { simpleReadable, simpleWritable, EchoDuplex, UppercaseTransform, CustomReadable, CustomWritable };

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// 100 - Creating Custom Streams by Extending stream.Readable or stream.Writable
// ============================================================================
// This module demonstrates how to implement custom Readable and Writable streams
// in Node.js. Use custom streams for bespoke data sources or sinks, complex
// data transformations, or to integrate with external systems.

const { Readable, Writable } = require('stream');

// -----------------------------
// 1. Custom Readable Stream
// -----------------------------
// Notes:
// - Extend Readable and implement _read(size).
// - Call push() to emit data chunks, and push(null) to signal end-of-stream.
// - Proper backpressure handling is built-in.

class CustomReadable extends Readable {
  constructor(options) {
    super(options);
    this._data = ['apple', 'banana', 'cherry']; // Source data
    this._index = 0;
  }

  _read(size) {
    // Emit one chunk at a time
    if (this._index < this._data.length) {
      const chunk = Buffer.from(this._data[this._index++]);
      this.push(chunk);
      // console.log(`Pushed: ${chunk}`);
    } else {
      this.push(null); // No more data
    }
  }
}

// -----------------------------
// 2. Custom Writable Stream
// -----------------------------
// Notes:
// - Extend Writable and implement _write(chunk, encoding, callback).
// - Process or store each chunk as needed.
// - Always call callback() (with error if any) to continue flow.

class CustomWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    // Example: log the chunk to console
    console.log('Writing chunk:', chunk.toString());
    callback(); // Must call to signal completion
  }
}

// ---------------------------------
// 3. Usage Example (Pipe Streams)
// ---------------------------------
// This example pipes the CustomReadable into CustomWritable, demonstrating
// full end-to-end streaming with built-in backpressure support.

// const reader = new CustomReadable();
// const writer = new CustomWritable();
// reader.pipe(writer);

// Expected Output:
// Writing chunk: apple
// Writing chunk: banana
// Writing chunk: cherry

// -----------------------------
// 4. Additional Example: Manual Read/Write
// -----------------------------
// You can also manually read and write without piping:

// const reader2 = new CustomReadable();
// const writer2 = new CustomWritable();
// reader2.on('data', chunk => {
//   // transform or inspect data before writing
//   writer2.write(chunk);
// });
// reader2.on('end', () => {
//   writer2.end('Done');
//   writer2.on('finish', () => console.log('All writes complete.'));
// });

// -----------------------------
// 5. Important Considerations
// -----------------------------
// • Backpressure: Using pipe() handles flow control automatically.
// • Error handling: Listen for 'error' events on both streams.
// • Encoding: If dealing with strings, specify encoding or use setEncoding().
// • Buffering: For large data, consider chunk sizes and memory usage.

// Export classes for reuse
module.exports = { CustomReadable, CustomWritable };

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 96 – Caching middleware: cache-control headers, Redis caching in middleware
// Use Cache-Control headers to instruct browsers and proxies how long to cache responses.
// Example directives: public, private, max-age, s-maxage, no-cache, no-store.
// For server-side caching, use Redis to store and retrieve full response bodies or JSON data.

// ——————————————————————————————————————————————————————————————
// Example 1: Setting Cache-Control headers per route
const express = require('express');
const app = express();

// Cache responses for 60 seconds (public)
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ time: Date.now() });
});

// Prevent caching
app.get('/api/private', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.send('Sensitive data, do not cache');
});

// ——————————————————————————————————————————————————————————————
// Example 2: Global middleware for static assets
app.use('/static', express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
  }
}));

// ——————————————————————————————————————————————————————————————
// Example 3: Redis-backed response caching middleware
const Redis = require('ioredis');
const redis = new Redis();

async function cache(keyPrefix, ttlSeconds) {
  return async (req, res, next) => {
    const key = keyPrefix + req.originalUrl;
    const cached = await redis.get(key);
    if (cached) {
      res.set('X-Cache', 'HIT');
      return res.json(JSON.parse(cached));
    }
    // Hijack res.json to cache output
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      res.set('X-Cache', 'MISS');
      redis.set(key, JSON.stringify(body), 'EX', ttlSeconds);
      return originalJson(body);
    };
    next();
  };
}

// Apply caching middleware to an expensive endpoint
app.get('/api/expensive', cache('exp:', 120), async (req, res) => {
  const data = await doExpensiveComputation();
  res.json(data);
});

// ——————————————————————————————————————————————————————————————
// Example 4: Cache invalidation on data update
app.post('/api/update', async (req, res) => {
  await updateData(req.body);
  await redis.del('exp:/api/expensive');  // invalidate cache
  res.sendStatus(204);
});

// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Use Cache-Control with ETag or Last-Modified for conditional GETs.
// • Employ Redis hashes or sorted sets for more granular cache structures.
// • Balance cache TTLs against data staleness and memory usage.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 102 – Handling backpressure: .pause(), .resume(), highWaterMark settings
// Backpressure prevents faster producers from overwhelming slower consumers.
// Use .pause() and .resume() on streams and configure highWaterMark to tune buffer sizes.

const fs = require('fs');
const { Transform, pipeline } = require('stream');

// Example 1: Manual pause() and resume() on Readable stream
const readStream = fs.createReadStream('./large.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 }); // 16 KB buffer
const writeStream = fs.createWriteStream('./copy.txt');

readStream.on('data', chunk => {
  // If writeStream buffer is full, pause reading
  if (!writeStream.write(chunk)) {
    console.log('Backpressure detected: pausing read stream');
    readStream.pause();
  }
});

writeStream.on('drain', () => {
  console.log('Drain event: resuming read stream');
  readStream.resume();
});

readStream.on('end', () => {
  writeStream.end();
  console.log('Finished copying with manual backpressure handling');
});

// ——————————————————————————————————————————————————————————————
// Example 2: Stream Transform with controlled buffer
class SlowTransform extends Transform {
  constructor() {
    super({ highWaterMark: 8 * 1024 }); // smaller writable buffer
  }
  _transform(chunk, encoding, callback) {
    // Simulate slow processing
    setTimeout(() => {
      this.push(chunk);
      callback();
    }, 100);
  }
}

pipeline(
  fs.createReadStream('./input.mp4', { highWaterMark: 64 * 1024 }),
  new SlowTransform(),
  fs.createWriteStream('./output.mp4'),
  err => {
    if (err) console.error('Pipeline failed', err);
    else console.log('Pipeline completed with backpressure management');
  }
);

// ——————————————————————————————————————————————————————————————
// Example 3: Adjusting highWaterMark on HTTP response
const http = require('http');
http.createServer((req, res) => {
  const streamOpts = { highWaterMark: 32 * 1024 }; // tune for network latency
  const fileStream = fs.createReadStream('./video.mp4', streamOpts);
  res.writeHead(200, { 'Content-Type': 'video/mp4' });
  // pipe will respect backpressure based on highWaterMark
  fileStream.pipe(res);
}).listen(3003, () => console.log('Server (with tuned buffer) on port 3003'));

// ——————————————————————————————————————————————————————————————
// Notes:
// • highWaterMark sets buffer size for streams (bytes for binary, chars for string).
// • Smaller highWaterMark reduces memory usage but may increase I/O calls.
// • .pause() stops 'data' events; .resume() restarts them.
// • 'drain' event indicates writable stream buffered data has been flushed.
// • pipeline() manages backpressure automatically—prefer it for multi-step flows.
// • Monitor 'readable' and 'writable' events for custom backpressure logic.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 103 – Transform streams: gzip compression, data transformation, parsing CSV
// Transform streams allow you to modify or process data passing through pipelines.

const fs = require('fs');
const zlib = require('zlib');
const { Transform, pipeline } = require('stream');
const csvParser = require('csv-parser');

// ——————————————————————————————————————————————————————————————
// Example 1: Gzip compression of a file via Transform stream
// Read input.txt, compress, and write to output.gz
pipeline(
  fs.createReadStream('./input.txt'),
  zlib.createGzip(),             // built-in Transform
  fs.createWriteStream('./output.gz'),
  (err) => {
    if (err) console.error('Gzip pipeline failed', err);
    else console.log('File compressed to output.gz');
  }
);

// ——————————————————————————————————————————————————————————————
// Example 2: Custom data transformation
// Transform stream to reverse each line of text
class ReverseLineTransform extends Transform {
  constructor() {
    super({ readableObjectMode: true, writableObjectMode: true });
    this._buffer = '';
  }

  _transform(chunk, encoding, callback) {
    this._buffer += chunk.toString();
    let lines = this._buffer.split('\n');
    this._buffer = lines.pop(); // keep last partial line
    for (const line of lines) {
      this.push(line.split('').reverse().join('') + '\n');
    }
    callback();
  }

  _flush(callback) {
    // handle remaining buffer
    if (this._buffer) {
      this.push(this._buffer.split('').reverse().join(''));
    }
    callback();
  }
}

pipeline(
  fs.createReadStream('./text.log'),
  new ReverseLineTransform(),
  fs.createWriteStream('./reversed.log'),
  (err) => {
    if (err) console.error('Reverse transform failed', err);
    else console.log('Lines reversed successfully');
  }
);

// ——————————————————————————————————————————————————————————————
// Example 3: Parsing CSV to JSON lines using csv-parser
// Stream large CSV without loading entire file
pipeline(
  fs.createReadStream('./data.csv'),
  csvParser(),                  // transforms CSV rows into JS objects
  new Transform({
    objectMode: true,
    transform(row, encoding, callback) {
      // modify or filter rows here
      this.push(JSON.stringify(row) + '\n');
      callback();
    }
  }),
  fs.createWriteStream('./data.jsonl'),
  (err) => {
    if (err) console.error('CSV parsing pipeline failed', err);
    else console.log('CSV parsed and written as JSONL');
  }
);

// ——————————————————————————————————————————————————————————————
// Notes:
// • Built-in gzip/deflate Transforms simplify compression tasks.
// • Custom Transform streams can work in objectMode or buffer mode.
// • Use ._transform() and ._flush() to manage buffered data and partial chunks.
// • csv-parser and JSONStream let you stream-parse structured formats efficiently.
// • Always handle errors in pipeline callbacks for robust pipelines.
// • Adjust highWaterMark and objectMode for optimal memory/performance trade-offs.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 104 – Working with Buffer for binary data: concatenation, slicing, encoding, decoding
// Buffers are Node.js objects for handling raw binary data. They provide methods to create, manipulate, and convert binary sequences.

// ——————————————————————————————————————————————————————————————
// Example 1: Creating Buffers
// Allocate a zero-filled buffer of length 10
const buf1 = Buffer.alloc(10);
// Allocate an uninitialized buffer (faster but may contain old data)
const buf2 = Buffer.allocUnsafe(10);
// Create a buffer from an array
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
// Create from string with encoding
const buf4 = Buffer.from('World', 'utf8');

console.log(buf3.toString()); // "Hello"
console.log(buf4.toString()); // "World"

// ——————————————————————————————————————————————————————————————
// Example 2: Concatenation
// Combine multiple Buffers into one
const combined = Buffer.concat([buf3, buf4]);
console.log(combined.toString()); // "HelloWorld"

// Optional: specify total length to pad/truncate
const combinedFixed = Buffer.concat([buf3, buf4], 8);
console.log(combinedFixed); // length is 8 bytes

// ——————————————————————————————————————————————————————————————
// Example 3: Slicing and copying
// Slice does not copy memory, returns a view
const slice = combined.slice(0, 5);
slice.write('HELLO');
console.log(combined.toString()); // writes directly into combined

// To get a copy instead of view
const copy = Buffer.from(combined.slice(5));
copy.write('WORLD');
console.log(combined.toString(), copy.toString());

// Copying between Buffers
const target = Buffer.alloc(10);
combined.copy(target, 2, 0, combined.length);
console.log(target);

// ——————————————————————————————————————————————————————————————
// Example 4: Encoding and decoding
const utf8Buf = Buffer.from('こんにちは', 'utf8');
console.log(utf8Buf); // raw bytes in UTF-8

// Decode as different encoding
console.log(utf8Buf.toString('hex'));    // hex representation
console.log(utf8Buf.toString('base64')); // base64 string

// Create buffer from base64
const base64Buf = Buffer.from(utf8Buf.toString('base64'), 'base64');
console.log(base64Buf.toString('utf8')); // restores "こんにちは"

// ——————————————————————————————————————————————————————————————
// Example 5: Reading and writing integers
const numBuf = Buffer.alloc(4);
// Write a 32-bit unsigned integer, big-endian
numBuf.writeUInt32BE(0xDEADBEEF, 0);
console.log(numBuf);            // <Buffer de ad be ef>
console.log(numBuf.readUInt32BE(0)); // 3735928559

// ——————————————————————————————————————————————————————————————
// Notes:
// • Buffer.alloc(size) zero-fills new memory; Buffer.allocUnsafe(size) is faster but may contain old data.
// • Buffer.from() creates an immutable copy of provided data.
// • Buffer.concat(list[, totalLength]) merges multiple Buffers, optional length argument.
// • buf.slice() returns a view sharing memory; use Buffer.from(slice) to copy.
// • buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]]) copies data between Buffers.
// • Encoding options: 'utf8', 'ascii', 'base64', 'hex', etc.
// • Numeric methods: writeUIntBE/LE, writeIntBE/LE, readUIntBE/LE, etc. for different byte orders and sizes.
// • Use Buffer.byteLength(string, encoding) to get byte length without creating a Bauffer.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 105 – Stream utilities: pipeline, finished for error handling in stream chains
// Node.js provides utilities in the 'stream' module to manage stream lifecycles and errors efficiently.

const fs = require('fs');
const { pipeline, finished } = require('stream');
const zlib = require('zlib');

// ——————————————————————————————————————————————————————————————
// Example 1: Using pipeline for a simple transform chain
// Read a file, compress it, and write to disk with automatic error handling
pipeline(
  fs.createReadStream('./input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('./output.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Pipeline succeeded: file compressed');
  }
);

// ——————————————————————————————————————————————————————————————
// Example 2: Using pipeline with async/await (util.promisify)
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

async function compressFile() {
  try {
    await pipelineAsync(
      fs.createReadStream('./large.log'),
      zlib.createGzip(),
      fs.createWriteStream('./large.log.gz')
    );
    console.log('Compression complete (async)');
  } catch (err) {
    console.error('Async pipeline error:', err);
  }
}
compressFile();

// ——————————————————————————————————————————————————————————————
// Example 3: Using finished to detect when a writable stream is done
const writeStream = fs.createWriteStream('./copy.txt');
fs.createReadStream('./source.txt').pipe(writeStream);

finished(writeStream, (err) => {
  if (err) console.error('Stream failed:', err);
  else console.log('Writable stream finished successfully');
});

// ——————————————————————————————————————————————————————————————
// Example 4: Combining finished and pipeline for full lifecycle
pipeline(
  fs.createReadStream('./data.jsonl'),
  zlib.createGunzip(),
  fs.createWriteStream('./data.json'),
  (err) => {
    if (err) console.error('Pipeline error:', err);
    else console.log('Pipeline completed');
  }
);

// Monitor the readable end too
const readStream = fs.createReadStream('./data.jsonl');
finished(readStream, (err) => {
  if (err) console.error('Readable stream error:', err);
  else console.log('Readable stream closed');
});

// ——————————————————————————————————————————————————————————————
// Notes:
// • pipeline() automatically forwards errors and closes all streams.
// • The callback to pipeline receives an error if any stream in the chain errors.
// • finished(stream, cb) invokes cb once the stream is ended or closed, with any error.
// • Use promisified pipeline for async/await syntax (requires Node.js ≥ 10).
// • finished works on both readable and writable streams for cleanup or notifications.
// • Avoid manual error listeners on every stream by leveraging these utilities.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 106 – Using console methods: log, warn, error, dir, trace
// The console object provides various methods for debugging and logging information in Node.js and browsers.

// ——————————————————————————————————————————————————————————————
// Example 1: console.log()
// General-purpose logging; supports multiple arguments and string interpolation
const user = { id: 123, name: 'Alice', roles: ['admin', 'editor'] };
console.log('User info:', user);
console.log('User %s has ID %d and roles %o', user.name, user.id, user.roles);

// ——————————————————————————————————————————————————————————————
// Example 2: console.warn()
// Indicates a warning; typically styled differently in terminals and devtools
if (!process.env.API_KEY) {
  console.warn('Warning: API_KEY is not set. Using default configuration.');
}

// ——————————————————————————————————————————————————————————————
// Example 3: console.error()
// Logs errors; often used in catch blocks or to report fatal issues
try {
  throw new Error('Something went wrong!');
} catch (err) {
  console.error('Error encountered:', err);
}

// ——————————————————————————————————————————————————————————————
// Example 4: console.dir()
// Displays an interactive listing of an object's properties
const complexObj = { a: 1, b: { c: 2, d: [3, 4] } };
console.dir(complexObj, { depth: null, colors: true });

// ——————————————————————————————————————————————————————————————
// Example 5: console.trace()
// Prints a stack trace to the point where it's called
function first() {
  second();
}
function second() {
  third();
}
function third() {
  console.trace('Trace at third()');
}
first();

// ——————————————————————————————————————————————————————————————
// Notes:
// • console.log: basic logging; supports format specifiers: %s, %d, %j, %o.
// • console.warn and console.error: semantically indicate warnings/errors; stderr by default in Node.js.
// • console.dir: useful for inspecting object structure; options: depth, colors, showHidden.
// • console.trace: helpful to locate where a function is invoked from; includes message and stack.
// • console.group()/groupEnd(), console.time()/timeEnd() are additional utilities for grouping and timing.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 107 – Debugging with built-in inspector: node --inspect, chrome://inspect, breakpoints
// Node.js includes an inspector protocol enabling debugging via Chrome DevTools or other clients.

// ——————————————————————————————————————————————————————————————
// Example 1: Start Node.js with the inspector enabled
// Use --inspect to enable debugging on default host and port (127.0.0.1:9229)
//   node --inspect index.js
// Use --inspect-brk to break on the first line before user code executes
//   node --inspect-brk index.js

// Example 2: Connect via Chrome DevTools
// 1. Open Chrome and navigate to chrome://inspect
// 2. Under "Remote Target", click "Open dedicated DevTools for Node"
// 3. Set breakpoints, step through code, inspect variables

// ——————————————————————————————————————————————————————————————
// Example 3: Adding breakpoints programmatically
// Use the debugger statement to pause execution
function compute(a, b) {
  const result = a + b;
  debugger; // execution will pause here when inspector is connected
  return result;
}

console.log('Before compute');
compute(5, 7);
console.log('After compute');

// ——————————————————————————————————————————————————————————————
// Example 4: Inspecting asynchronous code
// Place debugger inside async functions or promises
async function fetchData() {
  debugger;
  const data = await Promise.resolve({ user: 'Alice', id: 1 });
  console.log('Fetched:', data);
}
fetchData();

// ——————————————————————————————————————————————————————————————
// Example 5: Using inspect port and host options
// Customize host and port for remote debugging
//   node --inspect=0.0.0.0:9230 index.js
// Then in DevTools: click "Configure..." and add host:port

// ——————————————————————————————————————————————————————————————
// Notes:
// • --inspect enables the V8 Inspector Protocol; default port: 9229.
// • --inspect-brk halts before user code; ideal for entry-point debugging.
// • debugger statements work like breakpoints in code; remove or comment out for production.
// • Use chrome://inspect to open DevTools; works in Chromium-based browsers.
// • You can also use VSCode debug configurations to attach to Node processes.
// • Use --inspect-port and --inspect-host for custom network setups.
// • For older Node versions (<8), use --inspect-port flag alone without host.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 108 – Debugging in VSCode: launch.json configuration, attaching to a running process
// VSCode provides a built-in debugger for Node.js applications via launch configurations.

// ——————————————————————————————————————————————————————————————
// 1. Create a launch.json file
// In VSCode: open the Debug panel → click "create a launch.json file" → select "Node.js".
// A .vscode/launch.json will be generated.

// Sample launch.json configuration:
/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/index.js",
      "cwd": "${workspaceFolder}",
      "protocol": "inspector",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
*/
// Key fields:
// • program: path to the entry point file.
// • cwd: working directory for the debug session.
// • protocol: inspector (Node ≥6.3).
// • outFiles: patterns for transpiled source maps (e.g., TypeScript).
// • env: environment variables.
// • console: determine where input/output appears.

// ——————————————————————————————————————————————————————————————
// 2. Setting breakpoints
// • Click in the gutter next to a line number to add/remove breakpoints.
// • Conditional breakpoints: right-click breakpoint → "Edit Breakpoint" → add condition or hit count.

// ——————————————————————————————————————————————————————————————
// 3. Attaching to a running Node process
// a) Start Node with inspect flag:
//    node --inspect index.js
//    or node --inspect=9229 index.js

// b) Add an "Attach" configuration:
/*
{
  "name": "Attach to Process",
  "type": "node",
  "request": "attach",
  "port": 9229,
  "address": "localhost",
  "restart": false,
  "protocol": "inspector",
  "localRoot": "${workspaceFolder}",
  "remoteRoot": null
}
*/
// c) In VSCode Debug panel, select "Attach to Process" and click start.

// ——————————————————————————————————————————————————————————————
// 4. Debugging Transpiled Code (TypeScript, Babel)
// • Configure sourceMaps in tsconfig.json / Babel.
// • Set outFiles in launch.json to point to compiled .js files.
// • Use \"preLaunchTask\" to run a build before debugging.

// Example preLaunchTask snippet:
/*
{
  "configurations": [
    {
      // ...
      "preLaunchTask": "tsc: build - tsconfig.json"
    }
  ]
}
*/

// ——————————————————————————————————————————————————————————————
// 5. Additional Tips
// • Use the Debug Console to evaluate expressions and interact with the REPL.
// • Hover over variables to inspect values.
// • Use the Variables, Watch, Call Stack, and Breakpoints panes for detailed views.
// • Enable autoAttach by setting "node.autoAttach": "on" in settings.json.
// • Use logpoints instead of console.log: right-click gutter → "Add Logpoint" → enter expression.

// Notes:
// • launch.json configs are per-project and stored in .vscode folder.
// • Attach sessions allow debugging of remote or long-running processes.
// • Ensure Node is started with --inspect or --inspect-brk for attaching.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 109 – Exception handling: uncaughtException, unhandledRejection, process.on events
// Properly handling unexpected errors and rejections prevents crashes and allows graceful shutdown or recovery.

const express = require('express');
const app = express();

// Example 1: Catch uncaught exceptions (synchronous errors)
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Perform cleanup, logging, metrics
  // Optionally exit process with failure code
  process.exit(1);
});

// Example 2: Catch unhandled promise rejections (asynchronous errors)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Perform cleanup, logging, metrics
  // Optionally exit process or continue depending on severity
  process.exit(1);
});

// ——————————————————————————————————————————————————————————————
// Example 3: Graceful shutdown on termination signals
const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
  // Force exit after timeout
  setTimeout(() => process.exit(1), 10000);
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ——————————————————————————————————————————————————————————————
// Example 4: Per-request error handling middleware in Express
app.use(express.json());

app.get('/api/data', (req, res) => {
  throw new Error('Synchronous error!');
});

app.get('/api/async', async (req, res, next) => {
  try {
    await Promise.reject(new Error('Async error!'));
  } catch (err) {
    next(err); // forward to error handler
  }
});

// Express error-handling middleware (must have 4 args)
app.use((err, req, res, next) => {
  console.error('Express Error Handler:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(3000, () => console.log('Server running on port 3000'));

// ——————————————————————————————————————————————————————————————
// Notes:
// • uncaughtException handles sync errors not caught anywhere, but process should usually exit.
// • unhandledRejection catches Promises without catch; treat them similarly to exceptions.
// • Always perform cleanup (connections, file handles) before exiting.
// • Use signal handlers (SIGINT, SIGTERM) for graceful shutdown in clustered environments.
// • In Express, use error-handling middleware (4 parameters) for per-route errors.
// • For async route handlers, ensure errors are passed to next() or use a wrapper to auto-catch.
// • Consider using domains or async_hooks for more advanced context-based error tracking.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 110 – Profiling CPU and memory: node --prof, clinic.js (Doctor, Flame), 0x
// Profiling helps identify performance bottlenecks and memory leaks in Node.js applications.

// ——————————————————————————————————————————————————————————————
// Example 1: Using built-in V8 CPU profiler (node --prof)
// 1. Run your app with profiling enabled:
//    node --prof index.js
// 2. Execute typical workload or test suite.
// 3. Stop the process and locate the generated log: "isolate-0x*.log"
// 4. Process the log to human-readable form:
//    node --prof-process isolate-*.log > processed.txt
// 5. Open processed.txt to inspect hot functions and CPU usage.

// ——————————————————————————————————————————————————————————————
// Example 2: Clinic.js Doctor for automated analysis
// 1. Install Clinic.js globally:
//    npm install -g clinic
// 2. Run your app under Doctor:
//    clinic doctor -- node server.js
// 3. Perform typical workload, then stop (Ctrl+C).
// 4. Clinic generates a report folder and opens a summary in the browser.
// Doctor highlights CPU bottlenecks, event loop delays, and GC pauses.

// ——————————————————————————————————————————————————————————————
// Example 3: Clinic.js Flame for flamegraphs
// 1. Run your app under Flame:
//    clinic flame -- node server.js
// 2. Navigate workloads, then stop.
// 3. Clinic opens an interactive flamegraph showing function call stacks and CPU time.

// ——————————————————————————————————————————————————————————————
// Example 4: Profiling with 0x for zero-overhead flamegraphs
// 1. Install 0x:
//    npm install -g 0x
// 2. Run your app under 0x:
//    0x server.js
// 3. After workload, 0x generates a flamegraph HTML in .0x directory.
// 4. Open flamegraph.html in browser to explore performance hotspots.

// ——————————————————————————————————————————————————————————————
// Memory profiling using heap snapshots (Chrome DevTools):
// 1. Start Node with inspector:
//    node --inspect index.js
// 2. Open chrome://inspect and connect.
// 3. In DevTools Memory panel, take Heap Snapshot or Allocation Timeline.
// 4. Compare snapshots to locate detached DOM nodes, closures, and leaks.

// ——————————————————————————————————————————————————————————————
// Notes:
// • node --prof gives raw V8 profiling; use --prof-process to interpret.
// • Clinic.js Doctor automates data collection and analysis with user-friendly reports.
// • Clinic.js Flame and 0x generate interactive flamegraphs for CPU usage.
// • High-resolution profiling may add overhead; profile in staging environments.
// • Use heap snapshots and allocation sampling to detect memory leaks.
// • Combine CPU and memory profiling for a comprehensive performance picture.
// • Always reproduce real-world workloads when profiling for accurate insights.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 111 – Heap snapshots: Chrome DevTools heap profiler, identifying memory leaks
// Heap snapshots capture the memory allocation state; comparing snapshots helps locate leaks.

// ——————————————————————————————————————————————————————————————
// Example 1: Capturing a heap snapshot via DevTools
// 1. Start Node with inspector:
//    node --inspect index.js
// 2. Open Chrome DevTools: chrome://inspect → Open dedicated DevTools for Node
// 3. Go to Memory panel → Select "Heap snapshot" → Click "Take snapshot"
// 4. Perform workloads, then take a second snapshot
// 5. Compare snapshots:
//    • Look for Detached DOM trees (in browser contexts) or leaking objects
//    • Identify growing retained sizes and counts
//
// ——————————————————————————————————————————————————————————————
// Example 2: Programmatic snapshot with v8-profiler-next
// Install: npm install v8-profiler-next

const profiler = require('v8-profiler-next');
const fs = require('fs');

function takeHeapSnapshot(filename) {
  const snapshot = profiler.takeSnapshot();
  const stream = fs.createWriteStream(filename);
  snapshot.export()
    .pipe(stream)
    .on('finish', () => {
      snapshot.delete();
      console.log(`Heap snapshot saved to ${filename}`);
    });
}

// Usage: call at key points
takeHeapSnapshot('snapshot1.heapsnapshot');
// ... workload ...
takeHeapSnapshot('snapshot2.heapsnapshot');

// ——————————————————————————————————————————————————————————————
// Example 3: Using heapdump module for snapshots on signal
// Install: npm install heapdump

const heapdump = require('heapdump');

process.on('SIGUSR2', () => {
  const filename = `heap-${Date.now()}.heapsnapshot`;
  heapdump.writeSnapshot(filename, (err, filename) => {
    if (err) console.error('Heapdump failed:', err);
    else console.log('Heap snapshot written to', filename);
  });
});

// Trigger with kill -USR2 <pid>

// ——————————————————————————————————————————————————————————————
// Example 4: Analyzing snapshots in DevTools
// 1. In DevTools Memory panel, load .heapsnapshot file via dropdown.
// 2. Use Summary view to inspect constructors, retained sizes, and counts.
// 3. Use Comparison view to diff two snapshots and highlight growth.
// 4. Drill into allocation stacks to find leak origins.

// ——————————————————————————————————————————————————————————————
// Notes:
// • Heap snapshots are large; capture only when necessary.
// • v8-profiler-next and heapdump modules allow programmatic control.
// • Always compare multiple snapshots to pinpoint leaks (Comparison view).
// • Focus on objects with growing retained size or count over time.
// • Beware of caches and global scopes retaining references inadvertently.
// • Filter out system allocations (e.g., closures, native objects) to focus on app objects.
// • Automate snapshot collection with signals or HTTP endpoints in staging env.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 112 – Monitoring event loop latency: using packages like clinic or node-event-loop-lag
// Event loop latency indicates delays in processing I/O or timers; monitoring helps detect performance bottlenecks.

// ——————————————————————————————————————————————————————————————
// Example 1: Using Node.js built-in Performance Hooks (Node ≥ 11)
// Monitor event loop delay with monitorEventLoopDelay()
const { monitorEventLoopDelay } = require('perf_hooks');

// Create a histogram with 10ms resolution
const h = monitorEventLoopDelay({ resolution: 10 });
h.enable();

// Periodically report stats\setInterval(() => {
  h.disable();
  console.log('Event Loop Delay (ms):');
  console.log(`  min: ${h.min}`);
  console.log(`  max: ${h.max}`);
  console.log(`  mean: ${h.mean.toFixed(2)}`);
  console.log(`  stddev: ${h.stddev.toFixed(2)}`);
  h.reset();
  h.enable();
}, 5000);

// Simulate blocking work
function block(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}
setInterval(() => block(100), 2000);

// ——————————————————————————————————————————————————————————————
// Example 2: Using node-event-loop-lag package
// Install: npm install event-loop-lag
const elag = require('event-loop-lag')(1000); // sample interval 1s

setInterval(() => {
  const lag = elag();
  console.log(`Event loop lag: ${lag.toFixed(2)}ms`);
}, 2000);

// ——————————————————————————————————————————————————————————————
// Example 3: CLI monitoring with Clinic.js Doctor
// 1. Install Clinic.js: npm install -g clinic
// 2. Run your app under Doctor: clinic doctor --node --collect-only -- node server.js
// 3. After workload, stop (Ctrl+C) to generate a report
// 4. Open report: clinic open <clinic-doctor-*.clinic>
// Doctor will highlight event loop delays and I/O bottlenecks.

// ——————————————————————————————————————————————————————————————
// Example 4: Generating a bubbleprof to visualize delays
// clinic bubbleprof -- node server.js
// After workload, stop to see an interactive visualization of async calls and event loop gaps.

// ——————————————————————————————————————————————————————————————
// Notes:
// • monitorEventLoopDelay provides detailed histogram metrics without external dependencies.
// • event-loop-lag offers a simple callback-free API for periodic lag measurements.
// • Clinic.js Doctor automates data collection and analysis; Bubbleprof visualizes async flow.
// • Use real workloads when measuring latency to capture realistic behavior.
// • Tune sampling intervals (resolution/interval) to balance overhead and granularity.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////