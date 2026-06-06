import React from "react";

/**
 * Displays an individual toy and its actions.
 */
function ToyCard({ id, name, image, likes, deleteToy, updateLikes }) {
  return (
    <div className="card" data-testid="toy-card">
     <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={() => (updateLikes(id, likes + 1))}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => (deleteToy(id))}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
