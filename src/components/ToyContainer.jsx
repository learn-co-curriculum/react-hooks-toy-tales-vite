import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toys, setToys] = useState([]);
  
  console.log(toys);
  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setToys(data))
  },[])

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Toy deleted");
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

    function handleLike(id) {
    // Find the toy that was clicked
      const toy = toys.find((toy) => toy.id === id);

      fetch(`http://localhost:3001/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: toy.likes + 1,
        }),
      })
        .then((res) => res.json())
        .then((updatedToy) => {
          // Update only the toy that was liked
          setToys((prevToys) =>
            prevToys.map((toy) =>
              toy.id === updatedToy.id ? updatedToy : toy
            )
          );
        });
    }

  return (
    <div id="toy-collection">
      {toys.map((toy)=>(
        <ToyCard key={toy.id} toy={toy} handleDelete={handleDelete} handleLike={handleLike}/>
      ))}
    </div>
  );
}

export default ToyContainer;
