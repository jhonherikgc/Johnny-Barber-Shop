const validator = require('../validation/validation'); 

// 1. Rota para mostrar a página (GET)
exports.loginPage = (req, res) => {
  res.render('auth/login', {
    titulo: 'Login - Johnny Barber Shop',
    erros: [] // Inicialmente sem erros
  });
};

// 2. Rota para processar os dados (POST)
exports.loginPost = (req, res) => {
  const dadosFront = req.body; // Puxa os dados do formulário

  // Chama a validação do validation.js
  const erros = validator.validarLogin(dadosFront);

  if (erros.length > 0) {
    // Se houver erros, renderiza a página novamente com as mensagens
    return res.render('auth/login', { 
      titulo: 'Login - Johnny Barber Shop',
      erros: erros
    });
  }

  // Se chegou aqui, os dados estão limpos!
  console.log('Usuario logado com sucesso')
};