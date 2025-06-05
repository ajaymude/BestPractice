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
/////////////////////////////////////////////////////////////////////////










// 01 - installation 
// npm create vite@latest
// npm create vite@latest foldername -- --template  react 



// 02 - component





// 03 - data 
// create a data for the list like nav list or link this can make your code cleaner 
// always map your data , don't hard code every time 




// 04 - short circuit 

function WelcomeMessage({ isLoggedIn }) {
    return (
      <div>
        <h1>Welcome to the App</h1>
        {isLoggedIn && <p>You are logged in!</p>}
      </div>
    );
  }

  

function Greeting({ name }) {
  return <h1>Hello, {name || "Guest"}!</h1>;
}



//Short-Circuit vs Ternary (? :)
{isLoggedIn ? <p>You are logged in!</p> : <p>Please log in.</p>}

