// redux notes

// connect the react with the redux

// redux with the persister
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// how to goes on the top of the page  //  window.scrollTo(0, 0);
// how to write the search query

// learn about the URLSearchParams
// const urlParams = new URLSearchParams(location.search);
// const searchTermFromUrl = urlParams.get("searchTerm");
// urlParams.set("searchTerm", sidebarData.searchTerm);
// urlParams.set("sort", sidebarData.sort);



// protected route 

        // <Route element={<PrivateRoute />}>
        //   <Route path='/dashboard' element={<Dashboard />} />
        // </Route>
        // <Route element={<OnlyAdminPrivateRoute />}>
        //   <Route path='/create-post' element={<CreatePost />} />
        //   <Route path='/update-post/:postId' element={<UpdatePost />} />
        // </Route>


import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}


import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
}