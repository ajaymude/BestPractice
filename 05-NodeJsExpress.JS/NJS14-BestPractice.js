
// 🔧 BEST PRACTICES & DESIGN PATTERNS
// 221 - Logging and error-handling patterns: centralized logging service, correlation IDs
// 222 - Configuration management: 12-factor app approach, using dotenv, convict, or config packages
// 223 - Dependency injection patterns in Node.js: using Awilix or InversifyJS
// 224 - Repository and service layer patterns for clean separation of concerns
// 225 - Factory pattern for creating instances (database connections, clients, services)
// 226 - Adapter pattern: abstracting third-party services (payment gateways, email providers)
// 227 - Builder pattern: constructing complex request/response objects
// 228 - Middleware pattern: chaining functions to process requests, similar to Express

// 🌐 WEB SECURITY & STANDARDS
// 229 - OWASP Top Ten for Node.js applications: injection, broken authentication, sensitive data exposure
// 230 - Implementing CSP (Content Security Policy) headers using helmet.contentSecurityPolicy
// 231 - Sanitizing HTML input: using DOMPurify or sanitize-html to avoid XSS
// 232 - Implementing CORS correctly: configuring allowed origins, methods, headers
// 233 - Secure rate limiting and IP blacklisting patterns
// 234 - Data encryption at rest and in transit: using TLS for databases, encrypting sensitive fields

// 📦 ADVANCED INTEGRATIONS & TOOLING
// 235 - Using TypeScript with Node.js: setting up tsconfig.json, tsc compilation, ts-node for development
// 236 - Babel for transpiling modern JavaScript features in Node.js (if targeting older Node versions)
// 237 - Linting and formatting: ESLint with Airbnb or Standard style, Prettier integration
// 238 - GraphQL subscriptions: integrating apollo-server or graphql-ws for real-time data
// 239 - Full-text search with Elasticsearch: indexing, querying, relevance scoring via elasticsearch-js
// 240 - Integrating third-party APIs: Stripe for payments, Twilio for SMS/voice, SendGrid for emails

// 🚀 SERVERLESS & FUNCTIONS-AS-A-SERVICE
// 241 - AWS Lambda basics: handler functions, deployment packages, environment variables
// 242 - Using Serverless Framework to define functions, resources, and deploy to AWS, Azure, or Google Cloud
// 243 - API Gateway integration with Lambda: mapping templates, authorizers, CORS configuration
// 244 - Azure Functions and Node.js: triggers, bindings, local development with Azure Functions Core Tools
// 245 - Google Cloud Functions: deployment, testing, integration with Firebase
// 246 - Cost optimization: cold starts, function memory/timeout configuration, provisioned concurrency

// 📖 DOCUMENTATION & COMMUNITY RESOURCES
// 247 - Writing comprehensive README: project overview, setup instructions, usage examples
// 248 - API documentation with tools like apidoc, swagger-jsdoc, or TypeDoc (for TypeScript)
// 249 - Documenting code with JSDoc: annotations for functions, classes, modules
// 250 - Contributing to open-source Node.js projects: forking, pull requests, issue triage
// 251 - Following Node.js release schedule and LTS (Long-Term Support) policy
// 252 - Keeping up-to-date: Node.js GitHub repo, official blog, Node.js Foundation announcements



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 221 - Logging and error-handling patterns: centralized logging service, correlation IDs

// Import necessary modules
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');
const expressWinston = require('express-winston');

// Create an Express app
const app = express();

// Correlation ID middleware
app.use((req, res, next) => {
  // Generate or extract a unique correlation ID for tracing
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.correlationId = correlationId;
  // Include the correlation ID in response headers for client tracing
  res.setHeader('X-Correlation-ID', correlationId);
  next();
});

// Configure Winston logger with structured logging and transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(), // enables JSON output for centralized services
  defaultMeta: { service: 'user-service' },
  transports: [
    // Console transport for local debugging
    new winston.transports.Console(),
    // File transport for persisting error logs
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    // Example: HTTP transport to send logs to a centralized logging service
    // new winston.transports.Http({ host: 'logs.mycompany.com', port: 443, path: '/ingest' })
  ],
});

// Automatic request logging with express-winston
app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: "HTTP {{req.method}} {{req.url}}",
  meta: true,
  dynamicMeta: (req, res) => ({
    correlationId: req.correlationId,
    userId: req.user?.id || null,
  }),
}));

// Sample route demonstrating error throwing and correlation ID usage
app.get('/tasks', (req, res, next) => {
  try {
    // Imagine this function may throw an error
    const tasks = getTasksForUser(req.user.id);
    res.json({ correlationId: req.correlationId, data: tasks });
  } catch (error) {
    // Forward errors to the centralized error handler
    next(error);
  }
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  // Log the error with correlation ID and stack trace
  logger.error('Unhandled exception', {
    correlationId: req.correlationId,
    message: err.message,
    stack: err.stack,
  });
  // Respond with a safe error message including the correlation ID
  res.status(500).json({
    correlationId: req.correlationId,
    error: 'An unexpected error occurred. Please contact support with the correlation ID.',
  });
});

