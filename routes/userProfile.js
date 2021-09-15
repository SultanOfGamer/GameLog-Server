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


const userProfile = require('../controll/index').userProfile
const userControl = require('../controll/index').users


router.post('/image',  (request, response)=>{
    if(userControl.isUser(request,response)){
        upload(request, response, function(err){
            if(err) response.json({message:'upload fail', err:err})
            const sendMessage = userControl.updateUserStat(request.user, request.file)
            response.send(sendMessage)
        })
    }else{
        response.json({message:'please login!'})
    }
})

module.exports = router;