// 1 - Linking a JavaScript File
// 2 - Values and Variables
// 3 - data types and type conversion




//////////////////////////////////////////////////

// 1 - Linking a JavaScript File


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Linking JavaScript Examples</title>

  <!-- 1. Basic include in <head> (blocks HTML parsing until loaded) -->
  <script src="script.js"></script>

  <!-- 2. Using defer (downloads in parallel, executes after HTML parsing) -->
  <script src="deferred.js" defer></script>

  <!-- 3. Using async (downloads in parallel, executes as soon as ready) -->
  <script src="async.js" async></script>

  <!-- 4. Module script (ESM support: import/export) -->
  <script type="module" src="module.js"></script>
</head>
<body>
  <h1>Check the Console</h1>

  <!-- 5. Include at end of <body> (ensures DOM is ready) -->
  <script src="bottom.js"></script>

  <!-- 6. Inline script block -->
  <script>
    console.log('This is an inline script');
  </script>

  <!-- 7. Dynamic injection via DOM -->
  <script>
    const dynamic = document.createElement('script');
    dynamic.src = 'dynamic.js';
    dynamic.onload = () => console.log('dynamic.js loaded');
    document.head.appendChild(dynamic);
  </script>
</body>
</html>

//////////////////////////////////////////////////

// 2 - Values and Variables

// VALUES & VARIABLES: IMPORTANT JS EXAMPLES

// 1. Declarations: var, let, const
var username = 'Alice';
let age = 30;
const isAdmin = false;

// 2. Reassignment & Redeclaration
username = 'Bob';     // OK: var can be re-assigned
age = 31;             // OK: let can be re-assigned
// const cannot be re-assigned or re-declared

// 3. Primitive Types
const num     = 100;          // Number
const str     = "Hello!";     // String
const bool    = true;         // Boolean
const nothing = null;         // Null
let undef;                    // Undefined
const id      = Symbol('id'); // Symbol

// 4. Composite Types
const arr   = [1, 2, 3];           // Array
const obj   = { x: 1, y: 2 };      // Object
function greet() { return 'hi'; }  // Function (callable object)

// 5. Dynamic Typing
let data = 5;
data = 'five';
data = false;

// 6. Copy by Value vs Reference
let a = 10;
let b = a;
a = 20;               // b remains 10

const o1 = { v: 1 };
const o2 = o1;
o1.v = 2;             // o2.v is now 2

// 7. Scope & Hoisting
function demoScope() {
  var vVar = 'function scope';
  let vLet = 'block scope';
  if (true) {
    var vVar = 'redeclared';   // affects outer vVar
    let vLet = 'inner block'; // separate vLet
    console.log(vVar); // 'redeclared'
    console.log(vLet); // 'inner block'
  }
  console.log(vVar);   // 'redeclared'
  console.log(vLet);   // 'block scope'
}
demoScope();

console.log(hVar); // undefined (var hoisted)
var hVar = 'hoisted';

// console.log(hLet); // ReferenceError (let not hoisted)
let hLet = 'not hoisted';

// 8. Constants Immutability
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// 9. Variable Naming Rules
let $dollar, _underscore, camelCase, PascalCase, snake_case;

// 10. Template Literals & Variables
const name = 'Charlie';
console.log(`User: ${name}, Age: ${age}`);

// 11. Destructuring Assignment
const { x, y } = obj;
const [first, ...rest] = arr;



// LET, CONST & VAR: Key JavaScript Examples

// 1. Declaration & Initialization
var x = 1;
let y = 2;
const z = 3;

// 2. Reassignment
x = 10;      // OK: var can be reassigned
y = 20;      // OK: let can be reassigned
// z = 30;   // ❌ Error: Assignment to constant variable

// 3. Redeclaration
var x = 100; // OK: var allows redeclaration
// let y = 200;   // ❌ Error: Identifier 'y' has already been declared
// const z = 300; // ❌ Error: Identifier 'z' has already been declared

// 4. Hoisting Behavior
console.log(hoistedVar);   // undefined (var is hoisted)
// console.log(hoistedLet);   // ❌ ReferenceError: Cannot access 'hoistedLet' before initialization
// console.log(hoistedConst); // ❌ ReferenceError: Cannot access 'hoistedConst' before initialization
var hoistedVar = 'var';
// let hoistedLet = 'let';
// const hoistedConst = 'const';

// 5. Temporal Dead Zone (TDZ)
{
  // console.log(tdzVar);   // undefined
  // console.log(tdzLet);   // ❌ ReferenceError
  // console.log(tdzConst); // ❌ ReferenceError
  var tdzVar = 'var in block';
  let tdzLet = 'let in block';
  const tdzConst = 'const in block';
}

// 6. Scope Differences
function testScope() {
  if (true) {
    var funcScoped = 'function scope';
    let blockScoped = 'block scope';
    const blockConst  = 'block scope const';
  }
  console.log(funcScoped);      // 'function scope'
// console.log(blockScoped);      // ❌ ReferenceError
// console.log(blockConst);       // ❌ ReferenceError
}
testScope();

// 7. Global Object & Variables (in browser)
var gVar   = 'global var';
let gLet   = 'global let';
const gConst = 'global const';
console.log(window.gVar);     // 'global var'
console.log(window.gLet);     // undefined
console.log(window.gConst);   // undefined



//////////////////////////////////////////////////

// 3 - data types and type conversion

// DATA TYPES: JavaScript Examples

// 1. Number
const intNum       = 42;
const floatNum     = 3.14;
const nanValue     = NaN;
const infinityVal  = Infinity;

// 2. BigInt
const bigIntNum    = 123456789012345678901234567890n;

// 3. String
const singleQuote      = 'Hello';
const doubleQuote      = "World";
const templateLiteral  = `Sum: ${intNum + floatNum}`;

// 4. Boolean
const isTrue      = true;
const isFalse     = false;

// 5. Null
const nothing     = null;

// 6. Undefined
let notAssigned;

// 7. Symbol
const sym1        = Symbol('sym');
const sym2        = Symbol('sym');
console.log(sym1 === sym2); // false

// 8. Object
const obj         = { a: 1, b: 'two' };

// 9. Array
const arr         = [1, 2, 3];

// 10. Function
function add(x, y)    { return x + y; }
const arrowAdd       = (x, y) => x + y;

// 11. Date
const now         = new Date();

// 12. RegExp
const regex       = /ab+c/i;

// 13. Map
const map         = new Map();
map.set('key', 'value');

// 14. Set
const set         = new Set([1, 2, 2]);

// TYPE CHECKS & CONVERSIONS
console.log(typeof intNum);      // "number"
console.log(typeof bigIntNum);   // "bigint"
console.log(typeof singleQuote); // "string"
console.log(typeof isTrue);      // "boolean"
console.log(typeof nothing);     // "object"  (quirk)
console.log(typeof notAssigned); // "undefined"
console.log(typeof sym1);        // "symbol"
console.log(typeof obj);         // "object"
console.log(typeof arr);         // "object"
console.log(typeof add);         // "function"

console.log(nothing === null);   // true
console.log(Array.isArray(arr)); // true

// Type Conversions
console.log(String(123));        // "123"
console.log(Number("123"));      // 123
console.log(Boolean(0));         // false



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////