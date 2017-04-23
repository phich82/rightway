//#!/usr/bin/env node --harmony
'use strict';

const
    express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redisClient = require('redis').createClient(),
    RedisStore = require('connect-redis')(session),
    app = express();

//specify middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'unguessable',
    store: new RedisStore({
        //host: 'localhost',
        //port: 6379,
        client: redisClient
    })
}));

app.get('/api/:name', function(req, res){
    res.json(200, {"hello": req.params.name});
});

app.listen(3000, function(){
    console.log("ready captain.");
});
