import React, { useState } from "react";

// Controlled form that creates a new toy on the backend
function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({ name: "", image: "" });

  // Update the field that matches the input's name attribute
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // POST the new toy (starting at 0 likes), then pass it up to App
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        likes: 0,
      }),
    })
      .then((r) => r.json())
      .then((newToy) => {
        onAddToy(newToy);
        setFormData({ name: "", image: "" });
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
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
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
