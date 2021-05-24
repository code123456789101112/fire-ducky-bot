import types, { Sequelize } from "sequelize";
import { JobInstance } from "../db/dbInterfaces";

export default (sequelize: Sequelize): unknown => {
    return sequelize.define<JobInstance>("jobs", {
        id: {
            type: types.DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        job: {
            type: types.DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: types.DataTypes.INTEGER,
            allowNull: false
        }
    });
};