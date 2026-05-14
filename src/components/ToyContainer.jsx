import {useState, useEffect} from "react";
import ToyCard from "./ToyCard";

const [toys, setToys] = useState([])

// Fetch toys on page reload
useEffect(()=>{
  fetch("http://localhost:3001/toys")
  .then((res) =>res.json())
  .then((data) => setToys(data))
},[])

function ToyContainer() {
  return (
    <div id="toy-collection">{/* Render the collection of ToyCards */
      toys.map((toy)=> (
        <ToyCard  key={toy.id} toy={toy}/>
      ))
    
    }</div>
  );
}

export default ToyContainer;
