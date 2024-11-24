const API_URL = 'http://localhost:5558';

const btnOn = document.querySelector('#botOn');
btnOn.addEventListener('click', () => {
    console.log('click automático');
});

setTimeout(() => {
    btnOn.click();
}, 1000);


// Função para ligar/desligar o bot
async function toggleBot(ligar) {
    try {
        const response = await fetch(`${API_URL}/${ligar ? 'ligar' : 'desligar'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ligar })
        });

        const data = await response.json();
        document.getElementById('botStatus').textContent = `Status: ${ligar ? 'Ligado' : 'Desligado'}`;
        console.log('[frontend] Resposta do backend:', data.message);
    } catch (error) {
        console.error('[frontend] Erro ao conectar com o backend:', error);
        document.getElementById('botStatus').textContent = 'Status: Erro ao conectar';
    }
}

// Verificar o status do servidor
async function checkServerStatus() {
    try {
        const response = await fetch(`${API_URL}/healthcheck`);
        if (response.ok) {
            console.log('[frontend] Servidor Online');
            document.getElementById('serverStatus').textContent = 'Servidor: Online';
        } else {
            console.log('[frontend] Servidor Offline');
            document.getElementById('serverStatus').textContent = 'Servidor: Offline';
        }
    } catch (error) {
        console.error('[frontend] Erro de conexão:', error);
        document.getElementById('serverStatus').textContent = 'Servidor: Offline';
    }
}

// Adicionar eventos aos botões
document.querySelector('#botOn').addEventListener('click', () => toggleBot(true));
document.querySelector('#botOff').addEventListener('click', () => toggleBot(false));

// Verificar o status do servidor a cada 5 segundos
setInterval(checkServerStatus, 3000);

// Verificar o status do servidor ao carregar a página
checkServerStatus();