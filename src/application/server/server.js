const express = require('express');
const port = 7676;
const { data } = require('../../../data/data')

const appExpress = express();

// Função para iniciar o servidor
async function startServer() {
        appExpress.get('/patrimonios', (req, res)=>{
            res.send(data);
        })

        appExpress.listen(port, (error) => {
            if (error) {
                return reject(error);
            }
            console.log(`[server] Servidor rodando em http://localhost:${port}/`);
        });
}

module.exports = { startServer };
