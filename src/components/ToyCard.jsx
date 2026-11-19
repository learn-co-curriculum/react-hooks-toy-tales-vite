import React from "react";

// Displays one toy with its like and donate buttons
function ToyCard({ toy, onDonateToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // DELETE the toy on the server, then remove it from state
  function handleDonate() {
    fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" }).then(() =>
      onDonateToy(id)
    );
  }

  // PATCH only the likes field, then update state with the server's response
  function handleLike() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((r) => r.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
