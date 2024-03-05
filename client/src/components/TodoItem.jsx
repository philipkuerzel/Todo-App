import React from "react";
import { useAppState } from "../context";

const TodoItem = ({ title, done, id }) => {
    const { taskDone, delTask } = useAppState();

    return (
        <div key={id} className="taskItem">
            <div className="task">
                <label onClick={() => taskDone(id, !done)}>
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={done}
                    />
                    <span
                        style={{
                            textDecoration: done ? "line-through" : "none",
                        }}
                    >
                        {title}
                    </span>
                </label>
            </div>
            <button className="delBtn" onClick={() => delTask(id, done)}>
                🗑️
            </button>
        </div>
    );
};

export default TodoItem;
