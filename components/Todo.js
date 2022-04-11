import React, { useState, useRef } from 'react';

const Todo = ({ todo, todos, setTodos }) => {
  const { _id, name, priority, done } = todo
  const TODOS_URL = 'api/v1/todos';
  const [editable, setEditable] = useState(false);
  const [newTodoName, setNewTodoName] = useState(name);
  const editableInput = useRef(name);

  const handleDeleteTodo = async () => {
    try {
      await fetch(`${TODOS_URL}/${_id}`, {
        method: 'DELETE'
      });
      const updatedTodos = todos.filter((selectedTodo) => selectedTodo._id !== _id);
      setTodos(updatedTodos);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  const handleChangeTodoProp = async (todoProp) => {
    console.log('chupalo')
    try {
      const updatedTodos = todos.map((obj) => {
        if (obj._id === _id) {
          return { ...obj, [todoProp]: !obj[todoProp] }
        }
        return obj;
      });

      await fetch(`${TODOS_URL}/${_id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todo, [todoProp]: !todo[todoProp] })
      })
      // .then(response => { console.log(response.status); return response.json(); })
      // .then(data => console.log(data.data.todo));
      setTodos(updatedTodos);
    } catch (err) {
      console.log('Error', err);
    }
  }

  const handleChangeTodoName = async (todoProp, todoPropValue) => {
    try {
      const updatedTodos = todos.map((obj) => {
        if (obj._id === _id) {
          return { ...obj, [todoProp]: todoPropValue }
        }
        return obj;
      });

      await fetch(`${TODOS_URL}/${_id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todo, [todoProp]: todoPropValue })
      })
      // .then(response => { console.log(response.status); return response.json(); })
      // .then(data => console.log(data.data.todo));
      setTodos(updatedTodos);
    } catch (err) {
      console.log('Error', err);
    }
  }

  const handleEditTodoNameTextInput = () => {
    setNewTodoName(editableInput.current.value);
  }

  return (
    <li>
      <p>
        <input type='checkbox' id={name} checked={done} onChange={() => handleChangeTodoProp('done')} />

        {!editable &&
          (<label htmlFor={name}> <strong>{name}</strong></label>)
          ||
          (<input onChange={handleEditTodoNameTextInput} autoFocus ref={editableInput} type='text' value={newTodoName} />)
        }

        <span onClick={() => handleChangeTodoProp('priority')}>{priority ? ' *Not Priority* ' : ' *Priority* '}</span>

        {!editable && (
          <button onClick={() => {
            setEditable(!editable)
            setNewTodoName(name);
          }}>Edit</button>
        ) || (
            <button onClick={() => {
              setEditable(!editable)
              handleChangeTodoName('name', newTodoName)
            }}>Save</button>
          )
        }

        <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
      </p>
    </li>
  )
}

export default Todo;