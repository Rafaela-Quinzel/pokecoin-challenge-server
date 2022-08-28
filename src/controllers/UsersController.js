const bcrypt = require('bcryptjs');

const User = require('../models/userSchema');
const helpers = require('../helpers/functions');

class UsersController {
    static async register(req, res, next) {

        const { email } = req.body;

        try {

            let userEmail = await User.findOne({ email })

            if (userEmail) return res.status(400).json({ message: error.message || 'User already exists' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.json({
                user,
                token: await helpers.generateToken({ id: user._id })
            });

        } catch (error) {
            return res.status(error.status || 404).json({ message: error.message || 'Registration failed' });
        }
    }

    static async login(req, res, next) {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user) return res.status(400).json({ message: error.message || 'User not found' });
           
            if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid user or password' });
            
            user.password = undefined;

            return res.json({
                user,
                token: await helpers.generateToken({ id: user._id })
            });

        } catch (error) {
            return res.status(error.status || 404).json({ message: error.message || 'Login failed' });
        }
    }
}

module.exports = UsersController;