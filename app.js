var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    methodOverride = require('method-override'),
    LocalStrategy=require('passport-local'),
    seedDB      = require('./seeds'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    User        = require('./models/user');

var commentRoutes       =   require('./routes/comments'),
    campgroundRoutes    =   require('./routes/campgrounds'),
    indexRoutes         =   require('./routes/index');

// ================================================ //
app.use(bodyParser.urlencoded({extended:true}));  
app.set("view engine",'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); seed the database
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

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
// ============= LISTENING =============
app.listen(3000,function(){
    console.log('listening to 3000 ...');
});