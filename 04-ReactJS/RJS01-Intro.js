// ✅ React.js Full Syllabus (Beginner to Expert)

// 📘 BASICS & SETUP
// 01 - What is React and why use it?
// 02 - React vs Vanilla JS vs Frameworks
// 03 - Setting up React with Vite / CRA (Create React App)
// 04 - Folder structure and entry point (index.js/main.jsx)
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

// 🔄 HOOKS (FUNDAMENTALS)
// 28 - useState
// 29 - useEffect
// 30 - useRef
// 31 - useContext
// 32 - Custom Hooks
// 33 - Rules of Hooks

// 🧠 COMPONENT LIFECYCLE
// 34 - Lifecycle phases
// 35 - Replacing lifecycle methods with Hooks
// 36 - Cleanup functions in useEffect

// 🌐 REACT ROUTER
// 37 - Installing React Router
// 38 - Route, Link, and BrowserRouter
// 39 - useParams, useNavigate
// 40 - Nested Routes
// 41 - Redirects and NotFound pages

// 💬 CONTEXT API
// 42 - Creating and using context
// 43 - useContext hook
// 44 - Sharing global data
// 45 - Updating context values

// 🔧 FORMS AND VALIDATION
// 46 - Controlled inputs
// 47 - Form submission handling
// 48 - Validating input manually
// 49 - Using libraries: Formik / React Hook Form
// 50 - Error messages and UX

// 📡 HTTP REQUESTS & APIs
// 51 - Fetching data with fetch()
// 52 - Axios integration
// 53 - useEffect with fetch
// 54 - useState + useEffect pattern for API
// 55 - Async/await with API calls
// 56 - Loader and error states

// 🧩 STATE MANAGEMENT ADVANCED
// 57 - Lifting state up
// 58 - Prop drilling problem
// 59 - Global state with Context
// 60 - useReducer hook
// 61 - Intro to Redux Toolkit

// 🧰 REDUX TOOLKIT
// 62 - Setting up Redux in React
// 63 - Creating slices and store
// 64 - useSelector and useDispatch
// 65 - Async actions with createAsyncThunk
// 66 - Redux DevTools

// 🎨 STYLING IN REACT
// 67 - Inline styling
// 68 - CSS Modules
// 69 - Styled-components
// 70 - Tailwind CSS in React
// 71 - Classname conditionals (clsx, classnames)

// 📁 CODE ARCHITECTURE & BEST PRACTICES
// 72 - Smart vs Dumb components
// 73 - Container vs Presentational
// 74 - Folder structure for scaling
// 75 - Custom Hooks and separation of logic

// 🧪 TESTING IN REACT
// 76 - Testing basics with Jest
// 77 - React Testing Library
// 78 - Unit testing components
// 79 - Mocking API requests

// 🚀 PERFORMANCE OPTIMIZATION
// 80 - Memoization with React.memo
// 81 - useMemo and useCallback
// 82 - Lazy loading and Suspense
// 83 - Code splitting with React.lazy
// 84 - Virtualized lists (react-window)

// ⚛️ REACT AND TYPESCRIPT (Optional Advanced)
// 85 - Adding TypeScript to React
// 86 - Typing props and state
// 87 - Typing event handlers
// 88 - Using generics

// 🧱 REACT NATIVE BASICS (Bonus)
// 89 - What is React Native?
// 90 - Setting up a basic app
// 91 - Core components and styling
// 92 - Navigation in RN

// 🧠 EXPERT-LEVEL CONCEPTS
// 93 - Refs and DOM access
// 94 - Forwarding refs
// 95 - Portals in React
// 96 - Error boundaries
// 97 - Render props and HOCs
// 98 - Compound components pattern
// 99 - Declarative animations (Framer Motion)
// 100 - Server components (React 19+ preview)







/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 01 - What is React and why use it?

/*
🔷 What is React?
React is a JavaScript **library** (not a full framework) used for building **user interfaces** — especially for single-page applications (SPAs).
It lets you build reusable UI components that efficiently update when your data changes.

🔷 Who created React?
React was developed by **Facebook** (now Meta) and is maintained by a strong community and open-source contributors.

🔷 Why use React?
✅ Component-Based Architecture – Break UI into independent pieces
✅ Declarative Code – Describe what UI should look like
✅ Reusable Components – Build once, use anywhere
✅ Virtual DOM – Efficient updates without full page reloads
✅ Fast Performance – Thanks to virtual DOM & reconciliation
✅ Strong Ecosystem – Redux, React Router, Hooks, React Query, etc.
✅ Backed by Meta – Used in Facebook, Instagram, WhatsApp Web, etc.

🔷 Real-World Use Cases:
- Dashboards
- Social Media Apps
- eCommerce Frontends
- Admin Panels
- EdTech Apps (like your test series project)

🧠 Summary:
React helps you **build fast, dynamic, and modular UIs** with less effort using modern JavaScript.
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 02 - React vs Vanilla JS vs Frameworks

/*
🔷 Vanilla JavaScript:
Vanilla JS means using **plain JavaScript without any libraries or frameworks**.
It gives full control but:
❌ More code to write and maintain
❌ Manually handle DOM updates, events, and re-renders
❌ No component reusability
❌ Difficult to scale in large apps

Example:
document.querySelector("#btn").addEventListener("click", () => {
  document.querySelector("#msg").textContent = "Hello World!";
});

---

🔷 React.js (Library):
React is a **library focused on building UI components** using a declarative and modular approach.

✅ Reusable components  
✅ Virtual DOM for fast updates  
✅ useState, useEffect for logic control  
✅ Better performance and maintainability  
✅ Huge ecosystem (Redux, React Router, etc.)  
✅ Great for large-scale apps and SPAs

---

🔷 Frameworks (e.g., Angular, Vue, Next.js):
Frameworks like Angular and Vue offer **more built-in features** like:
✅ Routing  
✅ Form handling  
✅ HTTP requests  
✅ State management

But:
❌ They are heavier
❌ Have steeper learning curves
❌ Less flexibility compared to React's "just UI" approach

🆚 Comparison Table:

| Feature              | Vanilla JS | React          | Angular/Vue     |
|----------------------|------------|----------------|-----------------|
| Component-based      | ❌         | ✅              | ✅              |
| Reusability          | ❌         | ✅              | ✅              |
| Virtual DOM          | ❌         | ✅              | ✅              |
| Full framework       | ❌         | ❌ (only UI)    | ✅              |
| Learning curve       | Easy       | Moderate       | High            |
| Community support    | Medium     | Very High      | High            |

---

🧠 Summary:
- Use **Vanilla JS** for small features or static pages.
- Use **React** for dynamic, modular frontends.
- Use **Frameworks** if you need complete structure and built-in solutions.
*/

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 03 - Setting up React with Vite / CRA (Create React App)

