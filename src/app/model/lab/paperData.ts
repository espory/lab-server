module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const PaperModel = app.model.define('papers', {
        id:{type: INTEGER, primaryKey: true},
        title: STRING(200),
        author: STRING(45),
        conference: STRING(200),
        time: STRING(20),
        category: STRING(100)
    }, {
        timestamps: false,
        tableName: 'papers',
    }
    );

    app.model.PaperModel = PaperModel;
    return PaperModel;
};
