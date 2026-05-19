import React from "react";

function ToyCard({ id, name, image, likes, onDeleteToy, onUpdateToy }) {
  function handleLike() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        if (onUpdateToy) {
          onUpdateToy(updatedToy);
        }
      })
      .catch((error) => console.error("Error updating toy:", error));
  }

  function handleDonate() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteToy(id);
        }
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonate}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
