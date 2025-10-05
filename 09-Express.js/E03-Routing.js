// 🔁 ROUTING & ROUTER
// 21 - Using express.Router() to create modular routes
// 22 - Route grouping and mounting routers: app.use('/api/users', userRouter)
// 23 - Router-level middleware and cascading routes
// 24 - Route chaining and method chaining: .route(), .get().post().put()
// 25 - Wildcard routes and fall-through: '*', 404 handling
// 26 - Parameterized routes and validation with router.param()



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 21 - Using express.Router() to create modular routes
//    - express.Router() is a class that helps organize routes into modular, mountable route handlers.
//    - Useful for splitting routes by feature, resource, or functionality (e.g., userRoutes, productRoutes).
//    - Promotes cleaner and more maintainable code by grouping related endpoints.

//    // Example: Creating and using a router
const express = require('express');
const app = express();
const userRouter = express.Router();

// Define user-related routes on userRouter
userRouter.get('/', (req, res) => {
  res.send('Get all users');
});

userRouter.post('/', (req, res) => {
  res.send('Create a user');
});

userRouter.get('/:id', (req, res) => {
  res.send(`Get user with id ${req.params.id}`);
});

// Mount userRouter at /users
app.use('/users', userRouter);

//    - Now, requests to /users, /users/:id, etc., are handled by userRouter.
//    - Can create multiple routers for different resources (products, orders, etc.).
//    - Routers can have their own middleware, making them highly modular and reusable.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 22 - Route grouping and mounting routers: app.use('/api/users', userRouter)
//    - Group related routes using routers and mount them at a common path prefix for better organization and modularity.
//    - app.use(<mountPath>, <router>) mounts all routes defined in the router under the given path.

//    // Example: Define a user router
const express = require('express');
const app = express();
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Get all users');
});

userRouter.post('/', (req, res) => {
  res.send('Create a user');
});

//    - Mount the user router under /api/users
app.use('/api/users', userRouter);

//    - Now, these routes are accessible as:
//        GET  /api/users        → Get all users
//        POST /api/users        → Create a user

//    - You can create and mount other routers similarly (e.g., app.use('/api/products', productRouter)).
//    - This promotes modular code and helps scale your API as your app grows.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 23 - Router-level middleware and cascading routes
//    - Router-level middleware is applied to specific routers using router.use().
//    - Only affects routes handled by that router, enabling modular, feature-specific middleware (e.g., auth, logging).
//    - Multiple middleware can be chained/cascaded, running in sequence before route handlers.

//    // Example: Router-level middleware
const express = require('express');
const app = express();
const userRouter = express.Router();

// Router-level middleware: logs every request to userRouter
userRouter.use((req, res, next) => {
  console.log(`UserRouter: ${req.method} ${req.originalUrl}`);
  next();
});

// Additional middleware example: auth check (placeholder)
userRouter.use((req, res, next) => {
  // if (authenticated) next();
  // else res.status(401).send('Unauthorized');
  next(); // For demo purposes, always continue
});

// Cascading route handlers: multiple middleware + route logic
userRouter.get('/:id', 
  (req, res, next) => {
    // Middleware 1 for /users/:id
    req.userData = { id: req.params.id, role: 'member' };
    next();
  }, 
  (req, res) => {
    // Final handler for /users/:id
    res.json({ user: req.userData });
  }
);

// Mount the userRouter
app.use('/users', userRouter);

//    - Middleware and handlers are executed in the order defined.
//    - Cascading allows for flexible, layered request processing (e.g., validation → authentication → handler).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 24 - Route chaining and method chaining: .route(), .get().post().put()
//    - Express allows chaining multiple HTTP methods for the same path using .route().
//    - Useful for keeping related handlers together and avoiding repetition.

//    // Example: Route chaining with .route()
const express = require('express');
const app = express();

app.route('/users/:id')
  .get((req, res) => {
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
  });

//    - You can also chain methods directly on a router
const userRouter = express.Router();

userRouter.route('/')
  .get((req, res) => {
    res.send('Get all users');
  })
  .post((req, res) => {
    res.send('Create a new user');
  });

//    - Mount the router
app.use('/users', userRouter);

//    - Route chaining keeps code DRY, readable, and organized for similar endpoints.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 25 - Wildcard routes and fall-through: '*', 404 handling
//    - Wildcard routes (using '*' or similar patterns) match any request that hasn't been matched by previous routes.
//    - Commonly used for 404 Not Found handling or serving SPA index.html in frontend apps.
//    - Should be defined at the end, after all other routes, to avoid overriding specific routes.

//    // Example: Basic 404 handler using wildcard route
const express = require('express');
const app = express();

// ... (your other routes go here)

// Wildcard route for 404 handling (must be last)
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

//    - Alternatively, use a middleware function (for more control or custom pages):
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

//    - For frontend SPAs (React, Angular, Vue), you might serve index.html instead:
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//    - Always put wildcard/404 handlers at the end of your route definitions to ensure fall-through works correctly.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 26 - Parameterized routes and validation with router.param()
//    - Express allows you to handle and validate route parameters with router.param().
//    - router.param(<paramName>, callback) is called whenever the specified parameter is present in the route.
//    - Useful for loading resources, validation, and pre-processing route params.

//    // Example: Using router.param() for validation and resource loading
const express = require('express');
const app = express();
const userRouter = express.Router();

// Param middleware: runs for any route with :userId
userRouter.param('userId', (req, res, next, userId) => {
  // Example: Validate userId is numeric
  if (!/^\d+$/.test(userId)) {
    return res.status(400).send('Invalid userId');
  }
  // Optionally, fetch user data from DB and attach to req
  req.user = { id: userId, name: 'Demo User' }; // Simulated DB fetch
  next();
});

// Route with parameter :userId
userRouter.get('/:userId', (req, res) => {
  res.json({ message: 'User found', user: req.user });
});

// Mount router
app.use('/users', userRouter);

//    - router.param() runs before any route handler where the param appears in the path.
//    - Can be used for authentication, type checks, or resource fetching to DRY up your code.
//    - Multiple param middleware can be registered for different parameters.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// res.redirect 
//    - The response (res) object in Express provides methods to redirect the client to a different URL.
//    - Example:
app.get('/redirect', (req, res) => {
  res.redirect('/');
});


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