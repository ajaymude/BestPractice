// 📘 INTRODUCTION & SETUP
// 01 - What is Express.js and why use it?
// 02 - Express.js vs other Node.js frameworks (Koa, Hapi, Fastify)
// 03 - Installing Express via npm: npm init, npm install express
// 04 - Project structure: app.js/server.js entry point, routes folder, controllers folder, models folder
// 05 - Basic “Hello World” server: creating an Express app, app.listen, req and res objects
// 06 - Understanding package.json scripts: start, dev with nodemon
// 07 - Environment variables: dotenv setup, process.env usage

// 🔤 CORE CONCEPTS & APPLICATION OBJECT
// 08 - Creating an Express application: const app = express()
// 09 - HTTP methods and routing: app.get(), app.post(), app.put(), app.delete(), app.patch()
// 10 - Route parameters vs query parameters vs request body
// 11 - req.params, req.query, req.body, req.headers
// 12 - Sending responses: res.send(), res.json(), res.status(), res.sendFile(), res.redirect()
// 13 - Express request lifecycle: middleware chain, order of execution
// 14 - app.use() vs app.METHOD() vs router.METHOD()


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 01 - What is Express.js and why use it?
//    - Express.js is a minimal, unopinionated, and flexible web framework for Node.js.
//    - It helps developers build web applications and APIs easily and quickly.
//    - Provides a simple interface for handling HTTP requests, routing, and middleware.
//    - Makes it easy to add features like authentication, validation, logging, and error handling via middleware.
//    - Has a large ecosystem and strong community support.
//    - Great for building RESTful APIs, single-page applications, and serving static files.

//    // Example: Basic Express server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 02 - Express.js vs other Node.js frameworks (Koa, Hapi, Fastify)
//    - Express.js: Most popular Node.js web framework, minimal and unopinionated, massive middleware ecosystem, ideal for beginners and large projects.
//    - Koa.js: Created by the same team as Express, even more minimal, uses async/await by default, no built-in middleware, gives total control to developers.
//    - Hapi.js: Configuration-driven, designed for large-scale applications, built-in features for input validation, caching, authentication, and more, less reliant on third-party middleware.
//    - Fastify: Focused on high performance and low overhead, built-in schema-based validation and logging, automatic API docs, very fast HTTP server for JSON APIs.
//    - Choosing the right framework depends on project requirements: Express for general use, Koa for fine-grained control, Hapi for enterprise features, Fastify for speed.

//    // Quick Syntax Comparison (Example: Basic "Hello World" route)

// Express.js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello, Express!'));
app.listen(3000);

// Koa.js
const Koa = require('koa');
const app = new Koa();
app.use(ctx => { ctx.body = 'Hello, Koa!'; });
app.listen(3000);

// Hapi.js
const Hapi = require('@hapi/hapi');
const init = async () => {
  const server = Hapi.server({ port: 3000 });
  server.route({ method: 'GET', path: '/', handler: () => 'Hello, Hapi!' });
  await server.start();
};
init();

// Fastify
const fastify = require('fastify')();
fastify.get('/', async (request, reply) => 'Hello, Fastify!');
fastify.listen({ port: 3000 });

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 03 - Installing Express via npm: npm init, npm install express
//    - To start a new Express project, first initialize a Node.js project using 'npm init'.
//    - Then, install Express as a dependency using 'npm install express'.
//    - This sets up package.json for managing dependencies and scripts.

//    // Step 1: Initialize a new Node.js project
//    $ npm init -y
//    // (The '-y' flag auto-generates package.json with default values)

//    // Step 2: Install Express.js in your project
//    $ npm install express
//    // (This adds Express to the dependencies in package.json)

//    // Step 3: Create an entry file (e.g., index.js) and set up a basic server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express is installed!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

