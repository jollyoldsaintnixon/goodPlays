import React from 'react'
// import {} from '../../../app/assets/images'

export default class Footer extends React.Component {


    render () {
        let flex_direction = ''
        if (this.props.className) {
            flex_direction = this.props.className
        }
        return(
            <footer className={`footer ${flex_direction}`}>
                <a
                    target="_blank"
                    href="https://github.com/jollyoldsaintnixon/goodPlays">
                    <img src={window.github} className="personal-link-github"></img>
                </a>
                <a target="_blank"
                    href="https://www.linkedin.com/in/lyell-mcmerty-4689a2191/">
                    <img src={window.linkedin} className="personal-link-"></img>
                </a>
                <a target="_blank"
                    href="https://angel.co/lyell-mcmerty">
                    <img src={window.angelList} className="personal-link-"></img>
                </a>
                <a target="_blank"
                    href="https://jollyoldsaintnixon.github.io/jollyoldsaintnixon/">
                    <img src={window.personalSite} className="personal-link-"></img>
                </a>
            </footer>
        )
    }
}