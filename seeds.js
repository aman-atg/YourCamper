var mongoose    =   require('mongoose'),
    Campground  =   require('./models/campground'),
    Comment     =   require('./models/comment');

var data  = [
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas numquam inventore dolores? A voluptas, saepe ut delectus libero adipisci accusantium, illum voluptatem tempora rem corporis velit illo tempore quod unde. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio consequatur, est rerum, nostrum nulla ipsam asperiores adipisci explicabo amet ipsa voluptatum vel reprehenderit similique. Accusantium magni dolore vitae repellat ad. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet explicabo voluptatem minima placeat ex voluptate nobis necessitatibus harum ratione beatae doloremque, impedit, reprehenderit tempore quis, excepturi sint perferendis?At,vero!"
    },
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas numquam inventore dolores? A voluptas, saepe ut delectus libero adipisci accusantium, illum voluptatem tempora rem corporis velit illo tempore quod unde. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio consequatur, est rerum, nostrum nulla ipsam asperiores adipisci explicabo amet ipsa voluptatum vel reprehenderit similique. Accusantium magni dolore vitae repellat ad. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet explicabo voluptatem minima placeat ex voluptate nobis necessitatibus harum ratione beatae doloremque, impedit, reprehenderit tempore quis, excepturi sint perferendis?At,vero!"
    },
    {
        name        :   "Granite Hill",
        image       :   "https://www.photosforclass.com/download/pixabay-4363073?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6924ecd5f_960.png&user=bowl_of_nicole",
        description :   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas numquam inventore dolores? A voluptas, saepe ut delectus libero adipisci accusantium, illum voluptatem tempora rem corporis velit illo tempore quod unde. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio consequatur, est rerum, nostrum nulla ipsam asperiores adipisci explicabo amet ipsa voluptatum vel reprehenderit similique. Accusantium magni dolore vitae repellat ad. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet explicabo voluptatem minima placeat ex voluptate nobis necessitatibus harum ratione beatae doloremque, impedit, reprehenderit tempore quis, excepturi sint perferendis?At,vero!"
    }
];


function seedDB(){
    // REMOVED ALL CAMPGROUNDS
    Campground.remove({},(err)=>{
/*      if(err) console.log(err);
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
        }); */
    });
}


module.exports = seedDB;
