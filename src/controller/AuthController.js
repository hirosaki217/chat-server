const NotFoundError = require('../exception/NotFoundError');
const authService = require('../services/AuthService');
const userService = require('../services/UserSevice');
const { sendRefreshToken } = require('../utils/auth');

class AuthController {
    async login(req, res, next) {
        const { username, password } = req.body;
        const source = req.headers['user-agent'];

        try {
            const { _id, tokenVersion, errorLoginTime, token } = await authService.login(username, password, source);
            sendRefreshToken(res, { _id, tokenVersion, errorLoginTime, source });
            res.json({ token, _id, tokenVersion, errorLoginTime });
        } catch (err) {
            next(err);
        }
    }

    async registry(req, res, next) {
        try {
            await authService.registry(req.body);

            res.status(201).json();
        } catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        console.log(req._id);
        try {
            if (req._id) {
                await authService.logout(req._id);
                res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME);
                // res.status(201).json({ message: 'user logout' });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
