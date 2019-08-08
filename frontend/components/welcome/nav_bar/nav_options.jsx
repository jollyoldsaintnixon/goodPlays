import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUiGames } from '../../../actions/ui_actions'

const mdp = dispatch => {
  // debugger
  return {clearUiGames: () => dispatch(clearUiGames())}
}

class NavOptions extends React.Component {

  render () {
    return (
      <ul className='nav-options'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>My Rack</Link></li>
        <li><Link to='/index' onClick={this.props.clearUiGames}>Browse</Link></li>
        {/* <li><a href="#">Communities</a></li> */}
      </ul>
    )
  }
}

export default connect(null, mdp)(NavOptions)