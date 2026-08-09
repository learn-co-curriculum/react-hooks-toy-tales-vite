import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // PATCH: increment likes by 1 on the backend, then update state
  // with the server's response so state stays in sync with the DB
  function handleLikeClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  // DELETE: remove the toy from the backend ("donate" it), then
  // remove it from state so it disappears from the page
  function handleDonateClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
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