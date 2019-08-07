import React from 'react'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../actions/ui_actions'
import { idsToObjects } from '../../util/helper_functions'

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
})

class GameIndexSorter extends React.Component {

  

  sortBy(type) {

    return (e) => {
      e.preventDefault()
      const { allGames, uiGamesIds } = this.props
      const matched = uiGamesIds.length ? idsToObjects(uiGamesIds, allGames) : Object.values(allGames)
      let sorted = []
      debugger
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
        default:
          sorted = matched
  
        }
        
      debugger
      this.props.receiveUiGames(sorted)
    }
  }

  render() {
    return (
      <form >
        <button onClick={this.sortBy('title')}>Sort by title</button>
        <button onClick={this.sortBy('release_date')}>Sort by release date</button>
        <button onClick={this.sortBy('price')}>Sort by price</button>
      </form>
    )
  }
}

export default connect(null, mdp)(GameIndexSorter)