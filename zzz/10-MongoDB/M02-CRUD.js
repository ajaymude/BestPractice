
// 🔍 CRUD OPERATIONS
// 21 - Querying documents: find(), findOne()
// 22 - Query operators: comparison ($eq, $gt, $gte, $lt, $lte, $ne), logical ($and, $or, $not, $nor), element ($exists, $type)
// 23 - Evaluation operators: $regex, $expr, $mod, $where
// 24 - Array operators: $in, $nin, $all, $size, $elemMatch
// 25 - Projection: including or excluding fields using projection objects
// 26 - Sorting results: sort()
// 27 - Limiting and skipping results: limit(), skip()
// 28 - Counting documents: countDocuments(), estimatedDocumentCount()
// 29 - Updating documents: updateOne(), updateMany(), replaceOne()
// 30 - Update operators: $set, $unset, $inc, $mul, $rename, $min, $max, $currentDate
// 31 - Array update operators: $push, $pop, $pull, $addToSet, $each, $slice, $sort
// 32 - Upsert option in updates: setting upsert: true
// 33 - Deleting documents: deleteOne(), deleteMany()
// 34 - Bulk write operations: bulkWrite(), writeConcern usage
// 35 - Working with write concerns and journaling: w, wtimeout, j options



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 21 - Querying documents: find(), findOne()

// =============================
// Using the MongoDB Native Driver
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function queryNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) find(filter, options)
  //    - Returns a Cursor for all docs matching `filter`.
  //    - You can chain methods: sort(), limit(), project(), etc.
  //    - To get results, call toArray() or iterate the cursor.
  const adultCursor = users
    .find({ age: { $gte: 18 } })      // filter: age ≥ 18
    .sort({ age: 1 })                 // optional: sort by age ascending
    .project({ password: 0 })         // optional: exclude sensitive fields
    .limit(10);                       // optional: cap results

  const adults = await adultCursor.toArray();
  console.log('Adults (18+):', adults);

  // 2) findOne(filter, options)
  //    - Returns the *first* document matching `filter`, or null if none.
  //    - Accepts projection and other options same as find().
  const alice = await users.findOne(
    { name: 'Alice' },                // filter: name = 'Alice'
    { projection: { _id: 0, email: 1 } } // only show email
  );
  console.log('Alice ▶', alice);

  await client.close();
}

// =============================
// Using Mongoose (ODM)
// =============================
const mongoose = require('mongoose');

// define a simple User schema
const userSchema = new mongoose.Schema({
  name:    String,
  age:     Number,
  email:   String,
});
const User = mongoose.model('User', userSchema);

async function queryMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) Model.find(filter, projection, options)
  //    - Returns an Array of matching docs.
  //    - Can chain: .sort(), .limit(), .select(), .lean(), .exec()
  const teenUsers = await User
    .find({ age: { $gte: 13, $lte: 19 } }) // ages 13–19
    .sort('age')                           // sort by age ascending
    .select('name age')                    // only include name & age
    .limit(5)                              // first 5 results
    .lean()                                // return plain JS objects
    .exec();                               // returns a Promise

  console.log('Teen users:', teenUsers);

  // 2) Model.findOne(filter, projection, options)
  //    - Returns the *first* matching doc, or null.
  const bob = await User
    .findOne({ name: 'Bob' })            // filter by name
    .select('-_id name age email')       // exclude _id, include other fields
    .exec();

  console.log('Bob ▶', bob);

  await mongoose.disconnect();
}

// run examples
queryNative()
  .then(() => queryMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 22 - Query operators: comparison, logical, element

// =============================
// Using the MongoDB Native Driver
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function queryOperatorsNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // --- Comparison operators ---
  // $eq: equals, $gt: greater than, $gte: ≥, $lt: <, $lte: ≤, $ne: not equal
  const exactly30 = await users.find({ age: { $eq: 30 } }).toArray();
  console.log('Age == 30 →', exactly30);

  const olderThan20 = await users.find({ age: { $gt: 20 } }).toArray();
  console.log('Age > 20 →', olderThan20);

  const between18and25 = await users
    .find({ age: { $gte: 18, $lte: 25 } })
    .toArray();
  console.log('18 ≤ Age ≤ 25 →', between18and25);

  const not25 = await users.find({ age: { $ne: 25 } }).toArray();
  console.log('Age ≠ 25 →', not25);

  // --- Logical operators ---
  // $and, $or, $not, $nor
  const teenOrSenior = await users
    .find({
      $or: [
        { age: { $gte: 65 } },  // seniors
        { age: { $gte: 13, $lte: 19 } } // teens
      ]
    })
    .toArray();
  console.log('Teens or Seniors →', teenOrSenior);

  const youngNonUS = await users
    .find({
      $and: [
        { age: { $lt: 30 } },
        { country: { $ne: 'US' } }
      ]
    })
    .toArray();
  console.log('Age < 30 AND country ≠ US →', youngNonUS);

  // $not wraps a query: here, exclude those whose name starts with 'A'
  const notA = await users
    .find({ name: { $not: { $regex: /^A/ } } })
    .toArray();
  console.log('Name NOT starting with A →', notA);

  // $nor: neither condition may be true
  const neitherTeenNorSenior = await users
    .find({
      $nor: [
        { age: { $gte: 65 } },
        { age: { $gte: 13, $lte: 19 } }
      ]
    })
    .toArray();
  console.log('Neither Teen Nor Senior →', neitherTeenNorSenior);

  // --- Element operators ---
  // $exists: field presence, $type: BSON type
  const hasEmail = await users.find({ email: { $exists: true } }).toArray();
  console.log('Have email field →', hasEmail);

  const stringNames = await users.find({ name: { $type: 'string' } }).toArray();
  console.log('Name is a string →', stringNames);

  await client.close();
}

