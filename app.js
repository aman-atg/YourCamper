// ! img https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole
// ! why the fuck my shift + . not working sometimes 


var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy=require('passport-local'),
    Campground  = require('./models/campground'),
    seedDB      = require('./seeds'),
    Comment     = require('./models/comment'),
    User        = require('./models/user');
// ================================================ //
app.use(bodyParser.urlencoded({extended:true}));  
app.set("view engine",'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();
// ================================================ //
    mongoose.connect(
    'mongodb://localhost/yelp_camp'
    , {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

// =========================== >> PASSPORT-CONFIG << ==================================
app.use(require('express-session')({
    secret              :   "Finally this is going to be completed...And BTW Happy New Year",
    resave              :   false,
    saveUninitialized   :   false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {  
    res.locals.currentUser  =   req.user;
    next();
});
// =========================== >> E-O-PASSPORT-CONFIG << =============================

// ============================ >>  ROUTES  << ========================================

/*    HOME    */
app.get('/',function (req,res) {  
    res.render('landing');
});

/*  SHOWING ALL THE CAMPGROUNDS */
app.get('/campgrounds',function (req,res) {  
    // Get all the campgrounds from DB
    Campground.find({}, function (err,allCampgrounds){  
        if(err)console.log(err);
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

/*  CREATING A NEW CAMPGROUND */
app.post('/campgrounds',function(req, res){
    // get data from form and add to campgrounds array 
    var name    = req.body.name;
    var image   = req.body.image;
    var desc    = req.body.description;
    var newCampG = { name : name, image : image, description : desc};
    Campground.create(newCampG,function (err,newlyCreated) {  
        if(err){
            console.log(err);
        }else
        {   
            console.log(newlyCreated);
            res.redirect("/campgrounds");
            // redirect back to campgrounds page
        }
    });

});

/* FORM FOR ADDING NEW CAMPGROUND */
app.get('/campgrounds/new',function (req, res){
    res.render("campgrounds/new");
});

/*  Show Route */
app.get("/campgrounds/:id",(req,res)=>{
    var id = req.params.id;
    // find the campground with provided ID
    Campground.findById(id).populate("comments").exec(function (err,foundCampground) {  
        if(err) console.log(err);
        else
        {   // showing the requested data
            res.render("campgrounds/show",{campground:foundCampground});
        } 
    });
  
});

/* New Comment form*/
app.get('/campgrounds/:id/comments/new',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err) console.log(err);
        else
        {
            res.render("comments/new",{campground:campground});
        }
    });

});

/*  Create New Comment */
app.post('/campgrounds/:id/comments',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        } 
        else
        {
            Comment.create(req.body.comment, (err,comment)=>{
                if(err) console.log(err);
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id)
                }
            });
            
        }
    });
});
                                //  ===========  //
                                //  AUTH ROUTES  //
                                //  ===========  //
// SHOW REGISTER FORM
app.get('/register', (req, res) => {
return 	res.render("register");
});

app.post('/register', (req,res)=>{
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
app.get('/login', (req, res) => {
return 	res.render("login");
});

// POST for login
app.post('/login', passport.authenticate("local",
    {   successRedirect   : "/campgrounds",
        failureRedirect   : "/login"
    }),(req, res) => {
        
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {  
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
// ============================ >> END OF ROUTES << ========================================



// ============= LISTENING =============
app.listen(3000,function(){
    console.log('listening to 3000 ...');
});