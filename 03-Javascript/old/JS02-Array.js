// 01 - array operations , 
//      creating, accessing , modify, properties, destructuring, skipping , default value 
//      swap value , rest operator , nesting , for of 
// 02 - JavaScript Array Methods Categorized by Use Case


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// 01 - array operations , 
//      creating, accessing , modify, properties, destructuring, skipping , default value 
//      swap value , rest operator , nesting , for of 

// 01 - Creating an Array

let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits); // ["Apple", "Banana", "Cherry"]

let numbers = new Array(1, 2, 3, 4);
console.log(numbers); // [1, 2, 3, 4]

// 02 -  Accessing Array Elements
// let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
console.log(fruits[2]); // Cherry

// 03 - Modifying Array Elements
fruits[1] = "Blueberry";
console.log(fruits); // ["Apple", "Blueberry", "Cherry"]

// 04 - Array Properties
console.log(fruits.length); // 3

// 05 - Basic Array Destructuring
const numbers = [10, 20, 30];
const [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

// 06 - Skipping Elements
const numbers = [1, 2, 3, 4, 5];
const [first, , third] = numbers;

console.log(first); // 1
console.log(third); // 3

// 07 - Default Values
const numbers = [100];
const [x, y = 200] = numbers;

console.log(x); // 100
console.log(y); // 200 (default value)


// 8 swap the variable 
let a = 5, b = 10;
[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5

// 08 - Using the Rest Operator (...)
const colors = ["Red", "Blue", "Green", "Yellow"];
const [firstColor, secondColor, ...otherColors] = colors;

console.log(firstColor); // "Red"
console.log(secondColor); // "Blue"
console.log(otherColors); // ["Green", "Yellow"]

// 09 -Nested Array Destructuring
const numbers = [1, [2, 3], 4];
const [one, [two, three], four] = numbers;

console.log(one);   // 1
console.log(two);   // 2
console.log(three); // 3
console.log(four);  // 4

// 10 - Using for...of with entries() for Index & Value
const fruits = ["Apple", "Banana", "Cherry"];

for (const [index, fruit] of fruits.entries()) {
  console.log(`Index: ${index}, Fruit: ${fruit}`);
}



/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// 02 - JavaScript Array Methods Categorized by Use Case

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

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Array.isArray() is a built-in JavaScript method used to check if a value is an array

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("hello")); // false
console.log(Array.isArray({ a: 1 })); // false
console.log(Array.isArray(new Array())); // true
console.log(Array.isArray(undefined)); // false
console.log(Array.isArray(null)); // false

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const arr = Array.from([1, 2, 3], (x) => x * 2);
console.log(arr); // Output: [2, 4, 6]

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const colors = ["red", "green", "blue", "yellow"];

console.log(colors.at(0)); // 'red'
console.log(colors.at(2)); // 'blue'
console.log(colors.at(-1)); // 'yellow' (last element)
console.log(colors.at(-2)); // 'blue'

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 01 - push method  

// 1. Basic push of a single item
let fruits = ['apple', 'banana'];
fruits.push('orange');
console.log('1:', fruits); // ['apple', 'banana', 'orange']

// 2. Push multiple items
fruits.push('grape', 'mango');
console.log('2:', fruits); // ['apple', 'banana', 'orange', 'grape', 'mango']

// 3. Push into an empty array
let numbers = [];
numbers.push(1);
console.log('3:', numbers); // [1]

// 4. Push returns the new length
let newLength = numbers.push(2, 3);
console.log('4:', newLength); // 3
console.log('4:', numbers); // [1, 2, 3]

// 5. Push a nested array (adds it as one element)
let nested = [];
nested.push([10, 20]);
console.log('5:', nested); // [[10, 20]]

// 6. Push an object
let users = [];
users.push({ name: 'Alice', age: 25 });
console.log('6:', users); // [{ name: 'Alice', age: 25 }]

// 7. Push in a loop
let doubled = [];
for (let i = 1; i <= 5; i++) {
  doubled.push(i * 2);
}
console.log('7:', doubled); // [2, 4, 6, 8, 10]

// 8. Push using function
function addItem(arr, item) {
  arr.push(item);
}
let letters = ['a', 'b'];
addItem(letters, 'c');
console.log('8:', letters); // ['a', 'b', 'c']

// 9. Push boolean values
let flags = [];
flags.push(true);
flags.push(false);
console.log('9:', flags); // [true, false]

// 10. Push result of an expression
let results = [];
results.push(5 + 3); // 8
results.push('hi' + ' there'); // 'hi there'
console.log('10:', results); // [8, 'hi there']

// 11. Push from another array using spread
let colors = ['red', 'blue'];
let moreColors = ['green', 'yellow'];
colors.push(...moreColors);
console.log('11:', colors); // ['red', 'blue', 'green', 'yellow']

// 12. Push undefined and null
let misc = [];
misc.push(undefined);
misc.push(null);
console.log('12:', misc); // [undefined, null]



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 02 - pop 

// 1. Basic pop - remove the last item
let fruits = ['apple', 'banana', 'orange'];
let lastFruit = fruits.pop();
console.log('1:', lastFruit); // 'orange'
console.log('1:', fruits); // ['apple', 'banana']

// 2. Pop from a single-element array
let numbers = [42];
let removed = numbers.pop();
console.log('2:', removed); // 42
console.log('2:', numbers); // []

// 3. Pop from an empty array (returns undefined)
let empty = [];
let popped = empty.pop();
console.log('3:', popped); // undefined
console.log('3:', empty); // []

// 4. Using pop in a loop
let letters = ['a', 'b', 'c', 'd'];
while (letters.length > 0) {
  console.log('4:', letters.pop());
}
// Logs: d, c, b, a

// 5. Pop from array of objects
let users = [{ name: 'Alice' }, { name: 'Bob' }];
let lastUser = users.pop();
console.log('5:', lastUser); // { name: 'Bob' }
console.log('5:', users); // [{ name: 'Alice' }]

// 6. Pop inside a function
function removeLast(arr) {
  return arr.pop();
}
let colors = ['red', 'blue', 'green'];
console.log('6:', removeLast(colors)); // 'green'
console.log('6:', colors); // ['red', 'blue']

// 7. Pop and store multiple values
let stack = [1, 2, 3, 4];
let a = stack.pop();
let b = stack.pop();
console.log('7:', a, b); // 4 3
console.log('7:', stack); // [1, 2]

// 8. Pop and handle with condition
let items = ['pen', 'pencil', 'eraser'];
let removedItem = items.pop();
if (removedItem === 'eraser') {
  console.log('8: Eraser was removed');
}

// 9. Pop in array of mixed types
let mix = [1, 'hello', true];
console.log('9:', mix.pop()); // true
console.log('9:', mix); // [1, 'hello']

// 10. Pop result used directly
let things = ['box', 'bag', 'bottle'];
console.log('10: Last item removed:', things.pop()); // 'bottle'
console.log('10:', things); // ['box', 'bag']

// 11. Chaining pop and push
let logs = ['log1', 'log2', 'log3'];
let temp = logs.pop();
logs.push(temp + '_archived');
console.log('11:', logs); // ['log1', 'log2', 'log3_archived']

// 12. Pop with console trace
let queue = ['task1', 'task2', 'task3'];
console.log('12: Removing', queue.pop()); // task3
console.log('12: Remaining tasks:', queue); // ['task1', 'task2']

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 03 - unshift 

// 1. Basic unshift - add one item at the beginning
let fruits = ['banana', 'orange'];
fruits.unshift('apple');
console.log('1:', fruits); // ['apple', 'banana', 'orange']

// 2. Unshift multiple items
fruits.unshift('grape', 'mango');
console.log('2:', fruits); // ['grape', 'mango', 'apple', 'banana', 'orange']

// 3. Unshift into an empty array
let numbers = [];
numbers.unshift(10);
console.log('3:', numbers); // [10]

// 4. Unshift returns the new length of the array
let newLength = numbers.unshift(20, 30);
console.log('4: New length =', newLength); // 3
console.log('4:', numbers); // [20, 30, 10]

// 5. Unshift an object
let users = [{ name: 'Bob' }];
users.unshift({ name: 'Alice' });
console.log('5:', users); // [{ name: 'Alice' }, { name: 'Bob' }]

// 6. Unshift inside a function
function addFirst(arr, item) {
  arr.unshift(item);
}
let colors = ['blue', 'green'];
addFirst(colors, 'red');
console.log('6:', colors); // ['red', 'blue', 'green']

// 7. Unshift using the result directly
let values = [4, 5, 6];
console.log('7: New array length:', values.unshift(1, 2, 3)); // 6
console.log('7:', values); // [1, 2, 3, 4, 5, 6]

// 8. Unshift with different data types
let mix = ['hello'];
mix.unshift(true);
mix.unshift(null);
mix.unshift(undefined);
console.log('8:', mix); // [undefined, null, true, 'hello']

// 9. Unshift inside a loop (reverse insert)
let countdown = [];
for (let i = 5; i >= 1; i--) {
  countdown.unshift(i);
}
console.log('9:', countdown); // [1, 2, 3, 4, 5]

// 10. Unshift with nested arrays
let nested = [[3, 4]];
nested.unshift([1, 2]);
console.log('10:', nested); // [[1, 2], [3, 4]]

// 11. Unshift a string (added as a single element)
let greetings = ['world'];
greetings.unshift('hello');
console.log('11:', greetings); // ['hello', 'world']

// 12. Combine unshift and push
let queue = ['middle'];
queue.unshift('start');
queue.push('end');
console.log('12:', queue); // ['start', 'middle', 'end']



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 04 - shift 

// 1. Basic shift - remove the first item
let fruits = ['apple', 'banana', 'orange'];
let firstFruit = fruits.shift();
console.log('1:', firstFruit); // 'apple'
console.log('1:', fruits); // ['banana', 'orange']

// 2. Shift from a single-element array
let numbers = [100];
let removed = numbers.shift();
console.log('2:', removed); // 100
console.log('2:', numbers); // []

// 3. Shift from an empty array (returns undefined)
let empty = [];
let shifted = empty.shift();
console.log('3:', shifted); // undefined
console.log('3:', empty); // []

// 4. Shift inside a loop
let queue = ['task1', 'task2', 'task3'];
while (queue.length > 0) {
  console.log('4: Removed', queue.shift());
}
// Logs: task1, task2, task3

// 5. Shift from array of objects
let users = [{ name: 'Alice' }, { name: 'Bob' }];
let firstUser = users.shift();
console.log('5:', firstUser); // { name: 'Alice' }
console.log('5:', users); // [{ name: 'Bob' }]

// 6. Shift inside a function
function removeFirst(arr) {
  return arr.shift();
}
let colors = ['red', 'green', 'blue'];
console.log('6:', removeFirst(colors)); // 'red'
console.log('6:', colors); // ['green', 'blue']

// 7. Shift and store multiple values
let letters = ['a', 'b', 'c'];
let a = letters.shift();
let b = letters.shift();
console.log('7:', a, b); // 'a', 'b'
console.log('7:', letters); // ['c']

// 8. Shift from array of mixed types
let mix = [true, 42, 'hello'];
console.log('8:', mix.shift()); // true
console.log('8:', mix); // [42, 'hello']

// 9. Shift and check condition
let things = ['eraser', 'pen', 'pencil'];
let removedThing = things.shift();
if (removedThing === 'eraser') {
  console.log('9: Eraser was removed');
}
console.log('9:', things); // ['pen', 'pencil']

// 10. Shift nested array
let nested = [[1, 2], [3, 4]];
let firstArray = nested.shift();
console.log('10:', firstArray); // [1, 2]
console.log('10:', nested); // [[3, 4]]

// 11. Shift string values
let words = ['first', 'second', 'third'];
console.log('11:', words.shift()); // 'first'
console.log('11:', words); // ['second', 'third']

// 12. Combine unshift and shift
let sequence = ['middle'];
sequence.unshift('start');
let removedStart = sequence.shift();
console.log('12: Removed start =', removedStart); // 'start'
console.log('12:', sequence); // ['middle']


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 05 indexOf 

// 1. Basic usage of indexOf
let fruits = ['apple', 'banana', 'orange'];
console.log('1:', fruits.indexOf('banana')); // 1

// 2. Element not found
console.log('2:', fruits.indexOf('grape')); // -1

// 3. indexOf is case-sensitive
console.log('3:', fruits.indexOf('Banana')); // -1

// 4. indexOf on numbers
let numbers = [10, 20, 30, 40, 50];
console.log('4:', numbers.indexOf(30)); // 2

// 5. Using indexOf with start position (fromIndex)
let letters = ['a', 'b', 'a', 'c', 'a'];
console.log('5:', letters.indexOf('a')); // 0
console.log('5:', letters.indexOf('a', 1)); // 2
console.log('5:', letters.indexOf('a', 3)); // 4

// 6. indexOf with boolean values
let bools = [true, false, true];
console.log('6:', bools.indexOf(false)); // 1

// 7. indexOf with objects (note: checks reference, not value)
let obj1 = { name: 'Alice' };
let obj2 = { name: 'Bob' };
let people = [obj1, obj2];
console.log('7:', people.indexOf(obj1)); // 0
console.log('7:', people.indexOf({ name: 'Alice' })); // -1

// 8. indexOf with undefined and null
let misc = [undefined, null, 0];
console.log('8:', misc.indexOf(undefined)); // 0
console.log('8:', misc.indexOf(null)); // 1

// 9. indexOf in a condition
if (fruits.indexOf('orange') !== -1) {
  console.log('9: Orange is in the list');
}

// 10. indexOf in an array of mixed types
let mixed = [1, '1', true, 'true'];
console.log('10:', mixed.indexOf('1')); // 1
console.log('10:', mixed.indexOf(true)); // 2

// 11. indexOf with NaN (does NOT find it)
let weird = [NaN, 2, 3];
console.log('11:', weird.indexOf(NaN)); // -1

// 12. Use indexOf to find duplicates
let items = ['pen', 'pencil', 'pen', 'marker'];
let firstPen = items.indexOf('pen');
let secondPen = items.indexOf('pen', firstPen + 1);
console.log('12: First pen at', firstPen); // 0
console.log('12: Second pen at', secondPen); // 2



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 06 includes 

// 1. Basic usage of includes
let fruits = ['apple', 'banana', 'orange'];
console.log('1:', fruits.includes('banana')); // true

// 2. Element not included
console.log('2:', fruits.includes('grape')); // false

// 3. includes is case-sensitive
console.log('3:', fruits.includes('Banana')); // false

// 4. includes with numbers
let numbers = [10, 20, 30];
console.log('4:', numbers.includes(20)); // true
console.log('4:', numbers.includes(40)); // false

// 5. includes with fromIndex
let letters = ['a', 'b', 'c', 'a'];
console.log('5:', letters.includes('a')); // true
console.log('5:', letters.includes('a', 2)); // true (search starts at index 2)
console.log('5:', letters.includes('a', 3)); // true
console.log('5:', letters.includes('a', 4)); // false

// 6. includes with boolean values
let bools = [true, false];
console.log('6:', bools.includes(false)); // true
console.log('6:', bools.includes(true)); // true

// 7. includes with undefined and null
let misc = [undefined, null, NaN];
console.log('7:', misc.includes(undefined)); // true
console.log('7:', misc.includes(null)); // true

// 8. includes finds NaN (unlike indexOf)
console.log('8:', misc.includes(NaN)); // true

// 9. includes with mixed data types
let mixed = [1, '1', true, 'true'];
console.log('9:', mixed.includes('1')); // true
console.log('9:', mixed.includes(1)); // true
console.log('9:', mixed.includes(true)); // true

// 10. includes with object references (not values)
let obj1 = { name: 'Alice' };
let obj2 = { name: 'Bob' };
let people = [obj1, obj2];
console.log('10:', people.includes(obj1)); // true
console.log('10:', people.includes({ name: 'Alice' })); // false (different object reference)

// 11. Use includes in if condition
let items = ['pen', 'pencil', 'eraser'];
if (items.includes('pen')) {
  console.log('11: Pen is available');
}

// 12. includes on empty array
let empty = [];
console.log('12:', empty.includes('anything')); // false



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 07 - 


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 1. Basic array destructuring
let [a, b] = [1, 2];
console.log('1:', a, b); // 1 2

// 2. Skipping elements
let [x, , z] = [10, 20, 30];
console.log('2:', x, z); // 10 30

// 3. Default values
let [p = 100, q = 200] = [10];
console.log('3:', p, q); // 10 200

// 4. Swapping variables
let first = 'hello', second = 'world';
[first, second] = [second, first];
console.log('4:', first, second); // world hello

// 5. Destructuring from function return
function getCoordinates() {
  return [12.5, 45.3];
}
let [lat, long] = getCoordinates();
console.log('5:', lat, long); // 12.5 45.3

// 6. Destructuring nested arrays
let nested = [1, [2, 3]];
let [m, [n, o]] = nested;
console.log('6:', m, n, o); // 1 2 3

// 7. Destructuring with rest operator
let [head, ...tail] = [100, 200, 300, 400];
console.log('7:', head); // 100
console.log('7:', tail); // [200, 300, 400]

// 8. Destructuring with fewer variables
let [one, two] = [1, 2, 3, 4];
console.log('8:', one, two); // 1 2

// 9. Destructuring strings as arrays
let [char1, char2, char3] = 'xyz';
console.log('9:', char1, char2, char3); // x y z

// 10. Destructuring with ignored values
let [,, thirdValue] = [5, 6, 7];
console.log('10:', thirdValue); // 7

// 11. Destructuring with dynamic array (spread)
let arr = [1, 2, 3, 4, 5];
let [firstEl, secondEl, ...restEl] = arr;
console.log('11:', firstEl, secondEl, restEl); // 1 2 [3, 4, 5]

// 12. Nested destructuring with default
let nestedDefaults = [undefined, [8]];
let [val1 = 'default1', [val2 = 'default2']] = nestedDefaults;
console.log('12:', val1, val2); // default1 8


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

