import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import GameCommentList from './game_comment_list'
import { fetchGameCommentsByGame, deleteGameComment } from '../../actions/game_comments_actions';

const msp = (state, ownProps) => {
    const game_comments = Object.values(state.entities.game_comments)
    const lede = game_comments.length ? 'Here\'s what people are saying' : 'Add the first review';
    return ({
        comments: game_comments,
        parent_id: ownProps.game_id,
        games: state.entities.games,
        user_id: state.session.id,
        type: 'game',
        lede: lede,
    })
}

const mdp = dispatch => {
    return ({
        fetchComments: (game_id) => dispatch(fetchGameCommentsByGame(game_id)),
        deleteGameComment: comment_id => dispatch(deleteGameComment(comment_id))
    })
}


export default withRouter(connect(msp, mdp)(GameCommentList))