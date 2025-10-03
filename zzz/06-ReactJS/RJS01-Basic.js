// 📘 BASICS & SETUP
// 01 - What is React and why use it?
// 02 - React vs Vanilla JS vs Frameworks
// 03 - Setting up React with Vite / CRA (Create React App)
// 04 - Folder structure and entry point (index.js / main.jsx)
// 05 - JSX syntax and rules

// 🔧 COMPONENTS IN REACT
// 06 - Functional Components
// 07 - Class Components (for comparison)
// 08 - Component Naming Conventions
// 09 - Component Composition (children)
// 10 - Fragments (<> </>)

// 📦 PROPS AND STATE
// 11 - Props basics (data from parent to child)
// 12 - Default props
// 13 - Prop types validation
// 14 - useState hook – syntax, updates, patterns
// 15 - Initial state from props or external data


// 🔁 HANDLING EVENTS
// 16 - Event handlers in React
// 17 - Passing arguments to event handlers
// 18 - Handling forms and input fields
// 19 - Controlled vs Uncontrolled components
// 20 - Keyboard and mouse events

// 🎯 CONDITIONAL RENDERING
// 21 - Using if, ternary, and && in JSX
// 22 - Rendering fallback UI
// 23 - Showing/hiding elements

// 🔢 LISTS AND KEYS
// 24 - Rendering lists using .map()
// 25 - Using keys correctly
// 26 - Conditional rendering with lists
// 27 - Nested list rendering




/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// 01 - What is React and why use it?
// React is a declarative, component-based JavaScript library for building user interfaces, maintained by Meta (formerly Facebook).
// It allows developers to create reusable UI components, manage state efficiently, and render updates optimally using a virtual DOM.
// Key Benefits:
//  • Declarative Syntax: Describe what the UI should look like for each state, and React takes care of updating the DOM when data changes.
//  • Component Reusability: Break the UI into self-contained, reusable pieces, improving maintainability and collaboration.
//  • Virtual DOM: React maintains an in-memory representation of the UI, diffing it with the real DOM to minimize costly updates.
//  • One-Way Data Flow: Props pass data down the component tree, making the app’s behavior more predictable and easier to debug.
//  • Ecosystem & Community: Rich ecosystem with tools like React Router, Redux Toolkit, and extensive community support.

import React from 'react';
import ReactDOM from 'react-dom/client';

// Example: A simple counter component to demonstrate state and event handling
function Counter() {
  // useState hook manages local state within the component
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Hello, React!</h1>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Click me
      </button>
    </div>
  );
}

// Entry point: rendering the Counter component into the root DOM node
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Counter />);


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// 02 - React vs Vanilla JS vs Frameworks
// React vs Vanilla JS:
//  • Vanilla JS manipulates the DOM directly, which can become verbose and error-prone for complex UIs.
//  • React abstracts DOM updates via its virtual DOM, letting you write declarative code and avoid manual DOM diffing.

// Vanilla JS Counter Example:
const container = document.getElementById('vanilla-root');
let count2 = 0;

function updateVanilla() {
  container.innerHTML = `
    <div style="text-align:center; margin-top:2rem;">
      <h1>Hello, Vanilla JS!</h1>
      <p>You clicked ${count2} times.</p>
      <button id="vanilla-btn">Click me</button>
    </div>
  `;
  document.getElementById('vanilla-btn')
          .addEventListener('click', () => { count2++; updateVanilla(); });
}
updateVanilla();

// Framework Comparison:
//  • Angular: Full-fledged MVC framework with two-way data binding, steep learning curve, built-in DI and RxJS.
//  • Vue: Progressive framework combining template syntax with reactive data binding; easier transition from plain JS.
//  • Svelte: Compiler-based framework generating optimized vanilla JS; no virtual DOM, less boilerplate.

// Why React?:
//  • Balanced learning curve between minimalism (like Vue) and powerful ecosystem (like Angular).
//  • Rich tooling: Create React App, Next.js for SSR, community plugins.
//  • Large community & job market.

// Choose based on project needs, team expertise, and desired trade-offs between flexibility and convention.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



// 03 - Setting up React with Vite / CRA (Create React App)
// Vite Setup:
// 1. Ensure Node.js v14.18+ or v16+ is installed.
// 2. Run: npm create vite@latest my-app -- --template react
// 3. cd my-app && npm install && npm run dev
//  • Vite provides fast cold starts and instant HMR out of the box.
//  • Configuration is minimal—zero-config for most React projects.

// CRA Setup:
// 1. Ensure Node.js v14.0+ is installed.
// 2. Run: npx create-react-app my-app
// 3. cd my-app && npm start
//  • CRA scaffolds a full build setup with Webpack, Babel, ESLint, and development server.
//  • Provides "npm run build" for production bundling.

// Example: Vite project entry (src/main.jsx)
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Example: CRA project entry (src/index.js)
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// Decide on Vite for speed and simplicity, or CRA for a more batteries-included, extensible setup.

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 04: Folder Structure and Entry Point (index.js / main.jsx)
//
// A clear and consistent folder structure makes your codebase easier to navigate,
// maintain, and scale. The entry point is where React mounts your root component
// into the DOM. Two common setups are shown below: Vite (main.jsx) and Create React App (index.js).

/*=================================================
  Example 1: Vite Project Structure
=================================================*/
// project-root/
// ├── index.html         <-- HTML template
// ├── package.json
// ├── public/            <-- Static assets (favicon, robots.txt, etc.)
// ├── src/               <-- Application source code
// │   ├── main.jsx       <-- React entry point
// │   ├── App.jsx        <-- Root App component
// │   ├── components/    <-- Reusable components
// │   ├── assets/        <-- Images, fonts, etc.
// │   └── index.css      <-- Global styles
// └── vite.config.js     <-- Vite build/configuration file

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a React root and render the App component into the <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*=================================================
  Example 2: Create React App Structure
