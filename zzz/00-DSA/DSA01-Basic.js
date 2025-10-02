// 📘 FUNDAMENTALS & SETUP
// 01 - What are Data Structures and Algorithms (DSA), why they matter
// 02 - Time complexity basics: Big O notation, Big Ω, Big Θ
// 03 - Space complexity analysis: auxiliary vs total space
// 04 - Amortized analysis: understanding dynamic array resizing, hash table operations
// 05 - Recurrence relations: solving via substitution, master theorem, recursion trees
// 06 - Asymptotic notations in practice: comparing functions, common complexity classes
// 07 - Input sizes and constraints: estimating feasible algorithms based on N, memory limits
// 08 - Profiling code: measuring runtime and memory in chosen language (e.g., Python, C++, Java)
// 09 - Coding environment setup: choosing a language, configuring editor/IDE, setting up compilers/interpreters
// 10 - Practice platforms introduction: LeetCode, Codeforces, HackerRank, AtCoder, GeeksforGeeks

// 🔤 MATHEMATICAL FOUNDATIONS
// 11 - Number systems: binary, octal, decimal, hexadecimal conversions
// 12 - Modular arithmetic: operations mod M, properties, Fermat’s Little Theorem, modular inverses
// 13 - Greatest Common Divisor (GCD) and Least Common Multiple (LCM): Euclid’s algorithm, extended Euclid
// 14 - Prime numbers: primality checking (trial division), Sieve of Eratosthenes, Sieve of Atkin
// 15 - Factorization: Pollard’s Rho algorithm, trial division optimizations
// 16 - Combinatorics basics: permutations, combinations, factorials, Pascal’s triangle, binomial coefficients
// 17 - Probability basics: expected value, linearity of expectation, simple probability calculations
// 18 - Pigeonhole principle: applications in problem-solving
// 19 - Number theory algorithms: Euler’s totient function, Möbius function, Chinese Remainder Theorem
// 20 - Logarithms and exponentials: properties, changing bases, integer powers and roots

// 📊 COMPLEXITY CLASSES & PARADIGMS
// 21 - Brute force approach: definition, when to use, limitations
// 22 - Divide and conquer paradigm: breaking problems, combining results, common examples
// 23 - Greedy paradigm: making local optimal choices, proofs of correctness, greedy strategies
// 24 - Dynamic programming paradigm: overlapping subproblems, optimal substructure, memoization vs tabulation
// 25 - Backtracking paradigm: constructing solutions incrementally, pruning branches, use cases
// 26 - Branch and bound: advanced search with bounding functions, solving optimization problems
// 27 - Recursion and recursion trees: tracing recursive calls, tail recursion vs head recursion
// 28 - Iterative vs recursive implementations: space and time trade-offs
// 29 - Bit manipulation techniques: bitwise operators, masks, bit tricks for optimization
// 30 - Randomized algorithms: randomized quicksort, randomized selection, Monte Carlo vs Las Vegas


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// 01 - What are Data Structures and Algorithms (DSA), why they matter
// Data Structure: a way to organize and store data for efficient access and modification.
//   • Examples: Array (ordered list), Map (key→value store), Set (unique collection).
// Algorithm: a step-by-step procedure to solve a problem or perform a computation.
//   • Examples: searching, sorting, traversal.
// Why they matter:
//   1. Performance: choosing the right DS+algorithm reduces time complexity (e.g., O(n) vs. O(n²)).
//   2. Scalability: efficient code handles large inputs and high load.
//   3. Maintainability: clear abstractions improve readability and reduce bugs.
//   4. Resource usage: optimal space complexity saves memory.

// ——— Data Structure Examples ———
const numbers = [10, 20, 30, 40];     // Array: O(1) access by index
numbers.push(50);                     // add to end
numbers.shift();                      // remove from front

const userAge = new Map();            // Map: O(1) average lookup
userAge.set("Alice", 25);
userAge.set("Bob", 30);
userAge.get("Alice");                // → 25

const uniqueNums = new Set([1, 2, 2, 3]); // Set: stores unique values
uniqueNums.has(2);                   // → true
uniqueNums.add(4);

// ——— Algorithm Examples ———
// Linear Search: O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
linearSearch(numbers, 30);           // → 1

// Bubble Sort: O(n²)
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}
bubbleSort(numbers);                 // → [20,30,40,50]

// Why these matter:
//   • Searching and sorting are fundamental building blocks.
//   • Understanding their complexities guides you to choose or design better solutions.
//   • Mastering DS and algorithms is key to writing high-performance, scalable applications.

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// 02 - Time complexity basics: Big O notation, Big Ω notation, Big Θ notation
// Big O (O): upper bound on runtime; worst-case growth as n→∞
// Big Ω (Ω): lower bound on runtime; best-case growth
// Big Θ (Θ): tight bound; when runtime grows at the same rate in both best and worst cases

// ————————— Example Complexities —————————

// O(1) constant time
function getFirstElement(arr) {
  return arr[0];
}

