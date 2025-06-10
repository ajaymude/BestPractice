// ======================
// JavaScript Full Syllabus
// (Beginner to Expert)
// ======================

// 📘 BASICS & SETUP
// 01 - What is JavaScript and why use it?
// 02 - JavaScript vs. Vanilla JS vs. Transpiled Languages (TypeScript, CoffeeScript)
// 03 - Setting up a Development Environment (Node.js, npm, nvm)
// 04 - Running JavaScript in Browser Console vs. Node REPL
// 05 - Including JS in HTML: <script> tags, defer, async

// 🔤 SYNTAX & FUNDAMENTALS
// 06 - Statements, Expressions, and Semicolons
// 07 - Comments (single-line, multi-line)
// 08 - Variables: var, let, const (hoisting, temporal dead zone)
// 09 - Data Types: primitive (string, number, boolean, null, undefined, symbol, bigint)
// 10 - typeof operator and type coercion

// 🔢 OPERATORS & EXPRESSIONS
// 11 - Arithmetic Operators (+, -, *, /, %, **, ++, --)
// 12 - Assignment Operators (=, +=, -=, *=, /=, %=, **=)
// 13 - Comparison Operators (== vs ===, != vs !==, >, <, >=, <=)
// 14 - Logical Operators (&&, ||, !)
// 15 - Ternary Operator (condition ? expr1 : expr2)
// 16 - Operator Precedence and Associativity

// 🤔 CONTROL FLOW
// 17 - if, else if, else statements
// 18 - switch statement and fall-through
// 19 - for loops (for, for…of, for…in)
// 20 - while and do…while loops
// 21 - break, continue, labeled statements

// 🧩 FUNCTIONS
// 22 - Function Declaration vs Function Expression
// 23 - Arrow Functions: syntax, this-binding differences
// 24 - Parameters and Arguments (default parameters, rest operator)
// 25 - Return values
// 26 - First-class Functions and Callbacks
// 27 - Higher-order Functions (functions that return functions, take functions as args)
// 28 - Immediately Invoked Function Expressions (IIFE)
// 29 - Function Scope vs Block Scope
// 30 - Closures: lexical environment, private variables
// 31 - Function.prototype.call, apply, and bind
// 32 - Recursion (recursion vs iteration)


// ✂️ STRING & REGULAR EXPRESSIONS
// 46 - String Literals, Template Literals (backticks), string concatenation
// 47 - Common String Methods: length, indexOf, lastIndexOf, slice, substr, substring, replace, replaceAll, toUpperCase, toLowerCase, trim, split
// 48 - String immutability and performance considerations
// 49 - Regular Expressions: syntax, flags (g, i, m, u, y, s)
// 50 - Common RegExp Methods: test, exec, match, matchAll, replace with regex, search


// 🔌 BOM & DOM MANIPULATION
// 70 - Window Object: global scope, alert, prompt, confirm
// 71 - Document Object Model (DOM) tree, nodes vs elements
// 72 - Selecting Elements: getElementById, getElementsByTagName, querySelector, querySelectorAll
// 73 - Modifying Elements: textContent, innerHTML, innerText
// 74 - Changing Element Attributes and Styles: setAttribute, classList, style property
// 75 - Creating, Appending, Removing Nodes: createElement, appendChild, removeChild, replaceChild
// 76 - Traversing the DOM: parentNode, childNodes, nextSibling, previousSibling
// 77 - Event Handling: addEventListener, event object, event propagation (bubbling, capturing), stopPropagation, preventDefault
// 78 - Delegated Event Handling and performance
// 79 - Manipulating Forms: input elements, form elements, form submission, form validation
// 80 - Window events: load, DOMContentLoaded, resize, scroll
// 81 - Timers: setTimeout, setInterval, clearTimeout, clearInterval
// 82 - Location, History, Navigator objects

