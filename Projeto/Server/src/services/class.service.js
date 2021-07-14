const { Class } = require('../database/models');

class ClassService {
    async getByIdAsync(req, res) { }
    getAllAsync(req, res) { }
    createAsync(req, res) { }
    updateAsync(req, res) { }
    removeAsync(req, res) { }

    getErrors(data) {
        const errors = [];
        return errors;
    }
}

module.exports = new ClassService();