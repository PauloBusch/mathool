const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class Operation extends Model { }

    Operation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        symbol: {
            type: DataTypes.CHAR,
            allowNull: false
        }
    }, { 
        sequelize,
        modelName: 'Operations',
        timestamps: false
    });

    return Operation;
};