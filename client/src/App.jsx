import React, { useEffect } from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";
import AddTodo from "./components/AddTodo.jsx";
import { useAppState } from "./context.jsx";

const App = () => {
    const { updateTodos } = useAppState();

    useEffect(() => {
        updateTodos();
    }, []);

    return (
        <section className="app-container">
            <h1>todo</h1>
            <AddTodo />
            <TodoList />
        </section>
    );
};

export default App;
