const express = require('express');
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/user_profile/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname )
    }
})
const upload = multer({storage:storage,
    limits:{file:5 * 1024 * 1024} //5 MB 저장 제한
})

const userProfile = require('../controll/index').userProfile


router.post('/image',  upload.single('image'), (request, response, next)=>{
    console.log(request.file)
    // userProfile.uploadImg()
    response.json({message:'upload image success'})
})

module.exports = router;