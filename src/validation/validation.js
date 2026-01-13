const validator = require('validator');

// Função para validar o Registro
exports.validarRegistro = (dados) => {
  let erros = [];

  if (!dados.email || !validator.isEmail(dados.email)) {
    erros.push('E-mail inválido.');
  }

  if (!dados.password || dados.password.length < 6) {
    erros.push('A senha precisa ter pelo menos 6 caracteres.');
  }

  if (!dados.full_phone) {
    erros.push('O campo de WhatsApp é obrigatório.');
  }

  return erros;
};

// Função para validar o Login
exports.validarLogin = (dados) => {
  let erros = [];

  // No login, apenas checamos se os campos não estão vazios antes de ir ao banco
  if (!dados.email || !validator.isEmail(dados.email)) {
    erros.push('Insira um e-mail válido para entrar.');
  }

  if (!dados.password) {
    erros.push('A senha é obrigatória.');
  }

  return erros;
};