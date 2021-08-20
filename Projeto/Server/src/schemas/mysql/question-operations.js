const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class QuestionOperations extends Model { }

    QuestionOperations.init({
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        operationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { 
        sequelize,
        modelName: 'QuestionOperations',
        timestamps: false
    });

    return QuestionOperations;
};