// Start the server
app.listen(3000, () => {
  logger.info('Server listening on port 3000');
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 222 - Configuration management: 12-factor app approach, using dotenv, convict, or config packages

// 1) Load environment variables per 12‑factor config
require('dotenv').config(); // Reads .env file into process.env

// 2) Define schema and validation with convict
const convict = require('convict');

const config = convict({
  env: {
    doc: 'Application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'Port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  db: {
    host: {
      doc: 'Database host name or IP',
      format: String,
      default: 'localhost',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    }
  }
});

// Validate against schema; throws if invalid
config.validate({ allowed: 'strict' });

// Export for use in app
module.exports = config;

// 3) Alternatively, using 'config' package with JSON/YAML files
/*
Directory structure:

config/
  default.json
  production.json
  development.json

Example default.json:
{
  "port": 3000,
  "db": {
    "host": "localhost",
    "port": 5432
  }
}
*/

const configPkg = require('config');
const appPort = configPkg.get('port');
const dbHost = configPkg.get('db.host');

// Use in Express app
const express = require('express');
const app = express();

app.listen(appPort, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${appPort}`);
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 222 - Configuration management: 12-factor app approach, using dotenv, convict, or config packages

// 1) Load environment variables per 12‑factor config
require('dotenv').config(); // Reads .env file into process.env

// 2) Define schema and validation with convict
const convict = require('convict');

const config = convict({
  env: {
    doc: 'Application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'Port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  db: {
    host: {
      doc: 'Database host name or IP',
      format: String,
      default: 'localhost',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    }
  }
});

// Validate against schema; throws if invalid
config.validate({ allowed: 'strict' });

// Export for use in app
module.exports = config;

// 3) Alternatively, using 'config' package with JSON/YAML files
/*
Directory structure:

config/
  default.json
  production.json
  development.json

Example default.json:
{
  "port": 3000,
  "db": {
    "host": "localhost",
    "port": 5432
  }
}
*/

const configPkg = require('config');
const appPort = configPkg.get('port');
const dbHost = configPkg.get('db.host');

// Use in Express app
const express = require('express');
const app = express();

app.listen(appPort, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${appPort}`);
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 223 - Dependency injection patterns in Node.js: using Awilix or InversifyJS

// --- Example 1: Using Awilix ---
// Install: npm install awilix
const { createContainer, asClass, asValue, Lifetime } = require('awilix');

// Service classes
class UserService {
  constructor({ userRepository, logger }) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  getUser(id) {
    this.logger.info(`Fetching user ${id}`);
    return this.userRepository.findById(id);
  }
}

class UserRepository {
  constructor({ db }) {
    this.db = db;
  }

  findById(id) {
    return this.db.query('SELECT * FROM users WHERE id = ?', id);
  }
}

// Simple logger and database objects
const logger = console;
const db = { query: (sql, params) => { /* Database query implementation */ } };

// Create and configure container
const container = createContainer();
container.register({
  userService: asClass(UserService).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  logger: asValue(logger),
  db: asValue(db)
});

// Resolving and using the service
const userService = container.resolve('userService');
userService.getUser(42);


// --- Example 2: Using InversifyJS ---
// Install: npm install inversify reflect-metadata
require('reflect-metadata');
const { Container, injectable, inject } = require('inversify');

// Define identifiers for DI types
const TYPES = {
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository')
};

@injectable()
class UserRepository2 {
  findById(id) {
    // Simulate database call
    return { id, name: 'Alice' };
  }
}

@injectable()
class UserService2 {
  constructor(
    @inject(TYPES.UserRepository) userRepository
  ) {
    this.userRepository = userRepository;
  }

  getUser(id) {
    return this.userRepository.findById(id);
  }
}

// Configure container
const container2 = new Container();
container2.bind(TYPES.UserRepository).to(UserRepository2).inSingletonScope();
container2.bind(TYPES.UserService).to(UserService2);

// Resolving and using the service
const userService2 = container2.get(TYPES.UserService);
console.log(userService2.getUser(123));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 224 - Repository and service layer patterns for clean separation of concerns

// --- Example Directory Structure ---
// src/
//   db/           # Database connection setup
//     index.js
//   repositories/ # Data access layer
//     UserRepository.js
//   services/     # Business logic layer
//     UserService.js
//   controllers/  # HTTP handlers
//     UserController.js
//   app.js        # Application entry point

// src/db/index.js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
module.exports = pool;

// src/repositories/UserRepository.js
class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const [rows] = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async create(user) {
    const { username, email } = user;
    const [result] = await this.db.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    return { id: result.insertId, username, email };
  }
}
module.exports = UserRepository;

// src/services/UserService.js
class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async registerUser(userData) {
    // Business rules, validation, etc.
    if (!userData.email.includes('@')) {
      throw new Error('Invalid email');
    }
    return this.userRepository.create(userData);
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Additional business logic can go here
    return user;
  }
}
module.exports = UserService;

// src/controllers/UserController.js
const express = require('express');
const router = express.Router();

module.exports = ({ userService }) => {
  router.post('/users', async (req, res, next) => {
    try {
      const newUser = await userService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  });

  router.get('/users/:id', async (req, res, next) => {
    try {
      const user = await userService.getUserProfile(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

// src/app.js
const express = require('express');
const UserRepository = require('./repositories/UserRepository');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserController');
const db = require('./db');

const app = express();
app.use(express.json());

// Manual wiring of layers
const userRepository = new UserRepository(db);
const userService = new UserService({ userRepository });
app.use('/api', UserController({ userService }));

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => console.log('Server started'));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 225 - Factory pattern for creating instances (database connections, clients, services)

// --- Database Connection Factory ---
// Creates and caches DB connections based on config
const mysql = require('mysql2/promise');
const { Pool: PgPool } = require('pg');

class DbFactory {
  constructor() {
    this.instances = {};
  }

  create(config) {
    const key = `${config.client}_${config.host}_${config.database}`;
    if (!this.instances[key]) {
      if (config.client === 'mysql') {
        this.instances[key] = mysql.createPool({
          host: config.host,
          user: config.user,
          password: config.password,
          database: config.database,
        });
      } else if (config.client === 'postgres') {
        this.instances[key] = new PgPool({
          host: config.host,
          user: config.user,
          password: config.password,
          database: config.database,
          port: config.port,
        });
      } else {
        throw new Error(`Unsupported client: ${config.client}`);
      }
    }
    return this.instances[key];
  }
}

// Usage:
const dbFactory = new DbFactory();
const mysqlPool = dbFactory.create({
  client: 'mysql', host: 'localhost', user: 'root', password: 'pass', database: 'app_db'
});
const pgPool = dbFactory.create({
  client: 'postgres', host: 'localhost', user: 'pguser', password: 'pass', database: 'app_db', port: 5432
});


// --- HTTP Client Factory ---
// Wraps axios for different services
const axios = require('axios');
class HttpClientFactory {
  constructor() {
    this.clients = {};
  }

  create(name, baseURL, defaultHeaders = {}) {
    if (!this.clients[name]) {
      this.clients[name] = axios.create({ baseURL, headers: defaultHeaders });
    }
    return this.clients[name];
  }
}

// Usage:
const httpFactory = new HttpClientFactory();
const userApi = httpFactory.create('userApi', 'https://api.example.com/users', { 'X-App': 'MyApp' });
async function fetchUser(id) {
  const resp = await userApi.get(`/${id}`);
  return resp.data;
}


// --- Service Factory ---
// Dynamically creates service instances with dependencies
class ServiceFactory {
  constructor({ dbFactory, httpFactory }) {
    this.dbFactory = dbFactory;
    this.httpFactory = httpFactory;
    this.services = {};
  }

  createService(name, config) {
    if (!this.services[name]) {
      switch (name) {
        case 'UserService': {
          const dbConn = this.dbFactory.create(config.db);
          const client = this.httpFactory.create('userApi', config.apiBase);
          this.services[name] = new UserService(dbConn, client);
          break;
        }
        // add more services here
        default:
          throw new Error(`Unknown service: ${name}`);
      }
    }
    return this.services[name];
  }
}

// Example UserService implementation
typedef UserService;
class UserService {
  constructor(dbPool, apiClient) {
    this.db = dbPool;
    this.api = apiClient;
  }

  async getLocalUsers() {
    const [rows] = await this.db.query('SELECT * FROM users');
    return rows;
  }

  async getRemoteUser(id) {
    const { data } = await this.api.get(`/${id}`);
    return data;
  }
}

// Usage:
const serviceFactory = new ServiceFactory({ dbFactory, httpFactory });
const userService = serviceFactory.createService('UserService', {
  db: { client: 'mysql', host: 'localhost', user: 'root', password: 'pass', database: 'app_db' },
  apiBase: 'https://api.example.com/users'
});

module.exports = { DbFactory, HttpClientFactory, ServiceFactory };

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 226 - Adapter pattern: abstracting third-party services (payment gateways, email providers)

// Define target interfaces
class IPaymentGateway {
  charge(amount, currency, source) {
    throw new Error('Method not implemented.');
  }
}

class IEmailProvider {
  send(to, subject, body) {
    throw new Error('Method not implemented.');
  }
}

// --- Payment Gateway Adapters ---

// Stripe Adapter
class StripeAdapter extends IPaymentGateway {
  constructor(stripeClient) {
    super();
    this.stripe = stripeClient;
  }

  async charge(amount, currency, source) {
    return this.stripe.charges.create({ amount, currency, source });
  }
}

// PayPal Adapter
class PayPalAdapter extends IPaymentGateway {
  constructor(paypalClient) {
    super();
    this.paypal = paypalClient;
  }

  async charge(amount, currency, source) {
    return this.paypal.payment.create({
      transactions: [{ amount: { total: amount, currency } }],
      payer: { payment_method: 'paypal', funding_instruments: [{ credit_card_token: { payer_id: source } }] },
    });
  }
}

// --- Email Provider Adapters ---

// SendGrid Adapter
class SendGridAdapter extends IEmailProvider {
  constructor(sendGridClient) {
    super();
    this.sg = sendGridClient;
  }

  async send(to, subject, body) {
    return this.sg.send({ to, subject, html: body });
  }
}

// SMTP Adapter (Nodemailer)
class SMTPAdapter extends IEmailProvider {
  constructor(transporter) {
    super();
    this.transporter = transporter;
  }

  async send(to, subject, body) {
    return this.transporter.sendMail({ to, subject, html: body });
  }
}

// --- Usage Example ---

// Configure third-party clients
const Stripe = require('stripe');
const stripeClient = new Stripe(process.env.STRIPE_KEY);

const PayPal = require('paypal-rest-sdk');
PayPal.configure({ mode: 'live', client_id: process.env.PAYPAL_ID, client_secret: process.env.PAYPAL_SECRET });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const nodemailer = require('nodemailer');
const smtpTransporter = nodemailer.createTransport({ host: 'smtp.example.com', port: 587, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });

// Select adapters based on config
const paymentAdapter = process.env.PGATEWAY === 'stripe'
  ? new StripeAdapter(stripeClient)
  : new PayPalAdapter(PayPal);

const emailProvider = process.env.EMAIL_PROVIDER === 'sendgrid'
  ? new SendGridAdapter(sgMail)
  : new SMTPAdapter(smtpTransporter);

// Export adapters
module.exports = {
  StripeAdapter,
  PayPalAdapter,
  SendGridAdapter,
  SMTPAdapter
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 227 - Builder pattern: constructing complex request/response objects

// RequestBuilder: builds HTTP-like request objects
class RequestBuilder {
  constructor() {
    this.request = { headers: {}, query: {}, body: {} };
  }

  setHeader(key, value) {
    this.request.headers[key] = value;
    return this;
  }

  setQueryParam(key, value) {
    this.request.query[key] = value;
    return this;
  }

  setBodyProperty(key, value) {
    this.request.body[key] = value;
    return this;
  }

  build() {
    return this.request;
  }
}

// ResponseBuilder: builds HTTP-like response objects
class ResponseBuilder {
  constructor() {
    this.response = { statusCode: 200, headers: {}, body: null };
  }

  setStatus(code) {
    this.response.statusCode = code;
    return this;
  }

  setHeader(key, value) {
    this.response.headers[key] = value;
    return this;
  }

  setBody(content) {
    this.response.body = content;
    return this;
  }

  build() {
    return this.response;
  }
}

// Usage Examples:
const req = new RequestBuilder()
  .setHeader('Authorization', 'Bearer token')
  .setQueryParam('search', 'term')
  .setBodyProperty('data', { id: 1 })
  .build();

const res = new ResponseBuilder()
  .setStatus(201)
  .setHeader('Content-Type', 'application/json')
  .setBody({ success: true })
  .build();

module.exports = { RequestBuilder, ResponseBuilder };


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 228 - Middleware pattern: chaining functions to process requests, similar to Express

// compose takes an array of middleware functions and returns a single handler
function compose(middleware) {
  return (req, res) => {
    let index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      const fn = middleware[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(req, res, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

// Example middleware functions
async function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  await next();
}

async function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    res.statusCode = 401;
    res.body = 'Unauthorized';
  } else {
    await next();
  }
}

function finalHandler(req, res) {
  res.statusCode = 200;
  res.body = 'Success';
}

// Compose and run
const handler = compose([logger, authenticate, finalHandler]);

// Usage simulation
test();
async function test() {
  const req = { method: 'GET', url: '/api', headers: {} };
  const res = {};
  await handler(req, res);
  console.log(res.statusCode, res.body);
}

module.exports.compose = compose;

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 229 - OWASP Top Ten for Node.js applications: injection, broken authentication, sensitive data exposure

// Security utilities based on OWASP Top Ten
const security = {
  // 1. Injection: validate and sanitize all inputs
  validateInput: (input) => {
    // e.g., use parameterized queries or ORM
    // throw error on invalid patterns
  },

  // 2. Broken Authentication: enforce strong authentication
  authenticate: async (credentials) => {
    // e.g., verify JWT/OAuth tokens, hash and compare passwords
  },

  // 3. Sensitive Data Exposure: encrypt data
  encryptData: (plaintext) => {
    // e.g., use AES-256-GCM for data at rest
  },
  decryptData: (ciphertext) => {
    // corresponding decryption
  },

  // 4. XML External Entities (XXE): disable XML parsing or sanitize
  preventXXE: (xml) => {
    // configure parser to disable external entities
  },

  // 5. Broken Access Control: check permissions
  authorize: (user, resource) => {
    // e.g., role-based checks
  },

  // 6. Security Misconfiguration: enforce HTTPS, secure headers
  setSecurityHeaders: (res) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
  },

  // 7. Cross-Site Scripting (XSS): sanitize output
  sanitizeOutput: (data) => {
    // e.g., escape HTML entities
  },

  // 8. Insecure Deserialization: avoid eval, use safe parsers
  safeDeserialize: (serialized) => {
    // e.g., JSON.parse with schema validation
  },

  // 9. Using Components with Known Vulnerabilities: scan dependencies
  scanDependencies: () => {
    // e.g., run npm audit programmatically
  },

  // 10. Insufficient Logging & Monitoring: log safely
  errorHandling: (err, req) => {
    // log error without leaking sensitive info, include correlation ID
    console.error(err);
  }
};

module.exports.security = security;


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 230 - Implementing CSP (Content Security Policy) headers using helmet.contentSecurityPolicy

const helmet = require('helmet');
const cspDirectives = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'cdnjs.cloudflare.com'],
    styleSrc: ["'self'", 'fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
    connectSrc: ["'self'", 'api.example.com'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: []
  }
};
function cspMiddleware() {
  return helmet.contentSecurityPolicy(cspDirectives);
}
module.exports.cspMiddleware = cspMiddleware;

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 231 - Sanitizing HTML input: using DOMPurify or sanitize-html to avoid XSS

// Example using DOMPurify in Node.js (with jsdom)
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizeHtml(input) {
  return DOMPurify.sanitize(input);
}

// Usage example:
// const dirty = '<img src=x onerror=alert(1)//>';
// const clean = sanitizeHtml(dirty);
// clean will be '<img src="x"/>'

// Example using sanitize-html package
const sanitizeHtmlPkg = require('sanitize-html');

function sanitizeHtmlWithPackage(input) {
  return sanitizeHtmlPkg(input, {
    allowedTags: sanitizeHtmlPkg.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtmlPkg.defaults.allowedAttributes,
      img: ['src', 'alt']
    }
  });
}

// Usage example:
// const dirty2 = '<script>alert("xss")</script><img src="x.png" onerror="alert(2)">';
// const clean2 = sanitizeHtmlWithPackage(dirty2);
// clean2 will be '<img src="x.png"/>'

module.exports.sanitizeHtml = sanitizeHtml;
module.exports.sanitizeHtmlWithPackage = sanitizeHtmlWithPackage;


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 232 - Implementing CORS correctly: configuring allowed origins, methods, headers

const cors = require('cors');
const corsOptions = {
  origin: ['https://example.com', 'https://api.example.com'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204
};

function corsMiddleware() {
  return cors(corsOptions);
}
module.exports.corsMiddleware = corsMiddleware;


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 233 - Secure rate limiting and IP blacklisting patterns
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

// Redis client for storing rate limit data
typeof process !== 'undefined' && process.env.REDIS_URL && console.log('Using Redis at', process.env.REDIS_URL);
const redisClient = new Redis(process.env.REDIS_URL);

// Rate limiter configuration
const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args)
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip,
  skipFailedRequests: true,
});

// IP blacklist middleware (populate from dynamic source in production)
const blacklist = new Set([process.env.BLACKLISTED_IPS?.split(',')].flat().filter(Boolean));

function blacklistMiddleware(req, res, next) {
  if (blacklist.has(req.ip)) {
    return res.status(403).json({ error: 'Your IP is blacklisted.' });
  }
  next();
}

function rateLimitingMiddleware() {
  return limiter;
}

module.exports.rateLimitingMiddleware = rateLimitingMiddleware;
module.exports.blacklistMiddleware = blacklistMiddleware;

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 234 - Data encryption at rest and in transit: using TLS for databases, encrypting sensitive fields
const fs = require('fs');
const crypto = require('crypto');
const mysql = require('mysql2/promise');
const { Pool: PgPool } = require('pg');

// Secure PostgreSQL pool with TLS
function createSecurePgPool(config) {
  return new PgPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(config.ssl.ca),
      key: fs.readFileSync(config.ssl.key),
      cert: fs.readFileSync(config.ssl.cert)
    }
  });
}

