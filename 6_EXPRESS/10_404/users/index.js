const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates') //acessar html

router.get('/create' , (req , res)=>{ //aqui não precisa do /users
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save' , (req , res)=>{

    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O nome é ${name} e tem ${age} anos`)

    res.sendFile(`${basePath}/userform.html`)

})

module.exports = router