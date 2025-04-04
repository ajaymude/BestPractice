















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
  setUser(prevUser => ({
    ...prevUser, // Spread previous state
    age: prevUser.age + 1
  }));
};




// ❌ Forgetting Functional Updates
setCount(count + 1);
setCount(count + 1); // ❌ Won't increment twice correctly

// ✅ Correct Approach
setCount(prev => prev + 1);
setCount(prev => prev + 1); // ✅ Correctly increments by 2




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
        setCount(prevCount => prevCount + 1); // ✅ Correct approach
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
      .then(res => res.json())
      .then(data => {
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




