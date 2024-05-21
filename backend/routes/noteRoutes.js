const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteControllers");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
