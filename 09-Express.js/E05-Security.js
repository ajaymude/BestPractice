
// 🗄 DATABASE INTEGRATION
// 47 - Connecting Express to MongoDB using Mongoose: schema definitions, models, connections
// 48 - CRUD operations with Mongoose: create, read, update, delete documents
// 49 - Data validation and schema hooks (pre, post)
// 50 - MongoDB indexing and query optimization in Express routes
// 51 - Integrating PostgreSQL with pg or Sequelize: defining models, migrations, associations
// 52 - Using MySQL with mysql2 or Sequelize ORM: connection pooling, query parameterization
// 53 - Redis for caching and session store: setting up ioredis or redis client, caching responses
// 54 - Handling database errors: duplicate keys, validation errors, connection timeouts

// 🗂 STRUCTURING LARGE APPS
// 55 - MVC pattern in Express: separating routes, controllers, models, services
// 56 - Service layer vs controller layer: abstracting business logic from route handlers
// 57 - Dependency injection patterns: using awilix or InversifyJS in Express
// 58 - Organizing configuration: config files (dotenv, config package), environment-based config
// 59 - Using index.js in folders to re-export modules for cleaner imports
// 60 - Code splitting: separating route files by feature/domain, lazy-loading routers

// 🔒 SECURITY BEST PRACTICES
// 61 - Securing HTTP headers with helmet: configuring CSP, X-Frame-Options, HSTS, XSS protection
// 62 - Enabling CORS securely: configuring allowed origins, methods, credentials
// 63 - Input validation and sanitization: express-validator or Joi/celebrate for validating req.body, req.params
// 64 - Preventing NoSQL injection and SQL injection: parameterized queries, mongoose query sanitization
// 65 - Rate limiting: express-rate-limit to throttle requests, protection against brute-force attacks
// 66 - Sanitizing user input to prevent XSS: escape output in templates, using DOMPurify for HTML content
// 67 - HTTPS enforcement: redirect HTTP to HTTPS, trust proxy configuration behind load balancer
// 68 - Secure cookie attributes: HttpOnly, Secure, SameSite settings for session cookies

// ⚙ MIDDLEWARE PATTERNS & UTILITIES
// 69 - Logging middleware: morgan for request logging, rotating-file-stream for log rotation
// 70 - Compression middleware: compression package for gzip/deflate compression
// 71 - Caching middleware: setting Cache-Control headers, using apicache or express-redis-cache
// 72 - Proxy and load balancer integration: trust proxy setting, X-Forwarded-* headers handling
// 73 - CSRF protection: csurf middleware setup, synchronizer token pattern
// 74 - Error-handling patterns: centralized error handler, custom error classes, error codes



//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 47 - Connecting Express to MongoDB using Mongoose: schema definitions, models, connections
//    - Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
//    - Helps define schemas, create models, and manage data relationships in MongoDB.
//    - Integrates easily with Express for full-stack development.

//    1️⃣ Install dependencies
//        - $ npm install mongoose

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//    2️⃣ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//    3️⃣ Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  age:      { type: Number }
});

const User = mongoose.model('User', userSchema);

//    4️⃣ Using the model in routes (CRUD example)
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//    - Define a schema for each resource/collection (User, Product, etc.).
//    - Models are used for interacting with MongoDB collections (CRUD).
//    - Always handle errors (connection, validation, duplicate keys, etc.).
//    - Mongoose provides validation, middleware (hooks), and query helpers.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 48 - CRUD operations with Mongoose: create, read, update, delete documents
//    - Mongoose provides methods for performing CRUD (Create, Read, Update, Delete) on MongoDB documents.

//    1️⃣ Create (save a new document)
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);  // User model from previous topic
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//    2️⃣ Read (find documents)
app.get('/users', async (req, res) => {
  const users = await User.find(); // All users
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // By ID
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//    3️⃣ Update (modify existing document)
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//    4️⃣ Delete (remove document)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//    - Always validate input and handle errors (not found, validation, etc.).
//    - Mongoose methods: .save(), .find(), .findById(), .findByIdAndUpdate(), .findByIdAndDelete(), etc.
//    - CRUD patterns apply for all collections/models in your app.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 49 - Data validation and schema hooks (pre, post)
//    - Mongoose provides built-in validation for schema fields (type, required, min, max, match, etc.).
//    - Schema hooks (middleware) let you run logic before or after certain model events (save, update, remove).

//    1️⃣ Data validation in schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/    // Valid email format
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  }
});

//    2️⃣ Schema hooks (middleware)
//        - pre: Run before a certain operation (e.g., 'save', 'remove', 'update')
//        - post: Run after an operation completes

// Pre-save hook example: hash password before saving (pseudo code)
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // this.password = await hashPassword(this.password);
  }
  next();
});

// Post-save hook example: log after user is saved
userSchema.post('save', function(doc) {
  console.log('User saved:', doc.username);
});

//    3️⃣ Using validation and hooks
const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(); // Triggers validation and hooks
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//    - Validation is automatic on .save(), .create(), .findOneAndUpdate() (if runValidators: true).
//    - Hooks are powerful for enforcing business logic, auditing, etc.
//    - You can add custom validation with validate: { validator: fn, message: str }

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 50 - MongoDB indexing and query optimization in Express routes
//    - Indexes in MongoDB improve the speed of queries on large collections.
//    - Use indexes for frequently searched, sorted, or unique fields (e.g., email, username).
//    - Mongoose lets you define indexes in schemas or create them manually.

//    1️⃣ Defining indexes in Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email:    { type: String, required: true, unique: true, index: true },
  age:      { type: Number }
});

//    - Or add index after schema definition:
userSchema.index({ age: 1 }); // Index on age (ascending)

