function randDistinctChars(alphabet, count) {
    const chars = [];
    if (count === 0) return chars;
    if (alphabet.length < count)
        throw new Error('It is not possible to draw values ​​beyond the alphabet');
    do {
        const char = randChar(alphabet);
        if (chars.indexOf(char) === -1) chars.push(char);           
    } while(chars.length < count);
    return chars.sort((a, b) => a.localeCompare(b));
}

function randChar(alphabet) {
    const index = Math.random() * alphabet.length;
    return alphabet[Math.floor(index)];
}

function randInt(start, end) {
    const range = end - start;
    const value = Math.random() * range;
    return start + Math.floor(value);
}

module.exports = { randDistinctChars, randChar, randInt };