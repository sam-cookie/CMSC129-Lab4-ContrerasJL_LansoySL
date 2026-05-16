const express = require('express');
const router = express.Router();
const { createNote, getAllNotes, updateNote, deleteNote } = require('../controllers/notesController');

router.post('/', createNote);
router.get('/', getAllNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;