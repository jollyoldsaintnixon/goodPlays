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
        <>
          <Link to='/signup' >Sign Up</Link>
          <Link to='/login' >Log In</Link>
        </>
      );
    }
  }

  render () {
    return (
      <>
        <h2>Welcome!</h2>
        {this.display()}
      </>
    )
  }
}

export default Welcome