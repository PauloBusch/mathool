const { Class } = require('../database/models');
const { bindAll } = require('../utils/helpers/context');

class ClassService {
    async getByIdAsync(req, res) { }
    async getAllAsync(req, res) { }
    async createAsync(req, res) { }
    async updateAsync(req, res) { }
    async removeAsync(req, res) { }

    getErrors(data) {
        const errors = [];
        return errors;
    }
}

module.exports = bindAll(ClassService, new ClassService());