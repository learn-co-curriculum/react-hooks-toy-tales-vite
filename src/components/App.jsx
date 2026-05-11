import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3000/toys";

function App() {
  const [showForm, setShowForm] = useState(false);

  // ✅ ADD STATE FOR TOYS
  const [toys, setToys] = useState([]);
  function addToy(newToy) {
  setToys((prev) => [...prev, newToy]);
}
function deleteToy(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  setToys((prev) => prev.filter((toy) => toy.id !== id));
}

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // ✅ FETCH TOYS ON PAGE LOAD
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setToys);
  }, []);
  function updateLikes(toyObj) {
  fetch(`${API}/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: toyObj.likes + 1,
    }),
  })
    .then((res) => res.json())
    .then((updatedToy) => {
      setToys((prev) =>
        prev.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        )
      );
    });
}

  return (
    <>
      <Header />

      {showForm && <ToyForm addToy={addToy} />}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      {/* ✅ PASS TOYS DOWN */}
     <ToyContainer
  toys={toys}
  setToys={setToys}
  deleteToy={deleteToy}
  updateLikes={updateLikes}
/>
    </>
  );
}

export default App;