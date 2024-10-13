const { createServer } = require('node:http') // utilizando as bibliotecas nativas
const { once } = require('node:events')

async function server() {
    async function HttpHandler(request, response) {
        try {
            const data = await once(request, 'data')
            response.writeHead(200)  // ver detalhes no site http cats
            response.end('Requisição recebida com sucesso...')
        } catch (e) {
            response.writeHead(500)
        }
    }

    const app = createServer(HttpHandler) // Essa função fala para o Node.js: “Crie um servidor!”.
        .listen(4445) // define a porta que vai rodar.
        .on('listening', () => console.log('http server rodando...'))
        //define um ouvinte para o evento 'listening'. Quando o servidor estiver ouvindo na porta especificada, a função de retorno de chamada será executada e imprimirá a mensagem
    return app
}

module.exports = { server }