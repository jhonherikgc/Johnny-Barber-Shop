const Usuario = require('../models/usersModels');
const validator = require('../validation/validation');

// Renderiza a página de registro (GET)
exports.registerPage = (req, res) => {
  res.render('auth/register', {
    titulo: 'Registro - Johnny Barber Shop',
    messages: {} // Enviamos um objeto vazio para não dar erro no EJS
  });
};

// Processa os dados do formulário (POST)
exports.registerPost = async (req, res) => {
  try {
    // 1. Pega os dados do formulário (req.body) e envia para validar
    const erros = validator.validarRegistro(req.body);

    // 2. Se houver erros de validação (e-mail inválido, senha curta, etc)
    if (erros.length > 0) {
      return res.render('auth/register', {
        titulo: 'Registro - Johnny Barber Shop',
        messages: { error: erros.join(' | ') } 
      });
    }

    // 3. Tenta criar o novo usuário no MongoDB
    const novoUsuario = new Usuario({
      email: req.body.email,
      telefone: req.body.full_phone, 
      senha: req.body.password 
    });

    await novoUsuario.save();

    // 4. Se salvou com sucesso, redireciona para o login
    console.log('Usuário cadastrado com sucesso:', novoUsuario.email);
    res.redirect('/login');

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);

    // Tratamento para e-mail duplicado (Erro 11000 do MongoDB)
    if (error.code === 11000) {
      return res.render('auth/register', {
        titulo: 'Registro',
        messages: { error: 'Este e-mail já está em uso.' }
      });
    }

    // Erro genérico do servidor
    res.status(500).render('404');
  }
};