const chalk = require("chalk")

let nota = 9

if(nota >= 7){
    console.log(chalk.green('Parabéns, você esta aprovado'))
} else {
    console.log(chalk.bgRed('Você precisa fazer a prova de recuperação'))
}