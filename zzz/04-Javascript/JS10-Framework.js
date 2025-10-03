// 🏗 FOUNDATION FOR JAVASCRIPT FRAMEWORKS
// 197 - Understanding Virtual DOM: how React, Vue, Preact implement it.
// 198 - Reactive Rendering: diffing algorithms, reconciler internals.
// 199 - Template Engines: Handlebars, Mustache, EJS for server-side rendering.
// 200 - JSX vs Hyperscript vs Template Syntax: differences across frameworks.

// 🚀 BUILDING PRODUCTION-READY JS APPS
// 201 - Logging Stratel̥gies: console vs dedicated logger (winston, pino) for Node.js.
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





////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


/*
197 - Understanding the Virtual DOM: How React, Vue, and Preact Implement It

This note explains:
1. What the Virtual DOM (vDOM) is and why it exists.
2. How React represents and diffs vDOM trees.
3. How Vue’s reactive templates translate to vDOM and patch.
4. How Preact, a smaller React-compatible library, implements a fast vDOM.
5. Example of creating elements and updating the DOM via diff & patch.
6. Best-practice guidelines.
*/

// 1. Virtual DOM concept
// • vDOM is an in-memory tree of JavaScript objects representing UI.
// • Enables efficient updates by diffing old vs new vDOM and patching only changed parts.

// 2. React-style vDOM (using React.createElement)
/*
const prevTree = React.createElement(
  'div', { id: 'root' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
);
ReactDOM.render(prevTree, document.getElementById('app'));

// Later, update:
const nextTree = React.createElement(
  'div', { id: 'root' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'React!')
);
ReactDOM.render(nextTree, document.getElementById('app'));
// Under the hood, React diffs prevTree vs nextTree and only replaces the <p> text.
*/

// 3. Vue-style vDOM (template → render function)
// Vue compiles `<div><h1>{{ title }}</h1></div>` into a render function:
// function render() {
//   return h('div', null, [
//     h('h1', null, this.title)
//   ]);
// }
// Vue’s patch process diffs successive render() output and applies minimal DOM ops.

// 4. Preact implementation (hyperscript + diff)
// Preact’s `h()` returns vDOM nodes similar to React:
// import { h, render } from 'preact';
// let count = 0;
// function view() {
//   return h('button', { onClick: () => update() }, `Count: ${count}`);
// }
// function update() {
//   count++;
//   render(view(), document.getElementById('app'));
// }
// render(view(), document.getElementById('app'));
// Preact’s h() + render() diff old vs new tree and patches efficiently in ~3KB.

// 5. Manual diff & patch pseudocode
/*
function diff(oldNode, newNode) {
  if (!oldNode) {
    createElement(newNode);
  } else if (!newNode) {
    removeElement(oldNode);
  } else if (changed(oldNode, newNode)) {
    replaceElement(oldNode, newNode);
  } else if (newNode.tag) {
    const max = Math.max(oldNode.children.length, newNode.children.length);
    for (let i = 0; i < max; i++) {
      diff(oldNode.children[i], newNode.children[i]);
    }
  }
}
*/

// 6. Best Practices:
/*
- Keep render functions pure: output same vDOM for same inputs.
- Use keys on lists to help diff algorithms match elements.
- Avoid over-rendering: break UI into components to limit diff scope.
- Prefer reconciliation libraries (React/Vue/Preact) over manual DOM ops.
- Understand virtual DOM’s cost: bulk changes may be faster with direct DOM methods.
*/

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


/*
198 - Reactive Rendering: diffing algorithms, reconciler internals

This note explains:
1. The concept of virtual DOM and reactive rendering.
2. Tree diffing algorithm basics (complexity O(n)).
3. Keyed list diff optimization.
4. Batching and scheduling updates in the reconciler.
5. Simplified work loop example for incremental rendering.
6. Best-practice guidelines.
*/

// 🔹 1. Virtual DOM element factory
function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

