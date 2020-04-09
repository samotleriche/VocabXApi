const express = require("express");
const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  getUserInRadius
} = require("../controllers/users");
const User = require("../models/User");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router.use(protect);
router.use(authorize("admin"));

router.route("/radius/:zipcode/:distance").get(getUserInRadius);

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
