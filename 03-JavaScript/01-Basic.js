///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// link of the javascript file
// in the html file
// extension of the file should be .js

<script>alert("hello world");</script>;
// <script src="01-Basic.js"></script>

document.write("hello world");
console.log(first);

// comment in javascript
// single line comment
/* multi line comment
   multi line comment
   multi line comment
*/

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// data types

// number, string, boolean, null, undefined, object, symbol
let num = 10; // number
let str = "hello";
let bool = true; // false
let n = null; // object
let u = undefined; // undefined
let obj = { name: "ajay", age: 20 }; // object
let sym = Symbol("id"); // symbol
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof n);
console.log(typeof u);
console.log(typeof obj);
console.log(typeof sym);

// variable in javascript
// var, let, const
var first = "ajay";
let second = "kumar";
const third = "yadav";

// arithmetic operators
let a = 10;
let b = 5;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);
console.log(++a);
console.log(--b);

// assignment operators
let c = 10;
c += 5;
c -= 5;
c *= 5;
c /= 5;
c %= 5;
c **= 5;
console.log(c);

// comparison operators
let x = 10;
let y = 5;
console.log(x > y);
console.log(x < y);
console.log(x >= y);
console.log(x <= y);
console.log(x == y);
console.log(x != y);
console.log(x === y);
console.log(x !== y);

// logical operators
let p = true;
let q = false;
console.log(p && q);
console.log(p || q);
console.log(!p);
console.log(!q);

//&& and || operator it returns the first falsy value or the last value if all are truthy
console.log(0 && "hello" && 5); // 0
// || operator returns the first truthy value or the last value if all are falsy
console.log(0 || "" || null || undefined || "hello" || 5); // hello

// conditional statements
if (x > y) {
  console.log("x is greater than y");
} else if (x < y) {
  console.log("x is less than y");
} else {
  console.log("x is equal to y");
}

// switch case
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
}

// alert, prompt, confirm
// alert("hello world");
// let name = prompt("Enter your name");
// console.log(name);
// let isConfirmed = confirm("Are you sure?");
// console.log(isConfirmed);

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// functions
function add(a, b) {
  return a + b;
}

console.log(add(10, 5));
console.log(add(20, 30));

// function expression with arguments and parameters

let subtract = function (a, b) {
  // parameters
  return a - b;
};

console.log(subtract(10, 5)); // arguments

// arrow function
let multiply = (a, b) => {
  return a * b;
};

console.log(multiply(10, 5));

let divide = (a, b) => a / b;

console.log(divide(10, 5));

// function with default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Ajay"));

// function with rest parameters
function sum(...numbers) {
  let total = 0;
  for (let number of numbers) {
    total += number;
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));
console.log(sum(10, 20, 30));

// closures
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

// scope
// global scope
let globalVar = "I am a global variable";
function checkScope() {
  // local scope
  let localVar = "I am a local variable";
  console.log(globalVar);
  console.log(localVar);
}
checkScope();
console.log(globalVar);
// console.log(localVar); // error
// block scope
if (true) {
  let blockVar = "I am a block variable";
  console.log(blockVar);
}
// console.log(blockVar); // error

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// loops

// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for in loop
let person = { name: "ajay", age: 20, city: "delhi" };
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// for of loop
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);
}

// while loop
let j = 0;
while (j < 5) {
  console.log(j);
  j++;
}

// do while loop
let k = 0;
do {
  console.log(k);
  k++;
} while (k < 5);

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// arrays

/*****************************************************************
 *  JAVASCRIPT ARRAY METHODS — MASTER LIST (ES2025, stable)
 *  Legend: ✅ non-mutating   🧨 mutates original   🔁 iterator
 *****************************************************************/

/*---------------------------------------------------------------
 | A. Create / Identify
 *---------------------------------------------------------------*/
Array.of(...items)                 // ✅ build array from args
Array.from(iterable, mapFn?)       // ✅ build from iterable/array-like
Array.isArray(value)               // ✅ type check: array?


/*---------------------------------------------------------------
 | B. Basic info / conversion
 *---------------------------------------------------------------*/
arr.length                         // (prop) number of elements
arr.at(index)                      // ✅ safe indexing (supports negatives)
arr.toString()                     // ✅ comma-joined string
arr.toLocaleString(locales?, opts?)// ✅ locale-aware string
arr.join(sep = ",")                // ✅ join elements with separator

/*---------------------------------------------------------------
 | C. Add / Remove at ends
 *---------------------------------------------------------------*/
arr.push(...items)                 // 🧨 add to END, returns new length
arr.pop()                          // 🧨 remove from END, returns item
arr.unshift(...items)              // 🧨 add to START, returns new length
arr.shift()                        // 🧨 remove from START, returns item

