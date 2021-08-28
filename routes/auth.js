
const express = require('express')
const router = express.Router()

const users = require('../models/userDatabase');

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



router.get('/auth/login', (request,response)=>{

})

router.get('/auth/logout', (request,response)=>{

})



router.post('/auth/signup', (request,response)=>{
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

module.exports = router;