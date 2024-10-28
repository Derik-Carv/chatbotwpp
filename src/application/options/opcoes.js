const { responderComCatalogo } = require('../options/catalogo');
const { clameSuport } = require('../interaction/suporte');
const { humanControl } = require('../interaction/ignorelist');

function options(message, client, url) {

    // Chama responderComCatalogo se o estágio do usuário for 'catalogo' e ele enviar '1'
    if (message.body === '1') {
        responderComCatalogo(message, client);
    }
    // Se o estágio for 'menu_start', exibe as outras opções
    else if (message.body === '1' && userStage.fase === 'menu_start') {
        userStage.fase = 'catalogo';  // Atualiza o estágio para 'catalogo'
        responderComCatalogo(message, client);
    } else if (message.body === '2') {
        client.sendMessage(message.from, `Este é o nosso catálogo de novidades 🌐: ${url}`);
    } else if (message.body === '3') {
        client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional 📧: entrelacoscrochehp@gmail.com 🧶\nInstagram 📸: https://www.instagram.com/crochentrelacos/ 🧶`);
    } else if (message.body === '4') {
        client.sendMessage(message.from, 'O período de suporte é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo. 🙌🕐');
        clameSuport(message, client);
        humanControl(message, client);
    } else if (message.body === '5') {
        client.sendMessage(message.from, 'O período de atendimento é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆.');
        clameSuport(message, client);
        humanControl(message, client);
    }
}

module.exports = { options };
