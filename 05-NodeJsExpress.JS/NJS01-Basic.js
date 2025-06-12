// 📘 BASICS & ENVIRONMENT SETUP
// 01 - What is Node.js and why use it?
// 02 - Node.js vs Browser JavaScript: runtime differences
// 03 - Installing Node.js and using nvm/n for version management
// 04 - Node REPL: interactive environment, basic commands
// 05 - Creating and running .js files with node
// 06 - Understanding package.json: name, version, scripts, dependencies, devDependencies
// 07 - npm vs yarn vs pnpm: package managers comparison
// 08 - npm init / yarn init: creating a new project
// 09 - Using semantic versioning (semver) in package.json
// 10 - npm scripts: defining start, build, test, lint tasks

// 🔤 CORE CONCEPTS & MODULE SYSTEM
// 11 - CommonJS modules: require, module.exports, exports aliasing
// 12 - ES Modules (ESM) in Node.js: import, export, "type": "module" in package.json
// 13 - __dirname and __filename in CommonJS vs import.meta.url in ESM
// 14 - Path module: path.join, path.resolve, path.basename, path.dirname, path.extname
// 15 - Understanding the Node.js module resolution algorithm
// 16 - Requiring JSON and native modules
// 17 - Built-in globals: process, console, Buffer, setImmediate, setTimeout, clearTimeout

// 📦 NPM & DEPENDENCY MANAGEMENT
// 18 - Installing packages globally vs locally
// 19 - Managing devDependencies vs dependencies
// 20 - npm install, npm update, npm uninstall
// 21 - Lock files: package-lock.json, yarn.lock – purpose and regeneration
// 22 - Semantic-release and automated versioning
// 23 - Creating and publishing your own npm package
// 24 - Scoped packages (@scope/package) and private registries
// 25 - npm scripts advanced: chaining, cross-env, environment-variable usage

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 01 – What is Node.js and why use it?
//
// Node.js is an open-source, cross-platform JavaScript runtime built on Chrome’s V8 engine.
// It enables JavaScript to run outside the browser, ideal for servers, CLI tools, and desktop apps.
//
// Key Features:
// • Event-driven, non-blocking I/O model — handles concurrent operations efficiently.
// • Single-threaded with an event loop — simpler concurrency than threads.
// • Full OS access: filesystem, network, processes, child threads.
// • Unified JavaScript codebase for frontend and backend.
// • Vast npm ecosystem: over 1.5M packages.
//
// Why use Node.js?
// 1. Real-time apps (chat, gaming) benefit from low-latency I/O.
// 2. APIs and microservices: lightweight, fast startup.
// 3. Stream processing: efficient handling of large data via streams.
// 4. Serverless functions: minimal cold-start overhead.
// 5. Full-stack JS: code sharing between client and server.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Quick REPL Check
console.log(process.version);
console.log(Object.keys(process));
//
// ——————————————————————————————————————————————————————————————
// Example 2: Basic HTTP Server
const http = require('http');
const PORT = 3000;
http.createServer((req, res) => {
  if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About page');
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js!</h1>');
  }
}).listen(PORT, () => {
  console.log(`✔ Server running at http://localhost:${PORT}`);
});
//
// ——————————————————————————————————————————————————————————————
// Example 3: Non-Blocking vs Blocking File Read
const fs = require('fs');
// Non-blocking (async)
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) console.error(err);
  else console.log('Async read:', data);
});
console.log('After async read');
// Blocking (sync)
try {
  const dataSync = fs.readFileSync('example.txt', 'utf8');
  console.log('Sync read:', dataSync);
} catch (err) {
  console.error(err);
}
//
// ——————————————————————————————————————————————————————————————
// Example 4: EventEmitter Usage
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});
emitter.emit('greet', 'Alice');
//
// ——————————————————————————————————————————————————————————————
// Example 5: Timers and Event Loop
setTimeout(() => console.log('Timeout (0ms)'), 0);
setImmediate(() => console.log('Immediate'));
process.nextTick(() => console.log('Next tick'));
//
// ——————————————————————————————————————————————————————————————
// Example 6: Streams (Readable & Writable)
const { PassThrough } = require('stream');
const stream = new PassThrough();
stream.on('data', (chunk) => {
  console.log('Stream chunk:', chunk.toString());
});
stream.write('First chunk\n');
stream.end('Last chunk');
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Experiment with each example: modify, extend, and observe behavior.
// • Install an npm package (e.g., “chalk”) and colorize console output.
// • Explore additional core modules (os, path, crypto) in the REPL.
// • Build a small CLI tool using process.argv and fs operations.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 02 – Node.js vs Browser JavaScript: runtime differences
//
// Although both environments execute JavaScript, they expose different globals,
// module systems, I/O APIs, and timing functions. Knowing what’s available where
// is crucial when writing isomorphic or environment-specific code.
//
// ——————————————————————————————————————————————————————————————
// Global Object Detection
// ——————————————————————————————————————————————————————————————
// Node.js exposes `global`, `process`, `Buffer`, `__dirname`, `__filename`.
// Browsers expose `window`, `document`, `navigator`, `localStorage`.
// Use feature checks to branch behavior:
//
// Node.js code:
console.log('Is Node:', typeof process !== 'undefined' && process.release.name === 'node');
console.log('Global object:', global);

// Browser code (run in console or bundler):
// console.log('Is Browser:', typeof window !== 'undefined' && typeof window.document !== 'undefined');
// console.log('Global object:', window);

// ——————————————————————————————————————————————————————————————
// Module Systems
// ——————————————————————————————————————————————————————————————
// CommonJS (Node.js default):
const os = require('os');
console.log('Platform (CJS):', os.platform());

// ES Modules (Node.js with "type":"module" or browsers):
// import { platform } from 'os';
// console.log('Platform (ESM):', platform());

// Browser ESM example (in HTML):
// <script type="module">
//   import { greet } from './utils.js';
//   console.log(greet('World'));
// </script>

// ——————————————————————————————————————————————————————————————
// I/O & Built-in APIs
// ——————————————————————————————————————————————————————————————
// Node.js can access filesystem, TCP sockets, crypto, child processes.
// Browsers can fetch over HTTP, manipulate the DOM, use WebSockets.
//
// File read in Node.js:
const fs = require('fs');
fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Read self source (first 50 chars):', data.slice(0, 50).replace(/\n/g, ' '));
});

// Fetch in Browser (no fs):
// fetch('/data.json')
//   .then(res => res.json())
//   .then(data => console.log('Fetched JSON:', data));

// ——————————————————————————————————————————————————————————————
// Timers & Event Loop Variations
// ——————————————————————————————————————————————————————————————
// Node.js adds `setImmediate()` and `process.nextTick()`.
// Browsers add `requestAnimationFrame()`.
//
// Node.js timing:
setTimeout(() => console.log('Node setTimeout'), 0);
setImmediate(() => console.log('Node setImmediate'));
process.nextTick(() => console.log('Node nextTick'));

// Browser timing example:
// setTimeout(() => console.log('Browser setTimeout'), 0);
// requestAnimationFrame(() => console.log('Browser requestAnimationFrame'));

// ——————————————————————————————————————————————————————————————
// Environment Variables & Configuration
// ——————————————————————————————————————————————————————————————
// Node.js can read `process.env` at runtime.
// Browsers cannot access environment variables directly; they must be
// injected at build time (e.g., via bundler define plugins).
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// ——————————————————————————————————————————————————————————————
// Debugging & REPL
// ——————————————————————————————————————————————————————————————
// Node.js REPL and `--inspect` flags let you debug server code.
// Browsers offer DevTools (Console, Sources, Network).
//
// Launch Node.js with:
//   node --inspect-brk script.js
//
// In Chrome:
//   chrome://inspect → Open dedicated DevTools
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Write a module that checks `typeof window` vs `typeof process` and logs environment.
// • Bundle a small ES module for the browser (e.g., with Vite), and compare import behavior.
// • Experiment with Node.js timers vs `requestAnimationFrame` in a browser demo page.
// • Explore core modules (fs, crypto, net) in the Node REPL and browser-only APIs in DevTools.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 03 – Installing Node.js and using nvm / n for version management
//
// Use a version manager to run multiple Node.js versions side-by-side.
// Two popular tools: NVM (Node Version Manager) and “n” (npm-backed).

// ——————————————————————————————————————————————————————————————
// A. Using NVM (Node Version Manager)
// ——————————————————————————————————————————————————————————————

// Install NVM (macOS/Linux):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Activate in your shell (add to ~/.bashrc or ~/.zshrc):
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Common nvm commands:
nvm install 18.17.1        # install specific version
nvm install --lts          # install latest LTS
nvm use 18                 # switch to v18.x.x
nvm alias default 18       # default Node for new shells
nvm ls                     # list installed versions
nvm ls-remote              # list all available versions
nvm uninstall 16.20.0      # remove a version

// ——————————————————————————————————————————————————————————————
// B. Using “n” (npm-backed version manager)
// ——————————————————————————————————————————————————————————————

// Install globally:
npm install -g n

// Common n commands:
n stable      # install & use latest stable
n lts         # install & use latest LTS
n latest      # install & use latest version
n 20.0.0      # install & use specific version
n             # interactive menu to pick version
n prune       # remove old versions

// ——————————————————————————————————————————————————————————————
// C. Verifying Versions & Switching in Scripts
// ——————————————————————————————————————————————————————————————

// Check versions:
node --version
npm --version

// In CI (GitHub Actions example):
# uses: actions/setup-node@v3
with:
  node-version: '18.x'
  cache: 'npm'

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



# 04 – Node REPL: interactive environment, basic commands
#
# The Node REPL (Read–Eval–Print Loop) lets you execute JS interactively.
# Great for experimenting with language features and core modules.
#
# — Start REPL —
$ node
> 

