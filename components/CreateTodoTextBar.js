import React from 'react';

const CreateTodoTextBar = ({ todos, setTodos }) => {
  const TODOS_URL = 'api/v1/todos';
  const [textInput, setTextInput] = React.useState('');
  const [disabledFields, setDisabledFields] = React.useState(false);

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
      setTodos([...todos, { ...data.data.todo }]);
      // e.target.elements.todoName.value = ''; // to be removed
      setTextInput('');
      setDisabledFields(false)
    } catch (err) {
      setDisabledFields(false)
      alert('No internet connection. Your request could not be sent');
      console.log('Error!', err);
    }
  }


  return (
    <form onSubmit={handleAddTodo}>
      <input type='text' id='todoName' disabled={disabledFields} onChange={(e) => setTextInput(e.target.value)} value={textInput} />
      <button disabled={disabledFields} type='submit'>Add</button>
    </form>
  )
}

export default CreateTodoTextBar;
