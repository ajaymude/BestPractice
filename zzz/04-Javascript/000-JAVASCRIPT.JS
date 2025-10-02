// syllabus 
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/************************************************************
 * JavaScript Array — ALL STANDARD METHODS (with mini-examples)
 * One-screen, copy-paste ready. Run in Node/Browser console.
 ************************************************************/

console.clear();
const log = console.log;

// ---------- STATIC (Array.*) ----------
log("\n— STATIC —");
log("Array.isArray([])         =", Array.isArray([]));             // true
log("Array.of(1,2,3)          =", Array.of(1,2,3));                // [1,2,3]
log("Array.from('abc')        =", Array.from("abc"));              // ['a','b','c']
log("Array.from({length:3},(_,i)=>i*i) =", Array.from({length:3}, (_,i)=>i*i)); // [0,1,4]
if (Array.fromAsync) {
  (async () => {
    const a = await Array.fromAsync((async function*(){yield 1; yield 2;})());
    log("Array.fromAsync(...)    =", a);                           // [1,2] (if supported)
  })();
} else {
  log("Array.fromAsync          = not supported in this runtime");
}

// ---------- SETUP ----------
const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6];
const nested = [1, [2, [3]], 4];
const users = [{id:1,role:"admin"},{id:2,role:"user"},{id:3,role:"admin"}];
const words = ["alpha","beta","gamma","beta"];

// ---------- ACCESS / INFO ----------
log("\n— ACCESS / INFO —");
log("a.at(0)                   =", a.at(0));        // 1
log("a.at(-1)                  =", a.at(-1));       // 5
log("a.includes(3)             =", a.includes(3));  // true
log("a.indexOf(3)              =", a.indexOf(3));   // 2
log("words.lastIndexOf('beta') =", words.lastIndexOf("beta")); // 3
log("[...a.keys()]             =", [...a.keys()]);  // [0,1,2,3,4]
log("[...a.values()]           =", [...a.values()]); // [1,2,3,4,5]
log("[...a.entries()]          =", [...a.entries()]); // [[0,1],[1,2]...]

// ---------- ADD / REMOVE (mutating) ----------
log("\n— ADD / REMOVE (mutating) —");
const m1 = [1,2]; m1.push(3); log("push →", m1);      // [1,2,3]
const m2 = [1,2,3]; const x = m2.pop(); log("pop →", m2, "removed:", x); // [1,2] 3
const m3 = [1,2,3]; m3.unshift(0); log("unshift →", m3); // [0,1,2,3]
const m4 = [0,1,2,3]; const y = m4.shift(); log("shift →", m4, "removed:", y); // [1,2,3] 0
const m5 = [1,2,3,4,5]; m5.splice(2,1,"X"); log("splice(2,1,'X') →", m5); // [1,2,'X',4,5]
const m6 = [1,2,3,4,5]; m6.copyWithin(0,3); log("copyWithin(0,3) →", m6); // [4,5,3,4,5]
const m7 = [1,2,3]; m7.reverse(); log("reverse →", m7); // [3,2,1]
const m8 = [3,1,2]; m8.sort((a,b)=>a-b); log("sort(num asc) →", m8); // [1,2,3]
const m9 = new Array(5).fill(0); log("fill(0) →", m9); // [0,0,0,0,0]

// ---------- NEW NON-MUTATING COPIES ----------
log("\n— NEW NON-MUTATING COPIES —");
const c1 = [3,1,2];
log("toSorted((a,b)=>a-b)     =", c1.toSorted((a,b)=>a-b), "original:", c1);
log("toReversed()             =", c1.toReversed(), "original:", c1);
log("toSpliced(1,1,'X')       =", c1.toSpliced(1,1,"X"), "original:", c1);
log("with(1,'Y')              =", c1.with(1,"Y"), "original:", c1);

// ---------- NON-MUTATING BASICS ----------
log("\n— NON-MUTATING BASICS —");
log("a.concat(b)               =", a.concat(b));             // merge arrays
log("a.slice(1,4)              =", a.slice(1,4));            // [2,3,4]
log("nested.flat(2)            =", nested.flat(2));          // [1,2,3,4]
log("['1','2','3'].join('-')   =", ['1','2','3'].join('-')); // "1-2-3"
log("a.toString()              =", a.toString());            // "1,2,3,4,5"
log("[1,2].toLocaleString()    =", [1,2].toLocaleString());  // locale-aware

