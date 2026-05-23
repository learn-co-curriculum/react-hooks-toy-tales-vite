import React, { useState } from "react";

/**
 * ToyForm Component
 * 
 * Form component for creating new toys
 * Responsibilities:
 * - Manage form input state (name and image URL)
 * - Handle form submission and POST request to backend
 * - Initialize new toys with likes set to 0
 * - Clear form after successful submission
 * - Notify parent component of new toy via callback
 * 
 * Props:
 * @param {Function} onAddToy - Callback function to handle new toy addition
 */
function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  /**
   * Handle form input changes
   * Updates the formData state as the user types
   * @param {Event} event - The input change event
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  /**
   * Handle form submission
   * Makes a POST request to create a new toy with initial likes set to 0
   * Calls parent component callback with the new toy data
   * Resets the form after successful submission
   * @param {Event} event - The form submission event
   */
  function handleSubmit(event) {
    event.preventDefault();

    // Create new toy object with initial likes set to 0
    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    // Send POST request to backend
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddToy(data);
        // Reset form after successful submission
        setFormData({
          name: "",
          image: "",
        });
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
          required
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
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
