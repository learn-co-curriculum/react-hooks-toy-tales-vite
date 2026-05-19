// App.jsx

import { useEffect, useState } from "react"
import ToyCard from "./ToyCard"
import ToyForm from "./ToyForm"

function App() {
  const [toys, setToys] = useState([])

  // GET REQUEST
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
  }, [])

  // POST REQUEST
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((res) => res.json())
      .then((addedToy) => {
        setToys([...toys, addedToy])
      })
  }

  // DELETE REQUEST
  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id)
      setToys(updatedToys)
    })
  }

  // PATCH REQUEST
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
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        )

        setToys(updatedToys)
      })
  }

  return (
    <div className="App">
      <ToyForm onAddToy={handleAddToy} />

      <div className="toy-container">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDeleteToy={handleDeleteToy}
            onLikeToy={handleLikeToy}
          />
        ))}
      </div>
    </div>
  )
}

export default App