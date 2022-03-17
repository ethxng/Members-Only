#! /usr/bin/env node
require('dotenv').config()
console.log("This script will populate some random data for us");

var async = require('async');
let User = require('./models/user');
let Message = require('./models/message');

// set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.mongoDB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];

User.find({}).exec((err, results) => {
    if (err)
        return next(err);
    else{
        for (let i = 0; i < results.length; i++){
            users.push(results[i]);
            console.log(results[i]);
        }
    }
});

function createMessages(title, text, creator, cb){
    let data = {
        title: title, 
        text: text, 
        creator: creator
    }
    let newMessage = new Message(data);
    newMessage.save((err) => {
        if (err){
            cb(err, null);
            return;
        }
        console.log('new message created!');
        cb(null, newMessage);
    });
}
/*
function loadMessages(cb){
    async.series([
        function(callback){
            createMessages("Desperate times", "yo anyone got the hw for discrete I? willing to pay", users[0], callback);
        },
        function(callback){
            createMessages("Have you seen Batman?", "Robert Pattinson is so <3 <3 <3", users[1], callback);
        },
        function(callback){
            createMessages("Best Spiderman", "If you don't choose Garfield you're not a real fan", users[2], callback);
        },
        function(callback){
            createMessages("Messi is done", "dude got like 3 goals this whole season lol. look at Ronaldo", users[0], callback);
        },
        function(callback){
            createMessages('Donald Trump is the best', "#MAGA20204 come to 248 Hamilton if you got a problem w it", users[1], callback);
        },
        function(callback){
            createMessages("The Rock's secret", "Wanna know why dude's bald? Cuz his hair takes 2 years to grow", users[2], callback);
        }
    ], cb);
}
*/
async.series([
    function(callback){
        createMessages("Desperate times", "yo anyone got the hw for discrete I? willing to pay", users[0], callback);
    },
    function(callback){
        createMessages("Have you seen Batman?", "Robert Pattinson is so <3 <3 <3", users[1], callback);
    },
    function(callback){
        createMessages("Best Spiderman", "If you don't choose Garfield you're not a real fan", users[2], callback);
    },
    function(callback){
        createMessages("Messi is done", "dude got like 3 goals this whole season lol. look at Ronaldo", users[0], callback);
    },
    function(callback){
        createMessages('Donald Trump is the best', "#MAGA20204 come to 248 Hamilton if you got a problem w it", users[1], callback);
    },
    function(callback){
        createMessages("The Rock's secret", "Wanna know why dude's bald? Cuz his hair takes 2 years to grow", users[2], callback);
    }
], (err, results) => {
    if (err)
        console.log("FINAL ERR: " + err)
    else
        console.log("DONE!");
    mongoose.connection.close();
}); 