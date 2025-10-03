// 🔄 ADVANCED JAVASCRIPT CONCEPTS
// 162 - Metaprogramming with Proxy and Reflect.
// 163 - WeakMap and WeakSet for memory-efficient collections.
// 164 - Symbols and well-known symbols for customizing object behavior.
// 165 - Internationalization API (Intl): formatting dates, numbers, currencies.
// 166 - Temporal API (proposal) for advanced date/time management.
// 167 - BigInt Type: handling arbitrarily large integers.
// 168 - Decorators (stage-2/3 proposal) and usage with Babel or TypeScript.

// 👨‍💻 DEEP DIVE INTO ENGINE & STANDARDS
// 169 - ECMAScript Specification: understanding TC39 process, stages of proposals.
// 170 - JavaScript Engines: V8, SpiderMonkey, JavaScriptCore – how JIT compilation works.
// 171 - Garbage Collection: generational GC, mark-and-sweep, performance considerations.
// 172 - Strict Mode: "use strict", differences from non-strict mode.
// 173 - Modules vs CommonJS vs AMD vs UMD – module loading patterns and compatibility.

// 🛠 TOOLING & DEVELOPER EXPERIENCE
// 174 - Editor/IDE Setup: VSCode extensions for JavaScript (ESLint, Prettier, GitLens).
// 175 - Linting and Formatting: ESLint configuration (eslint:recommended, plugin:node), Prettier integration.
// 176 - Type Checking in JS with JSDoc: writing JSDoc comments for type hints, using VSCode intellisense.
// 177 - Source Control: Git workflows, branching strategies (Git Flow, GitHub Flow).

// 📊 PERFORMANCE & MONITORING
// 178 - Measuring Performance: using Chrome DevTools Performance tab, Lighthouse audits.
// 179 - Web Vitals: understanding CLS, LCP, FID, FCP, TTFB metrics.
// 180 - Memory Profiling: detecting memory leaks with DevTools memory snapshot.
// 181 - Runtime Performance Tuning: optimizing loops, using web workers for heavy tasks.
// 182 - Logging and Monitoring: integrating Sentry or LogRocket for runtime error tracking.

// 🔍 SECURITY & BEST PRACTICES
// 183 - Content Security Policy (CSP) Header configuration in web servers.
// 184 - Cross-Origin Resource Sharing (CORS) basics and handling in frontend requests.
// 185 - Secure handling of API tokens: OAuth flows, storing tokens securely.
// 186 - Avoiding eval() and new Function(): safer alternatives.
// 187 - Dependency Auditing: using npm audit, yarn audit, Snyk for vulnerability scanning.

// 🌐 NEXT-LEVEL JAVASCRIPT (ECOSYSTEM & TRENDS)
// 188 - WebAssembly (Wasm) integration: loading .wasm modules, interop with JS.
// 189 - Node.js Server-Side JavaScript: creating HTTP servers, Express.js basics.
// 190 - Deno: modern runtime for TypeScript/JavaScript with built-in security.
// 191 - JavaScript in IoT & Embedded Systems: Espruino, Johnny-Five for robotics.
// 192 - JAMstack Evolution: Astro, Eleventy, and the rise of frameworks like SvelteKit, Next.js.

// 🎯 SPECIALIZED TOPICS & PATTERNS
// 193 - Functional Reactive Programming: RxJS basics, Observables, Subjects.
// 194 - Finite State Machines in JS: XState overview and integration.
// 195 - Design Patterns in JavaScript: Singleton, Factory, Observer, Mediator, Command.
// 196 - API Rate Limiting and Throttling Strategies (debounce, throttle, leaky bucket).

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
162 - Metaprogramming with Proxy and Reflect

This note explains:
1. Proxy – intercepting fundamental operations (get, set, has, deleteProperty, apply, construct).
2. Reflect – invoking default behavior for object operations.
3. Using Proxy for validation and logging.
4. Revocable Proxy example.
5. Best-practice guidelines.
*/

