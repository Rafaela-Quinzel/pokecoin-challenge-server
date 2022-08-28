const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const CustomError = require('../helpers/customError')


module.exports = (req, res, next) => {
    console.log('req.headers: ', req.headers.authorization)
    
    if (!('authorization' in req.headers)) throw new CustomError('Not authorized, please login', 401);

    const authHeader = req.headers.authorization;
    const parts = authHeader.split(' ');
    const [scheme, token] = parts;
    
    if (typeof authHeader == 'undefined' || authHeader == null || authHeader == '') throw new CustomError('Not authorized, please login', 401);
    
    if (!authHeader) throw new CustomError('No token provided', 401);

    if (!parts.length === 2) throw new CustomError('Token error', 401);

    //regex para verificar se começa com Bearer
    if (!/^Bearer$/i.test(scheme)) throw new CustomError('Token malformatted', 401);

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) throw new CustomError(error.message, 401);

        req.userId = decoded.id;
    });

    return next();
}