const { responderComCatalogo} = require('../options/catalogo');
const { clameSuport } = require('../interaction/suporte');
const { humanControl } = require('../interaction/ignorelist');
const { stages } = require('../gerenciator/chatstage')

function options(message, client, url) {

        Object.values(stages).forEach(userStage => {

            if (message.body === '1' && message.from === userStage.user && (userStage.fase === 'menu_start' || userStage.fase === 'inative')) {
                responderComCatalogo(message, client);
            } else 
            if (message.body === '2' && message.from === userStage.user && (userStage.fase === 'menu_start' || userStage.fase === 'inative')) {
                client.sendMessage(message.from, `Este é o nosso catálogo de novidades 🌐: ${url}`);
            } else 
            if (message.body === '3' && message.from === userStage.user && (userStage.fase === 'menu_start' || userStage.fase === 'inative')) {
                client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional 📧: entrelacoscrochehp@gmail.com 🧶\nInstagram 📸: https://www.instagram.com/crochentrelacos/ 🧶`);
            } else 
            if (message.body === '4' && message.from === userStage.user && (userStage.fase === 'menu_start' || userStage.fase === 'inative')) {
                client.sendMessage(message.from, 'O período de suporte é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo. 🙌🕐');
                clameSuport(message, client);
                humanControl(message, client);
            } else 
            if (message.body === '5' && message.from === userStage.user && (userStage.fase === 'menu_start' || userStage.fase === 'inative')) {
                client.sendMessage(message.from, 'O período de atendimento é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆.');
                clameSuport(message, client);
                humanControl(message, client);
            }
            
        })
    
}

module.exports = { options };
