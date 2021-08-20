const { bindAll } = require('../utils/helpers/context');
const { Question, Log, Answer } = require('../database/mysql/models');
const { ANSWER_CREATED } = require('../utils/enums/log');
const sequelize = require('../database/mysql');

class AnswerService {
    async createAsync(req, res) {
        const data = req.body;
        const errors = await this.getErrorsAsync(data);
        if (errors.length) return res.status(400).json({ errors });

        const question = await Question.findOne({ where: { id: data.questionId, userId: req.user.id } });
        if (!question) return res.status(400).json({ errors: ['Parameter questionId is not found'] });

        const answer = await Answer.findOne({ where: { questionId: data.questionId, isLast: true } });
        const transaction = await sequelize.transaction();
        try {
            const expectedFormatted = parseFloat(question.expectedResult).toFixed(1);
            const resultFormatted = parseFloat(data.response).toFixed(1);

            if (answer) await Answer.update({ isLast: false }, { where: { id: answer.id }, transaction });
            await Question.update({ isLast: false }, { where: { id: question.id }, transaction });
            const resultAnswer = await Answer.create(
                {
                    userId: req.user.id, ...data,
                    rightAnswer: expectedFormatted === resultFormatted,
                }, 
                { transaction }
            );
            await Log.create({
                type: ANSWER_CREATED,
                userId: question.userId,
                answerId: resultAnswer.id
            }, { transaction });
            
            await transaction.commit();
            return res.json({ data: this.mapAnswer(resultAnswer, question) });
        } catch (error) {
            console.error(error);
            await transaction.rollback();
            return res.json({ errors: ['Could not save answer'] });
        }
    }

    mapAnswer(answer, question) {
        return {
            rightAnswer: answer.rightAnswer,
            expectedResult: parseFloat(question.expectedResult).toFixed(1)
        };
    }

    getErrorsAsync(data) {
        const errors = [];
        if (!data.questionId)
            errors.push('Parameter questionId is required');
        if (!data.response || Number.isNaN(parseFloat(data.response)))
            errors.push('Parameter response is invalid');
        return errors;
    }
}

module.exports = bindAll(AnswerService, new AnswerService());