
const express = require('express')
const router = express.Router()

const users = require('../models/userDatabase');

const shortid = require('shortid')
const getDate = require('../util/date')


router.get('/login', (request,response)=>{

})

router.get('/logout', (request,response)=>{

})



router.post('/signup', (request,response)=>{
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