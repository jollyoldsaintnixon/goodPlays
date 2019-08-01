// gems
import React from 'react';
import { Switch } from 'react-router-dom'
// components
import WelcomeContainer from './welcome/welcome_container';
import LoginFormContainer from './session_form/login_form_container'
import SignupFormContainer from './session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
// import Content from './content/content'
import SignupPage from './signup_page/signup_page'

const App = () => {
  return (
    <>
      <WelcomeContainer />
      <section className='main-section'>
        <img className='banner' src={window.banner} alt='Terror of the Amazon'/>
        <SignupFormContainer />
        {/* <Content /> */}
        <Switch>
          <AuthRoute path='signup-page' exact component={SignupPage} />
          <AuthRoute path='/signup' exact component={SignupFormContainer} />
          <AuthRoute path='/login' component={LoginFormContainer} />
        </Switch>
      </section>
    </>
  );
};

export default App;