# — Basic expressions —
> 1 + 2
> Math.max(5, 10, 2)

# — Special variables —
> _         # result of last expression
> _1, _2    # earlier results (Node ≥ 16)

# — Dot-commands —
> .help     # list all REPL commands
> .break    # abort multi-line input
> .clear    # reset context, clear variables
> .exit     # exit REPL

# — Saving & loading sessions —
> .save session.js    # save all input to session.js
> .load session.js    # load & execute session.js

# — Editor mode for multi-line input —
> .editor
// (type multiple lines, then Ctrl+D to execute)
function greet(name) {
  return `Hello, ${name}!`
}
greet("Node")
# — After Ctrl+D, the function runs —

# — Exit —
> .exit

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



// 05 – Creating and running .js files with node
//
// You write JavaScript in a .js file and execute it with the `node` CLI.
// This covers basic file execution, command-line arguments, shebang scripts,
// npm scripts, and debugging flags — everything you need to run Node programs.

// Example 1: Hello World script
// Create hello.js with the following content and run `node hello.js`:
console.log('Hello, Node.js!');

// Example 2: Command-line arguments
// Access arguments via process.argv; run `node greet.js Alice`:
const name = process.argv[2] || 'World';
console.log(`Hello, ${name}!`);

// Example 3: Shebang for executable scripts
// At the top of bin/tool.js add `#!/usr/bin/env node`, then:
//   $ chmod +x bin/tool.js
//   $ ./bin/tool.js
#!/usr/bin/env node
console.log('This script runs directly via shebang.');

// Example 4: Defining npm scripts
// In package.json:
//   "scripts": {
//     "start": "node hello.js",
//     "greet": "node greet.js",
//     "dev": "nodemon hello.js"
//   }
// Run with:
//   $ npm start
//   $ npm run greet
//   $ npm run dev

// Example 5: Debugging with flags
// Start with inspector enabled and break on first line:
//   $ node --inspect-brk hello.js
// Then open Chrome DevTools at chrome://inspect to debug.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 06 – Understanding package.json: name, version, scripts, dependencies, devDependencies
//
// package.json is the manifest for your Node.js project.
// It defines metadata (name, version, description), the entry point (main),
// custom scripts you can run via npm, and lists of installable packages:
//
// • “dependencies” are needed at runtime in production.
// • “devDependencies” are only required during development or testing.
// • “scripts” let you define shortcuts like “npm start” or “npm test”.

{
  "name": "my-app",
  "version": "1.0.0",
  "description": "Demo Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "babel src -d dist",
    "test": "jest --coverage",
    "lint": "eslint . --fix"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.4",
    "jest": "^29.6.1",
    "eslint": "^8.45.0",
    "babel-cli": "^6.26.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "license": "MIT"
}


# Example commands affecting package.json:

# Install a production dependency (adds to "dependencies"):
npm install express

# Install a development-only tool (adds to "devDependencies"):
npm install --save-dev jest

# Remove a dependency:
npm uninstall mongoose

# Bump version according to SemVer:
npm version patch    # 1.0.0 → 1.0.1
npm version minor    # 1.0.1 → 1.1.0
npm version major    # 1.1.0 → 2.0.0

# Run defined scripts:
npm start            # node index.js
npm run dev          # nodemon index.js
npm test             # jest --coverage
npm run lint         # eslint . --fix



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 07 – npm vs Yarn vs pnpm: package managers comparison
//
// All three tools install and manage project dependencies, but they differ in:
// • Performance: parallel downloads (Yarn), content-addressable store (pnpm)  
// • Disk usage: hoisted node_modules (npm/Yarn) vs symlinks to global store (pnpm)  
// • Lockfiles: package-lock.json vs yarn.lock vs pnpm-lock.yaml  
// • Workspace support: built-in workspaces (npm v7+, Yarn, pnpm)  
// • Security auditing & CLI syntax variations

// Install the package managers globally:
npm install -g npm
npm install -g yarn
npm install -g pnpm

// Initialize a new project:
npm init
npm init -y
yarn init
yarn init -y
pnpm init
pnpm init -y

// Add a runtime dependency:
npm install lodash
yarn add lodash
pnpm add lodash

// Add a development-only dependency:
npm install --save-dev jest
yarn add --dev jest
pnpm add -D jest

// Remove a dependency:
npm uninstall lodash
yarn remove lodash
pnpm remove lodash

// Install all dependencies from lockfile:
npm install
yarn
pnpm install

// Run security audits:
npm audit
npm audit fix
yarn audit
yarn audit --fix
pnpm audit
pnpm audit --fix

// Workspace (monorepo) setup in package.json:
// {
//   "private": true,
//   "workspaces": ["packages/*"]
// }
// npm workspaces install
// yarn workspaces focus <package>
// pnpm install

// Compare install times and disk usage:
// time npm install
// time yarn install
// time pnpm install

// Next steps:
// • Explore .npmrc, .yarnrc.yml, and pnpm-workspace.yaml for advanced config.  
// • Benchmark install performance and storage savings across managers.  

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


# 08 – npm init / yarn init: creating a new project
# Create a package.json interactively with npm
npm init
# Quickly generate with defaults:
npm init -y

# Initialize with Yarn interactively
yarn init
# Generate with defaults (license defaults to MIT):
yarn init -y

# Customize npm defaults via .npmrc:
# init-author-name=Your Name
# init-license=MIT
# init-version=0.2.0

# Scope and private flags example:
npm init --scope=@myorg --private
yarn init --scope @myorg --private

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 09 – Using Semantic Versioning (SemVer) in package.json
//
// SemVer uses MAJOR.MINOR.PATCH to convey compatibility:
// • MAJOR: breaking API changes  
// • MINOR: backward-compatible new features  
// • PATCH: backward-compatible bug fixes  
//
// Version ranges in dependencies:
// • "^1.2.3" → ≥1.2.3 <2.0.0  (allows minor & patch)  
// • "~1.2.3" → ≥1.2.3 <1.3.0  (allows patch only)  
// • "1.2.x" → ≥1.2.0 <1.3.0  
// • ">=1.2.3 <2.0.0" explicit range  
//
// Pre-releases & metadata:
// • "1.3.0-alpha.1" for prerelease  
// • "1.3.0+build.2025" build metadata (ignored in precedence)  
//
// Bumping versions via CLI updates package.json and creates a git tag.

const packageJson = {
  "name": "my-app",
  "version": "1.2.3",
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "~4.17.21",
    "chalk": ">=2.0.0 <3.0.0"
  }
};

const versions = {
  caret: "^1.2.3",
  tilde: "~1.2.3",
  wildcard: "1.2.x",
  range: ">=1.2.3 <2.0.0"
};

const { execSync } = require('child_process');

// Bump patch: 1.2.3 → 1.2.4
execSync('npm version patch', { stdio: 'inherit' });

// Bump minor: 1.2.4 → 1.3.0
execSync('npm version minor', { stdio: 'inherit' });

// Bump major: 1.3.0 → 2.0.0
execSync('npm version major', { stdio: 'inherit' });

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 10 – npm scripts: defining start, build, test, lint tasks
//
// • Define shortcuts for common tasks in your package.json under “scripts”.
// • Invoke them with `npm run <script>` (or `npm start` / `npm test`).
// • Use “pre” and “post” hooks to run tasks before/after named scripts.
// • Chain commands with `&&` and set env vars (use cross-env for Windows).
// • Integrate linting, testing, building, and dev servers into your workflow.
//
// Next Steps:
// • Add scripts for formatting (Prettier), cleaning (rimraf), and docs (jsdoc).
// • Explore npm-run-all to run scripts in parallel or sequence.
// • Hook scripts into CI pipelines (GitHub Actions, GitLab CI).

