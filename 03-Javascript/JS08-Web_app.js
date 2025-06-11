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
// 154 - Svelte Integration: l̥Svelte’s compiler, reactive statements, stores.
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


/*
149 - Jamstack Architecture: Static Site Generators (Gatsby, Eleventy) and Headless CMS

This note explains:
1. Jamstack fundamentals: pre-rendering, decoupled front end, CDN delivery.
2. Gatsby setup: gatsby-config.js with source plugins and page creation.
3. Eleventy setup: .eleventy.js with data collections and templates.
4. Fetching data from a headless CMS (Contentful example).
5. Generating pages at build time in both Gatsby and Eleventy.
6. Best-practice guidelines for scalability and performance.
*/

// 1. Jamstack Fundamentals
// – Build time: pre-render HTML/CSS/JS.
// – Serve static assets via CDN for low latency.
// – Fetch dynamic content from headless CMS APIs at build time or runtime.

// 2. Gatsby Setup (gatsby-config.js & gatsby-node.js)
module.exports = {
  siteMetadata: { title: "Jamstack Blog" },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-remark`,
  ],
};

// gatsby-node.js: create blog post pages from Contentful data
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes { slug }
      }
    }
  `);
  result.data.allContentfulBlogPost.nodes.forEach(({ slug }) => {
    createPage({
      path: `/blog/${slug}/`,
      component: require.resolve(`./src/templates/blog-post.js`),
      context: { slug },
    });
  });
};

// 3. Eleventy Setup (.eleventy.js)
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");  // static assets

  // Collection from headless CMS (Contentful)
  eleventyConfig.addCollection("posts", async () => {
    const fetch = require("node-fetch");
    const URL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries`
      + `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`
      + `&content_type=blogPost`;
    const res = await fetch(URL);
    const { items } = await res.json();
    return items.map(item => ({
      title: item.fields.title,
      slug:  item.fields.slug,
      body:  item.fields.body,
    }));
  });

  return {
    dir: { input: "src", output: "dist" },
    markdownTemplateEngine: "njk",
  };
};

// 4. Fetching Data Separately (scripts/fetchContentful.js)
import { createClient } from "contentful";
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
client.getEntries({ content_type: "blogPost" })
  .then(res => console.log("Fetched posts:", res.items))
  .catch(console.error);

// 5. Page Templates
// Gatsby template: src/templates/blog-post.js
import React from "react";
import { graphql } from "gatsby";
export default function BlogPost({ data }) {
  const { title, body } = data.contentfulBlogPost;
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
    </>
  );
}
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      body { childMarkdownRemark { html } }
    }
  }
`;

// Eleventy template: src/posts.njk
/*
{% for post in collections.posts %}
<article>
  <h2><a href="/posts/{{ post.slug }}/">{{ post.title }}</a></h2>
  <div>{{ post.body | safe }}</div>
</article>
{% endfor %}
*/

// 6. Best Practices:
/*
- Keep CMS credentials in environment variables; never commit in code.
- Use incremental/preview builds (e.g., Gatsby Cloud, Netlify) for faster rebuilds.
- Cache API responses in build scripts to minimize CMS requests.
- Leverage GraphQL or REST filtering to fetch only needed fields.
- Organize templates and data fetching close to each feature for maintainability.
- Ensure static assets and HTML are served via a CDN for optimal performance.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
150 - Internationalization (i18n) in JS Apps: Libraries (i18next), Locale Detection, Pluralization

This note explains:
1. Installing and initializing i18next with translation resources.
2. Detecting user locale via navigator or i18next-browser-languagedetector.
3. Translating strings with t().
4. Handling pluralization rules.
5. Switching languages at runtime.
6. Best-practice guidelines for managing translation files.
*/

// 1. Install (run in terminal):
// npm install i18next i18next-browser-languagedetector

// 2. Translation resources example (en.json, fr.json)
const resources = {
  en: {
    translation: {
      "welcome": "Welcome, {{name}}!",
      "item_count": "{{count}} item",
      "item_count_plural": "{{count}} items"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue, {{name}} !",
      "item_count": "{{count}} article",
      "item_count_plural": "{{count}} articles"
    }
  }
};

// 3. Initializing i18next with browser language detection
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)     // auto-detects language via navigator, cookies, etc.
  .init({
    resources,
    fallbackLng: 'en',       // default language
    debug: false,
    interpolation: {
      escapeValue: false     // React already safe-escapes
    }
  })
  .then(() => {
    // 4. Translating strings
    const name = 'Ajay';
    console.log(i18next.t('welcome', { name }));              // e.g. "Welcome, Ajay!" or French variant

    // 5. Pluralization
    const single = i18next.t('item_count', { count: 1 });     // "1 item"
    const multiple = i18next.t('item_count', { count: 5 });   // "5 items"
    console.log(single, multiple);
  });

// 6. Switching language at runtime
function switchLanguage(lang) {
  i18next.changeLanguage(lang).then(() => {
    console.log('Language switched to', lang);
    // Re-render or update UI strings after this
    document.getElementById('welcome').textContent =
      i18next.t('welcome', { name: 'Ajay' });
  });
}
// Example buttons in HTML:
// <button onclick="switchLanguage('en')">English</button>
// <button onclick="switchLanguage('fr')">Français</button>

// 7. Best Practices:
/*
- Keep translation JSON files organized by namespace (e.g., common.json, home.json).
- Use keys that describe usage, not source text, to avoid context drift.
- Run i18next-scanner in build process to extract keys from code.
- Provide fallback translations for missing keys.
- Leverage plural and interpolation features in i18next for robust formatting.
- Avoid concatenating translated strings; use interpolation for variable parts.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
151 - React Integration: using create-react-app, CRA vs Vite, React Refresh

This note explains:
1. Bootstrapping with Create React App (CRA).
2. Alternative with Vite for React.
3. Setting up React Fast Refresh for instant HMR.
4. Pros and cons of CRA vs Vite.
*/

// 1. Bootstrapping with CRA
// Run in terminal:
//   npx create-react-app my-cra-app
//   cd my-cra-app
//   npm start                  // launches CRA dev server with Fast Refresh enabled

// src/App.js (CRA default)
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello from CRA!</h1>
    </div>
  );
}

