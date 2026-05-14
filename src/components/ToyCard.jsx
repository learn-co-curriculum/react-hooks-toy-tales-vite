import React from "react";

function ToyCard({toy, onUpdateToy,onDeleteToy}) {
  function handleLike(){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({likes:toy.likes + 1})
    })
    .then(res => res.json())
    .then(updatedToy => onUpdateToy(updatedToy))
  }

  function handleDelete(){
    fetch(`http://localhost:3000/toys/${toy.id}`,{method:"DELETE"})
    .then(() => onDeleteToy(toy.id))
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
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
