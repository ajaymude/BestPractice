// ✅ JavaScript Full Syllabus with Categories (Basics to Expert)

// 📘 BASICS & SYNTAX
// 01 - Hello world in js 
// 02 - Way of writing JS in HTML
// 03 - Variable
// 04 - Data Types in JS and the Truthy/Falsy values
// 05 - Type Conversion
// 06 - Types of Operators in JavaScript
// 07 - Operator Precedence in JavaScript
// 32 - Comments

// 🔀 CONTROL FLOW
// 08 - if, else if, and else in JavaScript
// 09 - Ternary operator
// 14 - Switch Statement
// 15 - Boolean logic

// 🔠 STRINGS & TEMPLATES
// 11 - Template Literals in JavaScript
// 13 - Equality Operators (== vs ===) in JavaScript

// 🔁 LOOPS & CONDITIONS
// 20 - Loops
// 16 - Nullish Coalescing
// 24 - Nullish Coalescing Operator (??)
// 23 - Short Circuiting (&& and ||)

// 🔣 FUNCTIONS
// 19 - Functions
// 22 - Rest Pattern and Parameters
// 21 - Spread Operator (...)

// 📦 DATA STRUCTURES
// 26 - JavaScript Sets 🚀
// 53 - Set & WeakSet
// 52 - Map & WeakMap

// ⚙️ ES6+ FEATURES
// 17 - JavaScript Update (ES6+ features intro)
// 25 - Optional Chaining (?.)

// 🌐 BROWSER & STORAGE
// 27 - localStorage
// 63 - sessionStorage

// 🧰 ERROR HANDLING
// 28 - Promises in JavaScript
// 29 - Throwing Errors Manually
// 33 - Types of Errors in JS

// 📦 MODULES & TOOLS
// 30 - Exporting and Importing in ES6 Modules
// 31 - NPM

// ⏲️ TIMERS
// 34 - Timer (setTimeout, setInterval)

// 🔥 ADVANCED JAVASCRIPT
// 35 - Closures
// 36 - Lexical Scope & Scope Chain
// 37 - Hoisting
// 38 - Execution Context (Global & Functional)
// 39 - Call Stack
// 40 - Event Loop (Microtask vs Macrotask Queue)
// 41 - Debouncing & Throttling
// 42 - Memory Management & Garbage Collection

// 🧱 OBJECT-ORIENTED JAVASCRIPT
// 43 - this keyword in different contexts
// 44 - Constructor Functions
// 45 - Prototypes and Prototype Chain
// 46 - Classes & Inheritance
// 47 - Object.create() and Factory Functions

// 🧶 ASYNC JAVASCRIPT DEEP DIVE
// 48 - async and await in detail
// 49 - Fetch API + Real-world API calls
// 50 - Error handling in async/await
// 51 - Chaining and parallel fetching

// 📑 ADVANCED DATA STRUCTURES
// 54 - Shallow Copy vs Deep Copy
// 55 - JSON methods (parse, stringify)

// 🧠 FUNCTIONAL PROGRAMMING CONCEPTS
// 56 - Pure Functions
// 57 - Immutability
// 58 - Higher Order Functions
// 59 - Currying & Composition

// 🕸️ DOM AND BROWSER APIS
// 60 - Event Delegation
// 61 - Bubbling and Capturing
// 62 - Custom Events
// 64 - location, history, navigator objects

// 🔧 MODERN TOOLING & ECOSYSTEM
// 65 - Bundlers (Webpack, Vite - basics)
// 66 - Transpilers (Babel)
// 67 - ESLint & Prettier
// 68 - Vitest or Jest Testing Basics

// 🔄 EXTRA / OPTIONAL (ADVANCED)
// 69 - Web Workers
// 70 - Service Workers & PWA
// 71 - Observables & RxJS
// 72 - Design Patterns in JavaScript
// 73 - Real-world Project Architecture

// 🧠 EXPERT-LEVEL ADDITIONS
// 74 - Private fields in classes (#field)
// 75 - Tagged Template Literals
// 76 - Custom bind, call, and apply
// 77 - Tail Call Optimization
// 78 - Event Targeting and Propagation in depth
// 79 - Symbol and well-known Symbols
// 80 - Iterators and Generators
// 81 - CommonJS vs ESM deep dive
// 82 - Dynamic import() and code splitting
// 83 - IIFE (Immediately Invoked Function Expression)
// 84 - Memoization and Caching Patterns
// 85 - Function Composition and Pipeline
// 86 - DevTools: Profiling and Memory Debugging
// 87 - Proxies and Reflect API
// 88 - Object.defineProperty, freeze, seal, etc.
// 89 - Animation with requestAnimationFrame
// 90 - File APIs (Blob, FileReader, drag & drop)
// 91 - WebSockets
// 92 - Crypto API
// 93 - How JS engines work (V8, JIT, interpreter)
// 94 - Internal memory model and GC in V8


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 01 - Hello world in js 

console.log("Hello, World!");
alert("Hello, World!");
document.write("Hello, World!");
document.getElementById("demo").innerText = "Hello, World!";

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 02 - way of writing js in html

// 1 - inside html element 
<button onclick="alert('Hello, World!')">Click Me</button>

// 2 - in html page 
    <!DOCTYPE html>
<html lang="en">
<head>
    <title>Internal JS Example</title>
</head>
<body>
    <button onclick="sayHello()">Click Me</button>

    <script>
        function sayHello() {
            alert("Hello, World!");
        }
    </script>
</body>
</html>


// 3 external 
<!DOCTYPE html>
<html lang="en">
<head>
    <title>External JS Example</title>
    <script src="script.js"></script>
</head>
<body>
    <button onclick="sayHello()">Click Me</button>
</body>
</html>


// way to load the js in the html page 
<!-- Normal script (Blocks HTML parsing) -->
<script src="script.js"></script>

<!-- Async script (Executes immediately when downloaded, no order) -->
<script src="script.js" async></script>

<!-- Defer script (Executes in order, after HTML is loaded) -->
<script src="script.js" defer></script>

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 03 - variable 

// Variable Type	     Scope	             Reassignable?     	redeclare?          	Hoisted?
// var             	Function-scoped	         ✅ Yes	           ✅ Yes              ✅ Yes (but undefined)
// let0         	Block-scoped	         ✅ Yes             	❌ No	              ✅ Yes (but not initialized)
// const	        Block-scoped	         ❌ No              	❌ No	              ✅ Yes (but not initialized)

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


// 04 - Data type in js and the truthy and falsy value 

// JavaScript has two main categories of data types:
// 1️⃣ Primitive Data Types (Immutable, stored by value)
// 2️⃣ Non-Primitive (Reference) Data Types (Mutable, stored by reference)

// // 1️⃣ Primitive Data Types (7 types)
// Data Type       	Example                             	Description
// String	         "Hello"	                           Text values, enclosed in quotes
// Number	          25, 3.14	                           Any number, integer or floating-point
// BigInt	          BigInt(12345678901234567890n)	       For very large numbers
// Boolean	          true, false                          Logical values
// Undefined	      let x;                            	A variable declared but not assigned a value
// Null	              let y = null;	                        Represents an intentional absence of value
// Symbol	       Symbol("id")                           	Unique identifier (ES6)

let name = "Ajay";   // String
let age = 25;        // Number
let bigNum = 12345678901234567890n; // BigInt
let isStudent = true; // Boolean
let x;               // Undefined
let y = null;        // Null
let sym = Symbol("unique"); // Symbol

console.log(typeof name); // "string"
console.log(typeof age);  // "number"
console.log(typeof bigNum); // "bigint"
console.log(typeof isStudent); // "boolean"
console.log(typeof x); // "undefined"
console.log(typeof y); // "object" (JavaScript bug)
console.log(typeof sym); // "symbol"



// 2️⃣ Non-Primitive (Reference) Data Types
// Data Type	   Example	                 Description
// Object	      {name: "Ajay", age: 25}	Key-value pairs
// Array          [1, 2, 3]               	List-like collection
// Function	    function() {}	            A block of reusable code


let person = { name: "Ajay", age: 25 }; // Object
let numbers = [1, 2, 3, 4, 5];          // Array
function greet() { console.log("Hello!"); } // Function

console.log(typeof person);  // "object"
console.log(typeof numbers); // "object"
console.log(typeof greet);   // "function"

console.log(Array.isArray([1, 2, 3])); // true
console.log(person instanceof Object); // true
console.log(typeof true);





////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 05 - Type Conversion

// coercion refers to the automatic or implicit conversion
//  of values from one data type to another.

// coercion 
console.log("5" + 2);  // "52" (string + number → string)
console.log("5" - 2);  // 3 (string - number → number)
console.log("5" * 2);  // 10 (string * number → number)

// conversion 
// Explicit (Manual Type Conversion)
let num = "123";
console.log(Number(num)); // 123
console.log(String(123)); // "123"
console.log(Boolean(1));  // true
console.log(Boolean(0));  // false

const x = new String("ajay");
const s = x.__proto__

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 06 - Types of Operators in JavaScript

// 1️⃣ Arithmetic Operations (+, -, , /, etc.)
// Operator     	Name	                           Example	Output
// +	            Addition	                        5 + 3	8
// -	            Subtraction	                        5 - 3	2
// *	            Multiplication	                   5 * 3	15
// /	            Division	                      5 / 2	2.5
// %	            Modulus (Remainder)           	5 % 2	1
// **	            Exponentiation (Power)	        2 ** 3	8
// ++	            Increment	                    let x = 5; x++	6
// --	            Decrement	                     let x = 5; x--	4


// 2️⃣ Assignment Operations (=, +=, -=, etc.)
// Operator	            Name	                Example	Equivalent To
// =	                Assignment	            x = 10	x = 10
// +=	                Add & Assign	        x += 5	x = x + 5
// -=	                Subtract & Assign	    x -= 5	x = x - 5
// *=	                Multiply & Assign	    x *= 5	x = x * 5
// /=	                Divide & Assign	        x /= 5	x = x / 5
// %=	                Modulus & Assign	    x %= 5	x = x % 5


// 3️⃣ Comparison Operations (==, ===, >, <, etc.)
// Operator	        Name	                        Example	Output
// ==	            Equal (loose)	                5 == "5"	true
// ===	            Strict Equal	                5 === "5"	false
// !=	            Not Equal	                    5 != 3	true
// !==	            Strict Not Equal	            5 !== "5"	true
// >	            Greater Than	                10 > 5	true
// <	            Less Than	                    10 < 5	false
// >=	            Greater or Equal	            5 >= 5	true
// <=	            Less or Equal	                3 <= 5	true


// 4️⃣ Logical Operations (&&, ||, !)
// Operator	        Name	            Example	Output
// &&	            AND                 true && false	false
// ||	            OR
// !	            NOT	                !true	false


// && returns the first falsy value, or last truthy value if none are falsy.
// || returns the first truthy value, or last falsy value if none are truthy.
// ?? returns the first defined (non-null, non-undefined) value,or the last value if all are null or undefined.




// 5️⃣ Bitwise Operations (&, |, ^, ~, <<, >>)
// 6️⃣ String Operations (+, .concat(), slice(), etc.)
// 7️⃣ Type Operations (typeof, instanceof)


// 8️⃣ Ternary Operator (condition ? true : false)
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 07 - Operator Precedence in JavaScript

// Operator precedence determines the order in which expressions are evaluated. 
// Higher precedence operators execute first.

// <!--
// JavaScript Operator Precedence Table

