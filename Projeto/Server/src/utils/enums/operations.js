const operations = {
    ADDITION: 'Adição',
    SUBTRACTION: 'Subtração',
    DIVISION: 'Divisão',
    MULTIPLICATION: 'Multiplicação'
};

function getOperation(operation) {
    switch (operation) {
        case operations.ADDITION: return '+'; 
        case operations.SUBTRACTION: return '-'; 
        case operations.DIVISION: return '/'; 
        case operations.MULTIPLICATION: return '*'; 
        default: throw new Error('Invalid Operation');
    }  
}

module.exports = { operations, getOperation };