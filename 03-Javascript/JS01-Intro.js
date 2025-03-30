// 01 - Hello world in js 
// 02 - way of writing js in html
// 03 - variable
// 04 - Data type in js 
// 05 - Type Conversion
// 06 - Types of Operators in JavaScript
// 07 - Operator Precedence in JavaScript
// 08 - if, else if, and else in JavaScript
// 09 Turnery operator
// 11 - Template Literals in JavaScript 
// 11 - Template Literals in JavaScript 
// 12 - Truthy and Falsy Values in JavaScript
// 13 - Equality Operators (== vs ===) in JavaScript
// 14 - Switch Statement
// 15 -Boolean logic
// 16 - Nullish Coalescing
// 17 js update 
















// 01 - Hello world in js 

console.log("Hello, World!");
alert("Hello, World!");
document.write("Hello, World!");
document.getElementById("demo").innerText = "Hello, World!";










// 02 - way of writing js in html

// 1 - inside html element 
// <button onclick="alert('Hello, World!')">Click Me</button>

// 2 - in page 
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <title>Internal JS Example</title>
// </head>
// <body>
//     <button onclick="sayHello()">Click Me</button>

//     <script>
//         function sayHello() {
//             alert("Hello, World!");
//         }
//     </script>
// </body>
// </html>


// external 
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <title>External JS Example</title>
//     <script src="script.js"></script>
// </head>
// <body>
//     <button onclick="sayHello()">Click Me</button>
// </body>
// </html>










// 03 - variable 

// Variable Type	     Scope	        Reassignable?	Redeclarable?	Hoisted?
// var             	Function-scoped	    ✅ Yes	        ✅ Yes      	✅ Yes (but undefined)
// let0         	Block-scoped	    ✅ Yes          	❌ No	    ✅ Yes (but not initialized)
// const	        Block-scoped	    ❌ No           	❌ No	    ✅ Yes (but not initialized)










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










// 05 - Type Conversion

// Implicit (Type Coercion)
// JavaScript automatically converts types in some cases

console.log("5" + 2);  // "52" (string + number → string)
console.log("5" - 2);  // 3 (string - number → number)
console.log("5" * 2);  // 10 (string * number → number)


// Explicit (Manual Type Conversion)
let num = "123";
console.log(Number(num)); // 123
console.log(String(123)); // "123"
console.log(Boolean(1));  // true
console.log(Boolean(0));  // false










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


// 5️⃣ Bitwise Operations (&, |, ^, ~, <<, >>)
// 6️⃣ String Operations (+, .concat(), slice(), etc.)
// 7️⃣ Type Operations (typeof, instanceof)


// 8️⃣ Ternary Operator (condition ? true : false)
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"











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










// 09 Turnery operator
let message = (age >= 18) ? "Adult" : "Minor";
console.log(message);










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