// 1. Basic Proxy intercepting get and set
const user = { name: 'Ajay', age: 30 };
const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`Getting property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Setting "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value, receiver);
  }
});

console.log(userProxy.name);   // logs "Getting property 'name'", then "Ajay"
userProxy.age = 31;            // logs "Setting 'age' to '31'"

// 2. Proxy with validation using Reflect
const person = { name: '', age: 0 };
const validatedPerson = new Proxy(person, {
  set(target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('Age must be a non-negative number');
    }
    return Reflect.set(target, prop, value);
  }
});

validatedPerson.name = 'Riya';
try {
  validatedPerson.age = -5;    // throws TypeError
} catch (e) {
  console.error(e.message);    // "Age must be a non-negative number"
}

// 3. has and deleteProperty traps
const config = { apiKey: 'secret' };
const configProxy = new Proxy(config, {
  has(target, prop) {
    console.log(`Checking if "${prop}" exists`);
    return Reflect.has(target, prop);
  },
  deleteProperty(target, prop) {
    console.log(`Deleting property "${prop}"`);
    return Reflect.deleteProperty(target, prop);
  }
});

console.log('apiKey' in configProxy); // logs check, then true
delete configProxy.apiKey;             // logs deletion

// 4. Revocable Proxy
const revocable = Proxy.revocable({ data: 123 }, {
  get(target, prop) { return Reflect.get(target, prop); }
});
console.log(revocable.proxy.data); // 123
revocable.revoke();
try {
  console.log(revocable.proxy.data); // TypeError: Cannot perform 'get' on a proxy that has been revoked
} catch (e) {
  console.error('Proxy revoked:', e.message);
}

// 5. Best Practices
/*
- Use Reflect inside handler traps to delegate to default behavior.
- Avoid overusing Proxy for simple tasks—keep code maintainable.
- Clearly document traps to avoid surprising behaviors.
- Revoke proxies when no longer needed to free resources.
- Use Proxy for validation, logging, and creating observable objects, but not for everything.
*/


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
163 - WeakMap and WeakSet for Memory-Efficient Collections

This note explains:
1. WeakMap – a key/value store where keys are objects and entries are garbage-collected when keys become unreachable.
2. WeakSet – a collection of objects that does not prevent garbage collection of its items.
3. Use cases: caching metadata, tracking element state without memory leaks.
4. Limitations: no enumeration, no size property, keys/items must be objects.
5. Best-practice guidelines.
*/

// 1. WeakMap Example: metadata cache
const metaCache = new WeakMap();

function annotate(obj, metadata) {
  metaCache.set(obj, metadata);
}
function getMetadata(obj) {
  return metaCache.get(obj);
}

let user = { name: 'Alice' };
annotate(user, { lastAccess: Date.now() });
console.log('User metadata:', getMetadata(user)); // { lastAccess: 163... }

// Later, when `user` is set to null, the entry can be GCed:
user = null; 
// metaCache no longer holds the object, so its metadata entry is eligible for garbage collection.

// 2. WeakSet Example: tracking visited nodes
const visited = new WeakSet();

function visit(node) {
  if (visited.has(node)) {
    console.log('Already visited:', node.id);
    return;
  }
  visited.add(node);
  console.log('Visiting node:', node.id);
  // ... traverse children ...
}

let nodeA = { id: 'A' }, nodeB = { id: 'B' };
visit(nodeA); // Visiting node: A
visit(nodeA); // Already visited: A
visit(nodeB); // Visiting node: B

// After dropping references, entries vanish:
nodeA = null; 
nodeB = null;
// visited no longer holds them, so memory can be reclaimed.

// 3. Use Case: Expensive computation cache
const computeCache = new WeakMap();
function expensiveCompute(obj) {
  // simulate heavy work
  return { result: Math.random() * 1000 };
}
function compute(obj) {
  if (!computeCache.has(obj)) {
    computeCache.set(obj, expensiveCompute(obj));
  }
  return computeCache.get(obj);
}

let item = { key: 1 };
console.log('Compute first:', compute(item));
console.log('Compute second (cached):', compute(item));
item = null;
// cache entry removed when `item` is GCed

// 4. Limitations of Weak Collections
// • Cannot iterate or check size:
//   metaCache.forEach?  → undefined
//   metaCache.size     → undefined
// • Only object keys/items allowed (no primitives).

/*
Best Practices:
- Use WeakMap to attach metadata to objects without preventing GC of unused objects.
- Use WeakSet to track object-based flags (e.g., “visited”) without memory leaks.
- Do not rely on enumeration or size; store references elsewhere if needed to list entries.
- Avoid using Weak collections for critical data you must inspect—use Map/Set instead.
- Remember that garbage collection timing is non-deterministic; WeakMap/WeakSet clean-up is automatic.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
164 - Symbols and Well-Known Symbols for Customizing Object Behavior

This note explains:
1. Symbols – creation and use as unique property keys.
2. Well-known symbols: Symbol.iterator, Symbol.toStringTag, Symbol.hasInstance, Symbol.toPrimitive, Symbol.asyncIterator.
3. Customizing object behavior via these symbols.
4. Examples: custom iteration, toStringTag, instanceof, primitive conversion, async iteration.
5. Best-practice guidelines.
*/

// 1. Symbols as Unique Keys
const symA = Symbol('key');
const symB = Symbol('key');
console.log('symA === symB →', symA === symB); // false

const obj = {};
obj[symA] = 'valueA';
obj[symB] = 'valueB';
console.log('obj[symA]:', obj[symA]);           // valueA
console.log('obj[symB]:', obj[symB]);           // valueB

// 2. Custom Iterator with Symbol.iterator
const iterable = {
  *[Symbol.iterator]() {
    yield 'first';
    yield 'second';
    yield 'third';
  }
};
console.log('\nIterating iterable:');
for (const v of iterable) {
  console.log(v);
}
// first
// second
// third

// 3. Custom toStringTag via Symbol.toStringTag
class MyCollection {
  get [Symbol.toStringTag]() {
    return 'MyCollection';
  }
}
const coll = new MyCollection();
console.log('\nObject.prototype.toString.call(coll):', Object.prototype.toString.call(coll));
// [object MyCollection]

// 4. Custom instanceof with Symbol.hasInstance
class EvenNumber {
  static [Symbol.hasInstance](value) {
    return Number.isInteger(value) && value % 2 === 0;
  }
}
console.log('\n2 instanceof EvenNumber →', 2 instanceof EvenNumber); // true
console.log('3 instanceof EvenNumber →', 3 instanceof EvenNumber);   // false

// 5. Controlling Primitive Conversion with Symbol.toPrimitive
const special = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 100;
    if (hint === 'string') return 'one hundred';
    return 'default';
  }
};
console.log('\n+special (number hint):', +special);          // 100
console.log('`${special}` (string hint):', `${special}`);    // one hundred
console.log('special + "" (default hint):', special + '');   // default

// 6. Async Iteration with Symbol.asyncIterator
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield 'A';
    yield 'B';
  }
};
(async () => {
  console.log('\nAsync iterating:');
  for await (const x of asyncIterable) {
    console.log(x);
  }
})();
// A
// B

/*
Best Practices:
- Use Symbols for private or library-specific object keys to avoid collisions.
- Implement Symbol.iterator to make objects iterable in for…of loops.
- Use Symbol.toStringTag to give objects custom tags in Object.prototype.toString.
- Override Symbol.hasInstance for custom instanceof behaviors sparingly.
- Define Symbol.toPrimitive to control how objects convert to primitives.
- Use Symbol.asyncIterator for objects producing async streams.
- Avoid overusing metaprogramming—ensure code remains maintainable and predictable.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
165 - Internationalization API (Intl): Formatting Dates, Numbers, Currencies

This note explains:
1. Intl.DateTimeFormat – formatting dates and times for different locales.
2. Intl.NumberFormat – formatting numbers, percentages, and currencies.
3. Locale and options usage for custom formats.
4. Time zone and style options.
5. Best-practice guidelines.
*/

// 1. Date and Time Formatting
const date = new Date('2025-06-12T15:30:00Z');

// Default locale format
console.log('Default date:', new Intl.DateTimeFormat().format(date));

// US English, full date and time
const dtfUS = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'America/New_York'
});
console.log('US full date/time:', dtfUS.format(date));

// German locale, short date
const dtfDE = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'short'
});
console.log('DE short date:', dtfDE.format(date));

// Japanese locale, numeric components
const dtfJP = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false, timeZone: 'Asia/Tokyo'
});
console.log('JP numeric date/time:', dtfJP.format(date));

// 2. Number Formatting
const number = 1234567.89;

// Default locale number
console.log('Default number:', new Intl.NumberFormat().format(number));

// Indian numbering system (lakh/crore)
const nfIN = new Intl.NumberFormat('en-IN');
console.log('IN number format:', nfIN.format(number)); // "12,34,567.89"

// Percentage formatting
const pct = 0.1234;
const nfPct = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });
console.log('Percent:', nfPct.format(pct)); // "12.3%"

// 3. Currency Formatting
const amount = 99.95;

// USD
const nfUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
console.log('USD:', nfUSD.format(amount)); // "$99.95"

// EUR in German locale
const nfEUR = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log('EUR:', nfEUR.format(amount)); // "99,95 €"

// JPY (no minor units)
const nfJPY = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log('JPY:', nfJPY.format(amount)); // "￥100"

// 4. Custom Options: significant digits
const nfSig = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3
});
console.log('Significant digits (3):', nfSig.format(number)); // e.g. "1,230,000"

// 5. Time Zone Independent Formatting
const dtfUTC = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC'
});
console.log('UTC date/time:', dtfUTC.format(date));

// 6. Best Practices:
/*
- Always specify a locale or default will use the user’s environment.
- Use dateStyle/timeStyle for concise presets; use individual options for fine control.
- For currency, specify both style: 'currency' and currency code to avoid fallback.
- Avoid manual string concatenation; rely on Intl for correct separators and symbols.
- Be mindful of performance: reuse Intl.DateTimeFormat/Intl.NumberFormat instances when formatting many values.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
166 - Temporal API (proposal) for Advanced Date/Time Management

This note explains:
1. Creating and manipulating PlainDate, PlainTime, PlainDateTime, ZonedDateTime.
2. Converting between Temporal objects and legacy JS Date.
3. Handling time zones and offsets.
4. Working with durations and intervals.
5. Best-practice guidelines.
*/

// 1. Import the polyfill (install with `npm install @js-temporal/polyfill`)
import { Temporal } from '@js-temporal/polyfill';

// 2. PlainDate and PlainTime
const date = Temporal.PlainDate.from('2025-06-12');
const time = Temporal.PlainTime.from('15:30:00');
console.log('PlainDate:', date.toString());       // 2025-06-12
console.log('PlainTime:', time.toString());       // 15:30:00

// 3. PlainDateTime and ZonedDateTime
const dt = Temporal.PlainDateTime.from({ year:2025, month:6, day:12, hour:15, minute:30 });
console.log('PlainDateTime:', dt.toString());     // 2025-06-12T15:30:00

const zdt = Temporal.ZonedDateTime.from('2025-06-12T15:30:00+05:30[Asia/Kolkata]');
console.log('ZonedDateTime:', zdt.toString());    // 2025-06-12T15:30:00+05:30[Asia/Kolkata]

// 4. Converting to legacy Date and back
const instant = zdt.toInstant();                  // Temporal.Instant
const jsDate = instant.toDate();
console.log('JS Date:', jsDate.toISOString());    // 2025-06-12T10:00:00.000Z

const backToZdt = Temporal.ZonedDateTime.from(jsDate.toISOString() + '[Asia/Kolkata]');
console.log('Back to ZonedDateTime:', backToZdt.toString());

// 5. Durations and Intervals
const dur = Temporal.Duration.from({ days: 1, hours: 2, minutes: 30 });
const dtPlus = dt.plus(dur);
console.log('Add Duration:', dtPlus.toString());  // 2025-06-13T18:00:00

const interval = Temporal.Interval.fromDateTimes(date.startOf('day'), date.endOf('day'));
console.log('Interval:', interval.toString());    // 2025-06-12T00:00:00/2025-06-12T23:59:59.999999999

// 6. Handling Time Zone Arithmetic
const tomorrowInZone = zdt.plus({ days: 1 });
console.log('Tomorrow same time in zone:', tomorrowInZone.toString());

// 7. Best Practices:
/*
- Prefer Temporal over Date for clarity and immutability.
- Use PlainDate/PlainTime for date-only or time-only data.
- Use ZonedDateTime for time-zone–aware timestamps and conversions.
- Convert to Temporal.Instant for UTC-based storage or comparisons.
- Use Duration and Interval for precise arithmetic without intermediate Date bugs.
- Always install the official polyfill for cross-environment support.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
167 - BigInt Type: Handling Arbitrarily Large Integers

This note explains:
1. Creating BigInt values with `n` suffix and `BigInt()` constructor.
2. Performing arithmetic and bitwise operations with BigInt.
3. Converting BigInt to/from strings and different bases.
4. JSON serialization limitations and workarounds.
5. Common pitfalls: mixing BigInt with Number.
*/

// 1. Creating BigInt values
const literalBig = 1234567890123456789012345678901234567890n;  // literal with `n`
const fromString = BigInt("987654321098765432109876543210");  // constructor
console.log('literalBig:', literalBig);
console.log('fromString:', fromString);

// 2. Arithmetic operations
const a = 100000000000000000000n;
const b = 200000000000000000000n;
console.log('a + b =', a + b);
console.log('b - a =', b - a);
console.log('a * 2 =', a * 2n);
console.log('b / a =', b / a);          // integer division
console.log('b % a =', b % a);

// Bitwise operations (BigInt-only)
const mask = 0b1111n;
console.log('a & mask =', a & mask);
console.log('a | mask =', a | mask);
console.log('a ^ mask =', a ^ mask);
console.log('~mask =', ~mask);

// 3. Converting BigInt to/from strings
const hexBig = BigInt('0x' + 'f'.repeat(20));  // hex literal
console.log('hexBig.toString(16):', hexBig.toString(16));
console.log('decimalString → BigInt:', BigInt(hexBig.toString(10)));

// 4. JSON serialization limitations
const obj = { value: 12345678901234567890n };
// JSON.stringify(obj) → TypeError: Do not know how to serialize a BigInt
// Workaround: convert to string manually
const safeJson = JSON.stringify({ value: obj.value.toString() });
console.log('Serialized BigInt as string:', safeJson);
// Parsing back:
const parsed = JSON.parse(safeJson);
parsed.value = BigInt(parsed.value);
console.log('Restored BigInt:', parsed.value);

// 5. Pitfalls: mixing BigInt and Number
try {
  // @ts-ignore
  console.log('a + 1 (Number) =', a + 1); // TypeError
} catch (e) {
  console.error('Mixing BigInt and Number error:', e.message);
}
// Correct mixing via explicit conversion:
console.log('a + Number(1n) =', a + BigInt(1));

// 6. Example: compute factorial of 20 using BigInt
function factorial(n) {
  let f = 1n;
  for (let i = 2n; i <= n; i++) {
    f *= i;
  }
  return f;
}
console.log('20! =', factorial(20n)); // 2432902008176640000n

/*
Best Practices:
- Use `n` suffix for literals and `BigInt()` for dynamic values.
- Avoid mixing Number and BigInt; convert explicitly.
- Serialize BigInt as strings for JSON interchange.
- Remember BigInt operations are slower than Number—use only when needed.
- Beware of performance and memory when handling extremely large values.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
168 - Decorators (stage-2/3 proposal) and Usage with Babel or TypeScript

This note explains:
1. Decorators concept: annotating/modifying classes, methods, properties, parameters.
2. Enabling decorators in Babel (.babelrc) and plugin ordering.
3. Enabling decorators in TypeScript (tsconfig.json).
4. Examples: class, method, property, and parameter decorators.
5. Best-practice guidelines.
*/

// Babel Configuration (.babelrc)
/*
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
*/

// TypeScript Configuration (tsconfig.json)
/*
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    // ...other options...
  }
}
*/

// Polyfill for Reflect.metadata (TypeScript)
// import 'reflect-metadata';

// 1. Class decorator: seal class and its prototype
function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// 2. Property decorator: make property read-only
function readonly(target, propertyKey, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

// 3. Method decorator: log method calls and arguments
function logMethod(target, propertyKey, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = original.apply(this, args);
    console.log(`${propertyKey} returned`, result);
    return result;
  };
  return descriptor;
}

// 4. Parameter decorator: record metadata for parameters
function logParam(target, propertyKey, parameterIndex) {
  const existing: number[] = Reflect.getOwnMetadata('log_params', target, propertyKey) || [];
  existing.push(parameterIndex);
  Reflect.defineMetadata('log_params', existing, target, propertyKey);
}

// Applying decorators
@sealed
class Person {
  @readonly
  static species = 'Homo sapiens';

  constructor(public name: string) {}

  @logMethod
  greet(@logParam message: string): string {
    return `${this.name} says: ${message}`;
  }
}

// Usage example
const p = new Person('Alice');
p.greet('Hello, Decorators!');
// p.species = 'Alien'; // fails: property is read-only

/*
Best Practices:
- Always enable and configure decorators before use in Babel/TypeScript.
- Use decorators to encapsulate cross-cutting concerns (e.g., logging, validation).
- Keep decorator logic pure and side-effect–free.
- Understand evaluation order: 
    • Parameter decorators run first (outermost),
    • then method, property, and finally class decorators.
- When using metadata (@emitDecoratorMetadata), import 'reflect-metadata'.
- Avoid overusing decorators to keep code readable and maintainable.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
169 - ECMAScript Specification: Understanding TC39 Process, Stages of Proposals

This note explains:
1. The role of TC39 in evolving JavaScript standards.
2. Proposal stages:
   • Stage 0 (Strawperson): initial idea, seeking a champion.
   • Stage 1 (Proposal): formal presentation, motivation, examples.
   • Stage 2 (Draft): specification text draft, gathered feedback.
   • Stage 3 (Candidate): spec complete, tests written (Test262), ready for feedback.
   • Stage 4 (Finished): approved, shipped in the next ECMAScript edition.
3. How to follow proposals on the official TC39 GitHub (https://github.com/tc39).
4. The annual ECMAScript release cycle and edition numbers.
5. How to participate: writing issues, attending meetings, contributing tests.
*/

// Listing TC39 stages with descriptions
const tc39Stages = [
  { stage: 0, name: 'Strawperson',   description: 'Idea stage: gather interest and a champion.' },
  { stage: 1, name: 'Proposal',      description: 'Formal proposal: motivation, examples, and initial spec text.' },
  { stage: 2, name: 'Draft',         description: 'Draft spec: detailed text, feedback integration.' },
  { stage: 3, name: 'Candidate',     description: 'Feature-complete: tests written, feedback from implementers.' },
  { stage: 4, name: 'Finished',      description: 'Approved: ready for inclusion in official ECMAScript spec.' }
];

// Display the stages in a table for quick reference
console.table(tc39Stages);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
170 - JavaScript Engines: V8, SpiderMonkey, JavaScriptCore – how JIT compilation works

This note explains:
1. Engine components: parser, interpreter, baseline and optimizing compilers, garbage collector.
2. Multi‐tier JIT pipeline: parse → bytecode → profiling → machine code → deoptimization.
3. V8 pipeline: Ignition interpreter + Turbofan optimizing compiler.
4. SpiderMonkey pipeline: Odin interpreter + Warp/JägerMonkey optimizing compiler.
5. JavaScriptCore pipeline: LLInt/Staccato interpreter + DFG and FTL JITs.
6. Demonstration of warm-up and optimization triggers in V8.
*/

// 1. Hot function for JIT warm-up
function hotCalc(n) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.sqrt(i);
  }
  return total;
}

// Warm up the function to generate type feedback
for (let i = 0; i < 10000; i++) {
  hotCalc(100);
}

// 2. Measure performance (likely optimized after warm-up)
console.time('hotCalc 1M');
hotCalc(1_000_000);
console.timeEnd('hotCalc 1M');

// 3. V8 Internal Hooks (Node.js must be started with --allow-natives-syntax)
/*
%OptimizeFunctionOnNextCall(hotCalc);      // schedule optimization
hotCalc(100);                              // run to trigger compiler
console.log(%GetOptimizationStatus(hotCalc)); // inspect optimized status
*/

// 4. High-Level JIT Pipeline (V8 example)
/*
Source Code
  ↓
Parser → Abstract Syntax Tree (AST)
  ↓
Ignition → Bytecode Interpreter executes and profiles
  ↓
Turbofan → Optimizing Compiler emits machine code for hot paths
  ↓
Runtime uses optimized code; falls back to bytecode on deopt events
*/

// 5. Best Practices for JIT-Friendly Code
/*
- Keep objects monomorphic: avoid changing property shapes on the fly.
- Use consistent types for function parameters to aid type feedback.
- Extract hot loops into small functions to improve inlining.
- Avoid eval() and with statements—they inhibit optimization.
- Minimize use of dynamic property lookups and prototype chain mutations.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
171 - Garbage Collection: Generational GC, Mark-and-Sweep, Performance Considerations

This note explains:
1. Generational GC – dividing heaps into young and old generations for frequent minor collections.
2. Mark-and-Sweep – how live objects are marked and unreachable ones swept.
3. Using FinalizationRegistry to observe when objects are collected.
4. Simulating memory pressure and triggering GC (Node.js with --expose-gc).
5. Best-practice guidelines to reduce GC overhead.
*/

// 1. Demonstrating FinalizationRegistry to observe GC of objects
const registry = new FinalizationRegistry(token => {
  console.log(`🔔 Object with token "${token}" was garbage collected`);
});

(function createTempObject() {
  let temp = { data: 'ephemeral' };
  // Register object with a cleanup callback token
  registry.register(temp, 'tempObject');
  temp = null; // drop reference so it's eligible for GC
})();

// 2. Simulate memory pressure to encourage collection
const bigArray = [];
for (let i = 0; i < 1e5; i++) {
  // allocate many small objects in young generation
  bigArray.push({ idx: i, payload: new Array(100).fill(i) });
}
console.log(`Allocated bigArray of ${bigArray.length} elements`);

// In Node.js (run with `--expose-gc`), you can force a GC cycle:
// if (global.gc) global.gc();

// 3. Explanation of generational GC flow (commented):
/*
  • New objects are allocated in the "Young" heap (nursery).
  • Minor GC runs frequently on Young heap, collecting short-lived objects.
  • Surviving objects are promoted to the "Old" generation.
  • Major GC (full heap) uses Mark-and-Sweep:
      – Mark phase: traverse roots (globals, stack, registers), flag reachable objects.
      – Sweep phase: reclaim memory of unmarked (unreachable) objects.
  • Tuning: minimize promotions by keeping most allocations short-lived.
*/

// 4. Best Practices to Mitigate GC Impact:
/*
- Reuse objects and arrays (object pools) to avoid churn in Young generation.
- Avoid large synchronous allocations in hot code paths.
- Break up big allocations into smaller chunks to spread GC work.
- In long-running Node.js apps, monitor heap usage and GC pause times.
- Use streams or generators to process big data without retaining entire data in memory.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
172 - Strict Mode: "use strict", Differences from Non‐Strict Mode

This note explains:
1. How to enable strict mode.
2. Silent errors that become thrown errors.
3. Changes to `this` binding in functions.
4. Disallowed syntax and behaviors.
5. Effects on `eval()` and variable declarations.
*/

// Enable strict mode for the entire script
'use strict';

// 1. Assignment to undeclared variables throws ReferenceError
try {
  undeclaredVar = 10;         // Was implicit global in non-strict
} catch (e) {
  console.error('Error 1:', e); // ReferenceError: undeclaredVar is not defined
}

// 2. Assigning to non-writable properties throws TypeError
const obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
try {
  obj.x = 9;                  // Silent failure in non-strict
} catch (e) {
  console.error('Error 2:', e); // TypeError: Cannot assign to read only property 'x'
}

// 3. `this` is undefined in regular functions (rather than global object)
function showThis() {
  console.log('this is', this);
}
showThis();                   // undefined in strict mode

// 4. `delete` of unqualified identifier is a SyntaxError
try {
  // delete Object;          // Uncommenting this line causes SyntaxError in strict
} catch (e) {
  console.error('Error 4:', e);
}

// 5. `eval()` does not introduce variables into surrounding scope
eval("var local = 'inside eval';");
console.log('local after eval:', typeof local); // "undefined"

// 6. Disallowed duplicate parameter names (SyntaxError in strict, allowed otherwise)
// function duplicate(a, a) {}  // Uncommenting this line causes SyntaxError in strict mode

// 7. Octal literals are disallowed
try {
  // const oct = 071;        // SyntaxError in strict
} catch (e) {
  console.error('Error 7:', e);
}

/*
Best Practices:
- Always start modules/scripts with "use strict" to catch errors early.
- Avoid relying on implicit globals; declare all variables with let/const/var.
- Design functions assuming `this` may be undefined.
- Use modern syntax (e.g., delete obj.prop) instead of deleting identifiers.
- Keep code free of deprecated features (octal literals, duplicate params).
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
173 - Modules vs CommonJS vs AMD vs UMD – Module Loading Patterns and Compatibility

This note explains:
1. ES Modules (import/export) – standardized, static, supports tree-shaking.
2. CommonJS (require/module.exports) – synchronous, Node.js native.
3. AMD (Asynchronous Module Definition) – asynchronous, browser-oriented (RequireJS).
4. UMD (Universal Module Definition) – wrapper supporting AMD, CommonJS, and global.
5. Compatibility considerations and how bundlers bridge formats.
*/

// 1. ES Modules (Browsers & Node with .mjs or "type":"module")
// File: esModule.js
export function esmGreet(name) {
  return `Hello from ESM, ${name}!`;
}
// Usage in main.mjs
import { esmGreet } from './esModule.js';
console.log(esmGreet('Alice')); // → Hello from ESM, Alice!

// 2. CommonJS (Node.js)
// File: commonjsModule.js
module.exports.greet = function(name) {
  return `Hello from CommonJS, ${name}!`;
};
// Usage in Node.js
const cjs = require('./commonjsModule.js');
console.log(cjs.greet('Bob'));  // → Hello from CommonJS, Bob!

// 3. AMD (Browser via RequireJS)
// Define a module
define('amdModule', [], function() {
  return {
    greet(name) {
      return `Hello from AMD, ${name}!`;
    }
  };
});
// Load and use it
require(['amdModule'], function(amd) {
  console.log(amd.greet('Carol')); // → Hello from AMD, Carol!
});

// 4. UMD (Universal Module Definition)
// File: umdModule.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.umdModule = factory();
  }
}(this, function () {
  return {
    greet(name) {
      return `Hello from UMD, ${name}!`;
    }
  };
}));
// Usage in different environments
let umd;
if (typeof require === 'function') {
  umd = require('./umdModule.js');
} else {
  umd = window.umdModule;
}
console.log(umd.greet('Dave'));   // → Hello from UMD, Dave!

/*
5. Compatibility Considerations
- ES Modules enable static analysis and tree-shaking; use in modern environments.
- CommonJS is ubiquitous in Node.js; bundlers convert it for browser use.
- AMD loads modules asynchronously in the browser; less common with modern bundlers.
- UMD ensures a single bundle works in AMD, CommonJS, or as a global.
- Tools like Webpack/Rollup/Vite automatically translate between formats as needed.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
174 - Editor/IDE Setup: VSCode Extensions for JavaScript (ESLint, Prettier, GitLens)

This note explains:
1. Installing essential extensions: ESLint, Prettier – Code formatter, GitLens – Git supercharged.
2. Key VSCode settings for seamless linting, formatting, and Git insights.
3. Workspace vs User settings.
4. Example settings.json snippets.
5. Best-practice guidelines.
*/

// 1. Recommended Extensions (install via VSCode Marketplace)
// • ESLint (dbaeumer.vscode-eslint)         – linting and auto-fix on save
// • Prettier – Code formatter (esbenp.prettier-vscode) – opinionated formatter
// • GitLens — Git supercharged (eamodio.gitlens)       – blame, history, code authorship

// 2. VSCode Settings (settings.json)
{
  // Enable ESLint linting in JavaScript files
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "eslint.alwaysShowStatus": true,

  // Format on save with Prettier and ESLint fixes
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // Use Prettier as default formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Optional: customize formatting for JS only
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },

  // GitLens settings for inline blame and hovers
  "gitlens.currentLine.enabled": true,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.codeLens.recentChange.enabled": true
}

// 3. Workspace vs User Settings
// • User settings (applies to all projects): place in global settings.json.
// • Workspace settings (project-specific): place in .vscode/settings.json within your repo.

// 4. Example .vscode/settings.json for a Project
{
  // Project-specific ESLint rules override
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  // Disable format on save for Markdown to avoid conflicts
  "[markdown]": {
    "editor.formatOnSave": false
  },
  // Enable GitLens code lens only in this workspace
  "gitlens.codeLens.enabled": true
}

// 5. Best Practices:
/*
- Install extensions recommended by your team and include a .vscode/extensions.json 
  so new contributors get prompted to install them.
- Use "editor.codeActionsOnSave" to run both Prettier and ESLint auto-fixes.
- Keep settings consistent across the team via workspace settings under version control.
- Explore GitLens hovers, blame annotations, and customizable keybindings for faster Git workflows.
- Regularly update VSCode and extensions to benefit from the latest features and fixes.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
175 - Linting and Formatting: ESLint configuration (eslint:recommended, plugin:node), Prettier integration

This note explains:
1. Installing ESLint, Prettier, and necessary plugins.
2. Configuring .eslintrc.js to extend eslint:recommended and plugin:node.
3. Integrating Prettier via eslint-plugin-prettier and eslint-config-prettier.
4. Defining .prettierrc formatting rules.
5. Adding npm scripts for linting and formatting.
6. Best-practice tips.
*/

// 1. Install dependencies (run in terminal)
// npm install --save-dev eslint eslint-plugin-node prettier eslint-plugin-prettier eslint-config-prettier

// 2. .eslintrc.js configuration
module.exports = {
  env: {
    browser: true,    // enable browser globals
    node: true,       // enable Node.js globals
    es2021: true      // enable modern ECMAScript features
  },
  extends: [
    'eslint:recommended',       // core ESLint recommended rules
    'plugin:node/recommended',  // Node.js specific linting rules
    'plugin:prettier/recommended' // run Prettier as an ESLint rule
  ],
  parserOptions: {
    ecmaVersion: 12,   // support ES2021 syntax
    sourceType: 'module'
  },
  plugins: [
    'node',            // Node.js plugin
    'prettier'         // Prettier plugin to report formatting issues
  ],
  rules: {
    'prettier/prettier': 'error', // show Prettier errors as ESLint errors
    // custom ESLint rules can go here, e.g.:
    // 'node/no-unsupported-features/es-syntax': 'off'
  }
};

// 3. .prettierrc formatting rules
/*
{
  "printWidth": 80,         // wrap lines at 80 characters
  "tabWidth": 2,            // use 2 spaces per indent
  "singleQuote": true,      // use single quotes instead of double
  "trailingComma": "es5",   // add trailing commas where valid in ES5
  "semi": true,             // add semicolons at ends of statements
  "arrowParens": "always"   // always include parens for arrow fn params
}
*/

// 4. package.json scripts
/*
{
  "scripts": {
    "lint":      "eslint 'src/**/*.js'",           // run lint checks
    "lint:fix":  "eslint 'src/**/*.js' --fix",     // fix fixable lint errors
    "format":    "prettier --write 'src/**/*.js'"  // apply Prettier formatting
  }
}
*/

// 5. Best Practices
/*
- Commit .eslintrc.js and .prettierrc to version control for consistent styling.
- Use Husky or lint-staged to run lint/format on pre-commit for clean code.
- Enable "eslint.autoFixOnSave" and "editor.formatOnSave" in your editor settings.
- Run `npm run lint` and `npm run format` in CI to enforce quality gates.
- Keep ESLint and Prettier configurations in sync via eslint-config-prettier.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
176 - Type Checking in JS with JSDoc: Writing JSDoc Comments for Type Hints, Using VSCode IntelliSense

This note explains:
1. Enabling type checking in JavaScript files.
2. Basic JSDoc annotations: @param, @returns.
3. Defining custom types with @typedef.
4. Annotating variables with @type.
5. Configuring VSCode via jsconfig.json and settings.
*/

// 1. Enable TS-based type checking at the top of your JS file
// @ts-check

// 2. JSDoc for function parameters and return types
/**
 * Adds two numbers together.
 * @param {number} a - The first addend
 * @param {number} b - The second addend
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}
const sum = add(2, 3);  // VSCode will warn if you pass non-numbers

// 3. Defining a complex object type with @typedef
/**
 * @typedef {Object} User
 * @property {number} id        - Unique identifier
 * @property {string} name      - Full name
 * @property {boolean} [active] - Optional active status
 */

/**
 * Greets a user by name.
 * @param {User} user - The user to greet
 * @returns {string} A greeting message
 */
function greet(user) {
  return `Hello, ${user.name}!`;
}
const message = greet({ id: 1, name: 'Ajay', active: true });

// 4. Annotating variables with @type
/** @type {number[]} */
const scores = [10, 20, 30];
/** @type {User} */
const currentUser = { id: 2, name: 'Riya' };

// 5. VSCode configuration (jsconfig.json)
/*
{
  "compilerOptions": {
    "checkJs": true,     // enable type checking in .js files
    "noEmit": true       // do not output any files
  },
  "include": ["src/**/*"] // your JS source files
}
*/

// 6. VSCode settings to automatically check JS (settings.json)
/*
{
  "javascript.implicitProjectConfig.checkJs": true,
  "js/ts.implicitProjectConfig.checkJs": true
}
*/

/*
Best Practices:
- Always include `// @ts-check` at the top of JS files you want checked.
- Use `@param` and `@returns` for simple functions.
- Use `@typedef` to define shapes of objects and reuse them.
- Annotate complex variables with `@type` for immediate IntelliSense.
- Configure jsconfig.json and VSCode settings once per project for uniform behavior.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
177 - Source Control: Git Workflows, Branching Strategies (Git Flow, GitHub Flow)

