const mongoose = require('./initDB')

const userSchema = new mongoose.Schema({
  id:{type:String, unique: true, },
  email:{type:String, unique: true, index:true, required:true},
  nickname:{type:String, unique: true, required:true},
  password:{type:String, required:true},
  signDate:String
})

const users = mongoose.model('users', userSchema);

module.exports = users;