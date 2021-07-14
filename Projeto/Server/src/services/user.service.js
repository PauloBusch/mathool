const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const { User, Class } = require('../database/models');
const { merge } = require('../utils/helpers/errors');
const { bindAll } = require('../utils/helpers/context');
const roles = require('../utils/enums/roles');
const passwordValidator = require('../utils/validators/password');
const emailValidator = require('../utils/validators/email');

class UserService {
    async getAllAsync(req, res) { 
        const filters = req.params;

        const users = await User.find(filters);

        res.status(200).json({ data: users.map(user => this.mapUserResponse(user)) });
    }

    async getByIdAsync(req, res) { 
        const _id = new ObjectId(req.params.id);

        const user = await User.findOne({ _id });

        if (!user) return res.status(400).json('User is not found');

        res.status(200).json({ data: this.mapUserResponse(user) });
    }

    async createAsync(req, res) { 
        const data = req.body;
        const errors = await this.getErrorsAsync(data);
        if (errors.length) return res.status(400).json({ errors });

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(data.password, salt);
        const user = {
            name: data.name,
            email: data.email,
            type: data.type,
            classCode: data.classCode ? [data.classCode] : undefined,
            password: hash
        }; 
        const { _id } = await User.create(user);

        res.status(200).json({ data: { _id, ...user, password: undefined } });
    }

    async updateAsync(req, res) { 
        const _id = new ObjectId(req.params.id);
        const data = req.body;
        const errors = await this.getErrorsAsync(data, _id);
        if (errors.length) return res.status(400).json({ errors });

        const user = {
            name: data.name,
            email: data.email,
            classCode: data.classCode
        };
        await User.updateOne({ _id }, user);

        res.status(200).json({ data: user });
    }

    async loginAsync(req, res) { 
        const data = req.body;
        const errors = await this.getLoginErrors(data);
        if (errors.length) return res.status(400).json({ errors });
        
        const defaultError = 'User or password is invalid';
        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(400).json({ errors: [defaultError] });

        const isValidPassword = bcrypt.compareSync(data.password, user.password);
        if (!isValidPassword) return res.status(400).json({ errors: [defaultError] });

        const userData = this.mapUserResponse(user);
        const token = jwt.sign(
            { user: userData }, 
            process.env.SECRET, 
            { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) }
        );
        res.status(200).json({ data: { ...userData, token } });
    }

    async getErrorsAsync(data, _id) {
        const errors = [];
        if (_id && !await User.exists({ _id }))
            errors.push('User is not found');
        if (!data.name) errors.push('Parameter name is required');
        if (!data.email) errors.push('Parameter email is required');
        if (data.email) {
            const emailErrors = emailValidator.validate(data.email);
            merge(errors, emailErrors);
        }
        if (data.email && await User.exists({ email: data.email, _id: { $ne: _id } }))
            errors.push('User with email already exist');
        if (!_id && !data.password) errors.push('Parameter password is required');
        if (!_id && data.password) {
            const passwordErrors = passwordValidator.validate(data.password);
            merge(errors, passwordErrors);
        }
        if (!_id && !data.type) errors.push('Parameter type is required');
        if (!_id && data.type && [roles.Teacher, roles.Student].indexOf(data.type) === -1) 
            errors.push(`Parameter type require in (${roles.Teacher}, ${roles.Student})`);
        if (data.classCode && !await Class.exists({ code: data.classCode }))
            errors.push('Class with code is not found');
        return errors;
    }

    getLoginErrors(data) {
        const errors = [];
        if (!data.email) errors.push('Parameter email is required');
        if (!data.password) errors.push('Parameter password is required');
        return errors;
    }

    mapUserResponse(data) {
        return {
            _id: data._id,
            name: data.name,
            email: data.email,
            type: data.type,
            classCode: data.classCode
        };
    }
}

module.exports = bindAll(UserService, new UserService());