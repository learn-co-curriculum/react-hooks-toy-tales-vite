import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const defaultForm = { name: "", image: "", likes: 0 };
  const [formData, setFormData] = useState(defaultForm);
  function handleSubmit(e) {
    e.preventDefault();
    addNewToy();
  }
  function handeleOnChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //add data to database
  async function addNewToy() {
    try {
      const res = await fetch("http://localhost:3001/toys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("failed to add new toy");
      }
      const data = await res.json();
      onAddToy((prev) => [...prev, data]);
      setFormData(defaultForm);
    } catch (error) {
      console.log(error);
    }
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
          onChange={handeleOnChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handeleOnChange}
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
