import React from 'react'
import BrowseSubMenu from './browse_sub_menu'
import { swapClass } from '../../../../util/helper_functions'

class NavBrowseMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // midClassName: 'none',
      genreVisible: false,
      categoryVisible: false,
    }
    this.genreArray = ['indie', 'action', 'adventure', 'casual', 'strategy', 'rpg', 'simulation',
                      'sports', 'racing', 'mmo', 'platform']
    this.categoryArray = ['single-player', 'multi-player', 'co-op']

    // this.swapCategoryVis = this.swapCategoryVis.bind(this)
    this.addGenreVisible = this.addGenreVisible.bind(this)
    this.addCategoryVisible = this.addCategoryVisible.bind(this)
    this.removeGenreVisible = this.removeGenreVisible.bind(this)
    this.removeCategoryVisible = this.removeCategoryVisible.bind(this)
  }

  // swapClass(midClassName) {
  //   return (e) => {
  //     debugger
  //     e.preventDefault()
  //     this.setState({ 
  //       midClassName: midClassName,
  //       genreVisible: false,
  //       categoryVisible: false,
  //      })
  //   }


  // }


  addGenreVisible(e) {
    e.stopPropagation()
    this.setState({ genreVisible: true })
  }

  removeGenreVisible(e) {
    e.stopPropagation()
    this.setState({ genreVisible: false })
  }

  addCategoryVisible(e) {
    e.stopPropagation()
    this.setState({ categoryVisible: true })
  }

  removeCategoryVisible(e) {
    e.stopPropagation()
    this.setState({ categoryVisible: false })
  }

  render() {
    
    const { genreVisible, categoryVisible } = this.state
    const displayGenre = genreVisible ? 
      <BrowseSubMenu type='genre'
        sections={this.genreArray}
        closeParent={this.props.closeParent} /> : null

    const displayCategory = categoryVisible ?
      <BrowseSubMenu type='category'
        sections={this.categoryArray}
        closeParent={this.props.closeParent} /> : null
    
    return (
      <ul className={`browse-menu`} >
        <li onMouseOver={this.addGenreVisible}
        // onMouseEnter={this.swapClass('inherit').bind(this)}
          onMouseLeave={this.removeGenreVisible}
          >By Genre
          {displayGenre}
        </li>
        <li 
        onMouseOver={this.addCategoryVisible}
        // onMouseEnter={this.swapClass('inherit').bind(this)}
          onMouseLeave={this.removeCategoryVisible}
          >By Category
          {displayCategory}
        </li>
      </ul>
    )

  }
}

export default NavBrowseMenu