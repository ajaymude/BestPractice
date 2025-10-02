
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




///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////




// Topic 72: Smart vs Dumb Components – Detailed Notes and Code Examples
//
// Separating components into "Smart" (container) and "Dumb" (presentational)
// improves maintainability, reusability, and testability. Dumb components focus on UI,
// while Smart components handle state and logic.
//
// Key Concepts:
// 1. Dumb (Presentational) Components:
//    • Receive data and callbacks via props.
//    • No internal state (except UI state like hover), no side effects.
//    • Easy to reuse and test.
//
// 2. Smart (Container) Components:
//    • Manage state, perform data fetching, handle business logic.
//    • Pass props to Dumb components.
//    • Often connected to Redux or context.
//
// 3. Benefits:
//    • Clear separation of concerns.
//    • Presentational components remain pure and focused on rendering.
//    • Container components orchestrate data flow.
//
// Example: UserList
// Dumb Component: purely renders UI
import React from 'react';

export function UserList({ users, onSelect }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Smart Component: manages state and logic
import { useState, useEffect } from 'react';
import { UserList } from './UserList';

export function UserListContainer({ apiUrl }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, [apiUrl]);

  const handleSelect = user => setSelectedUser(user);

  return (
    <div>
      <h2>Select a User</h2>
      <UserList users={users} onSelect={handleSelect} />
      {selectedUser && <p>Selected: {selectedUser.name}</p>}
    </div>
  );
}

// Example: ToggleButton
// Dumb
export function ToggleButton({ on, onToggle }) {
  return (
    <button onClick={onToggle}>
      {on ? 'ON' : 'OFF'}
    </button>
  );
}

// Smart
import React, { useState } from 'react';
import { ToggleButton } from './ToggleButton';

export function ToggleButtonContainer() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(prev => !prev);

  return <ToggleButton on={on} onToggle={toggle} />;
}

// Notes:
// • Dumb components are often functional components that accept props.
// • Container components may be classes or hooks-based functional components.
// • Test dumb components by rendering with mock props.
// • Keep containers thin: delegate UI to presentational child components.



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Topic 73: Container vs Presentational Components – Detailed Notes and Code Examples
//
// Differentiating between Container (Smart) and Presentational (Dumb) components
// promotes separation of concerns, reusability, and testability in React applications.
// Presentational components focus solely on UI, while Container components
// manage data fetching, state, and business logic.
//
// Key Principles:
// 1. Presentational Components:
//    • Receive data and callbacks strictly via props.
//    • Generally stateless, except for UI-specific state (e.g., hover, open/closed).
//    • No side effects or subscriptions in life cycle.
//    • Easily reusable and unit-testable.
//
// 2. Container Components:
//    • Handle state management, data fetching, subscriptions, and event handling.
//    • May connect to Redux, Context, or other stores.
//    • Pass required data and handlers down to Presentational components.
//
// 3. Benefits:
//    • Clear separation of UI and logic.
//    • Simplifies testing: render Presentational components with mocked props.
//    • Encourages code reuse and maintainable codebase.
//
// Example 1: Presentational UserList
import React from 'react';

export function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Container UserListContainer
import React, { useState, useEffect } from 'react';
import { UserList } from './UserList';

export function UserListContainer({ apiEndpoint }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, [apiEndpoint]);

  const handleUserClick = user => setSelected(user);

  return (
    <div>
      <h2>Select a User</h2>
      <UserList users={users} onUserClick={handleUserClick} />
      {selected && <p>Selected: {selected.name}</p>}
    </div>
  );
}

