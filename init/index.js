const mongoose= require("mongoose");
const initData= require("./data.js");
const Listing= require("../models/listing.js");

const mongourl='mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
    console.log("connected to url");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongourl);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj, owner:"66c8337f5fd19d831a50a37b"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();
/*const review= require("../models/review.js");

const mongourl='mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
    console.log("connected to url");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongourl);
}

const initDB= async()=>{
    await review.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj, owner:"66c8337f5fd19d831a50a37b"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();*/