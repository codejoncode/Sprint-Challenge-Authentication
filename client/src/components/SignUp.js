import React from "react";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} />
          <br />
          <label>Password</label>
          <input type="text" name="password" value={this.state.password} />
          <br />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
