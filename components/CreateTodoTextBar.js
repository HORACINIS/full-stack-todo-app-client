import React, { useState } from 'react';
import { handleAddTodo } from '../utils/manageTodosMethods';

const CreateTodoTextBar = ({ todos, setTodos }) => {
  const [textInput, setTextInput] = useState('');
  const [disabledFields, setDisabledFields] = useState(false);

  const handleAddTodoAction = (e) => {
    handleAddTodo(e, textInput, setTodos)
      .then(() => {
        // setDisabledFields(true)
        setTextInput('');
        // setDisabledFields(false);
      })
      // .catch((err) => {
      //   console.log('Error', err);
      //   alert(err)
      //   setDisabledFields(false);
      // })
  }

  return (
    <form onSubmit={handleAddTodoAction}>
      <input type='text' disabled={disabledFields} onChange={(e) => setTextInput(e.target.value)} value={textInput} />
      <button disabled={disabledFields} type='submit'>Add</button>
    </form>
  )
}

export default CreateTodoTextBar;
