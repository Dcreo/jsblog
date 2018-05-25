function currentUser(req, res, next) {
  if (req.session.user) {
    res.locals.currentUser = req.session.user;
  }

  next();
}

function user_signed_in_redirect(req, res, next) {
  if (req.session.user) {
    res.redirect('/');
  }

  next();
}

module.exports = { currentUser, user_signed_in_redirect };
