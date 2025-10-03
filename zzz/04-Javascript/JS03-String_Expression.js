// ✂️ STRING & REGULAR EXPRESSIONS
// 46 - String Literals, Template Literals (backticks), string concatenation
// 47 - Common String Methods: length, indexOf, lastIndexOf, slice, substr, substring, replace, replaceAll, toUpperCase, toLowerCase, trim, split
// 48 - String immutability and performance considerations
// 49 - Regular Expressions: syntax, flags (g, i, m, u, y, s)
// 50 - Common RegExp Methods: test, exec, match, matchAll, replace with regex, search




// string method 
/*
JavaScript String Methods Reference (categorized)

// Properties
- length                                – number of code units in the string

// Character Access
- charAt(index)                         – get character at index
- charCodeAt(index)                     – get UTF-16 code unit at index
- codePointAt(position)                 – get full code point at position

// Searching & Matching
- indexOf(searchValue[, fromIndex])     – first occurrence index or -1
- lastIndexOf(searchValue[, fromIndex]) – last occurrence index or -1
- includes(searchValue[, position])     – true if searchValue found
- startsWith(searchValue[, position])   – true if begins with searchValue
- endsWith(searchValue[, length])       – true if ends with searchValue
- search(regexp)                        – index of first match or -1
- match(regexp)                         – array of matches (non-global returns match info)
- matchAll(regexp)                      – iterator of all match objects
- localeCompare(compareString[, locales[, options]]) – compare with locale rules

// Extraction
- slice(beginIndex[, endIndex])         – extract substring by indices
- substring(indexStart[, indexEnd])     – extract substring (order-corrected)
- substr(start[, length])               – extract substring by start and length

// Modification & Replacement
- replace(searchValue, replaceValue)    – replace first match
- replaceAll(searchValue, replaceValue) – replace all matches
- normalize([form])                     – Unicode normalization (NFC, NFD, NFKC, NFKD)

// Splitting & Concatenation
- split(separator[, limit])             – split into array by separator
- concat(...strings)                    – merge multiple strings

// Case Conversion
- toUpperCase()                         – convert to uppercase
- toLowerCase()                         – convert to lowercase
- toLocaleUpperCase([locales])          – locale-aware uppercase
- toLocaleLowerCase([locales])          – locale-aware lowercase

// Whitespace Manipulation
- trim()                                – remove whitespace from both ends
- trimStart() / trimLeft()              – remove leading whitespace
- trimEnd() / trimRight()               – remove trailing whitespace

// Padding & Repetition
- padStart(targetLength[, padString])   – pad at start to target length
- padEnd(targetLength[, padString])     – pad at end to target length
- repeat(count)                         – repeat the string count times

// Encoding & Raw
- toString([radix])                     – convert to string (with optional radix for numbers)
- valueOf()                             – primitive value of String object
- String.raw`…`                         – tag for raw string literals (static)

*/



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
46 - String Literals, Template Literals (backticks), String Concatenation

This note explains:
1. String literals using single ('') and double ("") quotes.
2. Template literals using backticks (``), with embedded expressions and multi-line support.
3. Concatenating strings using the + operator and String.prototype.concat().
*/

// 1. Single- and Double-Quoted Literals
const singleQuoted = 'Hello, world!';
const doubleQuoted = "Hello, world!";
console.log(singleQuoted);            // Hello, world!
console.log(doubleQuoted);            // Hello, world!
console.log('Type:', typeof singleQuoted); // string

// 2. Escaping Quotes
const escaped = 'He said, "It\'s fine."';
console.log(escaped);                 // He said, "It's fine."

// 3. Template Literals with Embedded Expressions
const name = 'Ajay';
const greeting = `Hello, ${name}!`;
console.log(greeting);                // Hello, Ajay!

// 4. Multi-line Strings
const multiLine = `Line 1
Line 2
Line 3`;
console.log(multiLine);
/*
Line 1
Line 2
Line 3
*/

// 5. Expression Interpolation
const a = 5, b = 7;
console.log(`Sum of ${a} and ${b} is ${a + b}`); // Sum of 5 and 7 is 12

// 6. String Concatenation with +
const concatPlus = 'Hello, ' + name + '! Welcome.';
console.log(concatPlus);             // Hello, Ajay! Welcome.

// 7. String Concatenation with concat()
const concatMethod = 'Hello, '.concat(name, '! Have a great day.');
console.log(concatMethod);           // Hello, Ajay! Have a great day.

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/*
47 - Common String Methods: length, indexOf, lastIndexOf, slice, substr, substring, replace, replaceAll, toUpperCase, toLowerCase, trim, split

This note explains:
1. length           – number of code units in the string.
2. indexOf          – first occurrence index or -1.
3. lastIndexOf      – last occurrence index or -1.
4. slice            – extract part of string by start/end indices.
5. substr           – extract substring by start and length.
6. substring        – extract substring by start/end (order-corrected).
7. replace          – replace first match (string or regex).
8. replaceAll       – replace all matches (string or regex).
9. toUpperCase      – convert to uppercase.
10. toLowerCase     – convert to lowercase.
11. trim            – remove whitespace from both ends.
12. split           – split string into array by separator.
*/

