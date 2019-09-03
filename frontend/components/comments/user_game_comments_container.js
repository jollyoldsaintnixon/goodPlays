import { connect } from 'react-redux'
import GameCommentList from './game_comment_list'
import { fetchGameCommentsByUser, deleteGameComment } from '../../actions/game_comments_actions';

const msp = (state, ownProps) => {
    
    return ({
        comments: Object.values(state.entities.game_comments),
        parent_id: ownProps.user.id,
        games: state.entities.games,
        user_id: state.session.id,
        type: 'user',
        lede: 'Your Comments'
    })
}

const mdp = dispatch => {
    return ({
        fetchComments: () => dispatch(fetchGameCommentsByUser()),
        deleteGameComment: comment_id => dispatch(deleteGameComment(comment_id))
    })
}

export default connect(msp, mdp)(GameCommentList)