// 📈 ASYNCHRONOUS JAVASCRIPT
// 83 - Callback Hell and Pyramid of Doom
// 84 - Promises deep dive: states, chaining, error propagation
// 85 - Async/Await under the hood: converting promise chains
// 86 - Fetch API: fetch, handling responses, parsing JSON, error handling
// 87 - Axios library: installation, basic GET/POST, interceptors, axios.create
// 88 - XMLHttpRequest (legacy) for understanding browser compatibility
// 89 - Web APIs for asynchronous work: setTimeout vs requestAnimationFrame, requestIdleCallback
// 90 - Event Loop, Call Stack, Message Queue, Microtasks vs Macrotasks
// 91 - Debouncing and Throttling functions for performance

// 🛠 MODULE BUNDLERS & BUILD TOOLS
// 92 - npm scripts: defining start, build, test scripts
// 93 - Babel: transpiling ES6+ to ES5, presets, plugins, .babelrc configuration
// 94 - Webpack fundamentals: entry, output, loaders, plugins, mode (development vs production)
// 95 - Rollup basics: ES module bundling, tree-shaking, plugins
// 96 - Vite overview: dev server, fast HMR, build optimizations
// 97 - Parcel introduction: zero-config bundling, asset handling
// 98 - Bundler Comparison: webpack vs Rollup vs Parcel vs Vite
// 99 - Asset Management: importing CSS, images, fonts via bundlers
// 100 - Environment Variables and Build-time Configuration (Cross-env, dotenv)

// 🧪 TESTING & DEBUGGING
// 101 - Debugging in the Browser: DevTools Console, Breakpoints, Watch expressions
// 102 - console.log, console.warn, console.error, console.table
// 103 - Source Maps: generating and using for easier debugging
// 104 - Unit Testing with Jest: installation, writing test suites, matchers, mocking modules
// 105 - Testing DOM with Testing Library (Jest DOM, @testing-library/dom)
// 106 - End-to-End (E2E) Testing with Cypress: setup, writing tests, fixtures, commands
// 107 - Debugging Node.js Code: using node --inspect, VSCode Debugger
// 108 - Linting with ESLint: configuring ESLint, rules, plugins (eslint-plugin-jsx, eslint-plugin-node)
// 109 - Type Checking with TypeScript (optional): setting up tsconfig, basic type annotations in JS via JSDoc

// 📐 CODE QUALITY & PATTERNS
// 110 - Code Formatting with Prettier: integration with ESLint and editors
// 111 - Comments and Documentation: JSDoc syntax, generating documentation
// 112 - Naming Conventions and Project Structure
// 113 - DRY Principle (Don’t Repeat Yourself), KISS (Keep It Simple, Stupid), YAGNI (You Aren’t Gonna Need It)
// 114 - Module Patterns: Revealing Module Pattern, Immediately Invoked Function Expression (IIFE) for encapsulation
// 115 - Singleton, Factory, Observer, and Pub/Sub patterns in JS
// 116 - MVC, MVVM, Flux architectures overview
// 117 - Functional Programming in JS: pure functions, immutability, higher-order functions, currying, composition
// 118 - Object-Oriented Programming in JS: classes, inheritance, mixins, composition over inheritance
// 119 - Error Handling: try/catch/finally, custom Error objects, throwing and rethrowing errors

// ⚡ PERFORMANCE OPTIMIZATION
// 120 - Minimizing Reflows and Repaints in the Browser
// 121 - Debounce vs Throttle for event-heavy operations
// 122 - Optimizing loops and algorithmic complexity (Big O notation)
// 123 - Memory leaks: common causes in JS (forgotten timers, detached DOM nodes)
// 124 - Optimizing DOM Access: batch reads/writes, document fragments
// 125 - Lazy Loading Resources: dynamic import, IntersectionObserver for images
// 126 - Web Workers for offloading heavy computation
// 127 - Service Workers for caching, offline-first strategies (intro)

// 🔒 SECURITY BEST PRACTICES
// 128 - Avoiding Cross-Site Scripting (XSS): sanitizing user input, innerText vs innerHTML.
// 129 - Content Security Policy (CSP) basics and implementation.
// 130 - Preventing Cross-Site Request Forgery (CSRF) in AJAX calls.
// 131 - Secure handling of JWTs and tokens in front-end: HttpOnly cookies vs localStorage.
// 132 - Safe use of eval(), Function(), and dynamic code execution.

