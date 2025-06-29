// 🌐 REACT ROUTER
// 37 - Installing React Router
// 38 - Route, Link, and BrowserRouter
// 39 - useParams, useNavigate
// 40 - Nested Routes
// 41 - Redirects and NotFound pages



// ======================
// React Router DOM Full Syllabus
// (Beginner to Expert)
// ======================

// 📘 INTRODUCTION & SETUP
// 01 - What is React Router DOM and why use it?
// 02 - Comparison: React Router vs other routing libraries (Reach Router, Next.js Router)
// 03 - Installing React Router DOM: npm install react-router-dom@6
// 04 - Setting up BrowserRouter vs HashRouter vs MemoryRouter
// 05 - Wrapping the application with <BrowserRouter> in index.js
// 06 - Understanding history modes: browserHistory vs hashHistory
// 07 - Project structure: organizing Routes in a central file vs co-locating with components

// 🔤 CORE CONCEPTS & BASIC ROUTING
// 08 - Defining routes with <Routes> and <Route> components
// 09 - Path matching: exact vs partial matching in v6 (no “exact” prop, just full path matching by default)
// 10 - Rendering components via element prop: <Route path="/home" element={<Home />} />
// 11 - Nested routes: <Route path="/dashboard" element={<Dashboard />}><Route path="stats" element={<Stats />} /></Route>
// 12 - Route slices and layouts: creating shared layout components with <Outlet>
// 13 - Index routes: using <Route index element={<Landing />} /> inside parent routes
// 14 - The <Outlet> component: rendering child routes in nested layouts
// 15 - Using wildcard routes for 404 pages: <Route path="*" element={<NotFound />} />

// 🚀 NAVIGATION & LINKING
// 16 - The <Link> component: navigating without full page reload
// 17 - The <NavLink> component: adding active styling via isActive or className function
// 18 - Programmatic navigation with useNavigate(): navigate("/path"), navigate(-1), navigate(1)
// 19 - Passing state through navigation: navigate("/profile", { state: { from: "/" } })
// 20 - Reading location state via useLocation(): location.state, pathname, search, hash
// 21 - Anchor tags vs <Link>: SEO and accessibility considerations
// 22 - scrollRestoration: controlling scroll position on navigation (v6.4+ features)

// ⚙ ROUTE PARAMETERS & DATA
// 23 - Dynamic route segments: path="/users/:userId"
// 24 - Retrieving URL params with useParams(): const { userId } = useParams()
// 25 - Query parameters: parsing search string via useLocation().search and URLSearchParams
// 26 - Hash fragments: reading location.hash, scrolling to fragment via id
// 27 - Route path patterns: optional segments (":id?"), splat routes ("*"), nested dynamic routes
// 28 - Parameter validation: custom hooks to validate and handle missing parameters
// 29 - Passing props to routed components via element or wrapper component

// 🔄 LAYOUTS & NESTED STRUCTURES
// 30 - Defining layout routes: creating <Layout> with header/footer and <Outlet> for child content
// 31 - Sharing nested data via context in layout components
// 32 - Route grouping by feature: grouping admin routes under /admin with their own layout
// 33 - Lazy loading nested routes: using React.lazy and <Suspense> around nested <Routes>
// 34 - Handling multiple <Outlet> placeholders via context or separate nested sectioindex routes
// 35 - Breadcrumbs based on nested route hierarchy: using useMatches() in v6.4+

// 🔧 REDIRECTS & NAV GUARDS
// 36 - Redirecting with <Navigate>: <Route path="/" element={<Navigate to="/home" replace />} />
// 37 - Programmatic redirects using navigate(), replace option: navigate("/login", { replace: true })
// 38 - Protected routes (auth guards): creating <ProtectedRoute> wrapper that checks auth and redirects
// 39 - Role-based route protection: restricting routes based on user roles or permissions
// 40 - Conditional rendering of navigation items based on authentication state
// 41 - Blocking navigation (beforeunload) using usePrompt or custom handler in v6 (unstable_HistoryRouter)

