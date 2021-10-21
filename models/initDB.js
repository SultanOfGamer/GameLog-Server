const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/gamelog';
const dbConnect = async () =>
{
  await mongoose.connect(url, {
    authSource:"admin",
    auth:{
      username:"root",
      password:"root"
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
  },(err)=>{
  })
}
dbConnect()
    .then(res=>{
          if(!process.env.NODE_ENV !== 'test') {
            console.log('mongodb success connect!!')
          }
        }
    )
    .catch(err=>console.log(err))

module.exports = mongoose;