
// in function
const path = require('path');
const fs = require('fs')

// npm function
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
// const logger = require('morgan');
// const axios = require('axios')
const logger = require('./config/wiston');
const MongoStore = require('connect-mongo');
// const mongoose = require("./models/initDB");

const express = require('express');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(compression())
app.use(helmet());
app.use(express.static('public'))
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
const passport = require('./controll/index').passport(app)


const authRouter = require('./routes/index').auth(passport);
const initRouter = require('./routes/index').initdata;
const userProfileRouter = require('./routes/index').userProfile;

const homeRouter = require('./routes/index').home
const LibAndWishRouter = require('./routes/index').LibAndWish;
const searchRouter = require('./routes/index').search;

app.use('/initdata', initRouter);
app.use('/auth', authRouter);
app.use('/profile', userProfileRouter);

app.use('/', homeRouter)
app.use('/game', LibAndWishRouter);
app.use('/search', searchRouter);


// ERROR handling
app.use(function(request, response, next){
    logger.error("can't find address")
    response.status(404).send(
        {
            status:404,
            message:'Sorry cant find that!'
        });
})
app.use(function (err, request, response, next) {
    console.log(err)
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
        logger.info('listen express server!')
        console.log('listen express server!')
    })
}


module.exports = app;