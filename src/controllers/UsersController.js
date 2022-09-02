const bcrypt = require('bcryptjs');

const User = require('../schemas/userSchema');
const helpers = require('../helpers/functions');
const helper_jwt = require('../helpers/helper_jwt');
const CustomError = require('../helpers/customError');

class UsersController {
    static async register(req, res, next) {

        try {

            const { email } = req.body;

            let userEmail = await User.findOne({ email });

            if (userEmail) throw new CustomError('User already exists', 400 );

            const user = await User.create(req.body);

            user.password = undefined;

            return res.json({
                user,
                token: await helper_jwt.generateToken({ id: user._id })
            });

        } catch (error) {
            return res.status(error.status || 404).json({ message: error.message || 'Registration failed' });
        }
    }

    static async login(req, res, next) {

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email }).select('+password');

            if (!user) throw new CustomError('User not found', 404);

           
            if (!await bcrypt.compare(password, user.password)) throw new CustomError('Invalid user or password', 400);
            
            user.password = undefined;

            return res.json({
                user,
                token: await helper_jwt.generateToken({ id: user._id })
            });

        } catch (error) {
            return res.status(error.status || 404).json({ message: error.message || 'Login failed' });
        }
    }
}

module.exports = UsersController;