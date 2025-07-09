import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, isUserAccessRevoked, revokeAccess, getUserNameFromToken } from "./auth_service.js";

export const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await findUserByUsername(username);
        if (userExists)
            return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword);

        res.json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user)
            return res.status(404).json({ error: 'User not found' });

        const revokedUser = await isUserAccessRevoked(username);
        if (revokedUser)
            return res.status(403).json({ error: 'Cannot login, User status is revoked' });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: 'Invalid Credentials' });

        const token = jwt.sign({ username: user.username }, 'abcd', { expiresIn: '1m' })
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' + error });
    }
}

export const revoke = async (req, res) => {
    const username = getUserNameFromToken(req);
    await revokeAccess(username);
    res.json({ message: `${username}, access is revoked.` });
}

export const profile = async (req, res) => {
    const username = getUserNameFromToken(req);
    const revokedUser = await isUserAccessRevoked(username);
    if (revokedUser) {
        res.json({ message: `${username}, your access is revoked.` });
    }
    else {
        res.json({ message: `Welcome ${username}, this is your profile.` });
    }
}