const { check } = require("../gerenciator/chatstage");

async function clameSuport(a, client, responseNew, stageNow) { // FUNÇÃO QUE INICIA A CHAMADA AO ATENDIMENTO.
    // NÚMERO PARA ENVIAR A MENSAGEM (FORMATO INTERNACIONAL)
    const phoneNumberDerik = '559188502326';  // Substitua pelo número desejado
    const messageSuporte = 'ATENÇÃO, cliente aguardando seu SUPORTE!';
    const messageAtendente = 'Temos um cliente aguardando seu atendimento!';
    const messageSite = 'Cliente deseja INFORMAÇÃO no atendimento.'
    const messageEncomenda = `Você recebeu uma nova encomenda`
    const messagePedido = `COMPRA SOLICITADA! Temos um novo pedido solicitado!.`
    const messageHelp = `CLIENTE PRECISA DE AJUDA. URGENTE! \n Cliente está tendo dificuldade em entender a forma de atendimento.`

    console.log('[suporte] in use', stageNow)

    if(a.body === `4`) {
         // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSuporte)
    }
    else
        if (a.body === '5') {
        // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageAtendente)
    }
    else
        if ((a.body && a.body.match(/\binformar\b/i)) || stageNow === 'informacao') {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSite)
        stageNow = 'humanControl'
        check(a, stageNow)
    }
    else
        if (responseNew === true) {
            await client.sendMessage(`${phoneNumberDerik}@c.us`, messageHelp)
        }
    else
        if ((a.body && a.body.match(/\bencomenda\b/i)) || stageNow === 'atendimento') {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageEncomenda)
        stageNow = 'humanControl'
        check(a, stageNow)
    } else 
        if (a.body && a.body.match(/\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messagePedido)
    }
}

module.exports = { clameSuport }