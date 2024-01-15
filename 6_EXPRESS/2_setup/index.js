const express = require('express')
const app = express()
const port = 3000

app.get('/', (req , res)=>{ //requisição vem do user e resposta envia para o user

    res.send('Hello, world!')

} )

app.listen(port , ()=>{
    console.log(`App rodando na porta ${port}`)
})