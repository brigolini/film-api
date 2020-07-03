const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

let userList = new Array();

function tokenForUser(username) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: username, iat: timestamp}, "config.secret");
}

function userFromToken(token) {
    return jwt.decode(token, "config.secret")
}

exports.signin = function (req, res, next) {
    const userName = req.body.username;
    const pass = req.body.password;

    if (!userName || !pass) {
        return res.status(422).send({error: 'Você deve preencher usuário e senha'});
    }

    const user = userList.filter(user => user.username == userName)
    if (user.length == 0 || !bcrypt.compareSync(pass, user[0].pass))
        return res.status(401).send({error: "Usuário ou senha incorretos"});

    res.json({token: tokenForUser(userName)});
}

exports.validateToken = function (token) {
    return userFromToken(token);
}

function getHash(pass) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}

exports.signup = (req, res, next) => {

    const username = req.body.username;
    const pass = req.body.password;
    if ((!username) || (!pass)) {
        res.status(422).send({error: "Você deve incluir usuário e senha"})
    }
    if (userList.some(user => user.username = username))
        res.status(422).send({erro: "usuario ja cadastrado"});
    if ((username.indexOf(" ") > -1) || (pass.indexOf(" ") > -1))
        res.status(422).send({erro: "Usuário e senha não podem conter espacos"})
    if ((username.length > 20) || (pass.length > 10))
        res.status(422).send({erro: "Usuário pode ter no máximo 20 caracteres e senha pode ter no máximo 10"})
    const hash = getHash(pass);
    userList = [{username, pass: hash}, ...userList]
    return res.send({token: tokenForUser(username)});

}
