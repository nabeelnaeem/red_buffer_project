import { sequelize } from '../../../config/db.js'
import jwt from "jsonwebtoken";
const ACCESS_REVOKED_MESSAGE = 'Access is revoked';
const USER_NOT_EXISTS_MESSAGE = 'User not exists';
const USER_NOT_FOUND_MESSAGE = 'User not found';
const STATUS_ALREADY_REVOKED_MESSAGE = 'User status is already revoked';


export const createUser = async (username, password, email) => {
    const query = `
    INSERT INTO "users" (user_id, username, password, email, full_name, address, phone, is_revoked, "createdAt", "updatedAt")
    VALUES ( gen_random_uuid(), :username, :password, :email, :full_name, :address, :phone, :is_revoked, NOW(), NOW())
    RETURNING user_id, username, email, full_name
  `;

    const [result] = await sequelize.query(query, {
        replacements: { username, password, email, full_name: null, address: null, phone: null, is_revoked: false }
    });

    return result[0];
};

export const updateUserProfile = async (username, full_name, address, phone) => {
    const query = `
        UPDATE "users"
        SET
            full_name = COALESCE(:full_name, full_name),
            address = COALESCE(:address, address),
            phone = COALESCE(:phone, phone),
            "updatedAt" = NOW()
        WHERE username = :username AND "deletedAt" IS NULL
        RETURNING user_id, username, email, full_name, address, phone, "createdAt", "updatedAt";
    `;

    const [result] = await sequelize.query(query, {
        replacements: { username, full_name, address, phone }
    });
    return result[0];
};


export const findUserByUsername = async (username) => {
    const query = `SELECT * FROM "users" WHERE username = :username AND "deletedAt" IS NULL`;
    const [result] = await sequelize.query(query, {
        replacements: { username },
    });
    return result[0];
};

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM "users" WHERE email = :email AND "deletedAt" IS NULL`;
    const [result] = await sequelize.query(query, {
        replacements: { email },
    });
    return result[0];
};

export const isUserAccessRevoked = async (username) => {
    const query = `SELECT * FROM "users" WHERE username = :username AND is_revoked = :is_revoked`;
    const [result] = await sequelize.query(query, {
        replacements: { username, is_revoked: true },
    });
    return result[0];
};
export const revokeAccess = async (username) => {
    const userExists = await findUserByUsername(username);
    if (!userExists) {
        return USER_NOT_EXISTS_MESSAGE;
    }

    const revokedUser = await isUserAccessRevoked(username);
    if (revokedUser)
        return STATUS_ALREADY_REVOKED_MESSAGE;

    const query = `UPDATE "users" SET is_revoked = :is_revoked WHERE username = :username`;
    const [result] = await sequelize.query(query, {
        replacements: { username, is_revoked: true },
    });
    if (result !== undefined) {
        return ACCESS_REVOKED_MESSAGE;
    }
    else {
        return USER_NOT_FOUND_MESSAGE;
    }
};

export const getUserNameFromToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const username = jwt.decode(token).username;
    return username;
};

export const getUserIdFromToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const user_id = jwt.decode(token).user_id;
    return user_id;
};

export const isUserNameOrToken = (req) => {
    const { userInfo } = req.body;
    if (jwt.decode(userInfo)) {
        return jwt.decode(userInfo).username;
    }
    else {
        return userInfo;
    }
};

export const generateAndSendTokens = (res, user, options) => {
    const payload = {
        username: user.username,
        user_id: user.user_id,
        full_name: user.full_name
    };

    const accessToken = jwt.sign(payload, options.accessSecret, {
        expiresIn: options.accessExpiresIn
    });

    const refreshToken = jwt.sign(payload, options.refreshSecret, {
        expiresIn: options.refreshExpiresIn
    });

    res.cookie("refreshToken", refreshToken,{
        httpOnly: options.cookieHttpOnly,
        secure: options.cookieSecure,
        sameSite: options.cookieSameSite,
        maxAge: options.cookieMaxAge
    });

    return {accessToken, refreshToken};
};