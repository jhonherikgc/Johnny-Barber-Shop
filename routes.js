const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const errorController = require('./src/controllers/errorController');
const loginController = require('./src/controllers/loginController');
const agendamentoController = require('.src/controllers/agendamentoController')


// Rota de login
route.get('/login', loginController.loginPage);


// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de contato
route.get('/contato', contatoController.paginaInicial);

// Rotas de agendamento
route.get('/agendamento', agendamentoController.agendamentoPage)

// Rota de erro 404
route.get('/404', errorController.paginaErro);

module.exports = route;
