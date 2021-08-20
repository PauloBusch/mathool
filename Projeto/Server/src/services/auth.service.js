const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { merge } = require('../utils/helpers/errors');
const { User } = require("../database/mongo/models");
const { bindAll } = require("../utils/helpers/context");
const { MailDetails } = require('../models/smtp/email-detail');
const MySqlDb = require('../database/mysql/models');
const mailService = require('./email.service');
const passwordValidator = require('../utils/validators/password');

class AuthService { 
    async loginAsync(req, res) { 
        const data = req.body;
        const errors = await this.getLoginErrors(data);
        if (errors.length) return res.status(400).json({ errors });
        
        const defaultError = 'User or password is invalid';
        const mongoUser = await User.findOne({ email: data.email });
        if (!mongoUser) return res.status(400).json({ errors: [defaultError] });
        const mysqlUser = await MySqlDb.User.findOne({ where: { guid: mongoUser._id.toString() } });
        if (!mysqlUser) return res.status(400).json({ errors: [defaultError] });

        const isValidPassword = bcrypt.compareSync(data.password, mongoUser.password);
        if (!isValidPassword) return res.status(400).json({ errors: [defaultError] });

        const userData = this.mapUserResponse(mongoUser, mysqlUser);
        const token = jwt.sign(
            { user: userData }, 
            process.env.SECRET, 
            { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) }
        );
        res.status(200).json({ data: { ...userData, token } });
    }

    async forgotPasswordAsync(req, res){
        const data = req.body;
        const errors = this.getForgotPasswordErrors(data);
        if (errors.length) return res.status(400).json({ errors });
        
        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(400).json({ errors: ['User with email does not exist'] });

        const token = jwt.sign(
            { user: { email: data.email } }, 
            process.env.SECRET, 
            { expiresIn: parseInt(process.env.TOKEN_EXPIRATION) }
        );
        const detail = new MailDetails(
            'Redefinição de Senha',
            `<p><a href="${data.baseUrl}?token=${token}">Link</a> para redefinir sua senha.</p>`,
            data.email
        );
        mailService.sendAsync(detail, (err, _) => {
            if (err) return res.status(400).json({ errors: ['Fail to send recovery email'] });
            res.status(200).json({ data: { token } });
        });
    }

    async changePasswordWithTokenAsync(req, res) {
        const data = req.body;
        const errors = this.getChangePasswordWithTokenErrors(data);
        if (errors.length) return res.status(400).json({ errors });

        jwt.verify(data.token, process.env.SECRET, async function(err, decoded) {
            if(err) {
              res.status(403).send({ errors: ['Token is invalid', err.message] });
              throw err;
            }

            const { email } = decoded.user;
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(data.newPassword, salt);
            await User.updateOne({ email }, { password: hash });
            res.json({ data: decoded.user });
        });
    }

    mapUserResponse(mongoUser, mysqlUser) {
        return {
            _id: mongoUser._id,
            id: mysqlUser.id,
            name: mongoUser.name,
            email: mongoUser.email,
            role: mongoUser.role,
            classCode: mongoUser.classCode
        };
    }

    getLoginErrors(data) {
        const errors = [];
        if (!data.email) errors.push('Parameter email is required');
        if (!data.password) errors.push('Parameter password is required');
        return errors;
    }

    getForgotPasswordErrors(data) {
        const errors = [];
        if (!data.email) errors.push('Parameter email is required');
        if (!data.baseUrl) errors.push('Parameter baseUrl is required');
        return errors;
    }

    getChangePasswordWithTokenErrors(data) {
        const errors = [];
        if (!data.token) errors.push('Parameter token is required');
        if (!data.newPassword) errors.push('Parameter newPassword is required');
        if (data.newPassword) {
            const passwordErrors = passwordValidator.validate(data.email);
            merge(errors, passwordErrors);
        }
        if (!data.confirmPassword) errors.push('Parameter confirmPassword is required');
        if (data.newPassword !== data.confirmPassword) errors.push('Parameter confirmPassword is not equal to newPassword');
        return errors;
    }
}

module.exports = bindAll(AuthService, new AuthService());