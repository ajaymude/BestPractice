// 📘 INTRODUCTION & SETUP
// 01 - What is Redux Toolkit and why use it?
// 02 - Comparison: Redux Toolkit vs Vanilla Redux vs Other State Libraries
// 03 - Installing Redux Toolkit: npm install @reduxjs/toolkit react-redux
// 04 - Project structure for RTK: organizing store, features, and slices
// 05 - Setting up the Redux store with configureStore()
// 06 - Integrating React-Redux: Provider component and useDispatch/useSelector hooks
// 07 - TypeScript support in RTK: defining RootState and AppDispatch types
// 08 - Enabling Redux DevTools with default configuration in RTK
// 09 - Using Redux Toolkit in a React Native environment (similar setup with react-native)




//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// ✅ REDUX TOOLKIT NOTES – 01: What is Redux Toolkit and Why Use It?

// 🧠 WHAT IS REDUX TOOLKIT?
// - Redux Toolkit (RTK) is the official, recommended way to write Redux logic.
// - It is a set of tools that simplify and improve Redux usage.
// - RTK includes utilities like `createSlice`, `configureStore`, and `createAsyncThunk`.
// - It is part of the @reduxjs/toolkit package and fully compatible with React Redux.

// 🔥 WHY WAS REDUX TOOLKIT CREATED?
// - To solve the problems of **boilerplate code** and **complex setup** in vanilla Redux.
// - Traditional Redux requires:
//     - Creating action types
//     - Writing action creators
//     - Manually handling immutable updates
//     - Configuring middleware manually
// - This made Redux harder for beginners and tedious for large projects.

// ✅ WHY USE REDUX TOOLKIT?
// 1. 🧱 `createSlice`: Combines reducers, actions, and state in one function.
// 2. ⚙️ `configureStore`: Simplifies store setup and includes useful defaults (like thunk).
// 3. 🔁 `createAsyncThunk`: Handles async logic like API calls with auto-generated actions.
// 4. 📡 `createApi`: Built-in tool for data fetching and caching (RTK Query).
// 5. 🔐 Built-in `Immer`: Lets you write “mutating” code that stays immutable.
// 6. 🚀 DevTools: Automatically enabled for debugging Redux state changes.
// 7. 📦 Cleaner and smaller codebase = faster development and easier testing.

// 📘 KEY BENEFITS
// - Less boilerplate code
// - Easier to read and maintain
// - Works great with both small and large apps
// - First-class support for async logic and APIs

// ✅ Summary:
// Redux Toolkit is the modern, simplified, and official way to write Redux.
// It’s designed to reduce boilerplate, simplify async handling, and improve productivity.



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 02: Comparison: Redux Toolkit vs Vanilla Redux vs Other State Libraries

// 🆚 REDUX TOOLKIT vs VANILLA REDUX

// 🔴 Vanilla Redux:
// - Requires manual creation of:
//     - Action types
//     - Action creators
//     - Reducer functions with switch-case
// - You must manually manage immutable state updates
// - Store setup needs combineReducers, applyMiddleware, and devTools integration manually
// - Async logic requires redux-thunk or redux-saga manually

// ✅ Redux Toolkit:
// - Uses `createSlice` to auto-generate action creators and reducers
// - Uses `configureStore` for simplified store setup with built-in middleware and devTools
// - Has `createAsyncThunk` for async logic (built-in thunk)
// - Built-in `Immer` handles immutability for you
// - Includes RTK Query for API data fetching and caching

// ✅ Example:
//
// 🔴 Vanilla Redux:
// const initialState = { value: 0 };
// function counterReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'INCREMENT': return { value: state.value + 1 };
//     default: return state;
//   }
// }
//
// ✅ Redux Toolkit:
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: { value: 0 },
//   reducers: { increment: (state) => { state.value += 1 } },
// });

// 🆚 REDUX TOOLKIT vs OTHER STATE MANAGEMENT LIBRARIES

// 🔹 Context API:
// - Good for small apps or light state needs
// - Not optimized for frequent updates (can cause re-renders)
// - No built-in middleware or async handling

// 🔹 Zustand / Jotai / Recoil:
// - Lightweight and modern state libraries
// - Easier than Redux but limited for complex app-wide logic
// - Don’t have as much ecosystem support or devtools maturity

// ✅ RTK Advantages:
// - Ideal for large and complex apps
// - Rich middleware, debugging, devtools, and patterns
// - First-party support from Redux team
// - Built-in API data layer (RTK Query)

// 📘 Summary:
// - RTK > Vanilla Redux: less boilerplate, built-in tools, easier async
// - RTK > Context: better for complex and scalable state
// - RTK is still the gold standard for large, robust React applications