/*
🔷 React can be set up in two popular ways:
1. Using **Vite** – Fast, modern, minimal setup (Recommended)
2. Using **Create React App (CRA)** – Traditional, but slower and heavier

--------------------------------------------------
🔹 OPTION 1: Setting Up React App with Vite (Recommended)
--------------------------------------------------

📦 Step-by-step:
1️⃣ Open terminal and run:
   npm create vite@latest my-app --template react

2️⃣ Navigate into project folder:
   cd my-app

3️⃣ Install dependencies:
   npm install

4️⃣ Start development server:
   npm run dev

📁 Vite File Structure:
my-app/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx       <-- entry point
├── index.html
├── vite.config.js

🧠 Advantages of Vite:
✅ Extremely fast dev server
✅ Instant HMR (Hot Module Reload)
✅ Smaller bundle
✅ Modern tooling (ESBuild)

--------------------------------------------------
🔹 OPTION 2: Setting Up with Create React App (CRA)
--------------------------------------------------

📦 Step-by-step:
1️⃣ Run:
   npx create-react-app my-app

2️⃣ Navigate into folder:
   cd my-app

3️⃣ Start server:
   npm start

📁 CRA File Structure:
my-app/
├── public/
├── src/
│   ├── App.js
│   ├── index.js       <-- entry point
├── package.json

🧠 Drawbacks of CRA:
❌ Slower build & start time
❌ Harder to customize build
❌ Outdated compared to Vite

--------------------------------------------------
🧠 Summary:
- Use **Vite** for modern development (especially in 2024+)
- CRA still works, but is being replaced by faster tools like Vite or Next.js

👉 Next step: Learn file structure and what `main.jsx` and `App.jsx` do
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 04 - Folder Structure and Entry Point (index.js / main.jsx)

/*
🔷 React apps typically have a clean structure that separates logic, UI, and static files.

--------------------------------------------------
📁 Typical Vite React App Folder Structure:
--------------------------------------------------

my-app/
├── public/                   --> Static files (favicon, images, etc.)
│   └── favicon.svg
├── src/                      --> Source code
│   ├── App.jsx               --> Main component (App logic/UI lives here)
│   ├── main.jsx              --> Entry point: renders App to the DOM
│   ├── index.css             --> Global styles
│   └── assets/               --> (Optional) for images, icons
├── index.html                --> HTML template (root div lives here)
├── package.json              --> Project metadata and dependencies
├── vite.config.js            --> Vite configuration file
└── .gitignore, README.md     --> Other metadata files

--------------------------------------------------
📌 main.jsx (or index.js in CRA):
--------------------------------------------------
// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

🔸 Purpose:
- It imports the `<App />` component.
- Finds the `<div id="root">` in `index.html`.
- Injects the React app into that div using `ReactDOM.createRoot()`.

--------------------------------------------------
📌 index.html:
--------------------------------------------------
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div> <!-- React App will be injected here -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

--------------------------------------------------
📌 App.jsx:
--------------------------------------------------
function App() {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;

--------------------------------------------------
🧠 Summary:
- `main.jsx` is the entry point that bootstraps your React app.
- It renders the `App` component into the `<div id="root">` inside `index.html`.
- The rest of your app is built from the `App.jsx` file as a root component.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 05 - JSX Syntax and Rules

/*
🔷 What is JSX?
JSX stands for **JavaScript XML**.
It allows you to write HTML-like syntax **inside JavaScript** which React converts into `React.createElement()` calls behind the scenes.

JSX makes code **easier to read and write**, especially when building UIs.

--------------------------------------------------
📌 Basic Example:
--------------------------------------------------
const element = <h1>Hello, JSX!</h1>;

function App() {
  return <div>Hello World</div>;
}

--------------------------------------------------
🧠 JSX Rules You Must Know:
--------------------------------------------------

1️⃣ ✅ Only One Parent Element
--------------------------------
❌ Incorrect:
return (
  <h1>Hi</h1>
  <p>Bye</p>
);

✅ Correct (Wrap in a div or React.Fragment):
return (
  <div>
    <h1>Hi</h1>
    <p>Bye</p>
  </div>
);

OR

return (
  <>
    <h1>Hi</h1>
    <p>Bye</p>
  </>
);

2️⃣ ✅ `className` instead of `class`
--------------------------------
❌ Wrong: `<div class="container">`
✅ Right: `<div className="container">`

Because `class` is a reserved keyword in JavaScript.

3️⃣ ✅ CamelCase for HTML Attributes
--------------------------------
❌ Wrong: `<input onclick="">`
✅ Right: `<input onClick={handleClick}>`

React uses **camelCase** for all DOM attributes and events:
- `onClick`
- `onChange`
- `tabIndex`
- `htmlFor` (instead of `for`)

4️⃣ ✅ JS Expressions with Curly Braces `{}`:
--------------------------------
You can embed JS values inside JSX like this:
```jsx
const name = "Ajay";
return <h1>Hello, {name}</h1>;


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 06 - Functional Components

/*
🔷 What is a Functional Component in React?
A functional component is a **JavaScript function** that returns JSX.
It's the **simplest and most modern way** to create components in React.

🔸 Functional components are:
✅ Easy to write
✅ Lightweight
✅ Support React Hooks (useState, useEffect, etc.)
✅ Pure functions (they return the same output for the same input)

--------------------------------------------------
📌 Basic Functional Component:
--------------------------------------------------
function Welcome() {
  return <h1>Hello from Welcome Component</h1>;
}

export default Welcome;

OR using arrow function syntax:

const Welcome = () => {
  return <h1>Hello from Welcome Component</h1>;
};

--------------------------------------------------
📌 Using Functional Component in App.jsx:
--------------------------------------------------
import Welcome from './Welcome';

function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}

--------------------------------------------------
📌 Rules of Functional Components:
--------------------------------------------------
1️⃣ Must return JSX
2️⃣ Must be **capitalized** (React treats lowercase tags as HTML)
   ✅ `MyComponent` → OK
   ❌ `myComponent` → React thinks it's an HTML tag
3️⃣ Use props to accept input
4️⃣ Prefer arrow functions for consistency

--------------------------------------------------
📌 Example With Props:
--------------------------------------------------
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

<App>
  <Welcome name="Ajay" />
</App>

--------------------------------------------------
🧠 Summary:
- Functional components are the standard in modern React
- They are just functions that return JSX
- You can pass props to them and use hooks to manage state or side effects
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 07 - Class Components (for comparison)

/*
🔷 What is a Class Component in React?
A Class Component is an **older way** of creating components in React.
It uses **ES6 classes** and has more boilerplate than functional components.

Class components were widely used before **Hooks** were introduced in React 16.8.

--------------------------------------------------
📌 Basic Syntax:
--------------------------------------------------
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello from Class Component</h1>;
  }
}

export default Welcome;

--------------------------------------------------
📌 Using Props in Class Component:
--------------------------------------------------
class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

<Welcome name="Ajay" />

--------------------------------------------------
📌 Managing State in Class Components:
--------------------------------------------------
class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

--------------------------------------------------
📌 Lifecycle Methods (Class Only):
--------------------------------------------------
- componentDidMount()     // run after component mounts
- componentDidUpdate()    // run after updates
- componentWillUnmount()  // cleanup before unmount

🔁 These are replaced by useEffect() in functional components.

--------------------------------------------------
📌 Functional vs Class Components (Comparison):
--------------------------------------------------

| Feature           | Functional Component | Class Component     |
|-------------------|----------------------|----------------------|
| Syntax            | Function              | Class with `render()` |
| State             | useState hook         | this.state / setState |
| Lifecycle         | useEffect             | Lifecycle methods     |
| Modern Usage      | ✅ Preferred           | ❌ Old/Legacy          |
| Boilerplate       | Less                  | More                  |
| Performance       | Same                  | Same                  |

--------------------------------------------------
🧠 Summary:
- Class components are still valid but **not recommended** for new projects.
- Functional components are now the standard thanks to Hooks.
- Know class components just for **legacy codebases** or interviews.
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 08 - Component Naming Conventions

/*
🔷 Why Naming Conventions Matter?
React depends on **naming** to differentiate between:
✅ HTML tags like `<div>`, `<h1>`  
❌ vs React Components like `<App>`, `<Header>`

--------------------------------------------------
📌 Key Naming Rules:
--------------------------------------------------

1️⃣ ✅ Use PascalCase (UpperCamelCase) for components
   ✅ Good: MyComponent, UserCard, ProductList
   ❌ Bad: mycomponent, user_card

2️⃣ ✅ File names should match component names
   Component: `UserCard`
   File name: `UserCard.jsx` or `UserCard.js`

3️⃣ ✅ Use `.jsx` for files returning JSX (not `.js` for pure logic)
   Good: `App.jsx`, `Header.jsx`, `Footer.jsx`

4️⃣ ✅ One Component per File
   Each file should export only one main component.
   This improves clarity, testing, and maintenance.

--------------------------------------------------
📌 Directory Naming:
--------------------------------------------------
- Use lowercase for folder names
  ✅ components/
  ✅ pages/
  ✅ utils/

- Inside `components/`, use subfolders for large components
  📁 components/
      └── UserCard/
           ├── UserCard.jsx
           └── UserCard.css

--------------------------------------------------
📌 Naming Convention Examples:
--------------------------------------------------

✔ Component: `UserProfile.jsx`
```jsx
function UserProfile() {
  return <div>User Profile</div>;
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 09 - Component Composition (children)

/*
🔷 What is Component Composition in React?

Component Composition is the idea of **combining smaller components** to build bigger, reusable UIs.

Think of it like LEGO blocks 🧱 — small pieces assembled to create a complete structure.

--------------------------------------------------
📌 Basic Composition Example:
--------------------------------------------------
function Header() {
  return <h1>Welcome</h1>;
}

function Footer() {
  return <footer>© 2025</footer>;
}

function Layout() {
  return (
    <div>
      <Header />
      <p>Main content here</p>
      <Footer />
    </div>
  );
}

<App>
  <Layout />
</App>

🧠 This is composition: Header + Footer + Main content combined in Layout.

--------------------------------------------------
📌 Using `props.children` (Very Important)
--------------------------------------------------
// Parent component
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h2>Hello</h2>
  <p>This is inside the Card</p>
</Card>

// Output:
<div class="card">
  <h2>Hello</h2>
  <p>This is inside the Card</p>
</div>

🔸 `children` is a special prop that holds everything between `<Card>...</Card>`.

--------------------------------------------------
📌 Nesting Components Dynamically
--------------------------------------------------
<Card>
  <Header />
  <Main />
  <Footer />
</Card>

This helps you create **layout wrappers**, **modals**, **containers**, etc., where the content is dynamic but the structure is fixed.

--------------------------------------------------
🧠 Summary:
- Composition lets you build complex UIs using smaller, reusable parts.
- `props.children` enables flexible layouts where content can be injected dynamically.
- Encourages **clean code**, **reusability**, and **separation of concerns**.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 10 - Fragments (<> </>)

/*
🔷 What are Fragments in React?

In React, components must return a **single parent element**.

But sometimes, you want to return **multiple elements side by side** without wrapping them in an extra `<div>` — that’s where **Fragments** come in.

--------------------------------------------------
📌 Problem without Fragments:
--------------------------------------------------
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome</p>
    </div>
  );
}

This adds an unnecessary `<div>` to the DOM.

--------------------------------------------------
📌 Solution: Using Fragments
--------------------------------------------------
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome</p>
    </>
  );
}

✅ Now React renders the elements **without any extra wrapper** in the DOM.

--------------------------------------------------
📌 Alternative: <React.Fragment>
--------------------------------------------------
import React from 'react';

function List() {
  return (
    <React.Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
    </React.Fragment>
  );
}

🧠 `<> </>` is a short syntax for `<React.Fragment> </React.Fragment>`

--------------------------------------------------
📌 Why Use Fragments?
--------------------------------------------------
✅ Avoid unnecessary `<div>` wrappers (cleaner HTML)
✅ Better for layout and styling
✅ Required in lists or tables where extra tags break structure

Example (bad HTML):
```jsx
<ul>
  <div>
    <li>Item</li>
  </div>
</ul>


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 11 - Props Basics (Data from Parent to Child)

/*
🔷 What are Props in React?

📦 Props = "Properties"  
They are **read-only** data passed from a **parent component** to a **child component**.

Props let you:
✅ Reuse components  
✅ Customize behavior/content  
✅ Keep components dynamic
*/

/// ✅ Example 1: Passing props from parent to child

function App() {
  return (
    <div>
      <Greeting name="Ajay" />
      <Greeting name="Riya" />
    </div>
  );
}

function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

/// ✅ Example 2: Destructuring props

function Welcome({ user }) {
  return <p>Welcome, {user}!</p>;
}

// <Welcome user="Admin" />

/// ✅ Example 3: Passing multiple props

