


// INSTALL DEPENDECE ORDER:
// #1 npm i whatsapp-web.js  
// #2 npm i qrcode-terminal  
// #3 npm install wwebjs-mongo 
// #4 npm i puppeteer / OPTIONAL.

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js') ; // biblioteca wppwebjs
const {startInactivityTimer, timeoutHandle} = require('./inatividade'); // IMPORTANDO A FUNÇÃO DE DETECTAR INATIVIDADE
const { options } = require('./opcoes');
const { clameSuport } = require('./suporte');

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
    const encomenda = /\bencomenda\b/i
    const informar = /\binformar\b/i
    const pedido = /\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i
    if (encomenda.test(message.body)) {
        await clameSuport(message, client);
    } 
    else if (pedido.test(message.body)) {
        await client.sendMessage(message.from, `Pedido recebido, envie o comprovante de pagamento, que logo o seu pedido será entregue.`)
        clameSuport(message, client)
    }
    else if (informar.test(message.body)) {
        client.sendMessage(message.from, `Aguarde enquanto chamamos um atendente.`)
        clameSuport(message, client)
    }
    else if (/\b[\p{L}]+$\b/u.test(message.body)) {
        // AGUARDA O ENVIO DA RESPOSTA E DEPOIS O ENVIO DAS OPÇÕES
        await message.reply('Seja bem-vindo à Entrelaços Crochê. Aqui temos várias peças de crochê feitas à mão. Você pode ver mais opções no nosso site: ' + url);
        await selecao()
        function selecao() {
            client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: \n1. Catálogo\n2. Novidades\n3. Parceria\n4. Suporte.\n5. Falar com atendente');
        }
    } 
    else if(['1', '2', '3', '4', '5'].includes(message.body)) {
        options(message, client, url)
    }
    if (message.type != `chat`) {
        client.sendMessage(message.from, `Por favor, use mensagem por escrito para iniciar o atendimento. Caso esteja tendo dificuldade no atendimento, pode mandar um audio, até imagem do que deseja.`)
        console.log(data.getFullYear(), 'getfullyear');
    }
});

// INICIALIZA O CLIENTE WHATSAPP
client.initialize();