import React from 'react'
import { connect } from 'react-redux'
import { update } from '../../util/helper_functions'
import { addGameComment } from '../../actions/game_comments_actions'



class GameCommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { title: '', body: '', }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        // stop form submission
        event.preventDefault()
        // destructure
        const { title, body } = this.state
        const { game_id, parent_id } = this.props
        const comment = { 
            title, 
            body, 
            game_id,
            parent_id,
        }
        
        this.props.addGameComment(comment)

        this.setState({ title: '', body: '', })
    }

    render() {
        const { className } = this.props
        return (
            <form id={this.props.id || ''} className={`game-comment-form ${className}`} onSubmit={this.handleSubmit} >
                <h3>Add a new comment! game id: {this.props.game_id}</h3>
                <div> 
                    <label>
                        <input type="text" placeholder='Title'
                            onChange={update('title', this)}/>
                    </label>
                    <textarea onChange={update('body', this)} name="" id="" cols="30" rows="10">

                    </textarea>
                    <input type="submit" value='Submit!' />
                </div>


            </form>
        )
    }
}

const msp = state => ({

})
const mdp = dispatch => ({
    addGameComment: comment => dispatch(addGameComment(comment))
})

export default connect(msp, mdp)(GameCommentForm)