This note explains:
1. Git Flow – a structured workflow with long-lived develop and master branches plus feature, release, and hotfix branches.
2. GitHub Flow – a simpler model using main (or master) and short-lived feature branches with pull requests.
3. Key differences and when to choose each.
4. Example commands for creating and merging branches.
5. Best-practice guidelines.
*/

// 1. Git Flow Overview
// • master: always reflects production-ready state.
// • develop: integration branch for features.
// • feature/*: branched from develop, merged back into develop.
// • release/*: branched from develop when preparing a release, merged into master and develop.
// • hotfix/*: branched from master to fix production bugs, merged into master and develop.

// Initialize Git Flow (with git-flow extension)
// $ git flow init
//   Branch name for production releases: master
//   Branch name for "next release" development: develop
// Start a new feature
// $ git flow feature start feature-name
// Finish a feature
// $ git flow feature finish feature-name
// Start a release
// $ git flow release start 1.2.0
// Finish a release (tags master and merges into develop)
// $ git flow release finish 1.2.0
// Start a hotfix
// $ git flow hotfix start hotfix-issue
// Finish a hotfix (tags master and merges into develop)
// $ git flow hotfix finish hotfix-issue

// 2. GitHub Flow Overview
// • main (or master): always deployable.
// • Create a feature branch off main.
// • Commit and push changes to remote feature branch.
// • Open a Pull Request (PR) for review.
// • Merge into main when approved and deploy immediately.
// • Delete the feature branch after merge.

