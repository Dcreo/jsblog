class QueryBuilder {
  constructor(modelName) {
    this.modelName = modelName;
  }

  all(options) {
    let sql = 'SELECT * FROM ' + this.modelName;

    if (options.order && options.order.field && options.order.direction) {
      return sql += ' ORDER BY ' + options.order.field + ' ' + options.order.direction;
    }

    return sql;
  }

  save() {
    let sql = 'INSERT INTO ' + this.modelName + ' SET ?';

    return sql;
  }
}

module.exports = QueryBuilder;
