var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
// ALL MIDDLEWARES
var middlewareObj ={};
    // CAMPGROUND OWNERSHIP
middlewareObj.checkCampgroundOwnership = function(req,res,next) {  
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                req.flash("error","Campground not found!");
                res.redirect("back");
            } 
            else
            {
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
       
                    next();
                }
                else
                {       req.flash("error", "Permission Denied!");
                        res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be logged in to do that!"); //rare..case
        res.redirect("back");
    }

}
    // COMMENT OWNERSHIP
middlewareObj.checkCommentOwnership = function(req,res,next) {  
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                req.flash("error","Comment not found!");
                res.redirect("back");
            } 
            else
            {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){       
                    next();
                }
                else
                {       req.flash("error", "Permission Denied!");
                        res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be logged in to do that!"); //rare..case
        res.redirect("back");
    }
    
}
    // LOGGED IN OR NOT
middlewareObj.isLoggedIn  = function (req,res,next) {  
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
}
    // IMAGE URL VALID OR NOT
middlewareObj.checkImg  =   function (req,res,next){
    if(req.body.image.match(/\.(jpeg|jpg|gif|png)$/) != null){
        //url valid
        next();
    }else{
        req.flash("error","Image URL is invalid!");
        res.redirect("back");
    }
}


module.exports  = middlewareObj;