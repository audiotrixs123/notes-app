import { Router } from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
  res.json(notes);
});

router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ msg: "Title required" });
  const note = await Note.create({ user: req.userId, title, content });
  res.status(201).json(note);
});

router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title, content },
    { new: true }
  );
  if (!note) return res.status(404).json({ msg: "Note not found" });
  res.json(note);
});

router.delete("/:id", auth, async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!note) return res.status(404).json({ msg: "Note not found" });
  res.json({ ok: true });
});

export default router;
