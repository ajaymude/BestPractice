
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




/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 42: Creating and Using Context – Notes and Code Examples
//
// React Context provides a way to share values (such as themes, user data,
// or configuration) across the component tree without passing props manually.
// Ideal for truly global data: themes, locales, authentication state.
//
// Key Concepts and Best Practices:
//
// 1. Creating Context:
//    • Use React.createContext(defaultValue).
//    • defaultValue applies when no Provider is found.
//
// 2. Providing Context:
//    • Wrap subtree with <Context.Provider value={...}>.
//    • Consumers re-render when Provider value changes.
//    • Memoize provider value to avoid unnecessary renders.
//
// 3. Consuming Context:
//    • useContext(Context) returns current context value.
//    • Must be called at top-level of functional components or custom hooks.
//    • For class components, use <Context.Consumer>.
//
// 4. Splitting Context:
//    • Split value and updater into separate contexts to minimize re-renders.
//
// 5. Avoid Overuse:
//    • Not for high-frequency updates; prefer local state or state libs.
//
// Example 1: Theme Context with useContext
import React, { createContext, useContext, useState, useMemo } from 'react';

// Create theme context
const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
    >
      Toggle Theme (current: {theme})
    </button>
  );
}

// Example 2: Authentication Context with useContext
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = username => setUser({ name: username });
  const logout = () => setUser(null);
  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserStatus() {
  const { user, logout, login } = useContext(AuthContext);
  return user ? (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <button onClick={() => login('Alice')}>Login as Alice</button>
  );
}

// Usage:
// <ThemeProvider>
//   <AuthProvider>
//     <ThemedButton />
//     <UserStatus />
//   </AuthProvider>
// </ThemeProvider>

// Testing:
// Wrap components with providers in tests:
// render(<ThemedButton />, { wrapper: ThemeProvider });

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 43: useContext Hook – Detailed Notes and Multiple Examples
//
// The useContext hook simplifies consuming React Context in functional components.
// It returns the current context value for the nearest matching Provider above in the tree.
//
// Key Points:
// 1. Syntax:
//    • const value = useContext(MyContext);
//    • Must pass the Context object returned by createContext.
//
// 2. Rules:
//    • Call at top-level of a functional component or custom hook.
//    • Cannot use inside loops, conditions, or nested functions.
//
// 3. Re-render Behavior:
//    • Component using useContext re-renders when Provider value changes.
//    • Ensure context value is memoized if provided as object/array.
//
// 4. Usage Scenarios:
//    • Theming (light/dark mode)
//    • Authentication state
//    • Localization strings
//    • Shared configuration or settings
//
import React, { createContext, useContext, useState, useMemo } from 'react';

// Example 1: Consuming ThemeContext
// Setup ThemeContext with default
const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemedComponent() {
  // Consume context value directly
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}>
        Toggle Theme
      </button>
    </div>
  );
}

// Example 2: Authentication Context
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = username => setUser({ name: username });
  const logout = () => setUser(null);
  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function Profile() {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Please log in.</p>
  );
}

// Example 3: Custom Hook wrapping useContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Usage Combine:
// <ThemeProvider>
//   <AuthProvider>
//     <ThemedComponent />
//     <Profile />
//   </AuthProvider>
// </ThemeProvider>

// Notes:
// • If context value is an object, always memoize with useMemo to avoid extra renders.
// • For multiple contexts, call useContext for each separately.
// • useContext does not subscribe deeply; only value reference changes trigger updates.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// Topic 44: Sharing Global Data – Detailed Notes and Multiple Examples
//
// Sharing global data across a React app can be done via Context, global stores
// (like Redux), or external libraries. Context is built-in and ideal for static or
// infrequently changing data (themes, locales, auth), while stores handle complex,
// frequently updated global state.
//
// 1. Using Context for Global Data:
//    • Create a Context via createContext(defaultValue).
//    • Wrap your app with Provider supplying the global value.
//    • Consume via useContext in any component.
//
// 2. Example: Global Theme + User Settings Context
import React, { createContext, useContext, useState, useMemo } from 'react';