// 🔹 2. Simple diff algorithm to compute patch instructions
function diff(oldNode, newNode) {
  if (oldNode === undefined) return { type: 'CREATE', newNode };
  if (newNode === undefined) return { type: 'REMOVE' };
  if (oldNode.type !== newNode.type) return { type: 'REPLACE', newNode };
  if (typeof oldNode !== 'object' && oldNode !== newNode) {
    return { type: 'TEXT', newNode };
  }
  const propsPatches = diffProps(oldNode.props, newNode.props);
  const childPatches = [];
  const maxLen = Math.max(
    oldNode.children.length,
    newNode.children.length
  );
  for (let i = 0; i < maxLen; i++) {
    childPatches.push(diff(oldNode.children[i], newNode.children[i]));
  }
  return { type: 'UPDATE', props: propsPatches, children: childPatches };
}

function diffProps(oldProps, newProps) {
  const patches = [];
  // add or update props
  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      patches.push({ key, value: newProps[key] });
    }
  }
  // remove old props
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patches.push({ key });
    }
  }
  return patches;
}

// 🔹 3. Batching updates via microtask (reconciler)
function scheduleUpdate(root, oldTree, newTree) {
  Promise.resolve().then(() => {
    const patches = diff(oldTree, newTree);
    console.log('Patches to apply:', patches);
    // patchDOM(root, patches); // actual DOM patch implementation
  });
}

// 🔹 4. Keyed list diff example
two phases of rendering
const root = document.getElementById('app');
const tree1 = h('ul', null,
  h('li', { key: 'a' }, 'Item A'),
  h('li', { key: 'b' }, 'Item B'),
  h('li', { key: 'c' }, 'Item C'),
);
scheduleUpdate(root, null, tree1);

setTimeout(() => {
  const tree2 = h('ul', null,
    h('li', { key: 'b' }, 'Item B'),
    h('li', { key: 'a' }, 'Item A'),
    h('li', { key: 'd' }, 'Item D'),
  );
  scheduleUpdate(root, tree1, tree2);
}, 1000);

// 🔹 5. Simplified work loop for incremental rendering (Fiber-like)
/*
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
*/

// 🔹 6. Best Practices:
/*
- Use stable keys for list items to minimize reordering costs.
- Batch multiple state updates into one render pass.
- Break down UI into small components to reduce diff size.
- Reconciler should yield to the event loop to avoid blocking rendering.
- Consider Fiber architecture for prioritized, interruptible work scheduling.
*/

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// 199 - Template Engines: Handlebars, Mustache, EJS for server-side rendering
/*
Template engines enable you to generate HTML on the server by combining template files
with dynamic data.

Handlebars:
  • Logic-less: encourages keeping templates simple (no complex JS in views)
  • Syntax: {{variable}}, {{#each items}}…{{/each}}, supports helpers & partials

Mustache:
  • Minimalist: only interpolation and sections ({{#section}}…{{/section}})
  • No built-in helpers—any logic must be done before rendering

EJS:
  • Embedded JavaScript: full JS inside <% %> and <%= %> for escaped output
  • File extension: .ejs, ideal when you need loops, conditionals, and functions in your view
*/

// Express app setup
import express from 'express';
import exphbs from 'express-handlebars';
import mustacheExpress from 'mustache-express';
import path from 'path';

const app = express();

// ===== Handlebars Configuration =====
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/handlebars'));
app.get('/hb', (req, res) => {
  res.render('home', {
    title: 'Handlebars Home',
    items: ['Learn', 'Build', 'Deploy']
  });
});

// ===== Mustache Configuration =====
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views/mustache'));
app.get('/mu', (req, res) => {
  res.render('home', {
    title: 'Mustache Home',
    items: ['Alpha', 'Beta', 'Gamma']
  });
});

// ===== EJS Configuration =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));
app.get('/ejs', (req, res) => {
  res.render('home', {
    title: 'EJS Home',
    items: [1, 2, 3]
  });
});

