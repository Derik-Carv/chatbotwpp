const { exec } = require('child_process');

function restartScript() {
    exec('node seuScript.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao reiniciar o script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erro no script: ${stderr}`);
            return;
        }
        console.log(`Script reiniciado com sucesso: ${stdout}`);
    });
}

// Exemplo de uso: Reiniciar o script após 5 segundos
setTimeout(restartScript, 5000);

module.exports = { restartScript }