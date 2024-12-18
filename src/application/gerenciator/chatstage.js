// Definindo a classe Stage
class Stage {
    constructor(user, fase) {
        this.user = user;
        this.fase = fase;
    }
}

// Objeto para armazenar os estágios dos usuários
const stages = {};

async function chatStage(message, userId, stageNow) {
    //if (userId != '559188502326@c.us') {
        console.log('[chatstage] in use');
        // Verifica se já existe um estágio para o usuário
        let userStage = stages[userId];
        
        // Se não existir, cria um novo estágio para o usuário
        if (!userStage) {
            userStage = new Stage(userId, `menu_start`); // Usando a classe Stage
            stages[userId] = userStage; // Armazena no objeto
            console.log(`[chatstage] Estágio inicializado para o usuário ${userId}: ${userStage.fase}`);
        }
        
        console.log(`[chatstage] ${stageNow}`);
    //}
}

async function check(message, stageNow) {
    console.log('[check] in use');
    console.log('[check]', stageNow)
    Object.values(stages).forEach(userStage => {
        if (userStage.user === message.from) {
            userStage.fase = stageNow
            console.log(`[chatstage] user movido para ${stageNow}`)
        }
    })
}

module.exports = { chatStage, Stage, stages, check };
