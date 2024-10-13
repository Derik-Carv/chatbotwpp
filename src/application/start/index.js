const { server } = require('../server/server')
const { start } = require('./start') 

async function init() {
    try {
        const app = await server(); // aguardar o servidor ser inciado
        start(); // inicia o client whatsapp
    } catch (error) {
        console.error('Erro ao iniciar o servidor ou o cliente:', error);
    }
}

init()

module.exports = { start }