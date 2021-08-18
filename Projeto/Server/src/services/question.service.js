const { bindAll } = require('../utils/helpers/context');
const { Question, Variable, Log } = require('../database/mysql/models');
const operations = require('../utils/enums/operations');

class QuestionService {
    constructor() {
        this.complexity = {
            range: level => Math.floor(10 + this.randInt(0, level) * 0.4),
            minimum: level => -Math.floor(this.randInt(level * 0.2, 0)),
            countNumbers: level => Math.floor(2 + level * 0.2 + this.randInt(0, level  * 0.1)),
            countVariables: level => Math.floor(level * 0.2 + this.randInt(0, level * 0.1))
        };
    }

    async getLastAsync(req, res) {
        res.json({ data: this.generateAsync(10) });
    }

    generateAsync(level) {
        const operation = this.randOperation();
        const numbers = this.randNumbers(level);
        const variables = this.randVariables(level);
        return { operation, variables, numbers };
    }

    randOperation() {
        const operationKeys = Object.keys(operations);
        const randIndex = this.randInt(0, operationKeys.length);
        const operationKey = operationKeys[randIndex];
        return operations[operationKey];
    }

    randVariables(level) {
        const limit = 8;
        const variables = [];
        const roundedCount = this.complexity.countVariables(level);
        const count = roundedCount > limit ? limit : roundedCount;
        const labels = this.randDistinctChars('abcijkxyz', count);
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
        return this.randInt(minimum, minimum + range);
    }

    randDistinctChars(alphabet, count) {
        const chars = [];
        if (count === 0) return chars;
        if (alphabet.length < count)
            throw new Error('It is not possible to draw values ​​beyond the alphabet');
        do {
            const char = this.randChar(alphabet);
            if (chars.indexOf(char) === -1) chars.push(char);           
        } while(chars.length < count);
        return chars.sort((a, b) => a.localeCompare(b));
    }

    randChar(alphabet) {
        const index = Math.random() * alphabet.length;
        return alphabet[Math.floor(index)];
    }

    randInt(start, end) {
        const range = end - start;
        const value = Math.random() * range;
        return start + Math.floor(value);
    }
}

module.exports = bindAll(QuestionService, new QuestionService());