export default App;

// 2. Bootstrapping with Vite
// Run in terminal:
//   npm create vite@latest my-vite-app -- --template react
//   cd my-vite-app
//   npm install
//   npm run dev                // launches Vite dev server with React Refresh

// vite.config.js (auto-generated)
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()]
});

// src/App.jsx (Vite React)
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Hello from Vite + React!</h1>
    </div>
  );
}

// 3. Manual React Fast Refresh Setup (Webpack)
// Install dev dependencies:
//   npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
// In webpack.config.js:
/*
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: ['react-refresh/babel']
        }
      }]
    }]
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    hot: true
  }
};
*/

// 4. Pros and Cons
/*
- Create React App (CRA):
  ✅ Zero-config setup with built-in Fast Refresh
  ❌ Slower startup/build times, heavier bundle size

- Vite:
  ✅ Lightning-fast dev server using native ES modules
  ✅ Built-in React Refresh plugin, minimal config
  ❌ Less mature ecosystem; some plugins/config may require manual setup
*/

/*
Best Practices:
- Use CRA for full-featured, convention-driven projects.
- Use Vite for rapid development and lean builds.
- Ensure React Fast Refresh is enabled in dev for instant feedback.
- Keep production builds optimized by trimming unused code (tree-shaking).
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
152 - Vue.js Integration: Vue CLI, Vue 3 Composition API, Reactive refs

This note explains:
1. Vue CLI setup to create a Vue 3 project.
2. Using the Composition API in single-file components: setup(), ref(), reactive(), computed().
3. Watching reactive sources with watch().
4. Template binding to refs and reactive state.
5. Best-practice guidelines.
*/

