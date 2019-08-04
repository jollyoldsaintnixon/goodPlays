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
        <ul className='game-show col-2-3'>
          <li><img src={game.imageUrl} alt={`${game.title} image`} /></li> {/* this is supposed to connect to AWS */} 
          <li className='game-title'>{game.title}</li>
          <li className='game-release-date'>{game.release_date}</li>
          <li className='game-description'>{game.description}</li>
          {/* <li><img src={game.image_url} alt={`${game.title} image`}/></li> this should work as a back up  */}
        </ul>
    )
  }
}

export default connect(msp, mdp)(GameShow)