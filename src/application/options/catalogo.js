const { stages } = require(`../gerenciator/chatstage`);

async function responderComCatalogo(message, client) {
    // Itera sobre cada usuário no objeto stages
    Object.values(stages).forEach(userStage => {
        console.log(userStage.user, userStage.fase, 'dentro catalgoooooooo')
        // Verifica se o usuário e o estágio estão corretos
        if (userStage.user === message.from && userStage.fase === 'catalogo') {
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

            // Envia a mensagem com o catálogo
            client.sendMessage(message.from, catalogMessage);
        }
    });
}

module.exports = { responderComCatalogo };
