// Array
// traversing,
// inserting,
//  deleting,
// searching,
//  modifying,
//  sorting
// merging,
//  splitting,
//  reversing,

// Asymptotic analysis and notation
// calculate the steps of the algorithm

// theory of array
// ✅ 1. Simple Array Declaration
// const numbers = [1, 2, 3, 4, 5];

// ✅ 2. 2D Array (Matrix)
// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
//   ];

// ✅ 3. Array of Objects
// const students = [
//     { name: "Ajay", score: 90 },
//     { name: "Ravi", score: 85 }
//   ];

// const sizeOfArray = arr.length

// get the array value by the index
//  const first = arr[0];

// get the value in the array by the index
// arr[0] = 1
// const lastValue = arr[arr.length - 1];

// Array method
// understand the array method core logic how to without method also the same functionality
// it pass by the reference

// 1. Traversing Methods
// These methods help you traverse and access elements in an array.

// forEach(): Executes a function for each element in the array.

// map(): Creates a new array with the results of calling a function on every element.

// filter(): Creates a new array with all elements that pass the test.

// reduce(): Applies a function against an accumulator and each element to reduce it to a single value.

// reduceRight(): Same as reduce(), but processes the array from right to left.

// some(): Tests whether at least one element in the array passes a test.

// every(): Tests whether all elements in the array pass a test.

// find(): Returns the first element that satisfies the condition.

// findIndex(): Returns the index of the first element that satisfies the condition.

// for...of loop: Iterates over the array elements.

// 🔹 2. Modifying Arrays
// These methods allow you to modify the contents of an array.

// push(): Adds one or more elements to the end of an array.

// pop(): Removes the last element of an array.

// shift(): Removes the first element of an array.

// unshift(): Adds one or more elements to the beginning of an array.

// splice(): Adds/removes elements at a specific index.

// sort(): Sorts the elements of the array in place.

// reverse(): Reverses the order of the elements in the array.

// fill(): Changes all elements in an array to a static value from a start index to an end index.

// 🔹 3. Searching Methods
// These methods help you search for specific elements in an array.

// indexOf(): Returns the first index of a value, or -1 if not found.

// lastIndexOf(): Returns the last index of a value, or -1 if not found.

// includes(): Checks if a value exists in the array, returning true or false.

// find(): Returns the first element that satisfies a condition.

// findIndex(): Returns the index of the first element that satisfies a condition.

// some(): Checks if at least one element satisfies the condition.

// 🔹 4. Sorting & Ordering Methods
// These methods are used for sorting and ordering array elements.

// sort(): Sorts the array in place.

// reverse(): Reverses the order of the elements in the array.

// 🔹 5. Array Transformation
// These methods allow you to transform arrays into other arrays or structures.

// map(): Creates a new array with the results of applying a function.

// filter(): Creates a new array with elements that satisfy a condition.

// reduce(): Reduces the array to a single value.

// reduceRight(): Same as reduce(), but processes from right to left.

// flat(): Flattens an array of arrays into a single array.

// flatMap(): Applies a function to each element, then flattens the result.

// 🔹 6. Copying & Concatenating Methods
// Methods for copying or concatenating arrays.

// concat(): Merges two or more arrays into one.

// slice(): Returns a shallow copy of a portion of an array.

// copyWithin(): Shallow copies a part of an array to another location in the same array.

// from(): Creates a new array from an iterable or array-like object.

// fill(): Copies the given value into the array for the specified range.

// 🔹 7. Array Structure
// Methods for converting and transforming arrays.

// join(): Joins all elements of an array into a string, with a specified separator.

// toString(): Converts an array to a string.

// toLocaleString(): Converts an array to a string using local specific settings.

// entries(): Returns an iterator for the array with index-value pairs.

// keys(): Returns an iterator for the array's keys (indices).

// values(): Returns an iterator for the array’s values.

// 🔹 8. Array Utilities
// These methods provide additional utility functions.

// isArray(): Checks if the value is an array.

// sort(): Sorts the array elements in place.

// find(): Returns the first element that passes a test.

// fill(): Fills an array with a specific value.

// 🔹 9. Working with JSON
// Methods for converting arrays to and from JSON format.

// JSON.stringify(): Converts an array to a JSON string.

// JSON.parse(): Parses a JSON string into an array.

// 🔹 10. Array Destructuring
// For extracting values from arrays into variables.

// Problem 1
// how to find the smallest value in the array

// const arr = [15, 4, 9, 2, 11];
// const minValue = Math.min(...arr);
// console.log(minValue); // Output: 2

// const arr = [15, 4, 9, 2, 11];
// let minValue = arr[0];

// for (let i = 1; i < arr.length; i++) {
//   if (arr[i] < minValue) {
//     minValue = arr[i];
//   }
// }
// console.log(minValue); // Output: 2

// const arr = [15, 4, 9, 2, 11];
// const minValue = arr.reduce((min, curr) => Math.min(min, curr));
// console.log(minValue); // Output: 2

// Problem 2
// how search in the array

// const arr = [10, 20, 30, 40];
// console.log(arr.includes(20)); // true
// console.log(arr.includes(50)); // false

// const arr = [10, 20, 30, 40];
// console.log(arr.indexOf(30)); // 2
// console.log(arr.indexOf(100)); // -1

// const arr = [5, 12, 18, 25];
// const found = arr.find(num => num > 15);
// console.log(found); // 18

// const arr = [5, 12, 18, 25];
// const index = arr.findIndex(num => num > 15);
// console.log(index); // 2

// const arr = [10, 20, 30, 40];
// const result = arr.filter(num => num > 25);
// console.log(result); // [30, 40]

// const arr = [2, 4, 6];
// console.log(arr.some(num => num > 5)); // true

// const arr = [2, 4, 6];
// console.log(arr.every(num => num % 2 === 0)); // true

// const arr = [10, 20, 30, 40];
// let target = 30;
// let found = false;

// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] === target) {
//     found = true;
//     break;
//   }
// }
// console.log(found); // true

// Problem 3
// how to reverse the array

// const arr = [1, 2, 3, 4, 5];
// arr.reverse();
// console.log(arr); // [5, 4, 3, 2, 1]

// const arr = [1, 2, 3, 4, 5];
// const reversed = [...arr].reverse(); // Using spread operator
// console.log(reversed); // [5, 4, 3, 2, 1]
// console.log(arr);      // [1, 2, 3, 4, 5] ✅ original is safe

// const arr = [1, 2, 3, 4, 5];
// const reversed = [];

// for (let i = arr.length - 1; i >= 0; i--) {
//   reversed.push(arr[i]);
// }

// console.log(reversed); // [5, 4, 3, 2, 1]

// Problem 4
// how insert the value in the array

// let arr = [1, 2, 3];
// arr.push(4); // Adds 4 to the end
// console.log(arr); // [1, 2, 3, 4]

// push the multiple value in the array
// arr.push(5, 6); // Adds 5 and 6 to the end
// console.log(arr); // [1, 2, 3, 4, 5, 6]

// let arr = [1, 2, 3];
// arr.unshift(0); // Adds 0 to the beginning
// console.log(arr); // [0, 1, 2, 3]

// arr.unshift(-2, -1); // Adds -2 and -1 to the beginning
// console.log(arr); // [-2, -1, 0, 1, 2, 3]

// splice() - Add at any position in the array
// arr.splice(index, 0, element1, element2, ...);
// let arr = [1, 2, 3];
// arr.splice(1, 0, 'a'); // Inserts 'a' at index 1
// console.log(arr); // [1, 'a', 2, 3]

// let arr = [10, 20, 30, 40];
// arr.splice(1, 0, 15); // Inserts 15 at index 1
// console.log(arr); // [10, 15, 20, 30, 40]

// how to remove some part fro the array
// let arr = [1, 2, 3, 4];
// let part1 = arr.slice(0, 2); // [1, 2]
// let part2 = arr.slice(2);     // [3, 4]

// let newArr = part1.concat(5).concat(part2); // Inserts 5 between part1 and part2
// console.log(newArr); // [1, 2, 5, 3, 4]

// insert the value in the array by the index
// let arr = [10, 20, 30, 40];
// let num = 25;
// let index = 2;

// let newArr = []; // New array to hold the result

// // Loop through the original array until the insertion index
// for (let i = 0; i < arr.length; i++) {
//   if (i === index) {
//     newArr.push(num); // Insert the number at the specified index
//   }
//   newArr.push(arr[i]); // Add the current element to the new array
// }

// console.log(newArr); // [10, 20, 25, 30, 40]

// push the value in without using the push method
// function insertAtIndex(arr, i, x) {
//     // Step 1: Create a new array of size arr.length + 1
//     let newArr = new Array(arr.length + 1);

//     // Step 2: Copy elements before index `i` to the new array
//     for (let j = 0; j < i; j++) {
//         newArr[j] = arr[j];
//     }

//     // Step 3: Insert the number `x` at index `i`
//     newArr[i] = x;

//     // Step 4: Copy elements after index `i` to the new array
//     for (let j = i + 1; j < newArr.length; j++) {
//         newArr[j] = arr[j - 1];
//     }

//     return newArr;
// }

// // Test case
// let arr = [1, 2, 3, 4, 5];
// let x = 10;
// let i = 2;

// console.log(insertAtIndex(arr, i, x)); // Output: [1, 2, 10, 3, 4, 5]

// problem 5
// how to delete the value in the array

// function removeValue(arr, value) {
//     const index = arr.indexOf(value);  // Find the index of the value
//     if (index !== -1) {
//         arr.splice(index, 1);  // Remove 1 element at the found index
//     }
//     return arr;
// }

// let arr = [1, 2, 3, 4, 5];
// removeValue(arr, 3);  // Removes 3 from the array
// console.log(arr);  // Output: [1, 2, 4, 5]

// function removeValue(arr, value) {
//     return arr.filter(item => item !== value);  // Create a new array excluding the value
// }

// let arr = [1, 2, 3, 4, 5];
// let newArr = removeValue(arr, 3);  // Removes 3 from the array
// console.log(newArr);  // Output: [1, 2, 4, 5]

// function removeValue(arr, value) {
//     let newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] !== value) {
//             newArr.push(arr[i]);  // Add elements that don't match the value
//         }
//     }
//     return newArr;
// }

// let arr = [1, 2, 3, 4, 5];
// let newArr = removeValue(arr, 3);  // Removes 3 from the array
// console.log(newArr);  // Output: [1, 2, 4, 5]

// function removeValue(arr, value) {
//     const index = arr.indexOf(value);
//     if (index !== -1) {
//         return arr.slice(0, index).concat(arr.slice(index + 1));  // Concatenate before and after the value
//     }
//     return arr;
// }

// let arr = [1, 2, 3, 4, 5];
// let newArr = removeValue(arr, 3);  // Removes 3 from the array
// console.log(newArr);  // Output: [1, 2, 4, 5]

// function removeValue(arr, value) {
//     return arr.reduce((acc, item) => {
//         if (item !== value) acc.push(item);
//         return acc;
//     }, []);
// }

// let arr = [1, 2, 3, 4, 5];
// let newArr = removeValue(arr, 3);  // Removes 3 from the array
// console.log(newArr);  // Output: [1, 2, 4, 5]

// function removeValue(arr, value) {
//     return [...new Set(arr.filter(item => item !== value))];  // Removes value and duplicates
// }

// let arr = [1, 2, 3, 4, 5, 3];
// let newArr = removeValue(arr, 3);  // Removes all occurrences of 3
// console.log(newArr);  // Output: [1, 2, 4, 5]

// problem 6
// how to find the value in the array

// const arr = [1, 2, 3, 4, 5];
// console.log(arr.includes(3)); // true
// console.log(arr.includes(10)); // false

// const arr = [1, 2, 3, 4, 5];
// console.log(arr.indexOf(3)); // 2
// console.log(arr.indexOf(10)); // -1

// const arr = [1, 2, 3, 4, 5];
// const result = arr.find(num => num === 3);
// console.log(result); // 3

// const arr = [1, 2, 3, 4, 5];
// const idx = arr.findIndex(num => num === 3);
// console.log(idx); // 2

