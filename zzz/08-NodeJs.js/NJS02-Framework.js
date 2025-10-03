// 🌐 WEB SERVER FRAMEWORKS
// 54 - Express.js basics: installing, creating a simple server, routing
// 55 - Middleware concept in Express: application-level, router-level, error-handling, third-party
// 56 - Working with request and response objects: req.params, req.query, req.body, res.send, res.json, res.status
// 57 - Serving static files with express.static
// 58 - Handling file uploads: multer middleware usage
// 59 - Route parameters, query parameters, wildcard routes, route chaining
// 60 - Using Express Router for modular routing
// 61 - Error handling in Express: custom error classes, centralized error middleware
// 62 - Koa.js basics: async/await-based middleware, ctx object
// 63 - Hapi.js overview: server creation, route configuration, plugins
// 64 - Fastify: high-performance framework, decorators, schema-based validation


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 54 – Express.js basics: installing, creating a simple server, routing
//
// Express.js is a minimal and flexible Node.js web framework.
// It simplifies HTTP server creation, routing, and middleware integration.
//
// Key Points:
// • Middleware support via app.use()
// • Routing via app.get(), app.post(), etc.
// • Access to req (request) and res (response) objects.
//
// Installation (run in terminal):
//   npm install express
//
// Example: Basic server with routing
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route: GET /
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Route: GET /about
app.get('/about', (req, res) => {
  res.send('About page');
});

// Route: POST /data (expects JSON body)
app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Next Steps:
// • Add route parameters: app.get('/users/:id', …) and use req.params.
// • Handle query strings via req.query.
// • Implement custom middleware for logging or authentication.
// • Explore error-handling middleware with four arguments (err, req, res, next).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 55 – Middleware concept in Express: application-level, router-level, error-handling, third-party
//
// Middleware are functions with signature (req, res, next) that intercept requests.
// • Application-level: registered on the app via app.use() or app.METHOD().
// • Router-level: registered on an express.Router() instance.
// • Error-handling: four-argument functions (err, req, res, next) to catch errors.
// • Third-party: pre-built packages like morgan, helmet, cors.

// Import and setup
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Application-level middleware
app.use(helmet());                // security headers
app.use(cors({ origin: '*' }));   // enable CORS for all origins
app.use(morgan('dev'));           // HTTP request logging
app.use(express.json());          // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Router-level middleware
const router = express.Router();
router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});
router.get('/items', (req, res) => {
  res.json([{ id: 1, name: 'Item A' }]);
});
app.use('/api', router);

// Error-handling middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message });
}
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log('Express server running on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 56 – Working with request and response objects: req.params, req.query, req.body, res.send, res.json, res.status
//
// Express route handlers receive two key objects:
// • req (IncomingMessage): contains request data
//   – req.params: named route parameters (from path segments)
//   – req.query: URL query string parameters
//   – req.body: parsed request payload (requires body-parsing middleware)
// • res (ServerResponse): methods to craft the HTTP response
//   – res.send(): send a string, Buffer, or HTML
//   – res.json(): send a JSON response (automatically sets Content-Type)
//   – res.status(code): set HTTP status code (chainable before send/json)
//
// ——————————————————————————————————————————————————————————————
// Setup Express and JSON body parsing
const express = require('express');
const app = express();
app.use(express.json());  // parse application/json bodies

// — Example 1: req.params
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;               
  res.send(`User ID requested: ${userId}`);  
});

// — Example 2: req.query
// Request: GET /search?q=node&page=2
app.get('/search', (req, res) => {
  const { q, page = 1 } = req.query;          
  res.json({ query: q || null, page });       
});

// — Example 3: req.body and res.status + res.json
// Request: POST /users  { "name": "Alice", "age": 30 }
app.post('/users', (req, res) => {
  const newUser = req.body;                   
  // pretend to create user...
  res.status(201).json({                    
    message: 'User created successfully',  
    user: newUser                          
  });
});

// — Example 4: res.send with HTML
app.get('/welcome', (req, res) => {
  res.status(200).send('<h1>Welcome to our API</h1>');  
});

