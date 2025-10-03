// 🔄 ES6+ SYNTAX & FEATURES
// 51 - let vs const vs var deep dive
// 52 - Arrow Functions in depth (lexical this, implicit return, no arguments object)
// 53 - Template Literals advanced: expressions, tagged templates
// 54 - Destructuring Assignment: objects, arrays, nested patterns, default values
// 55 - Spread and Rest Operators for arrays and objects
// 56 - Object Property Shorthand and Computed Property Names
// 57 - Enhanced Object Literals: method shorthand, __proto__, super in objects
// 58 - Block-scoped Declarations and Temporal Dead Zone
// 59 - for…of loops vs for…in loops
// 60 - Optional Chaining (?.) and Nullish Coalescing (??)
// 61 - Short-circuit evaluation with && and ||
// 62 - Dynamic Imports and import() promises
// 63 - Modules: import/export syntax, default vs named exports
// 64 - ES6 Promises: creating, chaining, error handling
// 65 - Promise.all, Promise.race, Promise.allSettled, Promise.any
// 66 - Async/Await: syntax, error handling with try/catch/finally
// 67 - Generators and Iterators: function* syntax, yield, next(), for…of iteration
// 68 - Symbols: creation, use as propertlcy keys, well-known symbols (Symbol.iterator, Symbol.toStringTag)
// 69 - BigInt: syntax, use cases, limitations










///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
51 - let vs const vs var (Deep Dive)

This note covers:
1. Scope differences: function scope vs block scope
2. Hoisting behavior and initialization
3. Temporal Dead Zone (TDZ)
4. Re-declaration and re-assignment rules
5. Closures in loops with var vs let
6. Best practices for choosing let, const, var
*/

// 1. Scope Differences

function scopeTest() {
  if (true) {
    var v = 'function-scoped var';
    let l = 'block-scoped let';
    const c = 'block-scoped const';
    console.log('inside block:', v, l, c);
  }
  console.log('outside block:', v);         // var is accessible
  // console.log(l); // ReferenceError: l is not defined
  // console.log(c); // ReferenceError: c is not defined
}
scopeTest();

// 2. Hoisting Behavior

console.log('hoisted var before init:', hoistedVar); // undefined (declaration hoisted, init deferred)
var hoistedVar = 10;

try {
  console.log('hoisted let before init:', hoistedLet);
} catch (e) {
  console.log('hoisted let before init error:', e.message); // TDZ error
}
let hoistedLet = 20;

try {
  console.log('hoisted const before init:', hoistedConst);
} catch (e) {
  console.log('hoisted const before init error:', e.message); // TDZ error
}
const hoistedConst = 30;

// 3. Temporal Dead Zone (TDZ)

// Accessing before declaration throws ReferenceError
function tdzDemo() {
  // console.log(x); // ReferenceError
  let x = 'initialized';
  console.log('after init:', x);
}
tdzDemo();

// 4. Re-declaration & Re-assignment

var x = 1;
var x = 2;           // allowed: var can redeclare and reassign
console.log('var redeclared x:', x);

let y = 1;
// let y = 2;       // SyntaxError: Identifier 'y' has already been declared
y = 3;               // allowed: re-assignment only
console.log('let reassigned y:', y);

const z = 1;
// const z = 2;     // SyntaxError: Identifier 'z' has already been declared
// z = 3;           // TypeError: Assignment to constant variable
console.log('const z remains:', z);

// 5. Closures in Loops

const funcsVar = [];
for (var i = 0; i < 3; i++) {
  funcsVar.push(() => console.log('var loop i:', i));
}
funcsVar.forEach(fn => fn()); // prints 3,3,3 (shared i)

const funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(() => console.log('let loop j:', j));
}
funcsLet.forEach(fn => fn()); // prints 0,1,2 (each j scoped per iteration)

// 6. Best Practices

// ✅ Use const by default for values that should not be re-assigned
const defaultColor = 'blue';
// ✅ Use let when a variable needs to be updated (e.g., loop counters, temp values)
let counter = 0;
counter++;
// ❌ Avoid var to prevent unexpected hoisting and scope leaking
function avoidVar() {
  // var legacy = 'should not use';
}
// Summary logged:
console.log('Deep dive complete.');

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
52 - Arrow Functions in Depth

This note explains:
1. Syntax variations (concise vs block bodies)
2. Implicit return in single-expression bodies
3. Lexical `this` binding (no own `this`)
4. Lack of `arguments` object (use rest parameters)
5. Cannot be used as constructors (no `new`)
*/

// 1. Syntax Variations

// Concise body, single parameter, implicit return:
const square = n => n * n;
console.log('square(5):', square(5)); // 25

// Concise body, multiple parameters:
const add = (a, b) => a + b;
console.log('add(2,3):', add(2, 3)); // 5

// Block body, multiple statements, explicit return:
const factorial = n => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log('factorial(4):', factorial(4)); // 24

// 2. Implicit Return Pitfall
// Wrap object literals in parentheses for implicit return:
const makePoint = (x, y) => ({ x, y });
console.log('makePoint(2,3):', makePoint(2, 3)); // { x: 2, y: 3 }

// 3. Lexical `this` Binding

const obj = {
  value: 42,
  regularMethod() {
    console.log('regularMethod this.value:', this.value);
  },
  arrowMethod: () => {
    console.log('arrowMethod this.value:', this.value);
  },
  delayedRegular() {
    setTimeout(function() {
      console.log('delayedRegular this.value:', this.value);
    }, 0);
  },
  delayedArrow() {
    setTimeout(() => {
      console.log('delayedArrow this.value:', this.value);
    }, 0);
  }
};

