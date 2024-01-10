const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const nome = args['nome']

const idade = args['idade']

const profissao = args['profissao']

console.log(`Nome: ${nome} , idade: ${idade} , profissao: ${profissao}`)