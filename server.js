require('dotenv').config();

// --- INICIALIZAÇÃO DO SERVIDOR ---
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const chalk = require('chalk');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Conexão com o Banco de Dados
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    // Verificação de segurança: checa se chalk existe antes de usar
    const msg = chalk.cyan ? chalk.cyan.bold('🔹 MongoDB:') + chalk.green(' Conectado!') : '🔹 MongoDB: Conectado!';
    console.log(msg);
    app.emit('pronto');
  })
  .catch(e => {
    // Se o chalk falhar aqui, usamos o console.log comum para ver o erro real do banco
    if (chalk.red) {
      console.log(chalk.red.bold('❌ Erro de conexão:'), e);
    } else {
      console.log('❌ Erro de conexão:', e);
    }
  });

// Configurações Globais
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Configuração de Sessão e Flash Messages
const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

// Views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Segurança CSRF e Middlewares
app.use(csrf());
app.use(middlewareGlobal); 
app.use(checkCsrfError);    
app.use(csrfMiddleware);    
app.use(routes);

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log(chalk.yellow.bold('\n--- 🗺️  MAPEAMENTO DE ROTAS ---'));
    
    const mapeamento = [
      { Rota: '/', Controller: 'HomeController', Status: '✔️ ' },
      { Rota: '/login', Controller: 'LoginController', Status: '✔️ ' },
      { Rota: '/register', Controller: 'RegisterController', Status: '✔️ ' },
      { Rota: '/agendamento', Controller: 'AgendamentoController', Status: '✔️ ' },
      { Rota: '/contato', Controller: 'ContatoController', Status: '✔️ ' }
    ];

    console.table(mapeamento);

    console.log(chalk.green.bold('🚀 Johnny Barber Online: ') + chalk.blue.underline('http://localhost:3000'));
    console.log(chalk.gray('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n'));
  });
});