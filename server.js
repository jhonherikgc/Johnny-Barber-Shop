require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexão com o Banco de Dados
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('Conectado à base de dados');
    app.emit('pronto');
  })
  .catch(e => console.log('Erro de conexão:', e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

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
app.use(middlewareGlobal); // injeta variáveis em res.locals
app.use(checkCsrfError);    // checa erros de token
app.use(csrfMiddleware);    // envia o token para o front-end
app.use(routes);

// Escuta do Servidor
app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});