import React, { useRef } from 'react'
import { useAppState } from '../context';

const AddTodo = () => {

    const { addTodo } = useAppState();
    const inputRef = useRef(null);
    
  return (
    <div className='form'>
        <input
            type="text"
            ref={inputRef}
            placeholder="add new task..."
            onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  addTodo(inputRef.current.value);
                  inputRef.current.value = '';
                }
            }}
        />
        <button
            id="addBtn"
            onClick={() => {
            addTodo(inputRef.current.value);
            inputRef.current.value = '';
            }}
        >
            +
        </button>
    </div>
  )
}

export default AddTodo