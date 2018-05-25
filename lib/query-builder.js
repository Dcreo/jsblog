class QueryBuilder {
  constructor(modelName) {
    this.modelName = modelName;
  }

  findBy(fieldName, fieldData) {
    let sql = 'SELECT * FROM ' + this.modelName + ' WHERE ' + fieldName + '= ?';

    return sql;
  }

  all(options) {
    let sql = 'SELECT *, (SELECT COUNT(0) FROM ' + this.modelName + ') as collectionCount FROM ' + this.modelName;

    if (options.order && options.order.field && options.order.direction) {
      sql += ' ORDER BY ' + options.order.field + ' ' + options.order.direction;
    }

    if (options.pagination) {
      let page = options.pagination.page || 0;
      let perPage = options.pagination.perPage || 10000;
      let offset = (page == 0 || page == 1) ? 0 : ((page-1) * perPage);

      sql += ' LIMIT ' + perPage + ' OFFSET ' + offset;
    }

    return sql;
  }

  save() {
    let sql = 'INSERT INTO ' + this.modelName + ' SET ?';

    return sql;
  }
}

module.exports = QueryBuilder;
