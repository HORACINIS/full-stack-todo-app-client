import Head from "next/head";
import { useEffect, useState } from "react";
// import Image from "next/image";

export default function Home() {
  const TODOS_URL = 'api/v1/todos';
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(TODOS_URL);
      const data = await response.json();
      setTodos(data.data.todos)
      console.log(data.data.todos)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div>
        <h1>My todos</h1>
        <ul>
          {todos && todos.map(({ name, priority, done, _id }) => (
            <li key={_id}>
              {name} {priority ? 'Not Priority' : 'Priority'} {done ? 'Done' : 'Not Done'}
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
