const express = require('express');
const route = express.Router();

// Importação dos Controllers
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const errorController = require('./src/controllers/errorController');
const loginController = require('./src/controllers/loginController');
const agendamentoController = require('./src/controllers/agendamentoController');
const registerController = require('./src/controllers/registerController');

// --- RADAR DE DEBUG (Aparece no seu terminal) ---
console.log('--- Verificando Controllers ---');
console.log('Home:', typeof homeController.paginaInicial);
console.log('Login:', typeof loginController.loginPage);
console.log('Objeto Login:', loginController);
console.log('Register:', typeof registerController.registerPage);
console.log('Agendamento:', typeof agendamentoController.agendarHorario);
console.log('-------------------------------');

// Rota de Login
route.get('/login', loginController.loginPage);
route.post('/login', loginController.loginPost);

// Rota de Registro
route.get('/register', registerController.registerPage);
route.post('/register', registerController.registerPost);

// Outras Rotas
route.get('/', homeController.paginaInicial);
route.get('/contato', contatoController.paginaInicial);
route.get('/agendamento', agendamentoController.agendarHorario);
route.get('/404', errorController.paginaErro);

module.exports = route;