obj.regularMethod();     // 42 (`this` → obj)
obj.arrowMethod();       // undefined (`this` → enclosing scope)
obj.delayedRegular();    // undefined (`this` → global/undefined)
obj.delayedArrow();      // 42 (`this` lexically bound to obj)

// 4. No `arguments` Object

function showArgsRegular() {
  console.log('regular arguments:', arguments);
}
showArgsRegular(1, 2, 3); // [1, 2, 3]

const showArgsArrow = () => {
  try {
    console.log(arguments);
  } catch (e) {
    console.log('arrow arguments error:', e.message);
  }
};
showArgsArrow(4, 5, 6); // ReferenceError

// Use rest parameters instead:
const showArgsRest = (...args) => {
  console.log('rest args array:', args);
};
showArgsRest('a', 'b', 'c'); // ['a','b','c']

// 5. Not a Constructor & No Prototype

// Attempting `new` with an arrow function throws:
const ArrowClass = () => {};
try {
  new ArrowClass();
} catch (e) {
  console.log('new ArrowClass error:', e.message);
}

// Arrow functions have no `.prototype` property:
console.log('ArrowClass.prototype:', ArrowClass.prototype); // undefined


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
53 - Template Literals Advanced: Expressions & Tagged Templates

This note explains:
1. Embedding expressions and multi-line support
2. Tagged template literal syntax
3. Accessing cooked vs. raw strings in tag functions
4. Using String.raw for raw strings
5. Building simple DSLs via tagged templates (e.g., HTML escaping, number formatting)
6. Best practices
*/

// 1. Embedding Expressions and Multi-Line Support
const name = 'Ajay';
const a = 5, b = 10;
console.log(`Hello, ${name}! 5 + 10 = ${a + b}`);
// Multi-line literal:
const address = `Line1: 123 Main St
Line2: Apt 4B
City: Mumbai`;
console.log(address);

// 2. Tagged Template Literal Syntax
function tagExample(strings, ...values) {
  // strings: array of literal segments
  // values: array of evaluated expressions
  return strings.reduce((result, str, i) => result + str + (values[i] ?? ''), '');
}
const summary = tagExample`Sum of ${a} and ${b} is ${a + b}.`;
console.log(summary);

// 3. Accessing Cooked vs. Raw Strings
function demonstrateRaw(strings) {
  console.log('cooked:', strings);
  console.log('raw:', strings.raw);
}
demonstrateRaw`First line\nSecond line`;
// Using String.raw directly:
console.log(String.raw`Path: C:\Users\${name}\Documents`);

// 4. Escaping Backticks
const escaped = `This is a \`backtick\` inside a template`;
console.log(escaped);

// 5. Building Simple DSLs

// 5a. HTML-Escaping Tag
function escapeHTML(strings, ...values) {
  const escape = str => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return strings.reduce((res, str, i) => res + str + (i < values.length ? escape(String(values[i])) : ''), '');
}
const userInput = '<script>alert("x")</script>';
console.log( escapeHTML`User says: ${userInput}` );

// 5b. Number-Formatting Tag
function formatNumber(strings, value) {
  const formatted = new Intl.NumberFormat('en-IN').format(value);
  return `${strings[0]}${formatted}${strings[1] ?? ''}`;
}
console.log( formatNumber`Total amount: ₹${1234567}` );

// 6. Best Practices
/*
- Prefer template literals for readability and multi-line strings.
- Use simple tagged templates for escaping or custom parsing.
- Keep tag functions pure (no side effects).
- Use String.raw for raw strings when needed.
- Avoid overly complex template logic; consider other parsing for heavy DSLs.
*/


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
54 - Destructuring Assignment: objects, arrays, nested patterns, default values

This note explains:
1. Object destructuring: basic assignment, renaming, default values.
2. Array destructuring: by position, skipping elements, default values.
3. Nested destructuring: objects within arrays and vice versa.
4. Rest patterns in destructuring.
*/

// 1. Basic Object Destructuring
const user = { id: 42, name: 'Ajay', role: 'Developer' };
const { id, name, role } = user;
console.log('id:', id);         // 42
console.log('name:', name);     // Ajay
console.log('role:', role);     // Developer

// 2. Renaming and Default Values
const user2 = { id: 7, name: 'Riya' };
const { id: userId, name: userName, role: userRole = 'Guest' } = user2;
console.log('userId:', userId);       // 7
console.log('userName:', userName);   // Riya
console.log('userRole:', userRole);   // Guest

// 3. Nested Object Destructuring
const settings = {
  theme: { color: 'dark', fontSize: 14 },
  notifications: { email: true }
};
const {
  theme: { color, fontSize },
  notifications: { email, sms = false }
} = settings;
console.log('color:', color);         // dark
console.log('fontSize:', fontSize);   // 14
console.log('email:', email);         // true
console.log('sms:', sms);             // false

// 4. Basic Array Destructuring
const nums = [10, 20, 30];
const [first, second, third] = nums;
console.log('first:', first);   // 10
console.log('second:', second); // 20
console.log('third:', third);   // 30

// 5. Skipping and Default Values in Arrays
const vals = [1];
const [v1, , v3 = 3, v4 = 4] = vals;
console.log('v1:', v1); // 1
console.log('v3:', v3); // 3 (default)
console.log('v4:', v4); // 4 (default)

// 6. Rest Pattern in Arrays
const letters = ['a', 'b', 'c', 'd'];
const [head, ...tail] = letters;
console.log('head:', head);   // a
console.log('tail:', tail);   // ['b','c','d']