// =============================
// Using Mongoose (ODM)
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:    String,
  age:     Number,
  country: String,
  email:   String,
});
const User = mongoose.model('User', userSchema);

async function queryOperatorsMongoose() {
  await mongoose.connect(uri + '/mydb');

  // --- Comparison ---
  const eq30 = await User.find({ age: { $eq: 30 } }).lean().exec();
  console.log('Mongoose: age == 30 →', eq30);

  const between = await User
    .find({ age: { $gte: 18, $lte: 25 } })
    .select('name age')
    .lean()
    .exec();
  console.log('Mongoose: 18 ≤ age ≤ 25 →', between);

  // --- Logical ---
  const teensOrSrs = await User
    .find({ $or: [{ age: { $gte: 65 } }, { age: { $gte: 13, $lte: 19 } }] })
    .lean()
    .exec();
  console.log('Mongoose: teens or seniors →', teensOrSrs);

  const notAName = await User
    .find({ name: { $not: /^A/ } })
    .lean()
    .exec();
  console.log('Mongoose: name not starting with A →', notAName);

  // --- Element ---
  const hasMail = await User.find({ email: { $exists: true } }).lean().exec();
  console.log('Mongoose: has email →', hasMail);

  const typeChecks = await User.find({ name: { $type: 'string' } }).lean().exec();
  console.log('Mongoose: name is string →', typeChecks);

  await mongoose.disconnect();
}

// Execute both examples
queryOperatorsNative()
  .then(() => queryOperatorsMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 23 - Evaluation operators: $regex, $expr, $mod, $where

// =============================
// Using the MongoDB Native Driver
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function evalOperatorsNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const products = db.collection('products');

  // 1) $regex – match string patterns
  //    Find products whose name contains “pro” (case-insensitive)
  const regexMatches = await products
    .find({ name: { $regex: 'pro', $options: 'i' } })
    .toArray();
  console.log('Regex “pro” →', regexMatches);

  // 2) $expr – compare fields or use aggregation expressions
  //    Find docs where stock quantity is less than price
  const exprMatches = await products
    .find({ $expr: { $lt: ['$stock', '$price'] } })
    .toArray();
  console.log('stock < price →', exprMatches);

  // 3) $mod – match numeric fields by modulo
  //    Find products whose price is an even number
  const modMatches = await products
    .find({ price: { $mod: [2, 0] } })
    .toArray();
  console.log('price % 2 == 0 →', modMatches);

  // 4) $where – run a JavaScript expression per document
  //    Find products where price * 2 is greater than stock
  //    (use sparingly—$where can be slow)
  const whereMatches = await products
    .find({
      $where: function () {
        return this.price * 2 > this.stock;
      }
    })
    .toArray();
  console.log('price*2 > stock →', whereMatches);

  await client.close();
}

// =============================
// Using Mongoose (ODM)
// =============================
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name:    String,
  price:   Number,
  stock:   Number,
});
const Product = mongoose.model('Product', productSchema);

async function evalOperatorsMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) $regex
  const regex = await Product
    .find({ name: { $regex: 'pro', $options: 'i' } })
    .lean()
    .exec();
  console.log('Mongoose regex “pro” →', regex);

  // 2) $expr
  const expr = await Product
    .find({ $expr: { $lt: ['$stock', '$price'] } })
    .lean()
    .exec();
  console.log('Mongoose stock < price →', expr);

  // 3) $mod
  const mod = await Product
    .find({ price: { $mod: [2, 0] } })
    .lean()
    .exec();
  console.log('Mongoose price % 2 == 0 →', mod);

  // 4) $where
  const where = await Product
    .find({
      $where: 'this.price * 2 > this.stock'
    })
    .lean()
    .exec();
  console.log('Mongoose price*2 > stock →', where);

  await mongoose.disconnect();
}

