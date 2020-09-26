module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const ActivitiesModel = app.model.define('activities', {
        id: { type: INTEGER, primaryKey: true },
        title: STRING(45),
        detail: STRING(45),
        image: STRING(45)
    }, {
        timestamps: false,
        tableName: 'activities',
    }
    );

    app.model.CategoryModel = ActivitiesModel;
    return ActivitiesModel;
};
