const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize1' , 'root' , '' , {
    host:'localhost',
    dialect:'mysql'
})

//try {
//    sequelize.authenticate()
//    console.log('Conectamos com sucesso com o Sequelize!')
//} catch {
//    console.log('Não foi possível conectar' , error)
//}

module.exports = sequelize