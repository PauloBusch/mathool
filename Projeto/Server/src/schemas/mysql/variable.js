const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class Variable extends Model { }

    Variable.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id'
            }
        }
    }, { 
        sequelize,
        modelName: 'Variables',
        timestamps: false        
    });

    return Variable;
};