// Secure MySQL pool with TLS
function createSecureMysqlPool(config) {
  return mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: {
      ca: fs.readFileSync(config.ssl.ca),
      key: fs.readFileSync(config.ssl.key),
      cert: fs.readFileSync(config.ssl.cert)
    }
  });
}

// Helpers for encrypting sensitive fields using AES-256-GCM
const algorithm = 'aes-256-gcm';
function encryptField(plaintext, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${encrypted}:${tag}`;
}

function decryptField(encryptedField, key) {
  const [ivHex, encrypted, tagHex] = encryptedField.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports.createSecurePgPool = createSecurePgPool;
module.exports.createSecureMysqlPool = createSecureMysqlPool;
module.exports.encryptField = encryptField;
module.exports.decryptField = decryptField;


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 235 - Using TypeScript with Node.js: setting up tsconfig.json, tsc compilation, ts-node for development

// 1) Initialize package.json
// Run this to create a basic package.json:
// npm init -y

// 2) Install TypeScript and types for Node.js
// npm install --save-dev typescript ts-node @types/node

// 3) tsconfig.json configuration (theory and comments):
// - target: ES2020 for modern JS features
// - module: commonjs for Node.js compatibility
// - outDir: compiled JS output directory
// - rootDir: TS source directory
// - strict: enable all strict type checks
// - esModuleInterop: allow import of CommonJS modules
// - forceConsistentCasingInFileNames: enforce file name casing

// tsconfig.json content:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

// 4) package.json scripts (theory):
// - build: runs tsc to compile TS to JS
// - start: runs compiled JS
// - dev: uses ts-node for instant execution in development

// package.json scripts section:
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts"
}

// 5) Example src/index.ts (TypeScript HTTP server):
import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from TypeScript with Node.js!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// 6) Running commands:
// Development: npm run dev
// Build:       npm run build
// Production:  npm start

// Notes:
// - Use ts-node for on-the-fly TypeScript execution
// - tsc provides ahead-of-time compilation with type checks
// - For auto-reloading in dev, install nodemon and update dev script:
//   npm install --save-dev nodemon
//   "dev": "nodemon --exec ts-node src/index.ts"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 236 - Babel for transpiling modern JavaScript features in Node.js (if targeting older Node versions)

// 1) Install Babel and necessary presets/plugins
// npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env

// 2) Create Babel configuration file (babel.config.json)
// - presets.env allows targeting specific Node versions or environments

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"  // example: support Node.js v10 and above
        }
      }
    ]
  ]
}

// 3) Add scripts in package.json
// - build: transpile JS files from src to dist
// - start: execute transpiled code
// - dev: use babel-node for on-the-fly transpilation

"scripts": {
  "build": "babel src --out-dir dist",
  "start": "node dist/index.js",
  "dev": "babel-node src/index.js"
}

// 4) Example src/index.js using modern syntax (uncommented):
import http from 'http';
import { promisify } from 'util';

const PORT = process.env.PORT || 3000;

async function handleRequest(req, res) {
  const delay = promisify(setTimeout);
  await delay(100);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from transpiled Node.js with Babel!');
}

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 5) Running commands:
// - Development: npm run dev
// - Build:       npm run build
// - Production:  npm start

// Notes:
// - @babel/cli and @babel/node enable CLI and REPL support
// - preset-env targets allow fine-grained control of transpilation
// - For polyfills, install core-js and configure useBuiltIns option
//   npm install core-js
//   then add to babel.config.json:
//   "useBuiltIns": "usage", "corejs": 3

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 237 - Linting and formatting: ESLint with Airbnb or Standard style, Prettier integration

// 1) Install dependencies
// npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier

// 2) Initialize ESLint configuration
// Run: npx eslint --init
// Choose: "To check syntax, find problems, and enforce code style"
// Select "Airbnb style guide" (or "Standard"), JavaScript modules, Node environment, JSON format

// Example .eslintrc.json using Airbnb base and Prettier integration:
{
  "env": {
    "node": true,
    "es2020": true
  },
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    // Custom rule overrides:
    "no-console": "off",
    "comma-dangle": ["error", "always-multiline"]
  }
}

// 3) Prettier configuration
// Create .prettierrc (JSON)
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true
}

// 4) Add scripts in package.json
/*
"scripts": {
  "lint": "eslint 'src/**/*.js'",
  "lint:fix": "eslint --fix 'src/**/*.js'",
  "format": "prettier --write 'src/**/*.{js,json,md}'"
}
*/

// 5) Usage examples
// Run linting:      npm run lint
// Auto-fix issues:  npm run lint:fix
// Format files:     npm run format

// Notes:
// - eslint-config-prettier disables ESLint rules that conflict with Prettier
// - plugin:prettier/recommended enables eslint-plugin-prettier and sets Prettier errors as ESLint errors
// - For TypeScript support, install @typescript-eslint packages and extend recommended configs
// - Integrate with editors by enabling ESLint and Prettier plugins for on-save formatting

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 238 - GraphQL subscriptions: integrating apollo-server or graphql-ws for real-time data

// 1) Install dependencies
// npm install apollo-server graphql graphql-ws ws

// 2) Schema definition with subscription type
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    messages: [Message!]
  }

  type Subscription {
    messageAdded: Message!
  }
`;

// 3) PubSub implementation
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

// In-memory messages store
const messages = [];

// 4) Resolvers including subscription resolver
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
    },
  },
};

