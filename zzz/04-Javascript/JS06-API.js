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
// 94 - Webpack fundamentals: entry, output, loaders, pllugins, mode (development vs production)
// 95 - Rollup basics: ES module bundling, tree-shaking, plugins
// 96 - Vite overview: dev server, fast HMR, build l̥optimizations
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


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/*
83 - Callback Hell and Pyramid of Doom

This note explains:
1. What callback hell (pyramid of doom) is: deeply nested callbacks.
2. Why it’s problematic: poor readability, hard error handling, difficult maintenance.
3. Example of nested callbacks.
4. Strategies to mitigate: named callbacks, Promises, async/await.
*/

// 1. Callback Hell Example
function step1(data, callback) {
  setTimeout(() => {
    console.log('Step 1:', data);
    callback(null, data + 1);
  }, 500);
}
function step2(data, callback) {
  setTimeout(() => {
    console.log('Step 2:', data);
    callback(null, data + 2);
  }, 500);
}
function step3(data, callback) {
  setTimeout(() => {
    console.log('Step 3:', data);
    callback(null, data + 3);
  }, 500);
}

step1(0, (err, res1) => {
  if (err) return console.error(err);
  step2(res1, (err, res2) => {
    if (err) return console.error(err);
    step3(res2, (err, res3) => {
      if (err) return console.error(err);
      console.log('Final result (callback hell):', res3);
    });
  });
});

// 2. Mitigation with Named Callbacks
function handleStep3(err, res3) {
  if (err) return console.error(err);
  console.log('Final result (named):', res3);
}
function handleStep2(err, res2) {
  if (err) return console.error(err);
  step3(res2, handleStep3);
}
function handleStep1(err, res1) {
  if (err) return console.error(err);
  step2(res1, handleStep2);
}
step1(0, handleStep1);

// 3. Using Promises to Flatten
function step1P(data) {
  return new Promise((resolve, reject) =>
    step1(data, (e, r) => e ? reject(e) : resolve(r))
  );
}
function step2P(data) {
  return new Promise((resolve, reject) =>
    step2(data, (e, r) => e ? reject(e) : resolve(r))
  );
}
function step3P(data) {
  return new Promise((resolve, reject) =>
    step3(data, (e, r) => e ? reject(e) : resolve(r))
  );
}

step1P(0)
  .then(step2P)
  .then(step3P)
  .then(result => console.log('Final result (Promises):', result))
  .catch(console.error);

// 4. Using async/await for Clarity
async function runSteps() {
  try {
    const r1 = await step1P(0);
    const r2 = await step2P(r1);
    const r3 = await step3P(r2);
    console.log('Final result (async/await):', r3);
  } catch (e) {
    console.error(e);
  }
}
runSteps();


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
84 - Promises Deep Dive: States, Chaining, Error Propagation

This note explains:
1. Promise states: pending, fulfilled, rejected
2. Chaining then() calls and returning values or Promises
3. Error propagation: throwing inside then() triggers catch()
4. finally(): cleanup code that always runs
5. Skipping subsequent then() after a rejection
*/

// 1. Promise States Example
const pState = new Promise((resolve, reject) => {
  console.log('Promise created: pending');
  setTimeout(() => resolve('✅ fulfilled value'), 500);
});
pState.then(value => console.log('Promise then():', value));

// 2. Chaining then() with values and Promises
Promise.resolve(1)
  .then(val => {
    console.log('first then():', val); // 1
    return val + 1;
  })
  .then(val => {
    console.log('second then():', val); // 2
    // return a new Promise to chain async work
    return new Promise(res => setTimeout(() => res(val + 1), 300));
  })
  .then(val => console.log('third then() (async):', val)); // 3

// 3. Error Propagation Example
Promise.resolve('start')
  .then(val => {
    console.log('before error:', val);
    throw new Error('🚨 something went wrong');
  })
  .then(val => console.log('this will be skipped:', val))
  .catch(err => console.error('caught error:', err.message))
  .then(() => console.log('after catch(): chain continues'));

// 4. finally() Example
Promise.reject('initial failure')
  .catch(err => console.error('catch():', err))
  .finally(() => console.log('finally(): always runs'));

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
85 - Async/Await Under the Hood: Converting Promise Chains

This note explains:
1. How a sequence of .then() calls represents a promise chain.
2. How async/await provides equivalent, more readable syntax.
3. That async/await is syntactic sugar over promise chaining.
*/

// Helper functions returning Promises
function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: `User${userId}` }), 300);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      `Post1 of User${userId}`,
      `Post2 of User${userId}`
    ]), 300);
  });
}

// 1. Promise Chain Version
fetchUser(1)
  .then(user => {
    console.log('Promise chain - user:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Promise chain - posts:', posts);
  })
  .catch(err => {
    console.error('Promise chain - error:', err);
  });

// 2. Equivalent Async/Await Version
async function showUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('Async/await - user:', user);

    const posts = await fetchPosts(user.id);
    console.log('Async/await - posts:', posts);
  } catch (err) {
    console.error('Async/await - error:', err);
  }
}

// Invoke the async function
showUserPosts(1);

/*
Under the hood:
async function showUserPosts() {
  return fetchUser(1)
    .then(user => {
      console.log('user:', user);
      return fetchPosts(user.id);
    })
    .then(posts => {
      console.log('posts:', posts);
    });
}

// async/await is simply syntactic sugar that
// rewrites the above .then()/.catch() chain into
// a sequential-looking flow with try/catch.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
86 - Fetch API: fetch, handling responses, parsing JSON, error handling

This note explains:
1. fetch(url[, options]) – send HTTP requests.
2. Checking response.ok and status codes.
3. Parsing JSON with response.json().
4. Handling network and parsing errors with catch().
5. Using async/await for cleaner syntax.
*/

// 1. Basic fetch GET request
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // 2. Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 3. Parse JSON body
    return response.json();
  })
  .then(data => {
    console.log('Fetched data (promise):', data);
  })
  .catch(error => {
    // 4. Handle network or parsing errors
    console.error('Fetch error:', error);
  });

// 5. POST request with fetch
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
})
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(created => {
    console.log('Created resource:', created);
  })
  .catch(err => console.error('POST error:', err));

// 6. Using async/await
async function getPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const post = await res.json();
    console.log('Fetched data (async/await):', post);
  } catch (err) {
    console.error('Async fetch error:', err);
  }
}
getPost(2);

/*
Best Practices:
- Always check response.ok before parsing.
- Handle both network failures and HTTP errors.
- Use try/catch with async/await for readability.
- Set appropriate headers for POST/PUT requests.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
87 - Axios Library: installation, basic GET/POST, interceptors, axios.create

This note explains:
1. Installation via npm or CDN
2. Basic GET request with axios.get()
3. Basic POST request with axios.post()
4. Using request and response interceptors
5. Creating custom axios instances with axios.create()
*/

// 1. Installation
// npm: npm install axios
// CDN: <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// 2. Basic GET request
axios.get('https://jsonplaceholder.typicode.com/posts', {
  params: { userId: 1 }
})
  .then(response => {
    console.log('GET response data:', response.data);
  })
  .catch(error => {
    console.error('GET error:', error);
  });

// 3. Basic POST request
const newPost = {
  title: 'Foo',
  body: 'Bar',
  userId: 1
};
axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
  .then(response => {
    console.log('POST response data:', response.data);
  })
  .catch(error => {
    console.error('POST error:', error);
  });

// 4. Interceptors
// Request interceptor
axios.interceptors.request.use(config => {
  console.log('Request config:', config);
  // e.g., add auth token:
  // config.headers.Authorization = 'Bearer YOUR_TOKEN';
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(response => {
  console.log('Response received:', response);
  return response;
}, error => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

// 5. Creating Custom Axios Instances
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// Use the custom instance for a GET request
apiClient.get('/users')
  .then(response => {
    console.log('apiClient GET /users:', response.data);
  })
  .catch(error => {
    console.error('apiClient error:', error);
  });

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
88 - XMLHttpRequest (legacy) for understanding browser compatibility

This note explains:
1. Creating an XMLHttpRequest object.
2. open(method, url, async) usage.
3. onreadystatechange and readyState values.
4. status codes and responseText/responseXML.
5. Sending GET and POST requests.
6. Setting request headers.
7. Aborting requests.
*/

// 1. Create XHR object (cross-browser)
function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else { // IE6 fallback
    return new ActiveXObject('Microsoft.XMLHTTP');
  }
}

// 2. GET request example
const xhrGet = createXHR();
xhrGet.onreadystatechange = function() {
  if (xhrGet.readyState === 4) {
    if (xhrGet.status === 200) {
      console.log('GET response:', xhrGet.responseText);
    } else {
      console.error('GET error status:', xhrGet.status);
    }
  }
};
xhrGet.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);
xhrGet.send();

// 3. POST request example
const xhrPost = createXHR();
xhrPost.onreadystatechange = function() {
  if (xhrPost.readyState === 4) {
    if (xhrPost.status === 201) {
      console.log('POST response:', xhrPost.responseText);
    } else {
      console.error('POST error status:', xhrPost.status);
    }
  }
};
xhrPost.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
xhrPost.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
xhrPost.send(JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }));

// 4. readyState values
// 0: UNSENT
// 1: OPENED
// 2: HEADERS_RECEIVED
// 3: LOADING
// 4: DONE

// 5. Aborting a request
const xhrAbort = createXHR();
xhrAbort.open('GET', 'https://example.com/slow', true);
xhrAbort.send();
setTimeout(() => {
  xhrAbort.abort();
  console.log('Request aborted at readyState:', xhrAbort.readyState);
}, 100);

