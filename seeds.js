var mongoose    =   require('mongoose'),
    Campground  =   require('./models/campground'),
    Comment     =   require('./models/comment');

var data  = [
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "This is a nice description about the above fictional campground for pokemons and toy story fans....nyc...really nice"
    },
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "This is a nice description about the above fictional campground for pokemons and toy story fans....nyc...really nice"
    },
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "This is a nice description about the above fictional campground for pokemons and toy story fans....nyc...really nice"
    }
];


function seedDB(){
    // REMOVED ALL CAMPGROUNDS
    Campground.remove({},(err)=>{
        if(err) console.log(err);
        console.log("Removed Campgrounds!");
    });
    // ADDING NEW CAMPGROUNDS
    data.forEach(function(seed){
        Campground.create(seed ,function (err,campground) {  
            if(err) console.log(err);
            else{
                console.log("added a campground");
                Comment.create(
                    {
                        text   :    "This place is great but I wish there was internet",
                        author :    "Homer"
                    },
                        function (err,comment){  
                            if(err) console.log(err);
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment ");
                            }
                });
            }
        });
    });
}


module.exports = seedDB;
