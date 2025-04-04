



// 01 - installation 
// npm install @reduxjs/toolkit react-redux










// 02 - create store 
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});

// export default store;










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

// export default userSlice.reducer;










// 04 - connect react with the redux 
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










// 05 - use redux in the react 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
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








































// 02 -  rtk 

// installation 
// npm install @reduxjs/toolkit react-redux










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











// add slice in the store 
// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { userApi } from './services/userApi';

// const store = configureStore({
//   reducer: {
//     [userApi.reducerPath]: userApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userApi.middleware),
// });

// export default store;










// connect redux to react 
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './store';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );










// use rtk query in the react 
// UserList.jsx
// import React from 'react';
// import { useGetUsersQuery } from './services/userApi';

// const UserList = () => {
//   const { data: users, isLoading, error } = useGetUsersQuery();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching users</p>;

//   return (
//     <div>
//       <h2>User List</h2>
//       <ul>
//         {users?.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;





import React, { useState } from 'react';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './services/postApi';

const PostApp = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [newTitle, setNewTitle] = useState('');

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

  return (
    <div>
      <h2>📃 Posts</h2>

      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New post title"
      />
      <button onClick={handleAdd}>Add Post</button>

      <ul>
        {posts?.slice(0, 10).map((post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => handleUpdate(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default PostApp;





























// 🟢 Beginner Level – Core Redux Toolkit
// 1️⃣ Introduction to Redux Toolkit (RTK)
// 2️⃣ Installing RTK & React-Redux
// 3️⃣ Understanding configureStore
// 4️⃣ Creating Slices using createSlice
// 5️⃣ Using Actions & Reducers
// 6️⃣ Dispatching Actions with useDispatch
// 7️⃣ Accessing State with useSelector
// 8️⃣ Using Multiple Slices in a Store
// 9️⃣ Handling Local State vs Global State
// 10️⃣ Debugging with Redux DevTools

// 🟡 Intermediate Level – Asynchronous Logic with RTK
// 11️⃣ Understanding createAsyncThunk for API Calls
// 12️⃣ Handling API States (Loading, Success, Error)
// 13️⃣ Using extraReducers for Async Thunks
// 14️⃣ Fetching Data on Component Mount
// 15️⃣ Using Axios with RTK
// 16️⃣ Caching and Memoization in Redux
// 17️⃣ Error Handling in API Calls
// 18️⃣ Optimizing API Calls using Debouncing & Throttling
// 19️⃣ Manually Triggering API Refetching
// 20️⃣ Using Middleware in Redux Toolkit

// 🔵 Advanced Level – RTK Query (API State Management)
// 21️⃣ Introduction to RTK Query
// 22️⃣ Setting up createApi and fetchBaseQuery
// 23️⃣ Defining Queries (useGetSomethingQuery)
// 24️⃣ Defining Mutations (useCreateSomethingMutation)
// 25️⃣ Handling API Errors in RTK Query
// 26️⃣ Using RTK Query with prepareHeaders for Authentication
// 27️⃣ Caching & Auto-Caching in RTK Query
// 28️⃣ Optimistic Updates (Instant UI Update Before API Response)
// 29️⃣ Automatic API Refetching (refetchOnMountOrArgChange)
// 30️⃣ Polling API Calls (Auto-Refreshing Data Periodically)
// 31️⃣ Manual Cache Invalidation (invalidateTags)
// 32️⃣ Handling CRUD Operations with RTK Query
// 33️⃣ Using skipToken for Conditional Fetching
// 34️⃣ Fetching Data on User Interaction (Lazy Queries)
// 35️⃣ Prefetching Data for Better Performance (prefetch)

// 🔴 Expert Level – Advanced RTK Query Topics
// 36️⃣ Handling Pagination with RTK Query (?_page=1&_limit=10)
// 37️⃣ Infinite Scrolling with RTK Query
// 38️⃣ Real-time WebSockets with RTK Query
// 39️⃣ Streaming Data with WebSockets in Redux
// 40️⃣ Handling Authentication & JWT Tokens in RTK Query
// 41️⃣ Role-Based Access Control with RTK Query (useAuthQuery)
// 42️⃣ Using RTK Query with Form Submissions (File Uploads, etc.)
// 43️⃣ Redux Middleware & RTK Query Custom Base Queries
// 44️⃣ Handling Refresh Tokens in RTK Query
// 45️⃣ Writing Unit Tests for Redux Slices (redux-mock-store)
// 46️⃣ Writing Integration Tests for RTK Query APIs
// 47️⃣ Performance Optimization & Memory Management in RTK Query
// 48️⃣ Server-Side Rendering (SSR) with RTK Query in Next.js
// 49️⃣ Best Practices & Performance Tuning in Redux Toolkit
// 50️⃣ Microservices Data Fetching with RTK Query (Monorepo Setup)

// 🔥 Bonus Topics for Full Mastery
// ✅ Integrating Redux Toolkit with React Native
// ✅ Using Redux Toolkit in a Large-Scale Application
// ✅ Using Redux Toolkit with WebSockets & Firebase
// ✅ Migrating an Old Redux App to Redux Toolkit
// ✅ Combining Redux Toolkit with Zustand for Hybrid State Management
// ✅ Understanding Redux Middleware (Custom & Built-in Middleware like Thunks, Logger, etc.)

// 🚀 What’s Next?
// You’ve already learned the basics of Redux Toolkit & RTK Query. Now, you should start:

// Optimizing API calls using caching & pagination

// Adding authentication (JWT) with RTK Query

// Using WebSockets for real-time data

// Implementing infinite scroll with RTK Query

// Testing Redux API slices using Jest & React Testing Library

// Which topic do you want to focus on next? 🔥








