import React, { useState } from "react";

function ToyForm({setToys}) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

  const newToy = {
    name: name,
    image: image,
    likes: 0,
  }

  fetch('http://localhost:3001/toys', {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
  .then((response) => response.json())
  .then((newToy) => {
    setToys((currentToys) => [...currentToys, newToy])
    setName("")
    setImage("")
  })
  .catch((error) => console.error("Error adding toy:", error))
}

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a toy's name..."
          className="input-text"
          required
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter a toy's image URL..."
          className="input-text"
          required
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
