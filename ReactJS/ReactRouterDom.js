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




















//   lazy Loading 
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load the AboutPage component
const AboutPage = React.lazy(() => import('./AboutPage'));

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to My App</h1>
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




















// hooks in react router dom 

// 1 useNavigate();

import { useNavigate } from 'react-router-dom';

function NavigateExample() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home'); // Navigate to "/home"
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





