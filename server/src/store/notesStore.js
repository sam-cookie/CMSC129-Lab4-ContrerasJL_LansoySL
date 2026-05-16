let notes = [];

module.exports = {
  getNotes: () => notes,      // returns real array reference
  getAll: () => [...notes],   // returns copy for reading
  reset: () => { notes = []; },
};