// 6. Accessing responseXML (for XML responses)
// xhrGet.open('GET', 'data.xml', true);
// xhrGet.send();
// // xhrGet.responseXML will be a parsed XML Document

/*
Best Practices:
- Prefer fetch or Axios in modern code.
- Always check readyState === 4 and status codes.
- Set appropriate request headers before send().
- Abort or timeout long-running requests to avoid hanging.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
89 - Web APIs for Asynchronous Work: setTimeout vs requestAnimationFrame vs requestIdleCallback

This note explains:
1. setTimeout – schedule work after a specified delay.
2. requestAnimationFrame – schedule work before the next repaint.
3. requestIdleCallback – schedule low-priority work during browser idle periods.
4. Cancelling scheduled callbacks.
5. Best-practice considerations for performance and use cases.
*/

// 1. setTimeout: one-time delayed task
const timeoutId = setTimeout(() => {
  console.log('setTimeout: executed after 200ms');
}, 200);

// 2. requestAnimationFrame: sync to next repaint
let rafCount = 0;
function animate(timestamp) {
  rafCount++;
  console.log(`requestAnimationFrame tick #${rafCount} at ${timestamp.toFixed(2)}ms`);
  if (rafCount < 3) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);

// 3. requestIdleCallback: low-priority task in idle time (with fallback)
const idleCallback = window.requestIdleCallback ||
  function(cb) { return setTimeout(() => cb({ timeRemaining: () => 50 }), 1); };

const idleId = idleCallback(deadline => {
  console.log('requestIdleCallback: time remaining', deadline.timeRemaining());
});

// 4. Cancelling callbacks before they run
clearTimeout(timeoutId);
console.log('clearTimeout: canceled setTimeout callback');

const rafToCancel = requestAnimationFrame(() => console.log('This will not run'));
cancelAnimationFrame(rafToCancel);
console.log('cancelAnimationFrame: canceled animation frame');

const idleToCancel = idleCallback(() => console.log('This idle callback will not run'));
if (window.cancelIdleCallback) {
  cancelIdleCallback(idleToCancel);
} else {
  clearTimeout(idleToCancel);
}
console.log('Canceled requestIdleCallback (or its fallback)');

/*
5. Best Practices
- Use setTimeout for simple delays unrelated to rendering.
- Use requestAnimationFrame for smooth animations tied to repaint cycles.
- Use requestIdleCallback for non-urgent work when the main thread is idle.
- Always cancel unneeded timers or callbacks to avoid wasted CPU.
- Provide fallbacks for requestIdleCallback, as browser support may vary.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
90 - Event Loop, Call Stack, Message Queue, Microtasks vs Macrotasks

This note explains:
1. Call Stack – how synchronous code executes.
2. Macrotasks (Task Queue) – setTimeout, setInterval, I/O callbacks.
3. Microtasks (Microtask Queue) – Promises (then/catch/finally), queueMicrotask.
4. Execution order – all microtasks run before the next macrotask.
*/

// 1. Call Stack: synchronous execution
function first() {
  console.log('first() start');
  second();
  console.log('first() end');
}
function second() {
  console.log('second()');
}
console.log('script start');
first();
console.log('script end');

// 2. Macrotask vs Microtask ordering
setTimeout(() => console.log('setTimeout (macrotask)'), 0);

Promise.resolve()
  .then(() => console.log('promise1 (microtask)'))
  .then(() => console.log('promise2 (microtask)'));

queueMicrotask(() => console.log('queueMicrotask (microtask)'));

// 3. Expected output order:
// script start
// first() start
// second()
// first() end
// script end
// promise1 (microtask)
// promise2 (microtask)
// queueMicrotask (microtask)
// setTimeout (macrotask)

/*
Best Practices:
- Keep CPU‐intensive tasks out of the main thread to avoid blocking.
- Use Promise callbacks or queueMicrotask for work that must run immediately after sync code.
- Use setTimeout for delays and background tasks that can wait until after rendering.
- Understand that heavy microtask queues can starve rendering, so balance micro- vs macrotasks.
*/


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
91 - Debouncing and Throttling Functions for Performance

This note explains:
1. Debouncing: postpone execution until after a pause in events.
2. Throttling: limit execution to at most once per time interval.
3. Common use cases: scroll, resize, input events.
4. Implementation patterns for debounce and throttle.
5. Performance considerations and best practices.
*/

// 1. Debounce: fires callback only after events stop for `delay` ms
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage example: debounce an input handler
function handleInput(event) {
  console.log('Debounced input value:', event.target.value);
}
const debouncedInput = debounce(handleInput, 300);
document.getElementById('searchBox')?.addEventListener('input', debouncedInput);

// 2. Throttle: ensures callback runs at most once every `interval` ms
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

// Usage example: throttle a scroll handler
function handleScroll() {
  console.log('Throttled scroll position:', window.scrollY);
}
const throttledScroll = throttle(handleScroll, 200);
window.addEventListener('scroll', throttledScroll);

// 3. Performance Considerations
/*
- Debounce avoids wasted work during rapid events by delaying until idle.
- Throttle ensures regular updates without overloading the main thread.
- Choose debounce for final-value scenarios (e.g., search autocomplete).
- Choose throttle for periodic updates (e.g., infinite scroll, sticky headers).
- Always clear timers on component unmount or element removal in SPA frameworks.
*/

