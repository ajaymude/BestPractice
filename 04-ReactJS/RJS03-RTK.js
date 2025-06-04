// ✅ REDUX TOOLKIT MASTER SYLLABUS (WITH RTK QUERY - REM)

// 🧠 1. CORE CONCEPTS
// - What is Redux?
// - Why use Redux Toolkit?
// - Problems with Traditional Redux
// - Benefits of Redux Toolkit

// ⚙️ 2. SETUP
// - Installing Redux Toolkit and React-Redux
// - Setting up the Redux store
// - Integrating <Provider> with React

// 🧱 3. SLICE
// - Creating a slice using createSlice
// - Defining name, initialState, reducers
// - Exporting actions and reducers

// 🚀 4. DISPATCH & SELECT
// - useDispatch to trigger actions
// - useSelector to access state
// - Connecting components to the store

// 📦 5. REDUX DEVTOOLS
// - Enable and use Redux DevTools for debugging

// 🔁 6. ASYNC LOGIC
// - createAsyncThunk for handling async operations
// - Handling pending, fulfilled, rejected states

// 🧩 7. EXTRA REDUCERS
// - Defining extraReducers to manage asyncThunk
// - Separating logic for cleaner reducers

// 🧪 8. MIDDLEWARE
// - Redux Thunk middleware (default in RTK)
// - Adding custom middleware if needed

// 🔗 9. MULTIPLE SLICES
// - Creating multiple slice files
// - Combining slices in configureStore
// - Managing modular feature-based state

// 🧼 10. BEST PRACTICES
// - Feature-based folder structure
// - Clean and consistent naming
// - Keeping logic modular
// - Avoiding direct state mutations

// 🧠 11. ADVANCED TOPICS
// - Using createEntityAdapter for normalized data
// - Memoization with reselect
// - Using TypeScript with Redux Toolkit
// - Writing unit tests for slices and async logic

// 🌐 12. RTK QUERY (REM - REMOTE STATE MANAGEMENT)
// - Introduction to RTK Query
// - Setting up createApi service
// - Defining endpoints: query and mutation
// - Auto-generated React hooks
// - Caching, refetching, polling
// - Handling loading, error, data states
// - Optimistic updates and cache invalidation
// - Adding API reducer and middleware to the store

// 📁 13. FILE & FOLDER STRUCTURE
// - Organizing slices, services, and store setup
// - Suggested feature-based folder layout

// 💡 14. PRACTICAL PROJECT IDEAS
// - Blog App (posts, comments, user auth)
// - E-commerce Cart (products, checkout, orders)
// - Task Manager (todos, filters, CRUD with RTK Query)

// 🏁 You are now ready to start learning Redux Toolkit and RTK Query step by step!



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 🧠 1. CORE CONCEPTS

// ✅ REDUX TOOLKIT NOTES – STEP 1: CORE CONCEPTS

// 🧠 What is Redux?
// - Redux is a JavaScript library for managing application state globally.
// - It provides a central "store" where all the app's state lives.
// - Helps keep state predictable and manageable.
// - Commonly used with React but can work with any JavaScript framework.

// Example Use Case:
// - A shopping cart app: Redux stores cart data so all components (Product, Cart, Checkout) access the same source of truth.

// 💭 Why Use Redux Toolkit?
// - Redux Toolkit (RTK) is the official, recommended way to use Redux.
// - It simplifies Redux setup and usage.
// - Reduces boilerplate code by combining actions and reducers in one place.
// - Built-in features: createSlice, configureStore, createAsyncThunk, createApi.

// ⚠️ Problems with Traditional Redux
// - Too much boilerplate: You write action types, action creators, and reducers separately.
// - Complex async logic: Required extra libraries like redux-thunk or redux-saga.
// - Scattered logic: State logic is split across multiple files per feature.
// - Manual setup: Had to manually integrate middleware and DevTools.