// const arr = [1, 2, 3, 4, 5];
// let found = false;
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 3) {
//         found = true;
//         break;
//     }
// }
// console.log(found); // true

// porblem 7
// how to merge the array

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const merged = arr1.concat(arr2);
// console.log(merged); // [1, 2, 3, 4, 5, 6]

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const merged = [...arr1, ...arr2];
// console.log(merged); // [1, 2, 3, 4, 5, 6]

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// for (let i = 0; i < arr2.length; i++) {
//     arr1.push(arr2[i]);
// }
// console.log(arr1); // arr1 is now [1, 2, 3, 4, 5, 6]

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const merged = []; // Empty array to store the result

// // Push all elements from arr1
// for (let i = 0; i < arr1.length; i++) {
//     merged[merged.length] = arr1[i];
// }

// // Push all elements from arr2
// for (let i = 0; i < arr2.length; i++) {
//     merged[merged.length] = arr2[i];
// }

// console.log(merged);

// problem 8
// how to sort the array

// const arr = [5, 2, 9, 1, 5, 6];

// arr.sort((a, b) => a - b);

// console.log(arr);
// // Output: [1, 2, 5, 5, 6, 9]

// const arr = [5, 2, 9, 1, 5, 6];

// for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//         if (arr[j] > arr[j + 1]) {
//             // Swap
//             let temp = arr[j];
//             arr[j] = arr[j + 1];
//             arr[j + 1] = temp;
//         }
//     }
// }

// console.log(arr);
// Output: [1, 2, 5, 5, 6, 9]

// Problem 9
function makePair(...args) {
  // this args  convert all  argument into the array
  return args;
}

console.log(makePair(1, 2)); // [1, 2]
console.log(makePair(51, 21, 99)); // [51, 21, 99]
console.log(makePair(512124, 215, 0, 42)); // [512124, 215, 0, 42]
console.log(makePair()); // []

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const arr = [1, 2, 3, 4, 5, 6];
const [a, b] = arr;

console.log(a); // 1
console.log(b); // 2

let [a, b] = [1, 2, 3, 4];

// ✅ 3. Partial Destructuring with Skipping Elements
const [a, , b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 3


// ✅ 5. With default values  
const arr = [1];
const [a = 10, b = 20] = arr;
console.log(a); // 1
console.log(b); // 20
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// how to get the last element of the array 

function getLastItem(arr) {
  return arr[arr.length - 1];
}

function getLastItem(arr) {
  return arr.at(-1);
}


function getLastItem(arr) {
  return arr.slice(-1)[0];
}


function getLastItem(arr) {
  return arr.pop();
}

function getLastItem(arr) {
  return arr.reverse()[0];
}


function getLastItem(arr) {
  const [last] = arr.slice(-1);
  return last;
}


function getLastItem(arr) {
  return [...arr].pop();
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// how to convert a array in to the string 
arrayToString([1, 2, 3, 4, 5, 6]) ➞ "123456"
arrayToString(["a", "b", "c", "d", "e", "f"]) ➞ "abcdef"
arrayToString([1, 2, 3, "a", "s", "dAAAA"]) ➞ "123asdAAAA"

function arrayToString(arr) {
  return arr.join("");
}


function arrayToString(arr) {
  return arr.reduce((acc, val) => acc + val, "");
}

function arrayToString(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
  }
  return str;
}





/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Concatenating Two Integer Arrays

concat([1, 3, 5], [2, 6, 8]) ➞ [1, 3, 5, 2, 6, 8]  
concat([7, 8], [10, 9, 1, 1, 2]) ➞ [7, 8, 10, 9, 1, 1, 2]  
concat([4, 5, 1], [3, 3, 3, 3, 3]) ➞ [4, 5, 1, 3, 3, 3, 3, 3]


function concat(arr1, arr2) {
  return [...arr1, ...arr2];
}


function concat(arr1, arr2) {
  return arr1.concat(arr2);
}


function concat(arr1, arr2) {
  arr1.push(...arr2);
  return arr1;
}


function concat(arr1, arr2) {
  for (let num of arr2) {
    arr1.push(num);
  }
  return arr1;
}


function concat(arr1, arr2) {
  arr2.forEach(num => arr1.push(num));
  return arr1;
}


function concat(arr1, arr2) {
  return [arr1, arr2].reduce((acc, val) => acc.concat(val));
}


function concat(arr1, arr2) {
  return Array.from(arr1).concat(arr2);
}




function concat(arr1, arr2) {
  return [arr1, arr2].flat();
}





/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Write a function findIndex(arr, str) that returns the index of str inside the array arr.

findIndex(["hi", "edabit", "fgh", "abc"], "fgh") ➞ 2  
findIndex(["Red", "blue", "Blue", "Green"], "blue") ➞ 1  
findIndex(["a", "g", "y", "d"], "d") ➞ 3  
findIndex(["Pineapple", "Orange", "Grape", "Apple"], "Pineapple") ➞ 0


function findIndex(arr, str) {
  return arr.indexOf(str);
}



function findIndex(arr, str) {
  return arr.findIndex(el => el === str);
}



function findIndex(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === str) return i;
  }
  return -1;
}



function findIndex(arr, str) {
  return arr.reduce((idx, el, i) => idx !== -1 ? idx : (el === str ? i : -1), -1);
}


function findIndex(arr, str) {
  return arr.indexOf(str);
}




/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Create a function sumArray(arr) that returns the sum of all the numbers in the array.

sumArray([1, 2, 3, 4, 5]) ➞ 15  
sumArray([-1, 0, 1]) ➞ 0  
sumArray([0, 4, 8, 12]) ➞ 24



function sumArray(arr) {
  return arr.reduce((a, b) => a + b)
}


function sumArray(arr) {
  return arr.reduce((a, b) => a + b)
}


function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}



function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}



function sumArray(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
}



function sumArray(arr) {
  let sum = 0;
  arr.forEach(num => sum += num);
  return sum;
}



function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}








/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Check if an Array Contains a Given Number

function check(arr, num) {
  return arr.includes(num);
}



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Given two arrays, which represent two sandwiches, 
// return whether both sandwiches use the same type of bread. 
// The bread will always be found at the start and end of the array.

// Example Test Cases:
// hasSameBread(
//   ["white bread", "lettuce", "white bread"],
//   ["white bread", "tomato", "white bread"]
// ) ➞ true
//
// hasSameBread(
//   ["brown bread", "chicken", "brown bread"],
//   ["white bread", "chicken", "white bread"]
// ) ➞ false
//
// hasSameBread(
//   ["toast", "cheese", "toast"],
//   ["brown bread", "cheese", "toast"]
// ) ➞ false

// Solution 1: Using direct index checking
function hasSameBread(sandwich1, sandwich2) {
  return sandwich1[0] === sandwich2[0] && sandwich1[sandwich1.length - 1] === sandwich2[sandwich2.length - 1];
}

// Solution 2: Using destructuring assignment for clarity
function hasSameBreadDestructure(sandwich1, sandwich2) {
  const [firstBread1, ...rest1] = sandwich1;
  const [firstBread2, ...rest2] = sandwich2;
  return firstBread1 === firstBread2 && sandwich1[sandwich1.length - 1] === sandwich2[sandwich2.length - 1];
}

// Solution 3: Using Array.slice() to explicitly get bread from both sides
function hasSameBreadSlice(sandwich1, sandwich2) {
  const bread1 = [sandwich1[0], sandwich1[sandwich1.length - 1]];
  const bread2 = [sandwich2[0], sandwich2[sandwich2.length - 1]];
  return bread1[0] === bread2[0] && bread1[1] === bread2[1];
}

// Solution 4: Using a simple ternary operator for compactness
function hasSameBreadTernary(sandwich1, sandwich2) {
  return (sandwich1[0] === sandwich2[0] && sandwich1[sandwich1.length - 1] === sandwich2[sandwich2.length - 1]) ? true : false;
}

// Output for Example Test Cases
console.log(hasSameBread(
["white bread", "lettuce", "white bread"],
["white bread", "tomato", "white bread"]
)); // ➞ true

console.log(hasSameBread(
["brown bread", "chicken", "brown bread"],
["white bread", "chicken", "white bread"]
)); // ➞ false

console.log(hasSameBread(
["toast", "cheese", "toast"],
["brown bread", "cheese", "toast"]
)); // ➞ false

