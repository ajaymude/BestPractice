//array methods 
01 - map()
02 - filter()
03 - concat()
04 - push()
05 - pop()
06 - unshift()
07 - reverse()
08 - sort()
09 - reduce()
10 - reduceRight()
11 - shift()





















// 1 map()
// The map() method creates a new array with the results of calling
//  a function for every array element.

// map() does not change the original array.
// map() executes callback once for each array element in order.
// map() does not execute callback for array elements without values.

// syntax 
// arr.map(callback(currentValue), thisArg)

// 1 example 
let numbers = [2, 4, 6, 8, 10];

// function to return the square of a number
function square(number) {
  return number * number;
}

// apply square() function to each item of the numbers list
let square_numbers = numbers.map(square);
console.log(square_numbers);

// Output: [ 4, 16, 36, 64, 100 ]


// 2 example 
const employees = [
    { name: "Adam", salary: 5000, bonus: 500, tax: 1000 },
    { name: "Noah", salary: 8000, bonus: 1500, tax: 2500 },
    { name: "Fabiano", salary: 1500, bonus: 500, tax: 200 },
    { name: "Alireza", salary: 4500, bonus: 1000, tax: 900 },
];

// calculate the net amount to be given to the employees
const calcAmt = (obj) => {
    newObj = {};
    newObj.name = obj.name;
    newObj.netEarning = obj.salary + obj.bonus - obj.tax;
    return newObj;
};

let newArr = employees.map(calcAmt);
console.log(newArr);
// output 
[
    { name: 'Adam', netEarning: 4500 },
    { name: 'Noah', netEarning: 7000 },
    { name: 'Fabiano', netEarning: 1800 },
    { name: 'Alireza', netEarning: 4600 }
  ]



















  // 2 filter 
//   The filter() method returns a new array with all 
//   elements that pass the test defined by the given function.

// 1 example 
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function to check even numbers
function checkEven(number) {
  if (number % 2 == 0)
    return true;
  else
    return false;
}

// create a new array by filter even numbers from the numbers array
let evenNumbers = numbers.filter(checkEven);
console.log(evenNumbers);

// Output: [ 2, 4, 6, 8, 10 ]


// 2 example 
const prices = [1800, 2000, null, 3000, 5000, "Thousand", 500, 8000]

function checkPrice(element) {
  return element > 2000 && !Number.isNaN(element);
}

let filteredPrices = prices.filter(checkPrice);
console.log(filteredPrices); // [ 3000, 5000, 8000 ]

// using arrow function
let newPrices = prices.filter((price) => (price > 2000 && !Number.isNaN(price)));
console.log(newPrices); // [ 3000, 5000, 8000 ]

// 3 example 























// 3 concat()

// The concat() method returns a new array by merging two or more values/arrays.

// 1 example 
let primeNumbers = [2, 3, 5, 7]
let evenNumbers = [2, 4, 6, 8]

// join two arrays 
let joinedArrays = primeNumbers.concat(evenNumbers);
console.log(joinedArrays);

/* Output:
[
  2, 3, 5, 7,
  2, 4, 6, 8 
]
*/


// 2 example 




















// 4 push()

// The push() method adds zero or more elements to the end of the array.

// 1 example 
let city = ["New York", "Madrid", "Kathmandu"];

// add "London" to the array
city.push("London");

console.log(city);

// Output: [ 'New York', 'Madrid', 'Kathmandu', 'London' ]


// 2 example 























// 5 pop ()

// The pop() method removes the last element from an array and returns that element.

// 1 example 
let cities = ["Madrid", "New York", "Kathmandu", "Paris"];

// remove the last element
let removedCity = cities.pop();

console.log(cities)         // ["Madrid", "New York", "Kathmandu"]
console.log(removedCity);   // Paris


// 2 example 

























// 6 unshift()
// The unshift() method adds one or more elements to the beginning of 
// an array and returns the new length of the array.

// 1 example 
let languages = ["Java", "Python", "C"];

// add "JavaScript" at the beginning of the array
languages.unshift("JavaScript");
console.log(languages);

// Output: [ 'JavaScript', 'Java', 'Python', 'C' ]


















// 7  reverse()
// The reverse() method returns the array in reverse order.

//Note: The reverse() method reverses the order of elements in place,
// it means the method changes the original array.

// 1 example 
let numbers = [1, 2, 3, 4, 5];

// reversing the numbers array
let reversedArray = numbers.reverse();

console.log(reversedArray);

// Output: [ 5, 4, 3, 2, 1 ]



// 2 example 
let languages = ["JavaScript", "Python", "C++", "Java", "Lua"];

// reversing the order of languages array
let reversedArray = languages.reverse();

console.log("Reversed Array: ", reversedArray);

// modifies the original array
console.log("Original Array: ", languages);

Reversed Array: [ 'Lua', 'Java', 'C++', 'Python', 'JavaScript' ]
Original Array: [ 'Lua', 'Java', 'C++', 'Python', 'JavaScript' ]


// 3 example 
let languages = ["JavaScript", "Python", "C++", "Java", "Lua"];

// using spread operator to reverse the array
let reversedArray = [...languages].reverse();

console.log("Reversed Array:", reversedArray);

// modifies the original array
console.log("Original Array:", languages);

Reversed Array: [ 'Lua', 'Java', 'C++', 'Python', 'JavaScript' ]
Original Array: [ 'JavaScript', 'Python', 'C++', 'Java', 'Lua' ]


// 4 example 





















// 8 sort()

// The sort() method sorts the items of an array in a specific order (ascending or descending).