// ✅ Benefits of Redux Toolkit
// - 🧱 createSlice: Combines reducer + actions in one function.
// - ⚙️ configureStore: Simplifies store setup and includes DevTools + middleware.
// - 🔁 createAsyncThunk: Handles async operations with ease.
// - 🌐 createApi: Advanced API layer with auto caching, refetching (RTK Query).
// - 🔒 Built-in Immer: Allows "mutating" state safely using immutable logic.
// - 📦 Cleaner, smaller codebase with less repetition.

// 🏁 Summary:
// Redux = centralized state management
// Redux Toolkit = modern, simplified, powerful way to use Redux

// ✅ Next Step: Installation & Store Setup


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ⚙️ 2. SETUP
// - Installing Redux Toolkit and React-Redux
// - Setting up the Redux store
// - Integrating <Provider> with React


// ✅ REDUX TOOLKIT NOTES – STEP 2: SETUP

// ⚙️ INSTALLATION
// - Install Redux Toolkit and React-Redux using npm:
//   npm install @reduxjs/toolkit react-redux

// ⚙️ SETTING UP THE STORE
// - Redux Toolkit provides `configureStore()` to create the store easily.
// - It automatically enables Redux DevTools and adds middleware like redux-thunk.

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice'; // sample slice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// ⚛️ INTEGRATING <Provider> WITH REACT
// - Wrap your <App /> with <Provider store={store}> to make the store available in your app.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// ✅ Summary:
// - Install @reduxjs/toolkit and react-redux
// - Use configureStore to create the store and add reducers
// - Use <Provider> in your main file to give access to Redux in your app

// ✅ Next Step: Creating slices using createSlice


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 🧱 3. SLICE
// - Creating a slice using createSlice
// - Defining name, initialState, reducers
// - Exporting actions and reducers

// ✅ REDUX TOOLKIT NOTES – STEP 3: SLICE

// 🧱 WHAT IS A SLICE?
// - A "slice" in Redux Toolkit represents a piece of the global state and its logic.
// - It includes:
//   - A name (used in actions and devtools)
//   - An initial state
//   - Reducers (functions that modify the state)
//   - Automatically generated actions
// - Redux Toolkit provides the `createSlice()` method to create all of this easily.

import { createSlice } from '@reduxjs/toolkit';

// ✅ Example: Counter Slice
const counterSlice = createSlice({
  name: 'counter', // name of this slice
  initialState: { value: 0 }, // state structure
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// ✅ Export actions to use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// ✅ Export reducer to use in the store
export default counterSlice.reducer;

// ✅ Summary:
// - A slice defines a state + reducers + actions in one file
// - You use `createSlice()` to generate these easily
// - Export the actions to trigger them
// - Export the reducer to include it in configureStore

// ✅ Next Step: Async logic with createAsyncThunk and extraReducers


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 4: DISPATCH & SELECT

// 🚀 PURPOSE:
// - To read data from the Redux store → useSelector()
// - To send actions to the Redux store → useDispatch()
// - These are React-Redux hooks and must be used inside function components

// ✅ useSelector
// - Reads a specific value from the Redux state
// - You pass a function that returns the desired slice of state

// ✅ useDispatch
// - Returns the dispatch function from the Redux store
// - You use it to trigger actions like increment, addTodo, etc.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter = () => {
  // Read data from Redux state
  const count = useSelector((state) => state.counter.value);

  // Get dispatch function to send actions
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment +1</button>
      <button onClick={() => dispatch(decrement())}>Decrement -1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment +5</button>
    </div>
  );
};

export default Counter;

// ✅ Summary:
// - useSelector reads state from Redux store
// - useDispatch sends actions to update the store
// - These hooks connect React components to Redux

// ✅ Next Step: Async logic with createAsyncThunk and extraReducers


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 5: REDUX DEVTOOLS

// 📦 WHAT IS REDUX DEVTOOLS?
// - A powerful Chrome/Firefox extension for tracking Redux state changes
// - Allows you to inspect every dispatched action and see how state updates
// - Helps with debugging, testing, and understanding data flow in your app

// ✅ FEATURES:
// - Time-travel debugging (go back in time through actions)
// - Inspect state before/after every action
// - Replay or cancel actions
// - Monitor performance

