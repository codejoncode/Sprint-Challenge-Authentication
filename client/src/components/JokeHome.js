import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const JokeCard = styled.div`
  background: blue;
  color: white;
  width: 350px;
`;

class JokeHome extends React.Component {
  state = {
    username: null,
    jokes: [],
    general: [],
    programming: [],
    knock_knock: [],
    noType: []
  };

  organizeJokes = () => {
    const jokes = this.state.jokes.slice();
    const noType = [];
    const general = [];
    const programming = [];
    const knock_knock = [];
    for (let joke of jokes) {
      switch (joke.type) {
        case "general":
          general.push(joke);
          break;
        case "programming":
          programming.push(joke);
          break;
        case "knock-knock":
          knock_knock.push(joke);
          break;
        default:
          noType.push(joke);
      }
    }
    this.setState({ noType, general, programming, knock_knock });
  };

  fetchJokes = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    const promise = axios.get("http://localhost:3300/api/jokes/", reqOptions);
    promise
      .then(response => {
        console.log(response);
        this.setState({
          jokes: response.data,
          username
        });
        this.organizeJokes();
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillMount() {
    this.fetchJokes();
  }

  render() {
    console.log(this.state);
    if (this.state.jokes.length) {
      return (
        <div>
          <h1>Hello {this.state.username}</h1>
          <h1>JOKES</h1>
          <label>All</label>
          <input type="checkbox" />
          <label>General</label>
          <input type="checkbox" />
          <label>Knock Knock</label>
          <input type="checkbox" />
          <label>Programming</label>
          <input type="checkbox" />
          <br />
          <div>
            {this.state.jokes.map((joke, i) => {
              return (
                <JokeCard key={i}>
                  <h5>Type: {joke.type}</h5>
                  <h6>SetUp: {joke.setup}</h6>
                  <h6>PunchLine: {joke.punchline}</h6>
                </JokeCard>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Your not logged in!!</h1>
          <button>
            <Link to="/signin">Login</Link>
          </button>
        </div>
      );
    }
  }
}

export default JokeHome;