// Example GitHub Flow commands:
// $ git checkout -b feature/awesome-feature      # create feature branch
// $ git add . && git commit -m "Add awesome feature"
// $ git push -u origin feature/awesome-feature   # push branch
// → Open PR on GitHub → review → merge
// $ git checkout main
// $ git pull origin main                        # update main
// $ git branch -d feature/awesome-feature        # delete local feature branch
// $ git push origin --delete feature/awesome-feature  # delete remote branch

// 3. Key Differences
// • Git Flow: suited for scheduled releases, larger teams, multiple parallel versions.
// • GitHub Flow: lightweight, continuous deployment, smaller teams, rapid iteration.

// 4. Best Practices
/*
- Keep main/master always in a deployable state.
- Use descriptive names: feature/login, bugfix/header-alignment, hotfix/security-patch.
- Protect main/master branch with required status checks (CI, code review).
- Rebase or merge develop/main before finishing feature to minimize conflicts.
- Clean up merged branches regularly to keep repo tidy.
- Automate release tagging and deployment in CI/CD pipelines.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
178 - Measuring Performance: Using Chrome DevTools Performance Tab, Lighthouse Audits

This note explains:
1. Recording and analyzing performance profiles in Chrome DevTools.
2. Key views: FPS meter, CPU flame chart, network waterfall, screenshots.
3. Running Lighthouse audits for performance metrics and actionable suggestions.
4. Using Lighthouse in DevTools and via the CLI.
5. Understanding Core Web Vitals: FCP, LCP, TTI, CLS.
6. Best-practice guidelines for continuous performance monitoring.
*/

// 1. Chrome DevTools Performance Tab
// • Open DevTools (F12) → Performance.
// • Click “Record”, interact with the page (scroll, click, load), then “Stop”.
// • Overview pane shows FPS, CPU, Memory, Screenshots.
// • Flame chart displays call stacks and time spent per function.
// • Bottom-up view lists the heaviest functions; Call Tree shows stack hierarchy.
// • Network waterfall (in Network tab) shows resource timing—combine with Performance.

// Example: measure a function’s runtime
function expensiveTask() {
  const start = performance.now();
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  const duration = performance.now() - start;
  console.log(`expensiveTask: ${duration.toFixed(2)}ms`);
}
expensiveTask(); // Run this, then record in DevTools to inspect its impact

// 2. FPS Meter
// • In DevTools Settings → Experiments → enable “Rendering” → show FPS meter.
// • Record while animating or scrolling to ensure you stay above 60 FPS.

// 3. Lighthouse Audits in DevTools
// • Open DevTools → Lighthouse (or Audits) panel.
// • Select categories: Performance, Accessibility, Best Practices, SEO.
// • Click “Generate report” to get scores and diagnostics.
// • Key Performance metrics:
//    • First Contentful Paint (FCP): time to first paint (<1 s is good).
//    • Largest Contentful Paint (LCP): time to render main content (<2.5 s).
//    • Time to Interactive (TTI): when page is reliably interactive (<3.8 s).
//    • Cumulative Layout Shift (CLS): visual stability score (<0.1).

// 4. Lighthouse CLI Usage
// // Install globally:
// //   npm install -g lighthouse
// // Run a report and open in browser:
// //   lighthouse https://example.com --view --output=json
// // Automate in CI by parsing JSON output for thresholds.