// 5) Server setup with ApolloServer supporting subscriptions
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // subscriptions deprecated in Apollo 3, auto-enabled on ws://
  context: ({ req }) => ({})
});

// 6) Publishing events when new messages arrive
function addMessage(content, author) {
  const message = { id: messages.length + 1, content, author };
  messages.push(message);
  pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
  return message;
}

// Example mutation simulation (in practice via Mutation resolver)
addMessage('Hello World!', 'Alice');

// Start server
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});

// Alternative: Using graphql-ws for more control
// npm install graphql-ws

/*
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');

const httpServer = createServer();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

useServer({ schema }, wsServer);

httpServer.listen(4000, () => {
  console.log('Server is now running on http://localhost:4000/graphql');
});
*/

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 239 - Full-text search with Elasticsearch: indexing, querying, relevance scoring via elasticsearch-js

// 1) Install the Elasticsearch client
// npm install @elastic/elasticsearch

// 2) Initialize client
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

// 3) Define an index and mapping (run once)
async function createIndex() {
  await esClient.indices.create({
    index: 'articles',
    body: {
      mappings: {
        properties: {
          title: { type: 'text' },
          body: { type: 'text' },
          tags: { type: 'keyword' },
          published_at: { type: 'date' }
        }
      }
    }
  });
}

