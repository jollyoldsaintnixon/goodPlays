import React from 'react'
import { connect } from 'react-redux'

const msp = (state, ownProps) => ({
  game: state.entities.games[ownProps.match.params.gameId]
})

class GameShow extends React.Component {
  constructor(props) {
    super(props)
    debugger
    console.log("GAMESHOW")
  }

  render () {
    const { game }= this.props
    debugger
    return (
      <div className='game-show'>
        <ul>
          <li>{game.title}</li>
          <li>{game.release_date}</li>
          <li>{game.description}</li>
        </ul>
      </div>
    )
  }
}

export default connect(msp)(GameShow)