

// Recursion 
// Recursion is when a function calls itself to solve smaller subproblems of a bigger problem.

// ✅ Three Key Parts of Recursion:
// Base Case – The condition when recursion stops.
// Recursive Case – The part where the function calls itself.
// Changing Input – Each call should move toward the base case.

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
  