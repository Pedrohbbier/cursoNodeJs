const {DataTypes} = require('sequelize')

const db = require('../db/conexao')

const User = require('./User')

const Adress = db.define('Adress' , {

    street:{
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city:{
        type: DataTypes.STRING,
        required: true,
    }
})

Adress.belongsTo(User) //endereço pertençe ao usuário

module.exports = Adress