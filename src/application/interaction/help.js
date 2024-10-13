const { clameSuport } = require("./suporte")

let responseNew = false
mensagemAtual = ''
mensagemAnterior = [
    {
        id: '',
    }
]

async function help(message, client) {
    console.log(message.id.id)
    if (Boolean(mensagemAtual === '') === true) {
        await client.sendMessage(message.from, `Para o atendimento automático, utilize mensagem por escrito!`)
        mensagemAtual = message.id.id
    } else 
        if (Boolean(mensagemAtual === '') === false && responseNew === false) {
            await client.sendMessage(message.from, `Está sendo dificil de iniciar um atendiemnto automático? pode escrever literalmente qualquer coisa que o atendimento irá iniciar.`)
            mensagemAtual = message.id.id
            responseNew = true
    } else
        if (Boolean(mensagemAtual === '') === false && responseNew === true) {
            await client.sendMessage(message.from, `Caso esteja tendo dificuldade no atendimento, pode mandar um audio, imagem, até foto que do que deseja. Iremos contatar uma atendente para lhe ajudar.`)
            mensagemAtual = message.id.id
            clameSuport (message, client, responseNew)
    }
    mensagemAnterior = mensagemAtual
}

module.exports = { help }