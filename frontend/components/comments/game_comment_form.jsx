import React from 'react'
import { connect } from 'react-redux'
import { update } from '../../util/helper_functions'
import { addGameComment } from '../../actions/game_comments_actions'
import { updateGameComment } from '../../actions/game_comments_actions'
import { cpus } from 'os';



class GameCommentForm extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.edit) {
            const { comment } = this.props
            this.state = { title: comment.title, body: comment.body, className: '' }
            this.lede = ' Edit your comment'
        } else if (this.props.child_form) {  // should only proc for replies
            this.lede = ' Add a reply'
            this.state = { title: '', body: '', className: '' }
        } else {
            this.lede = ' Review this game'
            this.state = { title: '', body: '', className: '' }
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
            this.props.updateGameComment(new_comment)
            this.setState({ className: className }) // only update classname if edit
        } else {
            new_comment.parent_id = this.props.parent_id
            new_comment.game_id = this.props.game_id
            this.props.addGameComment(new_comment)
            this.setState({ title: '', body: '', className: className}) // reset form to blank if reply
        }
        

    }

    render() {
        const { className, user_id } = this.props
        return user_id ? // only show form to post comments if logged in
        (  // the classNames are a bit confusing.  The one coming from props is initially 'none' and is toggled on click of the reply button
        // the one from state is set to none only if submitted, and is also toggled by clicking reply
            <form onClick={e => e.stopPropagation()} onMouseOver={e => e.stopPropagation()}
                id={this.props.id || ''} 
                className={`game-comment-form ${className} ${this.state.className}`} 
                onSubmit={this.handleSubmit} >
                {/* <h3>{this.lede}</h3> */}
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
                    <input type="submit" value='Submit!' />


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
})

export default connect(msp, mdp)(GameCommentForm)