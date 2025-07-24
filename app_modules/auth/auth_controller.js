import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    createUser, findUserByUsername, isUserAccessRevoked, revokeAccess, getUserNameFromToken,
    isUserNameOrToken, findUserByEmail, updateUserProfile, generateAndSendTokens
} from "./services/auth_service.js";
import ms from 'ms';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;
const COOKIE_MAX_AGE = ms(process.env.REFRESH_TOKEN_COOKIES_EXPIRES_IN);
const COOKIE_IS_SECURE = process.env.REFRESH_TOKEN_COOKIE_SECURE === 'true';
const COOKIE_SAME_SITE_OPTION = process.env.REFRESH_TOKEN_COOKIE_SAMESITE || 'Strict';
const COOKIE_HTTP_ONLY = process.env.REFRESH_TOKEN_COOKIE_HTTPONLY === 'true';

const USERNAME_ALREADY_EXISTS_MESSAGE = 'User name already exists';
const EMAIL_ALREADY_EXISTS_MESSAGE = 'Email already exists';
const SIGNUP_MESSAGE = 'Profile created, logging you in';
const USER_NOT_FOUND_MESSAGE = 'User not found';
const USER_STATUS_REVOKED_MESSAGE = 'User status is revoked';
const INVALID_CREDENTIALS_MESSAGE = 'Invalid Credentials';
const SUCCESSFUL_LOGIN_MESSAGE = 'Login successful';
const LOGIN_FAILED_MESSAGE = 'Login failed';
const PROFILE_UPDATED_MESSAGE = 'Profile updated successfully';
const PROFILE_UPDATE_FAILED_MESSAGE = 'Failed to update profile';
const MISSING_FIELD_MESSAGE = 'At least one field (full_name, address, phone) must be provided';
const REFRESH_TOKEN_MISSING_MESSAGE = 'Refresh token mission';
const INVALID_REFRESH_TOKEN_MESSAGE = 'Invalid or expired refresh token';
const LOGOUT_SUCCESS_MESSAGE = 'Logged out successfully';

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

        const { accessToken, refreshToken } = generateAndSendTokens(res, user, {
            accessSecret: ACCESS_TOKEN_SECRET,
            refreshSecret: REFRESH_TOKEN_SECRET,
            accessExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
            refreshExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
            cookieHttpOnly: COOKIE_HTTP_ONLY,
            cookieSecure: COOKIE_IS_SECURE,
            cookieSameSite: COOKIE_SAME_SITE_OPTION,
            cookieMaxAge: COOKIE_MAX_AGE
        });
        const { user_id, username, email, full_name } = user;
        return res.json({
            message: SIGNUP_MESSAGE,
            accessToken,
            user: {
                user_id,
                username,
                email,
                full_name
            }
        });
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

        const { accessToken, refreshToken } = generateAndSendTokens(res, user, {
            accessSecret: ACCESS_TOKEN_SECRET,
            refreshSecret: REFRESH_TOKEN_SECRET,
            accessExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
            refreshExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
            cookieHttpOnly: COOKIE_HTTP_ONLY,
            cookieSecure: COOKIE_IS_SECURE,
            cookieSameSite: COOKIE_SAME_SITE_OPTION,
            cookieMaxAge: COOKIE_MAX_AGE
        });

        const { user_id, username, email, full_name } = user;
        return res.json({
            message: SUCCESSFUL_LOGIN_MESSAGE,
            accessToken,
            user: {
                user_id,
                username,
                email,
                full_name
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

//Refresh Token
export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: REFRESH_TOKEN_MISSING_MESSAGE })
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const payload = {
            username: decoded.username,
            user_id: decoded.user_id,
            full_name: decoded.full_name
        };

        const newAccessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
        return res.json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(403).json({ error: INVALID_REFRESH_TOKEN_MESSAGE });
    }
}
//Logout to clear refresh token
export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    return res.json({ message: LOGOUT_SUCCESS_MESSAGE })
}