// Usage: createIndex();

// 4) Index documents
async function indexArticle(id, article) {
  await esClient.index({
    index: 'articles',
    id,
    body: article,
    refresh: 'wait_for' // make immediately searchable
  });
}

// Example article:
// indexArticle('1', { title: 'Elasticsearch Guide', body: 'Learn full-text search...', tags: ['search','elasticsearch'], published_at: '2025-06-01' });

// 5) Search with relevance scoring
async function searchArticles(query) {
  const { body } = await esClient.search({
    index: 'articles',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['title^2', 'body'], // boost title
          fuzziness: 'AUTO'
        }
      },
      highlight: {
        fields: {
          body: {}
        }
      }
    }
  });
  return body.hits.hits.map(hit => ({
    id: hit._id,
    score: hit._score,
    source: hit._source,
    highlight: hit.highlight
  }));
}

// Usage example:
// (async () => {
//   const results = await searchArticles('search engine');
//   console.log(results);
// })();

// 6) Notes:
// - multi_match combines multiple fields with optional boosts
// - fuzziness helps with typos
// - refresh: 'wait_for' ensures the document is visible immediately
// - relevance (_score) is based on TF-IDF by default; can use function_score for custom scoring

module.exports = { createIndex, indexArticle, searchArticles };

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 240 - Integrating third-party APIs: Stripe for payments, Twilio for SMS/voice, SendGrid for emails

// 1) Install dependencies:
// npm install stripe twilio @sendgrid/mail

// ===== Stripe Integration =====
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);

/**
 * Charge a customer using Stripe
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code, e.g. 'usd'
 * @param {string} source - Payment source token
 */
async function chargeCustomer(amount, currency, source) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method: source,
    confirm: true
  });
  return paymentIntent;
}

// Example:
// chargeCustomer(500, 'usd', 'tok_visa')

// ===== Twilio Integration =====
const twilio = require('twilio');
const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

/**
 * Send an SMS message via Twilio
 * @param {string} to - Recipient phone number
 * @param {string} body - Message body
 */
async function sendSms(to, body) {
  return twilioClient.messages.create({
    to,
    from: process.env.TWILIO_FROM,  // e.g. '+1234567890'
    body
  });
}

/**
 * Make a voice call via Twilio
 * @param {string} to - Recipient phone number
 * @param {string} twimlUrl - URL returning TwiML instructions
 */
async function makeCall(to, twimlUrl) {
  return twilioClient.calls.create({
    to,
    from: process.env.TWILIO_FROM,
    url: twimlUrl
  });
}

// ===== SendGrid Integration =====
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

/**
 * Send an email via SendGrid
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 */
async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM,   // Verified sender
    subject,
    html
  };
  return sgMail.send(msg);
}

// Export functions
module.exports = {
  chargeCustomer,
  sendSms,
  makeCall,
  sendEmail
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 241 - AWS Lambda basics: handler functions, deployment packages, environment variables

// 1) Handler Function Example (Node.js 14+)
// Filename: index.js
exports.handler = async (event, context) => {
  // Access environment variables
  const tableName = process.env.TABLE_NAME;

  // Process incoming event (e.g., API Gateway proxy)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from AWS Lambda!',
      input: event,
      table: tableName
    })
  };
};

// 2) Deployment Package
// - For pure JS: zip index.js and node_modules/
//   zip -r lambda.zip index.js node_modules
// - For native dependencies: build on Amazon Linux or use Lambda Layers

// 3) Environment Variables
// - Configure in AWS Console or with IaC (Serverless Framework, SAM, Terraform)
// Example (serverless.yml):
/*
functions:
  hello:
    handler: index.handler
    environment:
      TABLE_NAME: UsersTable
*/