// 5. Continuous Monitoring
// • Collect Real User Monitoring (RUM) for Core Web Vitals via the web-vitals library.
// • Send metrics to analytics or monitoring dashboards.
// • Set performance budgets (e.g., JS bundle < 200 KB) and enforce in CI.

// 6. Best Practices:
/*
- Break up long tasks (>50 ms) into smaller chunks (e.g., via requestIdleCallback or setTimeout).
- Defer non-critical JavaScript and CSS to reduce TTI.
- Optimize images (lazy-load, compress) to improve FCP and LCP.
- Use code-splitting to keep initial JS payload small.
- Monitor Core Web Vitals in production to catch regressions early.
- Run Lighthouse regularly and treat scores as part of your CI/CD pipeline.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
179 - Web Vitals: understanding CLS, LCP, FID, FCP, TTFB metrics

This note explains:
1. Cumulative Layout Shift (CLS) – measures visual stability; sum of unexpected layout shifts.
2. Largest Contentful Paint (LCP) – time to render the largest content element.
3. First Input Delay (FID) – delay from a user’s first interaction to the browser starting to process the event.
4. First Contentful Paint (FCP) – time to render the first text or image element.
5. Time to First Byte (TTFB) – backend performance from request start to first byte of the response.
*/

// 1. Measuring Web Vitals with the web-vitals library
import { getCLS, getLCP, getFID, getFCP, getTTFB } from 'web-vitals';

getCLS(({ value }) => console.log('CLS:', value));
getLCP(({ value }) => console.log('LCP:', value));
getFID(({ value }) => console.log('FID:', value));
getFCP(({ value }) => console.log('FCP:', value));
getTTFB(({ value }) => console.log('TTFB:', value));

// 2. Manual measurement via the Performance API
window.addEventListener('load', () => {
  const [nav] = performance.getEntriesByType('navigation');
  console.log('TTFB (ms):', nav.responseStart - nav.startTime);
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry) console.log('FCP (ms):', fcpEntry.startTime);
});

// 3. Observing CLS and LCP in real time without external libraries
new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
      console.log('Layout Shift value:', entry.value);
    }
  });
}).observe({ type: 'layout-shift', buffered: true });

new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP observed at (ms):', entry.startTime);
    }
  });
}).observe({ type: 'largest-contentful-paint', buffered: true });

// 4. Best Practices:
/*
- Aim for CLS < 0.1, LCP < 2.5s, FID < 100ms, FCP < 1s, TTFB < 200ms.
- Preload critical assets (fonts, hero images) to improve LCP.
- Reserve layout space for dynamic elements (ads, images) to avoid layout shifts.
- Minimize main-thread work (defer non‐critical JS) to reduce FID.
- Optimize server response (caching, CDN, compression) to lower TTFB.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
180 - Memory Profiling: Detecting Memory Leaks with DevTools Memory Snapshot

This note explains:
1. Opening DevTools Memory panel and taking heap snapshots.
2. Comparing snapshots to find objects that shouldn’t persist.
3. Using the “Allocation instrumentation on timeline” recording.
4. Detecting detached DOM nodes.
5. Example leak code and snapshot analysis.
*/

// 1. Example leak code (for demonstration)
const leakContainer = document.createElement('div');
const leaks = [];
function createLeak() {
  const el = document.createElement('p');
  el.textContent = 'Leaky element';
  leakContainer.appendChild(el);
  leaks.push(el); // Holding a reference prevents GC
}
document.body.appendChild(leakContainer);
// Simulate a leak every second
setInterval(createLeak, 1000);

// 2. Taking Heap Snapshots
// • Open Chrome DevTools → Memory tab.
// • Select “Heap snapshot” and click “Take snapshot” for your baseline.
// • Let the page run (leaks accumulating), then click “Take snapshot” again.
// • Select the second snapshot and click the “Comparison” view.
// • Look under “(system) > Detached DOM tree” and “Objects allocated by script”
//   to spot growing counts of HTMLParagraphElement or Array.

// 3. Allocation Instrumentation on Timeline
// • In Memory tab, choose “Allocation instrumentation on timeline”.
// • Click “Start”, wait for a few intervals, then “Stop”.
// • Observe the flame chart: spikes indicate allocations over time.
// • Click on a bar to inspect what was allocated and the stack trace.

// 4. Detecting Detached DOM Nodes
// • In a heap snapshot, switch to the “Containment” view.
// • Expand “(Detached DOM tree)” to see nodes no longer in the document.
// • Select an entry to view its retainers: which JS objects hold references.

// 5. Tips for Snapshot Analysis
// • Filter by constructor name (e.g., HTMLParagraphElement).
// • Use “Object allocation stacks” (enable in Settings) to see where objects were created.
// • Regularly compare snapshots during feature development to catch leaks early.

/*
Best Practices:
- Always clear intervals/timers when components unmount: clearInterval(id).
- Remove event listeners before detaching DOM nodes: el.removeEventListener(...).
- Nullify references to large structures or DOM elements when done: leaks.length = 0.
- Prefer WeakMap/WeakSet for metadata to allow GC when elements are removed.
- Automate memory regression tests (e.g., Puppeteer + DevTools Protocol).
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
181 - Runtime Performance Tuning: optimizing loops, using web workers for heavy tasks

This note explains:
1. Loop Optimizations: caching lengths, minimizing property lookups, avoiding repeated DOM access.
2. Batching DOM reads and writes, separating measurement/mutation phases.
3. Web Workers: offloading CPU-bound tasks (e.g., prime number calculation) to keep UI responsive.
4. Communication between main thread and worker via postMessage.
5. Best-practice guidelines.
*/

// 1. Loop Optimizations

// 🔹 Naive loop: repeated length lookup and DOM access in each iteration
function highlightItemsNaive(count) {
  for (let i = 0; i < count; i++) {
    const el = document.getElementById(`item-${i}`); // DOM query each time
    if (i % 2 === 0) {
      el.classList.add('highlight');
    }
  }
}

// 🔹 Optimized loop: cache length and DOM elements, minimize lookups
function highlightItemsOptimized(count) {
  const els = new Array(count);
  for (let i = 0; i < count; i++) {
    els[i] = document.getElementById(`item-${i}`);   // single lookup per element
  }
  for (let i = 0, len = els.length; i < len; i++) {
    if (i % 2 === 0) {
      els[i].classList.add('highlight');
    }
  }
}

// 🔹 Batching reads then writes to avoid layout thrashing
function resizeElements() {
  const elements = document.querySelectorAll('.resizable');
  const heights = [];
  // Batch read
  elements.forEach(el => heights.push(el.offsetHeight));
  // Batch write
  elements.forEach((el, idx) => el.style.height = `${heights[idx] / 2}px`);
}

// 2. Offloading Heavy Computation with Web Workers

// worker.js (separate file)
/*
self.onmessage = function(e) {
  const max = e.data;
  // CPU-heavy: find primes up to max
  function findPrimes(n) {
    const primes = [];
    for (let i = 2; i <= n; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) { isPrime = false; break; }
      }
      if (isPrime) primes.push(i);
    }
    return primes;
  }
  const result = findPrimes(max);
  postMessage(result);
};
*/

// main.js
const primeWorker = new Worker('worker.js');

primeWorker.onmessage = function(e) {
  console.log('Primes up to limit:', e.data);
  primeWorker.terminate(); // free worker resources
};

// Dispatch heavy task without blocking UI
function computePrimes(limit) {
  primeWorker.postMessage(limit);
  console.log('Prime computation started in worker');
}

// Example usage
computePrimes(50000);

// Best Practices:
/*
- Cache array lengths and DOM queries outside loops.
- Separate measurement (reads) from mutations (writes) to avoid multiple reflows.
- Use DocumentFragment for bulk DOM insertions.
- Break up large synchronous tasks or use requestIdleCallback when workers are unavailable.
- Terminate Web Workers after use to release threads.
- For large data transfer, use transferable objects (e.g., ArrayBuffer) to avoid structured cloning overhead.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
182 - Logging and Monitoring: Integrating Sentry or LogRocket for Runtime Error Tracking

This note explains:
1. Why use an error monitoring service.
2. Setting up Sentry: installation, initialization, capturing errors.
3. Setting up LogRocket: installation, initialization, session replay.
4. Capturing manual events and breadcrumbs.
5. Filtering and tagging errors for environments.
6. Best-practice guidelines.
*/

// 1. Install dependencies (run in terminal)
// npm install @sentry/browser logrocket

// 2. Sentry Integration (e.g., in your main entry file)
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://YOUR_PUBLIC_DSN@sentry.io/YOUR_PROJECT_ID', // replace with your DSN
  release: 'my-app@1.0.0',      // optional release/version tagging
  environment: 'production',    // set 'development' or 'staging' as needed
  integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })],
  beforeSend(event) {
    // Drop events or scrub sensitive data
    delete event.user;
    return event;
  }
});

// Example: automatic capture of unhandled exceptions and promise rejections
// No further code needed—Sentry captures them by default

// 3. LogRocket Integration (e.g., after Sentry or alongside)
import LogRocket from 'logrocket';

LogRocket.init('your-org/your-app'); // replace with your LogRocket app ID

// Optionally link Sentry and LogRocket sessions
Sentry.configureScope(scope => {
  scope.setExtra('logrocketSession', LogRocket.sessionURL);
});

// 4. Capturing Manual Events

// Capture an exception manually
try {
  throw new Error('Something went wrong!');
} catch (err) {
  Sentry.captureException(err);
  LogRocket.captureException(err);
}

// Add a breadcrumb (Sentry)
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'User clicked login',
  level: Sentry.Severity.Info
});

// Log a custom message (LogRocket)
LogRocket.log('User clicked login');

// 5. Tagging and Context

// Attach user context
Sentry.setUser({ id: '123', email: 'ajay@example.com' });
LogRocket.identify('123', { name: 'Ajay', email: 'ajay@example.com' });

// Set custom tags for filtering
Sentry.setTag('feature', 'checkout');
LogRocket.addTag('feature', 'checkout');

// 6. Best Practices
/*
- Only initialize Sentry/LogRocket once at app root.
- Use release and environment to separate errors by version/stage.
- Scrub or filter out sensitive data before sending.
- Capture breadcrumbs to provide context leading up to errors.
- Identify users securely after authentication.
- Keep monitoring code lightweight; defer heavy setup to after app load.
- Review and triage errors regularly in the Sentry and LogRocket dashboards.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
183 - Content Security Policy (CSP) Header Configuration in Web Servers

This note explains:
1. Setting CSP via HTTP headers in various environments.
2. Example: Express.js middleware.
3. Example: Nginx configuration.
4. Example: Apache .htaccess configuration.
5. Best-practice guidelines.
*/

// 1. Express.js (Node.js) middleware example
const express = require('express');
const app = express();

// Define your CSP directives
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' https://apis.google.com",
  "style-src 'self' https://fonts.googleapis.com",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.example.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
];

