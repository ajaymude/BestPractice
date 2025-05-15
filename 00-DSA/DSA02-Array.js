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