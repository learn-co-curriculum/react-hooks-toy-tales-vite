import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toys, SetToys] = useState([]);
  
  console.log(toys);
  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => SetToys(data))
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
  return (
    <div id="toy-collection">
      {toys.map((toy)=>(
        <ToyCard toy={toy} handleDelete={handleDelete}/>
      ))}
    </div>
  );
}

export default ToyContainer;
