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

    this.password, this.email = 
      this.state.password, this.state.email

    this.formType, this.path, this.header, this.blurb, this.errors = 
      this.props.formType, this.props.path, this.props.header, this.props.blurb, this.props.errors

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return event => {
      this.setState({[field]: event.target.value})
    }
  }

  extraInput() {
    if (this.formType === 'signup') {
      return (
        <>
          <label>Confirm Password:
                <input type="password" value={this.password} onChange={this.update('password')} />
          </label>
          <label>Email:
                <input type="text" value={this.email} onChange={this.update('email')} />
          </label>
        </>
      )
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = this.state
    this.props.processForm(user)
  }

  render() {
    // set errors
    debugger
    const errors = this.errors.map(error => {
      return <li>{error}</li>
    })
    // initialize alternative options
      return (
        <div>
          <h3>{this.header}</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Username: 
              <input type="text" value={this.username} onChange={this.update('username')}/>
            </label>
            <label>Password: 
              <input type="password" value={this.password} onChange={this.update('password')}/>
            </label>
            {this.extraInput()}
            <input type="submit" value={`${this.header}!`}/>
          </form>
          <Link to={this.path} >{this.blurb}</Link>
          <ul>
            {errors}
          </ul>
        </div>
      )

  }
}

export default SessionForm