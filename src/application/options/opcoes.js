const { responderComCatalogo} = require('../options/catalogo');
const { clameSuport } = require('../interaction/suporte');
const { humanControl } = require('../interaction/ignorelist');
const { stages } = require('../gerenciator/chatstage')

function options(message, client, url) {

        Object.values(stages).forEach(userStage => {
            console.log('[options] in use');

            const condition = message.from === userStage.user && userStage.fase === 'menu_start' && userStage.fase != 'nextCat' && userStage.fase != 'atendimento' && userStage.fase !='informacao' && userStage.fase != 'humanControl';

            if (message.body === '1' && condition) {
                responderComCatalogo(message, client);
            } else 
            if (message.body === '2' && condition) {
                client.sendMessage(message.from, `Este é o nosso catálogo de novidades 🌐: ${url}`);
            } else 
            if (message.body === '3' && condition) {
                client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional 📧: entrelacoscrochehp@gmail.com 🧶\nInstagram 📸: https://www.instagram.com/crochentrelacos/ 🧶`);
            } else 
            if (message.body === '4' && condition) {
                client.sendMessage(message.from, 'O período de suporte é de 8h às 21h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo. 🙌🕐');
                clameSuport(message, client);
                humanControl(message, client);
            } else 
            if (message.body === '5' && condition) {
                client.sendMessage(message.from, 'O período de atendimento é de 8h às 21h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆.');
                clameSuport(message, client);
                humanControl(message, client);
            }
            
        })

}

module.exports = { options };
