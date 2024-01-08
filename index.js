const express=require('express');
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const port=8000;


app.use(express.urlencoded());
app.use(express.static('./assests'))

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){console.log(`Server Error ${err}`);};
    console.log(`Server is running on port : ${port}`);
})

