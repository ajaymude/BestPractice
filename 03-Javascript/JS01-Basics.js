// ======================
// JavaScript Full Syllabus
// (Beginner to Expert)
// ======================

// 📘 BASICS & SETUP
// 01 - What is JavaScript and why use it?
// 02 - JavaScript vs. Vanilla JS vs. Transpiled Languages (TypeScript, CoffeeScript)
// 03 - Setting up a Development Environment (Node.js, npm, nvm)
// 04 - Running JavaScript in Browser Console vs. Node REPL
// 05 - Including JS in HTML: <script> tags, defer, async

// 🔤 SYNTAX & FUNDAMENTALS
// 06 - Statements, Expressions, and Semicolons
// 07 - Comments (single-line, multi-line)
// 08 - Variables: var, let, const (hoisting, temporal dead zone)
// 09 - Data Types: primitive (string, number, boolean, null, undefined, symbol, bigint)
// 10 - typeof operator and type coercion

// 🔢 OPERATORS & EXPRESSIONS
// 11 - Arithmetic Operators (+, -, *, /, %, **, ++, --)
// 12 - Assignment Operators (=, +=, -=, *=, /=, %=, **=)
// 13 - Comparison Operators (== vs ===, != vs !==, >, <, >=, <=)
// 14 - Logical Operators (&&, ||, !)
// 15 - Ternary Operator (condition ? expr1 : expr2)
// 16 - Operator Precedence and Associativity

// 🤔 CONTROL FLOW
// 17 - if, else if, else statements
// 18 - switch statement and fall-through
// 19 - for loops (for, for…of, for…in)
// 20 - while and do…while loops
// 21 - break, continue, labeled statements

// 🧩 FUNCTIONS
// 22 - Function Declaration vs Function Expression
// 23 - Arrow Functions: syntax, this-binding differences
// 24 - Parameters and Arguments (default parameters, rest operator)
// 25 - Return values
// 26 - First-class Functions and Callbacks
// 27 - Higher-order Functions (functions that return functions, take functions as args)
// 28 - Immediately Invoked Function Expressions (IIFE)
// 29 - Function Scope vs Block Scope
// 30 - Closures: lexical environment, private variables
// 31 - Function.prototype.call, apply, and bind
// 32 - Recursion (recursion vs iteration)



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// <!--
// 05 - Including JS in HTML: <script> tags, defer, async

// This note explains how to include JavaScript in an HTML page using:
// 1. Inline <script> tags
// 2. External .js files via <script src="...">
// 3. The defer attribute
// 4. The async attribute

// All explanations appear as comments. The actual JavaScript examples below are active code.
// -->

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Including JS in HTML</title>

//   <!-- 
//   1. Basic Inline <script> in <head>:
//      - Placing a <script> directly in the <head> will execute it immediately 
//        as the HTML parser encounters it.
//      - If the script references DOM elements that come later, those elements might not exist yet.
//   -->
//   <script>
//     // This runs as soon as the parser reaches this line.
//     console.log("Inline script in <head> executed.");
//     // Attempting to access a <div id="demo"> here would fail because it hasn't been parsed yet.
//     // Example: document.getElementById("demo") -> null
//   </script>

//   <!-- 
//   2. External Script with defer:
//      - The defer attribute tells the browser to download the external file in parallel 
//        but defer execution until after the HTML is fully parsed.
//      - Deferred scripts execute in the order they appear.
//   -->
//   <script src="deferred-script.js" defer></script>

//   <!-- 
//   3. External Script with async:
//      - The async attribute tells the browser to download the script in parallel 
//        and execute it as soon as it’s ready, without waiting for HTML parsing to finish.
//      - Async scripts do NOT guarantee order; whichever loads first executes first.
//   -->
//   <script src="async-script.js" async></script>

// </head>
// <body>

//   <h1>Including JavaScript Examples</h1>
//   <div id="demo">Demo content placeholder</div>

//   <!-- 
//   4. Inline <script> at end of <body>:
//      - Placing a <script> just before </body> ensures that all HTML elements above exist.
//      - This is a common pattern when not using defer/async.
//   -->
//   <script>
//     // Now that the DOM is parsed, we can safely manipulate elements.
//     const demoDiv = document.getElementById("demo");
//     demoDiv.textContent = "This text was set by an inline script at end of <body>.";
//     console.log("Inline script at end of <body> executed.");
//   </script>

// </body>
// </html>

// <!--
// --------------------------------------------------------------------------------
// Contents of deferred-script.js (in the same directory as the HTML file):
// --------------------------------------------------------------------------------
// -->
// <!--
//   // deferred-script.js
  
//   // This file is loaded and executed only after the HTML has been fully parsed.
//   console.log("Deferred script executed after HTML parsing.");
  
//   // Safe to manipulate DOM here as everything is parsed.
//   const demoElement = document.getElementById("demo");
//   demoElement.style.color = "blue";
// -->

// <!--
// --------------------------------------------------------------------------------
// Contents of async-script.js (in the same directory as the HTML file):
// --------------------------------------------------------------------------------
// -->
// <!--
//   // async-script.js
  
//   // This file is loaded in parallel. It executes as soon as it finishes downloading,
//   // which might be before or after the HTML is fully parsed.
//   console.log("Async script executed as soon as it was downloaded.");
  
//   // Warning: DOM elements may not be available if this runs before parsing.
//   const demoElement = document.getElementById("demo");
//   if (demoElement) {
//     demoElement.style.fontWeight = "bold";
//   } else {
//     console.warn("Demo element not found yet (async script).");
//   }
// -->


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
06 - Statements, Expressions, and Semicolons

This note explains:
1. The difference between Statements and Expressions.
2. When and why semicolons are used.
3. How Automatic Semicolon Insertion (ASI) works and common pitfalls.

All theory appears as comments. The code examples below are active JavaScript.
*/

// 🔤 1. What Is an Expression?
// - An expression is any valid unit of code that resolves to a value.
// - Examples: literals, variable references, arithmetic operations, function calls.

// Example: Literal expression
42;
console.log("Literal expression (42):", 42); // Output: 42

// Example: Arithmetic expression
const sum = 5 + 3;
console.log("Arithmetic expression (5 + 3):", sum); // Output: 8

// Example: Function call expression
function square(n) {
  return n * n;
}
const sq = square(4);
console.log("Function call expression (square(4)):", sq); // Output: 16

// Example: Object literal expression
const user = { name: "Ajay", age: 25 };
console.log("Object literal expression:", user); // Output: { name: "Ajay", age: 25 }

// 🏷️ 2. What Is a Statement?
// - A statement performs an action. It does not directly produce a value (though it may contain expressions).
// - Examples: variable declarations, if/else, loops, function declarations.

// Example: Variable declaration statement
let x = 10;
console.log("Variable declaration statement (let x = 10):", x); // Output: 10

// Example: if/else statement
if (x > 5) {
  console.log("if statement: x is greater than 5"); // This runs because x=10
} else {
  console.log("x is not greater than 5");
}

// Example: for loop statement
for (let i = 0; i < 3; i++) {
  console.log("for loop iteration:", i);
}
// Output:
// for loop iteration: 0
// for loop iteration: 1
// for loop iteration: 2

// Example: Function declaration statement
function greet(name) {
  return "Hello, " + name;
}
// Function declarations are statements, not expressions.
console.log(greet("Ajay")); // Output: Hello, Ajay

// ✔️ 3. Expression Statements vs. Declaration Statements
// - An expression statement is an expression followed by a semicolon.
// - A declaration statement (var, let, const, function) declares something.

// Example: Expression statement
x * 2; // This computes 20 but result is not stored. It's an expression statement.


// 🔸 4. Semicolons: When Are They Required?
// - JavaScript uses semicolons to terminate statements.
// - Many statements work without semicolons due to Automatic Semicolon Insertion (ASI).
// - However, omitting semicolons can lead to unexpected behavior in certain cases.

// Example: Two separate statements on one line
let a = 1; let b = 2; console.log("a+b:", a + b); // Output: a+b: 3

// Example: Omitting semicolons in simple cases
let c = 3
let d = 4
console.log("c+d:", c + d) // Output: c+d: 7

// 🎲 5. Automatic Semicolon Insertion (ASI) and Pitfalls
// - ASI inserts semicolons when the parser encounters a line break in specific contexts.
// - But ASI does NOT insert semicolons before lines that start with certain tokens (e.g., parentheses, brackets, template literals).

// Pitfall 1: Return statement on its own line
function getValue() {
  // ASI inserts a semicolon immediately after 'return'
  return
  100
}
// Equivalent to:
// function getValue() {
//   return;    <-- semicolon inserted here
//   100        <-- unreachable code
// }
console.log("getValue returns:", getValue()); // Output: getValue returns: undefined

// Correct usage:
function getCorrectValue() {
  return 100
}
console.log("getCorrectValue returns:", getCorrectValue()); // Output: 100

// Pitfall 2: Starting a line with `[` or `(` immediately after a statement without semicolon
let y = 5
[1, 2, 3].forEach(n => console.log("Array element:", n))
// The interpreter may think `[1,2,3]` indexes `y` (i.e., y[1,2,3]) leading to a syntax error.

// To fix, add a semicolon after the previous statement:
let z = 5;
[1, 2, 3].forEach(n => console.log("Fixed array element:", n));

// Pitfall 3: Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("IIFE run"); // Output: IIFE run
})()

// If the preceding line omitted a semicolon, the IIFE could be seen as a function call on the previous expression.
// Always use semicolon before an IIFE if the previous line is an expression.


// 🛡️ 6. Best Practices for Semicolons
// - Consistently use semicolons at the end of every statement to avoid ASI pitfalls.
// - In teams, follow a style guide (e.g., Airbnb, StandardJS).
// - If you choose to omit semicolons, be aware of the edge cases and place a semicolon before lines that begin with '(', '[', '`', '+', '-'.

// Example: Consistent semicolons
let e = 7;
let f = 8;
console.log("e+f:", e + f); // Output: e+f: 15

// 🔚 Summary:
// - Expressions produce values; statements perform actions.
// - Use semicolons to terminate statements explicitly.
// - ASI can insert semicolons but has tricky edge cases (e.g., return, IIFE, leading [ or ( ).
// - When in doubt, add a semicolon.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
07 - Comments (single-line, multi-line)

