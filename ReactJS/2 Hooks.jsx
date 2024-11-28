// 1 useState 

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initial state is 0
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;



import React, { useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({ name: '', age: 0 });

  const updateProfile = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      name: 'John Doe',
      age: 30
    }));
  };

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;



import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Build an App']);

  const addTodo = () => {
    setTodos(prevTodos => [...prevTodos, 'New Todo']);
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default TodoList;



// If the new state depends on the old state, it's better to use a functional update form to avoid stale closures.
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1); // Using previous state to compute new state
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;



import React, { useState } from 'react';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>Toggle Visibility</button>
      {isVisible && <p>This is a toggleable text.</p>}
    </div>
  );
}

export default ToggleVisibility;


// handling the form 
import React, { useState } from 'react';

function Form() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <input 
        type="text" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        placeholder="Enter your name" 
      />
      <input 
        type="email" 
        name="email" 
        value={form.email} 
        onChange={handleChange} 
        placeholder="Enter your email" 
      />
    </div>
  );
}

export default Form;









// 2 useEffect 

import { useEffect, useState } from 'react';

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // The code that we want to run
    console.log('The count is:', count);

    // Optional return function
    return () => {
      console.log('I am being cleaned up!');
    };
  }, [count]); // The dependency array

  return (
    <div className='tutorial'>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}



import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer running...');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer); // Clean up the timer when the component is unmounted
      console.log('Timer cleared');
    };
  }, []); // Empty array means this effect runs only once

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default ExampleComponent;



