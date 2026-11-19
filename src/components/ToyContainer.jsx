import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {
  const [toy, setToy] = useState([])
  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(r=>{
      if(!r.ok){
        throw new Error("Cannot fetch")
      }return r.json()
    })
    .then(toy=>setToy(toy))
    .catch(err=>console.log(err))
  },[])
  return (
    <div id="toy-collection">{toy.map(toy =>(
      <ToyCard key={toy.id} toy={toy} />
    ))}</div>
  );
}

export default ToyContainer;