function Profile({ name, age }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

// <Profile name="Ajay" age={25} />

/// ✅ Example 4: Using default props

function Button({ label = "Click Me" }) {
  return <button>{label}</button>;
}

// <Button /> will render → "Click Me"
// <Button label="Submit" /> will render → "Submit"

/*
🧠 Summary:
- Props pass data **down** from parent to child.
- They are **immutable** in the child.
- Use **destructuring** for cleaner code.
- Great for reusability and flexibility.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 12 - Default Props

/*
🔷 What are Default Props?

Default props are used to **set a fallback value** for a prop when it’s **not provided** by the parent component.

This ensures your component works correctly and avoids undefined values.
*/

/// ✅ Example 1: Default prop using function parameter

function Button({ label = "Click Me" }) {
  return <button>{label}</button>;
}

// Usage:
<Button />               // Output: Click Me
<Button label="Submit" /> // Output: Submit

/// ✅ Example 2: Default props using defaultProps (older way — not recommended for function components)

function Welcome({ name }) {
  return <h2>Hello, {name}</h2>;
}

Welcome.defaultProps = {
  name: "Guest",
};

// Usage:
<Welcome />          // Output: Hello, Guest
<Welcome name="Ajay" /> // Output: Hello, Ajay

/*
🧠 Notes:
- For function components, prefer setting default values **inside the function parameter**.
- The `.defaultProps` syntax is mostly used with **class components**.
*/

/// ✅ Example 3: Using default values with multiple props

function Profile({ name = "User", age = 18 }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

// <Profile />              // Output: User is 18 years old
// <Profile name="Ajay" />  // Output: Ajay is 18 years old

/*
🧠 Summary:
- Default props make components safer and more predictable.
- Use default values directly in destructuring for functional components.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 13 - Prop Types Validation

/*
🔷 What is PropTypes?

PropTypes help you **validate the type of props** passed to your React components.
It’s a **development-time check** to catch bugs early and ensure components get the correct data.

🧪 Think of it as "type-checking for props" in JavaScript.
*/

/// ✅ Step 1: Install prop-types (only once per project)
/// Run this in terminal:
/// npm install prop-types

/// ✅ Example 1: Using PropTypes in a functional component

import PropTypes from 'prop-types';

function Greeting({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

// ✅ Prop types validation
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

/// ✅ Usage:
<Greeting name="Ajay" age={25} />        // ✅ Valid
<Greeting name={23} age="twenty" />      // ❌ Warning in console

/*
🧠 Explanation:
- PropTypes.string → name must be a string
- PropTypes.number → age must be a number
- isRequired → required prop; warning if missing
*/

/// ✅ Example 2: PropTypes with default props

function Button({ label }) {
  return <button>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string,
};

Button.defaultProps = {
  label: "Click Me",
};

/// ✅ Example 3: Advanced types

MyComponent.propTypes = {
  isActive: PropTypes.bool,
  hobbies: PropTypes.array,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

/*
🧠 Summary:
- Use `prop-types` to ensure your components receive the correct type of data.
- It adds safety and self-documentation to your components.
- Only used during development – no runtime cost in production.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 14 - useState Hook – Syntax, Updates, Patterns

/*
🔷 What is useState?

`useState` is a React Hook that lets you **add state to functional components**.

It helps your component remember information (like form data, toggles, counters, etc.).

🔧 Syntax:
const [state, setState] = useState(initialValue);
*/

/// ✅ Example 1: Counter

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial value is 0

  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

/*
🧠 Explanation:
- `count` is the current state value.
- `setCount` is the function used to update it.
- useState(0) initializes `count` to 0.
*/

/// ✅ Example 2: useState with Strings

function Greeting() {
  const [name, setName] = useState("Guest");

  return (
    <div>
      <h2>Hello, {name}</h2>
      <button onClick={() => setName("Ajay")}>Change Name</button>
    </div>
  );
}

/// ✅ Example 3: useState with Objects

function Profile() {
  const [user, setUser] = useState({ name: "Ajay", age: 25 });

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <p>{user.name} is {user.age} years old.</p>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
}

/*
🧠 Important Patterns:
1. Never update state directly (e.g., user.age += 1 ❌)
2. Use spread operator to preserve existing values
3. Every state update causes a re-render
*/

/// ✅ Example 4: useState with Arrays

function SkillsList() {
  const [skills, setSkills] = useState(["HTML", "CSS"]);

  const addSkill = () => setSkills([...skills, "JavaScript"]);

  return (
    <div>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={addSkill}>Add JS</button>
    </div>
  );
}

/*
🧠 Summary:
- `useState` is the most basic React hook
- You can use it for strings, numbers, arrays, objects, booleans
- Updating state causes React to re-render the component
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 15 - Initial State from Props or External Data

/*
🔷 Why set initial state from props or external data?

Sometimes you want to:
✅ Pre-fill forms  
✅ Load state from props or API responses  
✅ Reflect parent component values in local state
*/

/// ✅ Example 1: Initial state from props (form input)

function InputField({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// Usage:
<InputField defaultValue="Ajay" />

/// 🧠 Note:
- `defaultValue` sets the initial state.
- After that, it becomes **independent of props** (controlled by local state).

/// ✅ Example 2: Initial state from API (external data)

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Explanation:
- The initial state is an empty array.
- Once the API returns data, `setUsers()` updates the state.
- This is a common pattern for loading data on component mount.
*/

/// ✅ Example 3: Initial state from calculation

function Timer({ start }) {
  const [time, setTime] = useState(() => start * 60); // lazy init

  return <p>Time left: {time} seconds</p>;
}

// Usage:
<Timer start={5} /> // 5 minutes = 300 seconds

/*
🧠 Tips:
- Use lazy initialization (useState(() => ...)) for performance
- When state depends on props, capture the **initial value** only once
- Do NOT expect it to auto-update if the prop changes later
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 16 - Event Handlers in React

/*
🔷 What are Event Handlers?

Event handlers are functions that run when a specific **DOM event** happens (like click, change, submit, etc.).

They work just like normal JS events but follow React’s **camelCase naming** and **JSX syntax**.
*/

/// ✅ Example 1: Click event

function ClickButton() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}

/// ✅ Example 2: Change event (input field)

function TextInput() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
    </div>
  );
}

/// ✅ Example 3: Passing arguments to event handler

function GreetUser({ name }) {
  const sayHi = (username) => {
    alert(`Hello, ${username}!`);
  };

  return <button onClick={() => sayHi(name)}>Say Hi</button>;
}

/// ✅ Example 4: Preventing default behavior

function SubmitForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🧠 Summary:
- Event handlers use `onEventName={function}` (e.g., onClick, onChange)
- Use arrow functions to pass arguments
- `e.preventDefault()` stops default browser behavior
- React events are synthetic, but behave like native browser events
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 17 - Passing Arguments to Event Handlers

/*
🔷 Why Pass Arguments?

Sometimes you need to send **custom data** to an event handler function — like an ID, name, index, etc.

You **cannot** call the function directly like `onClick={myFunc(data)}`  
That would **run immediately** instead of on the event.

Instead, use an **arrow function** or bind().
*/

/// ✅ Example 1: Passing data using arrow function

function Product({ name, price }) {
  const handleBuy = (itemName) => {
    alert(`Buying ${itemName}`);
  };

  return (
    <button onClick={() => handleBuy(name)}>
      Buy {name} for ₹{price}
    </button>
  );
}

// Usage:
// <Product name="Shoes" price={999} />

/// ✅ Example 2: Passing multiple values

function CartItem({ name, quantity }) {
  const handleRemove = (item, qty) => {
    alert(`Removing ${qty} of ${item}`);
  };

  return (
    <button onClick={() => handleRemove(name, quantity)}>
      Remove Item
    </button>
  );
}

/// ✅ Example 3: Inside a `.map()` list

function UserList({ users }) {
  const greet = (name) => alert(`Hi, ${name}`);

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user}
          <button onClick={() => greet(user)}>Greet</button>
        </li>
      ))}
    </ul>
  );
}

/// ✅ Example 4: Using .bind() (less common in modern React)

function Greet({ name }) {
  const sayHello = (name) => alert(`Hello, ${name}`);

  return <button onClick={sayHello.bind(null, name)}>Say Hello</button>;
}

/*
🧠 Summary:
- Use arrow functions in `onClick={() => handle(arg)}`
- Do not call the function directly (e.g., ❌ onClick={handle(arg)})
- Avoid `.bind()` unless needed — arrow functions are cleaner
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 18 - Handling Forms and Input Fields

/*
🔷 Why Form Handling in React?

React uses **controlled components** to manage form inputs — meaning the **form input's value is tied to React state**.

This gives you full control over:
✅ Field values  
✅ Validation  
✅ Conditional logic  
✅ Resetting forms
*/

/// ✅ Example 1: Handling a single input

function NameForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

/// ✅ Example 2: Handling multiple inputs (object state)

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

/// ✅ Example 3: Reset form

function ResetForm() {
  const [input, setInput] = useState("");

  const handleReset = () => setInput("");

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleReset}>Clear</button>
    </div>
  );
}

/*
🧠 Tips:
- Always use `value` + `onChange` = controlled component
- Use `e.preventDefault()` to stop page refresh on submit
- For multi-field forms, use an object and `name` attribute
- Use `placeholder` for user hints
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 19 - Controlled vs Uncontrolled Components

/*
🔷 What’s the difference?

In React, input elements can be either:
1️⃣ **Controlled Components** – React fully controls the input
2️⃣ **Uncontrolled Components** – The DOM handles the input directly (like vanilla JS)

React recommends using **controlled components**.
*/

/// ✅ Example 1: Controlled Component (Recommended)

function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>You typed: {value}</p>
    </div>
  );
}

/*
🧠 Key Points:
- React manages the input via state
- You have full control over the value
- Easy to validate, reset, format, or log values
*/

/// ✅ Example 2: Uncontrolled Component (Avoid when possible)