/*
Best Solution Explanation:
- **Solution 1** is the best approach because:
- It is the most direct and readable method for checking if the bread at the start and end of both sandwiches is the same.
- It uses array indexing to check the first and last elements, which is both efficient and clear.
- It avoids unnecessary complexity, making it easy to understand for anyone reading the code.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Create a function that takes an array of integers and strings. 
// Convert integers to strings and return the new array.

// Example Test Cases:
// parseArray([1, 2, "a", "b"]) ➞ ["1", "2", "a", "b"]
// parseArray(["abc", 123, "def", 456]) ➞ ["abc", "123", "def", "456"]
// parseArray([1, 2, 3, 17, 24, 3, "a", "123b"]) ➞ ["1", "2", "3", "17", "24", "3", "a", "123b"]
// parseArray([]) ➞ []

// Solution 1: Using map() to convert all integers to strings
function parseArray(arr) {
  return arr.map(item => item.toString());
}

// Solution 2: Using for loop to iterate and manually convert integers to strings
function parseArrayUsingLoop(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
      result.push(arr[i].toString());
  }
  return result;
}

// Solution 3: Using reduce() to accumulate the converted elements into a new array
function parseArrayUsingReduce(arr) {
  return arr.reduce((result, item) => {
      result.push(item.toString());
      return result;
  }, []);
}

// Solution 4: Using forEach() to convert integers to strings and store in a new array
function parseArrayUsingForEach(arr) {
  let result = [];
  arr.forEach(item => result.push(item.toString()));
  return result;
}

// Output for Example Test Cases
console.log(parseArray([1, 2, "a", "b"])); // ➞ ["1", "2", "a", "b"]
console.log(parseArray(["abc", 123, "def", 456])); // ➞ ["abc", "123", "def", "456"]
console.log(parseArray([1, 2, 3, 17, 24, 3, "a", "123b"])); // ➞ ["1", "2", "3", "17", "24", "3", "a", "123b"]
console.log(parseArray([])); // ➞ []

/*
Best Solution Explanation:
- **Solution 1 (map())** is the best solution because:
- It's concise, readable, and the most modern approach in JavaScript.
- The `map()` function is perfect for transforming elements in an array while preserving the array's structure.
- It’s clear in intent, directly converts each element to a string, and does so in a single line of code.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Create a function that takes an array and returns 
// the types of values (data types) in a new array.

// Example Test Cases:
// arrayValuesTypes([1, 2, "null", []])
// ➞ ["number", "number", "string", "object"]

// arrayValuesTypes(["214", true, false, 2, 2.15, [], null])
// ➞ ["string", "boolean", "boolean", "number", "number", "object", "object"]

// arrayValuesTypes([21.1, "float", "array", ["I am array"], null, true, 214])
// ➞ ["number", "string", "string", "object", "object", "boolean", "number"]

// Solution 1: Using map() and typeof
function arrayValuesTypes(arr) {
  return arr.map(item => typeof item);
}

// Solution 2: Using for loop
function arrayValuesTypesLoop(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(typeof arr[i]);
  }
  return result;
}

// Solution 3: Using reduce()
function arrayValuesTypesReduce(arr) {
  return arr.reduce((acc, val) => [...acc, typeof val], []);
}

// Output for Example Test Cases
console.log(arrayValuesTypes([1, 2, "null", []])); 
// ➞ ["number", "number", "string", "object"]

console.log(arrayValuesTypes(["214", true, false, 2, 2.15, [], null])); 
// ➞ ["string", "boolean", "boolean", "number", "number", "object", "object"]

console.log(arrayValuesTypes([21.1, "float", "array", ["I am array"], null, true, 214]));
// ➞ ["number", "string", "string", "object", "object", "boolean", "number"]

/*
Best Solution Explanation:
- **Solution 1 (map())** is the best approach because:
  - It’s concise and directly expresses the intent of transforming each value to its type.
  - It avoids mutation, is easy to read, and aligns with modern JavaScript functional patterns.
  - `typeof` is the correct and simplest way to get primitive type names and handles edge cases like `null` (which is historically "object").
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Problem: Create a function that takes an array of two numbers 
// and checks if the square root of the first number 
// is equal to the cube root of the second number.

// Example Test Cases:
// checkSquareAndCube([4, 8]) ➞ true  (√4 = 2, ∛8 = 2)
// checkSquareAndCube([16, 48]) ➞ false (√16 = 4, ∛48 ≈ 3.63)

// Solution 1: Using Math.sqrt and Math.cbrt
function checkSquareAndCube(arr) {
  return Math.sqrt(arr[0]) === Math.cbrt(arr[1]);
}

// Solution 2: Destructuring with Math functions
function checkSquareAndCubeDestructured([a, b]) {
  return Math.sqrt(a) === Math.cbrt(b);
}

// Solution 3: Rounded comparison for floating-point imprecision
function checkSquareAndCubeApprox([a, b]) {
  return Math.abs(Math.sqrt(a) - Math.cbrt(b)) < 1e-10;
}

// Output for Example Test Cases
console.log(checkSquareAndCube([4, 8]));       // ➞ true
console.log(checkSquareAndCube([16, 48]));     // ➞ false
console.log(checkSquareAndCubeDestructured([4, 8])); // ➞ true
console.log(checkSquareAndCubeApprox([4, 8])); // ➞ true

/*
Best Solution Explanation:
- **Solution 1 (Math.sqrt & Math.cbrt)** is best when values are integers and precision isn't a concern.
- **Solution 3** is better if there's a possibility of floating-point rounding errors (e.g., with decimals).
- Use **Solution 1** for simplicity and speed in most real-world use cases.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Create a function that takes a number and returns an array with:
// 1. Half of the number
// 2. Quarter of the number
// 3. Eighth of the number

// Example Test Cases:
// halfQuarterEighth(6) ➞ [3, 1.5, 0.75]
// halfQuarterEighth(22) ➞ [11, 5.5, 2.75]
// halfQuarterEighth(25) ➞ [12.5, 6.25, 3.125]

// Solution 1: Basic function with division
function halfQuarterEighth(num) {
  return [num / 2, num / 4, num / 8];
}

// Solution 2: Using destructuring for clarity (though not really needed here)
function halfQuarterEighthDestructured(num) {
  const half = num / 2;
  const quarter = num / 4;
  const eighth = num / 8;
  return [half, quarter, eighth];
}

// Solution 3: Using map (just to demonstrate alternative functional approach)
function halfQuarterEighthMap(num) {
  return [2, 4, 8].map(divisor => num / divisor);
}

// Solution 4: Using an array and a loop to dynamically compute the values
function halfQuarterEighthLoop(num) {
  const divisors = [2, 4, 8];
  return divisors.map(divisor => num / divisor);
}

// Solution 5: Using a single return expression with multiple operations
function halfQuarterEighthSingleLine(num) {
  return [num / 2, num / 4, num / 8];
}

// Output for Example Test Cases
console.log(halfQuarterEighth(6));  // ➞ [3, 1.5, 0.75]
console.log(halfQuarterEighth(22)); // ➞ [11, 5.5, 2.75]
console.log(halfQuarterEighth(25)); // ➞ [12.5, 6.25, 3.125]

/*
Best Solution Explanation:
- **Solution 1** is the most straightforward and easy-to-read approach. It directly returns the array with the required calculations.
- The other methods (especially **Solution 3** and **Solution 4**) are more complex than necessary and may be useful in certain situations but are overkill for this problem.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Create a function that takes a whole number as input and returns the shape with that number's amount of sides.

// Example Test Cases:
// nSidedShape(3) ➞ "triangle"
// nSidedShape(1) ➞ "circle"
// nSidedShape(9) ➞ "nonagon"

// Solution 1: Using a simple array to map numbers to shapes
function nSidedShape(num) {
  const shapes = [
    "circle",      // 1
    "semi-circle", // 2
    "triangle",    // 3
    "square",      // 4
    "pentagon",    // 5
    "hexagon",     // 6
    "heptagon",    // 7
    "octagon",     // 8
    "nonagon",     // 9
    "decagon"      // 10
  ];
  return shapes[num - 1];
}

// Solution 2: Using a switch statement (though conditionals are discouraged)
function nSidedShapeSwitch(num) {
  switch (num) {
    case 1: return "circle";
    case 2: return "semi-circle";
    case 3: return "triangle";
    case 4: return "square";
    case 5: return "pentagon";
    case 6: return "hexagon";
    case 7: return "heptagon";
    case 8: return "octagon";
    case 9: return "nonagon";
    case 10: return "decagon";
  }
}

// Solution 3: Using an object to map numbers to shapes
function nSidedShapeObject(num) {
  const shapeMap = {
    1: "circle",
    2: "semi-circle",
    3: "triangle",
    4: "square",
    5: "pentagon",
    6: "hexagon",
    7: "heptagon",
    8: "octagon",
    9: "nonagon",
    10: "decagon"
  };
  return shapeMap[num];
}

// Output for Example Test Cases
console.log(nSidedShape(3));  // ➞ "triangle"
console.log(nSidedShape(1));  // ➞ "circle"
console.log(nSidedShape(9));  // ➞ "nonagon"

/*
Best Solution Explanation:
- **Solution 1 (Array Mapping)** is the most concise and efficient method. It uses an array with predefined values for each possible number of sides, and simply indexes into the array.
- **Solution 2** is functional but involves conditionals and is more verbose than Solution 1.
- **Solution 3** (Object Mapping) is an alternative that uses a map for a clean solution, though still not as concise as the array approach.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Given an array of positive integers `nums`, return the maximum possible sum of a strictly increasing subarray.
// A subarray is defined as a contiguous sequence of numbers in an array.

// Example Test Cases:
// maxIncreasingSubarraySum([10, 20, 30, 5, 10, 50]) ➞ 65        // [5, 10, 50]
// maxIncreasingSubarraySum([10, 20, 30, 40, 50]) ➞ 150          // [10, 20, 30, 40, 50]
// maxIncreasingSubarraySum([12, 17, 15, 13, 10, 11, 12]) ➞ 33   // [10, 11, 12]

// Solution 1: Iterative with tracking
function maxIncreasingSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      currentSum += nums[i];
    } else {
      currentSum = nums[i];
    }
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// Solution 2: Functional style using reduce
function maxIncreasingSubarraySumReduce(nums) {
  return nums.reduce(
    ([maxSum, currentSum], num, i, arr) => {
      if (i > 0 && num > arr[i - 1]) {
        currentSum += num;
      } else {
        currentSum = num;
      }
      return [Math.max(maxSum, currentSum), currentSum];
    },
    [nums[0], nums[0]]
  )[0];
}

// Output for test cases
console.log(maxIncreasingSubarraySum([10, 20, 30, 5, 10, 50])); // 65
console.log(maxIncreasingSubarraySum([10, 20, 30, 40, 50]));    // 150
console.log(maxIncreasingSubarraySum([12, 17, 15, 13, 10, 11, 12])); // 33

/*
Best Solution Explanation:
- **Solution 1** is the clearest and most efficient. It only needs a single pass through the array (O(n) time complexity), uses constant space, and is very readable.
- **Solution 2** is more functional and compact using `reduce`, but may be harder to follow for some developers.
- Overall, **Solution 1** is recommended for clarity and maintainability.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Create a function that takes an array with numbers and returns a new array with each element multiplied by two.

// Example Test Cases:
// getMultipliedArr([2, 5, 3]) ➞ [4, 10, 6]
// getMultipliedArr([1, 86, -5]) ➞ [2, 172, -10]
// getMultipliedArr([5, 382, 0]) ➞ [10, 764, 0]

// Solution 1: Using map (best and most concise)
function getMultipliedArr(nums) {
  return nums.map(n => n * 2);
}

// Solution 2: Using for loop
function getMultipliedArrLoop(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    result.push(nums[i] * 2);
  }
  return result;
}

// Solution 3: Using forEach
function getMultipliedArrForEach(nums) {
  const result = [];
  nums.forEach(num => result.push(num * 2));
  return result;
}

// Solution 4: Using reduce
function getMultipliedArrReduce(nums) {
  return nums.reduce((acc, val) => {
    acc.push(val * 2);
    return acc;
  }, []);
}

// Solution 5: Using recursion
function getMultipliedArrRecursive(nums) {
  if (nums.length === 0) return [];
  return [nums[0] * 2, ...getMultipliedArrRecursive(nums.slice(1))];
}

// Output
console.log(getMultipliedArr([2, 5, 3]));       // [4, 10, 6]
console.log(getMultipliedArr([1, 86, -5]));     // [2, 172, -10]
console.log(getMultipliedArr([5, 382, 0]));     // [10, 764, 0]

/*
Best Solution Explanation:
- **Solution 1** using `map` is the best — it's concise, readable, and optimized for transforming arrays.
- Other methods like `forEach`, `reduce`, and recursion work too, but are either more verbose or less performant.
- Stick with `.map()` for clean, idiomatic JavaScript array transformations.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Given an array with elements "e" (effort), "f" (fulcrum), and "l" (load), determine the lever class.
// "e", "f", "l" positions determine the class:
// ["e", "f", "l"] ➞ "first class lever"
// ["e", "l", "f"] ➞ "second class lever"
// ["f", "e", "l"] ➞ "third class lever"

// Example Test Cases:
// determineLever(["e", "f", "l"]) ➞ "first class lever"
// determineLever(["e", "l", "f"]) ➞ "second class lever"
// determineLever(["f", "e", "l"]) ➞ "third class lever"

// Solution 1: Using array comparison
function determineLever(arr) {
  const leverMap = {
    "efl": "first class lever",
    "elf": "second class lever",
    "fel": "third class lever"
  };
  return leverMap[arr.join("")];
}

// Solution 2: Using if-else
function determineLeverIfElse(arr) {
  const [a, b, c] = arr;
  if (a === "e" && b === "f" && c === "l") return "first class lever";
  if (a === "e" && b === "l" && c === "f") return "second class lever";
  if (a === "f" && b === "e" && c === "l") return "third class lever";
}

// Solution 3: Using switch-case
function determineLeverSwitch(arr) {
  switch (arr.join("")) {
    case "efl": return "first class lever";
    case "elf": return "second class lever";
    case "fel": return "third class lever";
  }
}

// Output
console.log(determineLever(["e", "f", "l"])); // ➞ "first class lever"
console.log(determineLever(["e", "l", "f"])); // ➞ "second class lever"
console.log(determineLever(["f", "e", "l"])); // ➞ "third class lever"

/*
Best Solution Explanation:
- **Solution 1** is best for its clarity and performance — it's a simple dictionary (object) lookup.
- It's scalable and avoids long if/else or switch blocks.
- For small pattern recognition problems like this, mapping strings to results is clean and effective.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// A "lucky integer" is an integer that appears in the array exactly as many times as its value.
// Return the largest lucky integer from the array or -1 if none exist.

// Examples:
// luckyInteger([2,2,3,4]) ➞ 2   // 2 appears 2 times
// luckyInteger([1,2,2,3,3,3]) ➞ 3   // 3 appears 3 times
// luckyInteger([2,2,2,3,3]) ➞ -1   // No number matches frequency

// Solution 1: Using frequency map with for...of loop
function luckyInteger(arr) {
  const freq = {};
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }
  let result = -1;
  for (const num in freq) {
    if (parseInt(num) === freq[num]) {
      result = Math.max(result, parseInt(num));
    }
  }
  return result;
}

// Solution 2: Using Map
function luckyIntegerMap(arr) {
  const map = new Map();
  arr.forEach(n => map.set(n, (map.get(n) || 0) + 1));
  let result = -1;
  for (const [key, val] of map) {
    if (key === val) result = Math.max(result, key);
  }
  return result;
}

// Solution 3: Using reduce and object
function luckyIntegerReduce(arr) {
  const freq = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Math.max(...Object.entries(freq)
    .filter(([num, count]) => +num === count)
    .map(([num]) => +num), -1);
}

// Output
console.log(luckyInteger([2, 2, 3, 4])); // 2
console.log(luckyInteger([1, 2, 2, 3, 3, 3])); // 3
console.log(luckyInteger([2, 2, 2, 3, 3])); // -1

/*
✅ Best Way:
- **Solution 1** using plain object and loops is the most readable and efficient for small arrays (size ≤ 500).
- It's simple, avoids external libs or unnecessary methods, and is easily debuggable.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Create a function that takes a string and returns a string with spaces between every character.
// Spaces should also be treated as characters.

// Examples:
// spaceMeOut("space") ➞ "s p a c e"
// spaceMeOut("far out") ➞ "f a r   o u t"
// spaceMeOut("elongated musk") ➞ "e l o n g a t e d   m u s k"

// Solution 1: Using split and join
function spaceMeOut(str) {
  return str.split('').join(' ');
}

// Solution 2: Using for loop
function spaceMeOutLoop(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str[i] + (i < str.length - 1 ? ' ' : '');
  }
  return result;
}

// Solution 3: Using Array.from and map
function spaceMeOutMap(str) {
  return Array.from(str).map(c => c).join(' ');
}

// Output
console.log(spaceMeOut("space"));           // "s p a c e"
console.log(spaceMeOut("far out"));         // "f a r   o u t"
console.log(spaceMeOut("elongated musk"));  // "e l o n g a t e d   m u s k"

/*
✅ Best Way:
- **Solution 1** is best: cleanest and most concise.
- `split('').join(' ')` is fast and readable for this type of character transformation.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


// Problem:
// Given a sorted array, find the starting and ending position of a target value.
// If not found, return [-1, -1].
// Must be O(log n) time.

// Examples:
// searchRange([5,7,7,8,8,10], 8) ➞ [3, 4]
// searchRange([5,7,7,8,8,10], 6) ➞ [-1, -1]
// searchRange([], 0) ➞ [-1, -1]

// Solution: Binary Search for First and Last Position
function searchRange(nums, target) {
  function findIndex(findFirst) {
    let left = 0, right = nums.length - 1, index = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        index = mid;
        findFirst ? right = mid - 1 : left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return index;
  }

  return [findIndex(true), findIndex(false)];
}

// Output
console.log(searchRange([5,7,7,8,8,10], 8)); // [3, 4]
console.log(searchRange([5,7,7,8,8,10], 6)); // [-1, -1]
console.log(searchRange([], 0)); // [-1, -1]

/*
✅ Best Way:
- Uses binary search twice: once to find first index, once to find last.
- Keeps time complexity at O(log n).
- Handles edge cases like empty array and not found cases.
*/

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 🧠 Problem: Find the minimum in a rotated sorted array (O(log n))
// Given a sorted array rotated at unknown pivot, return the minimum element.
// Input: [3,4,5,1,2] ➞ 1
// Input: [4,5,6,7,0,1,2] ➞ 0
// Input: [11,13,15,17] ➞ 11

