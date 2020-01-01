var router = require('express').Router();
var Campground  = require('../models/campground');

/*  SHOWING ALL THE CAMPGROUNDS */
router.get('',function (req,res) {  
    Campground.find({}, function (err,allCampgrounds){  
        if(err)console.log(err);
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

/*  CREATING A NEW CAMPGROUND */
router.post('',function(req, res){
    var newCampG = 
    { 
        name        : req.body.name,
        image       : req.body.image,
        description : req.body.description
    };
    Campground.create(newCampG,function (err,newlyCreated) {  
        if(err){
            console.log(err);
        }else
        {   
            // Redirecting back to campgrounds
            res.redirect("");
            
        }
    });

});

/* NEW CAMPGROUND FORM */
router.get('/new',function (req, res){
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

module.exports = router;