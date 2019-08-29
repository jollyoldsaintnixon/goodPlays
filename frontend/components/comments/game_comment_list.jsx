import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchGameCommentsByGame, deleteGameComment } from '../../actions/game_comments_actions';


export default class GameCommentList extends React.Component {

    componentDidUpdate(prevProps) {
        
        const { type, fetchComments } = this.props
        if (type === 'game' && prevProps.parent_id != this.props.match.params.gameId) {
            fetchComments(this.props.match.params.gameId)
        } 
    }

    componentDidMount() {
        
        const { type, fetchComments } = this.props
        type === 'game' ? fetchComments(this.props.match.params.gameId)
            : fetchComments()
    }
    
    handleDelete(comment_id) {
        
        const { deleteGameComment } = this.props
        return e => {
            
            e.preventDefault()
            deleteGameComment(comment_id)
        }
    }

    listComments() {
        
        const { comments, games, type, user_id } = this.props
        const list = comments.map((comment, i) => {
            const display = user_id === comment.author_id ? 'block' : 'none'
            const game = games[comment.game_id]
            
            return (
                <li key={'game-comment-' + i}>
                    <h1>{comment.title}</h1>
                    <h2>{type === 'game' ? comment.username : game.title}</h2>
                    <p>{comment.body}</p>
                    <div className='game-comment-buttons'>
                        <button className={display}
                            onClick={this.handleDelete(comment.id).bind(this)}>
                                Delete
                        </button>
                        <button>
                            Reply
                        </button>
                    </div>
                </li>)
        });
        return list
    }

    render() {
        
        let listComments
        const { comments } = this.props 
        if (comments.length) {
            listComments = this.listComments()
        }
        return (
            <ul className='game-comment-list'>
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