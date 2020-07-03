const Authentication = require('./controllers/authentication');
const Show = require("./controllers/show")
const passport = require('passport');

const requireAuth = passport.authenticate('bearer', { session: false });

module.exports = function(app) {
  app.get('/api/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/api/signin', Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.post('/api/show', requireAuth, Show.postShow);
  app.put('/api/show/:id',requireAuth,Show.putShow);
  app.get('/api/show/',requireAuth,Show.getShow);
}
