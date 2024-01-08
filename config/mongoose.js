const mongoose=require('mongoose');

// connect with mongodb
main().catch(function(err){
    console.log(`Error is while connecting db : ${err}`);
});

async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/habbit_tracker_dev');
};

// accquire the connection
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error while Established the DB'));
db.once('open',function(){
    console.log('Connection eastablished with db');
});

module.exports=db;