// Execute examples
evalOperatorsNative()
  .then(() => evalOperatorsMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 24 – Array operators: $in, $nin, $all, $size, $elemMatch

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function arrayOperatorsNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const posts = db.collection('posts');

  // 1) $in — field’s value is in the given array
  //    Find posts tagged either “mongodb” or “nodejs”
  const inResults = await posts
    .find({ tags: { $in: ['mongodb', 'nodejs'] } })
    .toArray();
  console.log('Tagged mongodb OR nodejs →', inResults);

  // 2) $nin — field’s value is NOT in the given array
  //    Find posts not tagged “draft” or “internal”
  const ninResults = await posts
    .find({ tags: { $nin: ['draft', 'internal'] } })
    .toArray();
  console.log('Not tagged draft NOR internal →', ninResults);

  // 3) $all — field’s array contains all specified elements
  //    Find posts tagged both “javascript” AND “react”
  const allResults = await posts
    .find({ tags: { $all: ['javascript', 'react'] } })
    .toArray();
  console.log('Tagged BOTH javascript AND react →', allResults);

  // 4) $size — field’s array has exactly N elements
  //    Find posts with exactly 3 tags
  const sizeResults = await posts
    .find({ tags: { $size: 3 } })
    .toArray();
  console.log('Exactly 3 tags →', sizeResults);

  // 5) $elemMatch — array contains at least one element matching subfilter
  //    Suppose comments is an array of { author, likes }
  //    Find posts with a comment by "Alice" that has ≥ 10 likes
  const elemMatchResults = await posts
    .find({
      comments: {
        $elemMatch: { author: 'Alice', likes: { $gte: 10 } }
      }
    })
    .toArray();
  console.log('Comments by Alice with ≥10 likes →', elemMatchResults);

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title:    String,
  tags:     [String],
  comments: [{ author: String, likes: Number }],
});
const Post = mongoose.model('Post', postSchema);

async function arrayOperatorsMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) $in
  const inM = await Post.find({ tags: { $in: ['mongodb', 'nodejs'] } }).lean();
  console.log('Mongoose: tags in [mongodb, nodejs] →', inM);

  // 2) $nin
  const ninM = await Post.find({ tags: { $nin: ['draft', 'internal'] } }).lean();
  console.log('Mongoose: tags not in [draft, internal] →', ninM);

  // 3) $all
  const allM = await Post.find({ tags: { $all: ['javascript', 'react'] } }).lean();
  console.log('Mongoose: tags all [javascript, react] →', allM);

  // 4) $size
  const sizeM = await Post.find({ tags: { $size: 3 } }).lean();
  console.log('Mongoose: tags size 3 →', sizeM);

  // 5) $elemMatch
  const elemMatchM = await Post.find({
    comments: { $elemMatch: { author: 'Alice', likes: { $gte: 10 } } }
  }).lean();
  console.log('Mongoose: comments elemMatch →', elemMatchM);

  await mongoose.disconnect();
}

// Execute examples
arrayOperatorsNative()
  .then(() => arrayOperatorsMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 25 – Projection: including or excluding fields using projection objects

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function projectionNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) Include specific fields (1 = include, 0 = exclude)
  //    Only _id, name, and email will be returned
  const includeFields = await users
    .find({}, { projection: { _id: 1, name: 1, email: 1 } })
    .toArray();
  console.log('Include _id, name, email →', includeFields);

  // 2) Exclude specific fields
  //    Return all fields except password and socialSecurityNumber
  const excludeFields = await users
    .find({}, { projection: { password: 0, socialSecurityNumber: 0 } })
    .toArray();
  console.log('Exclude password & SSN →', excludeFields);

  // 3) Exclude _id
  //    Often you want to hide the internal _id field
  const noId = await users
    .find({}, { projection: { _id: 0, name: 1, age: 1 } })
    .toArray();
  console.log('Hide _id, include name & age →', noId);

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:    String,
  age:     Number,
  email:   String,
  password: String,
  socialSecurityNumber: String,
});
const User = mongoose.model('User', userSchema);

async function projectionMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) Include fields with .select()
  //    Only name & email (and _id by default) are returned
  const includeM = await User.find()
    .select('name email')
    .lean()
    .exec();
  console.log('Mongoose include name & email →', includeM);

  // 2) Exclude fields by prefixing with '-'
  //    Remove password and socialSecurityNumber from results
  const excludeM = await User.find()
    .select('-password -socialSecurityNumber')
    .lean()
    .exec();
  console.log('Mongoose exclude password & SSN →', excludeM);

  // 3) Exclude _id and include other fields
  const customM = await User.find()
    .select('-_id name age')
    .lean()
    .exec();
  console.log('Mongoose hide _id, include name & age →', customM);

  await mongoose.disconnect();
}

