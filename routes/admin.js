const express = require('express')
const mongoose = require('mongoose')
const route = express.Router()
require('../models/User')
const path = require('path')
const User = mongoose.model('User')
const pathLocal = path.join(__dirname, 'public', 'home.html')
const bcrypt = require('bcryptjs')
const session = require('express-session')

console.log(pathLocal)
//rotas
    route.get('/admin', (req, res) => {

        // Passando o nome do usuário para a página
        if (req.session.user) {
            res.render('admin/home', { nome: req.session.user });
        } else {
            res.redirect('/login'); // Caso o usuário não esteja logado, redireciona para o login
        }

    
    })
    route.get('/cadastro', (req, res) => {
        res.render('admin/cadastro')
    })

    //Carrega a página do front
    route.get('/login', (req, res) => {
        res.render('admin/login')
    })
    //Definição da rota de login/Requisita os dados para serem tratados no backend
    route.post('/login', async (req, res) => {
        const { email, password } = req.body; // Extrai os dados do corpo da requisição
        try {
            // Verifica se o usuário existe
            const user = await User.findOne({ email });
            //Caso não exista emite o erro
            if (!user) {
                return res.status(400).send('Usuário não encontrado!');
            }

            // Verifica se a senha está correta
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Senha incorreta!');
            }
            
            req.session.user = user.nome;
            
            res.render('admin/home')
        } catch (error) {
            res.status(500).send('Erro ao fazer login: ' + error.message);
        }
    })
    // Rota de cadastro (POST)
    route.post('/cadastro/add', async (req, res) => {
        const { name, email, password } = req.body;

        try {
            // Verifica se o e-mail já está cadastrado
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send('Usuário já cadastrado!');
            }

            // Gera o hash da senha antes de salvar
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria um novo usuário
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            res.status(201).send('Usuário cadastrado com sucesso!');
        } catch (error) {
            res.status(500).send('Erro ao cadastrar usuário: ' + error.message);
        }
    });

module.exports = route


