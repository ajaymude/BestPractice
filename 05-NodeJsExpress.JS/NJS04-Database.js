// 🗄 DATABASE INTEGRATION
// 72 - Working with MongoDB: installing MongoDB, connecting via native driver (mongodb npm package)
// 73 - Mongoose ODM: defining schemas, models, CRUD operations, validation, middleware (hooks), population
// 74 - MongoDB indexing and performance considerations
// 75 - Working with PostgreSQL: pg module, client vs pool, parameterized queries
// 76 - ORM/Query Builder: Sequelize (defining models, associations, migrations), Knex.js usage
// 77 - Working with MySQL: mysql2 library, connection pooling, executing queries
// 78 - Redis integration: ioredis or redis packages, caching strategies, pub/sub, session store
// 79 - SQL vs NoSQL: choosing the right storage based on use case
// 80 - ElasticSearch basics: installing, indexing documents, querying via elasticsearch-js client
// 81 - SQLite usage for lightweight, file-based storage (better-sqlite3 or sqlite3 package)




////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 72 – Working with MongoDB: installing MongoDB, connecting via native driver (mongodb npm package)
//
// Installation:
// • Install MongoDB Community Server locally (e.g., Homebrew: `brew tap mongodb/brew && brew install mongodb-community`)
// • Or run in Docker: `docker run -d -p 27017:27017 --name mongo mongo`
// • Install the Node.js driver: `npm install mongodb`
//
// Connection workflow:
// 1. Import MongoClient from 'mongodb'.
// 2. Create a new MongoClient instance with your MongoDB URI.
// 3. Call client.connect() (async) to establish the connection.
// 4. Select a database via client.db('dbName').
// 5. Get a collection via db.collection('collectionName').
// 6. Perform operations: insertOne, find, updateOne, deleteOne.
// 7. Always close the client in a finally block or on process exit.
//
// Example 1: Connect and ping the server
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function runPing() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const adminDb = client.db().admin();
    const info = await adminDb.ping();
    console.log('Ping response:', info);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}
runPing();

// Example 2: CRUD operations in a “users” collection
async function runCrud() {
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');

    // Create
    const insertResult = await users.insertOne({ name: 'Alice', age: 30 });
    console.log('Inserted user with _id:', insertResult.insertedId);

    // Read
    const foundUser = await users.findOne({ name: 'Alice' });
    console.log('Found user:', foundUser);

    // Update
    const updateResult = await users.updateOne(
      { name: 'Alice' },
      { $set: { age: 31 } }
    );
    console.log('Matched', updateResult.matchedCount, 'Modified', updateResult.modifiedCount);

    // Delete
    const deleteResult = await users.deleteOne({ name: 'Alice' });
    console.log('Deleted count:', deleteResult.deletedCount);
  } catch (err) {
    console.error('CRUD error:', err);
  } finally {
    await client.close();
  }
}
runCrud();

// Example 3: Using a connection pool across requests
async function getUsers() {
  // Reuse the same client; do not close after each operation in a long-running app
  if (!client.isConnected()) await client.connect();
  const users = client.db('myapp').collection('users');
  return users.find({}).toArray();
}

getUsers()
  .then(list => console.log('All users:', list))
  .catch(err => console.error(err))
  .finally(() => client.close());


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 73 – Mongoose ODM: defining schemas, models, CRUD operations, validation, middleware (hooks), population
//
// Mongoose is an ODM for MongoDB; it maps JS objects to MongoDB documents.
// Key concepts:
// • Define a Schema with field types, default values, validators.
// • Create a Model from the schema.
// • Perform CRUD: create(), find(), findById(), updateOne(), deleteOne().
// • Built-in validation: required, min, max, match, enum.
// • Schema middleware: pre('save'), post('find'), etc.
// • Virtuals for computed properties.
// • Population: reference other documents via ObjectId and populate().

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Connection error', err));

const userSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true, match: /^[\w.-]+@[\w.-]+\.\w{2,}$/ },
  age:         { type: Number, min: 0, max: 120 },
  createdAt:   { type: Date, default: Date.now }
});

// Virtual to list posts authored by this user
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

