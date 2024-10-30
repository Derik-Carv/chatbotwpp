const { options } = require('../options/opcoes.js');
const { clameSuport } = require('../interaction/suporte.js');
const { help } = require('../interaction/help.js');
const { start } = require('../start/start.js');
const { chatStage, stages } = require('../gerenciator/chatstage.js');
const { nextMsg } = require('../options/catalogo.js')

const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

async function reply(message, client) {
    const encomenda = /\bencomenda\b/i;
    const informar = /\binformar\b/i;
    const pedido = /\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i;

    const userId = message.from;

    // Chama a função chatStage para verificar e atualizar o estágio do usuário
    await chatStage(message, userId);

    // Chamando Submenu do catalogo
    Object.values(stages).forEach(userStage => {
        if (userStage.fase === 'nextCat') {
            nextMsg(message, client, userStage);
        }
    })

    // Mensagens vinda de encomenda do site
    if (encomenda.test(message.body)) {
        await clameSuport(message, client);
    } 
    else // Mensagebs de pedido vindas do site
        if (pedido.test(message.body)) {
        await client.sendMessage(message.from, `Pedido recebido ✅, envie o comprovante de pagamento🧾, que logo o seu pedido será entregue 🛵💨.`);
        clameSuport(message, client);
    }
    else  // Mensagens para entrar em contato vindas do site
        if (informar.test(message.body)) {
        await client.sendMessage(message.from, `Aguarde enquanto chamamos um atendente 💻👩‍💻📞.`);
        clameSuport(message, client);
    }
    else // Inicia o atendimento com a mensagem do cliente
        if (/\b[\p{L}\p{P}\p{S}]+$\b/u.test(message.body)) {
        atendimentoInicial(message, client);
    } 
    else // Opções de atendimento
        if (['1', '2', '3', '4', '5'].includes(message.body)) {
        options(message, client, url);
    }
    
    // Verifica se a mensagem não é do tipo chat
    if (message.type !== `chat`) {
        help(message, client);
    }
}

async function atendimentoInicial(message, client) {

    // AGUARDA O ENVIO DA RESPOSTA E DEPOIS O ENVIO DAS OPÇÕES
    await message.reply('Seja bem-vindo à Entrelaços Crochê 🧶. Aqui temos várias peças de crochê feitas à mão 🛠️. Você pode ver mais opções no nosso site 🌐: ' + url);
    selecao(message, client);
    
    function selecao(message, client) {
        client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽\n1️⃣. Catálogo 👗👙👘🩱\n2️⃣. Novidades 🔄\n3️⃣. Parceria 🤝\n4️⃣. Suporte 🧑‍💻⚠️\n5️⃣. Falar com atendente 👩‍💻📞');
    }
}

module.exports = { reply};
