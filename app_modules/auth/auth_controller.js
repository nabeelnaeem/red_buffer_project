import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, isUserAccessRevoked, revokeAccess, getUserNameFromToken, isUserNameOrToken, findUserByEmail, updateUserProfile } from "./services/auth_service.js";

const USERNAME_ALREADY_EXISTS_MESSAGE = 'User name already exists';
const EMAIL_ALREADY_EXISTS_MESSAGE = 'Email already exists';
const USER_CREATED_MESSAGE = 'User created';
const USER_NOT_FOUND_MESSAGE = 'User not found';
const USER_STATUS_REVOKED_MESSAGE = 'User status is revoked';
const INVALID_CREDENTIALS_MESSAGE = 'Invalid Credentials';
const SUCCESSFUL_LOGIN_MESSAGE = 'Login successful';
const LOGIN_FAILED_MESSAGE = 'Login failed';
const PROFILE_UPDATED_MESSAGE = 'Profile updated successfully';
const PROFILE_UPDATE_FAILED_MESSAGE = 'Failed to update profile';
const MISSING_FIELD_MESSAGE = 'At least one field (full_name, address, phone) must be provided';

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

        const token = jwt.sign({ username: user.username, user_id: user.user_id, full_name: user.full_name }, 'abcd', { expiresIn: '10s' });
        return res.json({
            message: SUCCESSFUL_LOGIN_MESSAGE,
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name
            }
        });
    } catch (error) {
        return res.status(500).json({ error: LOGIN_FAILED_MESSAGE + error });
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
        return res.json({ message: `${username}, ${USER_STATUS_REVOKED_MESSAGE}` });
    }
    else {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.json({ message: USER_NOT_FOUND_MESSAGE });
        }
        else {
            const { password, ...safeUser } = user;
            return res.json({
                message: `Welcome ${username}, this is your profile.`,
                user: safeUser  // user without password
            });
        }
    }
}

export const updateProfile = async (req, res) => {
    try {
        const username = getUserNameFromToken(req);
        const { full_name, address, phone } = req.body;

        if (!full_name && !address && !phone) {
            return res.status(400).json({ error: MISSING_FIELD_MESSAGE });
        }
        const updatedUser = await updateUserProfile(username, full_name, address, phone);
        if (!updatedUser) {
            return res.status(404).json({ error: USER_NOT_FOUND_MESSAGE });
        }
        return res.status(200).json({
            message: PROFILE_UPDATED_MESSAGE,
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({ error: PROFILE_UPDATE_FAILED_MESSAGE });
    }
};
