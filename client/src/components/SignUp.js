import React from "react";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    confirm: ""
  };
  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  onSubmit = event => {
    event.preventDefault()
    const username = this.state.username.slice()
    const password = this.state.password.slice()
    const confirm = this.state.confirm.slice()
    if(password !== confirm){
        this.setState({password: "", confirm: ""})
        alert("Please confirm your password they did not match")
    } else if(!username.length && !password.length){
      alert("Please fill out all three required fields.")
    } else {
        // do the register {username, password}
    }
  }

  render() {
    return (
      <div>
        <h2>Choose a Username and Password</h2>
        <form onSubmit = {this.onSubmit}>
          <label>Username</label>
          <br/>
          <input onChange = {this.onChange} type="text" name="username" value={this.state.username} />
          <br />
          <label>Password</label>
          <br/>
          <input onChange = {this.onChange} type="password" name="password" value={this.state.password} />
          <br />
          <label>Confirm Password</label>
          <br/>
          <input onChange = {this.onChange} type="password" name = "confirm" value = {this.state.confirm}/>
          <br/>
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