// Example 2: Presentational Toggle
export function Toggle({ isOn, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

// Container ToggleContainer
import React, { useState } from 'react';
import { Toggle } from './Toggle';

export function ToggleContainer() {
  const [isOn, setIsOn] = useState(false);
  return <Toggle isOn={isOn} onToggle={() => setIsOn(prev => !prev)} />;
}

// Notes:
// • Presentational components should avoid imports of state management or hooks.
// • Container components encapsulate all data mutations and side effects.
// • Compose multiple Presentational components within a single Container as needed.
// • In larger apps, container components can be linked via routing or connected to stores.
// • Favor functional components and hooks for both Container and Presentational roles.


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 74: Folder Structure for Scaling React Applications – Detailed Notes and Example Layout
//
// A well-organized folder structure scales with app complexity, improves
// maintainability, and streamlines collaboration. Below is a flexible pattern
// suitable for medium to large React projects.
//
// 1. src/
//    ├── assets/           # Images, fonts, icons
//    ├── components/       # Reusable presentational components
//    │   ├── Button/
//    │   │   ├── Button.jsx
//    │   │   └── Button.module.css
//    │   └── ...
//    ├── containers/       # Smart/container components
//    │   ├── UserListContainer/
//    │   │   ├── index.jsx
//    │   │   └── useUsers.js     # Custom hook for data fetching
//    │   └── ...
//    ├── contexts/         # React Context providers
//    │   └── ThemeContext.js
//    ├── hooks/            # Reusable custom hooks
//    │   └── useApi.js
//    ├── pages/            # Route-level components
//    │   ├── HomePage/
//    │   │   ├── index.jsx
//    │   │   └── HomePage.module.css
//    │   └── ...
//    ├── services/         # API services and clients (e.g., axios instances)
//    │   └── apiClient.js
//    ├── store/            # Redux or state management setup
//    │   ├── slices/
//    │   └── store.js
//    ├── styles/           # Global styles, variables, tailwind config
//    │   └── globals.css
//    ├── utils/            # Utility functions and helpers
//    │   └── formatDate.js
//    ├── App.jsx           # Root component with routing
//    ├── index.jsx         # Entry point
//    └── reportWebVitals.js
//
// Example: src/components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

export function Button({ children, onClick, className }) {
  return (
    <button
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Example: src/containers/UserListContainer/useUsers.js
import { useState, useEffect } from 'react';

export function useUsers(apiEndpoint) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [apiEndpoint]);

  return { users, loading, error };
}

// Notes:
// • Group by feature/domain rather than by type for large apps: e.g., src/features/user/
// • Co-locate related files (component, styles, tests) for easy navigation.
// • Use index.js entry files for cleaner imports: import { Button } from 'components/Button';
// • Centralize shared constants and configs in appropriate folders (services, utils).
// • Adapt structure to team preferences; consistency is key.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 75: Custom Hooks and Separation of Logic – Detailed Notes and Code Examples
//
// Custom hooks encapsulate reusable stateful logic, promoting separation of concerns
// and cleaner component code. By extracting logic into hooks, components focus
// on rendering while hooks manage behavior and data.
//
// Key Principles:
// 1. Naming Convention:
//    • Hook names must begin with “use” (e.g., useAuth, useFetch). This enforces
//      the Rules of Hooks and enables linting.
//
// 2. Separation of Concerns:
//    • Components call hooks for data and actions; hooks handle state, effects,
//      and logic, keeping components declarative and concise.
//
// 3. Composability:
//    • Hooks can call other hooks, allowing complex behaviors to be built from
//      simpler hooks (e.g., usePaginatedFetch uses useFetch and usePagination).
//
// 4. Testability:
//    • Custom hooks can be tested in isolation using @testing-library/react-hooks
//      by rendering the hook and asserting state transitions.
//
// 5. Parameters & Return Values:
//    • Hooks accept parameters to configure behavior.
//    • Return arrays or objects to expose state values and functions, mirroring
//      useState signature for familiarity.
//

// Example 1: useFetch – Data fetching logic in a hook
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(json => isMounted && setData(json))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}

// Usage in component:
// const { data, loading, error } = useFetch('/api/items');

// Example 2: useToggle – Simple toggle state logic
import { useState, useCallback } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Usage:
// const [isOpen, toggleOpen] = useToggle();

// Example 3: useForm – Form state and validation logic
import { useState, useCallback } from 'react';

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (validate) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  }, [validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, handleChange, resetForm };
}

// Usage:
// const validate = (name, value) => name === 'email' && !value.includes('@') ? 'Invalid email' : '';
// const { values, errors, handleChange, resetForm } = useForm({ email: '', password: '' }, validate);

// Example 4: Composing Hooks – usePaginatedFetch
export function usePaginatedFetch(baseUrl, pageSize) {
  const [page, setPage] = useState(1);
  const url = `${baseUrl}?_page=${page}&_limit=${pageSize}`;
  const { data, loading, error } = useFetch(url);

  const next = () => setPage(p => p + 1);
  const prev = () => setPage(p => Math.max(p - 1, 1));

  return { data, loading, error, page, next, prev };
}

// Notes:
// • Encapsulate API calls, toggle logic, form handling, and pagination in hooks.
// • Keep hooks focused: each hook should have a single responsibility.
// • Use TypeScript generics or PropTypes to type-check hook inputs and outputs.
// • Extract complex conditional or effect logic into custom hooks to DRY code across components.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Topic 76: Testing Basics with Jest – Detailed Notes and Code Examples
//
// Jest is a popular JavaScript testing framework that supports unit, integration,
// and snapshot testing. It works out of the box with React, providing test runners,
// assertion libraries, and mock utilities.
//
// Key Concepts:
// 1. Installation:
//    • npm install --save-dev jest @testing-library/react @testing-library/jest-dom
//    • Add "test": "jest" script to package.json
//
// 2. Test File Naming:
//    • Use .test.js or .spec.js suffix: e.g., sum.test.js, App.spec.jsx
//    • Place alongside code or in __tests__ folders
//
// 3. Writing Tests:
//    • Use describe blocks to group tests
//    • Test cases use test or it functions
//    • Assertions via expect API
//
// 4. Mocking:
//    • jest.fn() for function mocks
//    • jest.mock('module') to mock imports
//
// 5. Testing React Components:
//    • Render components with @testing-library/react's render
//    • Query elements via screen methods (getByText, getByRole)
//    • Simulate events with fireEvent or userEvent
//
// Example 1: Testing a Pure Function (sum.js)
// // sum.js
// export function sum(a, b) {
//   return a + b;
// }
//
// // sum.test.js
import { sum } from './sum';

describe('sum function', () => {
  test('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
  });
});

// Example 2: Testing a React Component (Button.jsx)
// // Button.jsx
// import React from 'react';
// export function Button({ onClick, children }) {
//   return <button onClick={onClick}>{children}</button>;
// }
//
// // Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with text and responds to click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Example 3: Snapshot Testing (App.jsx)
// // App.jsx
// import React from 'react';
// export function App() {
//   return <div><h1>My App</h1></div>;
// }
//
// // App.test.jsx
import React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';

describe('App snapshot', () => {
  test('matches snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Notes:
// • Use jest.config.js to customize Jest settings if needed.
// • jest-dom adds custom matchers for DOM assertions (toBeVisible, toHaveTextContent).
// • userEvent from @testing-library/user-event offers high-level event simulation.
// • Organize tests by feature or component for clarity.
// • Run tests with coverage: jest --coverage to ensure sufficient test coverage.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Topic 77: React Testing Library – Detailed Notes and Code Examples
//
// React Testing Library (RTL) is a lightweight testing utility that focuses on
// testing components from the user’s perspective. It encourages writing tests
// that resemble how users interact with your app.
//
// Key Concepts:
// 1. Installation:
//    • npm install --save-dev @testing-library/react @testing-library/jest-dom
//    • Optionally @testing-library/user-event for more realistic event simulation
//
// 2. Query Methods:
//    • getBy: throws an error if not found (e.g., getByRole, getByText)
//    • queryBy: returns null if not found, useful for asserting absence
//    • findBy: async variant for elements appearing later
//    • getAllBy / queryAllBy / findAllBy for multiple elements
//
// 3. Render and Cleanup:
//    • render(<Component />) mounts component and returns utility methods
//    • cleanup automatically runs between tests to unmount components
//
// 4. Assertions:
//    • Use jest-dom matchers: toBeInTheDocument, toHaveTextContent, toBeVisible, etc.
//
// 5. Event Simulation:
//    • fireEvent: low-level events (click, change)
//    • userEvent: high-level interactions (type, click) with focus and delay
//
// Example 1: Basic Rendering and Query
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// MyComponent.jsx
// export function MyComponent() {
//   return <h1>Hello, World!</h1>;
// }

// MyComponent.test.jsx
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  test('renders greeting', () => {
    render(<MyComponent />);
    const heading = screen.getByRole('heading', { name: /hello, world!/i });
    expect(heading).toBeInTheDocument();
  });
});

// Example 2: Form Interaction
import userEvent from '@testing-library/user-event';

// LoginForm.jsx
// export function LoginForm({ onSubmit }) {
//   return (
//     <form onSubmit={e => { e.preventDefault(); onSubmit({ username: e.target.username.value }); }}>
//       <label htmlFor="username">Username</label>
//       <input id="username" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// LoginForm.test.jsx
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('submits username', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/username/i), 'alice');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ username: 'alice' });
  });
});

// Example 3: Asynchronous Behavior
// AsyncComponent.jsx
// export function AsyncComponent() {
//   const [data, setData] = React.useState(null);
//   React.useEffect(() => { setTimeout(() => setData('Loaded'), 500); }, []);
//   return <div>{data || 'Loading...'}</div>;
// }

// AsyncComponent.test.jsx
import { AsyncComponent } from './AsyncComponent';

describe('AsyncComponent', () => {
  test('displays loaded data', async () => {
    render(<AsyncComponent />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    const loaded = await screen.findByText(/loaded/i);
    expect(loaded).toBeInTheDocument();
  });
});

// Notes:
// • Prefer queries by role, label, placeholder, text to mirror user interactions.
// • Use userEvent over fireEvent for realistic events.
// • Avoid implementation details; test how components behave, not internals.
// • Use async findBy* for waiting on async UI updates.
// • Organize tests by component, and use descriptive test names.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 78: Unit Testing Components – Detailed Notes and Code Examples
//
// Unit testing React components verifies their isolated behavior and rendering.
// Using Jest and React Testing Library, focus on input, output, and interactions.
//
// Key Concepts:
// 1. Render Component:
//    • Use render() from RTL to mount component.
//    • Destructure utilities: const { getByText, getByRole } = render(<Comp />).
// 2. Props and State:
//    • Pass props to simulate different states.
//    • Test conditional rendering based on props.
// 3. Events and Callbacks:
//    • Use userEvent or fireEvent to trigger user interactions.
//    • Assert callback functions are called with expected args.
// 4. Snapshot Testing:
//    • Use renderer.create(<Comp />).toJSON() to capture UI structure.
//    • toMatchSnapshot() detects unintended UI changes.
// 5. Mocking Dependencies:
//    • jest.mock() to stub modules or hooks.
//    • jest.fn() to spy on functions or simulate implementations.
//
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

// Example Component: Counter.jsx
// export function Counter({ initial = 0, onChange }) {
//   const [count, setCount] = React.useState(initial);
//   const increment = () => { setCount(c => c + 1); onChange?.(count + 1); };
//   const decrement = () => { setCount(c => c - 1); onChange?.(count - 1); };
//   return (
//     <div>
//       <button aria-label="decrement" onClick={decrement}>-</button>
//       <span>{count}</span>
//       <button aria-label="increment" onClick={increment}>+</button>
//     </div>
//   );
// }

// Counter.test.jsx
describe('Counter component', () => {
  test('renders with initial value and updates on click', () => {
    const handleChange = jest.fn();
    render(<Counter initial={5} onChange={handleChange} />);

    const countDisplay = screen.getByText('5');
    expect(countDisplay).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('increment'));
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(6);

    userEvent.click(screen.getByLabelText('decrement'));
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<Counter initial={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Notes:
// • Test both UI updates and callback invocations.
// • Use aria-label or role to query buttons for accessibility.
// • Snapshot tests ensure UI structure remains consistent.
// • Mock functions via jest.fn() to inspect interactions.
// • For hooks or context, wrap render with providers or mock implementations.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 79: Mocking API Requests – Detailed Notes and Code Examples
//
// Mocking API requests in tests allows you to simulate network responses,
// control data flows, and test error handling paths without real HTTP calls.
// Common approaches include mocking fetch, Axios, or using MSW (Mock Service Worker).
//
// Key Concepts:
// 1. jest.fn() and jest.mock():
//    • Use jest.mock('module') to replace entire modules (e.g., axios).
//    • Use jest.fn() to create mock functions for fetch or API client calls.
//
// 2. Global fetch Mocking:
//    • Override global.fetch with a jest.fn() returning mocked Response objects.
//    • Example: global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => data });
//
// 3. Axios Mocking:
//    • jest.mock('axios') and configure axios.get/post to resolve or reject.
//
// 4. MSW (Mock Service Worker):
//    • Intercept network requests at the network level with realistic handlers.
//    • Setup in tests with server.listen(), server.resetHandlers(), server.close().
//
// Example 1: Mocking global.fetch in a React component test
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component: FetchData.jsx
// export function FetchData({ url }) {
//   const [data, setData] = React.useState(null);
//   React.useEffect(() => {
//     fetch(url)
//       .then(res => res.json())
//       .then(setData);
//   }, [url]);
//   return <div>{data ? data.message : 'Loading...'}</div>;
// }

import { FetchData } from './FetchData';

describe('FetchData component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('displays fetched data on success', async () => {
    const mockData = { message: 'Hello from API' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<FetchData url="/api/message" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/hello from api/i)).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith('/api/message');
  });

  test('handles fetch failure', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    render(<FetchData url="/api/fail" />);

    await waitFor(() => expect(screen.getByText('Error: 500')).toBeInTheDocument());
  });
});

// Example 2: Mocking Axios in tests
import axios from 'axios';
import { getUser } from './apiClient'; // function that calls axios.get('/user')

jest.mock('axios');

describe('getUser API client', () => {
  test('returns user data on success', async () => {
    const user = { id: 1, name: 'Alice' };
    axios.get.mockResolvedValue({ data: user });

    const result = await getUser(1);
    expect(result).toEqual(user);
    expect(axios.get).toHaveBeenCalledWith('/user/1');
  });

  test('throws error on failure', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    await expect(getUser(1)).rejects.toThrow('Network Error');
  });
});

// Example 3: Using MSW for request interception
// setupTests.js
// import { server } from './mocks/server';
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// handlers.js
// import { rest } from 'msw';
// export const handlers = [
//   rest.get('/api/message', (req, res, ctx) => {
//     return res(ctx.json({ message: 'Mocked by MSW' }));
//   }),
// ];

// Notes:
// • Choose fetch/axios mocking for simple cases; use MSW for end-to-end-like tests.
// • Always reset mocks between tests to avoid state leakage.
// • Test both success and error paths for robust coverage.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 80: Memoization with React.memo – Detailed Notes and Code Examples
//
// React.memo is a higher-order component that memoizes functional components,
// preventing unnecessary re-renders when props have not changed. Coupled with
// useCallback and useMemo hooks, it optimizes rendering performance.
//
// Key Concepts:
// 1. React.memo:
//    • Wrap a component: export const MyComponent = React.memo(function MyComponent(props) { ... });
//    • Shallowly compares props; re-renders only when props change.
//
// 2. useCallback:
//    • Memoizes callback functions to avoid changing prop references.
//    • Syntax: const memoizedCallback = useCallback(() => { ... }, [deps]);
//
// 3. useMemo:
//    • Memoizes computed values to prevent expensive recalculations.
//    • Syntax: const memoizedValue = useMemo(() => computeExpensive(), [deps]);
//
// 4. Custom comparison:
//    • Pass a custom equality function: React.memo(Component, areEqual)
//    • Example: areEqual(prevProps, nextProps) -> boolean
//
// Example 1: Basic React.memo
import React from 'react';

function Display({ value }) {
  console.log('Display render');
  return <div>Value: {value}</div>;
}
export const MemoizedDisplay = React.memo(Display);

// Usage:
// <MemoizedDisplay value={count} />
// Renders only when `count` changes.

// Example 2: Using useCallback to stabilize handlers
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, label }) => {
  console.log('Button render:', label);
  return <button onClick={onClick}>{label}</button>;
});

export function Counter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);

  return (
    <div>
      <Button onClick={decrement} label="-" />
      <span>{count}</span>
      <Button onClick={increment} label="+" />
    </div>
  );
}

// Example 3: useMemo for expensive calculation
import React, { useState, useMemo } from 'react';

function Expensive({ num }) {
  const result = useMemo(() => {
    console.log('Computing expensive value');
    let acc = 0;
    for (let i = 0; i < num * 1000000; i++) acc += i;
    return acc;
  }, [num]);
  return <div>Expensive Result: {result}</div>;
}
export const MemoizedExpensive = React.memo(Expensive);

// Example 4: Custom comparison function
import React from 'react';

function Profile({ user }) {
  console.log('Profile render');
  return <div>{user.name}</div>;
}

function areEqual(prevProps, nextProps) {
  return prevProps.user.id === nextProps.user.id;
}

export const MemoizedProfile = React.memo(Profile, areEqual);

// Notes:
// • Wrap components with React.memo to prevent re-renders on unchanged props.
// • Use useCallback and useMemo to stabilize references and values.
// • For deep prop comparisons, provide a custom areEqual function.
// • Avoid overusing memoization; measure performance benefits before applying.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 81: useMemo and useCallback – Detailed Notes and Code Examples
//
// The useMemo and useCallback hooks optimize performance by memoizing values
// and functions, preventing unnecessary recalculations and re-creations on re-renders.
//
// Key Concepts:
// 1. useMemo:
//    • Memoizes a computed value.
//    • Syntax: const memoizedValue = useMemo(() => computeExpensive(), [deps]);
//    • Only recomputes when dependencies change.
//
// 2. useCallback:
//    • Memoizes a function definition.
//    • Syntax: const memoizedFn = useCallback(() => { doSomething(); }, [deps]);
//    • Returns same function reference unless dependencies change.
//
// Benefits:
// • Prevents expensive operations on every render.
// • Stabilizes callback props passed to memoized child components.
// • Reduces unnecessary re-renders in deep component trees.
//
// Example 1: Basic useMemo for Expensive Calculation
import React, { useState, useMemo } from 'react';

export function ExpensiveComputation({ num }) {
  const computed = useMemo(() => {
    console.log('Running expensive calculation');
    let total = 0;
    for (let i = 0; i < num * 1000000; i++) {
      total += i;
    }
    return total;
  }, [num]);

  return <div>Result: {computed}</div>;
}

// Example 2: Basic useCallback for Event Handler
import React, { useState, useCallback } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // stable reference

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <span>{count}</span>
    </div>
  );
}

// Example 3: Combining useMemo and useCallback with React.memo
import React, { useState, useMemo, useCallback } from 'react';

const List = React.memo(({ items, onItemClick }) => {
  console.log('List render');
  return (
    <ul>
      {items.map(item => (
        <li key={item} onClick={() => onItemClick(item)}>{item}</li>
      ))}
    </ul>
  );
});

export function FilterableList({ allItems }) {
  const [filter, setFilter] = useState('');

  const filtered = useMemo(
    () => allItems.filter(item => item.includes(filter)),
    [allItems, filter]
  );

  const handleClick = useCallback(item => {
    alert(`You clicked ${item}`);
  }, []);

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter items"
      />
      <List items={filtered} onItemClick={handleClick} />
    </div>
  );
}

// Notes:
// • Only memoize when necessary: measure before optimizing.
// • Avoid stale values by including all dependencies in arrays.
// • useCallback(fn, []) stable across renders; use sparingly.
// • useMemo is not a substitute for state; it’s for expensive computations.
// • Combined with React.memo, these hooks can significantly reduce renders.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Topic 82: Lazy Loading and Suspense – Detailed Notes and Code Examples
//
// React’s lazy loading (React.lazy) and Suspense enable code-splitting by loading
// components only when needed, reducing initial bundle size and improving performance.
// Suspense displays fallback UI while the lazy component is being loaded.
//
// Key Concepts:
// 1. React.lazy:
//    • Dynamically import a component: const LazyComp = React.lazy(() => import('./MyComp'));
//    • Only works for default exports.
//
// 2. Suspense:
//    • Wrap lazy components: <Suspense fallback={<Loader />}><LazyComp /></Suspense>
//    • fallback prop accepts any React node as loading indicator.
//
// 3. Code-Splitting:
//    • Splits bundles per lazy component, fetched on demand.
//    • Works seamlessly with Webpack and Create React App.
//
// 4. Error Handling:
//    • Combine with Error Boundaries to catch load failures.
//    • Suspense does not catch errors by itself.
//
// Example 1: Basic Lazy Loading with Suspense
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./MyComponent'));

export function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <Suspense fallback={<div>Loading component...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Example 2: Lazy Loading Route Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Example 3: Named Exports with Lazy
const NamedComp = React.lazy(() =>
  import('./components').then(module => ({ default: module.NamedComp }))
);

export function NamedLoader() {
  return (
    <Suspense fallback={<div>Loading named component...</div>}>
      <NamedComp />
    </Suspense>
  );
}

// Example 4: Integrating Error Boundary
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div>Failed to load component.</div>;
    return this.props.children;
  }
}

const LazyWithError = React.lazy(() => import('./UnstableComponent'));

export function SafeLoader() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyWithError />
      </Suspense>
    </ErrorBoundary>
  );
}

// Notes:
// • Use Suspense at a high level to wrap multiple lazy components.
// • Provide meaningful fallback UI for good UX.
// • Combine with Error Boundaries to handle import failures.
// • Excessive splitting can increase network requests; group related components if needed.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// Topic 83: Code Splitting with React.lazy – Detailed Notes and Code Examples
//
// React.lazy and dynamic imports enable effective code splitting by loading
// components only when they are rendered. This reduces initial bundle size
// and improves app performance. Use with Suspense to handle loading states.
//
// Key Concepts:
// 1. React.lazy:
//    • Accepts a function returning a dynamic import: React.lazy(() => import('./MyComp'));
//    • Supports default exports only.
//
// 2. Suspense:
//    • Wrap lazy-loaded components: <Suspense fallback={<Loader/>}><LazyComp/></Suspense>;
//    • Fallback UI displays while loading.
//
// 3. Webpack Magic Comments:
//    • Name chunks for easier debugging: import(/* webpackChunkName: "MyComp" */ './MyComp');
//    • Control prefetch/preload: /* webpackPrefetch: true */ or /* webpackPreload: true */.
//
// 4. Nested Splitting:
//    • Split nested routes or feature components separately.
//    • Combine multiple lazy components under one Suspense boundary.
//
// 5. Server-Side Rendering (SSR):
//    • React.lazy isn’t SSR-compatible by default.
//    • Use loadable-components or React.lazy SSR patterns for SSR support.
//
// Example 1: Basic Code Splitting
import React, { Suspense } from 'react';

const Dashboard = React.lazy(() => import(/* webpackChunkName: "dashboard" */ './Dashboard'));

export function App() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <Dashboard />
    </Suspense>
  );
}

// Example 2: Route-Based Splitting
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ './HomePage'));
const ProfilePage = React.lazy(() => import(/* webpackChunkName: "profile" */ './ProfilePage'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Example 3: Prefetching Chunks
const Settings = React.lazy(() =>
  import(
    /* webpackChunkName: "settings", webpackPrefetch: true */
    './Settings'
  )
);

export function SettingsLoader() {
  return (
    <Suspense fallback={<div>Loading Settings...</div>}>
      <Settings />
    </Suspense>
  );
}

// Example 4: Combining Multiple Lazy Components
const WidgetA = React.lazy(() => import('./WidgetA'));
const WidgetB = React.lazy(() => import('./WidgetB'));

export function DashboardWidgets() {
  return (
    <Suspense fallback={<div>Loading widgets...</div>}>
      <WidgetA />
      <WidgetB />
    </Suspense>
  );
}

// Notes:
// • Use Suspense boundaries to group related lazy components.
// • Name chunks via magic comments for readability and caching.
// • Consider SSR strategies if server rendering is required.
// • Balance number of chunks against overhead of network requests.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Topic 84: Virtualized Lists with react-window – Detailed Notes and Code Examples
//
// Virtualization renders only visible items in a long list to optimize performance
// and reduce DOM nodes. react-window is a lightweight library for windowing large lists and grids.
//
// Key Concepts:
// 1. FixedSizeList vs VariableSizeList:
//    • FixedSizeList: items have uniform height/width.
//    • VariableSizeList: items can have variable sizes, requires itemSize callback.
//
// 2. Grid Components:
//    • FixedSizeGrid and VariableSizeGrid for two-dimensional layouts.
//
// 3. Outer and Inner Element Props:
//    • Customize container elements (e.g., for styling or scroll behavior).
//
// 4. Overscan:
//    • Number of extra items rendered beyond visible viewport to reduce flicker on scroll.
//
// 5. Performance:
//    • Virtualized lists can handle tens of thousands of items smoothly.
//
// Installation:
//    npm install react-window
//    yarn add react-window
//
import React from 'react';
import { FixedSizeList as List } from 'react-window';

// Example: Fixed-size vertical list
export function VirtualizedList({ items, height = 400, itemSize = 35, width = '100%' }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      {items[index]}
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemSize}
      width={width}
      overscanCount={5}
    >
      {Row}
    </List>
  );
}

// Usage:
// const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
// <VirtualizedList items={items} />

// Example: Fixed-size grid
import { FixedSizeGrid as Grid } from 'react-window';

export function VirtualizedGrid({ columnCount, rowCount, columnWidth = 100, rowHeight = 35, width = 300, height = 300 }) {
  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style} className="grid-cell">
      {`R${rowIndex}:C${columnIndex}`}
    </div>
  );

  return (
    <Grid
      columnCount={columnCount}
      rowCount={rowCount}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      width={width}
      height={height}
      overscanRowCount={2}
      overscanColumnCount={2}
    >
      {Cell}
    </Grid>
  );
}

// Notes:
// • Choose FixedSizeList for uniform item sizes; use VariableSizeList if sizes vary.
// • Adjust overscanCount to balance smoothness vs rendering overhead.
// • Use style prop to position items; don’t wrap in extra divs that break virtualization.
// • Combine with memoized item renderers to prevent unnecessary re-renders.
// • For dynamic loading, integrate virtualization with infinite scrolling logic.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
