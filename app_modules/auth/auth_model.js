import { sequelize } from '../../config/db.js'

export const initUserTable = async () => {
    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS "Users" (
      username VARCHAR PRIMARY KEY,
      password VARCHAR NOT NULL,
      is_revoked BOOL
    );
  `);
}
