//Importando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')

//Configurações
    //express
        const app = express()

    //Middleware para parse json e Middleware para parse de dados de formulários
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    //handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebalrs')
        app.set('views', __dirname + '/views')

    //Configuração do mongoose (conexão ao banco de dados - appnotas)
        mongoose.connect('mongodb://localhost/appnotas').then(() => {
            console.log("Conectado ao mongodb")
        }).catch((error) => {
            console.log(`Erro ao se conectar com o mongodb, erro: ${error}`)
        })

    //rotas

//Conexão com o servidor express
const PORT = 8081
app.listen(PORT, () => {
    console.log(`(Em desenvolvimento...), Conexão ao servidor feita com sucesso: PORTA: ${PORT}`)
})


    
