let timeoutHandle = null; // TEMPORIZADOR GLOBAL PARA DETECTAR INATIVIDADE
// FUNÇÃO QUE REINICIA O ATENDIMENTO APÓS 10 MINUTOS DE INATIVIDADE

const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

async function startInactivityTimer (message, client) {
    
    // LIMPA O TEMPORIZADOR ANTERIOR (SE EXISTIR)
    if (timeoutHandle) {
        clearTimeout(timeoutHandle);
    }

    // DEFINE UM NOVO TEMPORIZADOR DE 10 MINUTOS (600000MS)
    timeoutHandle = setTimeout(() => {
        client.sendMessage(message.from, 'Você ficou inativo por 10 minutos. Iniciando atendimento novamente.');
        
        // ENVIA A MENSAGEM DE BOAS-VINDAS E VOLTA AO INÍCIO
        client.sendMessage(message.from, 'Seja bem-vindo à Entrelaços Crochê. Aqui temos várias peças de crochê feitas à mão. Você pode ver mais opções no nosso site: ' + url)
            .then(() => {
                client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: \n1. Catálogo\n2. Novidades\n3. Parceria\n4. Suporte.\n5. Falar com atendente');
            });
    }, 600000); // 10 MINUTOS EM MILISSEGUNDOS
};

module.exports = {startInactivityTimer, timeoutHandle}