import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // get toys from api
  async function fetchToys() {
    try {
      const res = await fetch("http://localhost:3001/toys");
      if (!res.ok) {
        throw new Error("Failed to fetch toys");
      }
      const data = await res.json();
      setToys(data);
    } catch (error) {
      console.log(error);
    }
  }

  //shwo toys on page load
  useEffect(() => {
    fetchToys();
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={setToys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
