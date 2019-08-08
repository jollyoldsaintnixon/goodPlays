import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUiGames } from '../../../actions/ui_actions'
// import { swapClass } from '../../../util/helper_functions'
import NavBrowseMenu from './browse/nav_browse_menu'

const mdp = dispatch => {
  // debugger
  return {clearUiGames: () => dispatch(clearUiGames())}
}

class NavOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      className: 'none',
      visible: false,  
    }
    // this.swapClass = this.swapClass.bind(this)
    this.addVisible = this.addVisible.bind(this)
    this.removeVisible = this.removeVisible.bind(this)
  }

  // swapClass(className) {
  //   return (e) => {
  //     // debugger
  //     e.preventDefault()
  //     this.setState({ className: className })
  //   }
  // }

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
      <NavBrowseMenu className='show' /> : null

    return (
      <ul className='nav-options'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>My Rack</Link></li>
        <li className='browse'
          onMouseOver={this.addVisible} 
          // onClick={this.swapClass('show')} 
          // onMouseEnter={swapClass('inherit', this)} 
          // onMouseLeave={this.removeVisible}
          >

          <Link to='/index' onClick={this.props.clearUiGames}>Browse</Link>
          {/* <NavBrowseMenu className={this.state.className} /> */}
          {display}
        </li>
      </ul>
    )
  }
}

export default connect(null, mdp)(NavOptions)