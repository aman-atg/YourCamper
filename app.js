// ! why the fuck my shift + . not working sometimes 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));


var campgrounds = [
    {   
        name:   "Robot",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Funny Camp",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Killing machine",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "abcd camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "xyz camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {   
        name:   "Robot",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Funny Camp",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Killing machine",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "abcd camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "xyz camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {   
        name:   "Robot",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Funny Camp",
        img:    "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "Killing machine",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "abcd camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    },
    {
        name:   "xyz camp",
        img :   "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287fd79249c459_340.png"
    }
]

app.set("view engine",'ejs');
//app.use(express.static(__dirname + "/public/"));
app.get('/',function (req,res) {  
    res.render('landing');
});



app.get('/campgrounds',function (req,res) {  
 
     
    res.render("campgrounds",{campgrounds:campgrounds});

    
});
var name,image;
app.post('/campgrounds', (req, res) => {
   
  name = req.body.name;
  image= req.body.image;
  console.log(name);
  console.log(image);

    // get data from form and add to campgrounds array
   var newCampG = {name:name, img : image};
     campgrounds.push(newCampG);
  
    res.redirect("/campgrounds");
 
    // redirect back to campgrounds page


});

app.get('/campgrounds/new',function (req, res){
    res.render("new.ejs");
});


app.listen(3000,function(){
    console.log('listening to 3000 ...');
});