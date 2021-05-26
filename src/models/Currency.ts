import types, { Sequelize } from "sequelize";
import { CurrencyInstance } from "../interfaces/dbInterfaces.js";

export default (sequelize: Sequelize): unknown => {
    return sequelize.define<CurrencyInstance>("currency", {
        id: {
            type: types.DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        bal: {
			type: types.DataTypes.BIGINT,
			defaultValue: 0,
			allowNull: false,
		},
        bank: {
            type: types.DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        },
        bankSpace: {
            type: types.DataTypes.BIGINT,
            defaultValue: 1000,
            allowNull: false
        }
    });
};