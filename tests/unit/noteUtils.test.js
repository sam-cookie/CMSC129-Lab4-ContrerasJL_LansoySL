const { createNote, getNotes, updateNote, deleteNote } = require('../../server/src/noteUtils');

describe('createNote', () => {
  test('should create and return a note with title and body', () => {
    const notes = [];
    const note = createNote(notes, 'Test Title', 'Test Body');
    expect(note).toHaveProperty('id');
    expect(note.title).toBe('Test Title');
    expect(note.body).toBe('Test Body');
  });
});

describe('getNotes', () => {
  test('should return all notes', () => {
    const notes = [];
    createNote(notes, 'Note 1', 'Body 1');
    const result = getNotes(notes);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
  });
});

describe('updateNote', () => {
  test('should update an existing note and return the updated note', () => {
    const notes = [];
    const note = createNote(notes, 'Old Title', 'Old Body');
    const updated = updateNote(notes, note.id, 'New Title', 'New Body');
    expect(updated.title).toBe('New Title');
    expect(updated.body).toBe('New Body');
  });
});

describe('deleteNote', () => {
  test('should delete a note by id and return true', () => {
    const notes = [];
    const note = createNote(notes, 'To Delete', 'Body');
    const result = deleteNote(notes, note.id);
    expect(result).toBe(true);
    expect(notes.length).toBe(0);
  });
});