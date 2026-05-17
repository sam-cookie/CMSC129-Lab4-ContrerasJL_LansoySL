import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    const note = {
      id: Date.now().toString(),
      title,
      body,
    };
    setNotes([...notes, note]);
    setTitle("");
    setBody("");
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h1>Notes App</h1>

      <div className="form">
        <input
          data-testid="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          data-testid="note-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button data-testid="submit-note" onClick={handleSubmit}>
          Add Note
        </button>
      </div>

      <div data-testid="note-list" className="note-list">
        {notes.length === 0 && (
          <p style={{ color: '#999', fontSize: '14px' }}>No notes yet.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <span>{note.title}</span>
            <button
              data-testid="delete-note"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;