"scripts": {
  "start": "node index.js",
  "dev": "nodemon src/index.js --watch src",
  "build": "npm run lint && babel src -d dist",
  "lint": "eslint src --ext .js,.jsx --fix",
  "test": "jest --verbose",
  "pretest": "npm run lint",
  "coverage": "jest --coverage --coverageReporters=text",
  "debug": "node --inspect-brk src/index.js",
  "prepare": "husky install"
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// 11 – CommonJS modules: require(), module.exports, exports aliasing
//
// Node.js uses CommonJS by default:
//  • require() to import modules
//  • module.exports to export a single value or object
//  • exports.<name> to export multiple named values
//  • exports is an alias for module.exports; reassigning exports breaks the link

// math.js
function add(a, b) {
  return a + b;
}
function mul(a, b) {
  return a * b;
}
module.exports = { add, mul };

// greet.js
exports.greet = function (name) {
  return `Hello, ${name}!`;
};
exports.farewell = function (name) {
  return `Goodbye, ${name}!`;
};

// main.js
const math = require('./math');
const { greet, farewell } = require('./greet');

console.log('2 + 3 =', math.add(2, 3));
console.log(greet('Alice'));
console.log(farewell('Bob'));

// Exports vs module.exports caution:
// Wrong: reassigning exports directly (e.g. exports = {...}) will not change module.exports.
// Always replace all exports via module.exports when exporting a new object.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 12 – ES Modules (ESM) in Node.js: import, export, "type": "module" in package.json
//
// Node.js supports ECMAScript Modules with .mjs files or by setting "type": "module".
// ESM uses static import/export syntax, enables top-level await, and aligns with browser modules.
//
// Enable ESM in your project by adding to package.json:
// {
//   "type": "module"
// }
//
// Without that, use the .mjs extension for module files.

// Example 1: Named exports (utils.js)
export function greet(name) {
  return `Hello, ${name}!`;
}
export const PI = 3.14159;

// Example 2: Default export (math.js)
export default function square(x) {
  return x * x;
}

// Example 3: Importing modules (main.js)
import square from './math.js';
import { greet, PI } from './utils.js';

console.log(greet('World'));
console.log('PI:', PI);
console.log('4 squared is', square(4));

// Example 4: Import everything as a namespace
import * as utils from './utils.js';

console.log(utils.greet('Alice'));

// Example 5: Top-level await (Node v14.8.0+)
const response = await fetch('https://api.github.com/repos/nodejs/node');
const repo = await response.json();
console.log('Node.js repo description:', repo.description);

// Example 6: Walking file paths in ESM (no __dirname)
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', __dirname);

// Example 7: Dynamic imports
const mod = await import('./utils.js');
console.log('Dynamic greet:', mod.greet('Dynamic Import'));

// Example 8: Using .mjs without package.json
// Rename your files to .mjs and run with:
//   node yourModule.mjs

// Next Steps:
// • Migrate CommonJS (require/module.exports) to ESM syntax.
// • Experiment with dynamic import() in async functions.
// • Use top-level await in scripts or Node REPL with --experimental-repl-await.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 13 – __dirname and __filename in CommonJS vs import.meta.url in ESM
//
// CommonJS:
// • __dirname  → absolute path of the directory containing the current module file
// • __filename → absolute path of the current module file
// • Available by default in every .js file under CommonJS
//
// ESM:
// • import.meta.url → file:// URL of the current module
// • To get __filename and __dirname equivalents:
//     import { fileURLToPath } from 'url';
//     import path from 'path';
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname  = path.dirname(__filename);
//
// ——————————————————————————————————————————————————————————————
// Example 1: CommonJS __dirname & __filename
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// Resolve a JSON file relative to this module
const path = require('path');
const data = require(path.join(__dirname, 'data.json'));
console.log('Loaded data (CommonJS):', data);

// ——————————————————————————————————————————————————————————————
// Example 2: ESM import.meta.url → __dirname & __filename
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

console.log('__dirname (ESM):', __dirname);
console.log('__filename (ESM):', __filename);

// Read JSON file relative to this module in ESM
import fs from 'fs/promises';
const filePath = path.join(__dirname, 'data.json');
const jsonData = JSON.parse(await fs.readFile(filePath, 'utf8'));
console.log('Loaded data (ESM):', jsonData);

// ——————————————————————————————————————————————————————————————
// Example 3: Using __dirname for static file serving in Express (CommonJS)
import express from 'express'; // or const express = require('express');
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.listen(3000, () => console.log(`Server running, serving /public at ${__dirname}/public`));

// ——————————————————————————————————————————————————————————————
// Example 4: Dynamic import path in ESM
const modulePath = path.join(__dirname, 'utils.mjs');
const utils = await import(`file://${modulePath}`);
console.log('Dynamically imported utils:', utils);

// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Practice requiring and importing files relative to module location.
// • Compare behavior when bundling for browser vs running in Node.
// • Use these patterns to build CLI tools or servers that load config files relative to their modules.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 14 – Path module: path.join, path.resolve, path.basename, path.dirname, path.extname
//
// Node’s built-in path module provides utilities for working with file and directory paths.
// Use it to build cross-platform file paths and extract components.
//
// Key methods:
// • path.join(...paths)    – Joins segments, normalizes separators.
// • path.resolve(...paths) – Resolves to an absolute path, processing “.” and “..”.
// • path.basename(p, ext)  – Returns the last portion of a path, optionally stripping an extension.
// • path.dirname(p)        – Returns the directory name of a path.
// • path.extname(p)        – Returns the extension of the path, from the last “.” to end.
//
// ——————————————————————————————————————————————————————————————
// Import the module
const path = require('path');

// — path.join examples —
// Joins segments and normalizes:
console.log(path.join('foo', 'bar', 'baz/asdf', 'quux', '..'));        // 'foo/bar/baz/asdf'
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));      // '/foo/bar/baz/asdf'
// Removes redundant separators:
console.log(path.join('foo//', 'bar', 'baz'));                        // 'foo/bar/baz'

// — path.resolve examples —
// Resolves to absolute path from rightmost absolute or current cwd:
console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')); // '/tmp/subfile'
// Without any absolute segment, resolves against cwd:
console.log(path.resolve('src', 'utils.js'));                           // e.g. '/Users/you/project/src/utils.js'

// — path.basename examples —
// Last part of a path:
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));             // 'quux.html'
// Stripping extension:
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));    // 'quux'

// — path.dirname examples —
// Directory name portion:
console.log(path.dirname('/foo/bar/baz/asdf/quux'));                   // '/foo/bar/baz/asdf'
console.log(path.dirname('C:\\temp\\myfile.html'));                    // 'C:\\temp'

// — path.extname examples —
// File extension portion:
console.log(path.extname('index.html'));                               // '.html'
console.log(path.extname('archive.tar.gz'));                           // '.gz'
console.log(path.extname('README'));                                   // ''

// — Combined usage —
// Construct a full path then extract its parts:
const fullPath = path.join(__dirname, 'data', 'config.json');
console.log('Full path:', fullPath);
console.log('Dir:', path.dirname(fullPath));
console.log('Base:', path.basename(fullPath));
console.log('Ext:', path.extname(fullPath));

// — Cross-platform separator —
console.log('Platform-specific sep:', path.sep);                       // '\' on Windows, '/' on POSIX

// Next steps: experiment in REPL by requiring 'path' and trying variations of join/resolve.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// 15 – Understanding the Node.js module resolution algorithm
//
// When you call require('X'), Node resolves 'X' using this algorithm:
// 1. Core Modules: if 'X' is a built-in (fs, http), return it.
// 2. File Modules: 
//    a. Try X as file: X.js, X.json, X.node.
//    b. If X is a directory: look for X/package.json "main" field, then X/index.js, X/index.json, X/index.node.
// 3. Node Modules:
//    a. Look in ./node_modules, then ../node_modules, up to filesystem root.
// 4. Directories in NODE_PATH environment variable.
// 5. If not found, throw MODULE_NOT_FOUND error.
//
// — Example: core module resolution
const fs = require('fs');

// — Example: relative file resolution (tries utils.js, utils.json, utils.node)
const utils = require('./lib/utils.js');

// — Example: directory resolution (checks lib/helpers/package.json then lib/helpers/index.js)
const helpers = require('./lib/helpers');

// — Example: package in node_modules (express must be installed)
const express = require('express');

// — Example: extension-less require (tries config.js, config.json, config.node)
const config = require('./config');

// — Example: inspecting resolution paths
console.log(require.resolve('http'));         // shows path to core module stub
console.log(require.resolve('./lib/utils'));  // absolute path to lib/utils.js
console.log(require.resolve('express'));      // absolute path in node_modules/express

// — Advanced: customizing module search paths
module.paths.unshift('/custom_modules');      // add custom directory to resolution paths

// Next Steps:
// • Create nested node_modules directories and observe which package is loaded.
// • In the REPL, inspect module.paths and experiment with require.resolve.
// • Explore the "exports" and "imports" fields in package.json (Node ≥ v12.7).

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 16 – Requiring JSON and native modules
//
// Node.js allows you to require JSON files directly, automatically parsing them into JS objects.
// It also supports loading compiled native addons (.node files) via require(), alongside built-in core modules.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Requiring JSON
const config = require('./config.json');
console.log('Config:', config);

// Example 2: JSON caching behavior
config.newKey = 'newValue';
const config2 = require('./config.json');
console.log('Same object cached:', config2 === config);

// ——————————————————————————————————————————————————————————————
// Example 3: Built-in core (native) modules
const os = require('os');
console.log('Platform:', os.platform());
console.log('CPU count:', os.cpus().length);

const crypto = require('crypto');
console.log('Random hex:', crypto.randomBytes(8).toString('hex'));

// ——————————————————————————————————————————————————————————————
// Example 4: Loading a compiled native addon (.node file)
// (Assuming you have built `myaddon.node` via N-API or NAN in build/Release)
// const myAddon = require('./build/Release/myaddon.node');
// console.log('Addon says:', myAddon.hello());

// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Create a JSON file and practice requiring it in different modules.
// • Build or install a native addon and require it in your Node script.
// • Explore core modules like fs, net, and child_process in the same way.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// 17 – Built-in Globals: process, console, Buffer, setImmediate, setTimeout, clearTimeout
//
// Node.js provides these globals without require():
// • process      – information & control of the current Node process
// • console      – logging methods: log, error, warn, table, dir, time, timeEnd
// • Buffer       – binary data handling (alloc, from, concat, slice)
// • setTimeout   – schedule a callback after a delay
// • clearTimeout – cancel a scheduled timeout
// • setImmediate – schedule a callback to run immediately after I/O events
// • clearImmediate – cancel a scheduled immediate callback
//
// process usage:
console.log('Process ID:', process.pid);
console.log('Node Version:', process.version);
if (process.argv.includes('--help')) {
  console.log('Usage: node script.js [options]');
}
process.on('exit', code => console.log('Exiting with code:', code));

// console methods:
console.log('Standard log message');
console.error('Error message example');
console.warn('Warning example');
console.table([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]);
console.time('loop');
for (let i = 0; i < 100000; i++);
console.timeEnd('loop');

// Buffer creation & manipulation:
const buf1 = Buffer.from('Hello, Node.js');
console.log('Buffer content:', buf1);
console.log('Hex representation:', buf1.toString('hex'));
const buf2 = Buffer.alloc(5);
console.log('Allocated buffer:', buf2);

// setTimeout & clearTimeout:
const timeoutId = setTimeout(() => console.log('This will not run'), 1000);
clearTimeout(timeoutId);

// setImmediate & clearImmediate:
const immediateId = setImmediate(() => console.log('This will not run either'));
clearImmediate(immediateId);

// Next Steps:
// • Experiment with process.env, process.cwd(), and other process properties.
// • Explore console.dir() for deep object inspection.
// • Use Buffer.concat(), Buffer.slice(), and buffer streams for advanced binary workflows.
// • Measure and compare execution order of setImmediate vs setTimeout in I/O-bound scripts.

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

