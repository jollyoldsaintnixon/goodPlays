import React from 'react'
import { connect } from 'react-redux'
import { fetchGames, fetchPagesOfGames } from '../../actions/games_actions'
import { ProtectedRoute } from '../../util/route_util';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { idsToObjects } from '../../util/helper_functions'
import GameShow from './game_show'
import GameIndexItem from './game_index_item'
import GameIndexSorter from './game_index_sorter'
import { Waypoint } from 'react-waypoint';

class GameIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = { page: 1, }
    // this.getPage = this.getPage.bind(this)
    // this.getFirstPage = this.getFirstPage.bind(this)
  }

  // getPage() {
  //   debugger
  //   let currentPage = this.state.page
  //   if (currentPage < 2) {
  //     return
  //   }
  //   this.props.fetchPagesOfGames(currentPage)
  //   currentPage += 1
  //   this.setState({page: currentPage})
  // }

  // getFirstPage() {
  //   debugger
  //   return this.props.fetchPagesOfGames(this.state.page)
  // }

  componentDidMount() {
    this.props.fetchGames()
    // const that = this
    // const promise = this.getFirstPage()
    //   promise.then(() => that.setState({page: 2}))
  }

  render() {
    const { games, uiGamesIds } = this.props
    const gamesArray = uiGamesIds.length ? idsToObjects(uiGamesIds, games) : Object.values(games)
    let matched = uiGamesIds.length
    let total = Object.values(games).length
    let indexItems
    let content = <div className='match-count'><h2>Showing entire library</h2></div>
    
    if (gamesArray.length) {
      if (matched != 0 && matched < total) {
        content = <div className='match-count'>
          <h2>Search returned</h2>
          <h1>{matched}</h1>
          <h2>out of </h2>
          <h1>{total}</h1>
        </div> 
      } 
      indexItems = gamesArray.map((game, idx) => {
        return <GameIndexItem game={game} key={`game-${idx}`}>Game #{idx + 1}</GameIndexItem>
      })
    }
    
    return (
      
      <section className='games'>
        <div className='sorter-wrapper'>
          <GameIndexSorter 
            uiGamesIds={uiGamesIds} 
            allGames={games}
            content={content}/>
        </div>
        <ul className='games-list '>
          {indexItems}
        </ul>
        {/* <Waypoint onEnter={this.getPage} 
                onPositionChange={this.getPage}
                topOffset='20%'
                // bottomOffset='20%'
        /> */}
    </section>
    )
  }
}

const msp = (state) => {
  return ({ 
    games: state.entities.games,
    user:  state.entities.users[state.session.id],
    uiGamesIds: state.ui.games
  })
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
  fetchPagesOfGames: page => dispatch(fetchPagesOfGames(page))
})

export default withRouter(connect(msp, mdp)(GameIndex))
