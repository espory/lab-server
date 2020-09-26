module.exports = app => {
    const {INTEGER, STRING, } = app.Sequelize;
    const NewsModel = app.model.define('news', {
        id:{type: INTEGER, primaryKey: true},
        year: STRING(45),
        month: STRING(45),
        detail: STRING(200)
    }, {
        timestamps: false,
        tableName: 'news',
      }
    );

    app.model.NewsModel = NewsModel;
    return NewsModel;
  };
  