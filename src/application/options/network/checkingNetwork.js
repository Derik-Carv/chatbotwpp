const { pingServer } = require('../sections/pingServer');

async function checkingNetwork(message, client, c) {
    if (message.body == '3' || c) {
        const pingResponse = await pingServer(c); // Aguarda a execução do ping
        try {
            message.reply(`${pingResponse}`);
        } catch (error) {
            console.error('Erro ao executar ping:', error);
            message.reply('Não foi possível comunicar com os servidores!');
        }
    }
}



module.exports = { checkingNetwork };
