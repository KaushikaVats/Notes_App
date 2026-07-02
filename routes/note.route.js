const noteController = require("../controllers/note.conctroller")
const router = require("express").Router();
const protect = require("../middleware/auth.middleware")
router.get("/subject/:subject", protect, noteController.getNotesBySubName);
router.get("/my-notes", protect, noteController.getMyNotes)
router.post("/", protect, noteController.createNote);
router.put("/:noteId", protect, noteController.updateNote);
router.delete("/:noteId", protect, noteController.deleteNote);
router.patch(
    "/:noteId/favorite",
    protect,
    noteController.toggleFavorite
);
module.exports = router;