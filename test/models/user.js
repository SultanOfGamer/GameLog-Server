const users = [
    {
        email:'testUser1@naver.com',
        nickname:'testUser1',
        password:'123456'
    },
    {
        email:'testUser2@naver.com',
        nickname:'testUser2',
        password:'123456'
    },
    {
        email:'testUser3@naver.com',
        nickname:'testUser3',
        password:'123456'
    },
]

const signUpErrUser = [
    {
        email:'testErr@naver',
        nickname:'testErr',
        password:'12345678'
    },
    {
        email:'testErr@naver',
        nickname:'testUser1',
        password:'12345678'
    }

]

module.exports = {
    users,
    signUpErrUser
}