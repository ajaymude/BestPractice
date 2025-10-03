// 🛡 MICROservices & SERVICE-ORIENTED ARCHITECTURES
// 149 - Designing microservices: single responsibility, bounded contexts
// 150 - Communication patterns between services: REST, gRPC, message queues
// 151 - Using RabbitMQ or Apache Kafka with amqplib or kafkajs for asynchronous messaging
// 152 - Service discovery and registry: Consul, etcd, or DNS-based discovery
// 153 - API Gateway patterns: implementing a gateway with Express/Koa or using Kong/Traefik
// 154 - Circuit breaker pattern: using opossum library for resilient services
// 155 - Bulkheading and rate limiting between services to prevent cascading failures
// 156 - Distributed tracing: integrating OpenTelemetry or Jaeger for request-level tracing

// 📡 REAL-TIME COMMUNICATION
// 157 - WebSocket basics with ws or socket.io: setting up server, handling connections
// 158 - Implementing real-time chat or notifications with socket.io rooms and namespaces
// 159 - Scaling WebSockets: using Redis adapter for socket.io across multiple nodes
// 160 - Server-Sent Events (SSE) vs WebSockets: choosing the right protocol
// 161 - Using MQTT for IoT applications: mqtt.js client and broker integration
// 162 - Peer-to-peer connections with WebRTC and Node.js signaling server

// 🧰 DEVOPS, CONTAINERIZATION & DEPLOYMENT
// 163 - Dockerizing Node.js applications: writing Dockerfiles, multi-stage builds
// 164 - Docker Compose for multi-container setups: linking Node.js, database, Redis
// 165 - Kubernetes basics: creating Deployments, Services, ConfigMaps, Secrets for Node.js apps
// 166 - Helm charts for packaging Node.js deployments
// 167 - CI/CD pipelines: automating build, test, lint, and deploy with GitHub Actions, GitLab CI, Jenkins
// 168 - Using PM2 for process management: clustering, monitoring, zero-downtime reload
// 169 - Deploying to cloud platforms: Heroku, AWS Elastic Beanstalk, DigitalOcean App Platform, Azure App Service
// 170 - Serverless deployment: AWS Lambda with Serverless Framework or AWS SAM, Azure Functions, Google Cloud Functions
// 171 - Monitoring and logging: integrating Winston, Bunyan, or Pino with Loggly, Papertrail, or Elasticsearch/Logstash/Kibana (ELK) stack
// 172 - Health checks and readiness/liveness probes in Kubernetes


// 🔧 API GATEWAYS & PROXY SERVERS
// 173 - Setting up Nginx as a reverse proxy for Node.js: load balancing, SSL termination
// 174 - Using HAProxy for advanced load balancing strategies
// 175 - Implementing API caching at the gateway level (NGINX FastCGI cache, Varnish)
// 176 - Rate limiting and IP blocking at the NGINX/HAProxy layer
// 177 - JWT verification at the gateway level: using lua-nginx-module or nginx-auth-request

// 🚀 SERVER-SIDE RENDERING (SSR) & TEMPLATE ENGINES
// 178 - Using EJS: embedding JavaScript in HTML, partials, layouts
// 179 - Pug (formerly Jade): indentation-based syntax, mixins, template inheritance
// 180 - Handlebars: helpers, partials, block helpers
// 181 - Integrating React or Vue for server-side rendering with Node.js: Next.js serverless functions, Nuxt.js server middleware
// 182 - Caching rendered pages: in-memory, Redis, or CDNs
// 183 - Hybrid rendering: generating static portions and hydrating on client



//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 149 – Designing microservices: single responsibility, bounded contexts
// -----------------------------------------------------------------------------
// THEORY:
// • Microservices: architect your system as a suite of small, autonomous services.
// • Single Responsibility: each service owns one business capability (e.g., orders, inventory).
// • Bounded Contexts (from Domain-Driven Design): define clear domain boundaries with their own models and logic.
// -----------------------------------------------------------------------------

// PRINCIPLES:
// 1. Single Responsibility:
//    – Service = one business function.  
//    – Keep codebases small, focused, and maintainable.
//
// 2. Bounded Contexts:
//    – Align services with domain subdomains (e.g., “Customer”, “Billing”, “Shipping”).  
//    – Encapsulate data and behavior; avoid shared domain models across contexts.
//
// 3. Data Ownership:
//    – Each service has its own datastore/schema.  
//    – No direct DB access by other services; use APIs or events to share data.
//
// 4. API Contracts & Communication:
//    – Expose well-defined, versioned APIs (REST, gRPC, GraphQL).  
//    – Use async messaging (Kafka, RabbitMQ) for events to decouple services.
//
// 5. Decoupling & Resilience:
//    – Services deploy, scale, and fail independently.  
//    – Implement circuit breakers, timeouts, and retries for inter-service calls.
//
// 6. Evolution & Versioning:
//    – Version your APIs to support backward compatibility.  
//    – Deprecate old versions gradually; run multiple versions if needed.
//
// -----------------------------------------------------------------------------

// EXAMPLE: Order Service (orders.js)
const express = require('express');
const orderApp = express();
orderApp.use(express.json());

// Single Responsibility: Manages orders only
orderApp.post('/orders', (req, res) => {
  // create new order
});

orderApp.get('/orders/:id', (req, res) => {
  // fetch order details
});

module.exports = orderApp;

// -----------------------------------------------------------------------------

// EXAMPLE: Inventory Service (inventory.js)
const inventoryApp = express();
inventoryApp.use(express.json());

// Bounded Context: Manages stock levels
inventoryApp.post('/inventory/reserve', (req, res) => {
  // reserve stock for an order, emit InventoryReserved event
});

inventoryApp.post('/inventory/release', (req, res) => {
  // release reserved stock when order cancelled
});

module.exports = inventoryApp;

// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 150 – Communication patterns between services: REST, gRPC, message queues
// -----------------------------------------------------------------------------
// THEORY:
// • REST (Representational State Transfer): Synchronous, HTTP-based, resource-oriented.
// • gRPC: Synchronous or streaming RPC over HTTP/2 with Protobuf for contract-first APIs.
// • Message Queues: Asynchronous, decoupled communication via brokers (e.g., RabbitMQ, Kafka).
// -----------------------------------------------------------------------------

// --- 1. REST API (Express) -----------------------------------------------
const restApp = require('express')();
restApp.use(require('express').json());

// Expose user resource via REST
restApp.get('/users/:id', (req, res) => {
  // Fetch user by ID and return JSON
  res.json({ id: req.params.id, name: 'Alice' });
});

restApp.post('/users', (req, res) => {
  // Create user with req.body, return 201 Created
  res.status(201).json({ id: 2, ...req.body });
});

restApp.listen(3000, () => {
  console.log('REST service listening on http://localhost:3000');
});

// -----------------------------------------------------------------------------

// --- 2. gRPC Service (using @grpc/grpc-js and Protobuf) -------------------
// proto/users.proto
/*
syntax = "proto3";
package users;
service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserReply);
}
message GetUserRequest { int32 id = 1; }
message GetUserReply { int32 id = 1; string name = 2; }
*/

// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('proto/users.proto');
const usersProto = grpc.loadPackageDefinition(packageDef).users;

function getUser(call, callback) {
  callback(null, { id: call.request.id, name: 'Bob' });
}

const grpcServer = new grpc.Server();
grpcServer.addService(usersProto.UserService.service, { GetUser: getUser });
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  grpcServer.start();
  console.log('gRPC service running on port 50051');
});

// -----------------------------------------------------------------------------

// --- 3. Message Queue (RabbitMQ publish/subscribe) -----------------------
const amqp = require('amqplib');

async function mqExample() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const exchange = 'events';
  await channel.assertExchange(exchange, 'fanout', { durable: false });

  // Publisher: emit an event
  channel.publish(exchange, '', Buffer.from(JSON.stringify({ type: 'USER_CREATED', payload: { id: 3, name: 'Carol' } })));
  console.log(' [x] Sent USER_CREATED event');

  // Consumer: subscribe to events
  const q = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(q.queue, exchange, '');
  channel.consume(q.queue, msg => {
    const event = JSON.parse(msg.content.toString());
    console.log(' [x] Received', event);
    // handle event, e.g., update read model
  }, { noAck: true });
}

mqExample().catch(console.error);

// -----------------------------------------------------------------------------
// SUMMARY:
// • Use REST for simple, resource-based sync calls (HTTP/JSON).
// • Use gRPC for high-performance, strongly-typed RPC (Protobuf, HTTP/2).
// • Use message queues for async, decoupled patterns (events, pub/sub, task queues).
// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 151 – Using RabbitMQ or Apache Kafka with amqplib or kafkajs for asynchronous messaging
// -----------------------------------------------------------------------------
// THEORY:
// • RabbitMQ (AMQP): message broker for queued, routed messaging patterns.
// • Apache Kafka: distributed streaming platform, high-throughput, durable logs.
// • amqplib: Node.js library for AMQP 0-9-1 (RabbitMQ).
// • kafkajs: modern Node.js client for Apache Kafka.
// -----------------------------------------------------------------------------

