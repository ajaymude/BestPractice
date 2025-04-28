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



