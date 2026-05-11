import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3000/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function toggleForm() {
    setShowForm((prev) => !prev);
  }

  // GET ALL TOYS
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // ADD TOY
  function addToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  // DELETE TOY
  function handleDelete(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((toy) => toy.id !== id));
    });
  }

  // LIKE TOY
  function handleLike(toy) {
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  }

  return (
    <>
      <Header />

      {showForm && <ToyForm addToy={addToy} />}

      <div className="buttonContainer">
        <button onClick={toggleForm}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </>
  );
}

export default App;