// Start Server
app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 200 - JSX vs Hyperscript vs Template Syntax: differences across frameworks
/*
JSX (React):
  • Syntax extension for JavaScript—looks like HTML/XML but transpiles to React.createElement calls
  • Allows embedding expressions inside braces: <div>{value}</div>
  • Requires a build step (Babel/TSX)

Hyperscript (Preact, Mithril, etc.):
  • Pure JavaScript API: h(tag, props, ...children)
  • No build step needed if using runtime directly
  • More verbose but framework-agnostic

Template Syntax (Vue, Angular, Svelte):
  • Declarative HTML templates with data bindings ({{ }}, v-if, *ngIf)
  • Separates markup from logic; framework compiler/runtime processes directives
  • Often supports single-file components (.vue, .svelte, .component.html)
*/

// --- JSX Example (React) ---
import React from 'react';
import { createRoot } from 'react-dom/client';

function JSXComponent() {
  const msg = 'Hello from JSX';
  return (
    <section className="jsx">
      <h1>{msg}</h1>
    </section>
  );
}

const reactRoot = createRoot(document.getElementById('jsx-root'));
reactRoot.render(<JSXComponent />);

// --- Hyperscript Example (Preact) ---
import { h, render as preactRender } from 'preact';

function HyperscriptComponent() {
  const msg = 'Hello from Hyperscript';
  return h(
    'section',
    { class: 'hyperscript' },
    h('h1', null, msg)
  );
}

preactRender(h(HyperscriptComponent, null), document.getElementById('hyperscript-root'));

// --- Template Syntax Example (Vue 3) ---
import { createApp, defineComponent } from 'vue';

const TemplateComponent = defineComponent({
  data() {
    return { msg: 'Hello from Template' };
  },
  template: `
    <section class="template">
      <h1>{{ msg }}</h1>
    </section>
  `
});

createApp(TemplateComponent).mount('#template-root');


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 201 - Logging Strategies: console vs dedicated logger (winston, pino) for Node.js
/*
Choosing how to log in Node.js applications involves trade-offs between simplicity, performance,
and features like structured logs, log levels, and transports.

1. console.*  
   • Built-in, zero dependencies  
   • Good for quick debugging / simple scripts  
   • Lacks log levels beyond basic console.error/info/warn  
   • No structured (JSON) output by default

2. Winston  
   • Feature-rich: multiple transports (file, console, HTTP, syslog, etc.)  
   • Supports custom log levels, formatting, and metadata  
   • Can output JSON or human-readable logs  
   • Moderate footprint

3. Pino  
   • Ultra-fast JSON logger (faster than console.log in many benchmarks)  
   • Designed for production use: low overhead, async flushing  
   • Integrates with serializers, log levels, and redaction  
   • Outputs pure JSON by default; needs prettifier in development
*/

// --- 1. Plain console logging ---
console.log('Server starting on port', process.env.PORT || 3000);
console.info('Info: Application initialized');
console.warn('Warning: Deprecation warning for xyz');
console.error('Error: UncaughtException occurred');

// --- 2. Winston setup ---
import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    // choose JSON or pretty print
    winston.format.json()
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log to file (rotate or dailyRotate could be added)
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

winstonLogger.info('Winston: Server started', { port: process.env.PORT || 3000 });
winstonLogger.warn('Winston: Deprecated API used');
winstonLogger.error('Winston: Unhandled error', new Error('ExampleError'));

// --- 3. Pino setup ---
import pino from 'pino';

// In production, use default JSON output. For development, use the pretty printer:
//   const pinoLogger = pino({ level: 'debug' }, pino.destination());
//   // or require('pino-pretty') in a separate process
const pinoLogger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  // redact: ['req.headers.authorization']  // example of sensitive data redaction
});

