import React, { useState } from "react";

// ToyForm component allows users to add a new toy via controlled inputs.
function ToyForm({ onAddToy }) {
  // State to hold form input values
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // Handles form submission
  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0,
    };

    // Send POST request to backend to create new toy
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((createdToy) => {
        // Inform parent component of new toy
        if (onAddToy) {
          onAddToy(createdToy);
        }
        // Clear form fields
        setName("");
        setImage("");
      })
      .catch((error) => console.error("Failed to add toy:", error));
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
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
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