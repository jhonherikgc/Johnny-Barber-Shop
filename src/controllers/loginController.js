exports.loginPage = (req, res) => {
  res.render('login', {
    titulo: 'Login - Sistema de Agendamento'
  });
  return;
};