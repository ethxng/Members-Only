const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {body, validationResult} = require('express-validator');

exports.index = function(req, res, next){
    res.redirect('/messages');
}

exports.signup_get = function(req, res, next){
    if (req.isAuthenticated())
        res.redirect('/');
    else
        res.render('sign-up-form');
}

exports.signup_post = [
    body('first_name', "First name must not be empty").trim().escape(),
    body('last_name', "Last name must not be empty").trim().escape(),
    body('username', "Username must not be empty").trim().escape(),
    body('password').isLength({min: 5}),
    body('password2').custom((value, {req}) => {
        if (value != req.body.password){
            throw new Error("passwords do not match");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){ // errors encountered while valiadting data
            res.send((errors.array())[0].msg);
        }
        else{
            User.find({username: req.body.username}).exec((err, result) => {
                if (err)
                    return next(err);
                if (result.length !== 0){
                    res.send('username already exists! Try another one');
                }
                else{
                    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                        if (err)
                            return next(err);
                        let newUser = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            password: hashedPassword,
                            username: req.body.username
                        });
                        newUser.save((err) => {
                            if (err)
                                return next(err);
                            res.redirect('/');
                        });
                    });
                }
            });
        }
    }
];

exports.login_get = function(req, res, next) {
    if (req.isAuthenticated()){
        res.redirect('/');
    }
    else
        res.render('log-in');
}

exports.login_post = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
});

exports.logout = function(req, res, next){
    req.logout();
    res.redirect('/');
}

