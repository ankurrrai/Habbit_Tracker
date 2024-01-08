const express = require('express');
const router = express.Router();
const startPageController = require('../controllers/startPage')

router.get('/', startPageController.home); //render the startpage
router.use('/habits', require('./habits')); //use the habit.js

module.exports = router;