const express = require("express");
const {
  getUser,
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  getUserInRadius
} = require("../controllers/users");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getUserInRadius);

router
  .route("/")
  .get(protect, authorize("admin"), getUsers)
  .post(protect, authorize("publisher"), createUser);

router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
