import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import GameIndexItem from './game_index_item'
import { ProtectedRoute } from '../../util/route_util';
import { Route, Switch } from 'react-router-dom'
import GameShow from './game_show'
import { withRouter } from 'react-router-dom'
// import UserProfile from '../user/user_profile'

class GameIndex extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    let games
    
    if (this.props.games) {
      games = this.props.games.map((game, idx) => {
        return <GameIndexItem game={game} key={`game-${idx}`}>Game #{idx + 1}</GameIndexItem>
      })
    }
    
    return (
      
      <section className='games'>
        <ul className='games-list col-1-3'>
          {games}
        </ul>
        <Switch>
          {/* <Route path='/profile' render={() => {
            if (this.props.user) { 
              return <UserProfile games={this.props.games} user={this.props.user} /> 
            } else {
              <Redirect to='/' />
            }
          }}/> */}
          {/* <Route path='/index/profile' component={UserProfile} /> */}
          <Route path='/index/games/show/:gameId' component={GameShow} />
        </Switch>
        
      </section>
    )
  }
}

const msp = (state) => {
  return ({ 
    games: Object.values(state.entities.games),
    user:  state.entities.users[state.session.id]})
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
})

export default withRouter(connect(msp, mdp)(GameIndex))
