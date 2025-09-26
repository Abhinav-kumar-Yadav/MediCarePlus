const express = require("express");
const User = require("../model/user"); 

const app = express();



app.post("/", async (req, res) => {

  
  try {
    const { fullname, auth_email, pass } = req.body;
    const data = await User.findOne({email:auth_email});
    
    if(!data){
    const user_info = new User({
      fullname,
      email: auth_email,
      password: pass
    });

    await user_info.save();
    console.log("Data saved");
    req.session.fullname;
    req.session.email=auth_email;

    res.status(201).json({ message: "User created successfully" });
  }else{
    res.json({message:"user already exist!! Please login"})
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user", error });
  }

});

app.post("/login",async (req,res)=>{
  const { login_email, login_pass } = req.body;
  const login_data = await User.findOne({$and:[{email:login_email},{pass:login_pass}]});
  if(!req.session.email){
    if(login_data){
      req.session.email;
      res.status(200).json({ message: "User loggdin successfully" });
    }else{
      res.json({message:"first register"})
    }
  }else{
    res.json({message:"you are already logdin"});
  }

});

module.exports = app; 



