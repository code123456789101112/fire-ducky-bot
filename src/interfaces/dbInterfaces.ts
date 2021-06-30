export interface Cooldowns {
    _id: string;
    cooldown: Date;
}

export interface Currency {
    _id: string;
    bal: number;
    bank: number;
    bankSpace: number;
}

export interface Donations {
    _id: string;
    amount: number;
}

export interface Jobs {
    _id: string;
    job: string;
    salary: number;
}

export interface Tickets {
    _id: string;
    name: string;
    conversation: string;
    user: string;
}

interface req {
    type: typeof String | typeof Number | typeof Date;
    required: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line no-shadow
const type = (type: typeof String | typeof Number | typeof Date): req => {
    const reqObj: req = { type, required: true };
    return reqObj;
};

export default type;
