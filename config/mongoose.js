const mongoose=require('mongoose');

main().catch(function(err){
    console.log(`Error is while connecting db : ${err}`);
});

async function main(){
    mongoose.connect(process.env.habbitTrackerMongoURL);
};

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error while Established the DB'));
db.once('open',function(){
    console.log('Connection eastablished with db');
});

module.exports=db;