/*---------------------------------------------------------------
 | D. Insert / Remove at arbitrary positions
 *---------------------------------------------------------------*/
arr.splice(start, deleteCount?, ...items)   // 🧨 delete/insert in-place
arr.toSpliced(start, deleteCount?, ...items)// ✅ returns changed copy
arr.slice(start?, end?)                     // ✅ shallow copy range

/*---------------------------------------------------------------
 | E. Reorder / Copy within
 *---------------------------------------------------------------*/
arr.reverse()                      // 🧨 reverse in-place
arr.toReversed()                   // ✅ reversed copy
arr.sort(compareFn?)               // 🧨 sort in-place (default: lexicographic)
arr.toSorted(compareFn?)           // ✅ sorted copy
arr.copyWithin(target, start=0, end=arr.length) // 🧨 copy slice within
arr.fill(value, start=0, end=arr.length)  // 🧨 fill range with value
arr.with(index, value)             // ✅ copy with one index replaced

/*---------------------------------------------------------------
 | F. Combine / Flatten
 *---------------------------------------------------------------*/
arr.concat(...itemsOrArrays)       // ✅ combine arrays/items into new array
arr.flat(depth = 1)                // ✅ flatten nested arrays (depth levels)
arr.flatMap(mapFn)                 // ✅ map then flatten by 1 level

/*---------------------------------------------------------------
 | G. Find / Search (values & positions)
 *---------------------------------------------------------------*/
arr.indexOf(value, fromIndex=0)    // ✅ first index or -1
arr.lastIndexOf(value, fromIndex=arr.length-1) // ✅ last index or -1
arr.includes(value, fromIndex=0)   // ✅ boolean
arr.find(predicate, thisArg?)      // ✅ first matching element or undefined
arr.findIndex(predicate, thisArg?) // ✅ first matching index or -1
arr.findLast(predicate, thisArg?)  // ✅ last matching element or undefined
arr.findLastIndex(predicate, thisArg?) // ✅ last matching index or -1

/*---------------------------------------------------------------
 | H. Transform / Test (callback-based)
 *  (All take: (value, index, array) and optional thisArg)
 *---------------------------------------------------------------*/
arr.map(fn)                        // ✅ transform each → new array
arr.filter(fn)                     // ✅ keep items where fn true
arr.reduce(fn, initial?)           // ✅ fold left → single value
arr.reduceRight(fn, initial?)      // ✅ fold right → single value
arr.every(fn)                      // ✅ true if all pass
arr.some(fn)                       // ✅ true if at least one passes
arr.forEach(fn)                    // ✅ iterate (ignore return; side effects)

/*---------------------------------------------------------------
 | I. Iteration helpers / Protocols
 *---------------------------------------------------------------*/
arr.keys()                         // ✅ 🔁 iterator of indices
arr.values()                       // ✅ 🔁 iterator of values
arr.entries()                      // ✅ 🔁 iterator of [index, value]
arr[Symbol.iterator]()             // ✅ 🔁 default iterator (values)

/*---------------------------------------------------------------
 | J. Sparse / Holes notes (not a method)
 *---------------------------------------------------------------
 - Most methods skip holes differently:
   * map/filter/some/every/forEach respect holes (don’t call fn on them).
   * spread [...arr], slice, toSorted, toReversed, toSpliced preserve holes.
   * fill, copyWithin, with will write explicit values.
*/

/*---------------------------------------------------------------
 | K. Deprecated / rarely used (know they exist)
 *---------------------------------------------------------------
 - toSource (non-standard, Firefox only) — avoid.
 - Array constructor quirks: new Array(5) creates holes; prefer Array.of or fill.
*/

/*---------------------------------------------------------------
 | L. Quick “When to use what” cheats
 *---------------------------------------------------------------
 - Add/remove ends: push/pop (end), unshift/shift (start). Prefer non-mutation via [...arr, x] / [x, ...arr] when immutability matters.
 - Insert/remove middle: toSpliced (prefer) over splice (mutates).
 - Sort/reverse immutably: toSorted / toReversed (prefer) over sort/reverse.
 - Replace one item immutably: with(index, value).
 - Find data: includes (boolean), indexOf (exact index), find (predicate returns element), findIndex (predicate index), findLast/Index (from end).
 - Transform: map; filter; reduce (aggregation); flat/flatMap (shape/flatten).
 - Copy parts: slice (range), concat (merge).
 - Patch in place (performance tools, mutate): fill, copyWithin, splice.
*/

let ab = new Array(5); // [ <5 empty items> ]

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/******************************************************************
 * JAVASCRIPT OBJECT METHODS — MASTER LIST
 * Legend: O.* = static on Object;  obj.* = Object.prototype method
 ******************************************************************/