//    2️⃣ Query optimization in Express routes
//        - Use indexed fields in queries/filters for best performance
app.get('/users/by-email/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email }); // email should be indexed!
  res.json(user);
});

//    - Use projections to fetch only required fields
app.get('/users/projection/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('username email'); // only username & email
  res.json(user);
});

//    - Use pagination and limits for large result sets
app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(users);
});

//    3️⃣ Checking and managing indexes
//        - Check indexes in MongoDB shell: db.users.getIndexes()
//        - Create custom indexes if needed (ensureIndex(), createIndex())

//    - Always index fields used in search, filtering, and sorting.
//    - Avoid unindexed queries on large collections to prevent performance issues.
//    - Monitor query performance using MongoDB Atlas or explain().
//    - Use compound indexes for multi-field search/sort scenarios.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 51 - Integrating PostgreSQL with pg or Sequelize: defining models, migrations, associations
//    - PostgreSQL is a popular relational database; you can connect using 'pg' (raw driver) or Sequelize (ORM).
//    - Sequelize simplifies model definitions, migrations, and associations (relations between tables).

//    1️⃣ Setup: Install dependencies
//        - $ npm install pg sequelize sequelize-cli

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://username:password@localhost:5432/mydb');

//    2️⃣ Defining models with Sequelize
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true },
  age:      { type: DataTypes.INTEGER }
});

//    3️⃣ Associations (relations)
//        - Example: One-to-Many (User hasMany Posts)
const Post = sequelize.define('Post', {
  title:   { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT }
});

User.hasMany(Post);
Post.belongsTo(User);

//    4️⃣ Migrations (schema changes)
//        - Use Sequelize CLI for migrations: $ npx sequelize-cli init
//        - Generates /migrations and /models folders
//        - Example migration (creates Users table):
/*
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id:       { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email:    { type: Sequelize.STRING, allowNull: false, unique: true },
      age:      { type: Sequelize.INTEGER },
      createdAt:{ type: Sequelize.DATE },
      updatedAt:{ type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
*/

//    5️⃣ Sync models or run migrations
//        - sequelize.sync() to create tables based on models (development)
//        - sequelize-cli db:migrate for migrations (production-ready)

//    6️⃣ Using models in Express routes
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Post });
  res.json(users);
});

//    - Sequelize supports validations, hooks, transactions, and eager/lazy loading of associations.
//    - Always handle DB errors and use migrations for production apps.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// 52 - Using MySQL with mysql2 or Sequelize ORM: connection pooling, query parameterization
//    - MySQL is a popular relational DB; use 'mysql2' for direct queries or Sequelize ORM for higher-level abstraction.
//    - Connection pooling improves performance by reusing DB connections.
//    - Query parameterization helps prevent SQL injection.

//    1️⃣ Using mysql2 for direct queries & pooling
//        - $ npm install mysql2

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,   // Number of connections in pool
  queueLimit: 0
});

// Query with parameterization (safe from SQL injection)
pool.query(
  'SELECT * FROM users WHERE email = ?',
  ['ajay@example.com'],
  (err, results) => {
    if (err) throw err;
    console.log(results);
  }
);

//    2️⃣ Using Sequelize with MySQL
//        - $ npm install sequelize mysql2

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mydb', 'youruser', 'yourpassword', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Define a model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email:    { type: DataTypes.STRING, allowNull: false, unique: true }
});

// Using parameterized queries (with Sequelize, this is default)
app.get('/users/:email', async (req, res) => {
  const user = await User.findOne({ where: { email: req.params.email } });
  res.json(user);
});

//    - Sequelize handles parameterization and pooling automatically.
//    - Always use parameterized queries to avoid SQL injection risks.
//    - Pooling is critical for high-traffic apps—adjust pool settings based on workload.
//    - Handle errors in queries and connection failures gracefully.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// 53 - Redis for caching and session store: setting up ioredis or redis client, caching responses
//    - Redis is a fast, in-memory key-value store, used for caching and as a session store in Express apps.
//    - Libraries: 'redis' (official client) or 'ioredis' (advanced features).
//    - Caching improves performance by storing frequent responses/data in memory.
//    - Can be used as a scalable session store with connect-redis.

//    1️⃣ Install Redis client library
//        - $ npm install redis
const redis = require('redis');
const client = redis.createClient();

//    2️⃣ Basic Redis commands (promises)
client.connect()
  .then(() => console.log('Redis connected'))
  .catch(err => console.error('Redis connection error:', err));

//    Set a key-value pair with optional expiry (seconds)
await client.set('greeting', 'Hello, Redis!', { EX: 3600 }); // expires in 1 hour

//    Get a value
const value = await client.get('greeting');
console.log(value);

//    3️⃣ Caching API responses (example middleware)
async function cache(req, res, next) {
  const key = req.originalUrl;
  const cached = await client.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  // Save original res.json to cache result after sending
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    client.set(key, JSON.stringify(body), { EX: 60 }); // cache for 1 min
    originalJson(body);
  };
  next();
}

app.get('/expensive-data', cache, async (req, res) => {
  // Simulate data fetching
  const data = { result: 'expensive calculation' };
  res.json(data);
});

//    4️⃣ Using Redis as a session store
//        - $ npm install connect-redis express-session
/*
const session = require('express-session');
const RedisStore = require('connect-redis').default;

app.use(session({
  store: new RedisStore({ client }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
*/

//    - Redis is widely used for rate limiting, caching, real-time pub/sub, and session management.
//    - Always handle Redis connection errors and set appropriate TTLs for cached data.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 54 - Handling database errors: duplicate keys, validation errors, connection timeouts
//    - Robust error handling is essential for reliable apps and user-friendly error messages.
//    - Common DB errors: duplicate key (unique constraint), validation errors, and connection issues/timeouts.

