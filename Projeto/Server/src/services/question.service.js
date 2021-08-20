const { bindAll } = require('../utils/helpers/context');
const { Question, Variable, Log } = require('../database/mysql/models');
const { operations, getOperation } = require('../utils/enums/operations');
const { messArray, randItem } = require('../utils/helpers/array');
const { randInt, randDistinctChars } = require('../utils/helpers/random');

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
        res.json({ data: this.generateAsync(1) });
    }

    generateAsync(level) {
        const distinctOperations = this.randDistinctOperations(level);
        const numbers = this.randNumbers(level);
        const variables = this.randVariables(level);

        const stackValues = messArray([...numbers, ...variables.map(v => v.name)]);
        const stackExpression = [];
        const stackOperations = [];

        for (let value of stackValues) {
            const operation = randItem(distinctOperations);
            stackOperations.push(operation);
            stackExpression.push(value);

            const isLast = stackValues.indexOf(value) === stackValues.length - 1;
            if (!isLast) stackExpression.push(getOperation(operation));
        }

        const variablesDeclaration = variables.map(v => `let ${v.name}=${v.value};\n`).join('');
        const mathExpression = stackExpression.join(' ');
        const finalExpression = variablesDeclaration + mathExpression;
        const expectedResult = eval(finalExpression);
        const expectedResultFormatted = parseFloat(expectedResult.toFixed(1));
        return { operations: distinctOperations, variables, numbers, mathExpression, expectedResultFormatted };
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