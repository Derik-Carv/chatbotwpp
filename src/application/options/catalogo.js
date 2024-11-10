const { stages, chatStage, check } = require(`../gerenciator/chatstage`);
const { help } = require("../interaction/help");
const { clameSuport } = require("../interaction/suporte");

async function responderComCatalogo(message, client) {
    // Itera sobre cada usuário no objeto stages
    Object.values(stages).forEach(userStage => {
        console.log('[catalogo] in use');
        // Verifica se o usuário e o estágio estão corretos
        if (userStage.user === message.from && userStage.fase === 'menu_start') {
            userStage.fase = 'catalogo';
            const data = {
                items: ['Cropped Borboleta', 'Ecobag Pink Pony Club', 'Bolsa Rosas', 'Bolsa Square de Corações', 'Bolsa Barbie', 'Ecobag Corações', 'Ecobag Simples', 'Ecobag Alça Fina', 'Bolsa Girasol'],
                descriptions: [
                    'Cropped, formato borboleta.', 
                    'Peça 100% algodão produzida com fio barroco natural e vermelho.',
                    'Peça 100% algodão produzida com fio barroco natural, vermelho e verde.',
                    'Peça 100% algodão produzida com fio barroco natural e preto.',
                    'Peça produzida com fio de acrílico.',
                    'Ecobag com decoração de corações vermelhos.',
                    'Ecobag simples. Várias cores.',
                    'Ecobag, com alça fina. Várias cores.',
                    'Ecobag com desenhos de girasol.'
                ],
                colors: ['Laranja🟠, Azul🟦, Preto⚫', 'Branco com letras Vermelhas⚪🔺', 'Branco com detalhes Vermelhos e Verde⚪🔴🟩', 'Preta com detalhes em Branco.🔳', 'Rosa🩷', 
                    'Branca com corações Vermelhos⚪🔺','Bege🟫, Preto⚫, Vermelho🔴, Verde🟢', 'Verde Petróleo🟢🔵, Vermelho🔴, Preto⚫, Azul🟦', 'Azul Marinho🔵'],
                prices: ['R$70,00 💵', 'R$190,00 💵', 'R$80,00 💵', 'R$130,00 💵', 'R$75,00 💵', 'R$110,00 💵', 'R$60,00 💵', 'R$100,00 💵', 'R$80,00 💵'],
                sizes: ['P, M, G', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único','Tamanho Único', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único', 'Tamanho Único']
            };

            // Construção da mensagem do catálogo
            let catalogMessage = 'Você pode ver mais detalhes dos produtos clicando no nosso perfil.\nAqui está o catálogo completo:';
            data.items.forEach((item, index) => {
                catalogMessage += `\nProduto: ${item}\nDescrição: ${data.descriptions[index]}\nCores: ${data.colors[index]}\nPreço: ${data.prices[index]}\nTamanhos disponíveis: ${data.sizes[index]}\n\n`;
            });

            

            // Envia a mensagem com o catálogo e opções
            client.sendMessage(message.from, catalogMessage);
        }

        const opcCat = `01. Fazer Pedido\n02. Perguntar sobre Produto\n03. Sair`
        client.sendMessage(message.from, opcCat);

        // Muda o estágio para ir para o submenu
        userStage.fase = 'nextCat'
    });
}

// Submenu para opções pós catalogo
async function nextMsg(message, client, userStage) {
        console.log('[nextMsg] in use');

        if (userStage.fase === 'nextCat') {
            if (message.body === '1' && userStage.fase === 'nextCat') {
                client.sendMessage(message.from, `Aguarde um momento, estamos contatando um atendente para processar o seu pedido.`)
                stageNow = 'atendimento'
                check(message, stageNow);
                clameSuport(message, client, null, stageNow);
                // Fazer verificação de caso cliente queira sair desse estágio.
            } else
            if (message.body === '2' && userStage.fase === 'nextCat') {
                client.sendMessage(message.from, `Aguarde um momento, estamos contatando um atendente para lhe dar mais informações.`)
                stageNow = 'informacao'
                check(message, stageNow);
                clameSuport(message, client, null, stageNow);
                // Fazer verificação de caso cliente queira sair desse estágio.
            } else
            if (message.body === '3' && userStage.fase === 'nextCat') {
                await client.sendMessage(message.from, `Retornando ao menu.`)
                stageNow = 'menu_start';
                check(message, stageNow);
                console.log('[catalogo] usuário movido para o estágio: ', stageNow);
                await client.sendMessage(message.from, 'Para seguir com seu atendimento, por favor, responda com o número das opções abaixo: 🔽\n1️⃣. Catálogo 👗👙👘🩱\n2️⃣. Novidades 🔄\n3️⃣. Parceria 🤝\n4️⃣. Suporte 🧑‍💻⚠️\n5️⃣. Falar com atendente 👩‍💻📞');
            } else {
                client.sendMessage(message.from, `Opção inválida. Digite 1, 2 ou 3 para selecionar uma opção`);
                stageNow = 'informacao';
                help(message, client, stageNow);
            }
        }
}

module.exports = { responderComCatalogo, nextMsg};