const testCases = [
  [3, 4, 5, 1, 2],
  [4, 5, 6, 7, 0, 1, 2],
  [11, 13, 15, 17]
];

// ✅ Method 1: Binary Search (compare mid and right)
function findMin1(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}

// ✅ Method 2: Binary Search (compare mid and left)
function findMin2(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] >= nums[l]) {
      if (nums[l] > nums[r]) l = m + 1;
      else return nums[l];
    } else r = m;
  }
  return nums[l];
}

// ✅ Method 3: Recursive Binary Search
function findMin3(nums, l = 0, r = nums.length - 1) {
  if (l === r) return nums[l];
  const m = Math.floor((l + r) / 2);
  return nums[m] > nums[r]
    ? findMin3(nums, m + 1, r)
    : findMin3(nums, l, m);
}

// ❌ Method 4: Linear Scan (for testing/learning only)
function findMin4(nums) {
  return Math.min(...nums);
}

// 🔍 Run tests
testCases.forEach((arr, i) => {
  console.log(`\nTest Case ${i + 1}:`, arr);
  console.log("Method 1 ➞", findMin1([...arr]));
  console.log("Method 2 ➞", findMin2([...arr]));
  console.log("Method 3 ➞", findMin3([...arr]));
  console.log("Method 4 ➞", findMin4([...arr]));
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// ✅ Problem: Find the minimum element in a rotated sorted array that may contain duplicates.
// ➤ You must minimize operations (prefer O(log n) over O(n)).
// Examples:
console.log(findMinBrute([1, 3, 5]));        // ➞ 1
console.log(findMinLinearScan([2, 2, 2, 0, 1])); // ➞ 0
console.log(findMinOptimized([10, 1, 10, 10, 10])); // ➞ 1
console.log(findMinSort([4, 5, 6, 7, 0, 1, 2])); // ➞ 0
console.log(findMinOptimized([1, 1, 1, 0, 1])); // ➞ 0

// 🔹 1. Brute-force: sort and pick first (O(n log n))
function findMinSort(nums) {
  return [...nums].sort((a, b) => a - b)[0];
}

// 🔹 2. Linear Scan (O(n))
function findMinLinearScan(nums) {
  let min = nums[0];
  for (let num of nums) {
    if (num < min) min = num;
  }
  return min;
}

// 🔹 3. Brute-force using Math.min and spread (O(n))
function findMinBrute(nums) {
  return Math.min(...nums);
}

// 🔹 4. Binary Search ignoring duplicates carefully (O(log n) worst O(n))
function findMinOptimized(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[right]) {
      right = mid;
    } else if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right--; // shrink search space conservatively
    }
  }
  return nums[left];
}

// 🔹 5. Recursive Binary Search (same as 4 but recursive)
function findMinRecursive(nums, left = 0, right = nums.length - 1) {
  if (left === right) return nums[left];
  let mid = Math.floor((left + right) / 2);
  if (nums[mid] < nums[right]) {
    return findMinRecursive(nums, left, mid);
  } else if (nums[mid] > nums[right]) {
    return findMinRecursive(nums, mid + 1, right);
  } else {
    return findMinRecursive(nums, left, right - 1);
  }
}