// --- A) RabbitMQ with amqplib -----------------------------------------------
const amqp = require('amqplib');

async function rabbitMQExample() {
  // Connect to RabbitMQ server
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'task_queue';

  // Ensure queue exists
  await channel.assertQueue(queue, { durable: true });

  // Publisher: send messages with persistent delivery
  const msg = { task: 'processData', payload: { id: 1 } };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true });
  console.log(" [x] Sent '%s'", JSON.stringify(msg));

  // Consumer: receive and ack messages
  channel.consume(queue, msg => {
    const content = JSON.parse(msg.content.toString());
    console.log(" [x] Received '%o'", content);
    // Process message...
    channel.ack(msg); // acknowledge on success
  }, { noAck: false });
}

// --- B) Apache Kafka with kafkajs --------------------------------------------
const { Kafka } = require('kafkajs');

async function kafkaExample() {
  // Initialize Kafka client
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  });

  // Producer: send an event
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: 'user-events',
    messages: [
      { key: 'user1', value: JSON.stringify({ action: 'created', userId: 1 }) }
    ]
  });
  console.log(' [x] Kafka message sent');

  // Consumer: subscribe and process events
  const consumer = kafka.consumer({ groupId: 'consumer-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString(),
      });
      // Process event...
    },
  });
}

// Execute examples
rabbitMQExample().catch(console.error);
kafkaExample().catch(console.error);

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 152 – Service discovery and registry: Consul, etcd, or DNS-based discovery
// -----------------------------------------------------------------------------
// THEORY:
// • Service discovery lets services find each other dynamically without hard-coded addresses.
// • A registry tracks available service instances (name, address, port, health).
// • Clients query the registry (pull or via DNS) to locate healthy instances.
// • Common solutions:
//    – Consul: HTTP API + DNS interface + health checks.
//    – etcd: distributed key/value store; clients watch keys for changes.
//    – DNS‐based: use SRV or A records in DNS for simple discovery.
//
// -----------------------------------------------------------------------------
// A) Consul (using node-consul)
// -----------------------------------------------------------------------------
const Consul = require('consul');
const consul = new Consul({ host: '127.0.0.1', port: 8500 });

// Register this service instance on startup
consul.agent.service.register({
  name: 'user-service',
  id:   'user-service-1',
  address: '10.0.0.5',
  port: 3000,
  check: {
    http:     'http://10.0.0.5:3000/health',
    interval: '10s'
  }
}, err => {
  if (err) throw err;
  console.log('✅ Registered user-service with Consul');
});

// Discover healthy instances when making requests
async function getUserServiceInstances() {
  const nodes = await consul.health.service({ service: 'user-service', passing: true });
  return nodes.map(n => ({
    address: n.Service.Address,
    port:    n.Service.Port
  }));
}

// -----------------------------------------------------------------------------
// B) etcd (using etcd3 client)
// -----------------------------------------------------------------------------
const { Etcd3 } = require('etcd3');
const etcd = new Etcd3({ hosts: '127.0.0.1:2379' });

// Register service by writing a key with a TTL lease
async function registerEtcdService() {
  const lease = etcd.lease(30); // 30s TTL; auto-renew
  await lease.put('services/payment-service/instance1')
            .value(JSON.stringify({ address: '10.0.0.8', port: 4000 }));
  console.log('✅ Registered payment-service in etcd');
}

// Watch for changes under the services prefix
async function watchPaymentService() {
  const watcher = await etcd.watch()
    .prefix('services/payment-service/')
    .create();
  watcher
    .on('put', res => console.log('Instance added:', res.key.toString(), res.value.toString()))
    .on('delete', res => console.log('Instance removed:', res.key.toString()));
}

// -----------------------------------------------------------------------------
// C) DNS-based discovery (SRV records, built-in dns module)
// -----------------------------------------------------------------------------
const dns = require('dns').promises;

// Assuming DNS SRV records exist: _order-service._tcp.example.com
async function resolveService(name) {
  const records = await dns.resolveSrv(`${name}._tcp.example.com`);
  // records = [ { name, port, priority, weight }, … ]
  return records.map(r => ({ host: r.name, port: r.port }));
}

// -----------------------------------------------------------------------------
// USAGE SUMMARY:
// • On startup, each instance registers itself with the chosen registry (Consul, etcd, or DNS-backed).
// • Clients query the registry or DNS before making calls to discover healthy service endpoints.
// • Health checks and TTL/leases ensure stale instances are removed automatically.
// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 153 – API Gateway patterns: implementing a gateway with Express/Koa or using Kong/Traefik
// -----------------------------------------------------------------------------
// THEORY:
// • API Gateway centralizes cross-cutting concerns: routing, authentication, rate-limiting, logging.
// • You can build a simple gateway in your Node.js stack (Express or Koa) or leverage dedicated tools (Kong, Traefik).
// -----------------------------------------------------------------------------

// === A) Express-based Gateway using http-proxy-middleware ===
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors    = require('cors');
const morgan  = require('morgan');

const gateway = express();

// Global middleware
gateway.use(cors());
gateway.use(morgan('combined'));
gateway.use(express.json());

// Simple auth middleware example
gateway.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== 'Bearer secrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Proxy routes to upstream services
gateway.use('/users', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/users': '' },
}));

gateway.use('/orders', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/orders': '' },
}));

gateway.listen(8080, () => {
  console.log('🛡️  API Gateway listening on port 8080');
});


// === B) Koa-based Gateway using koa-proxies and koa-router ===
const Koa = require('koa');
const Router = require('@koa/router');
const proxy = require('koa-proxies');
const koaCors = require('@koa/cors');
const koaLogger = require('koa-logger');

const app = new Koa();
const router = new Router();

// Global middleware
app.use(koaCors());
app.use(koaLogger());

// Auth example
app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/users') && ctx.headers.authorization !== 'Bearer secrettoken') {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized' };
  } else {
    await next();
  }
});

// Proxy setup
router.use('/users', proxy({
  target: 'http://localhost:3001',
  changeOrigin: true,
  rewrite: path => path.replace(/^\/users/, ''),
}));

router.use('/orders', proxy({
  target: 'http://localhost:3002',
  changeOrigin: true,
  rewrite: path => path.replace(/^\/orders/, ''),
}));

app.use(router.routes()).use(router.allowedMethods());
app.listen(8081, () => {
  console.log('🛡️  Koa API Gateway listening on port 8081');
});


// === C) Kong Gateway (Declarative YAML) ===
// Save as kong.yml and start with: kong start -c kong.conf --vv
/*
_format_version: "2.1"
services:
  - name: users
    url: http://users:3001
    routes:
      - name: users-route
        paths: [ /users ]
  - name: orders
    url: http://orders:3002
    routes:
      - name: orders-route
        paths: [ /orders ]

plugins:
  - name: key-auth
    service: all
    config:
      key_names: ["apikey"]
      hide_credentials: true
  - name: rate-limiting
    service: all
    config:
      minute: 100
*/

// === D) Traefik (Static YAML) ===
// Save as traefik.yml and run with Traefik binary
/*
entryPoints:
  web:
    address: ":80"

providers:
  file:
    filename: "dynamic.yml"
*/

// dynamic.yml:
/*
http:
  routers:
    users-router:
      entryPoints: ["web"]
      rule: "PathPrefix(`/users`)"
      service: users-service
    orders-router:
      entryPoints: ["web"]
      rule: "PathPrefix(`/orders`)"
      service: orders-service

  services:
    users-service:
      loadBalancer:
        servers:
          - url: "http://users:3001"
    orders-service:
      loadBalancer:
        servers:
          - url: "http://orders:3002"

  middlewares:
    auth:
      basicAuth:
        users:
          - "admin:$$apr1$$hH2H7Q$/JY7.kv3RsfZ/5Jm2E5c20"  // htpasswd
    ratelimit:
      rateLimit:
        average: 100
        burst: 20
*/

// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 154 – Circuit breaker pattern: using opossum library for resilient services
// -----------------------------------------------------------------------------
// THEORY:
// • Circuit Breaker prevents cascading failures by “opening” when a service fails too often.
// • While open, calls fail fast (or use fallback) instead of invoking the unhealthy service.
// • After a timeout, it transitions to “halfOpen” to test if the service has recovered.
// • Opossum is a Node.js circuit breaker implementation.
//
// STEPS:
// 1. Install: npm install opossum
// 2. Wrap your remote or flaky function with a CircuitBreaker instance.
// 3. Configure options: failureThreshold, timeout, resetTimeout, rollingCount.
// 4. Listen for state events (open, halfOpen, close) and optionally define fallbacks.
// -----------------------------------------------------------------------------

const CircuitBreaker = require('opossum');
const fetch = require('node-fetch'); // or any HTTP client

