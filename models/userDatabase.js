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
  email:{type:String, unique: true},
  nickname:{type:String, unique: true},
  password:String,
  signDate:String
})

const users = mongoose.model('users', userSchema);

module.exports = users;