/*---------------------------------------------------------------
 | A) Create / Prototype
 *---------------------------------------------------------------*/
// O.create(proto, [props]) → new object with given prototype
const a1 = Object.create(null);                 // no prototype
const a2 = Object.create({ greet(){return "hi"} });
a2.greet();                                     // "hi"

// O.getPrototypeOf(obj) / O.setPrototypeOf(obj, proto)
const p = {x:1}; const o = Object.create(p);
Object.getPrototypeOf(o) === p;                 // true
Object.setPrototypeOf(o, null);                 // remove proto (slow path)

// O.assign(target, ...sources) — shallow copy/merge (enumerable own props)
const a = {a:1}; Object.assign(a, {b:2}, {c:3}); // {a:1,b:2,c:3}

// O.fromEntries(iterable) ←→ new Map(Object.entries(obj))
const objFrom = Object.fromEntries([["k",1], ["m",2]]); // {k:1,m:2}


/*---------------------------------------------------------------
 | B) Keys / Values / Entries (own, enumerable)
 *---------------------------------------------------------------*/
// O.keys(obj)      → string keys
// O.values(obj)    → values
// O.entries(obj)   → [key, value] pairs
const user = {id:1, name:"Ajay"};
Object.keys(user);                               // ["id","name"]
Object.values(user);                             // [1,"Ajay"]
Object.entries(user);                            // [["id",1],["name","Ajay"]]

// a.value = 42; a.value;                         // 42
// a["hidden"] = 99; a.hidden;                 // 99 (not hidden!)


/*---------------------------------------------------------------
 | C) Property Descriptors (define / inspect)
 *---------------------------------------------------------------*/
// O.getOwnPropertyDescriptor(obj, key)
const d1 = Object.getOwnPropertyDescriptor({x:1}, "x");
/* d1: { value:1, writable:true, enumerable:true, configurable:true } */

// O.getOwnPropertyDescriptors(obj)
const full = Object.getOwnPropertyDescriptors({x:1,y:2});

// O.defineProperty(obj, key, descriptor)
const dp = {};
Object.defineProperty(dp, "hidden", {
  value: 42, writable: false, enumerable: false, configurable: false
});
dp.hidden;                                       // 42
Object.keys(dp);                                  // [] (not enumerable)

// O.defineProperties(obj, descriptors)
const multi = {};
Object.defineProperties(multi, {
  a: { value: 1, writable: true, enumerable: true },
  b: { get(){ return this.a + 1; }, enumerable: true }
});
multi.b;                                         // 2


/*---------------------------------------------------------------
 | D) Own-property Lists (incl. non-enumerables & symbols)
 *---------------------------------------------------------------*/
// O.getOwnPropertyNames(obj)    → string keys (own, incl. non-enum)
const names = Object.getOwnPropertyNames(Math);   // e.g., ["E","LN10",...]
// O.getOwnPropertySymbols(obj)  → symbol keys (own)
const sym = Symbol("s"); const S = {[sym]: 1};
Object.getOwnPropertySymbols(S);                  // [Symbol(s)]
// O.ownKeys(obj)                → all own keys (strings + symbols)
Object.ownKeys(S);                                // [Symbol(s)]


/*---------------------------------------------------------------
 | E) Existence / Ownership
 *---------------------------------------------------------------*/
// O.hasOwn(obj, key) — own-property check (not up the prototype chain)
const base = Object.create({inProto: 1});
base.own = 2;
Object.hasOwn(base, "own");                       // true
Object.hasOwn(base, "inProto");                   // false

// obj.hasOwnProperty(key) — legacy (prototype method)
base.hasOwnProperty("own");                       // true


/*---------------------------------------------------------------
 | F) Mutability Control (object state)
 *---------------------------------------------------------------*/
// O.preventExtensions(obj) / O.isExtensible(obj)
const st1 = {}; Object.preventExtensions(st1);
Object.isExtensible(st1);                         // false
// O.seal(obj) / O.isSealed(obj)   — non-configurable; no add/remove
const st2 = {x:1}; Object.seal(st2);
delete st2.x;                                     // false (fails)
// O.freeze(obj) / O.isFrozen(obj) — non-configurable + non-writable
const st3 = {x:1}; Object.freeze(st3);
st3.x = 99;                                       // ignored in non-strict


/*---------------------------------------------------------------
 | G) Conversion / Tagging
 *---------------------------------------------------------------*/
// obj.toString()  — via prototype (often "[object Object]")
({}).toString();                                   // "[object Object]"
// obj.valueOf()   — primitive hint (rarely customized)
({ valueOf(){ return 7; } } + 1);                  // 8
// Customize toString using Symbol.toStringTag
const tagged = { get [Symbol.toStringTag](){ return "User"; } };
Object.prototype.toString.call(tagged);            // "[object User]"


