















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
  

















