const express= require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync =require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const listingController=require("../controllers/users.js");

router.get("/signup", (req,res)=>{
    res.render("./users/signup.ejs");
});


router.post("/signup",wrapAsync(listingController.signup));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash: true}),async(req,res)=>{
     req.flash("success","Welcome to Wanderlust You are logged in!");
     res.redirect("/listings");
});

router.get("/logout",listingController.logout);

module.exports=router;