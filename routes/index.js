const express = require('express');
const router = express.Router();

//All Routes
const homeController = require('../controller/home_controller');
const detailsController = require('../controller/details_controller');
const createController = require('../controller/create_controller');
const deleteController = require('../controller/delete_controller');

// To parse url
router.use(express.urlencoded());

router.get('/', homeController.home);
router.post('/add-Habit', homeController.create);
router.get('/delete', homeController.delete);

router.get('/details', detailsController.Details);
router.get('/changestatus', require("./prevdays"));
module.exports = router;