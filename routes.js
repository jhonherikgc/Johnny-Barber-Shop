const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const errorController = require('./src/controllers/errorController');
const loginController = require('./src/controllers/loginController');
const agendamentoController = require('./src/controllers/agendamentoController');
const registerController = require('./src/controllers/registerController')

// Rota de login
route.get('/login', loginController.loginPage);

// Rota de register
route.get('/register', registerController.registerPage)

// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de contato
route.get('/contato', contatoController.paginaInicial);

// Rotas de agendamento
route.get('/agendamento', agendamentoController.agendarHorario)

// Rota de erro 404
route.get('/404', errorController.paginaErro);

module.exports = route;
