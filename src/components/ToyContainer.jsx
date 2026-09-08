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
  return (
    <div id="toy-collection">
      {toys.map((toy)=>(
        <ToyCard toy={toy}/>
      ))}
    </div>
  );
}

export default ToyContainer;
