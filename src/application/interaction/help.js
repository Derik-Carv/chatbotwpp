const { clameSuport } = require("./suporte")

let responseNew = false
mensagemAtual = ''
mensagemAnterior = [
    {
        id: '',
    }
]

async function help(message, client, stageNow) {
    console.log('[help] in use');
    if (!stageNow) {
        if (Boolean(mensagemAtual === '') === true) {
        await client.sendMessage(message.from, `Para o atendimento automático, utilize mensagem por escrito! ✍️📝`)
        mensagemAtual = message.id.id
        } else 
            if (Boolean(mensagemAtual === '') === false && responseNew === false) {
                await client.sendMessage(message.from, `Está sendo dificil de iniciar um atendiemnto automático? ✍️📝 pode escrever literalmente qualquer coisa que o atendimento irá iniciar.`)
                mensagemAtual = message.id.id
                responseNew = true
        } else
            if (Boolean(mensagemAtual === '') === false && responseNew === true) {
                await client.sendMessage(message.from, `Caso esteja tendo dificuldade no atendimento, pode mandar um audio 🎙️, ou até foto 📷 que do que deseja. Iremos contatar um atendente para lhe ajudar. 👩‍💻🧑‍💻`)
                mensagemAtual = message.id.id
                clameSuport (message, client, responseNew)
        }
        mensagemAnterior = mensagemAtual
    } else {
            if (Boolean(mensagemAtual === '') === true && stageNow) {
                    await message.reply('A qualquer dificuldade, sinalize!')
            } else
                if (Boolean(mensagemAtual === '') === true) {
                    await client.sendMessage(message.from, `Digite 3 para ir ao menu, ou selecione as opções 01.Fazer Pedido ou 02.Perguntar sobre Produto! ✍️📝`)
                    mensagemAtual = message.id.id
            } else 
                if (Boolean(mensagemAtual === '') === false && responseNew === false) {
                    await client.sendMessage(message.from, `Está sendo dificil de continuar com o atendiemnto automático? ✍️📝 tente selecionar a opções ditas acima!`)
                    mensagemAtual = message.id.id
                    responseNew = true
            } else
                if (Boolean(mensagemAtual === '') === false && responseNew === true) {
                    await client.sendMessage(message.from, `Caso esteja tendo dificuldade no atendimento, pode mandar um audio 🎙️, ou até foto 📷 que do que deseja. Estamos contatando um atendente para lhe ajudar. 👩‍💻🧑‍💻`)
                    mensagemAtual = message.id.id
                    clameSuport (message, client, responseNew)
            }
            mensagemAnterior = mensagemAtual
    }
    
}

module.exports = { help }