// mongoDB installation
// community edition // msi
// compass // GUI

// stop mondoDB
// net stop MongoDB
// start mongoDB
// net start MongoDB
// mongoDB shell

// mongoDB shell // mongo.exe
// mongoDB shell // mongo.exe --host localhost --port 27017
// path // C:\Program Files\MongoDB\Server\6.0\bin

// Create
// insertOne() // insert a single document
// insertMany() // insert multiple documents

db.collection.insertOne({ name: "John", age: 30, city: "New York" });

db.collection.insertMany([
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Mike", age: 35, city: "Chicago" },
]);

await Order.insertMany(preparedOrders, { ordered: false });
// You can pass { ordered: false } to skip failed docs and continue inserting others

Order.insertMany(docs, { writeConcern: { w: 1, j: true, wtimeout: 5000 } });
// You can pass { writeConcern: { w: 1, j: true, wtimeout: 5000 } } to set the write concern for the operation
// w: 1 // write to the primary node
// j: true // wait for the write to be acknowledged by the journal
// wtimeout: 5000 // wait for 5 seconds before timing out

// Read
// find() // find all documents
// findOne() // find a single document
// findById() // find a document by id
// findByIdAndUpdate() // find a document by id and update it
// findByIdAndDelete() // find a document by id and delete it
// findByIdAndRemove() // find a document by id and remove it
// findByIdAndReplace() // find a document by id and replace it

db.collection.find({ name: "John" }); // find all documents with name John
db.collection.findOne({ name: "John" }); // find a single document with name John
db.collection.findById("60d5f484f3bf8c1d4c8b4567"); // find a document by id
db.collection.findByIdAndUpdate("60d5f484f3bf8c1d4c8b4567", {
  $set: { age: 31 },
}); // find a document by id and update it
db.collection.findByIdAndDelete("60d5f484f3bf8c1d4c8b4567"); // find a document by id and delete it
db.collection.findByIdAndRemove("60d5f484f3bf8c1d4c8b4567"); // find a document by id and remove it
db.collection.findByIdAndReplace("60d5f484f3bf8c1d4c8b4567", {
  name: "John",
  age: 31,
  city: "New York",
}); // find a document by id and replace it
db.collection.findByIdAndUpdate(
  "60d5f484f3bf8c1d4c8b4567",
  { $set: { age: 31 } },
  { new: true }
); // find a document by id and update it and return the new document

// example
// {
//     userId: ObjectId("..."),
//     totalPrice: 1500,
//     status: "delivered",
//     createdAt: ISODate("2025-04-29T10:00:00Z")
//   }

Order.find({ status: { $eq: "delivered" } });
Order.find({ status: "delivered" });
Order.find({ status: { $ne: "cancelled" } });
Order.find({ totalPrice: { $gt: 1000 } });
Order.find({ totalPrice: { $gte: 1500 } });
Order.find({ totalPrice: { $lt: 500 } });
Order.find({ totalPrice: { $lte: 999 } });
Order.find({
  totalPrice: { $gte: 500, $lte: 2000 },
  status: { $ne: "cancelled" },
});

Order.find({
  $and: [{ status: "delivered" }, { totalPrice: { $gt: 1000 } }],
});

Order.find({
  status: "delivered",
  totalPrice: { $gt: 1000 },
});

Order.find({
  $or: [{ status: "cancelled" }, { totalPrice: { $lt: 100 } }],
});

Order.find({
  totalPrice: { $not: { $gt: 1000 } },
});

Order.find({
  $nor: [{ status: "shipped" }, { totalPrice: { $lt: 100 } }],
});

Order.find({ couponCode: { $exists: true } });
Order.find({ couponCode: { $exists: false } });

Order.find({ status: { $type: "string" } });
Order.find({ totalPrice: { $type: "number" } });
Order.find({ customerName: { $regex: "John" } });

Order.find({
  $expr: { $eq: ["$totalPrice", { $add: ["$discount", "$finalPrice"] }] },
});

Order.find({
  items: { $size: 3 },
});

