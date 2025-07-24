import jwt from 'jsonwebtoken';
const TOKEN_MISSING_MESSAGE = 'Token missing';
const NO_TOKEN_PROVIDED_MESSAGE = 'No token Provided';
const INVALID_TOKEN_MESSAGE = 'Invalid or expired token';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ error: NO_TOKEN_PROVIDED_MESSAGE });

    //"Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ error: TOKEN_MISSING_MESSAGE });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ error: INVALID_TOKEN_MESSAGE });
        req.user = decoded;
        next();
    });
};