// 4. Advanced Variants (leading vs trailing calls)
function debounceLeadingTrailing(fn, delay, options = { leading: false, trailing: true }) {
  let timerId, lastArgs;
  return function(...args) {
    const callNow = options.leading && !timerId;
    clearTimeout(timerId);
    lastArgs = args;
    timerId = setTimeout(() => {
      if (options.trailing && lastArgs) {
        fn.apply(this, lastArgs);
      }
      timerId = null;
      lastArgs = null;
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}

function throttleAdvanced(fn, interval, options = { leading: true, trailing: true }) {
  let lastTime = 0, timerId;
  return function(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);
    if (remaining <= 0 || remaining > interval) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (options.trailing && !timerId) {
      timerId = setTimeout(() => {
        lastTime = Date.now();
        timerId = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

/*
Best Practices:
- Debounce for user-input filtering, resize end detection.
- Throttle for scroll animations, live selling tickers.
- Provide options for leading/trailing behavior as needed.
- Test on real devices to tune delays and intervals.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
92 - npm Scripts: Defining start, build, test scripts

This note explains:
1. How to define npm scripts in package.json
2. Common script names: start, build, test
3. Running scripts via npm (npm start, npm run build, npm test)
4. Chaining commands and passing arguments
5. Using pre/post hooks and composing scripts
*/

// 1. Example package.json "scripts" section
const packageJson = {
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src/",
    "pretest": "npm run lint",                                           // runs before "test"
    "build:prod": "npm run build && npm run test"                        // compose scripts
  }
};
console.log("Defined scripts:", Object.keys(packageJson.scripts));
// Output: ["start","dev","build","test","lint","pretest","build:prod"]

// 2. Running scripts in terminal
// npm start            → runs "start"
// npm run dev           → runs "dev"
// npm run build         → runs "build"
// npm test              → runs "test"
// npm run lint          → runs "lint"
// npm run build:prod    → runs "build:prod"

// 3. Passing arguments to scripts
// npm test -- --coverage      // passes "--coverage" to jest
// npm run build -- --watch    // passes "--watch" to webpack

// 4. Chaining commands manually
// In terminal:
// npm run build && npm test

// 5. Pre/Post Hooks
// "prestart": runs before "start"
// "postbuild": runs after "build"
// Example:
packageJson.scripts.prestart = "echo Preparing to start";
packageJson.scripts.postbuild = "echo Build complete";
console.log("With hooks:", packageJson.scripts.prestart, packageJson.scripts.postbuild);

// 6. Best Practices
/*
- Use "start" for production start and "dev" for development.
- Prefix scripts for clarity (e.g., build:dev, build:prod).
- Leverage pre/post hooks for setup and cleanup.
- Keep commands concise; offload complex logic to separate scripts if needed.
- Pass flags using "--" to distinguish npm args from script args.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
93 - Babel: Transpiling ES6+ to ES5, Presets, Plugins, .babelrc Configuration

This note explains:
1. Installing Babel core, CLI, presets and plugins.
2. .babelrc JSON configuration for presets and plugins.
3. CLI commands to transpile source code.
4. Example ES6+ source code.
5. Example of how Babel transpiles that code to ES5.
6. Best-practice considerations.
*/

// 1. Installation (run in terminal):
// npm install --save-dev @babel/core @babel/cli @babel/preset-env
// npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime

// 2. .babelrc Configuration:
/*
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead"
    }]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
*/

// 3. CLI Transpilation Commands:
// npx babel src --out-dir lib --copy-files
// npx babel src/index.js --out-file dist/index.js

// 4. ES6+ Example Source (src/index.js):
const arrowFunction = () => console.log(`ES6 arrow → transpiled to ES5`);
class Person {
  static species = 'Homo sapiens';
  #privateName;
  constructor(name) {
    this.#privateName = name;
  }
  greet() {
    console.log(`Hello, ${this.#privateName}`);
  }
}

// 5. Example Transpiled ES5 Output (lib/index.js):
/*
"use strict";

var arrowFunction = function arrowFunction() {
  console.log("ES6 arrow → transpiled to ES5");
};

var Person = /*#__PURE__*/function () {
  function Person(name) {
    this._Person_privateName = name;
  }
  Person.prototype.greet = function () {
    console.log("Hello, " + this._Person_privateName);
  };
  Person.species = 'Homo sapiens';
  return Person;
}();
*/

// 6. Best Practices:
/*
- Use @babel/preset-env with a browserslist config to target only needed environments.
- Prefer babel.config.js for monorepos; use .babelrc for single-package setups.
- Limit plugins to those required by your code to keep bundles small.
- Integrate Babel with build tools (webpack, Rollup) using babel-loader or rollup-plugin-babel.
- Use @babel/plugin-transform-runtime and core-js to polyfill without polluting globals.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
94 - Webpack Fundamentals: entry, output, loaders, plugins, mode (development vs production)

This note explains:
1. entry         – the entry point(s) to start building the dependency graph.
2. output        – where and how to emit bundled files.
3. loaders       – transform modules (e.g., Babel, CSS) before bundling.
4. plugins       – extend or customize build process (e.g., HTML generation, cleaning).
5. mode          – built-in optimizations for development vs production.
*/

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  // 1. Entry: can be a string, array, or object for multiple entries
  entry: './src/index.js',

  // 2. Output: directory and filename pattern
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'production'
      ? 'bundle.[contenthash].js'
      : 'bundle.js',
    publicPath: '/', // for dev server or SPA routing
  },

  // 5. Mode: 'development' or 'production'
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? 'source-map' : 'eval-cheap-module-source-map',

  // 3. Loaders: transform different file types
  module: {
    rules: [
      {
        test: /\.jsx?$/,           // handle .js and .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // transpile ES6+ to ES5
          options: { cacheDirectory: true }
        }
      },
      {
        test: /\.css$/,           // handle CSS imports
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // handle image files
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  },

  // 4. Plugins: enhance webpack capabilities
  plugins: [
    new CleanWebpackPlugin(),      // cleans dist/ before each build
    new HtmlWebpackPlugin({        // generates index.html with script tag
      template: './public/index.html',
      minify: argv.mode === 'production' && {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],

  // Development server configuration
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true // support SPAs
  }
});

/*
Best Practices:
- Use contenthash in filenames for long-term caching in production.
- Enable source maps differently per mode for fast rebuilds in dev and debuggable bundles in prod.
- Split devServer config from production build to keep builds lean.
- Leverage CleanWebpackPlugin and HtmlWebpackPlugin to automate dist management.
- Add more loaders/plugins (e.g., MiniCssExtractPlugin) as project grows.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
95 - Rollup Basics: ES Module Bundling, Tree-Shaking, Plugins

This note explains:
1. rollup.config.js – entry (“input”) and output configuration.
2. ES module bundling – import/export syntax.
3. Tree-shaking – unused code elimination via ES modules.
4. Using plugins – e.g., @rollup/plugin-node-resolve, @rollup/plugin-commonjs.
5. Example commands to build with Rollup.
*/

// 1. Example rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',          // entry point
  output: {
    file: 'dist/bundle.js',      // output file
    format: 'esm',               // ES module format
    sourcemap: true,
  },
  plugins: [
    resolve(),                   // locate node_modules imports
    commonjs(),                  // convert CommonJS modules to ES6
    terser()                     // minify for production
  ]
};

// 2. ES Module Bundling (src/main.js)
// Only `usedFunction` is imported; `unusedFunction` is tree-shaken away.
import { usedFunction } from './utils.js';

console.log('Result of usedFunction():', usedFunction(5));

// 3. Utility Module with Tree-Shaking (src/utils.js)
export function usedFunction(x) {
  return x * 2;
}
export function unusedFunction(y) {
  // This code will be removed by tree-shaking since it's never used
  console.log('unusedFunction called with', y);
  return y + 1;
}

// 4. Building with Rollup (CLI commands)
// Install rollup and plugins:
//   npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-terser
// Build once:
//   npx rollup -c
// Watch mode during development:
//   npx rollup -c --watch

// 5. Verifying Tree-Shaking
// After build, open dist/bundle.js and confirm there's no reference to `unusedFunction`.

// 6. Best Practices
/*
- Always use ES module syntax (import/export) for effective tree-shaking.
- Combine @rollup/plugin-node-resolve and @rollup/plugin-commonjs to bundle dependencies.
- Use terser or similar plugin to minify production bundles.
- Configure output.format to suit your environment (esm, cjs, iife, etc.).
- Use watch mode and sourcemaps for efficient development and debugging.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
96 - Vite Overview: Dev Server, Fast HMR, Build Optimizations

This note explains:
1. Vite installation and dev server
2. Fast Hot Module Replacement (HMR)
3. Production build optimizations
4. vite.config.js basics
5. CLI commands (dev, build, preview)
6. Best practices
*/

// 1. Installation (run in terminal)
// npm init vite@latest my-app -- --template vanilla
// cd my-app
// npm install

// 2. Dev Server (instant startup)
console.log('Running: npm run dev');
// Expected console output:
// > vite vX.Y.Z dev server running at:
// > Local: http://localhost:5173/
// Server starts in ~50ms

// 3. Fast HMR example (in src/main.js)
// Update page title on module change
document.querySelector('h1').textContent = 'Hello, Vite!';
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('✨ HMR update applied');
  });
}

// 4. Production Build (optimized)
// Run: npm run build
// Output: dist/ contains hashed, minified assets
// Preview: npm run preview

// 5. vite.config.js (basic configuration)
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],               // enable Vue support
  server: {
    port: 3000,                   // custom dev server port
    open: true                    // open browser on start
  },
  build: {
    target: 'es2015',             // transpile target
    minify: 'terser',             // minifier
    sourcemap: false              // disable source maps in prod
  }
});

// 6. Best Practices
/*
- Write code using native ES modules for zero-config bundling.
- Leverage import.meta.env for environment-specific values.
- Add optimizeDeps.include for large dependencies to pre-bundle.
- Use preview to test production bundle locally.
- Keep vite.config.js minimal; add plugins only as needed.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
96 - Vite Overview: Dev Server, Fast HMR, Build Optimizations

This note explains:
1. Vite installation and dev server
2. Fast Hot Module Replacement (HMR)
3. Production build optimizations
4. vite.config.js basics
5. CLI commands (dev, build, preview)
6. Best practices
*/

// 1. Installation (run in terminal)
// npm init vite@latest my-app -- --template vanilla
// cd my-app
// npm install

// 2. Dev Server (instant startup)
console.log('Running: npm run dev');
// Expected console output:
// > vite vX.Y.Z dev server running at:
// > Local: http://localhost:5173/
// Server starts in ~50ms

// 3. Fast HMR example (in src/main.js)
// Update page title on module change
document.querySelector('h1').textContent = 'Hello, Vite!';
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('✨ HMR update applied');
  });
}

// 4. Production Build (optimized)
// Run: npm run build
// Output: dist/ contains hashed, minified assets
// Preview: npm run preview

// 5. vite.config.js (basic configuration)
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],               // enable Vue support
  server: {
    port: 3000,                   // custom dev server port
    open: true                    // open browser on start
  },
  build: {
    target: 'es2015',             // transpile target
    minify: 'terser',             // minifier
    sourcemap: false              // disable source maps in prod
  }
});

// 6. Best Practices
/*
- Write code using native ES modules for zero-config bundling.
- Leverage import.meta.env for environment-specific values.
- Add optimizeDeps.include for large dependencies to pre-bundle.
- Use preview to test production bundle locally.
- Keep vite.config.js minimal; add plugins only as needed.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
97 - Parcel Introduction: Zero-Config Bundling, Asset Handling

This note explains:
1. Zero-configuration bundling by pointing Parcel at an HTML entry.
2. Automatic handling of JS, CSS, images and other assets.
3. Built-in development server with fast HMR.
4. Parcel CLI commands for dev and production builds.
5. Optional customization via package.json or .parcelrc.
*/

// 1. Project Structure (zero-config)
//  ├─ src/
//  │   ├─ index.html    ← Entry HTML
//  │   ├─ index.js      ← Your application code
//  │   ├─ style.css     ← Imported CSS
//  │   └─ logo.png      ← Imported image asset
//  ├─ package.json
//  └─ .parcelrc (optional)

// 2. src/index.html (entry point)
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Parcel App</title>
  <!-- CSS imported by Parcel -->
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <h1 id="root">Parcel Zero-Config</h1>
  <img id="logo" src="./logo.png" alt="Logo">
  <!-- JS imported by Parcel -->
  <script src="./index.js"></script>
</body>
</html>
*/

// 3. src/index.js (import assets)
import './style.css';               // CSS will be bundled
import logoUrl from './logo.png';   // Image URL handled by Parcel

const root = document.getElementById('root');
root.textContent = 'Hello from Parcel!';

const img = document.getElementById('logo');
img.src = logoUrl;

// 4. src/style.css (basic styling)
/*
body {
  font-family: sans-serif;
  text-align: center;
}
#logo {
  width: 120px;
  margin-top: 20px;
}
*/

// 5. package.json scripts
/*
{
  "scripts": {
    "dev":   "parcel src/index.html",
    "build": "parcel build src/index.html --dist-dir build",
    "serve": "parcel serve build/index.html"
  },
  "devDependencies": {
    "parcel": "^2.x"
  }
}
*/

// 6. Running the Project
// npm run dev    → starts dev server with HMR at http://localhost:1234
// npm run build  → creates optimized production build in /build
// npm run serve  → serve the /build folder locally

// 7. Optional .parcelrc (for custom transformers)
/*
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.md": ["@parcel/transformer-raw"]
  }
}
*/