app.use((req, res, next) => {
  // Join directives and set the header
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  next();
});

app.get('/', (req, res) => res.send('CSP enabled via Express'));
app.listen(3000, () => console.log('Server running on port 3000'));



/*
2. Nginx configuration snippet (nginx.conf):

server {
    listen 80;
    server_name example.com;

    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' https://apis.google.com;
        style-src 'self' https://fonts.googleapis.com;
        img-src 'self' data:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://api.example.com;
        frame-src 'none';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        upgrade-insecure-requests;
    " always;

    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }
}
*/



/*
3. Apache .htaccess snippet:

<IfModule mod_headers.c>
  Header set Content-Security-Policy "
    default-src 'self';
    script-src 'self' https://apis.google.com;
    style-src 'self' https://fonts.googleapis.com;
    img-src 'self' data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.example.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  "
</IfModule>
*/



/*
Best Practices:
- Start with a restrictive default-src and add only the sources you need.
- Avoid 'unsafe-inline' and use nonces or hashes for inline scripts/styles.
- Test your policy in Report-Only mode before enforcing it.
- Serve CSP via HTTP headers (not <meta>) for stronger protection.
- Include `upgrade-insecure-requests` to automatically load resources over HTTPS.
- Use `report-uri` or `report-to` directives to collect violation reports.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
184 - Cross-Origin Resource Sharing (CORS) Basics and Handling in Frontend Requests

This note explains:
1. Same-Origin Policy restrictions and why CORS is needed.
2. CORS request types: simple requests vs preflighted requests.
3. Server-side headers: Access-Control-Allow-Origin, Methods, Headers, Credentials.
4. Frontend usage with fetch(): mode, credentials, and error handling.
5. Common pitfalls and debugging tips.
*/

// 1. Simple CORS request (no preflight)
// Requires server to send: 
//   Access-Control-Allow-Origin: https://your-frontend.com
fetch('https://api.example.com/data', {
  method: 'GET',             // simple GET
  mode: 'cors'               // enable CORS
})
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => console.log('Received data:', data))
  .catch(err => console.error('CORS error or network failure:', err));

// 2. Preflighted CORS request (custom headers or non-simple methods)
// Browser will send OPTIONS first; server must handle OPTIONS and respond with:
//   Access-Control-Allow-Origin: *
//   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
//   Access-Control-Allow-Headers: Content-Type, Authorization
fetch('https://api.example.com/update', {
  method: 'PUT',             // non-simple method triggers preflight
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'  // non-standard header triggers preflight
  },
  body: JSON.stringify({ foo: 'bar' })
})
  .then(res => res.json())
  .then(result => console.log('Update result:', result))
  .catch(err => console.error('CORS preflight error:', err));

// 3. Sending credentials (cookies, HTTP auth)
// Server must include: 
//   Access-Control-Allow-Credentials: true
//   Access-Control-Allow-Origin: https://your-frontend.com  (cannot be "*")
fetch('https://api.example.com/user/profile', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include'     // send cookies or HTTP auth
})
  .then(res => res.json())
  .then(profile => console.log('User profile:', profile))
  .catch(err => console.error('CORS credentials error:', err));

// 4. Server-Side (Express.js) CORS middleware setup
/*
const express = require('express');
const app = express();

// Basic CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://your-frontend.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // no content for preflight
  }
  next();
});

app.get('/data', (req, res) => res.json({ hello: 'world' }));
app.listen(3000);
*/

// 5. Debugging Tips
// • Check browser console network tab: look for OPTIONS request and response headers.
// • Ensure server responds with the correct Access-Control headers for both OPTIONS and actual requests.
// • Remember that credentials require a specific origin (no “*”) and Access-Control-Allow-Credentials: true.
// • For complex CORS scenarios (custom domains, subdomains), consider using the cors npm package:
//     app.use(require('cors')({ origin: 'https://your-frontend.com', credentials: true }));
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
185 - Secure handling of API tokens: OAuth flows, storing tokens securely

This note explains:
1. OAuth2.0 flows: Authorization Code with PKCE, Client Credentials.
2. Generating PKCE code verifier and challenge.
3. Exchanging authorization code for tokens.
4. Storing tokens securely: HttpOnly Secure SameSite cookies vs in-memory storage.
5. Refresh token rotation to mitigate token theft.
6. Making authenticated API requests with Authorization header or cookies.
7. Best-practice guidelines.
*/

// 1. PKCE Code Verifier and Challenge
async function generatePKCE() {
  // Create a random string (verifier)
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  // SHA-256 hash and base64-url encode (challenge)
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return { verifier, challenge };
}

// 2. Redirect to Authorization Server
async function startAuth() {
  const { verifier, challenge } = await generatePKCE();
  sessionStorage.setItem('pkce_verifier', verifier);
  const authUrl = new URL('https://auth.example.com/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', 'YOUR_CLIENT_ID');
  authUrl.searchParams.set('redirect_uri', 'https://app.example.com/callback');
  authUrl.searchParams.set('scope', 'openid profile');
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  window.location.href = authUrl.toString();
}

// 3. Exchange Authorization Code for Tokens
async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const verifier = sessionStorage.getItem('pkce_verifier');
  const tokenRes = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://app.example.com/callback',
      client_id: 'YOUR_CLIENT_ID',
      code_verifier: verifier
    })
  }).then(r => r.json());
  // 4. Securely store access token in HttpOnly cookie
  document.cookie = `access_token=${tokenRes.access_token}; HttpOnly; Secure; SameSite=Strict; Path=/`;
  sessionStorage.removeItem('pkce_verifier');
  console.log('Access token stored in HttpOnly cookie');
}

// 5. Authenticated API Request
async function fetchUserProfile() {
  const res = await fetch('https://api.example.com/profile', {
    credentials: 'include' // sends HttpOnly cookie
  });
  if (!res.ok) throw new Error('Failed to load profile');
  const profile = await res.json();
  console.log('User profile:', profile);
}

// 6. Refresh Token Rotation
async function rotateRefreshToken() {
  const res = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',       // sends refresh token cookie
    body: new URLSearchParams({ grant_type: 'refresh_token' })
  });
  if (!res.ok) throw new Error('Failed to refresh tokens');
  console.log('Refresh token rotated');
}

/*
Best Practices:
- Always use Authorization Code flow with PKCE in public clients.
- Store tokens in HttpOnly, Secure, SameSite cookies to protect against XSS.
- Avoid storing tokens in localStorage or sessionStorage.
- Implement refresh token rotation: issue a new refresh token each use and revoke the old one.
- Use short-lived access tokens and limit their scopes.
- Validate and scope tokens server-side on every request.
- Serve all endpoints over HTTPS to protect tokens in transit.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
186 - Avoiding eval() and new Function(): Safer Alternatives

This note explains:
1. Why eval() and new Function() are risky (XSS, code injection, performance).
2. Using JSON.parse() for data instead of eval().
3. Using dynamic import() for loading code modules.
4. Creating whitelisted function maps instead of evaluating arbitrary code.
5. Using sandbox libraries for controlled evaluation.
*/

// 1. Risky use of eval()
const userInput = "2 + 2";       
// const result = eval(userInput);  // ❌ dangerous if userInput is malicious

// 2. Safe data parsing with JSON.parse()
const dataString = '{"x":10,"y":20}';
try {
  const data = JSON.parse(dataString);  // ✅ parse JSON safely
  console.log('Parsed data:', data);
} catch (e) {
  console.error('JSON parse error:', e);
}

// 3. Dynamic import() for on-demand code loading
// Instead of eval("import('module').then(...)")
async function loadModule(name) {
  try {
    const mod = await import(`./modules/${name}.js`);  // ✅ only loads trusted modules
    mod.doWork();
  } catch (e) {
    console.error('Dynamic import error:', e);
  }
}
// loadModule('analytics');

// 4. Whitelisted function map pattern
const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b
};
function safeEval(funcName, a, b) {
  const fn = operations[funcName];
  if (typeof fn === 'function') {
    return fn(a, b);              // ✅ only pre-approved functions execute
  }
  throw new Error('Unknown operation');
}
console.log('safeEval add:', safeEval('add', 5, 3));  // 8

// 5. Controlled sandbox with a library (e.g., safe-eval)
/*
import safeEval from 'safe-eval';
const context = { Math };
const safeResult = safeEval('Math.sqrt(x)', { x: 16, Math });
console.log('safe-eval result:', safeResult); // 4
*/

// Best Practices:
/*
- Never use eval() or new Function() on untrusted input.
- Use JSON.parse() for parsing data, not eval().
- Use dynamic import() for loading code you control.
- Define an explicit map of allowed functions instead of executing arbitrary strings.
- For truly dynamic expressions, use a sandbox library (e.g., safe-eval or VM2) with strict context.
- Always sanitize and validate user inputs before any execution.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
187 - Dependency Auditing: using npm audit, yarn audit, Snyk for vulnerability scanning

This note explains:
1. Using npm audit to find and fix vulnerabilities in Node projects.
2. Using yarn audit for Yarn-managed dependencies.
3. Using Snyk for deep scanning and monitoring over time.
4. Automating audits in CI pipelines.
5. Best-practice guidelines.
*/

// 1. Running npm audit programmatically
const { exec } = require('child_process');
exec('npm audit --json', (err, stdout) => {
  if (err) {
    console.error('npm audit failed:', err);
    return;
  }
  const report = JSON.parse(stdout);
  console.log('npm audit vulnerabilities:', report.metadata.vulnerabilities);
});

// 2. Running yarn audit programmatically
exec('yarn audit --json', (err, stdout) => {
  if (err) {
    console.error('yarn audit failed:', err);
    return;
  }
  const advisories = stdout
    .trim()
    .split('\n')
    .map(line => JSON.parse(line))
    .filter(entry => entry.type === 'auditAdvisory')
    .map(entry => entry.data.advisory);
  console.log('yarn audit advisories count:', advisories.length);
});

// 3. Using Snyk in code
// Install with: npm install --save-dev snyk
const snyk = require('snyk');
snyk.test()
  .then(res => {
    console.log('Snyk vulnerabilities found:', res.vulnerabilities.length);
  })
  .catch(err => {
    console.error('Snyk scan failed:', err.message);
  });

/*
Best Practices:
/*
- Run `npm audit` or `yarn audit` regularly and fix or acknowledge advisories promptly.
- Integrate `snyk test` and `snyk monitor` into your CI/CD pipeline for continuous monitoring.
- Use `--audit-level` flag (e.g., moderate, high) in CI to fail builds on critical issues.
- Keep your dependencies up to date with `npm update` or `yarn upgrade` and review changelogs.
- Consider using `npm audit fix --force` sparingly and always review breaking changes.
- For frontend projects, scan transitive dependencies as well (e.g., `npm audit --production` to focus on runtime code).
- Document your vulnerability response process and train your team on triaging advisories.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
188 - WebAssembly (Wasm) Integration: Loading .wasm Modules, Interop with JS

This note explains:
1. What WebAssembly is and why use it (near‐native performance, language portability).
2. Loading a .wasm binary with fetch() and WebAssembly.instantiateStreaming().
3. Providing imports (e.g., memory, table, functions) to the Wasm module.
4. Calling exported functions and accessing/shared memory buffers.
5. Example with manual instantiation and with Emscripten‐generated glue code.
6. Best‐practice guidelines.
*/