// — Example 5: error handling with status
app.get('/error', (req, res) => {
  res.status(400).send('Bad Request: missing parameters');
});

// — Example 6: chaining status and json
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  // pretend update...
  res
    .status(200)
    .json({ message: `User ${userId} updated`, updates });
});

// — Start server
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 57 – Serving static files with express.static
//
// Express provides built-in middleware to serve static assets like HTML, CSS, JS, images, and fonts.
// Use express.static() to specify one or more directories of assets, optionally mounting them at a virtual path.
// You can configure caching (maxAge), handle dotfiles, set custom headers, and provide default extensions.
//
// Key Examples:
// 1. Basic static serving from ./public at web root.
// 2. Mounting the same directory under a virtual path (/assets).
// 3. Serving from multiple directories.
// 4. Configuring cache control and custom headers.
//
// Next Steps:
// • Experiment with options such as maxAge, etag, extensions.
// • Combine with compression middleware (e.g. compression) for gzipped assets.
// • In production, offload static hosting to a reverse proxy or CDN.

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/static', express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 58 – Handling file uploads: multer middleware usage
//
// multer is a middleware for handling multipart/form-data, primarily for file uploads.
// Key Concepts:
// • Storage engines: diskStorage and memoryStorage.
// • Limits: fileSize, files.
// • File filtering: controlling accepted file types.
// • Single-file upload: upload.single('fieldname').
// • Multiple-files upload: upload.array('fieldname', maxCount).
// • Mixed fields: upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]).
// • Error handling: catch multer errors (LIMIT_FILE_SIZE etc).

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Storage configuration: diskStorage example
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

// Memory storage example
const memoryStorage = multer.memoryStorage();

// File filter: only allow image uploads
const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed'), false);
  } else {
    cb(null, true);
  }
};

// Initialize multer with storage, limits, and filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: imageFilter
});

// Single-file upload: field name "avatar"
app.post('/upload/avatar', upload.single('avatar'), (req, res) => {
  res.json({
    message: 'Avatar uploaded',
    file: req.file
  });
});

// Multiple-files upload (array): field name "photos", max 5 files
app.post('/upload/photos', upload.array('photos', 5), (req, res) => {
  res.json({
    message: 'Photos uploaded',
    files: req.files
  });
});

// Mixed fields upload: "avatar" (1 file) and "gallery" (up to 8 files)
app.post('/upload/mixed', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), (req, res) => {
  res.json({
    avatar: req.files['avatar'],
    gallery: req.files['gallery']
  });
});

// Error-handling middleware for multer errors and others
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

// HTML form example for testing (place in a .html file or template):
// <form action="/upload/avatar" method="post" enctype="multipart/form-data">
//   <input type="file" name="avatar" />
//   <button type="submit">Upload Avatar</button>
// </form>

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 59 – Route parameters, query parameters, wildcard routes, route chaining
//
// Express routing features:
// • Route parameters: define dynamic segments with `:name` → available on `req.params.name`.
// • Query parameters: append `?key=value` → parsed into `req.query.key`.
// • Wildcard routes: use `*` to match remainder of path → value in `req.params[0]`.
// • Route chaining: use `app.route(path).get(fn).post(fn)…` or `router.route()` for cleaner definitions.
//
// — Example 1: Route parameters
const express = require('express');
const app = express();

app.get('/users/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params;
  res.send(`User ${userId}, Order ${orderId}`);
});

// — Example 2: Query parameters
// Request: GET /search?q=node&limit=10&page=2
app.get('/search', (req, res) => {
  const { q, limit = 10, page = 1 } = req.query;
  res.json({ query: q, limit, page });
});

// — Example 3: Wildcard routes
// Matches /assets/css/style.css or /assets/js/app.js
app.get('/assets/*', (req, res) => {
  const assetPath = req.params[0];
  res.send(`Serving asset at path: ${assetPath}`);
});

// — Example 4: Route chaining with app.route()
app.route('/books')
  .get((req, res) => {
    res.send('List of books');
  })
  .post((req, res) => {
    res.send('Create a new book');
  })
  .put((req, res) => {
    res.send('Batch update books');
  });

