// ! img https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png
// ! why the fuck my shift + . not working sometimes 


var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

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

// ============== CAMPGROUND-SCHEMA ======================
var campgroundSchema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : String
});
// ============= CAMPGROUND-MODEL ======================== 
var Campground = mongoose.model("Campground",campgroundSchema)

// =========================== >> DATABASE-MANAGEMENT << ==============================




// =========================== >> END OF DB-MANAGEMENT << =============================

// ============================ >>  ROUTES  << ========================================

app.get('/',function (req,res) {  
    res.render('landing');
});

app.get('/campgrounds',function (req,res) {  
    // Get all the campgrounds from DB
    Campground.find({}, function (err,allCampgrounds){  
        if(err)console.log(err);
        else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
    
});
 
app.post('/campgrounds',function(req, res){
    // get data from form and add to campgrounds array 
    var name = req.body.name;
    var image= req.body.image;
    console.log(name);
    var newCampG = { name : name, image : image};
    Campground.create(newCampG,function (err,newlyCreated) {  
        if(err){
            console.log("fuck");
        }else
        {   
            console.log(newlyCreated);
            res.redirect("/campgrounds");
            // redirect back to campgrounds page
        }
    });

});

app.get('/campgrounds/new',function (req, res){
    res.render("new.ejs");
});

// ============================ >> END OF ROUTES << ========================================



// ============= LISTENING =============
app.listen(3000,function(){
    console.log('listening to 3000 ...');
});