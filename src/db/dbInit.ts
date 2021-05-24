import Config from "../config.js";
const { dbName, username, password } = (new Config()).db;

import fs from "fs";

import { Sequelize } from "sequelize";
const sequelize: Sequelize = new Sequelize(dbName, username, password, {
    host: "localhost",
    dialect: "mariadb"
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successful.");
    } catch(err) {
        return console.error(`-----Error connecting to database!-----\n\n${err}`);
    }

    const models: string[] = fs.readdirSync("./dist/src/models/");
    for (const model of models) (await import("../models/" + model.replace(".ts", ".js"))).default(sequelize);

    const force: boolean = process.argv.some(arg => /^(-f)|(--force)$/.test(arg));

    sequelize.sync({ force }).then(() => {
        console.log("Database successfully synced.");
        sequelize.close();
    }).catch(console.error);
})();