// 1. Define the action: a function returning a Promise
async function getUserFromApi(userId) {
  const res = await fetch(`https://api.example.com/users/${userId}`);
  if (!res.ok) throw new Error(`API responded ${res.status}`);
  return res.json();
}

// 2. Circuit breaker options
const options = {
  timeout: 3000,            // time in ms before a request is considered failed
  errorThresholdPercentage: 50, // % of failures before opening circuit
  resetTimeout: 10000,      // time in ms to wait before attempting a “halfOpen” request
  rollingCountTimeout: 10000,   // window for metrics in ms
  rollingCountBuckets: 10,  // number of buckets in the rolling window
};

// 3. Create the breaker
const breaker = new CircuitBreaker(getUserFromApi, options);

// 4. Fallback if desired (called when circuit is open)
breaker.fallback((userId) => ({
  id: userId,
  name: 'Unknown User',
  cached: true
}));

// 5. Event listeners for observability
breaker.on('open',    () => console.warn('⚠️  Circuit opened: failing fast'));
breaker.on('halfOpen',() => console.info('ℹ️  Circuit half-open: testing service'));
breaker.on('close',   () => console.info('✅ Circuit closed: service restored'));
breaker.on('fallback', (data) => console.info('🔄 Falling back with:', data));
breaker.on('reject',  () => console.warn('❌ Request rejected; circuit is open'));
breaker.on('timeout', () => console.error('⏱️  Request timed out'));
breaker.on('failure', (err) => console.error('🚨 Service call failure:', err.message));

// 6. Usage example
async function fetchUser(userId) {
  try {
    const user = await breaker.fire(userId);
    console.log('User data:', user);
  } catch (err) {
    console.error('Final error:', err.message);
  }
}

// Invoke repeatedly (in real code, within your route/controller)
fetchUser(1);

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 155 – Bulkheading and rate limiting between services to prevent cascading failures
// -----------------------------------------------------------------------------
// THEORY:
// • Bulkheading: isolate resources (connections, threads, concurrency slots) per downstream service
//   so that a failure or overload in one doesn’t exhaust all your app’s resources.
// • Rate limiting: cap the rate of incoming or outgoing requests to protect services under load.
// • Combined, these patterns ensure that slow or failing dependencies don’t cascade and crash your system.
// -----------------------------------------------------------------------------

const express = require('express');
const rateLimit = require('express-rate-limit');
const pLimit = require('p-limit');
const axios = require('axios');

const app = express();
app.use(express.json());

// 1. Rate limiting for incoming client requests (protect your service)
// --------------------------------------------------------------------
const apiLimiter = rateLimit({
  windowMs: 60_000,    // 1 minute window
  max: 100,            // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// 2. Bulkheading for outgoing calls using p-limit (isolated concurrency)
// ---------------------------------------------------------------------
// Create a separate concurrency pool per external service
const limitUserService    = pLimit(5);  // max 5 concurrent calls to user-service
const limitOrderService   = pLimit(3);  // max 3 concurrent calls to order-service

async function callUserService(userId) {
  return limitUserService(() =>
    axios.get(`http://user-service.local/users/${userId}`)
  );
}

async function callOrderService(orderId) {
  return limitOrderService(() =>
    axios.get(`http://order-service.local/orders/${orderId}`)
  );
}

// 3. Example endpoint that fans out to two services safely
// ---------------------------------------------------------
app.get('/dashboard/:userId', async (req, res, next) => {
  try {
    // Both calls are isolated in their own pools
    const [userResp, ordersResp] = await Promise.all([
      callUserService(req.params.userId),
      callOrderService(req.params.userId)
    ]);
    res.json({
      user: userResp.data,
      orders: ordersResp.data
    });
  } catch (err) {
    // If one service is slow/failing, only its pool is impacted
    next(err);
  }
});

// 4. Outgoing rate limiting per service (token bucket example)
// ------------------------------------------------------------
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Limit to 10 calls/sec to payment-service
const paymentRateLimiter = new RateLimiterMemory({
  points: 10,             // 10 points
  duration: 1             // per second
});

async function callPaymentService(payload) {
  // Consume 1 point before making the call
  await paymentRateLimiter.consume(1);
  return axios.post(`http://payment-service.local/pay`, payload);
}

// -----------------------------------------------------------------------------
// START SERVER
// -----------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('Error handler:', err.message);
  res.status(502).json({ error: 'Upstream service unavailable' });
});

app.listen(3000, () => {
  console.log('Service running on port 3000 with bulkheading & rate limiting');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 156 – Distributed tracing: integrating OpenTelemetry or Jaeger for request-level tracing
// -----------------------------------------------------------------------------
// THEORY:
// • Distributed tracing lets you track a single request as it flows through multiple services.
// • OpenTelemetry is a vendor-neutral instrumentation framework; Jaeger is a popular tracing backend.
// • You configure an OpenTelemetry SDK in your Node.js app to auto-instrument HTTP/Express,
//   and export spans to Jaeger for visualization and analysis.
//
// SETUP STEPS:
// 1. Install dependencies:
//      npm install @opentelemetry/sdk-node @opentelemetry/exporter-jaeger \
//                  @opentelemetry/auto-instrumentations-node express
// 2. Configure and start the OpenTelemetry SDK before your application code.
// 3. Run Jaeger locally (e.g., docker run -d --name jaeger -p 16686:16686 -p 14268:14268 jaegertracing/all-in-one)
// 4. Start your app and browse http://localhost:16686 to view traces.
//
// -----------------------------------------------------------------------------
//
// --- tracer.js --- (initialize tracing)
'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    serviceName: 'my-node-service',          // identify your service in Jaeger UI
    endpoint: 'http://localhost:14268/api/traces', // Jaeger HTTP collector endpoint
  }),
  instrumentations: [ getNodeAutoInstrumentations() ], // auto-instrument HTTP, Express, DNS, gRPC, etc.
});

// Start the OpenTelemetry SDK (must happen before any instrumented code runs)
sdk.start()
  .then(() => console.log('✅ OpenTelemetry SDK initialized'))
  .catch(err => console.error('❌ Error initializing OTEL SDK', err));

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
     .then(() => console.log('🛑 Tracing terminated'))
     .catch(err => console.error('❌ Error terminating tracing', err))
     .finally(() => process.exit(0));
});


// -----------------------------------------------------------------------------
//
// --- server.js --- (your Express application)
'use strict';

// Require tracer first so it instruments below modules
require('./tracer');

const express = require('express');
const app     = express();

app.use(express.json());

