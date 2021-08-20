const { bindAll } = require('../utils/helpers/context');
const { Question, Variable, QuestionOperations, Operation, Log } = require('../database/mysql/models');
const { operations, getSymbol, getName } = require('../utils/enums/operations');
const { messArray, randItem } = require('../utils/helpers/array');
const { randInt, randDistinctChars } = require('../utils/helpers/random');
const { QUESTION_CREATED } = require('../utils/enums/log');
const sequelize = require('../database/mysql');

class QuestionService {
    constructor() {
        this.complexity = {
            range: level => Math.floor(10 + randInt(0, level ^ 5) * 5),
            minimum: level => -Math.floor(randInt(level * 2, 0)),
            countOperations: level => Math.floor(1 + level * 0.05 + randInt(0, level  * 0.02)),
            countNumbers: level => Math.floor(2 + level * 0.05 + randInt(0, level  * 0.03)),
            countVariables: level => Math.floor(level * 0.05 + randInt(0, level * 0.03))
        };
    }

    async getLastAsync(req, res) {
        let question = await Question.findOne({ where: { isLast: true } });
        if (question) {
            question.variables = await Variable.findAll({ where: { questionId: question.id } });
            question.operations = await Operation.findAll({ 
                include: [
                    { 
                        as: 'OperationsQuestion',
                        model: QuestionOperations,
                        where: { questionId: question.id }
                    }
                ] 
            });
            return res.json({ data: this.mapQuestion(question) });
        }

        const maxLevel = await Question.max('level') || 0;
        const newLevel = maxLevel + 1;
        const questionData = this.generate(newLevel);
        question = {
            userId: req.user.id,
            level: newLevel,
            ...questionData
        };

        const questionSaved = await this.saveAsync(question);
        if (!questionSaved) return res.status(500).json({ errors: ['Cound not save question'] });

        res.json({ data: this.mapQuestion({ ...questionData, id: questionSaved.id }) });
    }

    async saveAsync(question) {
        const transaction = await sequelize.transaction();

        try {
            const { operations, variables } = question;
            const resultQuestion = await Question.create(
                {
                    userId: question.userId,
                    level: question.level,
                    expression: question.expression,
                    expectedResult: question.expectedResult
                }, 
                { transaction }
            );
            const questionId = resultQuestion.id;

            await Variable.bulkCreate(
                variables.map(v => ({ ...v, questionId })), 
                { transaction }
            );
            await QuestionOperations.bulkCreate(
                operations.map(o => ({ operationId: o, questionId })), 
                { transaction }
            );

            await Log.create({
                type: QUESTION_CREATED,
                userId: question.userId,
                questionId: questionId
            }, { transaction });
            
            await transaction.commit();
            return resultQuestion;
        } catch (error) {
            console.error(error);
            await transaction.rollback();
            return null;
        }
    }

    mapQuestion(question) {
        return {
            id: question.id,
            level: question.level,
            expression: question.expression,
            variables: question.variables,
            operations: question.operations
        };
    }

    generate(level) {
        const distinctOperations = this.randDistinctOperations(level);
        const numbers = this.randNumbers(level);
        const variables = this.randVariables(level);

        const stackValues = messArray([...numbers, ...variables.map(v => v.name)]);
        const stackExpression = [];
        const stackOperations = [];

        for (let value of stackValues) {
            const operation = randItem(distinctOperations);
            if (stackOperations.indexOf(operation) === -1) 
                stackOperations.push(operation);
            stackExpression.push(value);

            const isLast = stackValues.indexOf(value) === stackValues.length - 1;
            if (!isLast) stackExpression.push(getSymbol(operation));
        }

        const variablesDeclaration = variables.map(v => `let ${v.name}=${v.value};\n`).join('');
        const mathExpression = stackExpression.join(' ');
        const expectedResult = eval(variablesDeclaration + mathExpression);
        return { 
            expression: mathExpression,
            expectedResult: parseFloat(expectedResult.toFixed(1)),
            operations: stackOperations,
            variables
        };
    }

    randDistinctOperations(level) {
        const limit = Object.keys(operations).length;
        const operationsList = [];
        const roundedCount = this.complexity.countOperations(level);
        const count = roundedCount > limit ? limit : roundedCount;
        do {
            const operation = this.randOperation();
            if (operationsList.indexOf(operation) === -1) 
                operationsList.push(operation);
        } while(operationsList.length < count);
        return operationsList;
    }    
    
    randOperation() {
        const operationKeys = Object.keys(operations);
        const operationKey = randItem(operationKeys);
        return operations[operationKey];
    }

    randVariables(level) {
        const alphabet = 'xyz';
        const limit = alphabet.length;
        const variables = [];
        const roundedCount = this.complexity.countVariables(level);
        const count = roundedCount > limit ? limit : roundedCount;
        const labels = randDistinctChars(alphabet, count);
        for (const label of labels) {
            variables.push({ 
                name: label, 
                value: this.randNumber(level) 
            });
        }
        return variables;
    }

    randNumbers(level) {
        const numbers = [];
        const count = this.complexity.countNumbers(level);
        for (let index = 0; index < count; index++)
            numbers.push(this.randNumber(level));
        return numbers;
    }

    randNumber(level) {
        const minimum = this.complexity.minimum(level);
        const range = this.complexity.range(level);
        return randInt(minimum, minimum + range);
    }
}

module.exports = bindAll(QuestionService, new QuestionService());