// 1 for loop

for (let i = 0; i < 5; i++) {
  console.log(i);
}

for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break; // Stop the loop when i equals 3
  }
  console.log(i);
}

for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i equals 2
  }
  console.log(i);
}

// 2 while loop

// The while loop continues as long as the specified condition is true.
// It’s useful when you don’t know how many times the loop should run,
// but you want to repeat until a condition is met.

let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// 3 do while loop

// The do...while loop is similar to the while loop, but it guarantees
//  that the loop will execute at least once, as the condition is checked
//  after the block of code is run.

let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

// 4 for in loop

// The for...in loop is used to iterate over the properties
// of an object (or the indices of an array). It’s mostly used with objects.

const person = { name: "John", age: 30, city: "New York" };
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// for of loop

// The for...of loop is used to iterate over the values
// of an iterable object (like an array, string, or Map). It’s commonly used with arrays.

const numbers = [10, 20, 30, 40, 50];
for (let num of numbers) {
  console.log(num);
}
