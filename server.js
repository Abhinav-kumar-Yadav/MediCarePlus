const express = require('express');
const session = require("express-session");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:"very secret dont tell any one",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:6000*7}
}));


app.use('/', require("./routes/homeRoute.js"));
app.use('/mail',require("./routes/mail.js"));
app.use("/signup",require("./routes/register.js"))

app.listen(port, () => {
  console.log(`✅ Your app is running on http://localhost:${port}`);
}); 