//    1️⃣ Duplicate key error (e.g., MongoDB, SQL unique constraint)
//        - Occurs when inserting/updating with a duplicate value in a unique field (email, username, etc.).
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error code
      res.status(409).json({ message: 'Duplicate key error: Email already exists' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

//    2️⃣ Validation errors
//        - Occurs when data does not meet schema/model validation rules (required, min, max, pattern, etc.).
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

//    3️⃣ Connection timeouts / DB unavailable
//        - Occurs when DB is unreachable or network is slow.
//        - Always handle with a fallback or user-friendly error.
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => {
    console.error('DB connection error:', err.message);
    // Optionally notify user/admin or retry
  });

//    - For SQL DBs, check error codes (e.g., ER_DUP_ENTRY for MySQL) and use try/catch for async/await.
//    - Log errors for debugging and monitoring.
//    - Never expose raw error details to end users—send user-friendly messages instead.
//    - Use error-handling middleware for centralized error management in Express.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 55 - MVC pattern in Express: separating routes, controllers, models, services
//    - MVC (Model-View-Controller) is a design pattern that organizes code for maintainability and scalability.
//    - Common in Express apps for clear separation of concerns.

//    1️⃣ Models
//        - Represent the data and business logic (database schemas, ORM models).
//        - Example: Mongoose or Sequelize model for User, Product, etc.

//    2️⃣ Views (optional for APIs, used for server-rendered apps)
//        - Templates for rendering HTML (EJS, Pug, Handlebars).
//        - Not always present in API-only projects.

//    3️⃣ Controllers
//        - Handle incoming requests, interact with models, and send responses.
//        - Contain business logic for each endpoint.

//    4️⃣ Services (optional but recommended for larger apps)
//        - Encapsulate complex business logic or data manipulation separate from controllers.
//        - Useful for reusing logic (e.g., payment processing, notification sending).

//    5️⃣ Folder structure example
/*
my-express-app/
├── app.js
├── routes/
│     └── userRoutes.js       // Route definitions
├── controllers/
│     └── userController.js   // Request handling logic
├── models/
│     └── userModel.js        // Data model/schema
├── services/
│     └── userService.js      // Business logic/services
├── views/                    // Optional: for templates
*/

//    6️⃣ Sample code organization
//    - Route definition (routes/userRoutes.js)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;

//    - Controller (controllers/userController.js)
const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  const users = await userService.fetchAllUsers();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

//    - Service (services/userService.js)
const User = require('../models/userModel');

exports.fetchAllUsers = () => User.find();
exports.createUser = (data) => User.create(data);

//    - Model (models/userModel.js)
//        - Mongoose/Sequelize schema definition here

//    - Benefits:
//        - Clear code structure and separation of concerns
//        - Easier to maintain, scale, and test
//        - Encourages reusable logic (especially with services)


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 56 - Service layer vs controller layer: abstracting business logic from route handlers
//    - Controller layer handles HTTP requests/responses (input, output, status codes).
//    - Service layer encapsulates core business logic, data processing, and external integrations.
//    - Separation keeps controllers clean and focused, and makes business logic reusable/testable.

//    1️⃣ Controller layer
//        - Receives HTTP request, calls service methods, handles responses and errors
//        - Example:
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);  // Delegate to service
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//    2️⃣ Service layer
//        - Contains reusable business logic (e.g., DB queries, validations, complex workflows)
//        - Keeps controllers DRY and focused on request/response
//        - Example:
const User = require('../models/userModel');

exports.createUser = async (data) => {
  // Business rules: check for existing user, hash password, send welcome email, etc.
  if (await User.exists({ email: data.email })) {
    throw new Error('Email already registered');
  }
  // Optionally hash password here
  // data.password = await hashPassword(data.password);
  return User.create(data);
};

//    3️⃣ Benefits of service layer
//        - Promotes code reuse (same logic used by different controllers/routes)
//        - Easier unit testing (test business logic without Express/http layer)
//        - Simplifies future changes (update business logic in one place)
//        - Clean separation between HTTP layer and app logic

//    - In summary:
//        - Controllers: Handle HTTP, delegate to services, respond to client
//        - Services: Contain business logic, work with data/models, reusable across app

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 57 - Dependency injection patterns: using awilix or InversifyJS in Express
//    - Dependency Injection (DI) is a pattern for supplying a component’s dependencies from outside, improving testability and modularity.
//    - In Express apps, DI is useful for managing services, repositories, configs, and improving decoupling.
//    - Popular DI containers for Node.js: awilix, InversifyJS

//    1️⃣ Using Awilix for DI
//        - $ npm install awilix awilix-express
const express = require('express');
const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest, makeInvoker } = require('awilix-express');
const app = express();

// Create the container and register dependencies
const container = createContainer();
container.register({
  userService: asClass(require('./services/userService')).scoped(),
  userController: asFunction(require('./controllers/userController')).scoped()
});

// Middleware to scope DI per request
app.use(scopePerRequest(container));

// Use invoker to inject dependencies into controller
const api = makeInvoker((cradle) => cradle.userController);

app.get('/users', api('getAllUsers'));

//    2️⃣ Using InversifyJS for DI
//        - $ npm install inversify reflect-metadata
//        - Enable "experimentalDecorators" and "emitDecoratorMetadata" in tsconfig.json (TypeScript)
//        - Example:
const { Container, injectable, inject } = require('inversify');

@injectable()
class UserService {
  //...
}

@injectable()
class UserController {
  constructor(@inject('UserService') userService) {
    this.userService = userService;
  }
  getAllUsers(req, res) {
    // ...
  }
}

