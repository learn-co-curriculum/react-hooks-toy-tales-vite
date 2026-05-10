const TOYS_URL = "http://localhost:3001/toys";


async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}


//GET request
export function getToys() {
  return request(TOYS_URL);
}


//POST request
export function createToy(toy) {
  return request(TOYS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  });
}


//PATCH request 
export function updateToyLikes(id, likes) {
  return request(`${TOYS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes }),
  });
}


//DELETE request
export async function deleteToy(id) {
  const response = await fetch(`${TOYS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}