// ✅ Next: 03 - Installing Redux Toolkit: npm install @reduxjs/toolkit react-redux

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 03: Installing Redux Toolkit

// 🛠️ GOAL:
// - Install Redux Toolkit and React-Redux to start using modern Redux in a React project.

// 📦 REQUIRED PACKAGES:
// 1. @reduxjs/toolkit → Core RTK package (includes createSlice, configureStore, createAsyncThunk, createApi, etc.)
// 2. react-redux → Official bindings to connect Redux with React components

// ✅ INSTALLATION COMMAND:
npm install @reduxjs/toolkit react-redux

// ✅ ALTERNATIVE (Yarn):
yarn add @reduxjs/toolkit react-redux

// 📁 FILE STRUCTURE TIP:
// Recommended to organize slices and store like this:
/*
src/
├── app/
│   └── store.js              // configureStore setup
├── features/
│   ├── counter/
│   │   └── counterSlice.js   // example feature slice
│   └── auth/
│       └── authSlice.js      // another feature slice
*/

// 🔍 CHECK INSTALLATION:
// - Open package.json
// - You should see:
//     "@reduxjs/toolkit": "^x.x.x",
//     "react-redux": "^x.x.x"

// ✅ Summary:
// - Run npm/yarn command to install Redux Toolkit and React Redux
// - This is the first step to using modern Redux in your app

// ✅ Next: 04 - Project structure for RTK: organizing store, features, and slices

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 04: Project Structure for RTK

// 📁 WHY FEATURE-BASED STRUCTURE?
// - Keeps your code modular and easy to maintain
// - Groups all logic related to a feature (state, API, UI) together
// - Scales well as your app grows

// 📦 RECOMMENDED FOLDER STRUCTURE:
/*
src/
├── app/                      // App-wide configuration
│   └── store.js              // configureStore with all slices
│
├── features/                 // Grouped by feature
│   ├── counter/              // Counter feature
│   │   └── counterSlice.js   // createSlice, actions, reducers
│
│   ├── auth/                 // Auth feature
│   │   ├── authSlice.js      // Local auth state logic
│   │   └── authAPI.js        // RTK Query API (login, logout)
│
│   └── products/             // Product feature
│       └── productSlice.js   // Cart/product state logic
│
├── services/                 // (optional) Shared RTK Query APIs
│   └── apiSlice.js           // Base createApi setup
│
├── components/               // Reusable presentational components
├── pages/                    // Page-level components (screens)
├── App.jsx                   // Root React component
└── main.jsx / index.js       // App entry point (with <Provider store={store}>)
*/

// 🧱 BREAKDOWN:

// - store.js:
//     - Calls configureStore()
//     - Registers all slices and middleware (like RTK Query)

// - features/[featureName]/[feature]Slice.js:
//     - Includes createSlice(), reducers, and actions

// - features/[featureName]/[feature]API.js (optional):
//     - Defines API endpoints using createApi()

// - services/apiSlice.js:
//     - Shared RTK Query slice used across features (e.g., userApi, productApi)

// ✅ BENEFITS:
// - Organized by responsibility, not file type
// - Easier navigation in large codebases
// - Makes onboarding and debugging faster

// ✅ Summary:
// Use a feature-based folder structure to organize RTK slices, APIs, and components logically.
// Keep global logic in `app/store.js` and feature-specific logic under `features/`.



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 05: Setting up the Redux Store with configureStore()

// 🧠 WHAT IS THE STORE?
// - The store is the centralized place that holds your entire app state.
// - It connects Redux state to your React components using the <Provider>.

// ⚙️ WHY USE configureStore?
// - Provided by Redux Toolkit to simplify traditional store setup
// - Automatically includes middleware like redux-thunk
// - Enables Redux DevTools by default
// - Easier reducer composition and configuration

// ✅ MINIMAL EXAMPLE:

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer, // combine all slices here
  },
});

export default store;

// ✅ BREAKDOWN:
// - reducer: An object where each key is a slice name, and the value is that slice’s reducer
// - middleware: (optional) can be added using getDefaultMiddleware()
// - devTools: true by default; you can explicitly set devTools: false for production

// ✅ WITH RTK QUERY (optional)

import { apiSlice } from '../services/apiSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// ✅ Summary:
// - Use configureStore to set up your Redux store easily
// - Register your slice reducers and (optionally) RTK Query API reducer
// - Add middleware if needed using getDefaultMiddleware()

// ✅ Next: 06 - Integrating React-Redux: Provider component and useDispatch/useSelector hooks


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 06: Integrating React-Redux with Provider, useDispatch, and useSelector

// ⚛️ WHY INTEGRATE REDUX WITH REACT?
// - To allow all React components access to the Redux store
// - To read state: useSelector()
// - To dispatch actions: useDispatch()

