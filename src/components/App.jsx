import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys when the component loads
  useEffect(() => {
     fetch("http://localhost:3001/toys")
       .then((response) => {
         if (!response.ok) {
            throw new Error("Failed to fetch toys");
         }
          return response.json();
       })
       
       .then((data) => setToys(data))
       .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

    // POST: Create a new toy
    function handleAddToy(newToy) {
     
      fetch("http://localhost:3001/toys", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(newToy),
      })
        .then((response) => {
           if (!response.ok) {
              throw new Error("Failed to create toy");
           }
           return response.json();
        })
          .then((createdToy) => {
              setToys((currentToys) => [...currentToys, createdToy]);
          })
          .catch((error) => console.error("Error creating toy:", error));
    }

    // DELETE: Donate a toy 
     function handleDeleteToy(id) {
        
      fetch(`http://localhost:3001/toys/${id}`, {
            method: "DELETE",
        }) 
          .then((response) => {
             if (!response.ok) {
                throw new Error("Failed to delete toy");
             }

             setToys((currentToys) => 
                currentToys.filter((toy) => toy.id != id)
            );
          })
           .catch((error) => console.error("Error deleting toy:", error));
     }
   
     // PATCH: Increase toy likes
      function handleLikeToy(toy) {

        fetch(`http://localhost:3001/toys/${toy.id}`, {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
                likes: toy.likes + 1,
             }),
        })

          .then((response) => {
              if (!response.ok) {
                 throw new Error("Failed to update likes");
              }
              return response.json();
          })
           .then((updatedToy) => {
             setToys((currentToys) => 
                currentToys.map((item) =>
                     item.id === updatedToy.id ? updatedToy : item  
            )
          );
        })
         .catch((error) => console.error("Error updating likes:", error));
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
          onDeleteToy={handleDeleteToy}
          onLikeToy={handleLikeToy}         
      />
    </>
  );
}

export default App;
