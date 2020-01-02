var router  = require('express').Router({mergeParams : true})

router.get("/",(req,res)=>{
return  res.render("contact-us");
});

module.exports = router;