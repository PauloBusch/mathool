const { DataTypes, Model } = require('sequelize');
const { QUESTION_CREATED, ANSWER_CREATED } = require('../../utils/enums/log');

module.exports = sequelize => {
    class Log extends Model { }

    Log.init({  
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM(QUESTION_CREATED, ANSWER_CREATED),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        answerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Answers',
                key: 'id'
            }
        },
        questionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Questions',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('now()')
        }
    }, {
        sequelize,
        modelName: 'Logs',
        timestamps: false,
        createdAt: 'createdAt'
    });

    return Log;
};