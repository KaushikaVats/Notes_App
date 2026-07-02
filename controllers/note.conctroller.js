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
const toggleFavorite = async (req, res) => {

    try {

        const { noteId } = req.params;

        const note = await Note.findOne({
            _id: noteId,
            user: req.user
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        note.isFavorite = !note.isFavorite;

        await note.save();

        res.status(200).json({
            message: "Favorite updated",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};
const getMyNotes = async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.user
        });


        res.status(200).json(notes);


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
}
const createNote = async (req, res) => {
    try {

        const { title, content, subject } = req.body;

        const newNote = new Note({
            title,
            content,
            subject,

            // coming from JWT middleware
            user: req.user
        });

        const savedNote = await newNote.save();

        res.status(201).json(savedNote);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
const updateNote = async (req, res) => {
    try {

        const { noteId } = req.params;
        const { title, content, subject } = req.body;


        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: noteId,
                user: req.user   // only owner's note
            },
            {
                title,
                content,
                subject
            },
            {
                new: true
            }
        );


        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found or you are not authorized"
            });
        }


        res.status(200).json(updatedNote);


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};
const deleteNote = async (req, res) => {
    try {

        const { noteId } = req.params;


        const deletedNote = await Note.findOneAndDelete(
            {
                _id: noteId,
                user: req.user
            }
        );


        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found or you are not authorized"
            });
        }


        res.status(200).json({
            message: "Note deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};
module.exports = {
    getNotesBySubName,
    toggleFavorite,
    getMyNotes,
    createNote,
    updateNote,
    deleteNote

}