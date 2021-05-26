import types, { Sequelize } from "sequelize";
import { DonationInstance } from "../interfaces/dbInterfaces";

export default (sequelize: Sequelize): unknown => {
    return sequelize.define<DonationInstance>("donations", {
        id: {
            type: types.DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        amount: {
            type: types.DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        }
    });
};