const jwt = require('jwt-simple');


function tokenForUser(username) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: username, iat: timestamp }, "config.secret");
}

function userFromToken(token) {
  return jwt.decode(token,"config.secret")
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  if ((username!=="marcelo@filmes.com.br")||(password!=="cactus"))
    return res.status(401).send({error:"Username or password incorrect"});
  res.json({ token: tokenForUser(username) });
}

exports.validateToken = function (token) {
  return userFromToken(token);
}
