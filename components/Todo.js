import React from 'react'

const Todo = ({ todo: { name, priority, done } }) => {
  return (
    <li>
      <input type='checkbox' checked={Boolean(done)} />
      {done ? 'Done' : 'Not done'}
      <strong>{name} </strong>
      {priority ? 'Not Priority' : 'Priority'}
      <button>Delete</button>
    </li >
  )
}

export default Todo