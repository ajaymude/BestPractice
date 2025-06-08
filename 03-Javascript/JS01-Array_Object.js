// 🗂 OBJECTS & ARRAYS
// 33 - Object Literals: properties, methods
// 34 - Accessing and Modifying Object Properties (dot notation, bracket notation)
// 35 - Object.create, Object.assign, Object.freeze, Object.keys/values/entries
// 36 - Prototypes and Prototype Chain
// 37 - Constructor Functions and the new Operator
// 38 - ES6 Classes: class syntax, extends, super, static methods
// 39 - instanceof operator and prototype methods
// 40 - Arrays: literal syntax, Array constructor
// 41 - Accessing and Modifying Array Elements
// 42 - Array Methods: push, pop, shift, unshift, splice, slice, concat, join
// 43 - Iteration Methods: forEach, map, filter, reduce, some, every, find, findIndex
// 44 - Array Destructuring, Array.from, Array.isArray
// 45 - Nested Arrays and Multidimensional Arrays

// all methods of the array
/*
Array Methods Reference (categorized, including latest additions)

// 1. Mutator Methods (modify the original array)
- push(...items)
- pop()
- shift()
- unshift(...items)
- splice(start, deleteCount, ...items)
- sort([compareFn])
- reverse()
- fill(value[, start[, end]])
- copyWithin(target, start[, end])

// 2. Accessor Methods (non-mutating, return new data)
- slice([start[, end]])
- concat(...arrays)
- join([separator])
- toString()
- toLocaleString()

// 3. Iteration & Transformation
- forEach(callback[, thisArg])
- map(callback[, thisArg])
- filter(callback[, thisArg])
- reduce(callback[, initialValue])
- reduceRight(callback[, initialValue])
- flat([depth])
- flatMap(callback[, thisArg])
- at(index)

// 4. Searching & Testing
- indexOf(searchElement[, fromIndex])
- lastIndexOf(searchElement[, fromIndex])
- includes(searchElement[, fromIndex])
- find(callback[, thisArg])
- findIndex(callback[, thisArg])
- findLast(callback[, thisArg])         // ES2022+
- findLastIndex(callback[, thisArg])    // ES2022+
- some(callback[, thisArg])
- every(callback[, thisArg])

// 5. Iterators & Entries
- keys()
- values()
- entries()

// 6. Non-Mutating Update Methods (ES2023+)
- toReversed()                     // returns a new reversed array
- toSorted(compareFn)              // returns a new sorted array
- toSpliced(start, deleteCount, ...items) // returns a new array with spliced elements
- with(index, value)               // returns a new array with value at the given index replaced

// 7. Static Helper Methods
- Array.isArray(obj)
- Array.from(iterable[, mapFn[, thisArg]])
- Array.of(...elements)
*/

// all method of the object
/*
Object Methods Reference (categorized, including latest additions)

1. Creation & Prototypes
  - Object.create(proto[, descriptors])
  - Object.getPrototypeOf(obj)
  - Object.setPrototypeOf(obj, proto)
  - Object.hasOwn(obj, prop)               // ES2022
  - structuredClone(obj)                   // ES2023 (global)

2. Property Definition & Descriptors
  - Object.defineProperty(obj, prop, descriptor)
  - Object.defineProperties(obj, descriptors)
  - Object.getOwnPropertyDescriptor(obj, prop)
  - Object.getOwnPropertyDescriptors(obj)

3. Cloning & Merging
  - Object.assign(target, ...sources)
  - { …obj } (object spread, ES2018)
  - Object.fromEntries(iterable)           // ES2019

4. Immutability & Extensions
  - Object.freeze(obj)
  - Object.seal(obj)
  - Object.preventExtensions(obj)
  - Object.isExtensible(obj)
  - Object.isSealed(obj)
  - Object.isFrozen(obj)

5. Inspection & Enumeration
  - Object.keys(obj)
  - Object.values(obj)
  - Object.entries(obj)
  - Object.getOwnPropertyNames(obj)
  - Object.getOwnPropertySymbols(obj)
  - obj.hasOwnProperty(prop)

6. Comparison & Type Checking
  - Object.is(value1, value2)
  - Object.prototype.toString.call(obj)    // fallback type check

7. Static Utility Methods
  - Object.create, assign, freeze, seal, preventExtensions… (see above)
  - Object.hasOwn
  - Object.fromEntries
  - structuredClone

8. Reflect (lower-level operations)
  - Reflect.ownKeys(obj)
  - Reflect.get(obj, prop[, receiver])
  - Reflect.set(obj, prop, value[, receiver])
  - Reflect.has(obj, prop)
  - Reflect.deleteProperty(obj, prop)
  - Reflect.defineProperty(obj, prop, descriptor)
  - Reflect.getPrototypeOf(obj)
  - Reflect.setPrototypeOf(obj, proto)
  - Reflect.isExtensible(obj)
  - Reflect.preventExtensions(obj)
*/



