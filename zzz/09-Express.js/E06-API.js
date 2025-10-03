
// 📡 API DESIGN & BEST PRACTICES
// 75 - RESTful API conventions: resource naming, pluralization, use of HTTP status codes
// 76 - Versioning APIs: URI versioning (/v1/users), header versioning, media type versioning
// 77 - Consistent response structure: success/failure flags, data envelope, error messages
// 78 - Pagination patterns: limit & offset vs cursor-based pagination, implementing in routes
// 79 - Filtering, sorting, and search: query parameters handling, building dynamic queries
// 80 - API documentation: Swagger/OpenAPI with swagger-jsdoc and swagger-ui-express
// 81 - Generating and serving API docs with Postman, creating collections, automated testing
// 82 - HATEOAS principles and including links in responses
// 83 - Rate limiting specific endpoints: granular control per route or user

// 🔄 REAL-TIME & WEBSOCKETS INTEGRATION
// 84 - Introduction to WebSocket integration: ws or socket.io setup alongside Express server
// 85 - Setting up a socket.io server with Express: handling namespaces, rooms, events
// 86 - Emitting and receiving events: broadcasting to all clients, emitting to specific rooms
// 87 - Handling disconnects and reconnections gracefully
// 88 - Scaling socket.io with Redis Adapter: configuring adapter for multiple nodes
// 89 - Combining HTTP routes and WebSocket routes in the same Express application
// 90 - Using Server-Sent Events (SSE) for one-way real-time data streaming

// 🧰 TEMPLATE ENGINES VS API-ONLY
// 91 - When to choose server-rendered views vs API-only backend
// 92 - Creating hybrid apps: rendering initial HTML with EJS/Pug and providing JSON endpoints for client-side JS
// 93 - Integrating React/Vue frontend with Express backend: serving build files from Express
// 94 - Handling CORS and proxy in development when separating frontend and backend
// 95 - Implementing server-side rendering (SSR) patterns manually with Express




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 75 - RESTful API Conventions in Express.js
// ==============================

// Why follow RESTful conventions?
// - Makes APIs predictable, self-explanatory, and easier for others to use.
// - Consistent naming and status codes help consumers understand and debug your API.

// Resource Naming & Pluralization:
// - Use nouns for resources, not verbs (e.g., /users not /getUsers).
// - Use plural form for collection endpoints (/users, /posts).
// - Use singular with ID for a specific resource (/users/42).
// - Nest resources for relationships (/users/42/posts for posts by a user).

// Use of HTTP Methods:
// - GET    /users        -> list all users
// - POST   /users        -> create a new user
// - GET    /users/:id    -> get a specific user
// - PUT    /users/:id    -> update a user (replace all fields)
// - PATCH  /users/:id    -> update partial fields
// - DELETE /users/:id    -> delete a user

// Use of HTTP Status Codes:
// - 200 OK: Successful GET, PUT, PATCH, or DELETE
// - 201 Created: Resource created (POST)
// - 204 No Content: Successful request with no body (DELETE, PUT)
// - 400 Bad Request: Invalid data/input
// - 401 Unauthorized: Not logged in
// - 403 Forbidden: No permission
// - 404 Not Found: Resource does not exist
// - 409 Conflict: Duplicate or conflicting data
// - 500 Internal Server Error: Server-side error

// -----------
// Example: RESTful User API routes in Express.js
// -----------

const express = require('express');
const app = express();
app.use(express.json());

// Example in-memory "database"
let users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

// GET /users - list all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id - get a specific user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// POST /users - create a new user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const id = users.length + 1;
  users.push({ id, name });
  res.status(201).json({ id, name });
});

// PUT /users/:id - replace a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.name = req.body.name || user.name;
  res.status(200).json(user);
});

// DELETE /users/:id - delete a user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === Number(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(userIndex, 1);
  res.status(204).send(); // No Content
});

app.listen(3000, () => {
  console.log('RESTful API server running on port 3000');
});

/*
  // Additional Notes:
  - Always use plural for top-level resource endpoints (/users, /orders).
  - Choose proper status codes for each operation for clarity and interoperability.
  - Use consistent error response shapes (e.g., { error: "..." }).
  - Don't include actions in endpoint names (e.g., avoid /getUsers, /deleteUser).
  - Support filtering/sorting with query params (/users?sort=name).
*/


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// ==============================
// 76 - Versioning APIs in Express.js
// ==============================

