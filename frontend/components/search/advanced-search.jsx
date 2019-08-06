import React from 'react'
import { } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal_actions'
import { receiveUiGames } from '../../actions/ui_actions'
import { update, stringFilter, categoryFilter, genreFilter, dateFilter, priceFilter } from '../../util/helper_functions'
import SearchGenre from './search_genre'
import SearchCategory from './search_category'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.null = {
      searchString: '',
      genres: [],
      categories: [],
      startDate: null,
      endDate: null,
      lowPrice: NaN,
      highPrice: NaN,
      errors: '',
    }
    this.state = {
      searchString: this.props.searchVal,
      genres: [],
      categories: [],
      startDate: null,
      endDate: null,
      lowPrice: null,
      highPrice: null,
      errors: '',
    }

    this.closeAndReturn = this.closeAndReturn.bind(this)
    this.updateArray = this.updateArray.bind(this)
    this.advancedSearch = this.advancedSearch.bind(this)
  }

  closeAndReturn() {
    this.setState(this.null)
    this.props.closeModal()
  }

  advancedSearch() {
    
    return (e) => {
      e.preventDefault()
      const list = this.advancedGameList()
      if (list.length) {
        this.props.history.push(`/index/games/show/${list[0].id}`)
        this.props.receiveUiGames(this.advancedGameList())
        this.closeAndReturn()
      } else {
        this.setState({errors: 'Nothing matched'})
      }
    }
  }

  updateArray(field) {
    return e => {
      
      let newState
      if (this.state[field].includes(e.target.value)) {
        newState = this.state[field].filter(field => field != e.target.value)
      } else {
        newState = this.state[field].concat(e.target.value)
      }
      this.setState({ [field]: newState})
    }
  }

  advancedGameList() {
    // destructure
    const { games } = this.props
    const { searchString, genres, categories, startDate, endDate, lowPrice, highPrice } = this.state
    // initialize
    let gamesList = []
    
    if (this.state === this.null) {
      return games
    }
    debugger
    gamesList = stringFilter(games, searchString) // filter by string
    gamesList = genreFilter(gamesList, genres)
    gamesList = categoryFilter(gamesList, categories)
    gamesList = dateFilter(gamesList, startDate, endDate)
    gamesList = priceFilter(gamesList, parseFloat(lowPrice), parseFloat(highPrice))
    debugger
    return gamesList
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
            <p>{this.state.errors}</p>
            <h3>Advanced Search</h3>
            <input
              className='search-bar'
              type="text"
              onChange={update('searchString', this)}
              placeholder="Search..."
              value={this.state.searchString}
            />
            <div>
              <h4>Filter by Date</h4>
              <div className='search-date'>
                <label> Start Date:
                  <input type="date" onChange={update('startDate', this)}/>
                </label>
                <label> End Date:
                  <input type="date" onChange={update('endDate', this)}/>
                </label>
              </div>
            </div>
              <h4>Filter by Price</h4>
            <div className='search-price'>
              <label>Min $
                <input type="number" onChange={update('lowPrice', this)}/>
              </label>
              <label>Max $
                <input type="number" onChange={update('highPrice', this)} />
              </label>
            </div>
            {/* <button>Search By Genre</button>
            <button>Search By Category</button> */}
            {/* <SearchGenre /> */}
              <h4>Filter by Genre</h4>
            <div className='search-boxes' >
              <label> All
                <input type="checkbox" name="genre" value='all' onChange={this.updateArray('genres')} />
              </label>
              <label> Indie
                <input type="checkbox" name="genre" value='indie' onChange={this.updateArray('genres')}/>
              </label>
              <label> Action
                <input type="checkbox" name="genre" value='action' onChange={this.updateArray('genres')}/>
              </label>
              <label> Adventure
                <input type="checkbox" name="genre" value='adventure' onChange={this.updateArray('genres')}/>
              </label>
              <label> Casual
                <input type="checkbox" name="genre" value='casual' onChange={this.updateArray('genres')}/>
              </label>
              <label> Strategy
                <input type="checkbox" name="genre" value='strategy' onChange={this.updateArray('genres')}/>
              </label>
              <label> RPG
                <input type="checkbox" name="genre" value='rpg' onChange={this.updateArray('genres')}/>
              </label>
              <label> Simulation
                <input type="checkbox" name="genre" value='simulation' onChange={this.updateArray('genres')}/>
              </label>
              <label> Sports
                <input type="checkbox" name="genre" value='sports' onChange={this.updateArray('genres')}/>
              </label>
              <label> Racing
                <input type="checkbox" name="genre" value='racing' onChange={this.updateArray('genres')}/>
              </label>
              <label> MMO
                <input type="checkbox" name="genre" value='mmo' onChange={this.updateArray('genres')}/>
              </label>
              <label> Platform
                <input type="checkbox" name="genre" value='platform' onChange={this.updateArray('genres')}/>
              </label>
            </div>
            {/* <SearchCategory /> */}
              <h4>Filter by Category</h4>
            <div className='search-boxes'>
              <label> All
          <input type="checkbox" name="category" value='all' onChange={this.updateArray('categories')} />
              </label>
              <label> Single Player
          <input type="checkbox" name="category" value='single-player' onChange={this.updateArray('categories')} />
              </label>
              <label> Multi Player
        <input type="checkbox" name="category" value='multi-player' onChange={this.updateArray('categories')}/>
              </label>
              <label> Cooperative
        <input type="checkbox" name="category" value='co-op' onChange={this.updateArray('categories')}/>
              </label>
            </div>
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