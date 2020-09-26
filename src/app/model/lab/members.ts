module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const MembersModel = app.model.define('members', {
        id: { type: INTEGER, primaryKey: true },
        name_en: STRING(45),
        name_cn: STRING(45),
        job_title: STRING(100),
        degree: STRING(200),
        institude: STRING(100),
        type: STRING(45),
        detail: STRING(2000),
        photo: STRING(45),
        url: STRING(200)
    }, {
        timestamps: false,
        tableName: 'members',
    }
    );
    app.model.MembersModel = MembersModel;
    return MembersModel;
};
