import React from "react";

function ToyCard({toy}) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{"" /* Toy's Name */}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p> Likes:{toy.likes} </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
