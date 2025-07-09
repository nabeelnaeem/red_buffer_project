import { sequelize } from '../../config/db.js'

export const createUser = async (username, password) => {
    const query = `INSERT INTO "Users" (username, password, is_revoked) VALUES (:username, :password, :is_revoked) RETURNING username`;
    const [result] = await sequelize.query(query, {
        replacements: { username, password, is_revoked: false }
    });
    return result[0];
}

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
    console.log("Revoked called", username);
    const query = `UPDATE "Users" SET is_revoked = :is_revoked WHERE username = :username`;
    const [result] = await sequelize.query(query, {
        replacements: { username, is_revoked: true },
    });
}

export const getUserNameFromToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const username = jwt.decode(token).username;
    return username;
}