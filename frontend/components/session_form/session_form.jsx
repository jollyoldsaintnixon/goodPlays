import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '', 
      password: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return event => {
      this.setState({[field]: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = this.state
    this.props.processForm(user)
  }

  render() {
    // deconstruct
    const { username, password, email } = this.state
    const { formType } = this.props
    // set errors
    debugger
    const errors = this.props.errors.map(error => {
      return <li>{error}</li>
    })
    // initialize alternative options
    let path;
    let header;
    let blurb;
    if (formType === 'signup') {
      path = '/login';
      header = 'Sign Up';
      blurb = 'Already a member?';
    } else {
      path = '/signup';
      header = 'Log In';
      blurb = 'Click here to join'
    }

    if (formType === 'signup') {
      return (
        <div>
          <h3>Sign Up!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Username: 
              <input type="text" value={ username } onChange={this.update('username')}/>
            </label>
            <label>Password: 
              <input type="password" value={ password } onChange={this.update('password')}/>
            </label>
            <label>Email:
              <input type="text" value={email} onChange={this.update('email')} />
            </label>
            <input type="submit" value={`${header}!`}/>
          </form>
          <Link to={path} >{blurb}</Link>
          <ul>
            {errors}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Sign Up!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Username:
              <input type="text" value={username} onChange={this.update('username')} />
            </label>
            <label>Password:
              <input type="password" value={password} onChange={this.update('password')} />
            </label>
            <input type="submit" value={`${header}!`} />
          </form>
          <Link to={path} >{blurb}</Link>
          <ul>
            {errors}
          </ul>
        </div>
      )
    }

  }
}

export default SessionForm