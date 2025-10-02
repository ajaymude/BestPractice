

































✅ Question 1: Find the Largest Number in an Array
➡️ DSA Question 2: Find the Second Largest Number in an Array
✅ DSA Question 3: Check if an Array is Sorted in Ascending Order
✅ DSA Question 4: Reverse a String





//////////////////////////////////////////////////////////


✅ Question 1: Find the Largest Number in an Array

Input: [3, 9, 2, 15, 6]
Output: 15




// Example:
console.log(findLargest([3, 9, 2, 15, 6])); // Output: 15


// 💡 Method 1: Using a simple for loop
function findLargest1(arr) {
  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}

// 💡 Method 2: Using for...in loop
function findLargest2(arr) {
  let largest = arr[0];
  for (let index in arr) {
    if (arr[index] > largest) {
      largest = arr[index];
    }
  }
  return largest;
}

// 💡 Method 3: Using Math.max with spread operator
function findLargest3(arr) {
  return Math.max(...arr);
}

// 💡 Method 4: Using reduce()
function findLargest4(arr) {
  return arr.reduce((max, curr) => (curr > max ? curr : max));
}

// ✅ Example usage:
const nums = [3, 9, 2, 15, 6];
console.log(findLargest1(nums)); // Output: 15
console.log(findLargest2(nums)); // Output: 15
console.log(findLargest3(nums)); // Output: 15
console.log(findLargest4(nums)); // Output: 15


//////////////////////////////////////////////////////////


➡️ DSA Question 2: Find the Second Largest Number in an Array

[12, 35, 1, 10, 34, 1]

// 💡 Method 1: Single Pass (Best Way - No Sorting)
function findSecondLargest1(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}

// 💡 Method 2: Sort and pick second unique value
function findSecondLargest2(arr) {
  const unique = [...new Set(arr)]; // remove duplicates
  if (unique.length < 2) return null;
  unique.sort((a, b) => b - a); // descending
  return unique[1];
}

// 💡 Method 3: Using Math.max (Not optimal for large arrays)
function findSecondLargest3(arr) {
  const max = Math.max(...arr);
  const filtered = arr.filter(num => num !== max);
  return filtered.length === 0 ? null : Math.max(...filtered);
}

// ✅ Example usage
const nums = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargest1(nums)); // Output: 34
console.log(findSecondLargest2(nums)); // Output: 34
console.log(findSecondLargest3(nums)); // Output: 34



//////////////////////////////////////////////////////////

✅ DSA Question 3: Check if an Array is Sorted in Ascending Order

Input: [1, 2, 3, 4, 5]
Output: true


// 💡 Method 1: Simple for loop (Best for clarity and performance)
function isSorted1(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

// 💡 Method 2: Using every() method (Clean, modern JS)
function isSorted2(arr) {
  return arr.every((val, i, array) => i === 0 || array[i - 1] <= val);
}

// 💡 Method 3: Using JSON stringify for comparison (Less efficient, just for idea)
function isSorted3(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return JSON.stringify(arr) === JSON.stringify(sorted);
}

// ✅ Example usage
console.log(isSorted1([1, 2, 3, 4, 5])); // true
console.log(isSorted1([1, 3, 2, 4, 5])); // false

console.log(isSorted2([1, 2, 3]));       // true
console.log(isSorted2([3, 2, 1]));       // false

console.log(isSorted3([10, 20, 30]));    // true
console.log(isSorted3([10, 5, 30]));     // false



//////////////////////////////////////////////////////////

✅ DSA Question 4: Reverse a String


Input: "hello"
Output: "olleh"


// 💡 Method 1: Using built-in functions (split + reverse + join)
function reverseString1(str) {
  return str.split('').reverse().join('');
}

// 💡 Method 2: Using a for loop (manual approach)
function reverseString2(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// 💡 Method 3: Using recursion
function reverseString3(str) {
  if (str === '') return '';
  return reverseString3(str.slice(1)) + str[0];
}

// 💡 Method 4: Using reduce()
function reverseString4(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

// ✅ Example usage:
console.log(reverseString1("hello"));      // Output: "olleh"
console.log(reverseString2("JavaScript")); // Output: "tpircSavaJ"
console.log(reverseString3("DSA"));        // Output: "ASD"
console.log(reverseString4("abc"));        // Output: "cba"


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


