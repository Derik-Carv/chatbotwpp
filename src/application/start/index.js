const { startServer } = require('../server/server');
const { start } = require('./start');

async function init() {
    console.log('[index] in use');

    try {
        await startServer(); // Chama a função assíncrona startServer
        await start();
    } catch (error) {
        console.error('[init] Erro ao iniciar o servidor ou o cliente:', error);
    }
}

init();

module.exports = { init };
