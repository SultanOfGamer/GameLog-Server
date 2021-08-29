const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/testserver';
const db = mongoose.connect(url, (err)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log('mongodb success connect!')
  }
})

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;