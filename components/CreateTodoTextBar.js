import React from 'react';

const CreateTodoTextBar = ({ todos, setTodos }) => {
  const TODOS_URL = 'api/v1/todos';

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const todo = { name: e.target.elements.todoName.value };
      const response = await fetch(TODOS_URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json()
      setTodos([...todos, { ...data.data.todo }]);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type='text' id='todoName'></input>
      <button type='submit'>Add</button>
    </form>
  )
}

export default CreateTodoTextBar;