//////////////////////////
/*
JavaScript Built-In Methods Reference

🌐 Global Functions
- eval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
- decodeURI() / decodeURIComponent()
- encodeURI() / encodeURIComponent()

📦 Object
• Creation & cloning
  - Object.create(proto[, descriptors])
  - Object.assign(target, …sources)
• Property management
  - Object.defineProperty(obj, prop, descriptor)
  - Object.defineProperties(obj, descriptors)
  - Object.freeze(obj) / Object.seal(obj) / Object.preventExtensions(obj)
• Inspection
  - Object.keys(obj) / Object.values(obj) / Object.entries(obj)
  - Object.getOwnPropertyNames(obj) / Object.getOwnPropertySymbols(obj)
  - Object.getOwnPropertyDescriptor(obj, prop) / Object.getOwnPropertyDescriptors(obj)
  - Object.getPrototypeOf(obj)
• Comparison & conversion
  - Object.is(a, b)
  - Object.fromEntries(iterable)

📜 Array
• Mutators
  - arr.push(...items) / arr.pop()
  - arr.shift() / arr.unshift(...items)
  - arr.splice(start, deleteCount, …items)
  - arr.sort([compareFn]) / arr.reverse()
• Accessors
  - arr.slice(start, end)
  - arr.concat(...arrays)
  - arr.join([separator])
  - arr.indexOf(item[, from]) / arr.lastIndexOf(item[, from])
  - arr.includes(item[, from])
  - arr.at(index)
• Iteration & transformation
  - arr.forEach(fn)
  - arr.map(fn)
  - arr.filter(fn)
  - arr.reduce(fn, initial) / arr.reduceRight(fn, initial)
  - arr.some(fn) / arr.every(fn)
  - arr.find(fn) / arr.findIndex(fn)
  - arr.flat([depth]) / arr.flatMap(fn)
• Static helpers
  - Array.isArray(obj)
  - Array.of(...items)
  - Array.from(iterable[, mapFn[, thisArg]])

🔤 String
• Query & extraction
  - str.charAt(pos) / str.charCodeAt(pos) / str.codePointAt(pos)
  - str.indexOf(sub[, pos]) / str.lastIndexOf(sub[, pos])
  - str.includes(sub[, pos])
  - str.startsWith(sub[, pos]) / str.endsWith(sub[, length])
  - str.search(regex) / str.match(regex) / str.matchAll(regex)
  - str.normalize([form])
• Transformation
  - str.slice(start[, end]) / str.substring(start[, end]) / str.substr(start, length)
  - str.toLowerCase() / str.toUpperCase()
  - str.trim() / str.trimStart() / str.trimEnd()
  - str.padStart(targetLength[, padString]) / str.padEnd(targetLength[, padString])
  - str.repeat(count)
• Replacement & splitting
  - str.replace(sub|regex, newSub|fn) / str.replaceAll(sub|regex, newSub|fn)
  - str.split([separator[, limit]])
• Formatting
  - Template literals: `${expression}`

⚙️ Function
- fn.call(thisArg, ...args)
- fn.apply(thisArg, argsArray)
- fn.bind(thisArg[, ...args])
- fn.toString()

🔢 Number & Math
• Number
  - Number.isFinite(value) / Number.isInteger(value)
  - Number.isNaN(value) / Number.isSafeInteger(value)
  - num.toExponential([digits]) / num.toFixed(digits)
  - num.toPrecision([precision]) / num.toString([radix])
  - num.toLocaleString([locales[, options]])
• Math
  - Math.abs(x) / Math.ceil(x) / Math.floor(x) / Math.round(x) / Math.trunc(x)
  - Math.max(...values) / Math.min(...values) / Math.pow(x,y) / Math.sqrt(x)
  - Math.random() / Math.sign(x) / Math.log(x) / Math.exp(x) / Math.sin(x) / Math.cos(x) / …

📅 Date
• Construction & conversion
  - new Date() / Date.now() / Date.parse() / Date.UTC()
  - date.valueOf() / date.toISOString() / date.toJSON() / date.toLocaleString()
• Getters
  - date.getDate() / getDay() / getFullYear() / getMonth() / getHours() / getMinutes() / getSeconds() / getMilliseconds()
  - UTC variants: getUTCDate() / …
• Setters
  - date.setDate() / setFullYear() / setMonth() / setHours() / …

🔍 RegExp
- regex.test(str)
- regex.exec(str)
- String methods: match() / matchAll() / replace() / replaceAll() / search() / split()

📦 JSON
- JSON.stringify(value[, replacer[, space]])
- JSON.parse(text[, reviver])

💡 Promise
• Static
  - Promise.resolve(value) / Promise.reject(reason)
  - Promise.all(iterable) / Promise.allSettled(iterable) / Promise.race(iterable) / Promise.any(iterable)
• Instance
  - promise.then(onFulfilled, onRejected) / promise.catch(onRejected) / promise.finally(onFinally)

🔗 Reflect
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args[, newTarget])
- Reflect.defineProperty(target, prop, descriptor)
- Reflect.deleteProperty(target, prop)
- Reflect.get(target, prop[, receiver]) / Reflect.set(target, prop, value[, receiver])
- Reflect.has(target, prop)
- Reflect.ownKeys(target)
- Reflect.getPrototypeOf(target) / Reflect.setPrototypeOf(target, proto)
- Reflect.isExtensible(target) / Reflect.preventExtensions(target)

🗺️ Map, Set, WeakMap, WeakSet
• Map: map.set(key, val) / map.get(key) / map.has(key) / map.delete(key) / map.clear() / map.keys() / map.values() / map.entries() / map.forEach()
• Set: set.add(val) / set.has(val) / set.delete(val) / set.clear() / set.keys() / set.values() / set.entries() / set.forEach()
• WeakMap: weakMap.set(keyObj, val) / weakMap.get(keyObj) / weakMap.has(keyObj) / weakMap.delete(keyObj)
• WeakSet: weakSet.add(obj) / weakSet.has(obj) / weakSet.delete(obj)

🔣 TypedArray (Uint8Array, Float32Array, …)
- typedArr.BYTES_PER_ELEMENT / typedArr.length
- typedArr.set(array[, offset]) / typedArr.subarray(begin[, end])
- Inherited methods: map(), filter(), slice(), join(), etc.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
33 - Object Literals: Properties & Methods

This note explains:
1. Defining object literals with properties and methods
2. Accessing properties: dot notation vs. bracket notation
3. Computed property names
4. Property shorthand
5. Method definition shorthand (ES6)
6. Using `this` inside methods
7. Dynamically adding/removing properties and methods
*/

// 🔹 1. Basic Object Literal with Properties
const person = {
  name: "Ajay",
  age: 30,
  city: "Mumbai",
};
console.log("person:", person); // { name: "Ajay", age: 30, city: "Mumbai" }

// 🔹 2. Accessing Properties
// Dot notation:
console.log("Name (dot):", person.name); // Ajay
// Bracket notation (useful for dynamic keys):
console.log("City (bracket):", person["city"]); // Mumbai

// 🔹 3. Computed Property Names
const keyAge = "age";
const dynamicPerson = {
  name: "Riya",
  [keyAge]: 25, // computed from variable keyAge
  ["likes" + "Music"]: true, // key is "likesMusic"
};
console.log("dynamicPerson:", dynamicPerson);
// { name: "Riya", age: 25, likesMusic: true }

