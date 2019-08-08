import React from 'react'
import BrowseSubMenu from './browse_sub_menu'
import { swapClass } from '../../../../util/helper_functions'

class NavBrowseMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      midClassName: 'none',
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

  // swapGenreVis(e) {
  //   e.stopPropagation()
  //   debugger
  //   const newVis = !this.state.genreVisible
  //   this.setState({genreVisible: newVis})
  // }

  // swapCategoryVis(e) {
  //   e.stopPropagation()
  //   const newVis = !this.state.categoryVisible
  //   this.setState({ categoryVisible: newVis })
  // }

  render() {
    debugger
    const { genreVisible, categoryVisible } = this.state
    const displayGenre = genreVisible ? 
      <BrowseSubMenu type='genre'
        sections={this.genreArray}
        className='show' /> : null

    const displayCategory = categoryVisible ?
      <BrowseSubMenu type='category'
        sections={this.categoryArray}
        className='show' /> : null
    
    return (
      <ul className={`browse-menu`} >
        <li onMouseOver={this.addGenreVisible}
        // onMouseEnter={this.swapClass('inherit').bind(this)}
          // onMouseLeave={this.removeGenreVisible}
          >By Genre
          {displayGenre}
        </li>
        <li 
        onMouseOver={this.addCategoryVisible}
        // onMouseEnter={this.swapClass('inherit').bind(this)}
          // onMouseLeave={this.removeCategoryVisible}
          >By Category
          {displayCategory}
        </li>
      </ul>
    )

  }
}

export default NavBrowseMenu