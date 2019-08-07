import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { ProtectedRoute } from '../../util/route_util';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { idsToObjects } from '../../util/helper_functions'
import GameShow from './game_show'
import GameIndexItem from './game_index_item'
import GameIndexSorter from './game_index_sorter'

class GameIndex extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { games, uiGamesIds } = this.props
    const gamesArray = uiGamesIds.length ? idsToObjects(uiGamesIds, games) : Object.values(games)
    let matched = uiGamesIds.length
    let total = Object.values(games).length
    let indexItems
    let content = `Showing entire library of games`
    debugger
    if (gamesArray.length) {
      if (matched != 0 && matched < total) {
        content = `Search returned ${matched} out of ${total} games`
      } 
      indexItems = gamesArray.map((game, idx) => {
        return <GameIndexItem game={game} key={`game-${idx}`}>Game #{idx + 1}</GameIndexItem>
      })
    }
    
    return (
      
      <section className='games'>
        <GameIndexSorter uiGamesIds={uiGamesIds} allGames={games}/>
        <h1>{content}</h1>
        <ul className='games-list '>
          {indexItems}
        </ul>
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
  fetchGames: () => dispatch(fetchGames())
})

export default withRouter(connect(msp, mdp)(GameIndex))
