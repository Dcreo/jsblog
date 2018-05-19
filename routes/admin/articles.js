const express = require('express');
const router = express.Router();
const Article = require('../../models/article');

router.get('/', (req, res, next) => {
  let page = req.query.page;

  Article.all({ order: { field: 'createdAt', direction: 'DESC' }, pagination: { page: page, perPage: 5 }}, (err, articles) => {
    if (err) next(err);

    res.render('admin/articles/index', { title: 'Статьи', articles: articles });
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

console.log(router.stack[0].route);

module.exports = router;