This note explains:
1. Single-line comments (//)
2. Multi-line comments (/* ... *​/)

Comments are ignored by the JavaScript engine and used to document code.
*/

// 🔸 1. Single-Line Comments
// Anything after // on the same line is a comment and not executed.

console.log("This line runs."); // This comment explains that the log will run

// You can use single-line comments to disable a line of code:
// console.log("This line is commented out and will not run.");

// 🔸 2. Multi-Line Comments
/*
   Anything between /* and *​/ is treated as a comment.
   Use multi-line comments to explain larger blocks of code or disable multiple lines:
*/

console.log("Multi-line comments start below:"); 

/* 
console.log("This line is inside a multi-line comment and will not run.");
console.log("This one won't run either.");
*/

console.log("Only active lines are executed.");

// 🔸 3. Best Practices for Comments
// - Use comments to explain WHY code does something, not WHAT it does if the code is clear.
// - Avoid over-commenting obvious code.
// - Keep comments up to date with code changes.

// Example of using comments to explain intent:
function calculateArea(width, height) {
  // Multiply width and height to get area of a rectangle
  return width * height;
}

console.log("Area of 5x4 rectangle:", calculateArea(5, 4)); // Output: 20

/*
Summary:
- Single-line comments start with // 
- Multi-line comments are wrapped in /* and * /
- Comments improve code readability and maintainability.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
08 - Variables: var, let, const (hoisting, temporal dead zone)

This note explains:
1. Declaring variables using var, let, and const.
2. Differences in scope (global, function, block).
3. Hoisting behavior for var vs. let/const.
4. Temporal Dead Zone (TDZ) for let and const.

All theory appears as comments; the code examples below are active JavaScript.
*/

// 🔸 1. var: Function-Scoped or Globally-Scoped, Hoisted (initialized with undefined)
/*
- Declaring with var creates a variable that is hoisted to the top of its function or global scope.
- The declaration is hoisted, but initialization stays in place.
- You can reassign and re-declare var variables.
*/
console.log("var before declaration:", someVar); // Output: undefined (declaration hoisted, initialized as undefined)
var someVar = 10;
console.log("var after initialization:", someVar); // Output: 10

function varExample() {
  console.log("inside function, var before init:", funcVar); // undefined
  var funcVar = "I am a function-scoped var";
  console.log("inside function, var after init:", funcVar); // I am a function-scoped var
}
varExample();

// 🔸 Re-declaring var in the same scope
var x = 1;
var x = 2;
console.log("var re-declared:", x); // Output: 2

// 🔸 2. let: Block-Scoped, Hoisted (in TDZ until initialized)
/*
- Declaring with let creates a block-scoped variable.
- The declaration is hoisted, but it remains in a Temporal Dead Zone until the line of initialization.
- Access before initialization throws ReferenceError.
- You cannot re-declare a let variable in the same scope, but you can reassign it.
*/
{
  // console.log("let before declaration:", blockLet); // ❌ ReferenceError: Cannot access 'blockLet' before initialization
  let blockLet = "I am block-scoped";
  console.log("let after initialization:", blockLet); // Output: I am block-scoped
  blockLet = "I can be reassigned";
  console.log("let after reassignment:", blockLet); // Output: I can be reassigned
}
// console.log(blockLet); // ❌ ReferenceError: blockLet is not defined (block scope)

// 🔸 Re-declaring let in the same scope
let y = 5;
// let y = 6; // ❌ SyntaxError: Identifier 'y' has already been declared
y = 7; // ✅ Reassignment allowed
console.log("let reassigned outside block:", y); // Output: 7

// 🔸 3. const: Block-Scoped, Hoisted (in TDZ until initialized), Must be Initialized, Immutable Binding
/*
- Declaring with const creates a block-scoped constant.
- The declaration is hoisted, but it remains in a Temporal Dead Zone until initialization.
- You must initialize a const variable at declaration.
- You cannot reassign or re-declare a const variable in the same scope.
- For objects/arrays declared with const, the binding is constant but object contents can mutate.
*/
// console.log("const before declaration:", blockConst); // ❌ ReferenceError: Cannot access 'blockConst' before initialization
{
  const blockConst = "I am a constant";
  console.log("const after initialization:", blockConst); // Output: I am a constant
  // blockConst = "Trying to reassign"; // ❌ TypeError: Assignment to constant variable
}
// console.log(blockConst); // ❌ ReferenceError: blockConst is not defined

// 🔸 Example: const with object (binding immutable, contents mutable)
const person = { name: "Ajay", age: 25 };
person.age = 26; // ✅ Allowed: modifying object property
console.log("const object after property change:", person); // Output: { name: "Ajay", age: 26 }
// person = { name: "Riya" }; // ❌ TypeError: Assignment to constant variable

// 🔸 4. Temporal Dead Zone (TDZ)
/*
- let and const are in TDZ from the start of their block until they are initialized.
- Accessing them in this zone throws a ReferenceError.
- var does not have a TDZ (initialized as undefined immediately).
*/
function tdzExample() {
  // console.log("inside TDZ, letVar:", letVar); // ❌ ReferenceError
  // console.log("inside TDZ, constVar:", constVar); // ❌ ReferenceError
  // console.log("inside TDZ, varVar:", varVar); // undefined

  var varVar = "var is initialized at creation";
  let letVar = "let is initialized here";
  const constVar = "const is initialized here";

  console.log("after initialization, varVar:", varVar);   // Output: var is initialized at creation
  console.log("after initialization, letVar:", letVar);   // Output: let is initialized here
  console.log("after initialization, constVar:", constVar); // Output: const is initialized here
}
tdzExample();

// 🔸 5. Scope Differences: var vs. let/const
function scopeDemo() {
  if (true) {
    var functionScoped = "I belong to the function";
    let blockScoped = "I belong to this block";
    const alsoBlockScoped = "Me too";
  }
  console.log("functionScoped (var):", functionScoped); // Output: I belong to the function
  // console.log("blockScoped (let):", blockScoped); // ❌ ReferenceError
  // console.log("alsoBlockScoped (const):", alsoBlockScoped); // ❌ ReferenceError
}
scopeDemo();

// 🔸 6. Best Practices for var, let, const
/*
- Prefer const for variables that won’t be reassigned.
- Use let for variables that will be reassigned.
- Avoid var to reduce bugs related to hoisting and function/global scope.
- Always declare variables at the top of their scope to make hoisting explicit.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
09 - Data Types: Primitive (string, number, boolean, null, undefined, symbol, bigint)

This note explains JavaScript’s primitive data types:
1. String
2. Number
3. Boolean
4. null
5. undefined
6. Symbol
7. BigInt

All theory appears as comments; the code examples below are active JavaScript.
*/

// 🔸 1. String
// - Represents text data enclosed in single or double quotes (or backticks for template literals).
// - Strings are immutable.

const singleQuoteString = 'Hello, JavaScript';
const doubleQuoteString = "Learning data types";
const templateLiteral = `Template literal combines ${singleQuoteString} and ${doubleQuoteString}`;

console.log("String examples:");
console.log(singleQuoteString);      // Output: Hello, JavaScript
console.log(doubleQuoteString);      // Output: Learning data types
console.log(templateLiteral);        // Output: Template literal combines Hello, JavaScript and Learning data types
console.log("Type of singleQuoteString:", typeof singleQuoteString); // string

// 🔸 2. Number
// - Represents both integer and floating-point numbers.
// - JavaScript has a single Number type (IEEE 754 double-precision).

const intNumber = 42;
const floatNumber = 3.14159;
const negativeNumber = -7;
const infinityValue = 1 / 0;          // Infinity
const nanValue = "not a number" * 2;  // NaN (Not a Number)

console.log("\nNumber examples:");
console.log(intNumber, "Type:", typeof intNumber);    // 42, number
console.log(floatNumber, "Type:", typeof floatNumber); // 3.14159, number
console.log(negativeNumber, "Type:", typeof negativeNumber); // -7, number
console.log("Infinity example:", infinityValue, typeof infinityValue); // Infinity, number
console.log("NaN example:", nanValue, typeof nanValue);             // NaN, number

// 🔸 3. Boolean
// - Represents logical values: true or false.
// - Commonly used for conditions and comparisons.

const isJSFun = true;
const isSkyGreen = false;

console.log("\nBoolean examples:");
console.log("isJSFun:", isJSFun, "Type:", typeof isJSFun);   // true, boolean
console.log("isSkyGreen:", isSkyGreen, "Type:", typeof isSkyGreen); // false, boolean

// 🔸 4. null
// - Represents an intentional absence of any object value.
// - typeof null returns "object" (this is a historical quirk).

const emptyValue = null;

console.log("\nnull example:");
console.log("emptyValue:", emptyValue, "Type:", typeof emptyValue); // null, object

// 🔸 5. undefined
// - Indicates a variable has been declared but not assigned a value.
// - Also returned when accessing a non-existent property or when a function has no return.

let notAssigned;
function returnsNothing() { /* no return statement */ }

console.log("\nundefined examples:");
console.log("notAssigned:", notAssigned, "Type:", typeof notAssigned); // undefined, undefined
console.log("Access non-existent property:", user.nonExistentProp, "Type:", typeof user.nonExistentProp); // undefined, undefined
console.log("returnsNothing():", returnsNothing(), "Type:", typeof returnsNothing()); // undefined, undefined

// 🔸 6. Symbol
// - Represents a unique and immutable identifier.
// - Useful for creating unique object keys.

const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log("\nSymbol examples:");
console.log("sym1 === sym2:", sym1 === sym2); // false (each Symbol is unique)
console.log("Type of sym1:", typeof sym1);    // symbol

// Using Symbol as object property key:
const obj = {};
obj[sym1] = "value associated with sym1";
console.log("Object with Symbol key:", obj[sym1]); // value associated with sym1

// 🔸 7. BigInt
// - Represents integers with arbitrary precision, larger than Number.MAX_SAFE_INTEGER.
// - Created by appending n to the end of an integer or using BigInt().

const bigIntegerLiteral = 123456789012345678901234567890n;
const bigIntegerConstructor = BigInt("9007199254740993"); // one more than Number.MAX_SAFE_INTEGER

console.log("\nBigInt examples:");
console.log("bigIntegerLiteral:", bigIntegerLiteral, "Type:", typeof bigIntegerLiteral);         // 123456789012345678901234567890n, bigint
console.log("bigIntegerConstructor:", bigIntegerConstructor, "Type:", typeof bigIntegerConstructor); // 9007199254740993n, bigint

// Arithmetic with BigInt:
const sumBigInt = bigIntegerLiteral + 10n;
console.log("Sum with BigInt:", sumBigInt); // 123456789012345678901234567900n

// Mixing BigInt and Number throws TypeError:
try {
  // const invalidMix = bigIntegerLiteral + 5; // Uncommenting this line would throw
  // console.log(invalidMix);
} catch (error) {
  console.error("Error mixing BigInt and Number:", error.message);
}

/*
📌 Summary of Primitive Types and typeof:

| Primitive    | Example                           | typeof Result    |
|--------------|-----------------------------------|------------------|
| String       | "Hello", 'World', `Template`      | "string"         |
| Number       | 42, 3.14, -7, NaN, Infinity       | "number"         |
| Boolean      | true, false                       | "boolean"        |
| null         | null                              | "object" (quirk) |
| undefined    | undefined, non-existent variable  | "undefined"      |
| Symbol       | Symbol("id")                      | "symbol"         |
| BigInt       | 123n, BigInt("900719...")         | "bigint"         |
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
10 - typeof Operator and Type Coercion

This note explains:
1. The typeof operator: how it works, return values, and common quirks.
2. Type coercion: implicit and explicit conversion between data types.
3. Examples demonstrating key behaviors and pitfalls.
*/

// 🔹 1. typeof Operator
// - The typeof operator returns a string indicating the type of the operand.
// - Common return values: "string", "number", "boolean", "object", "undefined", "function", "symbol", "bigint".

console.log("typeof Examples:");
console.log(typeof "Hello, JavaScript");      // "string"
console.log(typeof 42);                       // "number"
console.log(typeof 3.14);                     // "number"
console.log(typeof true);                     // "boolean"
console.log(typeof undefined);                // "undefined"
console.log(typeof function() {});            // "function"
console.log(typeof Symbol("id"));             // "symbol"
console.log(typeof 123n);                     // "bigint"

// 🧠 Quirks of typeof:
console.log(typeof null);                     // "object" (historical bug)
console.log(typeof [1, 2, 3]);                // "object" (arrays are objects)
console.log(Array.isArray([1, 2, 3]));         // true (use this to detect arrays)

// You can detect a null value explicitly:
const value = null;
if (value === null) {
  console.log("null is detected by strict comparison."); // This prints
}

// 🔹 2. Type Coercion (Implicit Conversion)
// - JavaScript will automatically convert values between types in certain contexts.
// - Examples: arithmetic with mixed types, string concatenation, boolean contexts, loose equality (==).

console.log("\nType Coercion Examples:");

// 2.1 String Concatenation vs Numeric Addition
console.log("5" + 3);       // "53"   (string concatenation)
console.log("5" - 3);       // 2      (numeric subtraction, "5" -> 5)
console.log("5" * "2");     // 10     (both strings coerced to numbers)
console.log("5" / "2");     // 2.5    (both strings coerced to numbers)

// 2.2 Adding Booleans and Numbers
console.log(true + 1);      // 2      (true -> 1)
console.log(false + 5);     // 5      (false -> 0)

// 2.3 Boolean Context (truthy/falsy)
if ("") {
  console.log("Empty string is truthy");
} else {
  console.log("Empty string is falsy"); // This prints
}
if ("Hello") {
  console.log("Non-empty string is truthy"); // This prints
}
if (0) {
  console.log("Zero is truthy");
} else {
  console.log("Zero is falsy"); // This prints
}
if ({}) {
  console.log("Empty object is truthy"); // This prints
}
if (NaN) {
  console.log("NaN is truthy");
} else {
  console.log("NaN is falsy"); // This prints
}

// 2.4 Loose Equality (==) vs Strict Equality (===)
console.log("\nEquality Comparisons:");
console.log(5 == "5");      // true   (string "5" coerced to number 5)
console.log(5 === "5");     // false  (no coercion, types differ)
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(0 == false);    // true   (false -> 0)
console.log(0 === false);   // false  (different types)
console.log("" == 0);       // true   ("" -> 0)
console.log("" === 0);      // false

// 2.5 Comparison Operators and Coercion
console.log("\nComparison Operators:");
console.log("2" < "10");    // false (string comparison: "2" > "1")
console.log(2 < "10");      // true  ("10" -> 10)
console.log("2" < 10);      // true  ("2" -> 2)

// 2.6 Implicit to Boolean using !!
console.log("\nDouble NOT for Boolean Coercion:");
console.log(!!"Hello");     // true
console.log(!!0);           // false
console.log(!!{});          // true

// 🔹 3. Explicit Type Conversion
// - Use built-in functions or methods to convert between types explicitly: String(), Number(), Boolean(), parseInt(), parseFloat().

// 3.1 String Conversion
console.log("\nExplicit Conversion to String:");
console.log(String(123));               // "123"
console.log((123).toString());          // "123"
console.log(String(true));              // "true"
console.log(String(null));              // "null"

// 3.2 Number Conversion
console.log("\nExplicit Conversion to Number:");
console.log(Number("123"));             // 123
console.log(Number("123abc"));          // NaN
console.log(parseInt("123abc"));        // 123
console.log(parseFloat("3.14 is PI"));  // 3.14
console.log(Number(false));             // 0
console.log(Number(true));              // 1
console.log(Number(""));                // 0
console.log(Number(" "));               // 0 (whitespace trimmed)
console.log(Number(null));              // 0
console.log(Number(undefined));         // NaN

// 3.3 Boolean Conversion
console.log("\nExplicit Conversion to Boolean:");
console.log(Boolean(1));                // true
console.log(Boolean(0));                // false
console.log(Boolean(""));               // false
console.log(Boolean("text"));           // true
console.log(Boolean(null));             // false
console.log(Boolean(undefined));        // false
console.log(Boolean(NaN));              // false

// 🔹 4. Coercion in Template Literals
console.log("\nTemplate Literal Coercion:");
const numVal = 5;
const boolVal = true;
console.log(`Number plus string: ${numVal} + "3" = ${numVal + "3"}`); // "53"
console.log(`Boolean in template: ${boolVal}`);                      // "true"

// 🔹 5. Coercion Pitfalls and Edge Cases
console.log("\nPitfalls and Edge Cases:");
// 5.1 Adding null and undefined with numbers
console.log(null + 5);      // 5    (null -> 0)
console.log(undefined + 5); // NaN  (undefined -> NaN)

// 5.2 Concatenating array and string
console.log([1,2,3] + "");       // "1,2,3" (array -> "1,2,3")
console.log([] + 1);             // "1"     (empty array -> "")
console.log([].toString());      // ""  

// 5.3 Unary plus for quick numeric conversion
console.log(+ "42");        // 42
console.log(+ true);        // 1
console.log(+ false);       // 0
console.log(+ "");          // 0
console.log(+ "abc");       // NaN

// 5.4 Subtraction vs Concatenation difference
console.log("5" - 2);       // 3   ("5" -> 5)
console.log("5" + 2);       // "52" (string concatenation)

// 5.5 Loose comparisons with Boolean and numbers
console.log(false == "0");  // true  ("0" -> 0, false -> 0)
console.log(false === "0"); // false

// 5.6 Comparing objects and primitives
const objA = { value: 10 };
const objB = { value: 10 };
console.log(objA == objB);  // false (different object references)
console.log(objA === objB); // false
console.log(objA.value == objB.value); // true (both 10)

// 🔹 6. Best Practices
/*
- Use strict equality (===) unless you explicitly want type coercion.
- Be mindful of typeof null === "object" when checking for null.
- Use explicit conversion (Number(), String(), Boolean()) to avoid ambiguity.
- Avoid relying on implicit coercion for critical logic.
- For JSON or data parsing, parse strings using parseInt, parseFloat, or Number.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
11 - Arithmetic Operators (+, -, *, /, %, **, ++, --)

This note explains the following JavaScript arithmetic operators:
1. +  (Addition)
2. -  (Subtraction)
3. *  (Multiplication)
4. /  (Division)
5. %  (Remainder/Modulus)
6. ** (Exponentiation)
7. ++ (Increment)
8. -- (Decrement)

Operator Precedence (from highest to lowest):
1. Parentheses: ( )
2. Exponentiation: **
3. Multiplication, Division, Modulus: *, /, %
4. Addition, Subtraction: +, -
5. Increment/Decrement: ++, -- (when used in expressions, prefix has higher precedence than postfix)
*/

// 🔹 1. Addition (+)
// Adds two numbers or concatenates strings.
const num1 = 5;
const num2 = 3;
console.log("5 + 3 =", num1 + num2);         // Output: 8

const str1 = "Hello, ";
const str2 = "World!";
console.log('"Hello, " + "World!" =', str1 + str2); // Output: "Hello, World!"

// 🔹 2. Subtraction (-)
// Subtracts the right operand from the left.
console.log("10 - 4 =", 10 - 4);              // Output: 6

// 🔹 3. Multiplication (*)
// Multiplies two numbers.
console.log("6 * 7 =", 6 * 7);                // Output: 42

// 🔹 4. Division (/)
// Divides the left operand by the right. If division by zero, returns Infinity or -Infinity.
console.log("20 / 5 =", 20 / 5);              // Output: 4
console.log("5 / 0 =", 5 / 0);                // Output: Infinity
console.log("-5 / 0 =", -5 / 0);              // Output: -Infinity

// 🔹 5. Remainder / Modulus (%)
// Returns the remainder after division of the left operand by the right.
console.log("10 % 3 =", 10 % 3);              // Output: 1
console.log("9 % 3 =", 9 % 3);                // Output: 0
console.log("5 % 2 =", 5 % 2);                // Output: 1

// 🔹 6. Exponentiation (**)
// Raises the left operand to the power of the right operand.
console.log("2 ** 3 =", 2 ** 3);              // Output: 8
console.log("5 ** 2 =", 5 ** 2);              // Output: 25
console.log("9 ** 0.5 =", 9 ** 0.5);          // Output: 3 (square root)

// 🔹 Demonstrating Operator Precedence
// Multiplication before Addition:
console.log("2 + 3 * 4 =", 2 + 3 * 4);        // Output: 14 (3*4 first)
// Using parentheses to override:
console.log("(2 + 3) * 4 =", (2 + 3) * 4);    // Output: 20

// 🔹 7. Increment (++)
// Increments a numeric variable by 1. Two forms: prefix and postfix.

let x = 10;

// Postfix increment: returns the value, then increments.
console.log("x (before x++) =", x);          // Output: 10
console.log("x++ returns:", x++);             // Output: 10 (then x becomes 11)
console.log("x (after x++) =", x);            // Output: 11

// Reset x
x = 10;

// Prefix increment: increments first, then returns the new value.
console.log("x (before ++x) =", x);           // Output: 10
console.log("++x returns:", ++x);             // Output: 11 (x is now 11)
console.log("x (after ++x) =", x);            // Output: 11

// 🔹 8. Decrement (--)
// Decrements a numeric variable by 1. Two forms: prefix and postfix.

let y = 5;

// Postfix decrement:
console.log("y (before y--) =", y);          // Output: 5
console.log("y-- returns:", y--);             // Output: 5 (then y becomes 4)
console.log("y (after y--) =", y);            // Output: 4

// Reset y
y = 5;

// Prefix decrement:
console.log("y (before --y) =", y);           // Output: 5
console.log("--y returns:", --y);             // Output: 4 (y is now 4)
console.log("y (after --y) =", y);            // Output: 4

// 🔹 Combined Usage in Expressions
let a = 3;
let b = 4;
let c = 5;

// Example: mix of addition, multiplication, and increment
console.log("a + b * ++c =", a + b * ++c);
// Evaluation steps:
// 1. ++c makes c = 6
// 2. b * c = 4 * 6 = 24
// 3. a + (result) = 3 + 24 = 27

// Demonstrate how postfix vs prefix affects the result
let m = 2;
let n = 3;
console.log("m++ + ++n =", m++ + ++n);
// Evaluation steps:
// - ++n makes n = 4
// - m++ returns 2 (then m becomes 3)
// - 2 + 4 = 6
// - Final m = 3, n = 4
console.log("Final m =", m); // 3
console.log("Final n =", n); // 4

// 🔹 Negative and Floating-Point Numbers
console.log("-5 + 8 =", -5 + 8);              // Output: 3
console.log("3.5 * 2 =", 3.5 * 2);            // Output: 7
console.log("5.5 - 2.1 =", 5.5 - 2.1);        // Output: 3.4

// 🔹 Edge Cases: NaN and Infinity
console.log("NaN + 5 =", NaN + 5);            // Output: NaN
console.log("Infinity - 1000 =", Infinity - 1000); // Output: Infinity

/*
Summary:
- +  adds or concatenates
- -  subtracts
- *  multiplies
- /  divides (watch out for division by zero)
- %  gives remainder
- ** raises to a power
- ++ increments (prefix and postfix have different return behavior)
- -- decrements (prefix and postfix have different return behavior)
- Operator precedence determines evaluation order; use parentheses to override.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
12 - Assignment Operators (=, +=, -=, *=, /=, %=, **=)

This note explains the following JavaScript assignment operators:
1.  =   (Simple assignment)
2.  +=  (Addition assignment)
3.  -=  (Subtraction assignment)
4.  *=  (Multiplication assignment)
5.  /=  (Division assignment)
6.  %=  (Remainder assignment)
7.  **= (Exponentiation assignment)

Each operator updates the variable on the left by applying the operation with the right operand.
*/

// 🔹 1. Simple Assignment (=)
// Assigns the value of the right-hand expression to the variable on the left.
let a = 5;
console.log("Initial a =", a);            // Output: 5

// 🔹 2. Addition Assignment (+=)
// Equivalent to: a = a + value
a += 3;                                   // a = 5 + 3
console.log("After a += 3:", a);          // Output: 8

// 🔹 3. Subtraction Assignment (-=)
// Equivalent to: a = a - value
a -= 2;                                   // a = 8 - 2
console.log("After a -= 2:", a);          // Output: 6

// 🔹 4. Multiplication Assignment (*=)
// Equivalent to: a = a * value
a *= 4;                                   // a = 6 * 4
console.log("After a *= 4:", a);          // Output: 24

// 🔹 5. Division Assignment (/=)
// Equivalent to: a = a / value
a /= 6;                                   // a = 24 / 6
console.log("After a /= 6:", a);          // Output: 4

// 🔹 6. Remainder Assignment (%=)
// Equivalent to: a = a % value
a %= 3;                                   // a = 4 % 3
console.log("After a %= 3:", a);          // Output: 1

// Reset a for exponentiation example
a = 2;
console.log("Reset a to", a);             // Output: 2

// 🔹 7. Exponentiation Assignment (**=)
// Equivalent to: a = a ** value
a **= 3;                                  // a = 2 ** 3
console.log("After a **= 3:", a);         // Output: 8

// 🔹 8. Using Assignment Operators with Other Types
let s = "Hello";
console.log("Initial s:", s);             // Output: Hello

// String concatenation with +=
s += " World";                            // s = "Hello" + " World"
console.log("After s += ' World':", s);   // Output: Hello World

// Numeric string conversion and addition
let numStr = "10";
numStr += 5;                              // numStr = "10" + "5"
console.log("After numStr += 5:", numStr); // Output: "105"

// Converting back to number for arithmetic
let num = Number(numStr);
num -= 50;                                // num = 105 - 50
console.log("After converting and num -= 50:", num); // Output: 55

// 🔹 9. Chaining Assignment Operators
let x, y, z;
x = y = z = 7;                            // Assigns 7 to z, then z to y, then y to x
console.log("x, y, z after chaining:", x, y, z); // Output: 7 7 7

// 🔹 10. Combined Usage in Expressions
let p = 10;
let q = 2;

p += q * 3;  // q * 3 = 6, then p = p + 6 => p = 16
console.log("After p += q * 3:", p);        // Output: 16

q **= 2 + 1; // 2 + 1 = 3, then q = 2 ** 3 => q = 8
console.log("After q **= 2 + 1:", q);       // Output: 8

// 🔹 11. Best Practices
// - Use assignment operators to write concise, readable updates.
// - Be mindful of operator precedence: right side of operator is evaluated first.
// - Avoid chaining too many operations on one line to keep code clear.

// 🔚 Summary:
// =   assigns a value.
// +=  adds and assigns.
// -=  subtracts and assigns.
// *=  multiplies and assigns.
// /=  divides and assigns.
// %=  takes remainder and assigns.
// **= raises to power and assigns.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
13 - Comparison Operators (== vs ===, != vs !==, >, <, >=, <=)

This note explains comparison operators in JavaScript:
1. ==  (Loose equality)
2. === (Strict equality)
3. !=  (Loose inequality)
4. !== (Strict inequality)
5. >   (Greater than)
6. <   (Less than)
7. >=  (Greater than or equal to)
8. <=  (Less than or equal to)

Key differences:
- Loose equality (==) performs type coercion before comparing.
- Strict equality (===) compares both value and type without coercion.
*/

// 🔹 1. Loose Equality (==)
// - Converts operands to a common type, then compares values.
console.log("Loose Equality Examples:");
console.log(5 == "5");        // true  ("5" → 5)
console.log(0 == false);      // true  (false → 0)
console.log("" == 0);         // true  ("" → 0)
console.log(null == undefined);// true (both represent “no value”)
console.log(" \t\n" == 0);    // true  (whitespace → 0)

// Pitfall: Unexpected true due to coercion:
console.log([] == "");        // true  (empty array → "")
console.log([] == 0);         // true  (empty array → "" → 0)
console.log([1] == 1);        // true  ([1] → "1" → 1)

// 🔹 2. Strict Equality (===)
// - No type conversion. Both type and value must match.
console.log("\nStrict Equality Examples:");
console.log(5 === "5");       // false (different types)
console.log(0 === false);     // false (number vs boolean)
console.log(null === undefined);// false (different types)
console.log([1] === "1");     // false (array vs string)
console.log([1] === [1]);     // false (different object references)

// Use strict equality to avoid coercion pitfalls:
console.log(5 === 5);         // true
console.log("hello" === "hello"); // true

// 🔹 3. Loose Inequality (!=)
// - Similar to == but tests for “not equal” after coercion.
console.log("\nLoose Inequality Examples:");
console.log(5 != "5");        // false (coerced to equal)
console.log(5 != 6);          // true
console.log(null != undefined);// false (considered equal)
console.log([] != 0);         // false (empty array → "" → 0, so equal)

// 🔹 4. Strict Inequality (!==)
// - No conversion; tests for “not equal” by value or type.
console.log("\nStrict Inequality Examples:");
console.log(5 !== "5");       // true (different type)
console.log(5 !== 5);         // false (same type and value)
console.log(null !== undefined);// true (different types)
console.log([1] !== [1]);     // true (distinct objects)

// 🔹 5. Greater Than (>) and Less Than (<)
// - Compare values numerically or lexicographically for strings.
console.log("\nGreater Than / Less Than:");
console.log(10 > 5);          // true
console.log(5 < 10);          // true
console.log("b" > "a");       // true (lexicographic)
console.log("2" < "10");      // false (string comparison: "2" > "1")
console.log( "2" < 10 );      // true  ("2" → 2)

// 🔹 6. Greater Than or Equal (>=) and Less Than or Equal (<=)
console.log("\nGreater Than or Equal / Less Than or Equal:");
console.log(5 >= 5);          // true
console.log(5 <= 6);          // true
console.log("5" >= 5);        // true  ("5" → 5)
console.log("apple" <= "banana"); // true (lexicographic: "a" < "b")

// 🔹 7. Comparing Mixed Types
console.log("\nMixed-Type Comparisons:");
console.log(true == 1);       // true  (true → 1)
console.log(true === 1);      // false
console.log(false < 1);       // true  (false → 0)
console.log(" " == 0);        // true  (whitespace → 0)
console.log(" " === 0);       // false

// 🔹 8. Object and Array Comparisons
const objA = { a: 1 };
const objB = { a: 1 };
const objC = objA;

console.log("\nObject Comparisons:");
console.log(objA == objB);    // false (different references)
console.log(objA === objB);   // false
console.log(objA === objC);   // true  (same reference)

const arrA = [1, 2];
const arrB = [1, 2];
console.log(arrA == arrB);    // false (different array objects)
console.log(arrA === arrB);   // false

// 🔹 9. Edge Cases with NaN
// NaN is not equal to anything, including itself.
console.log("\nNaN Comparisons:");
console.log(NaN == NaN);      // false
console.log(NaN === NaN);     // false
console.log(isNaN(NaN));      // true (use isNaN or Number.isNaN to test)

// 🔹 10. Best Practices
/*
- Use === and !== over == and != to avoid unexpected coercion.
- For numeric comparisons, be mindful of string-to-number conversion.
- Compare objects and arrays by content using JSON.stringify or deep copy methods,
  or compare references if intentionally checking identity.
- To detect NaN, use Number.isNaN() instead of == or ===.
*/

// Example: Correct NaN check
const value = NaN;
if (Number.isNaN(value)) {
  console.log("Value is NaN and detected correctly.");
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
14 - Logical Operators (&&, ||, !)

This note explains:
1. Logical AND (&&)
2. Logical OR (||)
3. Logical NOT (!)

Logical operators work with boolean values but also perform short-circuit evaluation and type coercion when used with non-boolean operands.
*/

// 🔹 1. Logical AND (&&)
// - Returns the first falsy operand, or the last operand if all are truthy.
// - Short-circuits: stops evaluating as soon as it finds a falsy value.

console.log("Logical AND Examples:");
console.log(true && true);      // true   (both operands are true)
console.log(true && false);     // false  (second operand is false)
console.log(false && true);     // false  (first operand is false, stops evaluating)
console.log(false && false);    // false

// With non-boolean values:
console.log("1 && 2 =>", 1 && 2);           // 2       (1 is truthy, returns second operand)
console.log("0 && 'hello' =>", 0 && "hello"); // 0     (0 is falsy, returns first operand)
console.log("'foo' && '' =>", "foo" && "");   // ""    ("" is falsy, returns second operand)
console.log("null && 'bar' =>", null && "bar"); // null (null is falsy, returns first operand)

// Use case: Checking multiple conditions
const user = { name: "Ajay", age: 25, isAdmin: true };
if (user && user.isAdmin) {
  console.log("User is an admin."); // This prints
}
if (user && user.isGuest) {
  console.log("User is a guest.");  // Doesn’t print (user.isGuest is undefined → falsy)
}

// 🔹 2. Logical OR (||)
// - Returns the first truthy operand, or the last operand if all are falsy.
// - Short-circuits: stops evaluating as soon as it finds a truthy value.

console.log("\nLogical OR Examples:");
console.log(true || false);     // true   (first operand is true, stops evaluating)
console.log(false || true);     // true   (second operand is true)
console.log(false || false);    // false  (both are false)

// With non-boolean values:
console.log("'' || 'default' =>", "" || "default");   // "default" ("" is falsy, returns second)
console.log("'value' || 'default' =>", "value" || "default"); // "value" (first is truthy)
console.log("0 || null || 'fallback' =>", 0 || null || "fallback"); // "fallback"

// Use case: Providing default values
function greet(name) {
  // If name is falsy (undefined, empty string, etc.), default to "Guest"
  const displayName = name || "Guest";
  console.log("Hello, " + displayName);
}
greet("Riya"); // Hello, Riya
greet("");     // Hello, Guest
greet();       // Hello, Guest

// 🔹 3. Logical NOT (!)
// - Converts the operand to boolean and returns the opposite.
// - Useful for toggling or checking falsy/truthy values.

console.log("\nLogical NOT Examples:");
console.log("!true =>", !true);     // false
console.log("!false =>", !false);   // true
console.log("!0 =>", !0);           // true  (0 is falsy)
console.log("!\"Hello\" =>", !"Hello"); // false ("Hello" is truthy)
console.log("!null =>", !null);     // true  (null is falsy)
console.log("!undefined =>", !undefined); // true (undefined is falsy)
console.log("!NaN =>", !NaN);       // true  (NaN is falsy)

// Double NOT (!!) to convert any value to boolean
console.log("!!'text' =>", !!"text"); // true
console.log("!!0 =>", !!0);           // false

// 🔹 4. Combining Logical Operators
const age = 20;
const hasID = true;
if (age >= 18 && hasID) {
  console.log("Entry allowed.");      // This prints
} else {
  console.log("Entry denied.");
}

const isMember = false;
const isGuest = true;
if (isMember || isGuest) {
  console.log("Welcome!");            // This prints (isGuest true)
}

// 🔹 5. Short-Circuit Behavior Examples
function fetchUserData() {
  console.log("Fetching user data...");
  return { name: "Ajay" };
}

// Using && to conditionally call a function:
user.isAdmin && fetchUserData();  // "Fetching user data..." prints if user.isAdmin is truthy

// Using || to set a default:
const defaultUser = fetchUserData() || { name: "Guest" };
// In this example, fetchUserData() returns an object (truthy), so defaultUser is that object.

// 🔹 6. Best Practices
/*
- Use && when you want to run code only if all conditions are truthy.
- Use || to set default values or choose the first truthy operand.
- Use !! to convert values to explicit boolean.
- Be cautious when mixing different data types, as type coercion may lead to unexpected results.
*/

// 🔚 Summary:
// && returns first falsy or last truthy value.
// || returns first truthy or last falsy value.
// ! inverts the boolean equivalent of the operand.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
15 - Ternary Operator (condition ? expr1 : expr2)

This note explains:
1. Syntax and basic usage of the ternary (conditional) operator.
2. How it replaces simple if/else statements.
3. Examples demonstrating common patterns and best practices.
*/

// 🔹 1. Syntax
// condition ? expressionIfTrue : expressionIfFalse

// Example: Simple numeric comparison
const num = 7;
const result = num % 2 === 0 ? "Even" : "Odd";
console.log("7 is", result); // Output: 7 is Odd

// Equivalent if/else version for comparison
if (num % 2 === 0) {
  console.log("7 is Even");
} else {
  console.log("7 is Odd");
}

// 🔹 2. Nesting Ternary Operators
// You can nest ternaries, but readability can suffer.
// Use parentheses to clarify precedence.

const score = 85;
const grade = score >= 90
  ? "A"
  : score >= 80
  ? "B"
  : score >= 70
  ? "C"
  : score >= 60
  ? "D"
  : "F";

console.log("Score 85 gets grade:", grade); // Output: Score 85 gets grade: B

// Equivalent if/else chain for nesting
/*
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log("Score 85 gets grade:", grade);
*/

// 🔹 3. Using Ternary for Default Values
// Common pattern: assign a default if a variable is null/undefined

let username = "";
const displayName = username ? username : "Guest";
console.log("Display Name (with empty string):", displayName); // Output: Guest

username = "Ajay";
console.log(
  "Display Name (with non-empty):",
  username ? username : "Guest"
); // Output: Ajay

// 🔹 4. Ternary in Template Literals
const isAdmin = true;
console.log(
  `User status: ${isAdmin ? "Administrator privileges" : "Regular user"}`
); // Output: User status: Administrator privileges

// 🔹 5. Executing Different Functions
function sayHello() {
  console.log("Hello!");
}
function sayGoodbye() {
  console.log("Goodbye!");
}

const shouldGreet = false;
shouldGreet ? sayHello() : sayGoodbye(); // Output: Goodbye!

// 🔹 6. Returning Values from Ternary
function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}
console.log("Member fee:", getFee(true));  // Output: Member fee: $2.00
console.log("Guest fee:", getFee(false));  // Output: Guest fee: $10.00

// 🔹 7. Best Practices
// - Use ternaries for simple, concise conditions.
// - Avoid deeply nested ternaries; prefer if/else for complex logic.
// - Always include both true and false expressions to avoid undefined results.

// Example: Always include both branches
const age = 17;
const access = age >= 18 ? "Allowed" : "Denied";
console.log("Access:", access); // Output: Access: Denied

// 🔚 Summary:
// The ternary operator condition ? expr1 : expr2
// is a concise form of if/else when choosing between two expressions.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
16 - Operator Precedence and Associativity

This note explains:
1. What operator precedence is and how it determines evaluation order.
2. What associativity is and how it applies when operators share the same precedence level.
3. Examples illustrating key combinations and their results.
*/

// 🔹 1. What Is Operator Precedence?
// - Precedence determines the order in which parts of an expression are evaluated.
// - Higher-precedence operators are evaluated before lower-precedence ones.
// - For example, multiplication (*) has higher precedence than addition (+), so 2 + 3 * 4 is treated as 2 + (3 * 4).

// 🔹 2. What Is Associativity?
// - Associativity determines how operators of the same precedence are evaluated: left-to-right or right-to-left.
// - Most arithmetic operators ( +, -, *, /, % ) are left-associative: evaluated from left to right.
// - The exponentiation operator ( ** ) is right-associative: evaluated from right to left.

// 📋 3. Common Operator Precedence Table (high to low, simplified):
// 1. ( )                             // Parentheses
// 2. **                              // Exponentiation (right-associative)
// 3. *, /, %                         // Multiplication, Division, Modulus (left-associative)
// 4. +, -                            // Addition, Subtraction (left-associative)
// 5. <<, >>, >>>                     // Bitwise shifts (left-associative)
// 6. <, <=, >, >=, in, instanceof    // Relational (left-associative)
// 7. ==, !=, ===, !==                // Equality (left-associative)
// 8. &                               // Bitwise AND (left-associative)
// 9. ^                               // Bitwise XOR (left-associative)
// 10. |                              // Bitwise OR (left-associative)
// 11. &&                             // Logical AND (left-associative)
// 12. ||                             // Logical OR (left-associative)
// 13. ?:                             // Ternary conditional (right-associative)
// 14. =, +=, -=, *=, /=, %=, **=     // Assignment operators (right-associative)
// 15. ,                              // Comma operator (left-associative)

// 🔹 4. Parentheses Override Precedence
// Parentheses can be used to force a different evaluation order than default.
console.log("Parentheses override:");
console.log("Without parentheses: 2 + 3 * 4 =", 2 + 3 * 4);       // 14 (3*4 first)
console.log("With parentheses: (2 + 3) * 4 =", (2 + 3) * 4);     // 20 (2+3 first)

// 🔹 5. Exponentiation Is Right-Associative
// a ** b ** c is treated as a ** (b ** c), not (a ** b) ** c.
console.log("\nExponentiation associativity:");
console.log("2 ** 3 ** 2 =", 2 ** 3 ** 2);   // 512 (3**2=9, then 2**9=512)
console.log("(2 ** 3) ** 2 =", (2 ** 3) ** 2); // 64  (2**3=8, then 8**2=64)

// 🔹 6. Multiplication and Addition Precedence
// * has higher precedence than +, so evaluated first.
const expr1 = 5 + 10 * 2;
console.log("\nMultiplication before addition:");
console.log("5 + 10 * 2 =", expr1);        // 25 (10*2=20, then 5+20=25)

// 🔹 7. Left-Associative Example
// For left-associative operators, a - b - c is (a - b) - c.
const expr2 = 20 - 5 - 3;
console.log("\nLeft-associative subtraction:");
console.log("20 - 5 - 3 =", expr2);         // 12  (20-5=15, then 15-3=12)

// 🔹 8. Mixed Operators
// Combine *, +, and - to see precedence at work.
const expr3 = 2 + 3 * 4 - 6 / 2;
console.log("\nMixed operators:");
console.log("2 + 3 * 4 - 6 / 2 =", expr3);  // 2 + 12 - 3 = 11

// 🔹 9. Ternary Operator Precedence
// The ternary operator (?:) has lower precedence than most operators except assignment.
// Example: a ? b : c + d is equivalent to a ? b : (c + d).
const a = true;
const b = false;
const result1 = a ? "Yes" : "No" + " Maybe";
console.log("\nTernary precedence:");
console.log('true ? "Yes" : "No" + " Maybe" =', result1);  
// "Yes" (the part after : is not evaluated because a is true)
// If a were false: false ? "Yes" : "No" + " Maybe" => "No Maybe"

// 🔹 10. Assignment Operators Are Right-Associative
// a = b = c means a = (b = c).
let x, y, z;
x = y = z = 5;
console.log("\nRight-associative assignment:");
console.log("x, y, z all set to 5:", x, y, z); // 5 5 5

// 🔹 11. Comma Operator
// The comma operator evaluates multiple expressions and returns the last one.
const commaResult = ( (console.log("\nComma operator logs first:"), 1), (console.log("Then logs second:"), 2) );
console.log("Comma operator result:", commaResult); // 2

/*
Summary:
- Parentheses force evaluation order.
- Exponentiation (**) is right-associative.
- Multiplication, division, and modulus (*) / (%) are evaluated before addition and subtraction (+ / -).
- Operators with the same precedence and left-associative are evaluated left-to-right.
- Ternary (?:) is right-associative, so conditions are grouped accordingly.
- Assignment (=, +=, etc.) is right-associative.
- The comma operator evaluates all its operands and returns the last value.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
17 - if, else if, else statements

This note explains:
1. The syntax of if, else if, and else.
2. How conditions are evaluated.
3. Nested and multiple conditions.
*/

// 🔹 1. Basic if statement
// Executes the block only if the condition is truthy.
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
}
// Since 85 < 90, nothing is logged.

// 🔹 2. if...else statement
// Provides an alternative block when the condition is falsy.
score = 75;
if (score >= 90) {
  console.log("Grade: A");
} else {
  console.log("Grade: Not A");  // This logs because 75 < 90
}

// 🔹 3. if...else if...else chain
// Checks multiple conditions in sequence until one is truthy.
score = 65;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");        // This logs because 65 is between 60 and 70
} else {
  console.log("Grade: F");
}

