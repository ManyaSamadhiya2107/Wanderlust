const express= require("express");
const router=express.Router({mergeParams :true});
const wrapAsync =require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError =require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isReviewAuthor}= require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");

const listingController=require("../controllers/reviews.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
    }
    else{
      next();
    }
  };

//reviews
//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(listingController.createReview));

//delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(listingController.destroyReview));
module.exports=router;