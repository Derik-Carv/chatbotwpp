const { options, responseDoubt } = require('../options/options.js');
const { responderDuvida } = require('./sections/doubt');
const { clameSuport } = require('../interaction/suporte.js');
const { help } = require('../interaction/help.js');
const { chatStage, stages, check } = require('../gerenciator/chatstage.js');
const { verificarPatrimonio, respPat } = require('../options/sections/pat.js');
const { nextMsg } = require('./sections/doubt.js');
const { IgnoreList } = require('../interaction/ignorelist.js');
const { checkingNetwork } = require('./network/checkingNetwork.js');
const date = new Date();
const hours = date.getHours();
const diaSemana = date.toLocaleDateString("pt-BR", { weekday: "long" });


async function reply(message, client) {
    console.log('[reply] in use');

    const encomenda = /\bencomenda\b/i;
    const informar = /\binformar\b/i;
    const pedido = /\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i;

    const userId = message.from
    const meNumber = '5591987597762@c.us';

    let mensagem = responseDoubt;

    //if ((hours > 7 || hours < 19) && diaSemana != `domingo`) {

        // Chama a função chatStage para verificar e atualizar o estágio do usuário
        await chatStage(message, userId);

        // Chamando Submenu do catalogo
        Object.values(stages).forEach(userStage => {
        
            console.log('[reply] chatstage: ', userStage)
            const condition = userStage.fase != `humanControl` && message.isStatus != true;

           // humando intervem no atendimento
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
            } else
                if (message.body == '!patrimonio' && condition){
                    console.log(`[reply] pat check`)
                    stageNow = `pat`;
                    check(message, stageNow);
                    verificarPatrimonio(message);
                    client.sendMessage(message.from, respPat);
                    if (userStage.fase == `pat`) {
                        stageNow = `patSubMenu`;
                        check(message, stageNow);
                        console.log(`[reply] entrando no submenu user no estágio: ` + userStage.fase);
                        //optionsPatSub(message);
                        //client.sendMessage(message.from, `[teste]teste`);
                    }
                } 
            else // Inicia o atendimento com a mensagem do cliente
                if (/\b[\p{L}\p{P}\p{S}]+$\b/u.test(message.body) && condition) {
                    console.log(` dia da semana:  `+diaSemana);
                    atendimentoInicial(message, client);
                    
            }

            // Opções de atendimento
            if (['1', '2', '3', '4', '5', '6', '7'].includes(message.body)) {
                if (userStage.fase == 'doubt'){
                    responderDuvida(message,client);
                }
                if (userStage.fase == 'menu_start') {
                    options(message, client);
                }
                if (userStage.fase == 'checkingNetwork'){
                    checkingNetwork(message, client);
                }
                
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
    await client.sendMessage(message.from,`Seja bem-vindo ao canal de suporte e atendimento de T.I. da Oyamota. Estamos disponíveis de 8h às 12h & 13h às 18h, de segunda a sexta!`);

    if (diaSemana == `domingo` && diaSemana == `sábado`) {
        await message.reply(`O período de suporte é de 8h às 18h ⏰🧑‍💻👩‍💻, exceto aos sábados e domingos ❌📆. Você pode enviar um e-mail para ti@oyamota.com.br. Equipe de T.I. Oyamota agradece o contato. 🙌🕐`)
    } else {
        await client.sendMessage(message.from, `Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽
            \n1️⃣. Dúvidas ❓\n2️⃣. Falha em Rede ❌🛜\n3️⃣. Falha em Equipamento ❌🖥️\n4️⃣. Solicitar compra ou troca de material 🛠️🔄\n5️⃣. Solicitações de impressoras 🖨️\n6️⃣. Suporte 🧑‍💻⚠️`);
    }
}

module.exports = { reply, hours, diaSemana, atendimentoInicial};
