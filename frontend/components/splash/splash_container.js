import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { receiveUiGames } from '../../actions/ui_actions'
import { fetchGame, fetchGames } from '../../actions/games_actions'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'
import GameShow from './game_show'

const msp = (state, ownProps) => {
  let user = state.entities.users[state.session.id]
  let game_ids = user ? user.game_ids : null
  return {
    type: 'splash',
    allGames: Object.values(state.entities.games),
    game: state.entities.games[ownProps.match.params.gameId],
    user,
    game_ids,
  }
}

const mdp = dispatch => ({
  fetchGame: id => dispatch(fetchGame(id)),
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId)),
  fetchGames: () => dispatch(fetchGames()),
  receiveUiGames: games => dispatch(receiveUiGames(games)),
})

export default withRouter(connect(msp, mdp)(GameShow))