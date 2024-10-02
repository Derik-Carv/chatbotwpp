const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({ // CONFIGURAÇÃO DO CLIENTE WHATSAPP
    authStrategy: new LocalAuth() // ATENÇÃO. ESSA FUNÇÃO IRÁ CRIAR UMA PASTA CHAMADA [.wwebjs_auth]
});                               // PARA SALVAR SUA AUTENTICAÇÃO DE LOGIN. ASSIM NÃO IRÁ PRECISAR POR O QRCODE TODA VEZ QUE INICAR O SCRIPT.

const url = `https://seutite.com`;  // CASO QUEIRA ADICIONAR UM SITE, COLOCA O LINK AQUI.
const suaEmpresa = `SUA EMPRESA` // NOME DO SEU NEGÓCIO AQUI
const email = `SEUEMAIL@EMAIL.COM` // SEU EMAIL DE CONTATO AQUI

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
        client.sendMessage(message.from, `Seja bem-vindo à ${suaEmpresa}. Aqui temos várias peças de crochê feitas à mão. Você pode ver mais opções no nosso site: ${url}`)
            .then(() => {
                client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda de forma escrita com o número das opções abaixo:\n1. Desejo ver o catálogo de peças de crochê.\n2. Desejo ver as novidades da loja.\n3. Desejo fazer parceria comercial.\n4. Preciso de suporte para dúvidas, reclamações, feedback ou trocas.\n5. Preciso falar com um atendente.');
            });
    }, 600000); // 10 MINUTOS EM MILISSEGUNDOS
};

// FUNÇÃO QUE CRIA A RESPOSTA COM OS DADOS DO CATÁLOGO
async function responderComCatalogo (message) { // CADA ITEM, ESTÁ ORGANIZADO DE ACORDO COM A POSIÇÃO DESIGNADA EM CADA PARTE. 
                        // EXEMPLO: ITEM: 
                //      ITEM: Cropped Borboleta              DESCRIÇÃO: Cropped, formato borboleta.         COR: Laranja, Azul, Preto.          PREÇO: R$70,00,         TAMANHO: P, M, G.
                //      items: ['Cropped Borboleta']        descriptions:['Cropped, formato borboleta.']   colors: ['Laranja, Azul, Preto']    prices: ['R$70,00']     sizes: ['P, M, G']
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
}

async function clameSuport(a) { // FUNÇÃO QUE INICIA A CHAMADA AO ATENDIMENTO.
    // NÚMERO PARA ENVIAR A MENSAGEM (FORMATO INTERNACIONAL)
    const phoneNumber = '00000000000';  // SUBSTITUA PELO NÚMERO QUE QUEM IRÁ DAR SUPORTE PESSOAL.
    const messageSuporte = 'ATENÇÃO, cliente aguardando seu SUPORTE!';
    const messageAtendente = 'Temos um cliente aguardando seu atendimento!';
    const messageSite = 'Alguém quer INFORMAÇÃO vinda do site.'
    if(a === `4`) {
         // Função para enviar a mensagem
        client.sendMessage(`${phoneNumber}@c.us`, messageSuporte)
    }
    if (a === '5') {
        // Função para enviar a mensagem
        client.sendMessage(`${phoneNumber}@c.us`, messageAtendente)
    }
    let text = `Olá, gostaria de me informar mais sobre a ${suaEmpresa}. Poderia me ajudar?`
    if (Boolean(a.body == text) == true) {
        client.sendMessage(`${phoneNumberD}@c.us`, messageSite)
    }
}

function options(message) { // FUNÇÃO CRIADA PARA MOSTRAR AS OPÇÕES
    if (message.body == 1) {
        responderComCatalogo(message);  // CHAMA A FUNÇÃO QUE BUSCA O CATÁLOGO E RESPONDE AO USUÁRIO
    }

    // Outras opções de resposta
    else if (message.body === '2') {
        client.sendMessage(message.from, `Este é o nosso catálogo de novidades: ${url}`);
    } else if (message.body === '3') {
        client.sendMessage(message.from, `Este é o nosso e-mail de contato profissional: ${email}`);
    } else if (message.body === '4') {
        client.sendMessage(message.from, 'O período de suporte é de 8h às 18h, exceto aos domingos. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo.');
            clameSuport(message.body);
    } else if (message.body === '5') {
        client.sendMessage(message.from, 'O período de atendimento é de 8h às 18h, exceto aos domingos.');
            clameSuport(message.body)
    }
}

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

    // REINICIA O TEMPORIZADOR DE INATIVIDADE SEMPRE QUE O USUÁRIO ENVIA UMA MENSAGEM VÁLIDA
    startInactivityTimer(message);

    // VERIFICAÇÃO SE A MENSAGEM CONTÉM APENAS LETRAS USANDO EXPRESSÃO REGULAR
    if (/^[\p{L}]+$/u.test(message.body)) {
        // AGUARDA O ENVIO DA RESPOSTA E DEPOIS O ENVIO DAS OPÇÕES
        await message.reply(`Seja bem-vindo à ${suaEmpresa}. Aqui temos várias peças de crochê feitas à mão. Você pode ver mais opções no nosso site: ${url}`);
        await selecao()
        function selecao() {
            client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: \n1. Catálogo\n2. Novidades\n3. Parceria\n4. Suporte.\n5. Falar com atendente');
        }
    } else if(['1', '2', '3', '4', '5'].includes(message.body)) {
        options(message)
    } 
    else if (message.body === `Olá, gostaria de me informar mais sobre a ${suaEmpresa}. Poderia me ajudar?`) { // MENSAGEM AUTOMATICA QUE VOCÊ RECEBE ATRAVÉS DE EMCAMINHAMENTO AUTOMATICO, APÓS CLIENTE CLICAR NO LINK DO WHATSAPP DA EMPRESA.
        await client.sendMessage(message.from, `Aguarde enquanto chamamos um atendente.`)
        clameSuport(message)
    }
});

// INICIALIZA O CLIENTE WHATSAPP
client.initialize();