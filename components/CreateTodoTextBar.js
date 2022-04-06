import React from 'react';

const CreateTodoTextBar = () => {
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
      console.log(data)
    } catch (err) {
      console.log(err)
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
