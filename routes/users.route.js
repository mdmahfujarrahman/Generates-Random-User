const express = require("express");
const router = express.Router();
const userControlled = require("../controllers/users.controllers.js");

// get all user route
router.route("/all").get(userControlled.getAllUser);
router.route("/random").get(userControlled.getRandomUser);
router.route("/save").post(userControlled.saveAUser);
router.route("/update/:id").patch(userControlled.updateAUser);
router.route("/bulk-update").patch(userControlled.updateBulkUser);
router.route("/delete/:id").delete(userControlled.deleteUser);

module.exports = router;
