// javascript  introduction


// 01 - Hello world in js 
// 02 - way of writing js in html
// 03 - variable
// 04 - Data type in js 
// 05 - Type Conversion
// 06 - Types of Operators in JavaScript
// 07 - Operator Precedence in JavaScript
// 08 - if, else if, and else in JavaScript
// 09 - Turnery operator
// 11 - Template Literals in JavaScript 
// 11 - Template Literals in JavaScript 
// 12 - Truthy and Falsy Values in JavaScript
// 13 - Equality Operators (== vs ===) in JavaScript
// 14 - Switch Statement
// 15 - Boolean logic
// 16 - Nullish Coalescing
// 17 - js update 
// 18 - What is Strict Mode?
// 19 - functions 
// 20 - loops 
// 21 - The Spread Operator (...)
// 22 - Rest Pattern and Parameters 
// 23 - Short Circuiting (&& and ||)
// 24 - The Nullish Coalescing Operator (??)
// 25 - Optional Chaining (?.)
// 26 - JavaScript Sets 🚀 
// 27 - localStorage 
// 28 - Promises in JavaScript
// 29 - Throwing Errors Manually
// 30 - Exporting and Importing in ES6 Modules
// 31 - NPM 
// 32 - Comments 
// 33 - Types of the error in the js 
// 34 - timer 






















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

// 2 - in page 
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


// 04 - Data type in js 

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


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


// 05 - Type Conversion

// coercion refers to the automatic or implicit conversion
//  of values from one data type to another.

// Implicit (Type Coercion)
// JavaScript automatically converts types in some cases

// 
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


// 11 - Template Literals in JavaScript 
// let name = "Ajay";
console.log(`Hello, ${name}!`);










// 12 - Truthy and Falsy Values in JavaScript

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



console.log(Boolean(0));        // ❌ false (Falsy)
console.log(Boolean(""));       // ❌ false (Falsy)
console.log(Boolean("Hello"));  // ✅ true (Truthy)
console.log(Boolean([]));       // ✅ true (Truthy)
console.log(Boolean({}));       // ✅ true (Truthy)










// 13 - Equality Operators (== vs ===) in JavaScript

// Operator     	Name	                Type	        Behavior
// == 	        Loose Equality	            Non-strict	    Converts types before comparing
// ===	        Strict Equality	            Strict	        Compares both value and type

// Operator	Type	Behavior
// ==	Loose Equality	Converts types before comparing
// ===	Strict Equality	Compares both value and type
// !=	Loose Inequality	Converts types before comparing
// !==	Strict Inequality	Compares both value and type










// 14 - Switch Statement

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










// 15 -Boolean logic
 
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










// 16 - Nullish Coalescing
// The ?? operator returns the first defined value (not null or undefined).

// let name = null;
console.log(name ?? "Guest"); // "Guest" (null is ignored)










// 17 js update 
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










// 18 - What is Strict Mode?
// Strict mode is a feature in JavaScript that helps catch common coding mistakes and unsafe actions.
//  It enforces a stricter set of rules, making JavaScript more secure and optimized.

"use strict";  // Enables strict mode

// let x = 10;
console.log(x); // ✅ Works fine









// 19 functions 

// Function Declaration
function greet() {
    console.log("Hello, Ajay!");
  }
greet(); // Output: Hello, Ajay!

  
//   Function with Parameters & Return Value
function add(a, b) {
    return a + b;
  }
console.log(add(5, 3)); // Output: 8


// Function Expression
const multiply = function(x, y) {
    return x * y;
  };
  console.log(multiply(4, 5)); // Output: 20
  

//   Arrow Function (ES6)
const subtract = (a, b) => a - b;
console.log(subtract(10, 4)); // Output: 6


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
// const person = {
//   name: "Ajay",
//   greet: function(city, country) {
//     console.log(`Hello, my name is ${this.name} and I live in ${city}, ${country}.`);
//   }
// };

// // Another object
// const anotherPerson = {
//   name: "Soham"
// };

// // -------- Using call --------
// person.greet.call(anotherPerson, "Mumbai", "India");
// // Output: Hello, my name is Soham and I live in Mumbai, India.

// // -------- Using apply --------
// person.greet.apply(anotherPerson, ["Pune", "India"]);
// // Output: Hello, my name is Soham and I live in Pune, India.

// // -------- Using bind --------
// const boundGreet = person.greet.bind(anotherPerson, "Delhi", "India");
// boundGreet(); 
// // Output: Hello, my name is Soham and I live in Delhi, India.

  









// 20 - loops 

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










// 21 - The Spread Operator (...)

// Copying an Array
// const numbers = [1, 2, 3];
// const copy = [...numbers];

// console.log(copy); // [1, 2, 3]

//  Merging Two Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]


//  Adding Elements to an Array
// const numbers = [2, 3, 4];
// const newNumbers = [1, ...numbers, 5];
// console.log(newNumbers); // [1, 2, 3, 4, 5]




// Merging Two Objects
// const user = { name: "Ajay", age: 25 };
// const details = { role: "Developer", country: "India" };

// const merged = { ...user, ...details };

// console.log(merged);
// // { name: "Ajay", age: 25, role: "Developer", country: "India" }




// Removing Duplicates Using Spread and Set
// const numbers = [1, 2, 2, 3, 4, 4, 5];
// const uniqueNumbers = [...new Set(numbers)];
// console.log(uniqueNumbers); // [1, 2, 3, 4, 5]









////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// 22 - Rest Pattern and Parameters 
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(5, 10, 15)); // 30


// const numbers = [1, 2, 3, 4, 5];
// const [first, second, ...rest] = numbers;
// console.log(first); // 1
// console.log(second); // 2
// console.log(rest); // [3, 4, 5]


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





