// 01 - Object
//      creating object, 


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


// 01 - Object
//      creating object, 

// 01 - Creating an Object

let person = {
    name: "Ajay",
    age: 25,
    isDeveloper: true
  };
  console.log(person.name); // "Ajay"

let person = new Object();
person.name = "Ajay";
person.age = 25;
console.log(person); // { name: "Ajay", age: 25 }

// 02 - Accessing Object Properties

console.log(person.name); // "Ajay"
console.log(person["age"]); // 25

const person = {
  name: "Alice",
  age: 25,
  "home address": "123 Main St",
  job: "Developer"
};

// 🔹 Dot Notation (simple and preferred when possible)
console.log("Using dot notation:");
console.log(person.name);         // "Alice"
console.log(person.age);          // 25
console.log(person.job);          // "Developer"

// 🔹 Bracket Notation (needed in some cases)
console.log("\nUsing bracket notation:");
console.log(person["name"]);              // "Alice"
console.log(person["home address"]);      // "123 Main St"
console.log(person["job"]);               // "Developer"

// 🔹 Using a variable with bracket notation (not possible with dot)
const key = "age";
console.log("\nUsing bracket notation with variable:");
console.log(person[key]);                 // 25

// 🔹 Invalid with dot notation (would throw error)
// console.log(person.home address); // ❌ Syntax Error

// ✅ Correct: Use bracket notation for keys with spaces or special characters
console.log("\nAccessing property with space in name:");
console.log(person["home address"]);      // "123 Main St"



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// 02 - object method 

// JavaScript Object Methods - Categorized List

// 🔹 1. Creating and Copying Objects
Object.create(proto, [properties]);                 // Create object with prototype
Object.assign(target, ...sources);                  // Copy properties to target
Object.fromEntries(iterable);                       // Convert entries to object

// 🔹 2. Inspecting Properties
Object.keys(obj);                                   // Get array of property names
Object.values(obj);                                 // Get array of property values
Object.entries(obj);                                // Get array of [key, value] pairs
Object.hasOwn(obj, prop);                           // Check if object has own property (ES2022)
obj.hasOwnProperty(prop);                           // Check if property exists directly on object
obj.propertyIsEnumerable(prop);                     // Is property enumerable?

// 🔹 3. Defining or Modifying Properties
Object.defineProperty(obj, key, descriptor);        // Define a single property
Object.defineProperties(obj, descriptors);          // Define multiple properties

// 🔹 4. Getting Property Descriptors
Object.getOwnPropertyDescriptor(obj, prop);         // Get descriptor for a property
Object.getOwnPropertyDescriptors(obj);              // Get all property descriptors
Object.getOwnPropertyNames(obj);                    // Get all property names (string only)

// 🔹 5. Working with Prototypes
Object.getPrototypeOf(obj);                         // Get prototype
Object.setPrototypeOf(obj, prototype);              // Set object prototype
obj.isPrototypeOf(obj);                             // Check if object is in prototype chain

// 🔹 6. Controlling Object Mutability
Object.freeze(obj);                                 // Make object immutable
Object.isFrozen(obj);                               // Is object frozen?
Object.seal(obj);                                   // Prevent new and make properties non-configurable
Object.isSealed(obj);                               // Is object sealed?
Object.preventExtensions(obj);                      // Disallow adding new properties
Object.isExtensible(obj);                           // Can properties be added?

// 🔹 7. Equality Comparison
Object.is(value1, value2);                          // Precise equality check (better than ===)

// 🔹 8. Object Conversion and Utilities
obj.toString();                                     // Convert to string
obj.toLocaleString();                               // Locale-sensitive string
obj.valueOf();                                      // Get primitive value

// 🧪 Most Useful in Practice
// Object.keys(obj)
// Object.values(obj)
// Object.entries(obj)
// Object.assign(target, source)
// Object.freeze(obj)
// obj.hasOwnProperty('key')



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


