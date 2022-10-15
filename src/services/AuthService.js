const User = require('../models/User');

const userValidate = require('../validate/userValidate');

const NotFoundError = require('../exception/NotFoundError');
const UserError = require('../exception/UserError');
const AuthError = require('../exception/AuthError');
const axios = require('axios');
const { createToken, sendRefreshToken } = require('../utils/auth');
const TypeToken = {
    ACCESS_TOKEN: 'accessToken',
    REFRESTH_TOKEN: 'refreshToken',
};
const COLORS = ['white', 'blue', 'green', 'violet', 'pink'];

class AuthService {
    async login(username, password, source) {
        userValidate.validateLogin(username, password);
        const { _id, tokenVersion, errorLoginTime } = await User.findUser(username, password);

        return await this.generateToken(_id, tokenVersion, errorLoginTime, source);
    }

    async generateToken(_id, tokenVersion, errorLoginTime, source) {
        const token = await createToken(TypeToken.ACCESS_TOKEN, { _id, tokenVersion, errorLoginTime, source });

        return {
            token,
            _id,
            tokenVersion,
            errorLoginTime,
        };
    }

    async registry(dataUser) {
        const data = await userValidate.checkRegistryInfo(dataUser);
        const index = COLORS.length - 1;
        const color = Math.floor(Math.random() * COLORS[index]);
        const avatarColor = color;
        const newUser = new User({
            ...data,
            avatarColor,
            isActived: false,
        });
        await newUser.save();
    }
}

module.exports = new AuthService();
