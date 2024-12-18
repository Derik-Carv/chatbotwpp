const { pingServer } = require('../sections/pingServer');

async function checkingNetwork(message, client) {
    if (message.body == '3') {
        const pingResponse = await pingServer(); // Aguarda a execução do ping
        try {
            message.reply(`${pingResponse}`);
        } catch (error) {
            console.error('Erro ao executar ping:', error);
            message.reply('Não foi possível comunicar com os servidores!');
        }
    }
}



module.exports = { checkingNetwork };
