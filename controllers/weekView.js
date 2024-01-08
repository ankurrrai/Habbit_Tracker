const Habits = require('../models/habits')
const Status = require('../models/status')

// assigned all month name
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

// render the week page 
module.exports.weekView= async function(req,res)
{
    try{

        let habits =await Habits.find({}).populate('status');

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        res.render('./weekView',{
            habits:habits,
            currdate:date
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
}

// toggle the stauts according to status
module.exports.toggleStatus=async function(req,res)
{
    try {

        let status = await Status.findOne({habit:req.query.id,date:req.query.date})

        if(status.datestatus==='Not Started')
        {
            status.datestatus='Done';
        }
        else if(status.datestatus==='Done')
        {
            status.datestatus='Not Done';
        }
        else{
            status.datestatus='Not Started';
        }

        status.save();

       
        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
    
}