// — Example 5: Router-level chaining
const router = express.Router();
router.route('/profiles/:username')
  .get((req, res) => {
    res.send(`Profile of ${req.params.username}`);
  })
  .delete((req, res) => {
    res.send(`Deleted profile ${req.params.username}`);
  });
app.use('/api', router);

// — Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 60 – Using Express Router for modular routing
//
// Express Router allows you to break your application’s routes into separate modules,
// apply middleware at the router level, and mount routers on path prefixes for cleaner organization.
// Benefits:
// • Encapsulate related routes and middleware in their own routers.
// • Mount routers under different URL prefixes.
// • Share URL parameters between parent app and routers via mergeParams.
// • Improve code maintainability and readability.

// userRouter.js
const express = require('express');
const userRouter = express.Router();

// Router-level middleware: logs requests to /users/*
userRouter.use((req, res, next) => {
  console.log(`[UserRouter] ${req.method} ${req.originalUrl}`);
  next();
});

// CRUD routes for users
userRouter
  .route('/')
  .get((req, res) => res.send('List of users'))
  .post((req, res) => res.send('Create user'));

userRouter
  .route('/:userId')
  .get((req, res) => res.send(`Get user ${req.params.userId}`))
  .put((req, res) => res.send(`Update user ${req.params.userId}`))
  .delete((req, res) => res.send(`Delete user ${req.params.userId}`));

module.exports = userRouter;

// postRouter.js
const express = require('express');
// mergeParams allows access to params from parent router (e.g. userId)
const postRouter = express.Router({ mergeParams: true });

// Routes for posts under a specific user
postRouter
  .route('/')
  .get((req, res) => res.send(`List posts for user ${req.params.userId}`))
  .post((req, res) => res.send(`Create post for user ${req.params.userId}`));

postRouter
  .route('/:postId')
  .get((req, res) => res.send(`Get post ${req.params.postId} for user ${req.params.userId}`))
  .put((req, res) => res.send(`Update post ${req.params.postId}`))
  .delete((req, res) => res.send(`Delete post ${req.params.postId}`));

module.exports = postRouter;

// app.js
const express = require('express');
const app = express();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

app.use(express.json());

// Mount userRouter at /users
app.use('/users', userRouter);

// Mount postRouter under /users/:userId/posts
userRouter.use('/:userId/posts', postRouter);

// Inline router example for admin routes
const adminRouter = express.Router();
adminRouter.get('/stats', (req, res) => res.send('Admin stats'));
adminRouter.get('/health', (req, res) => res.send('Health check'));
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 61 – Error handling in Express: custom error classes, centralized error middleware
//
// • Create custom Error subclasses with status codes to standardize error info.
// • In routes or middleware, call next(err) to forward errors.
// • Define a centralized error-handling middleware (with signature (err, req, res, next)).
// • Mount the error middleware after all other app.use() and routes.
// • Use wrappers for async route handlers to catch rejected Promises automatically.
//
// ——————————————————————————————————————————————————————————————
// Custom Error Class
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ——————————————————————————————————————————————————————————————
// Async Handler Wrapper
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ——————————————————————————————————————————————————————————————
// Express App Setup
const express = require('express');
const app = express();
app.use(express.json());

// ——————————————————————————————————————————————————————————————
// Example Routes
app.get('/sync-error', (req, res, next) => {
  // Synchronous error
  throw new HttpError(400, 'Synchronous error occurred');
});

app.get('/async-error', asyncHandler(async (req, res) => {
  // Simulate async failure
  await Promise.reject(new HttpError(404, 'Async resource not found'));
}));

app.get('/next-error', (req, res, next) => {
  // Using next() to forward an error
  next(new HttpError(401, 'Unauthorized access'));
});