//    - You can now run your server with:
//    $ node index.js

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 04 - Project structure: app.js/server.js entry point, routes folder, controllers folder, models folder
//    - Organizing code into folders improves maintainability, scalability, and readability.
//    - Common Express.js project structure:
//        /project-root
//          |-- app.js OR server.js         // Main entry point
//          |-- /routes                     // Route definitions (URL endpoints)
//          |-- /controllers                // Business logic & request handlers
//          |-- /models                     // Data models (e.g., for MongoDB, Mongoose)
//          |-- /middlewares                // (optional) Custom middleware functions
//          |-- package.json                // Project metadata & dependencies

//    // Example file structure:
/*
my-express-app/
├── app.js
├── routes/
│     └── userRoutes.js
├── controllers/
│     └── userController.js
├── models/
│     └── userModel.js
├── middlewares/
│     └── authMiddleware.js
├── package.json
*/

//    // Basic entry point: app.js or server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

//    - Each route file imports its controller and delegates request handling.
//    - Controllers contain core business logic.
//    - Models define database structure and methods (e.g., with Mongoose for MongoDB).

//    // Benefits:
//    - Easier code management as the app grows.
//    - Clear separation of concerns: routing, logic, data, middleware.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 05 - Basic “Hello World” server: creating an Express app, app.listen, req and res objects
//    - To create a basic Express server:
//        1. Import express module.
//        2. Initialize the app.
//        3. Define a route using app.get().
//        4. Use app.listen() to start the server.
//    - The req (request) object represents the HTTP request and contains info about query params, body, headers, etc.
//    - The res (response) object is used to send back the response to the client.

//    // Example: Basic "Hello World" server
const express = require('express');   // Import express
const app = express();                // Create app instance

app.get('/', (req, res) => {          // Define route for GET /
  res.send('Hello World!');           // Send response to client
});

app.listen(3000, () => {              // Start server on port 3000
  console.log('Server running on http://localhost:3000');
});

//    - req: Contains details about the client's request (e.g., req.query, req.body, req.headers).
//    - res: Used to send data or status back to the client (e.g., res.send(), res.json(), res.status()).

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 06 - Understanding package.json scripts: start, dev with nodemon
//    - package.json scripts automate common tasks like starting the server.
//    - The "start" script runs your app in production (usually with node).
//    - The "dev" script (often using nodemon) restarts the server automatically on file changes (good for development).

//    // Example package.json scripts section:
/*
"scripts": {
  "start": "node app.js",          // Start server with Node.js (production)
  "dev": "nodemon app.js"          // Start server with nodemon (auto-reloads on save)
}
*/

//    // To run the server:
//    $ npm start    // Runs "node app.js"
//    $ npm run dev  // Runs "nodemon app.js"

//    - nodemon must be installed globally or as a dev dependency:
//    $ npm install --save-dev nodemon
//    // or
//    $ npm install -g nodemon

//    - Using scripts keeps commands simple and project setup consistent across all environments.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 07 - Environment variables: dotenv setup, process.env usage
//    - Environment variables store sensitive data (like API keys, DB URLs) outside your source code.
//    - Use the 'dotenv' package to load variables from a .env file into process.env.

//    // Step 1: Install dotenv
//    $ npm install dotenv

//    // Step 2: Create a .env file in your project root
/*
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
SECRET_KEY=mysupersecret
*/

//    // Step 3: Load variables in your app (usually at the top of app.js/server.js)
require('dotenv').config();

//    // Usage: Access variables with process.env
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const secretKey = process.env.SECRET_KEY;

console.log(port, dbUrl, secretKey);

//    - Never commit .env files to version control (add .env to .gitignore).
//    - process.env allows you to safely use config/secrets in your app without hardcoding values.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 08 - Creating an Express application: const app = express()
//    - To start using Express, import the express module and create an application instance.
//    - This app object is used to define routes, middleware, and other server logic.

//    // Example:
const express = require('express'); // Import express
const app = express();              // Create the app instance

//    - 'app' is the main Express application object.
//    - Use 'app' to set up routes, middleware, error handling, etc.

//    // Example usage:
app.get('/', (req, res) => {
  res.send('Express app created!');
});

