import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUiGames } from '../../../actions/ui_actions'
// import { swapClass } from '../../../util/helper_functions'
import NavBrowseMenu from './browse/nav_browse_menu'

const mdp = dispatch => {
  //  
  return {clearUiGames: () => dispatch(clearUiGames())}
}

class NavOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      className: 'none',
      visible: false,  
    }
    this.addVisible = this.addVisible.bind(this)
    this.removeVisible = this.removeVisible.bind(this)
  }

  componentDidMount() {
    const root = document.getElementById('root')
    root.addEventListener('onclick', e => {
      // debugger
      this.removeVisible()
    })
    // debugger 
  }

  addVisible(e) {
    e.stopPropagation()
    this.setState({visible: true})
  }

  removeVisible(e) {
     
    e.stopPropagation()
    this.setState({visible: false})
  }

  render () {
    
    const display = this.state.visible ? 
      <NavBrowseMenu closeParent={this.removeVisible}/> : null

    return (
      <ul className='nav-options'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>My Rack</Link></li>
        <li className='browse'
          onMouseOver={this.addVisible} 
          onMouseLeave={this.removeVisible}
          >

          <Link to='/index' onClick={this.props.clearUiGames}>Browse</Link>
          {display}
        </li>
      </ul>
    )
  }
}

export default connect(null, mdp)(NavOptions)