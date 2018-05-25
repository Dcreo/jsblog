var express = require('express');
var router = express.Router();
const User = require('../../models/user');

router.get('/new', (req, res, next) => {
  res.render('sessions/new', { title: 'Вход в систему' });
});

router.post('/', (req, res, next) => {
  let user = new User(req.body.user);

  user.authenticate((err, user) => {
    if (err) next(err);

    res.send(user);
  });
});

module.exports = router;
