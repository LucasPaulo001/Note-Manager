const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
