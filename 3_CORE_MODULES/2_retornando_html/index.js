const http = require ("http")

const port = 3000

const server = http.createServer((req , res)=>{
    res.statusCode = 200 //ok
    res.setHeader('Content-Type' , 'text/html')
    res.end('<h1>Primeiro server com HTML</h1>')
})

server.listen(port , ()=>{
    console.log(`Servidor rondando na porta: ${port}`)
})