// Precedence   Operator                Type                                          Associativity       Example
// -----------------------------------------------------------------------------------------------
// 20          ()                      Grouping                                     N/A                (2 + 3) * 4 → 20
// 19          . [] () ?.              Member Access, Function Call, Optional Chaining  Left to Right    obj.prop, arr[0], func(), obj?.prop
// 18          new                     Object Creation                              Right to Left      new Date()
// 17          ++ --                   Postfix Increment & Decrement               N/A                x++, y--
// 16          ++ -- + - ~ !           Prefix Increment, Unary Plus/Minus, Bitwise NOT, Logical NOT  Right to Left ++x, -y, !true
// 15          **                      Exponentiation                              Right to Left      2 ** 3 → 8
// 14          * / %                   Multiplication, Division, Modulus           Left to Right      10 / 2 * 5 → 25
// 13          + -                     Addition, Subtraction                       Left to Right      10 - 5 + 2 → 7
// 12          << >> >>>               Bitwise Shift                               Left to Right      8 >> 2 → 2
// 11          < <= > >= instanceof in Comparison                                 Left to Right      10 > 5 → true
// 10          == != === !==           Equality & Strict Equality                  Left to Right      5 === "5" → false
// 9           &                       Bitwise AND                                 Left to Right      5 & 1 → 1
// 8           ^                       Bitwise XOR                                 Left to Right      5 ^ 1 → 4
// 7           |                       Bitwise OR                                  Left to Right      5 | 1 → 5
// 6           &&                      Logical AND                                 Left to Right      true && false → false
// 5           ||                      Logical OR                                  Left to Right      true || false → true
// 4           ?:                      Ternary Operator                            Right to Left      age >= 18 ? "Adult" : "Minor"
// 3           = += -= *= /= %= **=     Assignment Operators                        Right to Left      x += 5 (same as x = x + 5)
// 2           ,                       Comma (Sequential Evaluation)               Left to Right      a = 1, b = 2, c = 3

// -->

console.log(true || false && false); // true (&& evaluated first)
console.log((true || false) && false); // false (Parentheses change execution order)

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// 08 - if, else if, and else in JavaScript

// if
if (age >= 18) {
  console.log("You are an adult.");
}

// if else 
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// else if 
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 09 Turnery operator
let message = (age >= 18) ? "Adult" : "Minor";
console.log(message);

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


// 10 - Strings and Template Literals in JavaScript  
// let name = "Ajay";
console.log(`Hello, ${name}!`);

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 11 - Truthy and Falsy Values in JavaScript

// 1️⃣ Falsy Values
// A value is falsy if it converts to false when evaluated in a boolean context.
// There are only 8 falsy values in JavaScript:

// Falsy                     Value	Example
// false	                if (false) {...}
// 0 (zero)   	            if (0) {...}
// -0 (negative zero)	    if (-0) {...}
// 0n (BigInt zero)	        if (0n) {...}
// "" (empty string)	    if ("") {...}
// null	                    if (null) {...}
// undefined	            if (undefined) {...}
// NaN (Not a Number)	    if (NaN) {...}



// 2️⃣ Truthy Values
// Any value that is not falsy is truthy in JavaScript.
// There are infinite truthy values, including:

// Truthy                   Value	Example
// true	                    if (true) {...}
// Any non-zero number	    if (42) {...}
// Negative numbers	        if (-5) {...}
// Any non-empty string	    if ("hello") {...}
// Non-empty arrays	if      ([]) {...}
// Non-empty objects	    if ({}) {...}
// Functions	            if (function() {}) {...}


// falsy value 

false
0
-0
0n         // BigInt zero
""         // Empty string
null
undefined
NaN



// truthy value 

true
{}          // empty object
[]          // empty array
"0"         // non-empty string
"false"     // non-empty string
42          // any non-zero number
-42         // negative number
3.14        // float
"hello"     // non-empty string
Infinity
-Infinity
function() {}  // any function


console.log(Boolean(0));        // ❌ false (Falsy)
console.log(Boolean(""));       // ❌ false (Falsy)
console.log(Boolean("Hello"));  // ✅ true (Truthy)
console.log(Boolean([]));       // ✅ true (Truthy)
console.log(Boolean({}));       // ✅ true (Truthy)

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 12 - Equality Operators (== vs ===) in JavaScript

// Operator     	Name	                Type	        Behavior
// == 	        Loose Equality	            Non-strict	    Converts types before comparing
// ===	        Strict Equality	            Strict	        Compares both value and type

// Operator	Type	Behavior
// ==	Loose Equality	Converts types before comparing
// ===	Strict Equality	Compares both value and type
// !=	Loose Inequality	Converts types before comparing
// !==	Strict Inequality	Compares both value and type

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 13 - Switch Statement

let fruit = "apple";

switch (fruit) {
    case "banana":
        console.log("Banana is yellow.");
        break;
    case "apple":
        console.log("Apple is red or green.");
        break;
    case "orange":
        console.log("Orange is orange.");
        break;
    default:
        console.log("Unknown fruit.");
}


let day = "saturday";

switch (day) {
    case "saturday":
    case "sunday":
        console.log("It's the weekend!");
        break;
    case "monday":
        console.log("Start of the workweek.");
        break;
        default:
        console.log("It's a weekday.");
      }
      
      
      // Switch Without break (Fall-through)
      // let num = 2;
      
      switch (num) {
        case 1:
        console.log("One");
    case 2:
        console.log("Two");
    case 3:
        console.log("Three");
    default:
        console.log("Default case");
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 14 -Boolean logic

console.log(true && true);   // true
console.log(true && false);  // false
console.log(5 > 3 && 10 < 20); // true (both conditions are true)

console.log(false && "Hello"); // false (stops at false)
console.log(0 && "Test"); // 0 (stops at 0)
console.log("Hello" && 42); // 42 (both truthy, returns last value)



console.log(true || false);  // true
console.log(false || false); // false
console.log(5 > 3 || 10 > 20); // true (one condition is true)

console.log(true || "Hello"); // true (stops at true)
console.log("Hello" || 42); // "Hello" (stops at first truthy value)
console.log(0 || false || "Yes"); // "Yes" (last truthy value)


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 15 - Nullish Coalescing
// The ?? operator returns the first defined value (not null or undefined).

// let name = null;
console.log(name ?? "Guest"); // "Guest" (null is ignored)

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 16 js update 
/*
========================================
JavaScript Updates by Year
========================================
*/

// ES5 (2009) - ECMAScript 5
// - Strict Mode ("use strict")
// - JSON parsing
// - Array methods: forEach(), map(), filter(), reduce(), some(), every()
// - Property getters and setters

// ES6 / ES2015 (2015) - Major Update
// - let & const (Block-scoped variables)
// - Arrow Functions =>
  // - Template Literals `Hello ${name}`
// - Default Parameters (function greet(name = "Guest"))
// - Spread & Rest Operator (...array)
// - Destructuring Assignment
// - Promises
// - Classes (class Person {})
// - Modules (import/export)

// ES7 / ES2016
// - Array.prototype.includes()
// - Exponentiation Operator (**)

// ES8 / ES2017
// - Async/Await
// - Object.values() & Object.entries()
// - String padding: padStart(), padEnd()
// - Trailing commas in function parameters

// ES9 / ES2018
// - Rest/Spread properties for objects
// - Promise.prototype.finally()
// - Asynchronous Iteration (for-await-of)

// ES10 / ES2019
// - Array.prototype.flat(), flatMap()
// - Object.fromEntries()
// - String.trimStart(), trimEnd()
// - Optional catch binding

// ES11 / ES2020
// - Nullish Coalescing Operator (??)
// - Optional Chaining Operator (?.)
// - BigInt support
// - Dynamic import()
// - Promise.allSettled()
// - String.prototype.matchAll()

// ES12 / ES2021
// - Logical assignment operators (&&=, ||=, ??=)
// - String.replaceAll()
// - Numeric Separators (1_000_000)
// - WeakRefs and FinalizationRegistry

// ES13 / ES2022
// - Top-level await
// - Class Fields and Private Methods (#)
// - Object.hasOwn()
// - at() method for arrays

// ES14 / ES2023
// - Array find from last (findLast(), findLastIndex())
// - Symbols as WeakMap keys
// - New Array methods: toSorted(), toSpliced(), with()

// ES15 / ES2024 (Upcoming)
// - Set Methods (union(), intersection(), difference())
// - Temporal API (New Date/Time handling)

// More updates will be added as JavaScript evolves!

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 17 - What is Strict Mode?
// Strict mode is a feature in JavaScript that helps catch common coding mistakes and unsafe actions.
//  It enforces a stricter set of rules, making JavaScript more secure and optimized.

"use strict";  // Enables strict mode

// let x = 10;
console.log(x); // ✅ Works fine

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 18 functions 

// Function Declaration
function greet() {
    console.log("Hello, Ajay!");
  }
greet(); // Output: Hello, Ajay!

  
//   Function with Parameters & Return Value
function add(a, b) {
    return a + b;
  }
console.log(add(5, 3)); // Output: 8 argument 


// Function Expression
const multiply = function(x, y) {
  return x * y;
};
console.log(multiply(4, 5)); // Output: 20
  

//   Arrow Function (ES6)
const subtract = (a, b) => a - b;
console.log(subtract(10, 4)); // Output: 6

// 1. Arrow function with multiple parameters and a block body
const add = (a, b) => {
  return a + b;
};
console.log("add(2, 3):", add(2, 3)); // 5

// 2. Arrow function with multiple parameters and implicit return
const multiply = (a, b) => a * b;
console.log("multiply(4, 5):", multiply(4, 5)); // 20

// 3. Arrow function with a single parameter (no parentheses)
const square = x => x * x;
console.log("square(6):", square(6)); // 36

// 4. Arrow function with no parameters
const greet = () => console.log("Hello!");
greet(); // Hello!

// 5. Arrow function returning an object (wrapped in parentheses)
const getUser = () => ({ name: "Alice", age: 25 });
console.log("getUser():", getUser()); // { name: "Alice", age: 25 }




// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log("IIFE executed!");
  })();


// Function with Default Parameters
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}
greet();        // Output: Hello, Guest!
greet("Ajay"); // Output: Hello, Ajay!


// Rest Parameters (...)
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
  console.log(sum(1, 2, 3, 4, 5)); // Output: 15

  
// Callback Function
function process(callback) {
    console.log("Processing...");
    callback();
  }
  process(() => console.log("Callback executed!"));
  
  
  // Higher-Order Function
  //A function that takes another function as a parameter or returns a function.
  
function operate(fn, a, b) {
    return fn(a, b);
  }
  console.log(operate((x, y) => x * y, 3, 4)); // Output: 12
  
  
// Recursive Function
//A function that calls itself.
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5)); // Output: 120



// // Example object
const person = {
  name: "Ajay",
  greet: function(city, country) {
      console.log(`Hello, my name is ${this.name} and I live in ${city}, ${country}.`);
    }
};

// // Another object
const anotherPerson = {
    name: "Soham"
  };
  
  // -------- Using call --------
person.greet.call(anotherPerson, "Mumbai", "India");
// Output: Hello, my name is Soham and I live in Mumbai, India.

// -------- Using apply --------
person.greet.apply(anotherPerson, ["Pune", "India"]);
// Output: Hello, my name is Soham and I live in Pune, India.