pinoLogger.info({ port: process.env.PORT || 3000 }, 'Pino: Server started');
pinoLogger.warn('Pino: Deprecated API used');
pinoLogger.error({ err: new Error('ExampleError') }, 'Pino: Unhandled error');

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 202 - Automated Testing Strategy: unit tests, integration tests, E2E tests balance
/*
A robust testing strategy layers multiple test types to catch different classes of bugs:

1. Unit Tests
   • Test individual functions or components in isolation  
   • Fast feedback, low overhead  
   • Mock external dependencies  
   • Tools: Jest, Mocha, Vitest

2. Integration Tests
   • Test multiple units working together (e.g., API routes + database)  
   • Exercise real code paths, but can mock external services  
   • Slower than unit tests, faster than full E2E  
   • Tools: Jest with Supertest, Testing Library

3. End-to-End (E2E) Tests
   • Simulate user interactions in a real browser or headless environment  
   • Validate complete flows (login, form submission, shopping cart)  
   • Slowest and most brittle — use sparingly for critical paths  
   • Tools: Cypress, Playwright, Selenium

Balance guideline:
  • ~70% unit tests (speed & coverage)  
  • ~20% integration tests (realistic code interactions)  
  • ~10% E2E tests (critical user journeys)
*/

// --- 1. Unit Test (Jest) ---
import { sum } from './math';

test('sum adds two numbers', () => {
  expect(sum(2, 3)).toBe(5);
});

// --- 2. Integration Test (Jest + Supertest) ---
import request from 'supertest';
import app from '../src/app'; // Express app

