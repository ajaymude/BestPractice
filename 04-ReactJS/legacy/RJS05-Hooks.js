// 01 - useState

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 01 - useState

// basic
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Initializing state with 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// state updater function
const [user, setUser] = useState({ name: "Ajay", age: 25 });

const updateAge = () => {
  setUser((prevUser) => ({
    ...prevUser, // Spread previous state
    age: prevUser.age + 1,
  }));
};



// when you want to pass the data in the function
const removeItem = (id) => {
  let newPeople = people.filter((person) => person.id !== id);
  setPeople(newPeople);
};
<button onClick={() => removeItem(id)}>remove</button>;



// ❌ Forgetting Functional Updates
setCount(count + 1);
setCount(count + 1); // ❌ Won't increment twice correctly

// ✅ Correct Approach
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // ✅ Correctly increments by 2

// Lazy Initialization
const expensiveCalculation = () => {
  console.log("Calculating...");
  return 100;
};

const [count, setCount] = useState(expensiveCalculation); // Runs only once

// useState with Forms
const [formData, setFormData] = useState({ username: "", email: "" });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value, // Dynamically update field
  });
};

// useState with the timer

import { useState } from "react";

function DelayedCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount(count + 1); // ❌ This might cause stale state issues
    }, 2000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment After 2s</button>
    </div>
  );
}

export default DelayedCounter;

// correct way to solve the state with the time
function DelayedCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1); // ✅ Correct approach
    }, 2000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment After 2s</button>
    </div>
  );
}

//   ✅ Use functional updates (setCount(prev => prev + 1)) to avoid stale state.
//   ✅ Use clearTimeout() in useEffect to prevent memory leaks.
//   ✅ Avoid directly modifying the state inside setTimeout.



// use state with the object 
import { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'peter',
    age: 24,
    hobby: 'read books',
  });

  const displayPerson = () => {
    setPerson({ name: 'john', age: 28, hobby: 'scream at the computer' });
    // be careful, don't overwrite
    // setPerson({ name: 'susan' });
    // setPerson({ ...person, name: 'susan' });
  };
  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h4>Enjoys To: {person.hobby}</h4>
      <button className='btn' onClick={displayPerson}>
        show john
      </button>
    </>
  );
};

export default UseStateObject;

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 02 - useEffect

// basic of the useEffect
import { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect ran!");
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// (a) Run useEffect on First Render Only (componentDidMount)
useEffect(() => {
  console.log("This runs only once after the first render.");
}, []); // Empty dependency array

// (b) Run useEffect When a State/Prop Changes (componentDidUpdate)
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]); // Runs only when `count` changes

//   (c) Run useEffect on Mount and Cleanup on Unmount (componentWillUnmount)
// Use the cleanup function inside useEffect to avoid memory leaks.
useEffect(() => {
  console.log("Component mounted");

  return () => {
    console.log("Component unmounted");
  };
}, []);

// data fetching
import { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{data ? data.title : "Loading..."}</div>;
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}

//   Scenario	useEffect Usage
//   Run on every render	useEffect(() => {...})
//   Run once on mount	useEffect(() => {...}, [])
//   Run when state/props change	useEffect(() => {...}, [state])
//   Cleanup on unmount	return () => {...} inside useEffect

// code order maters


import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Example 1: Runs on every render
  useEffect(() => {
    console.log('Component rendered or re-rendered');
  });

  // Example 2: Runs once on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // Example 3: Runs only when `count` changes
  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]);

  // Example 4: Timer with cleanup
  useEffect(() => {
    if (!showTimer) return;

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, [showTimer]);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>React useEffect Examples</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>1. Counter</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>2. Timer with Cleanup</h2>
        <p>Current Time: {time}</p>
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer ? 'Stop Timer' : 'Start Timer'}
        </button>
      </div>
    </div>
  );
}

export default App;


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 03 - useRef

// useRef is a React Hook that allows you to persist values across renders without causing re-renders. It is commonly used for:
// Accessing DOM elements (like document.getElementById)
// Persisting values across renders (without triggering re-renders)
// Storing previous values

import { useRef, useEffect } from "react";

function Example() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus input on mount
  }, []);

  return <input ref={inputRef} type="text" />;
}

// 1️⃣ Accessing DOM Elements
// You can directly reference a DOM element like an input field.

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus(); // Focus input field
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// custom hooks

// 1️⃣ useCounter Hook (Custom Counter)
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage Example
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>➕ Increment</button>
      <button onClick={decrement}>➖ Decrement</button>
      <button onClick={reset}>🔄 Reset</button>
    </div>
  );
}

// export default Counter;

// 2️⃣ Custom Hook: useFocus (Auto Focus an Input Field)
import { useRef } from "react";

function useFocus() {
  const ref = useRef(null);

  const setFocus = () => {
    if (ref.current) ref.current.focus();
  };

  return [ref, setFocus];
}

// Usage Example
function FocusInput() {
  const [inputRef, setInputFocus] = useFocus();

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={setInputFocus}>Focus Input</button>
    </div>
  );
}

// export default FocusInput;

//  3️⃣ useFetch Hook (Fetch Data from API)
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage Example
function DataFetcher() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return <h2>{data?.title}</h2>;
}

// export default DataFetcher;

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
