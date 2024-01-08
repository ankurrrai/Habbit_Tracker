const express = require('express');
const router = express.Router();
const weekViewController = require('../controllers/weekView');
const homeController = require('../controllers/home')

router.get('/dailyView',homeController.home); //render the daily view page
router.post('/createHabit',homeController.create) //add new habit
router.get('/toggleStatus',homeController.toggleStatus) //change the status
router.get('/deleteHabit/:id',homeController.delete) // to delete the habit

router.get('/weeklyView', weekViewController.weekView); // to render the week page
router.get('/weeklyView/toggleStatus', weekViewController.toggleStatus); //to toggle the status


module.exports = router;