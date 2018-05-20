var express = require('express');
var router = express.Router();
const User = require('../../models/user');

router.get('/new', function(req, res, next) {
  res.render('admin/users/new', { title: 'Регистрация нового пользователя' });
});

router.post('/', (req, res, next) => {
  let user = new User(req.body.user);

  res.send(user)
});

module.exports = router;
