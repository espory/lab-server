module.exports = app => {
    const {INTEGER, STRING, } = app.Sequelize;
    const CooperatorsModel = app.model.define('cooperators', {
        id:{type: INTEGER, primaryKey: true},
        name: STRING(100),
        type: STRING(45),
        image: STRING(100)
    }, {
        timestamps: false,
        tableName: 'cooperators',
      }
    );

    app.model.CooperatorsModel = CooperatorsModel;
    return CooperatorsModel;
  };
  