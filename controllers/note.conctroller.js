const Note = require("../models/note");
const getNotesBySubName = async (req, res) => {
    try {
        const { subject } = req.params;
        const notes = await Note.find({ subject: subject });
        console.log(notes);
        if (!notes) {
            return res.status(404).json({ message: "No notes found for the given subject" });
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const getNotesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await Note.find({ user: userId });
        if (!notes) {
            return res.status(404).json({ message: "No notes found for the given user" });
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const createNote = async (req, res) => {
    try {
        const { title, content, user, subject } = req.body;
        const newNote = new Note({
            title,
            content,
            user,
            subject
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content, subject } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content, subject },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}
module.exports = {
    getNotesBySubName,
    getNotesByUserId,
    createNote,
    updateNote,
    deleteNote
}