// 📡 DATA LOADING & ROUTE-LEVEL
// 42 - Introduction to data routers (v6.4+): createBrowserRouter, createHashRouter
// 43 - Defining loaders for routes: loader: async ({ params }) => fetchData(params.id)
// 44 - Accessing loaded data with useLoaderData() in routed components
// 45 - ErrorElement prop: rendering fallback UI when loader or action throws an error
// 46 - Defining actions on routes: action: async ({ request, params }) => handle form submissions
// 47 - Using Form component (v6.4+): <Form method="post" action="/create" replace>
// 48 - Fetchers API: useFetcher() for non-route-bound data mutations and refetching
// 49 - Deferred and lazy loading data: defer() to stream data to UI, useDeferredValue in components
// 50 - Mutation transitions: using useNavigation() to track loading state, isSubmitting, isLoading

// 🔁 NAV HOOKS & HELPERS
// 51 - useNavigate(): imperative navigation, passing data and replace vs push
// 52 - useParams(): retrieving dynamic segments from path
// 53 - useLocation(): accessing current location object: pathname, search, hash, state
// 54 - useMatch(): checking if current URL matches a pattern, use for conditional UI
// 55 - useRoutes(): dynamically generating routes from a configuration array
// 56 - useOutlet(): retrieving the rendered child Outlet element, useful for animations
// 57 - useOutletContext(): passing context from layout to nested routes
// 58 - useNavigationType(): identifying how navigation occurred (POP, PUSH, REPLACE)
// 59 - useNavigation(): tracking state of data router navigation, use to show loading spinners
// 60 - useMatches(): retrieving an array of matched route objects and loader data for breadcrumbs

// 🔄 ANIMATIONS & TRANSITIONS
// 61 - Basic page transitions: wrapping <Routes> or <Outlet> in CSSTransition or TransitionGroup
// 62 - Coordinating route changes with React Transition Group: animating on mount/unmount
// 63 - Animating nested route content via useOutlet() and key on <Outlet>
// 64 - Framer Motion integration: using <AnimatePresence> and motion.div for page transitions
// 65 - Scroll to top on route change: custom ScrollToTop component with useEffect monitoring location.pathname
// 66 - Retaining scroll position: using useNavigationType and saving scroll positions in state
// 67 - Loading indicator transitions: showing a loader during data loading using useNavigation().state

// 🔗 NAVIGATOR PATTERNS & STRATEGIES
// 68 - Breadcrumb navigation using useMatches() and route meta data
// 69 - Tabbed navigation using nested routes and conditional rendering
// 70 - Sidebar navigation: active link highlighting with <NavLink> and nested lists
// 71 - Modal routes: rendering a modal overlay on top of existing UI via location.state.backgroundLocation
// 72 - Drawer and popover routing: using portals and <Outlet> for UI layering
// 73 - Layout switching based on route: switching between public and admin layouts dynamically

// 🏗 ADVANCED ROUTING PATTERNS
// 74 - Dynamic route configuration: generating <Route> elements from a JSON or server-provided config
// 75 - Multiple parameters and optional segments: e.g., /:category/:itemId?
// 76 - Catch-all routes: handling /files/* to load any nested path
// 77 - Route ranking and specificity: understanding how v6 ranks routes for best match
// 78 - Creating an error boundary for routes: wrapping loaders/actions with try/catch to show <ErrorBoundary>
// 79 - Query-string-driven routing: building routes that change based on query parameters
// 80 - Handling conflicting routes: ensuring unique path patterns and fallback routes

// 📈 CODE SPLITTING & LAZY LOADING
// 81 - Lazy loading route components with React.lazy() and <Suspense>
// 82 - Splitting vendor vs route bundles: configuring webpack or Vite dynamic imports
// 83 - Prefetching routes: using import().then to pre-load components on hover or idleness
// 84 - Route-based prefetching of data: calling router.load() or initiating loader fetch early
// 85 - Progressive route loading: showing placeholder UI while component or data is loading

// 🗄 STATE & ROUTE SYNC
// 86 - Synchronizing Redux store or Context with route changes using useLocation()
// 87 - Storing route information in URL state: preserving filter/sort settings in query params
// 88 - Scroll restoration: using <ScrollRestoration> in v6.4+ to auto-manage scroll
// 89 - Persisting UI state across reloads: reading/writing state to localStorage based on location.pathname
// 90 - Deep linking: handling direct links to nested routes with preloaded data

// 🔒 ROUTE SECURITY & AUTHENTICATION
// 91 - Creating a ProtectedRoute component that wraps children and checks auth status
// 92 - Redirecting unauthorized users to /login with intended path saved in state
// 93 - Role-based access: passing allowed roles as prop to ProtectedRoute
// 94 - Handling token expiration: listening to navigation events to refresh or logout
// 95 - Guarding data router loaders: throwing redirect from loader if not authenticated
// 96 - Server-side rendering (SSR) route protection: validating session on server and redirecting

