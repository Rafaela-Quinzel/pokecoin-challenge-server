const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = (req, res, next) => {
    
    if (!('authorization' in req.headers)) return res.status(401).send({ error: 'Not authorized, please login' });

    const authHeader = req.headers.authorization;
    const parts = authHeader.split(' ');
    const [scheme, token] = parts;
    
    if (typeof authHeader == 'undefined' || authHeader == null || authHeader == '') return res.status(401).send({ error: 'Not authorized, please login' });
    
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });

    if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });

    //regex para verificar se começa com Bearer
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) return res.status(401).send({ error: 'Token Invalid' });

        req.userId = decoded.id;
    });

    return next();
}