// 1. Basic object destructuring
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log('1:', name, age); // Alice 25

// 2. Destructuring with different variable names
const person = { firstName: 'John', lastName: 'Doe' };
const { firstName: f, lastName: l } = person;
console.log('2:', f, l); // John Doe

// 3. Default values
const settings = { theme: 'dark' };
const { theme, fontSize = 14 } = settings;
console.log('3:', theme, fontSize); // dark 14

// 4. Nested object destructuring
const profile = {
  userInfo: {
    username: 'coder',
    location: 'web'
  }
};
const {
  userInfo: { username, location }
} = profile;
console.log('4:', username, location); // coder web

// 5. Destructuring in function parameters
function greet({ name, age }) {
  console.log(`5: Hello, ${name}. You are ${age} years old.`);
}
greet({ name: 'Bob', age: 30 });

// 6. Destructuring with rest operator
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log('6:', a); // 1
console.log('6:', rest); // { b: 2, c: 3 }

// 7. Destructuring in loops
const people = [
  { name: 'Sam', age: 22 },
  { name: 'Max', age: 28 }
];
for (const { name, age } of people) {
  console.log('7:', name, age);
}
// Output: Sam 22, Max 28

// 8. Destructuring from function return
function getSettings() {
  return { mode: 'auto', speed: 'fast' };
}
const { mode, speed } = getSettings();
console.log('8:', mode, speed); // auto fast

// 9. Destructuring with alias + default
const config = { host: 'localhost' };
const { host: h = '127.0.0.1', port: p = 8080 } = config;
console.log('9:', h, p); // localhost 8080

// 10. Destructure from array of objects
const products = [
  { id: 1, title: 'Pen' },
  { id: 2, title: 'Notebook' }
];
const [{ title: firstProduct }, { title: secondProduct }] = products;
console.log('10:', firstProduct, secondProduct); // Pen Notebook

// 11. Destructure with computed property names (dynamic keys)
const key = 'status';
const response = { status: 'success', code: 200 };
const { [key]: resultStatus } = response;
console.log('11:', resultStatus); // success


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


const user = {
  name: 'Alice',
  age: 30,
  role: 'admin'
};

// 1. Object.keys() - Get all keys
const keys = Object.keys(user);
console.log('1:', keys); // ['name', 'age', 'role']

// 2. Object.values() - Get all values
const values = Object.values(user);
console.log('2:', values); // ['Alice', 30, 'admin']

// 3. Object.entries() - Get all key-value pairs
const entries = Object.entries(user);
console.log('3:', entries);
// [['name', 'Alice'], ['age', 30], ['role', 'admin']]

// 4. Loop over keys
Object.keys(user).forEach(key => {
  console.log('4:', key, user[key]);
});

// 5. Loop over values
Object.values(user).forEach(value => {
  console.log('5:', value);
});

// 6. Loop over entries (destructuring)
Object.entries(user).forEach(([key, value]) => {
  console.log('6:', `${key}: ${value}`);
});

// 7. Convert entries back to object
const objFromEntries = Object.fromEntries(entries);
console.log('7:', objFromEntries); // { name: 'Alice', age: 30, role: 'admin' }

// 8. Get number of properties
console.log('8: property count =', Object.keys(user).length); // 3

// 9. Filter object properties (keep only strings)
const filtered = Object.fromEntries(
  Object.entries(user).filter(([_, value]) => typeof value === 'string')
);
console.log('9:', filtered); // { name: 'Alice', role: 'admin' }

// 10. Map over entries to transform values
const uppercased = Object.fromEntries(
  Object.entries(user).map(([key, value]) =>
    [key, typeof value === 'string' ? value.toUpperCase() : value]
  )
);
console.log('10:', uppercased); // { name: 'ALICE', age: 30, role: 'ADMIN' }

// 11. Get first key-value pair (manually)
const [firstKey, firstValue] = Object.entries(user)[0];
console.log('11:', firstKey, firstValue); // name Alice




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////



















