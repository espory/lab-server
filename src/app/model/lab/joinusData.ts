module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const JoinUsModel = app.model.define('joinus', {
        id:{type: INTEGER, primaryKey: true},
        title: STRING(200),
        contents: STRING(500)
    }, {
        timestamps: false,
        tableName: 'joinus',
    }
    );
    app.model.JoinUsModel = JoinUsModel;
    return JoinUsModel;
};
