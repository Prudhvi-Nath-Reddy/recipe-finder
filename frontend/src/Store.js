// store.js
import { createStore } from 'redux';

// Define your initial state
const initialState = {
  theme: {
    colors: {
      heading: "rgb(3 3 3)",
      text: "rgba(3 ,3, 3, 1)",
      white: "#fff",
      black: " #212529",
      button: "#080a0b"
    },
    media: {
      mobile: "768px",
      tab: "1108px"
    },
  },
  recipes: [],
  loginUsername: '',
};

// Define your reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
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
