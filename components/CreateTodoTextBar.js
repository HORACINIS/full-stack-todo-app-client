import React from 'react';

const CreateTodoTextBar = () => {
  const handleAddTodo = (e) => {
    e.preventDefault();
    console.log('Todo Added!');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type='text'></input>
      <button type='submit'>Add</button>

    </form>
  )
}

export default CreateTodoTextBar;
