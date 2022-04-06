import React, { useState, useEffect } from 'react';
import Todo from './Todo';

const Todos = () => {
  const TODOS_URL = 'api/v1/todos';
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    try {
      const response = await fetch(TODOS_URL);
      const data = await response.json();
      setTodos(data.data.todos)
      setLoading(false);
      console.log(data.data.todos)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <ul>
      {todos && todos.map((todo) => (
        <Todo todo={todo} key={todo._id} />
      ))}
    </ul>

  )
}

export default Todos