// ⚙️ SETUP WITH REDUX TOOLKIT:
// - Redux Toolkit's `configureStore()` has DevTools enabled by default
// - You don’t need to manually install or configure anything extra

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true, // this is true by default, added here just to show explicitly
});

export default store;

// 🧪 How to use DevTools:
// - Install "Redux DevTools" extension in Chrome or Firefox
// - Open your app → Inspect → Redux tab (after interacting with your app)
// - You’ll see a list of dispatched actions and state snapshots

// ✅ Summary:
// - Redux DevTools help visualize state changes and debug easily
// - Enabled by default in Redux Toolkit
// - No extra setup required beyond using `configureStore`

// ✅ Next Step: Handling async logic using createAsyncThunk


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 6: ASYNC LOGIC

// 🔁 WHY ASYNC LOGIC?
// - In real-world apps, you often need to fetch data from an API.
// - Redux Toolkit provides `createAsyncThunk()` to simplify handling async operations.
// - It automatically handles the three states of an async request:
//     1. pending
//     2. fulfilled
//     3. rejected

// ✅ createAsyncThunk
// - Helps you define an async action (e.g., fetchUsers)
// - It auto-generates action types for the 3 states
// - Works seamlessly with `extraReducers` inside a slice

// ✅ EXAMPLE: Fetch users from an API using createAsyncThunk

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Slice to handle user state and async lifecycle
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {}, // no regular reducers here
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

// ✅ Summary:
// - Use createAsyncThunk to define API calls or other async work
// - Handle the result in extraReducers using builder.addCase()
// - Track loading, success, and error states in your state
// - Clean and powerful way to handle async in Redux Toolkit

// ✅ Next Step: Handle side-effects using RTK Query (createApi)


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// ✅ REDUX TOOLKIT NOTES – STEP 7: EXTRA REDUCERS

// 🧩 WHAT ARE extraReducers?
// - extraReducers is a field inside createSlice that lets you respond to actions not defined in the slice’s own reducers.
// - Mainly used with createAsyncThunk to handle async actions (pending, fulfilled, rejected).
// - Keeps your slice clean by separating async logic from sync reducers.

// ✅ WHY USE extraReducers?
// - When you use createAsyncThunk, it auto-generates action types (e.g., users/fetchUsers/pending).
// - You use extraReducers to handle those actions.
// - It's also used when a slice needs to respond to actions from other slices or APIs.

// ✅ SYNTAX OPTIONS:
// - builder.addCase(action, reducerFunction)
// - builder.addMatcher(...)
// - builder.addDefaultCase(...)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

// Create slice using extraReducers
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    // sync reducers (optional)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

// ✅ Summary:
// - Use extraReducers when your slice depends on external actions like async thunk
// - Keeps reducers clean by separating sync and async logic
// - builder syntax gives you flexibility to match many action types

// ✅ Next Step: RTK Query – createApi and automated data fetching


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////// ✅ REDUX TOOLKIT NOTES – STEP 8: MIDDLEWARE

// 🧪 WHAT IS MIDDLEWARE?
// - Middleware in Redux is a function that intercepts every action before it reaches the reducer.
// - Used for side-effects like logging, async calls, API handling, analytics, etc.
// - Redux Toolkit includes Redux Thunk by default, so you can write async logic using functions.

// ✅ THUNK MIDDLEWARE
// - Redux Thunk allows you to write action creators that return functions (not plain objects).
// - RTK includes it automatically in configureStore, so no need to add it manually.

// ✅ ADDING CUSTOM MIDDLEWARE
// - You can pass a custom list of middleware in the `middleware` field of configureStore.
// - Useful for logging actions, performance tracking, auth, etc.

const customLoggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', storeAPI.getState());
  return result;
};

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customLoggerMiddleware),
});

export default store;

// ✅ Summary:
// - Middleware allows you to extend Redux’s dispatch behavior.
// - Redux Thunk is included by default for async logic.
// - You can easily add custom middleware for logging, auth, analytics, etc.

// ✅ Next Step: RTK Query – createApi for remote data management




//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 9: MULTIPLE SLICES

