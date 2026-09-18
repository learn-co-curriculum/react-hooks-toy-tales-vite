import React from "react";

function ToyCard({ toy, onDonateToy, onUpdateToy }) {
  function handleLikeClick() {
    fetch(`http://localhost:4000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((r) => r.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  function handleDonateClick() {
    fetch(`http://localhost:4000/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => onDonateToy(toy.id));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
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