const mongoose = require('./initDB')

const userSchema = new mongoose.Schema({
  id:String,
  email:{type:String, unique: true},
  nickname:{type:String, unique: true},
  password:String,
  signDate:String
})

const users = mongoose.model('users', userSchema);

module.exports = users;