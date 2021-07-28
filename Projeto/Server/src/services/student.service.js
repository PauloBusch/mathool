const { Types } = require('mongoose');
const { ObjectId } = Types;

const { User } = require('../database/models');
const { Role } = require('../utils/enums/roles');
const { bindAll } = require('../utils/helpers/context');

class StudentService {

    async getAsync(req, res) { 
        const _id = new ObjectId(req.user._id);

        const user = await User.findOne({ _id });

        if (!user) return res.status(400).json('Student is not found');

        res.json({ data: this.mapUserResponse(user) });
    }

    async updateStudentClassAsync(req, res) { 
        const _id = new ObjectId(req.user._id);
        const data = req.body;
        const errors = await this.getErrorsAsync(data, _id);
        if (errors.length) return res.status(400).json({ errors });

        const user = {
            classCode: data.classCode
        };
        await User.updateOne({ _id }, user);

        res.json({ data: user });
    }

    mapUserResponse(data) {
        return {
            _id: data._id,
            classCode: data.classCode
        };
    }
    async getErrorsAsync(data, _id) {
        const errors = [];
        if (_id && !await User.exists({ _id }))
            errors.push('Student is not found');
        if (!data.classCode) errors.push('Parameter classCode is required');
        return errors;
    }
}

module.exports = bindAll(StudentService, new StudentService());