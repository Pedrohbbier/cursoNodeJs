const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates') //acessar html

const checkAuth = function(req , res , next){

    req.authStatus = true //está logado ou não

    if(req.authStatus){
        console.log('Está logado, pode continuar')
        next() //deixar o user ir para a próxima etapa
    } else {
        console.log('Não está logado, faça o login para continuar')
        res.sendFile(`${basePath}/semLogin.html`)
    }

}

app.use(checkAuth)

app.get('/' , (req , res)=>{

    res.sendFile(`${basePath}/index.html`) //envia o index.html

})

app.listen(port , ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})