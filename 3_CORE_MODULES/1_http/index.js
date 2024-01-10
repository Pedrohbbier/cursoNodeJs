const http = require("http")

const port = 3000

const server = http.createServer((req , res)=>{ //requisição e resposta
    res.write('Oi http')
    res.end() //tem que finalizar para não carregar infinitamente
})

server.listen(port , ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})