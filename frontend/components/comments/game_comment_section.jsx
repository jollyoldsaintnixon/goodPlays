import React from 'react'
import { connect } from 'react-redux'
import GameCommentForm from './game_comment_form'
import GameGameCommentsContainer from './game_game_comments_container'

class GameCommentSection extends React.Component {


    render() {
        const { game_id } = this.props
        return (
            <>
                <GameCommentForm game_id={game_id ? game_id : null}/>
                <GameGameCommentsContainer game_id={game_id ? game_id : null} />
            </>
            )
    }
}

const msp = state => ({
    
})

const mdp = dispatch => {
    return ({
        
    })
}

export default connect(msp, mdp)(GameCommentSection)