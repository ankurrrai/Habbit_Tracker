const Habits = require('../../models/habits');
const Status = require('../../models/status');

//assigned all months name
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  

// check the today date if it is new the remove older one from db as well
(async () => {
  try {
    let currentDate = new Date();
    let previousDate = currentDate;

    while (true) {
      currentDate = new Date();

      if (currentDate.getDate() !== previousDate.getDate()) {

        console.log('function run')
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const formattedDate = `${month} ${day}`;

        const dateToRemove = new Date(previousDate);
        dateToRemove.setDate(dateToRemove.getDate() - 7);
        const RemoveMonth = monthNames[dateToRemove.getMonth()];
        const RemoveDay = dateToRemove.getDate();
        const RemoveDate = `${RemoveMonth} ${RemoveDay}`;

        let habits = await Habits.find({});

        for (let habit of habits) {
          let status = await Status.findOne({ date: RemoveDate, habit: habit._id });

          if (status) {
            let dateID = status._id;

            await Status.deleteOne({ _id: dateID });

            await Habits.findByIdAndUpdate(habit._id, { $pull: { status: dateID } });
          }

          let newStatus = await Status.create({
            date: formattedDate,
            datestatus: 'Not Started',
            habit: habit._id
          });

          habit.status.push(newStatus._id);
          await habit.save();
        }
      }

      previousDate = currentDate;

      // Delay for 1 minute (adjust as needed)
      await delay(60000);
    }
  } catch (error) {
    console.log('Error', error);
  }
})();

//created function for delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
