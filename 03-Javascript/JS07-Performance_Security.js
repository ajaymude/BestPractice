// ⚡ PERFORMANCE OPTIMIZATION
// 120 - Minimizing Reflows and Repaints in the Browser
// 121 - Debounce vs Throttle for event-heavy operations
// 122 - Optimizing loops and algorithmic complexity (Big O notation)
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

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
120 - Minimizing Reflows and Repaints in the Browser

This note explains:
1. What reflows and repaints are and why they’re expensive.
2. Batching DOM reads (measurements) and writes (mutations).
3. Using document fragments to minimize layout thrashing.
4. Avoiding inline style changes in loops; use CSS classes.
5. Leveraging requestAnimationFrame for smooth updates.
*/

// 1. Example causing layout thrashing (bad)
const list = document.getElementById('itemList');
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li);
  // Reading layout each iteration
  const height = list.offsetHeight;               
  console.log('Height after append:', height);
}
// ↳ Each append + height read triggers reflow + repaint → slow

// 2. Batching reads and writes (good)
const itemsToAdd = [];
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  itemsToAdd.push(li);
}
// Batch write using DocumentFragment
const frag = document.createDocumentFragment();
itemsToAdd.forEach(li => frag.appendChild(li));
list.appendChild(frag);  // single reflow + repaint

// 3. Separate measurement and mutation phases
// Measure all first
const widths = [];
const elements = document.querySelectorAll('.measure');
elements.forEach(el => {
  widths.push(el.offsetWidth);
});

// Then apply mutations in a separate loop
elements.forEach((el, idx) => {
  el.style.width = `${widths[idx] / 2}px`;
});
// ↳ Reading first, then writing prevents interleaved reflows

// 4. Use CSS classes instead of inline styles
// CSS:
// .highlight { background-color: yellow; }
// JS toggling class:
// Bad: el.style.backgroundColor = 'yellow';
// Good:
elements.forEach(el => el.classList.add('highlight'));
// ↳ Changing className triggers fewer style recalculations

