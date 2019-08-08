import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUiGames } from '../../../actions/ui_actions'
import { swapClass } from '../../../util/helper_functions'
import NavBrowseMenu from './browse/nav_browse_menu'

const mdp = dispatch => {
  // debugger
  return {clearUiGames: () => dispatch(clearUiGames())}
}

class NavOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {className: 'none'}
  }

  render () {
    return (
      <ul className='nav-options'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>My Rack</Link></li>
        <li className='browse'
          onMouseOver={swapClass('inherit', this)} 
          onMouseOut={swapClass('none', this)}>
          <Link to='/index' onClick={this.props.clearUiGames}>Browse</Link>
          <NavBrowseMenu className={this.state.className} />
        </li>
      </ul>
    )
  }
}

export default connect(null, mdp)(NavOptions)