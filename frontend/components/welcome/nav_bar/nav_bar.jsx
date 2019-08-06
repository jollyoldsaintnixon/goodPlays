import React from 'react'
import { Link } from 'react-router-dom'
import WelcomeContainer from '../welcome_container'
import NavOptions from './nav_options'
import NavSearch from '../../search/nav-search'

class NavBar extends React.Component {
  constructor() {
    super()

    this.state= {
      search: ''
    }
  }

  render () {

    return (
      <div className='user-nav'>
        <NavOptions />
        <NavSearch />
      </div>
    )
  }
}

export default NavBar