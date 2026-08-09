import React, { useState } from "react";

function ToyForm({ onAddNewToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  // POST a new toy to the backend, then hand the created toy
  // (with its server-assigned id) back up to App via onAddNewToy
  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: name,
      image: image,
      likes: 0, // all new toys start with 0 likes
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        onAddNewToy(createdToy);
        // reset the form fields after a successful submission
        setName("");
        setImage("");
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={handleImageChange}
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