const server = require('./src/server');
const database = require('./src/services/db')

const run = async() => {
    try {
        await server.run();
        await database.run();
    } catch (e) {
        console.log(e);
        console.log(`Colud not start the service ${e.message}`)
    }
} 

run();