module.exports = app => {
    const {INTEGER, STRING, } = app.Sequelize;
    const HomeModel = app.model.define('home', {
        id: { type: INTEGER, primaryKey: true },
        lab_name: STRING(45),
        lab_name_en: STRING(45),
        lab_intro: STRING(200),
        lab_intro_en: STRING(500),
        team_intro: STRING(200),
        strength: STRING(500),
        lab_photo: STRING(100)
    }, {
        timestamps: false,
        tableName: 'home',
      }
    );

    app.model.HomeModel = HomeModel;
    return HomeModel;
  };
  