const express= require("express");
const router=express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError =require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner}= require("../middleware.js");
const multer= require("multer");
const {storage}=require("../cloudConfig.js");
const upload= multer({ storage });


const listingController=require("../controllers/listings.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
    }
    else{
      next();
    }
  }

//index route
router.get("/", wrapAsync(listingController.index));
router.post("/",isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createListing));
  //new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

  //show route
  router.get("/:id", wrapAsync(listingController.showListing));
 
  //create route
  router.post("/", wrapAsync(listingController.createListing));
  //edit route
  router.get("/:id/edit",isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.editListing));
  
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

  //update route
  router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateListing));

  module.exports=router;