// Run both examples
projectionNative()
  .then(() => projectionMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 26 – Sorting results: sort()

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function sortingNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) Simple ascending sort
  //    Sort by age in ascending order (youngest first)
  const byAgeAsc = await users
    .find({})
    .sort({ age: 1 })
    .toArray();
  console.log('Users sorted by age ↑ →', byAgeAsc);

  // 2) Simple descending sort
  //    Sort by age in descending order (oldest first)
  const byAgeDesc = await users
    .find({})
    .sort({ age: -1 })
    .toArray();
  console.log('Users sorted by age ↓ →', byAgeDesc);

  // 3) Compound sort
  //    Sort first by country (A→Z), then within each country by name (Z→A)
  const compound = await users
    .find({})
    .sort({ country: 1, name: -1 })
    .toArray();
  console.log('Sorted by country ↑, then name ↓ →', compound);

  // 4) Combining sort with limit
  //    Get the top 5 oldest users
  const top5Oldest = await users
    .find({})
    .sort({ age: -1 })
    .limit(5)
    .toArray();
  console.log('Top 5 oldest users →', top5Oldest);

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:    String,
  age:     Number,
  country: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

async function sortingMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) Ascending sort
  const asc = await User.find({})
    .sort({ createdAt: 1 }) // oldest first
    .lean()
    .exec();
  console.log('Mongoose: sorted by createdAt ↑ →', asc);

  // 2) Descending sort
  const desc = await User.find({})
    .sort({ createdAt: -1 }) // newest first
    .lean()
    .exec();
  console.log('Mongoose: sorted by createdAt ↓ →', desc);

  // 3) Compound sort
  const comp = await User.find({})
    .sort({ country: 1, age: -1 }) // country A→Z, age ↓
    .lean()
    .exec();
  console.log('Mongoose: country ↑, age ↓ →', comp);

  // 4) Pagination-style sorting with skip & limit
  //    Get page 2 of users sorted by name
  const pageSize = 10, page = 2;
  const page2 = await User.find({})
    .sort({ name: 1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean()
    .exec();
  console.log('Mongoose: page 2 sorted by name →', page2);

  await mongoose.disconnect();
}

// Run examples
sortingNative()
  .then(() => sortingMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 27 – Limiting and skipping results: limit(), skip()

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function pagingNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const articles = db.collection('articles');

  // Example: get first 5 documents
  const firstFive = await articles
    .find({})
    .limit(5)
    .toArray();
  console.log('First 5 articles →', firstFive);

  // Example: skip the first 5, then get next 5 (page 2)
  const pageSize = 5;
  const page2 = await articles
    .find({})
    .skip(pageSize)    // skip first pageSize docs
    .limit(pageSize)   // then take pageSize docs
    .toArray();
  console.log('Page 2 (articles 6–10) →', page2);

  // Example: skip a dynamic number of docs for any page
  const page = 3;
  const skipCount = pageSize * (page - 1);
  const page3 = await articles
    .find({})
    .skip(skipCount)   // skip first 10 docs for page 3
    .limit(pageSize)   // then take 5 docs
    .toArray();
  console.log(`Page ${page} (articles ${skipCount+1}–${skipCount+pageSize}) →`, page3);

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  title:   String,
  content: String,
  tags:    [String],
  created: { type: Date, default: Date.now }
});
const Article = mongoose.model('Article', articleSchema);

async function pagingMongoose() {
  await mongoose.connect(uri + '/mydb');

  const pageSize = 5;

  // 1) First page
  const firstPage = await Article
    .find({})
    .sort({ created: -1 })   // optional: sort newest first
    .limit(pageSize)
    .lean()
    .exec();
  console.log('Mongoose – First page →', firstPage);

  // 2) Second page
  const page = 2;
  const skipCount = pageSize * (page - 1);
  const secondPage = await Article
    .find({})
    .sort({ created: -1 })
    .skip(skipCount)
    .limit(pageSize)
    .lean()
    .exec();
  console.log(`Mongoose – Page ${page} →`, secondPage);

  await mongoose.disconnect();
}

