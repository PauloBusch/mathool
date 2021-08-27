const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class User extends Model { }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        guid: {
            unique: true,
            type: DataTypes.STRING(38),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        classCode: DataTypes.STRING(10)
    }, {
        sequelize,
        modelName: 'Users',
        timestamps: false
    });
    return User;
}