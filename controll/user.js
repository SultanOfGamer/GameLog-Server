module.exports = {
    isUser:function(request,response){
        if(request.user){
            return true
        }else{
            return false
        }
    },
    emailValidation: function ( email ) {
            var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return (email != '' && email != 'undefined' && regex.test(email));
    }
}