// 1. Vue CLI: install and create project (run in terminal)
// npm install -g @vue/cli
// vue create my-vue-app    ← choose “Vue 3” preset
// cd my-vue-app
// npm run serve            ← starts dev server at http://localhost:8080

// 2. Composition API in App.vue
/*
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';

// Primitive state with ref()
const count = ref(0);

// Object state with reactive()
const state = reactive({
  firstName: 'Jane',
  lastName: 'Doe'
});

// Computed value derived from reactive()
const fullName = computed(() => `${state.firstName} ${state.lastName}`);

// Simple ref for display text
const title = ref('Vue 3 Composition API Demo');

// Action to update ref state
function increment() {
  count.value++;
}

// Watchers for debugging or side effects
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
watch(() => state.firstName, newVal => {
  console.log('First name now:', newVal);
});
</script>

<style scoped>
button {
  padding: 8px 16px;
  margin-top: 8px;
}
</style>
*/

// 3. main.js: mounting the app
/*
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
*/

// 4. Reactive vs ref summary:
// - ref() wraps primitives; access via .value in JS, direct in template.
// - reactive() wraps objects; no .value needed.
// - computed() caches derived values.
// - watch() observes refs or getters and runs callbacks on change.

// 5. Best Practices:
/*
- Use <script setup> for concise Composition API syntax.
- Group related state in reactive objects; use ref for isolated primitives.
- Move reusable logic into custom composables (e.g., useCounter()).
- Clean up side effects (e.g., use onUnmounted for manual watchers).
- Keep templates simple by exposing only necessary state and methods.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
153 - Angular Integration: Angular CLI, TypeScript-Centric Development, RxJS Observables

This note explains:
1. Angular CLI – generating projects, serving, building.
2. TypeScript-centric patterns – decorators, modules, components, strong typing.
3. RxJS Observables – creating streams, subscribing, using operators (map, filter, switchMap).
*/

// 1. Angular CLI Usage (run in terminal)
// Install CLI globally:
// npm install -g @angular/cli
// Create new Angular project:
// ng new my-app --routing --style=css
// Change directory and serve dev server:
// cd my-app
// ng serve --open
// Build for production:
// ng build --prod

// 2. TypeScript-Centric Development

// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { AppComponent }  from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ AppComponent ],   // components in this module
  imports:      [ BrowserModule, HttpClientModule ],
  bootstrap:    [ AppComponent ]    // root component
})
export class AppModule { }

// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService, Item } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <ul>
      <li *ngFor="let item of items">{{ item.name }} ({{ item.id }})</li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  title = 'Angular + RxJS Demo';
  items: Item[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // 3. Using RxJS Observable from service
    this.dataService.getItems()
      .subscribe({
        next: data => this.items = data,
        error: err => console.error('Error loading items', err)
      });
  }
}

// 3. RxJS Observables in a Service

// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface Item {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://api.example.com/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(
      // filter out items with invalid IDs
      map(items => items.filter(item => item.id > 0))
    );
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }
}

/*
Best Practices:
- Use Angular CLI for consistent project scaffolding and commands.
- Leverage TypeScript’s strong typing for components, services, and HTTP models.
- Organize code in modules and feature folders.
- Always unsubscribe from Observables in components (or use async pipe) to avoid memory leaks.
- Use RxJS operators to transform and filter streams instead of manual loops.
- Catch and handle errors in Observables to provide user feedback.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
154 - Svelte Integration: Svelte’s Compiler, Reactive Statements, Stores

This note explains:
1. Svelte’s compiler compiles .svelte components into optimized vanilla JS at build time.
2. Reactive statements using `$:` syntax for local state.
3. Using writable, derived, and readable stores in Svelte.
4. Creating custom stores with start/stop logic.
5. Best-practice guidelines.
*/