const container = new Container();
container.bind('UserService').to(UserService);
container.bind('UserController').to(UserController);

//    3️⃣ Benefits of DI
//        - Makes code modular and testable (swap/mock dependencies easily)
//        - Avoids tight coupling between modules (easy refactoring)
//        - Facilitates complex app composition (microservices, plugins, etc.)

//    - In summary:
//        - Use DI containers to register, manage, and inject dependencies (services, controllers, configs) in Express apps
//        - Prefer DI for large-scale, enterprise, or highly testable projects
//        - Both awilix and InversifyJS are widely adopted for Node.js DI

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// 58 - Organizing configuration: config files (dotenv, config package), environment-based config
//    - Managing configuration separately from code keeps apps flexible, secure, and environment-aware.
//    - Common patterns: .env files (dotenv) for secrets, config package for structured configs, NODE_ENV for env selection.

//    1️⃣ dotenv for environment variables
//        - Store secrets, DB URLs, API keys, etc., in a .env file
//        - $ npm install dotenv
//        - Example .env:
/*
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
SECRET_KEY=supersecret
NODE_ENV=development
*/
require('dotenv').config();  // Load .env variables into process.env

const port = process.env.PORT;

//    2️⃣ config package for structured config
//        - $ npm install config
//        - Store configs in /config folder: default.json, development.json, production.json, etc.
//        - Example /config/default.json:
/*
{
  "db": {
    "url": "mongodb://localhost:27017/mydb"
  },
  "jwtSecret": "supersecret"
}
*/
const config = require('config');
const dbUrl = config.get('db.url');

//    3️⃣ Environment-based configuration
//        - Use NODE_ENV to control environment selection (development, production, test, etc.)
//        - The config package loads the correct config based on NODE_ENV
//        - You can override .env values with environment variables (good for Docker, CI/CD, cloud)

//    4️⃣ Best practices
//        - Never commit .env or secrets to version control (add to .gitignore)
//        - Use environment variables for sensitive/overridable config (DB URLs, API keys)
//        - Use config package for complex/nested/static app settings (feature toggles, API endpoints)
//        - Document expected env vars and config keys for teammates

//    - Separating config allows easy switching between dev, test, staging, prod environments with minimal code change.
//    - Encourages 12-factor app principles for cloud-native development.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 59 - Using index.js in folders to re-export modules for cleaner imports
//    - In Node.js/Express apps, using index.js files in folders helps centralize exports, simplifying and shortening import statements.
//    - Especially helpful in controllers, models, routes, or services directories.

//    1️⃣ Folder structure example:
/*
my-express-app/
├── controllers/
│     ├── userController.js
│     ├── authController.js
│     └── index.js
*/

//    2️⃣ index.js content (re-exporting modules)
//        - Export all controllers from one place
module.exports = {
  userController: require('./userController'),
  authController: require('./authController')
};

//    3️⃣ Cleaner imports elsewhere
//        - Instead of:
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//        - Use:
const { userController, authController } = require('../controllers');

//    4️⃣ Benefits:
//        - Keeps import statements concise and organized
//        - Makes it easier to add/remove modules (just update index.js)
//        - Improves code maintainability and readability in large projects
//        - Works for any directory (routes, models, services, etc.)

//    - Best practice: Always add new modules to index.js to keep imports centralized.
//    - Great for scaling up codebases and keeping code DRY.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 60 - Code splitting: separating route files by feature/domain, lazy-loading routers
//    - Code splitting improves maintainability and scalability by separating route files based on features/domains.
//    - Lazy-loading routers means requiring/mounting routers only when needed (useful for large or modular apps).

//    1️⃣ Separating route files by feature/domain
//        - Organize routes in folders/files by resource (users, products, auth, etc.)
/*
my-express-app/
├── routes/
│     ├── userRoutes.js
│     ├── productRoutes.js
│     ├── authRoutes.js
│     └── index.js
*/

//        - Example: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createUser);

module.exports = router;

//        - Example: routes/index.js (aggregator)
module.exports = {
  userRoutes: require('./userRoutes'),
  productRoutes: require('./productRoutes'),
  authRoutes: require('./authRoutes')
};

//        - Main app.js: import and mount grouped routers
const express = require('express');
const app = express();
const { userRoutes, productRoutes, authRoutes } = require('./routes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

//    2️⃣ Lazy-loading routers (optional, for very large or modular apps)
//        - Only require routers/routes when specific endpoints are hit
//        - Example:
app.use('/admin', (req, res, next) => {
  // Dynamically require the admin router
  require('./routes/adminRoutes')(req, res, next);
});

//        - Or, with ES modules and dynamic import (future):
/*
app.use('/admin', async (req, res, next) => {
  const adminRouter = await import('./routes/adminRoutes.js');
  adminRouter.default(req, res, next);
});
*/

//    - Code splitting keeps codebase organized as features grow
//    - Helps teams work in parallel and makes debugging easier
//    - Lazy-loading is advanced: mainly for modular plugins, microservices, or huge codebases

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 61 - Securing HTTP headers with helmet: configuring CSP, X-Frame-Options, HSTS, XSS protection
//    - Helmet is Express middleware that secures apps by setting HTTP headers against common web vulnerabilities.
//    - Provides easy configuration for CSP, X-Frame-Options, HSTS, XSS protection, etc.

//    1️⃣ Install and use helmet
//        - $ npm install helmet
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet()); // Enables default security headers

//    2️⃣ Configuring Content Security Policy (CSP)
//        - CSP helps prevent XSS by restricting resources (scripts, styles, etc.) allowed to load
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.example.com"],
      styleSrc: ["'self'", "cdn.example.com"],
      imgSrc: ["'self'", "images.example.com"],
      // Add more as needed
    },
  })
);

