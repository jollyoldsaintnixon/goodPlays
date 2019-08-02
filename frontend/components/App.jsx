// gems
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import GameShow from './games/game_show'

// components
import WelcomeContainer from './welcome/welcome_container';
import LoginPageContainer from './signup_page/login_page_container'
import SignupFormContainer from './session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import Content from './content/content'
import SignupPageContainer from './signup_page/signup_page_container'

const App = () => {
  return (
    <>
      <WelcomeContainer />
      <section className='main-section'>
        <img className='banner' src={window.banner} alt='Terror of the Amazon'/>
        <Content />
        <Switch>
          <AuthRoute path='/signup' exact component={SignupPageContainer} />
          <AuthRoute path='/login' component={LoginPageContainer} />
          <AuthRoute path='/' component={SignupFormContainer} />

        </Switch>
        <ProtectedRoute path='/games/show/:gameId' component={GameShow} />

      </section>
    </>
  );
};

export default App;