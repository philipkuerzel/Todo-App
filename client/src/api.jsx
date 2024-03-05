export const getTodos = () =>
  fetch("http://localhost:3000/todos").then((response) => response.json());

export const postTodo = (title) =>
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.json());

export const patchTodo = (id, newDone) =>
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDone),
  });

export const deleteTodo = (id) =>
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });