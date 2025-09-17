import React, {useState} from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    onAddToy({ name, image });
    setName("");
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Toy</h3>
      <input
        type="text"
        placeholder="Enter a toy's name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter a toy's image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add a Toy</button>
    </form>
  );
}

export default ToyForm;

