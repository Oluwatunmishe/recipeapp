const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const maincontroller = require("../controller/maincontroller");

router.get("/", usercontroller.displayHome);
router.post("/register", usercontroller.registerUsers);
router.post("/login", usercontroller.signin);

// for main controller
router.get("/", maincontroller.displayHome);
router.post('/', maincontroller.recipe)

module.exports = router;