// ---------- TRANSFORM ----------
log("\n— TRANSFORM —");
log("a.map(x=>x*2)             =", a.map(x=>x*2));               // [2,4,6,8,10]
log("a.flatMap(x=>[x,x*10])    =", a.flatMap(x=>[x,x*10]).slice(0,6)); // [1,10,2,20,...]
log("a.filter(x=>x%2===0)      =", a.filter(x=>x%2===0));        // [2,4]
log("a.reduce((s,x)=>s+x,0)    =", a.reduce((s,x)=>s+x,0));      // 15
log("a.reduceRight((s,x)=>s-x) =", a.reduceRight((s,x)=>s-x));   // ((((5-4)-3)-2)-1)

// ---------- SEARCH ----------
log("\n— SEARCH —");
log("a.find(x=>x>3)            =", a.find(x=>x>3));            // 4
log("a.findIndex(x=>x>3)       =", a.findIndex(x=>x>3));       // 3
log("a.findLast(x=>x<4)        =", a.findLast(x=>x<4));        // 3
log("a.findLastIndex(x=>x<4)   =", a.findLastIndex(x=>x<4));   // 2
log("a.every(x=>x>0)           =", a.every(x=>x>0));           // true
log("a.some(x=>x%2===0)        =", a.some(x=>x%2===0));        // true

// ---------- ITERATION ----------
log("\n— ITERATION —");
log("forEach:", (() => { const tmp=[]; a.forEach((v,i)=>tmp.push(`${i}:${v}`)); return tmp; })());

// ---------- GROUPING (ES2024+; guard for support) ----------
log("\n— GROUPING —");
if (Array.prototype.group && Array.prototype.groupToMap) {
  log("users.group by role      =", users.group(u=>u.role)); // {admin:[...], user:[...]}
  const gtm = users.groupToMap(u=>u.role);                   // Map { 'admin' => [...], 'user' => [...] }
  log("users.groupToMap keys    =", [...gtm.keys()]);
} else {
  log("group / groupToMap       = not supported in this runtime");
}

// ---------- EXTRAS / TRICKS ----------
log("\n— EXTRAS —");
log("[].concat(...new Set(words)) dedupe =", [].concat(...new Set(words))); // ['alpha','beta','gamma']
log("Unique via filter/indexOf           =", words.filter((v,i,arr)=>arr.indexOf(v)===i));

// ---------- REFERENCE LIST (quick glance) ----------
/*
Static:         Array.isArray, Array.of, Array.from, (Array.fromAsync?)
Access/info:    at, includes, indexOf, lastIndexOf, keys, values, entries
Add/remove:     push, pop, unshift, shift, splice, copyWithin, reverse, sort, fill
Copy (new):     toSorted, toReversed, toSpliced, with
Non-mutating:   concat, slice, flat, join, toString, toLocaleString
Transform:      map, flatMap, filter, reduce, reduceRight
Search:         find, findIndex, findLast, findLastIndex, every, some
Iterate:        forEach (also ...spread, for..of)
Grouping:       group, groupToMap (if supported)
*/



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/************************************************************
 * JavaScript Object — ALL STANDARD METHODS (mini-examples)
 * One-screen, copy-paste ready. Run in Node/Browser console.
 ************************************************************/

console.clear();
const log = console.log;

// ---------- SETUP ----------
const symId = Symbol("id");
const base = { kind: "base" };
const obj  = { a: 1, b: 2, [symId]: 999 };
Object.defineProperty(obj, "hidden", { value: "shh", enumerable: false });

// ---------- STATIC (Object.*) ----------
log("\n— STATIC —");

// Identity & own-key introspection
log("Object.keys(obj)                     →", Object.keys(obj));                 // ['a','b']
log("Object.values(obj)                   →", Object.values(obj));               // [1,2]
log("Object.entries(obj)                  →", Object.entries(obj));              // [['a',1],['b',2]]
log("Object.getOwnPropertyNames(obj)      →", Object.getOwnPropertyNames(obj));  // includes 'hidden'
log("Object.getOwnPropertySymbols(obj)    →", Object.getOwnPropertySymbols(obj));// [Symbol(id)]
log("Object.getOwnPropertyDescriptor(obj,'a') →", Object.getOwnPropertyDescriptor(obj,"a"));
log("Object.getOwnPropertyDescriptors(obj)   →", Object.getOwnPropertyDescriptors(obj));
log("Object.hasOwn(obj,'a')               →", Object.hasOwn(obj, "a"));          // true