/*---------------------------------------------------------------
 | H) Prototype-chain Introspection
 *---------------------------------------------------------------*/
// obj.isPrototypeOf(value)
const Proto = {}; const inst = Object.create(Proto);
Proto.isPrototypeOf(inst);                         // true


/*---------------------------------------------------------------
 | I) Utility Patterns (built from the above)
 *---------------------------------------------------------------*/
// 1) Shallow clone (descriptor-aware)
function cloneShallow(o){
  return Object.create(Object.getPrototypeOf(o),
                       Object.getOwnPropertyDescriptors(o));
}
// 2) Define a non-enumerable, read-only prop
function defineConst(o, key, value){
  Object.defineProperty(o, key, {
    value, writable:false, enumerable:false, configurable:false
  });
}
// 3) Safe own-property loop (ignores prototype)
const safeEntries = Object.entries;
// for (const [k,v] of safeEntries(obj)) { ... }

// 4) Deep-freeze (simple)
function deepFreeze(o){
  Object.freeze(o);
  for (const k of Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))){
    const v = o[k];
    if (v && (typeof v === "object" || typeof v === "function") && !Object.isFrozen(v)){
      deepFreeze(v);
    }
  }
  return o;
}


/*---------------------------------------------------------------
 | J) Gotchas & Notes
 *---------------------------------------------------------------
 // - assign() is SHALLOW. Nested objects are shared refs.
 // - freeze()/seal()/preventExtensions() are shallow (don’t recurse).
 // - hasOwn() (static) is preferred over obj.hasOwnProperty (safe if obj has no prototype).
 // - ownKeys() returns strings first, then symbols (spec order).
 // - defineProperty defaults: enumerable:false, writable:false, configurable:false.
 // - getOwnPropertyNames/Descriptors ignore inherited props; use prototype walking if needed.
 // - JSON methods are not Object methods: JSON.stringify/parse are separate globals.
*/



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/******************************************************************
 * JAVASCRIPT STRING METHODS — MASTER LIST
 * Legend: S.* = static on String;  s.* = instance (String.prototype)
 * Notes: Strings are IMMUTABLE. Most methods return a NEW string.
 ******************************************************************/

/*---------------------------------------------------------------
 | A) Create / Inspect
 *---------------------------------------------------------------*/
const s = "JavaScript";
s.length                          // -> 10 (UTF-16 code units)
s.at(-1)                          // -> "t"   (supports negatives)
s.charAt(4)                       // -> "S"
s.charCodeAt(4)                   // -> 83    ("S" UTF-16 code unit)
s.codePointAt(4)                  // -> 83    (useful for emoji/surrogates)
s[Symbol.iterator]                // -> default iterator (values)

/* Static creators */
String(s)                         // -> "JavaScript" (to string)
String.fromCharCode(65, 66)       // -> "AB" (UTF-16 code units)
String.fromCodePoint(0x1F680)     // -> "🚀"  (full Unicode)
String.raw`line\nbreak`           // -> "line\\nbreak" (no escapes in template)

/*---------------------------------------------------------------
 | B) Search / Check
 *---------------------------------------------------------------*/
"hello world".includes("wor")             // true
"hello.js".startsWith("he")               // true
"hello.js".endsWith(".js")                // true
"banana".indexOf("na")                    // 2
"banana".lastIndexOf("na")                // 4
"mañana".localeCompare("manana", "es")    // locale-aware compare (-1/0/1)
"𝟘𝟙".normalize("NFKD")                   // Unicode normalization

/* Regex search helpers */
"abc123".search(/\d+/)                    // 3 (first match index)
"abc123".match(/\d+/)                     // ["123"] (first match or null)
[... "a1a2".matchAll(/\d/g)]              // iterable → [["1"], ["2"]] with indices

/*---------------------------------------------------------------
 | C) Extract / Slice
 *---------------------------------------------------------------*/
"hello".slice(1, 4)                        // "ell"   (end exclusive, supports negatives)
"hello".substring(1, 4)                    // "ell"   (swaps args if start>end; no negatives)
"hello".substr?.(1, 3)                     // "ell"   (deprecated/legacy)
"🎉JS".at(0)                                // "🎉"   (safe with negatives too)
"🎉JS".codePointAt(0)                       // 0x1F389

/*---------------------------------------------------------------
 | D) Modify / Build (return NEW strings)
 *---------------------------------------------------------------*/