// 4) Sample serverless.yml snippet
/*
service: my-service
provider:
  name: aws
  runtime: nodejs14.x
functions:
  hello:
    handler: index.handler
    events:
      - http:
          path: hello
          method: get
    environment:
      TABLE_NAME: UsersTable
*/

// 5) Testing Locally with AWS SAM CLI
// sam local invoke HelloFunction -e event.json

// Notes:
// - 'event' contains invocation data (API Gateway, SQS, etc.)
// - 'context' provides metadata (requestId, remainingTime)
// - Keep handler code stateless for cold starts
// - Use Layers for shared dependencies
// - Monitor using CloudWatch Logs and X-Ray

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 242 - Using Serverless Framework to define functions, resources, and deploy to AWS, Azure, or Google Cloud

// 1) Install Serverless CLI
// npm install -g serverless

// 2) Initialize project
// serverless create --template aws-nodejs --path my-service

// 3) serverless.yml configuration (YAML content follows):
/*
service: my-service
frameworkVersion: '3'

provider:
  name: aws               # Change to 'azure' or 'google'
  runtime: nodejs14.x     # Or nodejs16.x, etc.
  stage: dev
  region: us-east-1       # Or your preferred region
  environment:
    TABLE_NAME: UsersTable
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - dynamodb:PutItem
        - dynamodb:GetItem
      Resource: arn:aws:dynamodb:us-east-1:123456789012:table/${self:provider.environment.TABLE_NAME}

functions:
  hello:
    handler: handler.hello
    events:
      - httpApi:
          path: /hello
          method: get

plugins:
  - serverless-offline  # For local development

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.TABLE_NAME}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
*/

// 4) handler.js example (uncommented):
// Filename: handler.js

module.exports.hello = async (event) => {
  const table = process.env.TABLE_NAME;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Serverless Framework!',
      table,
      event
    })
  };
};

// 5) Deploying
// serverless deploy        -> deploy to AWS (or set provider to azure/google)
// serverless deploy --region eu-west-1 --stage prod

// 6) Local development
// serverless offline       -> run functions locally on http://localhost:3000

// Notes:
// - To target Azure, set provider.name: azure and add appropriate plugin (serverless-azure-functions)
// - To target Google Cloud, set provider.name: google and use serverless-google-cloudfunctions
// - Define additional resources under 'resources:' or 'resources.cf'
// - Use variables and stages for multi-env deployments

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 243 - API Gateway integration with Lambda: mapping templates, authorizers, CORS configuration

// 1) Mapping Templates (Velocity Template Language)
// In serverless.yml under http event for AWS API Gateway Rest API:
/*
functions:
  getUser:
    handler: handler.getUser
    events:
      - http:
          path: users/{id}
          method: get
          integration: lambda
          request:
            template:
              application/json: |
                {
                  "userId": "$input.params('id')",
                  "rawBody": $input.json('$')
                }
*/

// handler.js example reading mapped input
module.exports.getUser = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const userId = body.userId;
  // fetch user from DB...
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',            // CORS header
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ id: userId, name: 'Alice' })
  };
};

// 2) Custom Authorizer (Lambda function as auth)
// serverless.yml snippet:
/*
functions:
  auth:
    handler: handler.auth
  privateEndpoint:
    handler: handler.private
    events:
      - http:
          path: private
          method: get
          authorizer:
            name: auth
            type: request   # or 'jwt' for Cognito
*/

// handler.js custom authorizer
module.exports.auth = async (event) => {
  const token = event.headers.Authorization;
  // validate token...
  const principalId = token === 'secret' ? 'user123' : null;
  if (!principalId) {
    throw new Error('Unauthorized');
  }
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{ Action: 'execute-api:Invoke', Effect: 'Allow', Resource: event.methodArn }]
    }
  };
};

// handler.js protected resource
module.exports.private = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Authorized access!' })
  };
};

// 3) Enabling CORS globally in serverless.yml
/*
provider:
  apiGateway:
    restApiId: xxxxx
    restApiRootResourceId: xxxxx
  cors:
    origins:
      - '*'
    headers:
      - Content-Type
      - X-Amz-Date
      - Authorization
      - X-Api-Key
      - X-Amz-Security-Token
    allowCredentials: true
*/

// Or per-function via http event `cors: true`
/*
events:
  - http:
      path: users
      method: post
      cors: true
*/

// Notes:
// - Mapping templates transform API payloads
// - Custom authorizers control access
// - CORS can be enabled globally or per endpoint
// - For JWT authorizers, use type 'jwt' with Cognito or OIDC providers

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 244 - Azure Functions and Node.js: triggers, bindings, local development with Azure Functions Core Tools

// 1) Install Azure Functions Core Tools and initialize project
// npm install -g azure-functions-core-tools@4 --unsafe-perm true
// func init MyFunctionApp --worker-runtime node

// 2) Create a new Function (HTTP trigger example)
// cd MyFunctionApp
// func new --name HttpTrigger --template "HTTP trigger" --authlevel "function"

// 3) Function code (HttpTrigger/index.js):
module.exports = async function (context, req) {
  context.log('HTTP trigger function processed a request.');

  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
    ? `Hello, ${name}. This HTTP triggered function executed successfully.`
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
    headers: {
      'Content-Type': 'text/plain'
    }
  };
};

// 4) Function configuration (function.json):
/*
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
*/

// 5) Local development and testing
// Start runtime: func start
// Invoke HTTP function: curl http://localhost:7071/api/HttpTrigger?name=Azure

// 6) Other binding examples
// Queue trigger (QueueTrigger/index.js):
/*
module.exports = async function (context, myQueueItem) {
  context.log('Queue item received:', myQueueItem);
};
*/
/* function.json for queue:
{
  "bindings": [
    {
      "name": "myQueueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "myqueue-items",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
*/

// Blob trigger, Timer trigger, Event Hub, Cosmos DB bindings follow similar pattern

// 7) Deploying to Azure
// Login: az login
// Deploy: func azure functionapp publish <FunctionAppName>

// Notes:
// - context.log for logging to Azure Monitor
// - Environment variables in local.settings.json under "Values"
// - Do NOT check local.settings.json into source control
// - Use Azure Storage emulator or Azure Storage connection for triggers
// - Monitor functions via Azure Portal or Azure CLI (az functionapp list-functions)

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 245 - Google Cloud Functions: deployment, testing, integration with Firebase

// 1) Install Google Cloud SDK and Functions Framework
// npm install -g @google-cloud/functions-framework
// npm install --save @google-cloud/functions-framework

// 2) Write your function (index.js)
/**
 * HTTP Cloud Function.
 * @param {Object} req HTTP request context.
 * @param {Object} res HTTP response context.
 */
exports.helloHttp = (req, res) => {
  const name = req.query.name || req.body.name || 'World';
  res.status(200).send(`Hello ${name} from Google Cloud Functions!`);
};

