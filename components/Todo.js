import React, { useState, useRef } from 'react';
import { handleChangeTodoProp, handleDeleteTodo } from '../utils/manageTodosMethods';

const Todo = ({ todo, todos, setTodos }) => {
  const { name, priority, done } = todo
  const [editable, setEditable] = useState(false);
  const [newTodoName, setNewTodoName] = useState(name);
  const editableInput = useRef(name);

  return (
    <li onMouseLeave={() => setEditable(false)}>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>
          <input type='checkbox' id={name} checked={done} onChange={() => handleChangeTodoProp(todos, todo, setTodos, 'done')} />

          {!editable &&
            (<label htmlFor={name}> <strong>{name}</strong></label>)
            ||
            (<input onChange={() => setNewTodoName(editableInput.current.value)} autoFocus ref={editableInput} type='text' value={newTodoName} />)
          }

          <span onClick={() => handleChangeTodoProp(todos, todo, setTodos, 'priority')}>{!priority ? ' *Not Priority* ' : ' *Priority* '}</span>

          {!editable && (
            <button type='submit' onClick={() => {
              setEditable(!editable)
              setNewTodoName(name);
            }}>Edit</button>
          ) || (
              <button type='submit' onClick={() => {
                setEditable(!editable)
                handleChangeTodoProp(todos, todo, setTodos, 'name', newTodoName)
              }}>Save</button>
            )
          }

          <button onClick={() => handleDeleteTodo(todos, todo, setTodos)}>Delete</button>
        </p>
      </form>
    </li>
  )
}

export default Todo;