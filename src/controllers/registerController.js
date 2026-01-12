exports.registerPage = (req, res) => {
    res.render('auth/register', {
        title: 'Registro - Sistema de Agendamento'
    })
    return;
}