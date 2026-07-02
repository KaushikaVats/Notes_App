const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            default: ""
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        subject: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;