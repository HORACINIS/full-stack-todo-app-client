
const TODOS_URL = process.env.NODE_ENV === 'development' ? 'api/v1/todos' : 'https://full-stack-todo-app-server.herokuapp.com/api/v1/todos';

export const fetchTodos = async () => {
  try {
    const response = await fetch(TODOS_URL);
    const data = await response.json();
    console.log(data.data.todos)
    return data.data.todos;
  } catch (err) {
    console.log('Error!', err);
    alert(err);
  }
}

export const handleAddTodo = async (e, textInput, setState, setDisableFieldsState) => {
  e.preventDefault();
  setDisableFieldsState(true);
  await fetch(TODOS_URL, {
    method: 'POST',
    body: JSON.stringify({ name: textInput }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        fetchTodos().then(todos => setState(todos))
        setDisableFieldsState(false);
      }
    })
    .catch((err) => {
      alert(err);
      console.log('Error!', err);
      // setDisableFieldsState(false);
    })
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
    .catch((err) => {
      console.log('Error!', err);
      alert(err);
    }
    );
}

export const handleChangeTodoProp = async (todoItem, setState, ...args) => {
  try {
    const [todoProp, todoPropValue] = args;
    if (args.length === 2) {
      await fetch(`${TODOS_URL}/${todoItem._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todoItem, [todoProp]: todoPropValue })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            fetchTodos().then(todos => setState(todos))
          }
        })
    }
    if (args.length === 1) {
      await fetch(`${TODOS_URL}/${todoItem._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...todoItem, [todoProp]: !todoItem[todoProp] })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            fetchTodos().then(todos => setState(todos))
          }
        })
    }
  } catch (err) {
    console.log('Error', err);
    alert(err);
  }
}
