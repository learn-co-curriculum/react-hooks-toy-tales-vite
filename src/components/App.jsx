import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // GET all toys on mount
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  // POST new toy → add to state
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((savedToy) => setToys((prev) => [...prev, savedToy]))
      .catch((err) => console.error("Failed to add toy:", err));
  }

  // PATCH likes + 1 → update that toy in state, preserve order
  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) =>
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        )
      )
      .catch((err) => console.error("Failed to update likes:", err));
  }

  // DELETE toy → remove from state
  function handleDelete(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, { method: "DELETE" })
      .then(() => setToys((prev) => prev.filter((t) => t.id !== toyId)))
      .catch((err) => console.error("Failed to delete toy:", err));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </>
  );
}

export default App;

