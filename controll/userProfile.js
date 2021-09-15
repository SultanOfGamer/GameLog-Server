
// const users = require('../models/index').userDatabase;

const fs = require('fs')

function randomArr(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function defaultProfile(){
    // public에 존재하는 이미지 랜덤으로 생성하여 받아오기
    const publicURL = '/../public/images/user_profile_default/'
    const folderURL = __dirname + publicURL
    // fs.readdir(folderURL, (err, files)=>{ //비동기
    //     if(err)return console.log(err);
    //     const img = randomImage(files)
    //     return img
    // })
    const files = fs.readdirSync(folderURL)
    // console.log(files)
    // console.log(randomArr(files))
    const result = publicURL + randomArr(files)
    return result
}

function uploadProfileImg(){
    // pulbic 폴더 안에 img 파일 저장
}

function getProfileImg(){
    // img 파일 불러오기
}
// console.log(defaultProfile())
module.exports = {
    temp:function(){
        // public에 존재하는 이미지 랜덤으로 생성하여 받아오기
        const publicURL = '/../public/images/user_profile_default/'
        const folderURL = __dirname + publicURL
        const saveURL = '/public/images/user_profile_default/'
        // fs.readdir(folderURL, (err, files)=>{ //비동기
        //     if(err)return console.log(err);
        //     const img = randomImage(files)
        //     return img
        // })

        const files = fs.readdirSync(folderURL)
        const result = saveURL + randomArr(files)
        return result
    },

}