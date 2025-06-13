// 🗄 DATABASE DESIGN & OPTIMIZATION
// 140 - Database schema design principles: normalization vs denormalization
// 141 - Indexing strategies for relational and NoSQL databases
// 142 - Connection pooling and managing database connections efficiently
// 143 - Handling database transactions with Sequelize or TypeORM
// 144 - Using Mongoose middleware (pre, post hooks) for data validation and sanitization
// 145 - Implementing soft deletes and audit trails in MongoDB or SQL
// 146 - Sharding and replication in MongoDB: scaling horizontally
// 147 - Read replicas and clustering in PostgreSQL for high availability
// 148 - Using Redis as a session store or cache: configuring TTL, eviction policies




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// 140 - Database schema design principles: normalization vs denormalization
// -----------------------------------------------------------------------------
// THEORY:
// • Schema design shapes how data is structured, queried, and maintained in a database.
// • Normalization and denormalization are two strategies with different trade-offs.
//
// NORMALIZATION:
// • Breaking data into multiple related tables to reduce redundancy.
// • Uses keys (primary/foreign) to connect tables (relations).
// • Follows "normal forms" (1NF, 2NF, 3NF, etc.)—each eliminates certain anomalies.
//
// BENEFITS:
//   - Minimal duplication (DRY data)
//   - Easier updates: change data in one place
//   - Maintains data integrity with foreign keys
//
// DRAWBACKS:
//   - More JOINs in queries (can impact performance)
//   - Complex queries for aggregated/related data
//
// EXAMPLE (Normalized):
// Table: users         | Table: orders
// -------------------- | ----------------------------
// id | name            | id | user_id | product | qty
// 1  | Alice           | 1  |   1     | Book    | 2
// 2  | Bob             | 2  |   2     | Pen     | 5
//
// -- orders.user_id is a foreign key to users.id
//
// -----------------------------------------------------------------------------
//
// DENORMALIZATION:
// • Combines related data in one table to avoid JOINs.
// • Duplicates some data for faster reads (at the cost of redundancy).
//
// BENEFITS:
//   - Faster reads (fewer JOINs, simpler queries)
//   - Good for analytics, reporting, or document databases (MongoDB)
//
// DRAWBACKS:
//   - Data duplication—harder to update (need to change in multiple places)
//   - Risk of data anomalies (inconsistent data)
//
// EXAMPLE (Denormalized):
// Table: orders
// ----------------------------------------------
// id | user_id | user_name | product | qty
// 1  |   1     | Alice     | Book    | 2
// 2  |   2     | Bob       | Pen     | 5
//
// -----------------------------------------------------------------------------
// RULE OF THUMB:
// • Normalize for transactional, write-heavy systems (OLTP) to maintain data integrity.
// • Denormalize for read-heavy, analytics, or reporting systems (OLAP) for speed.
// • In practice, many databases use a mix: normalize most data, denormalize for performance-critical queries.
//
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 141 - Indexing strategies for relational and NoSQL databases
// -----------------------------------------------------------------------------
// THEORY:
// • Indexes speed up data retrieval at the cost of additional storage and slower writes (updates/inserts).
// • A good indexing strategy balances query performance, storage, and write efficiency.
//
// RELATIONAL DATABASES (MySQL, PostgreSQL, etc.)
// -----------------------------------------------------------------------------
// • PRIMARY KEY INDEX: Uniquely identifies each row, usually the main clustered index.
// • UNIQUE INDEX: Prevents duplicate values in a column (e.g., email).
// • COMPOSITE (MULTI-COLUMN) INDEX: Indexes multiple columns for queries filtering/sorting by more than one field.
// • FULL-TEXT INDEX: Enables fast text search (LIKE, MATCH...AGAINST).
// • PARTIAL/CONDITIONAL INDEX: Index only a subset of rows (PostgreSQL WHERE).
// • COVERING INDEX: Index includes all columns needed for a query (no need to read the table).
//
// EXAMPLES:
// CREATE INDEX idx_email ON users(email);
// CREATE UNIQUE INDEX idx_username ON users(username);
// CREATE INDEX idx_order_user_date ON orders(user_id, order_date);
// CREATE INDEX idx_content_fulltext ON articles USING gin(content);
//
// -----------------------------------------------------------------------------
// NoSQL DATABASES (MongoDB, Cassandra, etc.)
// -----------------------------------------------------------------------------
// • SINGLE FIELD INDEX: Indexes a single field for fast equality/range queries.
// • COMPOUND INDEX: Multiple fields, supports sorting and filtering efficiently.
// • MULTI-KEY INDEX: Indexes array fields in MongoDB (each array element is indexed).
// • TEXT INDEX: For searching inside strings or documents (MongoDB's $text).
// • TTL INDEX: Automatically removes documents after a time (MongoDB).
//
// EXAMPLES (MongoDB):
// db.users.createIndex({ email: 1 }); // ascending
// db.orders.createIndex({ userId: 1, orderDate: -1 }); // compound
// db.posts.createIndex({ tags: 1 }); // multi-key (array)
// db.articles.createIndex({ content: "text" }); // text index
// db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL
//
// -----------------------------------------------------------------------------
// BEST PRACTICES:
// • Analyze query patterns: Only index fields used in filtering, sorting, or joining.
// • Don’t over-index: Each index slows down writes and takes disk space.
// • Regularly review and drop unused indexes.
// • Use database EXPLAIN plans to verify index usage in slow queries.
// • In sharded NoSQL, always index the shard key.
//
// -----------------------------------------------------------------------------
// SUMMARY:
// • Indexes are crucial for performance in both SQL and NoSQL.
// • Pick indexes that fit your app’s real-world queries, and monitor their impact.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 142 - Connection pooling and managing database connections efficiently
// -----------------------------------------------------------------------------
// THEORY:
// • Opening a new DB connection for every request is slow and can exhaust server/database resources.
// • Connection pooling = keep a pool of open, reusable connections.
// • The pool hands out connections as needed, and returns them when done.
// • Pools control max connections, idle timeout, queueing, and error handling.
//
// BENEFITS:
//   - Faster DB operations (skip connection overhead)
//   - Prevents exhausting DB limits (max connections)
//   - Better resource management and stability
//
// -----------------------------------------------------------------------------
// RELATIONAL DATABASE EXAMPLES (MySQL, PostgreSQL, etc.)
// Using 'pg' (PostgreSQL) and 'mysql2' Node.js packages
//
// --- PostgreSQL (pg) ---
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  user: 'dbuser',
  password: 'secret',
  database: 'mydb',
  max: 10,               // max open connections in pool
  idleTimeoutMillis: 30000, // close idle connections after 30s
});
async function getUser(id) {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
}

