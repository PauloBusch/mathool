const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class QuestionOperations extends Model { }

    QuestionOperations.init({
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id'
            }
        },        
        operationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Operations',
                key: 'id'
            }
        }
    }, { 
        sequelize,
        modelName: 'QuestionOperations',
        timestamps: false
    });

    return QuestionOperations;
};