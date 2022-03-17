require('dotenv').config()
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const User = require('../models/user');

exports.member_get = function(req, res, next){
    if (req.isAuthenticated() && req.user.member === false) // only proceed to member page if user is logged in
        res.render('member-sign-up');
    else
        res.redirect('/log-in');
}

exports.member_post = [
    body('member_code').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            res.send((errors.array())[0].msg);
        // username of the user is attached in the req object
        if (req.body.member_code === process.env.MEMBER){
            let username = req.user.username;
            let data = {member: true};
            User.findOneAndUpdate({username: username}, data, {}, (err) => {
                if (err)
                    return next(err);
                // might have to modify this to redirect to something else
                res.redirect('/');
            });
        }
        else
            res.send("wrong passcode!");
    }
]

