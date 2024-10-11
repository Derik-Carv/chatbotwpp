// FUNÇÃO QUE CRIA A RESPOSTA COM OS DADOS DO CATÁLOGO
async function responderComCatalogo (message, client) {
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

module.exports = { responderComCatalogo }