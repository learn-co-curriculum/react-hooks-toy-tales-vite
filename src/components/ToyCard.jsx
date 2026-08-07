import React from "react";

const BASE_URL = "http://localhost:3001/toys";

function ToyCard({ toy, onUpdateToyLikes, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleLikeClick() {
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToyLikes(updatedToy));
  }

  function handleDonateClick() {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteToy(id));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonateClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;