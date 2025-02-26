async function start() {
    const qrcode = require('qrcode-terminal');
    const { Client, LocalAuth } = require('whatsapp-web.js') ; // biblioteca wppwebjs
    const {startInactivityTimer, timeoutHandle} = require('../interaction/inatividade.js'); // IMPORTANDO A FUNÇÃO DE DETECTAR INATIVIDADE
    const { reply } = require('../options/reply.js')
    const { check, stages} = require('../gerenciator/chatstage.js');
    
    console.log('[start] in use');

    const data = new Date()

    const client = new Client({ // CONFIGURAÇÃO DO CLIENTE WHATSAPP
        authStrategy: new LocalAuth() // ATENÇÃO. ESSA FUNÇÃO IRÁ CRIAR UMA PASTA CHAMADA [.wwebjs_auth]
    });                               // PARA SALVAR SUA AUTENTICAÇÃO DE LOGIN. ASSIM NÃO IRÁ PRECISAR POR O QRCODE TODA VEZ QUE INICAR O SCRIPT.

    // EVENTOS DO CLIENTE WHATSAPP
    client.on('ready', () => {
        console.log('[start] Client is ready!');
        console.log('[start] Seu whatsapp empresárial está pronto para uso!');
    });

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
        console.log('[start] QR Code is ready!'); // CONFIRMA QUE O QRCODE SERÁ GERADO
    });

    client.on('message_create', async (message) => {
        //console.log(message.body); // EXIBE AS MENSAGENS NO TERMINAL

        console.log(`Processing message: ${message.body}, ID: ${message.id.id}`);

        if (message.from === client.info.wid._serialized) { // IGNORA MENSAGENS DO BOT
            return;
        }

        const botInteractive = !stages || Object.keys(stages).length === 0;

        if(botInteractive && !message.fromMe) {
            startInactivityTimer(message, client);
            reply(message, client);
        }
            Object.values(stages).forEach(userStage=>{

                console.log(`${userStage.user} este user, está no modo: ${userStage.fase}`)
                console.log('para: ' + message.to)
    
                if(message.fromMe === true) {
                    if (message.body === '!intervir') {
                        stageNow = 'interview';
                        let contato = message.to;
                        check(contato, stageNow);
                    }
                    if (message.body === '!encerrar') {
                        stageNow = 'menu_start';
                        let contato = message.to;
                        check(contato, stageNow);
                    }
                } else if(!botInteractive) {
                    startInactivityTimer(message, client);
                    reply(message, client);
                }
            })
        

        // EVITAR QUE O BOT RESPONDA A SUAS PRÓPRIAS MENSAGENS. ISSO É FEITO COMPARANDO O ID ÚNICO DO PRÓPRIO BOT NO WHATSAPP (CLIENT.INFO.WID._SERIALIZED) COM O REMETENTE DA MENSAGEM.
        // SE FOREM IGUAIS, SIGNIFICA QUE A MENSAGEM FOI ENVIADA PELO PRÓPRIO BOT, E O CÓDIGO IGNORA ESSA MENSAGEM COM RETURN, EVITANDO LOOPS DE RESPOSTAS AUTOMÁTICAS.
        // O _SERIALIZED É UMA VERSÃO EM STRING DO ID DO BOT, QUE INCLUI O NÚMERO DE TELEFONE EM FORMATO INTERNACIONAL SEGUIDO DE @C.US.

        // REINICIA O TEMPORIZADOR DE INATIVIDADE SEMPRE QUE O USUÁRIO ENVIA UMA MENSAGEM VÁLIDA
        
    });
    
    // INICIALIZA O CLIENTE WHATSAPP
    client.initialize();
}

//start();

module.exports = { start }