// 8. Best Practices
/*
- Import assets (CSS, images, fonts) directly in JS or HTML to let Parcel bundle them.
- Keep entry HTML minimal; let Parcel discover dependencies automatically.
- Use npm scripts to wrap Parcel CLI commands.
- Add .parcelrc only when you need to customize asset transformations.
- For production, review the /build folder to ensure correct file hashing and asset inclusion.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
98 - Bundler Comparison: webpack vs Rollup vs Parcel vs Vite

This note explains:
1. Configuration complexity and learning curve
2. Tree-shaking support and bundle formats
3. Dev server performance and HMR capabilities
4. Asset handling and plugin ecosystems
5. Ideal use cases and trade-offs between bundlers
*/

// 1. Configuration Complexity
const configComplexity = {
  webpack: 'High – very flexible but verbose config',
  rollup: 'Moderate – simpler, focused on ES modules',
  parcel: 'Zero-config – sensible defaults out of the box',
  vite: 'Minimal – leverages native ES modules for dev'
};
console.log('Configuration Complexity:', configComplexity);

// 2. Tree-Shaking & Bundle Format
const treeShaking = {
  webpack: ['ESM & CommonJS support, needs optimization flags (mode, sideEffects)'],
  rollup: ['Best-in-class tree-shaking, ES module first'],
  parcel: ['Automatic tree-shaking with minimal setup'],
  vite: ['Dev uses ESBuild, prod bundles with Rollup for tree-shaking']
};
console.log('Tree-Shaking & Formats:', treeShaking);

// 3. Dev Server & HMR Performance
const devPerformance = {
  webpack: 'Slower startup; fast HMR via webpack-dev-server',
  rollup: 'No built-in dev server; plugins exist',
  parcel: 'Fast startup; HMR built in',
  vite: 'Instant startup (<50ms); blazing-fast HMR'
};
console.log('Dev Server & HMR:', devPerformance);

// 4. Asset Handling & Plugin Ecosystem
const assetHandling = {
  webpack: 'Loaders + plugins for JS, CSS, images, fonts, etc.',
  rollup: 'Plugins ecosystem (e.g., node-resolve, commonjs)',
  parcel: 'Out-of-the-box asset bundling for most types',
  vite: 'Native ESM for dev; Rollup plugins for prod bundles'
};
console.log('Asset Handling & Plugins:', assetHandling);

// 5. Use-Case Recommendations
console.log('Use-Case Recommendations:');
console.log('webpack:', 'Large applications requiring fine-grained control');
console.log('rollup:', 'Libraries and small bundles with optimal tree-shaking');
console.log('parcel:', 'Quick prototypes and small projects with zero config');
console.log('vite:', 'Modern web apps prioritizing fast dev iteration');

/*
Best Practices:
- Choose webpack for complex apps where every detail matters.
- Choose Rollup for library authors needing minimal output.
- Choose Parcel for rapid prototyping without config.
- Choose Vite for modern frameworks (Vue, React) needing instant HMR.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
99 - Asset Management: Importing CSS, Images, Fonts via Bundlers

This note explains:
1. Importing CSS files in your JavaScript entry.
2. Importing image assets and using module URLs.
3. Importing font files for use via FontFace API.
4. How bundlers emit hashed filenames and handle MIME types.
5. Best practices for asset management.
*/

// 1. Import CSS in JS (webpack, Parcel, Vite, Rollup)
// src/index.js
import './styles/app.css';

// 2. Import Image Asset
import logoUrl from './assets/logo.png';
const logoImg = document.createElement('img');
logoImg.src = logoUrl;
logoImg.alt = 'App Logo';
document.body.appendChild(logoImg);

// 3. Import Font and Register via FontFace API
import robotoWoff2 from './assets/fonts/Roboto.woff2';
const roboto = new FontFace('Roboto', `url(${robotoWoff2}) format('woff2')`);
roboto.load().then(face => {
  document.fonts.add(face);
  document.body.style.fontFamily = 'Roboto, sans-serif';
});

// 4. Example CSS File (styles/app.css)
/*
@font-face {
  font-family: 'Roboto';
  src: url('../assets/fonts/Roboto.woff2') format('woff2');
}
body {
  font-family: 'Roboto', sans-serif;
  background: #f5f5f5;
  text-align: center;
}
img {
  max-width: 200px;
  margin-top: 20px;
}
*/

// 5. Best Practices
/*
- Keep asset imports relative in JS/CSS so bundler can resolve and hash filenames.
- Let bundler output to a dist directory with content-hashed names for cache busting.
- Use CSS @font-face for fonts, and FontFace API for dynamic loading if needed.
- Optimize images (e.g., via image-webpack-loader or static compression plugins).
- Avoid inlining large assets as data URIs unless necessary.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
100 - Environment Variables and Build-time Configuration (Cross-env, dotenv)

This note explains:
1. dotenv – loading .env files into process.env.
2. cross-env – setting environment variables in npm scripts cross-platform.
3. Accessing variables in code via process.env.
4. Example .env file.
5. package.json scripts using cross-env.
6. Best-practice tips for managing secrets and defaults.
*/

// 1. Install dependencies (run in terminal):
// npm install dotenv
// npm install --save-dev cross-env

// 2. Example .env file at project root:
// ─ .env ─
// API_URL=https://api.example.com
// NODE_ENV=development
// SECRET_KEY=mysecret123
// ──────

// 3. Loading .env with dotenv (e.g., in src/config.js)
import dotenv from 'dotenv';
dotenv.config();  // loads variables into process.env

// 4. Accessing variables
const apiUrl    = process.env.API_URL;
const nodeEnv   = process.env.NODE_ENV;
const secretKey = process.env.SECRET_KEY;

console.log('API_URL:', apiUrl);
console.log('NODE_ENV:', nodeEnv);
console.log('SECRET_KEY:', secretKey);

// 5. package.json scripts using cross-env to set env vars
/*
{
  "scripts": {
    "dev":   "cross-env NODE_ENV=development API_URL=https://dev.api.example.com node src/index.js",
    "build": "cross-env NODE_ENV=production API_URL=https://api.example.com webpack --mode production",
    "start": "node src/index.js"
  }
}
*/

// 6. Using defaults in code if env var missing
const port = process.env.PORT || 3000;
console.log('Server will start on port:', port);

// 7. Best Practices
/*
- Never commit .env files containing secrets; add .env to .gitignore.
- Provide a .env.example with placeholder keys for documentation.
- Use cross-env in npm scripts to ensure compatibility on Windows/macOS/Linux.
- Access process.env only after dotenv.config() is called.
- Avoid leaking secrets to client-side bundles; restrict dotenv usage to server or build scripts.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
101 - Debugging in the Browser: DevTools Console, Breakpoints, Watch Expressions

This note explains:
1. Console methods: console.log, console.warn, console.error, console.table, console.group/groupEnd.
2. Setting breakpoints via the `debugger` statement and in the Sources panel.
3. Conditional and DOM breakpoints.
4. Watch expressions: monitoring variables or expressions in the Watch panel.
5. Stepping through code and inspecting call stack and scope.
*/

// 1. Console Methods Example
function fetchData() {
  console.group('fetchData');
  console.log('Starting data fetch...');
  console.warn('This is a warning if network is slow');
  console.error('This is an error placeholder');
  const data = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  console.table(data);
  console.groupEnd();
  return data;
}

// 2. Inserting a debugger Statement for Breakpoint
function processData() {
  const items = fetchData();
  debugger; // Execution will pause here when DevTools is open
  return items.map(item => ({ ...item, processed: true }));
}

// 3. Conditional Breakpoint Example
// In DevTools > Sources, set a breakpoint on the line inside this if-block
// and add condition: item.id === 2
for (const item of processData()) {
  if (item.id === 2) {
    console.log('Special handling for item 2:', item);
  }
}

// 4. Watch Expressions
// In DevTools > Watch panel, add expressions:
//   items
//   item.id
// to observe their values as you step through the loop above.

// 5. Stepping and Scope Inspection
function main() {
  const result = processData();
  console.log('Final result:', result);
}

main();
// Use DevTools Step Over (F10), Step Into (F11), Step Out (Shift+F11)
// to navigate through calls, and inspect Locals/Scope in the right-hand panel.

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
102 - console.log, console.warn, console.error, console.table

This note explains:
1. console.log       – general informational messages.
2. console.warn      – warning messages (yellow icon in DevTools).
3. console.error     – error messages (red icon in DevTools).
4. console.table     – tabular display of arrays or objects.
*/

// 1. console.log: simple output
console.log('Hello, console.log!'); 
console.log('Multiple values:', 42, { a: 1 });

// 2. console.warn: warnings
console.warn('This is a warning — check your configuration');
console.warn('Deprecation warning:', 'oldFunction() will be removed in v2');

// 3. console.error: errors
console.error('This is an error — something went wrong');
try {
  throw new Error('Sample exception');
} catch (e) {
  console.error('Caught exception:', e);
}

// 4. console.table: display data in a table format
const users = [
  { id: 1, name: 'Ajay',   role: 'Developer' },
  { id: 2, name: 'Riya',   role: 'Designer'  },
  { id: 3, name: 'Mukesh', role: 'Manager'   }
];
console.table(users);

// You can also display object properties:
const config = { host: 'localhost', port: 3000, env: 'development' };
console.table(config);

// 5. Grouping and clearing (bonus demonstrations)
console.group('Grouped Logs');
console.log('Inside group');
console.warn('Warning inside group');
console.groupEnd();

console.clear(); // Clears the console

