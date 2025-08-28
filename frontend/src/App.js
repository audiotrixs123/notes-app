import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // 🔹 Load notes from localStorage when app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // 🔹 Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setNotes([...notes, input]);
    setInput("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          📝 Simple Notes App
        </h1>

        {/* Input form */}
        <form onSubmit={addNote} className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        {/* Notes List */}
        <ul className="space-y-2">
          {notes.length === 0 ? (
            <li className="text-gray-500 text-center">No notes yet.</li>
          ) : (
            notes.map((note, index) => (
              <li
                key={index}
                className="bg-gray-50 p-2 rounded-lg shadow-sm flex justify-between items-center"
              >
                <span>{note}</span>
                <button
                  onClick={() => deleteNote(index)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
