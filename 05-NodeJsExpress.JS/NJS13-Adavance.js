// 🛠 OBSERVABILITY & MONITORING
// 203 - Integrating Prometheus and Grafana for metrics collection and dashboarding
// 204 - Application performance monitoring (APM) with New Relic, Datadog, or AppSignal
// 205 - Distributed tracing implementation with OpenTelemetry and Jaeger/Zipkin
// 206 - Structured logging practices: JSON logs, correlation IDs, log levels
// 207 - Alerting and incident response: setting up alerts for error rates, latency, CPU/memory spikes

// 🎯 ADVANCED NODE.JS CONCEPTS
// 208 - N-API and building native addons: creating and compiling C/C++ addons
// 209 - Using WebAssembly (WASM) modules in Node.js for CPU-intensive tasks
// 210 - V8 engine flags: tuning garbage collection, snapshotting
// 211 - Customizing libuv threadpool size: UV_THREADPOOL_SIZE environment variable
// 212 - Working with deep binary protocols: parsing Protocol Buffers, working with gRPC in Node.js
// 213 - Hijacking HTTP http(s).Server to handle raw TCP connections (low-level networking)
// 214 - UDP Sockets with dgram module: sending/receiving datagrams, multicast

// 🖥️ DISTRIBUTED SYSTEMS & SCALING
// 215 - Horizontal scaling strategies: replicating services across multiple servers/containers
// 216 - Using service meshes and sidecars for seamless communication (Istio, Linkerd)
// 217 - Handling sticky sessions and session affinity in load balancers
// 218 - Sharding data at the application layer: routing requests to appropriate database shard
// 219 - CQRS (Command Query Responsibility Segregation) pattern in Node.js
// 220 - Event sourcing: storing events instead of state, rebuilding state from event log




///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


# 203 – Integrating Prometheus & Grafana for metrics collection & dashboarding
# -----------------------------------------------------------------------------
# NOTES:
# 1. Use prom-client in your Node.js service to expose metrics at /metrics.  
# 2. Collect default system metrics plus custom business metrics (histogram, counter, gauge).  
# 3. Configure Prometheus to scrape your service by adding a scrape_config in prometheus.yml.  
# 4. Add Prometheus as a data source in Grafana and import dashboards or define panels.  
# 5. Secure /metrics (basic auth, network policies) in production.  
# 6. Define alerting rules in Prometheus (e.g., high error rates, slow latencies).  
# -----------------------------------------------------------------------------

# --- 1. Node.js instrumentation (server.js) ---
const express = require('express');
const { collectDefaultMetrics, Histogram, Counter, register } = require('prom-client');
const app = express();

// a) Default metrics (CPU, memory, event loop)
collectDefaultMetrics();

// b) Custom HTTP duration histogram
const httpDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method','route','status_code'],
  buckets: [0.1,0.5,1,1.5,2,5]
});
// c) Custom error counter
const errorCount = new Counter({
  name: 'http_errors_total',
  help: 'Total number of HTTP errors',
  labelNames: ['method','route','status_code']
});

// Middleware to measure
app.use((req,res,next)=>{
  const end = httpDuration.startTimer({ method: req.method, route: req.route?.path || req.path });
  res.on('finish', ()=>{
    const labels = { method: req.method, route: req.route?.path || req.path, status_code: res.statusCode };
    if (res.statusCode >= 500) errorCount.inc(labels);
    end({ status_code: res.statusCode });
  });
  next();
});

// Example business endpoint
app.get('/api/users', (req,res)=> res.json([{ id:1,name:'Alice' }]));

