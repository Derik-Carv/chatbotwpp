const express = require('express');
const cors = require('cors');
const path = require('path');

let ligar = false;

const appExpress = express();

// Permitir arquivos estáticos
appExpress.use(express.static(path.join(__dirname, '..', '..', '..', 'public', 'app')));

// Configurar CORS
appExpress.use(cors({
    origin: '*',
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Middleware para JSON
appExpress.use(express.json());

// Rota para a página inicial
appExpress.get("/", (req, res) => {
    const filePath = path.join(__dirname, '..', 'app', 'index.html');
    res.sendFile(filePath);
});

// Rota para ligar o bot
appExpress.post('/ligar', (req, res) => {
    ligar = true;
    console.log('[server] Bot foi ligado.');
    res.json({ message: 'Bot Ligado!' });
});

// Rota para desligar o bot
appExpress.post('/desligar', (req, res) => {
    ligar = false;
    console.log('[server] Bot foi desligado.');
    res.json({ message: 'Bot Desligado!' });
});

// Rota para verificar o status do servidor
appExpress.get('/healthcheck', (req, res) => {
    res.status(200).send('Server On');
    console.log('[server] servidor online.');
});

// Rota para verificar o status do bot
appExpress.get('/status', (req, res) => {
    res.json({ ligar });
});

// Função para iniciar o servidor
async function startServer() {
    return new Promise((resolve, reject) => {
        appExpress.listen(5558, (error) => {
            if (error) {
                return reject(error);
            }
            console.log('[server] Servidor rodando em http://localhost:5558/');
            resolve();
        });
    });
}

module.exports = { startServer, getLigar: () => ligar, setLigar: (value) => { ligar = value } };