// O(n) linear time
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(n²) quadratic time
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// O(log n) logarithmic time (sorted array)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// ————————— Best/Average/Worst Cases —————————
// linearSearch: Ω(1) if target at index 0; Θ(n) average; O(n) worst if not found
// binarySearch: Ω(1) best if target at mid; Θ(log n) average; O(log n) worst

// ————————— Space Complexity Examples —————————

// O(1) space: only constant extra memory
function swap(a, i, j) {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

// O(n) space: recursion depth
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
// factorial’s call stack uses Ω(1) best (n=0) and O(n) worst space

// ————————— How to Use These —————————
// • Identify loops → likely O(n) or worse  
// • Nested loops → multiply complexities (e.g., O(n²))  
// • Divide-and-conquer → often O(log n) or O(n log n)  
// • Recursion depth → adds to space complexity  
// • Always state best (Ω), average (Θ), worst (O) cases when analyzing algorithms  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// 03 - Space complexity analysis: auxiliary vs total space
// Total space = space for input + auxiliary space (extra space used by algorithm)
// Auxiliary space = extra space allocated by algorithm, excluding input
// Why it matters:
//   • Minimizing auxiliary space keeps memory usage low and improves scalability.
//   • Distinguishes in-place algorithms (O(1) aux) from those that need extra buffers (O(n) aux).

const arr = [1, 2, 3, 4];

// Example 1: O(1) auxiliary space (in-place, only a few variables)
function sumArray(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i];
  return sum;
}

// Example 2: O(n) auxiliary space (creates a full copy)
function copyArray(a) {
  const b = [...a];   // allocates new array of size n
  return b;
}

// Example 3: O(n) auxiliary space due to recursion call stack
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example 4: Merge Sort – O(n) auxiliary space for merging
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  const left = mergeSort(a.slice(0, mid));      // slice uses O(n) aux
  const right = mergeSort(a.slice(mid));        // slice uses O(n) aux
  return merge(left, right);                    // merge builds O(n) buffer
}

// Demonstrations
console.log("sumArray:", sumArray(arr));         // sumArray: 10
console.log("copyArray:", copyArray(arr));       // copyArray: [1,2,3,4]
console.log("factorial:", factorial(5));         // factorial: 120
console.log("mergeSort:", mergeSort([4,2,1,3])); // mergeSort: [1,2,3,4]


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// 05 - Recurrence relations: solving via substitution, master theorem, recursion trees
// Recurrence: an equation defining T(n) in terms of T on smaller inputs.
//   • Common form: T(n) = a·T(n/b) + f(n)

// — Master Theorem —
// For T(n)=a·T(n/b)+f(n), let d = log_b(a):
//  Case 1: if f(n)=O(n^(d−ε))      ⇒ T(n)=Θ(n^d)
//  Case 2: if f(n)=Θ(n^d·log^k n)  ⇒ T(n)=Θ(n^d·log^(k+1) n)
//  Case 3: if f(n)=Ω(n^(d+ε)) and a·f(n/b) ≤ c·f(n) ⇒ T(n)=Θ(f(n))

// Example: Merge Sort
//   a=2, b=2, f(n)=Θ(n) ⇒ d=1, f(n)=Θ(n^1) ⇒ Case 2 with k=0 ⇒ T(n)=Θ(n·log n)

// — Substitution Method —
// Prove T(n) ≤ c·n·log n by induction:
//   Base: small n trivial.
//   Inductive step: assume for <n, show for n using T(n)=2T(n/2)+n ≤ 2[c·(n/2)·log(n/2)] + n = c·n·log n − c·n + n ≤ c·n·log n for c≥1

// — Recursion Tree —
// Merge Sort tree:
//   Level 0: cost n
//   Level 1: 2×(n/2)=n
//   …
//   Level log n: n leaves
// Total cost ≈ n·(log n + 1) = Θ(n·log n)

// — Simple Linear Recurrence —
// T(n)=T(n−1)+O(1) ⇒ Θ(n)

const factorial = n => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

console.log(factorial(5)); // 120

// — Logarithmic Recurrence —
// T(n)=T(n/2)+O(1) ⇒ Θ(log n)

const binarySearch = (arr, target, left = 0, right = arr.length - 1) => {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
  return binarySearch(arr, target, left, mid - 1);
};

console.log(binarySearch([1,2,3,4,5], 4)); // 3

// — Divide & Conquer Recurrence —
// T(n)=2T(n/2)+n ⇒ Θ(n·log n)

const merge = (L, R) => {
  const out = []; let i=0, j=0;
  while (i<L.length && j<R.length) {
    if (L[i]<R[j]) out.push(L[i++]);
    else out.push(R[j++]);
  }
  return out.concat(L.slice(i)).concat(R.slice(j));
};

const mergeSort = arr => {
  if (arr.length <= 1) return arr;
  const m = Math.floor(arr.length/2);
  return merge(mergeSort(arr.slice(0,m)), mergeSort(arr.slice(m)));
};

console.log(mergeSort([4,2,5,1,3])); // [1,2,3,4,5]

// — Exponential Recurrence —
// T(n)=T(n−1)+T(n−2)+O(1) ⇒ Θ(φ^n), φ≈1.618

const fib = n => {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
};

console.log(fib(10)); // 55


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////