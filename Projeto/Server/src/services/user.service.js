const { User } = require('../database/models');

class UserService {
    async getByIdAsync(req, res) { }
    async getAllAsync(req, res) { }
    async createAsync(req, res) { }
    async updateAsync(req, res) { }
    async loginAsync(req, res) { }

    getErrors(data) {
        const errors = [];
        return errors;
    }
}

module.exports = new UserService();