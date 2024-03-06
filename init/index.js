const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

//mongoDB connection
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wanderlust';
main()
    .then(()=> {
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
    
async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '65e18a392cd9b6666ea2b96b'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();