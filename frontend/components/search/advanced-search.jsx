import React from 'react'
import { } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal_actions'
import { receiveUiGames } from '../../actions/ui_actions'
import { update } from '../../util/helper_functions'
import SearchGenre from './search_genre'
import SearchCategory from './search_category'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.state = {
      searchString: this.props.searchVal
    }

    this.closeAndReturn = this.closeAndReturn.bind(this)
  }

  closeAndReturn() {
    this.props.closeModal()
    this.props.history.push('/')
  }

  advancedSearch() {
    return (e) => {
      e.preventDefault()
      this.props.receiveUiGames(this.advancedGameList())
      this.props.closeModal()
    }
  }

  advancedGameList() {
    // destructure
    const { games } = this.props
    const { searchString } = this.state
    // initialize
    const list = []

    if (searchString === '') {
      return games
    }

    games.forEach(game => {
      if (game.title.toLowerCase().includes(searchString.toLowerCase())) {
        list.push(game)
      }
    })

    return list
  }

  render() {
    const { searchModal } =  this.props
    
    if (searchModal === null) {
      return null;
    }
    return (
      <div className='faded' onClick={this.closeAndReturn}>
        <div className='modal-wrap' onClick={(e) => e.stopPropagation()}>
          <form className='advanced-search-form' onSubmit={this.advancedSearch()}>
            <h3>Advanced Search</h3>
            <input
              className='search-bar'
              type="text"
              onChange={update('searchString', this)}
              placeholder="Search..."
              value={this.state.searchString}
            />
            <label> Start Date:
              <input type="date"/>
            </label>
            <label> End Date:
              <input type="date" />
            </label>
            <SearchGenre />
            <SearchCategory />
            <input type="submit" value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  searchModal: state.ui.modal
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  closeModal: () => dispatch(closeModal())
})
export default connect(msp, mdp)(AdvancedSearch)