// 🔗 WHY MULTIPLE SLICES?
// - Each feature in your app (auth, cart, users, products, etc.) should have its own slice.
// - This makes your code modular, maintainable, and easier to debug.
// - You can combine all slices in one root store using `configureStore`.

// ✅ FILE STRUCTURE (recommended)
/*
src/
├── app/
│   └── store.js
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   ├── cart/
│   │   └── cartSlice.js
│   └── counter/
│       └── counterSlice.js
*/

// ✅ EXAMPLE: COMBINING MULTIPLE SLICES

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    counter: counterReducer,
  },
});

export default store;

// ✅ HOW TO ACCESS STATE IN COMPONENTS
// - useSelector((state) => state.auth)
// - useSelector((state) => state.cart)
// - useSelector((state) => state.counter.value)

// ✅ Summary:
// - Create separate slice files for each feature
// - Import all reducers into your store and register them under the `reducer` field
// - This makes your Redux logic modular and scalable

// ✅ Next Step: RTK Query – Full API data management using createApi


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 10: BEST PRACTICES

// 🧼 WHY BEST PRACTICES MATTER?
// - Keeping your Redux Toolkit setup clean and consistent makes your project easier to read, debug, and scale.
// - Especially important for team collaboration and large applications.

// 🗂️ FEATURE-BASED FOLDER STRUCTURE
// - Organize your code by features, not by type (no global reducers/ folder).
// - Keeps all logic (slice, API, components) for one feature together.

/*
src/
├── app/              // store.js lives here
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── LoginForm.jsx
│   ├── cart/
│   │   ├── cartSlice.js
│   │   └── CartView.jsx
│   └── user/
│       ├── userSlice.js
│       └── userAPI.js
*/

// ✍️ CLEAN AND CONSISTENT NAMING
// - Name slices with feature names: `authSlice`, `cartSlice`
// - Name actions meaningfully: `loginUser`, `addToCart`, `fetchUserData`
// - Name state keys after feature: `state.auth`, `state.cart`

// 🧱 KEEPING LOGIC MODULAR
// - Keep each slice small and focused on one thing (e.g., cartSlice handles only cart logic).
// - Avoid putting unrelated logic in the same slice.
// - If logic grows too much, split it into multiple slices or service files.

// 🔒 AVOID DIRECT STATE MUTATIONS
// - Redux Toolkit uses Immer under the hood so you *can* write "mutating" code (e.g., state.value += 1)
// - But still keep reducer logic pure and predictable.
// - Don’t perform side-effects like API calls or setTimeout inside reducers.

// ✅ Summary:
// - Organize by features for modularity
// - Name things clearly and consistently
// - Keep slice logic focused and small
// - Write safe, clear reducer logic even with Immer

// ✅ Next Step: Advanced features like createEntityAdapter, RTK Query, and Optimistic Updates


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 11: ADVANCED TOPICS

// 🧠 WHY ADVANCED TOPICS?
// - These tools and techniques improve performance, scalability, maintainability, and developer productivity.
// - Essential for large projects and production-level applications.

// 🔁 USING createEntityAdapter
// - Used for managing normalized collections of data (like lists of users, posts, todos).
// - Automatically generates selectors (e.g., selectAll, selectById).
// - Improves performance when updating/deleting items in large lists.
// - Keeps state structured like:
//     {
//       ids: ['1', '2'],
//       entities: {
//         1: { id: '1', name: 'Alice' },
//         2: { id: '2', name: 'Bob' }
//       }
//     }

// 💡 MEMOIZATION WITH RESELECT
// - `reselect` is a library used to create memoized selectors.
// - Prevents unnecessary re-renders in components by caching computed values.
// - Combine multiple pieces of state or compute derived values without performance loss.

// ✅ USING TYPESCRIPT WITH REDUX TOOLKIT
// - RTK is built with TypeScript and provides full type safety out-of-the-box.
// - You can type:
//     - initial state
//     - action payloads
//     - thunk arguments and return types
//     - useSelector using RootState
// - Makes code safer and easier to refactor with strong IntelliSense and type checking.

