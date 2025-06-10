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
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
