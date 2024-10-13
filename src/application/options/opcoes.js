const { responderComCatalogo } = require('../options/catalogo')
const { clameSuport } = require('../interaction/suporte')
const { humanControl } = require('../interaction/ignorelist')

function options(message, client, url) { // FUNÇÃO CRIADA PARA MOSTRAR AS OPÇÕES
    if (message.body == 1) {
        responderComCatalogo(message, client);  // CHAMA A FUNÇÃO QUE BUSCA O CATÁLOGO E RESPONDE AO USUÁRIO
    }

    // Outras opções de resposta
    else
        if (message.body === '2') {
        client.sendMessage(message.from, `Este é o nosso catálogo de novidades: ${url}`);
    } else
        if (message.body === '3') {
        client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional: entrelacoscrochehp@gmail.com`);
    } else
        if (message.body === '4') {
        client.sendMessage(message.from, 'O período de suporte é de 8h às 18h, exceto aos domingos. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo.');
            clameSuport(message, client);
            humanControl(message, client);
    } else
        if (message.body === '5') {
        client.sendMessage(message.from, 'O período de atendimento é de 8h às 18h, exceto aos domingos.');
            clameSuport(message, client)
            humanControl(message, client);
    }
}

module.exports =  { options }