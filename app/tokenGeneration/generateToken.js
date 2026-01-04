const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

module.exports.createSecretToken = (id) => {
    return jwt.sign(
        {id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '300s',
        }
    );
};