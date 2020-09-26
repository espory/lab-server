module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const ProjectsModel = app.model.define('projects', {
        id: { type: INTEGER, primaryKey: true },
        title: STRING(45),
        detail: STRING(500),
        image: STRING(200)
    }, {
        timestamps: false,
        tableName: 'news',
    }
    );

    app.model.ProjectsModel = ProjectsModel;
    return ProjectsModel;
};