// ---------- App.svelte ----------
<script>
  // 2. Reactive local state
  let count = 0;
  // reactive declaration: re-runs whenever count changes
  $: double = count * 2;
  
  function increment() {
    count++;
  }

  // 3. Importing stores
  import { username, uppercaseUsername, time } from './store.js';

  // reactive statements for side effects
  $: console.log('Count is now', count);
  $: console.log('Current time:', $time);
</script>

<main>
  <h1>Count: {count}</h1>
  <button on:click={increment}>Increment</button>
  <p>Double: {double}</p>

  <h2>Username: {$username}</h2>
  <h2>Uppercase: {$uppercaseUsername}</h2>

  <h2>Current Time: {$time.toLocaleTimeString()}</h2>
</main>

<style>
  button { padding: 8px 16px; margin-top: 8px; }
  h2 { margin-top: 16px; }
</style>

// ---------- store.js ----------
import { writable, derived, readable } from 'svelte/store';

// writable store: use set and update methods
export const username = writable('Guest');

// derived store: computes value from other stores
export const uppercaseUsername = derived(
  username,
  $username => $username.toUpperCase()
);

// readable store: custom start/stop logic for subscribers
export const time = readable(new Date(), set => {
  const interval = setInterval(() => set(new Date()), 1000);
  // return cleanup function
  return () => clearInterval(interval);
});

// 5. Best Practices:
/*
- Place reactive logic in <script> using `let` and `$:` for clarity.
- Use writable for state you update from components.
- Use derived for computed values to leverage caching.
- Use readable for custom subscriptions (e.g., timers, WebSocket).
- Keep store definitions in separate files for reuse and testability.
- Rely on Svelte’s compile step—no virtual DOM overhead.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
155 - Preact and Other Lightweight Alternatives: Compatibility with React APIs

This note explains:
1. Preact – a ~3KB React-compatible alternative.
2. Installing Preact and setting up aliases (React → Preact/compat).
3. Basic Preact component and hooks (useState, useEffect).
4. Using preact/compat for React library support.
5. Brief mention of other lightweight libs (Mithril, Litelement).
6. Best-practice guidelines for choosing a lightweight framework.
*/

// 1. Installation (run in terminal)
// npm install preact preact/compat

// 2. Aliasing React imports to Preact (webpack example in webpack.config.js)
/*
resolve: {
  alias: {
    'react': 'preact/compat',
    'react-dom': 'preact/compat'
  }
}
*/

// 3. Basic Preact Component with Hooks
import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function Counter() {
  const [count, setCount] = useState(0);

  // Effect runs after every render
  useEffect(() => {
    console.log('Count updated to', count);
  }, [count]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Preact Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '8px' }}>−1</button>
    </div>
  );
}

// 4. Rendering into the DOM
render(<Counter />, document.getElementById('app'));

// 5. Using preact/compat to support React libraries
// Example: importing a React-based router
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Counter} />
    </BrowserRouter>
  );
}
render(<App />, document.getElementById('app'));

// 6. Other Lightweight Alternatives
/*
- Mithril.js: small (~8KB), built-in router and XHR, hyperscript-style views.
- litelement / Lit: Web Components + reactive templates, ~5KB.
- Umbrella JS: utility-focused (~3KB) without a view layer.
- Solid.js: reactive primitives, fine-grained updates (~5KB).
*/

// 7. Best Practices:
/*
- Use Preact when you need React compatibility with minimal bundle size.
- Alias React imports via bundler config (webpack, Rollup, Vite).
- Leverage preact/compat to reuse existing React components and libraries.
- Consider other frameworks (Mithril, Lit, Solid) if you need different trade-offs (e.g., Web Components, fine-grained reactivity).
- Benchmark startup and update performance, not just bundle size, when choosing a library.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
156 - Bundling for Production: Minification, Uglification, Mangling, SourceMaps

This note explains:
1. Enabling minification to remove whitespace and dead code.
2. Uglification to shorten and obfuscate code.
3. Mangling variable and function names for smaller bundles.
4. Generating source maps to map minified code back to original sources.
5. Examples for Webpack, Rollup, Vite, and CLI usage.
*/

