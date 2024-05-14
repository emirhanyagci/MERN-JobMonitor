const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteControllers");
router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