//    3️⃣ X-Frame-Options (clickjacking protection)
//        - Prevents your site from being framed/embedded elsewhere
app.use(helmet.frameguard({ action: 'deny' })); // 'deny' or 'sameorigin'

//    4️⃣ HSTS (Strict-Transport-Security)
//        - Forces clients to use HTTPS, prevents downgrade attacks
app.use(
  helmet.hsts({
    maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  })
);

//    5️⃣ XSS Protection and other headers
//        - Helmet sets X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, and more by default

//    - Always place helmet as early as possible in your middleware stack.
//    - Customize headers as needed for your app's requirements.
//    - For maximum security, audit your CSP, header settings, and keep dependencies up to date.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 62 - Enabling CORS securely: configuring allowed origins, methods, credentials
//    - CORS (Cross-Origin Resource Sharing) enables or restricts resources to be requested from another domain.
//    - Use the cors middleware to configure CORS rules securely for your Express API.

//    1️⃣ Install and import cors
//        - $ npm install cors
const express = require('express');
const cors = require('cors');
const app = express();

//    2️⃣ Basic usage (allow all origins - not recommended for production)
app.use(cors());

//    3️⃣ Restricting to specific origins
const allowedOrigins = ['https://yourdomain.com', 'https://admin.yourdomain.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

//    4️⃣ Configuring allowed methods and credentials
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies/authorization headers
}));

//    5️⃣ Preflight OPTIONS requests
//        - Some browsers send an OPTIONS request before real request to check CORS policy
app.options('*', cors());

//    6️⃣ Best practices
//        - Always restrict allowed origins in production
//        - Only allow necessary methods (GET, POST, etc.)
//        - Enable credentials only if required (for cookies/auth headers)
//        - Use HTTPS in production for secure CORS

//    - CORS is essential for SPAs and APIs used across different domains.
//    - Misconfigured CORS can expose your API to security risks—always audit your settings.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// 63 - Input validation and sanitization: express-validator or Joi/celebrate for validating req.body, req.params
//    - Input validation ensures that incoming data meets required formats, lengths, and constraints.
//    - Sanitization helps remove harmful content (like script tags) and prevent injection attacks.
//    - Use express-validator (middleware) or Joi (schema-based, often with celebrate).

//    1️⃣ Using express-validator (middleware-based)
//        - $ npm install express-validator
const { body, param, validationResult } = require('express-validator');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Proceed with validated & sanitized data
    res.send('Registered!');
  }
);

//    2️⃣ Validating route params or query strings
app.get('/user/:id',
  param('id').isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(`User ID is valid: ${req.params.id}`);
  }
);

//    3️⃣ Using Joi with celebrate (schema-based, robust)
//        - $ npm install joi celebrate
const { celebrate, Joi, errors } = require('celebrate');

app.post('/login', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}), (req, res) => {
  res.send('Login data is valid!');
});

app.use(errors()); // celebrate error handler

//    - Always validate and sanitize input from req.body, req.params, req.query.
//    - Helps prevent security vulnerabilities and improves data integrity.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 64 - Preventing NoSQL injection and SQL injection: parameterized queries, mongoose query sanitization
//    - Injection attacks exploit unsanitized user input to manipulate database queries (SQL or NoSQL).
//    - Always sanitize input and use safe query patterns to prevent security vulnerabilities.

//    1️⃣ SQL injection prevention (MySQL/Postgres/SQL):
//        - Use parameterized/prepared statements instead of string concatenation
const mysql = require('mysql2');
const pool = mysql.createPool({ /* config */ });

// BAD (unsafe): user input directly in query
// const user = req.query.username;
// pool.query(`SELECT * FROM users WHERE username = '${user}'`);

// GOOD (safe): parameterized query
pool.query(
  'SELECT * FROM users WHERE username = ?',
  [req.query.username],
  (err, results) => { /* ... */ }
);

//    - Sequelize ORM and other modern ORMs use parameterized queries by default.

//    2️⃣ NoSQL injection prevention (MongoDB/Mongoose):
//        - Avoid passing user input directly to query selectors or operators
// BAD (unsafe): { "$gt": "" } can be exploited
// User.find({ age: req.query.age });

// GOOD (safe): Validate and sanitize input
const age = Number(req.query.age);
if (!isNaN(age)) {
  User.find({ age });
}

//        - Use mongoose options like strictQuery, and input validation packages

//    3️⃣ Use input validation and sanitization libraries
//        - express-validator, Joi, celebrate, or custom checks

//    4️⃣ Mongoose query sanitization
//        - Use 'express-mongo-sanitize' to strip out dangerous MongoDB operators from user input
//        - $ npm install express-mongo-sanitize
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

//    5️⃣ General best practices
//        - Never trust user input: always validate and sanitize
//        - Keep dependencies updated for latest security patches
//        - Use proper error handling and avoid leaking DB error details

//    - Proper query construction and sanitization prevent injection attacks in both SQL and NoSQL databases.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 65 - Rate limiting: express-rate-limit to throttle requests, protection against brute-force attacks
//    - Rate limiting protects your API from abuse (DoS, brute-force login attempts) by limiting request frequency per client.
//    - express-rate-limit is a popular middleware for adding rate limits to Express endpoints.

//    1️⃣ Install express-rate-limit
//        - $ npm install express-rate-limit

const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

//    2️⃣ Basic usage (limit each IP to 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  standardHeaders: true,    // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.'
});

app.use(limiter); // Apply to all routes

//    3️⃣ Customizing for specific routes (e.g., stricter on login)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,                   // limit each IP to 5 login attempts
  message: 'Too many login attempts, try again in 10 minutes.'
});
app.post('/login', loginLimiter, (req, res) => {
  // Login handler code
  res.send('Login endpoint');
});