// 1. Webpack Configuration (webpack.config.js)
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',           // enables built-in optimizations
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  devtool: 'source-map',        // separate .map file for debugging
  optimization: {
    minimize: true,             // turn on minimization
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,       // remove unreachable code, drop console.*
          mangle: true,         // shorten variable and function names
          format: { comments: false } // strip comments
        },
        extractComments: false  // don’t output LICENSE.txt files
      })
    ]
  }
};

// 2. Rollup Configuration (rollup.config.js)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true            // generate bundle.js.map
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({                   // enable compress & mangle by default
      format: { comments: false }
    })
  ]
};

// 3. Vite Configuration (vite.config.js)
import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    sourcemap: true,          // generate .map alongside .js
    minify: 'terser',         // use terser for better compression
    terserOptions: {
      compress: { drop_console: true },
      mangle: true
    }
  }
});

// 4. CLI Usage with Terser
// After bundling to dist/bundle.js, run:
// npx terser dist/bundle.js \
//   --compress \
//   --mangle \
//   --source-map "content=inline,url=bundle.js.map" \
//   -o dist/bundle.min.js

// 5. Best Practices:
/*
- Always enable source maps in production builds for error tracing.
- Strip comments and console.debug/log statements via compress options.
- Use mangle to reduce identifier length but keep important names via reserved option if needed.
- Monitor bundle size before and after to verify effectiveness.
- Consider adding gzip/brotli compression in your CI pipeline for further delivery optimizations.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
157 - Code Splitting Strategies: Splitting by Route, Splitting by Component

This note explains:
1. Splitting by Route – load route components on demand via dynamic import.
2. Splitting by Component – load rarely used or heavy components only when needed.
3. Bundler configuration – using magic comments for custom chunk names.
4. Examples in React (React.lazy/Suspense) and plain JS dynamic import.
5. Best-practice guidelines: fallback UIs, prefetching, chunk naming conventions.
*/

// 1. Splitting by Route in React (create-react-app, Webpack, Vite)
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Dynamic imports for route-based code splitting
const HomePage  = React.lazy(() => import(/* webpackChunkName: "home-page" */ './HomePage'));
const AboutPage = React.lazy(() => import(/* webpackChunkName: "about-page" */ './AboutPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// 2. Splitting by Component on User Interaction
// Example: load a heavy chart component only when user opens a modal
import React, { useState, Suspense } from 'react';

const ChartModal = React.lazy(() => import(/* webpackChunkName: "chart-modal" */ './ChartModal'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <ChartModal onClose={() => setShowChart(false)} />
        </Suspense>
      )}
    </div>
  );
}

// 3. Plain JS Dynamic Import (non-React)
// Load a utility module on demand
const loadUtilsBtn = document.getElementById('loadUtils');
loadUtilsBtn.addEventListener('click', async () => {
  const { heavyCalculation } = await import(
    /* webpackChunkName: "utils-heavy" */ './utils/heavy.js'
  );
  console.log('Result:', heavyCalculation(42));
});

// 4. Bundler Tips
// • Webpack: use /* webpackChunkName: "name" */ to name chunks.
// • Rollup/Vite: dynamic import() works out-of-the-box; use @rollup/plugin-dynamic-import-vars for complex patterns.
// • Vite: supports /* @vite-ignore */ to prevent pre-bundling.

