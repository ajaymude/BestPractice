    // Sample Data for Reference
    /*
    [
      { name: "Alice", age: 25, email: "alice@example.com", isActive: true },
      { name: "Bob", age: 30, email: "bob@example.com" },
      { name: "Charlie", age: 35, isActive: false },
      { name: "David", age: 40, isActive: true, email: "david@example.com" },
      { name: "Eve", age: 28, email: "eve@example.com" },
      { name: "Frank", age: 33, phone: "1234567890" },
    ]
    */

    // 1. $and: Matches documents that satisfy all conditions
    console.log("1. $and Examples:");
    console.log(await collection.find({ $and: [{ age: { $gte: 30 } }, { isActive: true }] }).toArray()); // Active users aged 30+
    console.log(await collection.find({ $and: [{ name: "Alice" }, { email: { $exists: true } }] }).toArray()); // Users named Alice with an email
    console.log(await collection.find({ $and: [{ age: { $lte: 35 } }, { phone: { $exists: true } }] }).toArray()); // Users with phone and age <= 35

    // 2. $or: Matches documents that satisfy at least one condition
    console.log("\n2. $or Examples:");
    console.log(await collection.find({ $or: [{ name: "Alice" }, { isActive: false }] }).toArray()); // Users named Alice or inactive
    console.log(await collection.find({ $or: [{ age: { $lt: 30 } }, { email: { $exists: false } }] }).toArray()); // Users aged < 30 or without email
    console.log(await collection.find({ $or: [{ isActive: true }, { phone: { $exists: true } }] }).toArray()); // Active users or those with phone

    // 3. $not: Negates a query condition
    console.log("\n3. $not Examples:");
    console.log(await collection.find({ age: { $not: { $lt: 30 } } }).toArray()); // Users aged >= 30
    console.log(await collection.find({ isActive: { $not: { $eq: true } } }).toArray()); // Users who are not active
    console.log(await collection.find({ email: { $not: { $exists: true } } }).toArray()); // Users without an email

    // 4. $nor: Matches documents that do not satisfy any condition
    console.log("\n4. $nor Examples:");
    console.log(await collection.find({ $nor: [{ name: "Alice" }, { isActive: true }] }).toArray()); // Not Alice and not active
    console.log(await collection.find({ $nor: [{ age: { $gte: 30 } }, { email: { $exists: true } }] }).toArray()); // Users aged < 30 and without email
    console.log(await collection.find({ $nor: [{ phone: { $exists: true } }, { isActive: false }] }).toArray()); // No phone and not inactive

    // 5. $exists: Matches documents where a field exists or does not exist
    console.log("\n5. $exists Examples:");
    console.log(await collection.find({ email: { $exists: true } }).toArray()); // Users with an email
    console.log(await collection.find({ phone: { $exists: false } }).toArray()); // Users without a phone
    console.log(await collection.find({ isActive: { $exists: true } }).toArray()); // Users with `isActive` field

    // 6. $type: Matches documents where a field is of a specified BSON type
    console.log("\n6. $type Examples:");
    console.log(await collection.find({ age: { $type: "int" } }).toArray()); // Users with `age` as integer
    console.log(await collection.find({ email: { $type: "string" } }).toArray()); // Users with `email` as string
    console.log(await collection.find({ isActive: { $type: "bool" } }).toArray()); // Users with `isActive` as boolean