// Build/transform objects
log("Object.fromEntries([['x',10],['y',20]]) →", Object.fromEntries([["x",10],["y",20]]));
log("Object.assign({}, {x:1}, {y:2})      →", Object.assign({}, {x:1}, {y:2}));  // merges into target
const clone = Object.assign({}, obj);                                           // shallow clone
log("clone                                 →", clone);

// Prototypes
const child = Object.create(base, { z: { value: 3, enumerable: true } });
log("Object.getPrototypeOf(child)         →", Object.getPrototypeOf(child));     // base
Object.setPrototypeOf(child, null);
log("Object.getPrototypeOf(child) after setPrototypeOf(null) →", Object.getPrototypeOf(child)); // null

// Mutability controls
const o1 = { k: 1 }; Object.freeze(o1);
log("Object.isFrozen(o1)                  →", Object.isFrozen(o1));              // true
const o2 = { k: 2 }; Object.seal(o2);
log("Object.isSealed(o2)                  →", Object.isSealed(o2));              // true
const o3 = { k: 3 }; Object.preventExtensions(o3);
log("Object.isExtensible(o3)              →", Object.isExtensible(o3));          // false

// Equality
log("Object.is(NaN, NaN)                  →", Object.is(NaN, NaN));              // true
log("Object.is(+0, -0)                    →", Object.is(+0, -0));                // false

// Optional (newer) — groupBy (guards for runtime support)
if (Object.groupBy) {
  const users = [{id:1, role:"admin"}, {id:2, role:"user"}, {id:3, role:"admin"}];
  log("Object.groupBy(users, u=>u.role)    →", Object.groupBy(users, u => u.role));
} else {
  log("Object.groupBy                       → not supported in this runtime");
}

// ---------- DEFINING PROPERTIES ----------
log("\n— DEFINE —");
const target = {};
Object.defineProperty(target, "ro", { value: 42, writable: false, enumerable: true });
Object.defineProperties(target, {
  visible: { value: true, enumerable: true },
  hidden:  { value: "secret", enumerable: false }
});
log("target                               →", target);
try { target.ro = 100; } catch {}
log("target.ro (still 42)                 →", target.ro);

// ---------- PROTOTYPE (Object.prototype.* on instances) ----------
log("\n— PROTOTYPE —");
const proto = {
  toString() { return "[CustomToString]"; },
  valueOf()  { return 123; }
};
const inst = Object.create(proto, { x: { value: 7, enumerable: true } });

log("inst.hasOwnProperty('x')             →", inst.hasOwnProperty("x"));         // true
log("inst.propertyIsEnumerable('x')       →", inst.propertyIsEnumerable("x"));   // true
log("proto.isPrototypeOf(inst)            →", proto.isPrototypeOf(inst));        // true
log("inst.toString()                      →", String(inst));                     // "[CustomToString]"
log("inst.valueOf()                       →", inst.valueOf());                   // 123
log("({}).toString.call([])               →", ({}).toString.call([]));           // "[object Array]"
log("({}).toLocaleString.call(new Date()) →", ({}).toLocaleString.call(new Date())); // locale date string

// ---------- ENUMERATION NOTES ----------
log("\n— ENUMERATION —");
log("for...in includes inherited enums:");
for (const k in child) log("  key:", k); // (child now has no proto, so nothing)
log("Object.keys only own-enumerables     →", Object.keys(obj));                 // ['a','b']

// ---------- QUICK REFERENCE ----------
/*
Static:
  assign, create, defineProperty, defineProperties,
  entries, fromEntries, freeze, seal, preventExtensions,
  getOwnPropertyDescriptor, getOwnPropertyDescriptors,
  getOwnPropertyNames, getOwnPropertySymbols,
  getPrototypeOf, setPrototypeOf,
  is, isExtensible, isFrozen, isSealed,
  keys, values, hasOwn,
  (groupBy?) — if supported

Prototype (on instances):
  hasOwnProperty, propertyIsEnumerable, isPrototypeOf,
  toString, toLocaleString, valueOf
*/

