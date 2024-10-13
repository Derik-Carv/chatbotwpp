const btnOn = document.querySelector('#botOn')
btnOn.addEventListener('click', () =>{
    const { startBot }  = require('../start/index')
    console.log(startBot)
})