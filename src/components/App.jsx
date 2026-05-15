import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])


  useEffect(()=> {
    fetch("http://localhost:3001/toys")
    .then((resp) => resp.json())
    .then((data) => setToys(data))
  },[]);

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then((resp)=> resp.json())
  .then((addedToy)=> {
    setToys([...toys, addedToy]);
  })
  }

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
    .then(()=> {
      const updatedToys = toys.filter(
        (toy) => toy.id !== id
      )
      setToys(updatedToys);
    })
  }

  function updateLikes(toy) {
    const updatedLikes = {
      likes: toy.likes + 1,
    }
    fetch(`http://localhost:3001/toys/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      bofy: JSON.stringify(updatedLikes),
    })
    .then((resp) => resp.json())
    .then((updatedToy)=>{
      const updatedToyList = toys.map((t) =>
        t.id === updatedToy.id ? updatedToy : t
      )
      setToys(updatedToyList)
    })
    
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateLikes={updateLikes}/>
    </>
  );
}

export default App;
