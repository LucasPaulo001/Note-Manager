const bcrypt = require('bcryptjs'); //requisição para o módulo de criptografia de senhas
const mongoose = require('mongoose');//requisição para o módulo de conexão com o banco de dados
const Schema = mongoose.Schema;//armazena a biblioteca do schema para podermos criar os moldes de armazenamento no banco de dados

// Definição do schema de usuário
const UserSchema = new Schema({
    nome: {
        type: String,
        required: false
    }, 
    email: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true  
    }
});

// Middleware para hash da senha antes de salvar
UserSchema.pre('save', async function(next) {
    // Verifica se a senha foi alterada ou é um novo usuário
    if (this.isModified('password')) {
        try {
            // Gera o salt com o nível de complexidade de 10
            const salt = await bcrypt.genSalt(10);
            // Hash da senha com o salt
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error); // Passa o erro para o próximo middleware
        }
    }
    next(); // Continua com o salvamento após a aplicação do hash
});

// Criação do modelo
mongoose.model('User', UserSchema);