/*
Best Practices:
- Use console.log for general debugging and information.
- Use console.warn for recoverable issues you want to highlight.
- Use console.error for actual errors and exceptions.
- Use console.table to inspect structured data easily.
- Remove or disable excessive logging in production code.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
103 - Source Maps: Generating and Using for Easier Debugging

This note explains:
1. What source maps are and why they’re useful.
2. Enabling generation in webpack, Babel, and TypeScript.
3. Inline vs external source maps.
4. Making sure compiled files reference their maps.
5. Using source maps in browser DevTools.
*/

// 1. Webpack Configuration (webpack.config.js)
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  devtool: 'source-map',           // external .map files (bundle.js → bundle.js.map)
  module: { rules: [ /* your loaders */ ] },
  plugins: [ /* your plugins */ ]
};

// For inline source maps (embed map in bundle):
// devtool: 'inline-source-map'

// 2. Babel CLI Usage
// Transpile with source maps enabled:
// npx babel src --out-dir lib --source-maps

// 3. TypeScript Configuration (tsconfig.json)
/*
{
  "compilerOptions": {
    "outDir": "./dist",
    "sourceMap": true,            // generates .js.map alongside .js
    // "inlineSourceMap": true,   // embeds map into .js file
    // "inlineSources": true      // include original .ts in map
  }
}
*/

// 4. Compiled File Reference
// At the end of dist/bundle.js you’ll see:
// //# sourceMappingURL=bundle.js.map
// or, for inline maps, a long data URL.

// 5. Using in DevTools
//  • Open DevTools > Sources panel.
//  • Locate original files under webpack:// or file:// sources.
//  • Set breakpoints in original code.
//  • Step through and inspect variables as if running uncompiled code.

// 6. Best Practices
/*
- Use external source maps in development; disable or restrict in production to protect code.
- For performance, choose 'eval-source-map' or 'cheap-module-source-map' in dev for faster rebuilds.
- Ensure .map files are served by your server (respect CORS if loading from CDN).
- Use inline maps only when you need self-contained files (e.g., quick prototypes).
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
104 - Unit Testing with Jest: Installation, Writing Test Suites, Matchers, Mocking Modules

This note explains:
1. Installing Jest and configuring package.json scripts.
2. Writing test suites using describe() and test()/it().
3. Common matchers: toBe, toEqual, toContain, toHaveLength, toThrow, etc.
4. Mocking functions and modules with jest.fn() and jest.mock().
5. Running tests via npm scripts.
*/

// 1. Installation & package.json scripts
// In terminal:
//   npm install --save-dev jest
// In package.json:
/*
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
*/

// 2. Example module to test (math.js)
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}
export function willThrow() {
  throw new Error('Oops');
}

// 3. Writing Test Suites (math.test.js)
import { add, multiply, willThrow } from './math';

describe('Math Module', () => {
  test('add() should sum two numbers', () => {
    expect(add(2, 3)).toBe(5);               // toBe for primitive equality
    expect(add(-1, 1)).toEqual(0);           // toEqual also works
  });

  it('multiply() should multiply correctly', () => {
    expect(multiply(4, 5)).toBe(20);
  });

  test('willThrow() should throw an error', () => {
    expect(() => willThrow()).toThrow('Oops'); // toThrow matcher
  });
});

// 4. More Matchers (arrays, objects)
describe('Advanced Matchers', () => {
  const list = ['apple', 'banana', 'cherry'];

  test('array contains element', () => {
    expect(list).toContain('banana');
    expect(list).toHaveLength(3);
  });

  test('object equality', () => {
    const obj = { a: 1, b: { c: 2 } };
    expect(obj).toEqual({ a: 1, b: { c: 2 } }); // deep equality
  });
});

// 5. Mocking with jest.fn()
describe('Mock Functions', () => {
  test('jest.fn() example', () => {
    const mockFn = jest.fn(x => x * 2);
    expect(mockFn(5)).toBe(10);
    expect(mockFn).toHaveBeenCalledWith(5);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

// 6. Mocking Modules with jest.mock()
// utils.js
export function fetchData() {
  // real implementation that calls an API
  return Promise.resolve({ data: 'real' });
}

// data.test.js
jest.mock('./utils');              // automock utils module
import { fetchData } from './utils';

describe('Mocking fetchData', () => {
  test('mocked fetchData returns custom value', async () => {
    fetchData.mockResolvedValue({ data: 'mocked' });
    const res = await fetchData();
    expect(res.data).toBe('mocked');
  });
});

// 7. Running Tests
// In terminal:
//   npm test          → runs all tests once
//   npm run test:watch→ reruns tests on file changes

/*
Best Practices:
- Organize tests next to modules (math.js → math.test.js).
- Use describe() to group related tests.
- Use beforeEach/afterEach for setup and teardown.
- Clear mocks between tests with jest.clearAllMocks().
- Keep tests fast and deterministic; mock external dependencies.
- Use coverage reports (jest --coverage) to ensure sufficient test coverage.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
105 - Testing DOM with Testing Library (Jest DOM, @testing-library/dom)

This note explains:
1. Setting up Jest DOM for custom matchers.
2. Querying DOM elements using @testing-library/dom.
3. Assertions with jest-dom matchers.
4. Simulating user events via @testing-library/user-event.
5. Cleanup between tests.
*/

// 1. Setup: import utilities and extend Jest matchers
import { screen, getByText, getByRole } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// Helper to reset DOM before each test
beforeEach(() => {
  document.body.innerHTML = '';
});

// 2. Initial DOM and basic visibility test
test('content is initially visible', () => {
  document.body.innerHTML = `
    <button id="toggle-btn">Hide</button>
    <div id="content">Visible Content</div>
  `;
  const contentDiv = screen.getByText('Visible Content');
  expect(contentDiv).toBeVisible();          // jest-dom matcher
});

// 3. Simulating toggle functionality
test('click toggles content visibility', async () => {
  document.body.innerHTML = `
    <button id="toggle-btn">Hide</button>
    <div id="content">Visible Content</div>
  `;
  const toggleBtn = screen.getByText('Hide');
  const contentDiv = screen.getByText('Visible Content');

  // Attach click handler
  toggleBtn.addEventListener('click', () => {
    if (contentDiv.style.display === 'none') {
      contentDiv.style.display = '';
      toggleBtn.textContent = 'Hide';
    } else {
      contentDiv.style.display = 'none';
      toggleBtn.textContent = 'Show';
    }
  });

  // Initial state
  expect(toggleBtn).toHaveTextContent('Hide');
  expect(contentDiv).toBeVisible();

  // Click to hide
  await userEvent.click(toggleBtn);
  expect(contentDiv).not.toBeVisible();
  expect(toggleBtn).toHaveTextContent('Show');

  // Click to show
  await userEvent.click(toggleBtn);
  expect(contentDiv).toBeVisible();
  expect(toggleBtn).toHaveTextContent('Hide');
});

// 4. Querying by role and testing interactions
test('checkbox toggles on label click', async () => {
  document.body.innerHTML = `
    <input type="checkbox" id="agree" />
    <label for="agree">Accept Terms</label>
  `;
  const checkbox = screen.getByRole('checkbox');
  const label = screen.getByText('Accept Terms');

  expect(checkbox).not.toBeChecked();
  await userEvent.click(label);
  expect(checkbox).toBeChecked();            // jest-dom matcher
});

// 5. Automatic cleanup
// @testing-library automatically cleans up between tests when using Jest

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
106 - End-to-End (E2E) Testing with Cypress: Setup, Writing Tests, Fixtures, Commands

This note explains:
1. Installing and configuring Cypress.
2. Writing basic test specs with cy.visit, cy.get, cy.contains.
3. Using fixtures to load test data.
4. Defining custom commands in support/commands.js.
5. Running tests via CLI.
*/

// 1. Installation & Configuration
// In terminal:
//   npm install --save-dev cypress
// cypress.json (project root):
/*
{
  "baseUrl": "http://localhost:3000",
  "video": false,
  "fixturesFolder": "cypress/fixtures",
  "integrationFolder": "cypress/integration",
  "supportFile": "cypress/support/index.js"
}
*/

// 2. Basic Test Spec (cypress/integration/app.spec.js)
describe('My App', () => {
  beforeEach(() => {
    cy.visit('/');                       // visits http://localhost:3000/
  });

  it('should display the home page title', () => {
    cy.contains('h1', 'Welcome');        // find <h1> containing "Welcome"
  });

  it('should navigate to About page', () => {
    cy.get('nav a').contains('About').click();
    cy.url().should('include', '/about');    // URL now includes /about
    cy.get('h2').should('have.text', 'About Us');
  });
});

// 3. Using Fixtures for Test Data (cypress/fixtures/user.json)
/*
{
  "username": "testuser",
  "password": "password123"
}
*/
// Test that uses fixture:
// cypress/integration/login.spec.js
describe('Login Flow', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');
  });

  it('logs in with valid credentials', function() {
    cy.visit('/login');
    cy.get('input[name="username"]').type(this.userData.username);
    cy.get('input[name="password"]').type(this.userData.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
    cy.contains('h1', `Hello, ${this.userData.username}`);
  });
});

// 4. Custom Commands (cypress/support/commands.js)
// Define reusable login command:
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
// Usage in spec:
// cy.login('testuser', 'password123');

// 5. Running Tests via CLI
// npx cypress open   → opens interactive GUI
// npx cypress run    → runs all specs headlessly
// npx cypress run --spec "cypress/integration/login.spec.js"  → run single spec

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
107 - Debugging Node.js Code: using node --inspect, VSCode Debugger

This note explains:
1. Starting Node with --inspect and --inspect-brk flags
2. Attaching VSCode Debugger via launch.json
3. Using the debugger; statement in code
4. Inspecting variables, call stack, and breakpoints
5. Integrating nodemon for auto-restart during debugging
*/

// 1. Example code with a debugger statement
function calculate(a, b) {
  const sum = a + b;
  debugger;               // Execution will pause here when a debugger is attached
  return sum;
}

console.log('Result:', calculate(2, 3));

// 2. Starting Node with inspector flags (run in your terminal)
//    node --inspect index.js        // runs with debugger listening on port 9229
//    node --inspect-brk index.js    // breaks on the first line before executing any code

// 3. VSCode launch.json configuration for attaching to Node
/*
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Node.js",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true,
      "protocol": "inspector",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
*/

// 4. Running and Attaching
// • Start your app with `node --inspect-brk index.js`
// • In VSCode Debug panel, select "Attach to Node.js" and hit ▶️
// • Execution will pause at the debugger; line; use F10/F11 to step through

// 5. Integrating nodemon for auto-restart during debugging
//    npm install --save-dev nodemon
//    npx nodemon --inspect index.js
// • nodemon restarts on file changes and preserves the --inspect flag

/*
Best Practices:
- Use --inspect-brk to pause at startup and set initial breakpoints in VSCode.
- Insert debugger; statements strategically to inspect variables.
- Skip Node internals in your debugger to focus on your code.
- Combine nodemon with --inspect for a fast edit-debug cycle.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
108 - Linting with ESLint: configuring ESLint, rules, plugins (eslint-plugin-jsx, eslint-plugin-node)

This note explains:
1. Installing ESLint and initializing config.
2. .eslintrc.js configuration for core rules and plugins.
3. Adding plugins: eslint-plugin-react, eslint-plugin-jsx-a11y, eslint-plugin-node.
4. package.json scripts to run linting.
5. Running linting via CLI.
*/

// 1. Install ESLint and plugins (run in terminal):
// npm install --save-dev eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-node

// 2. Initialize ESLint config:
// npx eslint --init
// • Choose "To check syntax, find problems, and enforce code style"
// • ES modules, React (if using JSX), Node environment
// • Use popular style guide or your own preferences

// 3. Example .eslintrc.js:
module.exports = {
  env: {
    browser: true,
    node:    true,
    es6:     true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType:  'module',
    ecmaFeatures: { jsx: true }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:node/recommended'
  ],
  plugins: ['react','jsx-a11y','node'],
  rules: {
    // Core ESLint rules
    'no-unused-vars': ['warn'],
    'no-console':     'off',
    // React/JSX rules
    'react/prop-types': 'off',
    // Node plugin rules
    'node/no-missing-import':      'error',
    'node/no-extraneous-import':   'error'
  },
  settings: {
    react: { version: 'detect' }
  }
};

// 4. package.json scripts:
{
  "scripts": {
    "lint":     "eslint 'src/**/*.{js,jsx}'",
    "lint:fix": "eslint 'src/**/*.{js,jsx}' --fix"
  }
}

// 5. Running linting via CLI:
// npm run lint        // check code
// npm run lint:fix    // auto-fix issues

// 6. Best Practices:
/*
- Extend recommended configs, override only necessary rules.
- Integrate ESLint in your editor for real-time linting.
- Use .eslintignore to exclude build folders and node_modules.
- Run linting in CI and pre-commit hooks to enforce consistency.
- Keep plugins and ESLint up to date for new rules and security patches.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
109 - Type Checking with TypeScript (optional): setting up tsconfig, basic type annotations in JS via JSDoc

This note explains:
1. tsconfig.json – configuring TypeScript for JS type checking.
2. Enabling allowJs and checkJs to type-check .js files.
3. Using JSDoc annotations for variables, functions, and custom types.
4. Running tsc --noEmit to perform type checks without output.
5. Best-practice tips for gradual adoption.
*/

// 1. tsconfig.json example:
/*
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "baseUrl": "./",
    "paths": { "*": ["node_modules/*"] }
  },
  "include": ["src/**/*"]
}
*/

// 2. Enable per-file checking (at top of src/index.js):
// @ts-check

// 3. JSDoc for simple functions:
/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

const sum = add(2, 3);
console.log('add(2,3)=', sum);

// 4. JSDoc for custom object types:
/**
 * @typedef {Object} User
 * @property {string} name
 * @property {number} age
 */

/**
 * Greets a user.
 * @param {User} user
 * @returns {string}
 */
function greet(user) {
  return `Hello, ${user.name}! You are ${user.age}.`;
}

console.log(greet({ name: 'Ajay', age: 30 }));

// 5. Running type checks (in terminal):
// npx tsc --noEmit
// Reports any JSDoc/type mismatch errors.

// 6. Best Practices:
/*
- Use // @ts-check for file-level checking.
- Annotate all public functions and complex objects with JSDoc.
- Prefer .ts for new code; use JSDoc in .js for gradual migration.
- Keep tsconfig.json strict (strictNullChecks, noImplicitAny).
- Leverage editors like VSCode to see inline type warnings.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
110 - Code Formatting with Prettier: Integration with ESLint and Editors

This note explains:
1. Installing Prettier and basic .prettierrc configuration.
2. Integrating Prettier with ESLint via eslint-plugin-prettier and eslint-config-prettier.
3. Adding npm scripts for formatting.
4. Editor integration (VSCode example).
5. Best-practice tips for consistent formatting.
*/

// 1. Installation
// In terminal:
//   npm install --save-dev prettier
//   npm install --save-dev eslint-plugin-prettier eslint-config-prettier

// 2. .prettierrc Configuration (create at project root)
/*
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
*/

// 3. ESLint Integration (.eslintrc.js adjustments)
// Add 'prettier' to extends AFTER other configs to disable conflicting ESLint rules:
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // ... other configs ...
    'plugin:prettier/recommended',   // Enables eslint-plugin-prettier & eslint-config-prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',   // Show Prettier issues as ESLint errors
    // ... your other rules ...
  },
};