// Run examples
pagingNative()
  .then(() => pagingMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 29 – Updating documents: updateOne(), updateMany(), replaceOne()

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function updatingNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) updateOne(filter, update, options)
  //    - Updates the first document matching `filter`.
  //    - Commonly uses update operators like $set, $inc, etc.
  const updateOneResult = await users.updateOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d") },    // filter by _id
    { 
      $set: { email: "newemail@example.com" },      // set a new email
      $inc: { loginCount: 1 }                       // increment loginCount
    },
    { upsert: false }                               // don't insert if not found
  );
  console.log('updateOne →', updateOneResult.modifiedCount, 'doc(s) updated');

  // 2) updateMany(filter, update, options)
  //    - Updates all documents matching `filter`.
  //    - Useful for bulk modifications.
  const updateManyResult = await users.updateMany(
    { status: "inactive" },                         // all inactive users
    { $set: { status: "archived" } },               // mark them archived
    { upsert: false }
  );
  console.log('updateMany →', updateManyResult.modifiedCount, 'doc(s) updated');

  // 3) replaceOne(filter, replacement, options)
  //    - Replaces the entire matched document with `replacement`.
  //    - _id remains the same unless you explicitly change it.
  const replaceOneResult = await users.replaceOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2e") },  // filter by _id
    { 
      name: "Jane Doe",
      email: "jane.doe@example.com",
      age: 28,
      status: "active"
      // any fields not listed here are removed
    },
    { upsert: false }
  );
  console.log('replaceOne →', replaceOneResult.modifiedCount, 'doc(s) replaced');

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:       String,
  email:      String,
  age:        Number,
  status:     String,
  loginCount: Number
});
const User = mongoose.model('User', userSchema);

async function updatingMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) updateOne()
  const updOne = await User.updateOne(
    { email: 'old@example.com' },                  
    { 
      $set: { email: 'updated@example.com' },
      $inc: { loginCount: 1 }
    }
  ).exec();
  console.log('Mongoose updateOne →', updOne.nModified, 'doc(s) updated');

  // 2) updateMany()
  const updMany = await User.updateMany(
    { status: 'pending' },
    { $set: { status: 'processing' } }
  ).exec();
  console.log('Mongoose updateMany →', updMany.nModified, 'doc(s) updated');

  // 3) replaceOne()
  const repOne = await User.replaceOne(
    { name: 'Temp User' },
    {
      name: 'Permanent User',
      email: 'perm.user@example.com',
      age: 30,
      status: 'active',
      loginCount: 0
    }
  ).exec();
  console.log('Mongoose replaceOne →', repOne.nModified, 'doc(s) replaced');

  await mongoose.disconnect();
}

// Execute both
updatingNative()
  .then(() => updatingMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 30 – Update operators: $set, $unset, $inc, $mul, $rename, $min, $max, $currentDate

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function updateOperatorsNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const products = db.collection('products');

  // 1) $set — add or update a field
  await products.updateOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d") },
    { $set: { price: 19.99, onSale: true } }
  );

  // 2) $unset — remove a field
  await products.updateOne(
    { sku: 'ABC-123' },
    { $unset: { discontinued: "" } }
  );

  // 3) $inc — increment (or decrement) a numeric field
  await products.updateOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d") },
    { $inc: { stock: -2 } }  // subtract 2 from stock
  );

  // 4) $mul — multiply a numeric field
  await products.updateOne(
    { category: 'electronics' },
    { $mul: { weight: 1.1 } } // increase weight by 10%
  );

  // 5) $rename — rename a field
  await products.updateMany(
    { },
    { $rename: { oldFieldName: "newFieldName" } }
  );

  // 6) $min — only update if the specified value is less than the current
  await products.updateOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d") },
    { $min: { price: 9.99 } } // set price to 9.99 only if current price > 9.99
  );

  // 7) $max — only update if the specified value is greater than the current
  await products.updateOne(
    { _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d") },
    { $max: { rating: 4.8 } } // set rating to 4.8 only if current < 4.8
  );

  // 8) $currentDate — set a field to the current date or timestamp
  await products.updateOne(
    { sku: 'ABC-123' },
    { $currentDate: { lastModified: true, lastChecked: { $type: "timestamp" } } }
  );
  
  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name:         String,
  price:        Number,
  stock:        Number,
  weight:       Number,
  rating:       Number,
  discontinued: Boolean,
  lastModified: Date,
  lastChecked:  mongoose.Schema.Types.Timestamp
});
const Product = mongoose.model('Product', productSchema);

