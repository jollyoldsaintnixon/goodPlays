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
    <>
      <WelcomeContainer />
      <section className='main-section'>
        <h1>goodPlays</h1>
        <Switch>
          <AuthRoute path='/signup' component={SignupFormContainer} />
          <AuthRoute path='/login' component={LoginFormContainer} />
        </Switch>
      </section>
    </>
  );
};

export default App;