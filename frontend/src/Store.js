// store.js
import { createStore } from 'redux';

// Define your initial state
const initialState = {
  recipes: [],
  loginUsername: '',
};

// Define your reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload };
    case 'SET_LOGIN_USERNAME':
      return { ...state, loginUsername: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