// 📡 SSR & FRAMEWORK INTEGRATION
// 97 - Server-side rendering with React Router: using StaticRouter in Node.js environment
// 98 - Hydrating on client: using hydrateRoot and <BrowserRouter location={url}>
// 99 - Route data fetching on server: preloading loader data and passing as initial state
// 100 - Next.js vs React Router SSR: comparing patterns, benefits, and trade-offs
// 101 - Remix integration or comparison: using React Router under the hood, understanding differences
// 102 - Gatsby integration with reach router: differences and migration to React Router

// 📊 TESTING ROUTES & NAVIGATION
// 103 - Unit testing routed components: rendering with MemoryRouter and initialEntries
// 104 - Testing useNavigate behavior: mocking navigate and asserting calls
// 105 - Testing dynamic parameters: rendering <Route path="/users/:id"> and asserting useParams
// 106 - Testing redirect routes: using <MemoryRouter initialEntries={["/old"]} /> to assert navigation to /new
// 107 - Testing loaders and actions: mocking fetch in data routers, using createMemoryRouter for v6.4+
// 108 - Integration testing with React Testing Library: simulating clicks on <Link> and asserting UI changes
// 109 - E2E testing with Cypress: visiting routes, asserting URL changes, testing 404 fallback

// 🔧 MIGRATION & UPGRADE PATHS
// 110 - Migrating from v5 to v6: switch from <Switch> to <Routes>, use of element prop instead of component
// 111 - Adapting to nested routes in v6: restructuring route definitions, replacing render props with element
// 112 - Handling history object changes: using useNavigate instead of history.push
// 113 - Refactoring code that used withRouter HOC to hooks like useLocation and useNavigate
// 114 - Updating <NavLink> active styling: replaced activeClassName with className function
// 115 - Removing deprecated <Redirect> in favor of <Navigate>
// 116 - Migrating from HashRouter to BrowserRouter or vice versa for specific use cases

// 📈 PERFORMANCE OPTIMIZATIONS
// 117 - Minimizing re-renders on route change: using React.memo and avoiding passing new props to routes
// 118 - Using location.key as key on <Routes> or <Outlet> to force remount vs reuse
// 119 - Debouncing navigation events: preventing rapid clicks from causing multiple renders
// 120 - Prefetching data and code: balancing network usage vs perceived performance
// 121 - Reducing bundle size: ensuring route components are lazy-loaded and splitting only what’s needed

// 🧩 PLUGINS & ECOSYSTEM
// 122 - react-router-config (legacy) vs v6 nested configurations: when to use useRoutes
// 123 - Integrating with form libraries (Formik, React Hook Form) to handle route-based form submissions
// 124 - Animation libraries for route transitions: Framer Motion, React Spring
// 125 - Breadcrumb components: using useMatches in data router or custom logic for v6
// 126 - Third-party UI integrations: Ant Design Menu with <NavLink> for active highlighting
// 127 - SEO considerations: meta tags management with react-helmet-async in route components
// 128 - Accessibility in routing: ensuring focus management on route change, using <FocusRestoration> in v6.4+

// 🛡 SECURITY BEST PRACTICES
// 129 - Preventing open redirects: validating redirect destinations in protected route logic
// 130 - Sanitizing URL params: validating IDs or slugs before using in loaders
// 131 - Avoiding XSS via route paths: restricting path formats and validating user-generated segments
// 132 - Enforcing HTTPS: redirecting http to https within Router or server configuration
// 133 - Handling CSRF in data routes: synchronizing tokens between client and loader/actions in v6.4+

// 🚀 DEPLOYMENT & PRODUCTION
// 134 - Configuring 404 fallback on static hosting: redirecting all requests to index.html for BrowserRouter
// 135 - Using <HashRouter> for environments without server-side rewrite capabilities
// 136 - Optimizing service worker caching for route assets: configuring workbox to pre-cache route chunks
// 137 - Setting basename on <BrowserRouter> for hosting under subdirectory (e.g., "/app")
// 138 - Handling trailing slashes: ensuring consistent routing with or without trailing slash
// 139 - Integrating with CDN: serving built route bundles from CDN for faster page loads
// 140 - Using environment variables: REACT_APP_ROUTER_BASENAME to handle different deployment contexts