// ---------- TIPS ----------
log("\n— TIPS —");
log("Shallow clone (own, enumerable): Object.assign({}, obj)");
log("Deep clone (safe types): structuredClone(obj) // (global, not Object.*)");


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/************************************************************
 * JavaScript String — ALL STANDARD METHODS (mini-examples)
 * One-screen, copy-paste ready. Run in Node/Browser console.
 ************************************************************/

console.clear();
const log = console.log;

// ---------- SETUP ----------
const s  = " Hello, JavaScript! ";
const s2 = "hello";
const s3 = "world";
const txt = "bananas are bananatastic bananas";
const emo = "I ♥ JS";
const euro = "€";
const de = "ä";
const z  = "z";

// ---------- STATIC (String.*) ----------
log("\n— STATIC —");
log("String.fromCharCode(72,105)         →", String.fromCharCode(72,105));        // "Hi"
log("String.fromCodePoint(0x1F680)       →", String.fromCodePoint(0x1F680));      // "🚀"
log("String.raw`C:\\temp\\file`          →", String.raw`C:\temp\file`);           // Backslashes kept

// ---------- BASIC/INFO ----------
log("\n— BASIC / INFO —");
log("s.length                            →", s.length);                             // includes spaces
log("'abc'.toString()                    →", "abc".toString());
log("new String('x').valueOf()          →", new String("x").valueOf());            // primitive "x"

// ---------- CHARACTER ACCESS ----------
log("\n— CHAR ACCESS —");
log("'cat'.charAt(1)                    →", "cat".charAt(1));                      // "a"
log("'cat'.at(-1)                       →", "cat".at(-1));                         // "t" (supports negative)
log("'cat'.charCodeAt(1)                →", "cat".charCodeAt(1));                  // 97
log("'🚀'.codePointAt(0)                 →", "🚀".codePointAt(0));                  // 128640

// ---------- SEARCH / CHECK ----------
log("\n— SEARCH / CHECK —");
log("'JavaScript'.includes('Script')     →", "JavaScript".includes("Script"));     // true
log("'foobar'.indexOf('o')               →", "foobar".indexOf("o"));               // 1
log("'foobar'.lastIndexOf('o')           →", "foobar".lastIndexOf("o"));           // 2
log("'hello'.startsWith('he')            →", "hello".startsWith("he"));            // true
log("'hello'.endsWith('lo')              →", "hello".endsWith("lo"));              // true
log("'hello world'.search(/wo.lds?/)    →", "hello world".search(/wo.lds?/));      // 6 (first match index)
log("'resume'.localeCompare('résumé')    →", "resume".localeCompare("résumé", "en")); // -1/0/1 by locale

// ---------- EXTRACT (non-mutating) ----------
log("\n— EXTRACT —");
log("'abcdefgh'.slice(2,5)               →", "abcdefgh".slice(2,5));               // "cde" (supports negatives)
log("'abcdefgh'.substring(2,5)           →", "abcdefgh".substring(2,5));           // "cde" (negatives → 0)
log("'abcdefgh'.split(',')               →", "a,b,c,def".split(","));              // ["a","b","c","def"]
log("'a-b-c-d'.split('-', 2)             →", "a-b-c-d".split("-", 2));             // ["a","b"]
// Legacy (often present, discouraged):
if ("substr" in String.prototype) {
  log("'abcdefgh'.substr(2,3)             →", "abcdefgh".substr(2,3));             // "cde"
} else {
  log("substr                              → not supported in this runtime");
}

// ---------- MODIFY / TRANSFORM ----------
log("\n— MODIFY / TRANSFORM —");
log("'ha'.repeat(3)                      →", "ha".repeat(3));                      // "hahaha"
log("'x'.padStart(5,'0')                 →", "x".padStart(5,"0"));                 // "0000x"
log("'x'.padEnd(5,'0')                   →", "x".padEnd(5,"0"));                   // "x0000"
log("'  trim  '.trim()                   →", "  trim  ".trim());                   // "trim"
log("'  left'.trimStart()                →", "  left".trimStart());                // "left"
log("'right  '.trimEnd()                 →", "right  ".trimEnd());                 // "right"
log("'Mix'.toLowerCase()                 →", "Mix".toLowerCase());                 // "mix"
log("'Mix'.toUpperCase()                 →", "Mix".toUpperCase());                 // "MIX"
log("'i'.toLocaleUpperCase('tr')         →", "i".toLocaleUpperCase("tr"));         // Turkish dotted/undotted rules
log("'ß'.toUpperCase()                   →", "ß".toUpperCase());                    // "SS" (locale-dependent)
log("'a'.concat('-', 'b')                →", "a".concat("-", "b"));                // "a-b"

