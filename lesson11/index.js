const server = require('./src/server');
const mongo = require('./src/services/mongodbDriver');

const run = async() => {
    try {
        await server.run();
        // mongo.init();
    } catch (e) {
        console.log(e);
        console.log('Could not start the service', e.message);
    }
}

run();