const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const getTodos = () =>
  fetch(`${FRONTEND_URL}/todos`).then((response) => response.json());

export const postTodo = (title) =>
  fetch(`${FRONTEND_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((response) => response.json());

export const patchTodo = (id, newDone) =>
  fetch(`${FRONTEND_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDone),
  });

export const deleteTodo = (id) =>
  fetch(`h${FRONTEND_URL}/todos/${id}`, {
    method: "DELETE",
  });