// 4. npm Scripts for Formatting (in package.json)
/*
{
  "scripts": {
    "lint":    "eslint 'src/**/*.{js,jsx}'",
    "format":  "prettier --write 'src/**/*.{js,jsx,css,md}'",
    "lint:fix":"eslint 'src/**/*.{js,jsx}' --fix"
  }
}
*/

// 5. Editor Integration (VSCode settings.json)
/*
{
  // Enable format on save
  "editor.formatOnSave": true,
  // Use Prettier as default formatter
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // Run ESLint fix on save (including Prettier errors)
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
*/

// 6. Best Practices
/*
- Keep Prettier config separate in .prettierrc for easy sharing.
- Use eslint-plugin-prettier to report formatting issues alongside lint errors.
- Run Prettier before ESLint fix in CI: "prettier --check", then "eslint --fix".
- Leverage your editor’s format-on-save to enforce consistent style during development.
- Commit .prettierrc and .eslintrc.js to version control for team-wide consistency.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
111 - Comments and Documentation: JSDoc Syntax, Generating Documentation

This note explains:
1. Basic JSDoc annotations: @param, @returns, @typedef, @example
2. Documenting functions, classes, and modules.
3. Generating HTML docs using the JSDoc CLI.
4. Configuring jsdoc.json for custom templates and options.
5. Best practices for maintaining documentation.
*/

// 1. JSDoc Annotations Example

/**
 * Represents a user in the system.
 * @typedef {Object} User
 * @property {number} id        - Unique identifier
 * @property {string} name      - Full name of the user
 * @property {string} [email]   - Optional email address
 */

/**
 * Adds two numbers.
 * @param {number} a - The first addend
 * @param {number} b - The second addend
 * @returns {number} Sum of a and b
 *
 * @example
 * // returns 5
 * add(2, 3);
 */
function add(a, b) {
  return a + b;
}

/**
 * Greets a user.
 * @param {User} user - The user to greet
 * @returns {string} A greeting message
 *
 * @example
 * // returns "Hello, Ajay!"
 * greet({ id: 1, name: 'Ajay' });
 */
function greet(user) {
  return `Hello, ${user.name}!`;
}

// 2. Documenting a Class

/**
 * A simple counter.
 */
class Counter {
  /**
   * Create a counter.
   * @param {number} [initial=0] - Initial count value
   */
  constructor(initial = 0) {
    this.count = initial;
  }

  /**
   * Increment the counter by 1.
   * @returns {number} The new count
   */
  increment() {
    return ++this.count;
  }

  /**
   * Reset the counter to zero.
   */
  reset() {
    this.count = 0;
  }
}

// 3. Generating Documentation with JSDoc CLI
// Install globally or as dev dependency:
// npm install --save-dev jsdoc
//
// CLI command to generate docs:
// npx jsdoc path/to/yourFile.js -d docs
//
// If you have multiple source files:
// npx jsdoc src/ -r -d docs

// 4. jsdoc.json Configuration (project root)
/*
{
  "tags": { "allowUnknownTags": false },
  "source": {
    "include": ["src"],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "destination": "./docs",
    "recurse": true,
    "template": "default"
  },
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": false
  }
}
*/
// Generate with config:
// npx jsdoc -c jsdoc.json

/*
5. Best Practices:
- Keep JSDoc comments immediately above the item they document.
- Use @typedef for complex object shapes.
- Include @example blocks to demonstrate usage.
- Run jsdoc in CI to catch missing or malformed comments.
- Update documentation alongside code changes to avoid drift.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
112 - Naming Conventions and Project Structure

This note explains:
1. File and directory naming: conventions for JS, React components, styles, etc.
2. Typical project structure for web applications.
3. Module organization: grouping by feature vs type.
4. Config, scripts, environment, and public asset placement.
5. Best practices for index.js files and barrel exports.
*/

