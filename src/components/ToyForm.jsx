import React from "react";

function ToyForm({addToy}) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  function handleSubmit(e) {
    e.preventDefault()


    const newToy = {
      name,
      imag,
      likes: 0
    }


    addToy(newToy)
     setName("")
    setImage("")
  }


  return (
    <div className="container">
      <form className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