// Expose metrics
app.get('/metrics', async (req,res)=>{
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, ()=> console.log('Node service listening on :3000'));

# --- 2. Prometheus scrape configuration (prometheus.yml) ---
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'node_app'
    static_configs:
      - targets: ['localhost:3000']

# --- 3. Grafana provisioning (datasource) ---
# Save as grafana/provisioning/datasources/prometheus.yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true

# --- 4. Sample Grafana dashboard JSON snippet ---
# Import into Grafana to visualize http_request_duration_seconds histogram
# {
#   "panels": [
#     {
#       "type": "heatmap",
#       "title": "HTTP Duration",
#       "dataSource": "Prometheus",
#       "targets": [
#         {
#           "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))",
#           "legendFormat": "{{route}} p95"
#         }
#       ]
#     },
#     {
#       "type": "timeSeries",
#       "title": "Error Rate",
#       "targets": [
#         {
#           "expr": "sum(rate(http_errors_total[5m])) by (route)",
#           "legendFormat": "{{route}}"
#         }
#       ]
#     }
#   ]
# }

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 204 – Application performance monitoring (APM) with New Relic, Datadog, or AppSignal
// -----------------------------------------------------------------------------
// NOTES:
// 1. Install the APM agent via npm and configure via env vars or config file.
// 2. Require/initialize the agent before loading other modules.
// 3. Agents auto-instrument HTTP servers, database clients, and frameworks like Express.
// 4. Use the provider’s UI for dashboards, traces, and alerts.
// -----------------------------------------------------------------------------

// === A) New Relic ===
// npm install newrelic
// Configure via newrelic.js or env vars:
process.env.NEW_RELIC_APP_NAME   = 'MyApp';
process.env.NEW_RELIC_LICENSE_KEY = 'YOUR_LICENSE_KEY';
process.env.NEW_RELIC_LOG_LEVEL   = 'info';
require('newrelic');

const express = require('express');
const appNR   = express();
appNR.get('/', (req, res) => res.send('Hello from New Relic–instrumented app'));
appNR.listen(3001, () => console.log('🟢 New Relic app listening on port 3001'));


// === B) Datadog APM ===
// npm install dd-trace
const tracer = require('dd-trace').init({
  service: 'my-app',
  env: process.env.NODE_ENV || 'development',
  analytics: true,
});
const appDD = express();
appDD.get('/', (req, res) => res.send('Hello from Datadog–traced app'));
appDD.listen(3002, () => console.log('🔵 Datadog app listening on port 3002'));


// === C) AppSignal ===
// npm install @appsignal/nodejs
const { Appsignal } = require('@appsignal/nodejs');
const appsignal = new Appsignal({
  active: true,
  name: 'MyApp',
  pushApiKey: 'YOUR_PUSH_API_KEY'
});
const appAS = express();
appAS.use(appsignal.expressMiddleware());
appAS.get('/', (req, res) => res.send('Hello from AppSignal–monitored app'));
appAS.listen(3003, () => console.log('🟠 AppSignal app listening on port 3003'));

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 205 – Distributed tracing implementation with OpenTelemetry and Jaeger/Zipkin
// -----------------------------------------------------------------------------
// NOTES:
// 1. Initialize OpenTelemetry SDK before any other imports to auto-instrument libraries.
// 2. Use NodeSDK with getNodeAutoInstrumentations() for HTTP, Express, DNS, gRPC, etc.
// 3. Swap between JaegerExporter or ZipkinExporter by uncommenting the desired exporter.
// 4. Ensure your tracing backend is running (e.g. Jaeger on :16686/:14268 or Zipkin on :9411).
// 5. Add shutdown hooks to flush and close the SDK gracefully on SIGTERM/SIGINT.
// -----------------------------------------------------------------------------

// tracer.js
'use strict';
const { NodeSDK }        = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');

// Configure Jaeger exporter
const jaegerExporter = new JaegerExporter({
  serviceName: 'my-node-service',
  endpoint:    'http://localhost:14268/api/traces', // Jaeger HTTP collector
});

// Configure Zipkin exporter
const zipkinExporter = new ZipkinExporter({
  serviceName: 'my-node-service',
  url:         'http://localhost:9411/api/v2/spans', // Zipkin HTTP collector
});

// Initialize SDK with one exporter
const sdk = new NodeSDK({
  traceExporter: jaegerExporter,
// traceExporter: zipkinExporter,
  instrumentations: [ getNodeAutoInstrumentations() ],
});

sdk.start()
  .then(() => console.log('✅ OpenTelemetry SDK initialized'))
  .catch(err => console.error('❌ Error initializing OpenTelemetry', err));

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('🛑 Tracing terminated'))
    .catch(err => console.error('❌ Error terminating tracing', err))
    .finally(() => process.exit(0));
});

// server.js
'use strict';
// Import tracer first to instrument below modules
require('./tracer');

const express = require('express');
const app     = express();

app.get('/hello', (req, res) => {
  res.send('Hello, Distributed Tracing!');
});

