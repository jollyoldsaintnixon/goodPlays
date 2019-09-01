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

    createCommentItem(comment) {
        
        const { games, type, user_id, comments } = this.props
        const deleteDisplay = user_id === comment.author_id ? 'block' : 'none'
        const replyDisplay = 'none'
        const childComment = comment.parent_id ? 'child-comment' : ''
        const game = games[comment.game_id]
        const children = this.findChildren(comment.id, comments)
        return (
            <div key={'game-comment-' + comment.id} 
                id={`comment-${comment.id}`}
                className={childComment}>
                <li >
                    <h1>{comment.title}</h1>
                    <h2>{type === 'game' ? comment.username : game.title}</h2>
                    <h2>{comment.parent_id}</h2>
                    <p>{comment.body}</p>
                    <span className='game-comment-buttons'>
                        <button className={deleteDisplay}
                            onClick={this.handleDelete(comment.id).bind(this)}>
                            Delete
                                </button>
                        <button
                            onClick={e => {
                                e.preventDefault()
                                const form = $(`#reply-form-${comment.id}`)
                                form.toggleClass('none')
                                // replyDisplay === 'none' ? 'none' : ''
                            }}>Reply
                        </button>
                    </span>
                </li>
                <GameCommentForm className={replyDisplay}
                    id={`reply-form-${comment.id}`}
                    game_id={comment.game_id}
                    parent_id={comment.id}
                    child_form={true} />
                {children}
            </div>)
    }

    findChildren(parent_id, comments) {
        let children = []
        comments.forEach(comment => {
            if (comment.parent_id === parent_id) { children.push(comment) }
        })
        debugger
        children = children.map(child => {
            const rdxChild = this.createCommentItem(child)
            return rdxChild
        })
        return children ? <ul className='children-game-comments'>{children}</ul> : null
    }

    createCommentTree(topComments) {
        // const { comments, games, type, user_id } = this.props
        // const { comments } = this.props
        const tree = topComments.map((topComment) => {
            // if (!comment.parent_id) {
                // children = findChildren(comment.id, comments)
                return this.createCommentItem(topComment)
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
            // }
        });
        return tree
    }

    render() {
        let commentTree
        const { comments } = this.props 
        if (comments.length) {
            // topList = this.createCommentTree()
            const topComments = []

            // push top level comments into the topComments array
            comments.forEach(comment => comment.parent_id ? null : topComments.push(comment))
            // send topComments & comments to topList().  Return every top comment with children underneath
            // Recursively append children to children
            commentTree = this.createCommentTree(topComments)
            
        }
        return (
            <ul className='game-comment-list' id='top-level-comments'>
                {commentTree}
                {this.appendChildComments(comments)}
            </ul>
        )
    }
}
