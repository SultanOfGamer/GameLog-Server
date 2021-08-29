module.exports = {
    isUser:function(request,response){
        if(request.user){
            return true
        }else{
            return false
        }
    }
}