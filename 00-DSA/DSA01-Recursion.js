

// Recursion 
// Recursion is when a function calls itself to solve smaller subproblems of a bigger problem.

// ✅ Three Key Parts of Recursion:
// Base Case – The condition when recursion stops.
// Recursive Case – The part where the function calls itself.
// Changing Input – Each call should move toward the base case.


// steps to solve the problem 
// 01 - understand the problem 
// 02 - identify the subproblem 
// 03 - trust / faith 
// 04 - link 1 & 2 
// 05 - base condition 





// visualization - recursion tree 
//               - recursion call stack 



// recursion vs iteration 





function recursiveFunction(parameters) {
    if (baseCondition) {
      return result; // 🔁 base case (stopping condition)
    }
    return recursiveFunction(smallerProblem); // 🌀 recursive case
  }


// Example 1: Print numbers from 1 to N
function print1ToN(n) {
    if (n === 0) return; // base case
    print1ToN(n - 1);    // recursive call
    console.log(n);      // print after the call
  }
  
  print1ToN(5);


//  Example 2: Factorial using recursion
function factorial(n) {
    if (n === 0 || n === 1) return 1; // base case
    return n * factorial(n - 1);      // recursive case
  }
  
  console.log(factorial(5)); // Output: 120

  
