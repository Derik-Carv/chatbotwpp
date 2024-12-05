const { options } = require('../options/opcoes.js');
const { clameSuport } = require('../interaction/suporte.js');
const { help } = require('../interaction/help.js');
const { start } = require('../start/start.js');
const { chatStage, stages, check } = require('../gerenciator/chatstage.js');
const { nextMsg } = require('../options/catalogo.js');
const { IgnoreList } = require('../interaction/ignorelist.js');
const data = new Date();
const hours = data.getHours();
const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" });


const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

async function reply(message, client) {
    console.log('[reply] in use');

    const encomenda = /\bencomenda\b/i;
    const informar = /\binformar\b/i;
    const pedido = /\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i;

    const userId = message.from
    const meNumber = '5591987597762@c.us';

    //if ((hours > 7 || hours < 19) && diaSemana != `domingo`) {

        // Chama a função chatStage para verificar e atualizar o estágio do usuário
        await chatStage(message, userId);

         

        // Chamando Submenu do catalogo
        Object.values(stages).forEach(userStage => {
            // humando intervem no atendimento
            console.log('testeeee:' + userStage.fase);

            console.log('[reply] chatstage: ', userStage)
            const condition = userStage.fase != `nextcat` && userStage.fase != `catalogo` && userStage.fase != `humanControl` && message.isStatus != true;

            if (userStage.fase === 'nextCat') { // Se o user estiver no sub menu do catalogo
                nextMsg(message, client, userStage);
            }
                if (userStage.fase === 'humanControl') { // Se está com o estágio de controle humano
                    const ignore = new IgnoreList;
                    ignore.addUser(message.from) // adiciona o usário na lista de ignorados
                    console.log(`${message.from} entrou na lista de ignorados`); // Resposta em console para confirmar user ignorado
            } else  // Mensagens vinda de encomenda do site
                if (encomenda.test(message.body) && condition) {
                    clameSuport(message, client);
            } 
            else // Mensagebs de pedido vindas do site
                if (pedido.test(message.body) && condition) {
                    client.sendMessage(message.from, `Pedido recebido ✅, envie o comprovante de pagamento🧾, que logo o seu pedido será entregue 🛵💨.`);
                    clameSuport(message, client);
            }
            else  // Mensagens para entrar em contato vindas do site
                if (informar.test(message.body) && condition) {
                    client.sendMessage(message.from, `Aguarde enquanto chamamos um atendente 💻👩‍💻📞.`);
                    clameSuport(message, client);
            }
            else // Inicia o atendimento com a mensagem do cliente
                if (/\b[\p{L}\p{P}\p{S}]+$\b/u.test(message.body) && condition) {
                    console.log(` dia da semana:  `+diaSemana);
                    atendimentoInicial(message, client);
                    
            } 
            else // Opções de atendimento
                if (['1', '2', '3', '4', '5'].includes(message.body) && condition) {
                    options(message, client, url);
            }
            
            // Verifica se a mensagem não é do tipo chat
            if (message.type !== `chat` && message.isStatus != true) {
                    help(message, client);
            }

        })
}

async function atendimentoInicial(message, client) {
    /**
     *  Bug encontrado ao iniciar script no server side:
     *  As vezes pode ser que dê erro -->
     *      throw new Error('Evaluation failed: ' + (0, util_js_1.getExceptionMessage)(exceptionDetails));
              ^

            Error: Evaluation failed: Error: Could not get the quoted message.
        Quando ficam mensagens não lidas em algum lugar que esteja
        com a mesma conta logada.
        Talvez aplicando limpeza automática de cache resolva o problema.
        O Try catch abaixo foi implementado para indicar a possibilidade deste problema.
     */
    await client.sendMessage(message.from,'Seja bem-vindo à Entrelaços Crochê 🧶. Aqui temos várias peças de crochê feitas à mão 🛠️. Você pode ver mais opções no nosso site 🌐: ' + url);

    if (diaSemana == `domingo`) {
        await message.reply(`O período de suporte é de 8h às 21h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆. Assim que estivermos disponíveis iremos entrar em contato. Obrigado pelo tempo. 🙌🕐`)
    } else {
        await client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽\n1️⃣. Catálogo 👗👙👘🩱\n2️⃣. Novidades 🔄\n3️⃣. Parceria 🤝\n4️⃣. Suporte 🧑‍💻⚠️\n5️⃣. Falar com atendente 👩‍💻📞');
    }
}

module.exports = { reply, hours, diaSemana};
