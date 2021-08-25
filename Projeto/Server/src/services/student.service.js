const { Types } = require('mongoose');
const { ObjectId } = Types;

const { User } = require('../database/mongo/models');
const MongoDb = require('../database/mongo/models');
const MySqlDb = require('../database/mysql/models');
const { bindAll } = require('../utils/helpers/context');

class StudentService {

    async getAsync(req, res) { 
        const _id = new ObjectId(req.user._id);

        const user = await MongoDb.User.findOne({ _id });

        if (!user) return res.status(400).json('Student is not found');

        res.json({ data: this.mapUserResponse(user) });
    }

    async getAllStudentByClassCodeAsync(req, res) { 
        const classCode = req.params.classCode;
        const user = await MySqlDb.User.findAll({
            where: { classCode }
        });
        if (!user) return res.status(400).json('Student is not found');
        res.json({data: this.mapUserArrayResponse(user)});
    }

    async updateStudentClassAsync(req, res) { 
        const _id = new ObjectId(req.user._id);
        const data = req.body;
        const errors = await this.getErrorsAsync(data, _id);
        if (errors.length) return res.status(400).json({ errors });

        const user = {
            classCode: data.classCode
        };
        await MongoDb.User.updateOne({ _id }, user);
        await MySqlDb.User.update(user, { where: { guid: _id.toString() } });

        res.json({ data: user });
    }

    mapUserResponse(data) {
        return {
            _id: data._id,
            classCode: data.classCode
        };
    }
    mapUserArrayResponse(array) {
        let data = [];
        array.forEach(element => {
            data.push({
                id: element.id,
                name: element.name,
                classCode: element.classCode
            });
        });
        return data;
    }
    async getErrorsAsync(data, _id) {
        const errors = [];
        if (_id && !await MongoDb.User.exists({ _id }))
            errors.push('Student is not found');
        if (!data.classCode) errors.push('Parameter classCode is required');
        return errors;
    }
}

module.exports = bindAll(StudentService, new StudentService());