// 7. Nested Array Destructuring
const matrix = [
  [1, 2],
  [3, 4]
];
const [[m11, m12], [m21, m22]] = matrix;
console.log('m11, m12, m21, m22:', m11, m12, m21, m22); // 1 2 3 4

// 8. Mixed Object & Array Destructuring
const order = {
  orderId: 1001,
  items: ['apple', 'banana', 'cherry']
};
const {
  orderId,
  items: [item1, item2, ...otherItems]
} = order;
console.log('orderId:', orderId);     // 1001
console.log('item1, item2:', item1, item2); // apple banana
console.log('otherItems:', otherItems);     // ['cherry']


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
55 - Spread and Rest Operators for Arrays and Objects

This note explains:
1. Spread syntax (...) for arrays and objects: expanding elements/properties.
2. Rest parameters in function definitions: gathering arguments into an array.
3. Rest properties in destructuring: collecting remaining keys.
4. Common use cases: cloning, merging, variadic functions.
5. Caveat: shallow copy only.
*/

// 1. Array Spread: combining and cloning
const arrA = [1, 2, 3];
const arrB = [...arrA];              // clone
console.log('arrB (clone of arrA):', arrB);

const arrC = [...arrA, 4, 5];        // append elements
console.log('arrC (append):', arrC);

const arrD = [0, ...arrA, 4];        // insert elements
console.log('arrD (insert):', arrD);

const mergedArr = [...arrA, ...[4, 5, 6]]; // merge two arrays
console.log('mergedArr:', mergedArr);

// 2. Object Spread: cloning and merging
const objA = { x: 1, y: 2 };
const objB = { ...objA };            // clone
console.log('objB (clone of objA):', objB);

const objC = { ...objA, z: 3 };       // add new property
console.log('objC (add z):', objC);

const objD = { w: 0, ...objA, y: 20 }; // merge and overwrite y
console.log('objD (merge & overwrite y):', objD);

// 3. Rest Parameters in Functions: variadic functions
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log('sum(1,2,3,4):', sum(1, 2, 3, 4));

// 4. Rest in Array Destructuring: head and tail
const [firstFruit, ...otherFruits] = ['apple', 'banana', 'cherry'];
console.log('firstFruit:', firstFruit);
console.log('otherFruits:', otherFruits);

// 5. Rest in Object Destructuring: extract and group
const { a, b, ...restProps } = { a: 10, b: 20, c: 30, d: 40 };
console.log('a:', a);
console.log('b:', b);
console.log('restProps:', restProps);

// 6. Function with Named Parameters and Rest Properties
function configure({ verbose = false, ...options }) {
  if (verbose) console.log('Options:', options);
  return options;
}
const configResult = configure({ verbose: true, debug: true, version: '1.0' });
console.log('configure result:', configResult);

// 7. Caveat: Shallow Copy Only
const nested = { arr: [1, 2], obj: { x: 1 } };
const cloneNested = { ...nested };
cloneNested.arr.push(3);
console.log('nested after modifying cloneNested.arr (shallow):', nested);

// Best Practices
// - Use spread for shallow cloning and combining arrays/objects.
// - Use rest for capturing remaining items in destructuring and function args.
// - Remember: spread creates shallow copies; nested structures remain shared.



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
56 - Object Property Shorthand and Computed Property Names

This note explains:
1. Property shorthand: defining object properties from variables.
2. Computed property names: using expressions as keys.
3. Dynamic method names and use cases.
*/

// 1. Property Shorthand
const title = 'Developer';
const level = 5;
// Instead of { title: title, level: level }
const profile = { title, level };
console.log('profile:', profile); // { title: 'Developer', level: 5 }

// 2. Computed Property Names
const key1 = 'firstName';
const key2 = 'lastName';
const person = {
  [key1]: 'Ajay',
  [key2]: 'Kumar',
  // combine expressions
  [`${key1}_${key2}`]: 'Ajay_Kumar'
};
console.log('person:', person);
// { firstName: 'Ajay', lastName: 'Kumar', firstName_lastName: 'Ajay_Kumar' }

// 3. Dynamic Method Names
const prefix = 'get';
const methodName = 'Name';
const obj = {
  name: 'Riya',
  // defines method getName()
  [`${prefix}${methodName}`]() {
    return this.name;
  }
};
console.log('obj.getName():', obj.getName()); // Riya

// 4. Combining Spread and Computed Names
const prop = 'score';
const base = { level: 10 };
const player = {
  ...base,                // inherit level
  [prop]: 100,            // score: 100
  [`${prop}Bonus`]: 20    // scoreBonus: 20
};
console.log('player:', player);
// { level: 10, score: 100, scoreBonus: 20 }

// 5. Use Case: Building a Lookup Map by Key
function mapByKey(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}
const items = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' }
];
console.log('mapped by id:', mapByKey(items, 'id'));
// { '1': { id: 1, name: 'A' }, '2': { id: 2, name: 'B' } }

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
57 - Enhanced Object Literals: method shorthand, __proto__, super in objects

This note explains:
1. Method shorthand: concise syntax for defining methods.
2. __proto__ property in object literals: setting an object’s prototype.
3. Using super in object methods to call prototype methods.
*/

// 1. Method Shorthand
const calculator = {
  // Traditional function expression:
  add: function(a, b) {
    return a + b;
  },
  // Shorthand syntax:
  multiply(a, b) {
    return a * b;
  },
  // Both methods work identically:
};

console.log('add(2,3):', calculator.add(2, 3));         // 5
console.log('multiply(2,3):', calculator.multiply(2, 3)); // 6

// 2. __proto__ in Object Literals
const proto = {
  greet() {
    return `Hello from proto`;
  }
};