// 🏆 CAREER & COMMUNITY
// 141 - Contributing to React Router DOM: following GitHub issues and pull request workflow
// 142 - Following React Router release notes and migration guides
// 143 - Learning from official React Router examples and tutorial codebases
// 144 - Engaging with community: Reactiflux Discord, Stack Overflow, GitHub Discussions for React Router
// 145 - Staying updated: subscribing to React Router’s author blogs, watching conference talks on routing best practices

// — END OF REACT ROUTER DOM SYLLABUS —  



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Topic 37: Installing and Setting Up React Router (v6) – Detailed Notes and Examples
//
// React Router enables declarative routing in React applications, managing
// navigation and URL synchronization. Version 6 introduces simplified API
// and nested routes improvements.
//
// Installation:
//   • npm install react-router-dom@6
//   • yarn add react-router-dom@6
//
// Core Concepts:
//   1. Router Container:
//      - BrowserRouter: uses HTML5 history API (pushState, replaceState, popstate)
//      - HashRouter: uses URL hash for legacy support (#)
//   2. Routes & Route:
//      - <Routes> replaces v5 <Switch>, selects the first matching <Route>
//      - <Route path="..." element={<Component />} />
//   3. Navigation Components:
//      - <Link to="/path">Link</Link> avoids full page reloads
//      - <NavLink> for active styling
//   4. Hooks for Routing:
//      - useParams(): extract URL parameters
//      - useNavigate(): imperatively navigate
//      - useLocation(): access current location object
//      - useMatch(): match the current URL against a pattern
//
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';

// Example 1: Basic Router Setup
export function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />}>  {/* Parent route */}
          <Route path=":userId" element={<UserProfile />} />  {/* Nested route */}
        </Route>
        <Route path="*" element={<NotFound />} />  {/* 404 fallback */}
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Users() {
  const location = useLocation();
  return (
    <div>
      <h2>Users List</h2>
      {/* Link to nested route */}
      <Link to="/users/1">User 1</Link><br />
      <Link to="/users/2">User 2</Link>
      {/* Show nested routes here */}
      <Routes>
        <Route path=":userId" element={<UserProfile />} />
      </Routes>
      <p>Current path: {location.pathname}</p>
    </div>
  );
}

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h3>User Profile for ID: {userId}</h3>
      <button onClick={() => navigate('/users')}>Back to Users</button>
    </div>
  );
}

function NotFound() {
  return <h2>404: Page Not Found</h2>;
}

// Usage Notes:
// • Wrap your app in <AppRouter /> at the root of your component tree.
// • Define <Routes> and nested <Route> structures for hierarchical URLs.
// • Use <Link> or <NavLink> for navigation to prevent full reloads.
// • Leverage routing hooks (useParams, useNavigate, useLocation) within components.
// • For active link styling, use <NavLink> with className or style callbacks:
//     <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
// • React Router v6 removes support for <Switch>, uses <Routes> and element prop.
// • Always include a catch-all route (path="*") for 404 handling.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



// Topic 38: Route, Link, and BrowserRouter – Detailed Notes and Examples
//
// React Router’s core building blocks for declarative routing:
//
// 1. BrowserRouter
//    • The router container that uses HTML5 history API for clean URLs.
//    • Wraps your application to enable routing context.
//
// 2. Route
//    • Defines a mapping between a URL path and the component to render.
//    • Syntax: <Route path="/path" element={<Component />} />
//    • Supports dynamic segments (e.g., ":id") and nested routing.
//
// 3. Link
//    • Navigation component that renders an anchor (<a>) without full reloads.
//    • Syntax: <Link to="/path">Navigate</Link>
//    • Automatically prevents default browser behavior and uses history.push.
//
// 4. NavLink (extension of Link)
//    • Adds active styling based on matching the current URL.
//    • Accepts className or style as a function: ({ isActive }) => ...
//
import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

// Example: Basic Routing Setup
export function AppRouter() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigation Component using Link and NavLink
function Navigation() {
  return (
    <nav>
      {/* Link prevents page reloads */}
      <Link to="/">Home</Link> |{' '}
      {/* NavLink adds active class */}
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        About
      </NavLink> |{' '}
      <NavLink
        to="/products/42"
        style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
      >
        Product 42
      </NavLink>
    </nav>
  );
}

// Page Components
function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

