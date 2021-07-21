const { Types } = require('mongoose');
const { ObjectId } = Types;

const { Class } = require('../database/models');
const { bindAll } = require('../utils/helpers/context');

class ClassService {

    async getByIdAsync(req, res) {
        const _id = new ObjectId(req.params.id);

        const classe = await Class.findOne({ _id });

        if (!classe) return res.status(400).json('Classe is not found');

        res.json({ data: this.mapUserResponse(classe) });
     }

    async getAllAsync(req, res) {
        const filters = req.params;

        const classes = await Class.find(filters);

        res.json({ data: classes.map(classe => this.mapUserResponse(classe)) });
    }

    async createAsync(req, res) { 

    }


    async updateAsync(req, res) {

    }


    async removeAsync(req, res) {

    }

    async getErrorsAsync(data, _id) {
        const errors = [];
        if (_id && !await Class.exists({ _id }))
            errors.push('Class is not found');
        if (!data.name) errors.push('Parameter name is required');
        if (!data.serie) errors.push('Parameter serie is required');
        if (!data.class) errors.push('Parameter class is required');
        if (!data.code) errors.push('Parameter code is required');
        
        return errors;
    }

    mapUserResponse(data) {
        return {
            _id: data._id,
            name: data.name,
            serie: data.serie,
            class: data.class,
            code: data.code
        };
    }
}

module.exports = bindAll(ClassService, new ClassService());