// ---------- REPLACE / REGEX ----------
log("\n— REPLACE / REGEX —");
log("txt.replace('banana','kiwi')        →", txt.replace("banana","kiwi"));       // only first
log("txt.replaceAll('bananas','apples')  →", txt.replaceAll("bananas","apples"));
log("txt.replace(/banana/g,'kiwi')       →", txt.replace(/banana/g,"kiwi"));
log("'ab12cd34'.match(/\\d+/g)            →", "ab12cd34".match(/\d+/g));           // ["12","34"]
log("Array.from('ab12'.matchAll(/\\d/g)) →", Array.from("ab12".matchAll(/\d/g)).map(m => m[0])); // ["1","2"]

// ---------- NORMALIZE / UNICODE ----------
log("\n— UNICODE —");
const composed   = "\u00E9";      // "é"
const decomposed = "e\u0301";     // "e" + combining acute
log("composed === decomposed             →", composed === decomposed);             // false
log("normalize NFC equal?                →", composed.normalize("NFC") === decomposed.normalize("NFC")); // true
if ("isWellFormed" in String.prototype && "toWellFormed" in String.prototype) {
  // Lone surrogate example (ill-formed)
  const ill = "\uD800";
  log("'\\uD800'.isWellFormed()           →", ill.isWellFormed());                  // false
  log("'\\uD800'.toWellFormed()           →", ill.toWellFormed());                  // "�"
} else {
  log("isWellFormed / toWellFormed        → not supported in this runtime");
}

// ---------- LOCALE / CURRENCY DEMO ----------
log("\n— LOCALE —");
log(`"${de}".localeCompare("${z}", "de") →`, de.localeCompare(z, "de"));           // German collation
log(`"${de}".localeCompare("${z}", "sv") →`, de.localeCompare(z, "sv"));           // Swedish collation

// ---------- TEMPLATE LITERALS (note) ----------
log("\n— TEMPLATE LITERALS —");
// Not String methods, but super common:
const name = "Dev";
log(`Hello, ${name.toUpperCase()}!`);                                             // interpolation
log(String.raw`Raw keep \n backslash`);

// ---------- HTML WRAPPERS (deprecated; often still present) ----------
log("\n— HTML WRAPPERS (deprecated) —");
const hw = "text";
[
  "anchor","big","blink","bold","fixed","fontcolor","fontsize",
  "italics","link","small","strike","sub","sup"
].forEach(m => {
  if (m in String.prototype) log(`"${hw}".${m}('x')`.padEnd(28), "→", hw[m]("x"));
  else log(`${m} → not supported in this runtime`);
});

// ---------- QUICK REFERENCE ----------
/*
Static:
  String.fromCharCode, String.fromCodePoint, String.raw

Instance:
  length (property)

  Access:       at, charAt, charCodeAt, codePointAt
  Search:       includes, indexOf, lastIndexOf, startsWith, endsWith, search, localeCompare
  Extract:      slice, substring, split, (substr?) // legacy
  Modify:       repeat, padStart, padEnd, trim, trimStart, trimEnd, toLowerCase,
                toUpperCase, toLocaleLowerCase, toLocaleUpperCase, concat
  Regex:        replace, replaceAll, match, matchAll
  Unicode:      normalize, (isWellFormed?), (toWellFormed?)
  Conversions:  toString, valueOf
  (Deprecated): anchor, big, blink, bold, fixed, fontcolor, fontsize,
                italics, link, small, strike, sub, sup
*/


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/************************************************************
 * JavaScript Number — ALL STANDARD METHODS & CONSTANTS
 * One-screen, copy-paste ready. Run in Node/Browser console.
 ************************************************************/

console.clear();
const log = console.log;

