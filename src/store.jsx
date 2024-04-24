// store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AuthReducer from './Component/AuthSlices';

const rootReducer = combineReducers({
  authState: AuthReducer,
  // Add other reducers here if needed
});

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (error) {
    // Handle errors here
  }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
