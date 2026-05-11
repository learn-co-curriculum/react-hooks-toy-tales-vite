import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import ToyCard from "./ToyCard";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => {
        setToys(data.toys ?? data);
      });
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  const addToy = (toy) => setToys((prev) => [...prev, toy]);
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.log(error));
  }

  function updateToyLikes(id, currentLikes) {
    const updatedLikes = currentLikes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        setToys((prevToys) => prevToys.map((toy) => (toy.id === id ? updatedToy : toy)));
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <Header />

      <div className="buttonContainer">
        <button onClick={() => setShowForm((s) => !s)}>Add a Toy</button>
      </div>

      {showForm && <ToyForm addToy={addToy} />}

      <ToyContainer toys={toys} deleteToy={deleteToy} updateToyLikes={updateToyLikes} />
    </>
  );
}

export default App;
