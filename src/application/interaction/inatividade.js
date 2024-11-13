const { chatStage, stages } = require("../gerenciator/chatstage");
const { hours, diaSemana } = require("../options/reply");

let timeoutHandle = null; // TEMPORIZADOR GLOBAL PARA DETECTAR INATIVIDADE
// FUNÇÃO QUE REINICIA O ATENDIMENTO APÓS 10 MINUTOS DE INATIVIDADE

async function startInactivityTimer (message, client) {
    
    //if ((hours > 7 || hours < 19) && diaSemana != `domingo`) {
        console.log('[inatividade] in use');1
        
        // LIMPA O TEMPORIZADOR ANTERIOR (SE EXISTIR)
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }

        // DEFINE UM NOVO TEMPORIZADOR DE 10 MINUTOS (600000MS)
        timeoutHandle = setTimeout(() => {
            client.sendMessage(message.from, 'Você ficou inativo por 10 minutos. Iniciando atendimento novamente.');
            
            // Envia mensagem de opções novamente.
                    client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽\n1️⃣. Catálogo 👗👙👘🩱\n2️⃣. Novidades 🔄\n3️⃣. Parceria 🤝\n4️⃣. Suporte 🧑‍💻⚠️\n5️⃣. Falar com atendente 👩‍💻📞');

            
            // Mudando estágio de atendimento para inatividade
            userId = message.from;
            chatStage(message, userId);
            Object.values(stages).forEach(userStage =>{
                if (message.from === userStage.user) {
                    userStage.fase = 'inative'
                    console.log(`[inatividade] mudando estágio de atendimento para ${userStage.fase}`)
                }
            })
        }, 600000); // 10 MINUTOS EM MILISSEGUNDOS
    //}
};

module.exports = {startInactivityTimer, timeoutHandle}