async function updateOperatorsMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) $set
  await Product.updateOne(
    { name: 'Gadget Pro' },
    { $set: { price: 19.99, onSale: true } }
  ).exec();

  // 2) $unset
  await Product.updateOne(
    { name: 'Gadget Pro' },
    { $unset: { discontinued: "" } }
  ).exec();

  // 3) $inc
  await Product.updateOne(
    { name: 'Widget' },
    { $inc: { stock: -5 } }
  ).exec();

  // 4) $mul
  await Product.updateMany(
    { category: 'electronics' },
    { $mul: { weight: 1.1 } }
  ).exec();

  // 5) $rename
  await Product.updateMany(
    {},
    { $rename: { oldFieldName: "newFieldName" } }
  ).exec();

  // 6) $min
  await Product.updateOne(
    { name: 'Gadget Pro' },
    { $min: { price: 9.99 } }
  ).exec();

  // 7) $max
  await Product.updateOne(
    { name: 'Gadget Pro' },
    { $max: { rating: 4.8 } }
  ).exec();

  // 8) $currentDate
  await Product.updateOne(
    { name: 'Gadget Pro' },
    { $currentDate: { lastModified: true, lastChecked: { $type: "timestamp" } } }
  ).exec();

  await mongoose.disconnect();
}

// Execute examples
updateOperatorsNative()
  .then(() => updateOperatorsMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



// 31 – Array update operators: $push, $pop, $pull, $addToSet, $each, $slice, $sort

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function arrayUpdatesNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const playlists = db.collection('playlists');

  // Sample document shape:
  // { _id, name: String, tracks: [ { title, duration } ] }

  // 1) $push — append a single element
  await playlists.updateOne(
    { _id: ObjectId("64aabcd1e2f3a4b5c6d7e8f") },
    { $push: { tracks: { title: "New Track", duration: 180 } } }
  );

  // 2) $pop — remove first (-1) or last (1) element
  await playlists.updateOne(
    { _id: ObjectId("64aabcd1e2f3a4b5c6d7e8f") },
    { $pop: { tracks: -1 } }   // remove first track
  );
  await playlists.updateOne(
    { _id: ObjectId("64aabcd1e2f3a4b5c6d7e8f") },
    { $pop: { tracks: 1 } }    // remove last track
  );

  // 3) $pull — remove all elements matching a condition
  await playlists.updateMany(
    { },
    { $pull: { tracks: { duration: { $lt: 60 } } } }  // drop tracks shorter than 60s
  );

  // 4) $addToSet — push only if not already present
  await playlists.updateOne(
    { _id: ObjectId("64aabcd1e2f3a4b5c6d7e8f") },
    { $addToSet: { tracks: { title: "Exclusive Mix", duration: 240 } } }
  );

  // 5) $push with modifiers: $each, $slice, $sort
  await playlists.updateOne(
    { _id: ObjectId("64aabcd1e2f3a4b5c6d7e8f") },
    {
      $push: {
        tracks: {
          $each: [
            { title: "Track A", duration: 200 },
            { title: "Track B", duration: 220 },
            { title: "Track C", duration: 210 }
          ],
          $sort: { duration: -1 },   // sort tracks by duration descending
          $slice: 10                 // keep only top 10 longest tracks
        }
      }
    }
  );

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const playlistSchema = new mongoose.Schema({
  name:   String,
  tracks: [{ title: String, duration: Number }]
});
const Playlist = mongoose.model('Playlist', playlistSchema);

async function arrayUpdatesMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) $push
  await Playlist.updateOne(
    { name: 'Chill Vibes' },
    { $push: { tracks: { title: 'Lounge Beat', duration: 180 } } }
  ).exec();

  // 2) $pop
  await Playlist.updateOne(
    { name: 'Chill Vibes' },
    { $pop: { tracks: -1 } }  // remove first
  ).exec();

  // 3) $pull
  await Playlist.updateMany(
    {},
    { $pull: { tracks: { duration: { $lt: 60 } } } }
  ).exec();

  // 4) $addToSet
  await Playlist.updateOne(
    { name: 'Chill Vibes' },
    { $addToSet: { tracks: { title: 'Exclusive Mix', duration: 240 } } }
  ).exec();

  // 5) $push with $each, $sort, $slice
  await Playlist.updateOne(
    { name: 'Chill Vibes' },
    {
      $push: {
        tracks: {
          $each: [
            { title: 'Track A', duration: 200 },
            { title: 'Track B', duration: 220 },
            { title: 'Track C', duration: 210 }
          ],
          $sort: { duration: -1 },
          $slice: 10
        }
      }
    }
  ).exec();

  await mongoose.disconnect();
}

