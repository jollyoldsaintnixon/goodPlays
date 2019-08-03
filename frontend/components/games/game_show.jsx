import React from 'react'
import { connect } from 'react-redux'
import { fetchGame } from '../../actions/games_actions'

const msp = (state, ownProps) => ({
  game: state.entities.games[ownProps.match.params.gameId]
})

const mdp = dispatch => ({
  fetchGame: id => dispatch(fetchGame(id))
})

class GameShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetchGame(this.props.match.params.gameId)
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.id != this.props.match.params.imageId) {
      fetchGame(this.props.match.params.gameId)
    }
  }

  render () {
    let { game } = this.props
    if (game === undefined) {
      game = { title: '', release_date: '', description: '', imageUrl: '', image_url: '' }
    }
    
    return (
      <div className='game-show'>
        <ul>
          <li>{game.title}</li>
          <li>{game.release_date}</li>
          <li>{game.description}</li>
          <li><img src={game.imageUrl} alt={`${game.title} image`}/></li>
          <li><img src={game.image_url} alt={`${game.title} image`}/></li>
        </ul>
      </div>
    )
  }
}

export default connect(msp, mdp)(GameShow)