# 18 – Installing packages globally vs locally
#
# Local installations are per-project and recorded in package.json.
# Use them for libraries your code depends on.

npm install express               # installs express locally, adds to "dependencies"
npm install --save-dev jest       # installs jest locally, adds to "devDependencies"

# You can run local binaries via npx (no global install needed):
npx jest --init                    # runs the jest binary from node_modules
npx create-react-app my-app        # runs create-react-app from node_modules

# Global installations make commands available system-wide (no package.json changes).
# Use for CLI tools you need in multiple projects.

npm install -g nodemon             # installs nodemon globally
npm install -g typescript          # installs the tsc compiler globally

# Uninstall packages
npm uninstall express               # removes local express
npm uninstall --save-dev jest       # removes local jest
npm uninstall -g nodemon            # removes global nodemon

# Inspect installed packages and paths
npm list express                    # shows local express version
npm list -g nodemon                 # shows global nodemon version
npm root                            # path to local node_modules
npm root -g                         # path to global node_modules

# Yarn equivalents:
yarn add express                    # local dependency
yarn add --dev jest                 # local devDependency
yarn global add nodemon             # global install
yarn global remove nodemon          # uninstall global

# pnpm equivalents:
pnpm add express                    # local dependency
pnpm add -D jest                    # local devDependency
pnpm add -g nodemon                 # global install
pnpm remove express                 # local uninstall

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


# Install a runtime dependency (adds to dependencies)
npm install express

# Install a development-only tool (adds to devDependencies)
npm install --save-dev jest

# Remove a runtime dependency
npm uninstall express

# Remove a dev dependency
npm uninstall --save-dev jest

# Install only production deps (skips devDependencies)
npm install --production

# List installed packages
npm list               # all deps
npm list --production  # only dependencies
npm list --depth=0     # top-level packages

# Run a local binary without global install
npx jest               # executes jest from devDependencies


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


# 20 – npm install, npm update, npm uninstall
#
# npm install:
# • Installs dependencies based on package.json, or a specific package.
# • Local by default: installs to ./node_modules and updates dependencies.
# • --save-dev (or -D): adds to devDependencies.
# • -g: installs globally.
#
npm install
npm install express
npm install lodash@4.17.21
npm install --save-dev jest
npm install -g npm

#
# npm update:
# • Updates packages to the highest version that satisfies semver in package.json.
# • Specify a package to update only that one.
# • --dry-run: simulates updates without installing.
# • -g: updates global packages.
#
npm update
npm update express
npm update --dry-run
npm update -g npm

#
# npm uninstall:
# • Removes a package from node_modules.
# • By default removes from dependencies; use --save-dev to remove from devDependencies.
# • -g: removes global package.
#
npm uninstall express
npm uninstall --save-dev jest
npm uninstall -g typescript

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


# 21 – Lock files: package-lock.json, yarn.lock – purpose and regeneration
#
# Lock files ensure deterministic installs by locking every dependency
# (and sub-dependency) to an exact version, so installs are reproducible
# across machines and CI environments. Always commit your lock file.
#
# npm uses package-lock.json; Yarn uses yarn.lock; pnpm uses pnpm-lock.yaml.
#
# Regeneration steps:
npm install
rm -rf node_modules package-lock.json
npm install

yarn install
rm -rf node_modules yarn.lock
yarn install

rm -rf node_modules pnpm-lock.yaml
pnpm install

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 22 – semantic-release and automated versioning
//
// semantic-release automates version bumps, changelog generation, Git tagging,
// and NPM publishing based on Conventional Commit messages.
// It determines MAJOR, MINOR, or PATCH from commit types (feat, fix, perf, etc.).
//
// Setup steps:
// 1. Install dev dependencies:
//    npm install --save-dev semantic-release @semantic-release/commit-analyzer \
//      @semantic-release/release-notes-generator @semantic-release/changelog \
//      @semantic-release/npm @semantic-release/git commitizen cz-conventional-changelog
//
// 2. Configure Commitizen adapter in package.json:
//    "config": {
//      "commitizen": {
//        "path": "./node_modules/cz-conventional-changelog"
//      }
//    }
//
// 3. Create a .releaserc.js file at project root:
//
// module.exports = {
//   branches: [
//     "main",
//     { name: "beta", prerelease: true }
//   ],
//   plugins: [
//     "@semantic-release/commit-analyzer",
//     "@semantic-release/release-notes-generator",
//     ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
//     "@semantic-release/npm",
//     ["@semantic-release/git", {
//       assets: ["package.json", "CHANGELOG.md"],
//       message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
//     }]
//   ]
// };
//
// 4. Add scripts to package.json:
//    "scripts": {
//      "commit": "cz",
//      "release": "semantic-release"
//    }
//
// 5. Create commits via `npm run commit` (interactive prompt).
// 6. On CI (e.g., GitHub Actions), run `npm run release` after successful tests.
//    semantic-release will:
//      • Analyze commits since last release
//      • Bump package.json version
//      • Update CHANGELOG.md
//      • Create Git tag and GitHub/GitLab release
//      • Publish to npm (if configured)
//
// Example CI step (GitHub Actions):
// - name: Release
//   run: npm run release
//   env:
//     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
//     NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


# 23 – Creating and publishing your own npm package
#
# Follow these steps to build, version, and publish a package to the npm registry.

# 1. Create a new folder for your package and enter it
mkdir my-package
cd my-package

# 2. Initialize package.json with defaults (you’ll edit metadata next)
npm init -y

# 3. Edit package.json fields (open in your editor):
#    "name": "your-unique-package-name"   ← must be unique on npm
#    "version": "1.0.0"                   ← start at 1.0.0
#    "description": "A brief description"
#    "main": "index.js"                   ← entry point of your module
#    "keywords": ["utility","example"]
#    "author": "Your Name <you@example.com>"
#    "license": "MIT"
#    "repository": {
#      "type": "git",
#      "url": "https://github.com/you/your-repo.git"
#    }

# 4. Create your module entry file (index.js)
cat > index.js << 'EOF'
// Exports a function that greets a user by name
module.exports = function greet(name) {
  return `Hello, ${name}!`;
};
EOF

# 5. Add a README.md describing usage
cat > README.md << 'EOF'
# your-unique-package-name

A simple greeting utility.

## Install

