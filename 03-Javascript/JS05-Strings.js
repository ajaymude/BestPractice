

// ✅ 1️⃣ Creating Strings
const str1 = "Hello, World!";
const str2 = 'JavaScript is awesome!';
const str3 = `This is a template literal.`; // Allows embedding variables
const name = "Ajay";
const greeting = `Hello, ${name}!`; // Template string with variable
console.log(greeting); // Output: Hello, Ajay!

// ✅ 2️⃣ String Length
console.log("Length of str1:", str1.length); // Output: 13

// ✅ 3️⃣ Accessing Characters
console.log("First Character:", str1[0]); // H
console.log("Last Character:", str1[str1.length - 1]); // !

// ✅ 4️⃣ String Methods
console.log("Uppercase:", str1.toUpperCase()); // HELLO, WORLD!
console.log("Lowercase:", str1.toLowerCase()); // hello, world!

// ✅ 5️⃣ Searching in Strings
console.log("Index of 'World':", str1.indexOf("World")); // 7
console.log("Includes 'Java'?", str2.includes("Java")); // true
console.log("Starts with 'Hello'?", str1.startsWith("Hello")); // true
console.log("Ends with 'World'?", str1.endsWith("World!")); // true

// ✅ 6️⃣ Extracting Substrings
console.log("Slice (0,5):", str1.slice(0, 5)); // Hello
console.log("Substring (7,12):", str1.substring(7, 12)); // World
console.log("Substr (7,5):", str1.substr(7, 5)); // World (Deprecated)

// ✅ 7️⃣ Replacing Text
console.log("Replace 'World' with 'JS':", str1.replace("World", "JS")); // Hello, JS!

// ✅ 8️⃣ Removing Whitespace
const spacedStr = "   Trim me!   ";
console.log("Trim:", spacedStr.trim()); // "Trim me!"
console.log("Trim Start:", spacedStr.trimStart()); // "Trim me!   "
console.log("Trim End:", spacedStr.trimEnd()); // "   Trim me!"

// ✅ 9️⃣ Splitting and Joining Strings
const words = "JavaScript is fun";
const wordsArray = words.split(" "); // Split by space
console.log("Split into array:", wordsArray); // ['JavaScript', 'is', 'fun']

const joinedString = wordsArray.join("-"); // Join with hyphen
console.log("Joined String:", joinedString); // JavaScript-is-fun

// ✅ 🔟 Repeat and Padding
console.log("Repeat 'JS' 3 times:", "JS".repeat(3)); // JSJSJS
console.log("Pad Start (length 10):", "42".padStart(10, "0")); // 0000000042
console.log("Pad End (length 10):", "42".padEnd(10, "*")); // 42********

// ✅ 1️⃣1️⃣ Converting String to Array
console.log("String to Array:", [..."Hello"]); // ['H', 'e', 'l', 'l', 'o']

// ✅ 1️⃣2️⃣ Escape Characters
console.log("New Line:\nThis is on a new line.");
console.log("Tab:\tTabbed space");
console.log("Backslash: \\");
console.log("Quotes: \"Double\" and 'Single'");

// ✅ 1️⃣3️⃣ Checking if String is Empty
const emptyStr = "";
console.log("Is Empty?", emptyStr.length === 0); // true

// ✅ 1️⃣4️⃣ Character Code & Unicode
console.log("Char Code of 'A':", "A".charCodeAt(0)); // 65
console.log("From Char Code 65:", String.fromCharCode(65)); // A

// ✅ 1️⃣5️⃣ String Comparison
console.log("Compare 'apple' vs 'banana':", "apple" < "banana"); // true (Lexicographical order)

// ✅ 1️⃣6️⃣ Reverse a String
const original = "JavaScript";
const reversed = original.split("").reverse().join("");
console.log("Reversed:", reversed); // tpircSavaJ