// --- MySQL (mysql2) ---
const mysql = require('mysql2/promise');
const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'dbuser',
  password: 'secret',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,  // max open connections in pool
  queueLimit: 0,
});
async function getOrder(id) {
  const [rows] = await mysqlPool.execute('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
}

// -----------------------------------------------------------------------------
// NoSQL DATABASE EXAMPLE (MongoDB)
//
// The MongoDB Node.js driver uses pooling by default. You can customize pool options:
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017', {
  maxPoolSize: 20,    // max open connections
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
});
async function findProduct(id) {
  await client.connect();
  const db = client.db('mydb');
  return db.collection('products').findOne({ _id: id });
}

// -----------------------------------------------------------------------------
// BEST PRACTICES:
// • Use a pool—never create a new connection per request.
// • Tune pool size to fit your app and DB server’s capacity.
// • Handle pool errors and release/close connections properly.
// • For serverless (AWS Lambda etc.), use special “serverless” pooling strategies.
// • Monitor pool metrics: queue time, saturation, errors.
//
// -----------------------------------------------------------------------------
// SUMMARY:
// • Connection pooling is essential for fast, stable, and scalable DB access in any Node.js app.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 143 - Handling database transactions with Sequelize or TypeORM
// -----------------------------------------------------------------------------
// THEORY:
// • A transaction groups multiple DB operations into a single “all-or-nothing” unit.
// • If any operation fails, all changes are rolled back—guaranteeing consistency.
// • ORMs like Sequelize and TypeORM provide transaction helpers for Node.js apps.
//
// -----------------------------------------------------------------------------
// SEQUELIZE EXAMPLE
// (npm install sequelize pg pg-hstore)
// -----------------------------------------------------------------------------
// import { Sequelize, DataTypes } from 'sequelize';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/mydb');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  balance: DataTypes.FLOAT,
});

