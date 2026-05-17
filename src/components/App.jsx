import { useState, useEffect } from "react"
import ToyCard from "./components/ToyCard"

function App() {
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(data => setToys(data))
  }, [])

  return (
    <div>
      {toys.map(toy => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  )
}

export default App
