import React from 'react'
import { connect } from 'react-redux'
import { fetchGameCommentsByGame } from '../../util/games_comments_api_util';


class GameCommentList extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <ul>

            </ul>
        )
    }
}

const msp = state => {

}

const mdp = dispatch => ({
    fetchGameCommentsByGame: game_id => dispatch(fetchGameCommentsByGame(game_id))
})

export default connect(null, mdp)(GameCommentList)