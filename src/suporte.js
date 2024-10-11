async function clameSuport(a, client) { // FUNÇÃO QUE INICIA A CHAMADA AO ATENDIMENTO.
    // NÚMERO PARA ENVIAR A MENSAGEM (FORMATO INTERNACIONAL)
    const phoneNumberDerik = '559188502326';  // Substitua pelo número desejado
    const phoneNumberHelen = '559185039235';  // Substitua pelo número desejado
    const messageSuporte = 'ATENÇÃO, cliente aguardando seu SUPORTE!';
    const messageAtendente = 'Temos um cliente aguardando seu atendimento!';
    const messageSite = 'Alguém quer INFORMAÇÃO vinda do site.'
    const messageEncomenda = `Você recebeu uma nova encomenda`
    const messagePedido = `COMPRA SOLICITADA! Temos um pedido feito diretamente pelo site.`

    if(a.body === `4`) {
         // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSuporte)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageSuporte)
    }
    else
        if (a.body === '5') {
        // Função para enviar a mensagem
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageAtendente)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageAtendente)
    }
    else
        if (a.body && a.body.match(/\binformar\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageSite)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageSite)
    }
    else
        if (a.body && a.body.match(/\bencomenda\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messageEncomenda)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messageEncomenda)
    } else 
        if (a.body && a.body.match(/\bpedido\b.*\bno\b.*\bseu\b.\bsite\b/i)) {
        await client.sendMessage(`${phoneNumberDerik}@c.us`, messagePedido)
        await client.sendMessage(`${phoneNumberHelen}@c.us`, messagePedido)
    }
}

module.exports = { clameSuport }