// Middleware hooks
userSchema.pre('save', function(next) {
  console.log('About to save user:', this.name);
  next();
});
userSchema.post('save', function(doc) {
  console.log('User saved with id:', doc._id);
});

const postSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  body:       String,
  author:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags:       [String],
  published:  { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

(async () => {
  try {
    // Create
    const user = await User.create({ name: 'Alice', email: 'alice@example.com', age: 28 });
    const post = await Post.create({ title: 'First Post', body: 'Hello!', author: user._id, tags: ['intro'] });

    // Read & Update
    const foundUser = await User.findById(user._id);
    foundUser.age = 29;
    await foundUser.save();

    // Populate
    const posts = await Post.find({ author: user._id }).populate('author', 'name email');
    console.log('Populated posts:', posts);

    // Update & Delete
    await Post.updateOne({ _id: post._id }, { published: true });
    await Post.deleteOne({ _id: post._id });
    await User.deleteOne({ _id: user._id });

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 74 – MongoDB indexing and performance considerations
//
// • Indexes improve query speed by avoiding full collection scans.
// • createIndex({ field: 1 }) for ascending, -1 for descending.
// • Compound indexes for queries filtering/sorting on multiple fields.
// • Unique indexes enforce uniqueness at write time.
// • Text indexes ({ field: 'text' }) enable full-text search.
// • TTL indexes ({ dateField: 1 }, { expireAfterSeconds }) auto-expire docs.
// • Use explain('executionStats') to verify index usage and analyze query execution.
// • Project only needed fields (.project({ a:1, b:1 })) to reduce I/O.
// • Avoid unanchored regex (e.g. /^prefix/ is ok, /substr/ is not indexed).
// • Balance read performance (more indexes) against write overhead (each index slows writes).

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

(async () => {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('myapp');
  const users = db.collection('users');

  // Single-field unique index
  await users.createIndex({ email: 1 }, { unique: true });

  // Compound index for lastName + firstName queries and sorts
  await users.createIndex({ lastName: 1, firstName: 1 });

  // Text index for full-text search on bio
  await users.createIndex({ bio: 'text' });

  // TTL index: documents expire 1 hour after createdAt
  await users.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

  // Perform a query with projection, sort, and limit
  const query = { age: { $gte: 18 } };
  const projection = { name: 1, age: 1 };
  const cursor = users.find(query)
                      .project(projection)
                      .sort({ age: -1 })
                      .limit(10);

  // Analyze query plan and execution stats
  const stats = await cursor.explain('executionStats');
  console.log(JSON.stringify(stats, null, 2));

  await client.close();
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 75 – Working with PostgreSQL: pg module, client vs pool, parameterized queries
//
// The `pg` module provides Client for single connections and Pool for managing multiple,
// reusing connections efficiently. Always use parameterized queries (`$1, $2…`) to prevent SQL injection.

const { Client, Pool } = require('pg');

// Example 1: Using Client for a single connection
const client = new Client({
  connectionString: 'postgresql://user:password@localhost:5432/mydb'
});
(async () => {
  await client.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Current time:', res.rows[0].now);
  } catch (err) {
    console.error('Client error:', err);
  } finally {
    await client.end();
  }
})();

// Example 2: Using Pool for concurrent queries
const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/mydb',
  max: 10,             // max clients in the pool
  idleTimeoutMillis: 30000
});
(async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE active = $1', [true]);
    console.log('Active users:', rows);
  } catch (err) {
    console.error('Pool query error:', err);
  } finally {
    await pool.end();
  }
})();

// Example 3: Parameterized INSERT with RETURNING
(async () => {
  try {
    const text   = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING id';
    const values = ['Alice', 'alice@example.com'];
    const result = await pool.query(text, values);
    console.log('Inserted user id:', result.rows[0].id);
  } catch (err) {
    console.error('Insert error:', err);
  }
})();

// Example 4: Named prepared statement for repeated queries
(async () => {
  try {
    const config = {
      name: 'fetch-user-by-id',
      text: 'SELECT * FROM users WHERE id = $1',
      values: [1]
    };
    const { rows } = await pool.query(config);
    console.log('User #1:', rows[0]);
  } catch (err) {
    console.error('Prepared statement error:', err);
  }
})();

// Example 5: Transaction with error handling
(async () => {
  const trxClient = await pool.connect();
  try {
    await trxClient.query('BEGIN');
    await trxClient.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [100, 1]);
    await trxClient.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [100, 2]);
    await trxClient.query('COMMIT');
    console.log('Transaction committed');
  } catch (err) {
    await trxClient.query('ROLLBACK');
    console.error('Transaction rolled back:', err);
  } finally {
    trxClient.release();
  }
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 76 – ORM/Query Builder: Sequelize (defining models, associations, migrations), Knex.js usage
//
// Sequelize:
// • Install and initialize with CLI:  
//     npm install sequelize sequelize-cli mysql2  
//     npx sequelize-cli init  
//   – Creates folders: config/, models/, migrations/, seeders/  
// • Define models in models/:
//     // models/User.js  
//     const { Model, DataTypes } = require('sequelize');  
//     module.exports = (sequelize) => {  
//       class User extends Model {  
//         static associate(models) {  
//           User.hasMany(models.Post, { foreignKey: 'userId' });  
//         }  
//       }  
//       User.init({  
//         username: { type: DataTypes.STRING, allowNull: false, unique: true },  
//         email:    { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } }  
//       }, { sequelize, modelName: 'User', tableName: 'Users' });  
//       return User;  
//     };  
//     // models/Post.js  
//     const { Model, DataTypes } = require('sequelize');  
//     module.exports = (sequelize) => {  
//       class Post extends Model {  
//         static associate(models) {  
//           Post.belongsTo(models.User, { foreignKey: 'userId' });  
//         }  
//       }  
//       Post.init({  
//         title:   { type: DataTypes.STRING, allowNull: false },  
//         content: DataTypes.TEXT  
//       }, { sequelize, modelName: 'Post', tableName: 'Posts' });  
//       return Post;  
//     };  
// • Create migrations in migrations/:
//     // migrations/20250101120000-create-users.js  
//     'use strict';  
//     module.exports = {  
//       up: async (qi, Sequelize) => {  
//         await qi.createTable('Users', {  
//           id:        { allowNull:false, autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER },  
//           username:  { type:Sequelize.STRING, allowNull:false, unique:true },  
//           email:     { type:Sequelize.STRING, allowNull:false },  
//           createdAt: { allowNull:false, type:Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },  
//           updatedAt: { allowNull:false, type:Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }  
//         });  
//       },  
//       down: async (qi) => {  
//         await qi.dropTable('Users');  
//       }  
//     };
// • Run migrations/seeds:
//     npx sequelize-cli db:migrate  
//     npx sequelize-cli db:seed:generate --name demo-user  
//     npx sequelize-cli db:seed:all  
// • Query with async/await:
//     const { Sequelize } = require('sequelize');  
//     const sequelize = new Sequelize(/* config */);  
//     const { User, Post } = sequelize.models;  
//     await User.create({ username:'alice', email:'a@ex.com' });  
//     const posts = await Post.findAll({ include: User });  

// Knex.js:
// • Install and init:  
//     npm install knex pg  
//     npx knex init  
//   – Creates knexfile.js  
// • Configure environments in knexfile.js:
//     module.exports = {  
//       development: {  
//         client: 'pg',  
//         connection: 'postgres://user:pass@localhost:5432/mydb',  
//         migrations: { directory: './migrations' },  
//         seeds:      { directory: './seeds' }  
//       }  
//     };
// • Migrations with schema builder:
//     // migrations/20250101121000_create_users.js  
//     exports.up = (knex) => knex.schema.createTable('users', t => {  
//       t.increments('id').primary();  
//       t.string('username').notNullable().unique();  
//       t.string('email').notNullable();  
//       t.timestamps(true, true);  
//     });  
//     exports.down = (knex) => knex.schema.dropTable('users');
// • Run migrations/seeds:
//     npx knex migrate:latest  
//     npx knex seed:make seed_users  
//     npx knex seed:run
// • Query builder usage:
//     const knex = require('knex')(require('./knexfile').development);  
//     (async () => {  
//       const users = await knex('users').select('id','username','email');  
//       console.log(users);  
//       await knex('users').insert({ username:'bob', email:'bob@ex.com' });  
//       await knex('users').where({ username:'bob' }).update({ email:'bob2@ex.com' });  
//       await knex('users').where({ id:1 }).del();  
//       await knex.destroy();  
//     })();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 77 – Working with MySQL: mysql2 library, connection pooling, executing queries
//
// mysql2 is a modern MySQL client for Node.js supporting both callback and Promise APIs.
// • Install with: npm install mysql2
// • Use mysql.createConnection for a single connection, mysql.createPool for pooling.
// • Pooling improves performance under load by reusing connections.
// • Use pool.query() for simple queries and pool.execute() for prepared statements.
// • Always use parameterized queries ( ? placeholders ) to prevent SQL injection.
// • Close the pool with pool.end() when shutting down your app.
//
// Next Steps:
// • Try pool.getConnection() to manually manage transactions.
// • Use streams for large result sets (pool.query().stream()).
// • Explore PoolCluster for sharding or read/write splitting.

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Execute a simple query (callback API)
pool.query('SELECT * FROM users WHERE age > ?', [30], (err, results) => {
  if (err) {
    console.error('Query error:', err);
    return;
  }
  console.log('Users older than 30:', results);
});

// Using Promise API with async/await
(async () => {
  const promisePool = pool.promise();
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO users (name, age) VALUES (?, ?)',
      ['Bob', 25]
    );
    console.log('Inserted user ID:', rows.insertId);
  } catch (err) {
    console.error('Insert error:', err);
  }
})();

