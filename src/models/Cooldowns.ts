import types, { Sequelize } from "sequelize";
import { CooldownInstance } from "../interfaces/dbInterfaces.js";

export default (sequelize: Sequelize): unknown => {
    return sequelize.define<CooldownInstance>("cooldowns", {
        id: {
            type: types.DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        cooldown: {
            type: types.DataTypes.BIGINT,
            allowNull: false
        }
    });
};