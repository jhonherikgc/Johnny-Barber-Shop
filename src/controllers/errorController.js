// Controlador para páginas de erro
exports.paginaErro = (req, res) => {
  res.status(404).render('404', {
    titulo: 'Página não encontrada',
    descricao: 'A página que você está procurando não existe.'
  });
  return;
};