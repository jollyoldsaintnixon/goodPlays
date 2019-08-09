import React from 'react'
import { addGameToUser } from '../../actions/session_actions'
import { addGame } from '../../util/game_show_helper'
import { connect } from 'react-redux'

class GameIndexItemDisplay extends React.Component {
  
  displayButton() {
    debugger
    const { game, user } = this.props
    if (!user) {
      return null
    }
    const game_ids = user.game_ids
    if (game_ids.includes(game.id)) {
      return null
    }
    return <button onClick={addGame(game.id, this)}>Add Game</button>
  }

  render() {
    const { game, className } = this.props
    if (!game) {
      return null
    }
  
    let expand = null;
    let slice = game.description.slice(0, 250)
    function more() {   
      if (game.description.length > 250) {
        return (
        <p>
          {slice}
          <span>...</span>
        </p>
        )
      }
      return null
    }
  
    return (
      <div className={`${className} ${expand} game-index-item-display`}>
        <h1>{game.title}</h1>
        <h2>${game.price}</h2>
        <>{more()}</>
        {this.displayButton()}
      </div>
    )

  }


}
const msp = state => ({
  user: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
})

export default connect(msp, mdp)(GameIndexItemDisplay)