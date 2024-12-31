const ping = require('ping');
const { check } = require('../../gerenciator/chatstage');

const ips = ['10.10.0.2', '10.10.0.146'];

async function pingServer(c) {
    let results = [];

    for (const ip of ips) {
        let times = [];

        for (let i = 0; i < 4; i++) { // Pingar 4 vezes
            const res = await ping.promise.probe(ip, { timeout: 2 });
            if (res.alive) {
                times.push(res.time); // Tempo em ms
            } else {
                times.push('timeout');
            }
        }

        results.push({ ip, times });
    }

    // Formata a resposta
    const response = results.map(result => {
        const { ip, times } = result;
        const hasTimeout = times.includes('timeout');
        let server = '';
        server = ip;
        if (!c){
            if (ip == '10.10.0.2'){
                server = 'Servidor Antigo'
            }
            if (ip == '10.10.0.146'){
                server = 'Servidor Novo'
            }
        }
        if (hasTimeout) {
            return `❌ SERVIDOR: ${server, times}\nERRO: Não foi possível se comunicar com o servidor: ${server}.`;
        }  else {
            return `✔️ SERVIDOR: ${server}\nTempo(ms): ${times.join(' | ')}`;
        }
    }).join('\n\n');

    return `Resultados do Ping:\n\n${response}`;
}

module.exports = { pingServer };