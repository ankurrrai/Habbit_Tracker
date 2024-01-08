const Habits = require('../models/habits')
const Status = require('../models/status')

// assigned all months name
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

// render the home page with all available habits
module.exports.home= async function(req,res)
{
    try{

        let habits =await Habits.find({}).populate('status');

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        res.render('./home',{
            habits:habits,
            currdate:date
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
    
}

// create new habit and mark the status for last 7 day include created date as not started
module.exports.create=async function(req,res)
{
    try {

        let nameValue = (req.body.habits?req.body.habits:req.body.custom_meal);

        let habit = await Habits.findOne({ name: nameValue });

        if (habit) {
            console.log('Habit Already Exists')
            return res.redirect('back');
        }

        habit = await Habits.create({
            name:nameValue
        })

            
        for(let i=0;i<7;i++)
        {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);

                const month = monthNames[currentDate.getMonth()];
                const day = currentDate.getDate();
        
                const formattedDate = `${month} ${day}`;

            let date= await Status.create(
                {
                    date:formattedDate,
                    datestatus:'Not Started',
                    habit:habit._id
                }
            )
            habit.status.push(date);
            
        }
        habit.save();

        return res.redirect('back');
    
        
    } catch (error) {
        console.log('Error', error);
    }
    
}
// according to query check the status and change the status
module.exports.toggleStatus=async function(req,res)
{
    try {

        let currentDate = new Date();

        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();

        const date = `${month} ${day}`;

        let status = await Status.findOne({habit:req.query.id,date:date})

        status.datestatus=req.query.status;
        status.save();

        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
    
}

// to delete the habbit task
module.exports.delete=async function(req,res)
{
    try {
        let habit = await Habits.deleteOne({_id:req.params.id});

        await Status.deleteMany({habit:req.params.id})

        res.redirect('back')
        
    } catch (error) {
        console.log('Error', error);
    }
}