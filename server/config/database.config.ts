import { Sequelize } from 'sequelize';

const db = new Sequelize('twilight-library', 'root', 'PuppetM@st3r', {
    storage: './database.mysql2',
    dialect: 'mysql',
    logging: false,
});

export default db;
