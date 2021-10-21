const express = require('express');
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){ //storage path 지정
        cb(null, 'public/images/user_profile/')
    },
    filename: function(req, file, cb){ //file name 지정
        cb(null, 'profile_user_id_'+req.user.id +'.' + file.originalname.split('.')[1] )
    }
})
const upload = multer({storage:storage,
    limits:{file:1 * 1024 * 1024} //1 MB 저장 제한
    // fileFilter:function (req, file, cb){
    //     if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
    //         return cb(null, false, new Error('I don\'t have a clue!'));
    //     }
    //     cb(null, true);
    // }
}).single('image')
const logger = require('../config/wiston')
const userProfile = require('../controll/index').userProfile
const userControl = require('../controll/index').users


router.use((request, response, next) => {
    if(!(userControl.isUser(request, response))){
        logger.error('로그인 필요')
        response.status(401).send({
            status:401,
            message:'로그인이 필요합니다.'
        })
    }
    next();
})

//user get
router.get('/', async (request, response)=>{
    const cloneObj = obj => JSON.parse(JSON.stringify(obj))
    let user = cloneObj(request.user)

    delete user._id
    delete user.password
    delete user.signDate
    delete user.password
    delete user.__v
    response.status(200).send({
        status:200,
        user:user
    })
})

//user 프로필 변경
router.put('/image',  async (request, response,next)=>{
    try{
        upload(request, response, async function(err){ // upload 에러처리 필요
            if(err) response.status(400).json({
                status:400,
                message:'upload fail',
                err:err
            })
            if(request.file === undefined) return response.status(404).json({
                status:404,
                message:'not find image file'
            })
            const sendMessage = await userControl.updateUserStat(request.user, request.file)
            response.status(200).json({
                status:200,
                message:sendMessage
            })
        })
    }catch(err){
        next(err)
    }

})

//user 회원가입 시 선호 장르 저장
router.put('/category', async (request, response,next)=>{
    try{
        const sendMessage = await userControl.updateUserPrefer(request.user, request.body.prefer)
        response.status(200).json({
            status:200,
            message:sendMessage
        })
    }catch(err){
        next(err)
    }
})

//회원 탈퇴
router.delete('/user', async (request, response)=> {
    const sendMessage = await userControl.deleteUser(request.user)
    request.logout();
    request.session.save(function () { //session 값을 저장함})
        return response.status(200).json({
            status:200,
            message: sendMessage,
        })
    })
})

module.exports = router;