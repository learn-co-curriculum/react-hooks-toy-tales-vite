import React from "react";

function ToyCard({toy, handleDelete}) {


  return (
    <div className="card" data-testid="toy-card" key={toy.id}>
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn">Like {toy.likes}</button>
      <button className="del-btn" onClick={() => handleDelete(toy.id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