// Example Project Structure:
/*
my-app/
│
├─ src/                      # application source code
│   ├─ assets/               # images, fonts, static files
│   ├─ components/           # reusable UI components
│   │   ├─ Header.jsx        # PascalCase for React components
│   │   └─ Footer.jsx
│   ├─ hooks/                # custom React hooks
│   │   └─ useAuth.js        # camelCase for hooks
│   ├─ utils/                # utility functions
│   │   └─ dateFormatter.js  # camelCase for utils
│   ├─ pages/                # page-level components
│   │   └─ HomePage.jsx
│   ├─ styles/               # global and module CSS/SCSS
│   │   ├─ global.css
│   │   └─ Button.module.css # kebab-case for CSS modules
│   ├─ App.jsx               # root component (PascalCase)
│   └─ index.js              # application entry point
│
├─ public/                   # static assets served without processing
│   └─ favicon.ico
│
├─ tests/                    # test files
│   └─ App.test.js           # .test.js suffix for tests
│
├─ .env                      # environment variables
├─ .eslintrc.js              # ESLint configuration
├─ .prettierrc.js            # Prettier configuration
├─ package.json              # npm scripts and dependencies
└─ README.md                 # project overview and setup instructions
*/

// Naming Conventions:
// • JavaScript/TypeScript files            → camelCase (e.g., dateFormatter.js)
// • React component files                  → PascalCase (e.g., UserProfile.jsx)
// • CSS/Sass files                         → kebab-case (e.g., navigation-menu.css)
// • Constants                              → UPPER_SNAKE_CASE (e.g., API_URL)
// • Hooks                                  → usePrefix in camelCase (e.g., useFetchData.js)
// • Test files                             → *.test.js or *.spec.js

// Module Organization:
// • Group by feature (scalable):
//   featureX/
//     ├─ components/
//     ├─ services/
//     └─ featureXPage.jsx
// • Or group by type (small projects):
//   components/, hooks/, utils/, pages/

// Barrel Exports (index.js in folders):
// export { default as Header } from './Header';
// export * from './utils';

// Best Practices:
/*
- Keep folder depth to 2–3 levels for readability.
- Place config files (.env, ESLint, Prettier) at project root.
- Document conventions in README.md.
- Enforce naming via lint rules and editor settings.
- Use clear, descriptive names—avoid abbreviations.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
113 - DRY (Don’t Repeat Yourself), KISS (Keep It Simple, Stupid), YAGNI (You Aren’t Gonna Need It)

This note explains:
1. DRY – avoiding duplicate code by abstracting common logic.
2. KISS – keeping code straightforward rather than overcomplicated.
3. YAGNI – not building features until they’re actually required.
*/

// 1. DRY Violation Example (duplicated logic)
function areaCircle(r) {
  return Math.PI * r * r;
}
function areaCylinderVolume(r, h) {
  // duplicate circle area calculation
  const circleArea = Math.PI * r * r;
  return circleArea * h;
}
console.log(areaCircle(2));           // 12.566370614359172
console.log(areaCylinderVolume(2, 5)); // 62.83185307179586

// DRY-compliant refactor: extract shared logic
function computeCircleArea(r) {
  return Math.PI * r * r;
}
function computeCylinderVolume(r, h) {
  return computeCircleArea(r) * h;
}
console.log(computeCircleArea(2));           // 12.566370614359172
console.log(computeCylinderVolume(2, 5));    // 62.83185307179586

