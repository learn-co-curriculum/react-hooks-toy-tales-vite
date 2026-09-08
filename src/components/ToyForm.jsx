import { useState } from "react";

function ToyForm({setToys}) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0
  });

  function handleSubmit(e){
    e.preventDefault();
    fetch("http://localhost:3001/toys",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(newToy => {
      setToys((prevToys) => [...prevToys, newToy]);
      // setFormData({
      //     name: "",
      //     image: "",
      //   });
      })
  }

  function handleChange(e) {
    // e.prevetDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={formData.name}
          onChange={handleChange}
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={formData.image}
          onChange={handleChange}
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