// Create an object whose prototype is `proto`
const objWithProto = {
  __proto__: proto,
  name: 'Enhanced',
};

console.log('objWithProto.greet():', objWithProto.greet()); // "Hello from proto"

// 3. Using super in Object Methods
// Define a prototype with a method to override
const vehicleProto = {
  describe() {
    return `Vehicle`;
  }
};

const car = {
  __proto__: vehicleProto,
  // Override describe and call parent via super
  describe() {
    return `${super.describe()} → Car`;
  }
};

console.log('car.describe():', car.describe()); // "Vehicle → Car"

// 4. Combining all features
const parent = {
  hello() {
    return `Hi from parent`;
  }
};

const child = {
  __proto__: parent,
  hello() {
    // call parent.hello() then extend
    const p = super.hello();
    return `${p} and child`;
  },
  // shorthand method
  who() {
    return `I am child`;
  }
};

console.log('child.hello():', child.hello()); // "Hi from parent and child"
console.log('child.who():', child.who());     // "I am child"


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
58 - Block-Scoped Declarations and Temporal Dead Zone

This note explains:
1. let and const block scoping vs var’s function scoping
2. The Temporal Dead Zone (TDZ) for let/const
3. Hoisting behavior differences
4. TDZ errors and safe usage patterns
5. Best practices for block-scoped declarations
*/

// 1. var vs let/const Scope

function scopeDemo() {
  if (true) {
    var v = 'function-scoped var';
    let l = 'block-scoped let';
    const c = 'block-scoped const';
    console.log('Inside block:', v, l, c);
  }
  console.log('Outside block var v:', v);       // OK: prints 'function-scoped var'
  // console.log('Outside block let l:', l);    // ReferenceError
  // console.log('Outside block const c:', c);  // ReferenceError
}
scopeDemo();

// 2. Temporal Dead Zone (TDZ)

function tdzDemo() {
  // TDZ starts at function entry and ends at initialization
  try {
    console.log(xLet);   // ReferenceError: Cannot access 'xLet' before initialization
  } catch (e) {
    console.log('TDZ error for let:', e.message);
  }
  let xLet = 'initialized let';
  console.log('After let init:', xLet);

  try {
    console.log(xConst); // ReferenceError: Cannot access 'xConst' before initialization
  } catch (e) {
    console.log('TDZ error for const:', e.message);
  }
  const xConst = 'initialized const';
  console.log('After const init:', xConst);
}
tdzDemo();

// 3. Hoisting Behavior

console.log('varHoist before init:', varHoist); // undefined
var varHoist = 'now initialized var';

try {
  console.log('letHoist before init:', letHoist);
} catch (e) {
  console.log('letHoist hoist error:', e.message); // TDZ error
}
let letHoist = 'initialized let';

try {
  console.log('constHoist before init:', constHoist);
} catch (e) {
  console.log('constHoist hoist error:', e.message); // TDZ error
}
const constHoist = 'initialized const';

// 4. TDZ with Function Parameters (default values)

function paramDemo(a = b, b = 2) {
  // b isn't initialized when evaluating default a = b → ReferenceError
  console.log(a, b);
}
try {
  paramDemo(); 
} catch (e) {
  console.log('TDZ in parameters error:', e.message);
}

// 5. Safe Patterns

// Initialize before use
{
  let safeLet = 'safe';
  console.log('safeLet after init:', safeLet);
}

{
  const safeConst = 42;
  console.log('safeConst after init:', safeConst);
}

// 6. Best Practices
/*
- Prefer const for values that never change.
- Use let for variables that need reassignment.
- Avoid var to prevent unintentional function-scoping and hoisting issues.
- Always declare block-scoped variables at the top of their block to minimize TDZ.
*/


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
59 - for…of Loops vs for…in Loops

This note explains:
1. for…of loops: iterate over iterable values (arrays, strings, Sets, Maps).
2. for…in loops: iterate over enumerable property keys of objects.
3. Key differences, use cases, and pitfalls.
*/

// Sample data
const arr = ['a', 'b', 'c'];
const str = 'Hi';
const set = new Set([1, 2, 3]);
const map = new Map([['x',10], ['y',20]]);
const obj = { name: 'Ajay', age: 25 };

// 1. for…of: iterates values of iterables
console.log('for…of over array:');
for (const value of arr) {
  console.log(value);  // a, b, c
}

console.log('\nfor…of over string:');
for (const char of str) {
  console.log(char);   // H, i
}

console.log('\nfor…of over Set:');
for (const num of set) {
  console.log(num);    // 1, 2, 3
}

console.log('\nfor…of over Map (entries):');
for (const [key, val] of map) {
  console.log(key, val); // x 10, y 20
}

// 2. for…in: iterates keys of objects (including inherited enumerable)
console.log('\nfor…in over object:');
for (const key in obj) {
  console.log(key, obj[key]); // name Ajay, age 25
}

// Pitfall: for…in on arrays (keys are indices and inherited props)
Array.prototype.extra = '!',
console.log('\nfor…in on array (includes indices & extra):');
for (const i in arr) {
  console.log(i, arr[i]); // 0 a, 1 b, 2 c, extra undefined
}
delete Array.prototype.extra;

// 3. Best Practices
/*
- Use for…of for arrays, strings, Sets, Maps when you need values.
- Use for…in only for plain objects to get keys.
- Avoid for…in on arrays—use for…of or array methods instead.
- Remember for…of works on any iterable; for…in works on object keys.
*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*
60 - Optional Chaining (?.) and Nullish Coalescing (??)

This note explains:
1. Optional Chaining: safely accessing nested properties, methods, and arrays.
2. Nullish Coalescing: providing defaults for null or undefined values.
3. Differences from logical OR (||) and common combined patterns.
*/