// Dynamic Route Component: retrieves :id param
import { useParams } from 'react-router-dom';
function Product() {
  const { id } = useParams();
  return <h2>Product Details for ID: {id}</h2>;
}

function NotFound() {
  return <h2>404 – Page Not Found</h2>;
}

// Usage Notes:
// • Always wrap your app in <BrowserRouter> to enable routing.
// • Use <Routes> to define <Route> elements; v6 replaces <Switch>.
// • <Route> supports nested children via <Route> inside another <Route>.
// • Use <Link> for navigation to avoid full page refresh.
// • Use <NavLink> for active link styling with className/style callbacks.
// • Dynamic segments in path (e.g., ":id") hook into useParams for lookup.
// • The catch-all route path="*" handles unmatched URLs gracefully.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 39: useParams and useNavigate – Detailed Notes and Multiple Examples
//
// useParams()
// • Hook to access dynamic route parameters defined in a Route path (e.g., "/users/:id").
// • Returns an object mapping parameter names to their values.
//
// useNavigate()
// • Hook to programmatically navigate within the app.
// • Returns a navigate function: navigate(path, { replace, state }).
//
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Example 1: Accessing Single Param
export function UserProfile() {
  const { id } = useParams();
  return <h2>User Profile for ID: {id}</h2>;
}

// Route definition:
// <Route path="/users/:id" element={<UserProfile />} />

// Example 2: Accessing Multiple Params
export function PostComment() {
  const { postId, commentId } = useParams();
  return (
    <div>
      <p>Post ID: {postId}</p>
      <p>Comment ID: {commentId}</p>
    </div>
  );
}

// Route definition:
// <Route path="/posts/:postId/comments/:commentId" element={<PostComment />} />

// Example 3: Programmatic Navigation after Action
export function LoginButton() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // perform login logic...
    navigate('/dashboard'); // push /dashboard onto history
  };
  return <button onClick={handleLogin}>Login</button>;
}

// Example 4: replace vs push and passing state
export function SaveAndRedirect() {
  const navigate = useNavigate();
  const handleSave = () => {
    // perform save logic...
    navigate('/success', { replace: true, state: { from: '/form' } });
  };
  return <button onClick={handleSave}>Save</button>;
}

// Accessing passed state:
// import { useLocation } from 'react-router-dom';
// const { state } = useLocation();
// console.log(state.from);

// Notes:
// • useParams works only inside components rendered by a <Route> with params.
// • useNavigate replaces useHistory from React Router v5.
// • { replace: true } avoids adding a new entry to history (no back button).
// • { state } can carry context; access via useLocation().
// • Always import hooks directly from 'react-router-dom'.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Topic 40: Nested Routes – Detailed Notes and Multiple Examples
//
// Nested routes allow structuring related UI under a shared layout, enabling
// parent components to render common UI (like navigation) and child components
// to render specific content in an <Outlet> placeholder.
// React Router v6 supports nested routes via child <Route> definitions.
//
// Key Concepts:
// 1. Parent Route:
//    • Defines a path and an element that includes an <Outlet /> for children.
// 2. Nested Routes:
//    • Child <Route> elements inside a parent <Route> share the URL base.
// 3. Index Routes:
//    • Default child route rendered when path matches exactly (no additional segment).
// 4. Outlet:
//    • Placeholder component in parent’s JSX where child routes render.
//
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useRoutes } from 'react-router-dom';

// Parent layout component with shared navigation and Outlet for children
function DashboardLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Overview</Link> |{' '}
        <Link to="settings">Settings</Link> |{' '}
        <Link to="analytics">Analytics</Link>
      </nav>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        {/* Nested route elements render here */}
        <Outlet />
      </div>
    </div>
  );
}

// Child components for nested routes
function Overview() {
  return <h3>Dashboard Overview Content</h3>;
}

function Settings() {
  return <h3>Dashboard Settings Content</h3>;
}

function Analytics() {
  return <h3>Dashboard Analytics Content</h3>;
}

// Application router using nested <Route> definitions
export function AppNestedRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>  {/* Parent route */}
          <Route index element={<Overview />} />                 {/* Index route */}
          <Route path="settings" element={<Settings />} />     {/* Nested child */}
          <Route path="analytics" element={<Analytics />} />   {/* Nested child */}
        </Route>
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