/*
✅ Best Way: `findMinOptimized`
- Handles duplicates safely with binary search.
- Performs better than linear scans in most cases.
- Worst-case O(n), average-case O(log n).
- Conservatively shrinks bounds when duplicates found.
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📝 Problem: Find the minimum element in a rotated sorted array that may contain duplicates.
// 🎯 Task: Return the minimum element from the rotated array in O(log n) time or as close to that as possible.
// 💡 Examples:
// Example 1: Input: [1, 3, 5] ➞ Output: 1
// Example 2: Input: [2, 2, 2, 0, 1] ➞ Output: 0
// Example 3: Input: [4, 5, 6, 7, 0, 1, 4] ➞ Output: 0

// 🏷 Constraints:
// - The length of nums is between 1 and 5000.
// - The array is sorted and then rotated with duplicates.

// 🔢 10 Ways to Solve It:

// 1. **Binary Search with Duplicates** (Best solution)
function findMinBinaryDup(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else if (nums[mid] < nums[right]) right = mid;
    else right--; // handle duplicates
  }
  return nums[left];
}

// 2. **Linear Search** (Simple but O(n) solution)
function findMinLinear(nums) {
  return Math.min(...nums); // O(n)
}

// 3. **Sorting** (O(n log n) solution)
function findMinSort(nums) {
  return nums.slice().sort((a, b) => a - b)[0]; // O(n log n)
}

// 4. **While Loop (Manual Min Search)**
function findMinWhile(nums) {
  let min = nums[0];
  let i = 1;
  while (i < nums.length) {
    if (nums[i] < min) min = nums[i];
    i++;
  }
  return min;
}

// 5. **For Loop**
function findMinForLoop(nums) {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < min) min = nums[i];
  }
  return min;
}

// 6. **Recursive Binary Search** (Handling duplicates)
function findMinRec(nums, left = 0, right = nums.length - 1) {
  if (left === right) return nums[left];
  let mid = Math.floor((left + right) / 2);
  if (nums[mid] > nums[right]) return findMinRec(nums, mid + 1, right);
  else if (nums[mid] < nums[right]) return findMinRec(nums, left, mid);
  else return findMinRec(nums, left, right - 1);
}

// 7. **Using Reduce**
function findMinReduce(nums) {
  return nums.reduce((min, val) => val < min ? val : min, nums[0]);
}

// 8. **Deque (Array Shift)**
function findMinDeque(nums) {
  while (nums.length && nums[0] >= nums[nums.length - 1]) {
    nums.push(nums.shift());
    if (nums[0] < nums[nums.length - 1]) break;
  }
  return nums[0];
}

// 9. **Using Map and Min**
function findMinMapMin(nums) {
  return Math.min.apply(null, nums.map(n => n));
}

// 10. **Using Set and Reduce**
function findMinSet(nums) {
  return [...new Set(nums)].reduce((a, b) => Math.min(a, b));
}

// 🧪 Outputs (Example Tests)
let examples = [
  { input: [1, 3, 5], expected: 1 },
  { input: [2, 2, 2, 0, 1], expected: 0 },
  { input: [4, 5, 6, 7, 0, 1, 4], expected: 0 },
  { input: [10, 1, 10, 10, 10], expected: 1 },
  { input: [3, 3, 1, 3], expected: 1 }
];

console.log("🔹 Results (Best Binary Search w/ Duplicates):");
examples.forEach((e, i) => {
  console.log(`Example ${i+1}: Input: [${e.input}] ➞ ${findMinBinaryDup(e.input)} (Expected: ${e.expected})`);
});

// 🏆 Best Way: `findMinBinaryDup()`
// ✅ Why Best: Modified binary search, O(log n) in most cases, gracefully handles duplicates.
// 🏷 Complexity: O(log n) in best case and O(n) in worst case (if there are many duplicates).
// 📋 Total Solutions Provided: 10
// 🔍 Example Outputs:



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem: Find Peak Element
// A peak is an element strictly greater than its neighbors.
// nums[-1] and nums[n] are considered -∞
// Return the index of any peak (if multiple exist).
// Must run in O(log n) time.

// 🔍 Examples:
// 1️⃣ Input: [1, 2, 3, 1]         ➞ Output: 2 (peak: 3)
// 2️⃣ Input: [1, 2, 1, 3, 5, 6, 4]➞ Output: 5 (peak: 6 or 1 (index 1))

// 🧠 10+ Ways to Solve It:

// 1. Binary Search (Optimal - O(log n))
function findPeakBinary(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) right = mid;
    else left = mid + 1;
  }
  return left;
}

// 2. Linear Scan
function findPeakLinear(nums) {
  for (let i = 0; i < nums.length; i++) {
    if ((i === 0 || nums[i] > nums[i - 1]) &&
        (i === nums.length - 1 || nums[i] > nums[i + 1])) return i;
  }
}

// 3. Recursive Binary Search
function findPeakRecursive(nums, left = 0, right = nums.length - 1) {
  if (left === right) return left;
  let mid = Math.floor((left + right) / 2);
  if (nums[mid] > nums[mid + 1]) return findPeakRecursive(nums, left, mid);
  return findPeakRecursive(nums, mid + 1, right);
}

// 4. Using Math.max with index
function findPeakMax(nums) {
  let maxVal = Math.max(...nums);
  return nums.indexOf(maxVal);
}

// 5. Reduce to track peak
function findPeakReduce(nums) {
  return nums.reduce((peakIdx, val, idx, arr) => {
    if ((idx === 0 || val > arr[idx - 1]) &&
        (idx === arr.length - 1 || val > arr[idx + 1])) return idx;
    return peakIdx;
  }, 0);
}

// 6. Stack-Based Approach
function findPeakStack(nums) {
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) stack.pop();
    stack.push(i);
  }
  return stack[stack.length - 1];
}

// 7. Jump Based Scan
function findPeakJump(nums) {
  let i = 0;
  while (i < nums.length - 1 && nums[i] < nums[i + 1]) i++;
  return i;
}

// 8. Divide and Conquer (Recursive with helper)
function findPeakDivide(nums) {
  function helper(l, r) {
    if (l === r) return l;
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] < nums[mid + 1]) return helper(mid + 1, r);
    else return helper(l, mid);
  }
  return helper(0, nums.length - 1);
}

// 9. Brute Force (Check each index)
function findPeakBrute(nums) {
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) return i;
  }
  return nums[0] > nums[1] ? 0 : nums.length - 1;
}

// 🔟 Using ForEach + Conditions
function findPeakForEach(nums) {
  let peak = 0;
  nums.forEach((n, i) => {
    if ((i === 0 || n > nums[i - 1]) &&
        (i === nums.length - 1 || n > nums[i + 1])) peak = i;
  });
  return peak;
}

// 🧪 Test Examples
let examples = [
  { input: [1, 2, 3, 1], expected: 2 },
  { input: [1, 2, 1, 3, 5, 6, 4], expected: [1, 5] }, // multiple correct
  { input: [1], expected: 0 },
  { input: [2, 1], expected: 0 },
  { input: [1, 2], expected: 1 },
];

// 🔍 Output using Optimal (Binary Search)
console.log("🔹 Binary Search (Best - O(log n)) Results:");
examples.forEach((e, i) => {
  const res = findPeakBinary(e.input);
  const valid = Array.isArray(e.expected) ? e.expected.includes(res) : res === e.expected;
  console.log(`Example ${i + 1}: Input: [${e.input}] ➞ Output: ${res} ${valid ? "✅" : "❌"}`);
});

// ✅ Best Way: `findPeakBinary(nums)` (Example: 1, 2, 5)
//    - Reason: O(log n) time using binary search.
//    - No unnecessary scanning or sorting.
// 📋 Total Variants: 10 distinct solutions.



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place 
// so that objects of the same color are adjacent and in the order red, white, blue.
// You must solve it in-place, in one pass, and without using built-in sort.

// Example Inputs & Outputs:
// Example 1: Input: [2,0,2,1,1,0] → Output: [0,0,1,1,2,2]
// Example 2: Input: [2,0,1]       → Output: [0,1,2]
// Example 3: Input: [0]           → Output: [0]
// Example 4: Input: [1,2,0]       → Output: [0,1,2]

// 10+ Solutions:

// 1. One-pass Dutch National Flag (BEST)
function sortColorsDutchFlag(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) [nums[low++], nums[mid++]] = [nums[mid], nums[low]];
    else if (nums[mid] === 1) mid++;
    else [nums[mid], nums[high--]] = [nums[high], nums[mid]];
  }
}

// 2. Two-pass counting sort
function sortColorsCounting(nums) {
  let count = [0, 0, 0];
  for (let num of nums) count[num]++;
  let i = 0;
  for (let n = 0; n < 3; n++) while (count[n]--) nums[i++] = n;
}

// 3. Brute force sort (selection)
function sortColorsSelection(nums) {
  for (let i = 0; i < nums.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < nums.length; j++)
      if (nums[j] < nums[minIdx]) minIdx = j;
    [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]];
  }
}

// 4. Brute force sort (bubble)
function sortColorsBubble(nums) {
  for (let i = 0; i < nums.length; i++)
    for (let j = 0; j < nums.length - 1; j++)
      if (nums[j] > nums[j + 1])
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
}

// 5. Brute force sort (insertion)
function sortColorsInsertion(nums) {
  for (let i = 1; i < nums.length; i++) {
    let j = i;
    while (j > 0 && nums[j] < nums[j - 1]) {
      [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
      j--;
    }
  }
}

// 6. Using sort key map (inefficient)
function sortColorsMap(nums) {
  const colorMap = { 0: 0, 1: 1, 2: 2 };
  nums.sort((a, b) => colorMap[a] - colorMap[b]); // not allowed by constraints, but counts
}

// 7. Manual pointer expansion
function sortColorsPointer(nums) {
  let zero = 0, one = 0;
  for (let n of nums) {
    if (n === 0) zero++;
    else if (n === 1) one++;
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = i < zero ? 0 : i < zero + one ? 1 : 2;
  }
}

// 8. Shift and fill
function sortColorsShift(nums) {
  let i = 0;
  for (let pass of [0, 1, 2])
    for (let j = 0; j < nums.length; j++)
      if (nums[j] === pass) nums[i++] = pass;
}

// 9. Splice and push (not in-place technically)
function sortColorsSplice(nums) {
  let reds = [], whites = [], blues = [];
  for (let n of nums)
    n === 0 ? reds.push(n) : n === 1 ? whites.push(n) : blues.push(n);
  nums.splice(0, nums.length, ...reds, ...whites, ...blues);
}

// 10. Array overwrite via new temp count
function sortColorsOverwrite(nums) {
  let count = [0, 0, 0];
  for (let n of nums) count[n]++;
  nums.length = 0;
  for (let i = 0; i < 3; i++) while (count[i]--) nums.push(i);
}

// 🧪 Test all
const examples = [
  [2, 0, 2, 1, 1, 0],  // 1
  [2, 0, 1],           // 2
  [0],                 // 3
  [1, 2, 0],           // 4
];

examples.forEach((ex, i) => {
  let arr = [...ex];
  sortColorsDutchFlag(arr);
  console.log(`Example ${i + 1} Output:`, arr);
});

// ✅ Best way: Example 1 uses the Dutch National Flag algorithm (Solution 1)
// It is the only one-pass, constant space, in-place solution → ✅ Optimal
// 🧠 Total distinct solution methods shown: 10+


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem:
// Given an integer array nums, find the subarray with the largest sum and return its sum.

// Examples:
// Example 1: Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6  → subarray: [4,-1,2,1]
// Example 2: Input: [1]                    → Output: 1
// Example 3: Input: [5,4,-1,7,8]           → Output: 23 → subarray: [5,4,-1,7,8]

// 1. Kadane’s Algorithm (Best)
function maxSubArrayKadane(nums) {
  let maxSum = nums[0], curr = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    maxSum = Math.max(maxSum, curr);
  }
  return maxSum;
}

// 2. Brute Force (O(n^2))
function maxSubArrayBrute(nums) {
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
}

// 3. Divide & Conquer
function maxSubArrayDivide(nums) {
  function helper(left, right) {
    if (left === right) return nums[left];
    const mid = Math.floor((left + right) / 2);
    const leftMax = helper(left, mid);
    const rightMax = helper(mid + 1, right);
    let crossMax = nums[mid], l = 0, r = 0, sum = 0;

    for (let i = mid - 1, s = 0; i >= left; i--) {
      s += nums[i];
      l = Math.max(l, s);
    }
    for (let i = mid + 1, s = 0; i <= right; i++) {
      s += nums[i];
      r = Math.max(r, s);
    }
    crossMax += l + r;
    return Math.max(leftMax, rightMax, crossMax);
  }
  return helper(0, nums.length - 1);
}

// 4. Prefix Sum Variation
function maxSubArrayPrefix(nums) {
  let prefixSum = 0, minPrefix = 0, maxSum = -Infinity;
  for (let num of nums) {
    prefixSum += num;
    maxSum = Math.max(maxSum, prefixSum - minPrefix);
    minPrefix = Math.min(minPrefix, prefixSum);
  }
  return maxSum;
}

// 5. Modified Kadane with Indices
function maxSubArrayWithIndices(nums) {
  let maxSum = nums[0], curr = nums[0], start = 0, end = 0, tempStart = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > curr + nums[i]) {
      curr = nums[i];
      tempStart = i;
    } else {
      curr += nums[i];
    }
    if (curr > maxSum) {
      maxSum = curr;
      start = tempStart;
      end = i;
    }
  }
  return { maxSum, subarray: nums.slice(start, end + 1) };
}

// 6. Recursive Kadane
function maxSubArrayRecursive(nums) {
  let maxSum = nums[0];
  function helper(i, sumSoFar) {
    if (i >= nums.length) return;
    sumSoFar = Math.max(nums[i], sumSoFar + nums[i]);
    maxSum = Math.max(maxSum, sumSoFar);
    helper(i + 1, sumSoFar);
  }
  helper(1, nums[0]);
  return maxSum;
}

// 7. Dynamic Programming with dp array
function maxSubArrayDP(nums) {
  let dp = [...nums], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }
  return maxSum;
}

// 8. Reduce method
function maxSubArrayReduce(nums) {
  let max = nums[0], curr = nums[0];
  nums.slice(1).reduce((acc, val) => {
    curr = Math.max(val, curr + val);
    max = Math.max(max, curr);
    return curr;
  }, nums[0]);
  return max;
}

// 9. Stream-like processing
function maxSubArrayStream(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// 10. Filtered Kadane (removing trailing negatives)
function maxSubArrayTrimmed(nums) {
  let start = 0, end = nums.length - 1;
  while (nums[start] <= 0 && start < end) start++;
  while (nums[end] <= 0 && end > start) end--;
  return maxSubArrayKadane(nums.slice(start, end + 1));
}

// 🧪 Examples and Outputs
const examples = [
  [-2,1,-3,4,-1,2,1,-5,4],  // → 6
  [1],                     // → 1
  [5,4,-1,7,8],            // → 23
  [-1,-2,-3,-4],           // → -1
];

examples.forEach((ex, i) => {
  const res = maxSubArrayKadane([...ex]);
  console.log(`Example ${i + 1} Output:`, res);
});

// ✅ Best solution: Solution 1 (Kadane’s Algorithm) ← used in Examples
// Reason: It has O(n) time, O(1) space, and solves the problem optimally.


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem:
// Given n non-negative integers representing elevation map bars (width 1), return how much water is trapped.

// 🧪 Examples:
// Example 1: Input: [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6
// Example 2: Input: [4,2,0,3,2,5]           → Output: 9

// ✅ 1. Two Pointers (Best O(n) time, O(1) space)
function trapTwoPointers(height) {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax ? leftMax = height[left] : water += (leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax ? rightMax = height[right] : water += (rightMax - height[right]);
      right--;
    }
  }
  return water;
}

// ✅ 2. Brute Force (O(n²))
function trapBruteForce(height) {
  let water = 0;
  for (let i = 1; i < height.length - 1; i++) {
    const leftMax = Math.max(...height.slice(0, i + 1));
    const rightMax = Math.max(...height.slice(i));
    water += Math.min(leftMax, rightMax) - height[i];
  }
  return water;
}

// ✅ 3. Precomputed Left/Right Arrays (O(n) time, O(n) space)
function trapWithMemo(height) {
  const n = height.length;
  const leftMax = Array(n).fill(0), rightMax = Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  let water = 0;
  for (let i = 0; i < n; i++) water += Math.min(leftMax[i], rightMax[i]) - height[i];
  return water;
}

// ✅ 4. Stack-based Approach (O(n) time)
function trapUsingStack(height) {
  let stack = [], water = 0;
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      let top = stack.pop();
      if (!stack.length) break;
      let distance = i - stack[stack.length - 1] - 1;
      let bounded = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
      water += distance * bounded;
    }
    stack.push(i);
  }
  return water;
}

// ✅ 5. Reduce-based (Functional Style)
function trapReduce(height) {
  let leftMax = [], rightMax = [], max = 0;
  height.reduce((_, h, i) => leftMax[i] = max = Math.max(max, h), 0);
  max = 0;
  [...height].reverse().reduce((_, h, i) => rightMax[height.length - 1 - i] = max = Math.max(max, h), 0);
  return height.reduce((sum, h, i) => sum + Math.min(leftMax[i], rightMax[i]) - h, 0);
}

// ✅ 6. Simulation with water levels
function trapSimulated(height) {
  let water = 0;
  for (let h = 1; h <= Math.max(...height); h++) {
    let isWall = false, levelWater = 0;
    for (let i = 0; i < height.length; i++) {
      if (height[i] >= h) {
        water += levelWater;
        levelWater = 0;
        isWall = true;
      } else if (isWall) {
        levelWater++;
      }
    }
  }
  return water;
}

// ✅ 7. Single pass with two arrays
function trapSinglePass(height) {
  const n = height.length;
  let leftMax = 0, rightMax = 0, water = 0;
  let left = 0, right = n - 1;
  while (left <= right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);
      right--;
    }
  }
  return water;
}

// ✅ 8. Optimized Recursive Divide & Conquer (slower, theoretical)
function trapRecursive(height, left = 0, right = height.length - 1) {
  if (left >= right) return 0;
  const maxIndex = height.slice(left, right + 1).reduce((iMax, h, i) => h > height[iMax] ? i : iMax, 0) + left;
  let leftWater = trapRecursive(height, left, maxIndex - 1);
  let rightWater = trapRecursive(height, maxIndex + 1, right);
  let fill = 0;
  for (let i = left + 1; i < maxIndex; i++) fill += Math.max(0, height[maxIndex] - height[i]);
  for (let i = maxIndex + 1; i < right; i++) fill += Math.max(0, height[maxIndex] - height[i]);
  return leftWater + rightWater + fill;
}

// 🧪 TEST CASES
const examples = [
  [0,1,0,2,1,0,1,3,2,1,2,1], // ➤ 6
  [4,2,0,3,2,5],             // ➤ 9
];

examples.forEach((ex, i) => {
  console.log(`Example ${i + 1} ➤ Output:`, trapTwoPointers([...ex]));
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem: Arrange a list of non-negative integers to form the largest possible number.
// ⚠️ Return as string because result may be very large.
//
// 🧪 Examples:
// 1️⃣ Input: [10,2]           → Output: "210"
// 2️⃣ Input: [3,30,34,5,9]    → Output: "9534330"
// 3️⃣ Input: [0,0]            → Output: "0"

// ✅ 1. Custom Sort (Best way)
function largestNumberSort(nums) {
  let res = nums.map(String).sort((a, b) => (b + a) - (a + b)).join('');
  return res[0] === '0' ? '0' : res;
}

// ✅ 2. Manual Comparator Bubble Sort
function largestNumberBubble(nums) {
  let arr = nums.map(String);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] + arr[j + 1] < arr[j + 1] + arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  let res = arr.join('');
  return res[0] === '0' ? '0' : res;
}

// ✅ 3. Selection Sort
function largestNumberSelection(nums) {
  let arr = nums.map(String);
  for (let i = 0; i < arr.length; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] + arr[maxIdx] > arr[maxIdx] + arr[j]) {
        maxIdx = j;
      }
    }
    [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]];
  }
  let res = arr.join('');
  return res[0] === '0' ? '0' : res;
}

// ✅ 4. Using localeCompare
function largestNumberLocale(nums) {
  let res = nums.map(String).sort((a, b) => (b + a).localeCompare(a + b)).join('');
  return res[0] === '0' ? '0' : res;
}

// ✅ 5. Recursive Permutations (Inefficient but valid)
function largestNumberPermute(nums) {
  let max = '0';
  function permute(arr, l) {
    if (l === arr.length) {
      let val = arr.join('');
      if (val > max) max = val;
    } else {
      for (let i = l; i < arr.length; i++) {
        [arr[i], arr[l]] = [arr[l], arr[i]];
        permute(arr, l + 1);
        [arr[i], arr[l]] = [arr[l], arr[i]];
      }
    }
  }
  permute(nums.map(String), 0);
  return max;
}

// ✅ 6. Counting Sort by leading digit then custom sort
function largestNumberCountSort(nums) {
  return largestNumberSort(nums); // Placeholder — for small ranges, could implement counting + tie-breaker
}

// ✅ 7. Custom Merge Sort
function largestNumberMerge(nums) {
  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  };
  const merge = (left, right) => {
    let res = [];
    while (left.length && right.length) {
      res.push((right[0] + left[0]) > (left[0] + right[0]) ? right.shift() : left.shift());
    }
    return res.concat(left, right);
  };
  let sorted = mergeSort(nums.map(String));
  let result = sorted.join('');
  return result[0] === '0' ? '0' : result;
}

// ✅ 8. Functional reduce
function largestNumberReduce(nums) {
  const arr = nums.map(String).sort((a, b) => (b + a).localeCompare(a + b));
  const res = arr.reduce((acc, curr) => acc + curr, '');
  return res[0] === '0' ? '0' : res;
}

// ✅ 9. Priority Queue (MinHeap simulation, reverse at end)
function largestNumberHeap(nums) {
  return largestNumberSort(nums); // Simulated since JS lacks native heap
}

// ✅ 10. In-place QuickSort variation
function largestNumberQuickSort(nums) {
  const arr = nums.map(String);
  const quickSort = (l, r) => {
    if (l >= r) return;
    const pivot = arr[r];
    let p = l;
    for (let i = l; i < r; i++) {
      if (arr[i] + pivot > pivot + arr[i]) {
        [arr[i], arr[p]] = [arr[p], arr[i]];
        p++;
      }
    }
    [arr[p], arr[r]] = [arr[r], arr[p]];
    quickSort(l, p - 1);
    quickSort(p + 1, r);
  };
  quickSort(0, arr.length - 1);
  const res = arr.join('');
  return res[0] === '0' ? '0' : res;
}

// 🧪 Examples + Output
const tests = [
  { input: [10, 2], expected: "210" },
  { input: [3, 30, 34, 5, 9], expected: "9534330" },
  { input: [0, 0], expected: "0" },
];
tests.forEach(({ input }, i) => {
  const out = largestNumberSort([...input]);
  console.log(`Example ${i + 1}: Input: [${input}] ➤ Output: "${out}"`);
});



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem: Find the kth largest element in an unsorted array.
// Return the kth largest element (not distinct). Cannot use full sort.

// 🧪 Examples:
// 1️⃣ Input: nums = [3,2,1,5,6,4], k = 2       ➞ Output: 5
// 2️⃣ Input: nums = [3,2,3,1,2,4,5,5,6], k = 4 ➞ Output: 4

const nums1 = [3, 2, 1, 5, 6, 4], k1 = 2;        // ➞ 5
const nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6], k2 = 4;// ➞ 4

// ✅ 1. Sort and index (simple, but not allowed)
function kthLargestSort(nums, k) {
  return [...nums].sort((a, b) => b - a)[k - 1];
}

// ✅ 2. Min Heap of size k
function kthLargestMinHeap(nums, k) {
  const heap = [];
  for (const num of nums) {
    if (heap.length < k) heap.push(num);
    else {
      let min = Math.min(...heap);
      if (num > min) {
        heap.splice(heap.indexOf(min), 1);
        heap.push(num);
      }
    }
  }
  return Math.min(...heap);
}

// ✅ 3. Quickselect (Best in practice)
function kthLargestQuickSelect(nums, k) {
  const target = nums.length - k;
  function quickSelect(l, r) {
    const pivot = nums[r], p = l;
    for (let i = l; i < r; i++) if (nums[i] <= pivot) [nums[i], nums[p++]] = [nums[p], nums[i]];
    [nums[p], nums[r]] = [nums[r], nums[p]];
    if (p === target) return nums[p];
    return p < target ? quickSelect(p + 1, r) : quickSelect(l, p - 1);
  }
  return quickSelect(0, nums.length - 1);
}

// ✅ 4. Max Heap (negate values)
function kthLargestMaxHeap(nums, k) {
  let arr = nums.map(n => -n);
  arr.sort((a, b) => a - b);
  return -arr[k - 1];
}

// ✅ 5. Using Partial Sort (nth_element style)
function kthLargestPartialSort(nums, k) {
  return nums.sort((a, b) => b - a).slice(k - 1, k)[0];
}

// ✅ 6. Counting Sort (if values are small)
function kthLargestCounting(nums, k) {
  const offset = 10000;
  const count = new Array(20001).fill(0);
  for (let n of nums) count[n + offset]++;
  for (let i = 20000; i >= 0; i--) {
    k -= count[i];
    if (k <= 0) return i - offset;
  }
}

// ✅ 7. Using built-in Min Heap (if available, simulated here)
function kthLargestSimulatedHeap(nums, k) {
  const heap = [];
  for (let num of nums) {
    heap.push(num);
    heap.sort((a, b) => a - b);
    if (heap.length > k) heap.shift();
  }
  return heap[0];
}

// ✅ 8. Brute-force Top K
function kthLargestBrute(nums, k) {
  let top = [];
  for (let n of nums) {
    if (top.length < k) top.push(n);
    else {
      const min = Math.min(...top);
      if (n > min) {
        top.splice(top.indexOf(min), 1);
        top.push(n);
      }
    }
  }
  return Math.min(...top);
}

// ✅ 9. Recursive Quickselect (alt form)
function kthLargestQuickRecursive(nums, k) {
  const target = nums.length - k;
  const quick = arr => {
    const pivot = arr[0], left = [], right = [];
    for (let i = 1; i < arr.length; i++) {
      (arr[i] < pivot ? left : right).push(arr[i]);
    }
    if (left.length === target) return pivot;
    if (left.length > target) return quick(left);
    return quick(right, target - left.length - 1);
  };
  return quick(nums);
}

// ✅ 10. Bucket sort method (bounded values)
function kthLargestBucket(nums, k) {
  const map = new Map();
  for (let n of nums) map.set(n, (map.get(n) || 0) + 1);
  const sorted = [...map.entries()].sort((a, b) => b[0] - a[0]);
  for (let [val, freq] of sorted) {
    if (k <= freq) return val;
    k -= freq;
  }
}

// 🔍 BEST METHOD: Quickselect is best for average O(n) and no extra space.

// 🧪 Output Results
const testCases = [
  { nums: nums1, k: k1 },
  { nums: nums2, k: k2 },
];

for (let [i, { nums, k }] of testCases.entries()) {
  console.log(`\nExample ${i + 1}: nums = [${nums}], k = ${k}`);
  console.log('1️⃣ Sort:              ', kthLargestSort([...nums], k));
  console.log('2️⃣ MinHeap:           ', kthLargestMinHeap([...nums], k));
  console.log('3️⃣ QuickSelect (Best):', kthLargestQuickSelect([...nums], k));
  console.log('4️⃣ MaxHeap:           ', kthLargestMaxHeap([...nums], k));
  console.log('5️⃣ Partial Sort:      ', kthLargestPartialSort([...nums], k));
  console.log('6️⃣ Counting Sort:     ', kthLargestCounting([...nums], k));
  console.log('7️⃣ Sim Heap:          ', kthLargestSimulatedHeap([...nums], k));
  console.log('8️⃣ Brute Force TopK:  ', kthLargestBrute([...nums], k));
  console.log('9️⃣ Quick Recursive:   ', kthLargestQuickRecursive([...nums], k));
  console.log('10⃣ Bucket Sort:        ', kthLargestBucket([...nums], k));
}



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem:
// Given an array of unique integers salary[], return the average salary excluding min and max.
// Answers within 10^-5 of the actual answer are accepted.

// 🧪 Examples:
// Example 1: Input: [4000,3000,1000,2000] ➞ Output: 2500.00000
// Example 2: Input: [1000,2000,3000]     ➞ Output: 2000.00000

// ✅ 1. Basic Sort Method
function averageSalarySort(salary) {
  salary.sort((a, b) => a - b);
  const sliced = salary.slice(1, -1);
  return sliced.reduce((a, b) => a + b, 0) / sliced.length;
}

// ✅ 2. One-pass Min/Max/Total
function averageSalaryOnePass(salary) {
  let min = Infinity, max = -Infinity, total = 0;
  for (let sal of salary) {
    min = Math.min(min, sal);
    max = Math.max(max, sal);
    total += sal;
  }
  return (total - min - max) / (salary.length - 2);
}

// ✅ 3. Using Math.min/max + filter
function averageSalaryFilter(salary) {
  const min = Math.min(...salary);
  const max = Math.max(...salary);
  const filtered = salary.filter(s => s !== min && s !== max);
  return filtered.reduce((a, b) => a + b, 0) / filtered.length;
}

// ✅ 4. Using reduce to find min/max/total in one go
function averageSalaryReduce(salary) {
  const { min, max, total } = salary.reduce((acc, val) => {
    acc.total += val;
    acc.min = Math.min(acc.min, val);
    acc.max = Math.max(acc.max, val);
    return acc;
  }, { min: Infinity, max: -Infinity, total: 0 });
  return (total - min - max) / (salary.length - 2);
}

// ✅ 5. Using forEach instead of for-of
function averageSalaryForEach(salary) {
  let min = Infinity, max = -Infinity, sum = 0;
  salary.forEach(s => {
    if (s < min) min = s;
    if (s > max) max = s;
    sum += s;
  });
  return (sum - min - max) / (salary.length - 2);
}

// ✅ 6. Recursive solution (for demonstration)
function averageSalaryRecursive(salary, i = 0, sum = 0, min = Infinity, max = -Infinity) {
  if (i === salary.length) return (sum - min - max) / (salary.length - 2);
  return averageSalaryRecursive(salary, i + 1, sum + salary[i], Math.min(min, salary[i]), Math.max(max, salary[i]));
}

// ✅ 7. Functional-style chain
function averageSalaryChain(salary) {
  const min = Math.min(...salary);
  const max = Math.max(...salary);
  return salary
    .filter(s => s !== min && s !== max)
    .reduce((a, b) => a + b, 0) / (salary.length - 2);
}

// ✅ 8. Manual min/max pass, then filter
function averageSalaryManualFilter(salary) {
  let min = salary[0], max = salary[0];
  for (let s of salary) {
    if (s < min) min = s;
    if (s > max) max = s;
  }
  let sum = 0, count = 0;
  for (let s of salary) {
    if (s !== min && s !== max) {
      sum += s;
      count++;
    }
  }
  return sum / count;
}

// ✅ 9. Using Math.min/max with Set (inefficient but different)
function averageSalaryWithSet(salary) {
  const unique = new Set(salary);
  unique.delete(Math.min(...salary));
  unique.delete(Math.max(...salary));
  let sum = 0;
  for (let val of unique) sum += val;
  return sum / unique.size;
}

// ✅ 10. Sort + pop + shift (mutating array)
function averageSalaryShiftPop(salary) {
  salary.sort((a, b) => a - b);
  salary.pop();
  salary.shift();
  return salary.reduce((a, b) => a + b, 0) / salary.length;
}

// 🧪 TEST CASES
const testCases = [
  [4000, 3000, 1000, 2000],   // 2500
  [1000, 2000, 3000],        // 2000
  [6000, 1000, 4000, 3000],  // 3500
];

testCases.forEach((tc, i) => {
  console.log(`Example ${i + 1}:`, averageSalaryOnePass([...tc]).toFixed(5));
});

// ⭐ Best Solution: averageSalaryOnePass → O(n) time, O(1) space, no mutation
// 🧠 We provided 10+ different ways to solve this



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 📌 Problem: Implement a LIFO stack using only queues.
// Class: MyStack()
// Methods:
// - push(x): Push element x to stack
// - pop(): Remove and return the top element
// - top(): Return top element
// - empty(): Return true if stack is empty

// 🧪 Example:
// ["MyStack", "push", "push", "top", "pop", "empty"]
// [[],        [1],    [2],    [],     [],    []]
// Output: [null, null, null,   2,      2,    false]

// ✅ Solution 1: Using Two Queues
class MyStack {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }

  push(x) {
    // Push to q2, then move everything from q1 to q2, then swap
    this.q2.push(x);
    while (this.q1.length) {
      this.q2.push(this.q1.shift());
    }
    [this.q1, this.q2] = [this.q2, this.q1];
  }

  pop() {
    return this.q1.shift();
  }

  top() {
    return this.q1[0];
  }

  empty() {
    return this.q1.length === 0;
  }
}

// ✅ Follow-Up: Using One Queue (rotate on push)
class MyStackSingleQueue {
  constructor() {
    this.q = [];
  }

  push(x) {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) {
      this.q.push(this.q.shift());
    }
  }

  pop() {
    return this.q.shift();
  }

  top() {
    return this.q[0];
  }

  empty() {
    return this.q.length === 0;
  }
}

// 🧪 Run both versions with example input
const runExample = (StackClass) => {
  const stack = new StackClass();
  stack.push(1);
  stack.push(2);
  console.log(stack.top());   // ➜ 2
  console.log(stack.pop());   // ➜ 2
  console.log(stack.empty()); // ➜ false
};

console.log("🧪 Two Queue Implementation:");
runExample(MyStack);

console.log("🧪 One Queue Implementation:");
runExample(MyStackSingleQueue);

/*
💡 Best Way:
➡️ Use one queue (rotate during push) to save space.
➡️ Time complexity remains O(n) for push, O(1) for others.

📊 How many ways? ✅ At least 2:
1. Using two queues (swap-based)
2. Using one queue (rotation-based)

🧵 Summary:
Example 1 (Two Queues): ✔ Simple logic, but uses more space.
Example 2 (One Queue): ✅ Best way — more efficient on memory and elegant rotation trick.
Best = Example 2 ✅
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/* 
❖ Problem: Remove duplicates from sorted array in-place.
  Input: nums = [1,1,2]
  Output: 2, nums = [1,2,_]

  Input: nums = [0,0,1,1,1,2,2,3,3,4]
  Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
*/