// 5. Best Practices:
/*
- Provide a clear and fast fallback UI (spinner, skeleton).
- Name chunks logically using magic comments to ease debugging and caching.
- Prefetch routes/components during idle time: 
    <link rel="prefetch" href="/static/js/about-page.js" />
- Avoid splitting extremely small modules—over-splitting increases request overhead.
- Measure bundle sizes and load times; adjust chunk strategy based on real metrics.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
158 - Tree Shaking: Eliminating Dead Code via ES Modules

This note explains:
1. What tree shaking is and why ES modules enable it.
2. How static import/export allows bundlers to remove unused exports.
3. Example module with used and unused exports.
4. Webpack configuration for tree shaking (production mode, sideEffects flag).
5. Rollup configuration for tree shaking.
6. Verifying dead code removal.
*/

// 1 & 2. Example modules showing static imports/exports

// utils.js
export function usedFunction(x) {
  return x * 2;
}
export function unusedFunction(y) {
  console.log('This will be shaken out');
  return y + 1;
}

// main.js
import { usedFunction } from './utils.js';
console.log('usedFunction(5):', usedFunction(5)); // 10

// 3. Webpack config snippet enabling tree shaking
// webpack.config.js
const path = require('path');
module.exports = {
  mode: 'production',         // enables minification and tree shaking
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    usedExports: true,        // mark unused exports for removal
  },
  // In package.json, set "sideEffects": false to allow safe elimination
};

// 4. Rollup config snippet enabling tree shaking
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'main.js',
  output: {
    file: 'bundle.rollup.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [resolve()],
  treeshake: true,            // default in production
};

// 5. Verifying Dead Code Removal
// After bundling, search dist/bundle.js or bundle.rollup.js for "unusedFunction".
// It should not appear, confirming that the unused export was removed.

// 6. Best Practices:
/*
- Always use ES module syntax (import/export) for tree shaking to work.
- Declare "sideEffects": false in package.json or mark specific files to indicate no side effects.
- Build in production mode in bundlers (webpack, Rollup) to enable tree shaking.
- Avoid dynamic imports that import entire modules if only parts are needed.
- Keep modules small and focused to maximize removal of unused code.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
159 - Asset Optimization: Compressing Images, Gzipping, Brotli Compression

This note explains:
1. Compressing images (JPEG, PNG) at build time using imagemin.
2. Gzipping text-based assets (JS, CSS, HTML) with Node’s zlib.
3. Brotli compression for even smaller text assets.
4. Example scripts for automating these tasks.
*/

// 1. Compress images using imagemin
// Install: npm install imagemin imagemin-mozjpeg imagemin-pngquant
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
  await imagemin(['src/images/*.{jpg,jpeg,png}'], {
    destination: 'dist/images',
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.6, 0.8] })
    ]
  });
  console.log('Images optimized');
})();

// 2. Gzip compression for text assets using zlib
// Built-in modules: no install needed
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

function gzipFile(inputPath, outputPath) {
  const gzip = createGzip({ level: 9 }); // max compression
  createReadStream(inputPath)
    .pipe(gzip)
    .pipe(createWriteStream(outputPath))
    .on('finish', () => console.log(`Gzipped: ${outputPath}`));
}
// Example usage:
gzipFile('dist/app.js', 'dist/app.js.gz');
gzipFile('dist/style.css', 'dist/style.css.gz');

// 3. Brotli compression for text assets using zlib
import { createBrotliCompress } from 'zlib';

function brotliFile(inputPath, outputPath) {
  const brotli = createBrotliCompress({
    params: {
      [require('zlib').constants.BROTLI_PARAM_QUALITY]: 11
    }
  });
  createReadStream(inputPath)
    .pipe(brotli)
    .pipe(createWriteStream(outputPath))
    .on('finish', () => console.log(`Brotli compressed: ${outputPath}`));
}
// Example usage:
brotliFile('dist/app.js', 'dist/app.js.br');
brotliFile('dist/style.css', 'dist/style.css.br');

// 4. npm scripts (package.json)
/*
"scripts": {
  "optimize:images": "node scripts/optimize-images.js",
  "compress:gzip":   "node scripts/gzip-assets.js",
  "compress:brotli": "node scripts/brotli-assets.js",
  "build":           "npm run optimize:images && npm run compress:gzip && npm run compress:brotli"
}
*/

