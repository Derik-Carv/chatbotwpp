const { startServer, getLigar } = require('../server/server');
const { verifyOn } = require('./verifyOn');

ligar = false;

async function init() {
    console.log('[index] in use');
    try {
        await startServer(); // Chama a função assíncrona startServer
        const response = await fetch('http://localhost:5558/status');
        const data = await response.json();
        ligar = data.ligar;
        console.log(`[init] Status Command ON do servidor: ${ligar}`);
        console.log(`[init] comando para ligar chatbot: ${getLigar()}`);
        verifyOn(ligar);
    } catch (error) {
        console.error('[init] Erro ao iniciar o servidor ou o cliente:', error);
    }
}

init();

module.exports = { init };