// -------- Using bind --------
const boundGreet = person.greet.bind(anotherPerson, "Delhi", "India");
boundGreet(); 
// Output: Hello, my name is Soham and I live in Delhi, India.


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 19 - loops 

// 1️⃣ for loop
// for (let i = 1; i <= 5; i++) {
  //     console.log("for loop Iteration:", i);
  // }

  // 2️⃣ while loop
// let count = 1;
// while (count <= 5) {
//     console.log("while loop Count:", count);
//     count++;
// }

// 3️⃣ do...while loop
// let num = 1;
// do {
  //     console.log("do...while loop Number:", num);
  //     num++;
// } while (num <= 5);

// 4️⃣ for...in loop (Object iteration)
// let person = { name: "Ajay", age: 25, city: "Delhi" };
// for (let key in person) {
  //     console.log("for...in loop", key + ":", person[key]);
  // }

// 5️⃣ for...of loop (Array iteration)
// let numbers = [10, 20, 30, 40];
// for (let num of numbers) {
  //     console.log("for...of loop Value:", num);
  // }
  
// 6️⃣ for...of loop (String iteration)
// let text = "Hello";
// for (let char of text) {
//     console.log("for...of loop Character:", char);
// }




// Looping Through Arrays in JavaScript
// for loop
// while loop
// for...of loop
// forEach() method
// map() method




// break - it means it stop here 
// continue - where it get it start again from the start 


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// 20 - The Spread Operator (...)

// 1. Spread in array literals
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log('1:', combined); // [1, 2, 3, 4]

// 2. Copying arrays
const original = [10, 20, 30];
const copy = [...original];
console.log('2:', copy); // [10, 20, 30]

// 3. Spread with strings (strings are iterable)
const word = 'hello';
const chars = [...word];
console.log('3:', chars); // ['h', 'e', 'l', 'l', 'o']

// 4. Spread in function arguments
function sum(x, y, z) {
  return x + y + z;
}
const nums = [1, 2, 3];
console.log('4:', sum(...nums)); // 6

// 5. Spread with rest parameters
function logAll(...values) {
  console.log('5:', values);
}
logAll(...[5, 6, 7]); // [5, 6, 7]

// 6. Merge objects
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 };
console.log('6:', merged); // { a: 1, b: 2 }

// 7. Clone object
const user = { name: 'Alice', age: 25 };
const cloned = { ...user };
console.log('7:', cloned); // { name: 'Alice', age: 25 }

// 8. Overwriting properties while spreading
const settings = { theme: 'light', fontSize: 12 };
const updated = { ...settings, fontSize: 16 };
console.log('8:', updated); // { theme: 'light', fontSize: 16 }

// 9. Spread with nested arrays
const nested = [[1, 2], [3, 4]];
const flat = [...nested[0], ...nested[1]];
console.log('9:', flat); // [1, 2, 3, 4]

// 10. Spread with Math functions
const scores = [10, 25, 30];
console.log('10: Max score =', Math.max(...scores)); // 30

// 11. Spread in array destructuring
const [first, ...rest] = [100, 200, 300];
console.log('11:', first); // 100
console.log('11:', rest); // [200, 300]

// 12. Spread multiple times
const a = [1];
const b = [2];
const c = [3];
const combinedABC = [...a, ...b, ...c];
console.log('12:', combinedABC); // [1, 2, 3]


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// 22 - Rest Pattern and Parameters 


// 1. Rest in function parameters
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}
console.log('1:', sum(1, 2, 3, 4)); // 10

// 2. Rest with fixed + variable arguments
function greet(greeting, ...names) {
  return `${greeting} ${names.join(', ')}`;
}
console.log('2:', greet('Hello', 'Alice', 'Bob')); // Hello Alice, Bob

// 3. Rest in array destructuring
const [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log('3:', a, b);     // 10 20
console.log('3:', rest);     // [30, 40, 50]

// 4. Rest to ignore unwanted values
const [first, , ...others] = [1, 2, 3, 4, 5];
console.log('4:', first);    // 1
console.log('4:', others);   // [3, 4, 5]

// 5. Rest with object destructuring
const user = { name: 'Alice', age: 25, role: 'admin' };
const { name, ...info } = user;
console.log('5:', name);     // Alice
console.log('5:', info);     // { age: 25, role: 'admin' }

// 6. Rest in nested array destructuring
const nested = [1, [2, 3, 4], 5];
const [x, [y, ...z], w] = nested;
console.log('6:', x, y, z, w); // 1 2 [3, 4] 5

// 7. Rest in function with default values
function logValues(start = 0, ...values) {
  console.log('7: start =', start);
  console.log('7: values =', values);
}
logValues(1, 2, 3); // start = 1, values = [2, 3]

// 8. Rest doesn't work in object literals directly (must be last)
const product = { id: 1, title: 'Pen', price: 2 };
const { id, ...details } = product;
console.log('8:', id);       // 1
console.log('8:', details);  // { title: 'Pen', price: 2 }

// 9. Rest in a variadic function (dynamic arguments)
function multiply(multiplier, ...nums) {
  return nums.map(n => n * multiplier);
}
console.log('9:', multiply(2, 1, 2, 3)); // [2, 4, 6]

// 10. Rest + spread used together
function describeUser({ name, ...details }) {
  return `User: ${name}, Details: ${JSON.stringify(details)}`;
}
console.log('10:', describeUser({ name: 'Tom', age: 32, city: 'NY' }));
// User: Tom, Details: {"age":32,"city":"NY"}



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


// 23 - Short Circuiting (&& and ||)

// Logical OR (||) - Returns the First Truthy Value
console.log(0 || "Hello");  // "Hello"
console.log("" || "Default");  // "Default"
console.log(null || undefined || "JS" || 0);  // "JS"
console.log(false || 0 || "Ajay");  // "Ajay"


// Logical AND (&&) - Returns the First Falsy Value
console.log(1 && 2 && 3);  // 3 (all are truthy, returns last one)
console.log(1 && 0 && 3);  // 0 (returns first falsy value)
console.log("Hello" && "" && "World");  // "" (empty string is falsy)
console.log(true && false && "JavaScript");  // false

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// 24 - The Nullish Coalescing Operator (??)
// The Nullish Coalescing Operator (??) is used to provide a default value only 
// when the left-hand operand is null or undefined. This is useful for distinguishing
//  between null/undefined and other falsy values like 0 or "".

// false, 0, "", null, undefined, NaN

console.log(0 || "Default");   // "Default" (0 is falsy)
console.log(0 ?? "Default");   // 0 (0 is not null or undefined)

console.log("" || "Hello");    // "Hello" ("" is falsy)
console.log("" ?? "Hello");    // "" (empty string is not null or undefined)

console.log(null || "Guest");  // "Guest" (null is falsy)
console.log(null ?? "Guest");  // "Guest" (null is null)

console.log(undefined || "User");  // "User" (undefined is falsy)
console.log(undefined ?? "User");  // "User" (undefined is undefined)










// 25 - Optional Chaining (?.)
// What is Optional Chaining?
// The optional chaining operator (?.) allows safe access to deeply nested 
// object properties without having to manually check for null or undefined.

// 💡 If a property does not exist, ?. returns undefined instead of throwing an error.


// const user = { name: "Ajay" };
// console.log(user.address.city); // ❌ ERROR: Cannot read property 'city' of undefined

// const user = { name: "Ajay" };
// console.log(user.address?.city); // ✅ No error, just returns undefined










// 26 - JavaScript Sets 🚀 
// A Set in JavaScript is a collection of unique values. Unlike arrays,
//  Sets do not allow duplicate elements and are useful when you need to 
//  store unique values efficiently.


// const numbers = new Set([1, 2, 3, 4, 4, 5, 5]);
// console.log(numbers); // Output: Set { 1, 2, 3, 4, 5 }

// 1️⃣ Creating a Set
const numbers = new Set([1, 2, 3, 4, 4, 5, 5]);
console.log("Set:", numbers); // Output: Set { 1, 2, 3, 4, 5 }

// 2️⃣ Adding and Deleting Elements
const fruits = new Set();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Mango");
fruits.add("Apple"); // Duplicate, won't be added
console.log("Fruits Set:", fruits); // Output: Set { 'Apple', 'Banana', 'Mango' }

fruits.delete("Banana");
console.log("After Deleting Banana:", fruits); // Output: Set { 'Apple', 'Mango' }

fruits.clear();
console.log("After Clearing Set:", fruits); // Output: Set {}

// 3️⃣ Checking for Elements
const mySet = new Set(["Apple", "Banana", "Mango"]);
console.log("Has Apple?", mySet.has("Apple")); // true
console.log("Has Orange?", mySet.has("Orange")); // false

// 4️⃣ Getting Set Size
console.log("Size of Set:", mySet.size); // Output: 3

// 5️⃣ Looping Through a Set
console.log("Looping using forEach:");
mySet.forEach(fruit => console.log(fruit));

console.log("Looping using for...of:");
for (const fruit of mySet) {
    console.log(fruit);
}

// 6️⃣ Converting Set to an Array
const fruitArray = [...mySet];
console.log("Converted to Array:", fruitArray); // Output: [ 'Apple', 'Banana', 'Mango' ]

// 7️⃣ Removing Duplicates from an Array using Set
const numbersArray = [1, 2, 3, 3, 4, 4, 5, 5];
const uniqueNumbers = [...new Set(numbersArray)];
console.log("Unique Numbers:", uniqueNumbers); // Output: [1, 2, 3, 4, 5]










// 27 - localStorage 
// ✅ 1. Storing a simple value
localStorage.setItem("username", "Ajay");

// ✅ 2. Retrieving a stored value
console.log(localStorage.getItem("username")); // "Ajay"

// ✅ 3. Removing a specific item
localStorage.removeItem("username");
console.log(localStorage.getItem("username")); // null

// ✅ 4. Storing an object (must be converted to JSON)
const userInfo = { name: "Ajay", age: 25 };
localStorage.setItem("user", JSON.stringify(userInfo));

// ✅ 5. Retrieving and parsing an object
const retrievedUser = JSON.parse(localStorage.getItem("user"));
console.log(retrievedUser.name); // "Ajay"

// ✅ 6. Clearing all localStorage data
localStorage.clear();
console.log(localStorage.length); // 0

// ✅ 7. Storing multiple key-value pairs
localStorage.setItem("user1", "Ajay");
localStorage.setItem("user2", "Soham");

// ✅ 8. Looping through all keys in localStorage
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}

// ✅ 9. Checking if a key exists
if (localStorage.getItem("user1")) {
    console.log("User1 exists!");
} else {
    console.log("User1 does not exist.");
}

// ✅ 10. Using localStorage to save theme preference
document.body.style.backgroundColor = localStorage.getItem("theme") || "white";

document.getElementById("darkModeBtn").addEventListener("click", () => {
    localStorage.setItem("theme", "black");
    document.body.style.backgroundColor = "black";
});

document.getElementById("lightModeBtn").addEventListener("click", () => {
    localStorage.setItem("theme", "white");
    document.body.style.backgroundColor = "white";
});










// 28 -  Promises in JavaScript

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // Change this to false to see rejection
      if (success) {
        resolve("✅ Promise Resolved!");
      } else {
        reject("❌ Promise Rejected!");
      }
    }, 2000);
  });
  
  myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error))
    .finally(() => console.log("✨ Promise Completed!"));

    



    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json(); // Convert response to JSON
    })
    .then(data => console.log("📌 Fetched Data:", data))
    .catch(error => console.log("❌ Error:", error));

    

    async function fetchData() {
        try {
          let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
          if (!response.ok) throw new Error("Failed to fetch data");
          let data = await response.json();
          console.log("📌 User Data:", data);
        } catch (error) {
          console.log("❌ Error:", error);
        }
      }
      fetchData();

      



