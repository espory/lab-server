module.exports = app => {
    const {INTEGER, STRING, } = app.Sequelize;
    const CategoryModel = app.model.define('paper_category', {
        category: {type: STRING(100),primaryKey: true},
        number: INTEGER
    }, {
        timestamps: false,
        tableName: 'paper_category',
      }
    );

    app.model.CategoryModel = CategoryModel;
    return CategoryModel;
  };
  