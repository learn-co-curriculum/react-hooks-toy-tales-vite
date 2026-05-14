import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys,setToys] = useState([])

  useEffect(()=> { 
    fetch("http://localhost:3000/toys")
    .then (res => res.json())
    .then(data => setToys(data))
  },[])

  function handleAddToy(newToy){
    setToys([...toys,newToy])
  }

  function handleUpdateToy(updatedToy){
    setToys(toys.map(t=>t.id === updatedToy.id ? updatedToy: t))
  }

  function handleDeleteToy(id){
    setToys(toys.filter(t=> t.id !==id))
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={()=>setShowForm(show => !show)}>Add a Toy</button>
      </div>
      <ToyContainer 
      toys={toys}
      onUpdateToy={handleUpdateToy}
      onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;

