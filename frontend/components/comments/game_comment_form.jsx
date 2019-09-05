import React from 'react'
import { connect } from 'react-redux'
import { update } from '../../util/helper_functions'
import { addGameComment, updateGameComment } from '../../actions/game_comments_actions'
// import { updateGameComment } from '../../actions/game_comments_actions'
import { updateGameRating } from '../../actions/games_actions'
import StarRatings from '../ratings/star_ratings'



class GameCommentForm extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.edit) {
            const { comment } = this.props
            this.state = { title: comment.title, 
                            body: comment.body, 
                            className: '',
                            errors: '' }
            this.lede = ' Edit your comment'
        } else if (this.props.child_form) {  // should only proc for replies
            this.lede = ' Add a reply'
            this.state = { title: '', body: '', className: '', errors: '' }
        } else {
            this.lede = ' Review this game'
            this.state = { title: '', body: '', className: '', errors: '' }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        // stop form submission
        event.preventDefault()
        event.stopPropagation()
        const className = this.props.child_form ?  'none' : '' // hide if it is the comment form for a child
        // destructure
        const { title, body } = this.state
        let comment
        if (this.props.comment) {
             comment = this.props.comment
        }
        const new_comment = { 
            title, 
            body, 
            // game_id: comment.game_id,
            // parent_id: comment.id,
        }
        if (this.props.edit) {
            new_comment.id = comment.id
            new_comment.parent_id = comment.parent_id
            new_comment.game_id = comment.game_id
            this.props.updateGameComment(new_comment).catch(errors => this.setState({ errors: errors.responseJSON }))
            this.setState({ className: className, errors: '' }) // only update classname & errors if edit
        } else if (this.props.top_id) {
            const all_stars = $('.top-level-star')
            const selected_stars = $('.selected-star-' + this.props.top_id) // for top level comments, get the rating
            new_comment.parent_id = this.props.parent_id
            new_comment.game_id = this.props.game_id
            new_comment.rating = selected_stars.length ? selected_stars.length : null // the length is number of selected stars

            this.props.addGameComment(new_comment)
                .then(success => this.props.updateGameRating(new_comment),
                    errors => this.setState({ errors: errors.responseJSON })) // firing off two actions- inefficient?


            all_stars.removeClass('.selected-star-' + this.props.top_id) // reset stars to null
                .addClass('null-star')
            this.setState({ title: '', body: '', className: className, errors: ''}) // reset form to blank 
        } else {
            debugger
            new_comment.parent_id = this.props.parent_id
            new_comment.game_id = this.props.game_id
            this.props.addGameComment(new_comment).then(null, errors => this.setState({ errors: errors.responseJSON })) 
            this.setState({ title: '', body: '', className: className, errors: ''}) // reset form to blank if reply
        }
        

    }

    render() {
        const { className, user_id } = this.props
        debugger
        const StarRating = this.props.top_id ? <><span>Rate this game:</span> <StarRatings top_id={this.props.top_id}/> </> : null; // only render stars on comments
        return user_id ? // only show form to post comments if logged in
        (  // the classNames are a bit confusing.  The one coming from props is initially 'none' and is toggled on click of the reply button
        // the one from state is set to none only if submitted, and is also toggled by clicking reply
            <form onClick={e => e.stopPropagation()} onMouseOver={e => e.stopPropagation()}
                id={this.props.id || ''} 
                className={`game-comment-form ${className} ${this.state.className}`} 
                onSubmit={this.handleSubmit} >
                <p className='comment-errors'>{this.state.errors}</p>
                <div className='game-comment-form-fields'> 
                    {/* <label>
                        <input type="text" placeholder='Title' value={this.state.title}
                            onClick={e => e.stopPropagation()}
                            onChange={update('title', this)}/>
                    </label> */}
                    
                    <textarea onChange={update('body', this)} onClick={e => e.stopPropagation()}
                        value={this.state.body}
                        // name="" cols="30" rows="10"
                        placeholder={this.lede}
                        >
                    </textarea>

                </div>
                <div className={StarRating ? 'comment-form-bottom-star' : 'comment-form-bottom-no-star'}>
                    <div className='star-rating-div'>{StarRating}</div>
                    <input type="submit" value='Submit!' />
                </div>
            </form>
        ) 
        : null
    }
}

const msp = state => ({
    user_id: state.session.id,
})
const mdp = dispatch => ({
    addGameComment: comment => dispatch(addGameComment(comment)),
    updateGameComment: comment => dispatch(updateGameComment(comment)),
    updateGameRating: comment => dispatch(updateGameRating(comment)),
})

export default connect(msp, mdp)(GameCommentForm)