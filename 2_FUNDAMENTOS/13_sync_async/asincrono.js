const fs = require("fs")

console.log("Início")

fs.writeFile("arquivo.txt" , "oi" , function(){
    setTimeout(function(){ //a função setTimeOut é asincrona
        console.log("Arquivo criado")
    } , 2000)
})

console.log("fim")


