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
// 68 - Symbols: creation, use as property keys, well-known symbols (Symbol.iterator, Symbol.toStringTag)
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