describe('GET /users', () => {
  it('returns a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// --- 3. E2E Test (Cypress) ---
// cypress/integration/login.spec.js
describe('Login flow', () => {
  it('allows a user to log in and see dashboard', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome,').should('be.visible');
  });
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 203 - Feature Flags Implementation: Rollout strategies in JavaScript apps
/*
Feature flags let you turn functionality on or off at runtime, decoupling deploys from releases.
Common rollout strategies:
  • Global toggle: on/off for everyone
  • Canary rollout: expose to a percentage of users
  • User segmentation: target by user attributes (plan, region, role)
  • Gradual ramp-up: increase percentage over time based on metrics

You can build a simple in-app system or integrate with a dedicated service (e.g., LaunchDarkly, Unleash).
*/

// --- 1. Simple Custom Feature Flag Service ---
const featureFlags = {
  // Global feature off by default, with 50% canary rollout
  newDashboard: {
    enabled: true,
    rollout: {
      percent: 50,                          // target percentage
      segment: (user) => user.id % 100 < 50 // deterministic bucketing
    }
  },
  // Always on for all users
  betaChat: { enabled: true }
};

function isFeatureEnabled(flagName, user) {
  const flag = featureFlags[flagName];
  if (!flag || !flag.enabled) return false;
  if (flag.rollout) {
    return flag.rollout.segment(user);
  }
  return true;
}

// Usage in an Express route
import express from 'express';
const app = express();

app.get('/dashboard', (req, res) => {
  const user = req.user; // assume authenticated user object
  if (isFeatureEnabled('newDashboard', user)) {
    res.render('dashboard-new', { user });
  } else {
    res.render('dashboard-old', { user });
  }
});

// --- 2. Using LaunchDarkly for Advanced Rollouts ---
import { init } from 'launchdarkly-node-server-sdk';

const ldClient = init('YOUR_SDK_KEY');

ldClient.once('ready', () => {
  // Middleware to evaluate flags per request
  app.use(async (req, res, next) => {
    const userContext = {
      key: String(req.user.id),
      anonymous: false,
      custom: { plan: req.user.plan }
    };
    // 'new-dashboard' flag defined in LaunchDarkly dashboard
    req.flags = {
      newDashboard: await ldClient.variation('new-dashboard', userContext, false),
      betaChat: await ldClient.variation('beta-chat', userContext, false)
    };
    next();
  });

  app.get('/dashboard', (req, res) => {
    if (req.flags.newDashboard) {
      res.render('dashboard-new', { user: req.user });
    } else {
      res.render('dashboard-old', { user: req.user });
    }
  });
});

// Remember to flush and close LD client on shutdown
process.on('SIGTERM', () => {
  ldClient.close().then(() => process.exit());
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 204 - Progressive Enhancement vs Graceful Degradation: coding for compatibility
/*
Progressive Enhancement:
  • Build a baseline experience that works everywhere (basic HTML/CSS/JS)  
  • Detect advanced features and “enhance” if supported  
  • Ensures core functionality on old browsers, adds layers on top for modern ones

Graceful Degradation:
  • Start with a full-featured implementation targeting modern browsers  
  • Provide fallbacks so that older browsers “degrade” to a simpler but usable experience  
  • Focus on preserving essential functionality when advanced features aren’t available
*/

// ===== Progressive Enhancement Example =====

// Baseline: simple form submission via HTML
// HTML:
//
// <form id="comment-form" action="/submit" method="POST">
//   <textarea name="comment"></textarea>
//   <button type="submit">Post Comment</button>
// </form>

// Enhancement: AJAX submission if fetch API is supported
if ('fetch' in window && document.querySelector) {
  const form = document.getElementById('comment-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(response => response.json())
    .then(json => {
      // Inject new comment into page without reload
      const list = document.getElementById('comments-list');
      const item = document.createElement('li');
      item.textContent = json.comment;
      list.appendChild(item);
      form.reset();
    })
    .catch(err => console.error('Error posting comment:', err));
  });
}

// If fetch is not supported, form falls back to normal full-page reload submission.


// ===== Graceful Degradation Example =====

// Full-featured layout using CSS Grid
// CSS:
//
// .gallery {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 16px;
// }

// Fallback for older browsers without grid support
(function() {
  const gallery = document.querySelector('.gallery');
  const supportsGrid = CSS && CSS.supports && CSS.supports('display', 'grid');

  if (!supportsGrid && gallery) {
    // Replace grid with simple flexbox
    gallery.style.display = 'flex';
    gallery.style.flexWrap = 'wrap';
    gallery.style.margin = '-8px';

    Array.from(gallery.children).forEach(item => {
      item.style.flex = '1 1 calc(50% - 16px)';
      item.style.margin = '8px';
    });
  }
})();

// Users on modern browsers get the 4-column grid.
// Older browsers “degrade” to a 2-column flex layout automatically.

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 204 - Progressive Enhancement vs Graceful Degradation: coding for compatibility
/*
Progressive Enhancement:
  • Build a baseline experience that works everywhere (basic HTML/CSS/JS)  
  • Detect advanced features and “enhance” if supported  
  • Ensures core functionality on old browsers, adds layers on top for modern ones

Graceful Degradation:
  • Start with a full-featured implementation targeting modern browsers  
  • Provide fallbacks so that older browsers “degrade” to a simpler but usable experience  
  • Focus on preserving essential functionality when advanced features aren’t available
*/

// ===== Progressive Enhancement Example =====

// Baseline: simple form submission via HTML
// HTML:
//
// <form id="comment-form" action="/submit" method="POST">
//   <textarea name="comment"></textarea>
//   <button type="submit">Post Comment</button>
// </form>

// Enhancement: AJAX submission if fetch API is supported
if ('fetch' in window && document.querySelector) {
  const form = document.getElementById('comment-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(response => response.json())
    .then(json => {
      // Inject new comment into page without reload
      const list = document.getElementById('comments-list');
      const item = document.createElement('li');
      item.textContent = json.comment;
      list.appendChild(item);
      form.reset();
    })
    .catch(err => console.error('Error posting comment:', err));
  });
}

// If fetch is not supported, form falls back to normal full-page reload submission.


// ===== Graceful Degradation Example =====

// Full-featured layout using CSS Grid
// CSS:
//
// .gallery {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 16px;
// }

// Fallback for older browsers without grid support
(function() {
  const gallery = document.querySelector('.gallery');
  const supportsGrid = CSS && CSS.supports && CSS.supports('display', 'grid');

  if (!supportsGrid && gallery) {
    // Replace grid with simple flexbox
    gallery.style.display = 'flex';
    gallery.style.flexWrap = 'wrap';
    gallery.style.margin = '-8px';

    Array.from(gallery.children).forEach(item => {
      item.style.flex = '1 1 calc(50% - 16px)';
      item.style.margin = '8px';
    });
  }
})();

// Users on modern browsers get the 4-column grid.
// Older browsers “degrade” to a 2-column flex layout automatically.

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


<!-- 205 - Accessibility (a11y) in JS apps: ARIA roles, keyboard navigation, screen readers -->
<!--
This example implements an accessible dropdown menu:
  • ARIA roles: role="button", aria-haspopup, aria-expanded, role="menu", role="menuitem"
  • Keyboard nav: Arrow keys, Home/End, Enter/Space to activate, Esc to close
  • Screen reader announcements: aria-live region for status updates
  • Focus management: trap focus within the menu when open
-->

<style>
  /* Simple “screen reader only” utility */
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
  #dropdownMenu { list-style: none; padding: 0; margin: 0; border: 1px solid #ccc; }
  #dropdownMenu[hidden] { display: none; }
  #dropdownMenu li[role="menuitem"]:focus { background: #eef; outline: none; }
</style>

<button
  id="dropdownToggle"
  aria-haspopup="true"
  aria-expanded="false"
>
  Options ▼
</button>
<ul id="dropdownMenu" role="menu" hidden>
  <li role="menuitem" tabindex="-1">Profile</li>
  <li role="menuitem" tabindex="-1">Settings</li>
  <li role="menuitem" tabindex="-1">Logout</li>
</ul>
<div id="status" role="status" aria-live="polite" class="sr-only"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dropdownToggle');
  const menu   = document.getElementById('dropdownMenu');
  const items  = Array.from(menu.querySelectorAll('[role="menuitem"]'));
  const status = document.getElementById('status');
  let open = false, current = -1;

  // Open or close the menu
  function setOpen(state) {
    open = state;
    toggle.setAttribute('aria-expanded', state);
    menu.hidden = !state;
    status.textContent = state ? 'Menu opened' : 'Menu closed';
    if (state) {
      current = 0;
      items[current].focus();
    } else {
      toggle.focus();
    }
  }

  // Toggle on click
  toggle.addEventListener('click', () => setOpen(!open));

  // Open with ArrowDown, close with Esc
  toggle.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
  });

  // Keyboard navigation inside menu
  menu.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        current = (current + 1) % items.length;
        items[current].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        current = (current - 1 + items.length) % items.length;
        items[current].focus();
        break;
      case 'Home':
        e.preventDefault();
        current = 0;
        items[current].focus();
        break;
      case 'End':
        e.preventDefault();
        current = items.length - 1;
        items[current].focus();
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        items[current].click();
        setOpen(false);
        break;
    }
  });

  // Click handler for items
  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      status.textContent = `Selected "${item.textContent}"`;
      // Perform action...
    });
  });

  // Close if focus moves out
  document.addEventListener('click', e => {
    if (open && !menu.contains(e.target) && e.target !== toggle) {
      setOpen(false);
    }
  });
});
</script>

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 206 - Contributing to Open Source JS Projects: finding issues, pull request etiquette
/*
1. Finding Issues
   • Labels: look for “good first issue”, “help wanted”, “beginners”
   • GitHub search: is:issue is:open label:"good first issue"
   • CLI: gh issue list --label "good first issue" --state open

2. Fork & Clone
   # Fork the repo via GitHub UI, then:
   $ git clone git@github.com:yourusername/repo.git
   $ cd repo
   $ git remote add upstream git@github.com:original/repo.git
   $ git fetch upstream

3. Branch Strategy
   • Use clear prefixes: feat/, fix/, docs/, chore/
   $ git checkout -b feat/awesome-feature

4. Code Style & Testing
   • Follow the project’s ESLint/Prettier rules
   • Run existing tests: npm test || yarn test
   • Add new tests for your changes

5. Commit Messages (Conventional Commits)
   feat(scope): add user avatar upload  
   fix(api): handle null response from /users  
   docs: update CONTRIBUTING.md

6. Pull Request Etiquette
   • Title: concise, imperative (e.g. “feat(auth): support OAuth login”)  
   • Description: what & why, link related issue (#123)  
   • Include screenshots or GIFs for UI changes  
   • Ensure CI passes and all tests green  
   • Respond to review comments promptly

7. Keeping Up-to-Date & Merging
   $ git fetch upstream
   $ git rebase upstream/main
   $ git push -f origin feat/awesome-feature
   • After merge: delete your branch locally & remotely

*/