app.listen(3000, () => {
  console.log('🚀 Server listening on http://localhost:3000');
});

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 206 – Structured logging practices: JSON logs, correlation IDs, log levels
// -----------------------------------------------------------------------------
// NOTES:
// 1. Emit logs in JSON format for machine parsing (service name, timestamp, level, message, metadata).
// 2. Include a correlation ID (per request) to trace a transaction across services.
// 3. Use log levels (error, warn, info, debug) to control verbosity.
// 4. Configure transports (console, file, external sinks) to consume structured logs.
// 5. Attach request context (user ID, path, method) via middleware.
// 6. In production, ship logs to ELK/Datadog/Loggly for aggregation and search.
// -----------------------------------------------------------------------------

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pino = require('pino');

// 1. Create a Pino logger that outputs JSON
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: 'my-node-service' },        // attach service name
  timestamp: pino.stdTimeFunctions.isoTime,    // ISO timestamps
});

// 2. Express app with correlation ID and structured logging middleware
const app = express();

app.use((req, res, next) => {
  // Generate or propagate correlation ID
  const correlationId = req.header('X-Correlation-ID') || uuidv4();
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  // Create a child logger with request context
  req.log = logger.child({
    correlationId,
    method: req.method,
    path: req.path,
    user: req.header('X-User-ID') || null
  });
  req.log.info('Incoming request');
  next();
});

