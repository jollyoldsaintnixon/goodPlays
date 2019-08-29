import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchGameCommentsByGame, deleteGameComment } from '../../actions/game_comments_actions';


export default class GameCommentList extends React.Component {

    componentDidUpdate(prevProps) {
        debugger
        const { type, fetchComments } = this.props
        if (type === 'game' && prevProps.parent_id != this.props.match.params.gameId) {
            fetchComments(this.props.match.params.gameId)
        } 
    }

    componentDidMount() {
        debugger
        const { type, fetchComments } = this.props
        type === 'game' ? fetchComments(this.props.match.params.gameId)
            : fetchComments()
    }
    
    handleDelete(comment_id) {
        debugger
        const { deleteGameComment } = this.props
        return e => {
            debugger
            e.preventDefault()
            deleteGameComment(comment_id)
        }
    }

    listComments() {
        debugger
        const { comments } = this.props
        const list = comments.map((comment, i) => {
            return (
                <li key={'game-comment-' + i}>
                    <span>{comment.title}</span>
                    <button 
                        onClick={this.handleDelete(comment.id).bind(this)}>
                            Delete
                    </button>
                </li>)
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

// const msp = state => ({
//     comments: Object.values(state.entities.game_comments)
// })

// const mdp = dispatch => ({
//     fetchGameCommentsByGame: game_id => dispatch(fetchGameCommentsByGame(game_id)),
//     deleteGameComment: comment_id => dispatch(deleteGameComment(comment_id))
// })

// export default withRouter(connect(msp, mdp)(GameCommentList))