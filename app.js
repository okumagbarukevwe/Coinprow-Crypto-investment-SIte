const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');
const bodyParser = require('body-parser');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


//requiring routes
const indexRoutes = require('./routes/index');
const userWorksRoutes = require('./routes/usersWork');
const authRoutes = require('./routes/auth')



mongoose.connect('mongodb+srv://rukevwe:08028345728@cluster0.nlgsi.mongodb.net/coinprow?retryWrites=true&w=majority');


const app = express();

// app.get('*', function(req, res){
//     res.render('404');
// });

//APP SETUP


//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'coinpay is the best cryptotrader',
    resave: false,
    saveUninitialized: false
}));
passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(authRoutes);
app.use(indexRoutes);
app.use(userWorksRoutes);

app.get('dashboard/*', function(req, res){
    res.render('dashboard404', {title: 'Dash 404 Page not found | '})
});
app.get('*', function(req, res){
    res.render('404', {title: '404 Page not found | '})
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};


app.listen(process.env.PORT, function(){
    console.log('Server has started');
});
