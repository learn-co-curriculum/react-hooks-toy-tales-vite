import React, { useState } from "react";

/**
 * Form used to create a new toy.
 * @param {Function} addToy - Callback used to add a toy to App state.
 */
function ToyForm({ addToy }) {

  // Stores the toy name
  const [name, setName] = useState("");

  // Stores the toy image URL
  const [image, setImage] = useState("");

  /**
 * Submits a new toy to the API.
 * @param {Event} e - Form submit event.
 */

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        addToy(newToy)
      });

    setName("");
    setImage("");
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