"he".concat("llo", " world")               // "hello world"
"  padded  ".trim()                        // "padded"
" hi ".trimStart()                         // "hi "
" hi ".trimEnd()                           // " hi"
"7".padStart(3, "0")                       // "007"
"7".padEnd(4, ".")                         // "7..."
"ha".repeat(3)                             // "hahaha"
"FOO".toLowerCase()                        // "foo"
"bar".toUpperCase()                        // "BAR"
"straße".toLocaleUpperCase("de-DE")        // "STRASSE" (locale aware)

/* Replace (supports regex) */
"color".replace("or", "our")               // "colour" (first only)
"foo foo".replace(/foo/, "bar")            // "bar foo"
"foo foo".replaceAll("foo", "bar")         // "bar bar"
"ab1c2".replace(/\d/g, d => `[${d}]`)      // "ab[1]c[2]"

/* Split / Join */
"a,b,,c".split(",")                        // ["a","b","","c"]
"2025-09-22".split("-", 2)                 // ["2025","09"]

/*---------------------------------------------------------------
 | E) Template literals (language feature, not methods)
 *---------------------------------------------------------------*/
const user = "Ajay";
`Hello, ${user}!`                           // "Hello, Ajay!"
String.raw`C:\temp\${user}\n`               // "C:\\temp\\Ajay\\n"

/*---------------------------------------------------------------
 | F) Regex power combo patterns
 *---------------------------------------------------------------*/
// 1) Capture groups with replace
"john_doe".replace(/(^.|_.)/g, m => m.replace("_","").toUpperCase()) // "JohnDoe"

// 2) Global, case-insensitive, multiline flags
"Hi\nhi".match(/hi/gi)                     // ["Hi","hi"]

// 3) Greedy vs lazy
"<b>x</b><b>y</b>".match(/<b>.*<\/b>/)     // ["<b>x</b><b>y</b>"]
"<b>x</b><b>y</b>".match(/<b>.*?<\/b>/g)   // ["<b>x</b>", "<b>y</b>"]

/*---------------------------------------------------------------
 | G) Conversion / Boxing
 *---------------------------------------------------------------*/
"42".valueOf()                              // "42" (primitive)
new String("x").toString()                  // "x" (avoid new String in practice)

/*---------------------------------------------------------------
 | H) Deprecated / HTML wrapper helpers (avoid in new code)
 *---------------------------------------------------------------*/
// "text".anchor("name"); "text".big(); "text".blink(); "text".bold();
// "text".fixed(); "text".fontcolor("red"); "text".fontsize("7");
// "text".italics(); "text".link("https://..."); "text".small();
// "text".strike(); "text".sub(); "text".sup();

/*---------------------------------------------------------------
 | I) Gotchas & Tips
 *---------------------------------------------------------------
 // - Strings are immutable: s[0] = 'X' does nothing. Use slices/build new.
 // - UTF-16 vs Unicode: charCodeAt returns code UNITS; use codePointAt for emoji/surrogates.
 // - substring() treats negatives as 0 and swaps args; slice() supports negatives (prefer slice).
 // - replaceAll requires exact string or global regex (/.../g) is needed with replace().
 // - split("") splits by code units (emoji become 2 items). Use Array.from(str) for codepoints.
 // - localeCompare helps sort with accents/locale; pass {sensitivity:"base"} for case-insensitive.
*/

/*---------------------------------------------------------------
 | J) Handy utilities
 *---------------------------------------------------------------*/
const toTitle = s => s.toLowerCase()
  .replace(/\b[\p{L}\p{Nl}]/gu, c => c.toUpperCase());     // Unicode safe
toTitle("hello world → 𝓳𝓼"); // "Hello World → 𝓙𝓼"

const safeSliceGraphemes = (s, n) =>
  Array.from(s).slice(0, n).join(""); // grapheme-aware truncation
safeSliceGraphemes("Hi 👋🏽 JS", 5);   // "Hi 👋🏽"

const stripHtml = html => html.replace(/<[^>]+>/g, "");
stripHtml("<p>Hello<b>JS</b></p>");   // "HelloJS"



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


/******************************************************************
 * JAVASCRIPT MATH — MASTER LIST (constants + functions)
 * Notes:
 *  - All are static: use Math.* (no constructor)
 *  - Most take/return Numbers (IEEE-754 double); no BigInt support
 ******************************************************************/

/*---------------------------------------------------------------
 | A) Constants
 *---------------------------------------------------------------*/
Math.E            // 2.718281828...
Math.PI           // 3.141592653...
Math.SQRT2        // √2
Math.SQRT1_2      // √(1/2)
Math.LN2          // ln(2)
Math.LN10         // ln(10)
Math.LOG2E        // log2(e)
Math.LOG10E       // log10(e)
Number.EPSILON    // 2^-52 (not in Math, but useful for comparisons)
Number.MAX_SAFE_INTEGER // 2^53 - 1