// ---------- STATIC CONSTANTS ----------
log("\n— CONSTANTS —");
log("Number.EPSILON          =", Number.EPSILON);           // ≈ 2.220446049250313e-16
log("Number.MAX_SAFE_INTEGER =", Number.MAX_SAFE_INTEGER);  // 9007199254740991
log("Number.MIN_SAFE_INTEGER =", Number.MIN_SAFE_INTEGER);  // -9007199254740991
log("Number.MAX_VALUE        =", Number.MAX_VALUE);         // ≈ 1.7976931348623157e+308
log("Number.MIN_VALUE        =", Number.MIN_VALUE);         // ≈ 5e-324 (smallest positive > 0)
log("Number.POSITIVE_INFINITY=", Number.POSITIVE_INFINITY); // Infinity
log("Number.NEGATIVE_INFINITY=", Number.NEGATIVE_INFINITY); // -Infinity
log("Number.NaN              =", Number.NaN);               // NaN

// ---------- CREATION & COERCION ----------
log("\n— CREATION / COERCION —");
log("Number('42')            =", Number("42"));       // 42
log("Number(true)            =", Number(true));       // 1
log("+\"3.14\"                 =", +"3.14");           // 3.14 (unary +)
log("Number('foo')           =", Number("foo"));      // NaN
log("typeof 123              =", typeof 123);         // "number"
log("typeof new Number(7)    =", typeof new Number(7)); // "object" (avoid wrapping objects)

// ---------- STATIC CHECKS ----------
log("\n— STATIC CHECKS —");
log("Number.isNaN(NaN)       =", Number.isNaN(NaN));      // true
log("isNaN('foo') (global)   =", isNaN("foo"));           // true (coerces!)
log("Number.isNaN('foo')     =", Number.isNaN("foo"));    // false (no coercion)
log("Number.isFinite(10)     =", Number.isFinite(10));    // true
log("isFinite('10') (global) =", isFinite("10"));         // true (coerces!)
log("Number.isFinite('10')   =", Number.isFinite("10"));  // false (no coercion)
log("Number.isInteger(3.0)   =", Number.isInteger(3.0));  // true
log("Number.isInteger(3.1)   =", Number.isInteger(3.1));  // false
log("Number.isSafeInteger(2**53-1) =", Number.isSafeInteger(2**53 - 1)); // true
log("Number.isSafeInteger(2**53)   =", Number.isSafeInteger(2**53));     // false

// ---------- PARSING ----------
log("\n— PARSING —");
log("Number.parseInt('101',2)   =", Number.parseInt("101", 2));   // 5
log("Number.parseInt('FF',16)   =", Number.parseInt("FF", 16));   // 255
log("Number.parseFloat('3.14px')=", Number.parseFloat("3.14px")); // 3.14
// (globals parseInt/parseFloat are identical to Number.parseInt/parseFloat)

// ---------- FORMAT / STRING CONVERSION (instance methods) ----------
log("\n— FORMAT —");
const n = 12345.6789;
log("n.toFixed(2)            =", n.toFixed(2));         // "12345.68"  (round, fixed decimals)
log("n.toExponential(3)      =", n.toExponential(3));   // "1.235e+4"
log("n.toPrecision(6)        =", n.toPrecision(6));     // "12345.7" or "1.23457e+4"
log("n.toString()            =", n.toString());         // "12345.6789"
log("255..toString(16)       =", (255).toString(16));   // "ff" (radix 2..36)
log("10..toString(2)         =", (10).toString(2));     // "1010"
log("(42).valueOf()          =", (42).valueOf());       // 42 (primitive)

// ---------- LOCALE FORMATTING ----------
log("\n— LOCALE —");
log("n.toLocaleString('en-US')           =", n.toLocaleString("en-US"));          // "12,345.679"
log("n.toLocaleString('en-IN')           =", n.toLocaleString("en-IN"));          // "12,345.679" (Indian grouping)
log("(1234.5).toLocaleString('en-US',{style:'currency',currency:'USD'}) =",
    (1234.5).toLocaleString("en-US", { style: "currency", currency: "USD" }));
log("(1234.5).toLocaleString('en-IN',{style:'currency',currency:'INR'}) =",
    (1234.5).toLocaleString("en-IN", { style: "currency", currency: "INR" }));

