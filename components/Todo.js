import React from 'react'

const Todo = ({ todo: { name, priority, done } }) => {
  return (
    <li>
      <input type='checkbox' id={name} checked={Boolean(done)} onChange={() => console.log('chupalo')} />
      {done ? ' *Done* ' : ' *Not done* '}
      <label htmlFor={name}> <strong>{name}</strong></label>
      {priority ? ' *Not Priority* ' : ' *Priority* '}
      <button>Delete</button>
    </li >
  )
}

export default Todo