/*---------------------------------------------------------------
 | B) Rounding & integer-ish helpers
 *---------------------------------------------------------------*/
Math.floor(3.9)    // 3  (down)
Math.ceil(3.1)     // 4  (up)
Math.round(3.5)    // 4  (to nearest, .5 -> up)
Math.trunc(-3.9)   // -3 (drop fractional part)
Math.sign(-42)     // -1 (negative) | 0 | 1 (positive) | -0 | NaN->NaN
Math.fround(1.337) // float32 rounding (useful for WebGL)
Math.abs(-8)       // 8

/*---------------------------------------------------------------
 | C) Basic arithmetic helpers
 *---------------------------------------------------------------*/
Math.max(1, 9, 3)  // 9
Math.min(1, 9, 3)  // 1
Math.hypot(3, 4)   // 5 (√(3^2+4^2)), handles many args safely
Math.imul(0xFFFFFFFE, 5) // 32-bit int multiplication (wraps like C)
Math.clz32(16)     // 27 (count leading zeros in 32-bit binary)

/*---------------------------------------------------------------
 | D) Powers, roots, logs, exponentials
 *---------------------------------------------------------------*/
Math.pow(2, 5)     // 32           (prefer **)
2 ** 5             // 32
Math.sqrt(9)       // 3
Math.cbrt(27)      // 3
Math.exp(1)        // e^1
Math.expm1(x)      // e^x - 1  (better precision near 0)
Math.log(10)       // natural log (ln)
Math.log1p(x)      // ln(1 + x)  (better precision near 0)
Math.log10(1000)   // 3
Math.log2(8)       // 3

/*---------------------------------------------------------------
 | E) Trigonometry (radians!)
 *---------------------------------------------------------------*/
// Convert deg <-> rad
const toRad = d => d * (Math.PI / 180);
const toDeg = r => r * (180 / Math.PI);

Math.sin(toRad(30))   // 0.5
Math.cos(toRad(60))   // 0.5
Math.tan(toRad(45))   // 1
Math.asin(0.5)        // ~0.523... (≈ 30°)
Math.acos(0.5)        // ~1.047... (≈ 60°)
Math.atan(1)          // ~0.785... (≈ 45°)
Math.atan2(y, x)      // angle of vector (x,y), quadrant-aware

/* Hyperbolic */
Math.sinh(1)          // ≈ 1.175201...
Math.cosh(1)          // ≈ 1.543080...
Math.tanh(1)          // ≈ 0.761594...
Math.asinh(1)         // ≈ 0.881373...
Math.acosh(2)         // ≈ 1.316957...
Math.atanh(0.5)       // ≈ 0.549306...

/*---------------------------------------------------------------
 | F) Random
 *---------------------------------------------------------------*/
Math.random()         // in [0, 1) (uniform)

// Common helpers:
const randFloat = (min, max) => Math.random() * (max - min) + min;         // [min, max)
const randInt   = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // [min, max]
const sample    = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffleInPlace = arr => { // Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/*---------------------------------------------------------------
 | G) Precision tips (floating point)
 *---------------------------------------------------------------*/
// 0.1 + 0.2 !== 0.3 → true (0.30000000000000004)
const nearlyEqual = (a,b,eps=Number.EPSILON*4) => Math.abs(a-b) < eps;
nearlyEqual(0.1 + 0.2, 0.3); // true

// Decimal rounding helpers:
const roundTo = (x, digits=2) => {
  const p = 10 ** digits;
  return Math.round((x + Number.EPSILON) * p) / p;
};
roundTo(1.005, 2); // 1.01

/*---------------------------------------------------------------
 | H) Patterns you’ll use a lot
 *---------------------------------------------------------------*/
// Clamp value into [min,max]  (no built-in Math.clamp in JS yet)
const clamp = (x, min, max) => Math.min(max, Math.max(min, x));
clamp(120, 0, 100); // 100

// Normalize to 0..1 then scale to range
const norm  = (x, a, b) => (x - a) / (b - a);
const lerp  = (t, a, b) => a + t * (b - a);
lerp(norm(75, 50, 100), 0, 10); // 5

// Angle wrapping (radians) to [-PI, PI)
const wrapPi = a => ((a + Math.PI) % (2*Math.PI) + (2*Math.PI)) % (2*Math.PI) - Math.PI;

// Safe integer checks (Number.* lives on Number, but relevant)
Number.isInteger(3.0);              // true
Number.isSafeInteger(2 ** 53 - 1);  // true