// run examples
arrayUpdatesNative()
  .then(() => arrayUpdatesMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 32 – Upsert option in updates: setting upsert: true

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function upsertNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) updateOne with upsert: true
  //    If a user with email “foo@example.com” exists, update their name.
  //    Otherwise, insert a new document { email, name, createdAt }.
  const result1 = await users.updateOne(
    { email: 'foo@example.com' },                // filter
    {
      $set: { name: 'Foo Bar' },                 // update if exists
      $setOnInsert: { createdAt: new Date() }    // only on insert
    },
    { upsert: true }                             // enable upsert
  );
  console.log('Native updateOne upsert:', {
    matchedCount: result1.matchedCount,
    modifiedCount: result1.modifiedCount,
    upsertedId: result1.upsertedId
  });

  // 2) updateMany with upsert: true
  //    If no “pending” tasks exist, insert a new default task.
  const result2 = await db.collection('tasks').updateMany(
    { status: 'pending' },                       // filter
    {
      $set: { status: 'pending' },
      $setOnInsert: { createdAt: new Date(), assignee: null }
    },
    { upsert: true }
  );
  console.log('Native updateMany upsert:', {
    matchedCount: result2.matchedCount,
    modifiedCount: result2.modifiedCount,
    upsertedId: result2.upsertedId
  });

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email:     String,
  name:      String,
  createdAt: Date
});
const User = mongoose.model('User', userSchema);

async function upsertMongoose() {
  await mongoose.connect(uri + '/mydb');

  // findOneAndUpdate supports returning the document; updateOne also accepts upsert.
  // Here’s updateOne:
  const res1 = await User.updateOne(
    { email: 'foo@example.com' },               // filter
    {
      name: 'Foo Bar',
      createdAt: new Date()                     // will be set on insert
    },
    { upsert: true }
  );
  console.log('Mongoose updateOne upsert:', res1);

  // Or using findOneAndUpdate to get the upserted document back:
  const doc = await User.findOneAndUpdate(
    { email: 'alice@example.com' },             // filter
    { name: 'Alice Wonderland' },               // updates
    {
      upsert: true,                             // insert if not found
      new: true,                                // return the new document
      setDefaultsOnInsert: true                 // apply defaults on insert
    }
  ).lean();
  console.log('Mongoose findOneAndUpdate upserted document:', doc);

  await mongoose.disconnect();
}

// Execute examples
upsertNative()
  .then(() => upsertMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 33 – Deleting documents: deleteOne(), deleteMany()

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function deleteDocsNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // 1) deleteOne(filter)
  //    - Deletes the first document matching the filter.
  //    - Returns a DeleteResult with deletedCount.
  const delOneResult = await users.deleteOne({
    _id: ObjectId("64a1234b5c6d7e8f9a0b1c2d")
  });
  console.log('deleteOne →', delOneResult.deletedCount, 'doc(s) deleted');

  // 2) deleteMany(filter)
  //    - Deletes all documents matching the filter.
  const delManyResult = await users.deleteMany({
    status: 'inactive'
  });
  console.log('deleteMany →', delManyResult.deletedCount, 'doc(s) deleted');

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:   String,
  email:  String,
  status: String
});
const User = mongoose.model('User', userSchema);

async function deleteDocsMongoose() {
  await mongoose.connect(uri + '/mydb');

  // 1) deleteOne()
  //    - Removes the first matching document.
  const delOne = await User.deleteOne({ email: 'foo@example.com' }).exec();
  console.log('Mongoose deleteOne →', delOne.deletedCount, 'doc(s) deleted');

  // 2) deleteMany()
  //    - Removes all documents matching the filter.
  const delMany = await User.deleteMany({ status: 'pending' }).exec();
  console.log('Mongoose deleteMany →', delMany.deletedCount, 'doc(s) deleted');

  await mongoose.disconnect();
}

// Execute both examples
deleteDocsNative()
  .then(() => deleteDocsMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 34 – Bulk write operations: bulkWrite(), writeConcern usage

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function bulkNative() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('mydb');
  const users = db.collection('users');

  // Prepare an array of mixed write operations
  const ops = [
    // insertOne: add a new user
    { insertOne: { document: { name: 'Alice', age: 25, city: 'London' } } },
    // updateOne: set Bob’s age to 30 (upsert if not exists)
    {
      updateOne: {
        filter: { name: 'Bob' },
        update: { $set: { age: 30 } },
        upsert: true
      }
    },
    // replaceOne: replace Charlie’s document entirely
    {
      replaceOne: {
        filter: { name: 'Charlie' },
        replacement: { name: 'Charlie', age: 28, city: 'Berlin' },
        upsert: false
      }
    },
    // deleteOne: remove any user named Dave
    { deleteOne: { filter: { name: 'Dave' } } },
    // updateMany: increment age by 1 for all users in 'Paris'
    {
      updateMany: {
        filter: { city: 'Paris' },
        update: { $inc: { age: 1 } }
      }
    }
  ];

  // Perform bulkWrite with unordered execution and custom writeConcern
  const result = await users.bulkWrite(ops, {
    ordered: false, // continue on errors
    writeConcern: { w: 'majority', wtimeout: 5000 }
  });

  console.log('bulkWrite result:', {
    insertedCount:   result.insertedCount,
    matchedCount:    result.matchedCount,
    modifiedCount:   result.modifiedCount,
    upsertedCount:   result.upsertedCount,
    deletedCount:    result.deletedCount,
    upsertedIds:     result.upsertedIds
  });

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  age:  Number,
  city: String
});
const User = mongoose.model('User', userSchema);

