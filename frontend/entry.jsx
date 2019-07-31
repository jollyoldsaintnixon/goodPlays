// gems
import React from 'react'
import ReactDOM from 'react-dom';
// store
import { configureStore } from './store/store';
// components
import Root from './components/root'
//testing
import * as APIUtil from './actions/session_actions'



document.addEventListener("DOMContentLoaded", () => {
  
  let store;
  const root = document.getElementById('root');
  // testing
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser}
      },
      session: { id: window.currentUser.id}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore()
  }
  // testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = APIUtil.login;
  window.signup = APIUtil.signup;
  // end testing
  ReactDOM.render(<Root store={ store } />, root)
})