// 1  how to call api in react js 

import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function Demo() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fething in React</h1>
      <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {posts.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}




// 2 folder structure in reactjs 
src -
    - page 
    - component
    - hooks
    - api
    - store
    - libs 
    - utils
    - assets
    - services 



// 3 learn about the access token and refresh token 



// 4 file upload in reactjs with axios
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://httpbin.org/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      setStatus('success');
      setUploadProgress(100);
    } catch {
      setStatus('error');
      setUploadProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} />

      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
        </div>
      )}

      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}

      {file && status !== 'uploading' && (
        <button onClick={handleFileUpload}>Upload</button>
      )}

      {status === 'success' && (
        <p className="text-sm text-green-600">File uploaded successfully!</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </div>
  );
}




// 5 dynamic imports 
import React, { useState } from 'react';

function App2() {
  const [data, setData] = useState([20, 10, 30, 50, 40]);
  const sortNumbers = async () => {
    // Dynamically import Lodash's sortBy function
    const { sortBy } = await import('lodash');
    const sortedData = sortBy(data);
    setData(sortedData);
  };
  return (
    <div>
      <h1>Numbers: {data.join(', ')}</h1>
      <button onClick={sortNumbers}>Sort Numbers</button>
    </div>
  );
}


// 6 conditional rendering 
import React, { Suspense, lazy, useState } from 'react';

// Lazy load different user dashboards
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ManagerDashboard = lazy(() => import('./ManagerDashboard'));
const UserDashboard = lazy(() => import('./UserDashboard'));
function App() {
  const [userRole, setUserRole] = useState(null);
  const handleLogin = (role) => {
    setUserRole(role);
  };
  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <div>Please log in</div>;
    }
  };
  return (
    <div>
      {!userRole ? (
        <div>
          <button onClick={() => handleLogin('admin')}>Login as Admin</button>
          <button onClick={() => handleLogin('manager')}>Login as Manager</button>
          <button onClick={() => handleLogin('user')}>Login as User</button>
        </div>
      ) : (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          {renderDashboard()}
        </Suspense>
      )}
    </div>
  );
}

// 7 react route optimisation 
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}


// 8 Memoize Components to Improve Performance
// Prevent unnecessary re-renders
const MyComponent = React.memo(({ value }) => (
  <div>{value}</div>
));


// 9  Use PropTypes for Component Type Checking

import PropTypes from 'prop-types';

const Greeting = ({ name }) => <h1>Hello, {name}</h1>;

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

// 10 Manage State Efficiently with Context API or State Management Libraries

// Using React Context API for global state management
const ThemeContext = React.createContext();

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
);

const Toolbar = () => (
  <ThemeContext.Consumer>
    {theme => <div>The theme is {theme}</div>}
  </ThemeContext.Consumer>
);


// 11 Avoid Inline Functions in JSX for Better Performance

// Avoid this (causes new function creation on every render)
<button onClick={() => handleClick()}>Click me</button>

// Use this instead
const handleClick = () => { /* handle click */ };
<button onClick={handleClick}>Click me</button>

// 12 Use Error Boundaries for Better Error Handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


// 13
















































































