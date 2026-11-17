import React from "react";
import { useState } from "react";

function ToyCard({toy, setToys}) {

function handleDelete(){
  fetch(`http://localhost:4000/toys/${toy.id}`, {
    method:"DELETE",
  })
  .then(res => {
    if(res.ok){
       setToys(prevToys =>
                prevToys.filter((t) => String(t.id) !== String(toy.id))
            );
    }else{
      console.log("Error deleting the item"); 
    }
  })
}

const [like, setLike] = useState(toy.likes)

function handleUpdate(){
  const updatedLikes = like + 1;
  setLike(updatedLikes)

  fetch(`http://localhost:4000/toys/${toy.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type": "application/json"
    }, 
    body:JSON.stringify(
      {
        "likes" : updatedLikes
      }
    )
  })
  .then(res => res.json())
  .then(data =>{
       console.log(data);
       
  })
 
}

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{like} Likes </p>
      <button className="like-btn" onClick={handleUpdate}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