// Create a combined context for theme and settings
const GlobalContext = createContext({ theme: 'light', settings: {}, setTheme: () => {}, setSettings: () => {} });

export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({ language: 'en', notifications: true });
  // Memoize entire context value to avoid extra renders
  const value = useMemo(() => ({ theme, settings, setTheme, setSettings }), [theme, settings]);

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within GlobalProvider');
  return context;
}

// Component consuming global data
export function SettingsPanel() {
  const { theme, settings, setTheme, setSettings } = useGlobal();
  return (
    <div style={{ padding: '1rem', background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h3>Settings</h3>
      <label>
        Theme:
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <label>
        Language:
        <select value={settings.language} onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </label>
      <br />
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={e => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
        />
      </label>
    </div>
  );
}

// 3. Using Redux for Global Data:
//    • Create a store with reducers managing slices of global state.
//    • Wrap app with <Provider store={store}>.
//    • Use useSelector and useDispatch hooks to access and update.
//
// Example: Simplified Redux setup
// import { configureStore, createSlice } from '@reduxjs/toolkit';
// import { Provider, useSelector, useDispatch } from 'react-redux';
//
// const globalSlice = createSlice({ name: 'global', initialState: { theme: 'light' }, reducers: { setTheme: (state, action) => { state.theme = action.payload; } } });
// const store = configureStore({ reducer: { global: globalSlice.reducer } });
//
// export function ReduxExampleApp({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }
// export function ThemeSwitcher() {
//   const dispatch = useDispatch();
//   const theme = useSelector(state => state.global.theme);
//   return <button onClick={() => dispatch(globalSlice.actions.setTheme(theme === 'light' ? 'dark' : 'light'))}>Theme: {theme}</button>;
// }
//
// 4. Best Practices:
//    • Memoize context values and Redux selectors for performance.
//    • Split contexts/stores by concern to avoid unnecessary renders.
//    • Prefer Redux or Zustand for high-frequency updates; Context for static data.
//    • Always define PropTypes or TypeScript types for global state shapes.

// Usage Combine:
// <GlobalProvider>
//   <SettingsPanel />
//   <OtherComponents />
// </GlobalProvider>

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////




// Topic 45: Updating Context Values – Detailed Notes and Code Examples
//
// When context values include state and updater functions, ensure updates are
// handled correctly to avoid stale closures and unnecessary re-renders.
//
// Key Practices:
// 1. Updater Functions in Context:
//    • Provide setter functions (e.g., setTheme) in context value.
//    • Consumers call these to update context state.
//
// 2. Immutable Updates:
//    • Always treat context state as immutable; copy objects/arrays when updating.
//    • Example: setSettings(prev => ({ ...prev, newKey: newValue }));
//
// 3. Avoid Stale Closures:
//    • Use functional updater form (prev => next) to access latest state in callbacks.
//    • Prevents stale reads when multiple components update concurrently.
//
// 4. Memoizing Updaters:
//    • Updater functions are stable from useState; no need to memoize.
//    • Memoize context value object to avoid re-renders: useMemo.
//
// 5. Batch Updates:
//    • React automatically batches updates in event handlers, but use functional
//      updates when updating multiple fields within the same context.
//
// Code Example: Extending GlobalContext with theme history
import React, { createContext, useContext, useState, useMemo } from 'react';

const HistoryContext = createContext({
  history: [],
  addToHistory: () => {},
});

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  // Add entry to history immutably
  const addToHistory = entry => {
    setHistory(prev => [...prev, entry]);
  };

  const value = useMemo(() => ({ history, addToHistory }), [history]);

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

export function HistoryLogger() {
  const { history, addToHistory } = useContext(HistoryContext);

  const logAction = () => {
    const timestamp = new Date().toISOString();
    addToHistory(`Action at ${timestamp}`);
  };

  return (
    <div>
      <button onClick={logAction}>Log Action</button>
      <ul>
        {history.map((h, idx) => (
          <li key={idx}>{h}</li>
        ))}
      </ul>
    </div>
  );
}

// Usage:
// <HistoryProvider>
//   <HistoryLogger />
// </HistoryProvider>

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 46: Controlled Inputs – Detailed Notes and Code Examples
//
// Controlled inputs are form elements whose values are fully driven by React state.
// This provides a single source of truth, enabling validation, formatting,
// and dynamic behavior based on user interactions.
//
// Key Concepts:
// 1. value Prop: Bind input’s value to state (value={stateValue}).
// 2. onChange Handler: Update state on each change (onChange={e => setState(e.target.value)}).
// 3. Single Source of Truth: State holds authoritative input values.
// 4. Validation & Formatting: Sanitize or transform input within onChange before state update.
// 5. Initial State: Initialize state to match input type (string, boolean, etc.).
//
import React, { useState } from 'react';

// Example 1: Controlled Text Input with Validation
export function ControlledTextInput() {
  const [text, setText] = useState('');

  const handleChange = e => {
    const input = e.target.value;
    // Prevent digits
    const sanitized = input.replace(/\d/g, '');
    setText(sanitized);
  };

  return (
    <div>
      <label>
        Text (no digits):
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text"
        />
      </label>
      <p>Value: {text}</p>
    </div>
  );
}

// Example 2: Controlled Checkbox
export function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        Agree to terms
      </label>
      <p>Checked: {checked ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Example 3: Controlled Select Dropdown
export function ControlledSelect() {
  const [color, setColor] = useState('red');

  const handleChange = e => {
    setColor(e.target.value);
  };

  return (
    <div>
      <label>
        Choose color:
        <select value={color} onChange={handleChange}>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </label>
      <p>Selected: {color}</p>
    </div>
  );
}

// Example 4: Controlled Form with Multiple Fields
export function ControlledForm() {
  const [form, setForm] = useState({ username: '', email: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input name="username" value={form.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

// Notes:
// • Controlled inputs re-render on each change; optimize with React.memo if needed.
// • Initialize state to appropriate types (string for text, boolean for checkbox).
// • For complex forms, consider custom hooks or form libraries for validation and management.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 47: Form Submission Handling – Detailed Notes and Code Examples
//
// Handling form submissions in React involves preventing default browser behavior,
// collecting form data, performing validation, and triggering side effects such as
// API calls or state updates. Proper patterns ensure maintainability and user feedback.
//
// Key Concepts:
// 1. Preventing Default:
//    • Use e.preventDefault() in the onSubmit handler to stop page reload.
//
// 2. Controlled Components:
//    • Ensure form inputs are controlled (value + onChange) for reliable data.
//
// 3. Validation:
//    • Perform client-side checks (e.g., required fields, formats) before processing.
//    • Display inline errors or summaries for user guidance.
//
// 4. Side Effects:
//    • Use async/await or Promises in handlers for API submissions.
//    • Manage loading state and error handling in component state.
//
// 5. Resetting Forms:
//    • Clear form state on successful submission or reset action.
//
import React, { useState } from 'react';

// Example: Comprehensive Form with Submission Handling
export function SignupForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate fields and return errors object
  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = 'Username is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted data:', form);
      setSuccess(true);
      setForm({ username: '', email: '', password: '' }); // reset form
    } catch (err) {
      setErrors({ submit: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
      {success && <p style={{ color: 'green' }}>Signup successful!</p>}
      {errors.submit && <p style={{ color: 'red' }}>{errors.submit}</p>}

      <div>
        <label>Username:</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>

      <button type="submit" disabled={submitting} style={{ marginTop: 10 }}>
        {submitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
}

// Notes:
// • Always call e.preventDefault() in onSubmit to control submission.
// • Perform synchronous validation before async operations.
// • Manage loading state to disable controls during submission.
// • Reset or preserve form state based on UX requirements.
// • Display inline errors next to respective fields for clarity.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// Topic 48: Validating Input Manually – Detailed Notes and Code Examples
//
// Manually validating input allows custom rules beyond HTML constraints.
// Perform validation onChange, onBlur, or onSubmit, updating error state accordingly.
//
// Key Concepts:
// 1. Validation Triggers:
//    • onChange: real-time feedback as user types.
//    • onBlur: validation when user leaves the field.
//    • onSubmit: final validation before form processing.
// 2. Validation State:
//    • Store errors per field in component state (e.g., { email: '', age: '' }).
//    • Track touched fields to show errors only after interaction.
// 3. Custom Rules:
//    • Use regex or functions for patterns, numeric checks, cross-field dependencies.
// 4. UX Considerations:
//    • Debounce heavy validations.
//    • Show errors only after the user has interacted with the field.
//
import React, { useState } from 'react';

export function ManualValidationForm() {
  const [form, setForm] = useState({ email: '', age: '' });
  const [errors, setErrors] = useState({ email: '', age: '' });
  const [touched, setTouched] = useState({ email: false, age: false });

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'age':
        if (!value) return 'Age is required';
        if (!/^[0-9]+$/.test(value)) return 'Age must be a number';
        if (Number(value) < 18) return 'Must be at least 18';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validate all fields on submit
    const newErrors = {
      email: validateField('email', form.email),
      age: validateField('age', form.age),
    };
    setErrors(newErrors);
    setTouched({ email: true, age: true });

    // If no errors, process form
    if (!newErrors.email && !newErrors.age) {
      console.log('Form data:', form);
      // reset or further processing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 49: Using Form Libraries – Formik and React Hook Form
//
// Leveraging form libraries simplifies form state management, validation,
// and submission handling. Formik and React Hook Form are popular choices.
//
// 1. Formik
//    • High-level abstraction with built-in support for initial values, validation,
//      and form submission.
//    • Uses render props or hooks (useFormik) to connect inputs.
//
// Example: Formik Signup Form
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export function FormikSignup() {
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Required'),
  });

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log('Formik submit:', values);
          setSubmitting(false);
          resetForm();
        }, 500);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Username:</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label>Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label>Password:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

// 2. React Hook Form
//    • Leverages uncontrolled inputs with refs for performance.
//    • useForm hook provides register, handleSubmit, formState, and more.
//
// Example: React Hook Form Signup
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export function RHFSignup() {
  const schema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Required'),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log('RHF submit:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input {...register('username')} />
        {errors.username && <div style={{ color: 'red' }}>{errors.username.message}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
}

// Notes:
// • Formik handles form state in React, suitable for complex forms.
// • React Hook Form offers performance benefits via uncontrolled inputs.
// • Both support schema validation via Yup and integration with UI libraries.
// • Choose based on complexity, performance needs, and developer preference.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 50: Error Messages and UX – Detailed Notes and Code Examples
//
// Effective error messaging and user experience in forms enhance usability
// and accessibility. Key principles include clarity, context, and feedback timing.
//
// Best Practices:
// 1. Clear and Specific Messages:
//    • Use simple language that describes the problem and how to fix it.
//    • Avoid technical jargon (e.g., “400 Bad Request”) for end users.
//
// 2. Inline vs Summary Errors:
//    • Inline messages: appear next to the relevant field for immediate context.
//    • Summary: at top of form for a global overview, useful on submit.
//
// 3. Timing and Triggers:
//    • onBlur: validate when user leaves a field to avoid distraction.
//    • onSubmit: final check and summary display if fields invalid.
//    • Debounce real-time validation to prevent flicker.
//
// 4. Visual Cues:
//    • Use color and icons to draw attention (red for errors, green for success).
//    • Ensure contrast and use aria attributes for screen readers.
//
// 5. Accessibility:
//    • Associate messages with inputs via aria-describedby.
//    • Ensure keyboard users can navigate to error messages easily.
//
// Code Example: Error UX in SignupForm
import React, { useState } from 'react';

export function SignupFormWithErrors() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation logic
  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Please enter your email.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Email format is invalid.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    return errs;
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate());
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(validate());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length === 0) {
      // submit data
      console.log('Form submitted', form);
      // show success message or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Summary errors */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" style={{ color: 'red' }}>
          <p>Please fix the following errors:</p>
          <ul>
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {touched.email && errors.email && (
          <span id="email-error" style={{ color: 'red' }}>
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {touched.password && errors.password && (
          <span id="password-error" style={{ color: 'red' }}>
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

// End of Topic 50 Content

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 51: Fetching Data with fetch() – Detailed Notes and Code Examples
//
// Using the native fetch() API for data retrieval in React apps involves handling
// asynchronous calls, managing loading and error states, and integrating with hooks.
//
// Key Concepts:
// 1. Basic fetch Syntax:
//    • fetch(url, options)
//    • Returns a Promise resolving to a Response object.
//    • Use response.json() to parse JSON payloads.
//
// 2. Error Handling:
//    • Check response.ok to catch HTTP errors (4xx/5xx).
//    • Use try/catch around async/await to handle network errors.
//
// 3. Loading State:
//    • Use state to track loading (e.g., isLoading) and display indicators.
//
// 4. Cleanup with useEffect:
//    • AbortController to cancel fetch on component unmount or param change.
//
// 5. Data Caching and Revalidation:
//    • Consider caching responses or using stale-while-revalidate patterns.
//
import React, { useState, useEffect } from 'react';

// Example 1: Basic Data Fetching
export function BasicFetch({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Example 2: Fetch with AbortController
export function FetchWithAbort({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [url]);

  if (isLoading) return <p>Loading with abort...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Example 3: Async/Await inside useEffect
export function AsyncAwaitFetch({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [url]);

  if (isLoading) return <p>Loading async...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Notes:
// • Always manage loading and error states for better UX.
// • Use AbortController to cancel stale requests.
// • Consider custom hooks (e.g., useFetch) to DRY repeated logic.
// • For caching, explore SWR or React Query libraries for advanced patterns.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 52: Axios Integration – Detailed Notes and Code Examples
//
// Axios is a popular HTTP client library offering a promise-based API,
// automatic JSON handling, request and response interception, and cancellation.
// It simplifies HTTP requests compared to the native fetch API.
//
// Key Concepts:
// 1. Installation:
//    • npm install axios
//    • yarn add axios
//
// 2. Basic Request:
//    • axios.get(url)
//    • axios.post(url, data)
//    • Returns a promise resolving to a response object with data property.
//
// 3. Global Configuration:
//    • axios.defaults.baseURL = 'https://api.example.com';
//    • axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//
// 4. Interceptors:
//    • axios.interceptors.request.use(config => { /* modify config */ return config; });
//    • axios.interceptors.response.use(response => response, error => Promise.reject(error));
//
// 5. Cancellation:
//    • const source = axios.CancelToken.source();
//    • axios.get(url, { cancelToken: source.token });
//    • source.cancel('Request canceled.');
//
// 6. Error Handling:
//    • Errors contain response, request, and message properties.
//    • Use try/catch with async/await for clean syntax.
//
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Example 1: Basic GET Request with Axios
export function AxiosBasicFetch({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Example 2: POST Request and Global Config
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export function AxiosPostExample() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/submit', { name: 'Alice' });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// Example 3: Request Cancellation
export function AxiosCancelExample({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
      .then(res => setData(res.data))
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError(err.message);
        }
      });
    return () => source.cancel('Component unmounted');
  }, [url]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Notes:
// • Axios simplifies HTTP requests and error handling over fetch.
// • Use interceptors for auth tokens, logging, or global error handling.
// • CancelToken lets you abort requests on unmount to prevent leaks.
// • Configure defaults to avoid repeating baseURL and headers.
// • Combine with custom hooks (e.g., useAxios) for reusable patterns.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// Topic 53: useEffect with Fetch – Detailed Notes and Code Examples
//
// Integrating fetch calls inside useEffect enables data fetching upon component
// mount or when dependencies change. Key considerations include cleanup, dependency
// management, and state handling for loading, data, and errors.
//
// Key Concepts:
// 1. Triggering fetch on mount or dependency changes via useEffect dependency array.
// 2. Managing loading, data, and error states with useState.
// 3. Cleanup using AbortController to cancel in-flight requests when component unmounts or URL changes.
// 4. Ensuring dependency array includes all external variables used in the effect.
//
import React, { useState, useEffect } from 'react';

// Example: Fetch user data
export function FetchUsers({ apiUrl }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getUsers() {
      setLoading(true);
      try {
        const response = await fetch(apiUrl, { signal });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
    return () => controller.abort();
  }, [apiUrl]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Notes:
// • Always include dependencies (apiUrl) to refetch when it changes.
// • Use AbortController to cancel stale fetches.
// • Handle loading and error states for good UX.
// • Consider extracting fetch logic into a custom hook (useFetch).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 54: useState + useEffect Pattern for API Calls – Detailed Notes and Code Examples
//
// Combining useState and useEffect provides a common pattern for handling
// API data fetching, state management, and side effects in functional components.
//
// Key Steps:
// 1. useState for data, loading, and error states.
// 2. useEffect to trigger API call on mount or when dependencies change.
// 3. AbortController for cleanup of in-flight requests.
// 4. Optional dependency array to refetch based on parameters.
//
import React, { useState, useEffect } from 'react';

export function useApi(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}

// Example Component using useApi hook
export function ApiComponent({ apiUrl }) {
  const { data, isLoading, error } = useApi(apiUrl);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Fetched Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Notes:
// • Encapsulate fetch logic in a custom hook for reuse across components.
// • Include dependency on url to refetch when apiUrl changes.
// • Manage cleanup with AbortController to avoid updating unmounted components.
// • Extend hook with options (headers, method) as needed.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 55: Async/Await with API Calls – Detailed Notes and Code Examples
//
// Utilizing async/await syntax in useEffect hooks provides clean, readable
// code for handling asynchronous API calls. It simplifies promise handling
// and error management compared to .then chains.
//
// Key Practices:
// 1. Define an inner async function inside useEffect and call it immediately.
// 2. Use try/catch for error handling within async function.
// 3. Manage loading, data, and error states via useState.
// 4. Cleanup inflight requests with AbortController to prevent memory leaks.
// 5. Include all external dependencies in the dependency array.
//
import React, { useState, useEffect } from 'react';

// Custom hook using async/await
export function useAsyncApi(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}

// Example component consuming useAsyncApi hook
export function AsyncDataComponent({ apiUrl }) {
  const { data, isLoading, error } = useAsyncApi(apiUrl);

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h3>Async/Await Fetched Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Notes:
// • Inner async function avoids making the effect callback itself async.
// • AbortController ensures fetch is cancelled on cleanup to avoid setting state on unmounted components.
// • Always reset loading and error state when URL changes or on retry.
// • Can extend hook with options (headers, methods) by passing config and spreading into fetch.
// • For complex use cases, consider libraries like React Query for caching and retries.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Topic 56: Loader and Error States – Detailed Notes and Code Examples
//
// Handling loading and error states is crucial for a smooth UX when fetching data
// or performing async operations. Show appropriate indicators and messages to users.
//
// Key Concepts:
// 1. Loading State:
//    • Use isLoading boolean in state to track pending operations.
//    • Display a spinner or placeholder while data is loading.
//
// 2. Error State:
//    • Use error state variable (string or object) to hold error info.
//    • Display user-friendly messages on failure.
//
// 3. State Initialization:
//    • Initialize isLoading=true before fetch, error=null.
//
// 4. State Transitions:
//    • On operation start: setLoading(true), setError(null).
//    • On success: setData(...), setLoading(false).
//    • On failure: setError(message), setLoading(false).
//
import React, { useState, useEffect } from 'react';

// Reusable Loader component
export function Loader() {
  return <div className="loader">Loading...</div>;
}

// Example: DataFetcher with explicit loading and error UI
export function DataFetcher({ endpoint }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (mounted) setData(json);
      })
      .catch(err => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, [endpoint]);

  // Render logic
  if (isLoading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="data-container">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Notes:
// • Place Loader and error UI at top of component for clarity.
// • Ensure cleanup flags to avoid setting state on unmounted components.
// • Style loader and error messages for visibility and consistency.
// • For repeated patterns, extract hook (useFetchWithStates) to encapsulate logic.

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
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////