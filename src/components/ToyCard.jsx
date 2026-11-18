import React from "react";

function ToyCard(props) {
  // Increase likes by 1
  function handleLike() {
    const newLikes = props.toy.likes + 1;

    fetch(`http://localhost:3001/toys/${props.toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        props.updateToy(updatedToy);
      });
  }

  // Delete the toy
  function handleDonate() {
    fetch(`http://localhost:3001/toys/${props.toy.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        props.deleteToy(props.toy.id);
      });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{props.toy.name}</h2>
      <img
        src={props.toy.image}
        alt={props.toy.name}
        className="toy-avatar"
      />
      <p>{props.toy.likes} Likes </p>
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