// 🌐 NETWORKING & API INTEGRATION
// 133 - RESTful API principles: CRUD operations, status codes.
// 134 - Working with JSON data: parse(), stringify(), handling large JSON.
// 135 - GraphQL basics: queries vs mutations, using GraphQL client libraries (Apollo, URQL).
// 136 - WebSockets for real-time communication: WebSocket API, libraries like Socket.IO.
// 137 - Server-Sent Events (SSE) for one-way data streaming.
// 138 - Fetching binary data: ArrayBuffer, Blob, FileReader.

// 💾 STORAGE & STATE MANAGEMENT
// 139 - Browser Storage: localStorage, sessionStorage, differences and use cases.
// 140 - IndexedDB basics: storing structured data, key–value object stores.
// 141 - Cache API for storing network responses, service worker integration.
// 142 - State Management Libraries: Redux fundamentals in vanilla JS, Redux Toolkit overview.
// 143 - MobX for reactive state, observables, actions.
// 144 - Zustand and Jotai: minimalistic state management patterns.
// 145 - Reactivity in Frameworks: comparison with Vue reactivity and Svelte stores.

// 🧩 BUILDING MODERN WEB APPS
// 146 - Single-Page Applications (SPA) concepts and routing strategies.
// 147 - Client-Side Routing vs Server-Side Routing vs Hybrid Approaches.
// 148 - Progressive Web Apps (PWA) fundamentals: manifest.json, service workers, offline caching.
// 149 - Jamstack architecture: static site generators (Gatsby, Eleventy) and headless CMS.
// 150 - Internationalization (i18n) in JS apps: libraries (i18next), locale detection, pluralization.

// 🔗 INTEGRATION WITH FRONTEND FRAMEWORKS (OVERVIEW)
// 151 - React Integration: using create-react-app, CRA vs Vite, React refresh.
// 152 - Vue.js Integration: Vue CLI, Vue 3 Composition API, reactive refs.
// 153 - Angular Integration: Angular CLI, TypeScript-centric development, RxJS observables.
// 154 - Svelte Integration: Svelte’s compiler, reactive statements, stores.
// 155 - Preact and other lightweight alternatives: compatibility with React APIs.

// 📦 PACKAGING & DEPLOYMENT
// 156 - Bundling for Production: minification, uglification, mangling, sourcemaps.
// 157 - Code Splitting Strategies: splitting by route, splitting by component.
// 158 - Tree Shaking: eliminating dead code via ES modules.
// 159 - Asset Optimization: compressing images, gzipping, Brotli compression.
// 160 - Deployment Platforms: Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront, Firebase Hosting.
// 161 - CI/CD Pipelines: using GitHub Actions or GitLab CI to lint, test, build, and deploy automatically.

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

// 🏗 FOUNDATION FOR JAVASCRIPT FRAMEWORKS
// 197 - Understanding Virtual DOM: how React, Vue, Preact implement it.
// 198 - Reactive Rendering: diffing algorithms, reconciler internals.
// 199 - Template Engines: Handlebars, Mustache, EJS for server-side rendering.
// 200 - JSX vs Hyperscript vs Template Syntax: differences across frameworks.

// 🚀 BUILDING PRODUCTION-READY JS APPS
// 201 - Logging Strategies: console vs dedicated logger (winston, pino) for Node.js.
// 202 - Automated Testing Strategy: unit tests, integration tests, E2E tests balance.
// 203 - Feature Flags Implementation: Rollout strategies in JavaScript apps.
// 204 - Progressive Enhancement vs Graceful Degradation: coding for compatibility.
// 205 - Accessibility (a11y) in JS apps: ARIA roles, keyboard navigation, screen readers.

// 🏅 CAREER & COMMUNITY
// 206 - Contributing to Open Source JS Projects: finding issues, pull request etiquette.
// 207 - Following ECMAScript Proposals: tracking TC39 meetings, reading proposal documents.
// 208 - Staying Up-to-Date: subscribing to newsletters (JavaScript Weekly, ESNext News), blogs (2ality, MDN).
// 209 - Performance Budgets: setting limits for bundle size, load time, runtime performance.
// 210 - Writing Technical Documentation: Markdown best practices, API docs with JSDoc.

// – END OF JAVASCRIPT SYLLABUS –  