// 1. Optional Chaining (?.)
// — Access a property only if the preceding value is non-nullish; otherwise returns undefined.
const user = {
  profile: {
    name: 'Ajay',
    address: { city: 'Mumbai' }
  }
};

console.log(user.profile?.name);            // 'Ajay'
console.log(user.profile?.address?.city);   // 'Mumbai'
console.log(user.contact?.email);           // undefined (no error)
console.log(user.profile?.phone?.number);   // undefined

// — Call a method only if it exists
const utils = {
  getName() { return 'Riya'; }
};
console.log(utils.getName?.());             // 'Riya'
console.log(utils.getAge?.());              // undefined

// — Access array elements safely
const arr = [[1, 2], null, [3]];
console.log(arr[0]?.[1]);                   // 2
console.log(arr[1]?.[0]);                   // undefined

// 2. Nullish Coalescing (??)
// — Returns the right-hand value only if the left-hand value is null or undefined.
const inputA = null;
const inputB = '';
const defaultA = inputA ?? 'default';
const defaultB = inputB ?? 'fallback';

console.log(defaultA); // 'default'  (null → default)
console.log(defaultB); // ''         ('' is not nullish → stays '')

// — Difference from ||
console.log(inputA || 'default'); // 'default'
console.log(inputB || 'fallback'); // 'fallback' ('' is falsy so || uses fallback)

// 3. Combined Usage
function getUserTheme(userSettings) {
  // Safely access nested theme, default to 'light'
  return userSettings
    ?.preferences
    ?.theme
    ?? 'light';
}

console.log(getUserTheme({ preferences: { theme: 'dark' } })); // 'dark'
console.log(getUserTheme({}));                                // 'light'

// 4. Best Practices
// - Use ?. to prevent “cannot read property of undefined” errors in deep chains.
// - Use ?? when you need to treat only null/undefined as “no value”, not other falsy values.
// - Avoid mixing ?? and || without parentheses due to operator precedence.
// - Remember that a?.b?.() only short-circuits if a or b is nullish.

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*
61 - Short-Circuit Evaluation with && and ||

This note explains:
1. && returns the first falsy operand or the last truthy operand.
2. || returns the first truthy operand or the last falsy operand.
3. Using && for conditional execution.
4. Using || for default values.
5. Combined patterns and common pitfalls.
*/

// 1. Logical AND (&&): first falsy or last truthy
console.log(true && 'Hello');      // 'Hello'  (both truthy → returns 'Hello')
console.log('Hi' && 0 && 42);      // 0        (stops at first falsy → 0)
console.log(null && 'World');      // null     (first operand falsy → null)
console.log('Foo' && 'Bar');       // 'Bar'    (both truthy → returns last)

// 2. Logical OR (||): first truthy or last falsy
console.log(false || 'Default');   // 'Default' (false falsy → returns 'Default')
console.log('' || 0 || null);      // null      (all falsy → returns last → null)
console.log('Hi' || 'There');      // 'Hi'      (first truthy → 'Hi')
console.log(0 || 42);              // 42        (0 falsy → returns 42)

// 3. Using && for Conditional Execution
const user = { name: 'Ajay', isAdmin: false };
user.isAdmin && console.log('Show admin panel');  // nothing logs
user.name && console.log('Hello,', user.name);   // logs "Hello, Ajay"

// 4. Using || for Default Values
function greet(name) {
  const displayName = name || 'Guest';
  console.log('Hello,', displayName);
}
greet('Riya');  // Hello, Riya
greet('');      // Hello, Guest
greet();        // Hello, Guest

// 5. Combined Patterns and Pitfalls
let config = { timeout: 0 };
const timeout = config.timeout || 1000;
console.log('timeout using ||:', timeout);  // 1000 (0 is falsy → falls back)

// Use ?? to avoid that pitfall:
const safeTimeout = config.timeout ?? 1000;
console.log('timeout using ??:', safeTimeout); // 0 (only null/undefined coalesced)

// 6. Short-circuit in Assignments
let count = 0;
count === 0 && (count = 10);
console.log('count after && assignment:', count); // 10

let options = null;
options ||= { debug: true };
console.log('options after ||=:', options);        // { debug: true }

// 7. Best Practices
/*
- Use && for executing code only when all conditions are truthy.
- Use || for providing defaults, but switch to ?? when zero or empty string are valid.
- Avoid chaining without understanding operator precedence.
- Parenthesize combined expressions (a && b) || c to clarify intent.
*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
62 - Dynamic Imports and import() Promises

This note explains:
1. import(modulePath) syntax returning a Promise.
2. Handling loaded modules with then() and catch().
3. Using async/await for cleaner syntax.
4. Conditional or on-demand loading based on runtime logic.
5. Module caching: subsequent imports return the cached module.
*/

// 1. Basic dynamic import with then()/catch()
import('./mathUtils.js')
  .then(({ add, multiply }) => {
    console.log('2 + 3 =', add(2, 3));
    console.log('4 * 5 =', multiply(4, 5));
  })
  .catch(error => {
    console.error('Error loading mathUtils:', error);
  });

// 2. Using async/await for dynamic imports
async function loadStringUtils() {
  try {
    const { toUpperCase, toLowerCase } = await import('./stringUtils.js');
    console.log('UPPER:', toUpperCase('hello'));
    console.log('lower:', toLowerCase('WORLD'));
  } catch (error) {
    console.error('Failed to load stringUtils:', error);
  }
}
loadStringUtils();

