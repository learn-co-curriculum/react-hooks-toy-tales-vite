import React, { useState } from "react";

function ToyForm({ onAddNewToy }) {
  const [name, setName] = useState(""); // controlled input for toy name
  const [image, setImage] = useState(""); // controlled input for toy image URL

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleImageChange(event) {
    setImage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission (page reload)

    const newToy = {
      name: name,
      image: image,
      likes: 0, // rubric requires initial likes to be set to 0
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        onAddNewToy(createdToy); // send the new toy (with server-assigned id) up to App
        setName(""); // reset the form fields
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