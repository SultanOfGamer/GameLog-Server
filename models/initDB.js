const mongoose = require('mongoose')
const url = 'mongodb://root:root@127.0.0.1:27017';
const db = mongoose.connect(url, {dbName:'testserver'},(err)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log('mongodb success connect!')
  }
})

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;