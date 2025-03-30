







// JavaScript Arrays

//Creating an Array

let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits); // ["Apple", "Banana", "Cherry"]

let numbers = new Array(1, 2, 3, 4);
console.log(numbers); // [1, 2, 3, 4]


// Accessing Array Elements
// let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
console.log(fruits[2]); // Cherry


//  Modifying Array Elements
fruits[1] = "Blueberry";
console.log(fruits); // ["Apple", "Blueberry", "Cherry"]


// Array Properties
console.log(fruits.length); // 3




// JavaScript Array Methods Categorized by Use Case

let fruits = ["Apple", "Banana", "Cherry"];

// // 🔹 Adding & Removing Elements
// 1. fruits.push("Mango"); // Add to end
// 2. fruits.pop(); // Remove last element
// 3. fruits.shift(); // Remove first element
// 4. fruits.unshift("Strawberry"); // Add to beginning
// 5. fruits.splice(1, 1, "Grapes"); // Add/Remove elements

// // 🔹 Searching & Checking Elements
// 6. console.log(fruits.indexOf("Cherry")); // Find index
// 7. console.log(fruits.includes("Banana")); // Check existence
// 8. console.log(fruits.find(fruit => fruit.startsWith("G"))); // Find first match
// 9. console.log(fruits.findIndex(fruit => fruit.startsWith("G"))); // Find index of first match
// 10. console.log(fruits.some(fruit => fruit.length > 5)); // Check if any match
// 11. console.log(fruits.every(fruit => fruit.length > 3)); // Check if all match

// // 🔹 Slicing, Splicing & Extracting
// 12. let sliced = fruits.slice(1, 3); // Extract part
// 13. let combined = fruits.concat(["Pineapple", "Mango"]); // Merge arrays
// 14. console.log(fruits.join(", ")); // Convert to string
// 15. console.log(fruits.at(-1)); // Access by index

// // 🔹 Sorting & Reversing
// 16. console.log(fruits.sort()); // Sort alphabetically
// 17. console.log(fruits.reverse()); // Reverse order
// 18. console.log(numbers.toSorted((a, b) => b - a)); // Immutable sort
// 19. console.log(numbers.toReversed()); // Immutable reverse

// // 🔹 Iteration & Transformation
// 20. fruits.forEach((fruit, index) => console.log(`${index}: ${fruit}`)); // Loop through
// 21. let upperCaseFruits = fruits.map(fruit => fruit.toUpperCase()); // Transform
// 22. let longNames = fruits.filter(fruit => fruit.length > 6); // Get matching elements
// 23. let sum = numbers.reduce((acc, num) => acc + num, 0); // Reduce to single value
// 24. let flatMapped = numbers.flatMap(num => [num, num * 2]); // Map and flatten

// // 🔹 Working with Keys & Values
// 25. let keys = fruits.keys(); // Iterator of keys
// 26. let values = fruits.values(); // Iterator of values
// 27. let entries = fruits.entries(); // Key-value pairs

// // 🔹 Advanced Array Methods
// 28. console.log(new Array(5).fill(0)); // Fill an array with value
// 29. console.log(Array.from("Hello")); // Create array from iterable
// 30. console.log(nestedArray.flat(2)); // Flatten nested arrays
// 31. console.log(numbers.toSpliced(2, 1, 99)); // Immutable splice
