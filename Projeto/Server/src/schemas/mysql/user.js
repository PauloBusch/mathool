const { DataTypes } = require('sequelize');

module.exports = sequelize => 
    sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        guid: {
            type: DataTypes.STRING(38),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        class_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                name: 'guid_UNIQUE',
                unique: true,
                fields: ['guid']
            }
        ]
    });