const Authentication = require('./controllers/authentication');
const Show = require("./controllers/show");
const Film = require("./controllers/film");
const Accounts = require("./controllers/accounts");
const passport = require('passport');

const requireAuth = passport.authenticate('bearer', { session: false });

module.exports = function(app) {
  app.get('/api/', function(req, res) {
    res.send({ api: 'Tv Shows para IGTI', version: "1.0" });
  });
  app.post('/api/signin', Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.post('/api/show', requireAuth, Show.postShow);
  app.put('/api/show/:id',requireAuth,Show.putShow);
  app.patch('/api/show/:id',requireAuth,Show.patchShow);
  app.delete('/api/show/:id',requireAuth,Show.deleteShow);
  app.get('/api/show/',requireAuth,Show.getShow);

  app.post('/api/films', requireAuth, Film.postFilm);
  app.put('/api/films/:id',requireAuth,Film.putFilm);
  app.patch('/api/films/:id',requireAuth,Film.patchFilm);
  app.delete('/api/films/:id',requireAuth,Film.deleteFilm);
  app.get('/api/films/',requireAuth,Film.getFilm);
  app.get('/api/films/:id',requireAuth,Film.getFilm);

  app.get('/api/accounts/:id',Accounts.getAccounts);
  app.get('/api/accounts/',Accounts.getAccounts);
}
