import { sequelize } from '../../../config/db.js'
import jwt from "jsonwebtoken";
const ACCESS_REVOKED_MESSAGE = 'Access is revoked';
const USER_NOT_EXISTS_MESSAGE = 'User not exists';
const USER_NOT_FOUND_MESSAGE = 'User not found';
const STATUS_ALREADY_REVOKED_MESSAGE = 'User status is already revoked';



export const createUser = async (username, password) => {
    const query = `
    INSERT INTO "Users" (user_id, username, password, email, address, phone, is_revoked, "createdAt", "updatedAt")
    VALUES ( gen_random_uuid(), :username, :password, :email, :address, :phone, :is_revoked, NOW(), NOW())
  `;

    const [result] = await sequelize.query(query, {
        replacements: { username, password, email: null, address: null, phone: null, is_revoked: false }
    });

    return result[0]; // Returns the inserted row
};


export const findUserByUsername = async (username) => {
    const query = `SELECT * FROM "Users" WHERE username = :username`;
    const [result] = await sequelize.query(query, {
        replacements: { username },
    });
    return result[0];
};

export const isUserAccessRevoked = async (username) => {
    const query = `SELECT * FROM "Users" WHERE username = :username AND is_revoked = :is_revoked`;
    const [result] = await sequelize.query(query, {
        replacements: { username, is_revoked: true },
    });
    return result[0];
}
export const revokeAccess = async (username) => {
    const userExists = await findUserByUsername(username);
    if (!userExists) {
        return USER_NOT_EXISTS_MESSAGE;
    }

    const revokedUser = await isUserAccessRevoked(username);
    if (revokedUser)
        return STATUS_ALREADY_REVOKED_MESSAGE;

    const query = `UPDATE "Users" SET is_revoked = :is_revoked WHERE username = :username`;
    const [result] = await sequelize.query(query, {
        replacements: { username, is_revoked: true },
    });
    if (result !== undefined) {
        return ACCESS_REVOKED_MESSAGE;
    }
    else {
        return USER_NOT_FOUND_MESSAGE;
    }
}

export const getUserNameFromToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const username = jwt.decode(token).username;
    return username;
}

export const isUserNameOrToken = (req) => {
    const { userInfo } = req.body;
    if (jwt.decode(userInfo)) {
        return jwt.decode(userInfo).username;
    }
    else {
        return userInfo;
    }
}