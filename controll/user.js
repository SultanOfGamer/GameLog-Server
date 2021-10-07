
const users = require('../models/index').userDatabase;
const getDate = require('../util/index').date;

const userProfile = require('./userProfile');

module.exports = {
    isUser(request,response){
        if(request.user){
            return true
        }else{
            return false
        }
    },
    emailValidation ( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
    },
    signupInsert(body, hash){
        const profileURL = userProfile.defaultProfile()
        return users.create({
                email:body.email,
                nickname:body.nickname,
                signDate:getDate.getDateUNIX(),
                password:hash,
                profileImage:{
                    url:profileURL
                }
            })
    },
    updateUserStat(user, image){
        return new Promise((resolve, reject)=>{
            const saveURL = '/images/user_profile/'
            let imageURL = '';
            if(image === undefined) {
                imageURL = userProfile.defaultProfile()
            } else {
                imageURL = saveURL + image.filename
            }
            users.findOneAndUpdate(
                {id:user.id},
                {
                    nickname:user.nickname,
                    profileImage:{url:imageURL}
                }, {new:true},
                (err, userStat)=>{
                    if(err) {reject(err)}
                    if(!userStat) resolve({message:'update fail not exist data'})
                    resolve({message:'update success!'})
                }
            )
        })
    },
    updateUserPrefer(user, categoryArr){
        return new Promise((resolve, reject)=>{
            users.findOneAndUpdate(
                {id:user.id},
                {
                    preferCategory:categoryArr
                }, {new:true},
                (err, userStat)=>{
                    if(err) {reject(err)}
                    if(!userStat) resolve({message:'update fail not exist data'})
                    resolve({message:'update success!'})
                }
            )
        })
    },
    findEmailVal(queryString){
        return new Promise((resolve, reject) => {
            users.findOne({email:queryString}, function(err, user){
                if(err) reject(err)
                if(!user) resolve({data:true,
                        message: "사용 가능한 이메일입니다."
                    })
                else resolve({message:"이미 중복된 이메일이 존재합니다."})
            })
        })
    },
    findNickVal(queryString){
        return new Promise((resolve, reject) => {
            users.findOne({nickname:queryString}, function(err, user){
                if(err) reject(err)
                if(!user) resolve({data:true,
                        message: "사용 가능한 닉네임입니다."
                    })
                else resolve({message:"이미 중복된 닉네임이 존재합니다."})
            })
        })
    },
    deleteUser(user){
        return new Promise((resolve, reject) => {
            users.deleteOne({id:user.id}, function(err, result){
                if(err) reject({message:'delete fail', err:err})
                if(result.deletedCount == 0) resolve({message: 'delete fail'})
                resolve({message: 'delete success'})
            })
        })
    }
}