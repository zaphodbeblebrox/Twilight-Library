import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.DB_USERNAME || '';
const MONGO_PASSWORD = process.env.DB_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@twilight-library.mepaj0v.mongodb.net/twilight-library`;

const SERVER_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
