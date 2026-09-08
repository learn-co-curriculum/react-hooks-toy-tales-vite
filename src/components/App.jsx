import{ useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  
  console.log(toys);
  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setToys(data))
  },[])

  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
         setToys((prevToys) =>
        prevToys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

    function handleLike(id) {
    // Find the toy that was clicked
      const toy = toys.find((toy) => toy.id === id);

      fetch(`http://localhost:3001/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: toy.likes + 1,
        }),
      })
        .then((res) => res.json())
        .then((updatedToy) => {
          // Update only the toy that was liked
          setToys((prevToys) =>
            prevToys.map((toy) =>
              toy.id === updatedToy.id ? updatedToy : toy
            )
          );
        });
    }

  return (
    <>
      <Header />
      {showForm ? <ToyForm setToys={setToys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleLike={handleLike}/>
    </>
  );
}

export default App;