/*---------------------------------------------------------------
 | I) Gotchas & notes
 *---------------------------------------------------------------
 // - Trig functions use RADIANS, not degrees.
 // - Floating-point rounding errors are normal; compare with EPSILON.
 // - Math.max/min of an array: use spread carefully (may overflow stack).
 //   Example: Math.max(...arr) for small arrays; reduce for very large.
 // - Math.random() is NOT cryptographically secure. For security, use:
 //   crypto.getRandomValues(...) in browsers / node:crypto.randomInt.
*/


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/******************************************************************
 * JAVASCRIPT NUMBER — MASTER LIST
 * Legend: Number.* = static on Number;  n.* = instance (Number.prototype)
 * Notes: Numbers are IEEE-754 doubles (64-bit). `Number` can be a
 *        function (coercion) or a wrapper object (avoid `new Number`).
 ******************************************************************/

/*---------------------------------------------------------------
 | A) Creation / Coercion
 *---------------------------------------------------------------*/
Number("42")            // 42           (string → number; NaN if invalid)
Number(true)            // 1
Number(false)           // 0
Number(null)            // 0
Number(undefined)       // NaN
Number("")              // 0
Number("0xFF")          // 255          (hex supported)
+("3.14")               // 3.14         (unary plus is common)

new Number(5)           // Number object wrapper (avoid)
(new Number(5)).valueOf() // 5 (primitive)

/*---------------------------------------------------------------
 | B) Static constants (Number.*)
 *---------------------------------------------------------------*/
Number.EPSILON          // ≈ 2.220446049250313e-16  (2^-52)
Number.MAX_SAFE_INTEGER // 9007199254740991 (2^53-1)
Number.MIN_SAFE_INTEGER // -9007199254740991
Number.MAX_VALUE        // ≈ 1.7976931348623157e+308
Number.MIN_VALUE        // ≈ 5e-324 (smallest positive subnormal)
Number.NaN              // NaN
Number.NEGATIVE_INFINITY
Number.POSITIVE_INFINITY

/*---------------------------------------------------------------
 | C) Static type guards / parsers (Number.*)
 *---------------------------------------------------------------*/
Number.isFinite(3/2)          // true   (NO coercion)
Number.isFinite("10")         // false  (string is not coerced)
Number.isNaN(NaN)             // true   (NO coercion)
Number.isNaN("foo")           // false  (unlike global isNaN)
Number.isInteger(3.0)         // true
Number.isInteger(3.1)         // false
Number.isSafeInteger(2**53-1) // true
Number.parseInt("08", 10)     // 8      (alias of global parseInt)
Number.parseFloat("3.14xyz")  // 3.14   (alias of global parseFloat)

/*---------------------------------------------------------------
 | D) Instance formatting / conversion (n.*)
 *   (These are on Number.prototype; work on number primitives too)
 *---------------------------------------------------------------*/
(1234.567).toFixed(2)         // "1234.57"      (fixed decimals; string)
(1234.567).toExponential(2)   // "1.23e+3"      (scientific; string)
(1234.567).toPrecision(3)     // "1.23e+3" or "1230" depending magnitude
(255).toString(16)            // "ff"           (radix 2..36)
(10).toString(2)              // "1010"
(123456.789).toLocaleString("en-IN")
// "1,23,456.789" (Indian grouping)

(1234.5).valueOf()           // 1234.5 (primitive number)

/* `toLocaleString` with options (powerful formatter) */
(1234567.89).toLocaleString("en-US", {
  style: "currency", currency: "USD", minimumFractionDigits: 2
}) // "$1,234,567.89"

(0.35).toLocaleString("en-US", { style: "percent" }) // "35%"

(42).toLocaleString("en", { style:"unit", unit:"kilometer" }) // "42 km"

/*---------------------------------------------------------------
 | E) Useful helpers & patterns built on Number/Math
 *---------------------------------------------------------------*/
// Floating-point comparison with EPSILON
const nearlyEqual = (a, b, eps = Number.EPSILON * 4) => Math.abs(a - b) < eps;
nearlyEqual(0.1 + 0.2, 0.3);  // true