//  03 - Adding & Updating Properties
person.city = "Mumbai"; // Adding a new property
person.age = 26; // Updating an existing property
console.log(person);

// 04 - Deleting Properties
delete person.city;
console.log(person);

// 05 - Checking If a Property Exists
console.log("age" in person); // true
console.log(person.hasOwnProperty("age")); // true

// 06 - Looping Through an Object
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Object.keys(), Object.values(), Object.entries()
console.log(Object.keys(person)); // ["name", "age", "isDeveloper"]
console.log(Object.values(person)); // ["Ajay", 25, true]
console.log(Object.entries(person)); // [["name", "Ajay"], ["age", 25], ["isDeveloper", true]]

// Copying Objects
// let copy = { ...person };
// console.log(copy);

// let copy = Object.assign({}, person);
// console.log(copy);

// JSON Conversion

// Convert Object to JSON:
let jsonString = JSON.stringify(person);
console.log(jsonString); // '{"name":"Ajay","age":25}'

//Convert JSON to Object:
let jsonObject = JSON.parse(jsonString);
console.log(jsonObject);

// Basic Object Destructuring

// const user = {
//     name: "Ajay",
//     age: 25,
//     role: "Developer"
// };

// const { name, age, role } = user;

// console.log(name); // "Ajay"
// console.log(age);  // 25
// console.log(role); // "Developer"

//  Changing Variable Names
// const user = {
//     firstName: "Ajay",
//     job: "Developer"
// };

// const { firstName: name, job: profession } = user;

// console.log(name);       // "Ajay"
// console.log(profession); // "Developer"

// Nested Object Destructuring
// const user = {
//     name: "Ajay",
//     address: {
//         city: "Mumbai",
//         country: "India"
//     }
// };

// const { name, address: { city, country } } = user;

// console.log(name);    // "Ajay"
// console.log(city);    // "Mumbai"
// console.log(country); // "India"

// Using the Rest Operator (...)
// const user = {
//     name: "Ajay",
//     age: 25,
//     role: "Developer",
//     company: "Tech Corp"
// };

// const { name, age, ...rest } = user;

// console.log(name);  // "Ajay"
// console.log(age);   // 25
// console.log(rest);  // { role: "Developer", company: "Tech Corp" }

// Looping Objects: Object Keys, Values, and Entries 🚀
// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// //  Looping over keys
// for (const key of Object.keys(user)) {
//     console.log(key);
// }

// name
// age
// city

// Object.values(obj) – Looping Over Values

// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// // Looping over values
// for (const value of Object.values(user)) {
//     console.log(value);
// }

// Ajay
// 25
// Mumbai

// Object.entries(obj) – Looping Over Key-Value Pairs
// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// // Looping over key-value pairs
// for (const [key, value] of Object.entries(user)) {
//     console.log(`${key}: ${value}`);
// }

// name: Ajay
// age: 25
// city: Mumbai

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// js assign method

const target = { a: 1 };
const source = { b: 2, c: 3 };

const result = Object.assign(target, source);
console.log(result); // Output: { a: 1, b: 2, c: 3 }
console.log(target); // Same as result: { a: 1, b: 2, c: 3 }

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };

const merged = Object.assign({}, obj1, obj2, obj3);
console.log(merged); // Output: { a: 1, b: 2, c: 3 }

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

const keys = Object.keys(person);
console.log(keys); // Output: ["name", "age", "city"]


const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

const values = Object.values(person);
console.log(values); // Output: ["Alice", 30, "New York"]



const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

const entries = Object.entries(person);
console.log(entries);
// Output: [["name", "Alice"], ["age", 30], ["city", "New York"]]











///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const car = {
  brand: "Toyota",
  model: "Corolla"
};

console.log(car.hasOwnProperty("brand")); // true
console.log(car.hasOwnProperty("year"));  // false



  
  
  
  
  
  
  
  
  
