const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class QuestionOperations extends Model { }

    QuestionOperations.init({
        questionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        operationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, { 
        sequelize,
        modelName: 'QuestionOperations',
        timestamps: false
    });

    return QuestionOperations;
};