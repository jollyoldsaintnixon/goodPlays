// gems
import React from 'react'
import ReactDOM from 'react-dom';
// store
import { configureStore } from './store/store';
// components
import Root from './components/root'



document.addEventListener("DOMContentLoaded", () => {
  
  const store = configureStore();
  const root = document.getElementById('root');
  // testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // end testing
  ReactDOM.render(<Root store={ store } />, root)
})