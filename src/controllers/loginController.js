const Usuario = require('../models/usersModels');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  res.render('auth/login', {
    titulo: 'Login - Johnny Barber Shop',
    erros: []
  });
};

exports.loginPost = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const erros = [];
    let usuario = null; // Definimos como null aqui para estar disponível em toda a função

    // 1. Validação Manual
    if (!email) erros.push('O e-mail é obrigatório.');
    if (!senha) erros.push('A senha é obrigatória.');

    if (erros.length === 0) {
      // 2. Busca o usuário
      usuario = await Usuario.findOne({ email: email });

      if (!usuario) {
        erros.push('E-mail ou senha incorretos.');
      } else {
        // 3. Compara a senha
        const senhaBate = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaBate) {
          erros.push('E-mail ou senha incorretos.');
        }
      }
    }

    // 4. Se houver erros (de validação ou de login)
    if (erros.length > 0) {
      return res.render('auth/login', { 
        titulo: 'Login - Johnny Barber Shop', 
        erros 
      });
    }

    // 5. LOGIN COM SUCESSO
    // Agora 'usuario' está definido e acessível aqui
    req.session.user = {
      _id: usuario._id,
      email: usuario.email
    };

    console.log('✅ Login realizado com sucesso:', email);
    
    // Salva a sessão antes de redirecionar (boa prática)
    req.session.save(() => {
      res.redirect('/'); 
    });

  } catch (e) {
    console.error('ERRO NO LOGIN:', e);
    res.status(500).render('404');
  }
};