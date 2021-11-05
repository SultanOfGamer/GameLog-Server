//cold start 문제로 인한 추천 User 생성
const RecommandUser=[
    //선호하는 카테고리별 다르게 게임 평가
    {
        //genres, RPG, id 12
        email:'ForRPG@gmail.com',
        nickname:'ForRPG',
        password:'123456',
        preferCategory:[
            {
                category:'genres',
                id:12,
                name:'Role-playing (RPG)'
            }
        ]
    },
    {
        //genres, strategy id 15
        email:'ForStrategy@gmail.com',
        nickname:'ForStrategy',
        password:'123456',
        preferCategory:[
            {
                category:'genres',
                id:15,
                name:'Strategy'
            }
        ]
    },
    {
        //genres, Simulator, id 13
        email:'ForSimulator@gmail.com',
        nickname:'ForSimulator',
        password:'123456',
        preferCategory:[
            {
                category:'genres',
                id:13,
                name:'Simulator'
            }
        ]
    },
    {
        //genres, Sport, id 14
        email:'ForSport@gmail.com',
        nickname:'ForSport',
        password:'123456',
        preferCategory:[
            {
                category:'genres',
                id:14,
                name:'Sport'
            }
        ]
    },
    {
        //themes, Action, id 1
        email:'Foraction@gmail.com',
        nickname:'Foraction',
        password:'123456',
        preferCategory:[
            {
                category:'themes',
                id:1,
                name:'Action'
            }
        ],
    },
    {
        //themes, Open world, id 38
        email:'ForOpenWorld@gmail.com',
        nickname:'ForOpenWorld',
        password:'123456',
        preferCategory:[
            {
                category:'themes',
                id:38,
                name:'Open world'
            }
        ]
    },
    {
        //genres, Shooter, id 5
        email:'ForShooter@gmail.com',
        nickname:'ForShooter',
        password:'123456',
        preferCategory:[
            {
                category:'genres',
                id:5,
                name:'Shooter'
            }
        ]
    }
]

module.exports = RecommandUser;