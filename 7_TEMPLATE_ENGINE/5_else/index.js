const express = require('express')
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.get('/dashboard' , (req , res)=>{
    res.render('dashboard')
})

app.get('/' , (req , res)=>{

    const user = {
        name: 'Pedro',
        lastName: 'Bier',
    }

    const auth = false

    const approved = false

    res.render('home' , {user: user , auth , approved}) //chave e valor
})

app.listen(3000 , ()=>{
    console.log('Servidor rodando')
})