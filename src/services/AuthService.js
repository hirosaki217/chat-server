const User = require('../models/User');

const userValidate = require('../validate/userValidate');

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

        const color = COLORS[Math.floor(Math.random() * (COLORS.length - 1))];
        const avatarColor = color;
        const newUser = new User({
            ...data,
            avatarColor,
            // chua otp
            isActived: true,
        });
        await newUser.save();
    }

    async logout(userId) {
        const user = await User.logout(userId);
        return user;
    }
}

module.exports = new AuthService();