import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef();

  const handleClick = () => {
    alert(`Input: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Show Value</button>
    </div>
  );
}

/*
🧠 Key Points:
- Input is managed by the DOM, not React
- Use `ref` to access the input value
- Can be useful for quick reads (e.g. file inputs, focus management)
- Not ideal for form handling and validation

📌 Controlled vs Uncontrolled Summary:

| Feature           | Controlled            | Uncontrolled         |
|------------------|------------------------|----------------------|
| Managed by       | React (state)          | DOM (ref)            |
| onChange         | Required               | Optional             |
| Default value    | value                  | defaultValue         |
| Use case         | Forms, validation      | Quick refs, perf tools

*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 20 - Keyboard and Mouse Events

/*
🔷 React supports all common DOM events like:
✅ onClick  
✅ onDoubleClick  
✅ onMouseEnter / onMouseLeave  
✅ onKeyDown / onKeyUp  
✅ onKeyPress (deprecated, use onKeyDown)

These events are handled using camelCase in JSX and receive a synthetic event object.
*/

/// ✅ Example 1: onClick event

function ClickMe() {
  const handleClick = () => {
    alert("You clicked the button!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}

/// ✅ Example 2: onDoubleClick

function DoubleClickMe() {
  return (
    <p onDoubleClick={() => alert("Double clicked!")}>
      Double click this text
    </p>
  );
}

/// ✅ Example 3: onMouseEnter and onMouseLeave

function HoverBox() {
  return (
    <div
      onMouseEnter={() => console.log("Mouse entered")}
      onMouseLeave={() => console.log("Mouse left")}
      style={{ padding: "20px", border: "1px solid black" }}
    >
      Hover over me
    </div>
  );
}

/// ✅ Example 4: onKeyDown event

function KeyboardInput() {
  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") alert("You pressed Enter!");
  };

  return <input type="text" onKeyDown={handleKeyDown} placeholder="Type and press Enter" />;
}

/*
🧠 Tips:
- Keyboard events work on input, textarea, and focused elements
- Always check `e.key` or `e.code` for key value
- Mouse events are useful for tooltips, drag/drop, etc.
- You can combine multiple events for richer interactions
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 21 - Conditional Rendering in JSX (if, ternary, &&)

/*
🔷 What is Conditional Rendering?

Conditional rendering means **showing or hiding parts of the UI** based on a condition (like user login, loading, etc.)

React supports three main ways:
1️⃣ `if` statements (outside return)
2️⃣ Ternary operator
3️⃣ Logical && operator
*/

/// ✅ Example 1: Using `if` outside return

function Welcome({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h2>Welcome back!</h2>;
  }
  return <h2>Please log in.</h2>;
}

/// ✅ Example 2: Ternary Operator inside JSX

function Greeting({ name }) {
  return (
    <h2>
      {name ? `Hello, ${name}!` : "Hello, Guest!"}
    </h2>
  );
}

/// ✅ Example 3: Logical AND (`&&`) for short conditions

function ShowNotification({ hasNewMessage }) {
  return (
    <div>
      <h3>Inbox</h3>
      {hasNewMessage && <p>You have a new message!</p>}
    </div>
  );
}

/// ✅ Example 4: Conditional class or styles

function Button({ disabled }) {
  return (
    <button
      className={disabled ? "btn-disabled" : "btn-primary"}
      disabled={disabled}
    >
      {disabled ? "Loading..." : "Submit"}
    </button>
  );
}

/*
🧠 Summary:
- Use `if` for complex logic outside JSX
- Use `? :` for inline expressions inside JSX
- Use `&&` for one-sided conditions
- Avoid deeply nested ternaries — extract logic to variables if needed
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 22 - Rendering Fallback UI

/*
🔷 What is Fallback UI?

A **fallback UI** is the UI you show when:
✅ Data is still loading  
✅ Something is missing  
✅ An error occurred  
✅ A user doesn’t meet a condition (like not logged in)

It’s an essential part of creating a smooth user experience.
*/

/// ✅ Example 1: Loading state fallback

function UserProfile({ isLoading, user }) {
  if (isLoading) {
    return <p>Loading user data...</p>; // fallback UI
  }

  return <h2>Welcome, {user.name}</h2>;
}

/// ✅ Example 2: Fallback for missing data

function Avatar({ image }) {
  return (
    <img
      src={image || "https://via.placeholder.com/150"}
      alt="User Avatar"
    />
  );
}

/// ✅ Example 3: Fallback using ternary operator

function Dashboard({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Dashboard</h1> : <p>Please log in to view your dashboard.</p>}
    </div>
  );
}

/// ✅ Example 4: Fallback in Suspense (for lazy loading)

import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <LazyComponent />
    </Suspense>
  );
}

/*
🧠 Summary:
- Fallback UI keeps your app from showing empty or broken views
- Use it with loading states, errors, and missing data
- `Suspense` allows built-in fallback for lazy components
- Always show meaningful feedback (not just spinners)
*/


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 22 - Rendering Fallback UI

/*
🔷 What is Fallback UI?

A **fallback UI** is the UI you show when:
✅ Data is still loading  
✅ Something is missing  
✅ An error occurred  
✅ A user doesn’t meet a condition (like not logged in)

It’s an essential part of creating a smooth user experience.
*/

/// ✅ Example 1: Loading state fallback

function UserProfile({ isLoading, user }) {
  if (isLoading) {
    return <p>Loading user data...</p>; // fallback UI
  }

  return <h2>Welcome, {user.name}</h2>;
}

/// ✅ Example 2: Fallback for missing data

function Avatar({ image }) {
  return (
    <img
      src={image || "https://via.placeholder.com/150"}
      alt="User Avatar"
    />
  );
}

/// ✅ Example 3: Fallback using ternary operator

function Dashboard({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Dashboard</h1> : <p>Please log in to view your dashboard.</p>}
    </div>
  );
}

/// ✅ Example 4: Fallback in Suspense (for lazy components only)

import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <LazyComponent />
    </Suspense>
  );
}

/*
🧠 Summary:
- Fallback UI keeps your app from showing empty or broken views
- Use it with loading states, errors, and missing data
- `Suspense` allows built-in fallback for lazy components
- Always show meaningful feedback (not just spinners)
*/

/// ✅ Example 5: React Router + Suspense + Lazy Routes

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function MainApp() {
  return (
    <Router>
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

/*
🧠 How it works:
- `lazy()` loads route components on demand
- `Suspense` shows fallback during the lazy loading
- Use it around <Routes> to lazy-load full pages
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 23 - Showing / Hiding Elements in React

/*
🔷 Why show/hide elements?

React lets you conditionally show or hide parts of your UI based on state, props, or logic — this improves UX and keeps the UI clean.
*/

/// ✅ Example 1: Toggle visibility with boolean state

function ToggleMessage() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Message
      </button>

      {show && <p>This is a toggleable message!</p>}
    </div>
  );
}

/// ✅ Example 2: Hide element using ternary

function LoginStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}

/// ✅ Example 3: Dynamically change style/display

function Box({ visible }) {
  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      This box is conditionally rendered.
    </div>
  );
}

/// ✅ Example 4: Inline logic to skip rendering

function AdminPanel({ role }) {
  if (role !== 'admin') return null;

  return <h3>Welcome to the admin panel.</h3>;
}

/*
🧠 Summary:
- Use `&&` for simple toggles
- Use `? :` for alternate content
- Use `display: 'none'` for hiding while keeping in DOM
- `return null` is the cleanest way to skip rendering
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 24 - Rendering Lists using `.map()`

/*
🔷 Why use `.map()` in React?

When you have an array of data (like users, products, etc.), you can render each item using `.map()` — it's the most common way to display lists dynamically in React.
*/

/// ✅ Example 1: Render list of strings

function FruitsList() {
  const fruits = ['Apple', 'Banana', 'Mango'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

/// ✅ Example 2: Render list of objects

function Users() {
  const users = [
    { id: 1, name: 'Ajay' },
    { id: 2, name: 'Riya' },
    { id: 3, name: 'Vikram' }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

/// ✅ Example 3: Use with custom components

function UserCard({ name }) {
  return <div className="card">Name: {name}</div>;
}

function UsersList() {
  const names = ['Alice', 'Bob', 'Charlie'];

  return (
    <div>
      {names.map((name, idx) => (
        <UserCard key={idx} name={name} />
      ))}
    </div>
  );
}

/// ✅ Example 4: Conditional list rendering

function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No tasks for today!</p>
      ) : (
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
🧠 Key Notes:
- Always add a unique `key` to each list item (prefer `id` over `index`)
- Avoid using `index` as key unless you have no unique value
- You can pass each item to a sub-component
- Clean lists = better performance and debugging
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 25 - Using Keys Correctly in React Lists

/*
🔷 Why are Keys Important?

Keys help React identify **which items changed**, were **added**, or **removed** in a list.  
They improve **performance** and avoid rendering bugs when the list updates.

🔸 React uses the `key` prop internally to track each element.
*/

/// ✅ Example 1: Using unique `id` as key (Best Practice)

function Products() {
  const items = [
    { id: 101, name: 'Shoes' },
    { id: 102, name: 'T-Shirt' },
    { id: 103, name: 'Hat' },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

/// ✅ Example 2: Using `index` as key (Not recommended for dynamic lists)

function SimpleList() {
  const data = ['One', 'Two', 'Three'];

  return (
    <ul>
      {data.map((value, index) => (
        <li key={index}>{value}</li>
      ))}
    </ul>
  );
}

/*
⚠️ Use index as key ONLY IF:
- List is static (won’t change order or values)
- You don’t have a unique identifier (like `id`)

Why avoid index as key?
❌ It breaks component state tracking when list items are reordered, deleted, or added dynamically.
*/

/// ✅ Example 3: Wrong key = React warning

const items = ['X', 'Y', 'Z'];

// ❌ Don't do this:
<li key="random-key">{item}</li> // Each will get the same key!

/*
🧠 Summary:
- ✅ Use a unique and stable `key` (like database `id`)
- ❌ Avoid using index unless no better option
- Never leave out the key — React will warn you
- Key should be added to the direct child inside `.map()`
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 26 - Conditional Rendering with Lists

/*
🔷 What is Conditional List Rendering?

Sometimes, you want to render a list **only if it has items**, or display a fallback message when the list is **empty**.

This improves user feedback and handles edge cases.
*/

/// ✅ Example 1: Show list if not empty, else show message

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks for today 😴</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/// ✅ Example 2: Filter list before rendering

function Users({ users }) {
  return (
    <ul>
      {users
        .filter((user) => user.active)
        .map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
    </ul>
  );
}

/// ✅ Example 3: Show only if a condition is met

function Notifications({ messages }) {
  return (
    <div>
      <h3>Inbox</h3>
      {messages.length > 0 && <p>You have {messages.length} new messages.</p>}
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

/// ✅ Example 4: Inline check inside `.map()`

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) =>
        product.inStock ? (
          <li key={product.id}>{product.name}</li>
        ) : null
      )}
    </ul>
  );
}

/*
🧠 Summary:
- Use `.length === 0` or `!array.length` to check if list is empty
- Use `filter()` before mapping to skip unwanted items
- You can show messages, loaders, or alternate UI when no data
- Combine conditional rendering with `.map()` for flexible lists
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// ✅ 27 - Nested List Rendering

/*
🔷 What is Nested List Rendering?

Sometimes data is structured in **arrays within arrays** (e.g., categories → products, teams → players).  
To render it, we **nest `.map()` calls** to go deeper into the structure.
*/

/// ✅ Example 1: Categories with items

const data = [
  {
    category: 'Fruits',
    items: ['Apple', 'Banana', 'Mango']
  },
  {
    category: 'Vegetables',
    items: ['Carrot', 'Broccoli']
  }
];

function NestedList() {
  return (
    <div>
      {data.map((group, index) => (
        <div key={index}>
          <h3>{group.category}</h3>
          <ul>
            {group.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/// ✅ Example 2: Teams with players

const teams = [
  {
    name: 'Team A',
    players: ['Ajay', 'Riya']
  },
  {
    name: 'Team B',
    players: ['Sam', 'Tina', 'Rahul']
  }
];

function TeamsList() {
  return (
    <div>
      {teams.map((team, i) => (
        <div key={i}>
          <h4>{team.name}</h4>
          <ul>
            {team.players.map((player, j) => (
              <li key={j}>{player}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/*
🧠 Summary:
- You can use `.map()` inside another `.map()` to render nested lists
- Always provide a unique key for each level of iteration
- Helps when rendering grouped, hierarchical, or structured data
*/



//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// ✅ 28 - useState (Hook Basics with Functional Updates)

/*
🔷 What is `useState`?

`useState` lets you add **reactive state** to functional components.

It returns:
- A state variable
- A function to update that variable
*/

/// ✅ Syntax:
const [state, setState] = useState(initialValue);

/// ✅ Example 1: Counter with functional update (best practice)

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Functional update: ensures you're always working with latest value
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

/// ✅ Example 2: String state

function WelcomeBox() {
  const [name, setName] = useState("Guest");

  return (
    <div>
      <p>Hello, {name}!</p>
      <button onClick={() => setName("Ajay")}>Change Name</button>
    </div>
  );
}

/// ✅ Example 3: useState with object + functional update

function Profile() {
  const [user, setUser] = useState({ name: "Ajay", age: 25 });

  const increaseAge = () => {
    setUser((prevUser) => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };

  return (
    <div>
      <p>{user.name} is {user.age} years old.</p>
      <button onClick={increaseAge}>Increase Age</button>
    </div>
  );
}

/// ✅ Example 4: useState with array + functional update

function Skills() {
  const [skills, setSkills] = useState(["HTML", "CSS"]);

  const addSkill = () => {
    setSkills((prevSkills) => [...prevSkills, "React"]);
  };

  return (
    <div>
      <ul>
        {skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
      <button onClick={addSkill}>Add React</button>
    </div>
  );
}

/*
🧠 Functional Update Pattern:
- Useful when your new state depends on the previous one
- Safer when multiple state updates are queued
- Always use it for counters, toggles, and dynamic updates

✅ Good: setCount(prev => prev + 1)
❌ Bad: setCount(count + 1) (may be outdated in async updates)
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 29 - useEffect (React Hook for Side Effects)

/*
🔷 What is `useEffect`?

`useEffect` is a React Hook that lets you **run side effects** in functional components.

📦 Examples of side effects:
- Fetching data from an API
- Setting up subscriptions or timers
- Listening for window scroll/resize
- Updating the DOM manually

useEffect replaces lifecycle methods like:
- componentDidMount
- componentDidUpdate
- componentWillUnmount
*/

/// ✅ Syntax:
useEffect(() => {
  // effect logic here
  return () => {
    // optional cleanup (like removing event listeners)
  };
}, [dependencies]);

/// ✅ Example 1: Run on every render (no dependency array)

useEffect(() => {
  console.log("Component rendered or updated");
});

/// ✅ Example 2: Run only once (on mount)

useEffect(() => {
  console.log("Component mounted once");
}, []); // empty dependency array = run only once

/// ✅ Example 3: Run when a value changes

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]); // only runs when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </div>
  );
}

/// ✅ Example 4: Fetch data on mount (API call)

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/// ✅ Example 5: Cleanup with return (like componentWillUnmount)

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => {
      clearInterval(id); // cleanup
      console.log("Component unmounted");
    };
  }, []);

  return <p>Timer running...</p>;
}

/*
🧠 Summary:
- `useEffect` lets you handle side effects in functional components
- Control when it runs using the dependency array:
  - `[]` → run once
  - `[value]` → run when `value` changes
  - no array → run on every render
- Use return for cleanup (like removing listeners or intervals)
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 30 - useRef (Reference Hook in React)

/*
🔷 What is `useRef`?

`useRef` is a React Hook that lets you:
✅ Store a **mutable value** that doesn't trigger re-render  
✅ Access **DOM elements** directly (like `document.querySelector`)  
✅ Keep track of previous values across renders

🔧 Syntax:
const myRef = useRef(initialValue);
*/

/// ✅ Example 1: Accessing a DOM element (like focus)

function FocusInput() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus(); // focus the input
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type here" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

/// ✅ Example 2: Persisting previous value without re-render

function PreviousCounter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = count; // store current count before updating
  });

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

/// ✅ Example 3: Store timeout ID (useRef instead of state)

function TimerControl() {
  const timerId = useRef(null);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    console.log("Stopped");
  };

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

/*
🧠 Summary:
- `useRef()` returns a `.current` object you can update without re-rendering
- Great for DOM access, timers, intervals, storing previous values
- It doesn’t notify React when it changes — use `useState` for UI updates
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 31 - useContext (Sharing Global Data in React)

/*
🔷 What is `useContext`?

`useContext` is a React Hook that lets you **access global data** without passing props manually through every component level.

It works with `React.createContext()` to share:
✅ Theme  
✅ Language  
✅ User Info  
✅ Auth Status  
✅ App-wide settings
*/

/// ✅ Step 1: Create a context

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(); // can be named anything

/// ✅ Step 2: Create a Provider Component

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/// ✅ Step 3: Use the context in child components

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext); // access global data

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

function DisplayTheme() {
  const { theme } = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
}

/// ✅ Step 4: Wrap your app with the provider

function App() {
  return (
    <ThemeProvider>
      <DisplayTheme />
      <ThemeToggleButton />
    </ThemeProvider>
  );
}

/*
🧠 Summary:
- `createContext()` creates the global context
- `Context.Provider` wraps the tree and provides values
- `useContext()` reads the value anywhere inside that tree
- Useful for avoidi


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 32 - Custom Hooks (Reusable Logic in React)

/*
🔷 What are Custom Hooks?

Custom Hooks let you **extract and reuse stateful logic** between components.

They’re regular functions that:
✅ Start with the word `use`  
✅ Can use other hooks (like `useState`, `useEffect`, etc.)  
✅ Help avoid duplicated code and improve modularity
*/

/// ✅ Example 1: Custom hook to manage counter

import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// ✅ Use in component
function CounterBox() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

/// ✅ Example 2: Custom hook to fetch data

import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// ✅ Use in component
function Users() {
  const { data: users, loading } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Summary:
- Custom Hooks = Reusable logic using React’s built-in hooks
- Always name them starting with `use` (e.g., `useAuth`, `useForm`, `useTheme`)
- Keeps components clean and separates logic from UI
- Can return anything: state, functions, objects, arrays
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 33 - Rules of Hooks (How to Use Hooks Properly)

/*
🔷 Why Rules of Hooks?

React Hooks have **strict usage rules** to ensure:
✅ Predictable behavior  
✅ Correct lifecycle tracking  
✅ Proper function reactivity

🚫 Breaking these rules may lead to bugs, memory leaks, or broken state.
*/

/// ✅ Rule 1: Only call Hooks at the **top level**
/*
- ❌ Don’t use hooks inside loops, conditions, or nested functions
- ✅ Always call hooks directly inside the main body of your component or custom hook
*/

function GoodComponent() {
  // ✅ correct usage
  const [count, setCount] = useState(0);

  return <p>{count}</p>;
}

function BadComponent() {
  if (true) {
    // ❌ wrong: conditional hook call
    // const [count, setCount] = useState(0);
  }
  return <p>Invalid</p>;
}

/// ✅ Rule 2: Only call Hooks in **functional components** or **custom hooks**

function useCounter() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}

// ❌ Don’t call useState/useEffect inside:
class Bad extends React.Component {
  // useState() ❌ Not allowed
}

/// ✅ Rule 3: Custom hooks must start with `use`

function useUser() {
  const [name, setName] = useState("Ajay");
  return { name, setName };
}

// ❌ This is not a valid hook:
function fetchData() {
  useEffect(() => {}, []); // 🚫 React won’t track this as a hook
}

/*
🧠 React enforces these rules using ESLint plugin:
Install with:
🔹 npm install eslint-plugin-react-hooks --save-dev
🔹 And add in ESLint config:
"plugins": ["react-hooks"],
"rules": {
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn"
}
*/

/// ✅ Bonus: Dependency array in useEffect must include all used variables

useEffect(() => {
  console.log("Using some external variable");
}, []); // ❌ if the variable is used inside, it should be in deps

/*
🧠 Summary:
- ✅ Call hooks at the top level only
- ✅ Call them only inside React function components or custom hooks
- ✅ Hook names must start with `use`
- ✅ useEffect must declare all external dependencies
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 34 - Lifecycle Phases in React (Function Components)

/*
🔷 React component lifecycle refers to **stages a component goes through**:
1️⃣ Mount → added to the DOM  
2️⃣ Update → re-render due to state/props change  
3️⃣ Unmount → removed from the DOM

🧠 In class components, we had methods like:
- componentDidMount()
- componentDidUpdate()
- componentWillUnmount()

✅ In function components, we use `useEffect()` to handle all these phases.
*/

/// ✅ Example 1: Mount (run only once)

useEffect(() => {
  console.log("Component mounted ✅");
}, []); // empty array → run once

/// ✅ Example 2: Update (watching dependencies)

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]); // runs every time `count` changes

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

/// ✅ Example 3: Unmount (cleanup when component is removed)

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer stopped ⏹️");
    };
  }, []); // only runs on mount and cleanup on unmount

  return <p>Running timer...</p>;
}

/*
🧠 Summary of Lifecycle Phases in `useEffect`:

| Phase     | How to Handle                       |
|-----------|-------------------------------------|
| Mount     | useEffect(() => {}, [])             |
| Update    | useEffect(() => {}, [dependencies]) |
| Unmount   | useEffect(() => { return () => {} }, [])

✅ You can combine multiple useEffect calls for different phases
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 35 - Replacing Lifecycle Methods with Hooks

/*
🔷 In class components, lifecycle methods are split:
- componentDidMount → runs after initial render
- componentDidUpdate → runs on state/prop update
- componentWillUnmount → runs before component is destroyed

🧠 In functional components, all these are replaced using `useEffect()` with different dependency patterns.
*/

/// ✅ Equivalent to componentDidMount (run once)

useEffect(() => {
  console.log("Mounted: componentDidMount");
}, []);

/// ✅ Equivalent to componentDidUpdate (run on specific value change)

useEffect(() => {
  console.log("Updated: count changed");
}, [count]); // only runs when `count` changes

/// ✅ Equivalent to componentWillUnmount (cleanup function)

useEffect(() => {
  const interval = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log("Unmounted: componentWillUnmount");
  };
}, []); // cleanup runs when component unmounts

/// ✅ Simulating all 3 in one component

function LifecycleDemo({ show }) {
  const [count, setCount] = useState(0);

  // Mount
  useEffect(() => {
    console.log("🚀 Mounted");
    return () => console.log("❌ Unmounted");
  }, []);

  // Update
  useEffect(() => {
    if (count !== 0) {
      console.log("🔁 Updated: count =", count);
    }
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

/*
🧠 Summary:
- useEffect can simulate all lifecycle methods
- Just change the dependency array:
  ✅ [] for mount
  ✅ [value] for updates
  ✅ return cleanup() for unmount
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 36 - Cleanup Functions in useEffect

/*
🔷 What is a Cleanup Function?

A cleanup function in `useEffect()` is used to:
✅ Remove timers, event listeners, or subscriptions  
✅ Prevent memory leaks  
✅ Clean up anything set up during the effect

🧠 It acts like `componentWillUnmount` in class components.
*/

/// ✅ Syntax

useEffect(() => {
  // setup code (runs on mount or update)

  return () => {
    // cleanup code (runs before unmount OR next effect run)
  };
}, [dependencies]);

/// ✅ Example 1: Cleanup an interval

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏱️ Tick");
    }, 1000);

    // cleanup
    return () => {
      clearInterval(interval);
      console.log("🛑 Timer stopped");
    };
  }, []);

  return <p>Timer is running...</p>;
}

/// ✅ Example 2: Remove event listener

function WindowWidthTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // cleanup the listener
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log("📏 Resize listener removed");
    };
  }, []);

  return <p>Window width: {width}px</p>;
}

/// ✅ Example 3: Cleanup before re-run

function AutoSave({ content }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("💾 Auto-saving:", content);
    }, 1000);

    return () => {
      clearTimeout(timeout); // clear previous timeout before setting new one
    };
  }, [content]);
}

/*
🧠 Summary:
- Cleanup functions help avoid duplicate setups and memory leaks
- They run:
  ✅ when the component unmounts
  ✅ OR before the effect re-runs due to dependency changes
- Always return a function from `useEffect()` if setup needs reversal
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 37 - Installing React Router

/*
🔷 What is React Router?

React Router is a standard **routing library** for React.  
It lets you handle:
✅ Multiple pages (routes)  
✅ Navigation without full reloads (SPA)  
✅ Dynamic routing and nested routes
*/

/// ✅ Step 1: Install React Router

# For React Router v6 (latest stable version)
npm install react-router-dom

/// ✅ Step 2: Set up the router in your React app

// ✅ main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

/// ✅ Step 3: Define Routes in App.jsx

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

/// ✅ Step 4: Add navigation

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
  );
}

/// ✅ Folder structure suggestion

my-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   └── components/
│       └── Navbar.jsx

/*
🧠 Summary:
- Install `react-router-dom`
- Wrap your app with `<BrowserRouter>`
- Use `<Routes>` and `<Route>` to declare paths
- Use `<Link>` for internal navigation (not `<a href>`)

You're now ready to build single-page apps with multiple views!
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 38 - Route, Link, and BrowserRouter in React Router

/*
🔷 These are the **core building blocks** of client-side routing in React.

✅ `<BrowserRouter>` – Sets up routing context  
✅ `<Routes>` – Groups all your routes  
✅ `<Route>` – Defines individual pages/components  
✅ `<Link>` – For internal navigation without page reload
*/

/// ✅ 1. <BrowserRouter>

import { BrowserRouter } from 'react-router-dom';

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

/// ✅ 2. <Routes> and <Route>

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

/// ✅ 3. <Link> (for client-side navigation)

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link> | <Link to="/about">📘 About</Link>
    </nav>
  );
}

/*
🔸 Difference from <a href="">
- `<a href="">` reloads the page (not SPA)
- `<Link to="">` updates the URL **without reload**

✅ Output:
- Going to "/" renders <Home />
- Going to "/about" renders <About />
*/

/// ✅ Optional: <Navigate> for redirection

import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn ? <Dashboard /> : <Navigate to="/login" />;
}

/*
🧠 Summary:
- Use `<BrowserRouter>` once at the root level
- Wrap routes inside `<Routes>`
- Use `<Route>` for each page
- Use `<Link>` instead of `<a>` for in-app navigation
- Optional: Use `<Navigate />` to redirect programmatically
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 39 - useParams and useNavigate (React Router Hooks)

/*
🔷 React Router provides useful hooks to access route data and perform navigation:
✅ `useParams()` → get dynamic URL params  
✅ `useNavigate()` → programmatically navigate to another route
*/

/// ✅ Example 1: useParams – Read URL parameters

// URL: /user/ajay

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams(); // "ajay"

  return <h2>Welcome, {username}</h2>;
}

/// ✅ Setup Route with dynamic param

<Routes>
  <Route path="/user/:username" element={<UserProfile />} />
</Routes>

/// ✅ Example 2: useNavigate – Navigate in code

import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate('/dashboard'); // programmatically go to dashboard
  };

  return <button onClick={handleLogin}>Login</button>;
}

/// ✅ Example 3: Redirect with state

navigate('/profile', { state: { from: 'login' } });

/// ✅ Example 4: Back or Forward Navigation

navigate(-1); // Go back
navigate(1);  // Go forward

/*
🧠 Summary:
- `useParams()` reads dynamic parts of the URL (e.g. /user/:id)
- `useNavigate()` lets you navigate like history.push()
- Can use to redirect after login, onClick, form submit, etc.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 39 - useParams and useNavigate (React Router Hooks)

/*
🔷 React Router provides useful hooks to access route data and perform navigation:
✅ `useParams()` → get dynamic URL params  
✅ `useNavigate()` → programmatically navigate to another route
*/

/// ✅ Example 1: useParams – Read URL parameters

// URL: /user/ajay

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams(); // "ajay"

  return <h2>Welcome, {username}</h2>;
}

/// ✅ Setup Route with dynamic param

<Routes>
  <Route path="/user/:username" element={<UserProfile />} />
</Routes>

/// ✅ Example 2: useNavigate – Navigate in code

import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate('/dashboard'); // programmatically go to dashboard
  };

  return <button onClick={handleLogin}>Login</button>;
}

/// ✅ Example 3: Redirect with state

navigate('/profile', { state: { from: 'login' } });

/// ✅ Example 4: Back or Forward Navigation

navigate(-1); // Go back
navigate(1);  // Go forward

/*
🧠 Summary:
- `useParams()` reads dynamic parts of the URL (e.g. /user/:id)
- `useNavigate()` lets you navigate like history.push()
- Can use to redirect after login, onClick, form submit, etc.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 40 - Nested Routes in React Router

/*
🔷 What are Nested Routes?

Nested routes allow you to render components **inside other components**, matching a **parent/child path structure**.

Useful for:
✅ Layouts (Sidebar, Navbar)  
✅ Sections within a page (tabs, subpages)  
✅ Better route organization
*/

/// ✅ Example Setup: App with nested <Dashboard /> and child routes

// App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

/// ✅ Dashboard.jsx (must include <Outlet />)

import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Render nested child route here */}
    </div>
  );
}

/// ✅ Now these paths work:
- /dashboard → renders <Dashboard /> only
- /dashboard/profile → renders <Dashboard /> + <Profile />
- /dashboard/settings → renders <Dashboard /> + <Settings />

/*
🧠 Notes:
- Use `<Outlet />` where you want child components to appear
- Child route paths are **relative** to the parent
- This helps keep layouts reusable and structured
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 40 - Nested Routes in React Router

/*
🔷 What are Nested Routes?

Nested routes allow you to render components **inside other components**, matching a **parent/child path structure**.

Useful for:
✅ Layouts (Sidebar, Navbar)  
✅ Sections within a page (tabs, subpages)  
✅ Better route organization
*/

/// ✅ Example Setup: App with nested <Dashboard /> and child routes

// App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

/// ✅ Dashboard.jsx (must include <Outlet />)

import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Render nested child route here */}
    </div>
  );
}

/// ✅ Now these paths work:
- /dashboard → renders <Dashboard /> only
- /dashboard/profile → renders <Dashboard /> + <Profile />
- /dashboard/settings → renders <Dashboard /> + <Settings />

/*
🧠 Notes:
- Use `<Outlet />` where you want child components to appear
- Child route paths are **relative** to the parent
- This helps keep layouts reusable and structured
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 41 - Redirects and NotFound Pages in React Router

/*
🔷 React Router allows you to:
✅ Redirect users (e.g., after login)  
✅ Handle unknown routes with a 404 Not Found page
*/

/// ✅ Redirect using <Navigate />

import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ✅ Usage in route
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isLoggedIn={userLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

/// ✅ Navigate inside event handler (useNavigate)

import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate('/dashboard'); // programmatic redirect
  };

  return <button onClick={handleLogin}>Login</button>;
}

/// ✅ 404 NotFound Page (Catch-all route)

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

// ✅ Add this route at the end
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} /> {/* Catch-all */}
</Routes>

/*
🧠 Summary:
- Use `<Navigate />` to redirect based on conditions (like auth)
- Use `useNavigate()` for redirects inside JS logic
- Add `<Route path="*">` last to catch all unknown URLs for a 404 page
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 42 - Creating and Using Context in React (with useContext)

/*
🔷 React Context is used to **share global data** (like auth, theme, user info) across components **without prop drilling**.

Steps:
1️⃣ Create Context  
2️⃣ Provide the context value  
3️⃣ Consume the context using `useContext()`
*/

/// ✅ Step 1: Create Context

import { createContext, useState } from 'react';

export const AuthContext = createContext();

/// ✅ Step 2: Create a Provider Component

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/// ✅ Step 3: Use Provider in root (main.jsx or App.jsx)

import { AuthProvider } from './context/AuthContext';

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

/// ✅ Step 4: Access context with useContext()

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Please log in</p>
  );
}

/// ✅ Step 5: Log in using context

function LoginPage() {
  const { login } = useContext(AuthContext);

  return <button onClick={() => login("Ajay")}>Log In as Ajay</button>;
}

/*
🧠 Summary:
- `createContext()` defines the context
- Provider wraps your app and passes shared values
- `useContext()` reads the context from any child
- Context avoids deeply nested props and makes global state clean
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 43 - Updating Context Values in React

/*
🔷 To update context values, you usually provide **state-updating functions** inside the context value.

This allows any child component to:
✅ Read the current value  
✅ Call functions to update that value
*/

/// ✅ Example: Auth Context with state and updater

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/// ✅ Consuming and updating context in a child

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AuthStatus() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>You are not logged in.</p>
  );
}

function LoginButton() {
  const { login } = useContext(AuthContext);

  return <button onClick={() => login("Ajay")}>Login as Ajay</button>;
}

/*
🧠 Key Concept:
- Context value can contain state AND updater functions
- Any child component can trigger updates by calling those functions
- This is how React manages **global writable state** with Context API
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 44 - Sharing Global Data in React

/*
🔷 Global data is any value needed in **many components**:
✅ User authentication status  
✅ Theme settings (dark/light)  
✅ Language preferences  
✅ Shopping cart, profile, etc.

Instead of **prop drilling**, you can share global data with:
1️⃣ React Context + useContext  
2️⃣ Redux Toolkit (for large apps)
3️⃣ Zustand, Jotai, or Recoil (alternative lightweight stores)
*/

/// ✅ Option 1: React Context (built-in way)

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Consuming context in a child
function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// ✅ Wrap App with provider
function App() {
  return (
    <ThemeProvider>
      <ThemeToggler />
    </ThemeProvider>
  );
}

/// ✅ Option 2: Redux (for scalable apps)
// Redux gives central control of app-wide state.
// Not shown here – better for large/global complex states.

/*
🧠 Summary:
- For small/medium apps → useContext with React Context
- For large, complex apps → use Redux Toolkit or Zustand
- Avoid prop drilling by using providers and hooks
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 45 - Updating Context Values

/*
🔷 To update context values in React:
✅ Use `useState` or `useReducer` inside the context provider
✅ Expose updater functions (like `setUser`, `login`, `logout`)
✅ Access them using `useContext()` in any child
*/

/// ✅ Sample Context Setup

import { createContext, useState } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/// ✅ Sample usage in components

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  return <button onClick={() => login("Ajay")}>Login</button>;
}

function Profile() {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <>
      <p>Welcome {user.name}</p>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <p>Please login</p>
  );
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 46 - Controlled Inputs in React

/*
🔷 What are Controlled Inputs?

In React, a **controlled input** means:
✅ The input's value is controlled by React state  
✅ Changes are handled via `onChange` and `useState`

This gives you full control over the form elements.
*/

/// ✅ Example: Controlled Input with useState

import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value); // update state with input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

/// ✅ Multi-field Controlled Form

function ContactForm() {
  const [form, setForm] = useState({ email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      <textarea name="message" value={form.message} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}

/*
🧠 Summary:
- Controlled inputs are bound to React state
- Each keystroke updates state → re-renders input with latest value
- This is useful for:
  ✅ Validation
  ✅ Conditional rendering
  ✅ Dynamic form behavior
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 47 - Form Submission Handling in React

/*
📌 What happens when you submit a form?

In React, you usually:
✅ Prevent the default form submission  
✅ Read the current input values from state  
✅ Process or validate the data  
✅ Optionally reset the form
*/

/// ✅ Example: Basic Form Submission

import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    console.log('Form submitted:', formData);
    alert(`Hello, ${formData.name}! Your email is ${formData.email}`);
    setFormData({ name: '', email: '' }); // reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🧠 Notes:
- `e.preventDefault()` is critical to avoid page refresh
- You can reset the form using `setState` after submission
- Logs, alerts, and API calls usually happen in `handleSubmit`
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 48 - Validating Input Manually in React

/*
📌 Manual input validation means:
✅ You check form field values in JS logic (e.g. inside handleSubmit)
✅ Show custom error messages based on the condition
✅ Prevent form submission if inputs are invalid

This is useful for simple validation without using libraries.
*/

/// ✅ Example: Manual Validation on Form Submit

import { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (formData.name.trim() === '' || formData.email.trim() === '') {
      setError('All fields are required!');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // ✅ Submit the form
    alert(`Submitted: ${formData.name}, ${formData.email}`);
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🧠 Tips:
- Show errors conditionally using state
- Use `.trim()` to ignore whitespace
- Use `.includes('@')`, `.length`, or regex for email/phone validation
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 49 - Using Libraries: Formik / React Hook Form

/*
📌 Why use a form library?

Libraries like Formik and React Hook Form help:
✅ Handle form state easily  
✅ Add validation  
✅ Reduce boilerplate  
✅ Scale forms in large apps
*/

/// ✅ Option 1: Using Formik

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
  const initialValues = { name: '', email: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  const handleSubmit = (values) => {
    console.log('Submitted via Formik:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" component="p" />

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" component="p" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

/// ✅ Option 2: Using React Hook Form

import { useForm } from 'react-hook-form';

function RHForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted via React Hook Form:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Name is required' })} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^@]+@[^@]+\.[^@]+$/,
            message: 'Invalid email format'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

/*
🧠 Comparison:
- ✅ Formik → more setup, uses Yup for schema-based validation
- ✅ React Hook Form → less code, faster performance, easier integration

Use whichever matches your team’s style or project needs.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 50 - Error Messages and UX in React Forms

/*
📌 Why focus on error messages?

✅ Help users fix mistakes quickly  
✅ Improve form completion rate  
✅ Show feedback clearly and in context
*/

/// ✅ Example: Inline error messages (manual validation)

import { useState } from 'react';

function FormWithErrors() {
  const [form, setForm] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ email: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      setError('Email must include @');
      return;
    }
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

/// ✅ UX Enhancements

/*
✅ Use red for errors and green for success  
✅ Don't show errors on first load – only after user interacts  
✅ Use aria attributes for accessibility  
✅ Add real-time validation for better experience
*/

/// ✅ Example: Touch-based error with React Hook Form

import { useForm } from 'react-hook-form';

function RHFErrorUX() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', { required: 'Username is required' })}
        placeholder="Username"
      />
      {touchedFields.username && errors.username && (
        <p style={{ color: 'red' }}>{errors.username.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🧠 Tips for Great Form UX:
- Use simple messages ("Email is required")
- Delay error messages until after user touches or submits
- Highlight only the affected field
- Group errors near inputs, not in alert boxes
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 51 - Fetching Data with fetch() in React

/*
📌 Why fetch data?

✅ React apps often need to get data from APIs  
✅ You can use the built-in `fetch()` function to make HTTP requests

You usually fetch:
- Lists of users/posts
- Product info
- Auth responses
*/

/// ✅ Example: Fetching data in useEffect

import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // sample API
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []); // empty array → run only once on mount

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Notes:
- `fetch(url)` returns a Promise
- Always call `.json()` to parse response
- Always handle errors using `.catch()` or try/catch in async/await
- Use `useEffect()` to perform side effects (like fetching)
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 52 - Axios Integration in React

/*
📌 Why use Axios?

`axios` is a promise-based HTTP client that simplifies:
✅ Making API requests  
✅ Adding headers (like auth tokens)  
✅ Handling request/response interceptors  
✅ Better error handling than fetch
*/

/// ✅ Step 1: Install Axios
// npm install axios

/// ✅ Example: Basic Axios usage in useEffect

import { useEffect, useState } from 'react';
import axios from 'axios';

function AxiosUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error with Axios:', error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/// ✅ Axios with async/await

async function fetchUsers() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(response.data);
  } catch (error) {
    console.error('Axios Error:', error.message);
  }
}

/*
🧠 Axios Tips:
- `axios.get`, `axios.post`, `axios.put`, `axios.delete`
- Supports request/response interceptors
- Set global config: `axios.defaults.baseURL`, `axios.defaults.headers.common['Authorization']`
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 53 - useEffect with fetch()

/*
📌 Why combine useEffect with fetch?

✅ `useEffect` handles side-effects (like API calls)  
✅ It runs after the first render  
✅ You can trigger `fetch()` inside it to load data from APIs
*/

/// ✅ Example: Simple useEffect + fetch combo

import { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data.slice(0, 5)); // limit to 5 posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []); // run once when component mounts

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
        </li>
      ))}
    </ul>
  );
}

/*
🧠 Key Notes:
- Always use async function inside useEffect (can't mark useEffect async directly)
- Wrap API logic in `try-catch-finally` for better control
- `[]` ensures fetch runs only on first mount
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 54 - useState + useEffect Pattern for API Calls

/*
📌 This pattern is the most common in React for fetching API data:
✅ `useState` stores the data and loading/error states  
✅ `useEffect` performs the fetch when the component mounts  
✅ Clean structure, separates logic and display
*/

/// ✅ Example: useState + useEffect for fetching users

import { useEffect, useState } from 'react';

function APIUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Pattern Breakdown:
- `useState()` → stores data and states
- `useEffect()` → fetches on mount
- `try/catch/finally` → error and cleanup handling
- Optional: move fetch logic to custom hook for reusability
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 55 - Async/Await with API Calls in React

/*
📌 Why use async/await?

✅ Cleaner and more readable than `.then()`  
✅ Works great with `try/catch` for error handling  
✅ Perfect for use inside `useEffect` or event handlers
*/

/// ✅ Example: Async/await inside useEffect

import { useEffect, useState } from 'react';

function AsyncPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.slice(0, 5)); // Limit to 5 posts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}><strong>{post.title}</strong></li>
      ))}
    </ul>
  );
}

/// ✅ Example: Async/await in form submit handler

function LoginForm() {
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      alert(`Welcome, ${data.username}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Login</button>
    </form>
  );
}

