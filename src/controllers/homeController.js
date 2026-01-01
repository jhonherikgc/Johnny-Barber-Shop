exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: 'Este será o título da página'
  });
  return;
};

exports.trataPost = (req, res) => {
  res.send(req.body);
  return;
};
