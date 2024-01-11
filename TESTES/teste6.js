const http = require("http")
const port = 3000
const fs = require("fs")

const server = http.createServer((req , res)=>{

    const urlInfo = require("url").parse(req.url , true)

    const name = urlInfo.query.name

    if(!name){
    fs.readFile('teste6.html' , (err , data)=>{
        res.writeHead( 200 , {'Content-Type':'text/html'} ,)
        res.write(data)
        return res.end()
    })} else {
        fs.readFile('teste6.html' , (err , data)=>{
            res.writeHead( 200 , {'Content-Type':'text/html'} ,)
            res.write(`O nome e ${name}`)
            return res.end()
        })
    }

})

server.listen(port , ()=>{
    console.log('Servidor rodando')
})