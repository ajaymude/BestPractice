// 1  const UserContext = React.createContext();

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const { user } = useContext(UserContext);
  return <div>{user ? `Welcome, ${user.name}!` : 'Please log in.'}</div>;
};











// 2 Suspense and Lazy Loading: Efficient Code Splitting

const AboutPage = React.lazy(() => import('./AboutPage'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AboutPage />
    </React.Suspense>
  );
}











// 3  Custom Hooks: Making Your Code DRY

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, [url]);
  
    return { data, loading };
  }











  // 4 Error Boundaries: Handling React Errors Gracefully ⚠️

  class ErrorBoundary extends React.Component {
    state = { hasError: false };
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      console.log(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong!</h1>;
      }
      return this.props.children;
    }
  }











// 5 fetch data
import { useState, useEffect } from 'react';

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, error, loading };
}

function MyComponent() {
    const { data, error, loading } = useFetchData('/api/data');
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return <div>{JSON.stringify(data)}</div>;
  }



  app.get('/users', async (req, res) => {
    try {
      const users = await User.find().lean(); // .lean() returns plain JS objects instead of Mongoose documents
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

