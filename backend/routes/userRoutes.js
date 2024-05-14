const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createNewUser,
  uptadeUser,
  deleteUser,
} = require("../controllers/userControllers");

router
  .route("/")
  .get(getAllUser)
  .post(createNewUser)
  .patch(uptadeUser)
  .delete(deleteUser);
module.exports = router;