// 🔹 4. Property Shorthand (ES6)
// When variable names match property names:
const title = "Developer";
const experience = 5;
const profile = { title, experience };
console.log("profile:", profile); // { title: "Developer", experience: 5 }

// 🔹 5. Method Definition Shorthand (ES6)
const calculator = {
  // Traditional:
  add: function (a, b) {
    return a + b;
  },
  // Shorthand:
  multiply(a, b) {
    return a * b;
  },
};
console.log("add:", calculator.add(2, 3)); // 5
console.log("multiply:", calculator.multiply(4, 5)); // 20

// 🔹 6. Using `this` Inside Methods
const counter = {
  count: 0,
  increment() {
    this.count++;
    console.log("Count is now:", this.count);
  },
  reset() {
    this.count = 0;
    console.log("Count reset to:", this.count);
  },
};
counter.increment(); // Count is now: 1
counter.increment(); // Count is now: 2
counter.reset(); // Count reset to: 0

// 🔹 7. Dynamic Addition & Removal
const settings = {};
// Add properties
settings.theme = "dark";
settings["version"] = "1.0.0";
// Add method dynamically
settings.show = function () {
  console.log(`Theme: ${this.theme}, Version: ${this.version}`);
};
settings.show(); // Theme: dark, Version: 1.0.0

// Remove a property
delete settings.version;
console.log("After delete:", settings); // { theme: "dark", show: [Function] }

// 🔹 8. Nested Objects & Destructuring
const user = {
  id: 1,
  info: {
    name: "Mukesh",
    contact: {
      email: "mukesh@example.com",
      phone: "1234567890",
    },
  },
};
// Access nested:
console.log("Email:", user.info.contact.email); // mukesh@example.com
// Destructure:
const {
  info: {
    contact: { phone },
  },
} = user;
console.log("Phone via destructuring:", phone); // 1234567890

// 🔹 9. Object.keys, Object.values, Object.entries
console.log("Keys:", Object.keys(person)); // ["name","age","city"]
console.log("Values:", Object.values(person)); // ["Ajay",30,"Mumbai"]
console.log("Entries:", Object.entries(person)); // [["name","Ajay"],["age",30],["city","Mumbai"]]

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
34 - Accessing and Modifying Object Properties (dot notation, bracket notation)

This note covers:
1. Reading properties with dot notation.
2. Reading properties with bracket notation (dynamic keys).
3. Adding new properties.
4. Updating existing properties.
5. Deleting properties.
6. Nested property access and safe navigation with optional chaining.
*/

// 🔹 1. Dot Notation for Reading
const user = { name: "Ajay", age: 25 };
console.log("Name (dot):", user.name); // Ajay
console.log("Age  (dot):", user.age); // 25

// 🔹 2. Bracket Notation for Reading (dynamic keys)
const key = "name";
console.log("Name (bracket):", user[key]); // Ajay

// 🔹 3. Adding New Properties
user.city = "Mumbai"; // dot notation
user["profession"] = "Developer"; // bracket notation
console.log("After adding:", user);
// { name: "Ajay", age: 25, city: "Mumbai", profession: "Developer" }

// 🔹 4. Updating Existing Properties
user.age = 26;
user["city"] = "Pune";
console.log("After updating:", user);
// { name: "Ajay", age: 26, city: "Pune", profession: "Developer" }

// 🔹 5. Deleting Properties
delete user.profession; // dot notation
delete user["city"]; // bracket notation
console.log("After deleting:", user);
// { name: "Ajay", age: 26 }

// 🔹 6. Nested Objects and Access
const settings = {
  theme: { current: "dark", available: ["light", "dark"] },
  notifications: { email: true, sms: false },
};
console.log("Current theme:", settings.theme.current); // dark
console.log("Email notifications:", settings.notifications.email); // true

// 🔹 7. Safe Access with Optional Chaining
console.log("SMS notifications:", settings.notifications?.sms); // false
console.log("Push notifications:", settings.notifications?.push); // undefined (no error)

// 🔹 8. Dynamic Nested Keys
function getNested(obj, path) {
  // path: e.g. "theme.available.1"
  return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
}
console.log(
  "Second available theme:",
  getNested(settings, "theme.available.1")
); // dark

// 🔹 9. Computed Property Names (defining object)
const propName = "level";
const profile = {
  ["user" + "Name"]: "Riya",
  [propName]: "advanced",
};
console.log("Computed profile:", profile);
// { userName: "Riya", level: "advanced" }

// 🔹 10. Best Practices
// - Use dot notation when property names are known and valid identifiers.
// - Use bracket notation for dynamic keys or non-identifier names.
// - Use optional chaining to avoid runtime errors on undefined nested properties.

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
35 - Object.create, Object.assign, Object.freeze, Object.keys/values/entries

This note explains:
1. Object.create: creating objects with a specified prototype.
2. Object.assign: merging objects and copying properties.
3. Object.freeze: making objects immutable.
4. Object.keys, Object.values, Object.entries: retrieving object metadata.
*/

// 🔹 1. Object.create()
// Creates a new object with its prototype set to the given object.
const proto = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};
const obj1 = Object.create(proto);
obj1.name = "Ajay";
obj1.greet(); // Hello, I'm Ajay
console.log("obj1.__proto__ === proto:", obj1.__proto__ === proto); // true

// 🔹 2. Object.assign()
// Copies enumerable own properties from one or more source objects to a target object.
// Returns the target object.
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3, a: 4 };
Object.assign(target, source1, source2);
console.log("After Object.assign, target:", target);
// target: { a: 4, b: 2, c: 3 } (later sources overwrite earlier keys)

// Use Object.assign to clone an object (shallow copy):
const original = { x: 10, nested: { y: 20 } };
const clone = Object.assign({}, original);
clone.x = 99;
clone.nested.y = 88;
console.log("original after clone mutation:", original);
// original.nested.y is 88 (nested object shared)

