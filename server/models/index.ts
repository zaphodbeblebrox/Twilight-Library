import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface SettlementAttributes {
    id: Number;
    settlement_name: String;
    survival_limit: Number;
    arc_survivors: Boolean;
    cognition_amount: Number;
    notes: String;
    principle_new_life: String;
    principle_death: String;
    principle_society: String;
    principle_conviction: String;
}

export class SettlementInstance extends Model<SettlementAttributes> {}

SettlementInstance.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        settlement_name: { type: DataTypes.STRING, allowNull: false },
        survival_limit: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
        arc_survivors: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        cognition_amount: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
        notes: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
        principle_new_life: { type: DataTypes.STRING, allowNull: true },
        principle_death: { type: DataTypes.STRING, allowNull: true },
        principle_society: { type: DataTypes.STRING, allowNull: true },
        principle_conviction: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize: db,
        tableName: 'settlements',
    },
);

// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.ts')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.ts' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
