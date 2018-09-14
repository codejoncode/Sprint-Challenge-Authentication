import React from 'react'; 
import axios from 'axios'; 


class Signin extends React.Component {
  state = {
    username: "",
    password: "",
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const username = this.state.username.slice();
    const password = this.state.password.slice();
    if(!username.length){
      alert("Please enter your username")
      this.setState({username: "", password: ""})
    }else if (!password.length){
      alert("Please enter your password")
    } else {
        const body = {username, password}
        this.login(body); 
    }
  }
  login = body => {
    const promise = axios.post("http://localhost:3300/api/login/", body)
    promise
      .then(response => {
        if(response){
          console.log(response)
          localStorage.setItem("token", response.data.token);
          return this.props.history.push("/jokehome");
        }
      })
      .catch(error => {
        console.error(error);
        return this.props.history.push("/signin");
      })

  }

  render() {
    return (
      <div>
        <h2>Please Login</h2>
        <form onSubmit = {this.onSubmit}>
          <label>Username</label>
          <br/>
          <input 
            type="text"
            onChange = {this.onChange}
            name = "username"
            value = {this.state.username}
          />
          <br/>
          <label>Password</label>
          <br/>
          <input
            type="password"
            onChange = {this.onChange}
            name="password"
            value = {this.state.password}
          />
          <br/>
          <button>Login</button>
        </form>
        
      </div>
    )
  }
}

export default Signin; 