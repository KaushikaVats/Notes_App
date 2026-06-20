const noteController = require("../controllers/note.conctroller")
const router = require("express").Router();

router.get("/subject/:subject", noteController.getNotesBySubName);
router.get("/user/:userId", noteController.getNotesByUserId);
router.post("/", noteController.createNote);
router.put("/:noteId", noteController.updateNote);
router.delete("/:noteId", noteController.deleteNote);

module.exports = router;