import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '', 
      password: '',
      confirm_password: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = (this.props.formType === 'signup')
    // [this.formType, this.header] = [this.props.formType, this.props.header]
  }

  update(field) {
    return event => {
      this.setState({[field]: event.target.value})
    }
  }

  extraInput() {
    // deconstruct
    const { email, confirm_password } = this.state

    if (this.signup) {
      return (
        <>
          <label>Confirm Password:
                <input type="password" value={confirm_password} onChange={this.update('confirm_password')} />
          </label>
          <label>Email:
                <input type="text" value={email} onChange={this.update('email')} />
          </label>
        </>
      )
    }
  }

  handleSubmit(event) {
    // stop form submission
    event.preventDefault()
    // destructure
    const { password, confirm_password } = this.state

    if (this.signup && password != confirm_password) {
        return this.props.receiveErrors(["Password must match"])
    } else {
      const user = this.state
      this.props.processForm(user)
    }
  }

  render() {
    // deconstruct
    const { errors, header, path, blurb} = this.props
    const { password, username } = this.state
    // set errors
    
    const errorsList = errors.map((error, idx) => {
      return <li key={`error-${idx}`}>{error}</li>
    })
    // initialize alternative options
      return (
        <div>
          <h3>{header}</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Username: 
              <input type="text" value={username} onChange={this.update('username')}/>
            </label>
            <label>Password: 
              <input type="password" value={password} onChange={this.update('password')}/>
            </label>
            {this.extraInput()}
            <input type="submit" value={`${header}!`}/>
          </form>
          <Link to={path} >{blurb}</Link>
          <ul>
            {errorsList}
          </ul>
        </div>
      )

  }
}

export default SessionForm