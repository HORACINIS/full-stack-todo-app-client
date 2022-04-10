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

  const handleEditTodoName = () => {
    // console.log(e.target.value)
    // setNewTodoName(e.target.value)
    setNewTodoName(editableInput.current.value)
    // e.target.focus();
    // console.log(e.target)
  }

  return (
    <li>
      <p>
        <input type='checkbox' id={name} checked={Boolean(done)} onChange={() => handleChangeTodoProp('done')} />
        {!editable && <label htmlFor={name}> <strong>{name}</strong></label> || <input onChange={handleEditTodoName} htmlFor={name} ref={editableInput} type='text' value={newTodoName} />}
        <span onClick={() => handleChangeTodoProp('priority')}>{priority ? ' *Not Priority* ' : ' *Priority* '}</span>

        <button onClick={() => {
          setEditable(!editable)
          console.log(editable)
          editable && console.log(editableInput.current.value)
          console.log(editable)
        }}>{!editable && 'Edit' || 'Save'}</button>

        <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
      </p>
    </li >
  )
}

export default Todo;