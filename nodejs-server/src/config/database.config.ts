import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME as string;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;

const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST, 
    dialect: 'mysql',
    define: {
        freezeTableName: true
    },
});

export default sequelizeConnection;