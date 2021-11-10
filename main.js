// npm function
import cookieParser from 'cookie-parser';
import session from 'express-session'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import logger from './config/wiston'
import MongoStore from 'connect-mongo'
import cors from 'cors'

import express from 'express'

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(compression())
app.use(helmet());
app.use(express.static('public'))
app.use(cors({origin: true, credentials:true}));
app.use(
    session({
        secret: "rqwr@#^^#fsazfcz",
        saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified
        store: MongoStore.create({
            mongoUrl:"mongodb://127.0.0.1:27017/gamelog"
        }),
    })
)
import  passport from'./controll/index'.passport(app)


import  authRouter from'./routes/auth'.auth(passport);
import  initRouter from'./routes/index'.initdata;
import  userProfileRouter from'./routes/index'.userProfile;

import  homeRouter from'./routes/index'.home
import  LibAndWishRouter from'./routes/index'.LibAndWish;
import  searchRouter from'./routes/index'.search;

app.use('/initdata', initRouter);
app.use('/auth', authRouter);
app.use('/profile', userProfileRouter);

app.use('/', homeRouter)
app.use('/game', LibAndWishRouter);
app.use('/search', searchRouter);


// ERROR handling
app.use(function(request, response, next){
    logger.error("can't find address")
    response.status(404).send({
            status:404,
            message:'Sorry cant find that!'
        });
})
app.use(function (err, request, response, next) {
    // console.log(err)
    logger.error(err)

    if(response.headerSent){
        return next(err);
    }
    response.status(500).send({
        status:500,
        message:'500 ERROR !!',
        error:err
    })
});
if(process.env.NODE_ENV !== 'test'){
    app.listen(3000, ()=>{
        logger.info('port 3000 listen express server!')
        console.log('listen express server!')
    })
}


module.exports = app;