//    - Export the app instance if you want to use it in other files (e.g., for testing or with server.js).
//    module.exports = app;

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 09 - HTTP methods and routing: app.get(), app.post(), app.put(), app.delete(), app.patch()
//    - Express provides methods to handle different HTTP requests: GET, POST, PUT, DELETE, PATCH, etc.
//    - Routing refers to defining how your app responds to different URLs and HTTP methods.
//    - Syntax: app.METHOD(path, handler)

//    // Example routes:
const express = require('express');
const app = express();

app.use(express.json()); // Enables parsing JSON request bodies

// GET - Read data
app.get('/users', (req, res) => {
  res.send('Get all users');
});

// POST - Create new data
app.post('/users', (req, res) => {
  res.send('Create a new user');
});

// PUT - Update entire resource
app.put('/users/:id', (req, res) => {
  res.send(`Update user with id ${req.params.id}`);
});

// PATCH - Update partial resource
app.patch('/users/:id', (req, res) => {
  res.send(`Partially update user with id ${req.params.id}`);
});

// DELETE - Remove resource
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user with id ${req.params.id}`);
});

//    - Use req (request) object to access data from URL params, body, query, etc.
//    - Use res (response) object to send response back to client.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 10 - Route parameters vs query parameters vs request body
//    - In Express, you can receive data from the client via:
//        1. Route (URL) parameters
//        2. Query parameters
//        3. Request body

//    1️⃣ Route parameters:
//        - Defined in the route path using ':' (colon).
//        - Used for identifying specific resources (e.g., /users/:id).
//        - Accessed via req.params.<paramName>.
//
//    // Example:
app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // Access route parameter
  res.send(`User ID is ${userId}`);
});

//    2️⃣ Query parameters:
//        - Appended to URL after '?' as key=value pairs (e.g., /users?role=admin).
//        - Used for filtering, sorting, searching, pagination, etc.
//        - Accessed via req.query.<key>.
//
//    // Example:
app.get('/users', (req, res) => {
  const role = req.query.role; // Access query parameter
  res.send(`Role filter: ${role}`);
});

//    3️⃣ Request body:
//        - Data sent in the body of POST, PUT, PATCH requests.
//        - Used for sending complex data (e.g., new user info).
//        - Accessed via req.body (needs express.json() middleware).
//
//    // Example:
app.use(express.json()); // To parse JSON bodies

app.post('/users', (req, res) => {
  const userData = req.body; // Access request body
  res.send(`User data received: ${JSON.stringify(userData)}`);
});

//    // Summary:
//    - Route params: part of the URL path (/users/:id)           → req.params
//    - Query params: in the URL after '?' (?key=value)           → req.query
//    - Request body: in the HTTP request body (POST, PUT, PATCH) → req.body

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 11 - req.params, req.query, req.body, req.headers
//    - Express provides several properties on the request (req) object to access client-sent data:

//    1️⃣ req.params
//        - Contains route parameters (from URLs like /users/:id).
//        - Example:
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Route param - userId: ${userId}`);
});

//    2️⃣ req.query
//        - Contains query string parameters (?key=value in the URL).
//        - Example:
app.get('/search', (req, res) => {
  const keyword = req.query.q;
  res.send(`Query param - keyword: ${keyword}`);
});

//    3️⃣ req.body
//        - Contains parsed request body data (for POST, PUT, PATCH).
//        - Requires express.json() middleware for JSON bodies.
//        - Example:
app.use(express.json());
app.post('/users', (req, res) => {
  const userData = req.body;
  res.send(`Request body: ${JSON.stringify(userData)}`);
});

//    4️⃣ req.headers
//        - Contains HTTP request headers sent by the client.
//        - Headers include metadata (content-type, authorization, etc.).
//        - Example:
app.get('/check-header', (req, res) => {
  const userAgent = req.headers['user-agent'];
  res.send(`Request header - User-Agent: ${userAgent}`);
});

