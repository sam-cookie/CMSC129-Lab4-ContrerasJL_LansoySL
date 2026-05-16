const { createNote, getNotes, updateNote, deleteNote } = require('../noteUtils');
const store = require('../store/notesStore');

function createNoteHandler(req, res) {
  const { title, body } = req.body;
  const note = createNote(store.getNotes(), title, body);

  if (!note) {
    return res.status(400).json({ error: 'Title must not be empty.' });
  }

  return res.status(201).json(note);
}

function getAllNotesHandler(req, res) {
  return res.status(200).json(store.getAll());
}

function updateNoteHandler(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;

  const updated = updateNote(store.getNotes(), id, title, body);
  if (!updated) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  return res.status(200).json(updated);
}

function deleteNoteHandler(req, res) {
  const { id } = req.params;

  const deleted = deleteNote(store.getNotes(), id);
  if (!deleted) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  return res.status(200).json({ message: 'Note deleted successfully.' });
}

module.exports = { createNoteHandler, getAllNotesHandler, updateNoteHandler, deleteNoteHandler };