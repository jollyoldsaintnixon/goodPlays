import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeFormContainer from './welcome_form_container'
import NavIcons from './nav_bar/nav_icons'
import NavBar from './nav_bar/nav_bar'

class Welcome extends React.Component {

  display() {
    const { currentUser } = this.props
    if (currentUser) {
      return (
        <>
          <NavIcons />

        </>
      );
    } else {
      return (
        
        <ul className='toplist'>
          <WelcomeFormContainer />
        </ul>
      );
    }
  }

  render () {
    return (
      <header className='header'>
        <nav className=''>
          <h1 className='logo'><Link to='/' className='link'>good<strong>Plays</strong></Link></h1>
          <NavBar />
          {this.display()}
        </nav>
      </header>
    )
  }
}

export default Welcome