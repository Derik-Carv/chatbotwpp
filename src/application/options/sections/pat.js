const { data } = require('../../../../data/data');

let respPat = ``;
async function verificarPatrimonio(message) {
    try {

        let c = 1;
        let i = 0;
        let msg = ``;
        let setoresUnicos = new Set();
        // Concatenando os setores de cada item em 'data'
        data.forEach((item) => {
            console.log(item.Setor);

            // valida se setor foi adicionado ao Set
            if (!setoresUnicos.has(item.Setor)) {
                setoresUnicos.add(item.Setor); // adiconar setor
                console.log(setoresUnicos); 
                msg += `${c++}. ${item.Setor}\n`;
            }
        });

        // mensagem com a lista de setores
        respPat = `Escolha o Setor:\n${msg}`
    }
    catch (erro) { // 
        console.log(`[pat] ERROR! CERTIFIQUE-SE DE QUE A PLANILHA DO BANCO DE DADOS NÃO ESTÁ SENDO USADA. ${erro}`)
        console.log(`[pat] erro: ${erro}`)
    }
}

async function patSubMenu(message) {
    try {
        
    }
    catch (erro) { // 
        console.log(`[patSub] erro: ${erro}`)
    }
}

// async function optionsPatSub(message) {
//     console.log(`[patSubMenu] optionssubmenu in`);
   
//         if (message.body == '1') {
//             data.forEach((item)=>{
//                 console.log(`[patSubMenu] optionssubmenu ${item.Status}`);
//             })    
//         }
// }

verificarPatrimonio();

module.exports = {  verificarPatrimonio, respPat };