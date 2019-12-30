// ! img https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole
// ! why the fuck my shift + . not working sometimes 


var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    seedDB      = require('./seeds'); seedDB();

// ================================================ //
app.use(bodyParser.urlencoded({extended:true}));  
app.set("view engine",'ejs');
//app.use(express.static(__dirname + "/public/")); // (for displaying local images from Images folder)
// ================================================ //
    mongoose.connect(
    'mongodb://localhost/yelp_camp'
    , {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

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
            res.render("index",{campgrounds:allCampgrounds});
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
    res.render("new.ejs");
});

/*  Show Route */
app.get("/campgrounds/:id",(req,res)=>{
    var id = req.params.id;
    // find the campground with provided ID
    Campground.findById(id).populate("comments").exec(function (err,foundCampground) {  
        if(err) console.log(err);
        else
        {   // showing the requested data
            res.render("show",{campground:foundCampground});
        } 
    });
  
});

/* New Comment form*/
app.get('/campgrounds/:id/comments/new', (req, res) => {
    res.render("show");
});

/*  Create New Comment */


// ============================ >> END OF ROUTES << ========================================



// ============= LISTENING =============
app.listen(3000,function(){
    console.log('listening to 3000 ...');
});