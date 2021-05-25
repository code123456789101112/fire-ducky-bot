export interface ConfigProperties {
	token: string;

	db: {
		dbName: string;
		username: string;
		password: string;
	}

	prefix: string;
	themeColor: string;

	serverName: string;
}

export interface IDsProperties {
	users: {
		owner: string;
	},
	channels: {
		spam: string;
		announce: string;
		voice: string;
		suggest: string;
	},
	roles: {
		announce: string;
		misc: string;
		update: string;
	}
}