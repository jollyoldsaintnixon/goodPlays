import React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { fetchGameCommentsByGame, deleteGameComment } from '../../actions/game_comments_actions';
import { swapClass } from '../../util/helper_functions'
import GameCommentForm from './game_comment_form'
import { HashLink as Link } from 'react-router-hash-link';

export default class GameCommentList extends React.Component {
    // constructor(props) {
    //     super(props)

    //     // this.state = { className: 'none' }

    // }

    
    componentDidUpdate(prevProps) {
        
        const { type, fetchComments } = this.props
        if ((type === 'game' && prevProps.parent_id != this.props.match.params.gameId)
                || prevProps.comments.length !== this.props.comments.length) {
            const id = this.props.match ? this.props.match.params.gameId : null // the two containers fetch comments differently.  One takes an id one doesn't
            fetchComments(id)
        } 
    }
    
    componentDidMount() {
        
        const { type, fetchComments } = this.props
        type === 'game' ? fetchComments(this.props.match.params.gameId)
        : fetchComments()
    }
    
    handleDelete(comment_id) {
        
        const { deleteGameComment, fetchComments } = this.props
        return e => {
            e.preventDefault()
            e.stopPropagation()
            deleteGameComment(comment_id)
                // .then(fetchComments())
        }
    }

    toggleCommentTree(comment_id) {
        return e => {
            e.preventDefault()
            e.stopPropagation()
            const cashDiv = $(`.game-comment-${comment_id}-toggle-display`)
                .toggleClass('none')
            const cashBox = $(`#expand-box-${comment_id}`)
                .toggleClass('transparent')
            const cashBar = $(`#game-comment-${comment_id}-section`)
                .toggleClass('collapse-bar')
            const cashSection = $(e.currentTarget)
                .toggleClass('shrunk').removeClass('collapse-bar-hover')
            const edit_form = $(`#edit-form-${comment_id}`)
                .addClass('none') 
            const reply_form = $(`#reply-form-${comment_id}`)
                .addClass('none')
        }
    }

    highlightBorder(e) {
        e.preventDefault()
        e.stopPropagation()
        const cashSection = $(e.currentTarget)
        if (!cashSection.hasClass('shrunk')) {
            cashSection.addClass('collapse-bar-hover')
        }
    }

    ratingStars(rating, comment_id) {
        if (rating) {
            let star_list = []
            for (let i = 0; i < 5; i++) {
                // create the actual star with id based on i and the cb
                let star
                if (i < rating) { // first three stars selected by default
                    star = <span className={`fa fa-star selected-star`} 
                        key={`comment-${comment_id}-star-${i}`}></span>
                } else {
                    star = <span className="fa fa-star "
                        key={`comment-${comment_id}-star-${i}`}></span>
                }
                star_list.push(star)
            }
            return star_list
        }
    }

    deselectBorder(e) {
        e.preventDefault()
        e.stopPropagation()
        const cashDiv = $(e.currentTarget)
        cashDiv.removeClass('collapse-bar-hover')
    }