async function transferFunds(fromId, toId, amount) {
  // Start transaction
  const t = await sequelize.transaction();
  try {
    const fromUser = await User.findByPk(fromId, { transaction: t });
    const toUser   = await User.findByPk(toId,   { transaction: t });
    if (!fromUser || !toUser || fromUser.balance < amount) throw new Error('Insufficient funds');

    fromUser.balance -= amount;
    toUser.balance   += amount;
    await fromUser.save({ transaction: t });
    await toUser.save({ transaction: t });

    await t.commit();   // Commit transaction
    return 'Success';
  } catch (err) {
    await t.rollback(); // Rollback transaction on error
    throw err;
  }
}

// -----------------------------------------------------------------------------
// TYPEORM EXAMPLE
// (npm install typeorm reflect-metadata pg)
// -----------------------------------------------------------------------------
// import { createConnection, getRepository } from 'typeorm';
const { createConnection, getRepository } = require('typeorm');

async function transferFundsTypeORM(fromId, toId, amount) {
  const conn = await createConnection();
  await conn.transaction(async transactionalEntityManager => {
    const userRepo = transactionalEntityManager.getRepository('User');
    const fromUser = await userRepo.findOne(fromId);
    const toUser   = await userRepo.findOne(toId);

    if (!fromUser || !toUser || fromUser.balance < amount) throw new Error('Insufficient funds');

    fromUser.balance -= amount;
    toUser.balance   += amount;
    await userRepo.save([fromUser, toUser]);
  });
}

// -----------------------------------------------------------------------------
// EXPLANATION:
// • Both Sequelize and TypeORM allow you to start a transaction, do DB work, and then either commit (persist)
//   or rollback (undo) based on errors.
// • Always use transactions for multi-step changes where data must stay consistent (e.g. money transfer).
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 144 - Using Mongoose middleware (pre, post hooks) for data validation and sanitization
// -----------------------------------------------------------------------------
// THEORY:
// • Mongoose middleware (hooks) let you run logic before ('pre') or after ('post') certain model operations.
// • Use 'pre' hooks to validate, sanitize, or modify data before saving/updating.
// • Use 'post' hooks to trigger actions after changes (logging, notifications, etc).
//
// SETUP:
// 1. Install mongoose: npm install mongoose
// 2. Define a schema and add pre/post middleware.
//
// -----------------------------------------------------------------------------
//
// --- Example: Sanitize and Validate User Data Before Save ---

const mongoose = require('mongoose');
const validator = require('validator'); // For additional validation

const userSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  email:  { type: String, required: true, unique: true },
  bio:    { type: String }
});

// PRE-SAVE: Sanitize and validate email before saving
userSchema.pre('save', function(next) {
  // Trim and lowercase email
  if (this.email) {
    this.email = this.email.trim().toLowerCase();
    // Validate email format
    if (!validator.isEmail(this.email)) {
      return next(new Error('Invalid email format'));
    }
  }
  // Sanitize bio (remove HTML tags)
  if (this.bio) {
    this.bio = this.bio.replace(/<\/?[^>]+(>|$)/g, "");
  }
  next();
});

// POST-SAVE: Log after a user is saved
userSchema.post('save', function(doc) {
  console.log(`User ${doc.email} was saved.`);
});

const User = mongoose.model('User', userSchema);

// -----------------------------------------------------------------------------
// EXPLANATION:
// • The 'pre' hook cleans and validates email, and strips HTML from 'bio' before saving.
// • The 'post' hook can be used for audit logs, notifications, etc.
// • Middleware ensures all changes go through these checks—no duplicate code in routes/controllers.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// 145 - Implementing soft deletes and audit trails in MongoDB or SQL
// -----------------------------------------------------------------------------
// THEORY:
// • Soft delete: Mark a record as deleted (e.g., isDeleted=true, deletedAt=timestamp) instead of removing it.
// • Audit trail: Log changes (who, what, when) for accountability and data recovery.
// • Both patterns are critical for compliance, undo, analytics, and debugging.
//
// -----------------------------------------------------------------------------
// SOFT DELETE EXAMPLE (MongoDB/Mongoose)
// -----------------------------------------------------------------------------
// 1. Schema fields for soft delete & audit
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
  deletedBy: String, // For audit (user ID or name)
  updatedAt: Date,
  updatedBy: String, // For audit
});

// 2. Soft delete method (set flags instead of .remove())
itemSchema.methods.softDelete = async function(userId) {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.deletedBy = userId;
  await this.save();
};

// 3. Query only non-deleted items (override .find)
itemSchema.statics.findActive = function(filter = {}) {
  return this.find({ ...filter, isDeleted: false });
};

const Item = mongoose.model('Item', itemSchema);