// Gracefully close the pool when done
pool.end(err => {
  if (err) console.error('Pool shutdown error:', err);
  else console.log('Connection pool closed');
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 78 – Redis integration: ioredis or redis packages, caching strategies, pub/sub, session store
//
// Redis is an in-memory data store used for caching, pub/sub messaging, and session storage.
// Choose between the “redis” or “ioredis” client (ioredis supports clusters and sentinel).
// Key patterns:
//  • Caching: set, get, expire keys to cache DB/query results.
//  • Pub/Sub: publish channels and subscribe handlers for real-time events.
//  • Session store: use connect-redis with express-session to store sessions in Redis.
//
// ——————————————————————————————————————————————————————————————
// Client Setup (ioredis)
const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'yourRedisPassword', // omit if none
  db: 0
});

// ——————————————————————————————————————————————————————————————
// Example 1: Simple caching middleware for Express
async function cache(req, res, next) {
  const key = `__express__${req.originalUrl}`;    
  const cached = await redis.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  // hijack res.json to cache the result
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    redis.set(key, JSON.stringify(body), 'EX', 60); // expire in 60s
    return originalJson(body);
  };
  next();
}

const express = require('express');
const app = express();
app.get('/data', cache, async (req, res) => {
  const data = await fetchExpensiveData();
  res.json(data);
});

