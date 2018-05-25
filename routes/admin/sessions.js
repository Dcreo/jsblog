var express = require('express');
var router = express.Router();
const User = require('../../models/user');
var session = require('express-session');
const userMiddleware = require('../../middlewares/user');

router.get('/new', userMiddleware.user_signed_in_redirect, (req, res, next) => {
  res.render('sessions/new', { title: 'Вход в систему' });
});

router.post('/', (req, res, next) => {
  let user = new User(req.body.user);

  user.authenticate((err, user) => {
    if (err) next(err);

    req.session.user = { id: user.id, email: user.email };
    res.redirect('/');
  });
});

module.exports = router;
