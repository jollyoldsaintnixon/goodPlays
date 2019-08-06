import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class GameIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { games, game } = this.props
    const display = (!games.length || games.includes(game)) ? 'inherit' : 'none'
    return (
      <li className={`game-index-item ${display}`} >
          <Link to={`/games/show/${game.id}`} >{game.title}</Link>
      </li>
    )
  }
}

const msp = ({ui: {games}}) => ({
  games
})

export default connect(msp)(GameIndexItem)