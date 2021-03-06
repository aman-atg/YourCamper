var Campground  = require('../models/campground'),
    Comment     = require('../models/comment');
var router      = require('express').Router({mergeParams : true});
var middleware  = require('../middleware');

// COMMENT FORM 
router.get('/new',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err) console.log(err);
        else
        {
            res.render("comments/new",{campground:campground});
        }
    });

});
/*  CREATING A COMMENT */
router.post('',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        } 
        else
        {
            Comment.create(req.body.comment, (err,comment)=>{
                if(err){
                    req.flash("error","Something went wrong!");
                    console.log(err);
                }
                else{
                    // adding username and id to comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(); 
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Added a comment");
                    res.redirect("/campgrounds/"+campground._id)
                }
            });
        }
    });
});

// COMMENT EDIT
router.get('/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err) console.log(err);
        else
        {
            res.render("comments/edit", { campground_id : req.params.id, comment : foundComment });        
        }
    });
    
});
// COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , (err, updatedComment)=>{
        if(err) res.redirect("back");
        else res.redirect("/campgrounds/" + req.params.id ); 
    });
});
// COMMENT DELETE
router.delete('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            req.flash("error","Try Again!");
            res.redirect("back");
        } else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/" + req.params.id );
        }
        
    });
});

module.exports = router;