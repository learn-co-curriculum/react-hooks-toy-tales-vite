function ToyForm({ onAddToy }) {
  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((toy) => {
        onAddToy(toy);
        e.target.reset();
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Toy name" />
      <input type="text" name="image" placeholder="Toy image URL" />
      <button type="submit">Add Toy</button>
    </form>
  );
}

export default ToyForm;