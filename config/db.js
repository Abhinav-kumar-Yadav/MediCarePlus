const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/medicare").then("database connected successfuly").catch(err=>{
    console.log("error in connecting database"+err);
});

module.exports=mongoose;