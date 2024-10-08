const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({ // CONFIGURAÇÃO DO CLIENTE WHATSAPP
    authStrategy: new LocalAuth() // ATENÇÃO. ESSA FUNÇÃO IRÁ CRIAR UMA PASTA CHAMADA [.wwebjs_auth]
});                               // PARA SALVAR SUA AUTENTICAÇÃO DE LOGIN. ASSIM NÃO IRÁ PRECISAR POR O QRCODE TODA VEZ QUE INICAR O SCRIPT.

const url = `https://derik-carv.github.io/entrelacos/`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.

let timeoutHandle = null; // TEMPORIZADOR GLOBAL PARA DETECTAR INATIVIDADE

// FUNÇÃO QUE REINICIA O ATENDIMENTO APÓS 10 MINUTOS DE INATIVIDADE
const startInactivityTimer = (message) => {
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
                client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda de forma escrita com o número das opções abaixo:\n1. Desejo ver o catálogo de peças de crochê.\n2. Desejo ver as novidades da loja.\n3. Desejo fazer parceria comercial.\n4. Preciso de suporte para dúvidas, reclamações, feedback ou trocas.\n5. Preciso falar com um atendente.');
            });
    }, 600000); // 10 MINUTOS EM MILISSEGUNDOS
};

// FUNÇÃO QUE CRIA A RESPOSTA COM OS DADOS DO CATÁLOGO
async function responderComCatalogo (message) {
        const data = {
            items: ['Cropped Borboleta', 'Ecobag Pink Pony Club', 'Bolsa Rosas', 'Bolsa Square de Corações', 'Bolsa Barbie', 'Ecobag Corações', 'Ecobag Simples', 'Ecobag Alça Fina', 'Bolsa Girasol'],
            descriptions: ['Cropped, formato borboleta.', 
                            'Peça 100% algodão produzida com fio barroco natural e vermelho.',
                            'Peça 100% algodão produzida com fio barroco natural, vermelho e verde.',
                            'Peça 100% algodão produzida com fio barroco natural e preto.',
                            'Peça produzida com frio de acrílico.',
                            'Ecobag com decoração de corações vermelhos.',
                            'Ecobag simples. Várias cores.',
                            'Ecobag, com alça fina. Várias cores.',
                            'Ecobag com desenhos de girasol.'],
            colors: ['Laranja, Azul, Preto', 'Branco com letras Vermelhas', 'Branco com detalhes Vermelhos e Verde', 'Preta com detalhes em Branco.', 'Rosa', 
                        'Branca com corações Vermelhos','Bege, Preto, Vermelho, verde', 'Verde Petróleo, Vermelho, Preto, Azul', 'Azul Marinho'],
            prices: ['R$70,00', 'R$190,00', 'R$80,00', 'R$130,00', 'R$75,00', 'R$110,00', 'R$60,00', 'R$100,00', 'R$00,00'],
            sizes: ['P, M, G', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único','Tamanho Único', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único']
        };

        let catalogMessage = 'Aqui está o catálogo completo:\n';
        data.items.forEach((item, index) => {
            catalogMessage += `\nProduto: ${item}\nDescrição: ${data.descriptions[index]}\nCores: ${data.colors[index]}\nPreço: ${data.prices[index]}\nTamanhos disponíveis: ${data.sizes[index]}\n\n`;
        });
        
        client.sendMessage(message.from, catalogMessage);
        if (message.body != `1`) {
            help(message)
        }
}

async function clameSuport(a) { // FUNÇÃO QUE INICIA A CHAMADA AO ATENDIMENTO.
    // NÚMERO PARA ENVIAR A MENSAGEM (FORMATO INTERNACIONAL)
    const phoneNumberDerik = '559188502326';  // Substitua pelo número desejado
    const phoneNumberHelen = '559185039235';  // Substitua pelo número desejado
    const messageSuporte = 'ATENÇÃO, cliente aguardando seu SUPORTE!';
    const messageAtendente = 'Temos um cliente aguardando seu atendimento!';
    const messageSite = 'Alguém quer INFORMAÇÃO vinda do site.'
    const messageEncomenda = `Você recebeu uma nova encomenda`
    const messagePedido = `COMPRA SOLICITADA! Temos um pedido feito diretamente pelo site.`
    
    if(a === `4`) {
         // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSuporte)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageSuporte)
    }
    else if (a === '5') {
        // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageAtendente)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageAtendente)
    }
    else if (a.body && a.body.match(/\binformar\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSite)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageSite)
    }
    else if (a.body && a.body.match(/\bencomenda\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageEncomenda)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageEncomenda)
    } else if (a.body && a.body.match(/\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messagePedido)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messagePedido)
    } else {
        help(message)
    }
}