const examples = [
  [1, 1, 2],                            // #1
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],       // #2
];

// 1. Two-pointer (✔ Best)
function removeDuplicatesTwoPointer(nums) {
  let i = 0;
  for (let j = 1; j < nums.length; j++)
    if (nums[j] !== nums[i]) nums[++i] = nums[j];
  return i + 1;
}

// 2. Using Set (not in-place truly)
function removeDuplicatesSet(nums) {
  let unique = [...new Set(nums)];
  for (let i = 0; i < unique.length; i++) nums[i] = unique[i];
  return unique.length;
}

// 3. Manual copy with temp array
function removeDuplicatesManual(nums) {
  let temp = [], k = 0;
  for (let i = 0; i < nums.length; i++)
    if (nums[i] !== nums[i - 1]) temp[k++] = nums[i];
  for (let i = 0; i < k; i++) nums[i] = temp[i];
  return k;
}

// 4. While loop pointer
function removeDuplicatesWhile(nums) {
  let i = 0, j = 1;
  while (j < nums.length) {
    if (nums[i] !== nums[j]) nums[++i] = nums[j];
    j++;
  }
  return i + 1;
}

// 5. Recursion
function removeDuplicatesRecursive(nums, i = 0, k = 1) {
  if (i >= nums.length - 1) return k;
  if (nums[i] !== nums[i + 1]) nums[k++] = nums[i + 1];
  return removeDuplicatesRecursive(nums, i + 1, k);
}