//    4️⃣ Advanced: Use Redis/Memcached as a store for distributed rate limiting in multi-server deployments

//    - Rate limiting helps defend against brute-force attacks, API scraping, and accidental overloads.
//    - Tune windowMs and max values based on your app’s needs.
//    - Always provide clear error messages and proper status codes (usually 429 Too Many Requests).

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// 66 - Sanitizing user input to prevent XSS: escape output in templates, using DOMPurify for HTML content
//    - Cross-site scripting (XSS) attacks inject malicious scripts into web pages viewed by other users.
//    - Always sanitize and escape user input, especially when rendering dynamic content in HTML.

//    1️⃣ Escape output in server-side templates
//        - EJS, Pug, Handlebars, etc., escape output by default when using the "escaped" syntax:
//        - EJS: <%= userInput %> (escaped), <%- userInput %> (unescaped - use with caution)
//        - Handlebars: {{userInput}} (escaped), {{{userInput}}} (unescaped - use with caution)
//        - Pug: #{userInput} (escaped), !{userInput} (unescaped - use with caution)
/*
<!-- EJS example -->
<h1>Hello, <%= username %></h1>  <!-- Safe, escapes HTML -->
<h1>Hello, <%- username %></h1>  <!-- Unsafe, renders raw HTML -->
*/

//    2️⃣ Sanitize rich HTML input (e.g., blog posts, comments)
//        - For user-submitted HTML (WYSIWYG editors), sanitize before rendering
//        - DOMPurify is a popular library for this (works in browser and Node.js)
//        - $ npm install dompurify jsdom

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const dirty = req.body.content; // User input (potentially unsafe HTML)
const clean = DOMPurify.sanitize(dirty);

res.send(`<div>${clean}</div>`); // Safe to render

//    3️⃣ Best practices
//        - Always escape output in templates by default
//        - Never trust user-supplied HTML; always sanitize before rendering
//        - Validate input length and types to further reduce risk
//        - Keep all template engines and sanitizer libraries up to date

//    - Sanitizing and escaping output is critical for preventing XSS vulnerabilities in all web apps.

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 67 - HTTPS enforcement: redirect HTTP to HTTPS, trust proxy configuration behind load balancer
//    - Enforcing HTTPS ensures all traffic is encrypted, protecting user data and sessions.
//    - When behind a load balancer or reverse proxy (Heroku, AWS ELB, Nginx), Express needs to trust the proxy to detect HTTPS properly.

//    1️⃣ Redirect HTTP to HTTPS in Express
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    // Permanent redirect (308), or use 301 for legacy support
    return res.redirect(308, 'https://' + req.headers.host + req.url);
  }
  next();
});

//    2️⃣ trust proxy configuration
//        - If your app is behind a proxy (Heroku, AWS ELB, Nginx, etc.), Express may see req.protocol as 'http' even for HTTPS requests.
//        - Set trust proxy so Express checks X-Forwarded-Proto and similar headers:
app.set('trust proxy', 1); // Trust first proxy (or true for all, or a number for hop count)

//    3️⃣ Example: Only enforce in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use((req, res, next) => {
    if (req.secure) return next();
    res.redirect(308, 'https://' + req.headers.host + req.url);
  });
}

//    4️⃣ Generating HTTPS certificates
//        - In production, use trusted CAs (Let's Encrypt, commercial CAs) and terminate SSL at the proxy/server
//        - For development, use self-signed certificates (openssl) and pass key/cert to https.createServer()

//    - Always enforce HTTPS for security (especially for cookies, sessions, auth, sensitive data)
//    - 'trust proxy' is critical for apps deployed behind load balancers/reverse proxies
//    - Set Secure cookie flags and only transmit tokens over HTTPS

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// 68 - Secure cookie attributes: HttpOnly, Secure, SameSite settings for session cookies
//    - Setting proper cookie attributes is essential for protecting sessions and preventing attacks (XSS, CSRF).
//    - Use these attributes for maximum security:

//    1️⃣ HttpOnly
//        - Prevents client-side JavaScript from accessing the cookie (reduces XSS risks)
//        - Set with res.cookie('name', 'value', { httpOnly: true })

//    2️⃣ Secure
//        - Only sends cookie over HTTPS connections
//        - Set with res.cookie('name', 'value', { secure: true })
//        - Set secure: true only when HTTPS is enforced

//    3️⃣ SameSite
//        - Controls cross-site cookie sending (CSRF protection)
//        - Options: 'Strict', 'Lax', or 'None'
//        - 'Strict': Never sent with cross-site requests
//        - 'Lax': Sent with top-level navigations (safe for most auth flows)
//        - 'None': Only if Secure is also true (for cross-origin use, e.g., APIs)
//        - Set with res.cookie('name', 'value', { sameSite: 'lax' })

//    4️⃣ Example: Secure session cookie configuration with express-session
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // Not accessible via JS
    secure: true,        // Only sent over HTTPS (use with HTTPS/enforced & trust proxy)
    sameSite: 'lax',     // Reasonable default for most apps
    maxAge: 60 * 60 * 1000 // 1 hour
  }
}));

//    5️⃣ Setting custom cookies securely
app.get('/set-cookie', (req, res) => {
  res.cookie('token', 'jwt-here', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });
  res.send('Cookie set with secure attributes!');
});

//    - Always use Secure and HttpOnly for session/auth cookies
//    - Use SameSite for CSRF protection
//    - Set Secure only in production with HTTPS enabled (trust proxy if behind load balancer)

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// ==============================
// 69 - Logging Middleware in Express.js
// ==============================

