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
    .then((updatedToyFromServer) => {
      const updatedToys = toys.map((toy) =>
        toy.id === id ? updatedToyFromServer : toy
      );

      setToys((prev) =>
      prev.map((toy) =>
      toy.id === id ? { ...toy, likes: toy.likes + 1 } : toy
  )
);
    });
}

function handleDeleteToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  }).then(() => {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
  });
}

function handleAddToy(newToy) {
  fetch("http://localhost:3001/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((r) => r.json())
    .then((addedToy) => {
      setToys((toys) => [...toys, addedToy]);
    });
}

  return (
    <div>
      <ToyForm setToys={setToys} />
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