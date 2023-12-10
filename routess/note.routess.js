const express = require("express");
const { NoteModel } = require("../models/note.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

//restricted routes

noteRouter.post("/create", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new note has been added" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

noteRouter.patch("/update/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (req.body.userID === note.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).send({ msg: `Note with ID:${noteID} has been updated` });
    } else {
      res.status(200).send({ msg: "You are not authorized" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

noteRouter.delete("/delete/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (req.body.userID === note.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).send({ msg: `Note with ID:${noteID} has been deleted` });
    } else {
      res.status(200).send({ msg: "You are not authorized" });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = {
  noteRouter,
};