// 3. Conditional import based on runtime condition
async function loadDashboard(isAdmin) {
  if (isAdmin) {
    const { initAdminPanel } = await import('./adminPanel.js');
    initAdminPanel();
  } else {
    const { initUserPanel } = await import('./userPanel.js');
    initUserPanel();
  }
}
loadDashboard(true);

// 4. Import with custom chunk name (Webpack magic comment)
import(/* webpackChunkName: "charts" */ './charts.js')
  .then(charts => {
    charts.renderChart();
  })
  .catch(err => {
    console.error('Failed to load charts module:', err);
  });

// 5. Demonstrating module caching
async function testModuleCache() {
  const mod1 = await import('./mathUtils.js');
  const mod2 = await import('./mathUtils.js');
  console.log('Modules are identical (cached):', mod1 === mod2); // true
}
testModuleCache();


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
63 - Modules: import/export syntax, default vs named exports

This note explains:
1. Named exports: how to export and import multiple named bindings.
2. Default exports: a single default export per module and its import.
3. Renaming named exports and imports.
4. Re-exporting and aggregating modules.
5. Importing for side-effects only.
*/

// ─── mathUtils.js ───
// Named exports: you can export multiple bindings by name.
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// ─── stringUtils.js ───
// Default export: one per module, imported without braces.
// Named export alongside default.
export default function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function toLower(str) {
  return str.toLowerCase();
}

// ─── logger.js ───
// Side-effect only module: runs code on import, no exports.
console.log('Logger module loaded');

// ─── aggregator.js ───
// Re-exporting and aggregating modules:
export * from './mathUtils.js';                      // re-export all named from mathUtils
export { default as capitalize } from './stringUtils.js'; // re-export default under a name

// ─── index.js ───
// Static imports:
import { add, subtract, PI } from './mathUtils.js';
import capitalize, { toLower } from './stringUtils.js';
import * as MathFuncs from './mathUtils.js';            // namespace import
import { add as sum, PI as piValue } from './mathUtils.js'; // renaming imports
import './logger.js';                                   // side-effect import only

console.log('PI:', PI);                                // 3.14159
console.log('add(2,3):', add(2, 3));                   // 5
console.log('subtract(5,2):', subtract(5, 2));         // 3

console.log('capitalize("hello"):', capitalize('hello')); // Hello
console.log('toLower("WORLD"):', toLower('WORLD'));       // world

console.log('sum(10,20):', sum(10, 20));                 // 30
console.log('piValue:', piValue);                       // 3.14159

console.log('MathFuncs.add(4,7):', MathFuncs.add(4, 7)); // 11

// ─── Optional: dynamic import (returns a Promise)
// import('./dynamicModule.js').then(mod => {
//   console.log('Dynamically loaded:', mod);
// });

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
64 - ES6 Promises: creating, chaining, error handling

This note explains:
1. Creating Promises using new Promise()
2. Resolving and rejecting
3. Consuming with then(), catch(), and finally()
4. Parallel and competitive patterns: Promise.all, Promise.race
5. Advanced settlement: Promise.allSettled, Promise.any
*/

// 1. Creating a Promise
function asyncTask(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve('✅ Task succeeded');
      } else {
        reject(new Error('❌ Task failed'));
      }
    }, 1000);
  });
}

// 2. Consuming with then(), catch(), and finally()
asyncTask(true)
  .then(result => {
    console.log('Result:', result);
    return '➡️ Chained value';
  })
  .then(chained => console.log('Chained:', chained))
  .catch(error => console.error('Error:', error.message))
  .finally(() => console.log('Completed asyncTask(true)\n'));

// 3. Error propagation in chains
asyncTask(false)
  .then(res => console.log('Should not run:', res))
  .catch(err => console.error('Caught error:', err.message))
  .finally(() => console.log('Completed asyncTask(false)\n'));

// 4. Parallel execution with Promise.all
const p1 = asyncTask(true);
const p2 = asyncTask(true);
Promise.all([p1, p2])
  .then(results => console.log('Promise.all results:', results))
  .catch(err => console.error('Promise.all error:', err.message))
  .finally(() => console.log('Completed Promise.all\n'));

// 5. Competitive execution with Promise.race
const fast = new Promise(resolve => setTimeout(() => resolve('🏎️ fast'), 500));
const slow = new Promise(resolve => setTimeout(() => resolve('🐢 slow'), 1000));
Promise.race([fast, slow])
  .then(winner => console.log('Promise.race winner:', winner))
  .finally(() => console.log('Completed Promise.race\n'));

// 6. Promise.allSettled (ES2020) – waits for all, regardless of outcome
const p3 = asyncTask(true);
const p4 = asyncTask(false);
Promise.allSettled([p3, p4])
  .then(results => {
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        console.log(`allSettled[${i}] fulfilled with:`, r.value);
      } else {
        console.log(`allSettled[${i}] rejected with:`, r.reason.message);
      }
    });
    console.log('Completed Promise.allSettled\n');
  });

// 7. Promise.any (ES2021) – resolves with first fulfillment, rejects if all reject
Promise.any([asyncTask(false), asyncTask(true)])
  .then(val => console.log('Promise.any first fulfilled:', val))
  .catch(aggErr => console.error('Promise.any failed:', aggErr.errors))
  .finally(() => console.log('Completed Promise.any\n'));