// 🔹 3. Object.freeze()
// Freezes an object: cannot add, delete, or modify properties.
// Returns the same object.
const config = { debug: true };
Object.freeze(config);
config.debug = false; // silently ignored in non-strict mode
config.newProp = "test"; // ignored
delete config.debug; // ignored
console.log("config after freeze attempts:", config); // { debug: true }

// Nested objects are not frozen (shallow freeze):
config.inner = { enabled: false };
console.log("config.inner added after freeze:", config.inner); // { enabled: false }

// 🔹 4. Object.keys(), Object.values(), Object.entries()
// Retrieve metadata arrays for own enumerable string-keyed properties.
const data = { id: 1, name: "Riya", active: true };
console.log("Object.keys(data):", Object.keys(data)); // ["id", "name", "active"]
console.log("Object.values(data):", Object.values(data)); // [1, "Riya", true]
console.log("Object.entries(data):", Object.entries(data));
// [["id",1],["name","Riya"],["active",true]]

// Use entries to iterate both key and value:
for (const [key, value] of Object.entries(data)) {
  console.log(`${key} → ${value}`);
}
// id → 1
// name → Riya
// active → true

// 🔹 5. Practical Combination
// Clone an object, freeze the clone, and list its keys:
const user = { username: "dev", role: "admin" };
const frozenClone = Object.freeze(Object.assign({}, user));
console.log("Frozen clone keys:", Object.keys(frozenClone)); // ["username","role"]

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
36 - Prototypes and Prototype Chain

This note explains:
1. What a prototype is and how JavaScript’s internal [[Prototype]] link works.
2. How to use constructor functions and Object.create for inheritance.
3. Inspecting the prototype chain via __proto__ and Object.getPrototypeOf.
4. Overriding inherited methods and using hasOwnProperty.
5. Why you should avoid extending built-in prototypes.
*/

// 🔹 1. Basic Prototype Link via Object.create()
const animalProto = {
  speak() {
    console.log(`${this.name} makes a sound.`);
  },
};

const cat = Object.create(animalProto);
cat.name = "Whiskers";
cat.speak(); // Whiskers makes a sound.

// 🔹 2. Constructor Function + prototype
function Person(name) {
  this.name = name;
}

