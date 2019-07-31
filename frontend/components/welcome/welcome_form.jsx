import React from 'react'
import { update, errorsList } from '../../util/helper_functions'

class WelcomeForm extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    update.bind(this)
  }

  handleSubmit(event) {
    // stop form submission
    event.preventDefault()
    const user = this.state
    this.props.signup(user)
  }


  render() {
    //destructure
    const { password, username } = this.state
    return (
      <li>
        <form onSubmit={this.handleSubmit}>
          <label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={update('username', this)}
                    autoComplete='on'
                    placeholder='username' 
                    />
          </label>
          <label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={update('password', this)}
                    placeholder='password'
                     />
          </label>
          <input type="submit" value={`Log In!`} />
        </form>
        {errorsList(this.props.errors)}
      </li>
    )
  }
}

export default WelcomeForm