=================================================*/
// project-root/
// ├── public/
// │   └── index.html     <-- HTML template
// ├── src/
// │   ├── index.js       <-- React entry point
// │   ├── App.js         <-- Root App component
// │   ├── index.css      <-- Global styles
// │   └── ...            <-- Other source files
// └── package.json

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Render the App component into the <div id="root"> in public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 05: JSX Syntax and Rules
//
// JSX is a syntax extension for writing HTML-like code in JavaScript.
// It compiles to React.createElement calls under the hood.
// Below are the core rules and best practices:
//
// 1. Parent Wrapper: A JSX return must have one root element. Use <>…</> (Fragment) if needed.
// 2. JavaScript Expressions: Embed JS with { expression } inside JSX.
// 3. Attribute Naming: Use camelCase (className, htmlFor, onClick).
// 4. Self-Closing Tags: Tags without children must be closed (<img />, <input />).
// 5. Multiline JSX: Wrap in parentheses for readability.
// 6. Comments: Inside JSX use {/* comment */}.
// 7. Lists & Keys: When rendering arrays, each element needs a unique key prop.
//
// Example Component demonstrating all rules:
function ExampleComponent() {
  const items = ['Apple', 'Banana', 'Cherry'];
  return (
    <div className="container">
      <h1>JSX Rules</h1>
      <>
        {items.map((item, index) => (
          <p key={index}>{index + 1}. {item}</p>
        ))}
      </>
      <input type="text" placeholder="Enter text" />
      <img src="/logo.png" alt="Logo" />
    </div>
  );
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 06: Functional Components
//
// Functional components are JavaScript functions that return JSX.
// They are the modern standard for writing React components, replacing
// many use cases of class components. They can utilize React hooks
// for state and lifecycle management.
//
// Core Rules & Best Practices:
// 1. Declaration:
//    - Function Declaration: function MyComponent(props) { … }
//    - Arrow Function:    const MyComponent = (props) => { … }
// 2. Props:
//    - Props are passed as a single object argument.
//    - Use destructuring for clarity: ({ title, items })
// 3. Hooks:
//    - useState for local state: const [count, setCount] = useState(0);
//    - useEffect for side effects: useEffect(() => { … }, [dependencies]);
// 4. Return Value:
//    - Must return valid JSX or null.
//    - Can return a Fragment (<>...</>) to group elements without extra DOM nodes.
// 5. Naming:
//    - Component names must start with a capital letter.
//
// Example: Counter Component
import React, { useState, useEffect } from 'react';

const Counter = ({ start = 0 }) => {
  // useState hook to manage counter value
  const [count, setCount] = useState(start);

  // useEffect hook to log when count changes
  useEffect(() => {
    console.log(`Count updated to ${count}`);
  }, [count]);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Counter;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 07: Class Components (for comparison)
//
// Class components extend React.Component and provide built-in support
// for state and lifecycle methods. They were the primary way to handle
// state and side effects before hooks were introduced.
//
// Core Rules & Syntax:
// 1. Declaration: class MyComponent extends React.Component {
//    constructor(props) { super(props); this.state = { ... } }
// 2. State:
//    - Initialized in constructor: this.state = { count: 0 }
//    - Updated via this.setState({ key: value })
// 3. Props:
//    - Accessed via this.props
// 4. Lifecycle Methods:
//    - componentDidMount(): called after initial render
//    - componentDidUpdate(prevProps, prevState): called after updates
//    - componentWillUnmount(): cleanup before removal
// 5. Render Method:
//    - Must define render() returning JSX
// 6. Binding:
//    - Event handlers either bound in constructor or defined as class fields
//
// Example: Counter Class Component
import React from 'react';

class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = { count: props.start || 0 };
    // Bind event handlers
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    console.log(`Mounted with count = ${this.state.count}`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log(`Count changed to ${this.state.count}`);
    }
  }

  componentWillUnmount() {
    console.log('CounterClass will unmount');
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div className="counter-class">
        <h2>Class Counter: {this.state.count}</h2>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default CounterClass;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 08: Component Naming Conventions
//
// Consistent naming helps readability and maintainability. React has community conventions:
//
// 1. Component Names:
//    - Use PascalCase for component names (e.g., MyButton, UserProfile).
//    - Always start with a capital letter. React treats lowercase names as HTML tags.
//
// 2. File Names:
//    - Match the component name: MyButton.jsx, UserProfile.jsx.
//    - For related files, use index.js in the folder: /components/MyButton/index.jsx.
//
// 3. Folder Structure:
//    - One component per folder when it has multiple related files (styles, tests):
//      components/
//      └── MyButton/
//          ├── MyButton.jsx
//          ├── MyButton.css
//          └── MyButton.test.jsx
//    - Simple components can live directly in components/: MyButton.jsx.
//
// 4. Props Naming:
//    - Descriptive and camelCase: onClick, isActive, userName.
//    - Boolean props prefixed with is/has: isVisible, hasError.
//
// 5. Event Handlers:
//    - Prefix with handle or on: handleSubmit, onChange.
//    - Pass as props named onSomething: onSubmit={() => ...}.
//
// 6. Hooks Naming:
//    - Custom hooks must start with use: useFetch, useAuth.
//
// Example:
import React from 'react';

// File: components/AlertMessage/AlertMessage.jsx
const AlertMessage = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AlertMessage;

// Usage:
// import AlertMessage from './components/AlertMessage/AlertMessage';
// <AlertMessage message="Data saved!" type="success" onClose={handleClose} />

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 09: Component Composition (children)
//
// Composition is a core React pattern: you build complex UIs by nesting
// components and passing children. Every component receives a special prop
// called children representing its inner content.
//
// 1. children Prop:
//    - Implicit prop containing nested elements: <MyComp>…</MyComp>
//    - Always accessed via props.children or destructured: ({ children }).
//
// 2. Multiple Slots (Named Children):
//    - Pass additional render props or specific named props for multiple areas.
//    - E.g., <Modal header={…} footer={…}>body</Modal>.
//
// 3. Fragments:
//    - Use <>…</> to group children without extra DOM nodes.
//
// 4. Avoid Over-Drilling:
//    - Use composition over prop drilling; wrap and pass children instead of deep props.
//
// Example: Panel and Modal
import React from 'react';

// Basic Panel using children
const Panel = ({ title, children }) => {
  return (
    <div className="panel border p-4 rounded">
      <h2 className="panel-title mb-2">{title}</h2>
      <div className="panel-content">{children}</div>
    </div>
  );
};

// Usage of Panel
// <Panel title="User Info">
//   <p>Name: Alice</p>
//   <p>Role: Admin</p>
// </Panel>

// Advanced Modal with named props
const Modal = ({ header, footer, children }) => (
  <div className="modal-backdrop fixed inset-0 flex items-center justify-center">
    <div className="modal bg-white p-6 rounded shadow-lg">
      <div className="modal-header mb-4">{header}</div>
      <div className="modal-body mb-4">{children}</div>
      <div className="modal-footer">{footer}</div>
    </div>
  </div>
);

// Usage of Modal
// <Modal
//   header={<h3>Confirm Delete</h3>}
//   footer={<button onClick={onClose}>Close</button>}
// >
//   <p>Are you sure you want to delete this item?</p>
// </Modal>

export { Panel, Modal };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 10: Fragments (<> </>)
//
// React Fragments let you group a list of children without adding extra nodes
// to the DOM. They are useful when a component must return multiple elements
// but you don’t want an additional wrapper element.
//
// 1. Shorthand Syntax:
//    <> … </>
//    - Cannot accept keys or attributes.
//
// 2. Full Syntax:
//    <React.Fragment> … </React.Fragment>
//    - Allows key attribute for lists.
//
// 3. Use Cases:
//    - Returning multiple siblings from a component.
//    - Mapping arrays where you don’t want extra wrappers.
//
// Example 1: Basic Fragment
const ListItems = () => {
  const fruits = ['Apple', 'Banana', 'Cherry'];
  return (
    <>  
      {fruits.map((fruit, idx) => (
        <li key={idx}>{fruit}</li>
      ))}
    </>
  );
};

// Usage:
// <ul>
//   <ListItems />
// </ul>

// Example 2: Using React.Fragment with key
import React from 'react';

const Columns = ({ rows }) => (
  <table>
    <tbody>
      {rows.map((row, idx) => (
        <React.Fragment key={idx}>
          <td>{row.first}</td>
          <td>{row.second}</td>
        </React.Fragment>
      ))}
    </tbody>
  </table>
);

export { ListItems, Columns };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 11: Props Basics (data from parent to child)
//
// Props (short for properties) are how parent components pass data
// and callbacks down to child components. They are read-only and
// enable component reusability and configuration.
//
// Core Concepts:
// 1. Passing Props:
//    - Add attributes to component usage: <Child name="Alice" />
//    - Any JavaScript expression can be passed in braces: <Child count={3 + 2} />
//
// 2. Receiving Props:
//    - Props object is the first function argument: function Child(props)
//    - Destructure for clarity: ({ name, count })
//
// 3. Default Props:
//    - Provide defaults via function signature: const Child = ({ name = 'Guest' })
//    - Or use default parameters in function declaration.
//
// 4. Prop Types (Optional):
//    - For type-checking, install prop-types and define: Child.propTypes = { name: PropTypes.string }
//
// 5. Immutability:
//    - Props should never be modified inside the child—they are read-only.
//
// Example: Parent and Child Components
import React from 'react';

// Child component receives data via props
const Child = ({ name, score = 0, onPlay }) => {
  return (
    <div className="child-card">
      <h3>Player: {name}</h3>
      <p>Score: {score}</p>
      <button onClick={() => onPlay(name)}>Play</button>
    </div>
  );
};

// Parent component passes data and a callback to Child
const Parent = () => {
  const handlePlay = (playerName) => {
    console.log(`${playerName} clicked Play`);
  };
  return (
    <div className="parent-container">
      <Child name="Alice" score={5} onPlay={handlePlay} />
      <Child name="Bob" onPlay={handlePlay} /> {/* score uses default */}
    </div>
  );
};

export { Parent, Child };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 12: Default Props
//
// Default props let you specify fallback values for props when none are passed.
// This ensures your component has valid data and reduces need for undefined checks.
//
// 1. Functional Components:
//    - Use ES6 default parameters in the function signature.
//
//    Example:
const Greeting = ({ name = 'Guest' }) => {
  return <p>Hello, {name}!</p>;
};

// 2. Class Components:
//    - Define a static defaultProps property on the class.
//
//    Example:
import React from 'react';

class Welcome extends React.Component {
  render() {
    const { name } = this.props;
    return <h1>Welcome, {name}!</h1>;
  }
}

Welcome.defaultProps = {
  name: 'Guest',
};

// 3. Why Use Default Props:
//    - Simplifies components by avoiding manual undefined checks.
//    - Documents expected props with sensible fallbacks.
//
// 4. Notes:
//    - In TypeScript, you can also mark props optional and combine with default values.
//    - defaultProps is ignored for function components when using React.FC type.

// Usage Examples:
// <Greeting />             // Renders: Hello, Guest!
// <Greeting name="Alice" /> // Renders: Hello, Alice!
// <Welcome />              // Renders: Welcome, Guest!
// <Welcome name="Bob" />    // Renders: Welcome, Bob!

export { Greeting, Welcome };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 13: Prop Types Validation
//
// PropTypes provide runtime type checking for React props and help catch
// bugs by validating data passed to components. To use, install the
// 'prop-types' package: npm install prop-types
//
// 1. Importing PropTypes:
import PropTypes from 'prop-types';

// 2. Defining propTypes:
//    - Basic types: string, number, bool, func, object, array, node, element
//    - .isRequired to enforce presence
//    - Complex: arrayOf, objectOf, shape, oneOf, oneOfType, instanceOf

const UserCard = ({ user, onSelect, tags }) => {
  return (
    <div className="user-card" onClick={() => onSelect(user.id)}>
      <h2>{user.name}</h2>
      <p>ID: {user.id}</p>
      <ul>
        {tags.map((tag, idx) => (
          <li key={idx}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

// 3. Attaching propTypes to the component:
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,                // optional callback
  tags: PropTypes.arrayOf(PropTypes.string), // array of strings
};

// 4. Default props to provide fallbacks for non-required props:
UserCard.defaultProps = {
  onSelect: () => {},
  tags: [],
};

export default UserCard;

// 5. Custom validator example:
// MyComponent.propTypes = {
//   customProp: (props, propName, componentName) => {
//     if (!/^[A-Z]/.test(props[propName])) {
//       return new Error(
//         `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must start with a capital letter.`
//       );
//     }
//   }
// };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 14: useState Hook – Syntax, Updates, Patterns
//
// The useState hook lets you add state to functional components.
// Syntax:
//   const [state, setState] = useState(initialValue);
//
// 1. Initial State:
//    - Can be any type: primitive, object, array.
//    - Lazy initialization: pass a function that returns the initial value.
//      e.g., const [value, setValue] = useState(() => computeExpensiveValue());
//
// 2. Updating State:
//    - setState(newState) replaces the state.
//    - For updates based on previous state, use functional update:
//      setState(prev => /* derive new state from prev */);
//    - When state is an object, merge manually:
//      setState(prev => ({ ...prev, key: updatedValue }));
//
// 3. Patterns & Best Practices:
//    - Use multiple useState calls for independent state slices:
//      const [count, setCount] = useState(0);
//      const [text, setText] = useState('');
//    - Group related fields into one object or keep separate based on update frequency.
//    - Resetting state: call setState(initialValue) when needed.
//    - Avoid mutating state directly; always return new objects/arrays.
//
// 4. Common Pitfalls:
//    - Forgetting functional updates when new state depends on old state.
//    - Mutating objects/arrays instead of creating new instances.
//
// Example Component: Counter & Form
import React, { useState } from 'react';

const FormWithCounter = () => {
  // Independent state slices
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({ name: '', email: '' });

  // Lazy initialization of items from localStorage
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('items') || '[]');
  });

  // Counter update using functional updates
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  // Form field update merging previous state
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Counter: {count}</h2>
      <button onClick={decrement} className="mr-2">-</button>
      <button onClick={increment}>+</button>
      <hr className="my-4" />
      <form>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-1 mb-2 block"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-1 block"
        />
      </form>
      {/* Render lazy-initialized items */}
      <ul className="mt-4">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormWithCounter;
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 15: Initial State from Props or External Data
//
// Often you need to initialize component state based on props or data fetched
// externally (API, localStorage). Best practices ensure state remains in sync
// and avoid unnecessary re-renders.
//
// 1. Initializing from Props:
//    - You can use props directly in useState’s initial value, but changes to props
//      won’t update state automatically after mount.
//    - For one-time initialization:
//        const [value, setValue] = useState(props.initialValue);
//    - To respond to prop changes, use useEffect:
//        useEffect(() => { setValue(props.initialValue); }, [props.initialValue]);
//
// 2. Lazy Initialization:
//    - Pass a function to useState to defer expensive calculations until first render:
//        const [items, setItems] = useState(() => fetchStoredItems());
//
// 3. Fetching External Data on Mount:
//    - Initialize with a placeholder (null, empty array, loading flag).
//    - Use useEffect to fetch and then set state:
//        useEffect(() => {
//          let isMounted = true;
//          fetch('/api/data')
//            .then(res => res.json())
//            .then(data => { if (isMounted) setData(data); });
//          return () => { isMounted = false; };
//        }, []);
//
// 4. Avoiding Stale Props:
//    - Don’t read props inside event handlers if you need the latest value—use state or refs.
//
// Example: Component with prop-based and fetched initial state
import React, { useState, useEffect } from 'react';

const DataDisplay = ({ initialCount }) => {
  // One-time from props
  const [count, setCount] = useState(initialCount);

  // Sync when prop changes
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  // Lazy init from localStorage
  const [savedItems, setSavedItems] = useState(() => {
    return JSON.parse(localStorage.getItem('items') || '[]');
  });

  // External fetch on mount
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    fetch('/api/data')
      .then(res => res.json())
      .then(json => { if (mounted) setData(json); });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>

      <h3>Saved Items:</h3>
      <ul>{savedItems.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3>Fetched Data:</h3>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default DataDisplay;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Topic 16: Event Handlers in React
//
// In React, handling events is similar to DOM events but with some syntactic differences:
//
// 1. CamelCase Syntax:
//    - Use camelCase for event handlers: onClick, onChange, onSubmit, etc.
//
// 2. Passing Functions:
//    - Pass a function reference or arrow function: <button onClick={handleClick}>Click</button>
//    - Avoid calling the function: onClick={handleClick()} triggers immediately.
//
// 3. Event Object:
//    - React wraps native events in SyntheticEvent for cross-browser compatibility.
//    - Access event properties: (e) => console.log(e.target.value).
//
// 4. Prevent Default Behavior:
//    - Use e.preventDefault() in handlers for forms, links:
//        const handleSubmit = e => { e.preventDefault(); ... };
//
// 5. Passing Arguments:
//    - Use arrow functions or bind: onClick={() => handleDelete(id)} or onClick={handleDelete.bind(null, id)}.
//
// 6. Common Patterns:
//    - Form inputs: onChange updates state: <input value={text} onChange={e => setText(e.target.value)} />
//    - Keyboard events: onKeyDown, onKeyPress, onKeyUp.
//    - Focus events: onFocus, onBlur.
//
// Example Component demonstrating various handlers:
import React, { useState } from 'react';

const EventDemo = () => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form submitted with:', text);
  };

  const handleClick = () => {
    alert('Button clicked!');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="event-demo p-4">
      <button onClick={handleClick} className="mb-4">Trigger Alert</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          className="border p-2 mr-2"
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="mt-2">You submitted: {text}</p>}
    </div>
  );
};

export default EventDemo;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

import React, { useState, Component } from 'react';

// Topic 16: Event Handlers in React
//
// In React, handling events is similar to DOM events but with some syntactic differences:
//
// 1. CamelCase Syntax:
//    - Use camelCase for event handlers: onClick, onChange, onSubmit, etc.
//
// 2. Passing Functions:
//    - Pass a function reference or arrow function: <button onClick={handleClick}>Click</button>
//    - Avoid calling the function: onClick={handleClick()} triggers immediately.
//
// 3. Event Object:
//    - React wraps native events in SyntheticEvent for cross-browser compatibility.
//    - Access event properties: (e) => console.log(e.target.value).
//
// 4. Prevent Default Behavior:
//    - Use e.preventDefault() in handlers for forms, links:
//        const handleSubmit = e => { e.preventDefault(); ... };
//
// 5. Passing Arguments:
//    - Use arrow functions or bind: onClick={() => handleDelete(id)} or onClick={handleDelete.bind(null, id)}.
//
// 6. Common Patterns:
//    - Form inputs: onChange updates state: <input value={text} onChange={e => setText(e.target.value)} />
//    - Keyboard events: onKeyDown, onKeyPress, onKeyUp.
//    - Focus events: onFocus, onBlur.
//
// Example Component demonstrating various handlers:

const EventDemo = () => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form submitted with:', text);
  };

  const handleClick = () => {
    alert('Button clicked!');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="event-demo p-4">
      <button onClick={handleClick} className="mb-4">Trigger Alert</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          className="border p-2 mr-2"
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="mt-2">You submitted: {text}</p>}
    </div>
  );
};