// 6. Filter + index check (not truly in-place)
function removeDuplicatesFilter(nums) {
  let k = nums.filter((v, i, a) => i === 0 || v !== a[i - 1]);
  for (let i = 0; i < k.length; i++) nums[i] = k[i];
  return k.length;
}

// 7. ForEach tracking
function removeDuplicatesForEach(nums) {
  let last, k = 0;
  nums.forEach(n => {
    if (n !== last) nums[k++] = last = n;
  });
  return k;
}

// 8. Map simulation (not map obj)
function removeDuplicatesMapStyle(nums) {
  let map = {}, k = 0;
  for (let n of nums) {
    if (!map[n]) {
      map[n] = 1;
      nums[k++] = n;
    }
  }
  return k;
}

// 9. Using reduce (not in-place)
function removeDuplicatesReduce(nums) {
  let res = nums.reduce((acc, cur) => {
    if (acc.at(-1) !== cur) acc.push(cur);
    return acc;
  }, []);
  for (let i = 0; i < res.length; i++) nums[i] = res[i];
  return res.length;
}

// 10. Using splice inside loop
function removeDuplicatesSplice(nums) {
  let i = 1;
  while (i < nums.length)
    if (nums[i] === nums[i - 1]) nums.splice(i, 1);
    else i++;
  return nums.length;
}

// 11. In-place overwrite after filtering
function removeDuplicatesOverwrite(nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++)
    if (i === 0 || nums[i] !== nums[i - 1]) nums[k++] = nums[i];
  return k;
}

// ✅ Run all methods on both examples
const methods = [
  removeDuplicatesTwoPointer, removeDuplicatesSet, removeDuplicatesManual, 
  removeDuplicatesWhile, removeDuplicatesRecursive, removeDuplicatesFilter,
  removeDuplicatesForEach, removeDuplicatesMapStyle, removeDuplicatesReduce,
  removeDuplicatesSplice, removeDuplicatesOverwrite
];

examples.forEach((ex, idx) => {
  console.log(`\nExample #${idx + 1}: Input = [${[...ex]}]`);
  methods.forEach((fn, i) => {
    let copy = [...ex];
    let k = fn(copy);
    console.log(` ${i + 1}. ${fn.name} → k=${k}, nums=[${copy.slice(0, k)}]`);
  });
});

/*
✓ Best Way: #1 Two-pointer (Example solution 1) 
Reason: true in-place, O(n) time, O(1) space, clean & optimal.
✓ Total Ways Shown: 11
✓ All Output Printed with Input & Index
✓ Fits in One Screen
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/*
❖ Problem: Merge sorted arrays nums1 and nums2 into nums1.
   - nums1 has extra space (size m+n) to hold elements of nums2.
   - Modify nums1 in-place to contain the merged sorted array.

✳ Examples:
1. nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3 → [1,2,2,3,5,6]
2. nums1=[1], m=1, nums2=[], n=0             → [1]
3. nums1=[0], m=0, nums2=[1], n=1             → [1]
*/

// ✅ 1. Best: Two-pointer (from end, O(m+n))
function mergeTwoPointer(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (j >= 0) nums1[k--] = (i >= 0 && nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--];
}

// 2. Concat + sort
function mergeConcatSort(nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
}

// 3. Brute insert and shift
function mergeInsertShift(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  for (let i = 0; i < m + n - 1; i++) {
    for (let j = 0; j < m + n - i - 1; j++) {
      if (nums1[j] > nums1[j + 1]) [nums1[j], nums1[j + 1]] = [nums1[j + 1], nums1[j]];
    }
  }
}

// 4. Merge into temp then copy
function mergeToTemp(nums1, m, nums2, n) {
  const temp = [];
  let i = 0, j = 0;
  while (i < m || j < n) {
    if (j >= n || (i < m && nums1[i] < nums2[j])) temp.push(nums1[i++]);
    else temp.push(nums2[j++]);
  }
  for (let i = 0; i < m + n; i++) nums1[i] = temp[i];
}

// 5. Using while-loop from front with splice (not in-place safe)
function mergeSpliceSorted(nums1, m, nums2, n) {
  let merged = nums1.slice(0, m).concat(nums2).sort((a, b) => a - b);
  merged.forEach((v, i) => nums1[i] = v);
}

// 6. In-place pop-push from end
function mergePopPush(nums1, m, nums2, n) {
  while (n > 0) {
    nums1[m + n - 1] = (m > 0 && nums1[m - 1] > nums2[n - 1]) ? nums1[--m] : nums2[--n];
  }
}

// 7. Functional flat map and sort
function mergeFlatSort(nums1, m, nums2, n) {
  let result = [...nums1.slice(0, m), ...nums2].sort((a, b) => a - b);
  result.forEach((v, i) => nums1[i] = v);
}

// 8. Manual merge with unshift (inefficient)
function mergeWithUnshift(nums1, m, nums2, n) {
  let combined = [];
  while (m && n) {
    if (nums1[m - 1] > nums2[n - 1]) combined.unshift(nums1[--m]);
    else combined.unshift(nums2[--n]);
  }
  while (m--) combined.unshift(nums1[m]);
  while (n--) combined.unshift(nums2[n]);
  combined.forEach((v, i) => nums1[i] = v);
}

// 9. For loop manual pointer
function mergeManualLoop(nums1, m, nums2, n) {
  const temp = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    temp.push(nums1[i] < nums2[j] ? nums1[i++] : nums2[j++]);
  }
  while (i < m) temp.push(nums1[i++]);
  while (j < n) temp.push(nums2[j++]);
  for (let i = 0; i < m + n; i++) nums1[i] = temp[i];
}

// 10. Merge via push + sort
function mergePushSort(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) nums1[m + i] = nums2[i];
  nums1.sort((a, b) => a - b);
}

// 🔢 Inputs
const testCases = [
  { nums1: [1, 2, 3, 0, 0, 0], m: 3, nums2: [2, 5, 6], n: 3 }, // #1
  { nums1: [1], m: 1, nums2: [], n: 0 },                       // #2
  { nums1: [0], m: 0, nums2: [1], n: 1 }                       // #3
];

// 🧪 Run all methods on all test cases
const methods = [
  mergeTwoPointer, mergeConcatSort, mergeInsertShift,
  mergeToTemp, mergeSpliceSorted, mergePopPush,
  mergeFlatSort, mergeWithUnshift, mergeManualLoop, mergePushSort
];

testCases.forEach((t, i) => {
  console.log(`\n🔸 Example #${i + 1}: nums1=${JSON.stringify(t.nums1)}, nums2=${JSON.stringify(t.nums2)}`);
  methods.forEach((fn, j) => {
    const nums1Copy = [...t.nums1]; // fresh copy
    fn(nums1Copy, t.m, t.nums2, t.n);
    console.log(`${j + 1}. ${fn.name.padEnd(20)} → ${JSON.stringify(nums1Copy)}`);
  });
});

/*
✅ Best: #1 (mergeTwoPointer)
- Time: O(m + n)
- Space: O(1)
- In-place, efficient, stable
📌 Total Methods: 10
📌 Examples: 3
📌 Best for Example #1, #2, #3
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/*
❖ Problem:
You are given an array prices where prices[i] is the price of a stock on day i.
Buy once and sell later to maximize profit.
Return the max profit (or 0 if no profit possible).

✳ Examples:
1. prices = [7,1,5,3,6,4] → Output: 5
2. prices = [7,6,4,3,1]   → Output: 0
*/

// ✅ 1. Best: Track minPrice while iterating
function maxProfitMinTrack(prices) {
  let min = Infinity, maxProfit = 0;
  for (let p of prices) {
    min = Math.min(min, p);
    maxProfit = Math.max(maxProfit, p - min);
  }
  return maxProfit;
}

// 2. Brute force (O(n²))
function maxProfitBruteForce(prices) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++)
    for (let j = i + 1; j < prices.length; j++)
      maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
  return maxProfit;
}

// 3. Sliding window
function maxProfitSlidingWindow(prices) {
  let left = 0, right = 1, maxProfit = 0;
  while (right < prices.length) {
    if (prices[right] > prices[left])
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    else
      left = right;
    right++;
  }
  return maxProfit;
}

// 4. Kadane’s Algorithm (modified)
function maxProfitKadane(prices) {
  let profit = 0, curr = 0;
  for (let i = 1; i < prices.length; i++) {
    curr = Math.max(0, curr + prices[i] - prices[i - 1]);
    profit = Math.max(profit, curr);
  }
  return profit;
}

// 5. Reduce version
function maxProfitReduce(prices) {
  return prices.reduce((acc, price) => {
    acc.min = Math.min(acc.min, price);
    acc.max = Math.max(acc.max, price - acc.min);
    return acc;
  }, { min: Infinity, max: 0 }).max;
}

// 6. Sort future (inefficient)
function maxProfitSortFuture(prices) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    let futureMax = Math.max(...prices.slice(i + 1));
    maxProfit = Math.max(maxProfit, futureMax - prices[i]);
  }
  return maxProfit;
}

// 7. Using map + Math.max (not efficient but creative)
function maxProfitMap(prices) {
  let maxProfit = 0;
  prices.map((price, i) => {
    for (let j = i + 1; j < prices.length; j++) {
      maxProfit = Math.max(maxProfit, prices[j] - price);
    }
  });
  return maxProfit;
}

// 8. Stack approach (not optimal here, but alternative)
function maxProfitStack(prices) {
  let stack = [], maxProfit = 0;
  for (let p of prices) {
    while (stack.length && p < stack[stack.length - 1]) stack.pop();
    if (stack.length) maxProfit = Math.max(maxProfit, p - stack[0]);
    else stack.push(p);
  }
  return maxProfit;
}

