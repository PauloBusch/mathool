const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class Answer extends Model { }

    Answer.init({  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        isLast: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        rightAnswer: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        response: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createdAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Answers',
        timestamps: false,
        createdAt: 'createdAt'
    });

    return Answer;
};