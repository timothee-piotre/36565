// controllers/authController.js
const User = require('User.js');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
function register(){
    exports.register = async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const user = await User.create({ username, email, password });
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } catch (error) {
            res.status(400).json({ message: 'User could not be created', error: error.message });
        }
    }
};
