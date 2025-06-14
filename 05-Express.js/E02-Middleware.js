// 🔄 MIDDLEWARE
// 15 - What is middleware? Definition and purpose
// 16 - Built-in middleware: express.json(), express.urlencoded(), express.static()
// 17 - Third-party middleware: body-parser (legacy), morgan (logging), helmet (security), cors
// 18 - Custom middleware: writing functions with (req, res, next), ordering in app.use()
// 19 - Error-handling middleware: signature (err, req, res, next), centralized error responses
// 20 - Mounting middleware at application level vs router level



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////



// 15 - What is middleware? Definition and purpose
//    - Middleware functions are functions that have access to the request (req), response (res), and next() in the request-response cycle.
//    - Signature: (req, res, next)
//    - They execute sequentially in the order they are defined until a response is sent or next() is not called.
//    - Middleware can:
//        - Execute code (e.g., logging, timing)
//        - Modify req and res objects
//        - End the request-response cycle (send response)
//        - Call next() to pass control to the next middleware or route handler
//    - Types of middleware:
//        1. Application-level middleware (app.use, app.METHOD)
//        2. Router-level middleware (router.use, router.METHOD)
//        3. Error-handling middleware (signature includes "err" as first param)
//        4. Built-in middleware (express.json(), express.static())
//        5. Third-party middleware (e.g., morgan, cors, helmet)
//
//    // Example: Logging middleware
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

//    - Purpose: Add reusable functionality, preprocess requests, implement cross-cutting concerns (auth, validation, error handling).

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// 16 - Built-in middleware: express.json(), express.urlencoded(), express.static()
//    - Express provides several built-in middleware functions for common tasks:

//    1️⃣ express.json()
//        - Parses incoming requests with JSON payloads (body) and makes data available on req.body.
//        - Required for handling application/json POST/PUT/PATCH requests.
//        - Example:
app.use(express.json());

//    2️⃣ express.urlencoded()
//        - Parses incoming requests with URL-encoded payloads (form data, e.g., from HTML forms).
//        - Use "extended: true" for rich objects and arrays, false for simple strings/arrays.
//        - Example:
app.use(express.urlencoded({ extended: true }));

//    3️⃣ express.static()
//        - Serves static files (HTML, CSS, images, JS) from a directory.
//        - Example:
app.use(express.static('public'));
//        - Now, files in /public can be accessed via http://localhost:3000/filename.ext

//    - Usage of these middleware is essential for parsing request bodies and serving static content in Express apps.
//    - Place them before your route handlers for proper request processing.

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// 17 - Third-party middleware: body-parser (legacy), morgan (logging), helmet (security), cors
//    - Third-party middleware adds extra functionality to Express apps beyond the built-in middleware.

//    1️⃣ body-parser (legacy)
//        - Parses incoming request bodies (JSON, URL-encoded).
//        - Now built-in as express.json() and express.urlencoded() in Express 4.16+.
//        - For older projects:
//            const bodyParser = require('body-parser');
//            app.use(bodyParser.json());
//            app.use(bodyParser.urlencoded({ extended: true }));

//    2️⃣ morgan (logging)
//        - HTTP request logger middleware for development and debugging.
//        - Logs details about each request (method, URL, status, response time, etc.).
//        - Example:
const morgan = require('morgan');
app.use(morgan('dev')); // 'dev' is a concise output style

//    3️⃣ helmet (security)
//        - Helps secure Express apps by setting various HTTP headers (prevents common attacks).
//        - Example:
const helmet = require('helmet');
app.use(helmet());

//    4️⃣ cors
//        - Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.
//        - Example:
const cors = require('cors');
app.use(cors());

//    - To use third-party middleware, install via npm:
//      $ npm install morgan helmet cors
//    - Add them before your routes to ensure requests are processed properly.

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// 18 - Custom middleware: writing functions with (req, res, next), ordering in app.use()
//    - You can create your own middleware functions to add custom logic to the request-response cycle.
//    - Custom middleware must have the signature: (req, res, next)
//    - Use next() to pass control to the next middleware or route handler.
//    - The order of middleware in app.use() determines the order of execution (top to bottom).
//    - Place global middleware before your routes for them to apply to all requests.

//    // Example: Custom logger middleware
const express = require('express');
const app = express();

function customLogger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to next middleware/route handler
}

// Register custom middleware before routes
app.use(customLogger);

app.get('/', (req, res) => {
  res.send('Custom middleware demo');
});

//    - You can create multiple custom middleware and stack them as needed.
//    - If a middleware does not call next() or send a response, the request will hang (no response sent).
//    - Order matters: earlier middleware can affect all subsequent middleware and routes.

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// 20 - Mounting middleware at application level vs router level
//    - Middleware can be attached globally (application level) or only to specific routes/groups (router level).

//    1️⃣ Application-level middleware
//        - Registered on the main app instance using app.use() or app.METHOD().
//        - Applies to all requests or to all requests matching a specific path.
//        - Example:
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('App-level middleware for all routes');
  next();
});

app.use('/api', (req, res, next) => {
  console.log('App-level middleware for /api/* routes');
  next();
});

//    2️⃣ Router-level middleware
//        - Registered on an Express.Router() instance.
//        - Applies only to routes handled by that router, useful for grouping and modularizing.
//        - Example:
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router-level middleware for this router');
  next();
});

router.get('/data', (req, res) => {
  res.send('Router-level middleware in action');
});

// Mount the router at /api
app.use('/api', router);

//    - Application-level middleware affects all routes (or specific path prefixes).
//    - Router-level middleware affects only routes handled by that router, useful for modular design and reusable route groups.

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////