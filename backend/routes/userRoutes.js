const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createNewUser,
  uptadeUser,
  deleteUser,
} = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");
// all note operates required to be authed
router.use(verifyJWT);

router
  .route("/")
  .get(getAllUser)
  .post(createNewUser)
  .patch(uptadeUser)
  .delete(deleteUser);
module.exports = router;
