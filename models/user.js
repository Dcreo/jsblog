const connection = require('../db/db');
const moment = require('moment');
const QueryBuilder = require('../lib/query-builder');
const queryBuilder = new QueryBuilder('Users');
const bcrypt = require('bcrypt');

class User {
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

  hashPassword(cb) {
    const saltRounds = 10;

    bcrypt.hash(this.password, saltRounds, (err, hash) => {
      if (err) return cb(err);

      cb(null, hash);
    });
  }

  static findByEmail(email, cb) {
    let sql = queryBuilder.findBy('email', email);

    connection.query(sql, email, User.resultCallback(cb));
  }

  authenticate(cb) {
    User.findByEmail(this.email, (err, user) => {
      bcrypt.compare(this.password, user[0].password, (err, res) => {
        if (err) return cb(err);

        cb(null, user);
      });
    });
  }

  save(cb) {
    let sql = queryBuilder.save();

    User.findByEmail(this.email, (err, user) => {
      if (err) cb(err);

      if (user.length) {
        return cb(new Error('Пользователь с таким email адресом уже существует!'));
      } else {
        this.hashPassword((err, hashedPassword) => {
          this.password = hashedPassword;

          connection.query(sql, this, User.resultCallback(cb));
        });
      }
    });
  }

  static resultCallback(cb) {
    return (err, result) => {
      if (err) return cb(err);

      cb(null, result);
    }
  }
}

module.exports = User;