// ---------- FLOATING-POINT & EPSILON ----------
log("\n— FLOATING-POINT & EPSILON —");
const a = 0.1 + 0.2;           // not exactly 0.3
log("0.1 + 0.2                =", a);                   // 0.30000000000000004
const nearlyEqual = (x, y) => Math.abs(x - y) < Number.EPSILON;
log("nearlyEqual(a, 0.3)      =", nearlyEqual(a, 0.3)); // true

// ---------- SPECIALS: NaN, Infinity, -0 ----------
log("\n— SPECIALS —");
log("0/0                       =", 0/0);                 // NaN
log("1/0                       =", 1/0);                 // Infinity
log("-1/0                      =", -1/0);                // -Infinity
const mz = -0; // negative zero exists in JS
log("Object.is(-0, 0)          =", Object.is(-0, 0));    // false
log("1/(-0)                    =", 1/(-0));              // -Infinity (detect -0)

// ---------- QUICK REFERENCE ----------
/*
Static constants:
  EPSILON, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER,
  MAX_VALUE, MIN_VALUE, NaN, POSITIVE_INFINITY, NEGATIVE_INFINITY

Static methods:
  Number.isNaN, Number.isFinite, Number.isInteger, Number.isSafeInteger,
  Number.parseInt, Number.parseFloat

Instance methods (on numeric values):
  toExponential, toFixed, toPrecision, toString(radix?), toLocaleString, valueOf
*/

// ---------- TIPS ----------
log("\n— TIPS —");
log("Prefer Number.isNaN / Number.isFinite (no coercion) over global isNaN/isFinite.");
log("Avoid new Number(...): it creates an object wrapper; use primitive numbers instead.");



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*******************************************************
 * JavaScript Math — ALL STANDARD METHODS & CONSTANTS
 * One-screen, copy-paste ready cheat-sheet with examples
*******************************************************/

console.clear();
const log = console.log;

// ---------- CONSTANTS ----------
log("Math.E       =", Math.E);        // Euler's number
log("Math.LN2     =", Math.LN2);      // ln(2)
log("Math.LN10    =", Math.LN10);     // ln(10)
log("Math.LOG2E   =", Math.LOG2E);    // log2(e)
log("Math.LOG10E  =", Math.LOG10E);   // log10(e)
log("Math.PI      =", Math.PI);       // π
log("Math.SQRT1_2 =", Math.SQRT1_2);  // √(1/2)
log("Math.SQRT2   =", Math.SQRT2);    // √2

// Small helpers (handy for trig examples & random ints)
const toRad = d => d * (Math.PI / 180);
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ---------- ABSOLUTE VALUE ----------
log("\n— ABS —");
log("Math.abs(-42) =", Math.abs(-42));       // 42
log("Math.abs(3.14) =", Math.abs(3.14));     // 3.14

// ---------- ROOTS, POWERS, EXP ----------
log("\n— ROOTS | POW | EXP —");
log("Math.sqrt(81) =", Math.sqrt(81));       // 9
log("Math.cbrt(27) =", Math.cbrt(27));       // 3
log("Math.pow(2,10) =", Math.pow(2,10));     // 1024 (same as 2 ** 10)
log("Math.exp(1) =", Math.exp(1));           // e ≈ 2.718...
log("Math.expm1(1e-5) =", Math.expm1(1e-5)); // e^x - 1, good for tiny x

// ---------- LOGARITHMS ----------
log("\n— LOGS —");
log("Math.log(Math.E) =", Math.log(Math.E));     // natural log → 1
log("Math.log1p(1e-10) =", Math.log1p(1e-10));   // ln(1 + x), precise for tiny x
log("Math.log10(1000) =", Math.log10(1000));     // 3
log("Math.log2(8) =", Math.log2(8));             // 3

// ---------- ROUNDING FAMILY ----------
log("\n— ROUNDING —");
log("Math.floor(4.9) =", Math.floor(4.9));       // 4  (down)
log("Math.ceil(4.1) =", Math.ceil(4.1));         // 5  (up)
log("Math.round(4.5) =", Math.round(4.5));       // 5  (to nearest; halves to +∞)
log("Math.round(-4.5) =", Math.round(-4.5));     // -4 (half goes to ceil(-4.5) = -4)
log("Math.trunc(4.9) =", Math.trunc(4.9));       // 4  (drop fractional part)
log("Math.trunc(-4.9) =", Math.trunc(-4.9));     // -4
log("Math.fround(1.337) =", Math.fround(1.337)); // 32-bit float rounding