async function bulkMongoose() {
  await mongoose.connect(uri + '/mydb', {
    // Optionally set default writeConcern at the connection level
    w: 'majority', wtimeoutMS: 5000
  });

  // Define bulk operations array for Mongoose
  const ops = [
    {
      insertOne: {
        document: { name: 'Alice', age: 25, city: 'London' }
      }
    },
    {
      updateOne: {
        filter: { name: 'Bob' },
        update: { $set: { age: 30 } },
        upsert: true
      }
    },
    {
      replaceOne: {
        filter: { name: 'Charlie' },
        replacement: { name: 'Charlie', age: 28, city: 'Berlin' }
      }
    },
    {
      deleteOne: { filter: { name: 'Dave' } }
    },
    {
      updateMany: {
        filter: { city: 'Paris' },
        update: { $inc: { age: 1 } }
      }
    }
  ];

  // Execute bulkWrite on the model
  const result = await User.bulkWrite(ops, {
    ordered: true,                       // stop on first error
    writeConcern: { w: 1, j: true }      // 1-ack + journaled
  });

  console.log('Mongoose bulkWrite result:', {
    insertedCount:   result.insertedCount,
    matchedCount:    result.matchedCount,
    modifiedCount:   result.modifiedCount,
    upsertedCount:   result.upsertedCount,
    deletedCount:    result.deletedCount,
    upsertedIds:     result.upsertedIds
  });

  await mongoose.disconnect();
}

// Run examples
bulkNative()
  .then(() => bulkMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 35 – Working with write concerns and journaling: w, wtimeout, j options

// =============================
// MongoDB Native Driver Example
// =============================
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function writeConcernNative() {
  // You can set default writeConcern at the client/DB level:
  const client = new MongoClient(uri, {
    writeConcern: { w: 'majority', wtimeout: 5000, j: true }
  });
  await client.connect();
  const db = client.db('mydb');
  const orders = db.collection('orders');

  // 1) Per-operation override of writeConcern
  const result1 = await orders.insertOne(
    { item: 'Widget', qty: 10 },
    {
      writeConcern: { w: 1, wtimeout: 2000, j: false }
    }
  );
  console.log('insertOne w:1, wtimeout:2000, j:false →', result1.insertedId);

  // 2) updateOne with journaling required
  const result2 = await orders.updateOne(
    { _id: ObjectId(result1.insertedId) },
    { $inc: { qty: 5 } },
    {
      writeConcern: { w: 'majority', wtimeout: 3000, j: true }
    }
  );
  console.log('updateOne majority w/ journaling →', result2.modifiedCount);

  // 3) deleteMany with strict durability
  const result3 = await orders.deleteMany(
    { qty: { $lt: 5 } },
    {
      writeConcern: { w: 2, wtimeout: 1000, j: true }
    }
  );
  console.log('deleteMany requiring 2 replicas & journal →', result3.deletedCount);

  await client.close();
}

// =============================
// Mongoose (ODM) Example
// =============================
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  item: String,
  qty:  Number
}, {
  // Default writeConcern on this schema/model
  writeConcern: { w: 'majority', wtimeout: 5000, j: true }
});
const Order = mongoose.model('Order', orderSchema);

async function writeConcernMongoose() {
  // You can also specify writeConcern in the connection URI or options:
  await mongoose.connect(uri + '/mydb', {
    writeConcern: { w: 1, wtimeoutMS: 2000, j: false }
  });

  // 1) Uses connection-level writeConcern (w:1, wtimeout:2000, j:false)
  const doc = await Order.create({ item: 'Gadget', qty: 7 });
  console.log('Mongoose create w:1 →', doc._id);

  // 2) Override per-operation to require journaling
  const upd = await Order.updateOne(
    { _id: doc._id },
    { $inc: { qty: 3 } },
    {
      writeConcern: { w: 'majority', wtimeoutMS: 3000, j: true }
    }
  ).exec();
  console.log('Mongoose updateOne majority & journal →', upd.nModified);

  // 3) deleteOne with stronger replica acknowledgment
  const del = await Order.deleteOne(
    { _id: doc._id },
    {
      writeConcern: { w: 2, wtimeoutMS: 1000, j: true }
    }
  ).exec();
  console.log('Mongoose deleteOne 2-replica & journal →', del.deletedCount);

  await mongoose.disconnect();
}

// Execute examples
writeConcernNative()
  .then(() => writeConcernMongoose())
  .catch(console.error);

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////