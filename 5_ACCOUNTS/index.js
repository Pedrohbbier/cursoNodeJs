//modulos externos
const inquirer = require("inquirer")
const chalk = require("chalk")

//modulos internos
const fs = require("fs")

languageStart()

//choose the language
function languageStart(){
    inquirer.prompt([{
        type: 'list',
        name:'language',
        choices: [
            'Portugues',
            'English'
        ]
    }]).then(answer=>{
        const language = answer['language']

        if(language == 'Portugues'){
            operation()
        } else {
            operationEn()
        }

    }).catch(err=>console.log(err))
}

function operation(){
    
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message : 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer)=>{
        const action = answer['action']

        if(action == 'Criar conta'){
            createAccount()
            buildAccount()
        }else if(action == 'Consultar'){

        }else if(action == 'Depositar'){
            deposit()
        }else if(action == 'Sacar'){

        }else if(action == 'Sair'){
            exit()
        }

    }).catch((err)=>{console.log(err)})

}

function operationEn(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message : 'What do you want to do?',
        choices: [
            'Create account',
            'Check',
            'Deposit',
            'Withdraw',
            'Exit'
        ]
    }]).then((answer)=>{
        const action = answer['action']

        if(action == 'Create account'){
            createAccountEn()
            buildAccountEn()
        }else if(action == 'Check'){

        }else if(action == 'Deposit'){
            depositEn()
        }else if(action == 'Withdraw'){

        }else if(action == 'Exit'){
            exitEn()
        }

    }).catch((err)=>{console.log(err)})
}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco"))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}

function createAccountEn(){
    console.log(chalk.bgGreen.black("Congratulations on choosing our bank"))
    console.log(chalk.green('Set your account options below'))
}

function buildAccount(){

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da sua conta:'
    }]).then((answer)=>{
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black(`Esta conta ${accountName} já existe, escolha outro nome!`))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json` , '{"balance": 0}' , function(err){
            console.log(err)
        })

        console.log(chalk.green('Parabéns a sua conta foi criada!'))
        operation()
    }).catch((err)=>{console.log(err)})
}

function buildAccountEn(){

    inquirer.prompt([{
        name: 'accountName',
        message: 'Type your account name:'
    }]).then((answer)=>{
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black(`This account ${accountName} already exists, choose another name!`))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json` , '{"balance": 0}' , function(err){
            console.log(err)
        })

        console.log(chalk.green('Parabéns a sua conta foi criada!'))
        operation()
    }).catch((err)=>{console.log(err)})
}

//exit
function exit(){
    console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
    process.exit()
}

//add an amount to user account
function deposit(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer)=>{

        const accountName = answer['accountName']

        //verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }

    }).catch(err=>console.log(err))
}

////verify if account exists
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black(`Esta conta ${accountName} não existe, escolha outro nome! `))
        return false
    }
    return true
}