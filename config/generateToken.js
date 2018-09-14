const secretObj = require("../_secrets/keys");
const jwt = require("jsonwebtoken"); 
const secret = secretObj.jwtKey; 
function generateToken(user){
  const payload = {
      username: user.username, 
    
  }
  const options = {
    expiresIn: '1h',
    jwtid: "23ad89",
    subject: `${user.id}`
  };
  return jwt.sign(payload, secret, options); 
}

module.exports = generateToken; 