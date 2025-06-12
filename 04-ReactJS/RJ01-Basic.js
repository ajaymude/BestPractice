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