// ——————————————————————————————————————————————————————————————
// Example 2: Pub/Sub pattern
const subscriber = new Redis();
const publisher  = new Redis();

// Subscriber listens on “notifications”
subscriber.subscribe('notifications', (err) => {
  if (err) console.error('Subscribe error:', err);
});
subscriber.on('message', (channel, message) => {
  console.log(`Received on ${channel}:`, message);
});

// Publisher sends a message
async function sendNotification(msg) {
  await publisher.publish('notifications', JSON.stringify(msg));
}
sendNotification({ user: 'Alice', text: 'Hello!' });

// ——————————————————————————————————————————————————————————————
// Example 3: Session store with connect-redis
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, maxAge: 3600000 } // 1 hour
}));

// Now req.session is persisted in Redis
app.get('/login', (req, res) => {
  req.session.userId = 123;
  res.send('Logged in');
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).send('Not logged in');
  res.send(`Profile of user ${req.session.userId}`);
});

// ——————————————————————————————————————————————————————————————
// Cleanup and error handling
redis.on('error', err => console.error('Redis error:', err));
process.on('SIGINT', () => {
  redis.quit();
  subscriber.quit();
  publisher.quit();
  process.exit(0);
});

async function fetchExpensiveData() {
  // simulate slow DB call
  return new Promise(resolve => setTimeout(() => resolve({ time: Date.now() }), 200));
}

