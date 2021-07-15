const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require("../database/models");
const { bindAll } = require("../utils/helpers/context");

class AuthService { 
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

    mapUserResponse(data) {
        return {
            _id: data._id,
            name: data.name,
            email: data.email,
            type: data.type,
            classCode: data.classCode
        };
    }

    getLoginErrors(data) {
        const errors = [];
        if (!data.email) errors.push('Parameter email is required');
        if (!data.password) errors.push('Parameter password is required');
        return errors;
    }
}

module.exports = bindAll(AuthService, new AuthService());