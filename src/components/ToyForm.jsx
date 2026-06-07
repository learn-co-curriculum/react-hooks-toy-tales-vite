import React from "react";
import React, { useState } from "react";

function ToyForm( {onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handlesubmit(e) {
    e.preventdefault();
    const toyData = {
      name: name,
      image: image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    })
    .then((res) => res.json())
    .then((newToy => {
      setName("");
      setImage("");
    }));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onsubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
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
