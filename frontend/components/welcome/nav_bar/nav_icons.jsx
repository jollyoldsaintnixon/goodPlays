import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/session_actions'

class NavIcons extends React.Component {

  render() {
    const { currentUser, logout } = this.props
    return (
      <ul>
        <Link to='/profile'>Welcome, {currentUser.username}</Link>
        <button className='button' onClick={logout}>Log Out</button>
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