// Morgan: popular HTTP request logger middleware for Node.js/Express.
// - Logs incoming HTTP requests: method, URL, status, response time, etc.
// - Multiple pre-defined formats: 'dev', 'combined', 'short', 'tiny', or custom.
// - Essential for debugging, monitoring, and analyzing traffic patterns.

// Rotating-file-stream: used with Morgan for log rotation.
// - Rotates log files based on time or size (daily, hourly, etc.).
// - Prevents log files from growing too large, organizes logs by date/time.
// - Useful for production apps to avoid disk space issues and ease log management.

// -----------
// Example: Set up request logging with Morgan, rotating log files daily
// -----------

const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream'); // rotating-file-stream

const app = express();

// Create a rotating write stream (logs/ directory, daily rotation)
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: __dirname + '/logs',
  maxFiles: 10, // keep last 10 log files
  maxSize: '10M' // optional: max size before rotating
});

// Use morgan for logging HTTP requests to rotating file
app.use(morgan('combined', { stream: accessLogStream }));

// Optional: also log to console in 'dev' format during development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, logging world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - 'combined' format is commonly used in production (includes user agent, referrer, etc.).
  - Log files are rotated and stored in the 'logs' directory (make sure it exists).
  - For advanced needs, morgan supports custom tokens for detailed logs.
  - Log rotation helps with log analysis, archival, and prevents server overload.
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// ==============================
// 70 - Compression Middleware in Express.js
// ==============================

// Compression middleware (compression package):
// - Automatically compresses HTTP responses using Gzip, Deflate, or Brotli (if supported).
// - Reduces response size, improving speed and bandwidth usage.
// - Most browsers and HTTP clients support compressed responses out of the box.
// - Easy performance win for static assets, APIs, HTML, JSON, etc.
// - Can customize which routes are compressed, compression level, threshold size, etc.
// - Use with care for already compressed data (images, videos, etc.), as double compression isn't helpful.

// -----------
// Example: Adding gzip compression to an Express.js app
// -----------

const express = require('express');
const compression = require('compression');

const app = express();

// Enable gzip/deflate compression for all responses
app.use(compression());

// Sample route sending large JSON
app.get('/api/data', (req, res) => {
  const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: i, value: `Item ${i}` }));
  res.json(largeData);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - Most clients will send the 'Accept-Encoding' header; Express responds with compressed data.
  - Compression is applied by default to all routes, but you can exclude/include specific ones.
  - Use options to set thresholds, filter requests, or tune performance:
      app.use(compression({ threshold: 1024 })); // Only compress responses >1KB
  - npm install compression
  - Monitor CPU usage for very large or high-traffic apps (compression is CPU-intensive).
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// ==============================
// 71 - Caching Middleware in Express.js
// ==============================

// Caching in Express.js:
// - Improves performance by reducing repeated work and lowering latency for clients.
// - Two main types: HTTP caching (via headers) and server-side caching (memory or Redis).
// - HTTP caching: Set response headers (Cache-Control, Expires, etc.) so browsers/CDNs can cache responses.
// - Middleware-based caching: Use libraries like apicache (in-memory) or express-redis-cache (distributed, persists across server restarts).
// - Use with static files, API responses, or expensive database queries.

// ------------------------------------
// Example 1: Setting Cache-Control Headers
// ------------------------------------
const express = require('express');
const app = express();

app.get('/static', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // cache for 1 hour
  res.send('This is a cacheable static response.');
});

// ------------------------------------
// Example 2: In-memory caching with apicache
// ------------------------------------
// npm install apicache
const apicache = require('apicache');
let cache = apicache.middleware;

// Cache this route's response for 5 minutes (300 seconds)
app.get('/api/data', cache('5 minutes'), (req, res) => {
  // Imagine this is a slow DB operation
  const data = { value: Math.random(), time: new Date() };
  res.json(data);
});

// ------------------------------------
// Example 3: Distributed cache with express-redis-cache
// ------------------------------------
// npm install express-redis-cache redis
const redis = require('redis');
const cacheClient = redis.createClient();
const expressRedisCache = require('express-redis-cache');
const cacheMiddleware = expressRedisCache({ client: cacheClient });