async function help(message) {
    client.sendMessage(message.from, 'Está tudo bem?')
    const messageHELP = 'AJUDE um cliente com o atendimento! Ele está tendo dificuldades com o chatbot.'
    const phoneNumberDerik = '559188502326';  // Substitua pelo número desejado
    const phoneNumberHelen = '559185039235';  // Substitua pelo número desejado
    await client.sendMessage(`${phoneNumberDerik}@c.us`, messageHELP)
    await client.sendMessage(`${phoneNumberHelen}@c.us`, messageHELP)
}

function options(message) { // FUNÇÃO CRIADA PARA MOSTRAR AS OPÇÕES
    if (message.body == 1) {
        responderComCatalogo(message);  // CHAMA A FUNÇÃO QUE BUSCA O CATÁLOGO E RESPONDE AO USUÁRIO
    }

    // Outras opções de resposta
    else if (message.body === '2') {
        client.sendMessage(message.from, `Este é o nosso catálogo de novidades: ${url}`);
    } else if (message.body === '3') {
        client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional: entrelacoscrochehp@gmail.com`);
    } else if (message.body === '4') {
        client.sendMessage(message.from, 'O período de suporte é de 8h às 18h, exceto aos domingos. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo.');
            clameSuport(message.body);
    } else if (message.body === '5') {
        client.sendMessage(message.from, 'O período de atendimento é de 8h às 18h, exceto aos domingos.');
            clameSuport(message.body)
    } else {
        help(message)
    }
}

// function clientes() { // A = NICK CLIENTE / B = NÚMERO CLIENTE // FUNÇÃO PARA CRIAR LISTA DE CLIENTES.
//     class clientes {
//         constructor (name, number, firistDate, lastDate){

//         }
//     }
// }

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

    if (message.from === client.info.wid._serialized) { // Ignora mensagens do bot
        return;
    }
    // motivo: ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // A expressão client.info.wid._serialized é usada para acessar o ID único do próprio bot no WhatsApp, no formato serializado. 
    // Aqui está a explicação detalhada de cada parte:

    // client: É a instância do cliente do whatsapp-web.js, que controla a interação do bot com o WhatsApp.
    
    // client.info: Contém informações sobre a conta do WhatsApp conectada, como o número de telefone, nome, e outras informações básicas. 
    // Esse objeto é populado quando o cliente é autenticado com sucesso.
    
    // client.info.wid: wid significa "WhatsApp ID", e representa o identificador único do bot no WhatsApp. Este é o número de telefone do bot no formato que o WhatsApp usa internamente.
    
    // client.info.wid._serialized: O _serialized é a versão em string do WhatsApp ID. Ele representa o número de telefone no formato internacional 
    // e é utilizado em muitas funções para identificar o remetente/destinatário das mensagens. Um exemplo de valor de _serialized seria algo como "559188502326@c.us", onde:
    
    // 559188502326 é o número de telefone no formato internacional.
    // @c.us é um sufixo usado pelo WhatsApp para distinguir usuários normais.
    // Por que usamos isso?
    // O _serialized é utilizado para comparar o ID do remetente das mensagens com o ID do próprio bot. Ao fazer isso, 
    // podemos ignorar mensagens enviadas pelo próprio bot e evitar loops desnecessários (como quando o bot responde e a sua própria resposta gera uma nova mensagem que ele tenta processar).
    // Dessa forma, evitamos loops de mensagens automáticas.

    // REINICIA O TEMPORIZADOR DE INATIVIDADE SEMPRE QUE O USUÁRIO ENVIA UMA MENSAGEM VÁLIDA
    startInactivityTimer(message);
    const encomenda = /\bencomenda\b/i
    const informar = /\binformar\b/i
    const pedido = /\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i
    if (encomenda.test(message.body)) {
        await clameSuport(message);
    } 
    else if (pedido.test(message.body)) {
        await client.sendMessage(message.from, `Pedido recebido, envie o comprovante de pagamento, que logo o seu pedido será entregue.`)
        clameSuport(message)
    }
    else if (informar.test(message.body)) {
        client.sendMessage(message.from, `Aguarde enquanto chamamos um atendente.`)
        clameSuport(message)
    }
    else if (/^[\p{L}]+$/u.test(message.body)) {
        // AGUARDA O ENVIO DA RESPOSTA E DEPOIS O ENVIO DAS OPÇÕES
        await message.reply('Seja bem-vindo à Entrelaços Crochê. Aqui temos várias peças de crochê feitas à mão. Você pode ver mais opções no nosso site: ' + url);
        await selecao()
        function selecao() {
            client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: \n1. Catálogo\n2. Novidades\n3. Parceria\n4. Suporte.\n5. Falar com atendente');
        }
    } 
    else if(['1', '2', '3', '4', '5'].includes(message.body)) {
        options(message)
    }
});

// INICIALIZA O CLIENTE WHATSAPP
client.initialize();