// Parallel Fetch Requests Using Promise.all()

Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json())
  ])
    .then(([user, post]) => {
      console.log("📌 User:", user);
      console.log("📌 Post:", post);
    })
    .catch(error => console.log("❌ Error:", error));

    



// Canceling Fetch Requests Using AbortController

const controller = new AbortController();
const signal = controller.signal;

fetch("https://jsonplaceholder.typicode.com/todos/1", { signal })
  .then(response => response.json())
  .then(data => console.log("📌 Data:", data))
  .catch(error => console.log("❌ Fetch Aborted:", error));

setTimeout(() => controller.abort(), 100); // Cancel request after 100ms










// 29 -  Throwing Errors Manually

function checkAge(age) {
    if (age < 18) {
      throw new Error("❌ Age must be 18 or above!");
    }
    return "✅ Access granted!";
  }
  
  try {
    console.log(checkAge(16)); // Will throw an error
  } catch (error) {
    console.log("Caught Error:", error.message);
  }

  


// Throwing Custom Errors

class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
  }
  
  function validateNumber(num) {
    if (typeof num !== "number") {
      throw new CustomError("❌ Input must be a number!");
    }
    return "✅ Valid number!";
  }
  
  try {
    console.log(validateNumber("abc")); // Will throw an error
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }

  


// Promise.race()

const p1 = new Promise((resolve) => setTimeout(() => resolve("✅ P1 resolved"), 2000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("✅ P2 resolved"), 1000));
const p3 = new Promise((reject) => setTimeout(() => reject("❌ P3 rejected"), 1500));

Promise.race([p1, p2, p3])
  .then(console.log) // Output: ✅ P2 resolved (because it resolves first in 1s)
  .catch(console.error);





// Promise.allSettled()
const promises = [
    Promise.resolve("✅ Success"),
    Promise.reject("❌ Error occurred"),
    new Promise((resolve) => setTimeout(() => resolve("✅ Delayed success"), 2000)),
  ];
  
  Promise.allSettled(promises).then(console.log);
  
  /* Output:
  [
    { status: "fulfilled", value: "✅ Success" },
    { status: "rejected", reason: "❌ Error occurred" },
    { status: "fulfilled", value: "✅ Delayed success" }
  ]
  */

  
//   ✔ Promise.race() → First resolved or rejected Promise wins.
//   ✔ Promise.allSettled() → Waits for all Promises, never rejects.
//   ✔ Promise.any() → First resolved Promise wins, rejects if all fail.










// 30 - Exporting and Importing in ES6 Modules

// There are two ways to export from a module:
// ✅ Named Exports → Allows multiple exports per file.
// ✅ Default Export → Allows only one export per file.




// Example: Exporting (math.js)

// Exporting multiple values
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export const PI = 3.14159;

// const subtract = (a, b) => a - b;
// const divide = (a, b) => a / b;
// export { subtract, divide };

export default function greet(name) {
    return `Hello, ${name}!`;
  }

  




// Importing named exports
import { add, multiply, PI } from "./math.js";

console.log(add(2, 3));        // Output: 5
console.log(multiply(3, 4));   // Output: 12
console.log(PI);               // Output: 3.14159

import { add as sum, multiply as product } from "./math.js";
console.log(sum(2, 3));   // Output: 5
console.log(product(3, 4)); // Output: 12




// Importing default export (no curly braces needed)
import greet from "./message.js";

console.log(greet("Ajay")); // Output: Hello, Ajay!


export default function logMessage(msg) {
    console.log(`Message: ${msg}`);
  }
  
  export const version = "1.0";
  export const author = "Ajay";
  



  import logMessage, { version, author } from "./utils.js";

  logMessage("Hello!");  // Output: Message: Hello!
  console.log(version);   // Output: 1.0
  console.log(author);    // Output: Ajay

  



// Top-Level await usage in an ES Module
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const data = await response.json();
console.log(data); 











// node -v  # Check Node.js version
// npm -v   # Check NPM version
// npm init
// npm init -y

// npm install package-name

// npm install -g package-name

// npm install jest --save-dev

// npm update package-name

// npm uninstall package-name


// "scripts": {
//   "start": "node app.js",
//   "dev": "nodemon app.js",
//   "test": "jest"
// }
// npm run dev
// npm run test


// npm list

// npm list -g --depth=0

// npm cache clean --force


// npm login
// npm publish


//####################### comments end ######################

// 32 - Comments 

// single line comment 

/*   */  // multi line comment 

//####################### comments end ######################
//####################### error  start ######################
// 33 - Types of the error in the js 

// 1. Syntax Error
// 2. Reference Error
// 3. Type Error
// 4. Range Error
// 5. URI Error
// Custom Errors

//####################### error  end ######################
//####################### time logic start######################

// 34 - timer 

// ✅ 1. setTimeout() — Run a function once after a delay

setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);


// to clear the time out 
// const timeoutId = setTimeout(...);
// clearTimeout(timeoutId);





// ✅ 2. setInterval() — Run a function repeatedly at a fixed interval

const intervalId = setInterval(() => {
  console.log("Repeats every 1 second");
}, 1000);


// ✅ 3. Start / Stop a Timer Example

// Cancel it with
// clearInterval(intervalId);


// <button onclick="startTimer()">Start</button>
// <button onclick="stopTimer()">Stop</button>

// <script>
//   let counter = 0;
//   let timer;

//   function startTimer() {
//     // prevent multiple timers
//     if (timer) return;

//     timer = setInterval(() => {
//       counter++;
//       console.log("Timer:", counter);
//     }, 1000);
//   }

//   function stopTimer() {
//     clearInterval(timer);
//     timer = null;
//     console.log("Timer stopped");
//   }
// </script>




//####################### time logic end  ######################
//####################### optional chaining  logic end  ######################

// Optional chaining (?.) is a feature in JavaScript that allows you to safely access deeply nested 
// properties of an object without throwing an error if a property doesn’t exist.


const user = {
  name: "Alice",
  address: {
    city: "Wonderland",
  },
};

// Safe access using optional chaining
console.log(user.address?.city);       // "Wonderland"
console.log(user.address?.zip);        // undefined
console.log(user.profile?.age);        // undefined (no error!)




const user = {
  getName: () => "Alice",
};

console.log(user.getName?.());     // "Alice"
console.log(user.sayHi?.());       // undefined (doesn’t throw)



const order = {
  customer: {
    name: "Bob",
    payment: {
      method: "Credit Card"
    }
  }
};

// Safe access to deeply nested property
console.log(order.customer?.payment?.method);     // "Credit Card"
console.log(order.customer?.address?.street);     // undefined




//####################### optional chaining end  ######################
//####################### numeric separator start  ######################

// The numeric separator (underscore _) in JavaScript is a feature that improves the 
// readability of large numbers. It does not affect the actual value — it’s purely visual.

const billion = 1_000_000_000;      // Easier to read than 1000000000
const binary = 0b1010_0001_1000_0101;
const hex = 0xFF_EC_DE_5E;
const decimal = 123_456.789_012;




//####################### numeric separator end  ######################

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// The .replaceAll() method in JavaScript is used to replace all occurrences 
// of a substring (or a regex pattern) in a string.

const message = "apple, banana, apple, orange";

const newMessage = message.replaceAll("apple", "mango");

console.log(newMessage);
// Output: "mango, banana, mango, orange"




const text = "Rain rain go away";

const result = text.replaceAll(/rain/gi, "sun");

console.log(result);
// Output: "Sun sun go away"






/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


// ✅ What is Debounce?

// When you debounce a function:
// It delays execution until a certain amount of time has passed since the last call.



function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId); // clear previous timer
    timeoutId = setTimeout(() => {
      func.apply(this, args); // run after delay
    }, delay);
  };
}



<input type="text" id="search" placeholder="Search...">

<script>
  const searchInput = document.getElementById("search");

  function handleSearch(event) {
    console.log("Searching for:", event.target.value);
  }

  const debouncedSearch = debounce(handleSearch, 500);

  searchInput.addEventListener("input", debouncedSearch);
</script>




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 35 - closures

{/* 🔥 Topic 35: Closures in JavaScript
🔤 Definition (in simple words):
A closure is a function that remembers variables from its outer scope, 
even after that outer function has finished executing. */}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 36 - Lexical Scope & Scope Chain  

// Lexical Scope: Variables are accessible based on where they are defined in the code.


function outerFunction() {
    let outerVar = "I am from outer function";

    function innerFunction() {
        console.log(outerVar); // Accessing outerVar from outer function
    }

    innerFunction(); // Call inner function
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 37 - 🪄 Hoisting in JavaScript

/*
🔍 What is Hoisting?
- Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.
- Only declarations are hoisted (not initializations).
- var, function declarations are hoisted.
- let, const are hoisted but remain in a Temporal Dead Zone (TDZ) until their line of declaration.
*/

/* 🔸 1. Hoisting with var */
// ✅ 'x' is hoisted and initialized as undefined.
console.log(x); // Output: undefined
var x = 10;

/* 🔸 2. Hoisting with let and const */
// ❌ let and const are hoisted but not initialized, so accessing them before declaration throws ReferenceError.

// console.log(a); // ❌ ReferenceError
let a = 5;

// console.log(b); // ❌ ReferenceError
const b = 10;

/* 🔸 3. Function Declaration is Fully Hoisted */
// ✅ Function declarations are hoisted with their definitions.
greet(); // Output: Hello

function greet() {
  console.log("Hello");
}

/* 🔸 4. Function Expression is Not Hoisted */
// ❌ Only the variable 'sayHi' is hoisted (as undefined), not the function assignment.
// sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi");
};

/* 🔸 5. Arrow Function with var is Not Hoisted */
// ❌ Same as function expressions. The variable is hoisted as undefined.
// arrow(); // ❌ TypeError: arrow is not a function

var arrow = () => {
  console.log("Arrow Function");
};

/* 📘 Summary Table

| Type                        | Hoisted? | Initialized? | Can Use Before Declare? |
|-----------------------------|----------|---------------|--------------------------|
| var                         | ✅ Yes   | ✅ Yes         | ✅ Yes (undefined)       |
| let / const                 | ✅ Yes   | ❌ No          | ❌ ReferenceError        |
| function declaration        | ✅ Yes   | ✅ Yes         | ✅ Yes                   |
| function expression (var)   | ✅ (var) | ❌ No          | ❌ TypeError             |
| arrow function (with var)   | ✅ (var) | ❌ No          | ❌ TypeError             |

*/

/* 🧪 Practice Example */
function test() {
  console.log(a); // ✅ undefined (var is hoisted)
  var a = 5;

  // ❌ ReferenceError: Cannot access 'b' before initialization
  // console.log(b);
  let b = 10;
}
test();



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 38 - 🧠 Execution Context (Global & Functional)

/*
🔍 What is an Execution Context?
- It's the environment where JavaScript code is executed.
- Every time a function is invoked, a new Execution Context is created.

There are 3 main types:
1. Global Execution Context (GEC)
2. Functional Execution Context (FEC)
3. Eval Execution Context (rarely used)

---

📘 1. Global Execution Context:
- Created when JS file starts executing.
- It contains:
  ✅ Global Object (in browser: window)
  ✅ this keyword (points to global object)
  ✅ Memory for variables & functions

*/

