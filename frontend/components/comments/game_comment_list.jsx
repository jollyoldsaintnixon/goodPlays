import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import { fetchGameCommentsByGame, deleteGameComment } from '../../actions/game_comments_actions';
import { swapClass } from '../../util/helper_functions'
import GameCommentForm from './game_comment_form'

export default class GameCommentList extends React.Component {
    // constructor(props) {
    //     super(props)

    //     // this.state = { className: 'none' }

    // }

    
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
    
    appendChildComments(childComments) {
        if (!childComments) { return null }
        childComments.forEach((child, i) => {
            const parent = $(`#comment-${child.parent_id}`)
            child = this.createCommentItem(child, i)
            parent.push(child)
            // child = $(child)
            // debugger
            // parent.append(child)
        })
    }

    createCommentItem(comment, i) {
        const { games, type, user_id } = this.props
        const deleteDisplay = user_id === comment.author_id ? 'block' : 'none'
        const replyDisplay = 'none'
        const game = games[comment.game_id]
        return (
            <div key={'game-comment-' + i} id={`comment-${comment.id}`}>
                <li >
                    <h1>{comment.title}</h1>
                    <h2>{type === 'game' ? comment.username : game.title}</h2>
                    <h2>{comment.parent_id}</h2>
                    <p>{comment.body}</p>
                    <div className='game-comment-buttons'>
                        <button className={deleteDisplay}
                            onClick={this.handleDelete(comment.id).bind(this)}>
                            Delete
                                </button>
                        <button
                            onClick={e => {
                                e.preventDefault()
                                const form = $(`#reply-form-${i}`)
                                form.toggleClass('none')
                                // replyDisplay === 'none' ? 'none' : ''
                            }
                            }>
                            Reply
                                </button>
                    </div>
                </li>
                <GameCommentForm className={replyDisplay}
                    id={`reply-form-${i}`}
                    game_id={comment.game_id}
                    parent_id={comment.id} />
            </div>)
    }

    topListComments() {
        // const { comments, games, type, user_id } = this.props
        const { comments } = this.props
        debugger
        const topList = comments.map((comment, i) => {
            if (!comment.parent_id) {
                return this.createCommentItem(comment, i)
                // const deleteDisplay = user_id === comment.author_id ? 'block' : 'none'
                // const replyDisplay = 'none'
                // const game = games[comment.game_id]
                // return(
                //     <>
                //         <li key={'game-comment-' + i} id={`comment-${comment.id}`}>
                //             <h1>{comment.title}</h1>
                //             <h2>{type === 'game' ? comment.username : game.title}</h2>
                //             <h2>{comment.parent_id}</h2>
                //             <p>{comment.body}</p>
                //             <div className='game-comment-buttons'>
                //                 <button className={deleteDisplay}
                //                     onClick={this.handleDelete(comment.id).bind(this)}>
                //                         Delete
                //                 </button>
                //                 <button 
                //                     onClick={e => {
                //                         e.preventDefault()
                //                         const form = $(`#reply-form-${i}`)
                //                         form.toggleClass('none')
                //                         // replyDisplay === 'none' ? 'none' : ''
                //                     }
                //                 }>
                //                     Reply
                //                 </button>
                //             </div>
                //         </li>
                //         <GameCommentForm className={replyDisplay} 
                //             id={`reply-form-${i}`} 
                //             game_id={comment.game_id}
                //             parent_id={comment.id}/>
                //     </>)
            }
        });
        return topList
    }

    render() {
        let topList
        const { comments } = this.props 
        if (comments.length) {
            topList = this.topListComments()
        }
        return (
            <ul className='game-comment-list' id='top-level-comments'>
                {topList}
                {this.appendChildComments(comments)}
            </ul>
        )
    }
}
