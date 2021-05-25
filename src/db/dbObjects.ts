import config from "../config.js";
const { dbName, username, password } = config.db;

import fs from "fs";

import { Sequelize } from "sequelize";
const sequelize: Sequelize = new Sequelize(dbName, username, password, {
    host: "localhost",
    dialect: "mariadb"
});

const modelFiles: string[] = fs.readdirSync("./dist/src/models/");

const models = modelFiles.map(async model => {
    const modelName = model.replace(".ts", ".js");
    return (await import(`../models/${modelName}`)).default(sequelize);
});

export default await Promise.all(models);