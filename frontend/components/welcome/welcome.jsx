import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeFormContainer from './welcome_form_container'

class Welcome extends React.Component {

  display() {
    const { currentUser, logout } = this.props
    if (currentUser) {
      return (
        <>
          <h2>Welcome, {currentUser.username}!</h2>
          <button onClick={logout}>Log Out</button>
        </>
      );
    } else {
      return (
        
        <ul className='toplist'>
          <WelcomeFormContainer />
          <li>
            <ul className='sublist'>
              <li><input type='checkbox' id='forgot'/>Remember me</li>
              <li><a href="#">Forgot it?</a></li>
            </ul>
          </li>
          {/* <li><Link to='/login' className="link">Log In</Link></li> */}
        </ul>
      );
    }
  }

  render () {
    return (
      <header className='header'>
        <nav className=''>
          <h2 className=''><Link to='/' className='link'>good<strong>Plays</strong></Link></h2>
          {this.display()}
        </nav>
      </header>
    )
  }
}

export default Welcome