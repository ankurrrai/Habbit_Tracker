const mongoose=require('mongoose');

main().catch(function(err){
    console.log(`Error is while connecting db : ${err}`);
});

async function main(){
    console.log(process.env.habbitTrackerMongoURL)
    mongoose.connect('mongodb://127.0.0.1:27017/habbit_tracker_dev');
};

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error while Established the DB'));
db.once('open',function(){
    console.log('Connection eastablished with db');
});

module.exports=db;