var globalVar = "I'm global";

function showGlobal() {
  console.log(globalVar); // Accessible from GEC
}

showGlobal();

/*
📘 2. Functional Execution Context:
- Created whenever a function is called.
- It has its own:
  ✅ Variable Environment (local memory)
  ✅ Scope Chain (access to parent scopes)
  ✅ this keyword (depends on how function is called)

JavaScript uses a **Call Stack** to manage Execution Contexts.
*/

// Example:
function outer() {
  var outerVar = "I'm outer";

  function inner() {
    var innerVar = "I'm inner";
    console.log(outerVar); // ✅ Can access outer scope
    console.log(innerVar); // ✅ Local variable
  }

  inner();
}

outer();

/*
📘 Execution Flow:

Step 1: GEC is created → `outer` is placed in memory
Step 2: `outer()` is called → New FEC for outer
Step 3: `inner()` is called → New FEC for inner
Step 4: inner() finishes → inner FEC is removed
Step 5: outer() finishes → outer FEC is removed

Stack looks like:
|--------------------------|
| inner() Execution Context|
| outer() Execution Context|
| Global Execution Context |
|--------------------------|

*/

// 🔄 Practice Example:
function sum(a, b) {
  function log() {
    console.log("Adding", a, "+", b);
  }

  log(); // From inner FEC, uses outer scope (closure)
  return a + b;
}

console.log("Result:", sum(5, 7)); // Result: 12

/*
🧠 Summary:
- Each function call creates a new Execution Context.
- Execution Contexts are managed via Call Stack.
- Functions can access their outer variables (Lexical Scope).
- Once execution finishes, context is removed from stack.
*/




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 39 - 📚 Call Stack in JavaScript

/*
🔍 What is the Call Stack?
- The Call Stack is a data structure used by JavaScript to manage function invocation.
- It works on the principle of **LIFO (Last In, First Out)**.
- Each time a function is called, it is **pushed onto the stack**.
- When a function finishes, it is **popped off the stack**.

📌 Only one thing runs at a time in JavaScript (it's single-threaded),
so the Call Stack plays a crucial role in handling function execution.
*/

// 🧪 Example 1: Simple Call Stack
function functionOne() {
  console.log("Function One Start");
  functionTwo();
  console.log("Function One End");
}

function functionTwo() {
  console.log("Function Two Start");
  functionThree();
  console.log("Function Two End");
}

function functionThree() {
  console.log("Function Three Start");
  console.log("Function Three End");
}

functionOne();

/*
📘 What happens in the Call Stack:

Step 1: functionOne() is called → pushed to the stack
Step 2: functionOne() calls functionTwo() → pushed to the stack
Step 3: functionTwo() calls functionThree() → pushed to the stack
Step 4: functionThree() finishes → popped from the stack
Step 5: functionTwo() finishes → popped from the stack
Step 6: functionOne() finishes → popped from the stack

🧠 Final Output:
Function One Start
Function Two Start
Function Three Start
Function Three End
Function Two End
Function One End
*/

// 🧪 Example 2: Stack Overflow Error (infinite recursion)
function sayHello() {
  sayHello(); // ❌ Recursive call with no exit condition
}
// sayHello(); // ❌ Un-commenting will cause: "Maximum call stack size exceeded"

/*
🚨 Stack Overflow:
- Happens when functions keep calling themselves without an end.
- JS engine keeps adding them to the stack until it runs out of memory.

🧠 Summary:
- The Call Stack is like a stack of plates — last in, first out.
- JS uses it to keep track of where it is in code.
- You can view the call stack in browser DevTools (Sources > Call Stack).
*/




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 40 - 🔄 Event Loop (Microtask vs Macrotask Queue)

/*
🔍 What is the Event Loop?
- JavaScript is single-threaded but handles async code using an Event Loop.
- The Event Loop manages execution between:
  ✅ Call Stack (where sync code runs)
  ✅ Task Queues (for async code)

There are two main types of queues:
1. 📦 Macrotask Queue (a.k.a. Task Queue)
2. 🧵 Microtask Queue (higher priority)

---

📦 Macrotasks include:
- setTimeout
- setInterval
- setImmediate (Node.js)
- UI rendering

🧵 Microtasks include:
- Promise callbacks (.then/.catch/.finally)
- queueMicrotask
- MutationObserver

🔁 Execution Order:
1. Run all synchronous code (call stack)
2. Run all microtasks in the Microtask Queue
3. Then take one task from the Macrotask Queue
4. Repeat

This order ensures **promises run before setTimeout**, even if both have delay 0.
*/

// 🧪 Example 1: Promise vs setTimeout
console.log("Start");

setTimeout(() => {
  console.log("Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise");
});

console.log("End");

/*
🧠 Output:
Start
End
Microtask: Promise
Macrotask: setTimeout

Why? Because:
- "Start" and "End" run in the main call stack (synchronous)
- Promise (microtask) runs before setTimeout (macrotask)

*/

// 🧪 Example 2: Multiple Microtasks
console.log("A");

