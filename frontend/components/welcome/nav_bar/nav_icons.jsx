import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/session_actions'

class NavIcons extends React.Component {

  render() {
    const { currentUser, logout } = this.props
    return (
      <ul className='nav-icons'>
        <Link to='/profile'>Welcome, {currentUser.username}</Link>
        <Link to='/' className='button' onClick={logout}>Log Out</Link>
      </ul>
    )
  }
}

const msp = ({ session: { id }, entities: { users } }) => ({
  currentUser: users[id]
});

const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(NavIcons)