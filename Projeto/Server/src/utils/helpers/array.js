const { randInt } = require('./random');

function messArray(array) {
    let stack = array;
    const result = [];
    if (!array || array.length === 0) return result;
    
    do {
        const index = randInt(0, stack.length);
        result.push(stack[index]);
        stack = stack.filter((_, i) => i !== index);
    } while(stack.length !== 0);

    return result;
}

function randItem(array) {
    if (!array || array.length === 0) return null;

    const index = randInt(0, array.length);
    return array[index];
}

module.exports = { randItem, messArray };