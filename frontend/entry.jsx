// gems
import React from 'react'
import ReactDOM from 'react-dom';
// store
import { configureStore } from './store/store';
// components
import Root from './components/root'
//testing
import * as APIGameUtil from './util/games_api_util'
import * as APIGameCommentUtil from './util/games_comments_api_util'
import * as Actions from './actions/game_comments_actions'



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
  // window.addGameComment = APIGameCommentUtil.addGameComment;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.update = APIGameCommentUtil.updateGameComment;
  window.fetchGameCommentsByGame = Actions.fetchGameCommentsByGame;
  window.addGameComment = Actions.addGameComment
  window.updateGameRating = APIGameUtil.updateGameRating
  // end testing
  ReactDOM.render(<Root store={ store } />, root)
})