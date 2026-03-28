const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = async() => {
    if(database ){
        console.log('Database is already initialized');
        return database;
    }
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        database = client;
        return database;
    } catch (err) {
        throw err;
    }     
};

const getDatabase = () => {
    if(!database) {
        throw Error('Database not initialized')
    }
    return database;
};

module.exports = {initDb, getDatabase};