// ✅ STEP 1: WRAP <App /> WITH <Provider>

// - The Provider component from react-redux makes the store available to all components in your app.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store'; // adjust path if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// ✅ STEP 2: useSelector – Reading state from the store

import { useSelector } from 'react-redux';

const count = useSelector((state) => state.counter.value);
// Accesses the 'value' inside the 'counter' slice of the store

// ✅ STEP 3: useDispatch – Dispatching actions to update the store

import { useDispatch } from 'react-redux';
import { increment } from './features/counter/counterSlice';

const dispatch = useDispatch();
dispatch(increment()); // triggers the increment reducer

// ✅ SUMMARY:
// - Wrap your app with <Provider store={store}> in main.jsx/index.js
// - useSelector() → to read state from Redux store
// - useDispatch() → to trigger actions defined in createSlice

// ✅ Next: 07 - TypeScript support in RTK: defining RootState and AppDispatch types

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// ✅ REDUX TOOLKIT NOTES – 07: TypeScript Support in Redux Toolkit

// 🧠 WHY TYPE YOUR REDUX SETUP?
// - Ensures safer code and better auto-completion
// - Helps catch errors early during development
// - Makes dispatching actions and selecting state strictly typed

// ✅ STEP 1: DEFINE RootState AND AppDispatch TYPES

// 👉 store.ts or store.js (if you're using .ts, rename to store.ts)

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// ✅ Infer the types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// ✅ STEP 2: CREATE TYPED HOOKS

// 👉 hooks.ts (recommended to place in src/app/hooks.ts)

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ✅ STEP 3: USE THE TYPED HOOKS IN COMPONENTS

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { increment } from '../features/counter/counterSlice';

const count = useAppSelector((state) => state.counter.value);
const dispatch = useAppDispatch();
dispatch(increment());

// ✅ SUMMARY:
// - Define RootState and AppDispatch in your store file
// - Create reusable typed hooks: useAppSelector, useAppDispatch
// - Always use these instead of the base useSelector/useDispatch in a TypeScript project

// ✅ Next: 08 - Enabling Redux DevTools with default configuration in RTK

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 08: Enabling Redux DevTools with configureStore

// 🧠 WHAT IS REDUX DEVTOOLS?
// - A browser extension that allows you to inspect every action and state change in your Redux store.
// - You can:
//     - See all dispatched actions
//     - View previous and next state
//     - Time-travel through state history
//     - Revert, replay, or jump to specific actions

// 🔧 HOW TO ENABLE DEVTOOLS IN RTK?
// - Redux Toolkit enables DevTools by default in development mode.
// - You can explicitly set `devTools: true` or `false` inside configureStore for control.

// ✅ EXAMPLE:

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true, // Optional: defaults to true in development
});

export default store;

// 🛑 DISABLE IN PRODUCTION (optional best practice)

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // DevTools only in development
});

// 🧪 HOW TO USE:
// - Install the "Redux DevTools" extension in Chrome or Firefox
// - Open your app in the browser
// - Press F12 → Go to "Redux" tab → Interact with your app
// - You’ll see dispatched actions and state snapshots

// ✅ SUMMARY:
// - Redux DevTools are auto-enabled by RTK in dev
// - Useful for debugging, time-traveling, and inspecting app state
// - Explicitly control it with the devTools option in configureStore

// ✅ Next: 09 - Using Redux Toolkit in a React Native environment (similar setup with react-native)


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – 09: Using Redux Toolkit in a React Native Environment

// 📱 DOES REDUX TOOLKIT WORK WITH REACT NATIVE?
// Yes! Redux Toolkit is platform-agnostic and works the same in React Native as in React.js (web).
// Only minor environment-specific tweaks are required (e.g., AsyncStorage instead of localStorage).

// ✅ INSTALLATION (same as React web):
npm install @reduxjs/toolkit react-redux

// ✅ BASIC SETUP:

// 1. Create the store using configureStore()
// 2. Wrap your <App /> in the <Provider store={store}> (usually in App.js or index.js)
// 3. Use hooks like useDispatch and useSelector in your components

// ✅ Example setup in React Native (App.js):

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

// ✅ Tips for React Native:
// - No need for Redux DevTools unless you use React Native Debugger or Flipper.
// - For persistent storage, use redux-persist with @react-native-async-storage/async-storage.

// ✅ Example for AsyncStorage support:
npm install redux-persist @react-native-async-storage/async-storage

// ✅ SUMMARY:
// - RTK setup is nearly identical in React Native
// - Works seamlessly with <Provider />, useSelector, useDispatch
// - Optional: configure redux-persist to persist your store

// ✅ Next: 🔤 CORE RTK CONCEPTS → createSlice(), reducers, and store structure


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////