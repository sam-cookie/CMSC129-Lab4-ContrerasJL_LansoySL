const VALIDATION_RULES = {
  titleMaxLength: 256,
};

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).slice(2);

function createNote(notes, title, body) {
  const trimmedTitle = title ? title.trim() : '';
  if (!trimmedTitle) return null;
  if (trimmedTitle.length > VALIDATION_RULES.titleMaxLength) return null;
  const note = { id: generateId(), title: trimmedTitle, body, createdAt: new Date().toISOString() };
  notes.push(note);
  return note;
}

function getNotes(notes) {
  return notes;
}

function updateNote(notes, id, title, body) {
  const trimmedTitle = title ? title.trim() : '';
  if (!trimmedTitle) return null;
  if (trimmedTitle.length > VALIDATION_RULES.titleMaxLength) return null;
  const note = notes.find(n => n.id === id);
  if (!note) return null;
  Object.assign(note, { title: trimmedTitle, body });
  return note;
}

function deleteNote(notes, id) {
  // const index = notes.findIndex(n => n.id === id);
  // if (index === -1) return false;
  // notes.splice(index, 1);
  // return true;
}

module.exports = { createNote, getNotes, updateNote, deleteNote };