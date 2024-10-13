// INSTALL DEPENDECE ORDER:
// #1 npm i whatsapp-web.js  
// #2 npm i qrcode-terminal  
// #3 npm install wwebjs-mongo 

function start() {
    const qrcode = require('qrcode-terminal');
    const { Client, LocalAuth } = require('whatsapp-web.js') ; // biblioteca wppwebjs
    const {startInactivityTimer, timeoutHandle} = require('../interaction/inatividade.js'); // IMPORTANDO A FUNÇÃO DE DETECTAR INATIVIDADE
    const { reply } = require('../options/reply.js')

    const data = new Date()
    const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

    const client = new Client({ // CONFIGURAÇÃO DO CLIENTE WHATSAPP
        authStrategy: new LocalAuth() // ATENÇÃO. ESSA FUNÇÃO IRÁ CRIAR UMA PASTA CHAMADA [.wwebjs_auth]
    });                               // PARA SALVAR SUA AUTENTICAÇÃO DE LOGIN. ASSIM NÃO IRÁ PRECISAR POR O QRCODE TODA VEZ QUE INICAR O SCRIPT.

    // EVENTOS DO CLIENTE WHATSAPP
    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
        console.log('QR Code is ready!'); // CONFIRMA QUE O QRCODE SERÁ GERADO
    });

    client.on('message_create', async (message) => {
        console.log(message.body); // EXIBE AS MENSAGENS NO TERMINAL
        
        if (message.from === client.info.wid._serialized) { // IGNORA MENSAGENS DO BOT
            return;
        }
        // EVITAR QUE O BOT RESPONDA A SUAS PRÓPRIAS MENSAGENS. ISSO É FEITO COMPARANDO O ID ÚNICO DO PRÓPRIO BOT NO WHATSAPP (CLIENT.INFO.WID._SERIALIZED) COM O REMETENTE DA MENSAGEM.
        // SE FOREM IGUAIS, SIGNIFICA QUE A MENSAGEM FOI ENVIADA PELO PRÓPRIO BOT, E O CÓDIGO IGNORA ESSA MENSAGEM COM RETURN, EVITANDO LOOPS DE RESPOSTAS AUTOMÁTICAS.
        // O _SERIALIZED É UMA VERSÃO EM STRING DO ID DO BOT, QUE INCLUI O NÚMERO DE TELEFONE EM FORMATO INTERNACIONAL SEGUIDO DE @C.US.

        // REINICIA O TEMPORIZADOR DE INATIVIDADE SEMPRE QUE O USUÁRIO ENVIA UMA MENSAGEM VÁLIDA
        startInactivityTimer(message, client, url);
        
        reply(message, client, url)
    });

    // INICIALIZA O CLIENTE WHATSAPP
    client.initialize();
}



module.exports = { start }