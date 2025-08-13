import React from "react";

function ToyCard({ toy, onUpdateToy, onDeleteToy }) {

  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`,
      {
        method: "DELETE"
      })
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          console.log("failed to delete item")
        }
      })
      .then(() => onDeleteToy(toy))
      .catch(error => console.log(error))
  }

  function handleUpdateToy() {
    fetch(`http://localhost:3001/toys/${toy.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: ++toy.likes,
        }),
      })
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          console.log("failed to update toy")
        }
      })
      .then(updatedToy => onUpdateToy(updatedToy))
      .catch(error => console.log(error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleUpdateToy}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