export default EventDemo;

// Topic 17: Passing Arguments to Event Handlers
//
// Often you need to provide extra data (e.g., an id or index) when an event fires.
// There are multiple patterns:
//
// 1. Arrow Function in JSX:
//    <button onClick={() => handleClick(id)}>Click me</button>
//    - Pros: simple, inline; Cons: creates a new function on every render.
//
// 2. Function.prototype.bind:
//    <button onClick={handleClick.bind(null, id)}>Click me</button>
//    - Pros: explicit binding; Cons: also creates new bound function per render.
//
// 3. Pre-Binding in Constructor (Class Components):
//    constructor(props) {
//      super(props);
//      this.handleClick = this.handleClick.bind(this);
//    }
//    render() {
//      return <button onClick={e => this.handleClick(id, e)}>Click me</button>;
//    }
//    handleClick(id, event) { ... }
//
// 4. Passing Event as Second Argument:
//    const handleClick = (id, event) => { console.log(id, event.target); };
//    <button onClick={e => handleClick(id, e)}>Click me</button>
//
// 5. Extract into Child Component:
//    // ChildButton.jsx
//    const ChildButton = ({ id, onSelect }) => (
//      <button onClick={() => onSelect(id)}>Select</button>
//    );
//    // Parent.jsx
//    <ChildButton id={42} onSelect={handleSelect} />
//
// Functional Component Example:

