import React from 'react'
import { update, stringFilter } from '../../util/helper_functions'
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
    this.enterSearch = this.enterSearch.bind(this)
  }

  search() {
    return (e) => {
      e.preventDefault()
      const list = this.gameList()
      this.props.receiveUiGames(list)
      this.setState({searchString: ''})
      this.props.history.push(`/index/games/show/${list[0].id}`)
    }
  }

  enterSearch(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const list = this.gameList()
      this.props.receiveUiGames(list)
      this.setState({ searchString: '' })
      this.props.history.push(`/index/games/show/${list[0].id}`)
    }
  }

  gameList() {
    // destructure
    const { games } = this.props
    const { searchString } = this.state
    // initialize
    let list = []
    
    if (searchString === '') {
      return games
    }

    list = stringFilter(games, searchString)
    
    return list
  }

  dropDownSelect(e) {
    // debugger
    e.preventDefault()
    this.setState({searchString: e.target.textContent})
    // this.setState({searchString: ''})
    this.props.receiveUiGames(this.gameList())
    this.props.history.push(`/index/games/show/${e.target.id}`)
  }

  advancedSearch() {
    return (e) => {
      this.props.openModal('advanced_search')
    }
  }

  render() {
    const gameList = this.gameList().map(game => {
      return <li key={`search-item-${game.id}`} id={game.id} onClick={this.dropDownSelect.bind(this)}>
      {game.title}</li>
    })

    // if (this.props.history.location.pathname === '/advanced-search') {
    //   this.props.openModal('advanced_search')
    // }      

    return (
      <div className='search'>
        <input
          type="text"
          className='search-bar'
          onChange={update('searchString', this)}
          placeholder='Search...'
          value={this.state.searchString}
          onKeyDown={this.enterSearch}
          />
        <button onClick={this.search()}><i class="icon-magnifying-glass"></i>***</button>
        <NavLink to='/index/advanced-search' onClick={this.advancedSearch()}>Advanced Search </NavLink>
        <ul className={`search-list ${
          this.state.searchString === "" ? 'none' : '' }`} >
          {gameList.slice(0, 4)}
        </ul>
        <Route path='/index/advanced-search' render={props => <AdvancedSearch {...props} 
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