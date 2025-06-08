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