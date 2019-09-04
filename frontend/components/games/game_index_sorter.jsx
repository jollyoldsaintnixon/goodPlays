import React from 'react'
import { connect } from 'react-redux'
import { receiveUiGames, clearUiErrors } from '../../actions/ui_actions'
import { idsToObjects } from '../../util/helper_functions'

const msp = ({ errors: { ui }}) => ({
  errors: ui,
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  clearUiErrors: () => dispatch(clearUiErrors()),
})

class GameIndexSorter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errors: null }
  }
  

  sortBy(type) {

    return (e) => {
      e.preventDefault()
      const { allGames, uiGamesIds } = this.props
      const matched = uiGamesIds.length ? idsToObjects(uiGamesIds, allGames) : Object.values(allGames)
      let sorted = []
      
      switch (type) {
        case 'title':
          sorted = matched.sort((el1, el2) => {
            if (el1.title < el2.title) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'release_date':
          sorted = matched.sort((el1, el2) => {
            if (el1.release_date < el2.release_date) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'price':
          sorted = matched.sort((el1, el2) => {
            if (el1.price < el2.price) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'rating':
          sorted = matched.sort((el1, el2) => {
            if (!el1.rating) {
              return 1
            } else if (!el2.rating || el1.rating > el2.rating) {
              return -1
            } else {
              return 0
            }
          })
          break
        default:
          sorted = matched
  
        }
      this.props.receiveUiGames(sorted)
    }
  }

  componentWillUnmount() {
    this.props.clearUiErrors()
  }

  render() {
     
    return (
      <form className='game-index-sorter'>
        <h4>{this.props.errors}</h4>
        {this.props.content}
        <h3></h3>
        <button onClick={this.sortBy('title')}><span>Sort by title</span></button>
        <button onClick={this.sortBy('release_date')}><span>Sort by release date</span></button>
        <button onClick={this.sortBy('price')}><span>Sort by price</span></button>
        <button onClick={this.sortBy('rating')}><span>Sort by rating</span></button>
      </form>
    )
  }
}

export default connect(msp, mdp)(GameIndexSorter)