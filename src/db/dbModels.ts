/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Model } from "mongoose";
import { Cooldowns, Currency, Donations, Jobs } from "../interfaces/dbInterfaces";
import fs from "fs";

export default await (async (): Promise<Model<any, any, any>[]> => {
    const schemaFiles: string[] = fs.readdirSync("./dist/src/schemas/");

    const models: Model<any, any, any>[] = await Promise.all(schemaFiles.map(async file => {
        const schema: Schema = (await import(`../schemas/${file.replace(".ts", ".js")}`)).default;
        
        schema.statics.findByIdOrCreate = async function(id: string, doc: Cooldowns | Currency | Jobs | Donations) {
            return await this.findById(id) || await this.create(doc);
        };  

        const modelName = file.split(".")[0];
        return mongoose.model(modelName, schema, modelName);
    }));

    return models;
})();