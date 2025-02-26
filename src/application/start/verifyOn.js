const { start } = require('./start');
const fetch = require('node-fetch');
const { getLigar } = require('../server/server');

// Adicionar um intervalo para verificar continuamente o estado de 'ligar'
async function verifyOn(ligar) {
    setInterval(async () => {
        try {
            const response = await fetch('http://localhost:5558/status');
            const data = await response.json();
            if (data.ligar && !ligar) {
                ligar = data.ligar;
                console.log('Chamando a função start()'); // Log antes de chamar a função start()
                await start(); // Inicia o client WhatsApp
            } else if (!data.ligar && ligar) {
                ligar = data.ligar;
                console.log('[verifyOn] Função start() não foi chamada porque ligar é falso');
            }
            console.log(`[init] Ordem de ligar chatbot: ${getLigar()}`); // Log para verificar o valor atualizado de getLigar()
        } catch (fetchError) {
            console.error('[verifyOn] Erro ao tentar buscar o status:', fetchError);
        }
    }, 30000); // Verifica o estado a cada 3 segundos
}

module.exports = { verifyOn };
