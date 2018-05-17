const connection = require('../db/db');

class Article {
  constructor(obj) {
    for (var key in obj) {
      this[key] = obj[key];
    }
  }

  static all(cb) {
    connection.query('SELECT * FROM Articles', (err, articles) => {
      if (err) return cb(err);

      cb(null, articles);
    });
  }

  save(cb) {
    connection.query('INSERT INTO Articles SET ?', this, (err) => {
      if (err) return cb(err);

      cb(null);
    });
  }
}

module.exports = Article;
