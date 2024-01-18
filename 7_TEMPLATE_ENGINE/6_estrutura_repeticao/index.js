const express = require('express')
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

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