const sample = "  Hello, JavaScript world!  ";

// 1. length
console.log("length:", sample.length);           // length: 27

// 2. indexOf
console.log("indexOf('JavaScript'):", sample.indexOf("JavaScript")); // 9
console.log("indexOf('x'):", sample.indexOf("x"));                   // 16
console.log("indexOf('foo'):", sample.indexOf("foo"));               // -1

// 3. lastIndexOf
console.log("lastIndexOf('o'):", sample.lastIndexOf("o"));           // 21

// 4. slice(start, end)
console.log("slice(2, 7):", sample.slice(2, 7));        // "Hello"
console.log("slice(-8, -2):", sample.slice(-8, -2));  // "world"

// 5. substr(start, length)
console.log("substr(2, 5):", sample.substr(2, 5));     // "Hello"
console.log("substr(-7, 5):", sample.substr(-7, 5));   // "world"

// 6. substring(start, end)
console.log("substring(2, 7):", sample.substring(2, 7)); // "Hello"
// order is swapped if start > end:
console.log("substring(7, 2):", sample.substring(7, 2)); // "Hello"

// 7. replace(search, replace)
console.log("replace('JavaScript', 'JS'):", sample.replace("JavaScript", "JS"));
// "  Hello, JS world!  "
// regex replace (first only):
console.log("replace(/o/, 'O'):", sample.replace(/o/, "O")); 
// only first 'o' replaced

// 8. replaceAll(search, replace)
console.log("replaceAll('o', 'O'):", sample.replaceAll("o", "O"));
// all 'o' replaced

// 9. toUpperCase
console.log("toUpperCase():", sample.toUpperCase());
// "  HELLO, JAVASCRIPT WORLD!  "

// 10. toLowerCase
console.log("toLowerCase():", sample.toLowerCase());
// "  hello, javascript world!  "

// 11. trim()
console.log("trim():", `"${sample.trim()}"`); 
// removes spaces: "Hello, JavaScript world!"

// 12. split(separator, limit)
console.log("split(', '):", sample.trim().split(", ")); 
// ["Hello", "JavaScript world!"]
console.log("split(' '):", sample.trim().split(" ")); 
// ["Hello,", "JavaScript", "world!"]
console.log("split('', 5):", sample.trim().split("", 5)); 
// first 5 chars: ["H","e","l","l","o"]

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/*
48 - String Immutability and Performance Considerations

This note explains:
1. Strings are immutable: once created, they cannot be changed in place.
2. Methods like replace(), toUpperCase(), slice() return new strings.
3. Attempting to modify via index has no effect.
4. Performance: repeated concatenation creates many intermediate strings—consider alternatives.
*/

// 1. Immutability demonstration
let s = "hello";
s[0] = "H";                                 // no error, but has no effect
console.log("After s[0] = 'H':", s);        // "hello"

// Using replace() creates a new string
const s2 = s.replace("h", "H");
console.log("s.replace('h','H'):", s2);     // "Hello"
console.log("Original s remains:", s);      // "hello"

// 2. Methods return new strings
const upper = s.toUpperCase();
console.log("s.toUpperCase():", upper);     // "HELLO"

// 3. Chaining methods
const mixed = "   spaced   ";
const trimmedUpper = mixed.trim().toUpperCase();
console.log("mixed.trim().toUpperCase():", `"${trimmedUpper}"`); // "SPACED"

// 4. Performance considerations

// 4a. Naive concatenation in a loop
console.time("concat loop");
let result1 = "";
for (let i = 0; i < 10000; i++) {
  result1 += "*";                           // each iteration creates a new string
}
console.timeEnd("concat loop");

// 4b. Using array join for large concatenations
console.time("array join");
const arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push("*");
}
const result2 = arr.join("");               // single join() at end
console.timeEnd("array join");

// Verify lengths
console.log("result1 length:", result1.length, "result2 length:", result2.length);

// 5. Best Practices
/*
- Remember strings cannot be altered in place; all modifications return new strings.
- For small or occasional concatenations, use += or template literals.
- For large or repeated concatenations inside loops, accumulate parts in an array and use join() to minimize intermediate string creation.
- Leverage built-in string methods (replace, slice, trim, etc.) for clear and efficient transformations.
*/

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
49 - Regular Expressions: Syntax, Flags (g, i, m, u, y, s)

This note explains:
1. Basic regex literal and RegExp constructor syntax.
2. Flags:
   • g – global search
   • i – ignore case
   • m – multiline (^ and $ match start/end of lines)
   • u – Unicode
   • y – sticky (match from lastIndex only)
   • s – dotAll (dot matches newline)
