const express = require('express')
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.get('/' , (req , res)=>{

    const user = {
        name: 'Pedro',
        lastName: 'Bier'
    }

    res.render('home' , {user: user}) //chave e valor
})

app.listen(3000 , ()=>{
    console.log('Servidor rodando')
})