// A simple health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Business logic endpoint
app.get('/users/:id', async (req, res) => {
  // Simulate a span created for this route by OTel Express instrumentation
  // You can grab the current span via @opentelemetry/api if you need custom attributes:
  //
  // const { context, trace } = require('@opentelemetry/api');
  // const span = trace.getSpan(context.active());
  // span.setAttribute('app.user_id', req.params.id);
  //
  // Simulate data fetch
  await new Promise(r => setTimeout(r, 50));
  res.json({ id: req.params.id, name: 'Alice' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Express server listening on http://localhost:${port}`);
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 157 – WebSocket basics with ws or socket.io: setting up server, handling connections
// -----------------------------------------------------------------------------
// THEORY:
// • WebSockets provide full-duplex, real-time communication over a single TCP socket.
// • ‘ws’ is a lightweight WebSocket library for Node.js.
// • ‘socket.io’ sits atop WebSockets (with graceful fallbacks) and adds features like rooms, acknowledgments, and auto-reconnect.
// -----------------------------------------------------------------------------

// A) Using 'ws'
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected via ws');

  // Send a welcome message
  ws.send('🎉 Welcome to the ws server!');

  // Receive messages from client
  ws.on('message', (message) => {
    console.log('Received:', message);
    // Echo back to the same client
    ws.send(`Echo: ${message}`);
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('ws server listening on ws://localhost:8080');

// -----------------------------------------------------------------------------
// B) Using 'socket.io'
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }  // allow connections from any origin
});

io.on('connection', (socket) => {
  console.log('Client connected via socket.io:', socket.id);

  // Join a room
  socket.join('general');

  // Send a welcome event
  socket.emit('welcome', '🎉 Welcome to the socket.io server!');

  // Listen for custom events
  socket.on('chat message', (msg) => {
    console.log('chat message:', msg);
    // Broadcast to everyone in 'general'
    io.to('general').emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'reason:', reason);
  });
});

server.listen(3000, () => {
  console.log('socket.io server listening on http://localhost:3000');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 158 – Implementing real-time chat or notifications with socket.io rooms and namespaces
// -----------------------------------------------------------------------------
// THEORY:
// • Namespaces isolate communication channels (e.g., /chat, /notifications).
// • Rooms group sockets within a namespace (e.g., chat rooms by topic or user).
// • Clients join/leave rooms; server emits to rooms or namespaces as needed.
// -----------------------------------------------------------------------------

const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');

const app     = express();
const server  = http.createServer(app);
const io      = new Server(server, {
  cors: { origin: '*' }
});

// === 1. Chat namespace with rooms ===
const chatNsp = io.of('/chat');

chatNsp.on('connection', (socket) => {
  console.log(`Client connected to /chat: ${socket.id}`);

  // Join a room based on query or payload
  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    socket.emit('systemMessage', `You joined room ${room}`);
    chatNsp.to(room).emit('systemMessage', `User ${socket.id} joined ${room}`);
  });

  // Listen for chat messages and broadcast to the room
  socket.on('chatMessage', ({ room, message }) => {
    chatNsp.to(room).emit('chatMessage', {
      sender: socket.id,
      message,
      timestamp: Date.now()
    });
  });

  // Leave room
  socket.on('leaveRoom', ({ room }) => {
    socket.leave(room);
    socket.emit('systemMessage', `You left room ${room}`);
    chatNsp.to(room).emit('systemMessage', `User ${socket.id} left ${room}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`/chat client disconnected: ${socket.id} (${reason})`);
  });
});

// === 2. Notifications namespace ===
const notifyNsp = io.of('/notifications');

notifyNsp.on('connection', (socket) => {
  console.log(`Client connected to /notifications: ${socket.id}`);

  // Subscribe to personal notifications room
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(`user_${userId}`);
  }

  // Server-side: emit a notification to a user room
  // Example endpoint to trigger a notification
  app.post('/notify/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { title, body } = req.body;
    notifyNsp.to(`user_${userId}`).emit('notification', { title, body, timestamp: Date.now() });
    res.json({ status: 'sent' });
  });

  socket.on('disconnect', () => {
    console.log(`/notifications client disconnected: ${socket.id}`);
  });
});

// === 3. Start server ===
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`   /chat namespace at ws://localhost:${PORT}/chat`);
  console.log(`   /notifications namespace at ws://localhost:${PORT}/notifications`);
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 159 – Scaling WebSockets: using Redis adapter for socket.io across multiple nodes
// -----------------------------------------------------------------------------
// THEORY:
// • When you run multiple Node.js instances behind a load balancer, each has its own Socket.IO server.
// • To broadcast events across all instances, use a centralized Pub/Sub—Redis is a common choice.
// • The @socket.io/redis-adapter plugs into Socket.IO and uses Redis’ Pub/Sub to relay messages.
// -----------------------------------------------------------------------------

// 1. Install dependencies:
//    npm install socket.io @socket.io/redis-adapter redis

const { createServer } = require('http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// 2. Create Redis clients for Pub/Sub
const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

async function initAdapter() {
  await pubClient.connect();
  await subClient.connect();
  io.adapter(createAdapter(pubClient, subClient));
}

initAdapter().then(() => {
  console.log('🔗 Socket.IO Redis adapter initialized');
});

// 3. Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Join a common room for broadcasts
  socket.join('global');

  // Listen for messages from this client
  socket.on('message', (msg) => {
    // Broadcast to all clients across all nodes
    io.to('global').emit('message', {
      sender: socket.id,
      text: msg,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// 4. Start HTTP server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server listening on port ${PORT}`);
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////




// 160 – Server-Sent Events (SSE) vs WebSockets: choosing the right protocol
// -----------------------------------------------------------------------------
// THEORY:
// • SSE: unidirectional (server→client) text-streaming over HTTP.
//   – Uses EventSource in browser.
//   – Automatic reconnect, simple HTTP headers, works over proxies/HTTP/2.
//   – Ideal for live feeds, notifications, logs.
// • WebSockets: full-duplex, bidirectional binary/text over a persistent TCP socket.
//   – Requires websocket handshake, more overhead.
//   – Ideal for chat, real-time games, collaborative apps.
// -----------------------------------------------------------------------------

// === A) SSE Example (Express server + client) ===============================

/* Server-side (server.js) */
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial comment to the client
  res.write(': connected\n\n');

  // Push a message every 5 seconds
  const interval = setInterval(() => {
    const data = JSON.stringify({ time: new Date().toISOString() });
    res.write(`event: heartbeat\ndata: ${data}\n\n`);
  }, 5000);

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log('SSE server listening on http://localhost:3000');
});

/* Client-side (index.html)
<script>
  const evtSource = new EventSource('/events');
  evtSource.addEventListener('heartbeat', e => {
    const obj = JSON.parse(e.data);
    console.log('Heartbeat:', obj.time);
  });
  evtSource.onopen = () => console.log('SSE connection opened');
  evtSource.onerror = () => console.error('SSE error');
</script>
*/

// === B) WebSocket Example (using ws) =========================================

/* Server-side (wsServer.js) */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('WebSocket client connected');

  // Send a welcome message
  ws.send(JSON.stringify({ msg: 'Welcome!', time: Date.now() }));

  // Echo received messages
  ws.on('message', message => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

/* Client-side (in browser console)
const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open', () => console.log('WS open'));
socket.addEventListener('message', e => console.log('WS msg:', e.data));
socket.send('Hello server!');
*/

// -----------------------------------------------------------------------------
// CHOOSING PROTOCOL:
// • Use SSE when you need simple, reliable server→client updates and no client→server streaming.
// • Use WebSockets for real-time, bidirectional communication or binary data.
// • SSE is lighter (HTTP/1.1/2), easier through corporate proxies; WebSockets require proxy support.
// • Both can coexist: leverage SSE for notifications, WebSockets for interactive features.
// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 161 – Using MQTT for IoT applications: mqtt.js client and broker integration
// -----------------------------------------------------------------------------
// THEORY:
// • MQTT (Message Queuing Telemetry Transport) is a lightweight pub/sub protocol ideal for IoT.
// • A broker (e.g., Mosquitto, EMQX) routes messages between publishers and subscribers.
// • Clients publish messages to topics; subscribers receive those messages.
// • QoS levels:
//     0 – at most once (fire and forget)
//     1 – at least once (acknowledged delivery)
//     2 – exactly once (two-phase handshake)
// -----------------------------------------------------------------------------

// 1. Broker setup (Mosquitto example):
//    # Install on Ubuntu/Debian:
//    sudo apt update && sudo apt install mosquitto
//    # Start the broker in verbose mode:
//    mosquitto -v

// 2. Client implementation with mqtt.js:
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883', {
  clientId: `mqtt_client_${Math.random().toString(16).substr(2)}`,
  clean: true,                // start a clean session
  reconnectPeriod: 1000,      // try reconnecting every second
  connectTimeout: 30_000,     // 30s timeout
  // username: 'your_user',    // if your broker requires auth
  // password: 'your_pass',
});

client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');

  // Subscribe to the 'sensor/temperature' topic at QoS 1
  client.subscribe('sensor/temperature', { qos: 1 }, (err, granted) => {
    if (err) console.error('Subscribe error:', err);
    else console.log('Subscribed to:', granted.map(g => g.topic).join(', '));
  });

  // Publish a random temperature every 5 seconds
  setInterval(() => {
    const payload = JSON.stringify({ temp: (20 + Math.random() * 10).toFixed(2) });
    client.publish('sensor/temperature', payload, { qos: 1, retain: false }, err => {
      if (err) console.error('Publish error:', err);
      else console.log('Published:', payload);
    });
  }, 5000);
});

client.on('message', (topic, message) => {
  console.log(`📥 Message received [${topic}]:`, message.toString());
});

client.on('error', err => {
  console.error('❌ MQTT Error:', err);
});

client.on('close', () => {
  console.log('🔒 Disconnected from MQTT broker');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 162 – Peer-to-peer connections with WebRTC and Node.js signaling server
// -----------------------------------------------------------------------------
// THEORY:
// • WebRTC enables direct browser-to-browser media/data streams without passing media through your server.
// • A signaling server (e.g., via WebSocket or Socket.IO) is required only to exchange session descriptions (SDP) and ICE candidates.
// • Once peers negotiate, media/data flows P2P for low-latency real-time communication.
// -----------------------------------------------------------------------------

// === server.js (Signaling Server) ===========================================
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  // Join a room
  socket.on('join', room => {
    socket.join(room);
    // Notify new peer of existing peers
    const others = Array.from(io.sockets.adapter.rooms.get(room) || [])
                      .filter(id => id !== socket.id);
    socket.emit('peers', others);
  });

  // Relay SDP offer
  socket.on('offer', ({ offer, to }) => {
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  // Relay SDP answer
  socket.on('answer', ({ answer, to }) => {
    socket.to(to).emit('answer', { answer, from: socket.id });
  });

  // Relay ICE candidates
  socket.on('ice-candidate', ({ candidate, to }) => {
    socket.to(to).emit('ice-candidate', { candidate, from: socket.id });
  });
});

server.listen(3000, () => {
  console.log('🟢 Signaling server running at http://localhost:3000');
});


// === client.js (Browser) ====================================================
const socket = io('http://localhost:3000');
const peers = {};
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// 1. Join a room and get list of existing peers
socket.emit('join', 'my-room');
socket.on('peers', list => list.forEach(remoteId => createOffer(remoteId)));

// 2. Handle incoming offer
socket.on('offer', async ({ offer, from }) => {
  const pc = createPeerConnection(from);
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.emit('answer', { answer, to: from });
});

// 3. Handle incoming answer
socket.on('answer', async ({ answer, from }) => {
  const pc = peers[from];
  await pc.setRemoteDescription(answer);
});

// 4. Handle incoming ICE candidate
socket.on('ice-candidate', async ({ candidate, from }) => {
  const pc = peers[from];
  await pc.addIceCandidate(candidate);
});

// Create RTCPeerConnection, add tracks, and set up handlers
function createPeerConnection(id) {
  const pc = new RTCPeerConnection(config);
  peers[id] = pc;

  // Send ICE candidates to remote peer
  pc.onicecandidate = e => {
    if (e.candidate) {
      socket.emit('ice-candidate', { candidate: e.candidate, to: id });
    }
  };

  // Render incoming media tracks
  pc.ontrack = e => {
    const remoteVideo = document.getElementById('remoteVideo');
    remoteVideo.srcObject = e.streams[0];
  };

  // Add local media stream to connection
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      document.getElementById('localVideo').srcObject = stream;
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    });

  return pc;
}

// Create and send offer to a specific peer
async function createOffer(remoteId) {
  const pc = createPeerConnection(remoteId);
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit('offer', { offer, to: remoteId });
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



# 163 – Dockerizing Node.js applications: writing Dockerfiles, multi-stage builds
# -----------------------------------------------------------------------------
# THEORY:
# • Docker lets you package your app + environment in a container—ensuring consistency across dev, CI, and prod.
# • Multi-stage builds minimize final image size by separating build-time and runtime dependencies.
# -----------------------------------------------------------------------------

# 1. Build stage: install deps, compile/transpile code
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files & install full dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build (e.g., TypeScript, Babel, webpack)
COPY . .
RUN npm run build
# -----------------------------------------------------------------------------

# 2. Production stage: install only production deps, copy built output
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

# Expose application port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
# -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



# 164 – Docker Compose for multi-container setups: linking Node.js, database, Redis
# -----------------------------------------------------------------------------
# THEORY:
# • Docker Compose orchestrates multiple containers with a single YAML file.
# • Services share a default network, so they can refer to each other by service name.
# • Use environment variables to configure inter-service connections.
# -----------------------------------------------------------------------------

version: '3.8'

services:
  app:
    build: .
    command: npm start
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: example
      DB_NAME: myapp
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      - db
      - redis
    volumes:
      - ./:/app
    networks:
      - backend

  db:
    image: postgres:14
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: example
      POSTGRES_DB: myapp
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:6
    restart: always
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis_data:/data
    networks:
      - backend

volumes:
  db_data:
  redis_data:

networks:
  backend:
    driver: bridge

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 165 – Kubernetes basics: Deployments, Services, ConfigMaps, Secrets for Node.js apps
# -----------------------------------------------------------------------------
# THEORY:
# • Deployment: declares desired pod replica count, update strategy, and pod template (container + env).
# • Service: exposes pods internally (ClusterIP) or externally (NodePort/LoadBalancer).
# • ConfigMap: key/value pairs for non-sensitive config, injected as env or mounted volume.
# • Secret: key/value pairs for sensitive data, injected as env or mounted volume.

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nodejs-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"

---
apiVersion: v1
kind: Secret
metadata:
  name: nodejs-secrets
type: Opaque
stringData:
  DB_PASSWORD: "s3cr3tP@ss"
  API_KEY: "abcd1234"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
        - name: nodejs-container
          image: your-docker-registry/nodejs-app:latest
          ports:
            - containerPort: 3000
          env:
            - name: APP_ENV
              valueFrom:
                configMapKeyRef:
                  name: nodejs-config
                  key: APP_ENV
            - name: LOG_LEVEL
              valueFrom:
                configMapKeyRef:
                  name: nodejs-config
                  key: LOG_LEVEL
            - name: DB_HOST
              value: "postgres-service"
            - name: DB_USER
              value: "postgres"
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: nodejs-secrets
                  key: DB_PASSWORD
            - name: API_KEY
              valueFrom:
                secretKeyRef:
                  name: nodejs-secrets
                  key: API_KEY
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20

---
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  selector:
    app: nodejs
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 166 – Helm chart for packaging Node.js deployments
# ----------------------------------------------------------------------------- 
# File: Chart.yaml
apiVersion: v2
name: nodejs-app
description: A Helm chart for Node.js applications
type: application
version: 0.1.0
appVersion: "1.0.0"

---
# File: values.yaml
replicaCount: 2

image:
  repository: your-docker-registry/nodejs-app
  tag: "latest"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

env:
  NODE_ENV: production
  LOG_LEVEL: info
  DB_HOST: postgres-service
  DB_USER: postgres

---
# File: templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "nodejs-app.fullname" . }}
  labels:
    {{- include "nodejs-app.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ include "nodejs-app.name" . }}
  template:
    metadata:
      labels:
        app: {{ include "nodejs-app.name" . }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - containerPort: {{ .Values.service.targetPort }}
          env:
            - name: NODE_ENV
              value: {{ .Values.env.NODE_ENV | quote }}
            - name: LOG_LEVEL
              value: {{ .Values.env.LOG_LEVEL | quote }}
            - name: DB_HOST
              value: {{ .Values.env.DB_HOST | quote }}
            - name: DB_USER
              value: {{ .Values.env.DB_USER | quote }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          readinessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.targetPort }}
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.targetPort }}
            initialDelaySeconds: 15
            periodSeconds: 20

---
# File: templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "nodejs-app.fullname" . }}
  labels:
    {{- include "nodejs-app.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.targetPort }}
      protocol: TCP
  selector:
    app: {{ include "nodejs-app.name" . }}

---
# File: templates/_helpers.tpl
{{- define "nodejs-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "nodejs-app.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "nodejs-app.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "nodejs-app.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/name: {{ include "nodejs-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



# 167 – CI/CD pipelines: automating build, test, lint, and deploy with GitHub Actions, GitLab CI, Jenkins
# -----------------------------------------------------------------------------

# --- 1. GitHub Actions (save as .github/workflows/ci-cd.yml) ---
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    name: Build, Lint & Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

  deploy:
    name: Deploy to Production
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Install production deps
        run: npm ci --production

      - name: Deploy
        run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}


# --- 2. GitLab CI (save as .gitlab-ci.yml) ---
stages:
  - lint
  - test
  - build
  - deploy

variables:
  NODE_ENV: test

lint:
  stage: lint
  image: node:20
  script:
    - npm ci
    - npm run lint

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test
  artifacts:
    when: always
    reports:
      junit: junit.xml

build:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: node:20
  only:
    - main
  before_script:
    - npm ci --production
  script:
    - npm run deploy
  environment:
    name: production
    url: https://your-app.example.com


# --- 3. Jenkins (save as Jenkinsfile) ---
pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          junit '**/junit.xml'
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
      artifacts {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        withCredentials([string(credentialsId: 'DEPLOY_KEY', variable: 'KEY')]) {
          sh 'npm ci --production'
          sh 'npm run deploy'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline succeeded'
    }
    failure {
      echo '❌ Pipeline failed'
    }
  }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 168 – Using PM2 for process management: clustering, monitoring, zero-downtime reload
# -----------------------------------------------------------------------------
# THEORY:
# • PM2 manages Node.js processes in production: auto-restart, clustering, and monitoring.
# • Clustering: spawn multiple instances to utilize all CPU cores.
# • Monitoring: built-in dashboard (`pm2 monit`) and customizable logs.
# • Zero-downtime reload: reloads instances one by one without dropping connections.
# -----------------------------------------------------------------------------

# 1. Install PM2 globally
npm install pm2@latest -g

# 2. Start your app in cluster mode (auto-detect CPU cores)
pm2 start server.js --name my-app -i max

# 3. Use an ecosystem file for declarative config (ecosystem.config.js)
cat << 'EOF' > ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'server.js',
      instances: 'max',        # or a number of instances
      exec_mode: 'cluster',    # enables clustering
      watch: false,            # disable file watch in production
      max_restarts: 5,         # auto-restart up to 5 times on crash
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

# 4. Manage processes
pm2 list         # list all processes
pm2 status       # detailed status with uptime, CPU/RAM
pm2 logs my-app  # real-time logs
pm2 monit        # resource monitoring dashboard

# 5. Zero-downtime reload (reload each instance sequentially)
pm2 reload my-app  

# 6. Persist across server restarts
pm2 save         # save current process list
pm2 startup      # generate and configure startup script for your OS

# 7. Stopping and deleting
pm2 stop my-app
pm2 delete my-app

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



# 169 – Deploying Node.js to cloud platforms: Heroku, AWS Elastic Beanstalk, 
#       DigitalOcean App Platform, Azure App Service
# -----------------------------------------------------------------------------
# 1. Heroku
# • Requires a Procfile and git-based deploy
# -----------------------------------------------------------------------------
# Create Procfile
cat << 'EOF' > Procfile
web: node server.js
EOF

# Login & create app
heroku login
heroku create my-heroku-node-app

# Push & release
git add Procfile
git commit -m "Add Procfile for Heroku"
git push heroku main

# 2. AWS Elastic Beanstalk
# • Uses eb CLI, generates .elasticbeanstalk config, requires package.json scripts
# -----------------------------------------------------------------------------
# Initialize EB environment
eb init my-eb-app --platform node.js --region us-east-1

# Create environment (single instance)
eb create my-eb-env

# Deploy current version
eb deploy

# 3. DigitalOcean App Platform
# • Uses a spec file (app.yaml) or UI; supports GitHub integration
# -----------------------------------------------------------------------------
cat << 'EOF' > app.yaml
name: my-do-node-app
services:
  - name: web
    github:
      repo: your-user/your-repo
      branch: main
    run_command: npm start
    http_port: 3000
    envs:
      - key: NODE_ENV
        value: production
EOF

# Push spec & let DO build/deploy
git add app.yaml
git commit -m "Add DigitalOcean App spec"
git push origin main

# 4. Azure App Service
# • Uses Azure CLI, generates deployment user and webapp
# -----------------------------------------------------------------------------
# Login & set subscription
az login
az account set --subscription "Your Subscription Name"

# Create resource group & App Service plan
az group create --name myResourceGroup --location eastus
az appservice plan create --name myPlan --resource-group myResourceGroup --sku B1 --is-linux

# Create Web App (Docker optional; here Node built-in)
az webapp create \
  --resource-group myResourceGroup \
  --plan myPlan \
  --name my-azure-node-app \
  --runtime "NODE|18-lts"

# Deploy from local git
az webapp deployment source config-local-git \
  --name my-azure-node-app \
  --resource-group myResourceGroup

# Push to Azure remote
git remote add azure $(az webapp deployment source show-local-git \
  --name my-azure-node-app \
  --resource-group myResourceGroup --query url --output tsv)
git push azure main

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 170 – Serverless deployment: AWS Lambda (Serverless Framework & AWS SAM), Azure Functions, Google Cloud Functions
# -----------------------------------------------------------------------------

# ── A) AWS Lambda with Serverless Framework ─────────────────────────────────
npm install -g serverless
serverless create --template aws-nodejs --path sls-service
cd sls-service

cat << 'EOF' > serverless.yml
service: sls-service
provider:
  name: aws
  runtime: nodejs18.x
functions:
  hello:
    handler: handler.hello
EOF

cat << 'EOF' > handler.js
'use strict';
module.exports.hello = async () => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Hello from Lambda (Serverless Framework)!' })
});
EOF

serverless deploy

# ── B) AWS Lambda with AWS SAM ───────────────────────────────────────────────
sam init --runtime nodejs18.x --name sam-app --no-interactive
cd sam-app

cat << 'EOF' > template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs18.x
      Events:
        HelloAPI:
          Type: Api
          Properties:
            Path: /hello
            Method: get
EOF

cat << 'EOF' > app.js
exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Hello from Lambda (SAM)!' })
});
EOF

sam build
sam deploy --guided

# ── C) Azure Functions ──────────────────────────────────────────────────────
npm install -g azure-functions-core-tools@4 --unsafe-perm true
func init azure-funcs --javascript
cd azure-funcs
func new --name HttpTrigger --template "HTTP trigger" --authlevel "anonymous"

cat << 'EOF' > HttpTrigger/index.js
module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: { message: 'Hello from Azure Functions!' }
  };
};
EOF

func start
func azure functionapp publish <YOUR_FUNCTION_APP_NAME>

# ── D) Google Cloud Functions ────────────────────────────────────────────────
npm install -g @google-cloud/functions-framework
mkdir gcf-app && cd gcf-app

cat << 'EOF' > index.js
exports.helloHttp = (req, res) => {
  res.status(200).send({ message: 'Hello from Google Cloud Functions!' });
};
EOF

cat << 'EOF' > package.json
{
  "name": "gcf-app",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.1.3"
  },
  "scripts": {
    "start": "functions-framework --target=helloHttp"
  }
}
EOF

gcloud functions deploy helloHttp \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 171 – Monitoring and logging: integrating Winston, Bunyan, or Pino with Loggly, Papertrail, or ELK
// -----------------------------------------------------------------------------
// THEORY:
// • Centralized logging forwards your app’s logs to external services for storage, search, and alerting.
// • Winston, Bunyan, and Pino are popular Node.js loggers; Loggly, Papertrail, and the ELK stack (Elasticsearch/Logstash/Kibana) are common log backends.
// -----------------------------------------------------------------------------

// A) Winston → Loggly
const winston = require('winston');
require('winston-loggly-bulk');
const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.Loggly({
      token: 'YOUR_LOGGLY_CUSTOMER_TOKEN',
      subdomain: 'YOUR_LOGGLY_SUBDOMAIN',
      tags: ['Winston-NodeJS'],
      json: true
    })
  ]
});
winstonLogger.info('User login', { user: 'alice', action: 'login' });


// B) Bunyan → Papertrail
const bunyan = require('bunyan');
const { Papertrail } = require('bunyan-papertrail');
const bunyanLogger = bunyan.createLogger({ name: 'my-app' });
const papertrail = new Papertrail({
  host: 'logs.papertrailapp.com',
  port: 12345,
  program: 'my-app'
});
papertrail.on('error', err => console.error('Papertrail error:', err));
bunyanLogger.addStream({
  type: 'raw',
  stream: papertrail,
  level: 'info'
});
bunyanLogger.info({ user: 'bob', action: 'purchase' }, 'Order placed');


// C) Pino → ELK (via pino-elasticsearch)
const pino = require('pino');
const pinoElastic = require('pino-elasticsearch');
const esStream = pinoElastic({
  index: 'nodejs-logs',
  type: '_doc',
  node: 'http://elk-host:9200'
});
const pinoLogger = pino({ level: 'info' }, esStream);
pinoLogger.info({ user: 'carol', action: 'signup' }, 'New user registered');

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

# 172 – Health checks and readiness/liveness probes in Kubernetes
# -----------------------------------------------------------------------------
# THEORY:
# • Liveness probe: checks if the container is “alive”; a failing liveness probe causes a pod restart.
// • Readiness probe: checks if the container is “ready” to accept traffic; failing readiness removes pod from Service endpoints.
// • Probe types: HTTP GET, TCP socket, Exec command.
// • Common settings:
//     initialDelaySeconds – wait before first probe
//     periodSeconds       – interval between probes
//     timeoutSeconds      – time to wait for probe to succeed
//     failureThreshold    – consecutive failures before action
# -----------------------------------------------------------------------------
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app-container
          image: my-image:latest
          ports:
            - containerPort: 3000

          # Liveness probe: restart pod if /healthz fails
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20
            timeoutSeconds: 2
            failureThreshold: 3

          # Readiness probe: only send traffic when /ready succeeds
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
            timeoutSeconds: 1
            failureThreshold: 3

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 173 – Setting up Nginx as a reverse proxy for Node.js: load balancing & SSL termination
# -----------------------------------------------------------------------------
# THEORY:
# • Nginx acts as a reverse proxy to route client requests to one or more Node.js backend servers.
# • Load balancing (e.g., round-robin, least_conn) distributes traffic evenly or based on connection load.
# • SSL termination offloads TLS/HTTPS to Nginx, forwarding plain HTTP to Node.js for better performance.
//
// Place this in /etc/nginx/nginx.conf or as a separate file in /etc/nginx/sites-enabled/example.com

upstream node_backend {
    least_conn;                            # choose the backend with the fewest active connections
    server backend1.example.com:3000;
    server backend2.example.com:3000;
}

server {
    listen 80;
    server_name example.com www.example.com;

    # Redirect all HTTP traffic to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL settings
    ssl_protocols             TLSv1.2 TLSv1.3;
    ssl_ciphers               HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache         shared:SSL:10m;
    ssl_session_timeout       10m;

    # Gzip compression for assets
    gzip                on;
    gzip_types          text/plain application/json application/javascript text/css;
    gzip_min_length     1000;

    location / {
        # Proxy to Node.js backend pool
        proxy_pass         http://node_backend;
        proxy_http_version 1.1;

        # Preserve client info
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_read_timeout    60s;
    }
}


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



# 174 – Using HAProxy for advanced load balancing strategies
# -----------------------------------------------------------------------------
# THEORY:
# • HAProxy is a high-performance load balancer for HTTP/TCP with multiple algorithms.
# • Strategies: roundrobin, leastconn, source hashing, URI hashing, header hashing, cookie-based persistence.
# • Advanced features: health checks, SSL termination, stick tables for rate-limiting, ACLs for routing.
# -----------------------------------------------------------------------------

global
    log /dev/log    local0
    log /dev/log    local1 notice
    daemon
    maxconn 20000
    tune.ssl.default-dh-param 2048

defaults
    log     global
    mode    http
    option  httplog
    option  dontlognull
    timeout connect 5s
    timeout client  50s
    timeout server  50s
    option http-server-close
    option forwardfor

# ---- FRONTEND ----
frontend http_front
    bind *:80
    bind *:443 ssl crt /etc/haproxy/certs/site.pem
    mode http

    # Redirect HTTP → HTTPS
    acl is_plain_http  !{ ssl_fc }
    http-request redirect scheme https if is_plain_http

    # Rate-limit abusive clients (stick table)
    stick-table type ip size 200k expire 10m store http_req_rate(10s)
    acl too_many_requests sc_http_req_rate(0) gt 100
    http-request deny if too_many_requests

    # Route by path: API vs Web UI
    acl is_api path_beg /api/
    use_backend api_backend if is_api
    default_backend web_backend

# ---- BACKENDS ----

# 1. Round Robin (default)
backend web_backend
    mode http
    balance roundrobin
    option httpchk GET /health
    server web1 10.0.0.11:3000 check
    server web2 10.0.0.12:3000 check
    server web3 10.0.0.13:3000 check

# 2. Least Connections
backend api_backend
    mode http
    balance leastconn
    option httpchk GET /health
    server api1 10.0.0.21:4000 check
    server api2 10.0.0.22:4000 check
    server api3 10.0.0.23:4000 check

# 3. Source Hashing (consistent hashing by client IP)
backend hash_backend
    mode http
    balance source
    hash-type consistent
    option httpchk GET /health
    server h1 10.0.0.31:5000 check
    server h2 10.0.0.32:5000 check
    server h3 10.0.0.33:5000 check

# 4. Cookie-Based Persistence (sticky sessions)
backend sticky_backend
    mode http
    balance roundrobin
    cookie SERVERID insert indirect nocache
    server s1 10.0.0.41:6000 cookie s1 check
    server s2 10.0.0.42:6000 cookie s2 check
    server s3 10.0.0.43:6000 cookie s3 check

# 5. URI Hashing (consistent by request URI)
backend uri_hash_backend
    mode http
    balance uri
    option httpchk GET /health
    server u1 10.0.0.51:7000 check
    server u2 10.0.0.52:7000 check
    server u3 10.0.0.53:7000 check

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 175 – Implementing API caching at the gateway level (NGINX FastCGI cache, Varnish)
# -----------------------------------------------------------------------------
# THEORY:
# • Gateway-level caching reduces backend load and speeds up responses.
# • NGINX FastCGI/Proxy cache writes dynamic responses to disk and serves stale on errors.
# • Varnish is an HTTP accelerator: sits in front, caches per VCL rules, adds X-Cache headers.
# -----------------------------------------------------------------------------

http {
  # 1. Define a cache zone on disk
  proxy_cache_path /var/cache/nginx/api_cache levels=1:2 keys_zone=api_cache:50m
                   max_size=2g inactive=30m use_temp_path=off;

  upstream backend_api {
    server api1.example.com:8080;
    server api2.example.com:8080;
  }

  server {
    listen 80;
    server_name api.example.com;

    location /api/ {
      # Enable and configure proxy cache
      proxy_cache api_cache;
      proxy_cache_valid 200 302 10m;
      proxy_cache_valid 404      1m;
      proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;

      # Cache key: method + host + URI
      proxy_cache_key "$scheme$request_method$host$request_uri";

      # Forward to backend
      proxy_pass http://backend_api;
      proxy_set_header Host             $host;
      proxy_set_header X-Real-IP        $remote_addr;
      proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;

      # Add header to indicate cache status
      add_header X-Cache-Status $upstream_cache_status;
    }
  }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 176 – Rate limiting and IP blocking at the NGINX layer
# -----------------------------------------------------------------------------
# THEORY:
# • limit_req_zone defines a rate limit per client IP (requests per second).
# • limit_conn_zone caps concurrent connections per IP.
# • deny/allow directives block or permit specific IPs or subnets.
# -----------------------------------------------------------------------------
http {
  # Define shared zones
  limit_req_zone $binary_remote_addr zone=rl:10m rate=5r/s;   # 5 requests/sec per IP
  limit_conn_zone $binary_remote_addr zone=cc:1m;             # track per-IP connections

  server {
    listen 80;
    server_name example.com;

    # Blocklists
    deny 203.0.113.0/24;
    deny 198.51.100.42;
    allow all;

    # Apply rate limiting: allow bursts of 10, no delay
    limit_req zone=rl burst=10 nodelay;

    # Apply connection limiting: max 20 concurrent connections per IP
    limit_conn cc 20;

    location / {
      proxy_pass http://backend;
      proxy_set_header Host            $host;
      proxy_set_header X-Real-IP       $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}



# 176 – Rate limiting and IP blocking at the HAProxy layer
# -----------------------------------------------------------------------------
# THEORY:
# • stick-table tracks per-IP metrics (request rate, concurrent connections).
# • tcp-request connection uses ACLs to reject based on rate or blocklist.
# -----------------------------------------------------------------------------
global
    maxconn 20000

defaults
    mode http
    timeout connect 5s
    timeout client  50s
    timeout server  50s

frontend http_front
    bind *:80

    # Track request rate per IP over a 10s window
    stick-table type ip size 200k expire 10m store http_req_rate(10s)

    # ACLs
    acl too_fast sc_http_req_rate(0) gt 100          # >100 reqs/10s
    acl bad_ip src 203.0.113.0/24 198.51.100.42      # blocklisted IPs

    # Reject if rate limit exceeded or IP blocked
    tcp-request connection reject if too_fast or bad_ip

    default_backend web_backend

backend web_backend
    balance roundrobin
    server web1 10.0.0.1:3000 check
    server web2 10.0.0.2:3000 check

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


# 177 – JWT verification at the gateway level: using lua-nginx-module or nginx-auth-request
# -----------------------------------------------------------------------------
# THEORY:
# • Verify JSON Web Tokens (JWTs) at the proxy layer to offload auth from your services.
# • lua-nginx-module lets you run Lua code (e.g. lua-resty-jwt) to validate tokens inline.
# • auth_request delegates verification to a subrequest endpoint (which can be another lightweight service or internal location).
# -----------------------------------------------------------------------------

#############################
# A) Using lua-nginx-module
#############################

http {
  lua_shared_dict jwks_cache 10m;  # cache public keys

  server {
    listen 443 ssl;
    server_name api.example.com;

    # Load Lua JWT library
    lua_package_path "/usr/local/lib/lua/?.lua;;";

    # Function to validate JWT in Lua
    init_by_lua_block {
      local jwt = require "resty.jwt"
      local cjson = require "cjson"
      _G.verify_jwt = function(token)
        local validators = require "resty.jwt-validators"
        local jwt_obj = jwt:verify_jwt_obj({
          token = token,
          require_header = {"exp", "iss"},
          validators = {
            exp = validators.is_not_expired(),
            iss = validators.equals("https://auth.example.com")
          },
          secret = "your-256-bit-secret"  -- or load public key
        })
        return jwt_obj.verified
      end
    }

    location / {
      access_by_lua_block {
        local auth_header = ngx.req.get_headers()["Authorization"]
        if not auth_header then
          return ngx.exit(ngx.HTTP_UNAUTHORIZED)
        end
        local _, _, token = string.find(auth_header, "Bearer%s+(.+)")
        if not token or not verify_jwt(token) then
          return ngx.exit(ngx.HTTP_UNAUTHORIZED)
        end
      }

      proxy_pass http://backend_api;
      proxy_set_header Host            $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}

####################################
# B) Using nginx auth_request module
####################################

http {
  upstream auth_service {
    server 127.0.0.1:9000;  # a microservice that validates JWT and returns 200/401
  }

  server {
    listen 80;
    server_name api.example.com;

    # 1. Define auth check subrequest
    location = /_jwt_auth {
      internal;
      proxy_pass       http://auth_service/validate;
      proxy_pass_request_body off;
      proxy_set_header Authorization $http_authorization;
      proxy_set_header Content-Length "";
      proxy_set_header X-Original-URI $request_uri;
    }

    # 2. Protect API endpoints
    location /api/ {
      auth_request /_jwt_auth;
      auth_request_set $auth_status $upstream_status;

      # Optional: reject if auth request returned non-200
      error_page 401 = @error401;
      if ($auth_status != 200) {
        return 401;
      }

      proxy_pass http://backend_api;
      proxy_set_header Host            $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location @error401 {
      add_header Content-Type application/json;
      return 401 '{"error":"Unauthorized"}';
    }
  }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// 178 - Using EJS: embedding JavaScript in HTML, partials, layouts


// 178 – Using EJS: embedding JavaScript in HTML, partials, layouts
// -----------------------------------------------------------------------------
// THEORY: EJS allows embedding JavaScript in HTML templates, supports partials for reusable snippets,
//         and layouts to define common wrappers.
// -----------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// 1. Set up view engine and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // views/layouts/main.ejs

// 2. Routes with dynamic data
app.get('/', (req, res) => {
  const user = { name: 'Alice', role: 'admin' };
  const items = ['Item A', 'Item B', 'Item C'];
  res.render('index', { title: 'Home', user, items });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// 3. Start server
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});


// server.js
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.get('/', (req, res) => {
  const user = { name: 'Alice', role: 'admin' };
  const items = ['Item A', 'Item B', 'Item C'];
  res.render('index', { title: 'Home', user, items });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

/* views/layouts/main.ejs */
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title><%= title %> – MyApp</title>
</head>
<body>
  <%- include('../partials/header') %>
  <main>
    <%- body %>
  </main>
  <%- include('../partials/footer') %>
</body>
</html>

/* views/partials/header.ejs */
<header>
  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a>
  </nav>
</header>

/* views/partials/footer.ejs */
<footer>
  <p>&copy; 2025 MyApp</p>
</footer>

/* views/index.ejs */
<h1>Welcome, <%= user.name %>!</h1>
<% if (user.role === 'admin') { %>
  <p><strong>Admin Dashboard</strong></p>
<% } else { %>
  <p>User Dashboard</p>
<% } %>
<ul>
  <% items.forEach(item => { %>
    <li><%= item %></li>
  <% }) %>
</ul>

/* views/about.ejs */
<h1>About Us</h1>
<p>This is the about page for MyApp.</p>

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 179 – Using Pug (formerly Jade): indentation-based syntax, mixins, template inheritance
// -----------------------------------------------------------------------------
// THEORY:
// • Pug uses indentation to define nesting instead of closing tags.
// • Mixins are reusable blocks you can call with parameters.
// • Template inheritance lets you define a base layout and override blocks in child templates.
// -----------------------------------------------------------------------------

// server.js
const express = require('express');
const path    = require('path');
const app     = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    user:  { name: 'Alice', role: 'admin' },
    items: ['Item A', 'Item B', 'Item C']
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});


/* views/layout.pug */
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    title #{title} – MyApp
  body
    block header
      header
        nav
          a(href="/") Home
          |  | 
          a(href="/about") About
    block content
    block footer
      footer
        p © 2025 MyApp


/* views/mixins.pug */
mixin list(items)
  ul
    each val in items
      li= val


/* views/index.pug */
extends layout

include mixins

block content
  h1 Welcome, #{user.name}!
  if user.role === 'admin'
    p: strong Admin Dashboard
  else
    p User Dashboard
  +list(items)


/* views/about.pug */
extends layout

block content
  h1 About Us
  p This is the about page for MyApp.

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 180 – Handlebars: helpers, partials, block helpers
// -----------------------------------------------------------------------------
// server.js
const express   = require('express');
const exphbs    = require('express-handlebars');
const path      = require('path');
const app       = express();

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    // Simple helper
    uppercase: (str) => str.toUpperCase(),
    // Block helper: generate a list
    list: (items, options) => {
      let out = '<ul>';
      items.forEach(item => {
        out += `<li>${options.fn(item)}</li>`;
      });
      return out + '</ul>';
    },
    // Conditional block helper
    ifEquals: (a, b, options) =>
      a === b ? options.fn(this) : options.inverse(this)
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    user: { name: 'Alice', role: 'admin' },
    items: ['Alpha', 'Beta', 'Gamma']
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});



/* views/layouts/main.hbs */
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title}} – MyApp</title>
</head>
<body>
  {{> header}}
  {{{body}}}
  {{> footer}}
</body>
</html>



/* views/partials/header.hbs */
<header>
  <nav>
    <a href="/">Home</a> |
    <a href="/about">About</a>
  </nav>
</header>



/* views/partials/footer.hbs */
<footer>
  <p>© 2025 MyApp</p>
</footer>



/* views/index.hbs */
<h1>Welcome, {{uppercase user.name}}!</h1>

{{#ifEquals user.role 'admin'}}
  <p><strong>Admin Dashboard</strong></p>
{{else}}
  <p>User Dashboard</p>
{{/ifEquals}}

{{#list items}}
  {{this}}
{{/list}}



/* views/about.hbs */
<h1>About Us</h1>
<p>This is the about page for MyApp.</p>

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 181 – Integrating React (Next.js) SSR with serverless functions and Vue (Nuxt.js) SSR with server middleware
// -----------------------------------------------------------------------------
//
// A) Next.js: React SSR + serverless API routes
// -----------------------------------------------------------------------------

// next.config.js
module.exports = {
  target: 'serverless',           // output each page as an AWS-Lambda-style function
  reactStrictMode: true,
};

// pages/index.js
import React from 'react';

export default function Home({ posts }) {
  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}

// Fetch data at request time on the server
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();
  return { props: { posts } };
}

// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js serverless function!' });
}

// package.json (scripts)
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}


// B) Nuxt.js: Vue SSR + Express-style server middleware
// -----------------------------------------------------------------------------

// nuxt.config.js
export default {
  ssr: true,                      // enable server-side rendering
  target: 'server',               // use a Node.js server
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' }
  ],
  build: {
    // any custom webpack config
  }
};

// api/index.js
const express = require('express');
const app = express();

app.get('/time', (req, res) => {
  res.json({ now: new Date().toISOString() });
});

module.exports = app;

// pages/index.vue
<template>
  <div>
    <h1>Current Time</h1>
    <p>{{ time }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { now } = await $axios.$get('/api/time');
    return { time: now };
  }
}
</script>

// package.json (scripts)
{
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////////////////////// 182 – Caching rendered pages: in-memory, Redis, or CDNs
// -----------------------------------------------------------------------------
// THEORY:
// • In-memory cache (e.g., LRU) stores rendered HTML in your app’s RAM for ultra-fast retrieval.
// • Redis cache stores rendered HTML centrally, shared across app instances, with TTL support.
// • CDN cache (via Cache-Control / Surrogate-Control headers) offloads traffic to the edge for global speed.
// -----------------------------------------------------------------------------

const express = require('express');
const LRU     = require('lru-cache');
const { createClient } = require('redis');

const app = express();
app.set('view engine', 'ejs');

// --- 1. In-memory cache (LRU) ---
const memoryCache = new LRU({
  max: 500,              // max 500 items
  ttl: 1000 * 60 * 5     // 5 minutes in ms
});

app.get('/in-memory/:page', (req, res) => {
  const key = req.originalUrl;
  const cached = memoryCache.get(key);
  if (cached) {
    return res.send(cached);
  }
  // Render your page (e.g., EJS)
  res.render(req.params.page, {}, (err, html) => {
    if (err) return res.status(500).send(err.message);
    memoryCache.set(key, html);
    res.send(html);
  });
});

// --- 2. Redis cache (shared across instances) ---
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

app.get('/redis/:page', async (req, res) => {
  const key = `page:${req.originalUrl}`;
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      return res.send(cached);
    }
    res.render(req.params.page, {}, async (err, html) => {
      if (err) return res.status(500).send(err.message);
      // Cache for 10 minutes
      await redisClient.setEx(key, 60 * 10, html);
      res.send(html);
    });
  } catch (e) {
    // Fallback to rendering on Redis error
    res.render(req.params.page, {}, (err, html) => {
      if (err) return res.status(500).send(err.message);
      res.send(html);
    });
  }
});

// --- 3. CDN-friendly cache headers ---
app.get('/cdn/:page', (req, res) => {
  // Browser cache: 5 minutes; CDN edge cache: 1 hour
  res.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
  res.render(req.params.page, {}, (err, html) => {
    if (err) return res.status(500).send(err.message);
    res.send(html);
  });
});

// Start server
app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});
//////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 183 – Hybrid rendering: generating static portions (SSR) and hydrating on client
// -----------------------------------------------------------------------------
// THEORY:
// • Generate initial HTML on the server for fast first paint and SEO (Server-Side Rendering).
// • Send the same React app code to the browser, then “hydrate” it to attach event handlers and make it interactive.
// • Combines “static” markup with full client-side React behavior.
// -----------------------------------------------------------------------------

// --- server.js ---
const express = require('express');
const path    = require('path');
const React   = require('react');
const { renderToString } = require('react-dom/server');
const App     = require('./src/App').default;

const app = express();

// Serve the client bundle
app.use('/static', express.static(path.resolve(__dirname, 'dist')));

app.get('/', (req, res) => {
  // 1. Render React to HTML string
  const appHtml = renderToString(React.createElement(App));

  // 2. Send full HTML page with embedded markup and client script
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Hybrid SSR + Hydration</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/static/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('✅ Server listening on http://localhost:3000');
});


// --- src/App.jsx ---
import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>🎉 Hybrid Rendering Demo</h1>
      <button onClick={() => setCount(c => c + 1)}>
        You clicked {count} times
      </button>
    </div>
  );
}


// --- client.js ---
import React from 'react';
import { hydrate } from 'react-dom';
import App from './src/App';

// Hydrate on the client: attach React behaviors to server-rendered HTML
hydrate(<App />, document.getElementById('root'));

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////