// -----------------------------------------------------------------------------
// SOFT DELETE EXAMPLE (SQL: e.g., PostgreSQL)
// -----------------------------------------------------------------------------
// CREATE TABLE items (
//   id SERIAL PRIMARY KEY,
//   name TEXT,
//   is_deleted BOOLEAN DEFAULT FALSE,
//   deleted_at TIMESTAMP,
//   deleted_by TEXT,
//   updated_at TIMESTAMP,
//   updated_by TEXT
// );
//
// -- Soft delete:
// UPDATE items SET is_deleted = TRUE, deleted_at = NOW(), deleted_by = 'userId' WHERE id = 1;
//
// -- Query active:
// SELECT * FROM items WHERE is_deleted = FALSE;
//
// -----------------------------------------------------------------------------
// AUDIT TRAIL EXAMPLES
// -----------------------------------------------------------------------------
// 1. Mongoose pre-save: Record update info
itemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  // this.updatedBy = ... // set in your route/controller
  next();
});

// 2. SQL: Insert audit logs
// CREATE TABLE item_audit_logs (
//   id SERIAL PRIMARY KEY,
//   item_id INT,
//   action TEXT, -- 'create', 'update', 'delete'
//   user_id TEXT,
//   action_at TIMESTAMP DEFAULT NOW()
// );
//
// -- Log change:
// INSERT INTO item_audit_logs (item_id, action, user_id) VALUES (1, 'delete', 'userId');
//
// -----------------------------------------------------------------------------
// EXPLANATION:
// • Soft deletes preserve data (allow recovery, auditing, analytics).
// • Audit trails track WHO made WHAT change and WHEN—critical for compliance and debugging.
// • Use static methods or scopes in code to always exclude soft-deleted records by default.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



