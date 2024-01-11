const http = require("http")
const fs = require("fs")

const port = 3000

const server = http.createServer((req , res)=>{

    const urlInfo = require("url").parse(req.url , true)
    const name = urlInfo.query.name
    const idade = urlInfo.query.idade

    if(!name && !idade){
        fs.readFile('index.html' , function(err , data){
            res.writeHead(200, {'Content-Type':'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        fs.writeFile("arquivo.txt" , `O nome é ${name} e tem ${idade} anos` , function(err , data){
            res.writeHead(302, {
                location: '/'
            })
            return res.end()
        })
    }

}) 

server.listen(port , ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})