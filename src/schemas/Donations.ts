import mongoose from "mongoose";
import type, { Donations } from "../interfaces/dbInterfaces.js";

export default new mongoose.Schema<Donations>({
    _id: type(String),
    amount: type(Number)
});