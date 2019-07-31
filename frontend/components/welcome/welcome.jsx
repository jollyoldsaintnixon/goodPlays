import React from 'react';
import { Link } from 'react-router-dom';

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
        <ul className=''>
          <li><Link to='/signup' className="link">Sign Up</Link></li>
          <li><Link to='/login' className="link">Log In</Link></li>
        </ul>
      );
    }
  }

  render () {
    return (
      <header className='header'>
        <nav className=''>
          <h2 className=''><Link to='/' className='link'>goodPlays</Link></h2>
          {this.display()}
        </nav>
      </header>
    )
  }
}

export default Welcome