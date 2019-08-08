import React from 'react'
import BrowseSubMenu from './browse_sub_menu'
import { swapClass } from '../../../../util/helper_functions'

class NavBrowseMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {className: 'none'}
    this.genreArray = ['indie', 'action', 'adventure', 'casual', 'strategy', 'rpg', 'simulation',
                      'sports', 'racing', 'mmo', 'platform']
    this.categoryArray = ['single-player', 'multi-player', 'co-op']
  }

  render() {
    return (
      <ul className={`${this.props.className}  browse-menu`} >
        <li onMouseOver={swapClass('inherit', this)}
          onMouseOut={swapClass('none', this)}
          >By Genre
          <BrowseSubMenu type='genre'
            sections={this.genreArray} 
            className={this.state.className} />
        </li>
        <li onMouseOver={swapClass('inherit', this)}
          onMouseOut={swapClass('none', this)}
          >By Category
          <BrowseSubMenu type='category'
            sections={this.categoryArray}
            className={this.state.className} />
        </li>
      </ul>
    )

  }
}

export default NavBrowseMenu