// ——————————————————————————————————————————————————————————————
// Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  // Default to 500 if status not set
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  // Log stack for debugging (in production, log more selectively)
  console.error(err.stack);
  res.status(status).json({
    error: {
      message,
      // include stack only in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// ——————————————————————————————————————————————————————————————
// Start Server
app.listen(3000, () => {
  console.log('Express server with error handling on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 62 – Koa.js basics: async/await-based middleware, ctx object
//
// Koa.js is a minimal Node framework by the Express team.
// It uses async functions as middleware, leveraging async/await for clear flow.
// The context `ctx` encapsulates request and response, replacing `req`/`res`.
//
// Key Concepts:
// • Middleware signature: async (ctx, next) => { … }  
// • Call `await next()` to pass control to downstream middleware and then resume.  
// • ctx.request / ctx.response provide HTTP details.  
// • ctx.state for sharing data between middleware.  
// • ctx.throw(status, message) to raise HTTP errors.  
// • ctx.body to set response body; ctx.status to set status code.  
// • No built-in router—use koa-router for advanced routing.
//
// ——————————————————————————————————————————————————————————————
// Example: Basic Koa app with logger, error handler, and simple routes
const Koa = require('koa');
const app = new Koa();

// Logger middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// Error-handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

// Response middleware
app.use(async ctx => {
  if (ctx.path === '/') {
    ctx.body = 'Hello from Koa!';
  } else if (ctx.path === '/json') {
    ctx.body = { message: 'Hello JSON' };
  } else {
    ctx.throw(404, 'Not Found');
  }
});

// Application-level error event
app.on('error', (err, ctx) => {
  console.error('Server error:', err.message);
});

// Start server
app.listen(3000, () => {
  console.log('Koa server listening on port 3000');
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 63 – Hapi.js overview: server creation, route configuration, plugins
//
// Hapi.js is a powerful, configuration-driven Node.js framework for building APIs and services.
// Key concepts:
// • Server – create with host, port, connection options.
// • Routes – define method, path, handler, optional validation and auth.
// • Plugins – reusable modules to extend server functionality (e.g. static files, logging, templating).
// • Lifecycle events – hooks like onPreAuth, onPreHandler for request processing.
// • Validation – built-in support via Joi schemas in route options.
// • Good for large applications where structure and plugin ecosystem are important.
//
// Installation (run in terminal):
//   npm install @hapi/hapi @hapi/inert @hapi/vision @hapi/joi

import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';

const init = async () => {
  // Create the server
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true           // enable CORS for all routes
    }
  });

  // Register plugins: inert for static files, vision for templating
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision')
  ]);

  // Configure view engine (optional)
  server.views({
    engines: { html: require('handlebars') },
    path: 'templates'
  });

  // Simple route: GET /
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Hello from Hapi!';
    }
  });

  // Route with path parameter and validation
  server.route({
    method: 'GET',
    path: '/users/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().alphanum().min(1).max(10).required()
        })
      }
    },
    handler: (req, h) => {
      const { id } = req.params;
      return h.response({ message: `User ${id}` }).code(200);
    }
  });

  // Static file serving via inert
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  });

  // Example plugin: request logging via a simple extension
  server.ext('onPreHandler', (req, h) => {
    console.log(`[${req.method.toUpperCase()}] ${req.path}`);
    return h.continue;
  });

  // Start the server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 64 – Fastify: high-performance framework, decorators, schema-based validation
//
// Fastify is a Node.js web framework built for speed and low overhead.
// Key features:
// • Schema-based validation using JSON Schema for requests and responses.
// • Decorators to extend the Fastify instance (fastify.decorate) and request/reply objects.
// • Plugin architecture with encapsulation, enabling modular code.
// • Integrated logging powered by Pino for high-performance structured logs.
// • Support for async/await handlers and TypeScript out of the box.
//
// Example 1: Basic server with logging
const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Example 2: Decorating the Fastify instance
fastify.decorate('utility', {
  add: (a, b) => a + b
});

// Example 3: Schema-based route for POST /sum
fastify.route({
  method: 'POST',
  url: '/sum',
  schema: {
    body: {
      type: 'object',
      required: ['a', 'b'],
      properties: {
        a: { type: 'number' },
        b: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          result: { type: 'number' }
        }
      }
    }
  },
  handler: async (request, reply) => {
    const { a, b } = request.body;
    const result = fastify.utility.add(a, b);
    return { result };
  }
});

// Server start logic
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on port ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////