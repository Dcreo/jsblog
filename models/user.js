const connection = require('../db/db');
const moment = require('moment');
const QueryBuilder = require('../lib/query-builder');
const queryBuilder = new QueryBuilder('Users');

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

  hashPassword() {

  }

  save(cb) {
    let sql = queryBuilder.save();

    connection.query(sql, this, Article.resultCallback(cb));
  }

  static resultCallback(cb) {
    return (err, result) => {
      if (err) return cb(err);

      cb(null, result);
    }
  }
}

module.exports = Article;
