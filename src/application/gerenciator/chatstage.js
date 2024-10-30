// Definindo a classe Stage
class Stage {
    constructor(user, fase) {
        this.user = user;
        this.fase = fase;
    }
}

// Objeto para armazenar os estágios dos usuários
const stages = {};

async function chatStage(message, userId) {
    // Verifica se já existe um estágio para o usuário
    let userStage = stages[userId];

    // Se não existir, cria um novo estágio para o usuário
    if (!userStage) {
        userStage = new Stage(userId, `menu_start`); // Usando a classe Stage
        stages[userId] = userStage; // Armazena no objeto
        console.log(`Estágio inicializado para o usuário ${userId}: ${userStage.fase}`);
    }

    // Log para verificar se o usuário não é o atual
    Object.keys(stages).forEach(item => {
        if (item !== userId) {
            console.log(`Usuário ${item} não é o usuário atual.`);
        }
    });
}

module.exports = { chatStage, Stage, stages };
