import { useState, useEffect } from "react"
import ToyCard from "./ToyCard"

function ToyContainer() {

  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} toys={toys} setToys={setToys}/>
      ))}
    </div>
  )
}

export default ToyContainer