const { pingServer } = require('../sections/pingServer');
const { check } = require('../../gerenciator/chatstage');
const { diaSemana } = require('../reply')

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
    if (message.body == '4') {
        await returnMenu(message);
        if (diaSemana == `domingo` || diaSemana == `sábado`) {
            await message.reply(`O período de suporte é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos sábados e domingos ❌📆. Você pode enviar um e-mail para ti@oyamota.com.br. Equipe de T.I. Oyamota agradece o contato. 🙌🕐`)
        } else {
            await client.sendMessage(message.from, `Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽
                \n1️⃣. Dúvidas ❓\n2️⃣. Falha em Rede ❌🛜\n3️⃣. Falha em Equipamento ou Software(Programa) ❌🖥️\n4️⃣. Solicitar compra ou troca de material 🛠️🔄\n5️⃣. Solicitações de impressoras 🖨️\n6️⃣. Suporte 🧑‍💻⚠️`);
        }
    }
    if (c){
        console.log('[checkingNetwork] entrou na condição c')
        await returnMenu(message);
    }
}

async function returnMenu(message) {
    check(message, satgeNow = 'menu_start') // retorna user ao menu
}



module.exports = { checkingNetwork };
