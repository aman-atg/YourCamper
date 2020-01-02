var router      = require('express').Router();
var Campground  = require('../models/campground');
var middleware  = require('../middleware');
/*  SHOWING ALL THE CAMPGROUNDS */
router.get('/',function (req,res) {  
    Campground.find({}, function (err,allCampgrounds){  
        if(err)console.log(err);
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

/*  CREATING A NEW CAMPGROUND */
router.post('/', middleware.isLoggedIn, middleware.checkImg, function(req, res){
    var newCampG = 
    { 
        name        : req.body.name,
        image       : req.body.image,
        description : req.body.description,
        author      : {
            id          :   req.user._id,
            username    :   req.user.username
        }
    };
    Campground.create(newCampG,function (err,newlyCreated) {  
        if(err){
            console.log(err);
        }else
        {   
            // Redirecting back to campgrounds
            res.redirect("/campgrounds");
            
        }
    });

});

/* NEW CAMPGROUND FORM */
router.get('/new',middleware.isLoggedIn, function (req, res){
    res.render("campgrounds/new");
});

/*  SHOW ROUTE */
router.get("/:id",(req,res)=>{
    var id = req.params.id;
    // find the campground with provided ID
    Campground.findById(id).populate("comments").exec(function (err,foundCampground) {  
        if(err) console.log(err);
        else
        {   // SHOWING REQUIRED CAMPGROUND
            res.render("campgrounds/show",{campground:foundCampground});
        } 
    });
  
});
// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground)=>{
            res.render("campgrounds/edit", { campground : foundCampground });
    });
});
// PUT 
router.put('/:id', middleware.checkCampgroundOwnership,middleware.checkImg2, (req, res) => {
 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err) 
            res.redirect("/campgrounds");
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// DESTROY ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        res.redirect("/campgrounds");
        console.log(err);
    });
});
 
module.exports = router;