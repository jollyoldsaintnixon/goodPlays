import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchGameCommentsByGame } from '../../actions/game_comments_actions';


class GameCommentList extends React.Component {

    componentDidMount() {
        debugger
        const { fetchGameCommentsByGame } = this.props
        fetchGameCommentsByGame(this.props.match.params.gameId)
    }

    listComments() {
        debugger
        const { comments } = this.props
        const list = comments.map(comment => {
            return <li>{comment.title}</li>
        });
        return list
    }

    render() {
        debugger
        let listComments
        const { comments } = this.props 
        if (comments.length) {
            listComments = this.listComments()
        }
        return (
            <ul>
                {listComments}
            </ul>
        )
    }
}

const msp = state => ({
    comments: Object.values(state.entities.game_comments)
})

const mdp = dispatch => ({
    fetchGameCommentsByGame: game_id => dispatch(fetchGameCommentsByGame(game_id))
})

export default withRouter(connect(msp, mdp)(GameCommentList))