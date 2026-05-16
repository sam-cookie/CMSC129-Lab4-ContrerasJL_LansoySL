const express = require('express');
const router = express.Router();
const { 
  createNoteHandler, 
  getAllNotesHandler, 
  updateNoteHandler, 
  deleteNoteHandler 
} = require('../controllers/notesController');

router.post('/', createNoteHandler);
router.get('/', getAllNotesHandler);
router.put('/:id', updateNoteHandler);
router.delete('/:id', deleteNoteHandler);

module.exports = router;