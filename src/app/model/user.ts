module.exports = app => {
  const {INTEGER, STRING, } = app.Sequelize;
  const UserModel = app.model.define('user', {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(16),
        allowNull: false,
      },
      password: {
        type: STRING(200),
        allowNull: false,
      },
      mail: {
        type: STRING(200),
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'user',
    }
  );

  UserModel.saveUser = async function (data) {
    const { name } = data;
    const record = await this.findOne({
      where: {
        name,
      }
    });
    if (record) {
      return 'exist';
    }
    await this.create(data);
    return 'create';
  };
  app.model.UserModel = UserModel;
  return UserModel;
};
