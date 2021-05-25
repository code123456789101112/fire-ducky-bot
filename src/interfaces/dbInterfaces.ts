import { Model } from "sequelize";

interface CurrencyAttributes {
    id: string;
    bal: number;
    bank: number;
    bankSpace: number;
}

interface CooldownAttributes {
    id: string;
    cooldown: number;
}

interface DonationAttributes {
    id: string;
    amount: number;
}

interface JobAttributes {
    id: string;
    job: string;
    salary: number;
}

export interface CurrencyInstance extends Model<CurrencyAttributes>, CurrencyAttributes {}
export interface CooldownInstance extends Model<CooldownAttributes>, CooldownAttributes {}
export interface DonationInstance extends Model<DonationAttributes>, DonationAttributes {}
export interface JobInstance extends Model<JobAttributes>, JobAttributes {}