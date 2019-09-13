// gems
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import GameShowContainer from './games/game_show_container'
import GameShow from './games/game_show'
// import { css } from '@emotion/core';
// import { ClipLoader } from 'react-spinners';
// components
import { getCount } from '../actions/games_actions'
import LoginPageContainer from './signup_page/login_page_container'
import SignupFormContainer from './session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import Content from './content/content'
import SignupPageContainer from './signup_page/signup_page_container'
import SplashPage from './splash/splash_page'
import WelcomeContainer from './welcome/welcome_container'
import UserProfile from '../components/user/user_profile'
// import Footer from './footer/footer'

const mdp = dispatch => ({
  getCount: () => dispatch(getCount())
})

// const override = css`
//     display: block;
//     margin: 0 auto;
// `;


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: null, loading: true }
  }

  componentDidMount() {
    this.props.getCount();
  }

  render() {  
    
    return (
      <>
        <WelcomeContainer />
        <section className='main-section'>
          <img className='banner' src={window.banner} alt='Terror of the Amazon'/> 
          <Switch>
            <ProtectedRoute path='/profile' component={UserProfile} />
            <ProtectedRoute path='/profile' component={UserProfile} />
            <Route path='/index' component={Content} />
            <Route path='/games/show/:gameId' component={GameShowContainer} />
            {/* <Route path='/games/show/:gameId' component={GameShow} /> */}
            <Route path='/' exact component={SplashPage}/>
          </Switch> 
          <Switch>
            <AuthRoute path='/signup' exact component={SignupPageContainer} />
            <AuthRoute path='/login' component={LoginPageContainer} />
            <AuthRoute path='/' component={SignupFormContainer} />
          </Switch>
          {/* <ProtectedRoute path='/games/show/:gameId' component={GameShow} /> */}
    
        </section>
      </>
    );
  }
}



export default connect(null, mdp)(App);