const { User } = require('../database/models');
const { merge } = require('../utils/helpers/errors');
const roles = require('../utils/enums/roles');
const passwordValidator = require('../utils/validators/password');
const emailValidator = require('../utils/validators/email');

class UserService {
    async getByIdAsync(req, res) { }
    async getAllAsync(req, res) { }
    async createAsync(req, res) { 
        const errors = this.getErrors(req.body);
        if (errors.length) return res.status(400).json({ errors });

        await User.create(req.body);

        res.status(200).json(req.body);
    }
    async updateAsync(req, res) { }
    async loginAsync(req, res) { }

    getErrors(data) {
        const errors = [];
        if (!data.name) errors.push('Parameter name is required');
        if (!data.email) errors.push('Parameter email is required');
        if (data.email) {
            const emailErrors = emailValidator.validate(data.email);
            merge(errors, emailErrors);
        }
        if (!data.password) errors.push('Parameter password is required');
        if (data.password) {
            const passwordErrors = passwordValidator.validate(data.password);
            merge(errors, passwordErrors);
        }
        if (!data.type) errors.push('Parameter type is required');
        if (data.type && [roles.Teacher, roles.Student].indexOf(data.type) === -1) 
            errors.push(`Parameter type require in (${roles.Teacher}, ${roles.Student})`);
        if (data.classCode && !/[A-Z]{3}.\d[A-Z].\d{4}/.test(data.classCode)) 
            errors.push('Parameter classCode not match pattern: /[A-Z]{3}.\d[A-Z].\d{4}/');
        return errors;
    }
}

module.exports = new UserService();