\`\`\`bash
npm install your-unique-package-name
\`\`\`

## Usage

\`\`\`js
import greet from 'your-unique-package-name';
console.log(greet('World')); // Hello, World!
\`\`\`
EOF

# 6. Test locally before publishing
node -e "console.log(require('./index.js')('Test'))"  # should print “Hello, Test!”

# 7. Log in to npm registry (first time only)
npm login
# Enter your npm username, password, and email when prompted

# 8. Publish your package
npm publish --access public

# 9. Update and republish after changes:
#    – Bump version in package.json manually or via:
npm version patch     # 1.0.0 → 1.0.1
#    – Publish new version
npm publish

# 10. Deleting a version (if needed):
# npm deprecate your-unique-package-name@"<1.0.0" "Deprecated due to bug"

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 24 – Scoped packages (@scope/package) and private registries
//
// Scoped packages:
// • Format: @scope/package-name (e.g., @myorg/utils)
// • Allow grouping related packages under an organization or namespace
//
// Installation from public registry:
npm install @myorg/utils

// Usage in code:
const utils = require('@myorg/utils');
console.log(utils);

// Publishing a public scoped package:
// • Must use --access public for scoped packages
npm publish --access public

// Private registries:
// • Host internal packages securely (e.g., Verdaccio, Nexus, GitHub Packages)
// • Configure per-scope registry in .npmrc

// .npmrc (project root):
// @myorg:registry=https://npm.mycompany.com/
// //npm.mycompany.com/:_authToken=${NPM_TOKEN}

// Login to private registry:
npm login --registry=https://npm.mycompany.com/ --scope=@myorg

// Publish to private registry (restricted access):
npm publish --access restricted

// Reset to default npm registry:
npm set registry https://registry.npmjs.org/

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 25 – npm scripts advanced: chaining, cross-env, environment-variable usage
//
// • Chaining commands:
//   – Use && to run one after another (fails if any command errors).
//   – Use || to run fallback commands on failure.
// • cross-env:
//   – Ensures setting env vars works on Windows, macOS, Linux.
//   – Syntax: cross-env VAR=value command
// • Accessing environment variables in scripts:
//   – In shell commands: $VAR (Unix) or %VAR% (Windows, but cross-env handles this).
//   – In Node code: process.env.VAR.
// • Special npm vars:
//   – npm_lifecycle_event: name of the script being run.
//   – npm_package_version: version from package.json.
// • Pre/post hooks:
//   – Define “pre<task>” or “post<task>” and npm runs them automatically.
// • Parallel scripts:
//   – Use npm-run-all (install with npm install --save-dev npm-run-all):
//       npm-run-all --parallel lint test
//   – Or pnpm/npm7+ can run “npm run lint & npm run test”.

"scripts": {
  "lint": "eslint src --ext .js,.jsx",
  "test": "jest",
  "prebuild": "npm run lint",                                          
  "build": "tsc -p tsconfig.json",                                      
  "postbuild": "node scripts/generate-docs.js",                        
  "start": "node dist/index.js",
  "dev": "cross-env NODE_ENV=development nodemon src/index.ts --exec ts-node",
  "start:prod": "cross-env NODE_ENV=production pm2 start dist/index.js --name my-app",
  "clean": "rimraf dist",                                               
  "prepare": "npm run clean && npm run build",                          
  "deploy": "npm run prepare && cross-env TARGET=$TARGET npm run deploy:push",
  "deploy:push": "echo Deploying version $npm_package_version to $TARGET",
  "check-env": "node -e \"console.log('Running', process.env.npm_lifecycle_event, 'in', process.env.NODE_ENV, 'mode')\"",
  "parallel": "npm-run-all --parallel lint test"                       
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////























// 📘 BASICS & ENVIRONMENT SETUP
// 01 - What is Node.js and why use it?
// 02 - Node.js vs Browser JavaScript: runtime differences
// 03 - Installing Node.js and using nvm/n for version management
// 04 - Node REPL: interactive environment, basic commands
// 05 - Creating and running .js files with node
// 06 - Understanding package.json: name, version, scripts, dependencies, devDependencies
// 07 - npm vs yarn vs pnpm: package managers comparison
// 08 - npm init / yarn init: creating a new project
// 09 - Using semantic versioning (semver) in package.json
// 10 - npm scripts: defining start, build, test, lint tasks


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 01 – What is Node.js and why use it?
//
// Node.js is an open-source, cross-platform JavaScript runtime built on Chrome’s V8 engine.
// It allows you to run JS code on the server (outside the browser).
//
// Key Characteristics:
//  • Event-driven & non-blocking I/O: handles many concurrent connections without blocking threads.
//  • Single-threaded with an event loop: simplifies concurrency model.
//  • Uses Google’s V8 engine for fast JS execution.
//  • Rich ecosystem via npm (Node Package Manager).
//
// Why use Node.js?
//  • Full-stack JavaScript: same language on client and server.
//  • Ideal for real-time apps (chat, gaming, collaborative tools).
//  • Great for I/O-bound workloads (APIs, streaming, file uploads).
//  • Lightweight microservices and serverless functions.
//  • Massive package ecosystem (over 1.5M packages on npm).
//
// ——————————————————————————————————————————————————————————————
// Example 1: Interactive REPL
// ——————————————————————————————————————————————————————————————
//
// In your terminal, run:
//   $ node
// You’ll see a prompt (`>`) where you can execute JS immediately:
//
//   > console.log("Hello from Node REPL!");
//   Hello from Node REPL!
//   > 2 + 3
//   5
//
// Use REPL to experiment with core modules and language features.
//
// ——————————————————————————————————————————————————————————————
// Example 2: Hello World HTTP Server
// ——————————————————————————————————————————————————————————————
//
// Save as server.js and run with `node server.js`.
// This demonstrates non-blocking request handling.
//
const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
  // req.url, req.method available here
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World from Node.js!\n');
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});

// ——————————————————————————————————————————————————————————————
// Example 3: Non-Blocking File Read
// ——————————————————————————————————————————————————————————————
//
// Demonstrates Node’s async I/O model using the fs module.
//
const fs = require('fs');

console.log('Before readFile');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});

console.log('After readFile');

// Console output will be:
//   Before readFile
//   After readFile
//   File contents: <contents of example.txt>
//
// This shows that Node did not block on reading the file.
// 
// ——————————————————————————————————————————————————————————————
// Next:
// • Try installing and importing a simple npm package (e.g., “chalk”) in a script.
// • Play with the REPL: require modules, define functions, run tiny servers.



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 02 – Node.js vs Browser JavaScript: runtime differences
//
// Although both environments execute JavaScript, they expose very different globals, APIs, module systems, 
// and I/O capabilities. Understanding these differences is key when writing code that runs in one or the other.
//
// ——————————————————————————————————————————————————————————————
// Environment & Global Objects
// ——————————————————————————————————————————————————————————————
//
// Node.js:
//   • global — the top-level object
//   • process — info about the current Node process
//   • Buffer — binary data handling
//
// Browser:
//   • window — the global object in browsers
//   • document, location, navigator — DOM/BOM APIs
//   • no direct access to file system or process.
//
// Example 1: Global object differences
console.log(global === global);        // true in Node.js
// console.log(window);                // ReferenceError: window is not defined in Node.js

// In a browser console you’d see:
console.log(window === window);       // true
// console.log(global);                // undefined in browsers

// ——————————————————————————————————————————————————————————————
// Module & Script Loading
// ——————————————————————————————————————————————————————————————
//
// Node.js supports:
//   • CommonJS: require(), module.exports
//   • ES Modules: import/export with “type": "module”
//
// Browsers support:
//   • <script> tags (classic)
//   • ES Modules via <script type="module">
//
// Example 2A: CommonJS in Node.js (server.js)
const os = require('os');
console.log(os.platform());           // e.g. 'linux', 'win32'

// Example 2B: ES Modules in browser (index.html)
// <script type="module">
//   import { greet } from './utils.js';
//   greet('world');
// </script>

// ——————————————————————————————————————————————————————————————
// Built-in APIs & I/O
// ——————————————————————————————————————————————————————————————
//
// Node.js provides low-level modules: fs, net, crypto, child_process, etc.
// Browsers provide DOM, Fetch API, WebSocket, WebRTC—but no direct file or TCP socket access.
//
// Example 3A: File system in Node.js (fs module)
const fs = require('fs');
fs.readFile('./data.txt', 'utf8', (err, content) => {
  if (err) throw err;
  console.log('File loaded in Node:', content);
});

// Example 3B: Fetch in Browser (no fs available)
async function loadData() {
  const res = await fetch('/data.txt');
  const text = await res.text();
  console.log('File loaded in browser via HTTP:', text);
}
// loadData();

// ——————————————————————————————————————————————————————————————
// Timers & Event Loop Variations
// ——————————————————————————————————————————————————————————————
//
// Node.js adds setImmediate() and process.nextTick(); browser adds requestAnimationFrame().
//
// Example 4A: Node.js timers
setImmediate(() => console.log('setImmediate callback'));
process.nextTick(() => console.log('process.nextTick callback'));
setTimeout(() => console.log('setTimeout callback'), 0);

// Example 4B: Browser timer + animation
setTimeout(() => console.log('setTimeout in browser'), 0);
requestAnimationFrame(() => console.log('requestAnimationFrame in browser'));

// ——————————————————————————————————————————————————————————————
// Environment Variables & Security
// ——————————————————————————————————————————————————————————————
//
// Node.js can read environment vars via process.env.
// Browsers do not have process.env; you must bake values into your build or use runtime config.
//
// Example 5: Accessing NODE_ENV
console.log('Node environment:', process.env.NODE_ENV || 'development');
// In browser build bundles process.env is usually undefined or replaced at build time.
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
//  • Try writing a small module usable in Node.js and import it in a browser via a bundler (Webpack/Vite).
//  • Experiment with setImmediate vs requestAnimationFrame in each environment.
//  • Explore browser-only APIs (DOM manipulation) vs Node-only (fs, crypto).


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 03 – Installing Node.js and using nvm / n for version management
//
// You need a version manager to run multiple Node.js versions side-by-side.
// Two popular tools: NVM (Node Version Manager) and “n” (npm-backed).
//
// ——————————————————————————————————————————————————————————————
// A. Installing Node.js (without version manager)
// ——————————————————————————————————————————————————————————————
//
// • macOS / Windows / Linux: download installers from https://nodejs.org/
//   – LTS (recommended) vs Current features
// • Verifying install:
//     $ node --version
//     $ npm --version
//
// But to manage multiple versions, use a manager below.
//
// ——————————————————————————————————————————————————————————————
// B. Using NVM (Node Version Manager)
// ——————————————————————————————————————————————————————————————
//
// 1. Install nvm (macOS/Linux):
//    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
//    # or via Wget:
//    $ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
//
// 2. Activate in your shell (add to ~/.bashrc, ~/.zshrc):
//    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
//    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
//
// 3. Common nvm commands:
//    $ nvm install 18.17.1       // install specific version
//    $ nvm install --lts         // install latest LTS
//    $ nvm use 18                // switch to v18.x.x
//    $ nvm alias default 18      // default Node for new shells
//    $ nvm ls                    // list installed versions
//    $ nvm ls-remote             // list all available versions
//    $ nvm uninstall 16.20.0     // remove a version
//
// 4. Example session:
//    > nvm install --lts
//    Downloading and installing Node v18.17.1...
//    Now using node v18.17.1 (npm v9.6.7)
//    > node --version
//    v18.17.1
//    > nvm use 16
//    Now using node v16.20.2 (npm v8.19.4)
//
// 5. Windows users: use nvm-windows (different project):
//    • https://github.com/coreybutler/nvm-windows
//    • Commands: nvm install 18.17.1, nvm use 18.17.1, nvm list
//
// ——————————————————————————————————————————————————————————————
// C. Using “n” (npm-backed version manager)
// ——————————————————————————————————————————————————————————————
//
// 1. Install globally (requires sudo on Unix):
//    $ npm install -g n
//
// 2. Common n commands:
//    $ n stable      // install & use latest stable
//    $ n lts         // install & use latest LTS
//    $ n latest      // install & use latest version
//    $ n 20.0.0      // install & use specific version
//    $ n             // interactive menu to pick version
//    $ n prune       // remove old versions
//
// 3. Example session:
//    > sudo n lts
//    Installing Node v18.17.1...
//    > node --version
//    v18.17.1
//    > sudo n 16.20.2
//    Installing Node v16.20.2...
//    > node --version
//    v16.20.2
//
// 4. Where versions live:
//    – On macOS/Linux: /usr/local/n/versions/node/
//    – On Windows: “n” is less common—prefer nvm-windows.
//
// ——————————————————————————————————————————————————————————————
// D. Verifying & Switching in Scripts
// ——————————————————————————————————————————————————————————————
//
// In CI or scripts, specify the version manager:
//   # Using nvm in CI (example for GitHub Actions):
//   - name: Use Node.js
//     uses: actions/setup-node@v3
//     with:
//       node-version: '18.x'
//       cache: 'npm'
//
//   # With nvm (bash):
//   source ~/.nvm/nvm.sh
//   nvm install 18
//   nvm use 18
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Install both nvm and n; compare workflows.
// • Practice installing, switching, and removing Node versions.
// • Use “nvm alias default” to pin your everyday Node version.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 04 – Node REPL: interactive environment, basic commands
//
// The Node REPL (Read–Eval–Print Loop) is an interactive shell you can use
// to experiment with JavaScript and Node’s APIs without creating a file.
// It’s great for quick tests, prototyping snippets, and learning core modules.
//
// ——————————————————————————————————————————————————————————————
// A. Starting & Exiting the REPL
// ——————————————————————————————————————————————————————————————
//
// • Start with:
//     $ node
//   or for top-level await support (Node ≥ v10.18):
//     $ node --experimental-repl-await
//
// • Exit with:
//     > .exit
//     or press Ctrl + C twice.
//
// ——————————————————————————————————————————————————————————————
// B. Basic Usage
// ——————————————————————————————————————————————————————————————
//
// • Type any JS expression and press Enter:
//     > 1 + 2
//     3
//     > Math.max(5, 10, 2)
//     10
//
// • Built-in globals available immediately:
//     > console.log("Hello REPL")
//     Hello REPL
//     undefined         // REPL prints `undefined` for console.log
//
// • Auto-completion: press Tab to complete variable/function names.
//
// ——————————————————————————————————————————————————————————————
// C. Special REPL Variables
// ——————————————————————————————————————————————————————————————
//
// • `_`   holds the result of the last evaluated expression.
//     > 2 + 3
//     5
//     > _ * 10
//     50
//
// • `_.<property>` accesses properties of that last result.
// • Custom history variables in recent Node versions:
//     `_1`, `_2`, … hold prior results.
// • `global` is available as `global`, not `window`.
//
// ——————————————————————————————————————————————————————————————
// D. REPL Commands (Dot-Commands)
// ——————————————————————————————————————————————————————————————
//
// • `.help`     – list all REPL commands.
// • `.break`    – Abort multi-line expression (when you’re stuck).
// • `.clear`    – Reset REPL context, clear variables.
// • `.exit`     – Exit the REPL.
// • `.save <filename>` – Save all REPL input to a file.
// • `.load <filename>` – Load JS from a file into the REPL.
// • `.editor`   – Enter editor mode for multi-line input.
//
// Example session:
//
//  $ node
//  > .help
//  Commands:
//    .break — Sometimes you get stuck, this gets you out
//    .clear — Break, and also clear the context
//    .exit — Exit the REPL
//    .help — Show repl commands
//    .load — Load JS from a file into the REPL
//    .save — Save all evaluated commands in this session to a file
//    .editor — Enter editor mode
//
//  > const a = { x: 1, y: 2 };
//  undefined
//  > a.x + a.y
//  3
//  > _ * 5
//  15
//  > .save session1.js
//  // All input saved to session1.js
//  > .exit
//
// ——————————————————————————————————————————————————————————————
// E. Editor Mode for Multi-Line Input
// ——————————————————————————————————————————————————————————————
//
// • Enter with `.editor`, type/paste multiple lines, then Ctrl+D to execute.
//   > .editor
//   // Entering editor mode (ctrl+D to finish, ctrl+C to cancel)
//   function greet(name) {
//     return `Hello, ${name}!`
//   }
//   greet("Node");
//   ^D
//   'Hello, Node!'
//
// ——————————————————————————————————————————————————————————————
// F. Loading and Saving Work
// ——————————————————————————————————————————————————————————————
//
// • `.save mySession.js` writes everything you’ve typed so far.
// • `.load mySession.js` replays that file in the current REPL.
// • Useful for prototyping modules before moving into .js files.
//
// ——————————————————————————————————————————————————————————————
// G. Advanced: Custom REPL Server
// ——————————————————————————————————————————————————————————————
//
// You can embed a REPL in your own script to expose application context:
//
//   const repl = require('repl');
//   const server = repl.start({ prompt: 'app > ' });
//   server.context.db = require('./db');    // inject your DB module
//   server.context.utils = require('./utils');
//
// Launch with `node myscript.js` and you’ll get an `app > ` prompt
// where you can interact with your app’s objects.
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
//  • Experiment with `.load` and `.save` to build up snippets.
//  • Try using the REPL to explore core modules: `require('fs')`, `require('http')`.
//  • Play with top-level `await` if your Node version supports it.
//  • Use REPL for quick debugging and prototyping before writing full scripts.


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 05 – Creating and running .js files with node
//
// You can write any JavaScript in a file ending with .js and execute it with the Node.js CLI.
// This topic covers: creating files, running them directly, using arguments, npm scripts, shebangs,
// and debugging flags — so you can build and run Node programs like real projects.
//
// ——————————————————————————————————————————————————————————————
// A. Creating a JS file
// ——————————————————————————————————————————————————————————————
//
// 1. Create a file named hello.js in your project folder:
// 
//    // hello.js
//    console.log('Hello, Node.js!');
//
// 2. Save the file.
//
// ——————————————————————————————————————————————————————————————
// B. Running with Node
// ——————————————————————————————————————————————————————————————
//
// • In your terminal, cd into the folder containing hello.js.
// • Run:
//     $ node hello.js
// • Output:
//     Hello, Node.js!
//
// Node reads the file, executes top-to-bottom, and prints to stdout.
//
// ——————————————————————————————————————————————————————————————
// C. Passing Command-Line Arguments
// ——————————————————————————————————————————————————————————————
//
// 1. Create greet.js to accept a name argument:
//
//    // greet.js
//    const name = process.argv[2] || 'World';
//    console.log(`Hello, ${name}!`);
//
// 2. Run with:
//     $ node greet.js Alice
//   Output:
//     Hello, Alice!
//
// 3. process.argv is an array:
//     [ '/path/to/node', '/path/to/greet.js', 'Alice', … ]
//
// ——————————————————————————————————————————————————————————————
// D. Using npm Scripts
// ——————————————————————————————————————————————————————————————
//
// 1. Initialize a project (if you haven’t):
//     $ npm init -y
//
// 2. In package.json, add scripts:
//
//    {
//      "name": "my-app",
//      "version": "1.0.0",
//      "scripts": {
//        "start": "node hello.js",
//        "greet": "node greet.js",
//        "dev": "nodemon hello.js"
//      }
//    }
//
// 3. Run:
//     $ npm start      # invokes `node hello.js`
//     $ npm run greet  # invokes `node greet.js`
//     $ npm run dev    # invokes nodemon for auto-reload
//
// ——————————————————————————————————————————————————————————————
// E. Shebang & Executable Scripts
// ——————————————————————————————————————————————————————————————
//
// 1. At the top of your script, add a shebang line:
// 
//    #!/usr/bin/env node
//    // bin/tool.js
//    console.log('This script is runnable directly!');
//
// 2. Make it executable:
//     $ chmod +x bin/tool.js
//
// 3. Run directly:
//     $ ./bin/tool.js
//
// Node will be invoked via the shebang, no need for “node ” prefix.
//
// ——————————————————————————————————————————————————————————————
// F. Debugging with Flags
// ——————————————————————————————————————————————————————————————
//
// • Start your file in debug mode:
//     $ node --inspect hello.js
// • In Chrome, go to chrome://inspect ➔ “Open dedicated DevTools for Node”.
//
// • Other useful flags:
//     --inspect-brk    # break on first line
//     --experimental-repl-await  # REPL top-level await
//     --trace-warnings # show warnings on console
//
// ——————————————————————————————————————————————————————————————
// G. Modular Files Example
// ——————————————————————————————————————————————————————————————
//
// 1. Create math.js:
//    // math.js
//    function add(a, b) { return a + b; }
//    function mul(a, b) { return a * b; }
//    module.exports = { add, mul };
//
// 2. Create app.js:
//    // app.js
//    const { add, mul } = require('./math');
//    console.log('2 + 3 =', add(2, 3));
//    console.log('4 × 5 =', mul(4, 5));
//
// 3. Run:
//     $ node app.js
//
// ——————————————————————————————————————————————————————————————
// Next:
// • Create and run your own scripts using these patterns.
// • Experiment with process.argv, npm scripts, and shebang executables.
// • Try debugging with --inspect and breakpoints in VSCode.


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 06 – Understanding package.json: name, version, scripts, dependencies, devDependencies
//
// Every Node.js project uses a package.json file to describe metadata, manage dependencies,
// and define convenient scripts. Let’s break down the key fields:
//
//  {
//    "name": "my-app",               // ⚡ Project name (must be lowercase, URL-friendly)
//    "version": "1.0.0",             // ⚡ SemVer version: MAJOR.MINOR.PATCH
//    "description": "A demo app",    // ℹ️ Optional human-readable description
//    "main": "index.js",             // ⚙️ Entry point for `require('my-app')`
//    "scripts": {                    // ▶️ Custom CLI commands via `npm run <name>`
//      "start": "node index.js",     
//      "dev": "nodemon index.js",    
//      "test": "jest",               
//      "build": "babel src -d lib"   
//    },
//    "dependencies": {               // 📦 Runtime packages required in production
//      "express": "^4.18.2",
//      "mongoose": "^7.5.0"
//    },
//    "devDependencies": {            // 🛠️ Packages only needed during development/testing
//      "jest": "^29.6.1",
//      "nodemon": "^3.0.4",
//      "eslint": "^8.45.0"
//    },
//    "engines": {                    // 🌐 Specify supported Node versions
//      "node": ">=18.0.0"
//    }
//  }
//
// ——————————————————————————————————————————————————————————————
// A. name & version
// ——————————————————————————————————————————————————————————————
// • name: npm package identifier (no spaces, lowercase, URL-safe).
// • version: follows Semantic Versioning: 
//     – PATCH: bug fixes  
//     – MINOR: backward-compatible features  
//     – MAJOR: breaking changes  
//
// Example bumping version:
//   $ npm version patch   // 1.0.0 → 1.0.1
//   $ npm version minor   // 1.0.1 → 1.1.0
//   $ npm version major   // 1.1.0 → 2.0.0
//
// ——————————————————————————————————————————————————————————————
// B. scripts
// ——————————————————————————————————————————————————————————————
// Define shortcuts for CLI tasks:
//
//  "scripts": {
//    "start": "node index.js",                    // npm start
//    "dev": "nodemon src/server.js --watch src",  // npm run dev
//    "lint": "eslint . --fix",                    // npm run lint
//    "test": "jest --coverage",                   // npm test
//    "prepublishOnly": "npm test && npm run build"// runs before `npm publish`
//  }
//
// Usage:
//   $ npm start          // runs “start”
//   $ npm test           // runs “test” (alias for “npm run test”)
//   $ npm run lint       // runs “lint”
//   $ npm run build      // runs “build”
//
// ——————————————————————————————————————————————————————————————
// C. dependencies vs devDependencies
// ——————————————————————————————————————————————————————————————
// • dependencies: packages your code needs at runtime (production).
//   Installed with:
//     $ npm install express         // adds to “dependencies”
//
// • devDependencies: packages used for development, testing, or build steps.
//   Installed with:
//     $ npm install --save-dev jest // adds to “devDependencies”
//
// At install time:
//   $ npm install      // installs both
//   $ npm install --production  // installs only “dependencies”
//
// Example:
//  {
//    "dependencies": {
//      "axios": "^1.6.5"
//    },
//    "devDependencies": {
//      "mocha": "^10.2.0",
//      "chai": "^4.4.0"
//    }
//  }
//
// ——————————————————————————————————————————————————————————————
// D. other useful fields
// ——————————————————————————————————————————————————————————————
// • main: module entry point for consumers of your package.
// • engines: specify which Node.js versions are supported.
// • license: e.g., "MIT", "Apache-2.0".
// • repository: URL of source code (used by npm).
// • scripts hooks: “pre<task>” and “post<task>” run before/after scripts.
//
// ——————————————————————————————————————————————————————————————
// E. Practical Example
// ——————————————————————————————————————————————————————————————
//
// 1. Initialize a new project:
//     $ mkdir demo && cd demo
//     $ npm init -y
//
// 2. Install packages:
//     $ npm install express mongoose
//     $ npm install --save-dev nodemon jest eslint
//
// 3. package.json now contains:
//    “dependencies”: { "express": "...", "mongoose": "..." }
//    “devDependencies”: { "nodemon": "...", "jest": "...", "eslint": "..." }
//
// 4. Add a “dev” script:
//    "scripts": {
//      "start": "node index.js",
//      "dev": "nodemon index.js",
//      "test": "jest"
//    }
//
// 5. Run development server:
//     $ npm run dev
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
//  • Explore `npm help json` for full package.json reference.
//  • Practice adding/removing dependencies and watching package-lock.json.
//  • Use version scripts (`preversion`, `postversion`) to automate tests/builds.


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// 07 – npm vs Yarn vs pnpm: package managers comparison
//
// All three tools install, manage and lock project dependencies, but differ in
// performance, disk usage, determinism, workspace support, and CLI syntax.
//
// ——————————————————————————————————————————————————————————————
// A. Installation & Initialization
// ——————————————————————————————————————————————————————————————
//
// npm (bundled with Node.js):
//   $ node --version       // ensure Node ≥ 8.0.0
//   $ npm init             // interactive prompts
//   $ npm init -y          // defaults: creates package.json
//
// Yarn (v1 “Classic” / v2+ “Berry”):
//   $ npm install -g yarn
//   $ yarn init            // prompts
//   $ yarn init -y         // defaults
//
// pnpm:
//   $ npm install -g pnpm
//   $ pnpm init            // prompts
//   $ pnpm init -y         // defaults
//
// ——————————————————————————————————————————————————————————————
// B. Installing & Removing Packages
// ——————————————————————————————————————————————————————————————
//
// // Add a runtime dependency:
// npm:   $ npm install lodash             # creates/updates package-lock.json
// Yarn:  $ yarn add lodash                # creates/updates yarn.lock
// pnpm:  $ pnpm add lodash                # creates/updates pnpm-lock.yaml
//
// // Add a dev dependency:
// npm:   $ npm install --save-dev jest
// Yarn:  $ yarn add --dev jest
// pnpm:  $ pnpm add -D jest
//
// // Remove a dependency:
// npm:   $ npm uninstall lodash
// Yarn:  $ yarn remove lodash
// pnpm:  $ pnpm remove lodash
//
// ——————————————————————————————————————————————————————————————
// C. Lockfiles & Determinism
// ——————————————————————————————————————————————————————————————
//
// • npm → package-lock.json  
// • Yarn → yarn.lock  
// • pnpm → pnpm-lock.yaml  
//
// All lockfiles record exact versions; pnpm’s lockfile also tracks symlink layout.
//
// ——————————————————————————————————————————————————————————————
// D. node_modules Layout & Disk Usage
// ——————————————————————————————————————————————————————————————
//
// npm & Yarn v1: fully nested node_modules (flattened via hoisting).  
// Yarn v2+ (Berry): Plug’n’Play (no node_modules by default).  
// pnpm: centralized content store + per-project symlinked node_modules → saves disk space.
//
// ——————————————————————————————————————————————————————————————
// E. Performance & Caching
// ——————————————————————————————————————————————————————————————
//
// • npm: moderate speed, good caching of tarballs.  
// • Yarn v1: faster parallel downloads, offline cache.  
// • pnpm: super-fast installs via hard links to global store, deterministic layout.
//
// ——————————————————————————————————————————————————————————————
// F. Workspaces & Monorepos
// ——————————————————————————————————————————————————————————————
//
// ✅ npm (v7+), Yarn, and pnpm support workspaces.
//
// // Example package.json root for Yarn/​npm/​pnpm workspaces:
// {
//   "private": true,
//   "workspaces": ["packages/*"]
// }
//
// • npm & Yarn v1: hoist shared deps by default.  
// • Yarn v2+: no hoisting, uses PnP.  
// • pnpm: isolates dependencies per package but links shared versions.
//
// ——————————————————————————————————————————————————————————————
// G. CLI Differences & Shortcuts
// ——————————————————————————————————————————————————————————————
//
// npm shorthand:
//   $ npm i         // install all deps
//   $ npm i pkg    // install pkg
//   $ npm un pkg   // uninstall pkg
//
// Yarn shorthand:
//   $ yarn         // install all deps
//   $ yarn add pkg
//   $ yarn remove pkg
//
// pnpm shorthand:
//   $ pnpm install
//   $ pnpm add pkg
//   $ pnpm remove pkg
//
// ——————————————————————————————————————————————————————————————
// H. Security & Auditing
// ——————————————————————————————————————————————————————————————
//
// • npm: `npm audit` / `npm audit fix`  
// • Yarn: `yarn audit` / `yarn audit --fix`  
// • pnpm: `pnpm audit` / `pnpm audit --fix`
//
// ——————————————————————————————————————————————————————————————
// I. Migration Tips
// ——————————————————————————————————————————————————————————————
//
// • npm → Yarn: rename package-lock.json → yarn.lock, run `yarn`  
// • npm → pnpm: delete node_modules & lockfile, run `pnpm install`  
// • Yarn → npm: delete yarn.lock, run `npm install`  
//
// ——————————————————————————————————————————————————————————————
// J. When to Choose Which?
// ——————————————————————————————————————————————————————————————
//
// • npm: zero-install, standard for most projects.  
// • Yarn: best for offline-first or heavy monorepos (v1) / PnP (v2).  
// • pnpm: ideal for large codebases with many modules—fast, disk-efficient.
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
//  • Try each manager on a sample repo; compare install times and disk usage.
//  • Explore advanced config: .npmrc, .yarnrc.yml, pnpm-workspace.yaml.
//  • Set up a small monorepo with workspaces and share a dependency across packages.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 08 – npm init / yarn init: creating a new project
//
// When you start a new Node.js project, you need a package.json to track metadata,
// dependencies, scripts, and more. The `init` commands generate this file interactively
// (or with defaults), setting you up to install packages and define scripts.
//
// ——————————————————————————————————————————————————————————————
// A. npm init (interactive)
// ——————————————————————————————————————————————————————————————
//
// 1. In your empty project folder, run:
//     $ npm init
//
// 2. You’ll be prompted for fields (press Enter to accept default in parentheses):
//     This utility will walk you through creating a package.json file.
//     It only covers the most common items, and tries to guess sensible defaults.
//     See `npm help json` for definitive documentation on these fields.
//     Use `npm install <pkg>` afterwards to install a package and
//     save it as a dependency in your package.json.
//
//     package name: (demo) my-app
//     version: (1.0.0)  
//     description: A demo Node.js project
//     entry point: (index.js) app.js
//     test command: (npm test) mocha --reporter spec
//     git repository: (https://github.com/you/demo.git)
//     keywords: nodejs, demo
//     author: Your Name <you@example.com>
//     license: (ISC) MIT
//
// 3. After confirming “Is this OK? (yes)”, npm writes package.json:
//
//    {
//      "name": "my-app",
//      "version": "1.0.0",
//      "description": "A demo Node.js project",
//      "main": "app.js",
//      "scripts": {
//        "test": "mocha --reporter spec"
//      },
//      "repository": {
//        "type": "git",
//        "url": "git+https://github.com/you/demo.git"
//      },
//      "keywords": ["nodejs","demo"],
//      "author": "Your Name <you@example.com>",
//      "license": "MIT"
//    }
//
// ——————————————————————————————————————————————————————————————
// B. npm init -y (defaults)
// ——————————————————————————————————————————————————————————————
//
// To skip prompts and accept all defaults:
//   $ npm init -y
//
// Generates a minimal package.json:
//    {
//      "name": "demo",
//      "version": "1.0.0",
//      "description": "",
//      "main": "index.js",
//      "scripts": {
//        "test": "echo \"Error: no test specified\" && exit 1"
//      },
//      "keywords": [],
//      "author": "",
//      "license": "ISC"
//    }
//
// ——————————————————————————————————————————————————————————————
// C. Customizing defaults via .npmrc
// ——————————————————————————————————————————————————————————————
//
// You can set default values in an `.npmrc` file:
//
//   init-author-name=Your Name
//   init-license=MIT
//   init-version=0.1.0
//
// Then `npm init -y` will pick these instead of npm’s built-in defaults.
//
// ——————————————————————————————————————————————————————————————
// D. yarn init (interactive)
// ——————————————————————————————————————————————————————————————
//
// 1. Install Yarn if needed:
//     $ npm install -g yarn
//
// 2. Run in your project folder:
//     $ yarn init
//
// 3. Prompts appear similarly:
//     yarn init v1.22.19
//     question name (demo-08): my-app
//     question version (1.0.0):
//     question description: A demo Node.js project
//     question entry point (index.js): app.js
//     question repository url:
//     question author: Your Name <you@example.com>
//     question license (MIT):
//     question private: no
//
// 4. Confirms and writes package.json.
//
// ——————————————————————————————————————————————————————————————
// E. yarn init -y (defaults)
// ——————————————————————————————————————————————————————————————
//
// To accept defaults non-interactively:
//   $ yarn init -y
//
// Creates package.json with Yarn defaults (same as npm’s -y, but “license” default is MIT).
//
// ——————————————————————————————————————————————————————————————
// F. Key Differences & Flags
// ——————————————————————————————————————————————————————————————
//
// • npm’s default “license” is ISC; Yarn’s is MIT.
// • Both support `--scope=@org` and `--private` flags.
//
// Examples:
//   $ npm init --scope=@myorg --private
//   $ yarn init --private --scope @myorg
//
// • You can override any prompt non-interactively:
//   $ npm init --yes --scope=@myorg --access public
//
// ——————————————————————————————————————————————————————————————
// G. Verifying & Next Steps
// ——————————————————————————————————————————————————————————————
//
// • Open package.json and ensure fields are correct.
// • Edit “scripts” to add build, start, test commands.
// • Install dependencies to populate “dependencies” and “devDependencies”.
// • Commit package.json and your lockfile (package-lock.json or yarn.lock).
//
// Next:
//   • Add a “start” script: `"start": "node app.js"`
//   • Install Express: `npm install express` or `yarn add express`
//   • Run `npm run start` or `yarn start` to launch your app.


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 09 – Using Semantic Versioning (SemVer) in package.json
//
// SemVer is a standardized versioning scheme of the form MAJOR.MINOR.PATCH,
// designed to convey meaning about the underlying changes:
//
//   MAJOR – incompatible API changes
//   MINOR – backwards-compatible new features
//   PATCH – backwards-compatible bug fixes
//
// 1. Defining your package version
// --------------------------------
// In your package.json:
//
//   {
//     "name": "my-app",
//     "version": "1.2.3",    // MAJOR=1, MINOR=2, PATCH=3
//     …
//   }
//
// 2. Version ranges for dependencies
// -----------------------------------
// SemVer ranges let npm/yarn/​pnpm choose compatible updates:
//
//   "^1.2.3"   → ≥1.2.3 <2.0.0       (updates patch & minor)
//   "~1.2.3"   → ≥1.2.3 <1.3.0       (updates patch only)
//   "1.2.x"    → ≥1.2.0 <1.3.0
//   "1.x"      → ≥1.0.0 <2.0.0
//   ">=1.2.3 <2.0.0" // explicit range
//
// Example in package.json:
//
//   "dependencies": {
//     "express": "^4.18.2",    // will accept 4.18.3, 4.19.0 but not 5.0.0
//     "lodash": "~4.17.21",    // will accept 4.17.22 but not 4.18.0
//     "chalk": ">=2.0.0 <3.0.0"
//   }
//
// 3. Pre-releases & build metadata
// ---------------------------------
// You can tag versions for testing or metadata:
//
//   "version": "1.3.0-alpha.1"   // pre-release tag “alpha.1”
//   "version": "1.3.0+build.2025" // build metadata (ignored when resolving)
//
// 4. Bumping versions via CLI
// ----------------------------
// npm provides commands to automatically update version, commit & tag (if in git):
//
//   $ npm version patch       # 1.2.3 → 1.2.4
//   $ npm version minor       # 1.2.4 → 1.3.0
//   $ npm version major       # 1.3.0 → 2.0.0
//   $ npm version prepatch    # 2.0.0 → 2.0.1-0 (first prerelease)
//   $ npm version prerelease  # 2.0.1-0 → 2.0.1-1
//
// These commands update package.json’s “version”, create a git commit & tag “vX.Y.Z”.
//
// 5. Checking for updates
// ------------------------
// Use npm/yarn/pnpm outdated to see which dependencies can be updated
// according to your SemVer ranges:
//
//   $ npm outdated
//   Package   Current   Wanted   Latest  Location
//   express   4.18.2    4.18.3   5.0.0   my-app
//
// “Wanted” obeys your range (e.g., ^4.18.2 → 4.18.3), “Latest” is the absolute newest.
//
// 6. Best practices
// ------------------
// • Always bump MAJOR for breaking API changes.  
// • Automate version bumping & changelog generation (e.g., semantic-release).  
// • Commit and tag every release for traceability.  
// • Use narrow ranges (tilde) for maximum stability in production, wider (caret) in active dev.
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
//   • Practice editing version ranges and running “npm install” to see what gets updated.
//   • Try bumping versions with npm version and observe git commits/tags.
//   • Explore tools like semantic-release or standard-version to fully automate your release pipeline.

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// 10 – npm scripts: defining start, build, test, lint tasks
//
// npm scripts let you define custom CLI commands in your package.json.
// You invoke them with `npm run <script>` (or special aliases for “start” & “test”).
//
// ——————————————————————————————————————————————————————————————
// A. Defining scripts in package.json
// ——————————————————————————————————————————————————————————————
//
// In your package.json, add a “scripts” section:
//
// {
//   "name": "my-app",
//   "version": "1.0.0",
//   "scripts": {
//     "start": "node index.js",           // run your app
//     "build": "babel src -d dist",       // transpile ES6+ to ES5
//     "test": "jest --coverage",          // run tests with coverage
//     "lint": "eslint . --fix",           // lint & auto-fix code
//     "dev": "nodemon src/index.js",      // auto-restart on file changes
//     "prepare": "husky install"          // lifecycle hook (runs on npm install)
//   }
// }
//
// ——————————————————————————————————————————————————————————————
// B. Running scripts
// ——————————————————————————————————————————————————————————————
//
// • $ npm start      → runs the “start” script  
// • $ npm test       → runs the “test” script  
// • $ npm run build  → runs “build”  
// • $ npm run lint   → runs “lint”  
// • $ npm run dev    → runs “dev”  
//
// Note: “start” and “test” are aliases—you can omit the “run” keyword.
//
// ——————————————————————————————————————————————————————————————
// C. Lifecycle & Hook scripts
// ——————————————————————————————————————————————————————————————
//
// npm supports “pre” and “post” hooks automatically:
//   – “prebuild” runs before “build”  
//   – “posttest” runs after “test”  
//
// Example:
//
// {
//   "scripts": {
//     "pretest": "npm run lint",
//     "test": "jest",
//     "posttest": "npm run coverage-report"
//   }
// }
//
// Running `npm test` will:
//   1. run “pretest” (lint)  
//   2. run “test” (jest)  
//   3. run “posttest” (coverage-report)  
//
// Other hooks include “preinstall”, “postinstall”, “prepublishOnly”, etc.
//
// ——————————————————————————————————————————————————————————————
// D. Chaining & Environment variables
// ——————————————————————————————————————————————————————————————
//
// You can combine commands with && and use cross-platform env tools:
//
// {
//   "scripts": {
//     "build": "npm run lint && babel src -d dist",
//     "start:prod": "NODE_ENV=production node dist/index.js",
//     "start:win": "cross-env NODE_ENV=production node dist/index.js"
//   }
// }
//
// Install cross-env if you need to set env vars on Windows:
//   $ npm install --save-dev cross-env
//
// ——————————————————————————————————————————————————————————————
// E. Debugging & Verbose output
// ——————————————————————————————————————————————————————————————
//
// Add a “debug” script that runs Node with inspect flags:
//
// {
//   "scripts": {
//     "debug": "node --inspect-brk index.js"
//   }
// }
//
// Launch with `$ npm run debug` and attach your debugger (Chrome DevTools or VSCode).
//
// ——————————————————————————————————————————————————————————————
// F. Complete Example
// ——————————————————————————————————————————————————————————————
//
// {
//   "name": "example-app",
//   "version": "0.1.0",
//   "scripts": {
//     "start": "node index.js",
//     "dev": "nodemon src/index.js --watch src",
//     "build": "npm run lint && babel src -d dist",
//     "lint": "eslint src --ext .js,.jsx",
//     "test": "jest --verbose",
//     "pretest": "npm run lint",
//     "coverage-report": "jest --coverage --coverageReporters=text",
//     "debug": "node --inspect-brk src/index.js",
//     "prepare": "husky install"
//   },
//   "dependencies": { /* … */ },
//   "devDependencies": { /* … */ }
// }
//
// Run `$ npm run build` to lint + transpile, `$ npm start` to launch, `$ npm test` to lint+test.
//
// ——————————————————————————————————————————————————————————————
// Next Steps:
// • Add more scripts: “format” (Prettier), “clean” (rimraf dist), “docs” (jsdoc).  
// • Explore npm-run-all to run scripts in parallel or sequence.  
// • Automate CI tasks by invoking your npm scripts in GitHub Actions or other CI pipelines.  

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////