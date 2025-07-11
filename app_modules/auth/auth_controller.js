import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, isUserAccessRevoked, revokeAccess, getUserNameFromToken, isUserNameOrToken, findUserByEmail } from "./services/auth_service.js";

const USERNAME_ALREADY_EXISTS_MESSAGE = 'User name already exists';
const EMAIL_ALREADY_EXISTS_MESSAGE = 'Email already exists';
const USER_CREATED_MESSAGE = 'User created';
const USER_NOT_FOUND_MESSAGE = 'User not found';
const USER_STATUS_REVOKED_MESSAGE = 'User status is revoked';
const INVALID_CREDENTIALS_MESSAGE = 'Invalid Credentials';
const SUCCESSFUL_LOGIN_MESSAGE = 'Login successful';
const LOGIN_FAILED_MESSAGE = 'Login failed';
//Signup 
export const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const isExistingUserName = await findUserByUsername(username);
        if (isExistingUserName)
            return res.status(400).json({ error: USERNAME_ALREADY_EXISTS_MESSAGE });

        const isExistingEmail = await findUserByEmail(email)
        if (isExistingEmail)
            return res.status(400).json({ error: EMAIL_ALREADY_EXISTS_MESSAGE });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword, email);

        res.json({ message: USER_CREATED_MESSAGE, user });
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
            return res.status(404).json({ error: USER_NOT_FOUND_MESSAGE });

        const revokedUser = await isUserAccessRevoked(username);
        if (revokedUser)
            return res.status(403).json({ error: USER_STATUS_REVOKED_MESSAGE });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: INVALID_CREDENTIALS_MESSAGE });

        const token = jwt.sign({ username: user.username }, 'abcd', { expiresIn: '15m' });
        res.json({ message: SUCCESSFUL_LOGIN_MESSAGE, token });
    } catch (error) {
        res.status(500).json({ error: LOGIN_FAILED_MESSAGE + error });
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
        res.json({ message: `${username}, ${USER_STATUS_REVOKED_MESSAGE}` });
    }
    else {
        res.json({ message: `Welcome ${username}, this is your profile.` });
    }
}