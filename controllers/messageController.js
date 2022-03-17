const passport = require('passport');
const {body, validationResult} = require("express-validator");
let Message = require('../models/message');


exports.message_get = function(req, res, next) {
    // if user is a member or above (admin) then show message with author
    // else show messages but anonymously
    if (req.isAuthenticated() && req.user.member && req.user.admin){ // for admin only
        Message.find({}).populate('creator').exec((err, result) => {
            if (err)
                return next(err);
            else
                res.render('index', {messages: result, creator: true, admin: true});
        });
    } else if (req.isAuthenticated() && req.user.member){ // for member only
        Message.find({}).populate('creator').exec((err, result) => {
            if (err)
                return next(err);
            else
                res.render('index', {messages: result, creator: true, admin: false});
        });
    }
    else if (req.isAuthenticated()){ // only for user that are not member and not admin
        Message.find({}).exec((err, result) => {
            if (err)
                return next(err);
            else
                res.render('index', {messages: result, creator: false, admin: false});
        });
    } else{
        res.redirect('/log-in');
    }
}

exports.message_create_get = function(req, res, next){
    if (req.isAuthenticated())
        res.render('message-form');
    else
        res.redirect('/log-in');
}

exports.message_create_post = [
    body("title").trim().escape(),
    body("text").trim().escape(),
    (req, res, next) => {
        // user, member, and admin are able to post
        if (req.isAuthenticated()){
            // get rid of HTML formatting
            let text = (req.body.text).replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            text = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            let title = (req.body.title).replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            title = title.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            let data = {
                title: title,
                text: text,
                creator: req.user._id
            }
            let msg = new Message(data);
            msg.save((err) => {
                if (err)
                    return next(err);
                else
                    res.redirect('/messages');
            });
        } else{
            res.redirect('/log-in');
        }
    }
]

exports.message_detail = function(req, res, next){
    if (req.isAuthenticated() && req.user.admin)
        res.render('delete-form', {id: req.params.id});
    else
        res.redirect('/log-in');
}

exports.message_delete = function(req, res, next){
    // id of message is attached in req.params.id
    if (req.isAuthenticated() && req.user.admin){
        Message.findByIdAndRemove(req.params.id).exec((err) => {
            if (err)
                return next(err);
            else
                res.redirect('/messages');
        });
    } else{
        res.redirect('/log-in');
    }
}
