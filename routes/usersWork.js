const express = require('express');
const app = express();
const router = express.Router();
const addFund = require('../models/addFunds');
const passport = require('passport');
const User = require('../models/user');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

router.get('/dashboard', isLoggedIn, function(req, res){
    if(req.user.username === 'admin'){
        addFund.find({}, function(err, data){
            if(err){
                console.log(err);
            } else {
                res.render('adminDashboard', {title: 'Transactions | ', fund: data})
            }
        })
    } else {
        res.render('dashboard', {title: 'Dashboard | '})
    }
});

router.get('/dashboard/addfunds', isLoggedIn, function(req, res){
    res.render('addFunds', {title: 'Add funds | '})
});

router.get('/dashboard/profile', isLoggedIn, function(req, res){
    res.render('profile', {title: 'Profile | '})
});

router.get('/dashboard/yourdeposits', isLoggedIn, function(req, res){
    res.render('yourdeposits', {title: 'Your Deosits | '})
});

router.get('/dashboard/settings', isLoggedIn, function(req, res){
    res.render('settings', {title: 'Setting | '})
});

router.get('/dashboard/operationhistory', isLoggedIn, function(req, res){
    addFund.find({}, function(err, data){
        if(err){
            console.log(err);
        } else{
            let showTransactions = []
            console.log('start')
            data.forEach(function(d){
                let authId = d.author.id
                let reqId =  req.user.id
                // d.author.id == req.user._id
                if((reqId) == authId){
                    showTransactions.push(d)
                }
            })
            // data.forEach(function(d){
            //     if(d.author.id = req.user.id){
            //         console.log(d)
            //     }
            // })
            res.render('operationHistory', {title: 'Operation History | ', fund: showTransactions})
            // console.log(showTransactions)
            console.log(req.user.id)
        }
    })
    
});

addFund.find({}, function(err, data){
    if(err) {
        console.log(err);
    } else {
        console.log(data)
    }
})


let operationAdd = "Add Fund";

router.post('/dashboard/addfunds', isLoggedIn, function(req, res){
    // console.log(req.body.crypto);
    // console.log(req.body.amount);
    // console.log(req.user);
    var crypto = req.body.crypto
    if (crypto = 'busd'){
        var coinName = "Binance USD"
    } else if (crypto = 'usdc'){
        var coinName = "Usd Coin"
    } else if (crypto = 'usdt'){
        var coinName = "Tether"
    }
    var operation = operationAdd
    var amount = req.body.amount
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newFund = {crypto: crypto, operation: operationAdd, coinName: coinName, amount: amount, author: author}
    addFund.create(newFund, function(err, newFund){
        if(err){
            console.log(err);
            return res.redirect('/dashboard/addfunds', {title: 'Add funds | '});
        } else if (req.body.crypto === 'Usdt'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/usdt')
        }  else if (req.body.crypto === 'Busd'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/busd')
        }else if (req.body.crypto === 'Usdc'){
            // console.log(newFund)
            return res.redirect('/dashboard/addfunds/usdc')
        }
    }); 
});

router.get('/dashboard/operation/:id', isLoggedIn, function(req, res){
    addFund.findById(req.params.id, function(err, foundFund){
        if(err){
            res.redirect('../../dashboard/operationhistory')
        }else {
            res.render('showFund', {fund: foundFund, title: 'showFund'})
        }
    })
})

router.get('/dashboard/addfunds/usdt', isLoggedIn, function(req, res){
    res.render('usdtFunds', {title: 'Add Funds | '})
});

router.get('/dashboard/addfunds/busd', isLoggedIn, function(req, res){
    res.render('busdFunds', {title: 'Add Funds | '})
});

router.get('/dashboard/addfunds/usdc', isLoggedIn, function(req, res){
    res.render('usdcFunds', {title: 'Add Funds | '})
});

// router.get('/dashboard/paymentdetails/:id', isLoggedIn, function(req, res){
//     res.render('paymentDetails', {title: 'Payment Details | '})
// });

//EDIT USER PAYMENT DETAILS
router.get('/dashboard/paymentdetails/:id', isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err){
            res.redirect('../../dashboard')
        } else {
            res.render('paymentDetails', {title: 'Payment Details | ', user: foundUser});
        }
    })
    
});

router.get('/dashboard/paymentdetails/:id/edit', isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            res.redirect('../../dashboard')
        } else{
            res.render('editPaymentDetails', {title: 'Edit Payment Details | ', user: foundUser})
        }
    })
})

//UPDATE USER PAYMENTS DETAILS
router.put('/dashboard/paymentDetails/:id', isLoggedIn, function(req, res){
    res.send('UPDATE ROUTE');
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect('/login');
};

module.exports = router;
