import React from 'react';
import Todo from './Todo';

const Todos = ({ todos, setTodos }) => {

  return (
    <ul>
      {todos && todos.map((todo) => (
        <Todo todo={todo} setTodos={setTodos} key={todo._id} />
      ))}
    </ul>
  )
};

export default Todos;