/*
🧠 Tips:
- Use `await` with `.json()` to parse responses
- Always wrap `await` in `try/catch` to handle API failures
- Combine with `loading` and `error` state for smooth UX
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 56 - Loader and Error States in React

/*
📌 Why manage loader and error states?

✅ Improves user experience during API calls  
✅ Provides clear feedback when something goes wrong  
✅ Prevents UI from breaking due to undefined data
*/

/// ✅ Example: Full pattern with loader and error

import { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

/*
🧠 Best Practices:
- Use `loading` to show a spinner, skeleton, or loading text
- Show `error` only when one exists
- Use `try/catch/finally` to toggle states properly
- Keep UX clear: don't show stale data on failure
*/


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 57 - Lifting State Up in React

/*
📌 What is "Lifting State Up"?

✅ When two or more child components need to share the same state,  
✅ Move that state to their closest common parent  
✅ Pass the state & setter function down via props
*/

/// ✅ Example: Lifted state for syncing child components

import { useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Parent Count: {count}</h2>
      <ChildA count={count} />
      <ChildB count={count} onIncrement={() => setCount(count + 1)} />
    </>
  );
}

function ChildA({ count }) {
  return <p>Child A sees count: {count}</p>;
}

function ChildB({ count, onIncrement }) {
  return (
    <>
      <p>Child B sees count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </>
  );
}

