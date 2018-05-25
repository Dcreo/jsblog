var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  let page = res.locals.page = req.query.page;
  let perPage = res.locals.perPage = 2;

  Article.all({ order:
                 { field: 'createdAt',
                   direction: 'DESC' },
                pagination:
                  { page: page,
                    perPage: perPage }},
    (err, articles) => {
      if (err) next(err);

      if (page && !articles.length) {
        next(createError(404));
      } else {
        res.render('public/articles/index', { title: 'Статьи', articles: articles });
      }
    });
});

module.exports = router;