// 146 - Sharding and replication in MongoDB: scaling horizontally
// -----------------------------------------------------------------------------
// THEORY:
// • Sharding: Distributes data across multiple servers ("shards") for horizontal scaling.
//   - Used for very large datasets or high-throughput workloads.
//   - Each shard holds a subset of the data, determined by a shard key.
//
// • Replication: Copies data across multiple servers (replica set) for redundancy & high availability.
//   - One primary node receives writes; secondaries replicate from it.
//   - Failover: If the primary goes down, a secondary is promoted.
//
// -----------------------------------------------------------------------------
// SHARDING SETUP (high-level commands, not runnable here!)
// -----------------------------------------------------------------------------
// 1. Start/configure config servers (store cluster metadata)
//    mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/configdb
// 2. Initiate config server replica set in mongo shell
//    rs.initiate({_id: "configReplSet", configsvr: true, members: [...]})
//
// 3. Start shard servers (each as a replica set)
//    mongod --shardsvr --replSet shardReplSetA --port 27018 --dbpath /data/shardA
//    rs.initiate({_id: "shardReplSetA", members: [...]})
//
// 4. Start mongos router (handles routing/queries)
//    mongos --configdb configReplSet/host1:27019,host2:27019,host3:27019 --port 27017
//
// 5. Connect to mongos and add shards
//    sh.addShard("shardReplSetA/hostA1:27018,hostA2:27018")
//    sh.enableSharding("myDatabase")
//
// 6. Choose a shard key and shard a collection
//    sh.shardCollection("myDatabase.myCollection", { userId: 1 })
//
// -----------------------------------------------------------------------------
// REPLICATION SETUP (simple replica set)
// -----------------------------------------------------------------------------
// 1. Start multiple mongod instances with --replSet
//    mongod --replSet myReplicaSet --port 27017 --dbpath /data/node1
//    mongod --replSet myReplicaSet --port 27018 --dbpath /data/node2
//
// 2. Initiate replica set in the mongo shell
//    rs.initiate({
//      _id: "myReplicaSet",
//      members: [
//        { _id: 0, host: "localhost:27017" },
//        { _id: 1, host: "localhost:27018" }
//      ]
//    })
//
// -----------------------------------------------------------------------------
// EXPLANATION:
// • Sharding allows you to scale horizontally—handling more data and traffic by adding machines.
// • Replication protects against hardware failure and enables automated failover.
// • In production, combine both: each shard is a replica set for best scalability + HA.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 147 - Read replicas and clustering in PostgreSQL for high availability
// -----------------------------------------------------------------------------
// THEORY:
// • High availability (HA) ensures your database stays online if hardware or server fails.
// • PostgreSQL supports two key HA features:
//    1. **Replication/Read Replicas:** Copies (“replicates”) data from a primary to one or more standby servers.
//         - Standbys can handle read-only queries (scaling reads, offloading reporting).
//         - Synchronous replication: Confirmed on standby before commit (strong consistency).
//         - Asynchronous replication: Primary commits, then replicates to standby (lower latency).
//    2. **Clustering (Failover):** If the primary fails, a standby is automatically promoted to primary.
//
// -----------------------------------------------------------------------------
// BASIC SETUP: POSTGRESQL STREAMING REPLICATION (high-level commands, config files)
// -----------------------------------------------------------------------------
// 1. On PRIMARY (master):
//    - postgresql.conf:
//        wal_level = replica
//        max_wal_senders = 10
//        hot_standby = on
//    - pg_hba.conf: Allow replication user from standby IP
//    - Create a replication user:
//        CREATE USER repuser REPLICATION LOGIN ENCRYPTED PASSWORD 'secret';
//
// 2. On STANDBY (replica):
//    - Stop postgres service
//    - Clone primary data directory (using pg_basebackup or rsync):
//        pg_basebackup -h primary_host -D /var/lib/postgresql/data -U repuser -P --wal-method=stream
//    - Create recovery.conf (Postgres 12+: standby.signal + primary_conninfo in postgresql.conf):
//        primary_conninfo = 'host=primary_host user=repuser password=secret'
//
// 3. Start standby; it will follow the primary and replay WAL logs.
//    - Now you have a primary/standby streaming replica setup.
//
// -----------------------------------------------------------------------------
// CLUSTERING & AUTOMATIC FAILOVER
// -----------------------------------------------------------------------------
// • Tools like **Patroni**, **Pgpool-II**, **repmgr**, or cloud solutions (AWS RDS, GCP Cloud SQL) automate failover and cluster management.
// • Load balancers (HAProxy, PgBouncer) can route queries to replicas for read scaling.
// • Health checks and monitoring are essential for production.
//
// -----------------------------------------------------------------------------
// EXPLANATION:
// • Read replicas let you scale read queries and improve resilience (use for reporting/analytics).
// • Clustering with automated failover ensures your app stays online if the master fails.
// • Combine replication, clustering tools, and load balancing for a robust, highly available PostgreSQL setup.
// -----------------------------------------------------------------------------

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// 148 - Using Redis as a session store or cache: configuring TTL, eviction policies
// -----------------------------------------------------------------------------
// THEORY:
// • Redis is an in-memory data store, great for caching and session management in Node.js apps.
// • TTL (Time-To-Live) allows cache/session entries to expire automatically.
// • Eviction policies control what Redis deletes first when memory is full.
//
// -----------------------------------------------------------------------------
// SESSION STORE EXAMPLE (Express + connect-redis)
// -----------------------------------------------------------------------------
// 1. Install dependencies:
//      npm install express express-session redis connect-redis
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const redisClient = createClient();
redisClient.connect().catch(console.error);

const app = express();
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hour
}));
// Sessions are stored in Redis. TTL = cookie.maxAge. Redis auto-expires them.

// -----------------------------------------------------------------------------
// CACHE EXAMPLE (Manual caching with TTL)
// -----------------------------------------------------------------------------
async function cacheExample() {
  // Set a cache key with TTL of 30 seconds
  await redisClient.set('foo', 'bar', { EX: 30 }); // EX=expire (TTL) in seconds

  // Get the cache value
  const value = await redisClient.get('foo');
  console.log(value); // 'bar'

  // Wait >30s and the value will auto-expire
}

// -----------------------------------------------------------------------------
// REDIS EVICTION POLICIES
// -----------------------------------------------------------------------------
/*
• Redis eviction policy controls what happens when Redis runs out of memory:
  - noeviction (default): New writes error out when full
  - allkeys-lru: Least Recently Used keys (all) evicted
  - volatile-lru: LRU eviction, only keys with TTL
  - allkeys-random: Random eviction (all keys)
  - volatile-random: Random eviction, only TTL keys
  - volatile-ttl: Evict keys with soonest TTL expiry

• Set in redis.conf:
    maxmemory 256mb
    maxmemory-policy allkeys-lru
*/

// -----------------------------------------------------------------------------
// EXPLANATION:
// • Use Redis for fast session storage and caching—set TTL for auto-expiry.
// • Eviction policy selection is crucial in memory-constrained environments.
// • Always monitor Redis usage and tune 'maxmemory' and 'maxmemory-policy' for your needs.
// -----------------------------------------------------------------------------

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