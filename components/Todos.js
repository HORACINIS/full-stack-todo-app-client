import React from 'react';
import Todo from './Todo';

const Todos = ({ todos }) => {
  return (
    <ul>
      {todos && todos.map((todo) => (
        <Todo todo={todo} key={todo._id} />
      ))}
    </ul>
  )
}

export default Todos