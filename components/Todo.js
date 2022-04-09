import React from 'react';

const Todo = ({ todo, todos, setTodos }) => {
  const { _id, name, priority, done } = todo
  const TODOS_URL = 'api/v1/todos';

  const handleDeleteTodo = async () => {
    try {
      await fetch(`${TODOS_URL}/${_id}`, {
        method: 'DELETE'
      });
      const updatedTodos = todos.filter((selectedTodo) => selectedTodo._id !== _id);
      setTodos(updatedTodos);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  const handleChangeTodoProp = async (todoProp) => {
    console.log('chupalo')
    try {
      const updatedTodos = todos.map((obj) => {
        if (obj._id === _id) {
          return { ...obj, [todoProp]: !obj[todoProp] }
        }
        return obj;
      });

      await fetch(`${TODOS_URL}/${_id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todo, [todoProp]: !todo[todoProp] })
      })
      // .then(response => { console.log(response.status); return response.json(); })
      // .then(data => console.log(data.data.todo));
      setTodos(updatedTodos);
    } catch (err) {
      console.log('Error', err);
    }
  }

  return (
    <li>
      <p>
        <input type='checkbox' id={name} checked={Boolean(done)} onChange={() => handleChangeTodoProp('done')} />
        <label htmlFor={name}> <strong>{name}</strong></label>
        <span onClick={() => handleChangeTodoProp('priority')}>{priority ? ' *Not Priority* ' : ' *Priority* '}</span>
        <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
      </p>
    </li >
  )
}

export default Todo



// import React from 'react';

// const Todo = ({ todo, todos, setTodos }) => {
//   const { _id, name, priority, done } = todo
//   const TODOS_URL = 'api/v1/todos';

//   const handleDeleteTodo = async () => {
//     try {
//       await fetch(`${TODOS_URL}/${_id}`, {
//         method: 'DELETE'
//       });
//       const updatedTodoList = todos.filter((selectedTodo) => selectedTodo._id !== _id);
//       setTodos(updatedTodoList);
//     } catch (err) {
//       console.log('Error!', err);
//     }
//   }

//   const handleChangeTodoProp = async (todoProp) => {
//     console.log('chupalo')
//     try {
//       const todoToBeUpdated = todos.filter((el) => el._id === _id);

//       await fetch(`${TODOS_URL}/${_id}`, {
//         method: "PATCH",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({ ...todo, [todoProp]: !todo[todoProp] })
//       })
//         .then(response => { console.log(response.status); return response.json(); })
//         .then(data => console.log(data.data.todo));
//       setTodos((prevTodos) => [...prevTodos, { ...todo, [todoProp]: !todo[todoProp] }])

//     } catch (err) {
//       console.log('Error', err)
//     }
//   }

//   return (
//     <li>
//       <p>
//         <input type='checkbox' id={name} checked={Boolean(done)} onChange={() => handleChangeTodoProp('done')} />
//         <label htmlFor={name}> <strong>{name}</strong></label>
//         <span onClick={() => handleChangeTodoProp('priority')}>{priority ? ' *Not Priority* ' : ' *Priority* '}</span>
//         <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
//       </p>
//     </li >
//   )
// }

// export default Todo