queueMicrotask(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
console.log("D");

/*
🧠 Output:
A
D
B
C
(Microtasks B and C run after sync code but before macrotasks)
*/

// 🧪 Example 3: setTimeout vs Promise inside setTimeout
setTimeout(() => {
  console.log("Timeout 1");

  Promise.resolve().then(() => {
    console.log("Microtask inside Timeout");
  });

}, 0);

/*
🧠 Output:
Start of main code...
Timeout 1
Microtask inside Timeout
Why? Because:
- Macrotask executes (Timeout 1)
- Then microtask (inside that macrotask) runs immediately before next macrotask
*/

/*
🔚 Summary:
- Event Loop manages async execution
- Microtasks (Promise, queueMicrotask) run before Macrotasks (setTimeout)
- Always clear the call stack first, then run all microtasks, then one macrotask

🧪 Visual Order:
Call Stack → Microtask Queue → Macrotask Queue
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 41 - 🚦 Debouncing & Throttling in JavaScript

/*
🔍 Why Do We Need Them?
- When events like `scroll`, `resize`, or `input` fire rapidly, they can overload the browser.
- Debouncing and throttling help optimize performance by **limiting how often functions run**.

---

📘 DEBOUNCING:
- Debounce ensures that a function is executed **only after a certain delay** once the event has stopped firing.
- Used in: search input, form validation, resize handling

🔁 Example:
- If user types continuously, debounce waits until the user **stops typing** for a certain time before running the function.
*/

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 🧪 Usage Example:
function handleSearchInput(e) {
  console.log("Searching for:", e.target.value);
}

const debouncedSearch = debounce(handleSearchInput, 500);
document.getElementById("searchInput")?.addEventListener("input", debouncedSearch);

/*
🧠 Behavior: Only runs `handleSearchInput` 500ms *after typing stops*.
*/

// -----------------------------------------

/*
📘 THROTTLING:
- Throttle ensures a function is **called at most once in every X milliseconds**, no matter how often the event occurs.
- Used in: scroll events, API rate limits, window resize

🔁 Example:
- If you scroll 100 times per second, throttling ensures function only runs every fixed interval (e.g., every 200ms)
*/

function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 🧪 Usage Example:
function handleScroll() {
  console.log("Scroll event:", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(handleScroll, 1000);
window.addEventListener("scroll", throttledScroll);

/*
🧠 Behavior: Even if scroll fires 100 times/sec, `handleScroll` will run once per second.

---

📌 Summary:

| Feature    | Debounce                          | Throttle                          |
|------------|-----------------------------------|-----------------------------------|
| When it runs | After the event stops             | At regular intervals              |
| Use case   | Search input, resize, validation  | Scroll, drag, resize              |
| Timer reset | Every event                      | Does not reset on every call      |

✅ Both patterns improve performance and prevent unnecessary function calls.
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 42 - 🧹 Memory Management & Garbage Collection in JavaScript

/*
🔍 What is Memory Management?
- Memory is allocated when variables, objects, functions are created.
- Memory is freed (deallocated) when they are no longer needed.

JavaScript automatically manages memory using **Garbage Collection (GC)**.
You don’t need to manually free memory — but understanding how it works helps avoid memory leaks.
*/

/*
📘 How JavaScript Allocates Memory:
- Primitives (string, number, boolean) are stored directly in memory.
- Objects, arrays, and functions are stored in the heap, and references are kept in variables.

Example:
*/

let num = 100;              // Stored directly (primitive)
let obj = { name: "Ajay" }; // Stored in heap, variable `obj` holds reference

/*
📦 JavaScript Garbage Collection:
- JS engine uses **mark-and-sweep algorithm**.
- When an object becomes **unreachable**, it is automatically removed from memory.

🧠 An object is unreachable when:
- No variable or closure can access it
- It goes out of scope and is no longer referenced
*/

// 🧪 Example 1: Object becomes unreachable
let user = {
  name: "Ajay",
};

user = null; // ✅ The original object is now eligible for garbage collection

// 🧪 Example 2: Scope-based memory release
function createGreeting() {
  const name = "Ajay"; // allocated
  return `Hello, ${name}`;
}
createGreeting(); // name is cleaned up after function returns

/*
🚨 Common Cause of Memory Leaks:
1. Global variables not cleared
2. Closures that keep unnecessary references
3. DOM elements not removed properly
4. Timers or intervals not cleared
*/

// 🧪 Example 3: Memory Leak via setInterval
function startLeaking() {
  const data = new Array(1000000).fill("leak");
  setInterval(() => {
    console.log("Leaking...", data[0]); // ❌ Memory leak: data never gets collected
  }, 1000);
}
// startLeaking(); // ⚠️ Don't run this in production

/*
✅ Best Practices to Avoid Leaks:
- Use local variables inside functions where possible
- Clear intervals and event listeners when not needed
- Avoid global variables unless necessary
- Nullify references if you’re done with them
*/

// 🧹 Manual cleanup example
let myElement = document.getElementById("some-element");
// Later:
myElement = null; // ✅ Helps release memory if not used again

/*
📌 Summary:
- JavaScript manages memory for you using garbage collection
- Objects become eligible for cleanup when unreachable
- You can avoid memory leaks by writing clean, limited-scope code
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 43 - 🔍 `this` Keyword in Different Contexts

/*
📘 What is `this` in JavaScript?
- `this` refers to the **object that is executing the current function**.
- The value of `this` depends on **how** the function is called, not where it is defined.
*/

// 🔸 1. In Global Scope (non-strict mode)
console.log(this); // 👉 In browser: `window` object

// 🔸 2. Inside a Regular Function (non-strict mode)
function regularFunction() {
  console.log("Regular Function:", this);
}
regularFunction(); // 👉 In browser: `window`, in strict mode: `undefined`

// 🔸 3. Inside a Method (Object's function)
const obj = {
  name: "Ajay",
  greet: function () {
    console.log("Method this:", this.name); // 👉 `this` refers to `obj`
  },
};
obj.greet(); // Output: "Ajay"

// 🔸 4. Arrow Function inside Object
const obj2 = {
  name: "Ajay",
  greet: () => {
    console.log("Arrow Function this:", this.name);
  },
};
obj2.greet(); // ❌ `this` is not `obj2` — it’s inherited from parent (likely `window` or `undefined`)

// 🔸 5. Inside a Constructor Function
function Person(name) {
  this.name = name;
  this.sayHi = function () {
    console.log("Hi, I'm", this.name);
  };
}
const p1 = new Person("Ajay");
p1.sayHi(); // 👉 `this` refers to the instance created by `new`

// 🔸 6. Manually binding `this` using call, apply, bind
const user = {
  name: "Bind Example",
};
function showName() {
  console.log("Manually bound this:", this.name);
}
showName.call(user);  // 👉 `this` is user
showName.apply(user); // 👉 same as call
const bound = showName.bind(user);
bound();              // 👉 bound permanently to user

// 🔸 7. In Event Listeners
const button = document.getElementById("btn");
button?.addEventListener("click", function () {
  console.log("Event Listener this:", this); // 👉 refers to the element (`button`)
});

// ❌ Arrow function in event listener
button?.addEventListener("click", () => {
  console.log("Arrow in Event:", this); // ❌ `this` refers to enclosing scope, not the element
});

/*
📌 Summary Table:

| Context                         | What `this` refers to                            |
|--------------------------------|--------------------------------------------------|
| Global scope                   | `window` (non-strict), `undefined` (strict)     |
| Regular function               | `window` or `undefined`                         |
| Method (obj.func)              | The object before dot (`obj`)                   |
| Arrow function                 | Inherits `this` from surrounding lexical scope  |
| Constructor function           | The newly created object                        |
| call/apply/bind                | Manually set `this`                             |
| DOM Event Listener (normal fn) | The DOM element that triggered the event        |
| DOM Event Listener (arrow fn)  | The surrounding (lexical) `this`                |
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 44 - 🔨 Constructor Functions in JavaScript

/*
📘 What is a Constructor Function?
- A **constructor function** is a special function used to create and initialize objects.
- It's called using the `new` keyword.
- By convention, constructor function names are written in **PascalCase** (FirstLetterCapitalized).
*/

// 🔸 1. Basic Constructor Example
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  };
}

const ajay = new Person("Ajay", 25);
ajay.greet(); // Hi, I'm Ajay and I'm 25 years old.

const sam = new Person("Sam", 30);
sam.greet(); // Hi, I'm Sam and I'm 30 years old.

/*
🧠 What Happens When You Use `new Person("Ajay", 25)`:
1. A new empty object is created: {}
2. The `this` keyword is set to that new object.
3. The object gets linked to Person.prototype.
4. The constructor function runs and assigns properties to `this`.
5. The object is returned.
*/

// 🔸 2. Constructor Without `new` (Mistake!)
const broken = Person("Broken", 40);
console.log(broken); // undefined
console.log(window.name); // 😱 "Broken" (in browser: assigned to global object!)

/*
✅ Always use `new` when calling a constructor.
Otherwise, `this` will refer to the global object (or be undefined in strict mode).
*/

// 🔸 3. Adding Shared Methods Using Prototype (Memory-efficient)
function Car(model) {
  this.model = model;
}

Car.prototype.drive = function () {
  console.log(`${this.model} is driving.`);
};

const tesla = new Car("Tesla");
tesla.drive(); // Tesla is driving.

/*
🧠 Benefit:
- Functions like `drive()` are shared across all instances.
- Memory efficient, since method is not recreated per object.
*/

// 🔸 4. Constructor Function vs Factory Function
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hello, ${this.name}`);
    },
  };
}

const user1 = createUser("Mike", 22);
user1.greet(); // Hello, Mike

/*
✅ Factory functions return object manually.
✅ Constructor functions use `this` and return happens automatically.
*/

// 🧪 Quiz:
function Animal(type) {
  this.type = type;
}
const dog = new Animal("Dog");
console.log(dog.type); // What will this print?

/*
📌 Summary:

| Feature              | Constructor Function              |
|----------------------|-----------------------------------|
| Used with `new`      | Yes                               |
| Uses `this`          | Yes (binds to new object)         |
| Returns              | Automatically returns the object  |
| Name style           | PascalCase (Capitalized)          |
| Memory efficiency    | Better with prototype methods     |
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 45 - 🧬 Prototypes and Prototype Chain

/*
📘 What is a Prototype?
- In JavaScript, every object has an internal link to another object called its **prototype**.
- This prototype object can also have a prototype, forming a **prototype chain**.
- This chain continues until it reaches `null` (end of the chain).

👨‍👧 Think of it like inheritance — objects can inherit properties/methods from their prototypes.
*/

// 🔸 1. Basic Prototype Example
const person = {
  greet() {
    console.log("Hello!");
  },
};

const ajay = Object.create(person); // ajay is an empty object, prototype is `person`

ajay.name = "Ajay";
ajay.greet(); // Output: Hello! (from prototype)

/*
Even though `greet()` is not a property of `ajay`, JS engine looks up the prototype chain and finds it in `person`.
*/

// 🔸 2. Constructor Function with Prototypes
function Animal(name) {
  this.name = name;
}

Animal.prototype.sound = function () {
  console.log(`${this.name} makes a sound.`);
};

const dog = new Animal("Dog");
dog.sound(); // Dog makes a sound

/*
🧠 `dog` doesn't have a `sound` method.
But it's found in Animal.prototype (via the prototype chain).
*/

// 🔸 3. The Prototype Chain in Action
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of the chain)

/*
🔗 Prototype Chain:
dog → Animal.prototype → Object.prototype → null
*/

// 🔸 4. Overriding Prototype Properties
dog.sound = function () {
  console.log(`${this.name} barks!`);
};
dog.sound(); // Dog barks!

delete dog.sound;
dog.sound(); // Dog makes a sound (falls back to prototype)

// 🔸 5. hasOwnProperty check
console.log(dog.hasOwnProperty("name"));  // true
console.log(dog.hasOwnProperty("sound")); // false (it's inherited)

// 🔸 6. Don't Extend Built-In Prototypes in Real Code!
String.prototype.sayHello = function () {
  return "Hello, " + this;
};

console.log("Ajay".sayHello()); // Works but not recommended in production

/*
📌 Summary:

| Term             | Meaning                                        |
|------------------|------------------------------------------------|
| `__proto__`      | Refers to the object's prototype               |
| `prototype`      | Special property on constructor functions      |
| Inheritance      | Object gets properties from its prototype      |
| Chain End        | Object.prototype → null                        |
| Look-up process  | JS searches properties up the chain            |

✅ Use prototypes for method sharing (efficient memory)
❌ Don't modify built-in prototypes (e.g., Array.prototype)
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 46 - 🏛️ Classes & Inheritance

/*
📘 What are Classes?
- Classes are syntactic sugar over constructor functions and prototypes.
- Introduced in ES6 to make object-oriented programming easier and cleaner.

📘 What is Inheritance?
- Inheritance allows one class (child) to use the properties and methods of another class (parent).
*/

// 🔸 1. Basic Class Syntax
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const ajay = new Person("Ajay", 25);
ajay.greet(); // Hi, I'm Ajay and I'm 25 years old

// 🔸 2. Class Inheritance using `extends`
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // Call the parent constructor
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying in grade ${this.grade}.`);
  }
}

const student1 = new Student("Riya", 18, "12th");
student1.greet();  // From Person class
student1.study();  // From Student class

// 🔸 3. Method Overriding
class Developer extends Person {
  greet() {
    console.log(`👨‍💻 Developer ${this.name} is coding.`);
  }
}

const dev = new Developer("Rahul", 30);
dev.greet(); // 👨‍💻 Developer Rahul is coding

// 🔸 4. Static Methods
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtils.add(10, 20)); // 30

/*
🧠 Static methods belong to the class itself, not to instances.
They’re used for utility/helper functions.
*/

// 🔸 5. Getters and Setters
class Product {
  constructor(name, price) {
    this._name = name;
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (value > 0) {
      this._price = value;
    } else {
      console.log("Invalid price");
    }
  }
}

const pen = new Product("Pen", 10);
console.log(pen.price); // 10
pen.price = 20;         // sets price to 20
pen.price = -5;         // Invalid price

/*
📌 Summary Table

| Concept         | Description                                         |
|-----------------|-----------------------------------------------------|
| class           | Defines blueprint for objects                       |
| constructor     | Initializes the object                              |
| extends         | Enables inheritance                                 |
| super()         | Calls parent class constructor                      |
| static method   | Belongs to class, not to instances                  |
| getter/setter   | Control access to object properties                 |
| method override | Redefines a parent method in child class           |
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 47 - 🏗️ Object.create() and Factory Functions

/*
🔹 OBJECT.CREATE()

📘 What is Object.create()?
- `Object.create()` creates a new object and sets its **prototype** to the object you provide.
- It's an alternative to using constructor functions or classes.
- Gives direct control over the prototype chain.
*/

// 🔸 1. Basic Example of Object.create()
const personPrototype = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const ajay = Object.create(personPrototype);
ajay.name = "Ajay";
ajay.greet(); // Hello, my name is Ajay

/*
🧠 Here, `ajay` is an object that **inherits** from `personPrototype`.
- personPrototype is the prototype of ajay.
- You can check using: `Object.getPrototypeOf(ajay) === personPrototype` → true
*/


// 🔸 2. Adding properties during creation
const user = Object.create(personPrototype, {
  name: { value: "Riya", writable: true, enumerable: true },
});
user.greet(); // Hello, my name is Riya

/*
🧠 The second argument to Object.create() is a property descriptor map
(similar to Object.defineProperty)
*/


// 🔹 FACTORY FUNCTIONS

/*
📘 What is a Factory Function?
- A function that returns a new object.
- Unlike constructors, you don't use `new`, and you return the object manually.
*/