// Safe integer check before array indexing / loops
const safeIndex = n => Number.isInteger(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER;

// Parse exactly (prefer Number/parseFloat/parseInt explicitly)
Number("  12.5  ")   // 12.5    (trims)
parseInt("101", 2)   // 5       (binary)
parseFloat("1.2e3")  // 1200

// Detect -0 (negative zero)
Object.is(-0, 0)         // false
Object.is(-0, -0)        // true

// Clamp / round helpers using Number + Math
const roundTo = (x, d=2) => {
  const p = 10 ** d;
  return Math.round((x + Number.EPSILON) * p) / p;
};
roundTo(1.005, 2);  // 1.01

/*---------------------------------------------------------------
 | F) Edge cases & gotchas
 *---------------------------------------------------------------
 // - `toFixed`, `toExponential`, `toPrecision` return STRINGS.
 // - Range limits: digits for toFixed: 0..100 (impl-defined upper bound ~100).
 // - Parentheses needed when calling methods on numeric literals:
 //     2..toString(2)  // works (two dots), or  (2).toString(2)
 // - `Number.isNaN` vs global `isNaN`:
 //     Number.isNaN("foo") -> false;  isNaN("foo") -> true (coerces)
 // - `parseInt` defaults radix=10 in modern JS when input doesn’t start "0x",
 //   but always pass radix explicitly for clarity.
 // - `Number.MAX_SAFE_INTEGER` bounds exact integer representation.
 //   Beyond that, integers may lose precision.
 // - `toLocaleString` is for display; don’t parse its output back to numbers.
*/

/*---------------------------------------------------------------
 | G) Quick reference summary
 *---------------------------------------------------------------
 // STATIC (Number.*):
 //   EPSILON, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MAX_VALUE, MIN_VALUE,
 //   NaN, NEGATIVE_INFINITY, POSITIVE_INFINITY,
 //   isFinite, isNaN, isInteger, isSafeInteger, parseFloat, parseInt
 //
 // PROTOTYPE (n.*):
 //   toString(radix?), toLocaleString(locales?, options?),
 //   valueOf(), toFixed(digits?), toExponential(fractionDigits?),
 //   toPrecision(precision?)
*/



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// dom 

// element selection
document.getElementById("id")
document.getElementsByClassName("class") // HTMLCollection
document.getElementsByTagName("tag") // HTMLCollection
document.querySelector("css") // first match
document.querySelectorAll("css") // NodeList


 
// get set the value of the attributes 
element.getAttribute("attr")
element.setAttribute("attr", "value")
element.removeAttribute("attr")
element.hasAttribute("attr") // true/false
element.attributes // NamedNodeMap of all attributes
// element properties
element.id
element.className
element.innerHTML
element.textContent
element.style // CSSStyleDeclaration object for inline styles       
element.classList // DOMTokenList for class manipulation
element.dataset // DOMStringMap for data-* attributes
element.value // for form elements like input, textarea, select
element.src // for img, script, iframe
element.href // for a, link
element.title // title attribute



// event handling
element.addEventListener("event", function) 
element.removeEventListener("event", function)
element.addEventListener("event", function, options)
element.removeEventListener("event", function, options)
element.addEventListener("event", function, options)


// set set the value of the properties
element.id = "id"
element.className = "class"
element.innerHTML = "innerHTML"
element.textContent = "textContent"
element.style = "style"
element.classList = "classList"
element.dataset = "dataset"
element.value = "value"
element.src = "src"
element.href = "href"
element.title = "title"
element.dataset = "dataset"
element.value = "value"
element.src = "src"
element.href = "href"
element.title = "title"
element.dataset = "dataset"
element.value = "value"
element.src = "src"
element.href = "href"
element.title = "title"
element.dataset = "dataset"
element.value = "value"
element.src = "src"
element.href = "href"
element.title = "title"
element.dataset = "dataset"



// how to get the value of the element 
element.id
element.className
element.innerHTML
element.textContent
element.style // CSSStyleDeclaration object for inline styles       
element.classList // DOMTokenList for class manipulation
element.dataset // DOMStringMap for data-* attributes
element.value // for form elements like input, textarea, select
element.src // for img, script, iframe
element.href // for a, link
element.title // title attribute




// all dom event 
click
dblclick
contextmenu
mouseenter
mouseleave
mouseover
mouseout
mousemove
submit
change
focus
blur
input
keydown
keyup
change
input
keydown
keyup
change
input
keydown
keyup


// dom traversal
parentNode
childNodes
firstChild
lastChild
previousSibling
nextSibling
parentElement
children
firstElementChild
lastElementChild
previousElementSibling
nextElementSibling


// append child in the js 
element.appendChild(child)
element.prepend(child)
element.append(child)
element.prepend(child)

// remove child in the js 
element.removeChild(child)
element.remove()
element.removeChild(child)

// insert before in the js 
element.insertBefore(child, referenceNode)
element.insertAdjacentElement(position, child)

// clone node in the js 
element.cloneNode(deep);



// window 
window.open(url, target, features)
window.close()
window.location.href = url
window.location.reload()
window.location.assign(url)
window.location.replace(url)
window.location.search
window.location.hash
window.location.pathname
window.location.origin
window.location.protocol
window.location.host
window.location.port

// history
window.history.back()
window.history.forward()
window.history.go(n)
window.history.length
window.history.pushState(state, title, url)



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// timer interval
// setTimeout
// setInterval
// clearTimeout
// clearInterval
// stopAccurateInterval
// startAccurateInterval
// startAccurateInterval



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
