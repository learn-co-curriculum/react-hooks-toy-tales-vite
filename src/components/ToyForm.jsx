import { useState } from "react";

function ToyForm({ toys, setToys }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((addedToy) => {
        setToys([...toys, addedToy]);
      });

    setName("");
    setImage("");
  }

  return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enter a toy's name..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Enter a toy's image URL..."
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />

    <button type="submit">
      Add a Toy
    </button>
  </form>
);
}

export default ToyForm;