// 🔸 3. Basic Factory Function Example
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${name}, age ${age}`);
    },
  };
}

const user1 = createUser("Sam", 30);
user1.greet(); // Hi, I'm Sam, age 30

/*
✅ Factory functions are useful when:
- You want to avoid `this` and `new`
- You want to create multiple similar objects
*/


// 🔸 4. Factory Function + Object.create()
const personMethods = {
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
};

function createPerson(name) {
  const person = Object.create(personMethods);
  person.name = name;
  return person;
}

const p1 = createPerson("Dev");
p1.greet(); // Hi, I'm Dev

/*
🧠 This is a powerful pattern:
- You keep shared methods in one object (`personMethods`)
- Each new object created by `createPerson()` gets that as prototype
- Memory efficient (like using prototype in constructors)
*/


/*
📌 Summary:

| Feature                | Object.create()                      | Factory Function                         |
|------------------------|--------------------------------------|-------------------------------------------|
| Purpose                | Create object with specific prototype| Return object from a function             |
| Use prototype?         | Yes                                  | Not by default (but can with Object.create)|
| Uses `new` keyword?    | No                                   | No                                        |
| Uses `this`?           | Optional                             | No                                        |
| Memory efficiency      | High (if methods on prototype)       | Medium (unless prototype used manually)   |

✅ Use Object.create() for prototype-based inheritance
✅ Use Factory Functions for flexible object creation without `this` or `new`
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 48 - ⏳ async and await in JavaScript (In Detail)

/*
📘 What is async/await?
- `async` and `await` are modern syntax for handling asynchronous operations.
- They make asynchronous code look and behave more like synchronous code.
- Built on top of **Promises**.

🧠 Why use async/await?
- Cleaner and more readable than `.then()` and `.catch()`
- Easier error handling with `try...catch`
*/

// 🔸 1. Basic async function
async function greet() {
  return "Hello"; // returns a Promise automatically
}

greet().then(msg => console.log(msg)); // Output: Hello

/*
🧠 An async function always returns a Promise.
Even if you return a string, JS wraps it in a resolved Promise.
*/

// 🔸 2. Using await (only inside async functions)
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSteps() {
  console.log("Step 1");
  await wait(1000); // wait for 1 second
  console.log("Step 2");
  await wait(1000);
  console.log("Step 3");
}

showSteps();
/*
Output:
Step 1
(wait 1 sec)
Step 2
(wait 1 sec)
Step 3
*/

// 🔸 3. Fetching API data using async/await
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
fetchData();

// 🔸 4. Error handling with try...catch
async function getUser(id) {
  try {
    if (!id) throw new Error("ID is required");
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    console.log(user.name);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
getUser(1);
getUser(); // Triggers manual error

// 🔸 5. await in loops (sequential vs parallel)
const ids = [1, 2, 3];

// Sequential (waits one by one)
async function loadUsersSequential() {
  for (let id of ids) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    console.log("Sequential:", user.name);
  }
}

// Parallel using Promise.all
async function loadUsersParallel() {
  const promises = ids.map(id =>
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json())
  );
  const users = await Promise.all(promises);
  users.forEach(user => console.log("Parallel:", user.name));
}

/*
✅ Use sequential when order or timing matters
✅ Use parallel (Promise.all) for better performance when independent
*/

/*
📌 Summary:

| Concept        | Description                              |
|----------------|------------------------------------------|
| async function | Always returns a Promise                 |
| await          | Pauses inside async until Promise resolves |
| try...catch    | Handles errors in async/await            |
| await in loop  | Slower (sequential) or use Promise.all   |

🔄 async/await = cleaner syntax for promises

✅ async/await makes code easier to read and maintain.
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


// 49 - 🌐 Fetch API + Real-world API Calls

/*
📘 What is Fetch API?
- Fetch API is used to make HTTP requests from the browser.
- It returns a **Promise** that resolves to the Response object.

✅ Common uses:
- Get data from APIs
- Post data to a server
- Handle REST APIs (CRUD)
*/

// 🔸 1. Basic GET request using fetch()
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json()) // convert response to JSON
  .then(data => console.log("GET:", data))
  .catch(error => console.error("Error:", error));

/*
🧠 Steps:
1. `fetch()` sends GET request
2. `.then(response => response.json())` parses the response body
3. `.then(data => ...)` handles the final data
*/

// 🔸 2. Using async/await with fetch (cleaner)
async function fetchPost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await response.json();
    console.log("Async GET:", post);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
fetchPost(2);

// 🔸 3. POST request with fetch()
async function createPost() {
  const newPost = {
    title: "Learn Fetch",
    body: "Using the Fetch API in JS",
    userId: 1,
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    console.log("POST Success:", data);
  } catch (err) {
    console.error("POST Error:", err.message);
  }
}
createPost();

// 🔸 4. PUT request (update)
async function updatePost(id) {
  const updatedData = {
    title: "Updated Title",
    body: "Updated body content",
  };

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const result = await response.json();
  console.log("PUT Result:", result);
}
updatePost(1);

// 🔸 5. DELETE request
async function deletePost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    console.log(`Post ${id} deleted successfully.`);
  } else {
    console.log("Delete failed.");
  }
}
deletePost(3);

/*
📌 Summary:

| Method  | Action             | Use                        |
|---------|--------------------|----------------------------|
| GET     | Fetch data         | Read from API              |
| POST    | Create new resource| Send data to server        |
| PUT     | Replace resource   | Update data completely     |
| PATCH   | Partially update   | Change a specific field    |
| DELETE  | Remove resource    | Delete from server         |

✅ Fetch API is promise-based and powerful
✅ Use `try/catch` with async/await for clean error handling
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 50 - 🚨 Error Handling in async/await

/*
📘 Why Error Handling Matters?
- When using `async/await`, errors can occur due to:
  ✅ Invalid URLs
  ✅ Server issues
  ✅ Network problems
  ✅ JSON parsing errors
- You should always use `try...catch` with async/await for clean and safe error handling.
*/

// 🔸 1. Basic Error Handling Example
async function fetchUserData(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();
    console.log("User:", data);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}
fetchUserData(1);   // ✅ Success
fetchUserData(999); // ❌ Triggers manual error

/*
🧠 `res.ok` checks HTTP status (true for 2xx responses)
If not OK, we throw a custom error.
*/

// 🔸 2. Catching Network Errors
async function fetchInvalidURL() {
  try {
    const res = await fetch("https://invalid.api.url");
    const data = await res.json(); // ❌ never reached
  } catch (err) {
    console.error("Network Error:", err.message);
  }
}
fetchInvalidURL();

/*
✅ Catch block handles:
- Network failures
- CORS issues
- Syntax errors
- JSON errors
*/

// 🔸 3. Using `finally` with async/await
async function loadAppData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("Loaded:", data);
  } catch (err) {
    console.warn("Something went wrong:", err.message);
  } finally {
    console.log("✅ Always runs: hide loader, cleanup...");
  }
}
loadAppData();

/*
📌 Summary:

| Block      | Use case                                |
|------------|------------------------------------------|
| try        | Run risky async code                     |
| catch      | Handle errors from await or throw        |
| finally    | Run cleanup code regardless of success   |

✅ Always use try...catch with async/await in real-world apps
✅ Check `res.ok` to handle server errors manually
✅ Use `finally` to stop loaders, cleanup memory, etc.
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 51 - 🔗 Chaining and Parallel Fetching in JavaScript

/*
📘 What is Chaining in async/await?
- Chaining means making one request after another where the next depends on the previous.

📘 What is Parallel Fetching?
- Fetch multiple resources at the same time (in parallel) using `Promise.all()` for better performance.

🧠 Sequential = Wait → Wait → Wait
🧠 Parallel = All wait together → Done
*/

// 🔸 1. Chaining (Sequential Requests)
async function fetchChained() {
  try {
    const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await userRes.json();

    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await postRes.json();

    console.log("User:", user.name);
    console.log("Posts:", posts.map(p => p.title));
  } catch (err) {
    console.error("Chain Error:", err.message);
  }
}
fetchChained();

/*
✅ Here, we first fetch the user.
✅ Then, based on their ID, we fetch their posts.
*/

// 🔸 2. Parallel Fetching with Promise.all()
async function fetchParallel() {
  try {
    const urls = [
      "https://jsonplaceholder.typicode.com/posts/1",
      "https://jsonplaceholder.typicode.com/posts/2",
      "https://jsonplaceholder.typicode.com/posts/3",
    ];

    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(promises);

    results.forEach((post, index) => {
      console.log(`Post ${index + 1}:`, post.title);
    });
  } catch (err) {
    console.error("Parallel Fetch Error:", err.message);
  }
}
fetchParallel();

/*
🧠 Promise.all() waits for all requests in parallel.
⚠️ If one promise fails, the whole `.all()` fails. Use `.allSettled()` if you want to handle individual results.

✅ Use parallel fetching to improve speed when calls are independent.
✅ Use chaining when each request depends on the result of the previous.
*/

// 🔸 3. Parallel + Safe (using Promise.allSettled)
async function fetchSafeParallel() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://wrong.url.com/abc", // ❌ fails
    "https://jsonplaceholder.typicode.com/posts/3",
  ];

  const promises = urls.map(url =>
    fetch(url).then(res => res.json())
  );

  const results = await Promise.allSettled(promises);

  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      console.log(`✅ Post ${i + 1}:`, res.value.title);
    } else {
      console.warn(`❌ Failed for Post ${i + 1}:`, res.reason.message);
    }
  });
}
fetchSafeParallel();

/*
📌 Summary:

| Type             | Purpose                        | Best For                          |
|------------------|--------------------------------|------------------------------------|
| Chaining         | Sequential requests            | When next request needs previous  |
| Promise.all      | Parallel, fail on first error  | Fast results when all must succeed|
| Promise.allSettled| Parallel, no fail if one fails | Resilient batch operations         |

✅ Master both for professional-grade async work.
*/


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 54 - 🧬 Shallow Copy vs Deep Copy in JavaScript

/*
📘 What is a Copy in JavaScript?
- A copy is when you duplicate the value of a variable into another variable.
- For primitive values (string, number, boolean), a real copy is made.
- For objects/arrays, a **reference** is copied — unless we manually perform a copy.

There are two types:
1. 🔹 Shallow Copy – only top-level is copied
2. 🔸 Deep Copy – full recursive copy of nested structures
*/

// 🔸 1. Primitive Example (copied by value)
let a = 10;
let b = a;
b = 20;
console.log("a:", a); // 10
console.log("b:", b); // 20

// 🔹 2. Reference Example (copied by reference)
const obj1 = { name: "Ajay" };
const obj2 = obj1;
obj2.name = "Sam";
console.log("obj1:", obj1.name); // Sam (affected)
console.log("obj2:", obj2.name); // Sam

/*
Both obj1 and obj2 point to the same object in memory.
*/

// 🔸 3. Shallow Copy using spread (...)
const original = {
  name: "Ajay",
  address: {
    city: "Pune",
    pin: 123456,
  },
};

const shallow = { ...original };
shallow.name = "Sam";          // ✅ Affects only `shallow`
shallow.address.city = "Delhi" // ❌ Mutates `original.address.city`

console.log("Original:", original.address.city); // Delhi
console.log("Shallow:", shallow.address.city);   // Delhi

/*
🧠 Spread operator only creates a one-level copy. Nested objects are still linked.
*/

// 🔸 4. Deep Copy using JSON methods
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Mumbai";

console.log("Original:", original.address.city); // Delhi
console.log("Deep:", deep.address.city);         // Mumbai

/*
✅ JSON method creates a full deep copy.
❌ Limitations: can't copy functions, undefined, circular references, Dates, Maps, Sets
*/

// 🔸 5. Deep Copy using structuredClone (modern, recommended)
const deepClone = structuredClone(original);
deepClone.address.city = "Chennai";

console.log("Original:", original.address.city);  // Delhi
console.log("Structured Clone:", deepClone.address.city); // Chennai

/*
✅ structuredClone is modern and works with Dates, Maps, Sets, Arrays, nested objects, etc.
❌ Not supported in very old browsers
*/

// 🔸 6. Deep Copy with Libraries (Lodash)
/// npm install lodash
// import cloneDeep from 'lodash/cloneDeep';
// const copied = cloneDeep(original);

/*
📌 Summary Table:

| Type         | Technique               | Copies Nested? | Limitations                        |
|--------------|--------------------------|----------------|------------------------------------|
| Shallow Copy | Object.assign(), spread  | ❌ No           | Nested objects still linked        |
| Deep Copy    | JSON.parse(JSON.stringify)| ✅ Yes         | No functions, Dates, circular refs |
| Deep Copy    | structuredClone()        | ✅ Yes         | Modern browsers only               |
| Deep Copy    | cloneDeep (lodash)       | ✅ Yes         | Requires library                   |
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 55 - 📦 JSON Methods in JavaScript: parse() and stringify()

/*
📘 What is JSON?
- JSON (JavaScript Object Notation) is a lightweight format to store and exchange data.
- It is used to send/receive data between a client and a server.
- It looks like JavaScript object syntax, but it's actually a string.

✅ Two main methods:
1. JSON.stringify() – Convert JS object to JSON string
2. JSON.parse() – Convert JSON string back to JS object
*/

// 🔸 1. JSON.stringify() – Object to JSON String
const user = {
  name: "Ajay",
  age: 25,
  skills: ["JS", "React"],
};

const jsonString = JSON.stringify(user);
console.log("JSON String:", jsonString);
/*
Output:
{"name":"Ajay","age":25,"skills":["JS","React"]}
*/

// 🔸 2. JSON.parse() – JSON String to Object
const backToObject = JSON.parse(jsonString);
console.log("Parsed Object:", backToObject);
/*
Output:
{ name: "Ajay", age: 25, skills: ["JS", "React"] }
*/

// 🔸 3. Use in real-world (API response)
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json()) // ⬅️ res.json() uses JSON.parse under the hood
  .then(data => console.log("API Data:", data));

// 🔸 4. stringify() removes functions and undefined
const sample = {
  name: "Code",
  doSomething: () => console.log("Hello"),
  temp: undefined,
};

console.log("Stringify:", JSON.stringify(sample));
/*
Output: {"name":"Code"}
Functions & undefined are ignored.
*/

// 🔸 5. Pretty Printing (indentation for readability)
console.log(JSON.stringify(user, null, 2));
/*
{
  "name": "Ajay",
  "age": 25,
  "skills": ["JS", "React"]
}
*/

// 🔸 6. Use JSON.parse(JSON.stringify()) for deep copy
const deepCopy = JSON.parse(JSON.stringify(user));
deepCopy.name = "Riya";
console.log("Original:", user.name);     // Ajay
console.log("Copied:", deepCopy.name);   // Riya

/*
✅ Deep copy for simple objects only
❌ Does not support:
- Functions
- Symbols
- Date objects (converted to strings)
- undefined
- Circular references
*/

// 🔸 7. Errors – Catching Invalid JSON
try {
  const broken = JSON.parse("{name: 'Ajay'}"); // ❌ Invalid JSON (keys must be in double quotes)
} catch (err) {
  console.error("Parse Error:", err.message);
}

/*
📌 Summary Table:

| Method           | Purpose                           |
|------------------|------------------------------------|
| JSON.stringify() | Convert object → JSON string       |
| JSON.parse()     | Convert JSON string → object       |

✅ Used in:
- APIs
- LocalStorage (can only store strings)
- Deep cloning simple data
- Sending structured data between systems
*/


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 56 - 🧼 Pure Functions in JavaScript

/*
📘 What is a Pure Function?
- A pure function is a function that:
  ✅ Always returns the same output for the same input
  ✅ Does NOT cause side effects (no I/O, no changing external variables)

🧠 Benefits of pure functions:
- Easy to test
- Predictable
- Easier to debug
- Reusable and composable
*/

// 🔸 1. Example of a Pure Function
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (same input = same output)

/*
✅ No side effects
✅ Doesn't modify anything outside the function
*/

// 🔸 2. Impure Function Example
let counter = 0;

function increaseCounter() {
  counter++;
  return counter;
}
console.log(increaseCounter()); // ❌ Impure: modifies external variable
console.log(increaseCounter()); // ❌ Returns different output for same call

// 🔸 3. Another Impure Example (side effect: console.log)
function logMessage(msg) {
  console.log(msg); // ❌ Side effect
  return true;
}

// 🔸 4. Pure Function with Array
function getDoubled(arr) {
  return arr.map(num => num * 2); // ✅ No mutation
}
console.log(getDoubled([1, 2, 3])); // [2, 4, 6]

// ❌ Impure version (mutates original array)
function doubleInPlace(arr) {
  for (let i in arr) {
    arr[i] = arr[i] * 2;
  }
  return arr;
}
const nums = [1, 2, 3];
console.log(doubleInPlace(nums)); // [2, 4, 6]
console.log(nums); // ❌ nums is now changed

/*
✅ Pure functions:
- Don’t change inputs (immutable)
- Don’t rely on external state
- Don’t perform side effects
*/

// 🔸 5. Pure Function + Functional Style
function toUpperCase(str) {
  return str.toUpperCase(); // ✅ No side effects
}

const names = ["ajay", "riya", "mukesh"];
const upperNames = names.map(toUpperCase); // Pure transformation
console.log(upperNames); // [ 'AJAY', 'RIYA', 'MUKESH' ]

/*
📌 Summary:

| Property           | Pure Function       | Impure Function          |
|--------------------|---------------------|---------------------------|
| Same input/output  | ✅ Always            | ❌ May vary               |
| Side effects       | ❌ None              | ✅ Yes (I/O, mutation)    |
| Changes arguments  | ❌ Never             | ✅ Sometimes              |
| Easy to test       | ✅ Very              | ❌ Difficult              |

✅ Prefer pure functions for data transformation
✅ Avoid mutating data or depending on external state
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 57 - 🧊 Immutability in JavaScript

/*
📘 What is Immutability?
- Immutability means **data cannot be changed after it is created**.
- Instead of modifying the original data, you create and return a **new copy**.

✅ Benefits:
- Predictable behavior
- Easier debugging
- Safer state management (especially in React, Redux, etc.)
*/

// 🔸 1. Mutable Example (Bad Practice)
const user = { name: "Ajay", age: 25 };
user.age = 30; // ❌ Mutating the original object
console.log("Mutable User:", user);

// 🔸 2. Immutable Version (Good Practice)
const originalUser = { name: "Ajay", age: 25 };
const updatedUser = { ...originalUser, age: 30 };
console.log("Original User:", originalUser); // age: 25
console.log("Updated User:", updatedUser);   // age: 30

/*
✅ We used spread (...) to create a new object
❌ We did not mutate originalUser
*/

// 🔸 3. Arrays – Mutable vs Immutable
const numbers = [1, 2, 3];

// ❌ Mutating
numbers.push(4);
console.log("Mutable Array:", numbers); // [1, 2, 3, 4]

// ✅ Immutable approach
const oldArr = [1, 2, 3];
const newArr = [...oldArr, 4];
console.log("Original:", oldArr); // [1, 2, 3]
console.log("New:", newArr);      // [1, 2, 3, 4]

// 🔸 4. Updating items in an array immutably
const users = [
  { id: 1, name: "Ajay" },
  { id: 2, name: "Riya" },
];

// Update user with id = 2
const updatedUsers = users.map(user =>
  user.id === 2 ? { ...user, name: "Anjali" } : user
);

console.log("Immutable Update:", updatedUsers);

/*
✅ We did not modify the original array or its objects
*/

// 🔸 5. Deep Immutability (nested objects)
const state = {
  user: { name: "Ajay", location: "Pune" },
  posts: [],
};

// ❌ Mutating
state.user.name = "Riya";

// ✅ Immutable (nested copy)
const newState = {
  ...state,
  user: {
    ...state.user,
    name: "Riya",
  },
};
console.log("Original State:", state);
console.log("New State:", newState);

/*
📌 Summary:

| Mutable             | Immutable                               |
|---------------------|------------------------------------------|
| Changes the original| Creates a new copy                       |
| Can cause bugs      | Safer and more predictable               |
| Fast & easy         | Slower but more reliable                 |
| Used in vanilla JS  | Preferred in React, Redux, functional JS |

✅ Use spread operator or array methods like map, filter, concat
✅ Avoid push, splice, direct object mutation if immutability is important
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 58 - 🔁 Higher Order Functions (HOFs)

/*
📘 What is a Higher Order Function?
A **Higher Order Function** is a function that:
1. Takes another function as an argument, or
2. Returns a function as its result

✅ In JavaScript, functions are "first-class citizens", meaning:
- You can pass them as arguments
- You can return them from other functions
- You can assign them to variables
*/

// 🔸 1. A Function that Accepts Another Function (callback)
function greet(name, formatter) {
  return "Hello, " + formatter(name);
}

function toUpper(text) {
  return text.toUpperCase();
}

console.log(greet("ajay", toUpper)); // Hello, AJAY

/*
🧠 `greet` is a higher order function
🧠 `toUpper` is a callback passed to it
*/

// 🔸 2. A Function that Returns Another Function
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

/*
✅ `multiplier()` returns a function customized with `factor`
*/

// 🔸 3. Array Methods as Higher Order Functions
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2); // ✅ map takes a callback
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

const even = numbers.filter(num => num % 2 === 0); // ✅ filter takes a callback
console.log("Even:", even); // [2, 4]

const sum = numbers.reduce((total, current) => total + current, 0); // ✅ reduce uses callback
console.log("Sum:", sum); // 15

/*
✅ These methods (map, filter, reduce) are higher order functions
✅ You provide a function to customize how they behave
*/

// 🔸 4. Custom HOF Example
function repeatAction(action, times) {
  for (let i = 0; i < times; i++) {
    action(i); // Call the passed function
  }
}

repeatAction(index => {
  console.log("Repeating:", index);
}, 3);

/*
📌 Summary:

| Feature                  | Description                             |
|--------------------------|-----------------------------------------|
| Takes function as input  | ✅ Example: map, filter, reduce          |
| Returns a function       | ✅ Example: multiplier(), closures       |
| Benefits                 | Custom logic, reuse, functional style   |

✅ Mastering HOFs = mastering modern JS
✅ Essential for React, functional programming, data manipulation
*/



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// 59 - 🧪 Currying & Composition in JavaScript

/*
📘 What is Currying?
- Currying is the process of converting a function with **multiple arguments** into a **sequence of functions**, each taking **one argument at a time**.

✅ Currying allows **function reuse**, **partial application**, and better **functional composition**.
*/

// 🔸 1. Normal Function (multi-argument)
function multiply(a, b) {
  return a * b;
}
console.log(multiply(2, 3)); // 6

// 🔸 2. Curried Version
function curriedMultiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = curriedMultiply(2); // partially applied
console.log(double(5)); // 10
console.log(curriedMultiply(3)(4)); // 12

/*
🧠 Each call returns a new function waiting for the next argument.
*/

// 🔸 3. Arrow Function Currying
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

/*
✅ Useful when you want to pass arguments one by one.
*/

// 🔸 4. Use Case: Custom Logger with Partial Arguments
function logger(prefix) {
  return function (msg) {
    console.log(`[${prefix}] ${msg}`);
  };
}

const info = logger("INFO");
info("Server started"); // [INFO] Server started

const error = logger("ERROR");
error("Something went wrong"); // [ERROR] Something went wrong

// ----------------------------------------------------------

/*
📘 What is Function Composition?
- Composition is combining two or more functions to form a new function.
- Data flows from right to left: `compose(f, g)(x)` = f(g(x))
*/

// 🔸 5. Compose Function Example
const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const greet = str => `Hello, ${str}`;

function compose(f, g) {
  return function (value) {
    return f(g(value));
  };
}

const welcome = compose(exclaim, greet);
console.log(welcome("Ajay")); // Hello, Ajay!

/*
✅ `greet` runs first, then `exclaim` wraps the result.
✅ This is functional composition.
*/

// 🔸 6. Compose Multiple Functions
const composeMany = (...fns) => input =>
  fns.reduceRight((acc, fn) => fn(acc), input);

const shoutGreet = composeMany(exclaim, toUpper, greet);
console.log(shoutGreet("ajay")); // HELLO, AJAY!

/*
📌 Summary:

| Feature     | Currying                         | Composition                      |
|-------------|----------------------------------|-----------------------------------|
| Meaning     | Break function into single args  | Combine functions into pipeline  |
| Form        | f(a)(b)                          | f(g(x)) or compose(f, g)         |
| Use Cases   | Reuse, config, partials          | Clean chaining, transformations  |

✅ Currying is good for flexibility
✅ Composition is good for readable pipelines
*/




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////