// Why version APIs?
// - Prevents breaking changes for clients when updating APIs.
// - Lets you introduce new features, fix bugs, or deprecate features safely.

// Main versioning strategies:
// 1. URI versioning: Include version in the URL (e.g., /v1/users).
//    - Most common and easiest to discover.
// 2. Header versioning: Specify API version in custom request header (e.g., X-API-Version: 2).
//    - Keeps URLs clean; clients must set headers.
// 3. Media type versioning: Use Accept header with custom media type (e.g., Accept: application/vnd.myapp.v2+json).
//    - More RESTful, but rarely used outside large orgs.

// -----------
// Example 1: URI Versioning
//  GET /v1/users, GET /v2/users
// -----------

const express = require('express');
const app = express();

app.get('/v1/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice V1' }]);
});

app.get('/v2/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice V2', age: 30 }]);
});

// -----------
// Example 2: Header Versioning
//  GET /users  with header: X-API-Version: 1
// -----------

app.get('/users', (req, res) => {
  const version = req.header('X-API-Version');
  if (version === '2') {
    return res.json([{ id: 1, name: 'Alice V2', age: 30 }]);
  } else {
    return res.json([{ id: 1, name: 'Alice V1' }]);
  }
});

// -----------
// Example 3: Media Type Versioning
//  GET /users  with header: Accept: application/vnd.myapp.v2+json
// -----------

app.get('/media-users', (req, res) => {
  const accept = req.header('Accept');
  if (accept === 'application/vnd.myapp.v2+json') {
    return res.json([{ id: 1, name: 'Alice V2', age: 30 }]);
  } else {
    return res.json([{ id: 1, name: 'Alice V1' }]);
  }
});

app.listen(3000, () => {
  console.log('API versioning demo server running on port 3000');
});

