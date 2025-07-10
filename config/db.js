import { Sequelize } from "sequelize";
import pkg from 'pg';
const { Client } = pkg;

const dbName = 'ecomerce_db';
const dbUser = 'admin';
const dbPass = 'admin';
const dbHost = 'localhost';

export const createDB = async () => {
    const client = new Client({
        user: dbUser,
        password: dbPass,
        host: dbHost,
        database: 'postgres'
    });

    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName])
    if (res.rowCount === 0) {
        if (/^[a-zA-Z0-9_]+$/.test(dbName)) {
            //Why below line instead of CREATE DATABASE $1?
            //? Because PostgreSQL does NOT allow parameterized placeholders ($1) for 
            //? database identifiers (like database names, table names, column names, etc.)
            await client.query(`CREATE DATABASE "${dbName}"`)
            console.log(`Database ${dbName} created`);
        }
        else {
            console.log(`Invalid DB NAME: ${dbName}`);
        }
    }
    else {
        console.log(`Database ${dbName} already exists`)
    }
    await client.end();
};

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'postgres',
    logging: false,
});