// 2. KISS Violation Example (overly complex)
function formatUserDetailsComplex(user) {
  // unnecessary nested loops and checks
  let output = '';
  Object.keys(user).forEach(key => {
    if (user[key] !== null && user[key] !== undefined) {
      output += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${user[key]}\n`;
    }
  });
  return output.trim();
}
console.log(formatUserDetailsComplex({ name: 'Ajay', age: 30 }));

// KISS-compliant version: simple and clear
function formatUserDetails({ name, age }) {
  return `Name: ${name}\nAge: ${age}`;
}
console.log(formatUserDetails({ name: 'Ajay', age: 30 }));

// 3. YAGNI Violation Example (unused future-proofing)
class Logger {
  log(message) {
    console.log(message);
  }
  // Premature addition – not used anywhere
  debug(message, level, timestamp) {
    console.debug(`[${timestamp}] [${level}] ${message}`);
  }
}
const logger = new Logger();
logger.log('Hello, world!');
// YAGNI-compliant: remove debug() until it's actually needed
// class Logger { log(message) { console.log(message); } }

/*
Best Practices:
- DRY: Extract and reuse common logic; avoid copy/paste.
- KISS: Choose the simplest solution that works; remove unnecessary complexity.
- YAGNI: Don’t implement speculative features; add them when requirements arise.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
114 - Module Patterns: Revealing Module Pattern, Immediately Invoked Function Expression (IIFE) for encapsulation

This note explains:
1. IIFE – creating a private scope immediately upon definition.
2. Revealing Module Pattern – exposing only selected methods and properties.
3. Encapsulating private variables and helper functions.
4. Usage examples for both patterns.
*/

// 1. IIFE Module Example
const IIFEExample = (function() {
  // Private variable
  let privateCounter = 0;

  // Private helper function
  function log(message) {
    console.log(`IIFEExample log: ${message}`);
  }

  // Public API
  return {
    increment() {
      privateCounter++;
      log(`counter = ${privateCounter}`);
    },
    reset() {
      privateCounter = 0;
      log(`counter reset`);
    }
  };
})();

// Usage:
IIFEExample.increment(); // IIFEExample log: counter = 1
IIFEExample.increment(); // IIFEExample log: counter = 2
IIFEExample.reset();     // IIFEExample log: counter reset

// 2. Revealing Module Pattern Example
const RevealingModule = (function() {
  // Private state
  let _count = 0;

  // Private method
  function _logCount() {
    console.log(`RevealingModule count: ${_count}`);
  }

  // Public methods
  function increment() {
    _count++;
    _logCount();
  }
  function decrement() {
    _count--;
    _logCount();
  }
  function reset() {
    _count = 0;
    _logCount();
  }

  // Expose public methods only
  return {
    increment,
    decrement,
    reset
  };
})();

// Usage:
RevealingModule.increment(); // RevealingModule count: 1
RevealingModule.decrement(); // RevealingModule count: 0
RevealingModule.reset();     // RevealingModule count: 0

/*
Best Practices:
- Use IIFE for simple module encapsulation without exposing internal details.
- Use the Revealing Module Pattern to clearly define public vs private members.
- Keep private members truly private by not returning them.
- Avoid global namespace pollution by assigning modules to single variables.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
115 - Singleton, Factory, Observer, and Pub/Sub Patterns in JS

This note explains:
1. Singleton Pattern – a class with only one instance.
2. Factory Pattern – a function creating related objects.
3. Observer Pattern – objects subscribe to state changes.
4. Pub/Sub Pattern – decoupled event publishing and subscribing.
*/

// 1. Singleton Pattern
class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    this.logs = [];
    Logger.instance = this;
  }
  log(message) {
    this.logs.push(message);
    console.log(`Log: ${message}`);
  }
  getLogCount() {
    return this.logs.length;
  }
}
const logger1 = new Logger();
const logger2 = new Logger();
console.log('Same instance:', logger1 === logger2); // true
logger1.log('First message');
logger2.log('Second message');
console.log('Total logs:', logger1.getLogCount()); // 2

// 2. Factory Pattern
function createUser(type, name) {
  if (type === 'admin') {
    return { name, role: 'Administrator', permissions: ['read','write','delete'] };
  } else if (type === 'guest') {
    return { name, role: 'Guest', permissions: ['read'] };
  } else {
    return { name, role: 'User', permissions: ['read','write'] };
  }
}
const admin = createUser('admin', 'Alice');
const guest = createUser('guest', 'Bob');
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
const subject = new Subject();
function observerA(data) { console.log('Observer A received:', data); }
function observerB(data) { console.log('Observer B received:', data); }
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.notify('Event 1');
subject.unsubscribe(observerA);
subject.notify('Event 2');

// 4. Pub/Sub Pattern
const EventBus = {
  topics: {},
  subscribe(topic, listener) {
    if (!this.topics[topic]) this.topics[topic] = [];
    this.topics[topic].push(listener);
  },
  publish(topic, data) {
    (this.topics[topic] || []).forEach(listener => listener(data));
  },
  unsubscribe(topic, listener) {
    if (!this.topics[topic]) return;
    this.topics[topic] = this.topics[topic].filter(l => l !== listener);
  }
};
function sub1(msg) { console.log('Sub1 got:', msg); }
function sub2(msg) { console.log('Sub2 got:', msg); }
EventBus.subscribe('message', sub1);
EventBus.subscribe('message', sub2);
EventBus.publish('message', 'Hello Pub/Sub');
EventBus.unsubscribe('message', sub1);
EventBus.publish('message', 'Goodbye Pub/Sub');

/*
Best Practices:
- Singleton: use sparingly; global state can introduce hidden dependencies.
- Factory: centralize object creation logic, supports easy extension.
- Observer: good for state change notifications, but can lead to memory leaks—unsubscribe when done.
- Pub/Sub: decouples components; choose topic names carefully to avoid collisions.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
116 - MVC, MVVM, Flux Architectures Overview

This note explains:
1. MVC – Model-View-Controller separation and data flow.
2. MVVM – Model-View-ViewModel with two-way binding.
3. Flux – Unidirectional data flow with Actions, Dispatcher, Stores, Views.
*/

// 1. MVC Pattern Skeleton
// • Model: holds data and business logic
class Model {
  constructor(data = {}) { this.data = data; }
  get(key) { return this.data[key]; }
  set(key, value) { this.data[key] = value; }
}
// • View: renders UI and exposes events
class View {
  constructor() { this.onClick = null; }
  render(model) { console.log('View render:', model.data); }
  simulateUserClick() { this.onClick && this.onClick('someValue'); }
}
// • Controller: handles user input, updates Model, tells View to re-render
class Controller {
  constructor(model, view) {
    this.model = model; this.view = view;
    this.view.onClick = value => this.updateModel(value);
  }
  updateModel(value) {
    this.model.set('lastClick', value);
    this.view.render(this.model);
  }
}
// Usage
const mvcModel = new Model({ lastClick: null });
const mvcView = new View();
const mvcController = new Controller(mvcModel, mvcView);
mvcView.simulateUserClick();  // View render: { lastClick: 'someValue' }

// 2. MVVM Pattern Skeleton
// • Model: same as MVC
// • ViewModel: exposes observables that the View binds to
class ViewModel {
  constructor(model) {
    this.model = model;
    this.value = model.get('value');
  }
  setValue(v) {
    this.value = v;
    this.model.set('value', v);
  }
}
// • View: two-way binding (pseudo-code)
function bind(viewModel) {
  // on input change:
  document.querySelector('input').addEventListener('input', e => {
    viewModel.setValue(e.target.value);
  });
  // subscribe to viewModel.value changes and update UI:
  // viewModel.onChange(newVal => input.value = newVal);
}
// Usage
const mvvmModel = new Model({ value: '' });
const mvvmVM = new ViewModel(mvvmModel);
bind(mvvmVM);

// 3. Flux Pattern Skeleton
// • Action: plain object describing “what happened”
const actionAdd = { type: 'ADD_TODO', payload: { text: 'Learn Flux' } };
// • Dispatcher: central hub
class Dispatcher {
  constructor() { this.callbacks = []; }
  register(cb) { this.callbacks.push(cb); }
  dispatch(action) { this.callbacks.forEach(cb => cb(action)); }
}
const dispatcher = new Dispatcher();
// • Store: holds application state, registers with dispatcher
class TodoStore {
  constructor() {
    this.todos = [];
    dispatcher.register(this.handleAction.bind(this));
  }
  handleAction(action) {
    if (action.type === 'ADD_TODO') {
      this.todos.push(action.payload.text);
      this.emitChange();
    }
  }
  emitChange() { console.log('Store changed:', this.todos); }
}
const store = new TodoStore();
// • View: triggers Actions, listens to Store
function addTodo(text) {
  dispatcher.dispatch({ type: 'ADD_TODO', payload: { text } });
}
addTodo('Write code'); // Store changed: ['Write code']

/*
Best Practices:
- MVC: simple apps; clear separation but can become tangled in UI logic.
- MVVM: frameworks like Knockout/Angular use two-way binding; good for forms.
- Flux: unidirectional flow avoids view–model sync issues; scales well for complex state.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
117 - Functional Programming in JS: Pure Functions, Immutability, Higher-Order Functions, Currying, Composition

This note explains:
1. Pure Functions – functions with no side effects, same input → same output.
2. Immutability – never mutate original data; return new copies.
3. Higher-Order Functions – functions that take or return other functions.
4. Currying – transforming a multi-argument function into a sequence of single-argument functions.
5. Composition – combining functions to build pipelines.
*/

// 1. Pure Functions
function add(a, b) {
  return a + b;               // no side effects
}
console.log('add(2,3):', add(2, 3)); // 5

// Impure example for contrast (avoid):
let counter = 0;
function impureIncrement() {
  counter++;                  // side effect on external state
  return counter;
}
console.log('impureIncrement():', impureIncrement());

// 2. Immutability
const originalArr = [1, 2, 3];
const newArr = originalArr.map(x => x * 2);  // returns new array
console.log('originalArr:', originalArr);    // [1,2,3]
console.log('newArr:', newArr);              // [2,4,6]

const originalObj = { x: 1, y: 2 };
const newObj = { ...originalObj, y: 3 };     // object spread creates new object
console.log('originalObj:', originalObj);    // {x:1,y:2}
console.log('newObj:', newObj);              // {x:1,y:3}

// 3. Higher-Order Functions
// Taking a function as argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}
console.log('applyOperation(4,5,add):', applyOperation(4, 5, add)); // 9

// Returning a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplier(2);
console.log('double(7):', double(7));        // 14

// 4. Currying
const curriedAdd = a => b => a + b;
const addFive = curriedAdd(5);
console.log('addFive(10):', addFive(10));    // 15
console.log('curriedAdd(3)(4):', curriedAdd(3)(4)); // 7

// 5. Composition
const toUpper = str => str.toUpperCase();
const exclaim = str => str + '!';
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}
const shout = compose(exclaim, toUpper);
console.log('shout("hello"):', shout('hello')); // HELLO!

// Pipe multiple functions
const composeMany = (...fns) => input =>
  fns.reduceRight((acc, fn) => fn(acc), input);
const welcome = composeMany(exclaim, toUpper, s => `Hello, ${s}`);
console.log('welcome("world"):', welcome('world')); // HELLO, WORLD!

/*
Best Practices:
- Keep functions pure; avoid side effects.
- Favor immutable data transformations (Array.map, filter, reduce).
- Use higher-order functions to abstract patterns.
- Use currying for partial application and more reusable functions.
- Compose small functions into larger pipelines for readability.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


/*
118 - Object-Oriented Programming in JS: classes, inheritance, mixins, composition over inheritance

This note explains:
1. Defining classes
2. Using inheritance with extends and super
3. Applying mixins to add behavior
4. Favoring composition over inheritance for flexibility
*/

// 1. Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
const generic = new Animal('Generic');
generic.speak(); // Generic makes a noise.

// 2. Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}
const rex = new Dog('Rex', 'German Shepherd');
rex.speak(); // Rex barks.

// 3. Mixins
const CanFly = Base => class extends Base {
  fly() {
    console.log(`${this.name} is flying.`);
  }
};
const WingedAnimal = CanFly(Animal);
const parrot = new WingedAnimal('Parrot');
parrot.speak(); // Parrot makes a noise.
parrot.fly();   // Parrot is flying.

// 4. Composition over Inheritance
function createLogger(owner) {
  return {
    log(msg) {
      console.log(`[${owner.name}] ${msg}`);
    }
  };
}
function createManager(name) {
  const manager = { name };
  const logger = createLogger(manager);
  return {
    ...manager,
    notify(message) {
      logger.log(`Notify: ${message}`);
    }
  };
}
const alice = createManager('Alice');
alice.notify('Meeting at 10AM'); // [Alice] Notify: Meeting at 10AM

/*
Best Practices:
- Use classes and extends for clear "is-a" relationships.
- Avoid deep inheritance hierarchies; prefer mixins or composition.
- Use mixins to share behavior among unrelated classes.
- Favor composition (object factories) for flexible, decoupled design.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

/*
119 - Error Handling: try/catch/finally, Custom Error Objects, Throwing and Rethrowing Errors

This note explains:
1. try/catch/finally syntax and flow.
2. Throwing built-in errors via throw.
3. Defining and using custom Error subclasses.
4. Rethrowing errors for higher-level handling.
5. Best-practice guidelines.
*/

// 1. Basic try/catch/finally
function parseJSON(str) {
  try {
    const obj = JSON.parse(str);
    console.log('Parsed object:', obj);
    return obj;
  } catch (error) {
    console.error('JSON parsing failed:', error.message);
    return null;
  } finally {
    console.log('parseJSON execution finished.');
  }
}

parseJSON('{"valid": true}');
// Output:
// Parsed object: { valid: true }
// parseJSON execution finished.

parseJSON('invalid');
// Output:
// JSON parsing failed: Unexpected token i in JSON at position 0
// parseJSON execution finished.

// 2. Throwing Built-in Errors
function checkPositive(number) {
  if (typeof number !== 'number') {
    throw new TypeError('Expected a number');
  }
  if (number <= 0) {
    throw new RangeError('Number must be positive');
  }
  return number;
}

try {
  checkPositive(-5);
} catch (e) {
  console.error('Error:', e.name, e.message);
}
// Output:
// Error: RangeError Number must be positive

// 3. Custom Error Subclasses
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Missing user.name');
  }
  if (!user.email) {
    throw new ValidationError('Missing user.email');
  }
  console.log('User is valid:', user);
}

try {
  validateUser({ name: 'Ajay' });
} catch (e) {
  if (e instanceof ValidationError) {
    console.warn('Validation warning:', e.message);
  } else {
    throw e;
  }
}
// Output:
// Validation warning: Missing user.email

// 4. Rethrowing for Upstream Handling
function loadData() {
  try {
    // simulate lower-level failure
    throw new Error('Network failure');
  } catch (e) {
    console.error('loadData error:', e.message);
    throw e; // rethrow to let caller handle it too
  }
}

try {
  loadData();
} catch (e) {
  console.error('Upstream handler:', e.message);
}
// Output:
// loadData error: Network failure
// Upstream handler: Network failure

// 5. Best Practices
/*
- Catch only what you can handle; rethrow unexpected errors.
- Use finally for cleanup (e.g., closing resources).
- Create custom Error subclasses for domain-specific issues.
- Always include clear, descriptive messages and set error.name.
- Avoid empty catch blocks—at least log or rethrow.
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
