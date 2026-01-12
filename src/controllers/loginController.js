exports.loginPage = (req, res) => {
  // login.ejs is located under src/views/auth/, render with the subpath
  res.render('auth/login', {
    titulo: 'Login - Sistema de Agendamento'
  });
  return;
};