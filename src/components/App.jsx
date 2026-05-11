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
      .then((r) => {
        if (!r.ok) throw new Error("failed to get toys");
        return r.json();
      })
      .then((data) => setToys(data))
      .catch((e) => console.log(e.message));
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
  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} />
      <ToyForm addToy={addToy} />
    </>
  );
}

export default App;
