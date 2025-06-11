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



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
146 - Single-Page Applications (SPA) Concepts and Routing Strategies

This note explains:
1. SPA fundamentals: dynamic view updates without full page reloads.
2. Hash-based routing: using URL fragments and the 'hashchange' event.
3. History API routing: using pushState/popstate for clean URLs.
4. Defining route handlers and a 404 fallback.
5. Initializing and switching views on load and navigation.
6. Best-practice considerations: SEO, accessibility, and state management.
*/

// 1. Basic SPA view templates
const app = document.getElementById('app');
const templates = {
  home: '<h1>Home</h1><p>Welcome to the SPA demo.</p>',
  about: '<h1>About</h1><p>About this application.</p>',
  contact: '<h1>Contact</h1><p>Contact us at spa@example.com.</p>',
  notFound: '<h1>404</h1><p>Page not found.</p>',
};

// 2. Hash-based router
function hashRouter() {
  const route = location.hash.slice(1) || 'home';
  app.innerHTML = templates[route] || templates.notFound;
}
window.addEventListener('hashchange', hashRouter);
window.addEventListener('load', hashRouter);

// 3. History API router
function historyRouter() {
  const path = location.pathname.slice(1) || 'home';
  app.innerHTML = templates[path] || templates.notFound;
}
document.querySelectorAll('a[data-link]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const url = new URL(e.currentTarget.href);
    history.pushState(null, '', url.pathname);
    historyRouter();
  });
});
window.addEventListener('popstate', historyRouter);
window.addEventListener('load', () => {
  // Detect whether to use hash or history routing
  if (location.hash) {
    hashRouter();
  } else {
    historyRouter();
  }
});

// 4. Example navigation links (to include in your HTML)
/*
<nav>
  <a href="/home" data-link>Home</a>
  <a href="/about" data-link>About</a>
  <a href="/contact" data-link>Contact</a>
</nav>
<div id="app"></div>
*/

// 5. Best Practices:
/*
- Choose one routing strategy (hash for static hosts, History API for server support).
- Always provide a 404 view for unknown routes.
- Update document.title and meta tags on route changes for SEO/accessibility.
- Manage application state (e.g., user data) separately from the router.
- Debounce or throttle route updates if performing expensive view rendering.
- Ensure server is configured to serve index.html for all SPA routes when using History API.
*/


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
147 - Client-Side Routing vs Server-Side Routing vs Hybrid Approaches

This note explains:
1. Client-Side Routing – single-page apps that update views via the History API or hash without full page reloads.
2. Server-Side Routing – each URL maps to a server endpoint that returns a full HTML page.
3. Hybrid Approaches – frameworks that pre-render on the server then hydrate on the client (SSR + CSR).
*/

// 1. Client-Side Routing Example (History API)
const root = document.getElementById('app');
const routes = {
  '/': '<h1>Home</h1>',
  '/about': '<h1>About</h1>',
  '/contact': '<h1>Contact</h1>',
};
function navigate(path) {
  history.pushState(null, '', path);
  root.innerHTML = routes[path] || '<h1>404</h1>';
}
window.addEventListener('popstate', () => navigate(location.pathname));
document.body.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});
// Example links:
// <a href="/" data-link>Home</a> …
navigate(location.pathname);

// 2. Server-Side Routing Example (Express)
const express = require('express');
const server = express();
server.get('/', (req, res) => res.send('<h1>Home</h1>'));
server.get('/about', (req, res) => res.send('<h1>About</h1>'));
server.get('/contact', (req, res) => res.send('<h1>Contact</h1>'));
server.use((req, res) => res.status(404).send('<h1>404 - Not Found</h1>'));
server.listen(3000, () => console.log('Server listening on port 3000'));

// 3. Hybrid Approach Example (Next.js)
// pages/[page].js
import { useRouter } from 'next/router';
export async function getServerSideProps({ params }) {
  const contentMap = { home: 'Home', about: 'About', contact: 'Contact' };
  const content = contentMap[params.page] || null;
  return { props: { content } };
}
export default function Page({ content }) {
  if (!content) return <h1>404 - Not Found</h1>;
  return <h1>{content}</h1>;
}
// Navigation via <Link href="/about">About</Link> uses client-side routing
// with server-side data fetching on first load.

// Best Practices:
/*
- Client-side routing: fast view transitions, but requires handling 404s and SEO via prerendering or hybrid SSR.
- Server-side routing: simple, SEO-friendly, but full page reloads on each navigation.
- Hybrid (SSR + CSR) gives SEO and initial-load benefits plus client-side speed; use Next.js, Nuxt.js, etc.
- Always provide a 404 fallback in both client and server routers.
- Keep route definitions in sync between client and server to avoid mismatches.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
148 - Progressive Web Apps (PWA) Fundamentals: manifest.json, Service Workers, Offline Caching

This note explains:
1. Web App Manifest (manifest.json): fields like name, icons, start_url, display.
2. Linking the manifest in your HTML.
3. Registering a Service Worker.
4. Service Worker lifecycle: install, activate, fetch events for offline caching.
5. Example manifest.json content.
6. Best-practice guidelines for PWAs.
*/

// 1. Example manifest.json (place in project root)
/*
{
  "name": "My PWA App",
  "short_name": "MyPWA",
  "description": "An example PWA application",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#317EFB",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
*/

// 2. Link manifest in your HTML (in <head> of index.html)
// <link rel="manifest" href="/manifest.json">
// <meta name="theme-color" content="#317EFB">

// 3. Register the Service Worker (main.js)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered at scope:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

// 4. Service Worker Implementation (sw.js)
const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/main.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(oldKey => caches.delete(oldKey))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }))
  );
});

// 5. Best Practices:
/*
- Version your cache (e.g., 'pwa-cache-v1') and clean up old caches in activate().
- Use display 'standalone' for an app-like experience.
- Precache core assets in the install phase; use cache-first for them.
- For dynamic API data, consider network-first or stale-while-revalidate strategies.
- Test offline behavior via DevTools (Application > Service Workers > Offline).
- Use Lighthouse PWA audits to ensure compliance with PWA standards.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////