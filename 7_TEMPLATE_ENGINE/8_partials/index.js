const express = require('express')
const exphbs = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.get('/blog' , (req , res)=>{
    const posts=[
        {
            title:'Aprender node.js',
            category:'JavaScript',
            body:'Teste',
            comments:4
        },
        {
            title:'Aprender php',
            category:'php',
            body:'Teste',
            comments:2
        },
        {
            title:'Aprender java',
            category:'java',
            body:'Teste',
            comments:3
        }
    ]

    res.render('blog' , {posts})

})

app.get('/post' , (req , res)=>{
    const post = {
        title:'Aprender node.js',
        category: 'JavaScript',
        body:'Este artigo vai te ajudar a aprender node.js',
        comments:'4'
    }

    res.render('blogpost' , {post})

})

app.get('/dashboard' , (req , res)=>{
    res.render('dashboard')
})

app.get('/' , (req , res)=>{

    const items = ["Item a" , "Item b" , "Item c"]

    res.render('dashboard' , {items}  )
})

app.listen(3000 , ()=>{
    console.log('Servidor rodando')
})