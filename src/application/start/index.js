const { userId } = require('../options/reply');
const { server, getLigar } = require('../server/server');
const { verifyOn } = require('./verifyOn');
let ligar = false;

async function init() {
    try {
        await server(); // Aguardar o servidor ser iniciado
        const response = await fetch('http://localhost:5558/status');
        const data = await response.json();
        ligar = data.ligar;
        console.log(`Estado de 'ligar' após inicialização do servidor: ${ligar}`); // Log para verificar o estado de 'ligar'
        console.log(`Valor de getLigar(): ${getLigar()}`); // Isso exibirá o valor atual de 'ligar'
        verifyOn(ligar);
    } catch (error) {
        console.error('Erro ao iniciar o servidor ou o cliente:', error);
    }
}

init();

module.exports = { init};