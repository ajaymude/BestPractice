// 1 create

// Create a single document in the collection
db.collname.insertOne({ name: "ajay" });

// Create multiple documents in the collection
db.collname.insertMany([{ name: "raj" }, { name: "avi" }]);

// Insert multiple documents and continue the operation even if one document fails (ordered: false)
db.collname.insertMany(
  [
    { field1: "value1", field2: "value2" },
    { field1: "value3", field2: "value4" },
  ],
  { ordered: false }
);

// Insert a single document with write concern (waiting for majority acknowledgment from replica set members)
db.collname.insertOne(
  { field1: "value1", field2: "value2" },
  { writeConcern: { w: "majority" } }
);

// Insert a single document and bypass document validation rules if validation is enabled
db.collname.insertOne(
  { field1: "value1", field2: "value2" },
  { bypassDocumentValidation: true }
);

// Insert a document with a custom timestamp (e.g., using a Date object)
db.collname.insertOne({ name: "ajay", createdAt: new Date() });

// Insert a document with an auto-generated `_id`
db.collname.insertOne({ name: "ajay" }); // MongoDB automatically generates the _id field if not provided

// Insert a document with a custom `_id` (you can specify the _id manually)
db.collname.insertOne({ _id: 1001, name: "ajay" });

// Insert multiple documents with a custom `_id`
db.collname.insertMany([
  { _id: 1001, name: "ajay" },
  { _id: 1002, name: "raj" },
]);

// Insert a document with embedded arrays or objects
db.collname.insertOne({
  name: "ajay",
  hobbies: ["reading", "coding"],
  address: { city: "Delhi", country: "India" },
});

// Insert multiple documents with different structures
db.collname.insertMany([
  { name: "ajay", age: 25 },
  { name: "raj", age: 30, occupation: "developer" },
  { name: "avi", age: 28, hobbies: ["music", "sports"] },
]);

// Insert a document using the `bulkWrite` method for bulk operations
db.collname.bulkWrite([
  { insertOne: { document: { name: "ajay", age: 25 } } },
  { insertOne: { document: { name: "raj", age: 30 } } },
]);

// Insert documents with conditional insertion using `upsert` (insert if not exist, update if exists)
db.collname.updateOne(
  { name: "ajay" },
  { $set: { age: 25 } },
  { upsert: true } // If "ajay" doesn't exist, it will be inserted
);

// Insert a document and set a field to be of a specific type (e.g., number, date)
db.collname.insertOne({
  name: "ajay",
  birthdate: new Date("1998-12-15"),
  score: 95.5,
});

// 2 Read

// find the coupon with the two field
const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });

const coupon = await Coupon.findOne({
  code: code,
  userId: req.user._id,
  isActive: true,
});
res.json(coupon || null);