// 🧪 WRITING UNIT TESTS
// - You can write unit tests for slices, actions, and async logic.
// - Test pure reducers by passing fake actions and checking state changes.
// - Mock async functions to test thunks and async flow.
// - RTK slices are easy to test because of predictable structure and pure reducer logic.

// ✅ Summary:
// - createEntityAdapter → handle large normalized lists efficiently
// - reselect → optimize performance with memoized selectors
// - TypeScript → improves safety and developer experience
// - Testing → ensures reliability and maintainability of Redux logic

// ✅ Next Step: RTK Query – Automated data fetching, caching, and mutations with createApi


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 12: RTK QUERY (REM – Remote State Management)

// 🌐 INTRODUCTION TO RTK QUERY
// - RTK Query is a powerful data fetching and caching tool built into Redux Toolkit.
// - Eliminates the need for Axios, useEffect, and manual state handling for API calls.
// - Built on top of createApi() and fetchBaseQuery().

// 🛠️ SETTING UP createApi SERVICE
// - Use `createApi()` to define a centralized API service.
// - Inside it, define all API endpoints (GET, POST, PUT, DELETE, etc.).
// - RTK Query automatically generates React hooks for each endpoint.

// 🧾 DEFINING ENDPOINTS: QUERY AND MUTATION
// - `builder.query()` is used for fetching data (GET).
// - `builder.mutation()` is used for creating, updating, deleting data (POST, PUT, DELETE).
// - You define each with:
//     - query: { url, method, body }
//     - optional: providesTags, invalidatesTags

// ⚛️ AUTO-GENERATED REACT HOOKS
// - RTK Query creates custom hooks automatically based on endpoint names.
// - Examples:
//     - useGetPostsQuery()
//     - useAddUserMutation()
//     - useDeleteTodoMutation()

// 🔄 CACHING, REFETCHING, POLLING
// - Data is automatically cached and reused.
// - You can:
//     - Set `refetchOnMountOrArgChange: true`
//     - Enable background updates with pollingInterval
//     - Invalidate cache after mutation using `invalidatesTags`

// 🔁 HANDLING LOADING, ERROR, DATA STATES
// - Each query hook provides states:
//     - isLoading, isFetching, isError, error, data
// - You can show loaders, error messages, and UI based on these values

// ⚡ OPTIMISTIC UPDATES AND CACHE INVALIDATION
// - Use `onQueryStarted` to apply changes to the UI before server response
// - Improves user experience for fast UI feedback
// - Use `invalidatesTags` and `providesTags` for automatic cache refresh after mutations

// 🏗️ ADDING API REDUCER AND MIDDLEWARE TO STORE
// - In configureStore():
//     - Add the API’s reducer using `[api.reducerPath]: api.reducer`
//     - Add the middleware using `.concat(api.middleware)`

// ✅ Summary:
// - RTK Query simplifies API handling with auto-generated hooks
// - Handles loading, error, and cache automatically
// - Reduces boilerplate for fetching, creating, updating, deleting data
// - Boosts performance and user experience with caching and optimistic updates

// ✅ Next Step: Project structure, entity adapter, and real use cases



// ✅ REDUX TOOLKIT NOTES – STEP 12: RTK QUERY (REM – Remote State Management)

// 🌐 INTRODUCTION TO RTK QUERY
// - RTK Query simplifies fetching, caching, and updating remote data.
// - It uses createApi to define endpoints and generates React hooks automatically.

// 🛠️ SETUP: createApi service

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi', // key in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = userApi;

// 🏗️ STORE SETUP: Add reducer and middleware

import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;

// ⚛️ USAGE IN COMPONENT

import React, { useState } from 'react';
import { useGetUsersQuery, useAddUserMutation } from './services/userApi';