// 🔹 4. Order of evaluation
// Only the first truthy block runs; subsequent blocks are skipped.
score = 92;
if (score >= 90) {
  console.log("Grade: A");        // This logs first
} else if (score >= 80) {
  console.log("Grade: B");        // Skipped
} else {
  console.log("Grade: C");
}

// 🔹 5. Nested if statements
// You can place an if inside another if block.
const age = 25;
const hasID = true;
if (age >= 18) {
  if (hasID) {
    console.log("Entry allowed.");
  } else {
    console.log("Entry denied: ID required.");
  }
} else {
  console.log("Entry denied: Must be at least 18.");
}

// 🔹 6. Using logical operators within conditions
// Combine && and || to form complex checks.
const isMember = false;
const isGuest = true;
if (isMember || isGuest) {
  console.log("Welcome access granted.");  // Logs because isGuest is true
} else {
  console.log("Access denied.");
}

// 🔹 7. Ternary equivalent for simple if...else
// For simple assignments or single expressions, you can use the ternary operator.
const userScore = 50;
const status = userScore >= 60 ? "Pass" : "Fail";
console.log("Status:", status);  // Output: Status: Fail

// 🔹 8. if statements with non-boolean values
// Conditions are coerced to boolean.
const value = "";
if (value) {
  console.log("Value is truthy");
} else {
  console.log("Value is falsy");  // Logs because "" is falsy
}