// 1. Basic Wasm binary loading and instantiation
const importObject = {
  env: {
    // imported function for the module
    print: (msgPtr, len) => {
      const bytes = new Uint8Array(instance.exports.memory.buffer, msgPtr, len);
      const text = new TextDecoder('utf8').decode(bytes);
      console.log('WASM says:', text);
    }
  }
};

let instance;
(async () => {
  // instantiateStreaming fetches and compiles in one step
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch('module.wasm'),
    importObject
  );
  instance = wasmModule.instance;

  // 2. Call an exported function (e.g., add two integers)
  const sum = instance.exports.add(5, 7);
  console.log('5 + 7 =', sum);

  // 3. Working with shared memory buffer
  const mem = instance.exports.memory;
  const view = new Uint32Array(mem.buffer);
  // write to memory at offset 0
  view[0] = 42;
  console.log('Memory[0] =', view[0]);
})();

// 4. Example C code compiled to Wasm (for reference)
/*
   // add.c
   #include <emscripten/emscripten.h>
   EMSCRIPTEN_KEEPALIVE
   int add(int a, int b) {
     return a + b;
   }
   EMSCRIPTEN_KEEPALIVE
   void write_mem(uint32_t* ptr, uint32_t value) {
     ptr[0] = value;
   }
   // Compile: emcc add.c -O3 -s WASM=1 -s EXPORTED_FUNCTIONS="['_add','_write_mem']" -o module.wasm
*/

// 5. Using Emscripten‐generated glue (Module pattern)
// <script src="module.js"></script>
// Module().then((Module) => {
//   console.log('add via Emscripten:', Module._add(3, 4));
//   Module._write_mem(Module._malloc(4), 99);
// });

// Best Practices:
/*
- Prefer instantiateStreaming() when serving .wasm with correct MIME type (application/wasm).
- Always check for WebAssembly support (`if (WebAssembly.instantiateStreaming) ...`).
- Minimize importObject complexity—only expose needed functions/memory.
- Free any allocated pointers if using malloc (e.g., Module._free(ptr)).
- Use TextEncoder/TextDecoder for string interop across JS and Wasm.
- Host .wasm files on the same origin or configure CORS properly.
- Keep Wasm modules small and focus on CPU‐intensive routines; leave UI to JavaScript.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
189 - Node.js Server-Side JavaScript: creating HTTP servers, Express.js basics

This note explains:
1. Creating a basic HTTP server with Node’s built-in http module.
2. Handling requests and responses.
3. Installing and initializing Express.js.
4. Defining routes and middleware.
5. Parsing JSON bodies with express.json().
6. Serving static files.
7. Error-handling middleware.
*/

// 1. Basic HTTP server with the http module
const http = require('http');

const server = http.createServer((req, res) => {
  // Log method and URL
  console.log(`${req.method} ${req.url}`);

  // Simple routing
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node HTTP Server\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});



// 2. Express.js basics
// Install with: npm install express
const express = require('express');
const app = express();

// Middleware: parse JSON bodies
app.use(express.json());

// 3. Defining routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, name: `User ${id}` });
});

app.post('/data', (req, res) => {
  const payload = req.body;
  res.status(201).json({ received: payload });
});

// 4. Serving static files from the "public" directory
app.use(express.static('public'));

// 5. Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// 6. Starting the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

/*
Best Practices:
- Organize routes in separate modules using express.Router().
- Use helmet to set secure HTTP headers (npm install helmet).
- Validate and sanitize user input (e.g., express-validator or Joi).
- Centralize error handling and avoid exposing internal error details.
- Store config (ports, DB URIs) in environment variables (dotenv).
- Gracefully handle shutdown signals to close the server and cleanup resources.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
190 - Deno: Modern Runtime for TypeScript/JavaScript with Built-in Security

This note explains:
1. Installing Deno and running scripts.
2. URL-based imports and the standard library.
3. Permission flags for network, file, and environment access.
4. Writing a simple HTTP server in Deno.
5. Reading and writing files securely.
6. Using built-in tools: formatter, linter, bundler, test runner.
7. Best-practice guidelines.
*/

// 1. Install and Run
// • Install via:
//     curl -fsSL https://deno.land/install.sh | sh
// • Run a script (no flags = sandboxed; network/file access denied by default):
//     deno run hello.ts
// • Run with permissions:
//     deno run --allow-net --allow-read hello.ts

// 2. URL-based Imports (no package.json)
/*
// Import from deno.land std library
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
*/

// 3. Permissions Model
// • --allow-net      network access
// • --allow-read     file read
// • --allow-write    file write
// • --allow-env      environment variables
// • --allow-run      spawn subprocesses
// • --allow-all      all permissions

// 4. Simple HTTP Server
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";

const server = serve({ port: 8000 });
console.log("Deno HTTP server running on http://localhost:8000/");

for await (const req of server) {
  req.respond({ 
    status: 200, 
    headers: new Headers({ "content-type": "text/plain" }),
    body: `Hello from Deno! You requested ${req.url}\n`
  });
}

// Run with:
// deno run --allow-net server.ts

// 5. File Operations
import { readTextFile, writeTextFile } from "https://deno.land/std@0.167.0/fs/mod.ts";

async function fileDemo() {
  await writeTextFile("greeting.txt", "Hello Deno!");
  const content = await readTextFile("greeting.txt");
  console.log("File contents:", content);
}
fileDemo();

// Run with:
// deno run --allow-read --allow-write file_demo.ts

// 6. Built-in Tools
// • Formatter:     deno fmt
// • Linter:        deno lint
// • Bundler:       deno bundle main.ts bundle.js
// • Test runner:   deno test --allow-net

// 7. Best Practices
/*
- Explicitly declare only needed permissions; avoid --allow-all in production.
- Use URL imports with versioned tags (e.g., @0.167.0) to ensure stability.
- Leverage the built-in linter/formatter for consistent code style.
- Organize code into modules and use Deno’s import map feature if desired.
- Handle errors with try/catch and use Deno.exit(code) for clean shutdown.
- Secure environment: avoid leaking secrets; restrict --allow-env as tightly as possible.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
191 - JavaScript in IoT & Embedded Systems: Espruino, Johnny-Five for robotics

This note explains:
1. Espruino basics: running JS on microcontrollers, controlling pins.
2. Johnny-Five basics: using Node.js to control Arduino/Raspberry Pi via Firmata.
3. Blinking an LED on Espruino.
4. Blinking an LED and reading a sensor with Johnny-Five.
5. Best-practice guidelines.
*/

// 1. Espruino: Blinking an LED on board pin LED1
function blinkEspruino() {
  let state = false;
  setInterval(() => {
    state = !state;
    digitalWrite(LED1, state);   // toggle on-board LED
  }, 500);
}
blinkEspruino();

// 2. Espruino: Reading a button input and controlling an LED
pinMode(BTN, 'input_pulldown');
pinMode(LED1, 'output');
function watchButton() {
  setWatch(e => {
    digitalWrite(LED1, e.state); // LED on when button pressed
  }, BTN, { repeat: true, edge: 'both', debounce: 50 });
}
watchButton();

// 3. Johnny-Five: Blinking an LED connected to pin 13
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", () => {
  const led = new five.Led(13);
  led.blink(500);              // blink every 500ms
});

// 4. Johnny-Five: Reading a sensor (e.g., photoresistor) and logging
board.on("ready", () => {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 1000                 // read every second
  });
  sensor.on("data", value => {
    console.log("Light level:", value);
  });
});

// Best Practices:
/*
- Use debouncing when reading mechanical inputs (buttons).
- Keep blocks short to avoid blocking the event loop on Johnny-Five.
- Ensure Firmata firmware is uploaded to microcontroller for Johnny-Five.
- Utilize Espruino’s low-power modes on battery-powered devices.
- Modularize hardware interactions into reusable functions.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
192 - JAMstack Evolution: Astro, Eleventy, and the Rise of Frameworks like SvelteKit, Next.js

This note explains:
1. Astro: content-first framework with Islands Architecture.
2. Eleventy: simple, unopinionated static site generator.
3. SvelteKit: Svelte-based full-stack framework (SSR + SSG).
4. Next.js: React-based hybrid framework (SSR, SSG, ISR, API routes).
5. Comparative strengths and ideal use cases.
*/

// 1. Astro Component (src/components/Header.astro)
// ────────────────────────────────────────────────
---
// Frontmatter: import data or components here
---
<header>
  <h1>Welcome to Astro Site</h1>
</header>

// 2. Eleventy Template (src/posts.njk)
// ───────────────────────────────────
{% for post in collections.posts %}
<article>
  <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
  <p>{{ post.data.description }}</p>
</article>
{% endfor %}

// 3. SvelteKit Page (src/routes/+page.svelte)
// ────────────────────────────────────────────
<script>
  /** @type {{ title: string; content: string }} */
  export let data;
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<main>
  <h1>{data.title}</h1>
  <p>{data.content}</p>
</main>

// src/routes/+page.js
export function load() {
  return {
    title: 'Hello from SvelteKit',
    content: 'This is rendered via SvelteKit’s load function.'
  };
}

// 4. Next.js Page (pages/index.js)
// ─────────────────────────────────
import React from 'react';

export async function getStaticProps() {
  return {
    props: {
      message: 'Hello from Next.js!'
    }
  };
}

export default function Home({ message }) {
  return <h1>{message}</h1>;
}

// 5. Comparison
// • Astro: minimizes client JS, ideal for blogs/docs.
// • Eleventy: ultra-light, pick any templating language.
// • SvelteKit: highly reactive, minimal bundle overhead.
// • Next.js: rich React ecosystem, routes + API in one.

// Best Practices:
/*
- Pre-render as much as possible: SSG for pages, ISR/SSG for dynamic content.
- Leverage headless CMS (e.g., Contentful, Sanity) for content management.
- Optimize image and asset pipelines for fast builds and delivery.
- Choose the tool that aligns with your team's language and paradigm preferences.
- Monitor build times and bundle sizes; enable caching or incremental builds where supported.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
193 - Functional Reactive Programming: RxJS basics, Observables, Subjects

This note explains:
1. Observables – lazy collections of future values/errors/completions, unlike Promises.
2. Creating Observables from static values, events, timers.
3. Subscribing to Observables and unsubscribing to prevent leaks.
4. Common operators: map, filter, switchMap for transforming streams.
5. Subjects – multicast Observables; BehaviorSubject holds the latest value.
*/

