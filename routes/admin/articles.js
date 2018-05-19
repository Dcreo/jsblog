const express = require('express');
const router = express.Router();
const Article = require('../../models/article');
const createError = require('http-errors');

router.get('/', (req, res, next) => {
  let page = res.locals.page = req.query.page;
  let perPage = res.locals.perPage = 1;

  Article.all({ order:
                 { field: 'createdAt',
                   direction: 'DESC' },
                pagination:
                  { page: page,
                    perPage: perPage }},
    (err, articles) => {
      if (err) next(err);

      if (articles.length) {
        res.render('admin/articles/index', { title: 'Статьи', articles: articles });
      } else {
        next(createError(404));
      }
    });
});

router.get('/new', (req, res) => {
  res.render('admin/articles/new', { title: 'Добавить статью' });
});

router.post('/', (req, res, next) => {
  const article = new Article(req.body.article);
  article.save((err) => {
    if (err) next(err);

    res.redirect('/admin/articles');
  });
});

module.exports = router;