// 🔹 9. Best practices
/*
- Always include braces {} around code blocks, even for single statements, to avoid errors.
- Order if...else if...else from most specific to most general condition.
- Avoid deeply nested ifs—consider refactoring into separate functions or using switch for many branches.
- Use clear and meaningful condition expressions.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
18 - switch Statement and Fall-Through

This note explains:
1. The syntax of the switch statement.
2. How case matching works.
3. The role of the default case.
4. Fall-through behavior when break is omitted.
5. Best practices to avoid unintended fall-through.
*/

// 🔹 1. Basic switch Syntax
// The switch keyword evaluates an expression once, then matches it against multiple case labels.
// When a matching case is found, execution starts at that case and continues until a break or the end of the switch.

const fruit = "apple";

switch (fruit) {
  case "banana":
    console.log("Yellow fruit");
    break;
  case "apple":
    console.log("Red or green fruit"); // This logs because fruit === "apple"
    break;
  case "orange":
    console.log("Orange fruit");
    break;
  default:
    console.log("Unknown fruit");
    break;
}

// 🔹 2. The default Case
// If no case matches, execution jumps to the default label (if provided).

const color = "purple";

switch (color) {
  case "red":
    console.log("Color is red");
    break;
  case "blue":
    console.log("Color is blue");
    break;
  default:
    console.log("Color not recognized"); // This logs because neither "red" nor "blue" matches
    break;
}

// 🔹 3. Multiple Cases with the Same Block
// You can stack case labels without break to allow multiple values to execute the same block.

const day = "Saturday";

switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend"); // Logs for both "Saturday" and "Sunday"
    break;
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;
  default:
    console.log("Invalid day");
    break;
}

// 🔹 4. Fall-Through Behavior (Omitting break)
// If you omit a break, execution “falls through” to the next case. Use with caution.

const score = 75;

switch (true) {
  case score >= 90:
    console.log("Grade A");
    // no break, but since this case isn’t true for 75, code skips to next
    break;
  case score >= 70:
    console.log("Grade B");          // Logs "Grade B"
    // fall-through to next case because no break
  case score >= 50:
    console.log("Passed");           // Logs "Passed" (fall-through behavior)
    break;
  default:
    console.log("Failed");
    break;
}

// 🔹 5. Intentional Fall-Through
// When fall-through is desired, add a comment to document intent.

const statusCode = 302;

switch (statusCode) {
  case 301:
    console.log("Moved Permanently");
    break;
  case 302:
    console.log("Found");
    // fall through
  case 303:
  case 307:
    console.log("Redirect");
    break;
  default:
    console.log("Other status");
    break;
}

// 🔹 6. switch with Complex Expressions
// The switch expression can be any valid expression; that value is compared strictly (===) against each case.

const value = 15;

switch (value % 5) {
  case 0:
    console.log("Divisible by 5");  // Logs because 15 % 5 === 0
    break;
  case 1:
    console.log("Remainder 1");
    break;
  default:
    console.log("Other remainder");
    break;
}

// 🔹 7. No switch Expression (using true) for Range Checks
// By switching on true, each case can be a boolean expression. First true case executes.

const age = 20;

switch (true) {
  case age < 13:
    console.log("Child");
    break;
  case age < 20:
    console.log("Teenager");
    break;
  case age < 65:
    console.log("Adult");           // Logs because age < 65 is true
    break;
  default:
    console.log("Senior");
    break;
}

// 🔹 8. Best Practices
/*
- Always include a break in each case unless you intentionally want fall-through.
- Use the default case to handle unexpected values.
- Use switch(true) sparingly for range checks; if/else may be clearer.
- Document intentional fall-through with comments to avoid confusion.
- Avoid very large switch blocks; consider mapping values to functions/handlers if many cases exist.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
19 - for loops (for, for…of, for…in)

This note explains:
1. Traditional for loop
2. for…of loop (iterating over iterable values)
3. for…in loop (iterating over object keys)
*/

// 🔹 1. Traditional for Loop
// - Syntax: for (initialization; condition; increment) { /* code */ }
// - Commonly used when you need index access.

const numbers = [10, 20, 30, 40, 50];
console.log("Traditional for loop:");
for (let i = 0; i < numbers.length; i++) {
  console.log(`Index ${i}, Value ${numbers[i]}`);
}
// Output:
// Index 0, Value 10
// Index 1, Value 20
// Index 2, Value 30
// Index 3, Value 40
// Index 4, Value 50

// Use case: Stop early if a condition is met
console.log("\nBreak out of a for loop when value > 30:");
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 30) {
    console.log(`Stopping at value ${numbers[i]}`);
    break;
  }
  console.log(`Checked ${numbers[i]}`);
}
// Output:
// Checked 10
// Checked 20
// Checked 30
// Stopping at value 40

// 🔹 2. for…of Loop
// - Syntax: for (variable of iterable) { /* code */ }
// - Iterates over iterable values (arrays, strings, Map, Set, etc.).
// - Does NOT provide index natively, only values.

console.log("\nfor…of loop over an array:");
for (const value of numbers) {
  console.log("Value:", value);
}
// Output:
// Value: 10
// Value: 20
// Value: 30
// Value: 40
// Value: 50

// for…of over a string
const greeting = "Hello";
console.log("\nfor…of loop over a string:");
for (const char of greeting) {
  console.log("Character:", char);
}
// Output:
// Character: H
// Character: e
// Character: l
// Character: l
// Character: o

// Use case: Iterate over a Set
const uniqueSet = new Set([1, 2, 3]);
console.log("\nfor…of loop over a Set:");
for (const num of uniqueSet) {
  console.log("Set value:", num);
}
// Output:
// Set value: 1
// Set value: 2
// Set value: 3

// 🔹 3. for…in Loop
// - Syntax: for (variable in object) { /* code */ }
// - Iterates over enumerable property keys (object’s own and inherited).
// - Not recommended for arrays (indexes are strings and order is not guaranteed).

const person = {
  name: "Ajay",
  age: 25,
  city: "Mumbai"
};
console.log("\nfor…in loop over an object:");
for (const key in person) {
  console.log(`Key: ${key}, Value: ${person[key]}`);
}
// Output:
// Key: name, Value: Ajay
// Key: age, Value: 25
// Key: city, Value: Mumbai

// Inherited properties example
const proto = { country: "India" };
const citizen = Object.create(proto);
citizen.name = "Riya";
citizen.age = 30;
console.log("\nfor…in loop (includes inherited keys):");
for (const prop in citizen) {
  console.log(`Property: ${prop}, Value: ${citizen[prop]}`);
}
// Output:
// Property: name, Value: Riya
// Property: age, Value: 30
// Property: country, Value: India

// 🔹 4. Differences and Best Practices
/*
- Traditional for: Use when you need index or need to modify the index.
- for…of: Use for arrays, strings, Sets, Maps when you only need values.
- for…in: Use only for objects to iterate over keys. Avoid for…in on arrays.
- to iterate array indexes with for…of: use array.entries():
     for (const [index, value] of numbers.entries()) { ... }
*/

console.log("\nfor…of with entries() to get index and value:");
for (const [index, value] of numbers.entries()) {
  console.log(`Index ${index}, Value ${value}`);
}
// Output:
// Index 0, Value 10
// Index 1, Value 20
// Index 2, Value 30
// Index 3, Value 40
// Index 4, Value 50

// 🔹 5. Nested Loops Example
// Use nested loops for multidimensional arrays or grouping logic.

const matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];
console.log("\nNested for loops over a 2D array:");
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`);
  }
}
// Output:
// matrix[0][0] = 1
// matrix[0][1] = 2
// matrix[1][0] = 3
// matrix[1][1] = 4
// matrix[2][0] = 5
// matrix[2][1] = 6


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
20 - while and do…while loops

This note explains:
1. The while loop: syntax, behavior, and use cases.
2. The do…while loop: syntax, behavior, and differences from while.
3. Examples demonstrating loop control, break, and continue.
*/

// 🔹 1. while Loop
// - Syntax: while (condition) { /* code to execute */ }
// - The condition is evaluated before each iteration.
// - If the condition is true, the loop body runs; if false, the loop ends.
// - Use when the number of iterations is not known in advance (based on a condition).

console.log("while Loop Example:");
let count = 0;
while (count < 3) {
  console.log("Count is:", count);
  count++;
}
// Output:
// Count is: 0
// Count is: 1
// Count is: 2

// 🔹 1a. Breaking Out of a while Loop
console.log("\nwhile Loop with break:");
let i = 0;
while (i < 5) {
  if (i === 2) {
    console.log("Breaking at i =", i);
    break; // Exit the loop immediately
  }
  console.log("i =", i);
  i++;
}
// Output:
// i = 0
// i = 1
// Breaking at i = 2

// 🔹 1b. Continuing to Next Iteration
console.log("\nwhile Loop with continue:");
let j = 0;
while (j < 5) {
  j++;
  if (j % 2 === 0) {
    continue; // Skip the rest of this iteration
  }
  console.log("Odd j =", j);
}
// Output:
// Odd j = 1
// Odd j = 3
// Odd j = 5

// 🔹 2. do…while Loop
// - Syntax: do { /* code to execute */ } while (condition);
// - The loop body runs once before checking the condition.
// - If the condition is true, it repeats; if false, it stops.
// - Use when you want the loop body to execute at least once.

console.log("\ndo…while Loop Example:");
let k = 0;
do {
  console.log("k is:", k);
  k++;
} while (k < 3);
// Output:
// k is: 0
// k is: 1
// k is: 2

// 🔹 2a. do…while When Condition Is Initially False
console.log("\ndo…while when condition is false initially:");
let x = 5;
do {
  console.log("This runs once, x =", x);
  x++;
} while (x < 5);
// Output:
// This runs once, x = 5

// 🔹 2b. Breaking Out of a do…while Loop
console.log("\ndo…while Loop with break:");
let m = 0;
do {
  if (m === 1) {
    console.log("Breaking at m =", m);
    break;
  }
  console.log("m =", m);
  m++;
} while (m < 3);
// Output:
// m = 0
// Breaking at m = 1

// 🔹 2c. Continuing to Next Iteration in do…while
console.log("\ndo…while Loop with continue:");
let n = 0;
do {
  n++;
  if (n % 2 === 0) {
    continue;
  }
  console.log("Odd n =", n);
} while (n < 5);
// Output:
// Odd n = 1
// Odd n = 3
// Odd n = 5

// 🔹 3. Key Differences Between while and do…while
// - while evaluates the condition first; may never run if condition is false.
// - do…while runs the loop body once before checking; always runs at least once.
// - Choose while when you need zero-or-more iterations; choose do…while for one-or-more.

// 🔹 4. Common Use Cases
// - Reading user input until a valid response (while).
// - Menu-driven programs where you show the menu once and then repeat (do…while).
// - Polling for a condition that should be checked after an initial action.

// 🔹 5. Best Practices
// - Ensure the loop condition will eventually become false to avoid infinite loops.
// - Use break and continue judiciously to improve readability.
// - Keep loop bodies short; extract complex logic into functions.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
21 - break, continue, labeled statements

This note explains:
1. The break statement: exits loops or switch statements immediately.
2. The continue statement: skips the current loop iteration and moves to the next.
3. Labeled statements: attach labels to loops or blocks for use with break/continue.

All theory appears as comments; code examples below demonstrate behavior.
*/

// 🔹 1. break Statement
// - Exits the nearest enclosing loop or switch statement immediately.
// - Control moves to the statement following the loop/switch.

console.log("break in a for loop:");
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    console.log("Breaking at i =", i);
    break; // Exit the loop when i equals 2
  }
  console.log("i =", i);
}
// Output:
// i = 0
// i = 1
// Breaking at i = 2

// break in a while loop
console.log("\nbreak in a while loop:");
let count = 0;
while (count < 5) {
  if (count === 3) {
    console.log("Breaking at count =", count);
    break; // Exit the loop when count equals 3
  }
  console.log("count =", count);
  count++;
}
// Output:
// count = 0
// count = 1
// count = 2
// Breaking at count = 3

// 🔹 2. continue Statement
// - Skips the rest of the current iteration and moves to the next iteration of the loop.
// - Only affects the loop in which it appears.

console.log("\ncontinue to skip odd numbers:");
for (let i = 0; i < 5; i++) {
  if (i % 2 !== 0) {
    continue; // Skip odd values of i
  }
  console.log("Even i =", i);
}
// Output:
// Even i = 0
// Even i = 2
// Even i = 4

// continue in a do…while loop
console.log("\ncontinue in a do…while loop:");
let n = 0;
do {
  n++;
  if (n % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log("Odd n =", n);
} while (n < 5);
// Output:
// Odd n = 1
// Odd n = 3
// Odd n = 5

// 🔹 3. Labeled Statements
// - Labels provide a way to refer to a loop or block by name.
// - Use label with break or continue to control outer loops from within inner loops.

// Basic labeled break example
console.log("\nlabeled break in nested loops:");
outerLoop: // Label for the outer loop
for (let i = 0; i < 3; i++) {
  innerLoop: // Label for the inner loop
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log(`Breaking out of outerLoop at i=${i}, j=${j}`);
      break outerLoop; // Exit the outerLoop, skipping remaining iterations
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// Output:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// Breaking out of outerLoop at i=1, j=1

// Labeled continue example: skip to next iteration of outer loop
console.log("\nlabeled continue to skip inner loops:");
outer: // Label for the outer loop
for (let a = 0; a < 3; a++) {
  for (let b = 0; b < 3; b++) {
    if (b === 1) {
      console.log(`Continuing outer when a=${a}, b=${b}`);
      continue outer; // Move to next iteration of outer loop
    }
    console.log(`a=${a}, b=${b}`);
  }
}
// Output:
// a=0, b=0
// Continuing outer when a=0, b=1
// a=1, b=0
// Continuing outer when a=1, b=1
// a=2, b=0
// Continuing outer when a=2, b=1

// 🔹 4. break/continue inside switch
// - break in switch exits the switch block.
// - continue inside switch (within loop) continues the loop, not the switch.

console.log("\nswitch with break:");
const value = 2;
switch (value) {
  case 1:
    console.log("Case 1");
    break; // Exit switch
  case 2:
    console.log("Case 2");
    break; // Exit switch
  default:
    console.log("Default case");
    break;
}
// Output:
// Case 2

console.log("\ncontinue inside a loop with switch:");
for (let x = 1; x <= 3; x++) {
  switch (x) {
    case 2:
      console.log("Skipping x =", x);
      continue; // Skip to next iteration of the for loop
    default:
      console.log("x is", x);
  }
}
// Output:
// x is 1
// Skipping x = 2
// x is 3

// 🔹 5. Best Practices
/*
- Use break to exit loops when a condition is met early to improve performance.
- Use continue to skip unnecessary work in a loop iteration.
- Use labeled statements sparingly; often refactoring nested loops into functions is clearer.
- Always include descriptive label names to document intent.
- Avoid fall-through in switch by including break after each case unless intentionally desired.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
22 - Function Declaration vs Function Expression

This note explains:
1. Function Declaration: hoisted, named, defined with the `function` keyword at top level of a scope.
2. Function Expression: created when the execution reaches that line, can be anonymous or named, stored in a variable.
3. Differences in hoisting, naming, and when they become available.
*/

// 🔹 1. Function Declaration
// - Hoisted: available before its appearance in code.
// - Always has a name.
// - Cannot be assigned to a variable (though its reference can).

console.log(declared(3, 4)); // Works because declaration is hoisted: Output 7

function declared(a, b) {
  return a + b;
}

// 🔹 2. Function Expression (Anonymous)
// - Not hoisted in the same way: variable is hoisted, but initialized to undefined until assignment.
// - Available only after the line is executed.

try {
  console.log(expr(5, 2)); // Error: expr is not a function
} catch (e) {
  console.log("Error calling expr before definition:", e.message);
}

const expr = function(a, b) {
  return a * b;
};

console.log(expr(5, 2)); // Output 10

// 🔹 3. Function Expression (Named)
// - Similar to anonymous, but has its own internal name for recursion or debugging.
// - The variable still holds the function after assignment.

const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

console.log(factorial(5)); // Output 120

// 🔹 4. Arrow Function Expression
// - A type of function expression with lexical `this`, no own `arguments`, cannot be used as constructors.

const arrowSum = (x, y) => x + y;
console.log(arrowSum(10, 15)); // Output 25

// 🔹 5. Hoisting Comparison
// Declaration hoisted:
console.log(typeof declared); // "function"
// Expression variable hoisted but not initialized:
console.log(typeof exprVar);   // "undefined"
const exprVar = function() {};

// 🔹 6. Using as Callbacks
// Both declarations and expressions can be passed as callbacks:

function applyOperation(a, b, operation) {
  console.log("Result:", operation(a, b));
}

applyOperation(8, 2, declared);    // Uses declaration: Output 10
applyOperation(8, 2, function(a, b) { return a / b; }); // Anonymous expression: Output 4

// 🔹 7. Immediately Invoked Function Expression (IIFE)
// Uses function expression syntax to run code immediately.

(function() {
  console.log("IIFE ran immediately");
})();

// 🔹 8. Best Practices
/*
- Use function declarations for named, reusable functions where hoisting is acceptable.
- Use function expressions (or arrow functions) for callbacks, one-off functions, or to control scope.
- Name function expressions when recursion or clearer stack traces are needed.
- Avoid relying on hoisting in large codebases; declare functions before use for readability.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
23 - Arrow Functions: Syntax & this-Binding Differences

This note explains:
1. Arrow function syntax (concise vs block bodies).
2. Implicit return for single-expression bodies.
3. Lexical this binding (no own this).
4. No arguments object; cannot be used as constructors.
5. Examples comparing arrow vs regular functions.
*/

// 🔹 1. Basic Arrow Function Syntax

// Single parameter, implicit return:
const square = n => n * n;
console.log("square(5):", square(5)); // 25

// Multiple parameters, implicit return:
const add = (a, b) => a + b;
console.log("add(3,4):", add(3, 4)); // 7

// No parameters:
const getRandom = () => Math.random();
console.log("getRandom():", getRandom()); // e.g. 0.123456

// Block body with explicit return:
const factorial = n => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log("factorial(4):", factorial(4)); // 24

// 🔹 2. Implicit vs Explicit Return
const greetImplicit = name => `Hello, ${name}!`;
console.log(greetImplicit("Ajay")); // Hello, Ajay!

const greetBlock = name => {
  const msg = `Hello, ${name}!`;
  return msg;
};
console.log(greetBlock("Riya")); // Hello, Riya!

// 🔹 3. Lexical this Binding

const obj = {
  value: 10,
  regularMethod: function() {
    console.log("regularMethod this.value:", this.value);
  },
  arrowMethod: () => {
    console.log("arrowMethod this.value:", this.value);
  },
  delayedRegular: function() {
    setTimeout(function() {
      console.log("delayedRegular this.value:", this.value);
    }, 0);
  },
  delayedArrow: function() {
    setTimeout(() => {
      console.log("delayedArrow this.value:", this.value);
    }, 0);
  }
};

obj.regularMethod();    // 10 (this → obj)
obj.arrowMethod();      // undefined (this → global or undefined)
obj.delayedRegular();   // undefined in strict mode (this → global/undefined)
obj.delayedArrow();     // 10 (lexical this from delayedArrow)

// 🔹 4. No arguments Object

function showArgs() {
  console.log("regular showArgs arguments:", arguments);
}
showArgs(1, 2, 3); // [1, 2, 3]

const arrowShowArgs = () => {
  try {
    console.log(arguments);
  } catch (e) {
    console.log("arrowShowArgs arguments error:", e.message);
  }
};
arrowShowArgs(4, 5, 6); // ReferenceError: arguments is not defined

// 🔹 5. Cannot be Used as Constructors

function RegularPerson(name) {
  this.name = name;
}
const p1 = new RegularPerson("Ajay");
console.log("RegularPerson name:", p1.name); // Ajay

const ArrowPerson = name => {
  this.name = name;
};
// const p2 = new ArrowPerson("Riya"); // TypeError: ArrowPerson is not a constructor

// 🔹 6. Use Cases for Arrow Functions
// - Short callbacks:
const nums = [1, 2, 3];
const doubled = nums.map(x => x * 2);
console.log("doubled array:", doubled); // [2, 4, 6]

// - Preserving this in methods that use nested callbacks:
class Counter {
  constructor() {
    this.count = 0;
  }
  incrementAsync() {
    setTimeout(() => {
      this.count++;
      console.log("Counter after async:", this.count);
    }, 0);
  }
}
const c = new Counter();
c.incrementAsync(); // Counter after async: 1

// 🔹 7. Best Practices
/*
- Use arrow functions for short, non-method callbacks.
- Avoid arrow methods when you need dynamic this (e.g., object methods or constructors).
- Prefer concise syntax for simple returns; use block body when multiple statements or clarity is needed.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
24 - Parameters and Arguments (default parameters, rest operator)

This note explains:
1. Default parameters: assign default values to function parameters.
2. Rest operator: gather remaining arguments into an array.
*/

// 🔹 Default Parameters
// You can assign defaults to parameters when declaring the function.
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greet();                     // Hello, Guest!
greet("Ajay");               // Hello, Ajay!
greet("Riya", "Hi");         // Hi, Riya!

// 🔹 Rest Operator
// Use ... before the last parameter to collect all remaining arguments into an array.
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum());           // 0

// 🔹 Combining Default & Rest
function buildName(firstName, lastName = "Doe", ...titles) {
  console.log("Name:", `${firstName} ${lastName}`);
  console.log("Titles:", titles);
}

buildName("John");                                       
// Name: John Doe
// Titles: []

buildName("John", "Smith", "PhD", "Esq");                
// Name: John Smith
// Titles: ["PhD", "Esq"]

// 🔹 arguments Object vs Rest
// The special 'arguments' object contains all passed args but is not a real array.
function showArgs(a, b, ...rest) {
  console.log("a:", a);
  console.log("b:", b);
  console.log("rest (Array):", rest);
  console.log("arguments (Array-like):", arguments);
}

showArgs(1, 2, 3, 4, 5);
// a: 1
// b: 2
// rest (Array): [3, 4, 5]
// arguments (Array-like): [1, 2, 3, 4, 5]

// 🔹 Best Practices
// - Place parameters with defaults after required ones.
// - Use rest only once as the last parameter to avoid ambiguity.
// - Prefer rest over arguments for better array methods support.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
25 - Return Values

This note explains:
1. How functions return values with the return keyword.
2. The default return value undefined when no return is used.
3. Early returns to exit a function.
4. Returning expressions, objects, and arrow-function implicit returns.
5. Common pitfalls and best practices.
*/

// 🔹 1. Basic return
function add(a, b) {
  return a + b;            // Returns the sum to the caller
}
const sum = add(3, 4);
console.log("add(3,4) returns:", sum); // 7

// 🔹 2. Default return undefined
function noReturn() {
  const x = 10 + 5;        // No return statement
}
const result = noReturn();
console.log("noReturn() returns:", result); // undefined

// 🔹 3. Early return
function checkEven(num) {
  if (num % 2 !== 0) {
    return false;          // Exit immediately if odd
  }
  // Only reached if num is even
  return true;
}
console.log("checkEven(3):", checkEven(3)); // false
console.log("checkEven(8):", checkEven(8)); // true

// 🔹 4. Returning objects
function createUser(name, age) {
  return { name, age };    // Shorthand for { name: name, age: age }
}
const user = createUser("Ajay", 25);
console.log("createUser returns:", user); // { name: "Ajay", age: 25 }

// 🔹 5. Arrow function implicit return
const square = n => n * n; // No braces → implicit return
console.log("square(5):", square(5)); // 25

// 🔹 6. Returning object literal in arrow function
// Wrap the object in parentheses to distinguish from block body.
const makePoint = (x, y) => ({ x, y });
console.log("makePoint(2,3):", makePoint(2, 3)); // { x: 2, y: 3 }

// 🔹 7. Returning from loops
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;            // Returns index on first match
    }
  }
  return -1;                // Returned if loop completes without match
}
console.log("findIndex:", findIndex([10,20,30], 20)); // 1
console.log("findIndex:", findIndex([10,20,30], 40)); // -1

// 🔹 8. Pitfall: unreachable code after return
function example() {
  return "done";
  console.log("This line never runs");
}

// 🔹 9. Best practices
/*
- Always use return to send data from a function.
- Use early returns to simplify nested conditions.
- Ensure arrow functions with braces include an explicit return.
- Wrap object literals in parentheses when using implicit return.
*/



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
26 - First-class Functions and Callbacks

This note explains:
1. First-class functions: treating functions as values (assign, pass, return).
2. Higher-order functions: functions that take or return functions.
3. Callbacks: passing a function to be invoked later.
4. Error-first callback pattern (Node.js style).
5. Common use cases and best practices.
*/

// 🔹 1. First-class Functions
// Functions in JavaScript can be:
// - Assigned to variables
// - Passed as arguments to other functions
// - Returned from functions
// - Stored in data structures

// Assigning a function to a variable
const sayHello = function(name) {
  console.log("Hello, " + name);
};
sayHello("Ajay"); // Hello, Ajay

// Arrow function assigned to a variable
const square = x => x * x;
console.log("square(4):", square(4)); // 16

// 🔹 2. Higher-order Functions
// A function that takes one or more functions as arguments, or returns a function

// Returning a function (function factory)
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}
const infoLogger = createLogger("INFO");
infoLogger("This is an informational message."); // [INFO] This is an informational message.

// 🔹 3. Callbacks
// Passing a function to be called (back) inside another function

// Example: simple callback
function greetUser(name, callback) {
  console.log("Preparing to greet...");
  callback(name);
  console.log("Greeted user.");
}
greetUser("Riya", name => {
  console.log("Hello, " + name + "!");
});
// Output:
// Preparing to greet...
// Hello, Riya!
// Greeted user.

// Array method using callbacks
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled); // [2, 4, 6]

// 🔹 4. Asynchronous Callback Example
console.log("Start timer");
setTimeout(() => {
  console.log("Timeout callback executed after 1 second");
}, 1000);
console.log("End timer");

// 🔹 5. Error-First Callback Pattern (Node.js style)
// callback signature: function(err, result)

function fetchData(id, callback) {
  setTimeout(() => {
    if (typeof id !== "number") {
      return callback(new Error("ID must be a number"));
    }
    const data = { id, name: "User" + id };
    callback(null, data);
  }, 500);
}

fetchData(1, (err, data) => {
  if (err) {
    console.error("Error fetching data:", err.message);
  } else {
    console.log("Fetched data:", data);
  }
});

fetchData("a", (err, data) => {
  if (err) {
    console.error("Error fetching data:", err.message); // ID must be a number
  }
});

// 🔹 6. Best Practices
/*
- Keep callbacks simple and avoid deeply nested callbacks (“callback hell”).
- Use named functions for clarity when callbacks contain multiple lines.
- For asynchronous code, consider Promises or async/await for readability.
- In Node.js-style APIs, always check the first (error) argument before processing results.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
27 - Higher-order Functions
- A higher-order function (HOF) is a function that:
  1. Takes one or more functions as arguments, or
  2. Returns a function as its result.
- HOFs enable function composition, abstraction, and reuse.
*/

// 🔹 1. Taking Functions as Arguments (Callbacks)

function operate(a, b, operation) {
  // 'operation' is a function passed in
  return operation(a, b);
}

function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}

console.log( operate(5, 3, add) );       // 8
console.log( operate(5, 3, multiply) );  // 15

// 🔹 2. Returning Functions (Function Factories)

function makePower(exponent) {
  // Returns a new function that raises its input to 'exponent'
  return function(base) {
    return base ** exponent;
  };
}

const square = makePower(2);
const cube   = makePower(3);

console.log( square(4) ); // 16
console.log( cube( 3) );  // 27

// 🔹 3. Combining Both: Currying

function curryMultiply(a) {
  // Returns a function that multiplies 'a' by its argument
  return function(b) {
    return a * b;
  };
}

const double = curryMultiply(2);
const triple = curryMultiply(3);

console.log( double(7) );  // 14
console.log( triple(7) );  // 21

// 🔹 4. Using Built-in HOFs: map, filter, reduce

const nums = [1, 2, 3, 4, 5];

// map: takes a function, returns a new array
const doubled = nums.map(n => n * 2);
console.log("doubled:", doubled); // [2, 4, 6, 8, 10]

// filter: takes a predicate, returns elements that pass
const evens = nums.filter(n => n % 2 === 0);
console.log("evens:", evens);     // [2, 4]

// reduce: takes an accumulator function
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log("sum:", sum);         // 15

// 🔹 5. Practical Example: Event Handler HOF

function on(eventType, element, handler) {
  // Simplified event listener wrapper
  element.addEventListener(eventType, handler);
}

// Usage:
// on('click', document.getElementById('btn'), () => console.log('Clicked!'));

// 🔹 6. Best Practices
// - Pass only the behavior you need (single-responsibility).
// - Return named functions when recursion or strong debugging is required.
// - Leverage built-in HOFs (map, filter, reduce) instead of manual loops.

// Example: Reusable timer HOF
function withDelay(fn, ms) {
  return function(...args) {
    setTimeout(() => fn(...args), ms);
  };
}

const delayedLog = withDelay(msg => console.log("Delayed:", msg), 1000);
delayedLog("Hello after 1s"); // Logs after 1 second


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
28 - Immediately Invoked Function Expressions (IIFE)

This note explains:
1. What an IIFE is and why it's used.
2. Syntax variations.
3. Use cases for scoping and initialization.
*/

// 🔹 1. Basic IIFE Syntax
// Wrapping a function in parentheses and invoking it immediately:
(function() {
  const message = "Hello from IIFE!";
  console.log(message);
})(); // Output: Hello from IIFE!

// 🔹 2. IIFE with Parameters
// You can pass arguments to an IIFE just like any function.
(function(name) {
  console.log(`Welcome, ${name}!`);
})("Ajay"); // Output: Welcome, Ajay!

// 🔹 3. Arrow Function IIFE
// Using an arrow function inside parentheses and invoking:
(() => {
  console.log("Arrow IIFE running");
})(); // Output: Arrow IIFE running

// 🔹 4. IIFE Returning a Value
// You can return data from an IIFE and assign it.
const initialData = (function() {
  const secret = 42;
  return { secret, timestamp: Date.now() };
})();
console.log("initialData:", initialData);
// Output: { secret: 42, timestamp: 163... }

// 🔹 5. Namespaced IIFE
// Create a private namespace to avoid polluting global scope.
const MyApp = {};
(function(ns) {
  ns.version = "1.0.0";
  ns.sayHello = function() {
    console.log(`MyApp v${ns.version} says hi!`);
  };
})(MyApp);

MyApp.sayHello(); // Output: MyApp v1.0.0 says hi!

// 🔹 6. Use Cases for IIFE
// - Encapsulate variables to avoid global leaks
// - Initialize modules or configuration at load time
// - Provide private scope for one-off setup logic

// 🔹 7. Best Practices
/*
- Always wrap your IIFE in parentheses to ensure correct parsing.
- Use parameters to inject dependencies (e.g., window, document) for better testability.
- Prefer block scoping with modules (ESM) in modern code, but IIFE remains useful in legacy environments.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
29 - Function Scope vs Block Scope

This note explains:
1. Function Scope (var, function declarations)
2. Block Scope (let, const)
3. How variables behave differently in functions vs blocks
4. Common pitfalls and best practices
*/

// 🔹 1. Function Scope with var
// - Variables declared with var are scoped to the nearest function, not to blocks.
function functionScopeExample() {
  if (true) {
    var x = 10;
    console.log("Inside if block, x =", x); // 10
  }
  console.log("Inside function, x still =", x); // 10 (x is function-scoped)
}
functionScopeExample();

try {
  console.log(x); // ReferenceError: x is not defined (x is not global)
} catch (e) {
  console.log("Outside function, x error:", e.message);
}

// 🔹 2. Block Scope with let and const
// - Variables declared with let or const are scoped to the nearest enclosing block.
function blockScopeExample() {
  if (true) {
    let y = 20;
    const z = 30;
    console.log("Inside if block, y =", y); // 20
    console.log("Inside if block, z =", z); // 30
  }
  try {
    console.log(y); // ReferenceError
  } catch (e) {
    console.log("Outside if block, y error:", e.message);
  }
  try {
    console.log(z); // ReferenceError
  } catch (e) {
    console.log("Outside if block, z error:", e.message);
  }
}
blockScopeExample();

// 🔹 3. var in loops vs let/const
// var is function-scoped, so it does not create a new binding per iteration.
for (var i = 0; i < 3; i++) {
  // ...
}
console.log("After for(var), i =", i); // 3 (i leaked out of loop)

for (let j = 0; j < 3; j++) {
  // ...
}
try {
  console.log("After for(let), j =", j);
} catch (e) {
  console.log("After for(let), j error:", e.message); // ReferenceError
}

// 🔹 4. Function-scoped vs block-scoped closures
const funcs = [];
for (var k = 0; k < 3; k++) {
  funcs.push(function() {
    console.log("var k in closure:", k);
  });
}
funcs.forEach(fn => fn()); 
// Prints 3, 3, 3 (all share same function-scoped k)

const funcs2 = [];
for (let m = 0; m < 3; m++) {
  funcs2.push(function() {
    console.log("let m in closure:", m);
  });
}
funcs2.forEach(fn => fn()); 
// Prints 0, 1, 2 (each block iteration has its own m)

// 🔹 5. IIFE to emulate block scope for var (legacy)
// Before let/const, an IIFE created a new function scope per iteration.
const legacy = [];
for (var n = 0; n < 3; n++) {
  (function(nCopy) {
    legacy.push(function() {
      console.log("IIFE nCopy:", nCopy);
    });
  })(n);
}
legacy.forEach(fn => fn()); 
// Prints 0, 1, 2

// 🔹 6. Best Practices
/*
- Prefer let and const for predictable block scoping.
- Avoid var to prevent accidental leaks outside blocks.
- Use const for variables that shouldn’t be reassigned.
- Use let for variables that will be reassigned.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
29 - Function Scope vs Block Scope

This note explains:
1. Function Scope (var, function declarations)
2. Block Scope (let, const)
3. How variables behave differently in functions vs blocks
4. Common pitfalls and best practices
*/

// 🔹 1. Function Scope with var
// - Variables declared with var are scoped to the nearest function, not to blocks.
function functionScopeExample() {
  if (true) {
    var x = 10;
    console.log("Inside if block, x =", x); // 10
  }
  console.log("Inside function, x still =", x); // 10 (x is function-scoped)
}
functionScopeExample();

try {
  console.log(x); // ReferenceError: x is not defined (x is not global)
} catch (e) {
  console.log("Outside function, x error:", e.message);
}

// 🔹 2. Block Scope with let and const
// - Variables declared with let or const are scoped to the nearest enclosing block.
function blockScopeExample() {
  if (true) {
    let y = 20;
    const z = 30;
    console.log("Inside if block, y =", y); // 20
    console.log("Inside if block, z =", z); // 30
  }
  try {
    console.log(y); // ReferenceError
  } catch (e) {
    console.log("Outside if block, y error:", e.message);
  }
  try {
    console.log(z); // ReferenceError
  } catch (e) {
    console.log("Outside if block, z error:", e.message);
  }
}
blockScopeExample();

// 🔹 3. var in loops vs let/const
// var is function-scoped, so it does not create a new binding per iteration.
for (var i = 0; i < 3; i++) {
  // ...
}
console.log("After for(var), i =", i); // 3 (i leaked out of loop)

for (let j = 0; j < 3; j++) {
  // ...
}
try {
  console.log("After for(let), j =", j);
} catch (e) {
  console.log("After for(let), j error:", e.message); // ReferenceError
}

// 🔹 4. Function-scoped vs block-scoped closures
const funcs = [];
for (var k = 0; k < 3; k++) {
  funcs.push(function() {
    console.log("var k in closure:", k);
  });
}
funcs.forEach(fn => fn()); 
// Prints 3, 3, 3 (all share same function-scoped k)

const funcs2 = [];
for (let m = 0; m < 3; m++) {
  funcs2.push(function() {
    console.log("let m in closure:", m);
  });
}
funcs2.forEach(fn => fn()); 
// Prints 0, 1, 2 (each block iteration has its own m)

// 🔹 5. IIFE to emulate block scope for var (legacy)
// Before let/const, an IIFE created a new function scope per iteration.
const legacy = [];
for (var n = 0; n < 3; n++) {
  (function(nCopy) {
    legacy.push(function() {
      console.log("IIFE nCopy:", nCopy);
    });
  })(n);
}
legacy.forEach(fn => fn()); 
// Prints 0, 1, 2

// 🔹 6. Best Practices
/*
- Prefer let and const for predictable block scoping.
- Avoid var to prevent accidental leaks outside blocks.
- Use const for variables that shouldn’t be reassigned.
- Use let for variables that will be reassigned.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
30 - Closures: Lexical Environment & Private Variables

This note explains:
1. Lexical Environment: the internal record of local variables and the scope chain.
2. How closures “close over” variables from their defining scope.
3. Using closures to create private variables and module-like patterns.
*/

// 🔹 1. Basic Closure: function remembers its outer variables
function makeGreeter(name) {
  // 'name' is part of makeGreeter's lexical environment
  return function greet() {
    console.log(`Hello, ${name}!`);
  };
}
const greetAjay = makeGreeter("Ajay");
greetAjay(); // Hello, Ajay!

// 🔹 2. Lexical Environment & Scope Chain demonstration
function A() {
  let a = "A value";
  function B() {
    let b = "B value";
    function C() {
      let c = "C value";
      // C can access c, b, and a via the scope chain
      console.log(a, b, c);
    }
    return C;
  }
  return B;
}
const runC = A()(); // A() returns B, B() returns C
runC(); // Output: A value B value C value

// 🔹 3. Private Variables with Closures (Module Pattern)
function createCounter() {
  let count = 0;               // private variable
  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    }
  };
}
const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
counter.decrement();
console.log(counter.getCount()); // 1
// Note: There is no way to access 'count' directly from outside

// 🔹 4. Closure Pitfall: shared loop variable with var
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function() {
    console.log("var i:", i);
  });
}
funcs.forEach(fn => fn()); // prints 3, 3, 3

// Fix with block-scoped let:
const funcs2 = [];
for (let j = 0; j < 3; j++) {
  funcs2.push(function() {
    console.log("let j:", j);
  });
}
funcs2.forEach(fn => fn()); // prints 0, 1, 2

// 🔹 5. Memory Considerations
/*
- Closures keep referenced variables alive even after outer function returns.
- Avoid retaining large objects in closures if not needed (can lead to memory leaks).
*/

// 🔚 Summary:
// • A closure is a function + its lexical environment.
// • It can access variables where it was defined, even after that scope has ended.
// • Use closures to encapsulate private state in JavaScript.


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
31 - Function.prototype.call, apply, and bind

This note explains:
1. call: invoke a function with an explicit this value and individual arguments.
2. apply: invoke a function with an explicit this value and arguments provided as an array.
3. bind: create a new function with a permanently bound this value and optional leading arguments.
*/

// 🔹 1. call()
// Syntax: func.call(thisArg, arg1, arg2, …)
// Calls func with this set to thisArg and arguments listed individually.
const person1 = { name: "Ajay" };
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}
greet.call(person1, "Hello", "!");   // Hello, Ajay!

// 🔹 2. apply()
// Syntax: func.apply(thisArg, [arg1, arg2, …])
// Calls func with this set to thisArg and arguments from an array.
greet.apply(person1, ["Hi", "!!!"]);  // Hi, Ajay!!!

// 🔹 3. bind()
// Syntax: const boundFn = func.bind(thisArg[, arg1[, arg2[, …]]]);
// Returns a new function with this permanently set to thisArg, and optional initial args.
const greetAjay = greet.bind(person1);
greetAjay("Hey", "?");                // Hey, Ajay?

// Partial application with bind:
const sayHelloToAjay = greet.bind(person1, "Hello");
sayHelloToAjay("!!!");                // Hello, Ajay!!!

// 🔹 4. Method Borrowing
const person2 = { name: "Riya" };
const details = {
  print: function(age, city) {
    console.log(`${this.name} is ${age} years old and lives in ${city}.`);
  }
};
details.print.call(person2, 30, "Mumbai");
// Riya is 30 years old and lives in Mumbai.

details.print.apply(person2, [31, "Delhi"]);
// Riya is 31 years old and lives in Delhi.

// 🔹 5. bind() with constructor-like use for callbacks
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
    console.log("Count:", this.count);
  }
}
const c = new Counter();
// Passing method without binding loses this:
setTimeout(c.increment, 0);        // Count: NaN or error (this !== c)
// Properly bind:
setTimeout(c.increment.bind(c), 0); // Count: 1

// 🔹 6. call/apply/bind and Arrow Functions
// Arrow functions have lexical this and cannot be rebound.
const arrowFn = () => console.log(this);
arrowFn.call(person1);  // this still refers to outer lexical this, not person1
arrowFn.apply(person1);
const boundArrow = arrowFn.bind(person1);
boundArrow();

// 🔹 7. Best Practices
/*
- Use call/apply to borrow methods from one object for another.
- Use bind to ensure methods keep the correct this when passed as callbacks.
- Prefer bind over creating wrapper functions in event handlers or async code.
- Remember apply takes an array of args; call lists them individually.
- Arrow functions ignore call/apply/bind for this binding.
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
32 - Recursion (Recursion vs Iteration)

This note explains:
1. What recursion is: a function that calls itself.
2. Base case and recursive case to prevent infinite loops.
3. Comparison to iterative solutions using loops.
4. Examples: factorial and Fibonacci implemented both ways.
5. Pros and cons of recursion vs iteration.
*/

// 🔹 1. Recursive Factorial
// - Uses a base case (n === 0) and a recursive case (n * factorial(n - 1)).
function factorialRecursive(n) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n === 0) return 1;           // Base case
  return n * factorialRecursive(n - 1); // Recursive call
}
console.log("Recursive factorial of 5:", factorialRecursive(5)); // 120

// 🔹 2. Iterative Factorial
// - Uses a loop to multiply values from 1 to n.
function factorialIterative(n) {
  if (n < 0) throw new Error("n must be non-negative");
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log("Iterative factorial of 5:", factorialIterative(5)); // 120

// 🔹 3. Recursive Fibonacci
// - Exponential time due to repeated calculations.
function fibonacciRecursive(n) {
  if (n < 0) throw new Error("n must be non-negative");
  if (n === 0) return 0;           // Base case 1
  if (n === 1) return 1;           // Base case 2
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2); // Recursive calls
}
console.log("Recursive Fibonacci of 7:", fibonacciRecursive(7)); // 13

// 🔹 4. Iterative Fibonacci
// - Linear time using a loop and two variables.
function fibonacciIterative(n) {
  if (n < 0) throw new Error("n must be non-negative");
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
console.log("Iterative Fibonacci of 7:", fibonacciIterative(7)); // 13

// 🔹 5. Recursion vs Iteration
// Pros of Recursion:
//  • Code can be more concise and expressive for tree/graph algorithms.
//  • Natural fit for divide-and-conquer problems.
// Cons of Recursion:
//  • Higher call-stack usage; risk of stack overflow for deep recursion.
//  • Often slower due to function-call overhead.
// Pros of Iteration:
//  • Generally more efficient in time and memory (no call-stack growth).
//  • Predictable looping structure.
// Cons of Iteration:
//  • Code can be more verbose for complex recursive patterns.
//  • Harder to express some algorithms (e.g., traversals) without additional data structures.

// 🔹 6. When to Use Which:
// - Use recursion when the problem is naturally recursive (trees, graphs, backtracking).
// - Use iteration when performance and stack safety are critical (simple loops, large n).


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/**************************************************************************************************
 * 70) ARRAY + OBJECT DESTRUCTURING (ES6)
 **************************************************************************************************/

// Array destructuring – position based
const arr = [10, 20, 30, 40];
const [a, b] = arr;                 // a=10, b=20
const [, , c] = arr;                // skip items → c=30
const [x, , , y=99] = [1, 2, 3];    // default values → x=1, y=99
const [first, ...rest] = arr;       // rest operator → first=10, rest=[20,30,40]

// Quick swap (no temp var)
let p = 1, q = 2;
[p, q] = [q, p];                     // p=2, q=1

// Nested array destructuring
const nested = [1, [2, 3]];
const [n1, [n2, n3]] = nested;       // n1=1, n2=2, n3=3

// Object destructuring – key based (order doesn’t matter)
const user = { id: 42, name: "Ajay", role: "dev" };
const { name, id } = user;           // name="Ajay", id=42

// Rename while destructuring
const { role: job } = user;          // job="dev" (no 'role' variable created)

// Default values + renaming
const { city = "Pune", name: fullName } = user;  // city="Pune", fullName="Ajay"

// Nested object destructuring
const options = { size: { w: 800, h: 600 }, theme: "dark" };
const { size: { w, h }, theme } = options; // w=800, h=600, theme="dark"

// Destructure function params (great for options objects)
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}

// Destructure in loops
const people = [{ n: "A" }, { n: "B" }];
for (const { n } of people) { /* n is each name */ }

// Pitfalls:
// - Array: missing items become undefined.
// - Object: accessing a missing nested path without default throws if you destructure deeper from undefined.
//   const { foo: { bar } } = {}; // ❌ TypeError
//   Fix → const { foo: { bar } = {} } = {}; // ✅ bar=undefined

/**************************************************************************************************
 * 71) DATA STRUCTURE: Set
 **************************************************************************************************/

// Characteristics:
// - Unique values only (no duplicates)
// - Insertion order preserved
// - Fast membership checks (average O(1))
// - Values can be primitives or object references
const s = new Set([1, 2, 2, 3]); // → {1,2,3}

// Core APIs
s.add(4);                 // add value
s.has(2);                 // true
s.delete(3);              // remove one
s.size;                   // 3
s.clear();                // remove all

// Iterate
const set2 = new Set(["a", "b", "c"]);
for (const v of set2) {}            // values
set2.forEach((v) => {});            // same value for key+value (Set has no keys)

// Convert between Set and Array
const uniq = [...new Set([1,1,2,3,3])];    // [1,2,3]
const setFromArr = new Set([..."hello"]);  // {'h','e','l','l','o'}

// Common use cases:
// - Deduplication, membership tests, set ops (union/intersection/diff)
const A = new Set([1,2,3]), B = new Set([3,4]);
const union = new Set([...A, ...B]);                       // {1,2,3,4}
const inter = new Set([...A].filter(x => B.has(x)));       // {3}
const diff  = new Set([...A].filter(x => !B.has(x)));      // {1,2}

/**************************************************************************************************
 * 72) DATA STRUCTURE: Map
 **************************************************************************************************/

// Characteristics:
// - Key/value pairs with ANY key type (objects, functions, primitives)
// - Preserves insertion order
// - Better than plain objects when keys aren’t strings/symbols or when frequent adds/removes
const m = new Map();
const objKey = { id: 1 };
m.set("name", "Ajay");
m.set(objKey, { score: 100 });
m.get("name");           // "Ajay"
m.get(objKey);           // { score: 100 }
m.has("name");           // true
m.delete("name");        // remove one
m.size;                  // size of map
m.clear();               // remove all

// Iteration
const map2 = new Map([["a",1], ["b",2]]);
for (const [k, v] of map2) {}
map2.forEach((v, k) => {});

// Convert
const entries = [...map2];                  // [["a",1],["b",2]]
const fromObj = new Map(Object.entries({x:10,y:20}));
const toObj   = Object.fromEntries(map2);   // { a:1, b:2 }

// Use cases:
// - Caches (object keys), counting frequencies, adjacency lists (graphs), LRU implementations

/**************************************************************************************************
 * 73) WEAKSET + WEAKMAP
 **************************************************************************************************/

// WeakSet:
// - Stores only object references (no primitives)
// - References are weak → if no other strong refs exist, GC can free them
// - Non-iterable (no size, no forEach), only .add/.has/.delete
const ws = new WeakSet();
let o1 = { x: 1 };
ws.add(o1);
ws.has(o1);   // true
o1 = null;    // object can be GC’d later; WeakSet auto-forgets

// WeakMap:
// - Keys must be objects; values can be anything
// - Weak refs enable memory-safe metadata per object (no leaks)
// - Non-iterable; only .set/.get/.has/.delete
const wm = new WeakMap();
let k = {};
wm.set(k, { hidden: true });
wm.get(k);    // { hidden: true }
k = null;     // key/value can be GC’d later

// Use cases:
// - Private data for objects without preventing GC
// - Event listener bookkeeping, memoization caches tied to object lifetimes

/**************************************************************************************************
 * 74) MODULES (IMPORT/EXPORT)
 **************************************************************************************************/

// File: math.js (module)
export const add = (a, b) => a + b;            // named export
export const PI  = 3.14159;
const secret = 42;
export default function mul(a, b) { return a * b; } // default export (one per file)

// File: app.js (module consumer)
import mul, { add, PI as π } from "./math.js";
mul(2,3);            // 6
add(1,2);            // 3
π;                   // 3.14159

// Re-export (barrel):
// index.js
export * from "./math.js";        // re-export named exports
export { default as multiply } from "./math.js";

// Dynamic import (code splitting; returns a Promise):
// (Only inside modules; top-level await supported in ESM)
async function load() {
  const { heavyFn } = await import("./heavy.js");
  heavyFn();
}

// Notes:
// - ESM is static (tree-shakable). Imports hoisted, read-only bindings.
// - Use 'type="module"' in browser or "type":"module" in package.json for Node.
// - Default vs named: you can have many named exports, max one default.
// - Import paths are URL-like in browsers; Node can use relative or bare specifiers (resolved by Node rules).

/**************************************************************************************************
 * 75) STRING: padStart, padEnd, trimStart, trimEnd
 **************************************************************************************************/

// padStart/End: pad to a target length with given fill string (default " ")
"7".padStart(3, "0");        // "007"
"js".padEnd(5, ".");         // "js..."
"123".padStart(2, "0");      // "123" (already >= length → unchanged)

// Common use: formatting IDs, times, columns
const hh = String(5).padStart(2, "0"); // "05"
const mm = String(9).padStart(2, "0"); // "09"

// trimStart/trimEnd: remove whitespace from start/end only (Unicode whitespace)
"   hi  ".trimStart();        // "hi  "
"   hi  ".trimEnd();          // "   hi"
"   hi  ".trim();             // both ends → "hi"

// Notes:
// - padStart/End compute how many chars to add: max(0, targetLen - str.length).
// - If fill string doesn’t divide evenly, it’s truncated.
// - trim* don’t modify the original string (strings are immutable).

/**************************************************************************************************
 * QUICK CHEAT CODES
 **************************************************************************************************/

// 1) Deduplicate array quickly:
const unique = [...new Set(arr)];

// 2) Count frequency with Map:
const freq = new Map();
for (const v of ["a","b","a"]) freq.set(v, (freq.get(v) || 0) + 1);

// 3) Destructure with defaults in params:
function connect({ host="localhost", port=5432 } = {}) {}

// 4) Swap variables:
[aVar, bVar] = [bVar, aVar];

// 5) Convert Map <-> Object:
const objFromMap = Object.fromEntries(aMap);
const mapFromObj = new Map(Object.entries(anObj));

// 6) Left pad numbers:
const orderNo = String(123).padStart(8, "0"); // "00000123"

// 7) Safe nested destructuring:
const { cfg: { url } = {} } = maybeObj; // url=undefined if cfg missing



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/*
===========================================================
76) Different Types of Errors in JavaScript (Cheat Sheet)
===========================================================

Core built-in error classes all inherit from Error:
- Error            → Base class (use this if none of the below fit)
- SyntaxError      → Code can’t be parsed (usually at load-time; eval/Function can throw at run-time)
- ReferenceError   → Refers to a variable/property that doesn’t exist (or TDZ with let/const)
- TypeError        → Wrong “type” usage (call non-function, access prop of null/undefined, etc.)
- RangeError       → Value out of allowed range (e.g., new Array(-1), num.toFixed(100))
- URIError         → Malformed URI sequence in encode/decode URI components
- EvalError        → Historical; rarely used nowadays
- AggregateError   → A group of errors (e.g., Promise.any() rejection contains AggregateError)

Examples:
-----------------------------------------------------------
  // SyntaxError (parse-time)
  // const x = ;             // ← Uncaught SyntaxError at load/parse time
  // Runtime SyntaxError via eval / Function:
  try { eval("const x = ;"); } catch (e) { console.log(e.name); } // SyntaxError

  // ReferenceError
  try { console.log(notDefinedVar); } catch (e) { console.log(e.name); } // ReferenceError
  // TDZ:
  // console.log(a); let a = 1; // ReferenceError (Temporal Dead Zone)

  // TypeError
  try {
    const n = null;
    n.toString();                          // Cannot read properties of null
  } catch (e) { console.log(e.name); }     // TypeError
  try {
    const f = 123;
    f();                                   // Not a function
  } catch (e) { console.log(e.name); }     // TypeError

  // RangeError
  try { new Array(-1); } catch (e) { console.log(e.name); }          // RangeError
  try { (12.34).toFixed(100); } catch (e) { console.log(e.name); }   // RangeError

  // URIError
  try { decodeURIComponent("%"); } catch (e) { console.log(e.name); } // URIError

  // AggregateError (Promise.any rejects if ALL reject)
  Promise.any([Promise.reject("A"), Promise.reject("B")])
    .catch(e => console.log(e.name)); // AggregateError

Useful Error fields:
  e.name      → "TypeError", "SyntaxError", …
  e.message   → human-readable explanation
  e.stack     → stack trace (non-standard but widely available)
  e.cause     → underlying error (ES2022+): new Error("msg", { cause: original })

Best practices:
  - Always throw Error instances (not strings).  // BAD: throw "fail"
  - Provide context: new Error("Invalid email: blank local-part")
  - Use specific error classes when it helps callers decide behavior.
  - Avoid exposing internal details in production messages.

===========================================================
77) Exercise: Throw a Custom Error Object
===========================================================

1) Create your own error class (extend Error)
2) Attach helpful metadata (e.g., code, status, field)
3) Throw it when validation fails
4) Catch it and branch logic by `instanceof` or `name`

Example solution:
-----------------------------------------------------------
  class ValidationError extends Error {
    constructor(message, options = {}) {
      super(message, options);           // keeps message + cause
      this.name = "ValidationError";
      this.code = options.code ?? "VALIDATION_FAILED";
      this.field = options.field ?? null;
      // Optional: better stacks in V8
      if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
    }
  }

  // A small validator that throws our custom error
  function requireNonEmptyString(value, field = "value") {
    if (typeof value !== "string") {
      throw new ValidationError(`${field} must be a string`, { code: "TYPE", field });
    }
    if (value.trim() === "") {
      throw new ValidationError(`${field} cannot be empty`, { code: "EMPTY", field });
    }
    return value;
  }

  // Using `cause` to wrap underlying errors
  function parseUser(json) {
    try {
      const obj = JSON.parse(json);
      obj.name = requireNonEmptyString(obj.name, "name");
      return obj;
    } catch (err) {
      // Wrap low-level error with higher-level context
      throw new ValidationError("Failed to parse user payload", { code: "PARSE", cause: err });
    }
  }

  // Demo:
  try {
    parseUser('{"name":""}');
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log("[ValidationError]", e.message, e.code, e.field, e.cause?.message);
    } else {
      console.log("[Unknown error]", e);
    }
  }

Tips:
  - Prefer `instanceof CustomError` over string matching messages.
  - Add error codes for programmatic handling (e.g., "EMPTY", "TYPE").

===========================================================
78) Handle Errors with try, catch, finally
===========================================================

try/catch basics:
-----------------------------------------------------------
  try {
    // code that may throw
  } catch (e) {
    // handle or rethrow
  } finally {
    // always runs (success or error) → cleanup: close files, stop timers, release locks
  }

Key patterns:
-----------------------------------------------------------
  // 1) Handle known, rethrow unknown
  try {
    risky();
  } catch (e) {
    if (e instanceof ValidationError) {
      alert(e.message);           // known: handle gracefully
    } else {
      throw e;                    // unknown: rethrow (don’t swallow)
    }
  }

  // 2) finally for cleanup (runs even if you return/throw in try/catch)
  function withTimer(fn) {
    const t = setTimeout(() => {}, 1000);
    try {
      return fn();
    } finally {
      clearTimeout(t);            // guarantees cleanup
    }
  }

  // ⚠ Avoid returning from finally (it overrides thrown errors/returns)
  function dangerous() {
    try {
      throw new Error("boom");
    } finally {
      // return 42; // ← would hide the error! Don’t do this.
    }
  }

Async error handling:
-----------------------------------------------------------
  // a) Promises
  doAsync()
    .then(res => console.log(res))
    .catch(err => console.error("Promise error:", err));

  // b) async/await with try/catch
  async function load() {
    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error("load failed:", e);
      // optionally rethrow if caller must know
      // throw e;
    } finally {
      console.log("cleanup spinner, etc.");
    }
  }

  // c) AggregateError example (Promise.any)
  async function firstAvailable(urls) {
    try {
      const fetches = urls.map(u => fetch(u));
      return await Promise.any(fetches);
    } catch (e) {
      if (e instanceof AggregateError) {
        console.error("All failed:", e.errors); // array of underlying errors
      } else {
        throw e;
      }
    }
  }

Node/Runtime safety nets (don’t rely on these for control flow):
  - Browser: window.addEventListener("unhandledrejection", e => { ... })
  - Node: process.on("unhandledRejection", handler), process.on("uncaughtException", handler)
  (Use to log/alert; fix the root cause in code.)

Quick checklist:
  [ ] Throw Error objects, not strings
  [ ] Use specific error classes for predictable handling
  [ ] Include context (message, code, cause)
  [ ] Don’t swallow unknown errors; rethrow
  [ ] Use finally for cleanup; don’t return from finally
  [ ] Test both success and failure paths
*/



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/********************************************************************************************
 * 148) SECTION INTRO
 * Modern Browser APIs for interactive media, graphics, hardware access, and animation.
 * Focus: GeoLocation, Canvas, rAF, Web Audio/Video, Web Animations, Speech APIs, mini-projects.
 ********************************************************************************************/


/********************************************************************************************
 * 149) GEOLOCATION API
 * - navigator.geolocation.getCurrentPosition(success, error?, options?)
 * - navigator.geolocation.watchPosition(success, error?, options?) → id; clear via clearWatch(id)
 * - Requires HTTPS (except localhost). User permission needed.
 * - options: { enableHighAccuracy:boolean, timeout:number(ms), maximumAge:number(ms) }
 ********************************************************************************************/
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      console.log("Lat/Lng:", latitude, longitude, "±", accuracy, "m");
    },
    (err) => console.error(err.code, err.message),
    { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5_000 }
  );
}
// Watch example:
const watchId = navigator.geolocation?.watchPosition((pos) => {
  console.log("Moving:", pos.coords.latitude, pos.coords.longitude);
});
// navigator.geolocation?.clearWatch(watchId);


/********************************************************************************************
 * 150) SHOW LOCATION ON MAP
 * Quick methods (no libs):
 * 1) Google Maps link: https://www.google.com/maps?q=<lat>,<lng>
 * 2) Static iframe embed (OpenStreetMap via Leaflet needs JS/CSS; link approach is simplest)
 ********************************************************************************************/
function openOnMaps(lat, lng) {
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
}
// Example with a live position:
navigator.geolocation?.getCurrentPosition(({ coords }) => {
  openOnMaps(coords.latitude, coords.longitude);
});


/********************************************************************************************
 * 151) CANVAS API (2D)
 * - <canvas width height>.getContext("2d")
 * - Draw shapes: fillRect, strokeRect, clearRect, beginPath/moveTo/lineTo/arc/stroke/fill
 * - Text: fillText/strokeText; Images: drawImage(img, x, y)
 * - Transform: translate/rotate/scale; save()/restore()
 * - Pixels: getImageData/putImageData; Export: canvas.toDataURL("image/png")
 ********************************************************************************************/
// Basic drawing:
const canvas = document.querySelector("#c");
const ctx = canvas?.getContext("2d");
if (ctx) {
  // Rectangle
  ctx.fillStyle = "#4f46e5";
  ctx.fillRect(20, 20, 120, 80);

  // Circle
  ctx.beginPath();
  ctx.arc(200, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = "#10b981";
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(20, 140);
  ctx.lineTo(240, 140);
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Text
  ctx.font = "16px system-ui";
  ctx.fillStyle = "#111827";
  ctx.fillText("Canvas Basics", 20, 170);
}


/********************************************************************************************
 * 152) requestAnimationFrame (rAF)
 * - Schedules the next frame ~60fps (depends on refresh rate), passes DOMHighResTimeStamp
 * - Better than setInterval for animation (throttles in background tabs; syncs to paint)
 * - cancelAnimationFrame(id) to stop
 ********************************************************************************************/
let rafId;
let x = 0, vx = 2;
function tick(t) { // t is high-res timestamp (ms)
  if (!ctx) return;
  ctx.clearRect(0, 180, canvas.width, 40);
  ctx.fillRect(x, 190, 20, 20);
  x += vx;
  if (x < 0 || x > canvas.width - 20) vx *= -1;
  rafId = requestAnimationFrame(tick);
}
// rafId = requestAnimationFrame(tick);
// cancelAnimationFrame(rafId);


/********************************************************************************************
 * 153-154) MINI-PROJECT: ANIMATED CLOCK (Canvas – analog)
 * Steps:
 * 1) Clear canvas; 2) Translate to center; 3) Draw face/ticks; 4) Compute angles for h/m/s;
 * 5) Draw hands; 6) rAF loop or setInterval(1000/60).
 ********************************************************************************************/
function drawClock(ctx, radius) {
  const now = new Date();
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width/2, canvas.height/2);

  // Face
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI*2);
  ctx.fillStyle = "#fff"; ctx.fill();
  ctx.strokeStyle = "#111827"; ctx.lineWidth = 4; ctx.stroke();

  // Marks
  for (let i=0; i<60; i++) {
    ctx.rotate(Math.PI/30);
    ctx.beginPath();
    ctx.moveTo(radius-10, 0);
    ctx.lineTo(radius, 0);
    ctx.lineWidth = (i%5===0) ? 3 : 1;
    ctx.stroke();
  }

  // Angles
  const sec = now.getSeconds() + now.getMilliseconds()/1000;
  const min = now.getMinutes() + sec/60;
  const hr  = (now.getHours()%12) + min/60;

  // Hour hand
  ctx.save();
  ctx.rotate((Math.PI/6)*hr);
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(radius*0.5,0); ctx.stroke();
  ctx.restore();

  // Minute hand
  ctx.save();
  ctx.rotate((Math.PI/30)*min);
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-15,0); ctx.lineTo(radius*0.75,0); ctx.stroke();
  ctx.restore();

  // Second hand
  ctx.save();
  ctx.rotate((Math.PI/30)*sec);
  ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-20,0); ctx.lineTo(radius*0.9,0); ctx.stroke();
  ctx.restore();

  ctx.restore();
}
function runClock() {
  if (!ctx) return;
  drawClock(ctx, Math.min(canvas.width, canvas.height)/2 - 10);
  requestAnimationFrame(runClock);
}
// runClock();


/********************************************************************************************
 * 155) WEB AUDIO API (Basics)
 * - audioCtx = new AudioContext(); nodes: OscillatorNode, GainNode, AnalyserNode, etc.
 * - Connect graph: node.connect(nextNode).connect(audioCtx.destination)
 * - Many autoplay policies require a user gesture before audioCtx.resume()
 ********************************************************************************************/
const audioCtx = window.AudioContext ? new AudioContext() : null;
async function beep(freq=440, ms=200) {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") await audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = freq;
  gain.gain.value = 0.1; // volume

  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  setTimeout(() => { osc.stop(); osc.disconnect(); }, ms);
}
// document.addEventListener("click", () => beep(523.25, 150)); // user gesture to unlock


/********************************************************************************************
 * 156) MINI-PROJECT: MUSIC PLAYER (HTMLAudioElement + minimal controls)
 ********************************************************************************************/
// HTML: <audio id="player" src="song1.mp3"></audio>
//       <button id="play">▶</button><input id="seek" type="range" min="0" max="100" value="0">
const $ = (s) => document.querySelector(s);
const player = $("#player");
const playBtn = $("#play");
const seek = $("#seek");
const playlist = ["song1.mp3", "song2.mp3"];
let trackIndex = 0;
function load(i) { player.src = playlist[i]; player.load(); }
playBtn?.addEventListener("click", async () => {
  if (player.paused) { await player.play(); playBtn.textContent = "⏸"; }
  else { player.pause(); playBtn.textContent = "▶"; }
});
player?.addEventListener("timeupdate", () => {
  if (!player.duration) return;
  seek.value = String((player.currentTime / player.duration) * 100);
});
seek?.addEventListener("input", () => {
  if (!player.duration) return;
  player.currentTime = (Number(seek.value)/100) * player.duration;
});
player?.addEventListener("ended", () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  load(trackIndex); player.play();
});
// load(trackIndex);


/********************************************************************************************
 * 157) MINI-PROJECT: DRUM MACHINE (low-latency triggers)
 * - Preload buffers with fetch + audioCtx.decodeAudioData
 * - On key press, createBufferSource → connect → start(0)
 ********************************************************************************************/
const bank = new Map();
async function loadSample(name, url) {
  if (!audioCtx) return;
  const res = await fetch(url);
  const arr = await res.arrayBuffer();
  const buf = await audioCtx.decodeAudioData(arr);
  bank.set(name, buf);
}
function trigger(name) {
  if (!audioCtx || !bank.has(name)) return;
  const src = audioCtx.createBufferSource();
  src.buffer = bank.get(name);
  src.connect(audioCtx.destination);
  src.start();
}
// Example mapping: Z=X snare/kick/hats
// document.addEventListener("keydown", (e) => {
//   const map = { KeyZ: "kick", KeyX: "snare", KeyC: "hat" };
//   trigger(map[e.code]);
// });


/********************************************************************************************
 * 158) VIDEO API (HTMLVideoElement)
 * - Methods: play(), pause(), load(); Props: currentTime, duration, volume, muted, playbackRate
 * - Events: loadedmetadata, timeupdate, ended, seeking/seeked, waiting/canplay
 * - Extras: requestPictureInPicture(), requestFullscreen() on container
 ********************************************************************************************/
// HTML: <video id="vid" src="movie.mp4"></video>
//       <button id="pip">PiP</button>
const vid = $("#vid");
$("#pip")?.addEventListener("click", async () => {
  if (document.pictureInPictureElement) { await document.exitPictureInPicture(); return; }
  if (document.pictureInPictureEnabled && vid) await vid.requestPictureInPicture();
});
// Seek:
// vid.currentTime = 60; // jump to 1:00
// Speed:
// vid.playbackRate = 1.25;


/********************************************************************************************
 * 159) MINI-PROJECT: CUSTOM VIDEO PLAYER (progress, volume, skip)
 ********************************************************************************************/
// HTML: <video id="v" src="movie.mp4"></video>
// <button id="pp">Play/Pause</button>
// <button id="back">-10s</button> <button id="fwd">+10s</button>
// <input id="vol" type="range" min="0" max="1" step="0.01" value="1">
// <input id="prog" type="range" min="0" max="100" value="0">
const v = $("#v"), pp = $("#pp"), back = $("#back"), fwd = $("#fwd"), vol = $("#vol"), prog = $("#prog");
pp?.addEventListener("click", () => v.paused ? v.play() : v.pause());
back?.addEventListener("click", () => v.currentTime = Math.max(0, v.currentTime - 10));
fwd?.addEventListener("click", () => v.currentTime = Math.min(v.duration || Infinity, v.currentTime + 10));
vol?.addEventListener("input", () => v.volume = Number(vol.value));
v?.addEventListener("timeupdate", () => { if (v.duration) prog.value = String((v.currentTime/v.duration)*100); });
prog?.addEventListener("input", () => { if (v.duration) v.currentTime = (Number(prog.value)/100)*v.duration; });


/********************************************************************************************
 * 160) WEB ANIMATIONS API (WAAPI) – BALL PROJECT
 * - element.animate(keyframes, options) → Animation
 * - Control: anim.pause()/play()/reverse(), anim.currentTime, anim.playbackRate
 * - Keyframes: array or keyframe object; Options: duration, iterations, direction, easing, fill
 ********************************************************************************************/
// HTML: <div id="ball" style="width:40px;height:40px;border-radius:50%;background:#ef4444;position:absolute;"></div>
const ball = document.querySelector("#ball");
const bounce = ball?.animate(
  [
    { transform: "translate(0,0)" },
    { transform: "translate(300px,0)", offset: 0.5, easing: "ease-in" },
    { transform: "translate(600px,0)" }
  ],
  { duration: 1200, iterations: Infinity, direction: "alternate", easing: "ease-out" }
);
// bounce.playbackRate = 1.2; bounce.pause(); bounce.play(); bounce.reverse();


/********************************************************************************************
 * 161) SPEECH RECOGNITION API (Web Speech – Recognition)
 * - Experimental; Chrome supports via webkitSpeechRecognition. HTTPS + mic permission.
 * - Events: onresult, onaudiostart/end, onend; Props: lang, interimResults, continuous
 ********************************************************************************************/
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
function startRecognition() {
  if (!SpeechRec) { console.warn("SpeechRecognition not supported."); return; }
  const rec = new SpeechRec();
  rec.lang = "en-US";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join("");
    console.log("Heard:", transcript, "final?", e.results[0].isFinal);
  };
  rec.onerror = (e) => console.error(e.error);
  rec.onend = () => console.log("Recognition ended");
  rec.start();
}
// startRecognition();


/********************************************************************************************
 * 162) SPEECH SYNTHESIS API (Text → Speech)
 * - window.speechSynthesis; new SpeechSynthesisUtterance(text)
 * - voice selection via speechSynthesis.getVoices(); events: onstart, onend, onerror
 * - Use voicesloaded event (voices may load async)
 ********************************************************************************************/
function speak(text, { rate=1, pitch=1, volume=1, lang="en-US", voiceName } = {}) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate; u.pitch = pitch; u.volume = volume; u.lang = lang;

  const voices = speechSynthesis.getVoices();
  if (voiceName) {
    const v = voices.find(v => v.name === voiceName);
    if (v) u.voice = v;
  }
  speechSynthesis.speak(u);
}
// window.speechSynthesis.onvoiceschanged = () => console.log(speechSynthesis.getVoices());
// speak("Hello Ajay, welcome to Web APIs!");


/********************************************************************************************
 * QUICK TIPS & PITFALLS
 * - Geolocation: handle errors (PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT); cache with maximumAge.
 * - Canvas: set canvas.width/height attributes (not CSS) for crisp drawing; use save/restore around transforms.
 * - rAF: do physics with delta time for consistent speed across frame rates (use timestamp param).
 * - Web Audio: resume() on user gesture; reuse a single AudioContext; use AnalyserNode for visualizers.
 * - Video: wait for loadedmetadata before reading duration; handle CORS when drawing to canvas from video.
 * - WAAPI: returns an Animation; try `fill: "forwards"` to persist end state.
 * - Speech: provide UI to stop/cancel; recognition may stop automatically after silence.
 ********************************************************************************************/


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