// Add a method on Person.prototype so all instances share it
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}.`);
};

const alice = new Person("Alice");
alice.greet(); // Hello, my name is Alice.

// 🔹 3. Prototype Chain Inspection
console.log(alice.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// 🔹 4. Overriding Inherited Methods
Person.prototype.describe = function () {
  console.log(`Person: ${this.name}`);
};

const bob = new Person("Bob");
// Override describe for bob only
bob.describe = function () {
  console.log(`I am a special Person named ${this.name}!`);
};

alice.describe(); // Person: Alice
bob.describe(); // I am a special Person named Bob!

// To call the original:
delete bob.describe;
alice.describe(); // Person: Alice
bob.describe(); // Person: Bob

// 🔹 5. hasOwnProperty vs in
console.log("name in alice:", "name" in alice); // true (own property)
console.log("greet in alice:", "greet" in alice); // true (inherited)
console.log("alice hasOwnProperty('greet'):", alice.hasOwnProperty("greet")); // false
console.log("alice hasOwnProperty('name'):", alice.hasOwnProperty("name")); // true

// 🔹 6. Avoid Extending Built-Ins
// While possible, it can break loops and conflict with future JS features.
Array.prototype.first = function () {
  return this[0];
};
console.log([1, 2, 3].first()); // 1
// But for … in loops will now include "first" unless filtered!
// delete Array.prototype.first; // undo if needed

// 🔹 7. Inheritance Hierarchy Example
function Employee(name, role) {
  Person.call(this, name);
  this.role = role;
}

// Inherit from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add method
Employee.prototype.work = function () {
  console.log(`${this.name} works as a ${this.role}.`);
};

const carol = new Employee("Carol", "Engineer");
carol.greet(); // Hello, my name is Carol.
carol.work(); // Carol works as a Engineer.

// 🔚 Summary:
// • Every object has an internal [[Prototype]].
// • Methods live on the prototype, not on each instance.
// • The prototype chain ends at Object.prototype → null.
// • Use Object.create or constructor.prototype to set up inheritance.
// • Avoid modifying built-in prototypes in production code.

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
37 - Constructor Functions and the new Operator

This note explains:
1. How constructor functions create and initialize objects.
2. What the new operator does behind the scenes.
3. Common pitfalls (forgetting new, arrow functions).
4. Using prototype for shared methods.
*/

// 🔹 1. Basic Constructor Function
// Convention: name in PascalCase; use `this` to assign properties.
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const ajay = new Person("Ajay", 25);
console.log("ajay:", ajay);
// Output: ajay: Person { name: 'Ajay', age: 25 }

// 🔹 2. What new Does (Simplified Internals)
/*
When you call `new Person("Sam", 30)` JS does:
  1. Create an empty object: {}
  2. Set its [[Prototype]] to Person.prototype
  3. Call Person with this → new object
  4. If Person returns an object, return it; otherwise return the new object
*/
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function () {
  console.log(`${this.type} makes a sound.`);
};

const cat = myNew(Animal, "Cat");
cat.speak(); // Cat makes a sound.

// 🔹 3. Forgetting new
function Car(make) {
  this.make = make;
}
const withoutNew = Car("Tesla");
console.log("withoutNew:", withoutNew); // undefined
console.log(
  "global.make (or window.make):",
  typeof make !== "undefined" ? make : "no global"
);
// Pitfall: `this` defaulted to global (or undefined in strict mode)

// 🔹 4. Prototype vs Instance Methods
function Vehicle(model) {
  this.model = model; // instance property
  this.instanceMethod = function () {
    console.log("Instance method, model:", this.model);
  };
}
// Shared method on prototype (one copy)
Vehicle.prototype.describe = function () {
  console.log("Prototype method, model:", this.model);
};

const v1 = new Vehicle("X1");
const v2 = new Vehicle("X2");
v1.instanceMethod(); // Instance method, model: X1
v2.instanceMethod(); // Instance method, model: X2
v1.describe(); // Prototype method, model: X1
v2.describe(); // Prototype method, model: X2

console.log("Same describe function?", v1.describe === v2.describe); // true

// 🔹 5. Arrow Functions Cannot Be Constructors
const ArrowPerson = (name) => {
  this.name = name;
};
// const ap = new ArrowPerson("Test"); // TypeError: ArrowPerson is not a constructor

// 🔹 6. Returning Objects Explicitly
function Box(size) {
  this.size = size;
  return { color: "red" }; // explicit object return overrides `this`
}
const b = new Box(10);
console.log("Box returned:", b); // { color: 'red' }

// 🔹 7. Best Practices
/*
- Always use new with constructor functions.
- If you forget new, consider throwing an error:
    function Thing(...) {
      if (!new.target) throw new Error("Must use new");
      ...
    }
- Use prototype for methods to conserve memory.
- For modern codebases, prefer ES6 `class` syntax which wraps this logic.
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
38 - ES6 Classes: class syntax, extends, super, static methods

This note explains:
1. Defining classes with constructor and instance methods.
2. Inheriting with extends and calling super().
3. Defining and using static methods.
4. Checking instances with instanceof.
*/

// 1. Basic Class Declaration
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // Instance method
  greet() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
  }
  // Static method
  static species() {
    return "Homo sapiens";
  }
}

const ajay = new Person("Ajay", 25);
ajay.greet(); // Hello, I'm Ajay and I'm 25 years old.
console.log(Person.species()); // Homo sapiens
console.log(ajay instanceof Person); // true

// 2. Class Expression
const Animal = class {
  constructor(type) {
    this.type = type;
  }
  speak() {
    console.log(`${this.type} makes a sound.`);
  }
};

const cat = new Animal("Cat");
cat.speak(); // Cat makes a sound.
console.log(cat instanceof Animal); // true

// 3. Inheritance with extends
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age); // Call parent constructor
    this.role = role;
  }
  work() {
    console.log(`${this.name} works as a ${this.role}.`);
  }
}

const emp = new Employee("Riya", 30, "Engineer");
emp.greet(); // Hello, I'm Riya and I'm 30 years old.
emp.work(); // Riya works as a Engineer.
console.log(emp instanceof Employee); // true
console.log(emp instanceof Person); // true

// 4. Overriding and Calling super in Methods
class Manager extends Employee {
  work() {
    super.work(); // Call Employee's work()
    console.log(`${this.name} also manages the team.`);
  }
}

const mgr = new Manager("Sam", 40, "Manager");
mgr.greet(); // Hello, I'm Sam and I'm 40 years old.
mgr.work(); // Sam works as a Manager.
//                                   // Sam also manages the team.

// 5. Static Properties (via direct assignment)
Person.description = "Represents a human being";
console.log(Person.description); // Represents a human being

// 6. instanceof Checks
console.log(ajay instanceof Person); // true
console.log(cat instanceof Person); // false
console.log(emp instanceof Person, emp instanceof Employee); // true true
console.log(mgr instanceof Employee); // true

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
39 - instanceof Operator & Prototype Methods

This note explains:
1. The instanceof operator: how it checks an object’s prototype chain against a constructor.
2. Customizing instanceof via Symbol.hasInstance.
3. Defining and using prototype methods to share functionality across instances.
*/

// 🔹 1. Basic instanceof Checks
function Person(name) {
  this.name = name;
}
const p = new Person("Ajay");

console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
console.log({} instanceof Person); // false

// Primitives vs wrapped primitives:
console.log("" instanceof String); // false (primitive)
console.log(new String("") instanceof String); // true

// 🔹 2. instanceof with Inheritance
class Animal {}
class Dog extends Animal {}
const d = new Dog();

console.log(d instanceof Dog); // true
console.log(d instanceof Animal); // true
console.log(d instanceof Object); // true

// 🔹 3. Customizing instanceof via Symbol.hasInstance
class EvenNumber {
  static [Symbol.hasInstance](value) {
    return Number.isInteger(value) && value % 2 === 0;
  }
}

console.log(2 instanceof EvenNumber); // true
console.log(3 instanceof EvenNumber); // false
console.log("foo" instanceof EvenNumber); // false

// 🔹 4. Adding Methods via Prototype
Person.prototype.greet = function () {
  console.log("Hello, I'm " + this.name);
};

p.greet(); // Hello, I'm Ajay
const p2 = new Person("Riya");
p2.greet(); // Hello, I'm Riya

// Shared method reference
console.log(p.greet === p2.greet); // true

// 🔹 5. Prototype Methods for Built-Ins (Demonstration Only)
Array.prototype.first = function () {
  return this[0];
};

console.log([10, 20, 30].first()); // 10

// Note: Extending built-ins can cause unexpected behavior:
for (let key in [1, 2, 3]) {
  console.log(key); // "0", "1", "2", "first"
}

// Clean up the demo extension
delete Array.prototype.first;

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
39 - instanceof Operator & Prototype Methods

This note explains:
1. The instanceof operator: how it checks an object’s prototype chain against a constructor.
2. Customizing instanceof via Symbol.hasInstance.
3. Defining and using prototype methods to share functionality across instances.
*/

// 🔹 1. Basic instanceof Checks
function Person(name) {
  this.name = name;
}
const p = new Person("Ajay");

console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
console.log({} instanceof Person); // false

// Primitives vs wrapped primitives:
console.log("" instanceof String); // false (primitive)
console.log(new String("") instanceof String); // true

// 🔹 2. instanceof with Inheritance
class Animal {}
class Dog extends Animal {}
const d = new Dog();

console.log(d instanceof Dog); // true
console.log(d instanceof Animal); // true
console.log(d instanceof Object); // true

// 🔹 3. Customizing instanceof via Symbol.hasInstance
class EvenNumber {
  static [Symbol.hasInstance](value) {
    return Number.isInteger(value) && value % 2 === 0;
  }
}

console.log(2 instanceof EvenNumber); // true
console.log(3 instanceof EvenNumber); // false
console.log("foo" instanceof EvenNumber); // false

// 🔹 4. Adding Methods via Prototype
Person.prototype.greet = function () {
  console.log("Hello, I'm " + this.name);
};

p.greet(); // Hello, I'm Ajay
const p2 = new Person("Riya");
p2.greet(); // Hello, I'm Riya

// Shared method reference
console.log(p.greet === p2.greet); // true

// 🔹 5. Prototype Methods for Built-Ins (Demonstration Only)
Array.prototype.first = function () {
  return this[0];
};

console.log([10, 20, 30].first()); // 10

// Note: Extending built-ins can cause unexpected behavior:
for (let key in [1, 2, 3]) {
  console.log(key); // "0", "1", "2", "first"
}

// Clean up the demo extension
delete Array.prototype.first;

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
40 - Arrays: Literal Syntax & Array Constructor

This note explains:
1. Array literal syntax: creating arrays with [ … ]
2. Array constructor: new Array(size) and new Array(elem1, elem2, …)
3. Difference when passing a single number vs. multiple arguments
4. Utility methods Array.of and Array.from
*/

// 🔹 1. Array Literal Syntax
const fruits = ["Apple", "Banana", "Cherry"];
console.log("fruits:", fruits); // ["Apple", "Banana", "Cherry"]
console.log("Length:", fruits.length); // 3

// You can include holes (empty slots)
const holes = [1, , 3];
console.log("holes:", holes); // [1, empty, 3]
console.log("holes[1] === undefined?", holes[1] === undefined); // true

// 🔹 2. Array Constructor with multiple arguments
const nums = new Array(1, 2, 3);
console.log("nums via constructor:", nums); // [1, 2, 3]
console.log("Length:", nums.length); // 3

// 🔹 3. Array Constructor with single numeric argument
const emptySlots = new Array(5);
console.log("emptySlots:", emptySlots); // [ <5 empty items> ]
console.log("Length:", emptySlots.length); // 5

// Beware: you cannot map over empty slots directly
console.log(
  "Map over emptySlots:",
  emptySlots.map(() => 0)
); // [ <5 empty items> ]

// 🔹 4. Array.of (always treats all args as elements)
const ofSingle = Array.of(5);
console.log("Array.of(5):", ofSingle); // [5]
console.log("Length:", ofSingle.length); // 1

const ofMany = Array.of(1, 2, 3);
console.log("Array.of(1,2,3):", ofMany); // [1, 2, 3]

// 🔹 5. Array.from (create from iterable or array-like)
const str = "hello";
const chars = Array.from(str);
console.log("Array.from('hello'):", chars); // ["h","e","l","l","o"]

// Convert arguments or NodeList to array
function demo() {
  const argsArray = Array.from(arguments);
  console.log("Arguments as array:", argsArray);
}
demo("a", "b", "c"); // ["a","b","c"]

// 🔹 6. Checking for arrays
console.log("Array.isArray(fruits):", Array.isArray(fruits)); // true
console.log("Array.isArray({}):", Array.isArray({})); // false

// 🔹 7. Best Practices
// - Prefer array literals [] for clarity and performance.
// - Use Array.of when you need a single-element array reliably.
// - Use Array.from to convert iterables/array-like objects.
// - Avoid new Array(size) unless you intentionally want empty slots.

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
41 - Accessing and Modifying Array Elements

This note explains:
1. Accessing elements by index and using at()
2. Updating elements via assignment
3. Adding/removing elements: push, pop, unshift, shift, splice
4. Non-destructive access: slice
5. Searching: indexOf, includes, find, findIndex
6. Iteration and nested arrays
*/

// 🔹 1. Accessing Elements by Index
const letters = ["a", "b", "c", "d"];
console.log("First element (letters[0]):", letters[0]); // a
console.log("Fourth element (letters[3]):", letters[3]); // d
console.log("Out of bounds (letters[10]):", letters[10]); // undefined

// 🔹 2. Using at() for Positive & Negative Indices
console.log("Last element (letters.at(-1)):", letters.at(-1)); // d
console.log("Second element (letters.at(1)):", letters.at(1)); // b

// 🔹 3. Updating Elements by Assignment
letters[2] = "gamma";
console.log('After assignment (letters[2] = "gamma"):', letters); // ['a','b','gamma','d']

// 🔹 4. Adding & Removing Elements (Destructive)
// push() adds to end; pop() removes from end
letters.push("e");
console.log('After push("e"):', letters); // ['a','b','gamma','d','e']
const last = letters.pop();
console.log("popped:", last, "→", letters); // popped: e

// unshift() adds to front; shift() removes from front
letters.unshift("z");
console.log('After unshift("z"):', letters); // ['z','a','b','gamma','d']
const first = letters.shift();
console.log("shifted:", first, "→", letters); // shifted: z

// 🔹 5. splice(): Remove/Insert at Arbitrary Positions
// splice(startIndex, deleteCount, ...itemsToInsert)
letters.splice(1, 2, "beta", "charlie");
// starts at index 1, removes 2 elements, inserts 'beta','charlie'
console.log('After splice(1,2,"beta","charlie"):', letters);

// 🔹 6. slice(): Non-Destructive Subarray
// slice(start, end) returns new array, does not modify original
const sub = letters.slice(1, 3);
console.log("slice(1,3):", sub, "→ original:", letters);

// 🔹 7. Searching Elements
console.log('indexOf("gamma"):', letters.indexOf("gamma")); // position or -1
console.log('includes("delta"):', letters.includes("delta")); // true/false

// find() & findIndex() with predicate
const numbers = [10, 20, 30, 40];
const over25 = numbers.find((n) => n > 25);
console.log("find(n>25):", over25); // 30
console.log(
  "findIndex(n>25):",
  numbers.findIndex((n) => n > 25)
); // 2

// 🔹 8. Iterating & Nested Arrays
const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log("matrix[1][0]:", matrix[1][0]); // 3
for (const row of matrix) {
  for (const val of row) {
    console.log("matrix value:", val);
  }
}

// 🔹 9. Clearing an Array
let items = [1, 2, 3, 4];
items.length = 0; // empties the array
console.log("After clearing, items:", items); // []

// 🔹 10. Best Practices
/*
- Use at() for negative indexing.
- Prefer non-destructive methods (slice, map, filter) when possible.
- Use splice only when you need to modify the original array.
- Always check bounds or use includes/indexOf to avoid undefined.
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
42 - Array Methods: push, pop, shift, unshift, splice, slice, concat, join

This note explains:
1. push    – add one or more elements to the end of an array
2. pop     – remove the last element from an array
3. shift   – remove the first element from an array
4. unshift – add one or more elements to the beginning of an array
5. splice  – remove, replace, or insert elements at a specific index
6. slice   – return a shallow copy of a portion of an array
7. concat  – merge two or more arrays into a new array
8. join    – join all elements into a string with a separator
*/

// 🔹 1. push(): add elements to the end
let arr1 = [1, 2, 3];
arr1.push(4, 5);
console.log("after push(4,5):", arr1); // [1, 2, 3, 4, 5]

// 🔹 2. pop(): remove and return the last element
const last = arr1.pop();
console.log("popped element:", last); // 5
console.log("after pop():", arr1); // [1, 2, 3, 4]

// 🔹 3. shift(): remove and return the first element
let arr2 = ["a", "b", "c"];
const first = arr2.shift();
console.log("shifted element:", first); // "a"
console.log("after shift():", arr2); // ["b", "c"]

// 🔹 4. unshift(): add elements to the beginning
arr2.unshift("x", "y");
console.log('after unshift("x","y"):', arr2); // ["x","y","b","c"]

// 🔹 5. splice(): modify array in place
// Syntax: splice(startIndex, deleteCount, item1, item2, …)
let arr3 = [10, 20, 30, 40, 50];
// remove 2 elements from index 1
const removed = arr3.splice(1, 2);
console.log("removed elements:", removed); // [20, 30]
console.log("after splice(1,2):", arr3); // [10, 40, 50]
// insert elements at index 2 without removing
arr3.splice(2, 0, 35, 37);
console.log("after splice(2,0,35,37):", arr3); // [10, 40, 35, 37, 50]
// replace 1 element at index 1
arr3.splice(1, 1, 45);
console.log("after splice(1,1,45):", arr3); // [10, 45, 35, 37, 50]

// 🔹 6. slice(): return a new array copy of a section
const arr4 = [0, 1, 2, 3, 4, 5];
const sub1 = arr4.slice(2, 5); // from index 2 up to, but not including, 5
console.log("slice(2,5):", sub1); // [2, 3, 4]
const sub2 = arr4.slice(-3); // last 3 elements
console.log("slice(-3):", sub2); // [3, 4, 5]
console.log("original arr4:", arr4); // [0,1,2,3,4,5]

// 🔹 7. concat(): merge arrays into a new one
const a = [1, 2];
const b = [3, 4];
const c = [5];
const merged = a.concat(b, c);
console.log("concat a, b, c:", merged); // [1,2,3,4,5]

// 🔹 8. join(): create a string from array elements
const words = ["Hello", "world", "!"];
console.log('join with default (","):', words.join()); // "Hello,world,!"
console.log('join with space (" "):', words.join(" ")); // "Hello world !"
console.log('join with dash ("-"):', words.join("-")); // "Hello-world-!"

// 🔹 9. Chaining methods
const chain = [1, 2, 3].concat([4, 5]).slice(1, 4).join(":");
console.log("chained result:", chain); // "2:3:4"

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
43 - Iteration Methods: forEach, map, filter, reduce, some, every, find, findIndex

This note explains:
1. forEach   – executes a callback for each element; returns undefined.
2. map       – transforms each element via callback; returns a new array.
3. filter    – selects elements matching a predicate; returns a new array.
4. reduce    – reduces the array to a single value via an accumulator.
5. some      – tests if at least one element matches a predicate; returns boolean.
6. every     – tests if all elements match a predicate; returns boolean.
7. find      – returns the first element matching a predicate (or undefined).
8. findIndex – returns the index of the first matching element (or –1).
*/

// Sample array for examples
const numbers = [1, 2, 3, 4, 5];

// 1. forEach
// Calls the callback for each element; cannot break out early.
console.log("forEach:");
numbers.forEach((value, index, array) => {
  console.log(`Index ${index}: Value ${value} in [${array.join(", ")}]`);
});
// Output:
// Index 0: Value 1 in [1, 2, 3, 4, 5]
// ... etc.

// 2. map
// Returns a new array of the callback’s return values.
const doubled = numbers.map((x) => x * 2);
console.log("map (doubled):", doubled); // [2, 4, 6, 8, 10]

// 3. filter
// Returns a new array of elements where predicate returns true.
const evens = numbers.filter((x) => x % 2 === 0);
console.log("filter (evens):", evens); // [2, 4]

// 4. reduce
// Accumulates a single result; takes a reducer callback and initial value.
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("reduce (sum):", sum); // 15

// Using reduce to count occurrences:
const words = ["apple", "banana", "apple", "cherry"];
const counts = words.reduce((acc, w) => {
  acc[w] = (acc[w] || 0) + 1;
  return acc;
}, {});
console.log("reduce (counts):", counts); // { apple: 2, banana: 1, cherry: 1 }

// 5. some
// Returns true if at least one element passes the test; stops early on true.
const hasNegative = numbers.some((x) => x < 0);
console.log("some (has negative?):", hasNegative); // false

// 6. every
// Returns true only if all elements pass the test; stops early on false.
const allPositive = numbers.every((x) => x > 0);
console.log("every (all positive?):", allPositive); // true

// 7. find
// Returns the first element for which the predicate is true.
const firstGreaterThanThree = numbers.find((x) => x > 3);
console.log("find (first > 3):", firstGreaterThanThree); // 4

// 8. findIndex
// Returns the index of the first element matching; or -1 if none.
const indexFirstGreaterThanThree = numbers.findIndex((x) => x > 3);
console.log("findIndex (first > 3):", indexFirstGreaterThanThree); // 3

// 9. Handling “not found” cases
const notFound = numbers.find((x) => x > 10);
console.log("find (none > 10):", notFound); // undefined
const notFoundIndex = numbers.findIndex((x) => x > 10);
console.log("findIndex (none > 10):", notFoundIndex); // -1

// 10. Best Practices
// - Use forEach for side effects (e.g., logging, DOM updates).
// - Use map/filter/reduce for data transformation—avoid mutating the original array.
// - Use some/every for boolean checks; they short-circuit on first match.
// - Use find/findIndex when you need a single element or its position.

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
44 - Array Destructuring, Array.from, Array.isArray

This note explains:
1. Array destructuring syntax for extracting items.
2. Default values and rest patterns in destructuring.
3. Skipping elements and nested destructuring.
4. Converting iterables and array-like objects with Array.from.
5. Checking arrays with Array.isArray.
*/

// 🔹 1. Basic Array Destructuring
const numbers = [10, 20, 30];
const [num1, num2, num3] = numbers;
console.log("num1:", num1, "num2:", num2, "num3:", num3);
// num1: 10 num2: 20 num3: 30

// 🔹 2. Default Values and Rest Element
const values = [1];
const [firstVal = 0, secondVal = 2, ...restVals] = values;
console.log(
  "firstVal:",
  firstVal,
  "secondVal:",
  secondVal,
  "restVals:",
  restVals
);
// firstVal: 1 secondVal: 2 restVals: []

// 🔹 3. Skipping Elements
const skipArr = [5, 6, 7, 8];
const [, secondItem, , fourthItem] = skipArr;
console.log("secondItem:", secondItem, "fourthItem:", fourthItem);
// secondItem: 6 fourthItem: 8

// 🔹 4. Nested Destructuring
const nestedArr = [1, [2, 3], 4];
const [one, [two, three], four] = nestedArr;
console.log(one, two, three, four);
// 1 2 3 4

// 🔹 5. Swapping Variables
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log("a:", a, "b:", b);
// a: 2 b: 1

// 🔹 6. Array.from(): Converting Iterables & Array-Likes
// Convert a string to array of characters
const chars = Array.from("hello");
console.log("chars:", chars);
// ['h','e','l','l','o']

// Convert an array-like object
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const fromArrayLike = Array.from(arrayLike);
console.log("fromArrayLike:", fromArrayLike);
// ['a','b','c']

// Use mapping function as second argument
const doubled = Array.from([1, 2, 3], (x) => x * 2);
console.log("doubled via Array.from:", doubled);
// [2, 4, 6]

// 🔹 7. Array.isArray(): Checking for Arrays
console.log("Array.isArray(numbers):", Array.isArray(numbers)); // true
console.log('Array.isArray("hello"):', Array.isArray("hello")); // false
console.log("Array.isArray({ length: 2 }):", Array.isArray({ length: 2 })); // false

// 🔹 8. Best Practices
// - Use destructuring to write concise variable assignments.
// - Provide default values to avoid undefined variables.
// - Use rest (...) to capture remaining items.
// - Prefer Array.from over manual loops for converting iterables/array-likes.
// - Always check with Array.isArray when behavior depends on true arrays.

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
45 - Nested Arrays and Multidimensional Arrays

This note explains:
1. What nested (multidimensional) arrays are.
2. How to access and modify nested elements.
3. Iterating through nested arrays with loops and higher-order functions.
4. Common operations: flattening, mapping, and reducing.
5. Use cases: matrices, grids, tables.
*/

// 🔹 1. Defining Nested Arrays (2D, 3D, etc.)
const matrix2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const cube3D = [
  [
    // layer 0
    [1, 2],
    [3, 4],
  ],
  [
    // layer 1
    [5, 6],
    [7, 8],
  ],
];

console.log("2D matrix:", matrix2D);
console.log("3D cube:", cube3D);

// 🔹 2. Accessing Nested Elements
// matrix2D[row][col]
console.log("matrix2D[1][2]:", matrix2D[1][2]); // 6
// cube3D[layer][row][col]
console.log("cube3D[1][0][1]:", cube3D[1][0][1]); // 6

// 🔹 3. Modifying Nested Elements
matrix2D[2][0] = 70; // change 7 → 70
console.log("After modification:", matrix2D);

// 🔹 4. Iterating with for…of
console.log("\nIterate 2D matrix with nested for…of:");
for (const row of matrix2D) {
  for (const val of row) {
    process.stdout.write(val + " "); // prints: 1 2 3 4 5 6 70 8 9
  }
  console.log();
}

// 🔹 5. Iterating with traditional for loops
console.log("\nIterate 2D matrix with nested for loops:");
for (let i = 0; i < matrix2D.length; i++) {
  for (let j = 0; j < matrix2D[i].length; j++) {
    process.stdout.write(matrix2D[i][j] + " ");
  }
  console.log();
}

// 🔹 6. Using Array.prototype.flat()
const nested = [[1, 2], [3, [4, 5]], 6];
console.log("\nOriginal nested array:", nested);
// flat one level:
console.log("nested.flat():", nested.flat());
// flat two levels:
console.log("nested.flat(2):", nested.flat(2));

// 🔹 7. Mapping over Nested Arrays
// Add 10 to every element in 2D array:
const incremented = matrix2D.map((row) => row.map((x) => x + 10));
console.log("\n2D matrix after +10:", incremented);

// 🔹 8. Reducing Nested Arrays
// Sum all elements in 2D matrix:
const totalSum = matrix2D.reduce(
  (sum, row) => sum + row.reduce((rSum, v) => rSum + v, 0),
  0
);
console.log("\nSum of all elements in matrix2D:", totalSum);

// 🔹 9. Handling Ragged (Jagged) Arrays
const ragged = [[1, 2], [3], [4, 5, 6]];
console.log("\nRagged array:", ragged);
for (const row of ragged) {
  console.log("Row length:", row.length, "Contents:", row);
}

// 🔹 10. Use Cases
// • Grids (game boards, seating charts)
// • Matrices (math operations)
// • Image data (pixels in rows and columns)
// • Tables (rows of records)

// 🔹 11. Best Practices
/*
- Use descriptive variable names for row/col indices.
- Validate lengths when accessing to avoid undefined.
- Prefer flat(), map(flatMap), and reduce for concise transformations.
- Consider typed arrays or libraries (e.g., ndarray) for large numeric matrices.
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