/*
  // Additional Notes:
  - URI versioning is most visible and cache-friendly; recommended for most projects.
  - Header and media type versioning require clients to send correct headers.
  - Only add new versions for breaking changes; use backward-compatible updates within the same version.
  - Clearly document all supported versions.
  - Consider deprecating/removing old versions over time.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 77 - Consistent Response Structure in Express.js APIs
// ==============================

// Why use a consistent response structure?
// - Makes it easy for frontend and API consumers to parse responses.
// - Reduces ambiguity: always know where to look for data, errors, or status.
// - Simplifies error handling and success UI in clients.

// Common best practice:
// - Always return a top-level 'success' boolean.
// - Use a 'data' field for the actual payload.
// - Use an 'error' or 'message' field for error information (with error codes if needed).
// - Even for errors, always return the same JSON shape.

// Example success response:
// {
//   "success": true,
//   "data": { ... },
//   "message": "Optional informational message"
// }

// Example error response:
// {
//   "success": false,
//   "error": { "code": "USER_NOT_FOUND", "message": "User not found" },
//   "data": null
// }

// -----------
// Example: Consistent responses in routes and centralized error handler
// -----------

const express = require('express');
const app = express();
app.use(express.json());

// Example in-memory users
const users = [{ id: 1, name: 'Alice' }];

// Utility for standard success response
function success(data, message = '') {
  return { success: true, data, message };
}

// Utility for standard error response
function fail(errorCode, errorMessage, status = 400) {
  return {
    success: false,
    data: null,
    error: { code: errorCode, message: errorMessage },
    status // for internal logging, can omit in real responses
  };
}

// Route: Get user by ID
app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) {
    // Pass error to centralized error handler
    return next({ code: 'USER_NOT_FOUND', message: 'User not found', status: 404 });
  }
  res.json(success(user));
});

// Route: Create user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json(fail('INVALID_INPUT', 'Name is required', 400));
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(success(newUser, 'User created successfully'));
});

// Centralized error handler for consistent error responses
app.use((err, req, res, next) => {
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';
  const status = err.status || 500;
  res.status(status).json(fail(code, message, status));
});

app.listen(3000, () => {
  console.log('Consistent response structure server running on port 3000');
});

/*
  // Additional Notes:
  - Always use the same JSON keys, even for errors.
  - For lists, wrap arrays in 'data': { users: [...] }.
  - This approach helps with validation, error tracking, and frontend integration.
  - You can add fields like 'pagination', 'meta', or 'traceId' as needed for bigger APIs.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// ==============================
// 78 - Pagination Patterns in Express.js APIs
// ==============================

// Why paginate?
// - For performance: prevents overloading server/client with huge datasets.
// - Improves UX by loading data in manageable chunks (pages or infinite scroll).

// Main pagination patterns:
// 1. Limit & Offset Pagination
//    - Client sends ?limit=10&offset=20 (skip first 20, return 10 items).
//    - Easy to implement with SQL/arrays.
//    - Downsides: can result in duplicates/missing items if data changes between requests.

// 2. Cursor-based Pagination
//    - Client sends ?limit=10&cursor=lastId (fetch next 10 after lastId).
//    - More reliable for large, changing datasets.
//    - Requires sortable, unique field (id, timestamp).

// -----------
// Example: In-memory list with both limit/offset and cursor-based pagination
// -----------

const express = require('express');
const app = express();

// Simulate a large array of users
const users = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `User${i + 1}` }));

// 1. Limit & Offset Pagination: GET /users?limit=10&offset=20
app.get('/users', (req, res) => {
  // Parse query params, set defaults
  const limit = Math.max(1, Math.min(Number(req.query.limit) || 10, 50)); // Max limit 50
  const offset = Math.max(0, Number(req.query.offset) || 0);
  const paginated = users.slice(offset, offset + limit);
  res.json({
    success: true,
    data: paginated,
    meta: {
      total: users.length,
      limit,
      offset,
      hasNext: offset + limit < users.length
    }
  });
});

// 2. Cursor-based Pagination: GET /cursor-users?limit=10&cursor=25
app.get('/cursor-users', (req, res) => {
  const limit = Math.max(1, Math.min(Number(req.query.limit) || 10, 50));
  const cursor = Number(req.query.cursor) || 0; // The last ID from previous page, or 0
  // Find start index: after the cursor
  const startIndex = cursor
    ? users.findIndex(u => u.id === cursor) + 1
    : 0;
  const paginated = users.slice(startIndex, startIndex + limit);
  // Find the new cursor (last item's id), or null if no more
  const nextCursor = paginated.length
    ? paginated[paginated.length - 1].id
    : null;
  res.json({
    success: true,
    data: paginated,
    meta: {
      limit,
      nextCursor: nextCursor && startIndex + limit < users.length ? nextCursor : null
    }
  });
});

app.listen(3000, () => {
  console.log('Pagination API demo running on port 3000');
});

/*
  // Additional Notes:
  - Limit/offset is easier for SQL/array but less robust if data changes.
  - Cursor-based is better for performance and consistency in growing/changing lists.
  - Always document your pagination API for frontend/consumers.
  - For real DBs: SQL uses LIMIT/OFFSET, MongoDB uses skip/limit or $gt/$lt for cursors.
  - You can enhance meta: { total, hasNext, nextCursor, prevCursor }.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 79 - Filtering, Sorting, and Search in Express.js APIs
// ==============================

// Why filtering/sorting/search?
// - Allows clients to get only the data they need, in the order they want.
// - Improves efficiency, UX, and reduces bandwidth.

// Common approaches:
// - Use query parameters: /users?name=Alice&minAge=18&sort=name&order=asc&q=al
// - Build dynamic queries on server side (works with in-memory data, SQL, MongoDB, etc.)

// Typical patterns:
// - Filtering: by field values (name=Alice), ranges (minAge, maxAge)
// - Sorting: by any field, ascending/descending (sort=name&order=desc)
// - Search: simple substring match (q=alice), or full-text search

// -----------
// Example: Filtering, sorting, and searching users
// -----------

const express = require('express');
const app = express();

// Simulated user data
const users = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 21 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 28 },
  { id: 5, name: 'Eve', age: 19 }
];

// GET /users?name=Alice&minAge=18&maxAge=30&sort=age&order=desc&q=li
app.get('/users', (req, res) => {
  let result = [...users];

  // --- Filtering by name ---
  if (req.query.name) {
    result = result.filter(u => u.name.toLowerCase() === req.query.name.toLowerCase());
  }

  // --- Filtering by minAge / maxAge ---
  if (req.query.minAge) {
    result = result.filter(u => u.age >= Number(req.query.minAge));
  }
  if (req.query.maxAge) {
    result = result.filter(u => u.age <= Number(req.query.maxAge));
  }

  // --- Simple Search (substring in name) ---
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    result = result.filter(u => u.name.toLowerCase().includes(q));
  }

  // --- Sorting ---
  if (req.query.sort) {
    const field = req.query.sort;
    const order = req.query.order === 'desc' ? -1 : 1;
    result = result.sort((a, b) => {
      if (a[field] < b[field]) return -1 * order;
      if (a[field] > b[field]) return 1 * order;
      return 0;
    });
  }

  res.json({ success: true, data: result, total: result.length });
});

app.listen(3000, () => {
  console.log('Filtering/sorting/search API running on port 3000');
});

/*
  // Additional Notes:
  - For DBs: Translate these patterns into SQL WHERE/ORDER BY or MongoDB find/sort queries.
  - Always validate and sanitize query params to prevent injection attacks.
  - Support pagination with filtering/sorting for big data sets.
  - Advanced: Allow array filters (/users?age=21&age=35), complex conditions, full-text search, etc.
  - Document all supported filters/sort fields for your API consumers.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 80 - API Documentation: Swagger/OpenAPI in Express.js
// ==============================

// Why API documentation?
// - Makes your API discoverable and usable by other developers.
// - Documents endpoints, parameters, responses, and authentication methods.
// - Tools like Swagger UI provide interactive, real-time documentation.

// swagger-jsdoc: Generates OpenAPI (Swagger) spec from JSDoc comments in your code.
// swagger-ui-express: Serves the Swagger UI at a route in your Express app.

// -----------
// Example: Setting up Swagger/OpenAPI docs
// -----------

// npm install swagger-jsdoc swagger-ui-express

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Swagger JSDoc configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users'
    }
  },
  apis: ['./index.js'] // Point to the file with JSDoc comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
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
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = id === 1 ? { id: 1, name: 'Alice' } : id === 2 ? { id: 2, name: 'Bob' } : null;
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(3000, () => {
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});

/*
  // Additional Notes:
  - Add detailed JSDoc comments in your route files for all endpoints.
  - The docs update automatically as you add/change comments.
  - Swagger UI allows users to interact with your API in the browser.
  - You can export your docs as JSON/YAML for other tools (Postman, etc.).
  - See: https://swagger.io/specification/ and https://github.com/Surnet/swagger-jsdoc
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 81 - API Documentation & Testing with Postman
// ==============================

// Why Postman?
// - Postman is a powerful tool for API development, documentation, testing, and collaboration.
// - You can manually or automatically generate documentation, create collections, run tests, and share with your team.

// 1. Creating a Postman Collection:
// - Open Postman and create a new Collection.
// - Add your API requests (GET, POST, etc.) to this Collection, with proper descriptions and example responses.
// - You can import requests from a Swagger/OpenAPI spec or by recording traffic.

// 2. Generating API Documentation in Postman:
// - Postman automatically generates API docs for each Collection.
// - Click the "View Documentation" button in your Collection sidebar.
// - You can publish docs as a public/private URL (Postman Cloud) for others to access (with interactive testing).
// - Export collections as JSON to share or commit to version control.

// 3. Automated Testing with Postman:
// - In each request, go to the "Tests" tab and write test scripts in JavaScript.
// - Common assertions: status code, response body, headers, etc.

// Example: Test Script for a GET /users request in Postman
// pm.test("Status code is 200", function () {
//     pm.response.to.have.status(200);
// });
// pm.test("Response has an array of users", function () {
//     var jsonData = pm.response.json();
//     pm.expect(Array.isArray(jsonData)).to.be.true;
// });

// 4. Running Automated Tests (Collection Runner):
// - Click "Runner" at the top left, select your Collection, and run all tests across all requests.
// - View detailed reports and export results.
// - For CI/CD, use Newman (Postman's CLI) to run tests in automated pipelines.

// Example Newman CLI command:
// npx newman run my_collection.json --reporters cli,html

// 5. Exporting and Serving Docs:
// - Export the Collection and documentation as JSON.
// - You can serve exported JSON on your website, or use Postman public docs URL as interactive documentation.

// -----------
// Example: Express.js route for serving exported Postman Collection JSON
// -----------

// Assuming you exported 'my_collection.json' from Postman and placed in your project directory

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/postman-docs', (req, res) => {
  fs.readFile('./my_collection.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Documentation not found');
    res.type('application/json').send(data);
  });
});

app.listen(3000, () => {
  console.log('Postman docs served at http://localhost:3000/postman-docs');
});

/*
  // Additional Notes:
  - Postman docs are great for teams and non-developers—interactive, always up to date.
  - Automated tests catch regressions before deploying to production.
  - Newman enables automated API testing in CI/CD (GitHub Actions, GitLab CI, Jenkins, etc.).
  - Combine with Swagger/OpenAPI for best-of-both-worlds documentation and testing!
  - See: https://learning.postman.com/docs/
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// ==============================
// 82 - HATEOAS Principles and Including Links in Responses (Express.js)
// ==============================

// What is HATEOAS?
// - Stands for "Hypermedia As The Engine Of Application State".
// - It's a REST principle: clients interact with the application entirely through hypermedia (links) provided dynamically by the server.
// - Each response includes links to related actions/resources, guiding clients through the API without needing hardcoded endpoint knowledge.

// Why use HATEOAS?
// - Self-describing APIs: clients can discover available actions programmatically.
// - Reduces client-server coupling and improves evolvability of APIs.

// How to implement?
// - Add a "links" (or "_links") property to resource responses.
// - Each link includes a "rel" (relation type), "href" (URL), and optionally "method".

// -----------
// Example: Including HATEOAS links in user resource responses
// -----------

const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Helper to generate links for a user
function userLinks(id) {
  return [
    { rel: 'self', href: `/users/${id}`, method: 'GET' },
    { rel: 'update', href: `/users/${id}`, method: 'PUT' },
    { rel: 'delete', href: `/users/${id}`, method: 'DELETE' },
    { rel: 'all', href: `/users`, method: 'GET' }
  ];
}

// GET /users/:id - Return user with HATEOAS links
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    success: true,
    data: user,
    links: userLinks(id)
  });
});

// GET /users - List users, each with HATEOAS links
app.get('/users', (req, res) => {
  const response = users.map(u => ({
    ...u,
    links: userLinks(u.id)
  }));
  res.json({
    success: true,
    data: response,
    links: [
      { rel: 'create', href: '/users', method: 'POST' }
    ]
  });
});

app.listen(3000, () => {
  console.log('HATEOAS API server running on port 3000');
});

/*
  // Additional Notes:
  - The "rel" field describes the link's relationship (self, next, update, delete, etc.).
  - For POST, PUT, DELETE actions, document the required body and response format in your API docs.
  - For advanced APIs, include pagination and resource relationship links (next, prev, parent, children, etc.).
  - See also: https://restfulapi.net/hateoas/
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// ==============================
// 83 - Rate Limiting Specific Endpoints in Express.js
// ==============================

// Why rate limiting?
// - Prevents abuse (e.g., brute-force attacks, spam, excessive API use).
// - Protects server resources and ensures fair use for all users.

// Common approaches:
// - Apply rate limiting globally (to all routes).
// - Apply granular rate limiting (to specific routes or users).

// Popular package: express-rate-limit
// - Allows per-route configuration.
// - Supports custom key generation for per-user or per-IP limiting.

// -----------
// Example: Granular rate limiting per route and per user
// -----------

// npm install express-rate-limit

const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// 1. Global rate limit (e.g., 100 requests per 15 min per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests, try later.' } }
});
app.use(globalLimiter); // Uncomment to apply globally

// 2. Rate limit only on /login (stricter: 5 per 10 min per IP)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many login attempts, try again later.' } }
});
app.post('/login', loginLimiter, (req, res) => {
  // Handle login logic here
  res.json({ success: true, message: 'Login attempt processed' });
});

// 3. Per-user rate limiting (e.g., 10 requests per min per user)
const userLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  keyGenerator: (req) => req.header('x-user-id') || req.ip, // Use user ID header or fallback to IP
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'User rate limit exceeded.' } }
});
app.get('/api/data', userLimiter, (req, res) => {
  res.json({ success: true, data: 'This is rate-limited per user.' });
});

app.listen(3000, () => {
  console.log('Rate limiting demo server running on port 3000');
});

/*
  // Additional Notes:
  - Apply different rate limits on different endpoints for flexibility (e.g., /login stricter than /home).
  - Per-user limiting requires client to send a user identifier (e.g., user ID, API key, JWT).
  - You can customize the keyGenerator for any per-user or per-app logic.
  - express-rate-limit supports Redis/Memcached for distributed environments via store option.
  - Document your rate limits for API consumers!
  - See: https://github.com/express-rate-limit/express-rate-limit
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////