const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates') //acessar html

app.get('/' , (req , res)=>{

    res.sendFile(`${basePath}/index.html`) //envia o index.html

})

app.get('/users/create' , (req , res)=>{
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save' , (req , res)=>{

    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome é ${name} e tem ${age} anos`)

    res.sendFile(`${basePath}/userform.html`)

})

app.listen(port , ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})