/*
Best Practices:
- Always attach a catch() to handle rejections.
- Use finally() for teardown logic irrespective of outcome.
- Choose Promise.all when tasks must all succeed; use Promise.any or race for first success.
- Remember Promise.allSettled returns statuses for all, useful for partial results.
*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*
65 - Promise.all, Promise.race, Promise.allSettled, Promise.any

This note explains:
1. Promise.all    – waits for all promises to fulfill; rejects on first rejection.
2. Promise.race   – settles as soon as one promise fulfills or rejects.
3. Promise.allSettled – waits for all promises to settle (fulfill or reject), returns statuses.
4. Promise.any    – waits for the first fulfillment; rejects if all promises reject.
*/

// Helper: simulate an asynchronous task
function task(name, delay, shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        console.log(`${name} succeeded`);
        resolve(`${name} result`);
      } else {
        console.log(`${name} failed`);
        reject(new Error(`${name} error`));
      }
    }, delay);
  });
}

// 1. Promise.all
const pAll1 = task('A', 300);
const pAll2 = task('B', 500);
const pAll3 = task('C', 200, false); // will fail

Promise.all([pAll1, pAll2, pAll3])
  .then(results => {
    console.log('Promise.all results:', results);
  })
  .catch(err => {
    console.error('Promise.all rejected with:', err.message);
  });

// 2. Promise.race
const pRace1 = task('Fast', 100);
const pRace2 = task('Slow', 400);

Promise.race([pRace1, pRace2])
  .then(first => {
    console.log('Promise.race first settled:', first);
  })
  .catch(err => {
    console.error('Promise.race rejection:', err.message);
  });

// 3. Promise.allSettled
const pSettled1 = task('X', 150);
const pSettled2 = task('Y', 250, false);
const pSettled3 = task('Z', 350);

Promise.allSettled([pSettled1, pSettled2, pSettled3])
  .then(results => {
    console.log('Promise.allSettled statuses:');
    results.forEach((r, i) => {
      console.log(`  [${i}]`, r.status, r.value ?? r.reason.message);
    });
  });

// 4. Promise.any
const pAny1 = task('One', 200, false);
const pAny2 = task('Two', 300, false);
const pAny3 = task('Three', 100);

Promise.any([pAny1, pAny2, pAny3])
  .then(first => {
    console.log('Promise.any first fulfilled:', first);
  })
  .catch(aggErr => {
    console.error('Promise.any all rejected:', aggErr.errors);
  });

/*
Best Practices:
- Use Promise.all when you need all tasks to succeed; handle errors in catch().
- Use Promise.race for timeouts or first response scenarios.
- Use Promise.allSettled to inspect each outcome without short-circuiting.
- Use Promise.any to get the first successful result, and handle AggregateError if none succeed.
*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
66 - Async/Await: Syntax, Error Handling with try/catch/finally

This note explains:
1. Declaring async functions.
2. Using await to pause until a Promise settles.
3. Handling errors with try/catch.
4. Using finally for cleanup.
5. Parallel execution with Promise.all and await.
*/

// 1. Declaring an async function
async function fetchData(id) {
  // ‘await’ pauses until the Promise resolves or rejects
  const response = await fakeNetworkRequest(id);
  return response;
}

// Helper: returns a Promise that resolves or rejects after a delay
function fakeNetworkRequest(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ data: `Item ${id}` });
      else reject(new Error('Invalid ID'));
    }, 500);
  });
}

// 2. Consuming async functions with then/catch
fetchData(1)
  .then(result => console.log('fetchData(1) result:', result))
  .catch(err => console.error('fetchData(1) error:', err.message));

// 3. Error handling with try/catch inside async
async function loadData(id) {
  try {
    const result = await fetchData(id);
    console.log('loadData success:', result);
  } catch (error) {
    console.error('loadData caught error:', error.message);
  } finally {
    console.log('loadData cleanup (finally block)');
  }
}
loadData(-1);

// 4. Using try/catch around multiple awaits
async function processMultiple(ids) {
  try {
    for (const id of ids) {
      const item = await fetchData(id);
      console.log('Processed:', item);
    }
  } catch (err) {
    console.error('Error processing:', err.message);
  }
}
processMultiple([1, 2, -3, 4]);

// 5. Parallel execution with Promise.all and await
async function loadAll(ids) {
  try {
    // kick off all requests in parallel
    const promises = ids.map(fetchData);
    const results = await Promise.all(promises);
    console.log('loadAll results:', results);
  } catch (err) {
    console.error('loadAll error (one failed):', err.message);
  } finally {
    console.log('loadAll done');
  }
}
loadAll([1, 2, 3]);

/*
Best Practices:
- Always use try/catch inside async functions to handle rejections.
- Use finally for teardown logic (e.g., hide loading spinner).
- Launch independent Promises in parallel via Promise.all + await.
- Beware that await in loops is sequential; for parallel use Promise.all.
- Avoid forgetting await (it returns a Promise, not the resolved value).
*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*
67 - Generators and Iterators: function* syntax, yield, next(), for…of iteration

This note explains:
1. Generator functions (function*).
2. Using yield to produce sequence values.
3. Iterator objects and their next() method.
4. Consuming generators with for…of.
5. Creating custom iterable objects via Symbol.iterator.
6. Passing values into generators via next(value).
*/

// 1. Basic Generator Function
function* simpleGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}
const gen = simpleGenerator();
console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: 'c', done: false }
console.log(gen.next()); // { value: undefined, done: true }

// 2. Consuming with for…of
console.log('\nfor…of over simpleGenerator:');
for (const val of simpleGenerator()) {
  console.log(val); // a, b, c
}