// 3. Sample routes with structured logs
app.get('/items/:id', (req, res) => {
  const { id, log } = req;
  log.debug({ itemId: id }, 'Fetching item');
  // Simulate fetch
  if (isNaN(Number(id))) {
    log.warn({ itemId: id }, 'Invalid ID format');
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const item = { id, name: `Item ${id}` };
  log.info({ item }, 'Item retrieved');
  res.json(item);
});

app.post('/items', express.json(), (req, res) => {
  const { body, log } = req;
  log.info({ payload: body }, 'Creating item');
  // Simulate creation
  const newItem = { id: Date.now().toString(), ...body };
  log.info({ newItem }, 'Item created');
  res.status(201).json(newItem);
});

// 4. Global error handler with structured error logs
app.use((err, req, res, next) => {
  req.log.error({ err }, 'Unhandled error');
  res.status(err.status || 500).json({ error: err.message });
});

// 5. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info({ port: PORT }, 'Server started'));

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


# 207 – Alerting and incident response: setting up alerts for error rates, latency, CPU/memory spikes
# -----------------------------------------------------------------------------
# NOTES:
# 1. Define alerting rules in Prometheus and route via Alertmanager to Slack, email, PagerDuty, etc.
# 2. Monitor key metrics: error rate (http_errors_total), request latency (histogram_quantile on http_request_duration_seconds), CPU/memory from node_exporter.
# 3. Group alerts by service/instance and label severity (warning, critical).
# 4. Use “for” clauses to avoid flapping on transient spikes.
# 5. In Grafana, configure panel alerts or import Prometheus alerts via Alertmanager integration.
# 6. Maintain runbooks for each alert to guide incident response and post-mortem.
# -----------------------------------------------------------------------------

# --- Prometheus alerting rules (alerts.yml) ---
groups:
  - name: node_service_alerts
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: sum(rate(http_errors_total[5m])) by (service) > 0.05
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High error rate for {{ $labels.service }}"
          description: "{{ $labels.service }} error rate is {{ printf \"%.2f\" $value }} (>5%) for 10m"

      # High latency (95th percentile > 1s)
      - alert: HighLatency
        expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency for {{ $labels.service }}"
          description: "95th percentile latency {{ printf \"%.2fs\" $value }} for 5m"

      # High CPU usage (>80%)
      - alert: HighCPUUsage
        expr: avg by (instance)(rate(node_cpu_seconds_total{mode!=\"idle\"}[5m])) > 0.80
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High CPU on {{ $labels.instance }}"
          description: "CPU usage is {{ printf \"%.0f%%\" ($value * 100) }} for 5m"

      # High memory usage (>90%)
      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.90
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High memory on {{ $labels.instance }}"
          description: "Memory usage is {{ printf \"%.0f%%\" ($value * 100) }} for 5m"

# --- Alertmanager configuration (alertmanager.yml) ---
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname','service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: 'slack-critical'

receivers:
  - name: 'slack-critical'
    slack_configs:
      - channel: '#alerts'
        send_resolved: true
        text: |
          *Alert:* {{ .CommonAnnotations.summary }}
          *Severity:* {{ .CommonLabels.severity }}
          *Description:* {{ .CommonAnnotations.description }}
          *Instance:* {{ .CommonLabels.instance }}

# --- Grafana panel alert snippet (dashboard JSON) ---
# Configure a Time Series panel in Grafana with an alert:
# {
#   "alert": {
#     "name": "HighErrorRate",
#     "conditions": [
#       {
#         "type": "query",
#         "query": { "params": ["A", "5m", "now"] },
#         "reducer": { "type": "avg", "params": [] },
#         "evaluator": { "type": "gt", "params": [0.05] },
#         "operator": { "type": "and" }
#       }
#     ],
#     "for": "10m",
#     "noDataState": "no_data",
#     "executionErrorState": "error",
#     "notifications": []
#   },
#   "targets": [
#     { "expr": "sum(rate(http_errors_total[5m])) by (service)", "refId": "A" }
#   ]
# }

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



// 208 – N-API and building native addons: creating and compiling C/C++ addons
// -----------------------------------------------------------------------------
// NOTES:
// 1. Use N-API for stable ABI across Node.js versions.
// 2. Write a C/C++ “addon” that exports functions to JavaScript.
// 3. Define build instructions in binding.gyp for node-gyp.
// 4. Compile with `node-gyp configure build` and load via require().
// -----------------------------------------------------------------------------

/* binding.gyp */
{
  "targets": [
    {
      "target_name": "myaddon",
      "sources": [ "src/addon.cc" ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "xcode_settings": { "GCC_ENABLE_CPP_EXCEPTIONS": "YES" },
      "msvs_settings": { "VCCLCompilerTool": { "ExceptionHandling": 1 } }
    }
  ]
}

/* src/addon.cc */
#include <napi.h>

// A simple “add” function: (a, b) => a + b
Napi::Value Add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  // Validate args
  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::TypeError::New(env, "Two numbers expected").ThrowAsJavaScriptException();
    return env.Null();
  }
  double a = info[0].As<Napi::Number>().DoubleValue();
  double b = info[1].As<Napi::Number>().DoubleValue();
  return Napi::Number::New(env, a + b);
}

// Initialize and export methods
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("add", Napi::Function::New(env, Add));
  return exports;
}

NODE_API_MODULE(myaddon, Init)

/* index.js */
const path = require('path');
// Load the compiled addon (build/Release/myaddon.node)
const addon = require(path.join(__dirname, 'build', 'Release', 'myaddon.node'));

console.log('2 + 3 =', addon.add(2, 3));    // → 5
console.log('10.5 + 4.5 =', addon.add(10.5, 4.5)); // → 15

/* To build:
   1. npm install node-addon-api --save
   2. npm install -g node-gyp
   3. node-gyp configure
   4. node-gyp build
   5. node index.js
*/```

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 209 – Using WebAssembly (WASM) modules in Node.js for CPU-intensive tasks
// -----------------------------------------------------------------------------
// NOTES:
// 1. Compile performance-critical functions (e.g., Fibonacci, crypto) to WASM via Rust/C/C++.
// 2. Load the compiled `.wasm` binary with fs and instantiate with the WebAssembly API.
// 3. Exported functions become JS-callable with near-native speed.
// 4. For bulk data, map TypedArrays onto WebAssembly.Memory for zero-copy transfers.
// 5. Use imports (WASI or custom) for advanced I/O or environment needs.
// 6. Benchmark to ensure WASM’s overhead is justified for your workload.
// -----------------------------------------------------------------------------

const fs   = require('fs');
const path = require('path');

(async () => {
  // 1. Read the compiled WASM file (e.g., math.wasm compiled separately)
  const wasmPath   = path.resolve(__dirname, 'math.wasm');
  const wasmBuffer = fs.readFileSync(wasmPath);

  // 2. Instantiate the WebAssembly module
  const { instance } = await WebAssembly.instantiate(wasmBuffer);

  // 3. Destructure exports for easy use
  const { fib, sumArrayPointer, memory } = instance.exports;

  // Example 1: Compute Fibonacci of 10
  console.log('Fib(10) =', fib(10));  // → 55

  // Example 2: Sum an array of 5 integers via WASM memory
  const length = 5;
  // Create a Uint32Array view on WASM memory at offset 0
  const input = new Uint32Array(memory.buffer, 0, length);
  input.set([1, 2, 3, 4, 5]);
  // Call WASM function that reads from memory and returns sum
  console.log('Sum array =', sumArrayPointer(length));  // → 15
})();

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



// 210 – V8 engine flags: tuning garbage collection, snapshotting
// -----------------------------------------------------------------------------
// NOTES:
// 1. --max-old-space-size=SIZE (MB): set max old-generation heap (e.g., 2048 for 2 GB).
// 2. --initial-old-space-size=SIZE (MB): set initial heap size.
// 3. --expose-gc: enable manual GC via global.gc().
// 4. --trace-gc / --trace-gc-verbose: log GC events for tuning.
// 5. --gc-interval=N: trigger GC every N allocations (experimental).
// 6. --snapshot-descriptors & --startup_snapshot: load a custom heap snapshot at startup.
// 7. Use the v8 module at runtime for heap stats and on-demand snapshots.
// -----------------------------------------------------------------------------

// Usage (CLI):
//   node --expose-gc --trace-gc --max-old-space-size=2048 app.js
//   node --startup_snapshot=./snap.bin app.js

// app.js
const v8 = require('v8');
const fs = require('fs');

// Log heap stats before GC
console.log('Heap statistics before GC:');
console.dir(v8.getHeapStatistics(), { depth: null });

// Force a GC if exposed
if (global.gc) {
  console.log('Forcing garbage collection…');
  global.gc();
} else {
  console.warn('Run with --expose-gc to enable manual GC');
}

// Log heap stats after GC
console.log('Heap statistics after GC:');
console.dir(v8.getHeapStatistics(), { depth: null });

// Write a heap snapshot for offline analysis (Chrome DevTools, etc.)
const snapshotPath = `./heap-${Date.now()}.heapsnapshot`;
console.log(`Writing heap snapshot to ${snapshotPath}`);
v8.writeHeapSnapshot(snapshotPath);

// Optional: Create a startup snapshot for faster cold-starts (requires C++ tooling)
//   1. Build a snapshot binary with mksnapshot tool.
//   2. Launch Node with --startup_snapshot=./snap.bin
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 211 – Customizing libuv threadpool size: UV_THREADPOOL_SIZE environment variable
// -----------------------------------------------------------------------------
// NOTES:
// 1. libuv uses a fixed-size threadpool (default size 4) for async I/O (fs, DNS, crypto).
// 2. Set UV_THREADPOOL_SIZE before launching Node (e.g., UV_THREADPOOL_SIZE=8 node app.js).
// 3. Valid range is 1–128; tune based on IO concurrency needs.
// 4. Larger pools can improve throughput for heavy I/O but add context-switch overhead.
// 5. Always benchmark under realistic load when changing threadpool size.
// -----------------------------------------------------------------------------

// To launch with custom threadpool size (e.g., 8 threads):
//   UV_THREADPOOL_SIZE=8 node server.js

const fs     = require('fs');
const crypto = require('crypto');

// Log effective threadpool size
console.log('UV threadpool size:', process.env.UV_THREADPOOL_SIZE || 4);

// Example 1: Parallel async file reads
const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
files.forEach((file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) console.error(`Error reading ${file}:`, err);
    else console.log(`${file} length:`, data.length);
  });
});

// Example 2: Parallel CPU-bound crypto operations (uses libuv threadpool)
for (let i = 0; i < 4; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) console.error('Crypto error:', err);
    else console.log(`Derived key ${i}:`, derivedKey.toString('hex').slice(0, 10));
  });
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 212 – Working with deep binary protocols: parsing Protocol Buffers, working with gRPC in Node.js
// -----------------------------------------------------------------------------
// NOTES:
// 1. Protocol Buffers are a language-agnostic, efficient binary serialization format defined in .proto files.
// 2. Use @grpc/proto-loader to dynamically load .proto definitions and @grpc/grpc-js for gRPC servers/clients.
// 3. You can also generate static code with protoc + plugins, but dynamic loading is simpler for Node.js.
// 4. gRPC supports unary, server-streaming, client-streaming, and bidirectional RPC methods.
// 5. Always handle metadata, deadlines, and proper error codes (grpc.status.*) in production.
// 6. Keep your .proto files in sync and versioned alongside your services.
// -----------------------------------------------------------------------------

// proto/example.proto
/*
syntax = "proto3";
package example;

service Greeter {
  // Unary RPC
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
*/

const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'proto', 'example.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { example } = grpc.loadPackageDefinition(packageDef);

// --- Server.ts/Server.js ---
function sayHello(call, callback) {
  const { name } = call.request;
  callback(null, { message: `Hello, ${name}!` });
}

const server = new grpc.Server();
server.addService(example.Greeter.service, { SayHello: sayHello });
server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log('gRPC server listening on 0.0.0.0:50051');
  }
);

// --- Client.js ---
function main() {
  const client = new example.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  client.SayHello({ name: 'World' }, (err, response) => {
    if (err) {
      console.error('gRPC error:', err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

if (require.main === module) {
  main();
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



// 213 – Hijacking HTTP http(s).Server to handle raw TCP connections (low-level networking)
// -----------------------------------------------------------------------------
// NOTES:
// 1. Listen to the 'connection' event on http.Server to access raw sockets before HTTP parsing.
// 2. Use the 'upgrade' event to switch protocols (e.g., WebSocket or custom) after an HTTP handshake.
// 3. For HTTPS, use https.Server’s 'secureConnection' event to access TLS-wrapped sockets.
// 4. After sending a 101 Switching Protocols response, you can read/write raw data on the socket.
// 5. You may remove the HTTP parser by calling socket.removeAllListeners('data') if fully detaching.
// 6. This lets you implement custom protocols (MQTT, custom RPC) on standard HTTP/S ports.
// -----------------------------------------------------------------------------

const http  = require('http');
const https = require('https');
const fs    = require('fs');

// --- HTTP server with TCP hijacking ---
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from HTTP endpoint\n');
});

// Raw TCP before HTTP parsing
server.on('connection', socket => {
  console.log('New raw TCP connection (HTTP server)');
});

// Protocol upgrade for custom raw protocol
server.on('upgrade', (req, socket, head) => {
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: myprotocol\r\n' +
    'Connection: Upgrade\r\n' +
    '\r\n'
  );
  socket.on('data', chunk => {
    socket.write(`ECHO: ${chunk}`);
  });
});

server.listen(8080, () => {
  console.log('HTTP server listening on port 8080');
});

// --- HTTPS server with TLS hijacking ---
const httpsOptions = {
  key:  fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const secureServer = https.createServer(httpsOptions, (req, res) => {
  res.writeHead(200);
  res.end('Hello from HTTPS endpoint\n');
});

// Raw TLS socket access
secureServer.on('secureConnection', tlsSocket => {
  console.log('New raw TLS connection (HTTPS server)');
});

// Upgrade to custom protocol over TLS
secureServer.on('upgrade', (req, socket, head) => {
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: myprotocol\r\n' +
    'Connection: Upgrade\r\n' +
    '\r\n'
  );
  socket.on('data', chunk => {
    socket.write(`SECURE ECHO: ${chunk}`);
  });
});

secureServer.listen(8443, () => {
  console.log('HTTPS server listening on port 8443');
});

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// 214 – UDP Sockets with dgram module: sending/receiving datagrams, multicast
// -----------------------------------------------------------------------------
// NOTES:
// 1. Use dgram.createSocket('udp4') or 'udp6' for IPv6.
// 2. Call socket.bind(port[, address]) to begin listening.
// 3. Send with socket.send(buffer, offset, length, port, address, callback).
// 4. Listen for 'message', 'listening', and 'error' events to handle data and errors.
// 5. For multicast: socket.addMembership(multicastAddress[, interfaceAddress]) joins a group.
// 6. Control multicast behavior with socket.setMulticastTTL(ttl) and socket.setMulticastLoopback(flag).
// -----------------------------------------------------------------------------

const dgram = require('dgram');

const PORT = 41234;
const HOST = '0.0.0.0';
const MULTICAST_ADDR = '239.255.255.250'; // Example multicast group

// --- UDP Server ---
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
  server.addMembership(MULTICAST_ADDR);      // Join multicast group
  server.setMulticastTTL(128);               // Set TTL for multicast packets
  server.setMulticastLoopback(true);         // Receive our own multicast packets
});

server.on('message', (msg, rinfo) => {
  console.log(`Received "${msg}" from ${rinfo.address}:${rinfo.port}`);
});

server.on('error', (err) => {
  console.error(`Server error:\n${err.stack}`);
  server.close();
});

server.bind(PORT, HOST); // Start listening

// --- UDP Client ---
const client = dgram.createSocket('udp4');

function sendMessage(message, port, address) {
  const buffer = Buffer.from(message);
  client.send(buffer, 0, buffer.length, port, address, (err) => {
    if (err) console.error('Send error:', err);
    else console.log(`Sent "${message}" to ${address}:${port}`);
  });
}

// Send a unicast message to the server
sendMessage('Hello UDP Server', PORT, '127.0.0.1');

// Send a multicast message to the group after 1s
setTimeout(() => {
  sendMessage('Hello Multicast Group', PORT, MULTICAST_ADDR);
}, 1000);

// Cleanup after 5s
setTimeout(() => {
  client.close();
  server.close();
}, 5000);

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////