// Best Practices:
/*
- Run image optimization and asset compression as part of your CI/CD build pipeline.
- Use high-quality settings (e.g., jpeg quality ~75) balanced with visual fidelity.
- Serve .br (Brotli) when supported, falling back to .gz for older clients.
- Configure your web server (nginx, CDN) to serve compressed files and set Vary: Accept-Encoding.
- Clean up old compressed files to avoid serving stale assets.
*/

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
160 - Deployment Platforms: Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront, Firebase Hosting

This note explains:
1. Netlify – deploy via Git integration or CLI with netlify.toml configuration.
2. Vercel – deploy via vercel CLI with vercel.json configuration.
3. GitHub Pages – deploy static site using gh-pages branch or docs folder.
4. AWS S3 + CloudFront – sync build output to S3 and invalidate CloudFront cache.
5. Firebase Hosting – configure firebase.json and deploy via firebase CLI.
*/

// 1. Netlify Configuration (netlify.toml)
console.log(`# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`);

// 2. Vercel Configuration (vercel.json)
console.log(`# vercel.json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
`);

// 3. GitHub Pages Deployment (package.json scripts)
console.log(`# package.json (scripts section)
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
# Then run:
# npm run deploy
`);

// 4. AWS S3 + CloudFront (CLI commands)
console.log(`# AWS CLI Sync & Invalidate
# Sync build folder to S3 bucket
aws s3 sync ./dist s3://your-bucket-name --delete

# Create CloudFront cache invalidation
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
`);

// 5. Firebase Hosting (firebase.json & CLI)
console.log(`# firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}

# CLI Commands:
# Login and initialize if not already:
# firebase login
# firebase init hosting
# Deploy:
# firebase deploy --only hosting
`);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
161 - CI/CD Pipelines: Using GitHub Actions or GitLab CI to Lint, Test, Build, and Deploy Automatically

This note explains:
1. Setting up a GitHub Actions workflow (.github/workflows/ci.yml).
2. Setting up a GitLab CI config (.gitlab-ci.yml).
3. Common pipeline steps: install, lint, test, build, deploy.
4. Caching dependencies for faster builds.
5. Deploying to GitHub Pages or other hosts.
6. Best-practice guidelines.
*/

// 1. GitHub Actions workflow example (.github/workflows/ci.yml)
console.log(`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: \${{ matrix.node-version }}
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: node_modules
          key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
`);

// 2. GitLab CI configuration example (.gitlab-ci.yml)
console.log(`# .gitlab-ci.yml
stages:
  - lint
  - test
  - build
  - deploy

cache:
  key: \${CI_JOB_NAME}
  paths:
    - node_modules/

lint:
  stage: lint
  image: node:16
  script:
    - npm ci
    - npm run lint

test:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:16
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST -F token=\${CI_DEPLOY_TOKEN} -F ref=main https://gitlab.com/api/v4/projects/your-project-id/trigger/pipeline
  only:
    - main
`);

// 3. Key Pipeline Steps
/*
- Checkout code
- Setup correct Node.js version
- Cache dependencies (actions/cache or cache: in GitLab)
- Install with npm ci (lockfile ensures reproducibility)
- Lint (npm run lint)
- Run tests (npm test)
- Build production assets (npm run build)
- Deploy (GitHub Pages, Netlify, GitLab Pages, API trigger, etc.)
*/

// 4. Best Practices:
/*
- Split jobs into stages (lint → test → build → deploy) for clarity and early failure.
- Use dependency caching to speed up pipeline runs.
- Secure deploy keys/tokens via CI secrets (GITHUB_TOKEN, CI_DEPLOY_TOKEN).
- Run builds only on protected branches (e.g., main).
- Store artifacts (built assets) for later stages or debugging.
- Use matrix builds to test multiple Node.js or browser versions.
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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////