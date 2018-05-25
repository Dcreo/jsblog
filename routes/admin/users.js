var express = require('express');
var router = express.Router();
const User = require('../../models/user');

router.get('/new', function(req, res, next) {
  res.render('users/new', { title: 'Регистрация нового пользователя' });
});

router.post('/', (req, res, next) => {
  let user = new User(req.body.user);

  user.save((err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
