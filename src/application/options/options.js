const { clameSuport } = require('../interaction/suporte');
const { humanControl } = require('../interaction/ignorelist');
const { stages, check } = require('../gerenciator/chatstage');
const { Client } = require('whatsapp-web.js');

let responseDoubt = ``;

async function options(message, client) {
    console.log('[options] in use');
    
        Object.values(stages).forEach(userStage => {
            
            console.log(`[options] verificar error. mensagem: ${message.body}`)

                if (message.body === '1' && userStage.fase == 'menu_start') {
                    message.reply(`Dúvidas Frequentes:\n 01. Rede ou Conexão de internet\n02. E-mail\n03. AutoCAD\n04. Impressoras\n05. Licenças de Programas\n06. Outros.\n07. Voltar ao menu`);
                    check(message, stageNow = `doubt`);
                }
                if (message.body === '2' && userStage.fase == 'menu_start') {
                    console.log(`[options] opção 2`)
                    message.reply('01. Falha em meu equipamento.\n02. Falha em todo meu setor.\n03. Consultar estatus do servidor.\n04. Voltar ao menu.');
                    check(message, stageNow = 'checkingNetwork')
                }
                let explication;
                if (message.body === '3' && userStage.fase == 'menu_start') {
                    console.log(`[options] teste caralhouuu`)
                    client.sendMessage(message.from, `01. Criar usuário\n02. Esqueci login/senha\n03. O que é o Protheus?`)
                    check(message, stageNow = 'protheus')
                    explication = true;
                }
//                 if (message.body == '3' && userStage.fase == 'protheus' && explication){
//                     message.reply(`O que é o Protheus da TOTVS?\nO Protheus da TOTVS é um ERP personalizável desenvolvido para atender às necessidades de empresas de todos os segmentos.\n
// Para isso, a solução traz funcionalidades exclusivas para as áreas de finanças, produção, compras e vendas, recursos humanos e muito mais.\n
// Como é um sistema flexível, ele permite uma adequação à grande parte das necessidades do negócio, e ainda tem a possibilidade de integrações e novas personalizações do ambiente de trabalho.\n
// Em consequência, a ferramenta atende diversas empresas, desde a agroindústria ao setor de serviços.\n
// Hoje, são mais de 10 mil clientes aproveitando a flexibilidade do sistema e registrando 200 milhões de acessos em módulos por ano.`)
//                 }
                if (message.body === '4' && userStage.fase == 'menu_start') {
                    message.reply(message.from, 'O período de suporte é de 8h às 21h ⏰🧑‍💻👩‍💻, exceto aos domingos ❌📆. Aguarde, que estamos contatando um atendente. Obrigado pelo tempo. 🙌🕐');
                    //clameSuport(message, client);
                    //humanControl(message, client);
                }
                if (message.body === '5' && userStage.fase == 'menu_start') {
                    message.reply(message.from, 'O período de atendimento é de 8h às 21h ⏰🧑‍💻👩‍💻, exceto aos sábados & domingos ❌📆.');
                    client.sendMessage(message.from, `01. Criar E-mail\n02.Esqueci meu login/senha\n03. Solicitar Criação para terceiros`);
                   //clameSuport(message, client);
                    //humanControl(message, client);
                }
                
            })
}

module.exports = { options, responseDoubt };