// 3. Passing Values into Generator
function* echoGenerator() {
  const name = yield 'What is your name?';
  yield `Hello, ${name}!`;
}
const echo = echoGenerator();
console.log(echo.next());          // { value: 'What is your name?', done: false }
console.log(echo.next('Ajay'));    // { value: 'Hello, Ajay!',      done: false }
console.log(echo.next());          // { value: undefined,           done: true }

// 4. Custom Iterable Object via Symbol.iterator
const iterableObj = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
console.log('\nfor…of over iterableObj:');
for (const num of iterableObj) {
  console.log(num); // 1, 2, 3
}

// 5. Using Built-in Iterator from Array
const arrIter = [10, 20, 30][Symbol.iterator]();
console.log('\nArray iterator via next():');
console.log(arrIter.next()); // { value: 10, done: false }
console.log(arrIter.next()); // { value: 20, done: false }
console.log(arrIter.next()); // { value: 30, done: false }
console.log(arrIter.next()); // { value: undefined, done: true }

// 6. Infinite Sequence Generator (Fibonacci)
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
console.log('\nFirst five Fibonacci numbers:');
for (let i = 0; i < 5; i++) {
  console.log(fib.next().value); // 0, 1, 1, 2, 3
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
67 - Generators and Iterators: function* syntax, yield, next(), for…of iteration

This note explains:
1. Generator functions (function*).
2. Using yield to produce sequence values.
3. Iterator objects and their next() method.
4. Consuming generators with for…of.
5. Creating custom iterable objects via Symbol.iterator.
6. Passing values into generators via next(value).
*/

// 1. Basic Generator Function
function* simpleGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}
const gen = simpleGenerator();
console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: 'c', done: false }
console.log(gen.next()); // { value: undefined, done: true }

// 2. Consuming with for…of
console.log('\nfor…of over simpleGenerator:');
for (const val of simpleGenerator()) {
  console.log(val); // a, b, c
}

// 3. Passing Values into Generator
function* echoGenerator() {
  const prompt = yield 'What is your name?';
  yield `Hello, ${prompt}!`;
}
const echo = echoGenerator();
console.log(echo.next());          // { value: 'What is your name?', done: false }
console.log(echo.next('Ajay'));    // { value: 'Hello, Ajay!',      done: false }
console.log(echo.next());          // { value: undefined,           done: true }

// 4. Custom Iterable Object via Symbol.iterator
const iterableObj = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
console.log('\nfor…of over iterableObj:');
for (const num of iterableObj) {
  console.log(num); // 1, 2, 3
}

// 5. Using Built-in Iterator from Array
const arrIter = [10, 20, 30][Symbol.iterator]();
console.log('\nArray iterator via next():');
console.log(arrIter.next()); // { value: 10, done: false }
console.log(arrIter.next()); // { value: 20, done: false }
console.log(arrIter.next()); // { value: 30, done: false }
console.log(arrIter.next()); // { value: undefined, done: true }

// 6. Infinite Sequence Generator (Fibonacci)
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
console.log('\nFirst five Fibonacci numbers:');
for (let i = 0; i < 5; i++) {
  console.log(fib.next().value); // 0, 1, 1, 2, 3
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
69 - BigInt: Syntax, Use Cases, Limitations

This note explains:
1. Creating BigInt: literal suffix `n` and constructor BigInt()
2. Arithmetic and comparisons with BigInt
3. Use cases: integers beyond Number.MAX_SAFE_INTEGER, precise counters, cryptography
4. Limitations: cannot mix with Number without conversion, no decimals, JSON issues
*/

// 🔹 1. Creating BigInt Values
const literalBig = 1234567890123456789012345678901234567890n; // literal with `n`
const constructedBig = BigInt("9007199254740993");          // one above Number.MAX_SAFE_INTEGER
console.log('literalBig:', literalBig);
console.log('constructedBig:', constructedBig);

// 🔹 2. Arithmetic with BigInt
const a = 10n;
const b = 3n;
console.log('a + b =', a + b);   // 13n
console.log('a - b =', a - b);   // 7n
console.log('a * b =', a * b);   // 30n
console.log('a / b =', a / b);   // 3n  (truncates remainder)
console.log('a % b =', a % b);   // 1n

// 🔹 3. Comparisons and Mixing with Number
console.log('BigInt > Number:', 10n > 5);       // true
console.log('BigInt === Number:', 5n === 5);    // false (different types)
// Mixing BigInt and Number throws:
try {
  // console.log(a + 2); // uncomment to see TypeError
} catch (e) {
  console.error('Error mixing BigInt and Number:', e.message);
}

// 🔹 4. Use Cases for BigInt
// • Large counters (e.g., block heights in blockchain)
let blockHeight = 0n;
blockHeight += 1n;
console.log('blockHeight:', blockHeight);

// • Cryptographic keys and hashes requiring big integers
// • Precise integer arithmetic in financial or scientific domains

// 🔹 5. Limitations and Caveats
// • No fractional values: BigInt cannot represent decimals
// • Cannot mix with Number implicitly: must convert via Number() or BigInt()
// • Slower performance than Number for small values
// • JSON.stringify ignores BigInt (throws TypeError):
try {
  JSON.stringify({ value: a });
} catch (e) {
  console.error('JSON error:', e.message);
}

// 🔹 6. Converting Between BigInt and Number
const numFromBig = Number(a);   // explicit conversion (may lose precision)
const bigFromNum = BigInt(42);  // explicit conversion
console.log('numFromBig:', numFromBig, 'bigFromNum:', bigFromNum);

// 🔹 7. Best Practices
/*
- Use BigInt when you need integers beyond ±2^53-1 or exact integer math.
- Convert explicitly when mixing types.
- Avoid JSON for BigInt data; use string serialization instead.
*/


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////