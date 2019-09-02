import { connect } from 'react-redux'
import GameCommentForm from './game_comment_form'
import  { updateGameComment } from '../../actions/game_comments_actions'

const msp = state => ({
    edit: 'edit',

})

const mdp = dispatch => ({
    updateGameComment: comment => dispatch(updateGameComment(comment))
})

export default connect(msp, mdp)(GameCommentForm)