//    // Summary:
//    - req.params   → Route parameters from URL
//    - req.query    → Query string parameters from URL
//    - req.body     → Data from HTTP request body (needs middleware)
//    - req.headers  → Key-value pairs of HTTP headers sent by client

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 12 - Sending responses: res.send(), res.json(), res.status(), res.sendFile(), res.redirect()
//    - The response (res) object in Express provides methods to send different types of responses to the client:

//    1️⃣ res.send()
//        - Sends a plain text, HTML, Buffer, or object (auto-converted to JSON) as the response.
//        - Example:
app.get('/send', (req, res) => {
  res.send('Hello from res.send!');
});

//    2️⃣ res.json()
//        - Sends a JSON response. Sets content-type to 'application/json'.
//        - Example:
app.get('/json', (req, res) => {
  res.json({ message: 'Hello from res.json!', success: true });
});

//    3️⃣ res.status()
//        - Sets the HTTP status code for the response. Usually chained with send() or json().
//        - Example:
app.get('/notfound', (req, res) => {
  res.status(404).send('Resource not found');
});

//    4️⃣ res.sendFile()
//        - Sends a file as an HTTP response.
//        - Example:
const path = require('path');
app.get('/file', (req, res) => {
  res.sendFile(path.join(__dirname, 'sample.txt'));
});

//    5️⃣ res.redirect()
//        - Redirects the client to a different URL.
//        - Example:
app.get('/google', (req, res) => {
  res.redirect('https://www.google.com');
});

//    // Summary:
//    - res.send():      Send any response (string, buffer, object)
//    - res.json():      Send JSON data
//    - res.status():    Set HTTP status code
//    - res.sendFile():  Send a file as response
//    - res.redirect():  Redirect client to another URL

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 13 - Express request lifecycle: middleware chain, order of execution
//    - Every HTTP request in Express passes through a chain of middleware functions before reaching the final route handler.
//    - Middleware functions can modify req/res, end the request-response cycle, or pass control to the next middleware.

//    // Middleware signature: (req, res, next)
//    - Call next() to pass control to the next middleware/route handler.
//    - The order in which middleware is defined matters: runs top-to-bottom.

//    // Example: Middleware chain
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Middleware 1');
  next(); // Pass to next middleware
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get('/', (req, res) => {
  res.send('Final route handler');
});

//    - For a GET / request, the execution order:
//        1. Middleware 1
//        2. Middleware 2
//        3. Route handler

//    - Middleware can:
//        - Log requests
//        - Parse request bodies
//        - Check authentication/authorization
//        - Handle errors

//    - If a middleware does not call next() or send a response, the request will hang (no response sent).

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 14 - app.use() vs app.METHOD() vs router.METHOD()
//    - Express provides several ways to handle requests and organize middleware/routes:

//    1️⃣ app.use()
//        - Mounts middleware functions at the application level.
//        - Can be used for logging, body parsing, static files, mounting routers, etc.
//        - Matches all HTTP methods by default (unless path or method restricted).
//        - Example:
app.use(express.json()); // Applies to all incoming requests

app.use('/api', (req, res, next) => {
  console.log('API middleware');
  next();
});

//    2️⃣ app.METHOD()
//        - Handles HTTP requests for a specific method (GET, POST, PUT, DELETE, etc.) and path.
//        - Used to define route handlers at the app level.
//        - Example:
app.get('/users', (req, res) => {
  res.send('GET users');
});

app.post('/users', (req, res) => {
  res.send('POST users');
});

//    3️⃣ router.METHOD()
//        - Used with Express Router to modularize and organize routes.
//        - router is an isolated instance of middleware/routes; use for grouping related endpoints.
//        - Example:
const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('User profile');
});
router.post('/profile', (req, res) => {
  res.send('Update profile');
});

// Mount router to app
app.use('/user', router);

//    // Summary:
//    - app.use():     Register middleware/functions for all or specific paths (all HTTP methods).
//    - app.METHOD():  Handle specific HTTP methods at the app level.
//    - router.METHOD(): Handle specific HTTP methods within a router for modular code organization.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////