/*
🧠 Why Lift State Up?
- Keeps a single source of truth
- Prevents mismatched values between components
- Promotes better data flow in the app
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 58 - Prop Drilling Problem in React

/*
📌 What is Prop Drilling?

When data (state or functions) is passed from a top-level component  
→ down through many intermediate components  
→ just to reach a deeply nested child.

🔴 This makes the code harder to maintain and understand.
*/

/// ✅ Example: Prop Drilling (3 layers just to send `theme`)

import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');
  return <Parent theme={theme} />;
}

function Parent({ theme }) {
  return <Child theme={theme} />;
}

function Child({ theme }) {
  return <DeepChild theme={theme} />;
}

function DeepChild({ theme }) {
  return <p>Theme: {theme}</p>;
}

/*
🧠 Problem:
- Even if intermediate components (Parent, Child) don't use `theme`,
  they still need to receive and pass it down.
- This is called "prop drilling".

✅ Better alternatives:
- React Context API
- State management tools (Redux, Zustand)
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 59 - Global State with React Context

/*
📌 Why use Context?

✅ Solves prop drilling by providing global access to state  
✅ Any component can read or update shared state directly  
✅ Best for theming, auth, user settings, language, etc.
*/

/// ✅ Step 1: Create a Context file

// ThemeContext.js
import { createContext, useState } from 'react';
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/// ✅ Step 2: Wrap your app with the provider

