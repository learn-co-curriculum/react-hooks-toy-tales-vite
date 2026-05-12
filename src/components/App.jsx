import { useEffect, useState } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleLikeToy(id) {
    const toyToUpdate = toys.find((toy) => toy.id === id);

    const updatedToy = {
      ...toyToUpdate,
      likes: toyToUpdate.likes + 1,
    };

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        const updatedToys = toys.map((toy) =>
          toy.id === id ? updatedToy : toy
        );

        setToys(updatedToys);
      });
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const filteredToys = toys.filter(
        (toy) => toy.id !== id
      );

      setToys(filteredToys);
    });
  }

  return (
    <div>
      <ToyForm toys={toys} setToys={setToys} />

      <ToyContainer
        toys={toys}
        setToys={setToys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </div>
  );
}

export default App;