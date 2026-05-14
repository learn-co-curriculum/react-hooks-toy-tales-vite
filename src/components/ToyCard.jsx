import React from "react";

function ToyCard({toy, onDeleteToy}) {

  function handleDelete(){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter(
        (singleToy) => singleToy.id !== toy.id
      );

      setToys(updatedToys);
    });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
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
