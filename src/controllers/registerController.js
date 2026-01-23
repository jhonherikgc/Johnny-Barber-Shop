const Usuario = require('../models/usersModels');
const bcrypt = require('bcrypt');

exports.registerPage = (req, res) => {
  res.render('auth/register', { 
    titulo: 'Crie sua conta',
    erros: [] 
  });
};

exports.registerPost = async (req, res) => {
  try {
    const { email, password, full_phone } = req.body;
    const erros = [];

    // VALIDAÇÃO MANUAL
    if (!email) erros.push('E-mail é obrigatório.');
    if (!full_phone) erros.push('O campo de WhatsApp é obrigatório.');
    if (!password || password.length < 6) erros.push('A senha precisa ter pelo menos 6 caracteres.');

    if (erros.length > 0) {
      return res.render('auth/register', { titulo: 'Crie sua conta', erros });
    }

    const userExists = await Usuario.findOne({ email });
    if (userExists) {
      erros.push('Este e-mail já está cadastrado.');
      return res.render('auth/register', { titulo: 'Crie sua conta', erros });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const novoUsuario = new Usuario({
      email,
      telefone: full_phone,
      senha: hash
    });

    await novoUsuario.save();
    res.redirect('/login');

  } catch (e) {
    console.error(e);
    res.status(500).render('404');
  }
};