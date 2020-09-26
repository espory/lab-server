module.exports = app => {
    const {INTEGER, STRING, } = app.Sequelize;
    const AccountModel = app.model.define('administrators', {
        id: {type: INTEGER, primaryKey: true },
        name: STRING(45),
        passwd: STRING(45)
    }, {
        timestamps: false,
        tableName: 'administrators',
      }
    );

    app.model.AccountModel = AccountModel;
    return AccountModel;
  };
  