// Alternative: useRoutes hook for nested config
const nestedRoutesConfig = [
  {
    path: '/app',
    element: <DashboardLayout />, // can reuse layout
    children: [
      { index: true, element: <Overview /> },
      { path: 'settings', element: <Settings /> },
      { path: 'analytics', element: <Analytics /> }
    ]
  },
  { path: '*', element: <h2>404 - Not Found</h2> }
];

export function AppWithUseRoutes() {
  const element = useRoutes(nestedRoutesConfig);
  return <BrowserRouter>{element}</BrowserRouter>;
}

// Notes:
// • Parent components should include <Outlet /> to render child routes.
// • Index routes render the default child at parent path.
// • Child paths are relative: "settings" → "/dashboard/settings".
// • useRoutes offers a programmatic way to define nested routing via config.
// • Always wrap routes in a router container (BrowserRouter) at the app root.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 41: Redirects and NotFound Pages – Detailed Notes and Multiple Examples
//
// React Router v6 introduces the <Navigate> component for declarative redirects
// and a catch-all <Route path="*"> for 404 handling. These improve UX by
// guiding users and gracefully handling invalid URLs.
//
// Key Concepts:
// 1. <Navigate>:
//    • Programmatically redirects to another route.
//    • Props:
//      - to: destination path (string)
//      - replace: boolean (replaces history entry when true)
//      - state: optional object passed via location (e.g., { from: currentPath })
//
// 2. 404 Catch-All Route:
//    • <Route path="*" element={<NotFound />} /> placed last in <Routes>
//    • Matches any URL not handled by preceding routes.
//
// 3. Conditional Redirects:
//    • Use <Navigate> inside component render logic based on conditions.
//    • Common pattern: protect routes by redirecting unauthenticated users.
//
// Example 1: Root Redirect and Simple Page Redirects
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

export function AppRedirects() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Root</Link> | <Link to="/new">New</Link>
      </nav>
      <Routes>
        {/* Redirect from root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        {/* Simple path-level redirect */}
        <Route path="/old" element={<Navigate to="/new" />} />
        <Route path="/new" element={<NewPage />} />
        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Welcome Home</h2>;
}
function NewPage() {
  return <h2>This is the New Page</h2>;
}
function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

// Example 2: Protected Route with Conditional Redirect
import { useState } from 'react';
export function ProtectedApp() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={
          authenticated
            ? <Dashboard />
            : <Navigate to="/login" replace state={{ from: '/dashboard' }} />
        } />
        <Route path="/login" element={<Login onLogin={() => setAuthenticated(true)} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Dashboard() {
  return <h2>Dashboard (Protected)</h2>;
}
function Login({ onLogin }) {
  const handle = () => onLogin();
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handle}>Log In</button>
    </div>
  );
}

// Notes:
// • Use 'replace' to avoid users going back to the redirected route via back-button.
// • Pass 'state' to preserve the original location for post-login redirects.
// • Always place the catch-all 404 route last to avoid shadowing other routes.
// • Nested redirects can be composed inside layout components as needed.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////















///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 01 - react router dom 
//            - ReactDom
//            - createBrowserRouter
//                       - path    
//                       - element   
//                       - children 
//                       - path    
//            - createBrowserRouter
//                       - createRoutesFromElements
//                              - Routes
//                              - Route
//                                    - path
//                                    - element
//            - RouterProvider
//            - BrowserRouter
//            - Link
//            - NavLink
//            - outlet
//            - useParams
//            - useParams
//            - useParams
//            - useParams
//            - useParams
//         



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 02 - Navlink 

import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const activeStyle = {
  fontWeight: 'bold',
  color: 'red',
  textDecoration: 'underline',
};

function App() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <NavLink to="/" end style={({ isActive }) => isActive ? activeStyle : undefined}>
          Home
        </NavLink>{' | '}
        <NavLink to="/about" style={({ isActive }) => isActive ? activeStyle : undefined}>
          About
        </NavLink>{' | '}
        <NavLink to="/contact" style={({ isActive }) => isActive ? activeStyle : undefined}>
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;


// Navlink with the className

import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css'; // Import your CSS

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Contact
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex space-x-4 bg-white p-4">
      {/* 
        - `end` ensures "/" only matches exactly "/" (not "/about", etc.)
        - `className` can be a function receiving { isActive }
      */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        About
      </NavLink>

      <NavLink
        to="/blog"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Blog
      </NavLink>
    </nav>
  );
};

export default Navbar;

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

<Route path="/about" element={<Navigate to='/' />} />



// create a special folder for the router , then export the file in the main tag 