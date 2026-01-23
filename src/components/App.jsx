import { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";


function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => r.json())
      .then(data => setToys(data));
    setLoading(false)
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    console.log('Received new toy: ', newToy)
    setToys((prevToys) => {
      return [...prevToys, newToy]
    });
  }


  function handleDeleteToy(deletedToyId) {
    const updatedToys = toys.filter((toy) => toy.id !== deletedToyId);
    setToys(updatedToys)
  }


  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {loading ? <h2>Loading...</h2> :
        <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} />}
    </>
  );
}

export default App;