app.listen(3000, () => console.log('Server on port 3000 with Redis integration'));

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 79 – SQL vs NoSQL: choosing the right storage based on use case
//
// Relational (SQL) databases enforce schemas, ACID transactions, and strong consistency,
// ideal for complex queries, joins, and financial or transactional systems.
// NoSQL databases (document, key–value, wide-column, graph) offer flexible schemas,
// horizontal scalability, and high write throughput—good for evolving or unstructured data.
//
// Use SQL when:
// • You need complex joins and aggregations (e.g., orders → customers → products).  
// • Strong ACID guarantees are required (banking, inventory).  
// • You require rich querying (GROUP BY, window functions).  
//
// Use NoSQL when:
// • Your schema evolves rapidly or data is heterogeneous (user profiles, logs).  
// • You need to scale writes/reads across distributed clusters.  
// • You’re building real-time analytics, caching layers, or content stores.  
//
// Example 1: SQL with PostgreSQL and transactions
const { Pool } = require('pg');
const sqlPool = new Pool({
  connectionString: 'postgresql://user:pass@localhost:5432/mydb'
});

async function transferFunds(fromId, toId, amount) {
  const client = await sqlPool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function getUserOrderDetails(userId) {
  const result = await sqlPool.query(
    `SELECT u.name, o.id AS order_id, o.total
     FROM users u
     JOIN orders o ON o.user_id = u.id
     WHERE u.id = $1`,
    [userId]
  );
  return result.rows;
}

// Example 2: NoSQL with MongoDB for flexible document models
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient('mongodb://localhost:27017');

async function runNoSqlExamples() {
  await mongoClient.connect();
  const db = mongoClient.db('mydb');
  const posts = db.collection('posts');

  // Insert a document with a dynamic schema
  await posts.insertOne({
    title: 'Intro to Node.js',
    author: { id: 1, name: 'Alice' },
    tags: ['nodejs', 'javascript'],
    metadata: { views: 0, likes: 0 }
  });

  // Query documents by tag, project specific fields
  const nodePosts = await posts
    .find({ tags: 'nodejs' })
    .project({ title: 1, 'author.name': 1 })
    .toArray();

  console.log(nodePosts);
  await mongoClient.close();
}

runNoSqlExamples();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// 80 – ElasticSearch basics: installing, indexing documents, querying via elasticsearch-js client
//
// ElasticSearch is a distributed, RESTful search and analytics engine.
// • Install: download from elastic.co or use Docker (`docker run -d -p 9200:9200 elasticsearch:8.5.0`).
// • At startup ES exposes a REST API on port 9200 by default.
// • Use the @elastic/elasticsearch client for Node.js to interact programmatically.
// • Key operations: create index with mappings, index documents, search with queries, bulk operations.

// Import and configure client
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// Example 1: Create an index with mappings
async function createIndex() {
  await client.indices.create({
    index: 'articles',
    body: {
      mappings: {
        properties: {
          title:    { type: 'text' },
          author:   { type: 'keyword' },
          published:{ type: 'date' },
          content:  { type: 'text' }
        }
      }
    }
  });
}
createIndex();

// Example 2: Index a single document
async function indexDocument() {
  await client.index({
    index: 'articles',
    id: '1',
    body: {
      title:     'Intro to ElasticSearch',
      author:    'Alice',
      published: '2025-06-10',
      content:   'Elasticsearch is a powerful search engine...'
    }
  });
  await client.indices.refresh({ index: 'articles' });
}
indexDocument();

// Example 3: Bulk indexing multiple documents
async function bulkIndex() {
  await client.bulk({
    refresh: true,
    body: [
      { index: { _index: 'articles', _id: '2' } },
      { title: 'Advanced Queries', author: 'Bob', published: '2025-06-11', content: 'Learn about bool, term, range queries...' },
      { index: { _index: 'articles', _id: '3' } },
      { title: 'Scaling ES', author: 'Carol', published: '2025-06-12', content: 'Discuss clusters, shards, replicas...' }
    ]
  });
}
bulkIndex();

// Example 4: Basic search query
async function searchArticles() {
  const result = await client.search({
    index: 'articles',
    body: {
      query: {
        match: { content: 'search' }
      }
    }
  });
  console.log(result.hits.hits);
}
searchArticles();

// Example 5: Search with filters and pagination
async function filteredSearch() {
  const { body } = await client.search({
    index: 'articles',
    body: {
      query: {
        bool: {
          must:   { match: { content: 'engine' } },
          filter: { term: { author: 'Alice' } }
        }
      },
      sort: [{ published: { order: 'desc' } }],
      from: 0,
      size: 10
    }
  });
  console.log(body.hits.hits);
}
filteredSearch();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// 81 – SQLite usage for lightweight, file-based storage (better-sqlite3 or sqlite3 package)
//
// SQLite is an embedded, serverless, zero-configuration database stored in a single file.
// Use it for small to medium apps, prototyping, or desktop/embedded environments.
// Two popular Node.js clients:
//  • better-sqlite3 – synchronous API, high performance, simple to use.
//  • sqlite3        – asynchronous API, familiar callback/Promise patterns.

// ——————————————————————————————————————————————————————————————
// Example A: better-sqlite3 (synchronous, npm install better-sqlite3)
// ——————————————————————————————————————————————————————————————
const Database = require('better-sqlite3');
const dbSync  = new Database('app.db', { verbose: console.log });

// Create a table if it doesn’t exist
dbSync.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`).run();

// Insert a row with parameter binding
const insert = dbSync.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
const info   = insert.run('Alice', 'alice@example.com');
console.log('Inserted user with id:', info.lastInsertRowid);

// Query rows
const selectAll = dbSync.prepare('SELECT * FROM users');
const users     = selectAll.all();
console.log('All users:', users);

// Single-row get
const getUser = dbSync.prepare('SELECT * FROM users WHERE id = ?');
console.log('User #1:', getUser.get(1));

// Transactions
const insertMany = dbSync.transaction((people) => {
  for (const p of people) {
    insert.run(p.name, p.email);
  }
});
insertMany([{ name: 'Bob', email: 'bob@example.com' }, { name: 'Carol', email: 'carol@example.com' }]);

// Close the database
dbSync.close();

// ——————————————————————————————————————————————————————————————
// Example B: sqlite3 (asynchronous, npm install sqlite3)
// ——————————————————————————————————————————————————————————————
const sqlite3 = require('sqlite3').verbose();
const dbAsync = new sqlite3.Database('app_async.db', (err) => {
  if (err) return console.error('Open error:', err);
  console.log('Opened SQLite database');
});

// Wrap in Promise for async/await
const runAsync  = (sql, params=[]) => new Promise((res, rej) => {
  dbAsync.run(sql, params, function(err) {
    if (err) rej(err);
    else res(this);
  });
});
const allAsync  = (sql, params=[]) => new Promise((res, rej) => {
  dbAsync.all(sql, params, (err, rows) => {
    if (err) rej(err);
    else res(rows);
  });
});
const getAsync  = (sql, params=[]) => new Promise((res, rej) => {
  dbAsync.get(sql, params, (err, row) => {
    if (err) rej(err);
    else res(row);
  });
});

(async () => {
  try {
    // Create table
    await runAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      )
    `);

    // Insert a product
    const result = await runAsync('INSERT INTO products (name, price) VALUES (?, ?)', ['Widget', 9.99]);
    console.log('Inserted product id:', result.lastID);

    // Query all products
    const products = await allAsync('SELECT * FROM products');
    console.log('Products:', products);

    // Get single product
    const product = await getAsync('SELECT * FROM products WHERE id = ?', [1]);
    console.log('Product #1:', product);
  } catch (err) {
    console.error('SQLite async error:', err);
  } finally {
    dbAsync.close((err) => {
      if (err) console.error('Close error:', err);
      else console.log('Closed SQLite database');
    });
  }
})();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////