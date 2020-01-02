var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    methodOverride = require('method-override'),
    LocalStrategy=require('passport-local'),
    seedDB      = require('./seeds'),
    User        = require('./models/user');

var commentRoutes       =   require('./routes/comments'),
    campgroundRoutes    =   require('./routes/campgrounds'),
    indexRoutes         =   require('./routes/index'),
    contactUS           =   require('./routes/contact-us');
// ================================================ //
app.use(bodyParser.urlencoded({extended:true}));  
app.set("view engine",'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//app.use('/favicon.ico', express.static('favicon.ico'));
app.use(flash());
//seedDB(); seed the database
// ================================================ //

    mongoose.connect(
    process.env.DATABASEURL || 'mongodb://localhost/yelp_camp?retryWrites=true&w=majority' ,
    {
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
// =========================== >> E-O-PASSPORT-CONFIG << =============================
app.use(function (req,res,next) {  
    res.locals.currentUser  =   req.user;
    res.locals.error        =   req.flash("error");
    res.locals.success      =   req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/contact-us",contactUS);
// ============= LISTENING =============
app.listen(process.env.PORT || 5000,()=>{
    console.log("Listening to YourCamper Server.");
});