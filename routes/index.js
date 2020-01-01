var router      = require('express').Router(),
    passport    = require('passport'); 
var User        = require('../models/user');

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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
// SHOW LOGIN FROM
router.get('/login', (req, res) => {
return 	res.render("login");
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
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {  
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports  = router; 