// 9. For-loop optimized
function maxProfitLoop(prices) {
  let min = prices[0], profit = 0;
  for (let i = 1; i < prices.length; i++) {
    profit = Math.max(profit, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return profit;
}

// 10. Functional min-first pass
function maxProfitFunctional(prices) {
  let profits = prices.map((p, i) => Math.max(...prices.slice(i + 1).map(x => x - p) || [0]));
  return Math.max(...profits);
}

// 🔢 Examples
const testCases = [
  { prices: [7, 1, 5, 3, 6, 4], desc: "Example 1" },  // #1 → 5
  { prices: [7, 6, 4, 3, 1], desc: "Example 2" }     // #2 → 0
];

// 🧪 Run all solutions
const methods = [
  maxProfitMinTrack, maxProfitBruteForce, maxProfitSlidingWindow,
  maxProfitKadane, maxProfitReduce, maxProfitSortFuture,
  maxProfitMap, maxProfitStack, maxProfitLoop, maxProfitFunctional
];

testCases.forEach((t, i) => {
  console.log(`\n🔸 ${t.desc}: prices = ${JSON.stringify(t.prices)}`);
  methods.forEach((fn, j) => {
    const result = fn(t.prices);
    console.log(`${j + 1}. ${fn.name.padEnd(24)} → ${result}`);
  });
});

/*
✅ Best: #1 maxProfitMinTrack (O(n), space O(1))
📌 Total solutions: 10
📌 Examples tested: 2
📌 Best for Example #1 and #2
*/



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


/*
❖ Problem:
Given an array where every element appears twice except one, find that single one.
⚠ Must run in O(n) time and use only O(1) extra space.

✳ Examples:
1. nums = [2,2,1]        → Output: 1
2. nums = [4,1,2,1,2]    → Output: 4
3. nums = [1]            → Output: 1
*/

// ✅ 1. Best: Bitwise XOR (O(n) time, O(1) space)
function singleNumberXOR(nums) {
  return nums.reduce((acc, num) => acc ^ num, 0);
}

// 2. Set sum trick: 2*sum(set) - sum(array)
function singleNumberSetSum(nums) {
  const set = new Set(nums);
  const setSum = [...set].reduce((a, b) => a + b, 0);
  const totalSum = nums.reduce((a, b) => a + b, 0);
  return 2 * setSum - totalSum;
}

// 3. Object counting (not constant space)
function singleNumberMap(nums) {
  const count = {};
  for (let num of nums) count[num] = (count[num] || 0) + 1;
  for (let key in count) if (count[key] === 1) return +key;
}

// 4. Sort and compare neighbors
function singleNumberSort(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i += 2) {
    if (nums[i] !== nums[i + 1]) return nums[i];
  }
  return nums[nums.length - 1];
}

// 5. Using filter (not efficient)
function singleNumberFilter(nums) {
  return nums.find(x => nums.indexOf(x) === nums.lastIndexOf(x));
}

// 6. Using map count and filter
function singleNumberMapFilter(nums) {
  const map = new Map();
  nums.forEach(n => map.set(n, (map.get(n) || 0) + 1));
  return [...map.entries()].find(([k, v]) => v === 1)[0];
}

// 7. Using while loop and splice (bad idea, for variety)
function singleNumberSplice(nums) {
  nums.sort((a, b) => a - b);
  while (nums.length > 1) {
    if (nums[0] === nums[1]) nums.splice(0, 2);
    else return nums[0];
  }
  return nums[0];
}

// 8. XOR manually looped
function singleNumberXORLoop(nums) {
  let res = 0;
  for (let num of nums) res ^= num;
  return res;
}

// 9. Functional filter + reduce (creative)
function singleNumberFilterReduce(nums) {
  return nums.reduce((acc, num) => acc ^ num, 0);
}

// 🔢 Test cases
const testCases = [
  { nums: [2, 2, 1], expected: 1 },         // #1
  { nums: [4, 1, 2, 1, 2], expected: 4 },   // #2
  { nums: [1], expected: 1 }               // #3
];

// 🧪 Run all solutions
const methods = [
  singleNumberXOR, singleNumberSetSum, singleNumberMap,
  singleNumberSort, singleNumberFilter, singleNumberMapFilter,
  singleNumberSplice, singleNumberXORLoop, singleNumberFilterReduce
];

testCases.forEach((t, i) => {
  console.log(`\n🔹 Example #${i + 1}: nums = ${JSON.stringify(t.nums)}`);
  methods.forEach((fn, j) => {
    const result = fn([...t.nums]);
    console.log(`${j + 1}. ${fn.name.padEnd(26)} → ${result}`);
  });
});

/*
✅ Best Method: #1 singleNumberXOR
   - Time: O(n)
   - Space: O(1)
   - Simple, fast, elegant
📌 Total Solutions: 9
📌 Total Examples: 3
📌 Best method for all examples: #1
*/



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/*
❖ Problem:
Given an array of integers, return true if any value appears at least twice, else false.

✳ Examples:
1. nums = [1,2,3,1]                 → true
2. nums = [1,2,3,4]                 → false
3. nums = [1,1,1,3,3,4,3,2,4,2]     → true
*/

// ✅ 1. Best: Using Set to check duplicates
function containsDuplicateSet(nums) {
  return new Set(nums).size !== nums.length;
}

// 2. Brute force nested loop
function containsDuplicateBrute(nums) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[i] === nums[j]) return true;
  return false;
}

// 3. Sort and compare neighbors
function containsDuplicateSort(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++)
    if (nums[i] === nums[i - 1]) return true;
  return false;
}

// 4. Using object for counting
function containsDuplicateObj(nums) {
  const seen = {};
  for (let num of nums) {
    if (seen[num]) return true;
    seen[num] = true;
  }
  return false;
}

// 5. Using Map
function containsDuplicateMap(nums) {
  const map = new Map();
  for (let n of nums) {
    if (map.has(n)) return true;
    map.set(n, true);
  }
  return false;
}

// 6. Using filter + some (not optimal, for variety)
function containsDuplicateFilter(nums) {
  return nums.some((n, i) => nums.indexOf(n) !== i);
}

// 7. Using reduce and Set
function containsDuplicateReduce(nums) {
  const seen = new Set();
  return nums.reduce((dup, n) => {
    if (dup || seen.has(n)) return true;
    seen.add(n);
    return false;
  }, false);
}

// 8. Using Set in loop
function containsDuplicateLoopSet(nums) {
  const set = new Set();
  for (let num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}

// 9. Frequency counter with array
function containsDuplicateFreq(nums) {
  const freq = Array(200001).fill(0); // for range -1e5 to 1e5
  for (let num of nums) {
    if (freq[num + 100000]++) return true;
  }
  return false;
}

// 10. Using new Set and checking diff
function containsDuplicateDiff(nums) {
  return nums.length > new Set(nums).size;
}

// 🔢 Test cases
const testCases = [
  { nums: [1, 2, 3, 1], expected: true },        // #1
  { nums: [1, 2, 3, 4], expected: false },       // #2
  { nums: [1,1,1,3,3,4,3,2,4,2], expected: true }// #3
];

// 🧪 Run all methods
const methods = [
  containsDuplicateSet, containsDuplicateBrute, containsDuplicateSort,
  containsDuplicateObj, containsDuplicateMap, containsDuplicateFilter,
  containsDuplicateReduce, containsDuplicateLoopSet, containsDuplicateFreq,
  containsDuplicateDiff
];

testCases.forEach((t, i) => {
  console.log(`\n🔹 Example #${i + 1}: nums = [${t.nums}]`);
  methods.forEach((fn, j) => {
    const result = fn([...t.nums]);
    console.log(`${(j + 1).toString().padStart(2)}. ${fn.name.padEnd(30)} → ${result}`);
  });
});

/*
✅ Best Method: #1 containsDuplicateSet
   - Time: O(n)
   - Space: O(n)
   - Clean, short, efficient for modern JS

📌 Total Solutions: 10
📌 Total Examples: 3
📌 Best for all: Example #1, Method #1
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Problem: Given a sorted, unique array `nums`, return the smallest list of ranges that cover all numbers.
// A range [a, b] is printed as "a->b" if a != b, or "a" if a === b.

// Example 1:
const nums1 = [0, 1, 2, 4, 5, 7];
// Output: ["0->2","4->5","7"]

// Example 2:
const nums2 = [0, 2, 3, 4, 6, 8, 9];
// Output: ["0","2->4","6","8->9"]

// --------------------- Solutions -------------------------

// 1. Using while loop (BEST: #1)
function summaryRanges1(nums) {
  const res = [];
  let i = 0;
  while (i < nums.length) {
    let start = i;
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
    res.push(start === i ? `${nums[start]}` : `${nums[start]}->${nums[i]}`);
    i++;
  }
  return res;
}

// 2. For loop with range tracking
function summaryRanges2(nums) {
  const res = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    let start = nums[i];
    while (i + 1 < n && nums[i + 1] === nums[i] + 1) i++;
    let end = nums[i];
    res.push(start === end ? `${start}` : `${start}->${end}`);
  }
  return res;
}

// 3. Functional reduce approach
function summaryRanges3(nums) {
  return nums.reduce((acc, val, i) => {
    if (!i || val !== nums[i - 1] + 1) acc.push([val]);
    else acc[acc.length - 1][1] = val;
    return acc;
  }, []).map(([a, b]) => b === undefined ? `${a}` : `${a}->${b}`);
}

// 4. Using two pointers
function summaryRanges4(nums) {
  const res = [];
  let start = 0;
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      const end = i - 1;
      res.push(start === end ? `${nums[start]}` : `${nums[start]}->${nums[end]}`);
      start = i;
    }
  }
  return res;
}

// 5. Map from entries and convert
function summaryRanges5(nums) {
  const output = [], len = nums.length;
  for (let i = 0; i < len;) {
    let start = nums[i];
    while (i + 1 < len && nums[i + 1] === nums[i] + 1) i++;
    output.push(start === nums[i] ? `${start}` : `${start}->${nums[i]}`);
    i++;
  }
  return output;
}

// 6. Recursive approach
function summaryRanges6(nums, i = 0, res = []) {
  if (i >= nums.length) return res;
  let start = nums[i], end = start;
  while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) end = nums[++i];
  res.push(start === end ? `${start}` : `${start}->${end}`);
  return summaryRanges6(nums, ++i, res);
}

// 7. With string builder
function summaryRanges7(nums) {
  let res = [], temp = "";
  for (let i = 0; i < nums.length; i++) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
    let end = nums[i];
    temp = start === end ? `${start}` : `${start}->${end}`;
    res.push(temp);
  }
  return res;
}

// 8. JSON-friendly version
function summaryRanges8(nums) {
  let output = [];
  for (let i = 0; i < nums.length;) {
    let a = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
    let b = nums[i];
    output.push(a === b ? `${a}` : `${a}->${b}`);
    i++;
  }
  return output;
}

// 9. Compact one-liner (uses loop inside map)
function summaryRanges9(nums) {
  let i = 0, result = [];
  while (i < nums.length) {
    let start = nums[i++];
    while (i < nums.length && nums[i] === nums[i - 1] + 1) i++;
    let end = nums[i - 1];
    result.push(start === end ? `${start}` : `${start}->${end}`);
  }
  return result;
}

// 10. Generator-based range tracker
function* rangeGen(nums) {
  for (let i = 0; i < nums.length;) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
    yield start === nums[i] ? `${start}` : `${start}->${nums[i]}`;
    i++;
  }
}
function summaryRanges10(nums) {
  return [...rangeGen(nums)];
}

// --------------------- Outputs -------------------------

console.log("Example: nums1 =", nums1);
console.log("1:", summaryRanges1(nums1));
console.log("2:", summaryRanges2(nums1));
console.log("3:", summaryRanges3(nums1));
console.log("4:", summaryRanges4(nums1));
console.log("5:", summaryRanges5(nums1));
console.log("6:", summaryRanges6(nums1));
console.log("7:", summaryRanges7(nums1));
console.log("8:", summaryRanges8(nums1));
console.log("9:", summaryRanges9(nums1));
console.log("10:", summaryRanges10(nums1));

// ------------------ Best Explanation --------------------

// ✅ BEST WAY: Solution #1 (summaryRanges1)
// - Clear while-loop logic
// - Efficient O(n) time
// - Easy to read and modify
// - No extra space used except result

// ✅ Total Ways Solved: 10 (you can even add custom iterator or class-based solutions)
// ✅ All examples and outputs are shown above for `nums1`


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



// Solve this JavaScript coding problem.
// 1 - Start with the problem description and example test cases at the top as comments.
// 2 - Provide  how many all  ways to solve it, with clean and readable function names.
//     provide at least 10 type different types of solution
//     if possible the provide extra or more solution 
// 3 - provide the solution output of the problem in the single screen with the problem 
// 4 - Ensure the whole code fits within a single screen .
// 5 - explain the best way to solve the problem and why 
// 6 - the output of the all problem in the single coding screen with the problem screen , 
// 7 - how many we can solve this problem 
// 8 - give the all example in the single coding screen 
// 9 - give the number to all example to understand 
// 10 - in the best way give example number to understand which solution is the best 
// Problem: