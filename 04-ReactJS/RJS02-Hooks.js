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



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// Topic 28: useState Hook Basics
//
// The useState hook lets you add state to functional components.
// Core concepts and patterns:
//
// 1. Declaration Syntax:
//    const [state, setState] = useState(initialValue);
//
// 2. Initial Value:
//    - Can be a primitive, object, or array.
//    - Use lazy initialization by passing a function: useState(() => expensiveInit());
//
// 3. Updating State:
//    - setState(newValue) replaces the state.
//    - For updates based on previous state, use functional updater:
//      setState(prev => /* derive new state */);
//
// Example: Counter component using useState
const Counter = ({ start = 0 }) => {
  // Initialize count state from prop
  const [count, setCount] = useState(start);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Count: {count}</h3>
      <button onClick={decrement}>-</button>
      <button onClick={increment} style={{ marginLeft: '0.5rem' }}>+</button>
    </div>
  );
};

// Usage examples:
// <NestedList items={data} />
// <Counter start={5} />

export { NestedList, Counter };



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 29: useEffect Hook – Detailed Notes and Multiple Examples
//
// The useEffect hook allows functional components to perform side effects:
// - Data fetching
// - Subscriptions (e.g., WebSockets, timers)
// - Direct DOM manipulations
//
// Key Points:
// 1. Syntax:
//    useEffect(() => {
//      // effect logic
//      return () => {
//        // cleanup logic
//      };
//    }, [dependencies]);
//
// 2. Dependencies Array:
//    • []    → run once after mount, cleanup on unmount
//    • [vars]→ run after mount and whenever vars change
//    • omitted → run after every render (rarely recommended)
//
// 3. Cleanup:
//    • Return a function to clean timers, subscriptions, or event listeners
//    • Cleanup runs before next effect and on unmount
//
// 4. Multiple Effects:
//    • Split concerns into separate useEffect calls for clarity and isolation
//
// 5. Best Practices:
//    • Always specify dependencies to avoid stale closures
//    • Avoid heavy computations directly within useEffect; extract helpers
//    • Handle async logic properly using async functions inside the effect
//
import React, { useState, useEffect } from 'react';

// Example 1: Timer Component
// - Increments counter every second, cleans up interval on unmount
export const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []); // empty array → run once

  return <div>Elapsed Time: {seconds}s</div>;
};

// Example 2: Fetch Data on Mount
// - Fetches user data when component mounts, handles loading and error
export const DataFetcher = ({ url }) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        if (isMounted) {
          setData(json);
          setStatus('success');
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setStatus('error');
        }
      });
    return () => {
      isMounted = false; // prevent state updates after unmount
    };
  }, [url]); // runs on mount and when url changes

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// Example 3: Subscribing to WebSocket
// - Opens WebSocket on mount, listens to messages, closes on unmount
export const WebSocketListener = ({ wsUrl }) => {
  const [message, setMessage] = useState('No messages yet');

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    socket.onmessage = e => setMessage(e.data);
    // Cleanup: close connection
    return () => socket.close();
  }, [wsUrl]);

  return <div>Last Message: {message}</div>;
};

// Example 4: Responding to Prop Changes
// - Synchronizes local state when prop "count" updates
export const SyncedCounter = ({ count }) => {
  const [localCount, setLocalCount] = useState(count);

  useEffect(() => {
    setLocalCount(count);
  }, [count]); // update whenever prop changes

  return <div>Prop Count: {count} | Local Count: {localCount}</div>;
};

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// Topic 30: useRef Hook – Detailed Notes and Multiple Examples
//
// The useRef hook returns a mutable ref object whose .current property persists
// for the full lifetime of the component. It can hold any value and does not
// cause re-renders when changed.
//
// Key Points:
// 1. Mutable container: ref.current can be read/written without triggering render.
// 2. DOM Access: attach to JSX element to access underlying DOM node.
// 3. Persistent Value: retain values across renders (e.g., timers, previous props).
// 4. No Reconciliation: React ignores changes to ref.current during reconciliation.

import React, { useRef, useEffect, useState } from 'react';

// Example 1: Accessing a DOM element
export const TextInputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Direct DOM API call
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

// Example 2: Persisting interval ID without re-render
export const IntervalTimer = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Timer: {count}s</p>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

// Example 3: Tracking previous value
export const PreviousValue = ({ value }) => {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  const previous = prevRef.current;

  return (
    <div>
      <p>Current: {value}</p>
      <p>Previous: {previous}</p>
    </div>
  );
};

// Example 4: Counting renders without causing re-render
export const RenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div>
      <p>Render count: {renderCount.current}</p>
      <p>Edit or update props to see this increment without extra state.</p>
    </div>
  );
};

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 31: useContext Hook – Detailed Notes and Multiple Examples
//
// The useContext hook lets you access React Context values in functional components
// without needing nested Consumer components. It simplifies global state or theme
// sharing across the component tree.
//
// Key Points:
// 1. Create Context with default value: const MyContext = React.createContext(defaultValue);
// 2. Provide Context value: <MyContext.Provider value={someValue}>...
// 3. Consume with useContext: const value = useContext(MyContext);
// 4. Changes to provider's value trigger a re-render of consuming components.
// 5. Context should be used sparingly—too many contexts can complicate state management.

import React, { createContext, useContext, useState } from 'react';

// Example 1: Theme Context
const ThemeContext = createContext('light'); // default value

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeToggle />
      <ThemedBox />
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const theme = useContext(ThemeContext);
  const setTheme = useContext(ThemeUpdateContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme} - Toggle Theme
    </button>
  );
};

const ThemedBox = () => {
  const theme = useContext(ThemeContext);
  const style = {
    padding: '1rem',
    background: theme === 'light' ? '#eee' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
  };

  return <div style={style}>This box is {theme} themed.</div>;
};

// Example 2: Updating Context via Separate Update Context
const ThemeUpdateContext = createContext(() => {});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

// Usage:
// <ThemeProvider>
//   <ThemeToggle />
//   <ThemedBox />
// </ThemeProvider>

// Example 3: User Authentication Context
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  if (!user) {
    return <p>No user logged in.</p>;
  }
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Example 4: Custom Hook for Context
export const useAuth = () => useContext(AuthContext);

// Then in any component:
// const { user, login } = useAuth();

// Notes:
// - Separate contexts for values and update functions avoid unnecessary re-renders.
// - Custom hooks improve reusability and encapsulation.
// - Context is ideal for themes, locales, user auth, and global settings.
// - Avoid overusing context for deeply nested updates; consider state management libs.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// Topic 32: Custom Hooks – Detailed Notes and Multiple Examples
//
// Custom hooks are JavaScript functions whose names start with “use” and that
// leverage built-in hooks to encapsulate and reuse stateful logic across components.
// They must abide by the Rules of Hooks (only call hooks at the top level and from React functions).
//
// Key Points:
// 1. Naming Convention: Function name must begin with “use” (e.g., useAuth, useFetch).
// 2. Composition: Can call other hooks (useState, useEffect, useContext) internally.
// 3. Reusability: Extract common patterns like data fetching, form handling, subscriptions.
// 4. Return Values: May return arrays or objects for flexibility (similar to built-in hooks).
// 5. Testing: Use React Testing Library’s renderHook for isolated hook tests.

import { useState, useEffect, useRef } from 'react';

// Example 1: useLocalStorage – sync state with localStorage
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // handle write errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Example 2: useOnMount – run callback once after mount
export function useOnMount(callback) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Example 3: useDebounce – debounce a rapidly changing value
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Example 4: usePrevious – capture the previous value of a prop or state
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage Notes:
// • Import and call your custom hook inside a component: const [data, setData] = useLocalStorage('key', []);
// • Combine multiple custom hooks for complex behaviors (e.g., useDebounce + useFetch).
// • Always follow hook rules: only call hooks (built-in or custom) at the top level, never inside loops or conditionals.
// • Custom hooks promote DRY code and easier testing of shared logic.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 32: Custom Hooks – Detailed Notes and Multiple Examples
//
// Custom hooks are JavaScript functions whose names start with “use” and that
// leverage built-in hooks to encapsulate and reuse stateful logic across components.
// They must follow the Rules of Hooks and are a powerful way to share logic.
//
// Key Points:
// 1. Must start with “use” to satisfy Hook rules and linting.
// 2. Can call other hooks (useState, useEffect, useContext, etc.) internally.
// 3. Return values can be arrays or objects, mimicking built-in hooks (useState returns [state, setState]).
// 4. Improve code reusability and readability by abstracting common patterns.
// 5. Testable via libraries like React Testing Library’s renderHook.

import { useState, useEffect, useRef } from 'react';

// Example 1: useLocalStorage – synchronize state with localStorage
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Handle write errors silently
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Example 2: useDebounce – debounce a rapidly changing value
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Example 3: usePrevious – track the previous value of a prop or state
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Example 4: useOnMount – run a callback once after component mounts
export function useOnMount(callback) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Usage Examples:
// const [name, setName] = useLocalStorage('name', 'Guest');
// const debouncedSearch = useDebounce(searchTerm, 500);
// const prevCount = usePrevious(count);
// useOnMount(() => console.log('Component mounted'));

// Notes:
// • Always call hooks at the top level of your custom hook.
// • Combine multiple custom hooks to build complex behaviors.
// • Ensure dependencies arrays are complete to avoid stale values.
// • Custom hooks enhance maintainability and reduce boilerplate across components.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 34: React Lifecycle Phases – Detailed Notes and Multiple Examples
//
// React components go through distinct phases: Mounting, Updating, and Unmounting.
// Class components have explicit lifecycle methods; functional components use useEffect.
//
// 1. Mounting Phase:
//    • class: constructor(), static getDerivedStateFromProps(), render(), componentDidMount()
//    • hooks: useEffect(() => { /* on mount */ }, [])
//
// 2. Updating Phase:
//    • class: static getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate(), componentDidUpdate()
//    • hooks: useEffect(() => { /* on update */ }, [dependencies])
//
// 3. Unmounting Phase:
//    • class: componentWillUnmount()
//    • hooks: useEffect(() => { return () => { /* cleanup */ } }, [])
//
// 4. Error Handling:
//    • class: static getDerivedStateFromError(), componentDidCatch()
//    • hooks: useErrorBoundary from libraries (no built-in hook)
//
// Example 1: Class Component with full lifecycle
import React from 'react';

export class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    return null; // no state update from props
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true; // proceed with update
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return prevState.count; // return snapshot (previous count)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate, snapshot:', snapshot);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch', error, info);
  }

  increment = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    console.log('render');
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h3>Count: {this.state.count}</h3>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Example 2: Functional Component with useEffect mapping
import { useState, useEffect } from 'react';

export function LifecycleHooksDemo() {
  const [count, setCount] = useState(0);

  // Mounting and Unmounting
  useEffect(() => {
    console.log('useEffect mount');
    return () => console.log('useEffect cleanup (unmount)');
  }, []);

  // Updating when count changes
  useEffect(() => {
    if (count === 0) return;
    console.log('useEffect update, count:', count);
  }, [count]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

// Notes:
// • Mounting: setup tasks (data fetch, subscriptions) in componentDidMount or useEffect([]).
// • Updating: respond to prop/state changes in componentDidUpdate or useEffect([deps]).
// • Unmounting: cleanup tasks in componentWillUnmount or useEffect cleanup.
// • Error boundaries only exist in class components via componentDidCatch.
// • Order of methods ensures predictable flow; warn if lifecycle rules are violated.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 34: React Lifecycle Phases – Detailed Notes and Multiple Examples
//
// React components go through distinct phases: Mounting, Updating, and Unmounting.
// Class components use lifecycle methods; functional components use useEffect to mirror these phases.
//
// Mounting Phase:
// • class: constructor(), static getDerivedStateFromProps(), render(), componentDidMount()
// • hooks: useEffect(() => { /* on mount */ }, [])
//
// Updating Phase:
// • class: static getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate(), componentDidUpdate()
// • hooks: useEffect(() => { /* on update */ }, [dependencies])
//
// Unmounting Phase:
// • class: componentWillUnmount()
// • hooks: useEffect(() => { return () => { /* cleanup */ }; }, [])
//
// Error Handling Phase:
// • class: static getDerivedStateFromError(), componentDidCatch()
// • hooks: useErrorBoundary (via libraries)
//
import React, { Component, useState, useEffect } from 'react';

// Example 1: Class Component with Full Lifecycle Methods
export class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return prevState.count;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate, snapshot:', snapshot);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch:', error, info);
  }

  increment = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    console.log('render');
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h3>Count: {this.state.count}</h3>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Example 2: Functional Component Mirroring Lifecycle with useEffect
export function LifecycleHooksDemo() {
  const [count, setCount] = useState(0);

  // Mounting & Unmounting
  useEffect(() => {
    console.log('useEffect mount');
    return () => console.log('useEffect unmount');
  }, []);

  // Updating when count changes
  useEffect(() => {
    if (count === 0) return;
    console.log('useEffect update, count:', count);
  }, [count]);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

// Notes:
// • Mounting: initialize data or subscriptions in componentDidMount / useEffect([]).
// • Updating: respond to prop/state changes in componentDidUpdate / useEffect([deps]).
// • Unmounting: cleanup in componentWillUnmount / useEffect cleanup.
// • Error boundaries: only class components can catch render errors via componentDidCatch.
// • The sequence of methods/hooks ensures predictable component behavior.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 35: Replacing Lifecycle Methods with Hooks – Detailed Notes and Multiple Examples
//
// Hooks provide functional replacements for class lifecycle methods, enabling
// a cleaner and more declarative approach to side effects and state management.
//
// Mapping Class Lifecycle to Hooks:
//
// 1. componentDidMount → useEffect(() => { /* mount logic */ }, [])
// 2. componentDidUpdate → useEffect(() => { /* update logic */ }, [deps])
// 3. componentWillUnmount → useEffect(() => { return () => { /* cleanup */ } }, [])
// 4. getDerivedStateFromProps → useEffect(() => { /* derive state from props */ }, [props])
// 5. shouldComponentUpdate → React.memo or useMemo/useCallback for performance
// 6. getSnapshotBeforeUpdate → useRef to capture pre-update values
// 7. componentDidCatch → useErrorBoundary hook from libraries (e.g., react-error-boundary)
//
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

// Example 1: DataFetcher class → functional with useEffect
/* Class version:
class DataFetcher extends React.Component {
  state = { data: null };
  componentDidMount() {
    fetch(this.props.url).then(...).then(data => this.setState({ data }));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      fetch(this.props.url)...;
    }
  }
  componentWillUnmount() {
    // cleanup if needed
  }
  render() { return <div>{JSON.stringify(this.state.data)}</div>; }
}
*/

export function DataFetcherHook({ url }) {
  const [data, setData] = useState(null);

  // Mount and URL change effect
  useEffect(() => {
    let isActive = true;
    fetch(url)
      .then(res => res.json())
      .then(json => { if (isActive) setData(json); })
      .catch(console.error);
    return () => { isActive = false; };
  }, [url]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

// Example 2: Counter with shouldComponentUpdate → memo & useCallback
/* Class snippet:
class Counter extends React.PureComponent {
  // PureComponent does shallow compare to skip updates
  state= {count:0};
  render() {...}
}
*/
export const Counter = memo(function Counter({ step }) {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + step), [step]);
  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={increment}>+{step}</button>
    </div>
  );
});

// Example 3: getSnapshotBeforeUpdate → useRef to capture previous prop
export function SnapshotDemo({ value }) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  }, [value]);
  const previousValue = prevRef.current;

  return (
    <div>
      <p>Previous: {previousValue}</p>
      <p>Current: {value}</p>
    </div>
  );
}

// Example 4: Error boundary replacement using react-error-boundary
/*
import { ErrorBoundary } from 'react-error-boundary';
function ErrorFallback({error, resetErrorBoundary}) {
  return <div>Error: {error.message}<button onClick={resetErrorBoundary}>Retry</button></div>;
}
// Usage:
<ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{/* reset logic */}}>
  <MyComponent />
</ErrorBoundary>
*/
// Note: There is no built-in hook for errors; use community solutions.

// Notes:
// • Hooks unify lifecycle logic into useEffect and specialized hooks (useMemo, useCallback).
// • Splitting effects by concern improves readability vs monolithic lifecycle methods.
// • Memoization hooks replace shouldComponentUpdate for performance.
// • useRef captures pre-render values, replacing getSnapshotBeforeUpdate.
// • Third-party hooks provide error boundary equivalents for functional components.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 36: Cleanup Functions in useEffect – Detailed Notes and Multiple Examples
//
// In React, the cleanup function returned by useEffect runs before the component
// unmounts or before the effect re-executes. It’s essential for preventing memory
// leaks and cleaning up subscriptions, timers, or event listeners.
//
// Key Points:
// 1. Cleanup Timing:
//    • Before unmount: runs once when component is removed.
//    • Before next effect: runs before re-running effect on dependency change.
//
// 2. Return Value:
//    • Return a function inside useEffect: useEffect(() => { /* setup */; return cleanup; }, [deps]);
//
// 3. Resources to Cleanup:
//    • Timers (setInterval, setTimeout)
//    • Subscriptions (WebSocket, Observables)
//    • Event listeners (window, document, custom)
//    • Cancelable async tasks (AbortController)
//
import React, { useState, useEffect, useRef } from 'react';

// Example 1: Clearing an interval
export function IntervalCleanup() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    // Cleanup on unmount or before next interval setup
    return () => clearInterval(id);
  }, []); // empty deps: run once

  return <div>Interval Count: {count}</div>;
}

// Example 2: Removing event listener
export function WindowResize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Window width: {size}px</div>;
}

// Example 3: WebSocket subscription
export function WebSocketCleanup({ url }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = e => setMessage(e.data);
    // Cleanup: close socket
    return () => socket.close();
  }, [url]);

  return <div>Last WS message: {message}</div>;
}

// Example 4: AbortController for fetch cancellation
export function FetchWithCancel({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      });
    // Cleanup: abort fetch
    return () => controller.abort();
  }, [url]);

  if (error) return <div>Error: {error.message}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
}

// Notes:
// • Always return a cleanup function to avoid dangling processes.
// • Dependencies array controls when cleanup and setup occur.
// • For multiple concerns, use separate useEffect hooks per resource.
// • Proper cleanup ensures performance and prevents memory leaks.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////