// 1. Basic Observable creation and subscription
import { Observable, Subject, BehaviorSubject, fromEvent, interval, of } from 'rxjs';
import { map, filter, switchMap, take } from 'rxjs/operators';

// Observable from static values
const static$ = of(1, 2, 3);
const staticSub = static$.subscribe({
  next: v => console.log('of() value:', v),
  complete: () => console.log('of() complete')
});

// 2. Observable from events
const button = document.getElementById('myButton');
const clicks$ = fromEvent(button, 'click');
const clickSub = clicks$
  .pipe(map(() => new Date().toLocaleTimeString()))
  .subscribe(time => console.log('Button clicked at', time));

// 3. Interval Observable and unsubscription
const ticker$ = interval(1000).pipe(take(5)); // emits 0–4 then completes
const tickerSub = ticker$.subscribe({
  next: n => console.log('Interval tick:', n),
  complete: () => console.log('Interval complete')
});

// 4. Chaining operators: filtering and mapping
const filtered$ = interval(500).pipe(
  filter(n => n % 2 === 0),  // even numbers only
  map(n => `Even number: ${n}`),
  take(3)
);
filtered$.subscribe(msg => console.log(msg));

// 5. switchMap example: map click events to an interval stream
const switched$ = clicks$.pipe(
  switchMap(() => interval(300).pipe(take(3))) // on each click, emit 0,1,2
);
const switchedSub = switched$.subscribe(n => console.log('switchMap value:', n));

// 6. Subjects: multicast and manual emission
const subject = new Subject();
subject.subscribe(v => console.log('Subject Observer A:', v));
subject.subscribe(v => console.log('Subject Observer B:', v));
subject.next('Hello');   // both A and B receive
subject.next('World');

// 7. BehaviorSubject: holds and emits the latest value upon subscription
const behavior = new BehaviorSubject('Initial');
behavior.subscribe(v => console.log('Behavior A:', v)); // logs 'Initial'
behavior.next('First update');
behavior.subscribe(v => console.log('Behavior B:', v)); // immediately logs 'First update'
behavior.next('Second update');

// 8. Cleanup: unsubscribe when done to avoid memory leaks
staticSub.unsubscribe();
clickSub.unsubscribe();
tickerSub.unsubscribe();
switchedSub.unsubscribe();
subject.complete();
behavior.complete();

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
194 - Finite State Machines in JS: XState Overview and Integration

This note explains:
1. What a finite state machine (FSM) is and why it’s useful for predictable state management.
2. Creating an XState machine with states, events, and transitions.
3. Interpreting (running) a machine in plain JavaScript.
4. Integrating XState with React using @xstate/react’s useMachine hook.
5. Best-practice guidelines.
*/

// 1. Install:
// npm install xstate @xstate/react

// 2. Basic XState Machine Definition
import { createMachine, interpret } from 'xstate';

// A simple toggle machine: two states, 'inactive' and 'active'
const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

// 3. Interpreting and Running the Machine in JS
const toggleService = interpret(toggleMachine)
  .onTransition(state => {
    console.log(`State is now: ${state.value}`);
  })
  .start(); // → logs "State is now: inactive"

toggleService.send('TOGGLE'); // → logs "State is now: active"
toggleService.send('TOGGLE'); // → logs "State is now: inactive"

// 4. React Integration with @xstate/react
import React from 'react';
import { useMachine } from '@xstate/react';

function ToggleButton() {
  const [state, send] = useMachine(toggleMachine);
  return (
    <button onClick={() => send('TOGGLE')}>
      {state.matches('inactive') ? 'Turn On' : 'Turn Off'}
    </button>
  );
}

// Usage in a React app:
// import { ToggleButton } from './ToggleButton';
// <ToggleButton />

// 5. More Advanced Example: Fetch Machine
const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  context: {
    data: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      invoke: {
        id: 'getData',
        src: (ctx, event) =>
          fetch(event.url).then(res => res.json()),
        onDone: {
          target: 'success',
          actions: (ctx, event) => { ctx.data = event.data; }
        },
        onError: {
          target: 'failure',
          actions: (ctx, event) => { ctx.error = event.data; }
        }
      }
    },
    success: {
      on: { FETCH: 'loading' }
    },
    failure: {
      on: { RETRY: 'loading' }
    }
  }
});

// React hook usage for fetchMachine
function DataLoader({ url }) {
  const [state, send] = useMachine(fetchMachine);
  return (
    <div>
      {state.matches('idle') && <button onClick={() => send({ type: 'FETCH', url })}>Load Data</button>}
      {state.matches('loading') && <p>Loading…</p>}
      {state.matches('success') && <pre>{JSON.stringify(state.context.data, null, 2)}</pre>}
      {state.matches('failure') && (
        <>
          <p>Error: {state.context.error.toString()}</p>
          <button onClick={() => send('RETRY')}>Retry</button>
        </>
      )}
    </div>
  );
}

/*
Best Practices:
- Keep machine definitions declarative and side-effect–free; handle side effects with `invoke` or actions.
- Use context for storing mutable data across states.
- Name events and states clearly to reflect business logic.
- Use separate services (interpret) per component instance to avoid shared state.
- Leverage XState’s visualizer (https://stately.ai/viz) for debugging and documentation.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
195 - Design Patterns in JavaScript: Singleton, Factory, Observer, Mediator, Command

This note explains:
1. Singleton – ensuring a class has only one instance and providing a global access point.
2. Factory – creating objects without exposing instantiation logic.
3. Observer – a subject maintains a list of observers and notifies them of changes.
4. Mediator – centralizes communication between components to reduce coupling.
5. Command – encapsulating requests as objects, with undo/redo capabilities.
*/

// 1. Singleton Pattern
class Configuration {
  constructor(settings) {
    if (Configuration.instance) {
      return Configuration.instance;
    }
    this.settings = settings;
    Configuration.instance = this;
  }
  get(key) {
    return this.settings[key];
  }
}
const configA = new Configuration({ apiUrl: 'https://api.example.com' });
const configB = new Configuration({ apiUrl: 'https://malicious.com' });
console.log('Singleton config apiUrl:', configA.get('apiUrl')); // https://api.example.com
console.log('Same instance:', configA === configB);            // true

// 2. Factory Pattern
function createUser(type) {
  const methods = {
    admin: () => ({ role: 'admin', permissions: ['read','write','delete'] }),
    guest: () => ({ role: 'guest', permissions: ['read'] })
  };
  return methods[type]();
}
const admin = createUser('admin');
const guest = createUser('guest');
console.log('Admin user:', admin);
console.log('Guest user:', guest);

// 3. Observer Pattern
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter(sub => sub !== fn);
  }
  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}
const news = new Subject();
const subscriber1 = data => console.log('Subscriber 1 received:', data);
const subscriber2 = data => console.log('Subscriber 2 received:', data);
news.subscribe(subscriber1);
news.subscribe(subscriber2);
news.notify('Breaking News!'); // both receive
news.unsubscribe(subscriber2);
news.notify('More News!');     // only subscriber1

// 4. Mediator Pattern
class Mediator {
  constructor() {
    this.channels = {};
  }
  subscribe(channel, fn) {
    (this.channels[channel] = this.channels[channel] || []).push(fn);
  }
  publish(channel, data) {
    (this.channels[channel] || []).forEach(fn => fn(data));
  }
}
const mediator = new Mediator();
mediator.subscribe('chat', msg => console.log('User1 gets message:', msg));
mediator.subscribe('chat', msg => console.log('User2 gets message:', msg));
mediator.publish('chat', 'Hello everyone!');

// 5. Command Pattern
class Command {
  execute() {}
  undo() {}
}
class AddCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
  }
  execute(state) {
    state.total += this.value;
  }
  undo(state) {
    state.total -= this.value;
  }
}
const state = { total: 0 };
const add5 = new AddCommand(5);
console.log('Initial total:', state.total);
add5.execute(state);
console.log('After execute:', state.total);
add5.undo(state);
console.log('After undo:', state.total);

/*
Best Practices:
- Singleton: minimize global state; beware of testing difficulties.
- Factory: encapsulate creation logic to improve flexibility.
- Observer: manage subscriptions carefully to avoid memory leaks.
- Mediator: reduce direct dependencies between components.
- Command: store command history for possible undo/redo functionality.
- Keep patterns simple and use only when they solve real problems.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/*
196 - API Rate Limiting and Throttling Strategies (Debounce, Throttle, Leaky Bucket)

This note explains:
1. Debounce – group rapid calls into one after a pause.
2. Throttle – ensure a function is called at most once per interval.
3. Leaky Bucket – allow bursts up to capacity, then process at fixed rate.
4. Use cases: form input handling (debounce), scroll/resize events (throttle), API request limiting (leaky bucket).
5. Best-practice guidelines.
*/

// 🔹 1. Debounce: wait until calls stop for a given delay
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Example: only log after 300ms of inactivity
const onResize = debounce(() => {
  console.log('Resized at', new Date().toISOString());
}, 300);
window.addEventListener('resize', onResize);

// 🔹 2. Throttle: call at most once every interval
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// Example: log scroll position at most once per 200ms
const onScroll = throttle(() => {
  console.log('Scroll Y:', window.scrollY);
}, 200);
window.addEventListener('scroll', onScroll);

// 🔹 3. Leaky Bucket: allow bursts, drain at fixed rate
class LeakyBucket {
  constructor(ratePerSec, capacity) {
    this.capacity = capacity;
    this.ratePerMs = ratePerSec / 1000;
    this.level = 0;
    this.lastTime = Date.now();
  }
  _leak() {
    const now = Date.now();
    const delta = now - this.lastTime;
    this.level = Math.max(0, this.level - delta * this.ratePerMs);
    this.lastTime = now;
  }
  tryRemove(amount = 1) {
    this._leak();
    if (this.level + amount <= this.capacity) {
      this.level += amount;
      return true; // allowed
    }
    return false;  // rate limit exceeded
  }
}

// Example: limit to 5 requests per second, burst capacity 10
const bucket = new LeakyBucket(5, 10);
function sendRequest(id) {
  if (bucket.tryRemove()) {
    console.log(`Request ${id} sent at`, new Date().toISOString());
    // actual fetch()...
  } else {
    console.warn(`Request ${id} dropped (rate limit)`);
  }
}

// Simulate 20 rapid requests
for (let i = 1; i <= 20; i++) {
  setTimeout(() => sendRequest(i), i * 50);
}

/*
Best Practices:
/*
- Use debounce for user input to reduce unnecessary calls.
- Use throttle for continuous events like scroll or resize.
- Use leaky bucket for server-side/API rate limiting to handle bursts gracefully.
- Choose appropriate delays and capacities based on user experience and backend limits.
- Always monitor real traffic patterns and adjust parameters accordingly.
*/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////