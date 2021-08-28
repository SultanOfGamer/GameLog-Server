
// in function
const path = require('path');
const fs = require('fs')

// npm function
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const session = require('express-session')
const bodyParser = require('body-parser')
const axios = require('axios')
const compression = require('compression')
const helmet = require('helmet')

const express = require('express');
const app = express();

const indexRouter = require('./routes/index')

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(compression())
app.use(helmet());

app.use('/', indexRouter)


// ERROR handling
app.use(function(request, response, next){
    response.status(404).send('Sorry cant find that!');
})
app.use(function (err, request, response, next) {
  console.log(err)
  if(response.headerSent){
    return next(err);
  }
  response.status(500).send('500 ERROR !!')
});

app.listen(3000, ()=>{
  console.log('listen express server!')
})