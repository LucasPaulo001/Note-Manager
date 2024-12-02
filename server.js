//Importando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const admin = require('./routes/admin')
const session = require('express-session')

//Configurações
    //express
        const app = express()

    //Middleware para parse json e Middleware para parse de dados de formulários
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    //handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
        app.set('views', __dirname + '/views')

    //Configuração do mongoose (conexão ao banco de dados - appnotas)
        mongoose.connect('mongodb://localhost/appnotas').then(() => {
            console.log("Conectado ao mongodb")
        }).catch((error) => {
            console.log(`Erro ao se conectar com o mongodb, erro: ${error}`)
        })

    //Configuração da pasta public
    app.use(express.static(path.join(__dirname, 'public')))

    // Configuração do session
    app.use(session({
        secret: 'nadademaisaquiapenasalgosecreto',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Para ambientes de desenvolvimento, defina como false
    }));

    //rotas
    app.use('/admin', admin)

//Conexão com o servidor express
const PORT = 8081
app.listen(PORT, () => {
    console.log(`(Em desenvolvimento...), Conexão ao servidor feita com sucesso: PORTA: ${PORT}`)
})


    
