import React, { useState } from "react";

// ToyForm manages its own controlled input state.
// On submit it builds a new toy object (likes starts at 0) and hands it
// up to App via onAddToy, which does the actual POST request.
function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({ name: "", image: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    // New toys always start with 0 likes per the spec
    onAddToy({
      name: formData.name,
      image: formData.image,
      likes: 0,
    });

    // Reset form fields after submission
    setFormData({ name: "", image: "" });
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
