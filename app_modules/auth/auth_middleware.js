import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ error: 'No token Provided' });

    //"Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, 'abcd', (err, decoded) => {
        if (err)
            return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = decoded;
        next();
    });
};
