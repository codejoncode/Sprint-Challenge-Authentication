const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate } = require("./middlewares");
const generateToken = require("./generateToken");
const db = require("../database/dbConfig");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.use(cors());
  server.use(helmet());
  server.use(morgan("short"));
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      if (ids) {
        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = generateToken(user);
            if (user && token) {
              res.status(201).json({ id: user.id, token });
            } else {
              res.status(500).json({ message: "registration failed" });
            }
          })
          .catch(error =>
            res.status(500).json({ error, message: error.message })
          );
      } else {
        //ids is not a thing  thus registration failed
        res.status(500).send("Registration failed");
      }
    })
    .catch(error => res.status(500).json({ error, message: error.message }));
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token, username: creds.username });
      } else {
        res.status(401).json({ message: "Unauthorized Login failed" });
      }
    })
    .catch(error => res.status(500).send(error));
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
