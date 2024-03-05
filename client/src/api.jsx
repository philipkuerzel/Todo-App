const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getTodos = () =>
  fetch(`${BACKEND_URL}/todos`).then((response) => response.json());

export const postTodo = (title) =>
  fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.json());

export const patchTodo = (id, newDone) =>
  fetch(`${BACKEND_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDone),
  });

export const deleteTodo = (id) =>
  fetch(`h${BACKEND_URL}/todos/${id}`, {
    method: "DELETE",
  });