// --- Example: Listing “good first issues” via GitHub API (Octokit) ---
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function listGoodFirstIssues(owner, repo) {
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    labels: "good first issue",
    state: "open",
  });
  return issues.map(i => `#${i.number} ${i.title}`);
}

listGoodFirstIssues("facebook", "react")
  .then(issues => console.log("Good First Issues:", issues))
  .catch(console.error);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// 207 - Following ECMAScript Proposals: tracking TC39 meetings, reading proposal documents
/*
To stay up-to-date with upcoming JavaScript features, you can:
  1. Follow the “tc39/proposals” GitHub repo, which lists all active proposals by stage.
  2. Watch TC39 meeting notes and minutes—often published in the “tc39/notes” repo.
  3. Read individual proposal documents (in Markdown/HTML) to understand motivation, design, and examples.
  4. Use the GitHub API or CLI to fetch proposals by stage or label.

Common stages:
  • Stage 0 (“strawman”): ideas under consideration
  • Stage 1 (“proposal”): early spec draft, seeking champions
  • Stage 2 (“draft”): workable spec text, awaiting feedback
  • Stage 3 (“candidate”): ready for feedback, implementations encouraged
  • Stage 4 (“finished”): ready to ship, included in next ECMAScript release
*/

// --- 1. Quick CLI check via GitHub CLI (gh) ---
// List all Stage 3 (“candidate”) proposals:
$ gh repo clone tc39/proposals
$ cd proposals
$ grep -R "stage: 3" .

