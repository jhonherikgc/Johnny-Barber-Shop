exports.agendarHorario = (req, res) => {
  res.render('agendamento', {
    titulo: 'Agende seu horário'
  });
  return;
};