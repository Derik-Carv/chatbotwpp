const express = require('express');
const cors = require('cors');
const app = express();
const clientside = 'http://localhost:5570';

let ligar = false;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", clientside);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(cors({
    origin: clientside,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());

app.post('/', (req, res) => {
    ligar = req.body.ligar;
    console.log('Dados recebidos do frontend:', ligar);
    if (ligar) {
        console.log('Bot foi ligado.');
    } else {
        console.log('Bot foi desligado.');
    }
    res.json({ message: ligar ? 'Bot Ligado!' : 'Bot Desligado!' });
});

app.get('/healthcheck', (request, response)=>{
    response.status(200).send('Server On')
});

app.get('/status', (request, response) => {
    response.json({ ligar });
});

function server() {
    return new Promise((resolve, reject) => {
        app.listen(5558, (error) => {
            if (error) {
                return reject(error);
            }
            console.log(`http server rodando... \n url: http://localhost:5558/ \n`);
            resolve();
        });
    });
}

module.exports = { server, getLigar: () => ligar, setLigar: (value) => { ligar = value } };
