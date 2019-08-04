import React from 'react'
import { update } from '../../util/helper_functions'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../actions/ui_actions'
import { withRouter, NavLink, Route } from 'react-router-dom'
import AdvancedSearch from './advanced-search'
import { openModal } from '../../actions/modal_actions'

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchString: ''}
    this.dropDownSelect = this.dropDownSelect.bind(this)
  }

  search() {
    return (e) => {
      e.preventDefault()
      this.props.receiveUiGames(this.gameList())
    }
  }

  gameList() {
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

  dropDownSelect(e) {
    // debugger
    // this.setState({searchString: e.target.textContent})
    this.setState({searchString: ''})
    this.props.history.push(`/games/show/${e.target.id}`)
  }

  advancedSearch() {
    return (e) => {
      this.props.openModal('advanced_search')
    }
  }

  render() {
    const gameList = this.gameList().map(game => {
      return <li key={`search-item-${game.id}`} id={game.id} onClick={this.dropDownSelect}>
      {game.title}</li>
    })

    return (
      <div className='search'>
        <input
          className='search-bar' 
          type="text"
          onChange={update('searchString', this)}
          placeholder='Search...'
          value={this.state.searchString}
          />
        <button onClick={this.search()}>***</button>
        <NavLink to='/advanced-search' onClick={this.advancedSearch()}>Advanced Search </NavLink>
        <ul className={`search-list ${
          this.state.searchString === "" ? 'none' : '' }`} >
          {gameList.slice(0, 4)}
        </ul>
        <Route path='/advanced-search' render={props => <AdvancedSearch {...props} 
          games={this.props.games} 
          searchVal={this.state.searchString}/>} 
            />
        {/* <Route path='/advanced-search' render={props => <AdvancedSearch {...props} searchVal={'hello'}/>} /> */}
      </div>
    )
  }
}

const msp = state => ({
  games: Object.values(state.entities.games)
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  openModal: modal => dispatch(openModal(modal))
})

export default withRouter(connect(msp, mdp)(NavSearch))