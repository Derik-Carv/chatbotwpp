const { chatStage, stages } = require("../gerenciator/chatstage");

let timeoutHandle = null; // TEMPORIZADOR GLOBAL PARA DETECTAR INATIVIDADE
// FUNÇÃO QUE REINICIA O ATENDIMENTO APÓS 10 MINUTOS DE INATIVIDADE

const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

async function startInactivityTimer (message, client) {


    
    // LIMPA O TEMPORIZADOR ANTERIOR (SE EXISTIR)
    if (timeoutHandle) {
        clearTimeout(timeoutHandle);
    }
    if (!timeoutHandle) {
       
    }

    // DEFINE UM NOVO TEMPORIZADOR DE 10 MINUTOS (600000MS)
    timeoutHandle = setTimeout(() => {
        client.sendMessage(message.from, 'Você ficou inativo por 10 minutos. Iniciando atendimento novamente.');
        
        // Envia mensagem de opções novamente.
                client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: \n1. Catálogo\n2. Novidades\n3. Parceria\n4. Suporte.\n5. Falar com atendente');

        
        // Mudando estágio de atendimento para inatividade
        userId = message.from;
        chatStage(message, userId);
        Object.values(stages).forEach(userStage =>{
            if (message.from === userStage.user) {
                userStage.fase = 'inative'
                console.log(`mudando estágio de atendimento para ${userStage.fase}`)
            }
        })
    }, 20000); // 10 MINUTOS EM MILISSEGUNDOS 600000
};

module.exports = {startInactivityTimer, timeoutHandle}