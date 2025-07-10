import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, isUserAccessRevoked, revokeAccess, getUserNameFromToken, isUserNameOrToken } from "./auth_service.js";

//Signup 
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


//Login
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

        const token = jwt.sign({ username: user.username }, 'abcd', { expiresIn: '15m' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' + error });
    }
}

//Revoke
export const revoke = async (req, res) => {
    //This will get signedin username
    const loggedInUserName = getUserNameFromToken(req);
    //This will get username or token from body
    const username = isUserNameOrToken(req);

    if (loggedInUserName === username)
        return res.status(400).json({ message: `Cannot revoke access to yourself ${username}` });
    else {
        await revokeAccess(username)
            .then(value => {
                res.json({ message: `${username}, ${value}` });
            })
    }
}

//Profile (Protected)
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