const ItemList = ({ items, onSelect }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <button onClick={() => onSelect(item.id)}>
          Select {item.name}
        </button>
      </li>
    ))}
  </ul>
);

// Class Component Example:

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(taskId, event) {
    console.log(`Completing task ${taskId}`);
  }

  render() {
    return (
      <ul>
        {this.props.tasks.map(task => (
          <li key={task.id}>
            <button onClick={e => this.handleComplete(task.id, e)}>
              Complete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export { ItemList, TaskList };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



// Topic 18: Handling Forms and Input Fields
//
// React forms are typically handled via controlled components,
// where form input values are tied to component state.
// Alternatively, uncontrolled components can use refs for direct DOM access.
//
// 1. Controlled Components:
//    - Input value set by state and updated via onChange.
//    - Ensures React has full control over form data.
//
// 2. Uncontrolled Components:
//    - Use ref to access DOM element value when needed.
//    - Easier setup but less React-driven control.
//
// 3. Handling Multiple Inputs:
//    - Use a single state object and update by field name: setForm(prev => ({ ...prev, [name]: value }));
//
// 4. Form Submission:
//    - Prevent default on submit and process state data.
//
// Example: Controlled LoginForm
const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Login data:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-2">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="border p-1 ml-2"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="border p-1 ml-2"
        />
      </div>
      <button type="submit" className="mt-2">Login</button>
      {submitted && <p className="mt-2">Submitted: {JSON.stringify(form)}</p>}
    </form>
  );
};

// Example: Uncontrolled SearchForm
const SearchForm = () => {
  const inputRef = useRef(null);
  const handleSearch = e => {
    e.preventDefault();
    alert(`Searching for: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSearch} className="p-4 border rounded mt-4">
      <input ref={inputRef} placeholder="Search..." className="border p-1 mr-2" />
      <button type="submit">Search</button>
    </form>
  );
};

export { LoginForm, SearchForm };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 19: Controlled vs Uncontrolled Components
//
// Controlled components:
// - Form elements (input, textarea, select) whose value is driven by React state.
// - React is the single source of truth: you update state on every change.
// - Enables instant validation, conditional disabling, formatting, and more.
//
// Uncontrolled components:
// - Form elements that maintain their own internal state.
// - Access values via refs when needed (e.g., on submit).
// - Simpler to set up for quick forms, but less control and validation.
//
// Key Differences:
// 1. Data Flow:
//    Controlled: value from state → UI
//    Uncontrolled: UI manages its own value → state on demand
// 2. Validation & Side Effects:
//    Controlled: easy to validate on every keystroke
//    Uncontrolled: validate after reading the ref
// 3. Performance:
//    Controlled: re-renders on each keystroke
//    Uncontrolled: less re-renders, but harder to synchronize
// 4. Use Cases:
//    Controlled: complex forms, real-time feedback, dynamic disabling
//    Uncontrolled: simple one-off forms, file uploads, third-party libraries
//
import React, { useState, useRef } from 'react';

// ControlledExample: state drives the input value
const ControlledExample = () => {
  const [text, setText] = useState('');

  // onChange updates React state
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // onSubmit can access current state
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Controlled submit:', text);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Controlled:
        <input
          type="text"
          value={text}            // value from state
          onChange={handleChange} // update state
          placeholder="Type here"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

// UncontrolledExample: DOM input holds its own value
const UncontrolledExample = () => {
  const inputRef = useRef(null);

  // onSubmit reads from the DOM via ref
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uncontrolled submit:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Uncontrolled:
        <input
          type="text"
          defaultValue=""       // initial value only
          ref={inputRef}          // ref to access later
          placeholder="Type here"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export { ControlledExample, UncontrolledExample };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Topic 19: Controlled vs Uncontrolled Components
//
// Controlled components:
// - Form elements (input, textarea, select) whose value is driven by React state.
// - React is the single source of truth: you update state on every change.
// - Enables instant validation, conditional disabling, formatting, and more.
//
// Uncontrolled components:
// - Form elements that maintain their own internal state.
// - Access values via refs when needed (e.g., on submit).
// - Simpler to set up for quick forms, but less control and validation.
//
// Key Differences:
// 1. Data Flow:
//    Controlled: value from state → UI
//    Uncontrolled: UI manages its own value → state on demand
// 2. Validation & Side Effects:
//    Controlled: easy to validate on every keystroke
//    Uncontrolled: validate after reading the ref
// 3. Performance:
//    Controlled: re-renders on each keystroke
//    Uncontrolled: less re-renders, but harder to synchronize
// 4. Use Cases:
//    Controlled: complex forms, real-time feedback, dynamic disabling
//    Uncontrolled: simple one-off forms, file uploads, third-party libraries
//
import React, { useState, useRef } from 'react';

// ControlledExample: state drives the input value
const ControlledExample = () => {
    const [text, setText] = useState('');
    
    // onChange updates React state
    const handleChange = (e) => {
        setText(e.target.value);
    };
    
    // onSubmit can access current state
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Controlled submit:', text);
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Controlled:
        <input
          type="text"
          value={text}            // value from state
          onChange={handleChange} // update state
          placeholder="Type here"
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

// UncontrolledExample: DOM input holds its own value
const UncontrolledExample = () => {
    const inputRef = useRef(null);
    
    // onSubmit reads from the DOM via ref
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Uncontrolled submit:', inputRef.current.value);
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <label>
        Uncontrolled:
        <input
          type="text"
          defaultValue=""       // initial value only
          ref={inputRef}          // ref to access later
          placeholder="Type here"
          />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 20: Keyboard and Mouse Events
//
// Keyboard events:
// - onKeyDown, onKeyUp, onKeyPress (deprecated), triggering on key interactions.
// - Useful for shortcuts, form navigation, and accessibility.
//
// Mouse events:
// - onClick, onDoubleClick, onContextMenu (right-click),
//   onMouseEnter, onMouseLeave, onMouseMove, onMouseOver, onMouseOut.
// - Enable rich interactions like tooltips, drag-and-drop, and custom cursors.
//
const KeyboardMouseDemo = () => {
  const [keyEvent, setKeyEvent] = useState('None');
  const [mouseEvent, setMouseEvent] = useState('None');

  // Keyboard handler updates state with key and type
  const handleKeyDown = (e) => {
    setKeyEvent(`KeyDown: ${e.key}`);
  };

  // Mouse handlers update state with event name
  const handleMouseEnter = () => setMouseEvent('Mouse Entered Box');
  const handleMouseLeave = () => setMouseEvent('Mouse Left Box');
  const handleClick = () => setMouseEvent('Box Clicked');

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p>Keyboard Event: {keyEvent}</p>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Press any key"
          style={{ padding: '0.5rem', width: '100%' }}
        />
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ padding: '2rem', background: '#f9f9f9', textAlign: 'center' }}
      >
        Hover or Click Inside This Box
      </div>
      <p style={{ marginTop: '1rem' }}>Mouse Event: {mouseEvent}</p>
    </div>
  );
};

export { ControlledExample, UncontrolledExample, KeyboardMouseDemo };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 21: Using if, ternary, and && in JSX
//
// Conditional rendering in React lets you display content based on state or props.
// Here are three common patterns:
//
// 1. if Statement Outside JSX:
//    - Use standard JavaScript to choose which element(s) to render before returning JSX.
//
// 2. Ternary Operator Inline:
//    - Quick if-else expressions directly inside JSX: condition ? expr1 : expr2.
//
// 3. Logical && Operator:
//    - Render an element only when a condition is true (no else case): condition && expr.
//
import React, { useState } from 'react';

const ConditionalRendering = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. if statement outside JSX
  let greetingMessage;
  if (isLoggedIn) {
    greetingMessage = <h2>Welcome back, user!</h2>;
  } else {
    greetingMessage = <h2>Please sign in to continue.</h2>;
  }

  // Toggle login state handler
  const toggleLogin = () => setIsLoggedIn(prev => !prev);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd' }}>
      {/* Render greeting chosen by if-statement */}
      {greetingMessage}

      {/* 2. Ternary operator inline */}
      {isLoggedIn
        ? <button onClick={toggleLogin}>Logout</button>
        : <button onClick={toggleLogin}>Login</button>
      }

      {/* 3. Logical && operator */}
      {isLoggedIn && (
        <p>You are logged in. Enjoy your stay!</p>
      )}

      {/* Rendering alternative text when not logged in using ! and && */}
      {!isLoggedIn && (
        <p>Access restricted. Please log in to view more features.</p>
      )}
    </div>
  );
};

export default ConditionalRendering;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 22: Rendering Fallback UI
//
// Fallback UI provides temporary content while main content is loading or has errored.
// Common techniques:
// 1. Conditional Rendering: use state to render loading/error placeholders.
// 2. React.Suspense: show fallback for lazy-loaded components or data.
// 3. Error Boundaries: catch rendering errors and display fallback UI.
//
import React, { useState, useEffect, Suspense } from 'react';

// Example 1: Conditional Rendering Fallback
const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(json => {
        setData(json);
        setStatus('success');
      })
      .catch(err => {
        setError(err);
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return <div>Loading data...</div>; // fallback while loading
  }
  if (status === 'error') {
    return <div>Error: {error.message}</div>; // fallback on error
  }
  return <div>Data loaded: {JSON.stringify(data)}</div>; // main UI
};

// Example 2: Suspense Fallback for code-splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading component...</div>}>
    <HeavyComponent />
  </Suspense>
);

// Example 3: Error Boundary Fallback
import PropTypes from 'prop-types';
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>; // fallback UI on render error
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = { children: PropTypes.node };

// Comments:
// - Fallbacks improve UX by signaling status.
// - Use conditional logic for data/UI state.
// - Leverage Suspense for code/data with React concurrent features.
// - Wrap top-level components in ErrorBoundary to catch crashes.

export { DataFetcher, SuspenseWrapper, ErrorBoundary };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 23: Showing/Hiding Elements
//
// Showing and hiding elements in React is typically achieved through conditional
// rendering or dynamic class manipulation. Key patterns include:
//
// 1. Conditional Rendering:
//    - Use state to determine whether a component or element should be rendered.
//      e.g., {isVisible && <Element />} or isVisible ? <Element /> : null
// 2. CSS Class Toggling:
//    - Always render the element but apply CSS classes that hide/show it
//      e.g., <div className={isVisible ? 'visible' : 'hidden'}>
// 3. Animation Considerations:
//    - For smooth transitions, combine CSS transitions with class toggling.
//
import React, { useState } from 'react';

// Example 1: Conditional Rendering with &&
const ToggleMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(prev => !prev);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd' }}>
      <button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      {/* Element only rendered when isVisible is true */}
      {isVisible && <p style={{ marginTop: '1rem' }}>Hello! I am now visible.</p>}
    </div>
  );
};

// Example 2: Ternary Rendering
const ToggleContent = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      {/* Renders one of two elements */}
      {show
        ? <div>This content is shown.</div>
        : <div>This content is hidden.</div>
      }
      <button onClick={() => setShow(prev => !prev)}>
        {show ? 'Hide Content' : 'Show Content'}
      </button>
    </div>
  );
};

// Example 3: CSS Class Toggling
// Assume CSS: .hidden { display: none; } .visible { display: block; }
const ClassToggle = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div className={visible ? 'visible' : 'hidden'}>
        This block is {visible ? 'visible' : 'hidden'} via CSS class.
      </div>
      <button onClick={() => setVisible(prev => !prev)}>
        Toggle Block
      </button>
    </div>
  );
};

// Notes:
// - Conditional rendering removes/adds elements from the DOM, useful for heavy content.
// - CSS toggling keeps elements in the DOM, allowing for transitions.
// - For animations, consider libraries like react-transition-group.

export { ToggleMessage, ToggleContent, ClassToggle };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 24: Rendering Lists Using .map()
//
// In React, rendering multiple similar elements from an array is commonly done
// with the Array.prototype.map() method. Key patterns and rules include:
//
// 1. Using .map():
//    - Transform each item into a JSX element: items.map(item => <Component />)
// 2. Unique Key Prop:
//    - Each element must have a stable, unique key to help React track changes.
//      Keys should come from item IDs instead of indices when possible.
// 3. Avoid Inline Index as Key:
//    - Using index can lead to UI bugs when items reorder or insert/delete.
// 4. Rendering Nested Lists:
//    - Use separate .map() calls or compose components for clarity.
//
import React from 'react';

// Example 1: Simple List Rendering
const NumberList = ({ numbers }) => {
  return (
    <ul>
      {numbers.map((num) => (
        <li key={num}>{num}</li> // using value as key since values are unique
      ))}
    </ul>
  );
};

// Example 2: Rendering Objects with IDs
const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} style={{ marginBottom: '0.5rem' }}>
          <input type="checkbox" checked={todo.completed} readOnly />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
};

// Example 3: Nested List Rendering
const CategoryList = ({ categories }) => {
  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: '1rem' }}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Notes:
// - Always include a key prop; helps with efficient re-renders and preserving state.
// - Prefer stable IDs (UUIDs, database keys) over array indices.
// - Break out list items into separate components for complex rendering.
// - Handle empty arrays gracefully by rendering fallback UI or messages.

export { NumberList, TodoList, CategoryList };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Topic 25: Using Keys Correctly
//
// Keys help React identify which items have changed, been added, or removed.
// Proper key usage ensures UI consistency and optimal rendering.
//
// Best Practices:
// 1. Unique & Stable:
//    - Use unique IDs from data (e.g., database primary keys, UUIDs).
//    - Avoid using array indices, especially if list order can change.
//
// 2. Consistency Across Renders:
//    - The key for a given item must remain the same between renders.
//
// 3. Avoid Collisions:
//    - Ensure keys are unique among siblings within the same list.
//
// 4. Not for Identification Inside Handler Logic:
//    - Keys are for React’s internal use; don’t rely on them in your component logic.
//
import React from 'react';

// Example: Incorrect—using index as key
const IncorrectList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

// Example: Correct—using stable unique IDs
const CorrectList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// Example: Nested Lists with Proper Keys
const NestedList = ({ categories }) => {
  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.items.map((sub) => (
              <li key={sub.id}>{sub.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Notes:
// - If items lack unique IDs, generate them once (e.g., on fetch) and persist.
// - For components reordering or filtering, stable keys prevent unwanted remounts.
// - In keyed animations (e.g., React Transition Group), consistent keys drive proper enter/exit.

export { IncorrectList, CorrectList, NestedList };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 25: Using Keys Correctly
//
// Keys help React identify which items have changed, been added, or removed.
// Proper key usage ensures UI consistency and optimal rendering.
//
// Best Practices:
// 1. Unique & Stable:
//    - Use unique IDs from data (e.g., database primary keys, UUIDs).
//    - Avoid using array indices, especially if list order can change.
//
// 2. Consistency Across Renders:
//    - The key for a given item must remain the same between renders.
//
// 3. Avoid Collisions:
//    - Ensure keys are unique among siblings within the same list.
//
// 4. Not for Identification Inside Handler Logic:
//    - Keys are for React’s internal use; don’t rely on them in your component logic.
//
import React from 'react';

// Example: Incorrect—using index as key
const IncorrectList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

// Example: Correct—using stable unique IDs
const CorrectList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// Example: Nested Lists with Proper Keys
const NestedList = ({ categories }) => {
  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.id}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.items.map((sub) => (
              <li key={sub.id}>{sub.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Topic 26: Conditional Rendering with Lists
//
// When rendering lists, you often need to conditionally display items based
// on a filter or state. Combine .filter() with .map() or inline conditions.
//
// Patterns & Best Practices:
// 1. Filter Before Mapping:
//    - Filter array first, then map: items.filter(cond).map(item => <... key={item.id} />)
//    - Keeps mapping logic clean and keys intact.
//
// 2. Inline Conditional in map():
//    - Use ternary or && inside map to include/exclude elements, but ensure keys stay consistent.
//
// 3. Combining filter & map in one chain:
//    - arr.filter(...).map(...)
//
// 4. Avoid Rendering null Without Key:
//    - If using inline &&, return null for excluded items and ensure keys are on the outer element.
//
import { useState } from 'react';

// Example: Filter then map
const FilteredList = ({ items }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  // Toggle filter state
  const toggle = () => setShowCompleted(prev => !prev);

  // Filter items based on completion flag
  const visibleItems = items.filter(item => showCompleted || !item.completed);

  return (
    <div>
      <button onClick={toggle}>
        {showCompleted ? 'Hide' : 'Show'} Completed
      </button>
      <ul>
        {visibleItems.map(item => (
          <li key={item.id}>
            {item.text} {item.completed && '(Completed)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example: Inline conditional in map
const InlineConditionalList = ({ items }) => (
  <ul>
    {items.map(item => (
      item.visible ? (
        <li key={item.id}>{item.name}</li>
      ) : null
    ))}
  </ul>
);

// Notes:
// - Filtering before mapping is clearer and preserves keys naturally.
// - Inline conditionals work but may lead to sparse arrays—ensure proper keys.
// - For complex conditions, compute the list in a variable before return.

export { IncorrectList, CorrectList, NestedList, FilteredList, InlineConditionalList };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


// Topic 27: Nested List Rendering
//
// When data contains hierarchies (e.g., categories with subcategories),
// you need to render lists recursively. Key considerations:
//
// 1. Recursive Components:
//    - Create a component that calls itself for children arrays.
//
// 2. Stable Keys at Every Level:
//    - Each item in each nested list needs a unique key.
//
// 3. Guard Against Missing Children:
//    - Check for arrays before mapping to avoid runtime errors.
//
// 4. Performance:
//    - For very deep trees, consider virtualization or limiting depth.
//
import React from 'react';

// Example hierarchical data:
// const data = [
//   { id: 1, name: 'Fruit', children: [
//       { id: 2, name: 'Citrus', children: [
//           { id: 3, name: 'Orange' },
//           { id: 4, name: 'Lemon' }
//         ]
//       },
//       { id: 5, name: 'Berries', children: [
//           { id: 6, name: 'Strawberry' },
//           { id: 7, name: 'Blueberry' }
//         ]
//       }
//     ]
//   },
//   { id: 8, name: 'Vegetables' }
// ];

// Recursive component to render nested lists
const NestedList = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;  // nothing to render
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* Render children if present */}
          {item.children && (
            <NestedList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

// Usage in a parent component:
// <NestedList items={data} />

// Notes:
// - Recursion keeps code DRY for arbitrary depth.
// - Ensure each nested array uses the same component and passes its children.
// - For custom styling per level, pass a level prop and adjust indent/prefix.
// - To flatten or transform, preprocess data before rendering.

export default NestedList;

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