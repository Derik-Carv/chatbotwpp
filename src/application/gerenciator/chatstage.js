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

    // Verifica se o estágio do usuário é 'menu_start'
    if (userStage.fase === `menu_start`) {
        if (message.body === `1`) {
            userStage.fase = `catalogo`; // Atualizando para 'catalogo'
            console.log(`Troca de estágio: ${userId} de menu_start para catalogo`);
        }
    } 
    // Verifica se o estágio do usuário é 'catalogo'
    else if (userStage.fase === `catalogo`) {
        if (message.body === `2`) {
            userStage.fase = `menu_start`; // Atualizando para 'menu_start'
            console.log(`Troca de estágio: ${userId} de catalogo para menu_start`);
        }
    }

    // Log para verificar se o usuário não é o atual
    Object.keys(stages).forEach(item => {
        if (item !== userId) {
            console.log(`Usuário ${item} não é o usuário atual.`);
        }
    });
}

module.exports = { chatStage, Stage, stages };