//   {
//     userId: mongoose.Schema.Types.ObjectId,
//     items: [
//       {
//         productId: mongoose.Schema.Types.ObjectId,
//         quantity: Number,
//         price: Number
//       }
//     ],
//     status: String,
//   }
Order.find({ "items.productId": productId });
Order.find({
  items: {
    $elemMatch: {
      productId: productId,
      quantity: { $gt: 1 },
    },
  },
});
Product.find({ tags: { $all: ["electronics", "mobile"] } }); // order is not required
Order.find({ items: [productId1, productId2] }); // search the exact item
Order.find({ status: { $in: ["shipped", "delivered"] } });
Order.find({ status: { $nin: ["cancelled", "pending"] } });
Order.find({ "items.productId": { $in: [productId1, productId2] } });

Order.find({}).count();
Order.find({}).skip(5);
Order.find({}).limit(10);
Order.find({}).sort({ totalPrice: -1 });
Order.find({}, { status: 1, totalPrice: 1, _id: 0 });
Order.countDocuments();
Order.countDocuments({ status: "pending" });

// {
//     _id: ObjectId("..."),
//     userId: ObjectId("..."),
//     status: "shipped",
//     items: [
//       { productId: ObjectId("..."), name: "Apple", quantity: 2 },
//       { productId: ObjectId("..."), name: "Banana", quantity: 5 }
//     ]
//   }

Order.find({}, { items: 1, _id: 0 });

// Update
// UpdateOne
// UpdateMany

Order.updateOne(
  { status: "pending" }, // Filter
  { $set: { status: "shipped" } } // Update
);

Order.updateMany({ status: "pending" }, { $set: { status: "cancelled" } });

Order.findByIdAndUpdate(
  "661f1234abcde56789012345",
  { $set: { status: "delivered" } },
  { new: true } // returns updated document
);

Order.findOneAndUpdate(
  { userId: someUserId, status: "pending" },
  { $set: { status: "processing" } },
  { new: true }
);

Order.updateOne(
  { _id: "661f1234abcde56789012345" },
  {
    $inc: { totalPrice: 50 },
    $push: { items: { productId: "123", name: "Mango", quantity: 1 } },
  }
);

Order.updateOne({ _id: orderId }, { $inc: { totalPrice: 50 } });

Order.updateOne({ _id: orderId }, { $push: { tags: "fragile" } });

Order.updateOne({ _id: orderId }, { $pull: { tags: "urgent" } });
User.updateOne({ _id: id }, { $pop: { hobbies: 1 } });
Order.updateOne({ _id: orderId }, { $unset: { note: "" } });
Order.updateOne({ _id: orderId }, { $addToSet: { tags: "express" } });
User.findOneAndUpdate(filter, update, {
  new: true, // ✅ Return the updated document
  upsert: true, // ✅ Create a new document if not found
  runValidators: true, // ✅ Enforce schema validations
});

Product.updateOne({ _id: productId }, { $mul: { price: 1.1 } });
Product.updateOne(
  { _id: productId },
  { $min: { stock: 40 } } // will update because 40 < 50
);

Item.updateOne(
  { _id: itemId },
  { $max: { views: 150 } } // Will update because 150 > 100
);

Item.updateOne({ _id: itemId }, { $rename: { oldField: "newField" } });
Counter.updateOne({ _id: id }, { $inc: { count: 5 } });

const result = await Profile.updateOne(
  filter,
  { $set: update },
  { upsert: true } // 👈 Create if not found
);

// {
//     name: 'Ajay',
//     hobbies: [
//       { name: 'coding', yearsOfExperience: 3 },
//       { name: 'gaming', yearsOfExperience: 5 }
//     ]
//   }

User.updateOne(
  { _id: userId, "hobbies.name": "coding" },
  { $inc: { "hobbies.$.yearsOfExperience": 1 } } // Increase yearsOfExperience by 1 for 'coding'
);

User.updateOne(
  { _id: userId, "hobbies.name": "coding" },
  { $set: { "hobbies.$.yearsOfExperience": 1 } } // Increase yearsOfExperience by 1 for 'coding'
);

User.updateOne(
  { _id: userId }, // Select the user by _id
  { $inc: { "hobbies.$[].yearsOfExperience": 1 } } // Increment yearsOfExperience for all hobbies
);







// delete 

User.deleteOne({ name: 'Ajay' });
User.deleteMany({ age: { $gt: 20 } });
User.findOneAndDelete({ name: 'Ajay' });