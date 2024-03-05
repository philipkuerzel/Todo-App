import { useAppState } from "../context";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos, counter } = useAppState();

    console.log(todos);
    return (
        <>
            <p className="counter">open tasks: {counter}</p>
            <div className="output">
                {todos.map(({ title, done, id }) => (
                    <TodoItem key={id} id={id} title={title} done={done} />
                ))}
            </div>
        </>
    );
};

export default TodoList;
