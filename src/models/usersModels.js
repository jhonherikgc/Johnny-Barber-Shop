const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true // evita emails duplicados
  },
  telefone: {
   type: String,
   required: true,
   unique: true
  },
  senha: { 
    type: String, 
    required: true 
  },
  criadoEm: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Usuario', userSchema);