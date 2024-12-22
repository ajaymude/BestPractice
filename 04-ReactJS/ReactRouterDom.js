// React router dom
// v6 react router dom 
// installed react router dom  // npm i react-router-dom



// congig for the route
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);


// routes and nested routes
<Routes>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route>
</Routes>



// outlet for the parent if the parent contain the child 
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}


// index route
<Routes>
  <Route path="/" element={<Root />}>
    {/* renders into the outlet in <Root> at "/" */}
    <Route index element={<Home />} />

    <Route path="dashboard" element={<Dashboard />}>
      {/* renders into the outlet in <Dashboard> at "/dashboard" */}
      <Route index element={<DashboardHome />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>




// two types of routes 
// absolute route 
// relative routed 



// 404 page in react router dom 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 404 Page Component
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

// Some other components (e.g., Home, About, etc.)
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


























// NavLink for the active status  

import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling

// Define simple components for each route
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

function App() {
  return (
    <Router>
      <div className="container">
        {/* Navigation Links */}
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;





















//   lazy Loading 

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load the pages
const HomePage = React.lazy(() => import('./HomePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));
const ContactPage = React.lazy(() => import('./ContactPage'));

function App() {
  return (
    <Router>
      <div>
        <h1>My App with Lazy Loaded Pages</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;



import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load components
const HomePage = React.lazy(() => import('./HomePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error loading component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <div>
        <h1>Lazy Loading with Error Handling</h1>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;





// preload 
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load the component
const AboutPage = React.lazy(() => import('./AboutPage'));

function App() {
  useEffect(() => {
    // Preload the AboutPage component
    AboutPage.preload();
  }, []);

  return (
    <Router>
      <div>
        <h1>Lazy Loading with Preload</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;





















// Protected routes 

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";  // Our custom ProtectedRoute component
import Home from "./Home";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;


import React from "react";
import { Navigate , useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace  state={path:location.pathname} />;
  }

  // If authenticated, render the protected route's content
  return children;
};

export default ProtectedRoute;



const Home = () => {
  return <h1>Home Page</h1>;
};

export default Home;


const Dashboard = () => {
  return <h1>Dashboard - Protected Content</h1>;
};

export default Dashboard;


const Login = ({ setIsAuthenticated }) => {
  const location = useLocation()
  const redirectPath = location.state.pathname  || '/' ; 


  const handleLogin = () => {
    // You can implement authentication logic here
    setIsAuthenticated(true); // Assume login is successful
    navigate(redirectPath , {replace:true})
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;



// protected route 2 

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Navbar from "./components/Navbar";
import AdminHome from "./components/adminHome";
import Product from "./components/products";
import About from "./components/about";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/products" element={<Product />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"></li>
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && userType == "Admin" ? (
          <li className="nav-item">
            <Link to="/admin-dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
        ) : (
          isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/userDetails" className="nav-link">
                  User Details
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Product
                </Link>
              </li>
            </>
          )
        )}

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return isLoggedIn==="true"?<Outlet/>:<Navigate to="login"/>;
}

export default ProtectedRoute;




















// react router v7 























// hooks in react router dom 

// 1 useNavigate();

import { useNavigate } from 'react-router-dom';

function NavigateExample() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home'); // Navigate to "/home"
    navigate(-1); // Goes back one step in the history
    navigate('/about', { state: { message: 'Hello from HomePage!' } });// navigate with the state 

    // Replace the current page with the home page  / it don't save the previous history of the routes 
    navigate('/', { replace: true });
  };

  const handleSearch = (query) => {
    // Navigate with query parameters
    navigate(`/results?query=${query}`);
  };

  return (
    <div>
      <h2>Search Page</h2>
      <button onClick={() => handleSearch('react')}>Search for React</button>
      <button onClick={goHome}>Go to Home</button>;
    </div>
  );

}




















// 2 useLocation();
import { useLocation } from 'react-router-dom';

function CurrentLocation() {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  return (
    <div>
      <h2>About Page</h2>
      <p>State from HomePage: {location.state?.message}</p>
      <div>Current URL: {location.pathname}</div>;
      <p>Search Query: {query}</p>
    </div>
  );
}





















// 3 useParams()

import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();  // Get the dynamic 'id' from the URL
  let { categoryId, productId } = useParams();
  const { query } = useParams(); 



  return (
    <div>
      <h2>Search Results</h2>
      <p>Search Query: {query || 'No query provided'}</p>
      <h1>User ID: {id}</h1>; 
    </div>
  );

}

// In your Routes:
<Route path="/user/:id" element={<User />} />
<Route path="teams/:teamId" element={<Team />} />
<Route path="/search/:query?" element={<SearchResults />} />





















// 4 useMatch();

import { useMatch } from 'react-router-dom';

function ActiveLink() {
  const match = useMatch('/about');
  
  return match ? <div>We are on the About page!</div> : <div>Not on About page</div>;
}





















// 5 useRoutes 

import { useRoutes } from 'react-router-dom';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
}




















// 6 useSearchParams 

import { useSearchParams } from 'react-router-dom';

function SearchExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  

  const changeQuery = () => {
    setSearchParams({ name: 'John' });
  };

  return (
    <div>
      <button onClick={changeQuery}>Change Query</button>
      <p>Current query: {searchParams.get('name')}</p>
    </div>
  );
}




















// 7 Navigate()

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    
<Navigate to="/dashboard" replace />
<Navigate to="/login" state={{ message: "Session expired" }} />
  }
  return children;
};