3. Common methods: test(), exec(), and string methods (match, replace, etc.).
4. Examples demonstrating each flag.
*/

// 1. Regex literal vs. constructor
const reLiteral = /hello/;
const reConstructor = new RegExp('hello', 'i');
console.log('reLiteral.test("hello"):', reLiteral.test('hello'));           // true
console.log('reConstructor.test("HELLO"):', reConstructor.test('HELLO'));   // true (ignore case)

// 2. Flag: g (global)
const text = 'apple banana apple';
const reGlobal = /apple/g;
console.log('text.match(/apple/g):', text.match(reGlobal)); // ['apple','apple']

// exec() with global
let match;
reGlobal.lastIndex = 0;
while ((match = reGlobal.exec(text)) !== null) {
  console.log(`Found "${match[0]}" at index ${match.index}; next search starts at ${reGlobal.lastIndex}`);
}

// 3. Flag: i (ignore case)
const reIgnore = /JavaScript/i;
console.log('reIgnore.test("javascript"):', reIgnore.test('javascript')); // true

// 4. Flag: m (multiline)
const multi = 'start\nmiddle\nend';
const reMultiline = /^middle$/m;
console.log('multi.match(/^middle$/m):', multi.match(reMultiline));       // ['middle']

// 5. Flag: s (dotAll)
const withNewline = 'first line\nsecond line';
const reDotAll = /first.*second/s;
console.log('reDotAll.test(withNewline):', reDotAll.test(withNewline));   // true

// 6. Flag: u (Unicode)
// match a code point beyond U+FFFF, e.g. emoji
const emoji = '🙂';
const reWithoutU = /^.$/;
const reWithU = /^.$/u;
console.log('without u matches emoji:', reWithoutU.test(emoji)); // false
console.log('with u matches emoji:', reWithU.test(emoji));       // true

// 7. Flag: y (sticky)
// matches only at lastIndex
const stickyText = 'a1b2';
const reSticky = /\d/y;
reSticky.lastIndex = 2;
console.log('reSticky.exec at pos2:', reSticky.exec(stickyText));  // ['2']
reSticky.lastIndex = 1;
console.log('reSticky.exec at pos1:', reSticky.exec(stickyText));  // null

// 8. String methods using regex
console.log('split by commas:', 'a,b,c'.split(/,/));               // ['a','b','c']
console.log('replace first digit:', 'a1b2'.replace(/\d/, 'X'));     // 'aXb2'
console.log('replace all digits:', 'a1b2'.replace(/\d/g, 'X'));     // 'aXbX'

// 9. Methods summary
/*
- re.test(str): true/false
- re.exec(str): { index, 0: match } or null
- str.match(re): array of matches or null (with g)/first match otherwise
- str.replace(re, repl)
- str.split(re)
*/

// 10. Best Practices
/*
- Use literal syntax /…/ for static patterns; RegExp() for dynamic patterns.
- Apply flags as needed; combine flags (e.g., /pattern/gim).
- Remember dotAll (s) for matching across lines.
- Sticky (y) is useful for tokenizer implementations.
- Clear lastIndex on global/sticky regexps before reuse.
*/

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/*
50 - Common RegExp Methods: test, exec, match, matchAll, replace with regex, search

This note explains:
1. test()       – returns true/false for a match.
2. exec()       – returns first match details or null; with /g, successive calls iterate.
3. match()      – returns array of matches (global) or match info (non-global).
4. matchAll()   – returns iterator of all match objects (ES2020+).
5. replace()    – replaces matches using regex.
6. search()     – returns index of first match or -1.
*/

const text = "The rain in SPAIN stays mainly in the plain.";

// 1. test()
const reTest = /ain/;
console.log("test /ain/:", reTest.test(text));       // true

// 2. exec()
const reExec = /ain/g;
let result;
console.log("\nexec /ain/g positions:");
while ((result = reExec.exec(text)) !== null) {
  console.log(`Found '${result[0]}' at index ${result.index}`);
}
// Found 'ain' at index 5
// Found 'ain' at index 14
// Found 'ain' at index 27
// Found 'ain' at index 36

// 3. match()
console.log("\nmatch /ain/g:", text.match(/ain/g));   // ['ain','ain','ain','ain']
// Non-global match returns first match info:
console.log("match /ain/:", text.match(/ain/));        // ['ain', index:5, input:...]

// 4. matchAll()
console.log("\nmatchAll /ain/g:");
for (const m of text.matchAll(/ain/g)) {
  console.log(`Matched '${m[0]}' at ${m.index}`);
}

// 5. replace() with regex
console.log("\nreplace /ain/g → 'ANE':", text.replace(/ain/g, "ANE"));
// "The rANE in SPANE stays mANELY in the plANE."

// 6. search()
console.log("\nsearch /SPAIN/i:", text.search(/SPAIN/i)); // 12
console.log("search /xyz/:", text.search(/xyz/));         // -1

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////