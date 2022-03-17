require('dotenv').config()
const {body, validationResult} = require('express-validator');
const User = require("../models/user");

exports.admin_get = function(req, res, next){
    // only proceed if user is logged in AND is a member
    if (req.isAuthenticated() && req.user.member === true){
        res.render('admin-sign-up');
    } else{
        res.send('you are not a member!');
    }
}

exports.admin_post = [
    body('admin_code').trim().escape().isLength({min: 1}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.send((errors.array())[0].msg);
        } 
        else if (req.body.admin_code === process.env.ADMIN){
            let username = req.user.username;
            let data = {admin: true};
            User.findOneAndUpdate({username: username}, data, {}, (err) => {
                if (err)
                    return next(err);
                else{
                    res.redirect('/');
                }
            })
        } else{
            res.send("wrong passcode!");
        }
    }
]