// Cache this API for 10 seconds in Redis
app.get('/api/expensive', cacheMiddleware.route('10 seconds'), (req, res) => {
  res.json({ result: Math.random(), at: new Date() });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - Set 'Cache-Control' for browser/CDN caching (public, private, max-age, no-store, etc.).
  - apicache is easy for in-memory caching in simple/low-scale apps.
  - express-redis-cache is for scalable, distributed caching (multiple servers).
  - Always tune cache duration based on data freshness and use case.
  - Be careful with sensitive data: don't cache private info for public users!
  - npm install apicache express-redis-cache redis
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// ==============================
// 72 - Proxy and Load Balancer Integration in Express.js
// ==============================

// Why proxy/load balancer matters:
// - In production, your app often runs behind a reverse proxy (NGINX, HAProxy, AWS ELB, etc.).
// - The proxy forwards client requests, so the original IP and protocol info are sent in X-Forwarded-* headers.
// - Express needs to know when to trust these headers for correct client IP detection, HTTPS redirection, secure cookies, and logging.

// trust proxy setting:
// - By default, Express does NOT trust X-Forwarded-* headers (for security).
// - Set app.set('trust proxy', true) to trust the proxy in front of your app (e.g., in cloud, Docker, or PaaS environments).
// - You can specify which proxies to trust (e.g., by IP, subnet, or count).

// X-Forwarded-* headers:
// - X-Forwarded-For: original client IP address
// - X-Forwarded-Proto: original protocol (http/https)
// - X-Forwarded-Host: original host

// -----------
// Example: Enable trust proxy and log real client IP/protocol
// -----------

const express = require('express');
const app = express();

// Trust the first proxy (use 'true' for all proxies, or number/IP/subnet for advanced setups)
app.set('trust proxy', 1);

// Log real client IP and protocol
app.use((req, res, next) => {
  console.log('Client IP:', req.ip); // Will use X-Forwarded-For if trust proxy is enabled
  console.log('Protocol:', req.protocol); // Will use X-Forwarded-Proto if trust proxy is enabled
  next();
});

// Example: redirect all HTTP requests to HTTPS (behind proxy/load balancer)
app.use((req, res, next) => {
  if (req.secure) {
    // Request is already HTTPS
    return next();
  }
  // Otherwise, redirect to HTTPS
  res.redirect('https://' + req.headers.host + req.url);
});

// Route example
app.get('/', (req, res) => {
  res.send('Proxy and load balancer integration demo');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - 'trust proxy' is critical for apps behind proxies; otherwise, req.ip and req.protocol may not reflect the real client.
  - Always set trust proxy properly if using secure cookies (Secure, SameSite), redirects, rate-limiting by IP, or geo-based logic.
  - For multiple proxy hops (e.g., in cloud), you can use a number (e.g., app.set('trust proxy', 2)) or subnet (app.set('trust proxy', 'loopback, linklocal, uniquelocal')).
  - X-Forwarded-* headers are set by your proxy/load balancer, not by Express.
  - See: https://expressjs.com/en/guide/behind-proxies.html
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



// ==============================
// 73 - CSRF Protection in Express.js
// ==============================

// What is CSRF?
// - Cross-Site Request Forgery (CSRF) is an attack where a malicious website causes a user's browser to perform actions on a different website (where the user is authenticated) without their consent.
// - Example: a user is logged into a banking app, and a malicious site submits a transfer form using the user's cookies/session.

// CSRF Prevention: Synchronizer Token Pattern
// - Server generates a unique, unpredictable token per user/session.
// - Token is sent to client (usually as a hidden form field or custom header).
// - On each POST/PUT/DELETE (state-changing) request, client must send back the token.
// - Server validates the token—request is allowed only if valid.

// csurf middleware in Express.js:
// - Implements the synchronizer token pattern for Express apps.
// - Automatically creates and validates CSRF tokens for state-changing requests.
// - Typically used with cookie-session or express-session middleware.

// -----------
// Example: Basic CSRF protection with csurf
// -----------

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');

const app = express();

// Required: session middleware (or cookie-session)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set true in production with HTTPS
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize csurf middleware
app.use(csrf());

// Serve a form with the CSRF token embedded as a hidden field
app.get('/form', (req, res) => {
  res.send(`
    <form action="/process" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="data">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission, CSRF token validated automatically
app.post('/process', (req, res) => {
  res.send('Form submission successful and CSRF token validated!');
});

// Error handler for CSRF errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('CSRF token validation failed.');
  } else {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - Use 'express-session' or 'cookie-session' to manage sessions—required for csurf to store tokens.
  - Call req.csrfToken() in your route to get the token for that session/request.
  - Always embed the token in forms (hidden field), or send it as a custom header for APIs (e.g., X-CSRF-Token).
  - For SPAs, fetch the token via AJAX and send with every write request.
  - Do NOT use CSRF protection for GET/read-only routes.
  - npm install csurf express-session body-parser
  - See: https://github.com/expressjs/csurf
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


// ==============================
// 74 - Error-Handling Patterns in Express.js
// ==============================

// Why error handling matters:
// - Catches and manages all errors in one place (centralized).
// - Allows for consistent error responses (status code, message, etc.).
// - Enables custom error logic (differentiate between client errors, server errors, validation, auth, etc.).
// - Keeps code clean by separating business logic from error responses.

// Centralized Error Handler:
// - Add a special middleware with 4 arguments: (err, req, res, next).
// - Place this AFTER all routes and middlewares.

// Custom Error Classes:
// - Extend the built-in Error class to define custom error types (ValidationError, AuthError, etc.).
// - Add custom properties: statusCode, errorCode, etc., for fine-grained handling.

// Error Codes:
// - Use consistent error codes for programmatic clients (frontend, API consumers).
// - Example: 'USER_NOT_FOUND', 'INVALID_INPUT', etc.

// -----------
// Example: Centralized error handler, custom error class, error codes
// -----------

const express = require('express');
const app = express();

// Custom error class example
class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Route that throws a validation error
app.get('/user/:id', (req, res, next) => {
  if (req.params.id !== '42') {
    // Throw a custom error
    return next(new AppError('User not found', 404, 'USER_NOT_FOUND'));
  }
  res.json({ id: 42, name: 'John Doe' });
});

// Route that throws a generic error
app.get('/fail', (req, res, next) => {
  // Any uncaught error gets sent to the centralized handler
  throw new Error('Something went wrong!');
});

// Centralized error handler (MUST be last middleware)
app.use((err, req, res, next) => {
  // Use custom error properties if available, else default to 500
  const status = err.statusCode || 500;
  const code = err.errorCode || 'INTERNAL_ERROR';
  const msg = err.message || 'An error occurred';

  // Log the error (in real apps, use logger, send to monitoring, etc.)
  console.error(`[${code}]`, err);

  res.status(status).json({
    success: false,
    error: {
      code,
      message: msg,
      // Optionally include stack trace in development
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

/*
  // Additional Notes:
  - Always add centralized error handler after all routes.
  - Custom error classes allow for richer errors: add extra fields (data, details, etc.).
  - Always avoid leaking sensitive error info in production responses.
  - Consistent error codes help clients handle errors gracefully (show proper UI messages).
  - For validation, authentication, and authorization, use different status codes (400, 401, 403, etc.).
*/

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////