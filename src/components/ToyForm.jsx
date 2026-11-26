import React from "react";

function ToyForm() {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.name.value || !e.target.image.value) {
      alert("Please fill in all fields.");
      return;
    }

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newToy),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add toy");
                }
                return response.json();
            })
            .then((data) => {
                // onAddProduct(data); // Update UI with new product
                alert("Toy added successfully!");
                setTitle("");
                setPrice("");
                setCategory("");
            })
            .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
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
