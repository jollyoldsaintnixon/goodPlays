// gems
import React from 'react';
import { Switch } from 'react-router-dom'
// components
import WelcomeContainer from './welcome/welcome_container';
import LoginFormContainer from './session_form/login_form_container'
import SignupFormContainer from './session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'

const App = () => {
  return (
    <div>
      <h1>goodPlays</h1>
      <WelcomeContainer />
      <Switch>
        <AuthRoute path='/signup' component={SignupFormContainer} />
        <AuthRoute path='/login' component={LoginFormContainer} />
      </Switch>
    </div>
  );
};

export default App;