// App.js
import { ThemeProvider } from './ThemeContext';
import Main from './Main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;

/// ✅ Step 3: Use context in any component

// Main.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Main() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}

/*
🧠 Benefits of Context:
- Clean: avoids passing props manually
- Flexible: accessible from any depth
- Composable: can separate contexts (ThemeContext, AuthContext, etc.)

📦 Tip: Use Context only for truly shared global state.
For large apps with complex state, prefer Redux Toolkit or Zustand.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 60 - useReducer Hook in React

/*
📌 Why useReducer?

✅ Ideal for managing complex state logic  
✅ Better than useState when:
   - You have multiple related values
   - State updates depend on previous state
   - You want centralized state logic (like Redux)

🧠 Syntax:
const [state, dispatch] = useReducer(reducerFn, initialState);
*/

/// ✅ Example: useReducer for counter logic

import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>➕</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>➖</button>
      <button onClick={() => dispatch({ type: 'reset' })}>🔁 Reset</button>
    </>
  );
}

/*
🧠 useReducer Advantages:
- Cleaner state logic in one reducer function
- Action-driven updates (good for complex workflows)
- Looks and feels like Redux (great transition)

🧩 Tip:
- Combine useReducer + Context to build a basic global store.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 67 - Inline Styling in React

/*
📌 What is Inline Styling?

✅ You apply CSS directly inside JSX using the `style` prop  
✅ Takes an object with camelCased property names  
✅ Useful for dynamic styles or quick styling
*/

/// ✅ Example: Basic inline styles

function InlineStyledBox() {
  const boxStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '8px',
    color: 'darkblue',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  return <div style={boxStyle}>I am styled with inline CSS!</div>;
}

/// ✅ Example: Dynamic inline styles

function DynamicText({ isError }) {
  return (
    <p
      style={{
        color: isError ? 'red' : 'green',
        fontSize: '18px'
      }}
    >
      {isError ? 'There was an error!' : 'Everything is good ✅'}
    </p>
  );
}

/*
🧠 Tips:
- Always use camelCase for property names (e.g., `backgroundColor`, not `background-color`)
- Can be helpful for conditional styles or quick prototypes
- For long or reusable styles, prefer CSS Modules or styled-components
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 68 - CSS Modules in React

/*
📌 What are CSS Modules?

✅ CSS Modules let you scope styles to a specific component  
✅ Avoid global class name conflicts  
✅ Filename ends with `.module.css`  
✅ Classes are imported as JS objects
*/

/// ✅ Step 1: Create a CSS Module file
// File: Button.module.css

/*
.button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.button:hover {
  background-color: #0056b3;
}
*/

/// ✅ Step 2: Use the styles in a component

// File: Button.jsx
import styles from './Button.module.css';

function CustomButton({ label }) {
  return <button className={styles.button}>{label}</button>;
}

export default CustomButton;

/*
🧠 Key Points:
- `styles.button` refers to `.button` class from Button.module.css
- Styles are scoped → no conflicts with other components
- You can dynamically combine styles: `className={`${styles.btn} ${styles.active}`}`
- Works out-of-the-box with Vite, CRA, and Next.js
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 69 - Styled-components in React

/*
📌 What are styled-components?

✅ A CSS-in-JS library for styling React components  
✅ Write real CSS syntax inside JavaScript  
✅ Automatically scopes styles and supports dynamic props  
✅ No class name collisions
*/

/// ✅ Step 1: Install styled-components
// npm install styled-components

/// ✅ Step 2: Use styled-components

import styled from 'styled-components';

const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 10px #ccc;
  max-width: 300px;
  margin: auto;
`;

const Title = styled.h2`
  color: #333;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#007bff' : '#ccc')};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

function StyledCard() {
  return (
    <Card>
      <Title>Hello from styled-components</Title>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </Card>
  );
}

export default StyledCard;

/*
🧠 Why use styled-components?
- Styles live next to components
- Supports conditional styling with props
- No need for class names or separate CSS files
- Fully dynamic and theme-able

📦 Bonus: Supports theming, animations, media queries, and global styles
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 70 - Tailwind CSS in React

/*
📌 What is Tailwind CSS?

✅ A utility-first CSS framework  
✅ You style directly in className using small utility classes  
✅ No need to write custom CSS  
✅ Fast to build, easy to maintain

📦 Popular with React because:
- Works with CRA, Vite, Next.js, etc.
- Combines perfectly with component-based UI
*/

/// ✅ Step 1: Install Tailwind in your React project

// For Vite:
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p

// In tailwind.config.js → enable content scanning:
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

// In src/index.css → add base styles:
@tailwind base;
@tailwind components;
@tailwind utilities;

/// ✅ Step 2: Use Tailwind classes in JSX

function TailwindCard() {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Tailwind Card</h2>
      <p className="text-gray-600">This card is styled using Tailwind utility classes.</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
}

export default TailwindCard;

/*
🧠 Why Tailwind?
- Fast styling without leaving JSX
- Mobile-first & responsive utilities
- Custom themes with tailwind.config.js
- Huge plugin ecosystem (e.g., typography, forms)

✅ Tailwind is highly productive once you're familiar with the class names
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 71 - Classname Conditionals in React (clsx / classnames)

/*
📌 Why use classnames or clsx?

✅ Dynamically toggle CSS classes  
✅ Clean syntax instead of ternary chaos  
✅ Great with Tailwind or any CSS approach

📦 Popular Libraries:
- `clsx` → small, modern, zero-dependency
- `classnames` → widely used, similar syntax
*/

/// ✅ Step 1: Install one of them

// npm install clsx
// OR
// npm install classnames

/// ✅ Example using `clsx` with Tailwind

import clsx from 'clsx';

function Button({ isPrimary, disabled }) {
  const btnClass = clsx(
    'px-4 py-2 rounded font-semibold',
    {
      'bg-blue-600 text-white hover:bg-blue-700': isPrimary,
      'bg-gray-300 text-gray-700 cursor-not-allowed': disabled,
    }
  );

  return <button className={btnClass} disabled={disabled}>Click</button>;
}

/// ✅ Example using `classnames`

import cn from 'classnames';

