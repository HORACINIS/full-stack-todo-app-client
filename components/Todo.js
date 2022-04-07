import React from 'react';

const Todo = ({ todo, todos, setTodos }) => {
  const { name, priority, done } = todo
  const TODOS_URL = 'api/v1/todos';

  const handleDeleteTodo = async (todo) => {
    try {
      await fetch(`${TODOS_URL}/${todo._id}`, {
        method: 'DELETE'
      });
      const updatedTodoList = todos.filter((todoItem) => todoItem._id !== todo._id);
      setTodos(updatedTodoList);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  return (
    <li>
      <input type='checkbox' id={name} checked={Boolean(done)} onChange={() => console.log('chupalo')} />
      {done ? ' *Done* ' : ' *Not done* '}
      <label htmlFor={name}> <strong>{name}</strong></label>
      {priority ? ' *Not Priority* ' : ' *Priority* '}
      <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
    </li >
  )
}

export default Todo