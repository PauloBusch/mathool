const classModel = require('../schemas/class');
const { errorMidware } = require('../midwares/error-midware');

classModel.methods(['get', 'post', 'put', 'delete']);
classModel.updateOptions({ new: true, runValidators: true });
classModel.after('post', errorMidware);
classModel.after('put', errorMidware);

module.exports = { 
    classService: classModel
};