const UserList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [newName, setNewName] = useState('');

  const handleAddUser = async () => {
    if (newName.trim()) {
      await addUser({ name: newName });
      setNewName('');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New user name"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default UserList;

// ✅ Summary:
// - createApi defines endpoints with query and mutation
// - useGetUsersQuery and useAddUserMutation auto-generated
// - Built-in loading/error/data states make UI updates easier
// - Automatic caching, tag invalidation, and polling are supported



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 13: FILE & FOLDER STRUCTURE

// 📁 WHY FOLDER STRUCTURE MATTERS?
// - A clean, modular folder structure keeps your Redux code scalable and maintainable.
// - Separating concerns by feature (not by type) makes it easy to locate logic.
// - This approach is ideal for both small and large teams/projects.

// ✅ FEATURE-BASED LAYOUT (RECOMMENDED)
/*
src/
├── app/                      // Global app configuration
│   └── store.js              // configureStore, setup for middleware and reducers
│
├── features/                 // All Redux slices by feature
│   ├── counter/
│   │   └── counterSlice.js   // Logic for counter state
│   │
│   ├── auth/
│   │   └── authSlice.js      // Logic for login/register/logout
│   │
│   ├── user/
│   │   ├── userSlice.js      // For local state like form inputs, modals
│   │   └── userAPI.js        // RTK Query service for user-related APIs
│
├── services/                 // (optional) Shared RTK Query APIs if not tied to single feature
│   └── baseApi.js            // Shared createApi setup
│
├── components/               // Reusable UI components
│   └── Header.jsx
│
├── pages/                    // Page-level components (e.g., HomePage, LoginPage)
│   └── UserPage.jsx
│
├── hooks/                    // Custom hooks (optional)
│   └── useDebounce.js
│
├── App.jsx                   // Root React component
└── main.jsx / index.js       // React entry point with <Provider />
*/

// ✅ FILE RESPONSIBILITIES

// - app/store.js:
//   - Combines all reducers and middleware
//   - Registers API services

// - features/[featureName]/[featureName]Slice.js:
//   - Holds state + actions for that feature using createSlice

// - features/[featureName]/[featureName]API.js:
//   - RTK Query createApi logic for backend communication

// - services/baseApi.js (optional):
//   - Shared API setup for reuse across features

// - components/:
//   - Reusable presentational components, not tied to Redux

// - pages/:
//   - Page-level layout that might use hooks from multiple slices/services

// ✅ Summary:
// - Organize code by feature, not by type
// - Group slice and service files together
// - Keep store config separate and centralized in app/store.js

// ✅ Next Step: Final practice task or project idea for applying everything


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ✅ REDUX TOOLKIT NOTES – STEP 14: PRACTICAL PROJECT IDEAS

// 💡 WHY BUILD PROJECTS?
// - Real-world projects help you apply everything you've learned.
// - You'll reinforce concepts like slices, asyncThunk, RTK Query, caching, and optimistic updates.

// 📝 1. BLOG APP (Posts, Comments, User Auth)
// 🔹 Features:
//    - User login/register (authSlice)
//    - Fetch posts using RTK Query (getPosts query)
//    - Create, update, delete posts (mutations)
//    - Comment system (commentsSlice or RTK Query)
// 🔹 Concepts Applied:
//    - createSlice, createAsyncThunk for auth
//    - createApi for posts & comments
//    - providesTags, invalidatesTags
//    - useSelector, useDispatch for local states (e.g., modals)

// 🛒 2. E-COMMERCE CART APP (Products, Cart, Checkout)
// 🔹 Features:
//    - Fetch product list from API (getProducts query)
//    - Add/remove items from cart (cartSlice)
//    - Order submission (orderSlice + RTK Query mutation)
// 🔹 Concepts Applied:
//    - Modular slices (productSlice, cartSlice, orderSlice)
//    - RTK Query for backend integration
//    - Custom middleware for logging cart activity (optional)
//    - Optimistic UI updates when adding/removing items

// ✅ 3. TASK MANAGER (CRUD with Filters)
// 🔹 Features:
//    - Create, Read, Update, Delete tasks (tasks API)
//    - Filters: show all, completed, active tasks
//    - Toggle task completion
// 🔹 Concepts Applied:
//    - createApi with builder.query & builder.mutation
//    - Entity Adapter for normalized task management
//    - Memoized selectors for filtering
//    - useSelector for task filters and counts

// ✅ Summary:
// - Blog App → Best for mastering CRUD with auth
// - E-Commerce → Best for combining local + server state
// - Task Manager → Best for normalized data, filters, and reselect

// ✅ What’s Next?
// - Pick one project and build step-by-step using Redux Toolkit best practices
// - Start with store + slice structure, then connect components and APIs


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////











// 01 - installation npm install @reduxjs/toolkit react-redux
// 02 - create store
//    - configureStore
//               - reducer :{ cart:cartSliceReducer, auth:authReducer } // slice reducer
//               - middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) // add middleware
//               - devTools
// 03 - create slice
//    - createSlice
//               - name: 'counter' // name of the slice 
//               - initialState: { user:[], loading:false, error:null} // initial state
//               - reducers: { increment, decrement, incrementByAmount } // actions
//               - extraReducers: (builder) => { ... } // handle async actions
//                           - pending, fulfilled, rejected
//               - createAsyncThunk // create async actions
//               - export const { increment, decrement, incrementByAmount } = counterSlice.actions; // export actions
// 04 - connect react with the redux
//              - Provider
//              - store
// 05 - use redux in the react
//              - useSelector, useDispatch  
// 06 - rtk query
//             - createApi  
//             - injectEndpoints
//             - reducerPath
//             - baseQuery   
//                  - fetchBaseQuery
//                  - baseUrl
//             - endpoints
//             - builder.query
//                   - providesTags
//                   - query
//                        - url
//                        - method
//                        - body
//                   - invalidatesTags
//             - builder.mutation
//             - useGetUsersQuery
//             - useAddUserMutation 




/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 01 - installation 
// npm install @reduxjs/toolkit react-redux

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 02 - create store
//    - configureStore
//               - reducer :{ cart:cartSliceReducer, auth:authReducer } // slice reducer
//               - middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) // add middleware
//               - devTools




import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 03 - create slice
//    - createSlice
//               - name: 'counter' // name of the slice 
//               - initialState: { user:[], loading:false, error:null} // initial state
//               - reducers: { increment, decrement, incrementByAmount } // actions
//               - extraReducers: (builder) => { ... } // handle async actions
//                           - pending, fulfilled, rejected
//               - createAsyncThunk // create async actions
//               - export const { increment, decrement, incrementByAmount } = counterSlice.actions; // export actions








//    - Provider
//    - useSelector, useDispatch
//    - extraReducers
//    


//               - reducer :{ add:(state, action) => { state.value += action.payload; } }

// 03 - create  the slice 
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; }
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export default counterSlice.reducer;/


// slice with the asyncthunk 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching user data
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
// no need to export actions here, as we are only using async thunk


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 04 - connect react with the redux
//              - Provider
//              - store


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);



