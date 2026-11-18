import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH" ,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((item) => 
            item.id === updatedToy.id ? updatedToy : item
         )
       );
      });
 }
 function handleDonate(toy) {
  fetch(`http://localhost:3001/toys/$ {toy.id}`, { 
    method: "DELETE",
 }).then(() => { 
    setToys((currentToys) =>
      currentToys.filter((item) => item.id !== toy.id)
       );
     });
  }

  function handleAddToy(newToy) { 
    fetch("http://localhost:3001/toys", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        ...newToy,
        likes: 0,
      }), 
   })
   .then((response) => response.json())
   .then((addedToy) => {
    setToys((currentToys) => [...currentToys, addedToy]);
    setShowForm(false);
     });
   }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer 
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
    />
    </>
  );
} 

export default App;

