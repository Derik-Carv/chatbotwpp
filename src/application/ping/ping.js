const ping = require('ping');

const newServerOyamota = `10.10.0.146`;
let statusServer;

async function pingStts() {
    
            try {
                console.log(`[ping] Pingando para o novo servidor ${newServerOyamota}`)                
                const res = await ping.promise.probe(newServerOyamota);
                console.log(res.alive.valueOf);
                if(res.alive === true){
                    statusServer = `Novo Servidor Online: ${newServerOyamota}`;
                }
                if (res.alive === false) {
                    statusServer = `Novo Servidor Offline: ${newServerOyamota}`;
                }
                return statusServer
            }
            catch (error){
                console.log(`Erro ao tentar pingar: `, error)
                return `Erro ao tentar pingar pro servidor`;
            }
}

module.exports = { pingStts };