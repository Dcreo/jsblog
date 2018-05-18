const connection = require('../db/db');
const moment = require('moment');

class Article {
  constructor(obj) {
    let date = moment().format("YYYY-MM-DD HH:mm:ss");

    this.setCreatedAt(date);
    this.setUpdatedAt(date);

    for (var key in obj) {
      this[key] = obj[key];
    }
  }

  setCreatedAt(date) {
    this.createdAt = date;
  }

  setUpdatedAt(date) {
    this.updatedAt = date;
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
