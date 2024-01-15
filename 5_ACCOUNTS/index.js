//modulos externos
const inquirer = require("inquirer")
const chalk = require("chalk")

//modulos internos
const fs = require("fs")

operation()


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
            getAccountBalance()
        }else if(action == 'Depositar'){
            deposit()
        }else if(action == 'Sacar'){
            withDraw()
        }else if(action == 'Sair'){
            exit()
        }

    }).catch((err)=>{console.log(err)})

}

//create an account
function createAccount(){
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco"))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}


function buildAccount(){

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        },
        {
            name:'password',
            message:'Crie uma senha de no mínimo seis digitos!'
        }
        ]).then((answer)=>{

        const accountName = answer['accountName']

        const password = answer['password']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black(`Esta conta ${accountName} já existe, escolha outro nome!`))
            buildAccount()
            return
        }

        if(password.length < 6){
            console.log(chalk.bgRed.black(`Sua senha precisa ter 6 digitos ou mais, começe a criação da conta novamente`))
            buildAccount()
            return
        }

        let data = {
            balance: 0,
            password: password
        };

        fs.writeFileSync(`accounts/${accountName}.json` , JSON.stringify(data) , function(err){
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
    },
    {
        name: 'password',
        message: 'Digite a sua senha!!!'
    }
]).then((answer)=>{

        const accountName = answer['accountName']

        const inputPassword  = answer['password']

        //verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }

        if(!checkPassword(accountName , inputPassword)){
            return deposit()
        }

        inquirer.prompt([{
            name:'amount',
            message: 'Quanto você deseja depositar'
        }]).then(answer=>{

            const amount = answer['amount']

            //add an amount

            addAmount(accountName , amount)


            operation()

        })

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

//add an amount
function addAmount (accountName , amount){

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))

}

function getAccount(accountName){
        const accountJSON = fs.readFileSync(`accounts/${accountName}.json` , {
            encoding: 'utf8',
            flag: 'r'
        })

        return JSON.parse(accountJSON)

}

//show account balance

function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    },
    {
        name: 'password',
        message: 'Digite a sua senha!!!'
    }
]).then(answer=>{

        const accountName = answer['accountName']

        const inputPassword  = answer['password']

        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        if(!checkPassword(accountName , inputPassword)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Ola, o saldo da sua conta é de R$${accountData.balance}`))

        operation()

    }).catch(err=>console.log(err))
}

//withDraw an amount from user account

function withDraw(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual o nome da sua conta? '
    },
    {
        name: 'password',
        message: 'Digite a sua senha!!!'
    }
]).then((answer=>{

        const accountName = answer['accountName']

        const inputPassword  = answer['password']


        if(!checkAccount(accountName)){
            return withDraw()
        }


        if(!checkPassword(accountName , inputPassword)){
            return getAccountBalance()
        }

        inquirer.prompt([{
            name:'ammount',
            message:'Quanto você deseja sacar?'
        }]).then(answer=>{

            const ammount = answer.ammount

            removeAmount(accountName , ammount)

        }).catch(err=>console.log(err))

    }))
}

function removeAmount(accountName , ammount){

    const accountData = getAccount(accountName)

    if(!ammount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return operation()
    }

    if(accountData.balance < ammount){
        console.log(`Valor indisponivel, você está tentando sacar R$${ammount}, porém só tem R$${accountData.balance} disponível!`)
        return operation()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(ammount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        }
    )

    console.log(`Foi realizado um saque de R$${ammount} da sua conta!`)

    operation()



}

function checkPassword(accountName , inputPassword){
    let data = fs.readFileSync(`accounts/${accountName}.json`, 'utf8');

    let account = JSON.parse(data)

    if(account.password === inputPassword ){
        return true
    } else {
        console.log(chalk.bgRed.black('Senha incorreta, tente novamente!'))
        return false
    }
}