// 5. requestAnimationFrame for animations
function animate() {
  // Read
  const scrollPos = window.scrollY;
  // Write
  list.style.transform = `translateY(${scrollPos / 2}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Best Practices:
/*
- Batch all reads together, then batch all writes.
- Use DocumentFragment for many node insertions.
- Minimize direct style changes; prefer toggling CSS classes.
- Avoid forcing layout inside loops (offsetWidth, getComputedStyle).
- Use requestAnimationFrame for animation-related writes.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
121 - Debounce vs Throttle for Event-Heavy Operations

This note explains:
1. Debounce – postpone invoking a function until after events stop for a specified delay.
2. Throttle – invoke a function at most once in a specified interval.
3. Typical use cases: input events (debounce), scroll/resize events (throttle).
4. Implementation patterns for debounce and throttle.
5. Best-practice considerations.
*/

// 1. Debounce: fires callback only after no events for `delay` ms
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: debounced input handler
const onResizeDebounced = debounce(() => {
  console.log('Debounced resize:', window.innerWidth, window.innerHeight);
}, 300);
window.addEventListener('resize', onResizeDebounced);

// 2. Throttle: fires callback at most once every `interval` ms
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

// Usage: throttled scroll handler
const onScrollThrottled = throttle(() => {
  console.log('Throttled scroll:', window.scrollY);
}, 200);
window.addEventListener('scroll', onScrollThrottled);

// 3. Example Scenario:
// • Debounce for search input to avoid firing on every keystroke.
// • Throttle for infinite scroll to load data at intervals.

// 4. Best Practices:
/*
- Choose debounce for “final” actions (e.g., form validation, autocomplete).
- Choose throttle for continuous actions (e.g., scroll position updates).
- Clear timers on teardown (e.g., removeEventListener) to prevent memory leaks.
- Provide leading/trailing options in advanced implementations if needed.
- Test delays/intervals on real devices to balance responsiveness and performance.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
122 - Optimizing Loops and Algorithmic Complexity (Big O Notation)

This note explains:
1. Big O categories: O(1), O(n), O(n²), etc.
2. Examples of constant, linear, and quadratic algorithms.
3. Loop optimizations: caching length, early exits, separating concerns.
4. Using efficient data structures (Set) to reduce complexity.
5. Best-practice guidelines for writing performant code.
*/

// 1. O(1) – Constant Time: e.g., accessing an array element
const arr = [10, 20, 30, 40];
console.log('O(1) access arr[2]:', arr[2]); // always one operation

// 2. O(n) – Linear Time: single loop over n items
function sumArray(a) {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    total += a[i];
  }
  return total;
}
console.log('O(n) sumArray:', sumArray(arr)); // scales linearly with arr.length

// 3. O(n²) – Quadratic Time: nested loops over n items
function hasDuplicateNaive(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] === a[j]) return true;
    }
  }
  return false;
}
console.log('O(n²) hasDuplicateNaive:', hasDuplicateNaive([1,2,3,2])); // true

// 4. Loop Optimizations
// 4a. Cache length to avoid re-evaluating each iteration
function sumCached(a) {
  let total = 0;
  for (let i = 0, len = a.length; i < len; i++) {
    total += a[i];
  }
  return total;
}
console.log('sumCached:', sumCached(arr));

// 4b. Early exit to reduce average case
function findFirstEven(a) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] % 2 === 0) return a[i]; // stops as soon as it finds one
  }
  return null;
}
console.log('findFirstEven:', findFirstEven(arr));

// 5. Reducing Quadratic to Linear using Set
function hasDuplicateOptimized(a) {
  const seen = new Set();
  for (const val of a) {
    if (seen.has(val)) return true;
    seen.add(val);
  }
  return false;
}
console.log('O(n) hasDuplicateOptimized:', hasDuplicateOptimized([1,2,3,2])); // true

/*
Best Practices:
- Identify the complexity: prefer O(1) or O(n) over O(n²) for large data.
- Cache recurring values (e.g., array length) outside loops.
- Use early returns to break loops when condition met.
- Replace nested loops with hash-based structures (Set, Map) when possible.
- Keep loops simple: separate data gathering and processing if needed.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
123 - Memory Leaks: Common Causes in JS (Forgotten Timers, Detached DOM Nodes)

This note explains:
1. Forgotten timers (setInterval without clearInterval)
2. Detached DOM nodes retaining event listeners
3. Closures holding large data in memory
4. Global variables preventing garbage collection
5. Best-practice guidelines
*/

// 1. Forgotten Timers (memory leak via setInterval)
function startLeakingInterval() {
  const id = setInterval(() => {
    console.log('Interval tick'); // this will run forever unless cleared
  }, 1000);
  // Missing clearInterval(id) causes the interval, and its closure, to persist
}
// startLeakingInterval();

// 2. Detached DOM Nodes retaining listeners
function addDetachedNodeListener() {
  const btn = document.createElement('button');
  btn.textContent = 'Click me';
  btn.addEventListener('click', () => console.log('Clicked')); // attached listener
  document.body.appendChild(btn);
  document.body.removeChild(btn); // btn is removed from DOM but listener closure stays alive
}
// addDetachedNodeListener();

// 3. Closures holding large data
function createLeakyClosure() {
  const bigArray = new Array(1e6).fill('*'); // large array
  return function() {
    console.log(bigArray[0]); // bigArray remains in memory as long as this function exists
  };
}
const closureRef = createLeakyClosure();
// closureRef();

// 4. Global Variables
var leakedData = new Array(1e6).fill('leak'); // never goes out of scope, cannot be GC'd

// 5. Best Practices:
/*
- Always clear timers: 
    const id = setInterval(...); 
    clearInterval(id) when no longer needed.

- Remove event listeners before removing elements:
    btn.removeEventListener('click', handler);

- Avoid unnecessary closures over large structures; nullify references:
    closureRef = null;

- Minimize global variables; wrap in modules or use block scope:
    let data; // instead of var

- Use WeakMap/WeakSet for data associated with DOM elements to allow GC.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
124 - Optimizing DOM Access: Batch Reads/Writes, Document Fragments

This note explains:
1. The cost of interleaving DOM reads and writes (layout thrashing).
2. Batching all reads before writes.
3. Using DocumentFragment to minimize reflows on many insertions.
4. Reading dimensions in one pass, then applying style changes.
5. Best-practice guidelines.
*/

// Setup demo container
const container = document.getElementById('demoContainer') || document.body.appendChild(document.createElement('div'));
container.id = 'demoContainer';
container.innerHTML = '<ul id="itemList"></ul>';
const list = document.getElementById('itemList');

// 1. Naive interleaved reads/writes (inefficient)
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li);
  // Interleaved read
  console.log('Height after append:', list.offsetHeight);
}

// Clear list for next example
list.innerHTML = '';

// 2. Batch writes with DocumentFragment (efficient)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
list.appendChild(fragment);  // single reflow
console.log('Appended 100 items with one reflow.');

// 3. Batch reads then batch writes
const items = Array.from(list.children);
const heights = items.map(el => el.offsetHeight); // batch read
items.forEach((el, idx) => {
  el.style.height = `${heights[idx] / 2}px`;       // batch write
});
console.log('Read heights then applied half-height to each item.');

// 4. Using CSS classes for mass style changes
// Define .highlight { background: yellow; }
// Then:
list.classList.add('highlight-container');
console.log('Added CSS class for bulk style, avoiding inline writes.');

// Best Practices:
/*
- Separate all DOM reads (offset*, getComputedStyle) from writes (style changes, classList) into distinct phases.
- Use DocumentFragment for bulk element insertion to trigger one layout.
- Leverage CSS classes for uniform style updates rather than inline style in loops.
- Minimize access to layout-triggering properties inside loops.
- Profile with DevTools to verify reduced layout and paint events.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
125 - Lazy Loading Resources: dynamic import, IntersectionObserver for images

This note explains:
1. dynamic import() syntax for code-splitting modules on demand.
2. Using IntersectionObserver to lazy-load images as they enter the viewport.
3. Fallback handling for browsers without IntersectionObserver.
4. Example: loading an analytics module on button click.
5. Example: lazy-loading images with data-src attributes.
6. Best-practice guidelines.
*/

// Assume corresponding HTML:
// <button id="loadAnalytics">Load Analytics</button>
// <img data-src="image1.jpg" alt="Image 1">
// <img data-src="image2.jpg" alt="Image 2">

// 1. dynamic import() for on-demand code loading
const analyticsBtn = document.getElementById('loadAnalytics');
analyticsBtn.addEventListener('click', async () => {
  // load analytics.js only when needed
  const { initAnalytics } = await import('./analytics.js');
  initAnalytics(); // initialize analytics
});

// 2. IntersectionObserver setup for lazy-loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;     // set actual image source
      img.removeAttribute('data-src');
      observer.unobserve(img);       // stop observing once loaded
    }
  });
}, {
  rootMargin: '0px 0px 200px 0px',   // preload when 200px before viewport
  threshold: 0.1                     // trigger when 10% visible
});

// 3. Observe each lazy image
lazyImages.forEach(img => imageObserver.observe(img));

// 4. Fallback for browsers without IntersectionObserver
if (!('IntersectionObserver' in window)) {
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

// 5. Example analytics.js module (src/analytics.js)
// export function initAnalytics() {
//   console.log('Analytics initialized');
// }

// Best Practices:
/*
- Use dynamic import for large or rarely used modules (analytics, charts).
- Configure rootMargin in IntersectionObserver to preload resources just before view.
- Provide a fallback that loads all images immediately if IntersectionObserver is unsupported.
- Clean up observers (unobserve) after loading to free memory.
- Combine with responsive images (srcset) to optimize bandwidth.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



/*
126 - Web Workers for Offloading Heavy Computation

This note explains:
1. Creating a Web Worker (worker.js) for background tasks.
2. Posting messages to and from the worker.
3. Terminating workers to free resources.
4. Example: computing Fibonacci numbers in the worker.
5. Handling results in the main thread.
*/

// worker.js (save this as a separate file in your project)
self.addEventListener('message', function(e) {
  const n = e.data;
  // Heavy computation: naive recursive Fibonacci
  function fib(x) {
    return x < 2 ? x : fib(x - 1) + fib(x - 2);
  }
  const result = fib(n);
  postMessage(result);
});

// main.js (in the main thread)
const worker = new Worker('worker.js'); // path relative to HTML

// Listen for results from the worker
worker.addEventListener('message', function(e) {
  console.log('Fibonacci result from worker:', e.data);
  worker.terminate(); // stop the worker once done
});

// Offload a heavy computation without blocking the UI
const input = 40;
console.log(`Posting message to worker to compute fib(${input})`);
worker.postMessage(input);

/*
Best Practices:
- Always terminate workers when they’re no longer needed to release threads.
- Use dedicated worker files; avoid inline blobs for complex logic.
- Communicate via postMessage and structured-cloneable data.
- Keep UI thread free by moving CPU-intensive loops into workers.
- For multiple tasks, consider a pool of reusable workers.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
127 - Service Workers for Caching, Offline-First Strategies (Intro)

This note explains:
1. Registering a service worker from your main script.
2. service-worker.js lifecycle: install, activate, fetch events.
3. Static asset caching during install.
4. Cache-first vs network-first strategies.
5. Cleaning up old caches.
6. Best-practice considerations for offline support.
*/

// 1. Register the Service Worker in main.js (or index.js)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}

// 2. service-worker.js (at project root)
// Version your cache to manage updates
const CACHE_NAME = 'my-app-cache-v1';
const ASSETS_TO_CACHE = [
  '/',               // HTML entry
  '/index.html',
  '/styles.css',
  '/app.js',
  '/logo.png'
];

// 3. Install event: cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// 4. Activate event: cleanup old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: activate');
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// 5. Fetch event: serve from cache-first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;                      // serve from cache
      }
      return fetch(event.request)           // fetch from network
        .then(response => {
          // cache newly fetched assets
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // optional: return fallback offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

/*
Best Practices:
- Version your cache (CACHE_NAME) and clean up old caches on activate.
- Use skipWaiting() and clients.claim() for immediate control.
- Choose cache-first for static assets, network-first for APIs/data.
- Provide an offline fallback page to improve UX when offline.
- Test with DevTools “Offline” mode to verify behavior.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
128 - Avoiding Cross-Site Scripting (XSS): Sanitizing User Input, innerText vs innerHTML

This note explains:
1. What XSS is and why using innerHTML is risky.
2. Using textContent or innerText to safely insert untrusted text.
3. Sanitizing HTML using a library (DOMPurify) before using innerHTML.
4. Example of vulnerable vs safe code.
5. Best-practice guidelines.
*/

// 1. Vulnerable example: directly inserting user input into innerHTML
const userInput = '<img src=x onerror="alert(\'XSS Attack\')">';
const vulnerableDiv = document.getElementById('vulnerable');
vulnerableDiv.innerHTML = userInput; // Executes onerror → XSS!

// 2. Safe insertion using textContent (or innerText)
const safeDiv = document.getElementById('safe');
safeDiv.textContent = userInput; 
// Displays literal HTML tags, no script execution

// 3. Sanitizing user input before using innerHTML
// Include DOMPurify via:
// <script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
const purifiedDiv = document.getElementById('purified');
const cleanHTML = DOMPurify.sanitize(userInput);
purifiedDiv.innerHTML = cleanHTML; 
// Unwanted attributes/scripts removed

// 4. Manual basic sanitization (naïve, limited)
// Remove <script> tags only (not comprehensive)
function naiveSanitize(str) {
  return str.replace(/<script.*?>.*?<\/script>/gi, '');
}
const naiveDiv = document.getElementById('naive');
naiveDiv.innerHTML = naiveSanitize(userInput);

// 5. Best Practices:
/*
- Never trust user-provided HTML; avoid innerHTML for untrusted content.
- Use textContent or innerText to display text safely.
- For HTML insertion, use a well-maintained sanitizer like DOMPurify.
- Validate and encode user inputs on both client and server.
- Implement a Content Security Policy (CSP) header to mitigate XSS risks.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*
129 - Content Security Policy (CSP) Basics and Implementation

This note explains:
1. What CSP is and its purpose.
2. Implementing CSP via HTTP headers.
3. Implementing CSP via HTML <meta> tag.
4. Common directives.
5. Reporting violations.
6. Best-practice guidelines.
*/

// 1. What is CSP?
// CSP helps prevent XSS and data injection attacks by whitelisting trusted sources 
// for scripts, styles, images, etc. Browsers block any resource not matching the policy.

// 2. Setting CSP via HTTP header (Express example)
const express = require('express');
const app = express();

// Apply a strict CSP header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    // Allow only same-origin by default
    "default-src 'self'; " +
    // Allow scripts only from self
    "script-src 'self'; " +
    // Allow styles from self and Google Fonts
    "style-src 'self' https://fonts.googleapis.com; " +
    // Allow fonts from self and Google Fonts CDN
    "font-src 'self' https://fonts.gstatic.com; " +
    // Allow images from self and data URIs
    "img-src 'self' data:; " +
    // Allow AJAX only to own origin and API
    "connect-src 'self' https://api.example.com; " +
    // Disallow all objects
    "object-src 'none'; " +
    // Restrict base URI
    "base-uri 'self'; " +
    // Report violations here
    "report-uri /csp-report-endpoint"
  );
  next();
});

// 3. Setting CSP via <meta> tag (in <head> of your HTML)
/*
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self';
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://api.example.com;
  object-src 'none';
  base-uri 'self';
  report-uri /csp-report-endpoint
">
*/

// 4. Common Directives Example
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc:  ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
  styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  imgSrc:     ["'self'", "data:"],
  connectSrc: ["'self'", "https://api.example.com"],
  fontSrc:    ["'self'", "https://fonts.gstatic.com"],
  objectSrc:  ["'none'"],
  baseUri:    ["'self'"],
  frameAncestors: ["'none'"]
};
console.log('Example CSP directives:', cspDirectives);

// 5. Reporting Violations (Express endpoint)
app.post('/csp-report-endpoint', express.json({ type: ['application/csp-report'] }), (req, res) => {
  console.warn('CSP Violation:', req.body['csp-report']);
  res.status(204).end(); // No content
});

// 6. Best Practices:
/*
- Begin with a restrictive default-src and add exceptions as needed.
- Avoid 'unsafe-inline' and 'unsafe-eval'; use nonces or hashes for inline code.
- Test with Content-Security-Policy-Report-Only before enforcing.
- Use report-uri or the newer report-to directive to monitor violations.
- Keep .meta and HTTP header policies in sync to avoid confusion.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



/*
130 - Preventing Cross-Site Request Forgery (CSRF) in AJAX Calls

This note explains:
1. What CSRF is and why AJAX is vulnerable.
2. Using SameSite cookies to block cross‐site requests.
3. Implementing CSRF tokens: generation, inclusion in requests, and server validation.
4. Double-submit cookie pattern for SPAs.
5. Best-practice guidelines.
*/

// 1. CSRF Overview:
// • A malicious site can make the browser send authenticated AJAX requests to your API.
// • You need proof that the request originated from your trusted client.

// 2. SameSite Cookie Attribute (simplest defense)
// In server-set Set-Cookie header:
//   Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict
// → Browser will omit the cookie on cross‐site requests, preventing CSRF.

// 3. CSRF Token Pattern

// On initial page load, server embeds a CSRF token:
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Example <head> in HTML:
// <meta name="csrf-token" content="RANDOM_TOKEN_FROM_SERVER">

// AJAX call including CSRF token in header
fetch('/api/updateProfile', {
  method: 'POST',
  credentials: 'include',       // send session cookie
  headers: {
    'Content-Type': 'application/json',
    'CSRF-Token': csrfToken     // custom header your server checks
  },
  body: JSON.stringify({ name: 'Ajay' })
})
  .then(res => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  })
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));

// 4. Double-Submit Cookie Pattern (for SPAs without server-rendered meta)
// • Server sets a cookie `csrfToken=RANDOM`
// • Client JavaScript reads cookie and sends it in a header

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const [key, val] = v.split('=');
    return key === name ? decodeURIComponent(val) : r;
  }, '');
}

const tokenFromCookie = getCookie('csrfToken');
fetch('/api/submit', {
  method: 'POST',
  credentials: 'include',
  headers: { 'X-CSRF-Token': tokenFromCookie },
  body: JSON.stringify({ data: 123 })
});

// 5. Server-Side Validation (pseudo-code)
// function handleRequest(req) {
//   const sessionToken = req.cookies.csrfToken;          // from cookie
//   const headerToken  = req.headers['x-csrf-token'];     // from header
//   if (!sessionToken || sessionToken !== headerToken) {
//     return res.status(403).send('CSRF validation failed');
//   }
//   // proceed with request...
// }

// 6. Best Practices:
/*
- Use SameSite=Strict or Lax on sensitive session cookies to block most CSRF.
- Embed a cryptographically strong CSRF token in a meta tag or cookie.
- Always validate token on the server by comparing header/body value to server-side store or cookie.
- Rotate tokens per session or per request to limit replay.
- Avoid relying solely on Origin/Referer headers—may be absent or spoofable.
- Combine cookie attributes (Secure, HttpOnly, SameSite) with CSRF tokens for defense in depth.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
131 - Secure Handling of JWTs and Tokens in Front-End: HttpOnly Cookies vs localStorage

This note explains:
1. Storing JWTs in HttpOnly, Secure cookies and their security benefits.
2. Risks of storing JWTs in localStorage or sessionStorage.
3. Making authenticated requests with cookies (credentials).
4. CSRF protection considerations when using cookies.
5. Login/logout flow examples for both methods.
6. Best-practice guidelines for token management.
*/

// 1. HttpOnly Cookie Approach (✅ Recommended)

// Server-side sets the cookie on login (example in Express.js):
// res.cookie('token', jwtToken, {
//   httpOnly: true,      // inaccessible to JavaScript
//   secure: true,        // only over HTTPS
//   sameSite: 'Strict',  // CSRF mitigation
//   path: '/api'
// });

// Client-side: Include credentials in every request; no direct access to token
fetch('/api/profile', {
  method: 'GET',
  credentials: 'include' // sends HttpOnly cookie automatically
})
  .then(res => {
    if (!res.ok) throw new Error('Auth failed');
    return res.json();
  })
  .then(profile => console.log('Profile:', profile))
  .catch(err => console.error(err));

// Logout by clearing the cookie server-side:
// fetch('/api/logout', { method: 'POST', credentials: 'include' });

// 2. localStorage Approach (⚠️ Not Recommended)

// On successful login:
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token); // accessible via JS
  });

// Authenticated request using Authorization header:
const token = localStorage.getItem('token');
fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(profile => console.log('Profile:', profile));

// Logout by removing token:
localStorage.removeItem('token');

// 3. CSRF Considerations with Cookies

// When using cookies, defend against CSRF by:
// • Setting SameSite=Strict or Lax on the token cookie.
// • Using double-submit CSRF tokens in a separate cookie + header.
// • Validating Origin/Referer headers server-side.

// 4. Comparing Risks

// HttpOnly Cookies:
//  - ❌ Immune to XSS token theft
//  - ⚠️ Vulnerable to CSRF if SameSite not set
// localStorage:
//  - ✅ Not sent automatically on cross-site requests (no CSRF risk)
//  - ❌ Exposed to XSS attacks, tokens can be stolen

// 5. Best Practices:
/*
- Prefer HttpOnly, Secure cookies with SameSite for storing JWTs.
- Never store sensitive tokens in localStorage or sessionStorage.
- Always use HTTPS to protect cookies in transit.
- Implement CSRF protections (SameSite, anti-CSRF tokens) when using cookies.
- On logout, clear cookies server-side and invalidate tokens.
- For SPAs, use cookie-based auth + CSRF tokens rather than Authorization headers.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
132 - Safe Use of eval(), Function(), and Dynamic Code Execution

This note explains:
1. Risks of eval() and Function(): XSS, performance, debugging difficulty.
2. Safe alternatives: JSON.parse for data, dynamic import for code.
3. Sanitizing inputs before any dynamic execution.
4. Example patterns: trusted vs untrusted code.
5. Best-practice guidelines to avoid eval-like pitfalls.
*/

// 1. Risky eval() on untrusted input (❌ avoid)
const untrusted = "2 + 3; alert('XSS via eval!')";
try {
  // If untrusted came from user, it could run malicious code
  const unsafeResult = eval(untrusted);
  console.log('unsafeResult:', unsafeResult);
} catch (e) {
  console.error('Eval error:', e);
}

// 2. Safe data parsing with JSON.parse (✅ use instead of eval for data)
const jsonString = '{"x":1,"y":2}';
try {
  const data = JSON.parse(jsonString);
  console.log('Parsed JSON:', data);
} catch (e) {
  console.error('JSON parse error:', e);
}

// 3. Using Function constructor only with trusted code (⚠️ use sparingly)
const add = new Function('a', 'b', 'return a + b;');  // code is hard-coded
console.log('add(4,5):', add(4, 5));                  // 9

// 4. Sanitizing before dynamic execution (example stub)
function sanitizeCode(code) {
  // very basic check: disallow certain keywords
  if (/\\b(alert|document|window)\\b/.test(code)) {
    throw new Error('Unsafe code detected');
  }
  return code;
}
try {
  const userCode = "a * b";                          // from a trusted source only
  const safeCode = sanitizeCode(userCode);
  const mul = new Function('a', 'b', `return ${safeCode};`);
  console.log('mul(3,7):', mul(3, 7));                // 21
} catch (e) {
  console.error('Code sanitization error:', e);
}

// 5. Dynamic import() as a safe alternative for code-splitting
// (only loads modules you control)
async function loadModule(name) {
  try {
    const mod = await import(`./modules/${name}.js`);
    console.log(`Loaded module ${name}:`, mod);
  } catch (e) {
    console.error('Dynamic import error:', e);
  }
}
// loadModule('analytics');

// 6. Best Practices:
/*
- Never use eval() on strings derived from user input.
- Prefer JSON.parse() for data, not eval().
- If you must generate code, use Function only with hard-coded or thoroughly sanitized strings.
- Consider dynamic import() to load code modules you control, avoiding inline code eval.
- Avoid constructing code via template concatenation; use strict whitelisting or parsers.
- Remember dynamic code hinders debugging and static analysis—use sparingly.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
133 - RESTful API Principles: CRUD Operations, Status Codes

This note explains:
1. CRUD mapping to HTTP methods and resource URLs
2. Common HTTP status codes for success and errors
3. Example Express routes for GET, POST, PUT, DELETE
4. Sending proper JSON responses and status codes
5. Best-practice guidelines
*/

// Express setup (install with `npm install express`)
const express = require('express');
const app = express();
app.use(express.json()); // parse JSON bodies

// In-memory “database”
let items = []; 
let nextId = 1;

// 1. CREATE → POST /items
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' }); // Bad Request
  }
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem); // Created
});

// 2. READ ALL → GET /items
app.get('/items', (req, res) => {
  res.status(200).json(items); // OK
});

// 3. READ ONE → GET /items/:id
app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' }); // Not Found
  }
  res.status(200).json(item); // OK
});

// 4. UPDATE → PUT /items/:id
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' }); // Not Found
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' }); // Bad Request
  }
  item.name = name;
  res.status(200).json(item); // OK
});

// 5. DELETE → DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' }); // Not Found
  }
  items.splice(index, 1);
  res.sendStatus(204); // No Content
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

/*
Best Practices:
- Use nouns (resources) in URLs, not verbs (e.g., /items not /getItems).
- Map CRUD to HTTP methods: POST, GET, PUT/PATCH, DELETE.
- Return 201 with the created resource on POST.
- Return 200 with JSON data for successful GET/PUT.
- Return 204 No Content for successful DELETE.
- Validate input and return 400 Bad Request for invalid data.
- Return 404 Not Found when a resource doesn’t exist.
- Handle unexpected errors with 500 Internal Server Error (via middleware).
*/


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
134 - Working with JSON Data: parse(), stringify(), Handling Large JSON

This note explains:
1. JSON.parse() – converting a JSON string into a JavaScript object with error handling.
2. JSON.stringify() – converting a JavaScript object into a JSON string, using replacers and pretty-printing.
3. Handling large JSON payloads – chunked processing to avoid blocking and high memory usage.
*/

// 1. JSON.parse() with error handling
const validJson = '{"id":1,"name":"Item"}';
const invalidJson = '{id:1,name:"Item"}'; // invalid JSON

function safeParse(jsonStr) {
  try {
    const obj = JSON.parse(jsonStr);
    console.log('Parsed object:', obj);
    return obj;
  } catch (err) {
    console.error('JSON.parse error:', err.message);
    return null;
  }
}

safeParse(validJson);    // Parsed object: { id: 1, name: 'Item' }
safeParse(invalidJson);  // JSON.parse error: Unexpected token i in JSON at position 1

// 2. JSON.stringify() with replacer and spacing
const user = {
  id: 42,
  name: 'Alice',
  password: 'secret',     // we might not want to serialize this
  preferences: { theme: 'dark' }
};

// Replacer to omit the password field
function userReplacer(key, value) {
  if (key === 'password') return undefined;
  return value;
}

// Pretty-print with 2-space indentation
const jsonString = JSON.stringify(user, userReplacer, 2);
console.log('Stringified user:', jsonString);
/*
Stringified user:
{
  "id": 42,
  "name": "Alice",
  "preferences": {
    "theme": "dark"
  }
}
*/

// 3. Handling Large JSON Payloads
// Simulate a large JSON array of objects
const largeArray = Array.from({ length: 10000 }, (_, i) => ({ index: i, value: `Item${i}` }));
const largeJsonStr = JSON.stringify(largeArray);

// Naïve parse (may block and use lots of memory)
console.time('naiveParse');
const fullData = JSON.parse(largeJsonStr);
console.timeEnd('naiveParse'); // e.g. ~50ms

// Chunked processing: parse fully but process items in batches to avoid UI freeze
console.time('chunkedProcessing');
const BATCH_SIZE = 1000;
for (let i = 0; i < fullData.length; i += BATCH_SIZE) {
  const batch = fullData.slice(i, i + BATCH_SIZE);
  // processBatch(batch) – your batch processing logic here
  console.log(`Processed items ${i}–${i + batch.length - 1}`);
}
console.timeEnd('chunkedProcessing');

// Streaming parse example (Node.js, using JSONStream)
// const fs = require('fs');
// const JSONStream = require('JSONStream');
// fs.createReadStream('large.json')
//   .pipe(JSONStream.parse('*'))
//   .on('data', obj => {
//     // process each object without loading all into memory
//     console.log('Streamed item:', obj);
//   });

// Best Practices:
/*
- Always wrap JSON.parse in try/catch for robust error handling.
- Use JSON.stringify replacers to exclude sensitive data.
- Pretty-print with the third argument of stringify for readable logs.
- For very large JSON, process in batches or use streaming parsers (JSONStream in Node.js).
- Avoid blocking the main thread: batch work with setTimeout or requestIdleCallback between chunks.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
135 - GraphQL Basics: Queries vs Mutations, Using GraphQL Client Libraries (Apollo, URQL)

This note explains:
1. GraphQL operations: Query (read-only) vs Mutation (write).
2. Using Apollo Client to fetch queries and perform mutations.
3. Using URQL to fetch queries and perform mutations.
4. Key differences and setup for both clients.
5. Best-practice guidelines.
*/

// 1. GraphQL Query vs Mutation
const GET_USERS = `
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
const CREATE_USER = `
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

// 2. Apollo Client Usage
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

// Fetch data
apolloClient
  .query({
    query: gql(GET_USERS),
  })
  .then(result => console.log('Apollo query result:', result.data.users))
  .catch(error => console.error('Apollo query error:', error));

// Perform mutation
apolloClient
  .mutate({
    mutation: gql(CREATE_USER),
    variables: { name: 'Ajay', email: 'ajay@example.com' },
  })
  .then(result => console.log('Apollo mutation result:', result.data.createUser))
  .catch(error => console.error('Apollo mutation error:', error));

// 3. URQL Client Usage
import { createClient, gql as urqlGql } from 'urql';

const urqlClient = createClient({
  url: 'https://api.example.com/graphql',
});

// Fetch data
urqlClient
  .query(urqlGql(GET_USERS))
  .toPromise()
  .then(result => console.log('URQL query result:', result.data.users))
  .catch(error => console.error('URQL query error:', error));

// Perform mutation
urqlClient
  .mutation(urqlGql(CREATE_USER), { name: 'Riya', email: 'riya@example.com' })
  .toPromise()
  .then(result => console.log('URQL mutation result:', result.data.createUser))
  .catch(error => console.error('URQL mutation error:', error));

// 4. Client Differences
// Apollo: full-featured caching and tooling.
// URQL: lightweight, modular, smaller bundle.

// 5. Best Practices:
/*
- Use Query for data retrieval, Mutation for state-changing operations.
- Always use variables (no string interpolation) to avoid injection.
- Handle errors in .catch() or using error policies.
- Choose your client based on app requirements: caching needs vs bundle size.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
136 - WebSockets for real-time communication: WebSocket API, libraries like Socket.IO

This note explains:
1. Native WebSocket API – client and server examples
2. Sending and receiving messages
3. Handling connection lifecycle events (open, message, error, close)
4. Socket.IO – simplified API with fallbacks and rooms
5. Server-side Socket.IO setup
6. Best practices: reconnection, heartbeats, secure WSS
*/

// 1. Native WebSocket Client
const ws = new WebSocket('wss://example.com/socket');
ws.onopen = () => {
  console.log('WebSocket open');
  ws.send('Hello from client');
};
ws.onmessage = e => console.log('Received message:', e.data);
ws.onerror = e => console.error('WebSocket error:', e);
ws.onclose = e => console.log('WebSocket closed:', e.code, e.reason);

// 2. Native WebSocket Server (Node.js with ws)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', socket => {
  console.log('Client connected');
  socket.on('message', msg => {
    console.log('Server received:', msg);
    socket.send(`Echo: ${msg}`);
  });
  socket.on('close', () => console.log('Client disconnected'));
});

// 3. Socket.IO Server (Node.js)
const http = require('http').createServer();
const io = require('socket.io')(http);
io.on('connection', socket => {
  console.log('Socket.IO client connected:', socket.id);
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => console.log('Socket.IO client disconnected'));
});
http.listen(3000, () => console.log('Socket.IO server listening on port 3000'));

// 4. Socket.IO Client
import { io as createSocket } from 'socket.io-client';
const socketIoClient = createSocket('https://example.com', { transports: ['websocket'] });
socketIoClient.on('connect', () => console.log('Connected, ID:', socketIoClient.id));
socketIoClient.emit('chat message', 'Hello World');
socketIoClient.on('chat message', msg => console.log('Chat message:', msg));

// Best Practices:
/*
- Use ping/pong or heartbeat protocols to detect broken connections and auto-reconnect.
- Implement exponential backoff for reconnection attempts.
- Always use wss:// (TLS) in production to secure data in transit.
- Validate and sanitize all incoming messages on the server to prevent injection attacks.
- Clean up event listeners (e.g., socket.removeAllListeners()) to avoid memory leaks.
- Choose Socket.IO if you need automatic fallback transports, rooms, and built-in reconnection.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*
137 - Server-Sent Events (SSE) for One-Way Data Streaming

This note explains:
1. What SSE is and how it differs from WebSockets.
2. Server-side implementation using Node.js and Express.
3. Client-side usage with EventSource.
4. Sending periodic updates from the server.
5. Automatic reconnection and closing the connection.
6. Best-practice guidelines.
*/

//
// 1. Server-Side: Express SSE Endpoint (server.js)
//
const express = require('express');
const app = express();

app.get('/stream', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a comment to keep connection alive in some proxies
  res.write(': connected\n\n');

  // Send an event every second
  const intervalId = setInterval(() => {
    const data = { time: new Date().toISOString() };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => console.log('SSE server listening on port 3000'));


//
// 2. Client-Side: Using EventSource (index.html)
//
/*
<!DOCTYPE html>
<html>
<head><title>SSE Demo</title></head>
<body>
  <h1>Server-Sent Events Demo</h1>
  <div id="output"></div>
  <script>
    // Create EventSource to listen to /stream
    const eventSource = new EventSource('/stream');

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      document.getElementById('output').textContent =
        `Server time: ${data.time}`;
    };

    eventSource.onerror = err => {
      console.error('SSE error:', err);
      // Connection will automatically retry by default
    };
  </script>
</body>
</html>
*/

//
// 3. Notes on Behavior
// • SSE is unidirectional: server → client only.
// • The client reconnects automatically on network errors.
// • You can send custom named events using:
//     res.write('event: update\n');
//     res.write(`data: ${JSON.stringify(payload)}\n\n`);
//
// 4. Best Practices:
/*
- Keep messages small and JSON-encoded for easy parsing.
- Send a heartbeat comment (`: keep-alive\n\n`) every 30s to prevent timeouts.
- Handle eventSource.onerror to notify users of disconnects.
- Use HTTPS in production (wss not needed; SSE over HTTPS is secure).
- For bidirectional communication, consider WebSockets or Socket.IO instead.
*/


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
138 - Fetching Binary Data: ArrayBuffer, Blob, FileReader

This note explains:
1. Using fetch() to retrieve binary data as ArrayBuffer or Blob.
2. Converting ArrayBuffer to typed arrays (Uint8Array).
3. Creating object URLs from Blobs for use in <img> or <a> elements.
4. Reading Blobs with FileReader for text or data URL.
5. Best-practice guidelines for handling binary data.
*/

// 1. Fetch binary as ArrayBuffer
fetch('https://example.com/data.bin')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.arrayBuffer();
  })
  .then(buffer => {
    console.log('ArrayBuffer byteLength:', buffer.byteLength);
    // 2. Convert to typed array for processing
    const bytes = new Uint8Array(buffer);
    console.log('First 10 bytes:', bytes.slice(0, 10));
  })
  .catch(error => console.error('Fetch ArrayBuffer error:', error));

// 3. Fetch binary as Blob and create object URL
fetch('https://example.com/image.png')
  .then(response => response.blob())
  .then(blob => {
    console.log('Fetched Blob size:', blob.size, 'type:', blob.type);
    const img = document.createElement('img');
    // Create a temporary URL for the blob
    img.src = URL.createObjectURL(blob);
    img.alt = 'Fetched from Blob';
    document.body.appendChild(img);
    // Revoke URL after image loads to free memory
    img.onload = () => URL.revokeObjectURL(img.src);
  })
  .catch(error => console.error('Fetch Blob error:', error));

// 4. Reading Blob with FileReader
fetch('https://example.com/textfile.txt')
  .then(res => res.blob())
  .then(blob => {
    const reader = new FileReader();
    // a) Read as text
    reader.onload = () => {
      console.log('FileReader text result:', reader.result);
    };
    // b) Or read as data URL (base64)
    // reader.readAsDataURL(blob);
    reader.readAsText(blob);
  })
  .catch(error => console.error('FileReader error:', error));

// 5. Best Practices:
/*
- Prefer response.arrayBuffer() for raw binary processing.
- Use Blob and URL.createObjectURL() to display or download binary data without base64 overhead.
- Always revokeObjectURL() after use to avoid memory leaks.
- For small text files or images, FileReader.readAsDataURL can embed content directly.
- Handle errors on both network and parsing stages.
- Respect CORS: ensure server sends appropriate Access-Control-Allow-Origin header for binary endpoints.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
139 - Browser Storage: localStorage, sessionStorage, Differences and Use Cases

This note explains:
1. localStorage – persistent key/value storage per origin, survives browser restarts.
2. sessionStorage – per-tab key/value storage, cleared when the tab/window is closed.
3. Differences – lifetime, scope, storage limits (≈5MB), accessibility.
4. Use cases – localStorage for user preferences, caching; sessionStorage for temporary form state, one-time flags.
5. Best-practice guidelines – JSON serialization, quota handling, security considerations.
*/

// 1. localStorage: persistent across sessions
// Set a value
localStorage.setItem('theme', 'dark');
// Get a value
console.log('localStorage theme:', localStorage.getItem('theme'));
// Remove a value
localStorage.removeItem('theme');
// Clear all localStorage for this origin
// localStorage.clear();

// 2. sessionStorage: per-tab persistence
sessionStorage.setItem('sessionID', 'abc123');
console.log('sessionStorage sessionID:', sessionStorage.getItem('sessionID'));
sessionStorage.removeItem('sessionID');

// 3. Storing complex data via JSON
const user = { id: 1, name: 'Ajay', prefs: { notifications: true } };
localStorage.setItem('user', JSON.stringify(user));
const stored = JSON.parse(localStorage.getItem('user'));
console.log('Parsed user from localStorage:', stored);

// 4. Lifecycle demonstration (try this in console):
// Open two tabs on the same origin:
//  • Tab A: sessionStorage.setItem('x','1');
//  • Tab B: console.log(sessionStorage.getItem('x')); // null (different session)
//  • localStorage.setItem('y','2');
//  • Both Tab A and B: console.log(localStorage.getItem('y')); // "2"

// 5. Handling storage quota exceptions
try {
  // Attempt to fill storage beyond limit
  let large = 'x'.repeat(1024 * 1024 * 6); // ~6MB
  localStorage.setItem('big', large);
} catch (e) {
  console.error('Storage quota exceeded:', e);
}

// 6. Best Practices:
/*
- Serialize objects with JSON.stringify/parse.
- Wrap storage calls in try/catch to handle QuotaExceededError.
- Do not store sensitive data (tokens, PII) in localStorage/sessionStorage.
- Consider expiry logic manually (store timestamp + value).
- Use cookies with HttpOnly for truly secure tokens.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
140 - IndexedDB Basics: Storing Structured Data, Key–Value Object Stores

This note explains:
1. Opening a database with versioning and onupgradeneeded.
2. Creating object stores with keyPath and indexes.
3. Performing CRUD operations: add, get, getAll, put (update), delete.
4. Handling transactions, success and error events.
5. Using async/await wrappers for cleaner code.
*/

// 1. Open (or create) the database with versioning
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDB', 1);
    request.onupgradeneeded = event => {
      const db = event.target.result;
      // Create 'users' store with autoIncrementing 'id'
      if (!db.objectStoreNames.contains('users')) {
        const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        // Create an index on the 'name' property
        store.createIndex('nameIdx', 'name', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 2. Add a record to the 'users' store
async function addUser(user) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    const addReq = store.add(user);
    addReq.onsuccess = () => resolve(addReq.result); // returns the new id
    addReq.onerror = () => reject(addReq.error);
  });
}

// 3. Retrieve all records from the 'users' store
async function getAllUsers() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const getAllReq = store.getAll();
    getAllReq.onsuccess = () => resolve(getAllReq.result);
    getAllReq.onerror = () => reject(getAllReq.error);
  });
}

// 4. Retrieve a single record by key
async function getUser(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const getReq = store.get(id);
    getReq.onsuccess = () => resolve(getReq.result);
    getReq.onerror = () => reject(getReq.error);
  });
}

// 5. Update (put) an existing record
async function updateUser(user) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    const putReq = store.put(user);
    putReq.onsuccess = () => resolve(putReq.result);
    putReq.onerror = () => reject(putReq.error);
  });
}

// 6. Delete a record by key
async function deleteUser(id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    const delReq = store.delete(id);
    delReq.onsuccess = () => resolve();
    delReq.onerror = () => reject(delReq.error);
  });
}

// 7. Usage Examples
(async () => {
  // Add two users
  const aliceId = await addUser({ name: 'Alice', email: 'alice@example.com' });
  console.log('Added Alice with id', aliceId);
  const bobId = await addUser({ name: 'Bob', email: 'bob@example.com' });
  console.log('Added Bob with id', bobId);

  // Get all users
  console.log('All users:', await getAllUsers());

  // Get one user
  console.log('User', aliceId, await getUser(aliceId));

  // Update a user
  await updateUser({ id: aliceId, name: 'Alice Smith', email: 'alice.smith@example.com' });
  console.log('Alice after update:', await getUser(aliceId));

  // Delete a user
  await deleteUser(bobId);
  console.log('All users after deleting Bob:', await getAllUsers());
})();

/*
Best Practices:
- Always handle onupgradeneeded to define or migrate schema.
- Wrap IDB operations in Promises or use helper libraries (e.g., idb).
- Close transactions promptly; handle errors in onerror handlers.
- Use keyPath and indexes to efficiently query structured data.
- Avoid global references to the db object; open per-operation or cache carefully.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
142 - State Management Libraries: Redux Fundamentals in Vanilla JS, Redux Toolkit Overview

This note explains:
1. Redux fundamentals: store, reducer, actions, dispatch, subscribe.
2. Vanilla JS Redux example: counter store.
3. Redux Toolkit basics: configureStore, createSlice.
4. Using an async thunk with Redux Toolkit.
5. Best-practice guidelines.
*/

// 1. Vanilla JS Redux Fundamentals
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];
  return {
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(fn => fn());
    },
    getState() {
      return state;
    },
    subscribe(fn) {
      listeners.push(fn);
      return () => listeners.splice(listeners.indexOf(fn), 1);
    }
  };
}

// Reducer for a simple counter
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return { count: 0 };
    default:          return state;
  }
}

// Create store
const store = createStore(counterReducer);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log('Vanilla Redux state:', store.getState());
});

// Dispatch some actions
store.dispatch({ type: 'increment' }); // { count: 1 }
store.dispatch({ type: 'increment' }); // { count: 2 }
store.dispatch({ type: 'decrement' }); // { count: 1 }
store.dispatch({ type: 'reset' });     // { count: 0 }
unsubscribe();

// 2. Redux Toolkit Basics
// (Requires @reduxjs/toolkit installed)

import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk example (simulated fetch)
const fetchCount = createAsyncThunk('counter/fetchCount', async (amount) => {
  const result = await new Promise(res => setTimeout(() => res({ data: amount }), 500));
  return result.data;
});

// createSlice generates actions and reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0, status: 'idle' },
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCount.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.count = action.payload;
      })
      .addCase(fetchCount.rejected, state => {
        state.status = 'failed';
      });
  }
});

const { increment, decrement } = counterSlice.actions;

// configureStore sets up Redux store with middleware
const rtkStore = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// Subscribe to RTK store updates
rtkStore.subscribe(() => {
  console.log('RTK state:', rtkStore.getState());
});

// Dispatch RTK actions
rtkStore.dispatch(increment());   // count: 1
rtkStore.dispatch(decrement());   // count: 0

// Dispatch async thunk
rtkStore.dispatch(fetchCount(5)); // after ~500ms → count: 5, status: 'succeeded'

// 3. Best Practices:
/*
- Use Redux Toolkit for concise, maintainable code and built-in immutability.
- Keep state shape simple and serializable.
- Co-locate slice logic (actions + reducer) using createSlice.
- Use createAsyncThunk for side effects instead of manual middleware.
- Avoid deeply nested state; normalize when needed.
- Use TypeScript for type safety in larger apps.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/*
143 - MobX for Reactive State, Observables, Actions

This note explains:
1. Defining observables to track reactive state.
2. Defining actions to modify state in a transaction.
3. Using autorun to react to state changes.
4. Using computed for derived values.
*/

// 1. Import MobX functions
import { makeObservable, observable, action, computed, autorun } from 'mobx';

// 2. Defining a reactive state class with observables and actions
class CounterStore {
  count = 0; // observable property

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
      double: computed
    });
  }

  // 3. Actions: modify state
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // 4. Computed: derived value
  get double() {
    return this.count * 2;
  }
}

// 5. Instantiating the store and observing changes
const counterStore = new CounterStore();

// autorun will run immediately and whenever any observable used changes
autorun(() => {
  console.log(`Count: ${counterStore.count}, Double: ${counterStore.double}`);
});

// 6. Invoking actions to update the store
counterStore.increment(); // Count: 1, Double: 2
counterStore.increment(); // Count: 2, Double: 4
counterStore.decrement(); // Count: 1, Double: 2

/*
Best Practices:
- Use observable for state that needs to be tracked.
- Encapsulate all state modifications inside actions.
- Use computed for derived values for caching and tracking dependencies.
- Use autorun or reaction to trigger side effects on state changes.
- Avoid modifying observables outside of actions for predictability.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*
144 - Zustand and Jotai: Minimalistic State Management Patterns

This note explains:
1. Zustand – creating a simple global store with hooks.
2. Jotai – creating atoms and using them in components.
3. Comparing patterns: direct setters vs hooks.
4. Best-practice guidelines for minimal overhead.
*/

// 1. Zustand Example
// Install: npm install zustand

import create from 'zustand';

// Define a store with state and actions
const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));

// Usage in a React component
function CounterZustand() {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <h2>Zustand Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>−1</button>
    </div>
  );
}

// 2. Jotai Example
// Install: npm install jotai

import { atom, useAtom } from 'jotai';

// Define an atom for state
const countAtom = atom(0);

// Define an atom with write capability (optional)
const doubledAtom = atom(
  get => get(countAtom) * 2,
  (get, set, action) => {
    const current = get(countAtom);
    set(countAtom, action === 'inc' ? current + 1 : current - 1);
  }
);

// Usage in a React component
function CounterJotai() {
  const [count, setCount] = useAtom(countAtom);
  const [double, dispatch] = useAtom(doubledAtom);
  return (
    <div>
      <h2>Jotai Count: {count}, Doubled: {double}</h2>
      <button onClick={() => dispatch('inc')}>+1</button>
      <button onClick={() => dispatch('dec')}>−1</button>
    </div>
  );
}

// 3. Comparison
/*
- Zustand: single store object, actions update state directly; simple hook usage.
- Jotai: atomic state pieces, compose atoms for derived data; hooks per atom.
- Both avoid boilerplate and providers; state is global by default.
*/

// 4. Best Practices
/*
- Keep store definitions minimal and colocated with related logic.
- Use selectors in Zustand to subscribe only to needed slices.
- In Jotai, split state into atoms to optimize re-renders.
- Avoid over-splitting: group related state logically.
- Leverage React DevTools to inspect atom/store state.
*/

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////