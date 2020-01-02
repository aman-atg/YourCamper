var router      = require('express').Router(),
    passport    = require('passport'); 
var User        = require('../models/user');
var middleware  = require('../middleware');

/*    HOME    */
router.get('/',function (req,res) {  
    res.render('landing');
});

// SHOW REGISTER FORM
router.get('/register', (req, res) => {
return 	res.render("register");
});

router.post('/register', (req,res)=>{
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function (err, user) {  
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YourCamper " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
// SHOW LOGIN FROM
router.get('/login', (req, res) => {
return 	res.render("login",{ message : req.flash("error")});
});

// POST login
router.post('/login', passport.authenticate("local",
    {   successRedirect   : "/campgrounds",
        failureRedirect   : "/login"
    }),(req, res) => {
        
});
// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports  = router; 