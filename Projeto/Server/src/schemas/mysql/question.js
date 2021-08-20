const { DataTypes, Model } = require('sequelize');

module.exports = sequelize => {
    class Question extends Model { }

    Question.init({  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        level: { 
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        expression: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        expectedResult: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        isLast: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Questions',
        timestamps: false,
        createdAt: 'createdAt'
    });

    return Question;
};