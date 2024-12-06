
// React router dom

// we can create react router dom in two way 
// 

// create react app 
npx create-vite@latest



// v6 react router dom 
// installed react router dom 
npm i react-router

// config for the parent app to react router dom 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


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


// routes 
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


// nestded routes
<Routes>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<Settings />} />
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


// route layout 
<Routes>
  <Route element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  <Route path="projects">
    <Route index element={<ProjectsHome />} />
    <Route element={<ProjectsLayout />}>
      <Route path=":pid" element={<Project />} />
      <Route path=":pid/edit" element={<EditProject />} />
    </Route>
  </Route>
</Routes>


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


//  route prefixes 
<Route path="projects">
  <Route index element={<ProjectsHome />} />
  <Route element={<ProjectsLayout />}>
    <Route path=":pid" element={<Project />} />
    <Route path=":pid/edit" element={<EditProject />} />
  </Route>
</Route>

//how to define param
<Route path="teams/:teamId" element={<Team />} />

//how to get the params 
import { useParams } from "react-router";

export default function Team() {
  let params = useParams();
  // params.teamId
}

// how to import multiple params 
import { useParams } from "react-router";

export default function Team() {
  let { categoryId, productId } = useParams();
  // ...
}


// optional segment 
<Route path=":lang?/categories" element={<Categories />} />
<Route path="users/:userId/edit?" component={<User />} />


// splate
<Route path="files/*" element={<File />} />

let params = useParams();
// params["*"] will contain the remaining URL after files/
let filePath = params["*"];

let { "*": splat } = useParams();



// two types of routes 
// absolute route 
// relative routed 



// React router dom

// we can create react router dom in two way 
// 

// create react app 
npx create-vite@latest

// installed react router dom 
npm i react-router

// config for the parent app to react router dom 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


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


// routes 
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


// nestded routes
<Routes>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<Settings />} />
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


// route layout 
<Routes>
  <Route element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  <Route path="projects">
    <Route index element={<ProjectsHome />} />
    <Route element={<ProjectsLayout />}>
      <Route path=":pid" element={<Project />} />
      <Route path=":pid/edit" element={<EditProject />} />
    </Route>
  </Route>
</Routes>


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


//  route prefixes 
<Route path="projects">
  <Route index element={<ProjectsHome />} />
  <Route element={<ProjectsLayout />}>
    <Route path=":pid" element={<Project />} />
    <Route path=":pid/edit" element={<EditProject />} />
  </Route>
</Route>

//how to define param
<Route path="teams/:teamId" element={<Team />} />

//how to get the params 
import { useParams } from "react-router";

export default function Team() {
  let params = useParams();
  // params.teamId
}

// how to import multiple params 
import { useParams } from "react-router";

export default function Team() {
  let { categoryId, productId } = useParams();
  // ...
}


// optional segment 
<Route path=":lang?/categories" element={<Categories />} />
<Route path="users/:userId/edit?" component={<User />} />


// splate
<Route path="files/*" element={<File />} />

let params = useParams();
// params["*"] will contain the remaining URL after files/
let filePath = params["*"];

let { "*": splat } = useParams();



// two types of routes 
// absolute route 
// relative routed 




 //  programatically navigate 
 // React (React Router v6 and later uses useNavigate)
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const goToNewPage = () => {
    navigate('/new-page');
  };

  return <button onClick={goToNewPage}>Go to New Page</button>;
}


// go back in react router v6 
// React (React Router v6 and later uses useNavigate)
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const goToNewPage = () => {
    navigate('/new-page');
  };

  return <button onClick={goToNewPage}>Go to New Page</button>;
}


// replace in react router dom to make route secure 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here...

    // Replace the current page with the home page
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;


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





// nested route in react js 

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dashboard Route with Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// parent component setting 
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="settings">Settings</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Render nested route components here */}
      <Outlet />
    </div>
  );
}

export default Dashboard;







// useParams in react router dom 

// getting the id 
import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  // Accessing the 'id' parameter from the URL
  const { id } = useParams();

  return (
    <div>
      <h2>User Profile</h2>
      <p>Showing profile for user ID: {id}</p>
    </div>
  );
}

export default UserProfile;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;


// getting the multiple id 
import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  // Accessing multiple parameters from the URL
  const { category, id } = useParams();

  return (
    <div>
      <h2>Product Detail</h2>
      <p>Category: {category}</p>
      <p>Product ID: {id}</p>
    </div>
  );
}

export default ProductDetail;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/:category/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;



// query in react router dom 

import React from 'react';
import { useParams } from 'react-router-dom';

function SearchResults() {
  const { query } = useParams();

  return (
    <div>
      <h2>Search Results</h2>
      <p>Search Query: {query || 'No query provided'}</p>
    </div>
  );
}

export default SearchResults;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search/:query?" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;


//  Navigating with State:

import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about', { state: { message: 'Hello from HomePage!' } });
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
}

export default HomePage;



import React from 'react';
import { useLocation } from 'react-router-dom';

function AboutPage() {
  const location = useLocation();

  return (
    <div>
      <h2>About Page</h2>
      <p>State from HomePage: {location.state?.message}</p>
    </div>
  );
}

export default AboutPage;












 //  search query with react 
 import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Navigate with query parameters
    navigate(`/results?query=${query}`);
  };

  return (
    <div>
      <h2>Search Page</h2>
      <button onClick={() => handleSearch('react')}>Search for React</button>
    </div>
  );
}

export default SearchPage;


import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  return (
    <div>
      <h2>Search Results</h2>
      <p>Search Query: {query}</p>
    </div>
  );
}

export default ResultsPage;



// search param
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams] = useSearchParams();
  
  // Get the 'query' parameter from the URL
  const query = searchParams.get('query');
  
  return (
    <div>
      <h2>Search Page</h2>
      <p>Search Query: {query}</p>
    </div>
  );
}

export default SearchPage;


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
