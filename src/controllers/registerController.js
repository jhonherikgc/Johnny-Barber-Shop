const Usuario = require('../models/usersModels');
const validator = require('../validation/validation');
const bcrypt = require('bcrypt');

exports.registerPage = (req, res) => {
  res.render('auth/register', { titulo: 'Registro', messages: {} });
};

exports.registerPost = async (req, res) => {
  try {
    const { email, password, full_phone } = req.body;
    const erros = validator.validarRegistro(req.body);

    if (erros.length > 0) {
      return res.render('auth/register', { titulo: 'Registro', messages: { error: erros.join(' | ') } });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(password, salt);

    const novoUsuario = new Usuario({
      email,
      telefone: full_phone,
      senha: senhaHash // Salvando como "senha" para bater com o Model
    });

    await novoUsuario.save();
    res.redirect('/login');
  } catch (e) {
    console.error(e);
    res.status(500).render('404');
  }
};