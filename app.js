// ! why the fuck my shift + . not working sometimes 

var express = require('express');
var app = express();

app.set("view engine",'ejs');

app.get('/',function (req,res) {  
    res.render('landing');
});



app.get('/campgrounds',function (req,res) {  
    var campgrounds = [
        {   
            name:   "Robot",
            img:    "/assets/Imgs/blake-carpenter-Ok2-7hSwYro-unsplash.jpg"
        },
        {
            name:   "Funny",
            img:    "/assets/Imgs/blake-carpenter-Ok2-7hSwYro-unsplash.jpg"
        },
        {
            name:   "yeah yeah very funny",
            img :   "/assets/Imgs/allison-christine-8j-2d94Orlc-unsplash.jpg"
        }
    ]

     
    res.render("campgrounds",{campgrounds:campgrounds});

    
});


app.listen(3000,function(){
    console.log('listening to 3000 ...');
});