var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cors());
app.use(
  '/cake',
  createProxyMiddleware({
    target: 'http://h5.mcake.com',
    changeOrigin: true,
    pathRewrite: {
      '/cake': '',
    },
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