function Alert({ type }) {
  const alertClass = cn('p-4 rounded', {
    'bg-red-100 text-red-800': type === 'error',
    'bg-green-100 text-green-800': type === 'success',
    'bg-yellow-100 text-yellow-800': type === 'warning',
  });

  return <div className={alertClass}>This is a {type} alert!</div>;
}

/*
🧠 Why it's useful:
- Clean conditional logic for classes
- Easier to read than nested ternaries
- Works with Tailwind, CSS Modules, global classes

💡 Bonus: You can use expressions and conditions directly inside `clsx()` or `classnames()`
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 72 - Smart vs Dumb Components in React

/*
📌 What are Smart vs Dumb Components?

✅ Smart Component (Container):
- Handles logic, state, side effects, API calls
- Passes data down to dumb components
- Often connected to Context, Redux, etc.

✅ Dumb Component (Presentational):
- Focuses only on UI
- Receives data via props
- Doesn't manage state (except maybe local UI states)
*/

/// ✅ Example: Smart (Container) + Dumb (UI) split

// SmartComponent.jsx
import { useEffect, useState } from 'react';
import UserList from './UserList';

function SmartComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.slice(0, 3)));
  }, []);

  return <UserList users={users} />;
}

/// ✅ DumbComponent.jsx (UserList)

function UserList({ users }) {
  return (
    <ul style={{ fontFamily: 'monospace' }}>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default UserList;

/*
🧠 Why separate them?
- Improves reusability and testing
- Makes logic easier to debug and reason about
- Encourages clean UI vs data separation

📦 Tip: 
- Use hooks in Smart components, not in Dumb ones.
- Use Dumb components for display, forms, cards, etc.
*/




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 73 - Container vs Presentational Components

/*
📌 Difference Between Container vs Presentational Components

✅ Container Component:
- Handles logic, state, side effects
- Fetches data, manages events
- Sends data down via props

✅ Presentational Component:
- Only displays UI
- Pure function of props
- No side effects or API calls
*/

/// ✅ Container: manages logic

// ProductContainer.jsx
import { useEffect, useState } from 'react';
import ProductList from './ProductList';

function ProductContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=3')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return <ProductList items={products} />;
}

export default ProductContainer;

/// ✅ Presentational: handles display

// ProductList.jsx
function ProductList({ items }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {items.map((p) => (
        <div key={p.id} style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <h4>{p.title}</h4>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

/*
🧠 Summary:
- Keep Container components smart: stateful and logic-heavy
- Keep Presentational components clean, focused on layout
- Makes testing and reusability much easier
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 74 - Folder Structure for Scaling React Projects

/*
📌 Why a good folder structure matters?

✅ Easier to scale and maintain  
✅ Encourages separation of concerns  
✅ Makes team collaboration smoother  
✅ Helps manage features as your app grows
*/

/// ✅ Recommended scalable folder structure

src/
├── assets/               // images, icons, fonts
├── components/           // reusable dumb UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   └── ...
├── features/             // feature-specific logic + UI
│   ├── auth/
│   │   ├── AuthPage.jsx
│   │   ├── authSlice.js
│   │   └── LoginForm.jsx
│   ├── products/
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   └── productAPI.js
│   └── ...
├── hooks/                // custom hooks (e.g., useAuth, useDebounce)
│   └── useFetch.js
├── context/              // React Context providers
│   └── ThemeContext.js
├── store/                // Redux slices, store.js
│   ├── store.js
│   └── productSlice.js
├── pages/                // route-level components (React Router)
│   ├── Home.jsx
│   └── Profile.jsx
├── routes/               // route definitions
│   └── AppRoutes.jsx
├── utils/                // helper functions, constants
│   ├── formatPrice.js
│   └── constants.js
├── App.jsx               // root component
├── main.jsx              // entry point
└── index.css             // global styles

/*
🧠 Tips:
- Group by "features" not just "type" for better scalability
- Keep small reusable components in `/components`
- Use folders per feature inside `/features` to avoid chaos
- Don’t over-optimize for small projects, but plan for growth
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 75 - Custom Hooks and Separation of Logic in React

/*
📌 Why create custom hooks?

✅ Reuse logic across components  
✅ Keep components clean and focused on rendering  
✅ Extract side effects, API calls, listeners, etc.

🧠 Rule: A custom hook is just a function that starts with "use"
*/

/// ✅ Example: Custom hook for fetching data

// hooks/useFetch.js
import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
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

export default useFetch;

/// ✅ How to use the custom hook in a component

// components/UserList.jsx
import useFetch from '../hooks/useFetch';

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Tips:
- Custom hooks make components smaller and easier to read
- You can pass parameters into hooks (like URLs, debounce time, etc.)
- Hooks can even return functions or handle complex logic (e.g., useAuth, useCart)

💡 Rule: Only call hooks inside other hooks or components – never inside normal functions
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 75 - Custom Hooks and Separation of Logic in React

/*
📌 Why create custom hooks?

✅ Reuse logic across components  
✅ Keep components clean and focused on rendering  
✅ Extract side effects, API calls, listeners, etc.

🧠 Rule: A custom hook is just a function that starts with "use"
*/

/// ✅ Example: Custom hook for fetching data

// hooks/useFetch.js
import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
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

export default useFetch;

/// ✅ How to use the custom hook in a component

// components/UserList.jsx
import useFetch from '../hooks/useFetch';

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/*
🧠 Tips:
- Custom hooks make components smaller and easier to read
- You can pass parameters into hooks (like URLs, debounce time, etc.)
- Hooks can even return functions or handle complex logic (e.g., useAuth, useCart)

💡 Rule: Only call hooks inside other hooks or components – never inside normal functions
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 76 - Testing Basics with Jest in React

/*
📌 Why use Jest?

✅ Jest is the most popular testing framework for JavaScript  
✅ Built-in support for mocking, assertions, test runners  
✅ Often used with React Testing Library for component testing
*/

/// ✅ Step 1: Install Jest (already included in CRA, Vite + Vitest for alternatives)

// For Vite users (recommended alternative):
// npm install --save-dev vitest

// For Create React App:
// Already comes with Jest configured!

/// ✅ Step 2: Basic test file structure

// Example: math.js
export const add = (a, b) => a + b;

// Example: math.test.js
import { add } from './math';

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

/// ✅ Step 3: Run the tests

// For CRA:
// npm test

// For Vite + Vitest:
// npx vitest run

/*
🧠 Test Structure:
- `test()` or `it()` defines a test case
- `expect()` defines the assertion
- `.toBe()`, `.toEqual()`, `.toContain()`, etc. check conditions

📦 Tip: Put test files next to your code OR inside a `/__tests__/` folder

✅ Testing React Components? Use React Testing Library with Jest (next lesson)
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 77 - React Testing Library (RTL) Basics

/*
📌 What is React Testing Library?

✅ Library for testing React components in a way that mimics user behavior  
✅ Works with Jest to make assertions on what is rendered  
✅ Encourages testing from the user's perspective
*/

/// ✅ Step 1: Install React Testing Library (if not in CRA)

// npm install --save-dev @testing-library/react @testing-library/jest-dom

/// ✅ Step 2: Simple Component to Test

// File: Greet.jsx
export function Greet({ name }) {
  return <h1>Hello, {name ? name : 'Guest'}!</h1>;
}

/// ✅ Step 3: Writing a test for this component

// File: Greet.test.jsx
import { render, screen } from '@testing-library/react';
import { Greet } from './Greet';
import '@testing-library/jest-dom';

test('renders default greeting', () => {
  render(<Greet />);
  expect(screen.getByText('Hello, Guest!')).toBeInTheDocument();
});

test('renders personalized greeting', () => {
  render(<Greet name="Ajay" />);
  expect(screen.getByText('Hello, Ajay!')).toBeInTheDocument();
});

/*
🧠 What did we use?
- `render()` mounts the component in a virtual DOM
- `screen.getByText()` finds visible elements
- `expect(...).toBeInTheDocument()` comes from `@testing-library/jest-dom`

🧪 Bonus Tip:
- You can test input, clicks, forms, and async behavior too with `fireEvent` or `userEvent`

✅ RTL is great for writing tests that simulate how users interact with your app.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


// ✅ 78 - Unit Testing React Components (with Jest + RTL)

/*
📌 What is Unit Testing?

✅ Unit tests verify that individual components or functions work correctly  
✅ Helps catch bugs early and improve confidence during refactoring  
✅ In React, we unit test components using React Testing Library (RTL) + Jest
*/

/// ✅ Example: Simple Button Component

// File: ToggleButton.jsx
import { useState } from 'react';

export function ToggleButton() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide' : 'Show'}
      </button>
      {visible && <p data-testid="message">Hello, I am visible!</p>}
    </div>
  );
}

/// ✅ Writing Unit Tests

// File: ToggleButton.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from './ToggleButton';
import '@testing-library/jest-dom';

test('button toggles message visibility', () => {
  render(<ToggleButton />);

  // Message should not be in the DOM initially
  expect(screen.queryByTestId('message')).not.toBeInTheDocument();

  // Click to show the message
  fireEvent.click(screen.getByText('Show'));
  expect(screen.getByTestId('message')).toBeInTheDocument();

  // Click to hide the message
  fireEvent.click(screen.getByText('Hide'));
  expect(screen.queryByTestId('message')).not.toBeInTheDocument();
});

/*
🧠 Key Concepts Used:
- `fireEvent.click()` simulates a user clicking
- `queryByTestId()` doesn't throw error if element is missing (useful for visibility tests)
- `toBeInTheDocument()` from jest-dom helps with assertions

✅ This is a true "unit test" because we’re testing one small component in isolation.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 79 - Mocking API Requests in React Testing (Jest + RTL)

/*
📌 Why Mock API Requests?

✅ Prevents real network calls during tests  
✅ Gives full control over API responses  
✅ Helps simulate success, error, and loading states
*/

/// ✅ Component That Fetches Data

// File: UserList.jsx
import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=2')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

/// ✅ Test with Mocked Fetch

// File: UserList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './UserList';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up after each test
});

test('renders users from mocked fetch', async () => {
  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});

/*
🧠 Key Concepts:
- `jest.fn()` mocks any function (like fetch)
- `waitFor()` waits for async DOM changes
- Mocking avoids real HTTP calls in tests

✅ Also useful for testing loading states, error messages, retry logic, etc.
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// ✅ 80 - Memoization with React.memo in React

/*
📌 What is React.memo?

✅ `React.memo` is a Higher Order Component (HOC) that prevents unnecessary re-renders  
✅ It only re-renders a component if its props change  
✅ Great for optimizing performance in large lists or heavy UI components
*/

/// ✅ Example: Without React.memo

function Child({ name }) {
  console.log('👶 Child re-rendered');
  return <p>Hello, {name}</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <Child name="Ajay" />
    </div>
  );
}

/// ❌ Even though the `name` prop hasn't changed, <Child /> re-renders every time!

/// ✅ Optimized with React.memo

const MemoChild = React.memo(function MemoChild({ name }) {
  console.log('✨ MemoChild re-rendered');
  return <p>Hello, {name}</p>;
});

function MemoParent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <MemoChild name="Ajay" />
    </div>
  );
}

/*
🧠 Summary:
- Use `React.memo` to prevent re-renders when props don’t change
- Only works for **function components**
- Deep objects or inline functions can still cause re-renders (fix with `useMemo`, `useCallback`)

💡 Bonus:
- Combine `React.memo` with `useMemo`, `useCallback` for best results in nested components or big UIs
*/



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


