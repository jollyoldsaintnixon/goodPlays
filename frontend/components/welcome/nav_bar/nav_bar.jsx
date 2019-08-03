import React from 'react'
import { update } from '../../../util/helper_functions'
import NavIcons from './nav_icons'
import NavOptions from './nav_options'
import NavSearch from './nav-search'

class NavBar extends React.Component {
  constructor() {
    super()

    this.state= {
      search: ''
    }
  }

  render () {
    // const filteredGames = this.props.games.filter(
    //   (game) => {
    //     return game.name.toLowerCase().indexOf(
    //       this.state.search.toLowerCase()) !== -1;
    //   } 
    // )
    return (
      <div className='user-nav'>
        <NavOptions />
        {/* <input type="text" 
          className='search-bar'
          placeholder='Search' 
          value={this.state.search} 
          onChange={update('search', this)}/> */}
        <NavSearch />
        <NavIcons />
      </div>
    )
  }
}

export default NavBar