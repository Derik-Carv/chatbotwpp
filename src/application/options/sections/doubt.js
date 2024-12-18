const { stages, chatStage, check } = require(`../../gerenciator/chatstage`);
const { help } = require("../../interaction/help");
const { clameSuport } = require("../../interaction/suporte");
const { atendimentoInicial } = require('../reply');

async function responderDuvida(message, client) {
    Object.values(stages).forEach(userStage =>{
        if (message.body == '1' && userStage.fase == `doubt`){
            client.sendMessage(message.from, `voce está em ajuda!`)
        }
        if (message.body == '7' && userStage.fase == `doubt`){
            check(message, stageNow = 'menu_start')
            client.sendMessage(message.from, `Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽
                \n1️⃣. Dúvidas ❓\n2️⃣. Falha em Rede ❌🛜\n3️⃣. Falha em Equipamento ❌🖥️\n4️⃣. Solicitar compra ou troca de material 🛠️🔄\n5️⃣. Solicitações de impressoras 🖨️\n6️⃣. Suporte 🧑‍💻⚠️`);    
        }
    })
    //subMenu(message, client);
}

// Submenu para opções pós catalogo
async function subMenu(message, client, userStage) {
        console.log('[subMenu] in use');

        if (userStage.fase === 'subMenu') {
            if (message.body === '1' && userStage.fase === 'subMenut') {
                client.sendMessage(message.from, `Aguarde um momento, estamos contatando um atendente para processar o seu pedido.`)
                stageNow = 'atendimento'
                check(message, stageNow);
                clameSuport(message, client, null, stageNow);
                // Fazer verificação de caso cliente queira sair desse estágio.
            } else
            if (message.body === '2' && userStage.fase === 'subMenu') {
                client.sendMessage(message.from, `Aguarde um momento, estamos contatando um atendente para lhe dar mais informações.`)
                stageNow = 'informacao'
                check(message, stageNow);
                clameSuport(message, client, null, stageNow);
                // Fazer verificação de caso cliente queira sair desse estágio.
            } else
            if (message.body === '3' && userStage.fase === 'subMenu') {
                await client.sendMessage(message.from, `Retornando ao menu.`)
                stageNow = 'menu_start';
                check(message, stageNow);
                console.log('[catalogo] usuário movido para o estágio: ', stageNow);
                await client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽\n1️⃣. Catálogo 👗👙👘🩱\n2️⃣. Novidades 🔄\n3️⃣. Parceria 🤝\n4️⃣. Suporte 🧑‍💻⚠️\n5️⃣. Falar com atendente 👩‍💻📞');
            } else {
                client.sendMessage(message.from, `Opção inválida. Digite 1, 2 ou 3 para selecionar uma opção`);
                stageNow = 'informacao';
                help(message, client, stageNow);
            }
        }
}

module.exports = { responderDuvida, subMenu};
