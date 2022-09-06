const express = require("express");
const router = express.Router();
const userControlled = require("../controllers/users.controllers.js");

// get all user route
router.route("/all").get(userControlled.getAllUser);
router.route("/random").get(userControlled.getRandomUser);
router.route("/save").post(userControlled.saveAUser);

module.exports = router;
