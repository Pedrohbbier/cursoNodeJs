const express = require("express")
const app = express()
const exphs = require('express-handlebars')

app.engine('handlebars' , exphs.engine())
app.set('view engine' , 'handlebars')

app.use(express.static('public'))

const products = [
    {name:'sabonete'},
    {name:'shampoo'},
    {name:'condicionador'},
    {name:'escova de dente'},
    {name:'pasta de dente'}
]

app.get('/products/:name' , (req , res)=>{

    let name = req.params.name

    res.render('productsFinal' , {layout:false , name})
    

})

app.get('/' , (req , res)=>{

    res.render('products' , {layout:false , products } )

})

app.listen(3000 , ()=>{
    console.log('Rodando')
})