// ---------- MIN / MAX ----------
log("\n— MIN / MAX —");
log("Math.max(1, 10, -5) =", Math.max(1, 10, -5)); // 10
log("Math.min(1, 10, -5) =", Math.min(1, 10, -5)); // -5

// ---------- RANDOM ----------
log("\n— RANDOM —");
const r = Math.random(); // 0 ≤ r < 1
log("Math.random() =", r);
log("randInt(5, 10) =", randInt(5, 10)); // integer [5..10]

// ---------- SIGN ----------
log("\n— SIGN —");
log("Math.sign(-7) =", Math.sign(-7)); // -1
log("Math.sign(0)  =", Math.sign(0));  // 0
log("Math.sign(9)  =", Math.sign(9));  // 1
log("Object.is(Math.sign(-0), -0) =", Object.is(Math.sign(-0), -0)); // true (keeps -0)

// ---------- TRIGONOMETRY (radians) ----------
log("\n— TRIG (radians) —");
log("Math.sin(π/2) =", Math.sin(Math.PI / 2));    // 1
log("Math.cos(π)   =", Math.cos(Math.PI));        // -1
log("Math.tan(π/4) =", Math.tan(Math.PI / 4));    // 1
log("Math.asin(1/2) =", Math.asin(0.5));          // ≈ 0.523... (π/6)
log("Math.acos(1/2) =", Math.acos(0.5));          // ≈ 1.047... (π/3)
log("Math.atan(1)   =", Math.atan(1));            // ≈ 0.785... (π/4)
log("Math.atan2(3, 4) =", Math.atan2(3, 4));      // angle of vector (x=4,y=3) ≈ 0.6435

// Same trig using degrees for convenience
log("\n— TRIG (degrees helper) —");
log("sin(30°) =", Math.sin(toRad(30))); // 0.5
log("cos(180°) =", Math.cos(toRad(180))); // -1
log("tan(45°) =", Math.tan(toRad(45))); // 1

// ---------- HYPERBOLIC ----------
log("\n— HYPERBOLIC —");
log("Math.sinh(1)  =", Math.sinh(1));  // ≈ 1.1752
log("Math.cosh(1)  =", Math.cosh(1));  // ≈ 1.5431
log("Math.tanh(1)  =", Math.tanh(1));  // ≈ 0.7615
log("Math.asinh(1) =", Math.asinh(1)); // ≈ 0.88137
log("Math.acosh(2) =", Math.acosh(2)); // ≈ 1.31696 (domain x ≥ 1)
log("Math.atanh(0.5) =", Math.atanh(0.5)); // ≈ 0.549306 (domain -1<x<1)

// ---------- LENGTH / MAGNITUDE ----------
log("\n— MAGNITUDE —");
log("Math.hypot(3,4) =", Math.hypot(3,4));       // 5 (Euclidean length)
log("Math.hypot(2,3,6) =", Math.hypot(2,3,6));   // √(2²+3²+6²) = 7

// ---------- 32-BIT INT UTILITIES ----------
log("\n— 32-bit INT UTILITIES —");
log("Math.imul(0xffffffff, 5) =", Math.imul(0xffffffff, 5)); // -5 (32-bit wrap)
log("Math.imul(0x7fffffff, 2) =", Math.imul(0x7fffffff, 2)); // -2 (overflow to 32-bit)
log("Math.clz32(0) =", Math.clz32(0));   // 32 (count leading zero bits)
log("Math.clz32(1) =", Math.clz32(1));   // 31
log("Math.clz32(16) =", Math.clz32(16)); // 27 (binary 000...00010000)

// ---------- MISC ----------
log("\n— MISC —");
log("Number.isNaN(Math.acos(2)) =", Number.isNaN(Math.acos(2))); // true (out of domain)
log("Number.isFinite(Math.log(0)) =", Number.isFinite(Math.log(0))); // false (−Infinity)

// Tip: Use ** instead of Math.pow when you like
log("\n— TIP —");
const powA = Math.pow(3, 4);
const powB = 3 ** 4;
log("Math.pow(3,4) === 3 ** 4 →", powA === powB); // true

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////