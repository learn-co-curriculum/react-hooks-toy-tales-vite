import React, { useState, useEffect } from "react";

function ToyCard({ id, name, image, likes, onDeleteToy, onUpdateToy }) {

  function handleLikeClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "applicattion/json" },
      body: JSON.stringify({ likes: likes + 1 })
    })
      .then(r => {
        if (r.ok) {
          return r.json()
        }
      })
      .then(updatedToy => onUpdateToy(updatedToy))
  }

  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(r => {
        if (r.ok) { onDeleteToy(id) }
        else {
          alert("Something went wrong with the deletion.");
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={handleLikeClick} className="like-btn">Like {"<3"}</button>
      <button onClick={handleDeleteClick} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