// 3) Functions Framework entry (package.json)
/*
"scripts": {
  "start": "functions-framework --target=helloHttp"
}
*/

// 4) Local testing
// npm start
// curl http://localhost:8080/?name=Firebase

// 5) Deploy to GCP
// gcloud functions deploy helloHttp \
//   --runtime nodejs16 \
//   --trigger-http \
//   --allow-unauthenticated

// 6) Integrate with Firebase (optional)
// In firebase.json:
/*
{
  "functions": {
    "source": "functions"
  }
}
*/
// Then in functions/package.json set main to index.js and deploy via Firebase CLI:
// firebase deploy --only functions

// 7) Environment Variables / Configuration
// gcloud functions deploy ... --set-env-vars KEY=VALUE,OTHER=VALUE
// Access via process.env.KEY

// 8) Testing with Firebase Emulator
// npm install -g firebase-tools
// firebase emulators:start --only functions

// Notes:
// - Use Functions Framework for local dev and custom triggers
// - Use Firebase SDK for Firebase-specific features (Auth, Firestore, Messaging)
// - Structure: functions/index.js exports multiple functions
// - Monitor via GCP Console and Cloud Logging

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 246 - Cost optimization: cold starts, function memory/timeout configuration, provisioned concurrency

// 1) Cold Starts
// - Cold start occurs when a new instance is initialized.
// - Minimize package size by: removing unused dependencies, bundling efficiently (e.g. webpack).
// - Use lighter runtimes (e.g. Node.js 16+).

// 2) Memory & Timeout Configuration
// In serverless.yml or AWS Console, tune per-function:
/*
functions:
  myFunction:
    handler: handler.main
    memorySize: 128       # in MB: lower memory reduces cost but affects CPU
    timeout: 10            # in seconds: avoid long-running functions
*/

// handler.js example:
module.exports.main = async (event) => {
  // Perform lightweight work
  return { statusCode: 200, body: 'OK' };
};

// 3) Provisioned Concurrency (AWS Lambda)
// Pre-warm instances to eliminate cold starts at scale.
// Configure in serverless.yml:
/*
functions:
  myFunction:
    handler: handler.main
    provisionedConcurrency: 5      # number of pre-warmed instances
*/

// Or via AWS CLI:
// aws lambda put-provisioned-concurrency-config \
//   --function-name myFunction \
//   --qualifier \$LATEST \
//   --provisioned-concurrent-executions 5

// 4) Auto-scaling Provisioned Concurrency
// Use Application Auto Scaling to adjust based on utilization:
/*
resources:
  Resources:
    MyFunctionProvisionedConcurrency:
      Type: AWS::ApplicationAutoScaling::ScalableTarget
      Properties:
        MaxCapacity: 20
        MinCapacity: 2
        ResourceId: function:myService-myFunction-ABC123:PROD
        RoleARN: arn:aws:iam::123456789012:role/service-role/auto-scaling-role
        ScalableDimension: lambda:function:ProvisionedConcurrency
        ServiceNamespace: lambda
*/

// 5) Cost Trade-offs
// - Lower memory => slower CPU => longer duration => cost*duration.
// - Find sweet spot: benchmark with different memory sizes.
// - Provisioned concurrency adds constant cost: enables low latency under steady load.

// 6) Monitoring & Alerts
// - Use CloudWatch metrics: Duration, InitDuration, Throttles.
// - Set alarms on 5XX errors or high InitDuration.

// 7) Additional Tips
// - Use Lambda SnapStart (for Java) or Lambda Extensions for pre-initialization.
// - Group related logic into a single function to reduce duplicated cold starts.
// - Consider using container images for larger workloads with more control.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


Project Title

A brief description of what this project does and its purpose.

Table of Contents

Overview

Features

Prerequisites

Installation

Configuration

Usage

Examples

Development

Contributing

License

Contact

Overview

Provide a more detailed explanation of the project goals, architecture, and key technologies used.

Features

Feature 1: Short explanation

Feature 2: Short explanation

Feature 3: Short explanation

Prerequisites

List software and versions required:

Node.js >= 14.x
npm or Yarn
Serverless Framework (if applicable)
Docker (optional)

Installation

Clone the repository:



git clone https://github.com/username/repo-name.git
cd repo-name


2. Install dependencies:

