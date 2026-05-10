import React, { useState, useEffect } from "react";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import Header from "./Header";
 
const API_URL = "http://localhost:3001/toys";
 
function App() {
  // ─── STATE ───────────────────────────────────────────────────────────────
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);
 
  // ─── TASK 1 — GET: Fetch all toys on page load ───────────────────────────
  // When: component mounts
  // Fetch: GET /toys
  // Update: setToys with the returned array
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []); // empty dependency array → runs once on mount
 
  // ─── TASK 2 — POST: Add a new toy ────────────────────────────────────────
  // When: form is submitted
  // Fetch: POST /toys with toy data (likes start at 0)
  // Update: append new toy to toys array in state
  function handleAddToy(newToyData) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newToyData, likes: 0 }),
    })
      .then((res) => res.json())
      .then((createdToy) => setToys((prev) => [...prev, createdToy]))
      .catch((err) => console.error("Error adding toy:", err));
  }
 
  // ─── TASK 3 — DELETE: Donate (delete) a toy ──────────────────────────────
  // When: "Donate to Goodwill" button is clicked
  // Fetch: DELETE /toys/:id
  // Update: filter the deleted toy out of state
  function handleDeleteToy(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setToys((prev) => prev.filter((toy) => toy.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting toy:", err));
  }
 
  // ─── TASK 4 — PATCH: Like a toy ──────────────────────────────────────────
  // When: "Like" button is clicked
  // Fetch: PATCH /toys/:id with updated likes count
  // Update: replace the toy in state (preserving order)
  function handleLikeToy(toy) {
    const updatedLikes = { likes: toy.likes + 1 };
 
    fetch(`${API_URL}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLikes),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        // map over state, swap in the updated toy — ORDER IS PRESERVED
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      })
      .catch((err) => console.error("Error liking toy:", err));
  }
 
  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="App">
      <Header showForm={showForm} setShowForm={setShowForm} />
 
      {showForm && <ToyForm onAddToy={handleAddToy} />}
 
      <ToyContainer
        toys={toys}
        onLike={handleLikeToy}
        onDelete={handleDeleteToy}
      />
    </div>
  );
}

export default App;
 
