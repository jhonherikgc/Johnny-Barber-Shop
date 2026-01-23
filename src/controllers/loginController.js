const Usuario = require('../models/usersModels');
const validator = require('../validation/validation');
const bcrypt = require('bcrypt');

const loginPage = (req, res) => {
  res.render('auth/login', {
    titulo: 'Login - Johnny Barber Shop',
    erros: []
  });
};

const loginPost = async (req, res) => {
  try {
    // Pegamos exatamente o que vem do formulário
    const { email, senha } = req.body;

    // LOG PARA TESTE: Verifique no seu terminal se a senha aparece
    console.log(`Tentativa de login: ${email} | Senha recebida: ${senha ? 'SIM' : 'NÃO'}`);

    // 1. Validação (Passando os dados para o seu validador)
    let erros = validator.validarLogin(req.body);

    if (erros.length === 0) {
      // 2. Busca o usuário pelo e-mail
      const usuario = await Usuario.findOne({ email: email });

      if (!usuario) {
        erros.push('E-mail ou senha incorretos.');
      } else {
        // 3. Comparação do Hash (usuario.senha vem do seu Schema do MongoDB)
        const senhaBate = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaBate) {
          erros.push('E-mail ou senha incorretos.');
        }
      }
    }

    // Se houver erros, volta para a página com as mensagens
    if (erros.length > 0) {
      return res.render('auth/login', { 
        titulo: 'Login - Johnny Barber Shop', 
        erros 
      });
    }

    // Sucesso - Login realizado
    console.log('Login realizado com sucesso!');
    res.redirect('/'); 

  } catch (e) {
    console.error('ERRO NO LOGIN:', e);
    res.status(500).render('404');
  }
};

module.exports = { loginPage, loginPost };