// --- 2. Node.js script using Octokit to list proposals by stage ---
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

async function listProposalsByStage(stage) {
  // The tc39/proposals repo uses issue labels like "stage: 2", "stage: 3", etc.
  const { data: issues } = await octokit.issues.listForRepo({
    owner: "tc39",
    repo: "proposals",
    labels: `stage: ${stage}`,
    state: "open",
  });

  console.log(`ECMAScript Proposals at Stage ${stage}:`);
  issues.forEach(issue => {
    console.log(`- ${issue.title} (#${issue.number}): ${issue.html_url}`);
  });
}

// Example: fetch Stage 2 proposals
listProposalsByStage(2).catch(console.error);

// --- 3. Fetching raw proposal docs ---
// You can read the full spec text by downloading the proposal’s markdown file:
async function fetchProposalDoc(prNumber) {
  const url = `https://raw.githubusercontent.com/tc39/proposals/main/proposals/${prNumber}-proposal.md`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch proposal #${prNumber}`);
  const text = await res.text();
  console.log(text.slice(0, 500) + '...'); // print first 500 chars
}

// Example: read the document for proposal #355 (Logical Assignment Operators)
fetchProposalDoc(355).catch(console.error);

// --- 4. Subscribing to TC39 meeting notes ---
// Meeting minutes are published in tc39/notes. To auto-clone & watch:
$ git clone https://github.com/tc39/notes.git
$ cd notes
$ git pull --rebase upstream main
// Inspect agendas and minutes in Markdown per meeting date.

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 208 - Staying Up-to-Date: subscribing to newsletters (JavaScript Weekly, ESNext News), blogs (2ality, MDN)
/*
To keep your JavaScript knowledge current, combine these channels:
  • Newsletters:
      – JavaScript Weekly (weekly round-up of JS news & articles)
      – ESNext News (spotlight on upcoming ECMAScript features)
      – Node Weekly, CSS-Tricks, etc.
  • Blogs:
      – 2ality (in-depth JS language articles by Axel-Rauschmayer)
      – MDN Web Docs (official reference & tutorials)
      – CSS-Tricks, Smashing Magazine, etc.
  • RSS Feeds:
      – Use a feed reader or automate fetching via scripts
  • Social & Communities:
      – Follow core TC39 members on Twitter/LinkedIn
      – Join Discord/Slack channels, Reddit r/javascript
  • Podcasts:
      – JS Party, Syntax, ShopTalk, etc.
*/

