const operations = {
    ADDITION: 1,
    SUBTRACTION: 2,
    MULTIPLICATION: 3,
    DIVISION: 4
};

const operationsProps = {
    [operations.ADDITION]: { symbol: '+', name: 'Adição' },
    [operations.SUBTRACTION]: { symbol: '-', name: 'Subtração' },
    [operations.DIVISION]: { symbol: '/', name: 'Divisão' },
    [operations.MULTIPLICATION]: { symbol: '*', name: 'Multiplicação' }
};

function getSymbol(operation) {
    const props = operationsProps[operation];
    if (props) return props.symbol;
    throw new Error('Invalid Operation');
}

function getName(operation) {
    const props = operationsProps[operation];
    if (props) return props.name;
    throw new Error('Invalid Operation'); 
}

module.exports = { operations, getSymbol, getName };