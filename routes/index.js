const express = require('express');
const router = express.Router()
//INDEX ROUTES

//Home

// router.get('*', function(req, res){
//     res.render('404', {title: '404 error'})
// });



router.get('/', function(req, res){
    res.render('index', {title: 'Home | '});
});

router.get('/home', function(req, res){
    res.render('index', {title: 'Home | '});
});

router.get('/contact', function(req, res){
    res.render('contact', {title: 'Contact | '});
});

router.get('/howitworks', function(req, res){
    res.render('how_it_works', {title: 'How It Works | '});
});

router.get('/Affilates', function(req, res){
    res.render('affilates', {title: 'Affilates | '});
});

router.get('/Payouts', function(req, res){
    res.render('payouts', {title: 'Payouts | '});
});

router.get('/About', function(req, res){
    res.render('about', {title: 'About | '});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};
module.exports = router;