import React, { useState } from 'react';
import { handleAddTodo } from '../utils/manageTodosMethods';

const CreateTodoTextBar = ({ setTodos }) => {
  const [textInput, setTextInput] = useState('');
  const [disabledFields, setDisabledFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleAddTodoAction = (e) => {
    e.preventDefault();
    if (textInput.replace(/\s/g, "") === "") {
      setTextInput(' ');
      setErrorMessage('This cannot be empty');
      return
    }
    handleAddTodo(textInput, setTodos, setDisabledFields)
      .then(() => {
        setTextInput('');
      })
    // .catch((err) => {
    //   console.log('Error', err);
    //   alert(err)
    //   setDisabledFields(false);
    // })
  }

  return (
    <form onSubmit={handleAddTodoAction}>
      <input type='text'
        disabled={disabledFields}
        onChange={(e) => {
          setTextInput(e.target.value)
          setErrorMessage('')
        }}
        placeholder='Add a todo'
        value={textInput}
      />
      <button disabled={disabledFields} type='submit'>Add</button>
      <div style={{ color: 'red' }}>{errorMessage}</div>
    </form>
  )
}

export default CreateTodoTextBar;
