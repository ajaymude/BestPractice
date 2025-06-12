// 🌐 REACT ROUTER
// 37 - Installing React Router
// 38 - Route, Link, and BrowserRouter
// 39 - useParams, useNavigate
// 40 - Nested Routes
// 41 - Redirects and NotFound pages


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