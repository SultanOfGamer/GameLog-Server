
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
const shortid = require('shortid')

const express = require('express');
const app = express();

const indexRouter = require('./routes/index')

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(compression())
app.use(helmet());

app.use('/', indexRouter)

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/testserver';
const db = mongoose.connect(url, (err)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log('mongodb success connect!')
  }
})

const userSchema = new mongoose.Schema({
  id:String,
  email:String,
  nickname:String,
  password:String,
  signDate:String
})

const users = mongoose.model('users', userSchema);


app.get('/auth/login', (request,response)=>{

})
app.get('/auth/logout', (request,response)=>{

})

function getDate(){
  const date = new Date();
  var year = date.getFullYear().toString();

  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();

  var day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();

  return year + '/' +  month + '/' + day ;
  return Date
}

app.post('/auth/signup', (request,response)=>{
  // console.log(request.body);
  const newUser = new users(request.body);
  newUser.id = shortid.generate();
  newUser.signDate = getDate();
      newUser.save((err)=>{
        if(err) return response.status(500).json({message: 'failure save'})
        else return response.status(200).json({message:'save success'})
      })
  // response.send(request.body)
})


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