class IgnoreList {
    constructor() {
        this.ignore = {}; // Objeto para armazenar os usuários ignorados
    }

    addUser(user) {
        this.ignore[user] = true; // Marca o usuário como ignorado
        ignoreActionOn = true;
    }

    ignoredUser(user) {
        return this.ignore[user] || false;
    }

    removeIgnore(user) {
        delete this.ignore[user]; // Remove o usuário da lista de ignorados
        human = false;
        ignoreActionOn = false;
        return ignoreActionOn, human;
    }

    listUsers() {
        return Object.keys(this.ignore); // Retorna todos os usuários ignorados
    }
}

let ignoreActionOn = false;
let human = false;
const ignoreNow = new IgnoreList();

async function humanControl(message, client) {
    console.log('[ignoreList] verificando se usuário já está listado como ignorado...')
    const user = message.from;
    console.log('[ignoreList] ', ignoreNow.listUsers().includes(user), 'list')
    console.log('[ignoreList] ',user, 'user')
    if (ignoreNow.listUsers().includes(user) === false) {
        console.log('[ignoreList] Começando a ignorar usuário.');
        // Adiciona o usuário à lista de ignorados
        ignoreNow.addUser(user);
        human = true;

        // Exibe a lista de usuários ignorados no console
        console.log("[ignoreList] Usuários ignorados atualmente:", ignoreNow.listUsers());

            if (ignoreActionOn === true) {
                setTimeout(() => {
                    ignoreNow.removeIgnore(user);
                    console.log('[ignoreList] Usuário removido da lista de ignorados.');

                    // Exibe a lista de usuários ignorados após a remoção
                    console.log("[ignoreList] Usuários ignorados atualmente:", ignoreNow.listUsers());
                }, 3600000); // 1 hora para remover o usuário da lista
            }
    } else if (ignoreNow.listUsers().includes(user) === true) {
        console.log(`[ignoreList] usuário encontrado em lista de ignorados...`);
        client.sendMessage(message.from, `Caso deseje voltar o atendimento automático, basta responder com "Sim". \n Caso contrário, aguarde o atendimento.`)
        console.log('[ignoreList] ', message.body)
    }
}

module.exports = { humanControl };
