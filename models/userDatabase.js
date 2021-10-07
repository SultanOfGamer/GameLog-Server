const mongoose = require('./initDB')
const autoIncrementIndex = require('mongoose-sequence')(mongoose);


const imageSchema = new mongoose.Schema({
    height:{type:Number},
    width:{type:Number},
    url:{type:String, required:true},
})

const preferCategorySchema = new mongoose.Schema({
    category:{type:String}, //themes, genres
    id:{type:Number},
    name:{type:String}
})

const userSchema = new mongoose.Schema({
    // id:{type:String, unique: true},
    email:{type:String, unique: true, index:true, required:true},
    nickname:{type:String, unique: true, required:true},
    password:{type:String, required:true},
    signDate:Number,
    profileImage:imageSchema,
    preferCategory:[preferCategorySchema]
})

userSchema.plugin(autoIncrementIndex, {id:"user_seq",inc_field:'id'});

const users = mongoose.model('users', userSchema);

module.exports = users;