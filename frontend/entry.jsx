//Gems
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import { configureStore } from './store/store'
import * as ApiUtil from './util/session_api_util'


document.addEventListener("DOMContentLoaded", () => {
  // testing
  window.logout = ApiUtil.logout
  window.login = ApiUtil.login
  window.signup = ApiUtil.signup
  // end testing
  const store = configureStore()
  const root = document.getElementById('root')
  ReactDOM.render(<h1>on the app</h1>, root)
})