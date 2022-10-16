const util = require('util');
const redis = require('redis');
const client = redis.createClient({
    URL: process.env.REDIS_URL,
});

client.on('connect', function () {
    console.log('Redis Connected!');
});

client.on('error', function (error) {
    console.error('Redis Error: ', error);
});

const setClient = util.promisify(client.set).bind(client);
const getClient = util.promisify(client.get).bind(client);
const existsClient = util.promisify(client.exists).bind(client);

const set = async (key, value) => {
    await setClient(key, JSON.stringify(value));
};

const get = async (key) => {
    const data = await getClient(key);

    return JSON.parse(data);
};

const exists = async (key) => {
    const isExists = await existsClient(key);

    return isExists === 1;
};

module.exports = {
    set,
    get,
    exists,
};