```bash
npm install
# or
npm ci

Configuration

Provide steps to configure environment variables or config files:

cp .env.example .env
# Edit .env to provide your values

Example .env:

API_KEY=your_api_key_here
DB_HOST=localhost
DB_USER=user
DB_PASS=password

Usage

Development Server

npm run dev

Starts the development server with hot-reload.

Build and Run

npm run build
npm start

Serverless Deployment

serverless deploy --stage dev

Examples

Show example requests and responses:

# HTTP GET request
curl https://api.example.com/health

Response:

{
  "status": "ok"
}

Development

Steps for contributors:

Fork the repository

Create a new branch: git checkout -b feature/YourFeature

Commit changes: git commit -m 'Add some feature'

Push to branch: git push origin feature/YourFeature

Submit a pull request

Contributing

Please read CONTRIBUTING.md for guidelines on how to contribute.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

Maintainer - Your Name

Project Link: https://github.com/username/repo-name


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 248 - API documentation with tools like apidoc, swagger-jsdoc, or TypeDoc (for TypeScript)

// ===== Using apidoc =====
// 1) Install apidoc
// npm install --save-dev apidoc

// 2) Add JSDoc-style comments above routes in your Express app
/**
 * @api {get} /users Retrieve all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of user objects.
 * @apiSuccess {String} users.id User unique ID.
 * @apiSuccess {String} users.name User's name.
 */
app.get('/users', (req, res) => {
  res.json([{ id: '1', name: 'Alice' }]);
});

// 3) Generate docs
// npx apidoc -i src/ -o docs/


// ===== Using swagger-jsdoc & swagger-ui-express =====
// 1) Install dependencies
// npm install swagger-jsdoc swagger-ui-express

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 2) Define options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation generated by swagger-jsdoc'
    }
  },
  apis: ['./src/routes/*.js'] // files containing annotations
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// 3) Setup middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4) Annotate route with OpenAPI comments
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
app.get('/users', (req, res) => {
  res.json([{ id: '1', name: 'Alice' }]);
});


// ===== Using TypeDoc (for TypeScript) =====
// 1) Install typedoc
// npm install --save-dev typedoc

// 2) Add script to package.json
/*
"scripts": {
  "docs": "typedoc --out docs/ src/"
}
*/

// 3) Add TypeDoc comments in TS code
/**
 * Represents a user in the system.
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Full name */
  name: string;
}

/**
 * Retrieves all users.
 * @returns Promise resolving to an array of User objects.
 */
export async function getUsers(): Promise<User[]> {
  // ...implementation
  return [];
}

// 4) Generate docs
// npm run docs

// Notes:
// - apidoc is focused on REST endpoint docs via JSDoc annotations
// - swagger-jsdoc integrates OpenAPI with interactive UI
// - TypeDoc generates API reference from TypeScript types and comments

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 249 - Documenting code with JSDoc: annotations for functions, classes, modules

/**
 * Adds two numbers together.
 * @function add
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} Sum of a and b.
 * @example
 * const result = add(2, 3);
 * // returns 5
 */
function add(a, b) {
  return a + b;
}

/**
 * Represents a user in the system.
 * @class
 */
class User {
  /**
   * Create a user.
   * @param {string} id - Unique identifier for the user.
   * @param {string} name - Full name of the user.
   */
  constructor(id, name) {
    /**
     * @type {string}
     */
    this.id = id;

    /**
     * @type {string}
     */
    this.name = name;
  }

  /**
   * Get a greeting message for the user.
   * @returns {string} A welcome message.
   */
  getGreeting() {
    return `Hello, ${this.name}!`;
  }
}

/**
 * Utility module for mathematical operations.
 * @module mathUtils
 */
const mathUtils = {
  /**
   * Multiply two numbers.
   * @param {number} x - First factor.
   * @param {number} y - Second factor.
   * @returns {number} Product of x and y.
   */
  multiply(x, y) {
    return x * y;
  },

  /**
   * Calculates factorial of a non-negative integer.
   * @param {number} n - Non-negative integer.
   * @returns {number} Factorial of n.
   * @throws {Error} If n is negative.
   */
  factorial(n) {
    if (n < 0) throw new Error('Negative input not allowed');
    return n === 0 ? 1 : n * mathUtils.factorial(n - 1);
  }
};

module.exports = { add, User, mathUtils };

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


250 - Contributing to Open-Source Node.js Projects

1. Finding Projects to Contribute

Browse GitHub Topics: explore nodejs, good-first-issue

Check organizations you use (Express, NestJS, Mongoose)

Look for labels: good first issue, help wanted, documentation

2. Forking and Cloning

# Fork the repository on GitHub via UI
# Clone your fork locally:
git clone git@github.com:<your-username>/<repo-name>.git
cd <repo-name>
# Add upstream remote to stay in sync with origin
git remote add upstream git@github.com:original-author/<repo-name>.git

3. Keeping Your Fork in Sync

# Fetch upstream changes
git fetch upstream
# Merge into your local main
git checkout main
git merge upstream/main
# Or rebase:
git rebase upstream/main
# Push updates to your fork
git push origin main

4. Creating a Feature Branch

# Create branch for your issue or feature
git checkout -b feature/issue-123-description

5. Implementing Changes

Follow project coding style (run npm test, npm run lint)

Write clear commit messages:

git commit -m "feat: add pagination to user list"

Include tests for new code (using Jest, Mocha, etc.)

6. Issuing a Pull Request (PR)

Push your branch: git push origin feature/issue-123-description

Open PR on GitHub from your branch into original-author/<repo>/main

Write PR description:

Reference issue: closes #123

Describe what you changed and why

Mention any breaking changes

7. Responding to Reviews

Address feedback by pushing new commits to the same branch

Clarify design decisions if questioned

Keep commits clean or squash before merge if needed

8. Issue Triage and Labeling

Reproduce bug locally and comment steps

Assign appropriate labels: bug, feature, documentation

Use GitHub Projects or ZenHub to track status

Close issues that are resolved by a PR: include closes #issue-number

9. Best Practices

Follow semantic versioning in changelogs

Respect the code of conduct

Sign CLA if required by the project

Keep PRs small and focused

Thank maintainers and provide constructive feedback

Happy contributing!


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



251 - Following Node.js Release Schedule and LTS Policy

Release Trains and Phases

Node.js follows a time-based release schedule:

Phase

Timeline

Current

Actively maintained; receives fixes & updates

LTS

Designated as Long-Term Support (October–April)

Maintenance

Critical fixes only (April–October)

End-of-Life

No further updates; upgrade required

Major Releases occur biannually in April and October.

The release becomes LTS six months after initial release (October for April release, April for October release).

Each LTS line is active for 18 months: 12 months of "Active LTS" followed by 6 months of "Maintenance".

How to Track Releases

Node.js Official Site: https://nodejs.org/en/about/releases/

GitHub Releases: https://github.com/nodejs/node/releases

RSS Feed: https://nodejs.org/en/feed/blog.xml (subscribe for updates)

Determining Your Version's Status

# Check local version
node -v

# Compare with LTS release schedule
# e.g., v18.x active LTS until April 2025, maintenance until October 2025

Upgrading Strategies

Use nvm (Node Version Manager):

nvm install --lts         # Install latest LTS
nvm use --lts             # Switch to LTS

Docker Images: refer to tags node:<major>-<slim|alpine> for specific LTS versions.

Aligning with LTS for Production

Always deploy on an Active LTS or Maintenance release—not on Current or EOL.

Schedule upgrades when a new LTS line enters Active LTS to minimize breaking changes.

Use CI pipelines to test against multiple Node.js versions:

strategy:
  matrix:
    node-version: ['18', '20']
steps:
  - uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node-version }}
  - run: npm test

Key Resources

Release Working Group: https://github.com/nodejs/release

Node.js SemVer Policy: https://nodejs.org/en/blog/semver/

Project Board: https://github.com/nodejs/node/projects

Stay current and secure by tracking Node.js LTS timelines!


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



252 - Keeping Up-to-Date with Node.js

Official Sources

Node.js GitHub Repository

URL: https://github.com/nodejs/nodeWatch or star the repo to receive notifications about releases, issues, and discussions.

Node.js Official Blog

URL: https://nodejs.org/en/blog/Read announcements for major releases, security updates, and project news.

Node.js Foundation (OpenJS Foundation) Announcements

OpenJS Blog: https://openjsf.org/blog/Covers ecosystem-wide updates, event announcements, and working group reports.

Subscription and Feeds

RSS/Atom Feeds

Node.js Blog Feed: https://nodejs.org/en/feed/blog.xmlSubscribe in your RSS reader for automatic updates.

Twitter Accounts

@nodejs — Official Node.js tweets.

Mailing Lists

nodejs-announcements@lists.nodejs.org — For critical security and release announcements.Subscribe: https://groups.google.com/g/nodejs-announcements

Community and Events

Node.js GitHub DiscussionsEngage with the community: https://github.com/nodejs/node/discussions

Node.js Foundation Webinars & MeetupsFind upcoming online events: https://openjsf.org/events/

Conferences

Node.js Interactive, JSConf, NodeSummit — watch for CFPs and schedules.

Staying Informed in Your Workflow

CLI Version Checks

node -v            # Check current local version
nvm ls-remote      # List all available Node.js versions


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////