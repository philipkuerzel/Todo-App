import React, { createContext, useContext, useState } from "react";
import { getTodos, patchTodo, postTodo, deleteTodo } from "./api";

const StateContext = createContext({
    todos: [],
});

export const useAppState = () => useContext(StateContext);

export const AppStateProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [counter, setCounter] = useState(0);

    const updateTodos = async () => {
        try {
            const newTodos = await getTodos();
            setTodos(newTodos);
            setCounter(newTodos.filter((todo) => !todo.done).length);
        } catch (err) {
            console.error(err);
        }
    };

    const addTodo = async (title) => {
        if (title !== "" && !todos.some((t) => t.title === title)) {
            try {
                await postTodo(title);
                updateTodos();
            } catch (err) {
                console.error(err);
            }
        } else {
            window.alert("Aufgabe existiert bereits oder ist leer! 🤔");
        }
    };

    const taskDone = async (id, newDone) => {
        try {
            await patchTodo(id, { done: newDone });
            updateTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const delTask = async (id, done) => {
        if (done) {
            try {
                await deleteTodo(id, done);
                updateTodos();
            } catch (err) {
                console.error(err);
            }
        } else {
            alert(
                "Du musst diese Aufgabe zuerst erledigen, wenn du sie löschen willst 😁"
            );
        }
    };

    return (
        <StateContext.Provider
            value={{ todos, counter, taskDone, updateTodos, addTodo, delTask }}
        >
            {children}
        </StateContext.Provider>
    );
};
