import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../actions/session_actions'

class NavIcons extends React.Component {

  render() {
    const { currentUser, logout } = this.props
    return (
      <ul>
        <h2>Welcome, {currentUser.username}!</h2>
        <button onClick={logout}>Log Out</button>
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