// Example: Automate fetching the latest items from key RSS feeds using Node.js
import Parser from 'rss-parser';

const feeds = {
  'JavaScript Weekly':    'https://javascriptweekly.com/rss/',
  'ESNext News':          'https://esnextnews.com/feed',
  '2ality':               'https://2ality.com/feed',
  'MDN Web Docs (JS)':    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/rss.xml'
};

async function fetchLatestArticles(limit = 5) {
  const parser = new Parser();
  for (const [name, url] of Object.entries(feeds)) {
    try {
      const feed = await parser.parseURL(url);
      console.log(`\n=== ${name} ===`);
      feed.items.slice(0, limit).forEach(item => {
        console.log(`- ${item.title}\n    ${item.link}`);
      });
    } catch (err) {
      console.error(`Failed to fetch ${name}:`, err.message);
    }
  }
}

// Run the fetch once, or schedule it (e.g., via cron) for regular updates
fetchLatestArticles();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// 209 - Performance Budgets: setting limits for bundle size, load time, runtime performance
/*
Performance budgets help enforce constraints on your app’s size and speed,
catch regressions early, and keep users happy. Common approaches:
  1. Webpack “performance” hints for bundle size
  2. size-limit for CI checks on output artifacts
  3. Lighthouse CI for runtime performance metrics
*/

// ===== 1. Webpack Performance Hints =====
module.exports = {
  // ... your existing config
  performance: {
    hints: 'warning',            // show a warning (or use 'error' to fail the build)
    maxAssetSize: 250000,        // bytes — warn if any single file > 244 KB
    maxEntrypointSize: 500000,   // bytes — warn if initial download > 488 KB
  },
  // ...
};

// ===== 2. size-limit for Bundle Size Budgets =====
// Install: npm install --save-dev size-limit @size-limit/preset-small-lib
// package.json snippet:
{
  // ...
  "size-limit": [
    {
      "path": "dist/**/*.js",    // files to measure
      "limit": "100 KB"          // budget per file
    }
  ],
  "scripts": {
    "size-check": "size-limit"
  }
}
// In CI, run `npm run size-check` to fail if over budget

// ===== 3. Lighthouse CI for Runtime Metrics =====
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run start',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'interactive':              ['error', { maxNumericValue: 5000 }],
        'total-byte-weight':        ['warning', { maxNumericValue: 300000 }],
        'speed-index':              ['warning', { maxNumericValue: 4000 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
// Run `lhci autorun` in your CI pipeline to enforce these performance budgets

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// 210 - Writing Technical Documentation: Markdown best practices, API docs with JSDoc
/*
Markdown Best Practices:
  • Use a clear hierarchy of headings (#, ##, ###) for sections and subsections.
  • Start with a concise title and short description.
  • Provide a Table of Contents for longer docs using links to headings:
      [Getting Started](#getting-started)
  • Use fenced code blocks (```js) with language identifiers for syntax highlighting.
  • Include examples and usage snippets.
  • Use bullet lists for features, options, and steps.
  • Document configuration options in tables:
      | Option     | Type     | Default | Description                 |
      |------------|----------|---------|-----------------------------|
      | `port`     | Number   | `3000`  | Port the server listens on. |
  • Link to related docs or external references.
  • Keep sentences short; aim for active voice.
  • Proofread and lint with tools like markdownlint.
*/

// Example README.md snippet:
/*
# MyLibrary

A lightweight JavaScript library for X.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)

## Installation

```bash
npm install my-library

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////