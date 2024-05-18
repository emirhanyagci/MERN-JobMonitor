const Note = require("../models/Note");
//const User = require("../models/User");
const asyncHandler = require("express-async-handler");
// @desc Get all notes
// @route GET /notes
// @access Private

exports.getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate("user");
  if (!notes.length) {
    return res.status(400).json({
      message: "No note found ",
    });
  }
  return res.json(notes);
});

// @desc Create a note
// @route POST /notes
// @access Private
exports.createNewNote = asyncHandler(async (req, res, next) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const createdNote = await Note.create({ user, title, text });
  if (!createdNote) {
    res.status(400).json({ message: "Invalid note data received" });
  }
  return res.status(201).json({ message: "New note created" });
});

// @desc Update a note
// @route PATCH /notes
// @access Private
exports.updateNote = asyncHandler(async (req, res, next) => {
  const { id, user, title, text, completed } = req.body;
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const note = await Note.findById(id).exec();
  if (!note) {
    // if note not exist
    return res.status(400).json({
      message: "Note not found",
    });
  }
  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;
  const updatedNote = await note.save();
  res.json({
    message: `${updatedNote.title} updated`,
  });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }
  const note = await Note.findById(id).exec();
  if (!note) {
    // if note not exist
    return res.status(400).json({
      message: "Note not found",
    });
  }
  const removedNote = await Note.findByIdAndDelete(id);

  res.json({ message: `${removedNote.title} deleted` });
});
// add eslint to project
