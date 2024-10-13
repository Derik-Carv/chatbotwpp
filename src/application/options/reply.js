const { options } = require('../options/opcoes.js');
const { clameSuport } = require('../interaction/suporte.js');
const { help } = require('../interaction/help.js')

async function reply(message, client, url) {
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
        help(message, client)
    }
}

module.exports = { reply }