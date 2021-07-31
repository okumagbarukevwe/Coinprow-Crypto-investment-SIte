const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

//Show signup form
router.get('/register', function(req, res){
    res.render('register', {title: 'Register | '})
})

let usdtAddress = "lladoqid21ewd98123io2esq12919123243"
    let busdAddress = "lladoqid21ewd98123io2esq12919123243"
    let usdcAddress = "lladoqid21ewd98123io2esq12919123243"

router.post('/register', function(req, res){
    req.body.username
    req.body.password
    req.body.email
    usdtAddress
    busdAddress
    usdcAddress
    
    let newUser = new User({ username: req.body.username, 
                             email: req.body.email,
                             usdtAdd: usdtAddress,
                             busdAdd: busdAddress,
                             usdcAdd: usdcAddress})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register', {title: 'Register | '});
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('dashboard');
        });
    });
});





//LOGIN ROUTE
//Show login form
router.get('/login', function(req, res){
    res.render('login', {title: 'Login | '})
});

//login logics
router.post('/login',passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}), function(req, res){});

//LOGOUT
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};

module.exports = router;