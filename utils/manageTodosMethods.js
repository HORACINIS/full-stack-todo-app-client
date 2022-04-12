
const TODOS_URL = process.env.NODE_ENV === 'development' ? 'api/v1/todos' : 'https://full-stack-todo-app-server.herokuapp.com/api/v1/todos';

export const fetchTodos = async () => {
  try {
    const response = await fetch(TODOS_URL);
    const data = await response.json();
    console.log(data.data.todos)
    return data.data.todos;
  } catch (err) {
    console.log('Error!', err);
  }
}

export const handleDeleteTodo = async (todoItem, setState) => {
  await fetch(`${TODOS_URL}/${todoItem._id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        fetchTodos().then(todos => setState(todos))
      }
    })
    .catch((err) => console.log('Error!', err));
}

export const handleChangeTodoProp = async (todosArr, todoItem, setState, ...args) => {
  try {
    const [todoProp, todoPropValue] = args;

    if (args.length === 2) {
      const updatedTodos = todosArr.map((obj) => {
        if (obj._id === todoItem._id) {
          return { ...obj, [todoProp]: todoPropValue }
        }
        return obj;
      });
      await fetch(`${TODOS_URL}/${todoItem._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todoItem, [todoProp]: todoPropValue })
      })
      // .then(response => { console.log(response.status); return response.json(); })
      // .then(data => console.log(data.data.todo));
      setState(updatedTodos);
    }
    if (args.length === 1) {
      const updatedTodos = todosArr.map((obj) => {
        if (obj._id === todoItem._id) {
          return { ...obj, [todoProp]: !obj[todoProp] }
        }
        return obj;
      });
      await fetch(`${TODOS_URL}/${todoItem._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todoItem, [todoProp]: !todoItem[todoProp] })
      })
      // .then(response => { console.log(response.status); return response.json(); })
      // .then(data => console.log(data.data.todo));
      setState(updatedTodos);
    }
  } catch (err) {
    console.log('Error', err);
  }


}
