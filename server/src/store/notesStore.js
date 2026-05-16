let notes = [];

module.exports = {
  add: (note) => notes.push(note),
  getAll: () => [...notes],
  reset: () => { notes = []; },
};