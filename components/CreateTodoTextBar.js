import React, { useState } from 'react';

const CreateTodoTextBar = ({ todos, setTodos }) => {
  const TODOS_URL = process.env.NODE_ENV === 'development' ? 'api/v1/todos' : 'https://full-stack-todo-app-server.herokuapp.com/api/v1/todos';
  const [textInput, setTextInput] = useState('');
  const [disabledFields, setDisabledFields] = useState(false);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      setDisabledFields(true)
      // const todo = { name: e.target.elements.todoName.value }; // to be removed
      const todo = { name: textInput };
      const response = await fetch(TODOS_URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json()
      setTodos((prevTodos) => [...prevTodos, { ...data.data.todo }]);
      // e.target.elements.todoName.value = ''; // to be removed
      setTextInput('');
      setDisabledFields(false);
    } catch (err) {
      setDisabledFields(false);
      alert('No internet connection. Your request could not be sent');
      console.log('Error!', err);
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type='text' disabled={disabledFields} onChange={(e) => setTextInput(e.target.value)} value={textInput} />
      <button disabled={disabledFields} type='submit'>Add</button>
    </form>
  )
}

export default CreateTodoTextBar;
