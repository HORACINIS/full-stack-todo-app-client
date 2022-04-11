
const TODOS_URL = process.env.NODE_ENV === 'development' ? 'api/v1/todos' : 'https://full-stack-todo-app-server.herokuapp.com/api/v1/todosF';

export const handleDeleteTodo = async (todosArr, todoItem, setState) => {
  try {
    await fetch(`${TODOS_URL}/${todoItem._id}`, {
      method: 'DELETE'
    });
    const updatedTodos = todosArr.filter((selectedTodo) => selectedTodo._id !== todoItem['_id']);
    setState(updatedTodos);
  } catch (err) {
    console.log('Error!', err);
  }
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
