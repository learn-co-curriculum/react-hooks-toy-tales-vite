import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:4000/toys`)
    .then(res =>res.json())
    .then((data) =>{
      console.log(data)
      setToys(data)
    })
  }, [])

  const [formData, setFormData] = useState({
    name:"",
    image:"", 
    likes: 0
  })

  // FORM FUNCTIONS
  function handleOnChange(event){
    setFormData({
      ...formData, [event.target.name] : event.target.value
    })
  }

  function handleSubmit(event){
    event.preventDefault()

    fetch(`http://localhost:4000/toys`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      setToys([
        ...toys, data
      ])
    })
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm 
        handleOnChange = {handleOnChange}
        handleSubmit = {handleSubmit}
        formData={formData}
      /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        setToys={setToys}
      />
    </>
  );
}

export default App;
