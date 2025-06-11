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
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////