    replyOrJump(game_id, comment_id) {
        const { type, user_id } = this.props
        let text = null
        if (type === 'game') {
            text = 'Reply'
        } else {
            text = 'View Comment'
        }
        // const replyDisplay = user_id && (type === 'game') ? '' : 'none'

        const button = type === 'game' ? (
            <button 
                // className={replyDisplay}
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    const reply_form = $(`#reply-form-${comment_id}`)
                        .toggleClass('none')
                    const edit_form = $(`#edit-form-${comment_id}`)
                        .addClass('none') 
                    
                }}>{text}
            </button>) :
            <Link to={`/games/show/${game_id}#game-comment-link-${comment_id}`}>
                <button>{text}</button></Link>
        return button
    }

    editButton(comment, user_id) {
        const edit_display = user_id === comment.author_id ? 'inherit' : 'none'
        return (
        <button
            className={edit_display}
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                const edit_form = $(`#edit-form-${comment.id}`)
                    .toggleClass('none')
                const reply_form = $(`#reply-form-${comment.id}`)
                    .addClass('none')
            }}>
            Edit
        </button>)
    }

    createCommentItem(comment) {
        
        const { games, type, user_id, comments } = this.props
        const deleteDisplay = (user_id === comment.author_id) ? 'block' : 'none'
        const replyDisplay = user_id && (type === 'game') ? '' : 'none'
        const childComment = comment.parent_id ? 'child-comment' : ''
        const game = games[comment.game_id]
        const children = (type === 'game') ? this.findChildren(comment.id, comments) : null // render all comments as top levle on user profile page
        const time_ago = comment.time_ago
        const update_ago = comment.time_ago === comment.time_since_update ? null : ` and edited ${comment.time_since_update} ago`
        const second_button = this.replyOrJump(comment.game_id, comment.id)
        const edit_button = this.editButton(comment, user_id)
        let header = null
        if (type === 'game') {
            header = comment.username
        } else if (game) {
            header = game.title
        }
        return (
            <section key={'game-comment-' + comment.id} 
                id={`game-comment-${comment.id}-section`}
                className={childComment + ' game-comment-section collapse-bar'}
                onMouseOver={this.highlightBorder}
                onMouseOut={this.deselectBorder}
                onClick={this.toggleCommentTree(comment.id)}>
                {/* <h4 class={`collapse-bar`} id={`collapse-bar-${comment.id}`}></h4> */}
                {/* <h4 class={`expand-box`} id={`expand-box-${comment.id}`}></h4> */}
                <a id={'game-comment-link-' + comment.id} className='game-comment-link'></a>
                <li >
                    {/* <h1> */}
                        {/* <span className={`expand-box transparent`} id={`expand-box-${comment.id}`}>
                            <span className='expand-box-plus'>+</span></span> */}
                            {/* {comment.title}</h1> */}
                    <h2><span className={`expand-box transparent`} id={`expand-box-${comment.id}`}>
                        <span className='expand-box-plus'></span></span>{header}, posted {time_ago ? `${time_ago} ago` : `just now!`}{update_ago}</h2>
                    {/* <h2>{comment.parent_id}</h2> */}
                    <div className={`game-comment-${comment.id}-toggle-display`}>
                        <h5>{this.ratingStars(comment.rating, comment.id)}</h5>
                        <p>{comment.body}</p>
                        <span className='game-comment-buttons'>
                            <button className={deleteDisplay}
                                onClick={this.handleDelete(comment.id).bind(this)}>
                                Delete
                            </button>
                            {second_button}
                            {edit_button}

                        </span>
                    </div>
                </li>
                <div className={`game-comment-${comment.id}-toggle-display`}>
                    <GameCommentForm className='none'
                        id={`reply-form-${comment.id}`} 
                        // comment={comment} 
                        parent_id={comment.id}
                        game_id={comment.game_id}
                        child_form={true} />
                    <GameCommentForm className='none'
                        id={`edit-form-${comment.id}`} comment={comment} 
                        edit={true} child_form={true} />
                    {children}
                </div>
                
            </section>)
    }

    findChildren(parent_id, comments) {
        let children = []
        comments.forEach(comment => {
            if (comment.parent_id === parent_id) { children.push(comment) }
        })
        
        children = children.map(child => this.createCommentItem(child))
        return children ? <ul className='children-game-comments'>{children}</ul> : null
    }

    createCommentTree(topComments) {
        // const { comments, games, type, user_id } = this.props
        // const { comments } = this.props
        const tree = topComments.map((topComment) => {
            // if (!comment.parent_id) {
                // children = findChildren(comment.id, comments)
                return this.createCommentItem(topComment)
        });
        return tree
    }

    render() {
        let commentTree
        const { comments, type } = this.props 
        if (comments.length) {
            // topList = this.createCommentTree()
            const topComments = [];

            // push top level comments into the topComments array
            comments.forEach(comment => comment.parent_id ? null : topComments.push(comment));
            // send topComments & comments to topList().  Return every top comment with children underneath
            // Recursively append children to children
            (type === 'game') ? commentTree = this.createCommentTree(topComments) :
                commentTree = this.createCommentTree(comments)  // render all comments as top level on user profile
            
        }
        return (
            <>
                <h5 className='game-comment-lede'>{this.props.lede}</h5>
                <ul className='game-comment-list' id='top-level-comments'>
                    {commentTree}
                    {/* {this.appendChildComments(comments)} */}
                </ul>
            </>
        )
    }
}
