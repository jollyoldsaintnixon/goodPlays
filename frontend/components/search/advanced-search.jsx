import React from 'react'
import { } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal_actions'
import { receiveUiGames } from '../../actions/ui_actions'
import { receiveUiErrors, clearUiErrors } from '../../actions/ui_actions'
import { update, stringFilter, categoryFilter, genreFilter, dateFilter, priceFilter } from '../../util/helper_functions'
import SearchGenre from './search_genre'
import SearchCategory from './search_category'
import { openModal } from '../../actions/modal_actions'


class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.null = {
      searchString: '',
      genres: [],
      categories: [],
      startDate: '1990',
      endDate: '2019',
      lowPrice: NaN,
      highPrice: NaN,
      errors: '',
    }
    this.state = {
      searchString: this.props.searchVal,
      genres: [],
      categories: [],
      startDate: '1990',
      endDate: '2019',
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
        this.props.history.push(`/index`)
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
    // debugger
    gamesList = stringFilter(games, searchString) // filter by string
    gamesList = genreFilter(gamesList, genres)
    gamesList = categoryFilter(gamesList, categories)
    gamesList = dateFilter(gamesList, startDate, endDate)
    gamesList = priceFilter(gamesList, parseFloat(lowPrice), parseFloat(highPrice))
    // debugger
    return gamesList
  }

  componentDidMount() {
    debugger
    this.props.openModal('advanced_search')
  }

  render() {
    const { searchModal } =  this.props
    const { startDate, endDate } = this.state
    if (searchModal === null) {
      return null;
    }
    return (
      <div className='faded' onClick={this.closeAndReturn}>
        <div className='modal-wrap' onClick={(e) => e.stopPropagation()}>
          <form className='advanced-search-form' onSubmit={this.advancedSearch()}>
            <h3>Advanced Search</h3>
            <p>{this.state.errors}</p>
            <h4>Filter by Title</h4>
            <input
              className='search-bar'
              type="text"
              onChange={update('searchString', this)}
              placeholder="Search..."
              value={this.state.searchString}
            />
            <div>
              <h5></h5>
              <h4>Filter by Date</h4>
              <div className='search-date'>
                <label>
                  <span> Made after {startDate}</span>
                    <input type="range"
                      min='1990'
                      max='2019'
                      value={startDate}
                      step='1'
                      onChange={update('startDate', this)} />
                </label>
                <label>
                  <span>Made before {endDate}</span>
                    <input type="range"
                      min='1990'
                      max='2019'
                      value={endDate}
                      step='1'
                      onChange={update('endDate', this)} />
                </label>
              </div>
            </div>
            <h5></h5>
            <h4>Filter by Price</h4>
            <div className='search-price'>
              <label>
                <span>Min $</span>
                <input type="number" onChange={update('lowPrice', this)}/>
              </label>
              <label>Max $
                <input type="number" onChange={update('highPrice', this)} />
              </label>
            </div>
            <h5></h5>
            <h4>Filter by Genre</h4>
            <div className='search-boxes genre' >
              <label> 
                <input type="checkbox" name="genre" value='all' onChange={this.updateArray('genres')} />
                All
              </label>
              <label> 
                <input type="checkbox" name="genre" value='indie' onChange={this.updateArray('genres')}/>
                Indie
              </label>
              <label> 
                <input type="checkbox" name="genre" value='action' onChange={this.updateArray('genres')}/>
                Action
              </label>
              <label> 
                <input type="checkbox" name="genre" value='adventure' onChange={this.updateArray('genres')}/>
                Adventure
              </label>
              <label> 
                <input type="checkbox" name="genre" value='casual' onChange={this.updateArray('genres')}/>
                Casual
              </label>
              <label> 
                <input type="checkbox" name="genre" value='strategy' onChange={this.updateArray('genres')}/>
                Strategy
              </label>
              <label> 
                <input type="checkbox" name="genre" value='rpg' onChange={this.updateArray('genres')}/>
                RPG
              </label>
              <label> 
                <input type="checkbox" name="genre" value='simulation' onChange={this.updateArray('genres')}/>
                Simulation
              </label>
              <label> 
                <input type="checkbox" name="genre" value='sports' onChange={this.updateArray('genres')}/>
                Sports
              </label>
              <label> 
                <input type="checkbox" name="genre" value='racing' onChange={this.updateArray('genres')}/>
                Racing
              </label>
              <label> 
                <input type="checkbox" name="genre" value='mmo' onChange={this.updateArray('genres')}/>
                MMO
              </label>
              <label> 
                <input type="checkbox" name="genre" value='platform' onChange={this.updateArray('genres')}/>
                Platform
              </label>
            </div>
            <h5></h5>
            <h4>Filter by Category</h4>
            <div className='search-boxes category'>
              <label> 
                <input type="checkbox" name="category" value='all' onChange={this.updateArray('categories')} />
                <span>All</span>
              </label>
              <label> 
                <input type="checkbox" name="category" value='single-player' onChange={this.updateArray('categories')} />
                <span>Single Player</span>
              </label>
              <label> 
                <input type="checkbox" name="category" value='multi-player' onChange={this.updateArray('categories')}/>
                <span>Multi Player</span>
              </label>
              <label> 
                <input type="checkbox" name="category" value='co-op' onChange={this.updateArray('categories')}/>
                <span>Cooperative</span>
              </label>
            </div>
            <div className='submit-div'>
              <input type="submit" value='Submit'/>
            </div>
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
  closeModal: () => dispatch(closeModal()),
  receiveUiErrors: () => dispatch(receiveUiErrors()),
  clearUiErrors: () => dispatch(clearUiErrors()),
})
export default connect(msp, mdp)(AdvancedSearch)