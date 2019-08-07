import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/session_actions'

class NavIcons extends React.Component {

  handleClick(e) {
    e.preventDefault()
    const that = this
    logout()
      .then(success => {
        that.props.history.push('/')
      }
      // , error => {
      //   that.props.history.push('/signup')
      // }
      )
  } 

  render() {
    const { currentUser, logout } = this.props
    return (
      <ul className='nav-icons'>
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