// 1 example 

let city = ["California", "Barcelona", "Paris", "Kathmandu"];

// sort the city array in ascending order
let sortedArray = city.sort();
console.log(sortedArray);

// Output: [ 'Barcelona', 'California', 'Kathmandu', 'Paris' ]


// 2 example 
// numeric sorting

// define array
var priceList = [1000, 50, 2, 7, 14];

// sort() using function expression
// ascending order
priceList.sort(function (a, b) {
  return a - b;
});

// Output: Ascending - 2,7,14,50,1000
console.log("Ascending - " + priceList);

// sort() using arrow function expression
// descending order
priceList.sort((a, b) => b - a);

// Output: Descending - 1000,50,14,7,2
console.log("Descending - " + priceList);
























// 9 reducer()

// The reduce() method executes a reducer function on each element 
// of the array and returns a single output value.

// arr.reduce(callback(accumulator, currentValue), initialValue)

// 2 example 

const message = ["JavaScript ", "is ", "fun."];

// function to join each string elements
function joinStrings(accumulator, currentValue) {
  return accumulator + currentValue;
}

// reduce join each element of the string
let joinedString = message.reduce(joinStrings);
console.log(joinedString);

// Output: JavaScript is fun.


// 2 example 
const numbers = [1, 2, 3, 4, 5, 6];

function sum_reducer(accumulator, currentValue) {
  return accumulator + currentValue;
}

let sum = numbers.reduce(sum_reducer);
console.log(sum); // 21

// using arrow function
let summation = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
console.log(summation); // 21


// 3 example 
let ageGroup = [18, 21, 1, 1, 51, 18, 21, 5, 18, 7, 10];
let uniqueAgeGroup = ageGroup.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);

console.log(uniqueAgeGroup); // [ 18, 21, 1, 51, 5, 7, 10 ]


// 4 example 



























// 10 reduceRight()

// The reduceRight() method reduces the array to a single value by executing
//  a callback function on two values of the array (from right to left). a callback
// function on two values of the array (from right to left).

// 1 example 

let numbers = [1, 2, 3, 4];

// function that adds last two values of the numbers array
function sum_reducer(accumulator, currentValue) {
  return accumulator + currentValue;
}

// returns a single value after reducing the numbers array
let sum = numbers.reduceRight(sum_reducer);

console.log(sum);

// Output: 10


// 2 example 























// 11 shift()

// The shift() method removes the first element from an array and returns that element.

// 1 example 
let languages = ["English", "Java", "Python", "JavaScript"];

// removes the first element of the array
let first = languages.shift();
console.log(first);
console.log(languages);

// Output: English
//         [ 'Java', 'Python', 'JavaScript' ]

// 2 example 
























// 12 every()

// The every() method checks if all the array elements pass the given test function.

// every() does not change the original array.
// every() does not execute the callback() function for an empty array.
//  In case we do pass an empty array, it always returns true.

// 1 example 
// function that checks whether
// the age is 18 or above
function checkAdult(age) {
    return age >= 18;
}

const ageArray = [34, 23, 20, 26, 12];

//checks if all the array elements
// pass the checkAdult() function
let check = ageArray.every(checkAdult);

// Output: false


// 2 example 

// function that checks whether all
// the array elements are even or not
function checkEven(num) {
    return num%2 === 0;
}

// create an array of numbers
const numbers = [2, 4, 6, 7, 8];

// use the every() method along with
// checkEven() on the numbers array
let check = numbers.every(checkEven); 

console.log(check)

// Output: false


















// 13  entries()

// The entries() method returns a new Array Iterator 
// object containing key/value pairs for each array index.

// 1 example

// defining an array named alphabets
const alphabets = ["A", "B", "C"];

// array iterator object that contains
// key-value pairs for each index in the array
let iterator = alphabets.entries();

// iterating through key-value pairs in the array
for (let entry of iterator) {
  console.log(entry);
}

// Output: 
// [ 0, 'A' ]
// [ 1, 'B' ]
// [ 2, 'C' ]


// 2 example 

// defining an array
const symbols = ["#", "$", "*"];

// Array iterator object that holds key/value pairs 
let iterator = symbols.entries();

// using built-in next() method in Array iterator object
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);























// 14  some()

// The some() method tests whether any of the array elements pass the given test function.


// 1 example 
// a test function: returns an even number
function isEven(element) {
    return element % 2 === 0;
  }
  
  // defining an array
  let numbers = [1, 3, 2, 5, 4];
  
  // checks whether the numbers array contain at least one even number
  console.log(numbers.some(isEven));
  
  // Output: true 





















// 15 toString()

//   The toString() method returns a string formed by the elements of the given array.

// 1  example 

// defining an array
let items = ["JavaScript", 1, "a", 3];

// returns a string with elements of the array separated by commas
let itemsString = items.toString();

console.log(itemsString);

// Output: 
// JavaScript,1,a,3


// 2 example 

// defining a nested array
let nestedArray = [1, 2, 4, ["Apple", 5]];

// returns string representation of the nested array by flattening the array 
let resultingArray = nestedArray.toString();

console.log(resultingArray);

// output 1,2,4,Apple,5






















// 16 values()

// The values() method returns a new Array Iterator
//  object that contains the values for each index in the array.

// 1 example 

let languages = ["JavaScript", "Java", "C++"];

// returns an Array Iterator object that contain values
let iteratorObject = languages.values();

// looping through iterator
for (let value of iteratorObject) {
  console.log(value);
}

// Output:
// JavaScript
// Java
// C++



















// 17