import React, { useState } from "react";

function ToyForm({onAddToy}) {


  const [formData, setFormData] = useState({ name: "", image: "" });
 
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.image) return; // basic validation
 
    // Pass data UP to App — App owns the fetch + state update
    onAddToy(formData);
 
    // Reset form fields
    setFormData({ name: "", image: "" });
  }

  return (

    <div className="form-container">
      <h2>Add a New Toy</h2>
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Create New Toy</button>
      </form>
    </div>
  );
}

export default ToyForm;