/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 05 - use redux in the react
//              - useSelector, useDispatch  
// 



import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { useGetUsersQuery } from './services/userApi';


import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './services/postApi';


const Counter = () => {

  // import and export the data from the redux store
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const { data: users, isLoading, error } = useGetUsersQuery();

  const { data: posts, isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();


    const handleAdd = async () => {
    if (newTitle.trim()) {
      await addPost({ title: newTitle, body: 'Demo body', userId: 1 });
      setNewTitle('');
    }
  };

  const handleUpdate = async (post) => {
    await updatePost({ ...post, title: post.title + ' (edited)' });
  };

  const handleDelete = async (id) => {
    await deletePost(id);
  };



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users</p>;

  return (
  <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>


    <div>
      <h2>User List</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  </div>



  );
};

export default Counter;



// use asyncthunk in the react 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

//   





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// 06 - rtk query
//             - createApi  
//             - injectEndpoints
//             - reducerPath
//             - baseQuery   
//                  - fetchBaseQuery
//                  - baseUrl
//             - endpoints
//             - builder.query
//                   - providesTags
//                   - query
//                        - url
//                        - method
//                        - body
//                   - invalidatesTags
//             - builder.mutation
//             - useGetUsersQuery
//             - useAddUserMutation 








// create slice 
// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi', // unique key in the store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = userApi;





import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // GET
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),

    // CREATE
    addPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),

    // UPDATE
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: ['Post'],
    }),

    // DELETE
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;










/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
